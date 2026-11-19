import SwiftUI
import AppKit
import Charts

struct SubjectDetailView: View {
    @EnvironmentObject var store: Store
    let subject: Subject
    @Binding var sheet: SheetKind?
    @Binding var confirmDelete: Subject?

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                HStack(spacing: 14) {
                    let a = subject.average
                    Card {
                        HStack(spacing: 16) {
                            ZStack {
                                Circle().fill(subject.color.opacity(0.15))
                                Text(fmt(a)).font(.system(size: 22, weight: .bold, design: .rounded).monospacedDigit())
                                    .foregroundStyle(a.map(gradeColor) ?? .secondary)
                            }
                            .frame(width: 78, height: 78)
                            .overlay(Circle().stroke(subject.color, lineWidth: 3))
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Fachschnitt").foregroundStyle(.secondary)
                                Text(subject.name).font(.title2.weight(.semibold))
                            }
                        }
                    }
                    StatTile(title: String(localized: "Einfach"), value: "\(subject.grades.filter { $0.weight == .single }.count)", icon: "1.circle")
                    StatTile(title: String(localized: "Doppelt"), value: "\(subject.grades.filter { $0.weight == .double }.count)", icon: "2.circle")
                }

                Card {
                    VStack(alignment: .leading, spacing: 10) {
                        HStack {
                            Text("Noten").font(.headline)
                            Spacer()
                            Button { sheet = .newGrade(subject.id) } label: { Label("Note hinzufügen", systemImage: "plus") }
                                .buttonStyle(.borderedProminent).tint(subject.color)
                                .keyboardShortcut("n", modifiers: .command)
                        }
                        if subject.grades.isEmpty {
                            EmptyHint(icon: "square.and.pencil", title: String(localized: "Noch keine Noten"),
                                      text: String(localized: "Füge mit ⌘N deine erste Note hinzu."))
                        } else {
                            ForEach(subject.grades) { g in
                                GradeRow(grade: g, tint: subject.color,
                                         onEdit: { sheet = .editGrade(subject.id, g) },
                                         onDelete: { store.deleteGrade(g.id, in: subject.id) })
                                    .contentShape(Rectangle())
                                    .onTapGesture(count: 2) { sheet = .editGrade(subject.id, g) }
                                    .contextMenu {
                                        Button("Bearbeiten…") { sheet = .editGrade(subject.id, g) }
                                        Button("Löschen", role: .destructive) { store.deleteGrade(g.id, in: subject.id) }
                                    }
                                if g.id != subject.grades.last?.id { Divider() }
                            }
                        }
                    }
                }

                if subject.grades.count >= 2 {
                    Card {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Verlauf").font(.headline)
                            Chart(subject.grades.sorted { $0.date < $1.date }) { g in
                                LineMark(x: .value("Datum", g.date), y: .value("Note", g.value))
                                    .foregroundStyle(subject.color).interpolationMethod(.monotone)
                                PointMark(x: .value("Datum", g.date), y: .value("Note", g.value))
                                    .foregroundStyle(gradeColor(Double(g.value)))
                                    .symbolSize(g.weight == .double ? 140 : 60)
                                if let a = subject.average {
                                    RuleMark(y: .value("Schnitt", a))
                                        .foregroundStyle(.secondary).lineStyle(StrokeStyle(lineWidth: 1, dash: [4, 4]))
                                }
                            }
                            .chartYScale(domain: [6, 1])
                            .chartYAxis { AxisMarks(values: [1, 2, 3, 4, 5, 6]) }
                            .frame(height: 180)
                        }
                    }
                    Card {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Verteilung").font(.headline)
                            DistributionChart(grades: subject.grades)
                        }
                    }
                }
            }
            .padding(24)
        }
        .background(Color(nsColor: .windowBackgroundColor))
        .navigationTitle(subject.name)
        .toolbar {
            ToolbarItemGroup {
                Button { sheet = .editSubject(subject.id) } label: { Label("Bearbeiten", systemImage: "pencil") }
                    .help("Fach umbenennen / Farbe ändern")
                Button(role: .destructive) { confirmDelete = subject } label: { Label("Löschen", systemImage: "trash") }
                    .help("Fach löschen")
            }
        }
    }
}

struct GradeRow: View {
    let grade: Grade; let tint: Color
    var onEdit: () -> Void = {}
    var onDelete: () -> Void = {}
    var body: some View {
        HStack(spacing: 12) {
            Text("\(grade.value)")
                .font(.system(size: 18, weight: .bold, design: .rounded))
                .foregroundStyle(.white)
                .frame(width: 36, height: 36)
                .background(gradeColor(Double(grade.value)), in: RoundedRectangle(cornerRadius: 8))
            VStack(alignment: .leading, spacing: 2) {
                Text(grade.title.isEmpty ? String(localized: "Note") : grade.title).font(.body.weight(.medium))
                Text(grade.date.formatted(date: .abbreviated, time: .omitted)).font(.caption).foregroundStyle(.secondary)
            }
            Spacer()
            Text(grade.weight.label + " " + grade.weight.short)
                .font(.caption.weight(.semibold))
                .padding(.horizontal, 8).padding(.vertical, 3)
                .background((grade.weight == .double ? tint : Color.gray).opacity(0.15), in: Capsule())
                .foregroundStyle(grade.weight == .double ? tint : .secondary)
            HStack(spacing: 6) {
                IconButton(systemName: "pencil", help: String(localized: "Note bearbeiten"), action: onEdit)
                IconButton(systemName: "trash", danger: true, confirm: confirmDelete,
                           help: confirmDelete ? String(localized: "Zum Löschen erneut klicken") : String(localized: "Note löschen")) {
                    if confirmDelete { onDelete(); return }
                    confirmToken += 1
                    let token = confirmToken
                    withAnimation(.spring(response: 0.25, dampingFraction: 0.55)) { confirmDelete = true }
                    DispatchQueue.main.asyncAfter(deadline: .now() + 2.5) {
                        if token == confirmToken { withAnimation(.easeOut(duration: 0.2)) { confirmDelete = false } }
                    }
                }
            }
        }
        .padding(.vertical, 4)
    }

    @Local private var confirmDelete = false
    @Local private var confirmToken = 0
}

struct IconButton: View {
    let systemName: String
    var danger = false
    var confirm = false
    let help: String
    let action: () -> Void
    @Local private var hover = false

    private static let danger = Color(red: 1.0, green: 0.23, blue: 0.19)
    private var filled: Bool { hover || confirm }
    private var fill: Color { confirm || danger ? Self.danger : Palette.brand }

    var body: some View {
        Button(action: action) {
            Image(systemName: confirm ? "checkmark" : systemName)
                .font(.system(size: 13, weight: confirm ? .bold : .medium))
                .foregroundStyle(filled ? Color.white : Color(red: 0.43, green: 0.43, blue: 0.45))
                .frame(width: 30, height: 30)
                .background(RoundedRectangle(cornerRadius: 7).fill(filled ? fill : Color.white))
                .overlay(RoundedRectangle(cornerRadius: 7).stroke(filled ? fill : Color.black.opacity(0.08), lineWidth: 1))
                .scaleEffect(confirm ? 1.06 : 1)
                .contentShape(RoundedRectangle(cornerRadius: 7))
        }
        .buttonStyle(PressScaleStyle())
        .onHover { h in withAnimation(.easeOut(duration: 0.12)) { hover = h } }
        .help(help)
    }
}

struct PressScaleStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.94 : 1)
            .animation(.easeOut(duration: 0.1), value: configuration.isPressed)
    }
}
