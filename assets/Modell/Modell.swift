import SwiftUI
import AppKit
import Charts

enum GradeWeight: Int, Codable, CaseIterable, Identifiable {
    case single = 1, double = 2
    var id: Int { rawValue }
    var label: String { self == .single ? String(localized: "Einfach") : String(localized: "Doppelt") }
    var short: String { self == .single ? "×1" : "×2" }
}

struct Grade: Identifiable, Codable, Hashable {
    var id = UUID()
    var value: Int
    var weight: GradeWeight
    var title: String
    var date: Date
}

struct Subject: Identifiable, Codable, Hashable {
    var id = UUID()
    var name: String
    var colorIndex: Int
    var grades: [Grade] = []

    var color: Color { Palette.color(colorIndex) }

    var average: Double? {
        let w = grades.reduce(0) { $0 + $1.weight.rawValue }
        guard w > 0 else { return nil }
        return Double(grades.reduce(0) { $0 + $1.value * $1.weight.rawValue }) / Double(w)
    }
}

enum Palette {
    static let colors: [(String, Color)] = [
        (String(localized: "Lila"),    Color(red: 0.42, green: 0.24, blue: 0.70)),
        (String(localized: "Blau"),    Color(red: 0.20, green: 0.45, blue: 0.90)),
        (String(localized: "Türkis"),  Color(red: 0.10, green: 0.62, blue: 0.66)),
        (String(localized: "Grün"),    Color(red: 0.22, green: 0.64, blue: 0.34)),
        (String(localized: "Gelb"),    Color(red: 0.90, green: 0.68, blue: 0.10)),
        (String(localized: "Orange"),  Color(red: 0.95, green: 0.50, blue: 0.15)),
        (String(localized: "Rot"),     Color(red: 0.88, green: 0.25, blue: 0.27)),
        (String(localized: "Pink"),    Color(red: 0.90, green: 0.32, blue: 0.62)),
        (String(localized: "Braun"),   Color(red: 0.55, green: 0.38, blue: 0.25)),
        (String(localized: "Grau"),    Color(red: 0.45, green: 0.47, blue: 0.52)),
        (String(localized: "Schwarz"), Color(red: 0.08, green: 0.08, blue: 0.10)),
        (String(localized: "Knallgelb"), Color(red: 1.00, green: 0.84, blue: 0.00)),
    ]
    static func color(_ i: Int) -> Color { colors[((i % colors.count) + colors.count) % colors.count].1 }
    static let brand = Color(red: 0.36, green: 0.18, blue: 0.58)
    static let brandGradient = LinearGradient(
        colors: [Color(red: 0.16, green: 0.08, blue: 0.28), Color(red: 0.40, green: 0.22, blue: 0.62)],
        startPoint: .bottomLeading, endPoint: .topTrailing)
}

func gradeColor(_ v: Double) -> Color {
    switch v {
    case ..<1.5: return Color(red: 0.13, green: 0.60, blue: 0.30)
    case ..<2.5: return Color(red: 0.40, green: 0.66, blue: 0.20)
    case ..<3.5: return Color(red: 0.85, green: 0.65, blue: 0.05)
    case ..<4.5: return Color(red: 0.93, green: 0.48, blue: 0.12)
    case ..<5.5: return Color(red: 0.88, green: 0.28, blue: 0.22)
    default:     return Color(red: 0.70, green: 0.12, blue: 0.16)
    }
}
func fmt(_ v: Double?) -> String { v.map { String(format: "%.2f", $0) } ?? "–" }
