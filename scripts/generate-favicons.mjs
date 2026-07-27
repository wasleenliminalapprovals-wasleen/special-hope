/**
 * Favicon & App Icon Generator
 *
 * Reads public/favicon.svg and generates all required raster formats:
 * - public/favicon-96x96.png    (96×96)
 * - public/apple-icon.png        (180×180)
 * - public/web-app-manifest-192x192.png  (192×192)
 * - public/web-app-manifest-512x512.png  (512×512)
 * - public/favicon.ico           (48×48 ICO — uses a PNG with .ico extension as fallback)
 *
 * Run: node scripts/generate-favicons.mjs
 */

import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, "../public");
const SVG_PATH = resolve(PUBLIC_DIR, "favicon.svg");

const SIZES = [
  { name: "favicon-96x96.png", size: 96 },
  { name: "apple-icon.png", size: 180 },
  { name: "web-app-manifest-192x192.png", size: 192 },
  { name: "web-app-manifest-512x512.png", size: 512 },
];

async function main() {
  const svgBuffer = readFileSync(SVG_PATH);

  console.log(`Reading ${SVG_PATH}`);
  console.log(`SVG size: ${svgBuffer.length} bytes`);

  for (const { name, size } of SIZES) {
    const outputPath = resolve(PUBLIC_DIR, name);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`✅ Generated ${name} (${size}×${size})`);
  }

  // Generate favicon.ico — Since sharp doesn't support ICO natively,
  // we create a 48x48 PNG as favicon.ico. Most modern browsers
  // accept PNG data in .ico files or fall back to favicon.svg.
  const icoPath = resolve(PUBLIC_DIR, "favicon.ico");
  await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toFile(icoPath);
  console.log(`✅ Generated favicon.ico (48×48 PNG-based)`);

  console.log("\n🎉 All favicon files generated successfully.");
}

main().catch((err) => {
  console.error("Favicon generation failed:", err);
  process.exit(1);
});
