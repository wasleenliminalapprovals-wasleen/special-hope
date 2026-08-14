/**
 * get-webp-dims.mjs
 *
 * Prints width × height for every WebP under a directory (defaults to the
 * locked blog asset set) so `next/image` can be wired with explicit
 * width/height (plan §9 Phase 0.3 "dims gate").
 *
 * Usage:
 *   node scripts/get-webp-dims.mjs [dir]
 *
 * Example:
 *   node scripts/get-webp-dims.mjs public/images/dubai-approval-consultants-Blogs
 */

import { readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const DEFAULT_DIR = "public/images/dubai-approval-consultants-Blogs";
const target = process.argv[2] ?? DEFAULT_DIR;

/** Recursively collect every file path under a directory. */
function collectFiles(dir) {
  let out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out = out.concat(collectFiles(full));
    } else if (/\.webp$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const files = collectFiles(target).sort();
if (files.length === 0) {
  console.error(`No .webp files found under "${target}".`);
  process.exit(1);
}

let widest = { file: "", width: 0 };
const rows = [];

for (const file of files) {
  const { width, height } = await sharp(file).metadata();
  const rel = relative(fileURLToPath(new URL("..", import.meta.url)), file).split(sep).join("/");
  rows.push({ rel, width, height });
  if (width > widest.width) widest = { file: rel, width, height };
}

const w = Math.max(...rows.map((r) => r.rel.length));
console.log("\nWEBP DIMENSIONS\n" + "=".repeat(60));
for (const r of rows) {
  console.log(`${r.rel.padEnd(w)}  ${String(r.width).padStart(4)} × ${String(r.height).padStart(4)}`);
}
console.log("=".repeat(60));
console.log(`Total: ${rows.length} files.`);
console.log(
  `Widest: ${widest.file} (${widest.width} × ${widest.height})${widest.width >= 1200 ? " — OK (hero-ready ≥1200px)" : " — WARNING: below 1200px hero threshold"}`
);
