import SwiftUI
import AppKit
import Charts

struct SyncStatusView: View {
    @EnvironmentObject var store: Store
    var body: some View {
        let (icon, text, tint): (String, String, Color) = {
            switch store.syncState {
            case .notConfigured: return ("icloud.slash", String(localized: "Sync nicht eingerichtet"), .secondary)
            case .syncing:       return ("arrow.triangle.2.circlepath.icloud", String(localized: "Synchronisiere…"), .secondary)
            case .ok(let d):     return ("checkmark.icloud", String(localized: "Synchronisiert \(d.formatted(date: .omitted, time: .shortened))"), .green)
            case .offline:       return ("exclamationmark.icloud", String(localized: "Offline – \(store.pending.count) Änderung(en) ausstehend"), .orange)
            }
        }()
        HStack(spacing: 6) {
            Image(systemName: icon).foregroundStyle(tint)
            Text(text).font(.caption).foregroundStyle(.secondary).lineLimit(1)
        }
        .help({ if case .offline(let e) = store.syncState { return e }; return String(localized: "Klicken für Einstellungen (⌘,)") }())
    }
}

struct SyncSettingsView: View {
    @EnvironmentObject var store: Store
    @AppStorage("serverURL") private var serverURL = ""
    @AppStorage("apiKey") private var apiKey = SyncSettings.defaultAPIKey
    var body: some View {
        Form {
            Section {
                TextField("Server-URL", text: $serverURL, prompt: Text("https://deine-domain.de/api.php"))
                SecureField("API-Schlüssel", text: $apiKey)
            } footer: {
                Text("Adresse der api.php auf deinem Webspace. Die Noten bleiben immer auch lokal gespeichert.")
                    .font(.caption).foregroundStyle(.secondary)
            }
            HStack {
                SyncStatusView()
                Spacer()
                Button("Jetzt synchronisieren") { store.sync() }
            }
        }
        .formStyle(.grouped)
        .frame(width: 460)
        .onChange(of: serverURL) { _ in store.sync() }
    }
}
