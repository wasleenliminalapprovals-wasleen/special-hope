# Law No. (3) of 2026 — Completion Prompt Pack

**Purpose:** Close the 5 audit gaps from [`law-3-2026-content-cluster-plan.md`](plans/law-3-2026-content-cluster-plan.md) at the highest possible quality, and generate the 12 bespoke topical images with Google Nano Banana (Gemini 2.5 Flash Image).

**Two deliverables in this file:**
- **Part A — Detailed implementation prompt** (paste to Code mode, one task at a time).
- **Part B — 12-image Nano Banana generation prompt set** (global style system + 12 per-image prompts + tips).

---

# PART A — IMPLEMENTATION PROMPT (for Code mode)

Paste the following block into Code mode. It obeys the project master rules: ONE task at a time, no out-of-scope edits, no locked files, design tokens only, verify after each task.

---

## A.0 Master constraints — read before every task

1. Work **one file, one task at a time**. Finish and verify before moving on. Never modify multiple files in parallel.
2. Do NOT touch locked files: `src/components/logo/WasleenIcon.tsx`, `WasleenLogo.tsx`, `/public/favicon.*`, `/public/manifest.json`, `tailwind.config.ts` tokens.
3. No raw hex colours in components. Tailwind classes only.
4. Every JSON edit must keep the file valid (no trailing commas, escaped quotes). After each JSON task run `npm run build`.
5. Never fabricate figures. Only numbers allowlisted in [`law-3-2026.ts`](src/data/fact-sheets/law-3-2026.ts) may appear.
6. Do not change content of any section/paragraph beyond the exact defect being fixed.
7. After each task, run the listed verification command and confirm it passes before proceeding.

---

## A.1 TASK 1 — Fix meta title & description truncation (MOST IMPORTANT)

### Why
Stored `"…"` (U+2026) truncation is rendered **verbatim into the `<title>` tag** because [`generateMetadata`](src/app/guides/[slug]/page.tsx) passes `pseoPage.metaTitle` through unchanged. This violates §5.1 of the plan (50–60 char titles, 140–160 char descriptions with a number + CTA). Affects both EN and AR, entire pSEO catalog.

### Scope / files
- [`src/data/pseo/pseo-pages.json`](src/data/pseo/pseo-pages.json) — EN `metaTitle`/`metaDescription` (69 hits of `…`) **and** the AR strings inside each inline `"ar"` block.
- [`src/data/pseo/pseo-pages-ar.json`](src/data/pseo/pseo-pages-ar.json) — AR `metaTitle`/`metaDescription` (31 hits of `…`).

### Rules (strict)

**EN `metaTitle`**
- 50–60 characters (counted, not guessed). Never exceed 60.
- Primary keyword at the **exact start**.
- End with brand suffix ` | Wasleen` (or ` | Wasleen Approvals` if it still fits ≤60).
- 100% unique per URL.
- **Must NOT contain `…`.** A title is either complete or it is wrong.

**EN `metaDescription`**
- 140–160 characters.
- Active voice, address intent directly.
- Include **one concrete number** (timeline, fine range, document count).
- End with a clear CTA ("Contact us today", "Get a free quote", "Start your application").
- **Must NOT contain `…`.** Write complete sentences.

**AR `metaTitle`** (in both files)
- ~45–55 characters (Arabic glyphs render ~1.5× wider than Latin).
- Primary keyword at start, end with ` | وسلين للاستشارات`.
- No `…`. Complete native Arabic.

**AR `metaDescription`**
- ~140–160 characters, one concrete number (Arabic-Indic digits), CTA, no `…`.

### Execution protocol
1. Find every occurrence: search both files for `…`. In VS Code the regex `"meta(Title|Description)"\s*:\s*"[^"]*…` finds all.
2. Rewrite **each** occurrence completely. Do not shorten by truncation — write a fresh, complete string that satisfies the rules.
3. Keep already-correct entries untouched (e.g., [`dubai-law-3-2026-complete-guide`](src/data/pseo/pseo-pages.json:12717) and [`law-3-2026-key-changes-explained`](src/data/pseo/pseo-pages.json:13755) are already complete).
4. If an entry has both a top-level EN meta and an inline `ar` meta, fix BOTH.
5. The AR file `pseo-pages-ar.json` is the mirror — its values must not contradict the inline `ar` block in `pseo-pages.json`.

### Concrete before → after examples (use as style template)

