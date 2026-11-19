<?php
declare(strict_types=1);

(function (): void {
    $file = __DIR__ . '/.env';
    if (!is_readable($file)) {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        exit('{"error":"config missing"}');
    }
    $env = [];
    foreach (file($file, FILE_IGNORE_NEW_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') continue;
        $pos = strpos($line, '=');
        if ($pos === false) continue;
        $key = trim(substr($line, 0, $pos));
        $val = trim(substr($line, $pos + 1));
        if (strlen($val) >= 2 && ($val[0] === '"' || $val[0] === "'") && substr($val, -1) === $val[0]) {
            $val = substr($val, 1, -1);
        }
        $env[$key] = $val;
    }
    foreach (['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASS', 'API_KEY', 'ACCESS_CODE', 'AUTH_SECRET'] as $k) {
        define($k, $env[$k] ?? '');
    }
})();
