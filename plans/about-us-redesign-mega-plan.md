# About Us Redesign — "The Living Blueprint" Mega Plan

**Project:** Wasleen Liminal Approval Consultants — `/about-us` redesign
**Site:** `https://www.dubaiapprovalconsultants.com`
**Mode owner:** Architect (this plan) → Code (implementation)
**Primary goal:** A world-class, story-driven About page that ranks #1 on Google + AI search, and tells the Wasleen Group story (Interior · Approvals · Pergolas · Digital) through a distinctive "architectural drawing set" visual language — with zero performance regression.

---

## 0. Executive Summary

The About page becomes **a set of living architectural "drawing sheets"** — Sheet 01 through Sheet 11 — that carry the blueprint visual language already established by the homepage hero (floor plans, title blocks, revision logs, approval stamps, and a final set of office-location maps). Every section either states or quietly reinforces the narrative spine:

> *"We don't just know Dubai approvals. We've built the projects that needed them."*

Real project photography (10 images supplied by the client) is treated as **"field photographs attached to the drawing set"** — uniform drafting frames, Roboto Mono caption strips, and a signature CSS-only **"blueprint → color bloom"** hover interaction.

On top of the base design, a **Signature Interaction Layer (A1–A8)** adds a small number of authored, non-template wow-moments — most notably a **cyanotype day/night toggle** (white-on-Prussian-blue vs. the current diazo print; **defaults to dark/night on both EN and AR**), a **scroll-scrubbed hero drafting line**, a **dimension-line stat band**, **physical photo treatment** (rotated, taped field photographs), a **sheet-number rail**, a **single-use approval-stamp animation**, a **drafting-pencil custom cursor**, and a **blueprint linen texture**. All motion is compositor-friendly CSS + the existing `ScrollReveal` IntersectionObserver driver, respecting `prefers-reduced-motion`. **No new dependencies** (no framer-motion), staying inside the project's 150KB page / 50KB JS / <200KB image budgets.

**Arabic is part of this build, not follow-up.** The Arabic page `/ar/about-us` is a **full 1:1 parity mirror** — the same 11 sheets + 02b, the same A1–A8 interactions, the same dark toggle default, and the same schema stack and metadata — built **alongside every English phase** via shared locale-agnostic components (driven by `src/data/about.ts` EN + `src/data/about-ar.ts` AR), reusing the existing `ar/layout`, `siteConfig("ar")`, and locale-aware schema utilities without conflicting with any other code. Full rules in §3.5.

---

## 1. Design Concept — "The Living Blueprint"

| Pillar | Decision |
|---|---|
| Visual language | Architectural drawing set: sheet numbers, title blocks, revision logs, scale bars, approval stamps, blueprint grids |
| Signature motif | Drafting **corner crop marks** on every section + interactive card (6 lines of CSS) |
| Signature interaction | **Cyanotype day/night toggle (A1)** — the page flips between diazo print (blue on white) and night cyanotype (white on Prussian blue); **default state is dark/night for both EN and AR** |
| Typography | Montserrat headings (existing tokens) + **Roboto Mono** for all technical labels (`SHEET NO.`, `REV`, `SCALE 1:100`, `DATE`, `APPROVED`) |
| Image treatment | Drafting frame + mono caption + blueprint-muted at rest → full-color bloom on hover/scroll; **physical photo variant** (rotated + taped/bound, A4) |
| Motion engine | CSS keyframes (`transform`/`opacity`) + existing [`ScrollReveal`](../../src/components/blog/ScrollReveal.tsx) + `.drawing-deferred` idle-release + **one passive rAF scroll listener for the hero scrub (A2)**; all disabled under `prefers-reduced-motion` |
| Interaction peaks | A1 cyanotype toggle · A2 hero drafting line · Sheet 03 parcel grid (border-draw) · Sheet 03b physical photo bento · Sheet 05 dimension-line band (A3) · A6 single-use stamp |

### Design-token rule (approval required)
All new colors — including the **night-cyanotype palette** — are added to [`tailwind.config.ts`](../../tailwind.config.ts) as named tokens / CSS custom properties first, **never inlined in components** (rule `02-DESIGN-TOKEN-SYSTEM`). The first build task is the token/config change (isolated, per `04-BUILD-SEQUENCING`).

### Keyframes & custom-property CSS
All custom keyframes (gradient drift, cyanotype crossfade, stamp thud, dimension-line, scroll-scrub) live in a dedicated **global CSS file** (e.g. `src/app/globals.css` or a page-scoped `about.css` imported by the page) — **not** inline `style` attributes, per project rule "Tailwind CSS v4 classes only." The single precedent exception (CSS custom properties via `style` in drawing components like [`SceneD_ApprovalStamp`](../../src/components/drawings/SceneD_ApprovalStamp.tsx:131)) is followed only for dynamic SVG values; all static styling uses classes.

---

## 2. Page Content — Complete Copy (Sheet by Sheet)

> All copy below is **final content** to render verbatim. Visible text must equal schema text word-for-word (rule `05-TECHNICAL-SEO-SCHEMA.md`).

### Sheet 01 · Hero `[REVISE — + A2 scroll-scrubbed drafting line]`

- **Eyebrow (mono uppercase, amber):** `PART OF THE WASLEEN GROUP`
- **H1 (only H1 on page):** `We don't just know Dubai approvals. We've built the projects that needed them.`
- **Subhead:** `Wasleen Liminal Approval Consultants grew out of Wasleen Interior & Fit-Out — 273+ real construction projects that taught us, permit by permit, exactly what Dubai's authorities expect. Today we handle 52+ approval types across every major jurisdiction.`
- **Division strip (4 `icon + label` pairs, styled as a title block):** `Interior` · `Approvals` ⬤ YOU ARE HERE · `Pergolas` · `Digital`
  - Icons (lucide): Interior `Home`, Approvals `Stamp`, Pergolas `Sun`, Digital `Globe`
  - Approvals entry: `text-cta-amber`, bold, + pulsing dot (CSS opacity keyframe)
  - **Division-strip links (NEW):** `Interior` → `https://wasleen.com`, `Pergolas` → `https://www.pergolas.wasleen.com`, `Digital` → `https://wasleen.com/wasleen-digital` — each a real `<a href>` (`target="_blank" rel="noopener"`), tracked via `trackEvent` (`outbound_click`, `division: interior|pergolas|digital`). **Approvals = "you are here"** — not a link (it is the current site). `DivisionStripItem` gains optional `href`/`external` in the data layer (see §4.1); non-active cells keep keyboard focus + hover ink states via `--about-*` tokens.
- **Dark hero (NEW — night mode):** in the **night** cyanotype state the hero section background resolves to the deep navy `--about-bg-deep` (`#06223C`), so the banner reads as a dark drafting sheet — **not** the light page surface. This requires an explicit dark surface on `.about-hero` / `BlueprintGrid` / `GradientMesh` (verify no hardcoded light background survives the theme swap). All hero ink stays on `--about-*` night tokens — heading `#D0E3F8`, body `#EAF3FC`, ink `#D7E6F8`, amber `#F5A623` — which pass **WCAG AA on the navy** (heading ≈13:1, body ≈14:1, amber ≈6:1); CTA buttons keep amber fill + `--about-amber-ink` (black) text. See §10 gate.
- **Visual:** [`SceneA_FloorPlan`](../../src/components/drawings/SceneA_FloorPlan.tsx) — still idle-loaded via `requestIdleCallback` (copy pattern from [`HeroSection.tsx`](../../src/components/sections/HeroSection.tsx:29)), but its reveal is now **scroll-scrubbed** (A2): walls, dimension lines, and title block draft themselves in via `stroke-dashoffset` mapped to scroll fraction across the hero's viewport height
- **CTAs:** `Get Free Consultation` (WhatsApp, tracked via `trackEvent`) + `Explore Our Approvals` → `/approvals`

### Sheet 02 · Our Story `[REVISE]`

- **H2:** `How a builder became an approvals consultancy`
- **Left column — story copy (3 paragraphs):**