**EN title (who-needs)**
- BEFORE: `"Who Needs a Quality and Safety Certific… | Wasleen Approvals"`
- AFTER: `"Who Needs a Quality & Safety Certificate in Dubai | Wasleen"` (58 chars, keyword-led, brand suffix, complete).

**EN description (who-needs)**
- BEFORE: `"...Fines up to AED 1M. Get exper…"`
- AFTER: `"Who must hold the Dubai Quality & Safety Certificate under Law No. 3 of 2026? Buildings over 20 years old qualify. Fines reach AED 1M. Contact us today."`

**AR title (how-to-get)**
- BEFORE: `"كيفية الحصول على شهادة سلامة المباني في… | وسلين للاستشارات"`
- AFTER: `"كيفية الحصول على شهادة جودة وسلامة المباني في دبي | وسلين"`

**AR description (how-to-get)**
- BEFORE: `"...احصل على مساعدة ا…"`
- AFTER: `"دليلك خطوة بخطوة للحصول على شهادة الجودة والسلامة في دبي: الإجراءات والمستندات ورسوم تصل إلى مليون درهم. استشر وسلين للاستشارات اليوم."`

### Verification
- `node -e "const d=require('./src/data/pseo/pseo-pages.json');const a=require('./src/data/pseo/pseo-pages-ar.json');let n=0;const walk=o=>{if(o&&typeof o==='object'){for(const k in o){const v=o[k];if(k==='metaTitle'||k==='metaDescription'){if(typeof v==='string'&&v.includes('…')){console.log('TRUNC',k,v);n++;}}walk(v);}}};walk(d);walk(a);console.log('truncations:',n);"` — expect `truncations: 0`.
- `npm run build` passes with no TypeScript errors.

---

## A.2 TASK 2 — Remove the 3 empty sections

### Scope
[`src/data/pseo/pseo-pages.json`](src/data/pseo/pseo-pages.json) — delete the empty section object `{"heading": "", "blocks": []}` at:
- [`law-3-2026-key-changes-explained`](src/data/pseo/pseo-pages.json:13850) — line 13850
- [`landlord-obligations-building-safety-law-2026`](src/data/pseo/pseo-pages.json:20460) — line 20460
- [`old-vs-new-building-safety-regulations-dubai`](src/data/pseo/pseo-pages.json:23257) — line 23257

### Decision
**Delete** the object (do NOT leave a blank heading). These are stray placeholders, not intended content. Removing them is safe and keeps heading hierarchy clean.

### Also check
- The matching AR entries in [`pseo-pages-ar.json`](src/data/pseo/pseo-pages-ar.json) — if the same `{"heading":"","blocks":[]}` pattern exists there, delete it too.
- Re-run the search for `"heading"\s*:\s*""` across **both** JSON files — expect zero results.

### Verification
- Search both files for `"heading"\s*:\s*""` → **0 results**.
- `npm run build` passes.

---

## A.3 TASK 3 — Fix the Article 16 fact conflicts

### Why
The fact sheet [`law-3-2026.ts`](src/data/fact-sheets/law-3-2026.ts:16) is explicit: Article 16 sets only the **outer range AED 100 – AED 1,000,000**; exact per-violation amounts are delegated to a future Executive Council Chairman resolution and content **must not claim a per-violation schedule**. Three guides violate this.

### Scope — [`src/data/pseo/pseo-pages.json`](src/data/pseo/pseo-pages.json)
1. [`contractor-responsibilities-law-3-2026`](src/data/pseo/pseo-pages.json:19618) — lines 19618–19623: **per-violation fine table** (`Minor AED 100–10,000`, `Moderate AED 10,001–100,000`).
   → **REPLACE** the table with a compliance-first statement: exact amounts await the Executive Council Chairman resolution; only the Article 16 outer range (AED 100 – AED 1,000,000) and the repeat-2-years doubling capped at AED 2,000,000 are fixed by law. Use a `<ul>`/paragraph, not a fake schedule table.
2. [`repeat-violation-penalties-law-3-2026`](src/data/pseo/pseo-pages.json:18628) — line 18628 example `"a first fine of AED 500,000 would become AED 1,000,000 on repeat"`.
   → **REWRITE** the example using only allowlisted figures, e.g. "the minimum fine of AED 100 would double to AED 200 on a repeat violation within two years, subject to the AED 2,000,000 cap." Keep the range + cap as the only numbers.
3. [`old-vs-new-building-safety-regulations-dubai`](src/data/pseo/pseo-pages.json:23319) — line 23319 `"Fixed penalty (e.g., AED 500)"`.
   → **REWRITE** to the outer range AED 100 – AED 1,000,000; do not cite AED 500.

