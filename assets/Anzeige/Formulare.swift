import SwiftUI
import AppKit
import Charts

struct SubjectForm: View {
    let title: String
    @Local var name: String
    @Local var color: Int
    let onSave: (String, Int) -> Void
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text(title).font(.title3.weight(.semibold))
            TextField("Name (z. B. Mathematik)", text: $name).textFieldStyle(.roundedBorder)
            Text("Farbe").font(.callout).foregroundStyle(.secondary)
            LazyVGrid(columns: Array(repeating: GridItem(.fixed(30), spacing: 10), count: 6), spacing: 10) {
                ForEach(Palette.colors.indices, id: \.self) { i in
                    Circle().fill(Palette.color(i)).frame(width: 26, height: 26)
                        .overlay(Circle().stroke(Color.primary.opacity(color == i ? 0.8 : 0), lineWidth: 2).padding(-3))
                        .onTapGesture { color = i }
                        .help(Palette.colors[i].0)
                }
            }
            HStack {
                Spacer()
                Button("Abbrechen") { dismiss() }.keyboardShortcut(.cancelAction)
                Button("Speichern") { onSave(name.trimmingCharacters(in: .whitespaces), color); dismiss() }
                    .keyboardShortcut(.defaultAction)
                    .disabled(name.trimmingCharacters(in: .whitespaces).isEmpty)
            }
        }
        .padding(22).frame(width: 340)
    }
}

struct GradeForm: View {
    let title: String
    @Local var grade: Grade
    var onDelete: (() -> Void)? = nil
    let onSave: (Grade) -> Void
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text(title).font(.title3.weight(.semibold))

            Text("Note").font(.callout).foregroundStyle(.secondary)
            HStack(spacing: 8) {
                ForEach(1...6, id: \.self) { n in
                    let sel = grade.value == n
                    Button { grade.value = n } label: {
                        Text("\(n)").font(.system(size: 18, weight: .bold, design: .rounded))
                            .frame(width: 40, height: 40)
                            .foregroundStyle(sel ? .white : gradeColor(Double(n)))
                            .background(sel ? gradeColor(Double(n)) : gradeColor(Double(n)).opacity(0.12),
                                        in: RoundedRectangle(cornerRadius: 9))
                    }
                    .buttonStyle(.plain)
                }
            }

            Picker("Gewichtung", selection: $grade.weight) {
                ForEach(GradeWeight.allCases) { Text("\($0.label) (\($0.short))").tag($0) }
            }
            .pickerStyle(.segmented)

            TextField("Bezeichnung (z. B. Schulaufgabe, Ex, Referat)", text: $grade.title)
                .textFieldStyle(.roundedBorder)
            DatePicker("Datum", selection: $grade.date, displayedComponents: .date)

            HStack {
                if let onDelete {
                    Button("Löschen", role: .destructive) { onDelete(); dismiss() }
                }
                Spacer()
                Button("Abbrechen") { dismiss() }.keyboardShortcut(.cancelAction)
                Button("Speichern") { onSave(grade); dismiss() }.keyboardShortcut(.defaultAction)
            }
        }
        .padding(22).frame(width: 380)
    }
}