> Wasleen didn't start as an approvals consultancy. It started as a construction and interior fit-out company — the kind that shows up on-site, manages the joinery factory, runs the MEP, and hands over a finished villa or office. Over 273+ projects across Dubai, Abu Dhabi, Sharjah, and Ajman, one thing kept costing our clients more time and money than the build itself: getting a project through Dubai Municipality, DEWA, DCD, and free zone authorities before a single wall could go up.
>
> So we built that expertise in-house — registered engineers who could stamp DM-compliant drawings, a team that understood exactly what a DCD inspector checks for on a fire-safety NOC, relationships with the free zone authorities where our own projects were being built. Eventually that capability became a business of its own: Wasleen Liminal Approval Consultants.
>
> That's the difference between us and a firm that only ever pushes paperwork. We've been the applicant. We've been the contractor waiting on the approval. We know where submissions actually get rejected, because we've had our own drawings rejected — and learned exactly what to fix.

- **Right column:** animated **revision-log title block** (reuse `TitleBlock` symbol from [`DrawingSymbols`](../../src/components/drawings/DrawingSymbols.tsx) + `animate-draw-line`): rows `REV A · BUILDER · EST. 2013` → `REV B · ENGINEER · IN-HOUSE` → `REV C · APPROVALS · 52+ TYPES`, finishing with a **static** `APPROVED` stamp (success-green). *(The animated stamp lives only on Sheet 08, per A6.)*
- **Founding timeline rail (mono, 4 nodes):** `2013 INTERIOR` → `2018 APPROVALS` → `2018 PERGOLAS` → `2020 DIGITAL`
  - **Blocker-1 RESOLVED:** Pergolas founded **2018** (8 years old, confirmed by client), Digital founded **2020**. Year labels replace the `—` placeholders in the `timeline` arrays of `about.ts` / `about-ar.ts`.

### Sheet 02b · The Craft Strip `[NEW]`

- **H2:** `Built in-house. Approved in-house.`
- **Two images side-by-side (full-width band):**
  - Left [`aluminum-glass-cnc-machining.webp`] — caption: `OUR FACTORY FLOOR · Aluminium & glass fabrication under the same roof`
  - Right [`aluminum-glass-wind-load-engineering.webp`] — caption: `WIND-LOAD ENGINEERING · The same calculations behind our structural approvals`
- **Purpose:** visually proves "we build AND we approve" — the single most differentiating claim on the page.

### Sheet 03 · The Wasleen Group (Site Plan) `[NEW — centrepiece]`

- **H2:** `One group, four crafts, one standard`
- **Intro:** `Wasleen isn't a single company wearing different names. It's four specialisms that grew out of the same instinct — don't outsource the thing that matters, build the capability yourselves.`
- **Revision-log table (real `<table>`, Roboto Mono; rows hover-highlight):**

| REV | DIVISION | SCOPE | STATUS |
|---|---|---|---|
| A | Wasleen Interior & Fit-Out | Residential & commercial fit-out, MEP, joinery, automation | 273+ projects · 7 emirates |
| B | Wasleen Pergolas & CinemaxSky | Outdoor architecture, smart pergolas, carports, mezzanines | Bioclimatic & smart structures |
| C | **Wasleen Liminal Approval Consultants** | Government, free zone & developer approvals — 52+ types | ⬤ **YOU ARE HERE** |
| D | Wasleen Digital Solutions | Custom-engineered websites for the group and outside clients | Newest division |

- **Parcel grid (4 interactive cards, drafting crop marks, border-draw hover):**
  1. **Wasleen Interior & Fit-Out** — `Luxury villa and commercial fit-out, MEP, and joinery, delivered across all 7 emirates.` → link `wasleen.com` (image header: [`interior-fitout-company-dubai-wasleen.webp`])
  2. **Wasleen Liminal Approval Consultants** — `Government, free zone, and developer approvals across 52+ categories.` **You are here.** (icon-based; amber border — no photo, keeps division visually distinct)
  3. **Wasleen Pergolas & CinemaxSky** — `Bioclimatic pergolas, smart outdoor structures, and luxury outdoor cinema design.` → link `pergolas.wasleen.com` (image header: [`pergola-car-parking-ajman.webp`])
  4. **Wasleen Digital Solutions** — `Custom-engineered, zero-bloat websites built for speed and search visibility.` → link `wasleen.com/wasleen-digital` (icon-based — no number claimed, per Blocker-3)
- **Closing pull-quote (H3):** `Four businesses, one office culture: build it properly in-house, or don't do it at all.`
- **External links:** `target="_blank" rel="noopener"`, tracked via `trackEvent` (`outbound_click`, `division: interior|pergolas|digital`)

### Sheet 03b · Selected Work (Physical Photo Bento) `[NEW — showcase; + A4 physical treatment]`

- **H2:** `The work behind the approvals`
- **Intro:** `A selection of projects from across the group — interiors and outdoor structures that moved through the approvals we manage.`
- **Bento cells (each: physical-photo frame — ±1–2° rotation, drop shadow, taped-corner/binder-clip SVG detail, mono caption, blueprint-bloom; straighten + lift on hover):**
  - LARGE 2×2 — [`residential-interior-fitout-dubai-villa-design-wasleen.webp`] → `PROJECT: VILLA FIT-OUT · DUBAI`
  - 1×1 — [`commercial-interior-fitout-dubai-office-renovation-wasleen.webp`] → `OFFICE FIT-OUT · BUSINESS BAY`
  - 1×1 — [`aluminum-car-port-villas.webp`] → `ALUMINIUM CARPORT · VILLA`
  - WIDE 2×1 — [`luxury-home-cinema-design-dubai-wasleen-interiors-02.webp`] → `LUXURY CINEMA · CINEMAXSKY`
  - 1×1 — [`aluminum-lift-slide-doors-windows.webp`] → `LIFT-SLIDE GLAZING · AL QUOZ`
- Mobile: collapses to clean 2-column stack (360–390px first). Optional lightbox (if added) uses a shutter/aperture open/close transition — **not** in initial build.

### Sheet 04 · Both Sides of the Counter `[NEW]`

- **H2:** `We've stood on both sides of the counter`
- **2×2 icon grid, no cards (light), icons in drafting circles:**
  1. `We've submitted our own drawings, not just clients'.` — `Every DM and DCD submission process we manage for you, we've run for our own live construction sites.` (icon `FileCheck`)
  2. `We know what inspectors actually check.` — `DCD fire-safety NOCs, DEWA load assessments, DDA fit-out approvals — our own crews have been inspected against these standards, not just read about them.` (icon `ClipboardCheck`)
  3. `273+ built projects taught us where approvals go wrong.` — `Most rejected submissions fail for the same handful of reasons. We've seen those reasons from the contractor's side of the desk.` (icon `Construction`)
  4. `One group, four specialisms, one point of contact.` — `Approvals and fit-out and outdoor structures and a website that converts — four conversations with people who already work under one roof.` (icon `Users`)

### Sheet 05 · Numbers Band `[REVISE — + A3 dimension-line treatment]`

- **H2 (visually light, optional):** `Wasleen by the numbers`
- **4 dimension-line stats (tick · leader line · end tick · number where a measurement annotation sits), count-up via `CountUp.tsx`, numbers remain real DOM text:**
  - `8+` · `YEARS OF APPROVALS`
  - `500+` · `APPROVALS DELIVERED`
  - `273+` · `GROUP PROJECTS BUILT`
  - `4` · `IN-HOUSE DIVISIONS`

### Sheet 06 · Why Choose Wasleen `[KEEP content — restyled]`

- **H2:** `Why choose Wasleen?`
- **4 cards — copy verbatim from the current live site** (Regulatory Expertise, Proven Track Record, Dedicated Support, End-to-End Service), restyled as blueprint cards with corner crop marks + border-draw hover.
- **Themed grid gradient (NEW):** the card grid receives a cyanotype-aware colour gradient built from `--about-*` tokens (e.g. `linear-gradient(160deg, var(--about-card), var(--about-surface))` per card, or a section-level wash), resolving correctly in **both** day and night — never hardcoded hex. Text stays on `--about-heading` / `--about-text` so cards remain **WCAG AA readable on the gradient end-colors** in both themes. See §10 gate.

### Sheet 07 · The People `[NEW]`