### Allowed figures (fact-sheet allowlist — use ONLY these)
- Fine range: `AED 100 – AED 1,000,000` (Article 16)
- Minimum: `AED 100`; Maximum: `AED 1,000,000`
- Repeat within 2 years: doubled, capped `AED 2,000,000`
- Demolition deposit: `AED 50,000`
- Certificate fees: `Set by Executive Council Chairman resolution` (Article 21)
- Durations: 60 days (in force), 1 year (compliance), 20 years (trigger), 40 years, 10 years / 5 years (validity), 6 months (technical report), 2 years (extension), 30 days (appeal)

### Also check
- The matching AR entries in [`pseo-pages-ar.json`](src/data/pseo/pseo-pages-ar.json) for the same per-violation table / AED 500,000 / AED 500 examples — fix them identically in native Arabic.
- The pillar [`approvals-ar.ts:10395`](src/data/approvals-ar.ts:10395) already uses only the range — verify and leave.

### Verification
- Search both JSON files for `10,001|100,001|500,000|AED 500|10,000 –|per violation` → expect no content claims (only the sanctioned range/cap remain).
- Re-run `node scripts/pseo/fact-flag.ts` (or the documented fact gate) — expect no Law 3 flags beyond format false-positives (the "20–39 years"-style derivation phrases are fine).
- `npm run build` passes.

---

## A.4 TASK 4 — Activate the 12 bespoke images (implementation side; generation is Part B)

### Why
All 12 assets are registered in [`src/data/images.ts`](src/data/images.ts:507) with `status: "planned"` (correctly excluded from auto-match) but no `.webp` exists in [`public/images/`](public/images/), so pages fall back to generic images.

### Prerequisite
The 12 `.webp` files from Part B must already be dropped into `public/images/`. Do NOT run this task before the files exist.

### Steps
1. **Measure real dimensions** for each new `.webp` using `node scripts/get-webp-dims.mjs` (record width/height — target 800×450 or 1200×675, landscape).
2. **Flip status** in [`src/data/images.ts`](src/data/images.ts:513): `status: "planned"` → `"available"` for exactly these 12 filenames (lines 514–656).
3. **Point the guides to the bespoke images** using the plan §7.3 "Used on" mapping:
   - `building-safety-inspection-dubai.webp` → inspection, choose-engineering-office, how-to-get
   - `quality-safety-certificate-dubai-building.webp` → **pillar hero**, who-needs, law-3-2026-faq
   - `building-maintenance-dubai-exterior.webp` → maintenance-obligations, contractor-responsibilities
   - `dubai-old-building-40-years.webp` → buildings-over-40-years, validity-renewal, compare
   - `dubai-free-zone-building.webp` → free-zone-buildings, property-investors
   - `engineering-office-dubai-assessment.webp` → choose-engineering-office, engineering-office-responsibilities
   - `dubai-municipality-digital-portal.webp` → digital-building-portal, how-to-get, compliance-deadline
   - `building-compliance-penalties-dubai.webp` → penalties, repeat-violation, what-happens, permit-suspension
   - `jointly-owned-property-dubai-strata.webp` → jointly-owned-property, landlord, building-management
   - `dubai-building-demolition.webp` → tenant-rights-demolition, landlord
   - `mep-systems-dubai-building.webp` → mep-systems, inspection-process
   - `building-safety-checklist-dubai.webp` → compliance-checklist, documents-required
   Update each guide's hero (`image`) and in-body image blocks in `pseo-pages.json` + `pseo-pages-ar.json` (and the pillar hero in `approvals.ts` / `approvals-ar.ts`) to reference the new `src` (`/images/{filename}`). Where the block stores `src`/`alt`/`caption`, use the exact EN/AR strings already in the registry (they were written for this purpose).
4. **Hero priority:** the pillar + who-needs + how-to-get heroes render above the fold with `priority` (already handled by `PseoImageBlock`/`FramedImage`).
5. **CLS safety:** every reference carries explicit `width`/`height` from step 1; in-body images lazy-load.

### Verification
- `public/images/` contains all 12 `.webp`; registry has all 12 `status: "available"`.
- `npm run build` passes; pages render the bespoke images (spot-check 3 guides: who-needs, mep-systems, compliance-checklist).
- No `planned` status remains for Law 3 images; no broken image refs (run the build; Next.js fails on missing static assets in dev).

---

## A.5 TASK 5 — Close the review gate + regenerate inline-links report

