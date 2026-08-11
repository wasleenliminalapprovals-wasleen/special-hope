/**
 * Wasleen Logo Export — text-to-path outlining + PNG rasterization.
 * Standalone utility. Lives in /logo-export only — does NOT touch the website.
 *
 * Outputs:
 *   logo-emblem.svg / .png   — emblem only (2048x2048)
 *   logo-full.svg / .png     — emblem + wordmark (4000x800)
 *
 * Geometry and colors match the LOCKED site assets:
 *   - Emblem: src/components/logo/WasleenIcon.tsx (viewBox 0 0 200 200)
 *   - Wordmark proportions: src/components/logo/WasleenLogo.tsx (title 34% of
 *     emblem, subtitle 17%, gap 28%)
 */

import opentype from "opentype.js";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "node:fs";

const FONT_800 = "./montserrat-v31-latin-800.ttf"; // WASLEEN LIMINAL (ExtraBold)
const FONT_700 = "./montserrat-v31-latin-700.ttf"; // APPROVAL CONSULTANTS (Bold)

const font800 = opentype.parse(readFileSync(FONT_800));
const font700 = opentype.parse(readFileSync(FONT_700));

const UAE_RED = "#C8102E";
const UAE_GREEN = "#00843D";
const BRAND_BLUE = "#004080";
const BLACK = "#000000";

/**
 * Convert a string of glyphs into an SVG path 'd' string at baseline (x, y),
 * applying kerning and per-glyph letter-spacing manually for full control.
 */
function outlineText(font, text, x, y, fontSize, letterSpacing) {
  const glyphs = font.stringToGlyphs(text);
  const scale = fontSize / font.unitsPerEm;
  let cursor = x;
  let prev = null;
  let d = "";
  for (const glyph of glyphs) {
    if (prev !== null) {
      cursor += font.getKerningValue(prev, glyph) * scale;
    }
    const gp = glyph.getPath(cursor, y, fontSize, false);
    d += gp.toPathData(2);
    cursor += glyph.advanceWidth * scale;
    cursor += letterSpacing;
    prev = glyph;
  }
  return { d, width: cursor - x };
}

/* ------------------------------------------------------------------ */
/*  Emblem geometry (byte-for-byte with WasleenIcon.tsx)               */
/* ------------------------------------------------------------------ */
const EMBLEM_SVG = `  <g>
    <rect x="15" y="15" width="170" height="170" rx="32" fill="none" stroke="${BRAND_BLUE}" stroke-width="5"/>
    <path d="M50,50 L150,50 L150,100 L115,100 L115,150 L50,150" fill="none" stroke="${BRAND_BLUE}" stroke-width="6" stroke-linejoin="round"/>
    <line x1="90" y1="50" x2="90" y2="100" stroke="${BLACK}" stroke-width="4"/>
    <line x1="65" y1="150" x2="65" y2="130" stroke="${UAE_RED}" stroke-width="4"/>
    <path d="M65,130 A20,20 0 0 1 85,150" fill="none" stroke="${UAE_RED}" stroke-width="2.5"/>
    <line x1="120" y1="45" x2="120" y2="55" stroke="${UAE_GREEN}" stroke-width="3"/>
    <line x1="130" y1="45" x2="130" y2="55" stroke="${UAE_GREEN}" stroke-width="3"/>
  </g>`;

/* ------------------------------------------------------------------ */
/*  File 1 — Emblem only (2048x2048)                                   */
/* ------------------------------------------------------------------ */
const emblemSvg = `<svg
  width="2048"
  height="2048"
  viewBox="0 0 200 200"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-label="Wasleen Approvals emblem"
>
  <title>Wasleen Approvals</title>
${EMBLEM_SVG}
</svg>
`;

/* ------------------------------------------------------------------ */
/*  File 2 — Full logo (emblem + outlined wordmark)                    */
/*  Header proportions: title 34% of emblem, subtitle 17%, gap 28%     */
/* ------------------------------------------------------------------ */
const GAP = 200 * 0.28; // 56
const TEXT_X = 200 + GAP; // 256
const TITLE_FONT = 200 * 0.34; // 68
const SUBTITLE_FONT = 200 * 0.17; // 34
const TITLE_LS = 2;
const SUBTITLE_LS = 12;
const TITLE_BASELINE = 82;
const SUBTITLE_BASELINE = 152;

const titleRed = outlineText(font800, "WASLEEN ", TEXT_X, TITLE_BASELINE, TITLE_FONT, TITLE_LS);
const titleGreen = outlineText(font800, "LIMINAL", TEXT_X + titleRed.width, TITLE_BASELINE, TITLE_FONT, TITLE_LS);
const subtitle = outlineText(font700, "APPROVAL CONSULTANTS", TEXT_X, SUBTITLE_BASELINE, SUBTITLE_FONT, SUBTITLE_LS);

const fullSvg = `<svg
  width="4000"
  height="800"
  viewBox="0 0 1000 200"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-label="Wasleen Liminal Approval Consultants logo"
>
  <title>Wasleen Liminal Approval Consultants</title>
${EMBLEM_SVG}
  <g transform="translate(${TEXT_X},0)">
    <path d="${titleRed.d}" fill="${UAE_RED}"/>
    <path d="${titleGreen.d}" fill="${UAE_GREEN}"/>
    <path d="${subtitle.d}" fill="${BLACK}"/>
  </g>
</svg>
`;

/* ------------------------------------------------------------------ */
/*  Write SVG + render PNG                                             */
/* ------------------------------------------------------------------ */
function writePng(name, svgString) {
  const resvg = new Resvg(svgString, { background: "rgba(0,0,0,0)" });
  const png = resvg.render().asPng();
  writeFileSync(name, png);
}

writeFileSync("logo-emblem.svg", emblemSvg);
writeFileSync("logo-full.svg", fullSvg);
writePng("logo-emblem.png", emblemSvg);
writePng("logo-full.png", fullSvg);

/* Width diagnostics — ensure nothing is clipped inside the 1000-wide canvas */
const titleEnd = TEXT_X + titleRed.width + titleGreen.width;
const subtitleEnd = TEXT_X + subtitle.width;
console.log("TITLE  width:", Math.round(titleRed.width + titleGreen.width), "end x:", Math.round(titleEnd), "/ 1000");
console.log("SUB    width:", Math.round(subtitle.width), "end x:", Math.round(subtitleEnd), "/ 1000");
console.log("Done. Wrote logo-emblem.svg/png + logo-full.svg/png");