- **H2:** `The people who sign your approvals`
- **Founder card:** [`Wasleen-interiors-fitouts-pergola-company-founder-owner.webp`] — caption block: `NAME: [FOUNDER NAME — CONFIRM] / ROLE: FOUNDER & OWNER / REV A`
- **Co-founder card:** [`Wasleen-interiors-fitouts-pergola-company-cofounder.webp`] — caption block: `NAME: [CO-FOUNDER NAME — CONFIRM] / ROLE: CO-FOUNDER / REV A`
- **E-E-A-T credit line under both:** `Reviewed by [Name], [credential] — [date]`
- ⚠️ Requires **founder names** from client (Blocker-4, see §7).

### Sheet 08 · Credentials `[KEEP — + A6 single-use animated stamp]`

- Copy unchanged (registered consultancy, address, licence link → `/license`, disclaimer). Wrapped in a subtle "document review" frame. NAP must stay byte-for-byte identical.
- **A6:** a single animated rubber-stamp SVG ("APPROVED") **thuds down once** (~200ms scale + slight rotation settle, soft ink-bleed edge baked into a static SVG) the first time this sheet scrolls into view. The page's one "screenshot moment."

### Sheet 09 · Closing CTA `[REVISE]`

- **Closing line:** `One call gets you the whole group — not just one service.`
- **CTAs:** `Get Free Quote` → `/free-quote` (tracked) · `WhatsApp Us` · `Call +971 56 764 8220` (reuse [`CTASection`](../../src/components/sections/CTASection.tsx) pattern)
- **Mini "group directory" strip** (4 division links) so the page ends on the whole group.

### Sheet 10 · FAQ `[AEO ADD — optional but recommended]`

- **H2:** `Frequently asked questions about Wasleen`
- **4 Q&As (2–3 sentences each, self-contained; mirrored exactly in `FAQPage` schema):**
  1. **Q:** *What is Wasleen Liminal Approval Consultants?* — **A:** Wasleen Liminal Approval Consultants is the approvals division of the Wasleen Group, a Dubai-based construction, interior fit-out, pergola, and digital group. We manage government, free zone, and developer approvals — 52+ types — including Dubai Municipality, DEWA, DCD, and DDA.
  2. **Q:** *Is Wasleen a licensed approvals consultancy?* — **A:** Yes. Wasleen Liminal Approval Consultants holds an active DED trade license (No. 1188577) for engineering consultancy, technical drawing, and approval facilitation in Dubai, UAE. [View our license](/license).
  3. **Q:** *How is Wasleen different from other approval consultants?* — **A:** We grew out of an interior fit-out and construction business with 273+ built projects. We've submitted our own drawings, run our own construction sites, and been inspected against the same standards we help you meet.
  4. **Q:** *Does the Wasleen Group provide services beyond approvals?* — **A:** Yes. The group includes Wasleen Interior & Fit-Out, Wasleen Pergolas & CinemaxSky, and Wasleen Digital Solutions — one point of contact across the four divisions.

### Sheet 11 · Our Offices (3 Locations) `[NEW — after FAQ]`

- **H2:** `Visit us — three group locations across Dubai`
- **Intro:** `One group, three addresses. Every Wasleen division works from a physical desk in Dubai — approvals, interiors, pergolas, and digital under one roof culture.`
- **3 location cards — beautifully aligned, drafting-frame treatment:** reuse [`DraftingFrame`](../../src/components/about/DraftingFrame.tsx) per card (crop marks + line border + mono caption strip), uniform card height, **1-column mobile (360–390px) → 3-column desktop (`lg:grid-cols-3`)**, matching title-block captions:
  1. **Wasleen Approval Consultants — Head Office** — `Office 401, Darwish Building, Al Qusais, Dubai` (NAP-identical address). This is the **approval office** (client-provided share link `https://share.google/XXAqVwLdUWyHJ3nG7`).
  2. **Wasleen Technical Services — Pergola & Car Parking Solutions** — reuse the **existing** map iframe src already shipped in [`Footer.tsx`](../../src/components/layout/Footer.tsx:188) and the Contact page.
  3. **Wasleen Pergolas & CinemaxSky** — reuse the **existing** map iframe src already shipped in [`Footer.tsx`](../../src/components/layout/Footer.tsx:204) and the Contact page.
- **Each card contains:** the `loading="lazy"` Google Maps `<iframe>` in a fixed `aspect-ratio` box (CLS-safe), a mono caption (`OFFICE 01 · APPROVAL CONSULTANTS`, etc.), the physical address line, and a `Get Directions` link (`target="_blank" rel="noopener"`, `trackEvent` → `outbound_click`, `office: approval|pergola-parking|cinemaxsky`).
- **Handling the share link ("how we can handle this"):** `share.google/...` is a Google Maps *place-share* URL, **not** an embed URL. At build time: open it → **Share → Embed a map** → copy the iframe `src` (`https://www.google.com/maps/embed?pb=...`) into the `offices` data block; keep the share link as the card's `directionsUrl`. If embed resolution is blocked, fall back to the keyless `https://www.google.com/maps?q=<full address>&output=embed`. **The approval-office pin must match NAP** (`Office 401, Darwish Building, Al Qusais, Dubai`) — byte-for-byte, no drift (rule `00-PROJECT-MASTER-RULE §6`).
- **Performance guardrail:** all three iframes sit below the fold and load `lazy`; map height capped (e.g. `aspect-[4/3]`, `h-[240px]`) to control CLS; treated as third-party weight in the §6 budget.
- **SEO note:** no new JSON-LD is required (Organization/LocalBusiness is sitewide); visible address text on each card matches NAP byte-for-byte.

---

## 3. SEO Strategy — Technical + On-Page (fully loaded)

### 3.1 Metadata

| Field | Value | Rule check |
|---|---|---|
| **Meta title** | `About Wasleen Approvals | Dubai Approval Consultants` | 51 chars ✓ (50–60) |
| **Meta description** | `Meet Wasleen Liminal Approval Consultants — a builder-backed team behind 273+ group projects and 500+ Dubai approvals across 52+ types. Contact us today.` | 153 chars ✓ (140–160); numbers ✓; CTA ✓ |
| **Canonical** | `https://www.dubaiapprovalconsultants.com/about-us` | self-referencing ✓ |
| **hreflang** | `hreflangAlternates(SITE.url, "/about-us")` | en-AE / ar-AE / x-default ✓ |
| **og:title / og:description** | match title + description (trimmed to 60 / 160) | ✓ |
| **og:image** | NEW `/public/images/og-about-us.jpg` 1200×630 (from villa image, blueprint-tinted, caption) | unique per page type ✓ |
| **twitter:card** | `summary_large_image` | ✓ |
| **dateModified** | build date (e.g. `2026-08-18`) — real change only | ✓ |

### 3.2 JSON-LD Schema Stack (all locale-aware)

| Schema | Source | Notes |
|---|---|---|
| `AboutPage` | [`staticPageSchema`](../../src/lib/schema.ts) | keep; `aboutRef` → `#organization` |
| `BreadcrumbList` | Home › About Us (2 items) | keep |
| `Person` × 2 (founder, co-founder) | [`personSchema()`](../../src/lib/schema.ts:148) | `@id: #author-founder` / `#author-cofounder`; `jobTitle`, `worksFor: #organization`; `sameAs` (LinkedIn) if known |
| `ItemList` (4 divisions) | new inline object | `ItemList` of the group divisions with `name` + `url` (wasleen.com / this site / pergolas / digital) — helps AI engines map the group |
| `FAQPage` | [`faqPageSchema()`](../../src/lib/schema.ts:221) | mirrors Sheet 10 verbatim |
| `Organization` / `WebSite` | sitewide (root layout) | referenced via `@id`, NAP byte-identical |

**Rules enforced:** no fabricated data; visible text = schema text; `Organization @id` consistent; NAP identical to footer/GBP; every page keeps `BreadcrumbList`.

### 3.3 On-Page / AEO

