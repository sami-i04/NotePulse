import SwiftUI
import AppKit
import Charts

enum SidebarItem: Hashable { case overview, subject(UUID) }

enum SheetKind: Identifiable {
    case newSubject, editSubject(UUID), newGrade(UUID), editGrade(UUID, Grade)
    var id: String {
        switch self {
        case .newSubject: return "ns"
        case .editSubject(let s): return "es\(s)"
        case .newGrade(let s): return "ng\(s)"
        case .editGrade(_, let g): return "eg\(g.id)"
        }
    }
}

struct ContentView: View {
    @EnvironmentObject var store: Store
    @Local private var selection: SidebarItem? = .overview
    @Local private var sheet: SheetKind?
    @Local private var confirmDelete: Subject?

    var body: some View {
        NavigationSplitView {
            List(selection: $selection) {
                NavigationLink(value: SidebarItem.overview) {
                    Label("Übersicht", systemImage: "chart.bar.xaxis")
                }
                Section("Fächer") {
                    ForEach(store.subjects) { s in
                        NavigationLink(value: SidebarItem.subject(s.id)) { SubjectRow(subject: s) }
                            .contextMenu {
                                Button("Note hinzufügen…") { sheet = .newGrade(s.id) }
                                Button("Fach bearbeiten…") { sheet = .editSubject(s.id) }
                                Menu("Farbe") {
                                    ForEach(Palette.colors.indices, id: \.self) { i in
                                        Button(Palette.colors[i].0) {
                                            store.updateSubject(s.id, name: s.name, color: i)
                                        }
                                    }
                                }
                                Divider()
                                Button("Fach löschen…", role: .destructive) { confirmDelete = s }
                            }
                    }
                    .onMove { store.moveSubjects(from: $0, to: $1) }
                }
            }
            .navigationSplitViewColumnWidth(min: 210, ideal: 240, max: 320)
            .safeAreaInset(edge: .bottom) {
              VStack(alignment: .leading, spacing: 8) {
                Button { sheet = .newSubject } label: {
                    Label("Neues Fach", systemImage: "plus.circle.fill").frame(maxWidth: .infinity, alignment: .leading)
                }
                .buttonStyle(.borderless)
                .keyboardShortcut("n", modifiers: [.command, .shift])
                .padding(.horizontal, 12).padding(.top, 12)
                SettingsLink { SyncStatusView().frame(maxWidth: .infinity, alignment: .leading) }
                    .buttonStyle(.plain)
                    .padding(.horizontal, 12).padding(.bottom, 10)
              }
            }
        } detail: {
            switch selection {
            case .subject(let id):
                if let s = store.subjects.first(where: { $0.id == id }) {
                    SubjectDetailView(subject: s, sheet: $sheet, confirmDelete: $confirmDelete)
                } else { OverviewView(sheet: $sheet, selection: $selection) }
            default:
                OverviewView(sheet: $sheet, selection: $selection)
            }
        }
        .sheet(item: $sheet) { kind in
            switch kind {
            case .newSubject:
                SubjectForm(title: String(localized: "Neues Fach"), name: "", color: store.subjects.count % Palette.colors.count) { n, c in
                    selection = .subject(store.addSubject(name: n, color: c))
                }
            case .editSubject(let id):
                let s = store.subjects.first { $0.id == id }
                SubjectForm(title: String(localized: "Fach bearbeiten"), name: s?.name ?? "", color: s?.colorIndex ?? 0) { n, c in
                    store.updateSubject(id, name: n, color: c)
                }
            case .newGrade(let sid):
                GradeForm(title: String(localized: "Neue Note"), grade: Grade(value: 2, weight: .single, title: "", date: .now)) {
                    store.upsertGrade($0, in: sid)
                }
            case .editGrade(let sid, let g):
                GradeForm(title: String(localized: "Note bearbeiten"), grade: g, onDelete: { store.deleteGrade(g.id, in: sid) }) {
                    store.upsertGrade($0, in: sid)
                }
            }
        }
        .confirmationDialog("„\(confirmDelete?.name ?? "")“ löschen?",
                            isPresented: Binding(get: { confirmDelete != nil }, set: { if !$0 { confirmDelete = nil } }),
                            presenting: confirmDelete) { s in
            Button("Fach und \(s.grades.count) Noten löschen", role: .destructive) {
                if selection == .subject(s.id) { selection = .overview }
                store.deleteSubject(s.id)
            }
        } message: { _ in Text("Dies kann nicht rückgängig gemacht werden.") }
    }
}

struct SubjectRow: View {
    let subject: Subject
    var body: some View {
        HStack(spacing: 8) {
            Circle().fill(subject.color).frame(width: 10, height: 10)
            Text(subject.name).lineLimit(1)
            Spacer()
            if let a = subject.average {
                Text(fmt(a)).font(.caption.monospacedDigit().weight(.semibold))
                    .padding(.horizontal, 6).padding(.vertical, 2)
                    .background(gradeColor(a).opacity(0.15), in: Capsule())
                    .foregroundStyle(gradeColor(a))
            }
        }
    }
}
