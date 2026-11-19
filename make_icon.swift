import AppKit

let out = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "icon_1024.png"
let size: CGFloat = 1024

let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: Int(size), pixelsHigh: Int(size),
                           bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
                           colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)

let fullBleed = CommandLine.arguments.count > 2 && CommandLine.arguments[2] == "fullbleed"
let inset: CGFloat = fullBleed ? 0 : 100
let rect = NSRect(x: inset, y: inset, width: size - 2 * inset, height: size - 2 * inset)
let tile = fullBleed ? NSBezierPath(rect: rect) : NSBezierPath(roundedRect: rect, xRadius: 185, yRadius: 185)
NSGradient(colors: [
    NSColor(srgbRed: 0.11, green: 0.06, blue: 0.20, alpha: 1),
    NSColor(srgbRed: 0.26, green: 0.13, blue: 0.42, alpha: 1),
    NSColor(srgbRed: 0.40, green: 0.22, blue: 0.62, alpha: 1),
])!.draw(in: tile, angle: 60)

NSGraphicsContext.saveGraphicsState()
tile.addClip()
NSGradient(colors: [NSColor(white: 1, alpha: 0), NSColor(white: 1, alpha: 0.10)])!
    .draw(in: NSRect(x: rect.minX, y: rect.midY, width: rect.width, height: rect.height / 2), angle: 90)
NSGraphicsContext.restoreGraphicsState()

let accent = NSColor(srgbRed: 0.86, green: 0.76, blue: 1.0, alpha: 1)
let pulse = NSBezierPath()
let y0: CGFloat = 470
pulse.move(to: NSPoint(x: 210, y: y0))
pulse.line(to: NSPoint(x: 390, y: y0))
pulse.line(to: NSPoint(x: 450, y: y0 + 90))
pulse.line(to: NSPoint(x: 530, y: y0 - 190))
pulse.line(to: NSPoint(x: 610, y: y0 + 260))
pulse.line(to: NSPoint(x: 670, y: y0))
pulse.line(to: NSPoint(x: 814, y: y0))
pulse.lineWidth = 46
pulse.lineCapStyle = .round
pulse.lineJoinStyle = .round
let shadow = NSShadow()
shadow.shadowColor = NSColor(srgbRed: 0.75, green: 0.55, blue: 1.0, alpha: 0.8)
shadow.shadowBlurRadius = 40
shadow.set()
accent.setStroke()
pulse.stroke()

NSColor.white.setFill()
NSBezierPath(ovalIn: NSRect(x: 814 - 34, y: y0 - 34, width: 68, height: 68)).fill()

NSGraphicsContext.restoreGraphicsState()
try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: out))