- **Single H1** with primary keyword (`Dubai approvals`); heading hierarchy strictly H1 → H2 → H3, no skipped levels.
- **Direct-answer positioning:** first sentence of the story + FAQ + numbers band are self-contained quotable facts (AI Overviews / ChatGPT / Perplexity extraction).
- **Stats band** (Sheet 05) uses numerals — highest-quoted content type. **Numbers remain real DOM text** even inside the dimension-line visual (A3) so AI-search and screen readers parse them.
- **Real `<table>`** for the revision log + **real `<ul>`/`<ol>`** for the 2×2 points — AI engines parse structured lists/tables.
- **Internal links (descriptive anchor text only):**
  - `/approvals` — "our approval services" / "Explore 52+ approval types"
  - `/services` — "technical drawing & documentation services"
  - `/guides` — "Dubai approval guides & FAQs"
  - `/contact-us` — "contact our approval team"
  - `/free-quote` — "get a free approval quote"
  - `/license` — "view our DED trade license"
- **Outbound (own group sites, follow links):** wasleen.com · pergolas.wasleen.com · wasleen.com/wasleen-digital — descriptive anchors, `target="_blank" rel="noopener"`.
- **Image SEO:** descriptive `alt` on every image (never "image"/"logo"); `next/image` with explicit width/height + `sizes`; WebP; lazy below the fold.
- **The A1 cyanotype toggle must not hide content or change DOM text** — it is a pure CSS-visual state swap; markup and text nodes are identical in both themes (no SEO impact).

### 3.4 Post-Build SEO Tasks

1. Update `lastModified` for `/about-us` (+ `/ar/about-us`) in [`src/app/sitemap.ts`](../../src/app/sitemap.ts:86) to build date.
2. Generate `/public/images/og-about-us.jpg` (1200×630).
3. Validate JSON-LD in Google Rich Results Test (AboutPage + FAQPage + ItemList + Person).
4. Verify canonical + hreflang render correctly.
5. Verify no heading-level skips (axe/HTML validator).

### 3.5 Arabic Page — full 1:1 parity mirror (non-negotiable)

The Arabic page `/ar/about-us` must render **exactly the same content, structure, schema, and interactions** as the English page — nothing is cut, simplified, or deferred. This is a hard client directive and follows the project's existing parity discipline (`scripts/validate-ar-parity.js`, existing EN↔AR data parity for approvals/guides/services).

**Parity rule (non-negotiable):** every English feature ships with its Arabic twin **in the same phase** — no English-only intermediate states.

| Area | English (`/about-us`) | Arabic (`/ar/about-us`) |
|---|---|---|
| Sheets 01–11 + 02b | full copy in `src/data/about.ts` | full Arabic copy in `src/data/about-ar.ts` — **1:1 same structure, same images, same numbers (273+, 500+, 52+, 4)** |
| Components | `src/components/about/*` (locale-agnostic, prop-driven) | **reused, same component tree** — text/`aria-label`s come from typed locale-aware props; small Arabic `"use client"` interactive handlers follow the existing Arabic convention (e.g. [`CTASectionArabic.tsx`](../../src/components/sections/CTASectionArabic.tsx)) |
| Interactions A1–A8 | all 8 | all 8, RTL-safe (**Q6**: sheet rail flips to left edge, dimension-line arrows flip, photo rotation mirrors) |
| Theme (A1) | `data-theme` + `localStorage` | **same localStorage key across locales** — switching locale keeps the theme; Q1 pre-paint script gated to `/about-us` AND `/ar/about-us`; Q2/Q4 identical in Arabic (Arabic `aria-label`s) |
| Schema | AboutPage + Breadcrumb + Person×2 + ItemList + FAQPage (EN) | **same stack via locale-aware generators** — `staticPageSchema(..., "ar")`, `faqPageSchema(..., "ar")`, `breadcrumbList(..., "ar")`; visible AR text = AR schema text; NAP stays byte-for-byte English |
| Metadata | EN title/desc/OG/canonical/hreflang | `AR`-localized title (`AR.breadcrumb.aboutUs`), canonical `.../ar/about-us`, `hreflangAlternates(SITE.url, "/ar/about-us")`, `og:locale "ar_AE"` — reuses [`locale.ts`](../../src/lib/locale.ts) helpers + `siteConfig("ar")` from `ar/layout` |
| Layout | root layout + Header/Footer EN | existing `src/app/ar/layout.tsx` **reused unchanged** (`ArabicDocumentAttributes`, RTL wrapper div, `<Header locale="ar" />`, `<Footer locale="ar" />`, `FloatingWhatsApp`) |

**RTL styling rule (non-negotiable):** every new About component must use Tailwind **logical properties** (`ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`, `text-start`) so the same component renders correctly LTR and RTL without duplication. No physical `ml-`/`mr-`/`left-`/`right-` in any About component.

**Parity verification:** sheet-by-sheet EN ⇄ AR mirror check (all sheets) + `validate-ar-parity.js` discipline on `about.ts`/`about-ar.ts`; `npm run build` must pass with both locales (see §10 gates and Phase H3).

---

## 4. Architecture & File Plan

### 4.1 New components (`src/components/about/`)

| File | Responsibility |
|---|---|
| `GradientMesh.tsx` | drifting gradient layer (compositor-friendly, `transform`-only) |
| `BlueprintGrid.tsx` | blueprint-grid background + corner crop marks + drafting frame wrapper |
| `DraftingFrame.tsx` | border + crop marks + mono caption strip wrapper for any photo |
| `PhysicalPhotoFrame.tsx` | **A4** — rotated, shadowed, taped/bound field-photo variant of the drafting frame (straighten + lift on hover) |
| `DivisionStrip.tsx` | Sheet 01 four-division title-block strip — **Interior / Pergolas / Digital cells are real outbound `<a>` links** to their own group sites (wasleen.com, pergolas.wasleen.com, wasleen.com/wasleen-digital; `target="_blank" rel="noopener"`, `trackEvent("outbound_click")`); **Approvals = "you are here", rendered as non-link text** |
| `RevisionLogTable.tsx` | Sheet 03 drawing-log `<table>` |
| `ParcelGrid.tsx` | Sheet 03 interactive 4-parcel group grid |
| `BentoGallery.tsx` | Sheet 03b asymmetric physical-photo grid |
| `CraftStrip.tsx` | Sheet 02b two-image band |
| `FounderCard.tsx` | Sheet 07 drafting-frame people card |
| `CountUp.tsx` | Sheet 05 animated counter (~1KB, rAF + IntersectionObserver, once) |
| `DimensionLineStat.tsx` | **A3** — dimension-line stat visual wrapping `CountUp` (numbers stay DOM text) |
| `AboutFaq.tsx` | Sheet 10 FAQ (accordion — reuse [`Accordion`](../../src/components/ui/Accordion.tsx)) |
| `OfficeMaps.tsx` | **Sheet 11 (NEW — after FAQ)** — 3-aligned office-location cards with lazy Google Maps iframes (reuse Footer `pb=` embed srcs for the 2 pergola offices + new approval-office embed sourced from the client share link); aspect-box iframes (`loading="lazy"` + `referrerPolicy="no-referrer-when-downgrade"`), mono caption strip, NAP address, "Get Directions" outbound link; RTL-safe logical props |
| `CyanotypeToggle.tsx` + `CyanotypeProvider.tsx` | **A1** — day/night blueprint theme: `data-theme` attribute on page root, CSS-variable swap, `localStorage` persistence, sticky placement (in-flow, not `position:fixed`) |
| `SheetRail.tsx` | **A5** — vertical `01…11` sheet-number rail, scroll-spy, real `<a href="#sheet-N">` anchors, desktop ≥1024px only |
| `ApprovalStamp.tsx` | **A6** — single-use animated rubber stamp (static SVG with baked ink-bleed; CSS thud on first view) |

> **Locale-agnostic rule:** every component above is **shared** by EN and AR — no Arabic-specific variants. All copy and `aria-label`s come from typed props fed by `src/data/about.ts` (EN) / `src/data/about-ar.ts` (AR); all layout uses logical properties for automatic RTL. The only Arabic-specific files are small `"use client"` interactive handlers that follow the existing codebase convention (e.g. a `CyanotypeToggle` reading a `locale` prop; Arabic wrappers only where the existing Arabic pattern requires them, as with [`CTASectionArabic.tsx`](../../src/components/sections/CTASectionArabic.tsx)).

