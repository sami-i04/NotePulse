import SwiftUI
import AppKit
import Charts

final class AppDelegate: NSObject, NSApplicationDelegate {
    func applicationDidFinishLaunching(_ n: Notification) {
        NSApp.appearance = NSAppearance(named: .aqua)
        if let url = Bundle.main.url(forResource: "AppIcon", withExtension: "icns"), let icon = NSImage(contentsOf: url) {
            NSApp.applicationIconImage = icon
        }
        disableFullscreen()
        NotificationCenter.default.addObserver(forName: NSWindow.didBecomeKeyNotification, object: nil, queue: .main) { _ in
            self.disableFullscreen()
        }
    }
    func disableFullscreen() {
        for w in NSApp.windows {
            w.collectionBehavior.remove(.fullScreenPrimary)
            w.collectionBehavior.insert(.fullScreenNone)
            w.standardWindowButton(.zoomButton)?.isEnabled = true
        }
    }
    func applicationShouldTerminateAfterLastWindowClosed(_ s: NSApplication) -> Bool { true }
}
