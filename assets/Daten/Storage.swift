import SwiftUI
import AppKit
import Charts

protocol GradeStorage {
    func load() -> [Subject]
    func save(_ subjects: [Subject])
}

struct JSONFileStorage: GradeStorage {
    let url: URL = {
        let dir = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
            .appendingPathComponent("NotePulse", isDirectory: true)
        try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        return dir.appendingPathComponent("data.json")
    }()
    func load() -> [Subject] {
        guard let data = try? Data(contentsOf: url) else { return [] }
        let dir = url.deletingLastPathComponent()
        let stamp = ISO8601DateFormatter().string(from: .now).replacingOccurrences(of: ":", with: "-")
        let dec = JSONDecoder(); dec.dateDecodingStrategy = .iso8601
        do {
            let subjects = try dec.decode([Subject].self, from: data)
            let backups = dir.appendingPathComponent("Backups", isDirectory: true)
            try? FileManager.default.createDirectory(at: backups, withIntermediateDirectories: true)
            try? data.write(to: backups.appendingPathComponent("data-\(stamp).json"))
            if let files = try? FileManager.default.contentsOfDirectory(at: backups, includingPropertiesForKeys: nil)
                .filter({ $0.lastPathComponent.hasPrefix("data-") }).sorted(by: { $0.lastPathComponent > $1.lastPathComponent }) {
                files.dropFirst(10).forEach { try? FileManager.default.removeItem(at: $0) }
            }
            return subjects
        } catch {
            try? FileManager.default.copyItem(at: url, to: dir.appendingPathComponent("data-UNLESBAR-\(stamp).json"))
            NSLog("NotePulse: data.json nicht lesbar, Kopie gesichert: \(error)")
            return []
        }
    }
    func save(_ subjects: [Subject]) {
        let enc = JSONEncoder(); enc.dateEncodingStrategy = .iso8601
        enc.outputFormatting = [.prettyPrinted, .sortedKeys]
        if let data = try? enc.encode(subjects) { try? data.write(to: url, options: .atomic) }
    }
}