### 4.2 New assets

| File | Purpose |
|---|---|
| `public/cursors/pencil.svg` (+ optional `.png` fallback) | **A7** — custom cursor, <2KB, applied via CSS `cursor: url(...) x y, auto` only under `@media (hover:hover) and (pointer:fine)` |
| inline SVG (data-URI or component) | **A8** — blueprint linen `feTurbulence` grain at ~3% opacity, painted once, works in both cyanotype states |

### 4.3 Files modified

| File | Change |
|---|---|
| [`src/app/about-us/page.tsx`](../../src/app/about-us/page.tsx) | Full rewrite: metadata, schema stack, 11 sheets, cyanotype provider, sheet rail |
| [`tailwind.config.ts`](../../tailwind.config.ts) | Add cyanotype + gradient token set (approved, isolated task) |
| `src/app/layout.tsx` (Q1 — **new, isolated scope addition**) | ~5-line **inline blocking script** in `<head>` that sets `data-theme` from `localStorage` **before first paint**, gated to `/about-us` + `/ar/about-us` paths only; zero bundle cost; nothing else in the file touched |
| `src/lib/feature-flags.ts` (Q13 — **new**) | single build-time constant `ABOUT_SIGNATURE_LAYER` gating all A1–A8 components + conditional import of the signature CSS; Sheets 01–11 content + schema **never gated** |
| page-scoped CSS (e.g. `src/components/about/about.css`) | All custom keyframes + blueprint CSS custom properties + **print stylesheet (Q7/Q12)** + linen-texture layer + night-mode photo filter (Q8) |
| `public/textures/linen.webp` (Q9 — **new**) | pre-rendered tiled linen noise (~128–256px, ~2–5KB) — replaces live `feTurbulence` |
| [`src/app/sitemap.ts`](../../src/app/sitemap.ts) | bump `/about-us` lastMod |
| [`src/components/about/*`] | 17 new components (incl. `OfficeMaps.tsx` — Sheet 11) |
| `src/data/about.ts` (EN) + `src/data/about-ar.ts` (AR) — **new** | typed sheet/section content for both locales; `id`-paired for parity (mirrors existing `validate-ar-parity.js` discipline); **adds `officeLocations[]` (3 offices: approval HQ + 2 pergola sites, each with `{name, address, embedSrc, directionsUrl}`) and the `sheet-11` entry in the `sheets[]` rail list** |
| [`src/app/ar/about-us/page.tsx`](../../src/app/ar/about-us/page.tsx) | rebuild as **full parity mirror** — reuses `ar/layout`, `siteConfig("ar")`, locale-aware schema generators, and the same component tree as the English page |

### 4.4 Files NOT touched (LOCKED / out of scope)

- [`WasleenIcon.tsx`](../../src/components/logo/WasleenIcon.tsx), [`WasleenLogo.tsx`](../../src/components/logo/WasleenLogo.tsx)
- `/public/favicon.*`, `manifest.json`, `robots.ts`, Header, Footer, MobileNav
- Approval/guide/service pages and data
- `src/app/layout.tsx` — **except the single Q1 inline script** (added under Phase B1a as an isolated, reviewable task; everything else in the file untouched)
- `src/app/ar/layout.tsx` — **reused unchanged** (Arabic RTL layout, `Header locale="ar"`, `Footer locale="ar"`, `siteConfig("ar")`); the rebuild touches only `src/app/ar/about-us/page.tsx`

---

## 5. Image Inventory & Slot Map (final)

### 5.1 Recommended renames (avoid spaces/special chars; SEO-friendly)

| Current file | New file |
|---|---|
| `pergola/Aluminium upward covered modern car parking pergola designs for home in ajman .modern pergola car parking area without cars.more realistic (8).webp` | `pergola/pergola-car-parking-ajman.webp` |
| `pergola/Aluminum car port for villas (1).webp` | `pergola/aluminum-car-port-villas.webp` |
| `pergola/aluminum-and-glass-fabrication-cnc-machining-dubai-wasleen-interiors-dubai-12.webp` | `pergola/aluminum-glass-cnc-machining.webp` |
| `pergola/aluminum-and-glass-fabrication-wind-load-engineering-dubai-wasleen-interiors-dubai-16.webp` | `pergola/aluminum-glass-wind-load-engineering.webp` |
| `pergola/aluminum-doors-and-windows-heavy-duty-lift-slide-dubai-wasleen-interiors-dubai-04.webp` | `pergola/aluminum-lift-slide-doors-windows.webp` |

*(If renaming is not desired, reference files via URL-encoded paths — but renaming is cleaner and keeps image filenames keyword-relevant.)*

### 5.2 Slot assignment

| Sheet | Image | Caption (mono) |
|---|---|---|
| 02 Story | `interior-fit-out-project-management-dcd-compliance-dubai-wasleen-interiors-dubai-18.webp` | `DCD COMPLIANCE · FIT-OUT PM` |
| 02b Craft | `pergola/aluminum-glass-cnc-machining.webp` | `OUR FACTORY FLOOR` |
| 02b Craft | `pergola/aluminum-glass-wind-load-engineering.webp` | `WIND-LOAD ENGINEERING` |
| 03 Interior card | `interior-fitout-company-dubai-wasleen.webp` | `INTERIOR · WASLEEN.COM` |
| 03 Pergolas card | `pergola/pergola-car-parking-ajman.webp` | `PERGOLAS · PERGOLAS.WASLEEN.COM` |
| 03b Bento large | `residential-interior-fitout-dubai-villa-design-wasleen.webp` | `PROJECT: VILLA FIT-OUT` |
| 03b Bento | `commercial-interior-fitout-dubai-office-renovation-wasleen.webp` | `OFFICE FIT-OUT · BUSINESS BAY` |
| 03b Bento | `pergola/aluminum-car-port-villas.webp` | `ALUMINIUM CARPORT · VILLA` |
| 03b Bento wide | `luxury-home-cinema-design-dubai-wasleen-interiors-02.webp` | `LUXURY CINEMA · CINEMAXSKY` |
| 03b Bento | `pergola/aluminum-lift-slide-doors-windows.webp` | `LIFT-SLIDE GLAZING · AL QUOZ` |
| 07 People | `Wasleen-interiors-fitouts-pergola-company-founder-owner.webp` | `FOUNDER & OWNER · REV A` |
| 07 People | `Wasleen-interiors-fitouts-pergola-company-cofounder.webp` | `CO-FOUNDER · REV A` |

### 5.3 Performance guardrails

- `next/image`, WebP, explicit `width`/`height` + `sizes`, `loading="lazy"` (only Sheet 02 image gets `priority`).
- Target total ~200–260KB; initial-load images minimal; **no hero photo** (keeps LCP < 1.5s).
- Blueprint-muted at rest + physical-photo rotation/shadows = CSS, zero extra bytes.

---

## 6. Motion & Performance Strategy

