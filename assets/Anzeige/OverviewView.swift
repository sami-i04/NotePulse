import SwiftUI
import AppKit
import Charts

struct OverviewView: View {
    @EnvironmentObject var store: Store
    @Binding var sheet: SheetKind?
    @Binding var selection: SidebarItem?

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                HStack(alignment: .center, spacing: 20) {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Gesamtschnitt").font(.headline).foregroundStyle(.white.opacity(0.8))
                        Text(fmt(store.overallAverage))
                            .font(.system(size: 54, weight: .bold, design: .rounded).monospacedDigit())
                            .foregroundStyle(.white)
                        Text("Gewichteter Schnitt aller Noten").font(.caption).foregroundStyle(.white.opacity(0.7))
                    }
                    Spacer()
                    Image(systemName: "waveform.path.ecg").font(.system(size: 60, weight: .semibold))
                        .foregroundStyle(.white.opacity(0.35))
                }
                .padding(24)
                .background(Palette.brandGradient, in: RoundedRectangle(cornerRadius: 16))

                if store.subjects.isEmpty {
                    Card { EmptyHint(icon: "books.vertical", title: String(localized: "Noch keine Fächer"),
                                     text: String(localized: "Lege dein erstes Fach an, um Noten einzutragen."),
                                     actionTitle: String(localized: "Fach anlegen")) { sheet = .newSubject } }
                } else {
                    let all = store.allGrades
                    let avgs = store.subjects.compactMap(\.average)
                    HStack(spacing: 14) {
                        StatTile(title: String(localized: "Fächer"), value: "\(store.subjects.count)", icon: "books.vertical")
                        StatTile(title: String(localized: "Noten"), value: "\(all.count)", icon: "number")
                        StatTile(title: String(localized: "Bestes Fach"), value: fmt(avgs.min()), tint: avgs.min().map(gradeColor) ?? .primary, icon: "arrow.up.circle")
                        StatTile(title: String(localized: "Schwächstes Fach"), value: fmt(avgs.max()), tint: avgs.max().map(gradeColor) ?? .primary, icon: "arrow.down.circle")
                    }

                    Card {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Schnitt pro Fach").font(.headline)
                            let rated = store.subjects.filter { $0.average != nil }
                            if rated.isEmpty {
                                Text("Noch keine Noten eingetragen.").foregroundStyle(.secondary)
                            } else {
                                SubjectBars(subjects: rated)
                            }
                        }
                    }

                    Card {
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Text("Notenverteilung").font(.headline)
                                Spacer()
                                Text("doppelt gewichtete Noten zählen 2×").font(.caption).foregroundStyle(.secondary)
                            }
                            DistributionChart(grades: all)
                        }
                    }
                }
            }
            .padding(24)
        }
        .background(Color(nsColor: .windowBackgroundColor))
        .navigationTitle("Übersicht")
        .toolbar {
            ToolbarItem {
                Button { sheet = .newSubject } label: { Label("Neues Fach", systemImage: "folder.badge.plus") }
                    .help("Neues Fach anlegen (⇧⌘N)")
            }
        }
    }
}

struct SubjectBars: View {
    let subjects: [Subject]
    private let labelWidth: CGFloat = 130
    private let valueWidth: CGFloat = 44
    private let rowHeight: CGFloat = 30

    var body: some View {
        VStack(spacing: 6) {
            ForEach(subjects) { s in
                let a = s.average ?? 0
                HStack(spacing: 12) {
                    Text(s.name)
                        .font(.callout.weight(.medium))
                        .lineLimit(1).truncationMode(.tail)
                        .frame(width: labelWidth, alignment: .trailing)
                        .help(s.name)
                    GeometryReader { geo in
                        ZStack(alignment: .leading) {
                            ScaleLines()
                            RoundedRectangle(cornerRadius: 5)
                                .fill(s.color.gradient)
                                .frame(width: max(4, geo.size.width * a / 6), height: 18)
                        }
                        .frame(maxHeight: .infinity)
                    }
                    Text(fmt(s.average))
                        .font(.callout.monospacedDigit().weight(.semibold))
                        .foregroundStyle(gradeColor(a))
                        .frame(width: valueWidth, alignment: .leading)
                }
                .frame(height: rowHeight)
            }
            HStack(spacing: 12) {
                Color.clear.frame(width: labelWidth, height: 1)
                GeometryReader { geo in
                    ForEach(1...6, id: \.self) { t in
                        Text("\(t)")
                            .font(.caption.monospacedDigit())
                            .foregroundStyle(.secondary)
                            .position(x: geo.size.width * CGFloat(t) / 6, y: 8)
                    }
                }
                .frame(height: 16)
                Color.clear.frame(width: valueWidth, height: 1)
            }
        }
    }
}

private struct ScaleLines: View {
    var body: some View {
        GeometryReader { geo in
            ForEach(0...6, id: \.self) { t in
                Rectangle()
                    .fill(Color.black.opacity(t == 0 ? 0.14 : 0.06))
                    .frame(width: 1)
                    .offset(x: geo.size.width * CGFloat(t) / 6 - (t == 6 ? 1 : 0))
            }
        }
    }
}
