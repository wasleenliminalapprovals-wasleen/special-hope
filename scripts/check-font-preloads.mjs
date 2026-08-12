/**
 * check-font-preloads.mjs
 *
 * Post-build verification for the manual font preloads in src/app/layout.tsx.
 *
 * Next.js 15 does NOT emit <link rel="preload"> for next/font files when the
 * @font-face CSS lives in a shared external chunk (see the layout.tsx comment:
 * fonts.ts is imported by BOTH the EN and AR layouts). We hand-preload the font
 * files, so this script guards against content-hash drift:
 *
 *   - ERROR (exit 1): a preloaded woff2 file does not exist in
 *                     .next/static/media/ — a stale preload would request a
 *                     404 and harm LCP.
 *   - WARN  (exit 0): a preloaded file exists but is no longer referenced by
 *                     any built CSS — the hash has drifted and the preload is
 *                     now redundant or targeting an unneeded subset.
 *
 * Usage:  node scripts/check-font-preloads.mjs    (run after `npm run build`)
 *         npm run check:fonts
 */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const LAYOUT = resolve("src/app/layout.tsx");
const MEDIA_DIR = resolve(".next/static/media");
const CSS_DIR = resolve(".next/static/css");

if (!existsSync(LAYOUT)) {
  console.error("[check:fonts] src/app/layout.tsx not found — run from the project root.");
  process.exit(1);
}

const layout = readFileSync(LAYOUT, "utf8");

// Extract every manual preload href targeting /_next/static/media/*.woff2
const hrefs = [
  ...layout.matchAll(/href="\/_next\/static\/media\/([a-f0-9]+-s(?:\.p)?\.woff2)"/g),
].map((m) => m[1]);

if (hrefs.length === 0) {
  console.log("[check:fonts] No manual font preloads found in layout.tsx — nothing to check.");
  process.exit(0);
}

// All woff2 files produced by the current build
const builtFiles = existsSync(MEDIA_DIR) ? readdirSync(MEDIA_DIR) : [];

// Every woff2 file referenced by the built CSS (@font-face src)
const cssRefs = new Set();
if (existsSync(CSS_DIR)) {
  for (const file of readdirSync(CSS_DIR)) {
    if (file.endsWith(".css")) {
      const css = readFileSync(resolve(CSS_DIR, file), "utf8");
      for (const ref of css.matchAll(/static\/media\/([a-f0-9]+-s(?:\.p)?\.woff2)/g)) {
        cssRefs.add(ref[1]);
      }
    }
  }
}

let errors = 0;
let warnings = 0;

for (const file of hrefs) {
  const exists = builtFiles.includes(file);
  const inCss = cssRefs.has(file);

  if (!exists) {
    errors += 1;
    console.error(`[check:fonts] ERROR  preload ${file} does not exist in .next/static/media/`);
  } else if (!inCss) {
    warnings += 1;
    console.warn(`[check:fonts] WARN   preload ${file} exists but is NOT referenced by any built CSS — hash may have drifted`);
  } else {
    console.log(`[check:fonts] OK     ${file}`);
  }
}

if (errors > 0) {
  console.error(
    `[check:fonts] ${errors} error(s), ${warnings} warning(s). Re-run 'npm run build', then re-derive the hashes from .next/static/css/*.css and update the <link rel="preload"> hrefs in src/app/layout.tsx.`
  );
  process.exit(1);
}

if (warnings > 0) {
  console.warn(`[check:fonts] ${warnings} warning(s) — verify the preload targets in src/app/layout.tsx.`);
} else {
  console.log("[check:fonts] All font preloads are present in the build and referenced by the built CSS.");
}

process.exit(0);
