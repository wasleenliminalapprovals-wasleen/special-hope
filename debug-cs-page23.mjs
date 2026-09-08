// Verify Page 23 (LML/QTN/1135) renders on the dev server (EN + AR).
// slug: dda-damac-approval-dubai
const BASE = "http://localhost:3100";
const slug = "dda-damac-approval-dubai";
const paths = [
  `/case-studies/${slug}`,
  `/ar/case-studies/${slug}`,
  "/case-studies",
  "/ar/case-studies",
];

// Key content checks (must appear in the SSR HTML of each path)
const checks = {
  [`/case-studies/${slug}`]: [
    "DDA & Damac Approval in Dubai | Wasleen Approvals", // <title>/og
    "AED 17,000 DDA & Damac approval quote for a property in Dubai", // meta description
    "DDA & Damac Approval for a Residential Property in Dubai", // H1 (projectTitle)
    "LML/QTN/1135",
    "2 July 2026",
    "Dubai Development Authority",
    "Damac",
    "AED 17,000",
    "Confidential client — Residential property owner in a Damac-managed community",
    "green files",
    "work permit",
    "Residential",
  ],
  [`/ar/case-studies/${slug}`]: [
    "موافقة هيئة دبي التنموية (DDA) وداماك لعقار سكني في دبي", // arTitle / H1
    "عرض سعر لموافقة DDA و داماك لعقار سكني في دبي بقيمة 17,000 درهم إماراتي", // arDescription
    "LML/QTN/1135",
    "2 يوليو 2026",
    "17,000 درهم إماراتي",
    "هيئة دبي التنموية (DDA)",
    "شهادة عدم ممانعة",
    "تصريح العمل",
    "التفتيش النهائي",
    "الملفات الخضراء",
    "جمشيد خالد",
    "كافيا راماتشاندران",
  ],
  "/case-studies": [slug],
  "/ar/case-studies": [slug],
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Decode HTML entities AND RSC Flight payload escapes so that needles with
// `&` match all three render forms: `&` (visible HTML), plain `&`
// (JSON-LD scripts), and `\u0026` / `\\u0026` (inside the RSC Flight payload).
function decodeHtml(html) {
  return html
    .replace(/\\\\u0026/g, "&") // RSC payload double-escaped form (2 backslashes)
    .replace(/\\u0026/g, "&") // RSC payload single-escaped form (1 backslash)
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/'/g, "'")
    .replace(/'/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#x3D;/g, "=");
}

async function waitReady() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(BASE + "/case-studies");
      if (res.ok) return true;
    } catch {
      /* not up yet */
    }
    await sleep(2000);
  }
  return false;
}

const ready = await waitReady();
if (!ready) {
  console.log("DEV SERVER NOT READY after retries");
  process.exit(1);
}
console.log("DEV SERVER READY\n");

for (const p of paths) {
  try {
    const res = await fetch(BASE + p);
    if (!res.ok) {
      console.log(`${p} -> HTTP ${res.status}`);
      continue;
    }
    const h = await res.text();
    const title = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
    const og = (h.match(/property="og:title" content="([^"]*)"/) || [])[1] || "";
    const canonical = (h.match(/rel="canonical" href="([^"]*)"/) || [])[1] || "";
    const hasH1 = /<h1[\s>]/.test(h);
    const hasJsonLd = (h.match(/application\/ld\+json/g) || []).length;

    console.log(`PATH: ${p}`);
    console.log(`  HTTP ${res.status} | title(${title.length}): ${title}`);
    console.log(`  OG(${og.length}): ${og}`);
    console.log(`  canonical: ${canonical}`);
    console.log(`  h1: ${hasH1} | jsonld blocks: ${hasJsonLd}`);

    // run content checks against the fully-decoded HTML
    const decoded = decodeHtml(h);
    const expected = checks[p] || [];
    const missing = [];
    for (const needle of expected) {
      if (!decoded.includes(needle)) missing.push(needle);
    }
    if (missing.length === 0) {
      console.log(`  content: ALL ${expected.length} checks PASS`);
    } else {
      console.log(`  content: ${missing.length} MISSING ->`);
      for (const m of missing) console.log(`    - ${m}`);
    }
    console.log("");
  } catch (e) {
    console.log(`${p} -> ERROR ${e.message}`);
  }
}
