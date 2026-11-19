import SwiftUI
import AppKit
import Charts

struct Card<Content: View>: View {
    @ViewBuilder var content: Content
    var body: some View {
        content
            .padding(16)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color.white, in: RoundedRectangle(cornerRadius: 12))
            .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.black.opacity(0.06)))
            .shadow(color: .black.opacity(0.04), radius: 4, y: 1)
    }
}

struct StatTile: View {
    let title: String; let value: String; var tint: Color = .primary; var icon: String
    var body: some View {
        Card {
            VStack(alignment: .leading, spacing: 6) {
                Label(title, systemImage: icon).font(.callout).foregroundStyle(.secondary)
                Text(value).font(.system(size: 28, weight: .bold, design: .rounded).monospacedDigit())
                    .foregroundStyle(tint)
            }
        }
    }
}

struct EmptyHint: View {
    let icon: String; let title: String; let text: String
    var actionTitle: String? = nil; var action: (() -> Void)? = nil
    var body: some View {
        VStack(spacing: 10) {
            Image(systemName: icon).font(.system(size: 40)).foregroundStyle(Palette.brand.opacity(0.6))
            Text(title).font(.title3.weight(.semibold))
            Text(text).foregroundStyle(.secondary).multilineTextAlignment(.center)
            if let actionTitle, let action {
                Button(actionTitle, action: action).buttonStyle(.borderedProminent).tint(Palette.brand).padding(.top, 4)
            }
        }
        .frame(maxWidth: .infinity).padding(40)
    }
}

struct DistributionChart: View {
    let grades: [Grade]
    var body: some View {
        Chart {
            ForEach(1...6, id: \.self) { n in
                let c = grades.filter { $0.value == n }.reduce(0) { $0 + $1.weight.rawValue }
                BarMark(x: .value("Note", "\(n)"), y: .value("Anzahl", c))
                    .foregroundStyle(gradeColor(Double(n)))
                    .cornerRadius(4)
                    .annotation(position: .top) {
                        if c > 0 { Text("\(c)").font(.caption2).foregroundStyle(.secondary) }
                    }
            }
        }
        .chartYAxis { AxisMarks(position: .leading) }
        .frame(height: 170)
    }
}
