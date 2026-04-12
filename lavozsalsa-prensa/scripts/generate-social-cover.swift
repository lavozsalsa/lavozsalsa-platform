#!/usr/bin/swift

import AppKit
import Foundation
import ImageIO
import UniformTypeIdentifiers

struct Arguments {
  let input: String
  let output: String
  let title: String
  let subtitle: String
}

enum CoverError: Error, CustomStringConvertible {
  case invalidArguments
  case sourceNotFound(String)
  case cannotLoadImage(String)
  case cannotCreateDestination(String)
  case cannotEncodeImage

  var description: String {
    switch self {
    case .invalidArguments:
      return "Uso: swift scripts/generate-social-cover.swift --input /ruta/imagen.jpg --output /ruta/salida.jpg --title \"Titular\" [--subtitle \"Pulso Salsero\"]"
    case .sourceNotFound(let path):
      return "No se encontro la imagen fuente: \(path)"
    case .cannotLoadImage(let path):
      return "No se pudo cargar la imagen: \(path)"
    case .cannotCreateDestination(let path):
      return "No se pudo crear el archivo de salida: \(path)"
    case .cannotEncodeImage:
      return "No se pudo codificar la imagen final."
    }
  }
}

func parseArguments() throws -> Arguments {
  let args = Array(CommandLine.arguments.dropFirst())
  var input: String?
  var output: String?
  var title: String?
  var subtitle = "Pulso Salsero"

  var index = 0
  while index < args.count {
    switch args[index] {
    case "--input":
      index += 1
      if index < args.count { input = args[index] }
    case "--output":
      index += 1
      if index < args.count { output = args[index] }
    case "--title":
      index += 1
      if index < args.count { title = args[index] }
    case "--subtitle":
      index += 1
      if index < args.count { subtitle = args[index] }
    default:
      break
    }
    index += 1
  }

  guard let input, let output, let title else {
    throw CoverError.invalidArguments
  }

  return Arguments(input: input, output: output, title: title, subtitle: subtitle)
}

func registerCustomFonts(relativeTo root: URL) {
  let fontPaths = [
    "assets/fonts/GothamBlack.otf",
    "assets/fonts/GothamBold.ttf",
    "assets/fonts/GothamMedium.ttf",
  ]

  fontPaths.forEach { relativePath in
    let fontURL = root.appendingPathComponent(relativePath)
    CTFontManagerRegisterFontsForURL(fontURL as CFURL, .process, nil)
  }
}

func bestFont(nameCandidates: [String], size: CGFloat, weight: NSFont.Weight = .bold) -> NSFont {
  for candidate in nameCandidates {
    if let font = NSFont(name: candidate, size: size) {
      return font
    }
  }

  return NSFont.systemFont(ofSize: size, weight: weight)
}

func drawWrappedText(_ text: NSString, in rect: NSRect, titleFont: NSFont, subtitle: String) {
  let paragraph = NSMutableParagraphStyle()
  paragraph.lineBreakMode = .byWordWrapping
  paragraph.alignment = .left

  let titleAttributes: [NSAttributedString.Key: Any] = [
    .font: titleFont,
    .foregroundColor: NSColor.white,
    .paragraphStyle: paragraph,
    .kern: -1.2,
  ]

  text.draw(
    with: rect,
    options: [.usesLineFragmentOrigin, .usesFontLeading],
    attributes: titleAttributes
  )

  let subtitleFont = bestFont(
    nameCandidates: ["Gotham-Bold", "Gotham Bold", "AvenirNext-DemiBold"],
    size: 24,
    weight: .semibold
  )
  let subtitleAttributes: [NSAttributedString.Key: Any] = [
    .font: subtitleFont,
    .foregroundColor: NSColor(calibratedWhite: 1.0, alpha: 0.9),
    .kern: 2.8,
  ]

  (subtitle.uppercased() as NSString).draw(
    at: NSPoint(x: rect.minX, y: rect.maxY + 26),
    withAttributes: subtitleAttributes
  )
}