| Effect | Implementation | Cost |
|---|---|---|
| Gradient drift | oversized gradient layer, `transform: translate` 18–24s loop | compositor-only |
| Gradient text sweep | `bg-clip-text` + `background-position` on hover | negligible |
| Card border-draw | `::before`/`::after` scaling from a `transform-origin` edge | compositor-only |
| Blueprint grid | `repeating-linear-gradient` static layer | painted once |
| Count-up | ~1KB rAF hook, IO, runs once | one-time |
| **A1 cyanotype crossfade** | `data-theme` swap on page root drives CSS custom properties; 300–400ms crossfade on `background`/`color`; **snaps instantly under reduced motion**; **FOUC fix (Q1)**: blocking inline script sets theme pre-paint; **first-visit pulse (Q4)** fires once via dedicated `about-toggle-pulse-seen` key (not the theme key) | interaction-only repaint |
| **A2 scroll-scrubbed hero line** | one **passive** scroll listener, rAF-throttled, maps `stroke-dashoffset` to scroll fraction; `getTotalLength()` precomputed per path; **listener removed after hero leaves viewport**; static completed drawing under reduced motion | one rAF per frame, scoped to hero |
| **A3 dimension-line stats** | CSS/SVG container around reused `CountUp`; numbers stay DOM text | ~none |
| **A4 physical photos** | `transform: rotate(±1–2°)` → `rotate(0) translateY(-4px)` on hover; static tape/clip SVG asset; **night-mode filter (Q8)**: `brightness(0.92) saturate(0.85)` via `data-theme` class so photos sit on navy instead of floating | compositor-only; filter on static images (no blur, no animation) |
| **A5 sheet rail** | same IntersectionObserver pattern as `ScrollReveal`; real anchors; hidden <1024px | ~none |
| **A6 stamp** | CSS keyframe (`transform`/`opacity`), triggered once via IO, never replays; static settled state under reduced motion | one-time |
| **A7 custom cursor** | CSS `cursor: url(...) x y, auto` on interactive selectors, gated by `@media (hover:hover) and (pointer:fine)`; <2KB SVG (+PNG fallback) | ~none (no JS) |
| **A8 linen texture** | **pre-rendered tiled WebP (Q9)** `public/textures/linen.webp` at ~3% opacity, both themes — avoids Safari `feTurbulence` repaint cost overlapping A2's scroll work | static background |
| Scroll reveal | existing [`ScrollReveal`](../../src/components/blog/ScrollReveal.tsx) `.fade-in` → `.is-visible` | zero new JS |
| Hero SVG load | `.drawing-deferred` + `requestIdleCallback` (copy [`HeroSection`](../../src/components/sections/HeroSection.tsx:29)) | keeps LCP clean |
| "You are here" pulse | small CSS opacity keyframe | compositor-only |
| **Sheet 11 office maps** | 3 lazy aspect-box iframes (below the fold, `loading="lazy"`, explicit `width`/`height`/`aspect-ratio` so no CLS) — zero JS, no map SDK; each iframe only loads on scroll into view | lazy network request |

**All animation disabled under `prefers-reduced-motion`** (static final states visible; A1 crossfade snaps). No `filter: blur()` on large elements. No new dependencies. **One design principle governs the whole layer: one wow-moment used once beats five gimmicks everywhere.**

---

## 7. Signature Interaction Layer — A1–A8 (merged addendum)

> Design principle: **restraint is part of the award-winning look.** Each feature is used in exactly one intentional place.

| # | Feature | Location | Key build notes |
|---|---|---|---|
| A1 | **Cyanotype toggle** (night cyanotype ↔ day diazo print) | near hero, **sticky in-flow** (not `position:fixed`) | `data-theme="day"\|"night"` on page root → CSS custom properties (tokenized); **defaults to `night` (dark) on first visit for BOTH EN and AR — day is the opt-in light state**; **pre-paint theme via blocking inline script (Q1)** — no flash; `localStorage` persistence; **`aria-pressed` + dynamic `aria-label` (Q2)**; **first-visit pulse fires once, dedicated dismissal key (Q4)**; both states pass WCAG AA; crossfade snaps under reduced motion; never color-only |
| A2 | **Scroll-scrubbed hero drafting line** | Sheet 01 hero | keep idle-load; reveal via `stroke-dashoffset` ↔ scroll fraction across hero viewport; one passive rAF-throttled listener, removed after hero exits; reduced motion = static completed drawing |
| A3 | **Dimension-line stat band** | Sheet 05 | tick + leader line + end tick + number where measurement annotation sits; reuse `CountUp`; **numbers remain real DOM text** (screen reader + AI parse) |
| A4 | **Physical photo treatment** | Sheet 03b bento | ±1–2° alternating rotation, soft drop shadow, one taped-corner/binder-clip SVG detail; hover straightens + lifts; optional lightbox uses shutter/aperture transition (not in initial build) |
| A5 | **Sheet-number rail** | page edge, **desktop ≥1024px only** | scroll-spy via IO; real focusable `<a href="#sheet-N">` anchors with visible focus ring; hidden on mobile; **clicks do `scrollIntoView({behavior:'smooth'})` + `history.replaceState` (Q11)** — no back-button pollution; `behavior:'auto'` under reduced motion; raw hash jump preserved as no-JS fallback |
| A6 | **Single-use approval stamp** | Sheet 08 credentials | rubber-stamp SVG thuds down once (~200ms scale + slight rotation settle) on first scroll into view; ink-bleed baked into static SVG (`feTurbulence`/`feDisplacementMap` precomputed); static under reduced motion; **never replays** |
| A7 | **Custom drafting-pencil cursor** | interactive elements (parcel cards, toggle, outbound links) | pure CSS `cursor: url(...) x y, auto`; gated by `@media (hover:hover) and (pointer:fine)`; <2KB; **never on touch devices; focus rings untouched** |
| A8 | **Blueprint linen texture** | global background layer | whisper-thin ~3% static grain, **pre-rendered tiled WebP (Q9)**, not a live `feTurbulence` filter; tested in **both** cyanotype states |

### Explicitly out of scope (do not add)
- **Scroll-jacked / pinned horizontal sections** (Sheet 03 or elsewhere) — conversion risk. Bento may use horizontal scroll on tablet+ width only.
- **Sound design** (stamp thuds, ambient audio) — inappropriate for B2G/professional audience.
- **Any interaction that relies on color alone** to convey state (A1 pairs with icon/label changes).

### Architect's feasibility review (validated)
- **A1:** requires about-page colors to be plumbed through CSS custom properties (not hardcoded Tailwind color utilities) so both themes resolve; tokenized first. SSR-safe: default `night` (dark) on first visit for both EN and AR, apply saved theme on mount — **night is the client-approved default** (day is opt-in). **Q1 updates this:** pre-paint inline script (root layout, path-gated, isolated scope addition) removes the one-frame flash. Low risk.
- **A2:** the single scroll listener must be `{ passive: true }`, rAF-throttled, and removed once the hero leaves the viewport; text stays the LCP element (drawing is a background asset). Low–medium risk, mitigated. **Q3 adds:** real mid-tier Android device test to Phase H2 (not simulated throttling alone).
- **A5:** sections need `id="sheet-N"` anchors; rail must not overlap content on smaller desktop widths. Low risk. **Q11 adds:** smooth-scroll + `history.replaceState` (no-JS hash fallback preserved).
- **A7:** SVG cursor support varies — ship a tiny PNG fallback in the `url()` list. Low risk.
- **A6:** baked (non-live) SVG filter — zero runtime cost. Low risk. **Q9 moves A8 off `feTurbulence`** to a pre-rendered tiled WebP (Safari repaint safety).
- **Q8:** night-mode photo filter is a static `filter` on a few images — GPU-friendly, no animation, no blur. Low risk.
- **Q13:** feature flag is a build-time constant + conditional CSS import; content and schema are never gated. Low risk.

### 7.1 Final QA Addendum — Q1–Q13 (validated & merged)

All 13 refinements reviewed against the project rules, the codebase, and the A1–A8 design. **Verdict: all helpful — none harmful.** Three needed corrections, two verification notes (below). Refinements change **no** sheet structure, copy, or phase ordering.

