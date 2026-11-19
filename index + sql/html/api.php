<?php
declare(strict_types=1);
require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const COOKIE      = 'np_auth';
const TTL_WEB     = 60 * 60 * 24 * 30;
const TTL_PWA     = 60 * 60 * 24 * 14;
const MAX_FAILS   = 8;
const LOCK_WINDOW = 15 * 60;
const UUID_RE     = '/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/';

function out(int $code, array $data): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function isHttps(): bool {
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
}

function sign(string $payload): string {
    return hash_hmac('sha256', $payload, AUTH_SECRET);
}

function setAuthCookie(string $value, int $expires): void {
    setcookie(COOKIE, $value, [
        'expires'  => $expires,
        'path'     => '/',
        'secure'   => isHttps(),
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

function cookieExpires(): int {
    $c = $_COOKIE[COOKIE] ?? '';
    if (!is_string($c) || !preg_match('/^(\d+)\.([0-9a-f]{64})$/', $c, $m)) return 0;
    return ((int)$m[1] > time() && hash_equals(sign($m[1]), $m[2])) ? (int)$m[1] : 0;
}

function cookieValid(): bool {
    return cookieExpires() > 0;
}

function apiKeyValid(): bool {
    $k = $_SERVER['HTTP_X_API_KEY'] ?? '';
    return API_KEY !== '' && is_string($k) && hash_equals(API_KEY, $k);
}

function failFile(): string {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    return sys_get_temp_dir() . '/notepulse_login_' . hash('sha256', $ip . AUTH_SECRET);
}
function recentFails(): array {
    $f = failFile();
    $list = is_readable($f) ? (json_decode((string)file_get_contents($f), true) ?: []) : [];
    return array_values(array_filter($list, fn($t) => is_int($t) && $t > time() - LOCK_WINDOW));
}

if (AUTH_SECRET === '' || DB_HOST === '') out(500, ['error' => 'config incomplete']);

$action = (string)($_GET['action'] ?? '');
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($action === 'login') {
    if ($method !== 'POST') out(405, ['error' => 'method not allowed']);
    $fails = recentFails();
    if (count($fails) >= MAX_FAILS) {
        $wait = (int)ceil((min($fails) + LOCK_WINDOW - time()) / 60);
        out(429, ['error' => 'locked', 'message' => "Zu viele Versuche. Bitte in $wait Min. erneut versuchen."]);
    }
    $body = json_decode((string)file_get_contents('php://input'), true);
    $code = is_array($body) && is_string($body['code'] ?? null) ? trim($body['code']) : '';
    if (ACCESS_CODE === '' || !hash_equals(ACCESS_CODE, $code)) {
        $fails[] = time();
        @file_put_contents(failFile(), json_encode($fails), LOCK_EX);
        usleep(400000);
        out(401, ['error' => 'invalid code', 'message' => 'Der Zugangscode ist nicht korrekt.']);
    }
    @unlink(failFile());
    $pwa = is_array($body) && !empty($body['pwa']);
    $exp = time() + ($pwa ? TTL_PWA : TTL_WEB);
    setAuthCookie($exp . '.' . sign((string)$exp), $exp);
    out(200, ['ok' => true, 'expires' => $exp]);
}

if ($action === 'logout') {
    setAuthCookie('', time() - 3600);
    out(200, ['ok' => true]);
}

if ($action === 'me') {
    $exp = cookieExpires();
    out(200, ['authenticated' => $exp > 0 || apiKeyValid(), 'expires' => $exp ?: null]);
}

if (!cookieValid() && !apiKeyValid()) out(401, ['error' => 'unauthorized']);

try {
    $pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    out(503, ['error' => 'database unavailable']);
}

if ($action === 'pull') {
    $subjects = [];
    foreach ($pdo->query('SELECT id, name, color_id, sort_order FROM np_subject ORDER BY sort_order, name') as $r) {
        $subjects[$r['id']] = [
            'id' => $r['id'], 'name' => $r['name'], 'color' => (int)$r['color_id'],
            'sort' => (int)$r['sort_order'], 'grades' => [],
        ];
    }
    foreach ($pdo->query('SELECT id, subject_id, value, weight_id, title, exam_date FROM np_grade ORDER BY exam_date DESC, created_at DESC') as $r) {
        if (!isset($subjects[$r['subject_id']])) continue;
        $subjects[$r['subject_id']]['grades'][] = [
            'id' => $r['id'], 'value' => (int)$r['value'], 'weight' => (int)$r['weight_id'],
            'title' => $r['title'], 'date' => $r['exam_date'],
        ];
    }
    out(200, ['subjects' => array_values($subjects)]);
}

if ($action === 'push') {
    if ($method !== 'POST') out(405, ['error' => 'method not allowed']);
    $body = json_decode((string)file_get_contents('php://input'), true);
    if (!is_array($body) || !is_array($body['ops'] ?? null)) out(400, ['error' => 'invalid body']);
    if (count($body['ops']) > 500) out(413, ['error' => 'too many ops']);

    $results = [];
    foreach ($body['ops'] as $op) {
        try {
            if (!is_array($op) || !is_string($op['id'] ?? null) || !preg_match(UUID_RE, $op['id'])) {
                throw new InvalidArgumentException('invalid id');
            }
            $id = strtoupper($op['id']);

            switch ($op['op'] ?? '') {
                case 'upsertSubject':
                    $name = trim((string)($op['name'] ?? ''));
                    if ($name === '' || mb_strlen($name) > 100) throw new InvalidArgumentException('invalid name');
                    $base = $name; $n = 2;
                    $chk = $pdo->prepare('SELECT COUNT(*) FROM np_subject WHERE name = ? AND id <> ?');
                    while (true) {
                        $chk->execute([$name, $id]);
                        if ((int)$chk->fetchColumn() === 0) break;
                        $name = mb_substr($base, 0, 94) . " ($n)"; $n++;
                    }
                    $pdo->prepare('INSERT INTO np_subject (id, name, color_id, sort_order) VALUES (?, ?, ?, ?)
                                   ON DUPLICATE KEY UPDATE name = VALUES(name), color_id = VALUES(color_id), sort_order = VALUES(sort_order)')
                        ->execute([$id, $name, (int)($op['color'] ?? 0), max(0, (int)($op['sort'] ?? 0))]);
                    break;

                case 'deleteSubject':
                    $pdo->prepare('DELETE FROM np_subject WHERE id = ?')->execute([$id]);
                    break;

                case 'upsertGrade':
                    $sid   = (string)($op['subject_id'] ?? '');
                    $date  = (string)($op['date'] ?? '');
                    $title = trim((string)($op['title'] ?? ''));
                    if (!preg_match(UUID_RE, $sid)) throw new InvalidArgumentException('invalid subject_id');
                    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date) || !checkdate((int)substr($date, 5, 2), (int)substr($date, 8, 2), (int)substr($date, 0, 4))) {
                        throw new InvalidArgumentException('invalid date');
                    }
                    if (mb_strlen($title) > 100) $title = mb_substr($title, 0, 100);
                    $pdo->prepare('INSERT INTO np_grade (id, subject_id, value, weight_id, title, exam_date) VALUES (?, ?, ?, ?, ?, ?)
                                   ON DUPLICATE KEY UPDATE subject_id = VALUES(subject_id), value = VALUES(value),
                                   weight_id = VALUES(weight_id), title = VALUES(title), exam_date = VALUES(exam_date)')
                        ->execute([$id, strtoupper($sid), (int)($op['value'] ?? 0), (int)($op['weight'] ?? 1), $title, $date]);
                    break;

                case 'deleteGrade':
                    $pdo->prepare('DELETE FROM np_grade WHERE id = ?')->execute([$id]);
                    break;

                default:
                    throw new InvalidArgumentException('unknown op');
            }
            $results[] = ['ok' => true];
        } catch (Throwable $e) {
            $msg = $e instanceof InvalidArgumentException ? $e->getMessage() : 'rejected by database';
            $results[] = ['ok' => false, 'error' => $msg];
        }
    }
    out(200, ['results' => $results]);
}

out(400, ['error' => 'unknown action']);