func renderCover(source: NSImage, title: String, subtitle: String) throws -> CGImage {
  let canvasSize = NSSize(width: 1200, height: 630)
  guard
    let cgContext = CGContext(
      data: nil,
      width: Int(canvasSize.width),
      height: Int(canvasSize.height),
      bitsPerComponent: 8,
      bytesPerRow: 0,
      space: CGColorSpaceCreateDeviceRGB(),
      bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
    )
  else {
    throw CoverError.cannotEncodeImage
  }

  NSGraphicsContext.saveGraphicsState()
  NSGraphicsContext.current = NSGraphicsContext(cgContext: cgContext, flipped: false)

  let sourceSize = source.size
  let scale = max(canvasSize.width / sourceSize.width, canvasSize.height / sourceSize.height)
  let drawSize = NSSize(width: sourceSize.width * scale, height: sourceSize.height * scale)
  let drawRect = NSRect(
    x: (canvasSize.width - drawSize.width) / 2,
    y: (canvasSize.height - drawSize.height) / 2,
    width: drawSize.width,
    height: drawSize.height
  )

  source.draw(in: drawRect, from: .zero, operation: .copy, fraction: 1.0)

  NSColor(calibratedWhite: 0.0, alpha: 0.12).setFill()
  NSBezierPath(rect: NSRect(origin: .zero, size: canvasSize)).fill()

  let gradient = NSGradient(colors: [
    NSColor(calibratedWhite: 0.0, alpha: 0.86),
    NSColor(calibratedWhite: 0.0, alpha: 0.46),
    NSColor(calibratedWhite: 0.0, alpha: 0.04),
  ])
  gradient?.draw(
    in: NSRect(x: 0, y: 0, width: canvasSize.width, height: canvasSize.height * 0.72),
    angle: 90
  )

  let sidePadding: CGFloat = 68
  let textWidth = canvasSize.width - (sidePadding * 2)
  let maxTextHeight: CGFloat = 210
  let text = title as NSString

  var chosenFont = bestFont(
    nameCandidates: ["Gotham-Black", "Gotham Black", "Arial-BoldMT"],
    size: 84,
    weight: .heavy
  )

  let paragraph = NSMutableParagraphStyle()
  paragraph.lineBreakMode = .byWordWrapping

  for size in stride(from: 84, through: 54, by: -2) {
    let testFont = bestFont(
      nameCandidates: ["Gotham-Black", "Gotham Black", "Arial-BoldMT"],
      size: CGFloat(size),
      weight: .heavy
    )
    let attributes: [NSAttributedString.Key: Any] = [
      .font: testFont,
      .paragraphStyle: paragraph,
      .kern: -1.2,
    ]
    let bounds = text.boundingRect(
      with: NSSize(width: textWidth, height: 1000),
      options: [.usesLineFragmentOrigin, .usesFontLeading],
      attributes: attributes
    )

    if bounds.height <= maxTextHeight {
      chosenFont = testFont
      break
    }
  }

  let measureAttributes: [NSAttributedString.Key: Any] = [
    .font: chosenFont,
    .paragraphStyle: paragraph,
    .kern: -1.2,
  ]
  let titleBounds = text.boundingRect(
    with: NSSize(width: textWidth, height: 1000),
    options: [.usesLineFragmentOrigin, .usesFontLeading],
    attributes: measureAttributes
  )

  let textRect = NSRect(
    x: sidePadding,
    y: 56,
    width: textWidth,
    height: ceil(titleBounds.height)
  )

  drawWrappedText(text, in: textRect, titleFont: chosenFont, subtitle: subtitle)
  NSGraphicsContext.restoreGraphicsState()

  guard let image = cgContext.makeImage() else {
    throw CoverError.cannotEncodeImage
  }

  return image
}

func saveJPEG(image: CGImage, to outputURL: URL, title: String, subtitle: String) throws {
  try FileManager.default.createDirectory(at: outputURL.deletingLastPathComponent(), withIntermediateDirectories: true)

  guard let destination = CGImageDestinationCreateWithURL(outputURL as CFURL, UTType.jpeg.identifier as CFString, 1, nil) else {
    throw CoverError.cannotCreateDestination(outputURL.path)
  }

  let properties: [CFString: Any] = [
    kCGImageDestinationLossyCompressionQuality: 0.82,
    kCGImagePropertyTIFFDictionary: [
      kCGImagePropertyTIFFArtist: "La Voz Salsa",
      kCGImagePropertyTIFFSoftware: "Pulso Salsero Cover Generator",
      kCGImagePropertyTIFFImageDescription: title,
    ],
    kCGImagePropertyIPTCDictionary: [
      kCGImagePropertyIPTCObjectName: title,
      kCGImagePropertyIPTCCaptionAbstract: "\(title) | \(subtitle)",
      kCGImagePropertyIPTCSource: "La Voz Salsa",
    ],
  ]

  CGImageDestinationAddImage(destination, image, properties as CFDictionary)

  guard CGImageDestinationFinalize(destination) else {
    throw CoverError.cannotEncodeImage
  }
}

do {
  let arguments = try parseArguments()
  let inputURL = URL(fileURLWithPath: arguments.input)
  let outputURL = URL(fileURLWithPath: arguments.output)

  guard FileManager.default.fileExists(atPath: inputURL.path) else {
    throw CoverError.sourceNotFound(inputURL.path)
  }

  let scriptURL = URL(fileURLWithPath: CommandLine.arguments[0]).deletingLastPathComponent().deletingLastPathComponent()
  registerCustomFonts(relativeTo: scriptURL)

  guard let source = NSImage(contentsOf: inputURL) else {
    throw CoverError.cannotLoadImage(inputURL.path)
  }

  let rendered = try renderCover(source: source, title: arguments.title, subtitle: arguments.subtitle)
  try saveJPEG(image: rendered, to: outputURL, title: arguments.title, subtitle: arguments.subtitle)

  print("Cover lista en \(outputURL.path)")
} catch let error as CoverError {
  fputs("\(error.description)\n", stderr)
  exit(1)
} catch {
  fputs("Error inesperado: \(error.localizedDescription)\n", stderr)
  exit(1)
}
