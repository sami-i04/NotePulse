import SwiftUI
import AppKit
import Charts

@main
struct NotePulseApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) var delegate
    @StateObject private var store = Store()

    var body: some Scene {
        Window("NotePulse", id: "main") {
            ContentView()
                .environmentObject(store)
                .preferredColorScheme(.light)
                .frame(minWidth: 860, minHeight: 540)
        }
        .defaultSize(width: 1080, height: 700)
        .commands {
            CommandGroup(replacing: .newItem) {}
        }
        Settings {
            SyncSettingsView().environmentObject(store).preferredColorScheme(.light)
        }
    }
}
