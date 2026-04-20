import AppKit
import CoreText
import Foundation

let fm = FileManager.default
let root = URL(fileURLWithPath: "/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-comercial", isDirectory: true)
let assets = root.appendingPathComponent("assets", isDirectory: true)
let output = assets.appendingPathComponent("social-preview-whatsapp.png")

let width: CGFloat = 1200
let height: CGFloat = 630
let canvasRect = CGRect(x: 0, y: 0, width: width, height: height)

func registerFont(_ name: String) {
  let url = assets.appendingPathComponent("fonts/\(name)")
  guard fm.fileExists(atPath: url.path) else { return }
  CTFontManagerRegisterFontsForURL(url as CFURL, .process, nil)
}

registerFont("GothamMedium.ttf")
registerFont("GothamBlack.otf")

let heroURL = assets.appendingPathComponent("hero-portada-lavozsalsa.jpg")
let wordmarkURL = assets.appendingPathComponent("logo-wordmark-lavozsalsa-white.png")

guard
  let heroImage = NSImage(contentsOf: heroURL),
  let wordmarkImage = NSImage(contentsOf: wordmarkURL)
else {
  fputs("No se pudieron cargar los assets base.\n", stderr)
  exit(1)
}

func drawAspectFill(_ image: NSImage, in rect: CGRect) {
  let imgSize = image.size
  let imageRatio = imgSize.width / imgSize.height
  let rectRatio = rect.width / rect.height

  var drawRect = rect
  if imageRatio > rectRatio {
    let scaledWidth = rect.height * imageRatio
    drawRect.origin.x = rect.minX - (scaledWidth - rect.width) / 2
    drawRect.size.width = scaledWidth
  } else {
    let scaledHeight = rect.width / imageRatio
    drawRect.origin.y = rect.minY - (scaledHeight - rect.height) / 2
    drawRect.size.height = scaledHeight
  }

  image.draw(in: drawRect, from: .zero, operation: .sourceOver, fraction: 1)
}

let rep = NSBitmapImageRep(
  bitmapDataPlanes: nil,
  pixelsWide: Int(width),
  pixelsHigh: Int(height),
  bitsPerSample: 8,
  samplesPerPixel: 4,
  hasAlpha: true,
  isPlanar: false,
  colorSpaceName: .deviceRGB,
  bytesPerRow: 0,
  bitsPerPixel: 0
)!

NSGraphicsContext.saveGraphicsState()
guard let context = NSGraphicsContext(bitmapImageRep: rep) else {
  fputs("No se pudo crear el contexto gráfico.\n", stderr)
  exit(1)
}
NSGraphicsContext.current = context

context.cgContext.translateBy(x: 0, y: height)
context.cgContext.scaleBy(x: 1, y: -1)

NSColor(calibratedRed: 0.97, green: 0.10, blue: 0.10, alpha: 1).setFill()
canvasRect.fill()

drawAspectFill(heroImage, in: canvasRect)

let overlay = NSGradient(colors: [
  NSColor(calibratedRed: 1.0, green: 0.14, blue: 0.16, alpha: 0.18),
  NSColor(calibratedRed: 0.38, green: 0.02, blue: 0.04, alpha: 0.30),
])!
overlay.draw(in: canvasRect, angle: 0)

let darkGradient = NSGradient(colors: [
  NSColor(calibratedWhite: 0, alpha: 0.0),
  NSColor(calibratedWhite: 0, alpha: 0.18),
])!
darkGradient.draw(in: CGRect(x: width * 0.55, y: 0, width: width * 0.45, height: height), angle: 0)

let wordmarkRect = CGRect(x: 44, y: 62, width: 258, height: 58)
wordmarkImage.draw(in: wordmarkRect, from: .zero, operation: .sourceOver, fraction: 1)

let blackFont = NSFont(name: "Gotham-Black", size: 98) ?? NSFont.systemFont(ofSize: 98, weight: .black)
let mediumFont = NSFont(name: "Gotham-Medium", size: 23) ?? NSFont.systemFont(ofSize: 23, weight: .medium)
let footerFont = NSFont(name: "Gotham-Medium", size: 18) ?? NSFont.systemFont(ofSize: 18, weight: .medium)

let paragraph = NSMutableParagraphStyle()
paragraph.lineBreakMode = .byWordWrapping

let titleAttributes: [NSAttributedString.Key: Any] = [
  .font: blackFont,
  .foregroundColor: NSColor.white,
  .paragraphStyle: paragraph,
]

let subtitleAttributes: [NSAttributedString.Key: Any] = [
  .font: mediumFont,
  .foregroundColor: NSColor.white,
  .paragraphStyle: paragraph,
]

let footerAttributes: [NSAttributedString.Key: Any] = [
  .font: footerFont,
  .foregroundColor: NSColor(calibratedWhite: 1, alpha: 0.92),
]

let title = NSString(string: "Media Kit\n2026")
title.draw(in: CGRect(x: 44, y: 140, width: 480, height: 220), withAttributes: titleAttributes)

let subtitle = NSString(string: "Propuesta comercial multiplataforma para marcas.")
subtitle.draw(in: CGRect(x: 44, y: 360, width: 620, height: 40), withAttributes: subtitleAttributes)

let footerItems = ["Radio online", "Live streaming", "App", "Web", "Redes", "Eventos"]
var footerX: CGFloat = 44
let footerY: CGFloat = 530

for (index, item) in footerItems.enumerated() {
  let text = NSString(string: item)
  let size = text.size(withAttributes: footerAttributes)
  text.draw(at: CGPoint(x: footerX, y: footerY), withAttributes: footerAttributes)
  footerX += size.width

  if index < footerItems.count - 1 {
    let bullet = NSString(string: " • ")
    let bulletAttrs: [NSAttributedString.Key: Any] = [
      .font: footerFont,
      .foregroundColor: NSColor(calibratedWhite: 1, alpha: 0.48),
    ]
    bullet.draw(at: CGPoint(x: footerX, y: footerY), withAttributes: bulletAttrs)
    footerX += bullet.size(withAttributes: bulletAttrs).width
  }
}

NSGraphicsContext.restoreGraphicsState()

guard let pngData = rep.representation(using: .png, properties: [:]) else {
  fputs("No se pudo exportar el PNG.\n", stderr)
  exit(1)
}

do {
  try pngData.write(to: output)
  print("Generado: \(output.path)")
} catch {
  fputs("No se pudo guardar el PNG: \(error)\n", stderr)
  exit(1)
}