### Why
All 55 pSEO pages carry `lastVerified: "pending"` / `reviewStatus: "needs-review"` and the fact sheet `lastVerified: "pending"` — the plan §11 fact-verification gate is formally open. The inline-links report is stale.

### Steps
1. **Check the valid values** in [`src/types/index.ts`](src/types/index.ts) for the `reviewStatus` field (likely `"needs-review" | "reviewed"`). Use the exact union value — do not invent one.
2. After Tasks 1–3 pass review, set in [`pseo-pages.json`](src/data/pseo/pseo-pages.json) (all 55 entries) and [`pseo-pages-ar.json`](src/data/pseo/pseo-pages-ar.json):
   - `"lastVerified": "2026-08-12"` (today's date)
   - `"reviewStatus": "<valid reviewed value>"`
   - Only flip pages whose facts were actually verified in Task 3. If any remain unverified, keep them `needs-review` and list them.
3. Set `lastVerified` in [`law-3-2026.ts`](src/data/fact-sheets/law-3-2026.ts:32) to the same date (only if the sheet content was confirmed correct).
4. **Regenerate the stale report:** run `node scripts/pseo/check-inline-links.mjs` and confirm the output (overwrites [`scripts/pseo/_inline-links-report.txt`](scripts/pseo/_inline-links-report.txt)) now shows Tier 2/3 as DONE with relative descriptive-anchor links and no duplicates.
5. If any Tier 2/3 guide still has unresolved links, run `node scripts/pseo/weave-inline-links.mjs` and `node scripts/pseo/weave-sibling-links.mjs`, then re-run the check.

### Verification
- Search both JSON files for `"lastVerified": "pending"` and `"reviewStatus": "needs-review"` → zero results for reviewed pages.
- The report file header timestamp matches today; Tier 2/3 sections no longer show TODO/absolute-URL placeholders.
- `npm run build` passes.

---

## A.6 Final full verification (after all 5 tasks)
- `npm run build` — zero errors, zero TypeScript errors, zero lint warnings.
- No `…` in any `metaTitle`/`metaDescription` (both files).
- No `"heading": ""` (both files).
- No per-violation fine schedule / AED 500,000 / AED 500 claims (both files).
- All 12 `.webp` present, registry `available`, bespoke images render.
- No `pending` / `needs-review` on verified pages; inline-links report regenerated.
- Optional: Google Rich Results Test on 2 sample pages (who-needs, contractor-responsibilities) — FAQPage/HowTo/QAPage schema valid.

---

# PART B — 12-IMAGE NANO BANANA GENERATION PROMPT SET

Google **Nano Banana** = Gemini 2.5 Flash Image (in the Gemini app / AI Studio, select "Image" / Gemini 2.5 Flash Image). These prompts are engineered for photorealistic, brand-consistent, SEO-safe images that match the existing real-photo pool in `public/images/`.

## B.0 Global style system prompt (prefix every generation)

> **STYLE SYSTEM — apply to every image in this set:**
> Photorealistic professional architectural and property-management photography. Dubai, United Arab Emirates setting. Landscape 16:9 composition, high detail, tack-sharp focus, natural depth of field. Lighting: soft warm golden-hour sun with clear blue sky and gentle haze on the skyline, or bright clean daylight — no harsh shadows. Color palette: deep navy blue building accents, cool blue-grey glass facades, warm sand/beige tones, clean white — harmonious and consistent across the whole series. People (when present): 2–4 Middle Eastern and international professionals in business or engineering attire (hard hat, high-vis vest, tablet/clipboard, ID lanyard), natural candid poses, never looking at the camera. Vertical lines of buildings must be perfectly straight (no converging verticals, no lens distortion). NO TEXT ANYWHERE — no signage, no logos, no lettering on documents, vehicles, or buildings; if a document or screen must appear, show it blank or with unreadable blurred content. NO watermarks. NO watermarks. Do not depict money, symbols of authority misuse, or any UAE government logo/seal. Realistic proportions, physically plausible architecture, no warped geometry, no extra fingers or limbs.

## B.1 Nano Banana tips & tricks (apply for maximum quality)

1. **Lead with the subject + action, then the scene, then lighting/camera.** Nano Banana weights the first ~20 words most heavily.
2. **Pin the camera every time:** `35mm lens, f/4, shallow depth of field` for people/subjects; `wide 24mm lens, straight verticals` for building exteriors.
3. **Text is Nano Banana's weakness.** Never ask for readable text. Say `no text, no signage, no lettering, blank document` explicitly (already in the style system).
4. **Keep the set consistent:** reuse the same lighting language and palette sentence in every prompt. Generate all 12 in one session so the model holds a style memory; if that fails, use the first accepted image as an image reference for the rest.
5. **Generate big, downscale later:** ask for the largest output (1024×1024 or 16:9), then resize to 1200×675 (hero) / 800×450 (in-body) with `scripts/get-webp-dims.mjs` to record true dimensions, and export as WebP.
6. **Iterate, don't settle:** if a frame has warped architecture, added text, or unnatural people, regenerate with the negative clause appended: `reject: distorted building, converging verticals, readable text, watermark, uncanny people, extra limbs`.
7. **Heritage realism:** for the 40-year-old building, use a mid-century Gulf apartment block with concrete balconies and a distant wind-tower (barjeel) — never a western 1970s tower.
8. **Brand-consistent grading:** keep navy/blue dominance so images sit beside the site's `brand-blue` (#004080) design tokens without clashing.

## B.2 The 12 prompts

### 1. `building-safety-inspection-dubai.webp`
Used on: inspection, choose-engineering-office, how-to-get.
ALT (EN): Engineering inspection of an existing building in Dubai under Law No. (3) of 2026 quality and safety requirements.
> A structural engineer wearing a white hard hat and high-visibility vest stands on a rooftop of an existing concrete Dubai apartment block, closely examining a weathered concrete parapet with a tablet in hand; second engineer in the background checks the facade with a laser level; deep blue sky, distant modern Dubai skyline, straight verticals; photorealistic, 35mm lens, f/4, shallow depth of field; navy and blue-grey palette; no text, no logo, no watermark.

### 2. `quality-safety-certificate-dubai-building.webp`
Used on: pillar hero, who-needs, law-3-2026-faq.
ALT (EN): Quality and Safety Certificate for an existing Dubai building under Law No. (3) of 2026.
> A professional property consultant in business attire hands an official-looking blank certificate document (no text, clean white paper) to a building owner in a bright modern Dubai building lobby with glass and navy accents; the owner holds it with both hands, relieved expression; soft warm daylight through tall windows; photorealistic, 35mm lens, f/4; navy and warm-sand palette; no text, no logo, no watermark.

### 3. `building-maintenance-dubai-exterior.webp`
Used on: maintenance-obligations, contractor-responsibilities.
ALT (EN): Periodic exterior maintenance of an existing building in Dubai under Law No. (3) of 2026.
> Contractors on a suspended work platform performing exterior facade maintenance on a mid-rise Dubai residential building; one worker in safety harness and white hard hat pressure-washes the concrete cladding, another holds a checklist; bright clean daylight, blue sky, straight verticals; photorealistic, 24mm wide lens, deep navy and white palette; no text, no logo, no watermark.

### 4. `dubai-old-building-40-years.webp`
Used on: buildings-over-40-years, validity-renewal, compare.
ALT (EN): Older Dubai building more than 40 years old subject to the Law No. (3) of 2026 Quality and Safety Certificate.
> A heritage 1970s-era Gulf apartment block in Dubai with weathered concrete balconies and a traditional wind-tower barjeel on the roof, photographed at golden hour; faint ageing patina on the facade, a few modern glass towers rising behind it in soft haze to contrast old and new; warm amber light, clear sky; photorealistic, 24mm lens, straight verticals; warm sand and deep blue palette; no text, no signage, no watermark.

### 5. `dubai-free-zone-building.webp`
Used on: free-zone-buildings, property-investors.
ALT (EN): Commercial free zone building in Dubai (DIFC) within the scope of Law No. (3) of 2026.
> A sleek modern commercial tower in the DIFC financial district of Dubai — glass and steel facade with navy-blue tinted glazing, palm-lined boulevard in the foreground, professionals walking with briefcases, bright midday light, dramatic straight verticals; photorealistic, 24mm lens; blue-glass and sand palette; no text, no logo, no watermark.

### 6. `engineering-office-dubai-assessment.webp`
Used on: choose-engineering-office, engineering-office-responsibilities.
ALT (EN): DM-registered engineering office preparing a technical report for a Dubai building under Law No. (3) of 2026.
> Inside a modern Dubai engineering office, two engineers in smart shirts review large printed structural floor plans (blueprint lines, no readable text) spread on a meeting table while a third records notes on a tablet; computer monitor shows a blurred building model; bright clean office light, navy accents; photorealistic, 35mm lens, f/4; no text, no logo, no watermark.

### 7. `dubai-municipality-digital-portal.webp`
Used on: digital-building-portal, how-to-get, compliance-deadline.
ALT (EN): Dubai Municipality digital portal for the Quality and Safety Certificate application under Law No. (3) of 2026.
> A close modern view of a person's hands using a tablet at a bright service counter in a contemporary Dubai government-style building lobby; the tablet screen shows a clean, abstract application interface with a progress bar and checkmarks — content blurred/unreadable, NO text; navy-blue interior accents, soft daylight; photorealistic, 35mm lens, shallow depth of field; no text, no logo, no watermark.

### 8. `building-compliance-penalties-dubai.webp`
Used on: penalties, repeat-violation, what-happens, permit-suspension.
ALT (EN): Building compliance and penalty enforcement for Dubai building owners under Law No. (3) of 2026.
> A composed, professional scene: a building consultant in business attire explains a compliance notice (blank white document, no text) to two property owners at a modern desk in a Dubai office; calm, serious but not confrontational tone; soft window light, navy and neutral palette; photorealistic, 35mm lens, f/4; no text, no logo, no watermark.

### 9. `jointly-owned-property-dubai-strata.webp`
Used on: jointly-owned-property, landlord, building-management.
ALT (EN): Jointly owned property (strata) residential building in Dubai under Law No. (3) of 2026 obligations.
> A contemporary strata residential building in Dubai with landscaped communal podium, a community manager in a branded (no-logo) uniform walking with a clipboard past the entrance lobby with a property-management notice board (blank cards); residents in the background; warm late-afternoon light; photorealistic, 24mm lens, straight verticals; navy and warm-sand palette; no text, no signage, no watermark.

### 10. `dubai-building-demolition.webp`
Used on: tenant-rights-demolition, landlord.
ALT (EN): Building demolition and redevelopment route for an existing Dubai building under Law No. (3) of 2026.
> A controlled demolition scene at an older Dubai building: an excavator with a demolition attachment reaches toward a partially stripped concrete structure, dust haze lit by low sun, a safety supervisor with hard hat and high-vis vest watching from a safe distance, modern towers rising behind; dramatic but professional and orderly; photorealistic, 24mm lens; sand and deep blue palette; no text, no logo, no watermark.

### 11. `mep-systems-dubai-building.webp`
Used on: mep-systems, inspection-process.
ALT (EN): MEP electrical and mechanical systems assessment for a Dubai building under Law No. (3) of 2026.
> An electrical/mechanical engineer in a white hard hat inspects an exposed electrical switchboard and neat mechanical pipework in a clean modern Dubai building's technical room, using a thermal camera and a flashlight; cool white LED light with navy-blue accent lighting; photorealistic, 35mm lens, shallow depth of field; no text, no logo, no watermark.

### 12. `building-safety-checklist-dubai.webp`
Used on: compliance-checklist, documents-required.
ALT (EN): Building safety and compliance checklist for the Dubai Quality and Safety Certificate under Law No. (3) of 2026.
> A close overhead flat-lay on a clean light desk: a blank clipboard with an empty checklist form (no text), a hard hat, a high-visibility vest, a tablet, and rolled architectural drawings, arranged neatly; soft even daylight, navy and white palette; photorealistic, top-down 45° angle, shallow depth of field; no text, no logo, no watermark.

---

## B.3 After generation — handoff to Code mode (Task 4)

For each accepted image:
1. Resize to **1200×675** (hero) and **800×450** (in-body) landscape; export **WebP** (`quality 80–85`).
2. Save to `public/images/{filename}` exactly as named above.
3. Run `node scripts/get-webp-dims.mjs` and record true width/height.
4. Then execute **Part A → Task 4** (flip `status` to `available`, wire image refs, verify CLS).

---

## Acceptance checklist (this whole pack is DONE when)
- [ ] Zero `…` in all `metaTitle`/`metaDescription` (EN + AR, both JSON files), all within length rules, unique, keyword-led, CTA present.
- [ ] Zero `"heading": ""` empty sections (EN + AR).
- [ ] No per-violation fine table, no AED 500,000 / AED 500 claims; only fact-sheet allowlist figures.
- [ ] 12 `.webp` in `public/images/`; registry `status: "available"`; bespoke images wired to the §7.3 pages; CLS-safe dimensions.
- [ ] `lastVerified` set + `reviewStatus` flipped on verified pages; fact sheet `lastVerified` updated; `_inline-links-report.txt` regenerated and current.
- [ ] `npm run build` passes clean.
