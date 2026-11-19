import SwiftUI
import AppKit
import Charts

struct PendingOp: Codable {
    var op: String
    var id: String
    var name: String? = nil
    var color: Int? = nil
    var sort: Int? = nil
    var subject_id: String? = nil
    var value: Int? = nil
    var weight: Int? = nil
    var title: String? = nil
    var date: String? = nil
}

private struct PullResponse: Decodable {
    struct S: Decodable { let id: String; let name: String; let color: Int; let sort: Int; let grades: [G] }
    struct G: Decodable { let id: String; let value: Int; let weight: Int; let title: String; let date: String }
    let subjects: [S]
}
private struct PushResponse: Decodable {
    struct R: Decodable { let ok: Bool; let error: String? }
    let results: [R]
}

enum SyncState: Equatable {
    case notConfigured, syncing, ok(Date), offline(String)
}

enum SyncSettings {
    static let defaultAPIKey = ""
    static var serverURL: String { UserDefaults.standard.string(forKey: "serverURL") ?? "" }
    static var apiKey: String { UserDefaults.standard.string(forKey: "apiKey") ?? defaultAPIKey }
}

let dayFormatter: DateFormatter = {
    let f = DateFormatter()
    f.calendar = Calendar(identifier: .gregorian); f.locale = Locale(identifier: "en_US_POSIX")
    f.timeZone = .current; f.dateFormat = "yyyy-MM-dd"
    return f
}()

@MainActor
final class Store: ObservableObject {
    @Published var subjects: [Subject] { didSet { storage.save(subjects) } }
    @Published private(set) var syncState: SyncState = .notConfigured
    @Published private(set) var pending: [PendingOp] { didSet { savePending() } }
    private let storage: GradeStorage
    private var syncing = false
    private var syncAgain = false
    private var timer: Timer?

    private static let pendingURL = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
        .appendingPathComponent("NotePulse/pending.json")

    init(storage: GradeStorage = JSONFileStorage()) {
        self.storage = storage
        self.subjects = storage.load()
        self.pending = (try? JSONDecoder().decode([PendingOp].self, from: Data(contentsOf: Self.pendingURL))) ?? []

        if !UserDefaults.standard.bool(forKey: "initialUploadQueued") {
            pending.append(contentsOf: subjects.enumerated().map { Self.subjectOp($1, sort: $0) })
            pending.append(contentsOf: subjects.flatMap { s in s.grades.map { Self.gradeOp($0, subject: s.id) } })
            UserDefaults.standard.set(true, forKey: "initialUploadQueued")
        }

        timer = Timer.scheduledTimer(withTimeInterval: 30, repeats: true) { [weak self] _ in
            Task { @MainActor in self?.sync() }
        }
        sync()
    }

    private func savePending() {
        if let d = try? JSONEncoder().encode(pending) { try? d.write(to: Self.pendingURL, options: .atomic) }
    }

    var allGrades: [Grade] { subjects.flatMap(\.grades) }
    var overallAverage: Double? {
        let w = allGrades.reduce(0) { $0 + $1.weight.rawValue }
        guard w > 0 else { return nil }
        return Double(allGrades.reduce(0) { $0 + $1.value * $1.weight.rawValue }) / Double(w)
    }

    func index(_ id: UUID) -> Int? { subjects.firstIndex { $0.id == id } }

    private static func subjectOp(_ s: Subject, sort: Int) -> PendingOp {
        PendingOp(op: "upsertSubject", id: s.id.uuidString, name: s.name, color: s.colorIndex, sort: sort)
    }
    private static func gradeOp(_ g: Grade, subject: UUID) -> PendingOp {
        PendingOp(op: "upsertGrade", id: g.id.uuidString, subject_id: subject.uuidString, value: g.value,
                  weight: g.weight.rawValue, title: g.title, date: dayFormatter.string(from: g.date))
    }
    private func enqueue(_ ops: [PendingOp]) { pending.append(contentsOf: ops); sync() }

    func isNameTaken(_ name: String, except id: UUID? = nil) -> Bool {
        subjects.contains { $0.id != id && $0.name.compare(name, options: [.caseInsensitive, .diacriticInsensitive]) == .orderedSame }
    }