| Q | Feature | Verdict | Resolution |
|---|---|---|---|
| Q1 | Theme-flash fix (blocking inline script) | Helpful · 1 scope note | Isolated root-layout scope addition, path-gated to `/about-us` + `/ar/about-us`; ~5 lines, zero bundle cost |
| Q2 | Toggle `aria-pressed` + `aria-label` | Helpful · as-is | Add to `CyanotypeToggle.tsx` (Phase B1a) |
| Q3 | Real mid-tier Android test | Helpful · as-is | Phase H2 gate — device test, not just throttling |
| Q4 | First-visit toggle pulse | Helpful · 1 correction | Use **dedicated `about-toggle-pulse-seen` key**, not the theme key (theme key is only written on toggle, so it cannot track first visit); respect reduced motion; **pulse only in the night default** (the new default is dark — the pulse tells first-time users the light/dark control exists) |
| Q5 | Analytics events | Helpful · as-is | `theme_toggle` + `sheet_rail_navigate` via existing `trackEvent()` |
| Q6 | Name RTL-sensitive pieces | Helpful · as-is | Rail side · dimension-line arrow · photo rotation — explicit in Phase H3 |
| Q7 | Print stylesheet | Helpful · 1 scope note | Page-scoped (about CSS, not globals); B/W technical sheet; title block + revision log intact |
| Q8 | Night-mode photo filter | Helpful · as-is | Static `brightness(0.92) saturate(0.85)` on `PhysicalPhotoFrame`/`FounderCard` via `data-theme` class |
| Q9 | Bake linen as static image | Helpful · as-is | `public/textures/linen.webp` (~2–5KB) replaces live `feTurbulence` |
| Q10 | JS-disabled test | Helpful · 1 verification note | Confirm existing `ScrollReveal` no-JS guard (js-class swap); critical story/table text must never be opacity-0 |
| Q11 | Rail smooth-scroll + `replaceState` | Helpful · 2 caveats | Keep real `href="#sheet-N"` as no-JS fallback; `behavior:'auto'` under reduced motion |
| Q12 | Print always day/high-contrast | Helpful · as-is | `@media print` hard-overrides `data-theme` (folded into Q7) |
| Q13 | A1–A8 feature flag | Helpful · 1 architecture note | Build-time constant `ABOUT_SIGNATURE_LAYER` + conditional signature-CSS import; content/schema never gated |

**Kept out (no new scope):** no change to sheet structure/copy/phase order; no new dependencies; no sound; no color-only state; no live filter textures.

---

## 8. Blockers — Decisions Required Before/During Build

| # | Blocker | Action | Owner |
|---|---|---|---|
| 1 | ~~Founding-year contradiction~~ **RESOLVED** | Timeline locked: **`2013 INTERIOR → 2018 APPROVALS → 2018 PERGOLAS → 2020 DIGITAL`** — Pergolas founded 2018 (8 years old as of 2026); Digital launched 2020. Note: Approvals and Pergolas both fall in 2018 — render two adjacent 2018 nodes, clearly labelled | **Closed — client-confirmed** |
| 2 | Group numbers (273+, 500+, 52+, 4 divisions) must match live sibling sites | Verify against wasleen.com / pergolas.wasleen.com at build time | Client/Code |
| 3 | Digital Solutions has no public count | Keep Digital parcel number-free (already planned) | — |
| 4 | Founder + co-founder **names** for Sheet 07 + Person schema | Supply names + optional LinkedIn URLs | Client |
| 5 | New gradient + cyanotype design tokens | Approve token additions in `tailwind.config.ts` (first build task) | Client |
| 6 | **Arabic copy source** for all 11 sheets + 02b (1:1 mirror) | Client supplies approved Arabic translations (matching the tone/quality of existing `/ar` pages), OR Code mode drafts them from EN copy following the existing Arabic page style — **decide before Phase A4 (data files)** | Client/Code |

---

## 9. Build Sequencing (Code mode — strict order, one task at a time)

### Phase A — Foundation
- [ ] A1. Approve + add gradient **and cyanotype** token sets to `tailwind.config.ts` (isolated)
- [ ] A2. Rename the 5 pergola images to slug-safe names (§5.1)
- [ ] A2a. **Create `lib/feature-flags.ts` with `ABOUT_SIGNATURE_LAYER` flag (Q13)** — single switch gating all A1–A8 components + signature CSS import
- [ ] A3. **Create `src/data/about.ts` (EN) + `src/data/about-ar.ts` (AR)** — typed sheet content, `id`-paired for parity (Arabic copy source per Blocker 6); both locales verified via `validate-ar-parity.js` discipline; **includes `officeLocations[]` (3 offices) + the `sheet-11` rail entry**
- [ ] A4. Verify `npm run build` passes

### Phase B — Reusable primitives
- [ ] B1. `BlueprintGrid.tsx` + `DraftingFrame.tsx` (crop marks, grid, mono caption)
- [ ] B1a. `CyanotypeProvider.tsx` + `CyanotypeToggle.tsx` + token plumbing (A1) — **Q1 pre-paint inline script in root layout (isolated scope addition, path-gated)**, **Q2 `aria-pressed`/`aria-label`**, **Q4 first-visit pulse (dedicated dismissal key)**
- [ ] B1b. Cursor CSS asset (A7) + **pre-rendered linen WebP (Q9, replaces live `feTurbulence`)**
- [ ] B2. `GradientMesh.tsx`
- [ ] B3. `CountUp.tsx` + `DimensionLineStat.tsx` (A3 shell)
- [ ] B4. Build gate (`npm run build`)

### Phase C — Sheets 01–02 (Hero + Story) + AR twin
- [ ] C1. `DivisionStrip.tsx` + Sheet 01 hero (idle-load + **scroll-scrubbed drafting line A2**, gradient drift, division strip with **real outbound links for Interior/Pergolas/Digital**, Approvals = you-are-here non-link)
- [ ] C2. Sheet 02 story (revision-log SVG, timeline rail) + Sheet 02b `CraftStrip.tsx`
- [ ] C2a. **AR parity:** wire Sheets 01–02 from `about-ar.ts` (same components, RTL logical props, Arabic `DivisionStrip`/`CraftStrip` captions) — Q6 hero mirrors
- [ ] C3. Build gate

### Phase D — Sheets 03 (Group centrepiece) + AR twin
- [ ] D1. `RevisionLogTable.tsx`
- [ ] D2. `ParcelGrid.tsx` (4 cards, images, outbound links + `trackEvent`)
- [ ] D3. `BentoGallery.tsx` with `PhysicalPhotoFrame.tsx` (A4) — **Q8 night-mode photo filter** (`data-theme` class)
- [ ] D4. **AR parity:** Sheet 03 revision table + parcel grid + Sheet 03b bento from `about-ar.ts` — Q6 photo rotation mirrors in RTL
- [ ] D5. Build gate

### Phase D+ — Sheet rail (desktop nav) + AR twin
- [ ] D+1. `SheetRail.tsx` (A5) — add `id="sheet-N"` anchors to all sheets, gate ≥1024px; **Q11 clicks: `scrollIntoView({behavior:'smooth'})` + `history.replaceState`, `behavior:'auto'` under reduced motion, real `href="#sheet-N"` preserved as no-JS fallback**
- [ ] D+2. **AR parity (Q6):** rail flips to left edge in RTL; Arabic `aria-label`s + `sheet_rail_navigate` target names
- [ ] D+3. Build gate

### Phase E — Sheets 04–06 (Light sheets) + AR twin
- [ ] E1. Sheet 04 (2×2 icon grid)
- [ ] E2. Sheet 05 numbers as **dimension-line band** (A3, `CountUp` reused)
- [ ] E3. Sheet 06 restyled Why-Choose cards
- [ ] E4. **AR parity:** Sheets 04–06 from `about-ar.ts` — Q6 dimension-line arrows flip in RTL
- [ ] E5. Build gate

### Phase F — Sheets 07–10 (People, Credentials, CTA, FAQ) + AR twin
- [ ] F1. `FounderCard.tsx` (Sheet 07, Person schema) — **Q8 night-mode photo filter**
- [ ] F2. Sheet 08 credentials (kept) + **single-use stamp A6** + Sheet 09 closing CTA + group directory strip + **Q7/Q12 print stylesheet (page-scoped, always day/high-contrast)**
- [ ] F3. `AboutFaq.tsx` (Sheet 10, FAQPage schema)
- [ ] F3a. **`OfficeMaps.tsx` (Sheet 11 — NEW, after FAQ):** 3-aligned office-location cards with lazy map iframes — approval HQ (embed sourced from the client share link) + 2 pergola offices (reuse Footer `pb=` embeds); NAP-verified address; "Get Directions" outbound link; **no new JSON-LD** (locations live in visible content + existing LocalBusiness schema)
- [ ] F4. **AR parity:** Sheets 07–11 from `about-ar.ts` — Arabic Person + FAQ schema copy, group directory strip RTL, **Sheet 11 office cards RTL-aligned**, `aria-label`s in Arabic
- [ ] F5. Build gate

