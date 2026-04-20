import AppKit
import CoreImage
import CoreImage.CIFilterBuiltins
import Foundation

guard CommandLine.arguments.count >= 3 else {
  fputs("Usage: swift enhance_social_preview.swift <input> <output>\n", stderr)
  exit(1)
}

let inputPath = CommandLine.arguments[1]
let outputPath = CommandLine.arguments[2]

guard let inputImage = NSImage(contentsOfFile: inputPath) else {
  fputs("Could not load input image.\n", stderr)
  exit(1)
}

guard
  let tiffData = inputImage.tiffRepresentation,
  let bitmapImage = NSBitmapImageRep(data: tiffData),
  let ciInput = CIImage(bitmapImageRep: bitmapImage)
else {
  fputs("Could not decode input image.\n", stderr)
  exit(1)
}

let colorControls = CIFilter.colorControls()
colorControls.inputImage = ciInput
colorControls.saturation = 1.18
colorControls.contrast = 1.1
colorControls.brightness = 0.01

let vibrance = CIFilter.vibrance()
vibrance.inputImage = colorControls.outputImage
vibrance.amount = 0.2

let highlightShadow = CIFilter.highlightShadowAdjust()
highlightShadow.inputImage = vibrance.outputImage
highlightShadow.highlightAmount = 0.78
highlightShadow.shadowAmount = 0.2

guard let outputImage = highlightShadow.outputImage else {
  fputs("Could not render filtered image.\n", stderr)
  exit(1)
}

let context = CIContext(options: [
  .useSoftwareRenderer: false
])

guard let cgImage = context.createCGImage(outputImage, from: ciInput.extent) else {
  fputs("Could not create CGImage.\n", stderr)
  exit(1)
}

let rep = NSBitmapImageRep(cgImage: cgImage)
guard let pngData = rep.representation(using: .png, properties: [:]) else {
  fputs("Could not encode PNG.\n", stderr)
  exit(1)
}

let outputURL = URL(fileURLWithPath: outputPath)
try pngData.write(to: outputURL)
print("Wrote enhanced preview to \(outputPath)")