    func addSubject(name: String, color: Int) -> UUID {
        let s = Subject(name: name, colorIndex: color)
        subjects.append(s)
        enqueue([Self.subjectOp(s, sort: subjects.count - 1)])
        return s.id
    }
    func updateSubject(_ id: UUID, name: String, color: Int) {
        guard let i = index(id) else { return }
        subjects[i].name = name; subjects[i].colorIndex = color
        enqueue([Self.subjectOp(subjects[i], sort: i)])
    }
    func deleteSubject(_ id: UUID) {
        subjects.removeAll { $0.id == id }
        enqueue([PendingOp(op: "deleteSubject", id: id.uuidString)])
    }
    func moveSubjects(from: IndexSet, to: Int) {
        subjects.move(fromOffsets: from, toOffset: to)
        enqueue(subjects.enumerated().map { Self.subjectOp($1, sort: $0) })
    }
    func upsertGrade(_ g: Grade, in subjectID: UUID) {
        guard let i = index(subjectID) else { return }
        if let j = subjects[i].grades.firstIndex(where: { $0.id == g.id }) { subjects[i].grades[j] = g }
        else { subjects[i].grades.append(g) }
        subjects[i].grades.sort { $0.date > $1.date }
        enqueue([Self.gradeOp(g, subject: subjectID)])
    }
    func deleteGrade(_ gid: UUID, in subjectID: UUID) {
        guard let i = index(subjectID) else { return }
        subjects[i].grades.removeAll { $0.id == gid }
        enqueue([PendingOp(op: "deleteGrade", id: gid.uuidString)])
    }

    func sync() {
        guard let base = URL(string: SyncSettings.serverURL), base.scheme?.hasPrefix("http") == true else {
            syncState = .notConfigured; return
        }
        if syncing { syncAgain = true; return }
        syncing = true
        if case .ok = syncState {} else { syncState = .syncing }
        Task {
            defer {
                syncing = false
                if syncAgain { syncAgain = false; sync() }
            }
            do {
                if !pending.isEmpty {
                    let batch = pending
                    let res: PushResponse = try await request(base, action: "push", body: ["ops": batch])
                    for (op, r) in zip(batch, res.results) where !r.ok {
                        NSLog("NotePulse Sync: \(op.op) \(op.id) abgelehnt: \(r.error ?? "?")")
                    }
                    pending.removeFirst(min(batch.count, pending.count))
                }
                guard pending.isEmpty else { syncAgain = true; return }
                let pull: PullResponse = try await request(base, action: "pull", body: nil as [String: [PendingOp]]?)
                guard pending.isEmpty else { syncAgain = true; return }
                let remote = pull.subjects.compactMap { s -> Subject? in
                    guard let id = UUID(uuidString: s.id) else { return nil }
                    let grades = s.grades.compactMap { g -> Grade? in
                        guard let gid = UUID(uuidString: g.id), let d = dayFormatter.date(from: g.date) else { return nil }
                        let local = subjects.first { $0.id == id }?.grades.first { $0.id == gid }
                        let date = local.map { Calendar.current.isDate($0.date, inSameDayAs: d) ? $0.date : d } ?? d
                        return Grade(id: gid, value: g.value, weight: GradeWeight(rawValue: g.weight) ?? .single,
                                     title: g.title, date: date)
                    }.sorted { $0.date > $1.date }
                    return Subject(id: id, name: s.name, colorIndex: s.color, grades: grades)
                }
                if remote != subjects { subjects = remote }
                syncState = .ok(.now)
            } catch {
                syncState = .offline(error.localizedDescription)
            }
        }
    }

    private func request<B: Encodable, R: Decodable>(_ base: URL, action: String, body: B?) async throws -> R {
        var comps = URLComponents(url: base, resolvingAgainstBaseURL: false)!
        comps.queryItems = [URLQueryItem(name: "action", value: action)]
        var req = URLRequest(url: comps.url!, timeoutInterval: 15)
        req.setValue(SyncSettings.apiKey, forHTTPHeaderField: "X-API-Key")
        if let body {
            req.httpMethod = "POST"
            req.setValue("application/json", forHTTPHeaderField: "Content-Type")
            req.httpBody = try JSONEncoder().encode(body)
        }
        let (data, resp) = try await URLSession.shared.data(for: req)
        let code = (resp as? HTTPURLResponse)?.statusCode ?? 0
        guard code == 200 else {
            throw NSError(domain: "NotePulse", code: code,
                          userInfo: [NSLocalizedDescriptionKey: code == 401 ? String(localized: "API-Schlüssel falsch") : String(localized: "Server-Fehler \(code)")])
        }
        return try JSONDecoder().decode(R.self, from: data)
    }
}