### Phase G — Full SEO integration (EN + AR together)
- [ ] G1. Assemble full schema stack (AboutPage + Breadcrumb + Person×2 + ItemList + FAQPage) in `page.tsx`
- [ ] G2. Final metadata (title/desc/OG), generate `og-about-us.jpg`
- [ ] G2a. **Q5 analytics events** — `theme_toggle` (direction) + `sheet_rail_navigate` (target) via `trackEvent()`
- [ ] G3. Bump `/about-us` `lastMod` in `sitemap.ts`
- [ ] G4. **AR assembly:** rebuild `src/app/ar/about-us/page.tsx` — full Arabic schema stack (AboutPage / FAQPage / ItemList / Breadcrumb via `...,"ar"` generators, Person×2 Arabic), metadata (title from `AR.breadcrumb.aboutUs`, canonical `/ar/about-us`, `hreflangAlternates(SITE.url, "/ar/about-us")`, `og:locale "ar_AE"`), `dateModified` matching EN
- [ ] G5. Bump `/ar/about-us` `lastMod` in `sitemap.ts` (matches EN)
- [ ] G6. Final `npm run build` + `npm run lint` clean

### Phase H — Verification (EN + AR together — parity is part of this build, not follow-up)
- [ ] H1. Validate schema via Google Rich Results Test (EN **and** AR)
- [ ] H2. Lighthouse mobile/desktop (target 95+, LCP <1.5s, CLS <0.05) + **Q3 real mid-tier Android device test (not simulated throttling alone)** + **Q10 JS-disabled test (toggle defaults night; rail still navigable; critical text never opacity-0)** — on **both** locales
- [ ] H3. **Arabic parity verification (Q6):** sheet-by-sheet EN ⇄ AR mirror check (all 11 sheets + 02b — same images, numbers, interactions); run `validate-ar-parity.js` on `about.ts`/`about-ar.ts`; **explicitly verify — sheet-rail side flips to left edge in RTL, dimension-line arrow direction, physical-photo rotation direction mirrored, Sheet 11 office cards align identically in RTL, Q2/Q4/Q5/Q8 in Arabic, same theme key across locales, print (Q7/Q12) day-mode in AR**

---

## 10. Verification Gates (per `04-BUILD-SEQUENCING` + addendum)

- [ ] `npm run build` passes after every phase
- [ ] No TypeScript errors / lint warnings
- [ ] One H1; no skipped heading levels
- [ ] Every internal link points to a real page (no 404s)
- [ ] Descriptive anchor text only
- [ ] NAP byte-identical in footer, schema, page
- [ ] Visible content = schema content (FAQ + Person + ItemList)
- [ ] Canonical self-referencing; hreflang present
- [ ] All images: descriptive alt, explicit dims, lazy (except priority image)
- [ ] `prefers-reduced-motion` shows static final states
- [ ] Mobile-first check at 360–390px
- **Addendum gates:**
- [ ] **A1:** both cyanotype states independently pass WCAG AA (text, links, icons); toggle persists via `localStorage`; transition snaps under reduced motion; state not conveyed by color alone; **default is `night` on first visit for both EN and AR (day = opt-in)**
- **Client-change addendum gates (6 updates):**
- [ ] **Dark hero (night):** Sheet 01 hero banner renders on the night background (`--about-bg-deep` `#06223C`) when the toggle is night — never white; heading `#D0E3F8` on navy ≈13:1, body `#EAF3FC` ≈14:1, amber CTA `#F5A623` ≈6:1 (all pass WCAG AA); blueprint grid + mono captions remain legible on navy; day hero unchanged
- [ ] **Division-strip links:** Interior → `https://wasleen.com`, Pergolas → `https://www.pergolas.wasleen.com`, Digital → `https://wasleen.com/wasleen-digital` — each a real outbound `<a>` (`target="_blank" rel="noopener"`, `trackEvent("outbound_click")`); Approvals = "you are here" non-link; visible focus + hover state; legible in both themes
- [ ] **Timeline years:** Sheet 02 shows `2013 INTERIOR → 2018 APPROVALS → 2018 PERGOLAS → 2020 DIGITAL` (Pergolas 2018 = 8 years old; Digital 2020); both 2018 nodes visible and clearly labelled; mirrored in AR
- [ ] **Sheet 11 maps:** 3 office cards align on one even grid (1-col mobile → 3-col desktop) with equal aspect-ratio lazy iframes (no CLS); approval-HQ embed sourced from the client share link (Share → Embed a map → copy `pb=` src) with NAP-verified pin; fallback `https://www.google.com/maps?q=<address>&output=embed`; two pergola offices reuse Footer `pb=` embeds; `loading="lazy"` + explicit `width`/`height`/`aspect-ratio`; no new schema
- [ ] **Why-Choose gradient:** Sheet 06 cards keep the live-site copy verbatim (Regulatory Expertise / Proven Track Record — 500+ successful approvals / Dedicated Support / End-to-End Service) and render the **themed grid gradient** `linear-gradient(160deg, var(--about-card), var(--about-surface))` — resolves in BOTH day and night (card text passes AA in both themes)
- [ ] **A2:** scroll listener passive + rAF-throttled + removed after hero exits; static drawing under reduced motion
- [ ] **A3:** dimension-line numbers remain real DOM text (screen reader + AI parseable)
- [ ] **A4:** rotation/shadow compositor-only; hover straighten+lift
- [ ] **A5:** rail links are real, focusable, tab-navigable anchors with visible focus ring; hidden <1024px
- [ ] **A6:** stamp fires once only (no replay on re-scroll); static fallback under reduced motion
- [ ] **A7:** custom cursor never on touch devices; keyboard focus states unaffected
- [ ] **A8:** linen texture legible/appropriate in both cyanotype states
- **Final QA addendum gates (Q1–Q13):**
- [ ] **Q1:** saved theme applies before first paint (no flash) — verified via hard refresh with night theme saved
- [ ] **Q2:** toggle has `aria-pressed` + descriptive `aria-label`; screen-reader announced correctly
- [ ] **Q3:** A2 tested on one real mid-tier Android device, not simulated throttling alone
- [ ] **Q4:** toggle first-visit pulse fires once, never replays after dismissal
- [ ] **Q5:** `theme_toggle` and `sheet_rail_navigate` events fire correctly in analytics
- [ ] **Q6:** RTL parity task explicitly covers sheet rail side, dimension-line direction, photo rotation direction
- [ ] **Q7/Q12:** print preview renders clean B/W technical sheet, day/high-contrast, regardless of on-screen toggle state
- [ ] **Q8:** photos in night mode read as part of the same page, not pasted on top
- [ ] **Q9:** linen texture (A8) is a static baked image, not a live SVG filter
- [ ] **Q10:** page fully readable and navigable with JS disabled
- [ ] **Q11:** sheet rail navigation doesn't pollute browser back-button history
- [ ] **Q13:** A1–A8 can be disabled via a single feature flag without affecting Sheets 01–11 content or schema
- **Arabic parity gates (client directive — non-negotiable):**
- [ ] `/ar/about-us` renders **all 11 sheets + 02b** — 1:1 mirror of EN (nothing cut, simplified, or deferred)
- [ ] Same images, same numbers (273+, 500+, 52+, 4), same A1–A8 interactions, RTL-safe (Q6)
- [ ] Same schema stack via `...,"ar"` generators; visible AR text = AR schema text; NAP byte-for-byte English
- [ ] AR metadata: title, canonical `/ar/about-us`, `hreflangAlternates`, `og:locale "ar_AE"`; `dateModified` matches EN
- [ ] Reuses existing `ar/layout` + `siteConfig("ar")` + locale helpers — **no conflicts with other codebase/structure**
- [ ] `validate-ar-parity.js` discipline applied to `about.ts`/`about-ar.ts`; `npm run build` clean with both locales

---

## 11. Out of Scope (do not touch)

- Homepage, approval/guide/service pages, Header, Footer, MobileNav, popup, analytics plumbing, logo/favicon files. (Arabic `/ar/about-us` parity **IS in scope** — built alongside every phase.)
- Root layout `src/app/layout.tsx` — **except the single Q1 inline theme script (isolated Phase B1a scope addition, path-gated)**.
- Scroll-jacked/pinned horizontal sections, sound design, color-only state indicators, live SVG filter textures (Q9), new dependencies (per base plan + addendum).
