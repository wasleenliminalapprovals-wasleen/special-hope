# MASTER FILE — Bilingual (EN/AR) Architecture, Technical SEO & AI-Search Domination Blueprint
**Target Domain:** `https://www.dubaiapprovalconsultants.com/`
**Purpose:** Single source of truth for Roo Code + DeepSeek API to build, translate, and technically optimize 100+ pages in English and Gulf Arabic — 100/100 PageSpeed, zero duplicate-content risk, #1 Google ranking (EN + AR), and full visibility in AI search engines (Google AI Overviews, ChatGPT Search, Perplexity, Gemini).

Feed this entire file to Roo Code as project context / system instructions before any implementation task begins.

---

## 0. Non-Negotiable Engineering Principles

1. **Static-first, zero client-side translation.** No runtime widgets, no `Google Translate` plugins, no JS-based language swapping. These kill Core Web Vitals and confuse crawlers.
2. **Every page is pre-rendered HTML at build time** (SSG via Next.js `generateStaticParams` ). The browser must only parse static markup — this is what guarantees 100/100 PageSpeed.
3. **One URL = one language = one canonical.** Never serve two languages from the same URL, and never use query params (`?lang=ar`) for language switching — this fragments SEO equity and confuses hreflang.
4. **Content is localized, never translated literally.** Word-for-word translation reads as robotic to both users and Google's quality systems (and now to AI answer engines evaluating trustworthiness).
5. **Every English page must have a 1:1 Arabic counterpart** at launch, or the hreflang cluster is broken and Google may ignore the annotations entirely.

---

## 1. URL & Site Architecture

```
English: https://www.dubaiapprovalconsultants.com/[slug]
Arabic:  https://www.dubaiapprovalconsultants.com/ar/[slug]
```

Rules for Roo Code:
- Root domain (no subdirectory) = English, default/`x-default`.
- `/ar/` subdirectory = Arabic. **Do not use a subdomain** (`ar.dubaiapprovalconsultants.com`) — subdirectories consolidate domain authority under one root, which is critical for a newer domain trying to outrank established competitors.
- Slugs should NOT be transliterated English inside the Arabic path (avoid `/ar/dewa-approvals`). Where feasible, use localized Arabic slugs (`/ar/موافقات-ديوا`) OR a clean transliterated business-safe slug (`/ar/dewa-mowafaqat`) — test both; Arabic-script slugs perform better in `site:` and voice search but require correct URL-encoding and og:url handling. Default recommendation: **keep Arabic-script slugs**, since Google indexes UTF-8 Arabic slugs cleanly in 2026 and they visually match the SERP snippet, increasing CTR.
- Homepage Arabic version: `https://www.dubaiapprovalconsultants.com/ar/` (trailing slash, not `/ar/home`).

---

## 2. Automating Native Arabic Localization at Scale (Roo Code + DeepSeek API)

Build a Node.js batch script (`/scripts/localize-content.js`) that:
1. Reads every English content file from `/content/en/`.
2. Sends each to the DeepSeek API with the system prompt below.
3. Writes localized output to `/content/ar/` with matching filenames.
4. Logs a diff report so you can spot-check before publishing (never auto-publish AI translations blind).

### DeepSeek API System Prompt (production version)

```
You are an elite, native Emirati/Gulf Arabic legal & business copywriter and SEO strategist, 
specialized in UAE government approvals (DM, DDA, DEWA, DCD, Trakhees, Civil Defence).

Localize the provided English content into professional, authoritative Gulf Arabic 
(Modern Standard Arabic with Gulf business register — NOT Egyptian or Levantine dialect).

Rules:
1. DO NOT translate word-for-word. Write as a senior Dubai-based consultant would naturally explain it to a client.
2. Naturally embed high-intent local search phrases relevant to the topic, for example:
   "استخراج موافقة بلدية دبي", "تصريح دفاع مدني دبي", "رخصة تراخيص دبي", 
   "موافقة ديوا", "استشارات الموافقات الحكومية في دبي"
   — but ONLY where topically accurate. Never keyword-stuff.
3. Preserve all HTML tags, Markdown syntax, frontmatter, and component variables (e.g. {{price}}, <Button>) exactly as-is — translate only human-readable text nodes.
4. Write headings (H1–H3) as genuine Arabic search queries a UAE business owner would type, not literal translations of the English headline.
5. Use RTL-natural sentence structure — do not mirror English sentence order.
6. Keep numerals, phone numbers, and government entity official names in their correct bilingual form (e.g. keep "DEWA" recognizable alongside "ديوا").
7. Output ONLY the translated content. No preamble, no notes, no markdown fences.
```

### Batch Script Requirements for Roo Code
- Rate-limit DeepSeek calls (avoid 429s) with a queue + exponential backoff.
- Store a `translation-manifest.json` mapping `en_slug → ar_slug → last_synced_hash` so re-runs only translate changed files (content hash diffing), saving API cost.
- Add a `--review` flag that outputs translations to a staging folder first, never directly to production content.
- Human review pass required for: pricing pages, legal/compliance claims, government process pages (accuracy > speed, since incorrect approval process info is a trust and E-E-A-T risk in a regulated niche).

---

## 3. Technical SEO — Hreflang, Canonical & Indexation

### 3.1 Required `<head>` tags on every page pair

```html
<!-- English page: https://www.dubaiapprovalconsultants.com/dewa-approvals -->
<link rel="canonical" href="https://www.dubaiapprovalconsultants.com/dewa-approvals" />
<link rel="alternate" hreflang="en-AE" href="https://www.dubaiapprovalconsultants.com/dewa-approvals" />
<link rel="alternate" hreflang="ar-AE" href="https://www.dubaiapprovalconsultants.com/ar/dewa-approvals" />
<link rel="alternate" hreflang="x-default" href="https://www.dubaiapprovalconsultants.com/dewa-approvals" />

<!-- Arabic page: https://www.dubaiapprovalconsultants.com/ar/dewa-approvals -->
<link rel="canonical" href="https://www.dubaiapprovalconsultants.com/ar/dewa-approvals" />
<link rel="alternate" hreflang="en-AE" href="https://www.dubaiapprovalconsultants.com/dewa-approvals" />
<link rel="alternate" hreflang="ar-AE" href="https://www.dubaiapprovalconsultants.com/ar/dewa-approvals" />
<link rel="alternate" hreflang="x-default" href="https://www.dubaiapprovalconsultants.com/dewa-approvals" />
```

**Critical rule:** hreflang must be **bidirectional and reciprocal** on every page in the cluster, or Google discards the whole annotation set. Roo Code should generate this automatically from the route's slug pair via a shared layout/config, never hand-authored per page (hand-authoring at 100+ pages guarantees drift and broken reciprocity).

### 3.2 `<html>` attribute switch
```html
<!-- English routes -->
<html lang="en-AE" dir="ltr">
<!-- Arabic routes -->
<html lang="ar-AE" dir="rtl">
```
Driven dynamically by the route segment, not by a manual per-page setting.

### 3.3 Sitemaps
- Generate **two sitemaps**: `sitemap-en.xml` and `sitemap-ar.xml`, referenced from a single `sitemap-index.xml`.
- Each `<url>` entry should also include `<xhtml:link>` alternate tags mirroring the hreflang pairs (belt-and-suspenders — Google primarily trusts in-page hreflang, but sitemap-level annotations reinforce it and help faster on large sites).
- Submit both to Google Search Console **as separate properties or via the same property with both sitemaps declared**.

### 3.4 robots.txt
- Do not block `/ar/` anywhere. Confirm no legacy `Disallow: /ar/` from a prior staging config.
- Add explicit sitemap references:
```
Sitemap: https://www.dubaiapprovalconsultants.com/sitemap-index.xml
```

### 3.5 Google Search Console Setup
- Add `https://www.dubaiapprovalconsultants.com/` as the property (Domain property preferred — captures both language paths automatically).
- Once both language clusters are indexed, monitor **Pages > Indexing** report split by URL pattern to catch Arabic-specific indexing failures early (common: soft 404s from thin auto-translated stubs).
- Do NOT use the deprecated "International Targeting" country setting for language issues — hreflang is language-based, not country-based; keep country targeting unset unless you truly want to exclude other Arabic-speaking markets (Saudi, Egypt) from ever seeing the English version in their SERPs.

---

## 4. Gulf Arabic Keyword Research (Pinpoint Accuracy)

Literal English→Arabic keyword translation is the #1 reason bilingual sites fail to rank in Arabic. Government-approval and pergola/fabrication searches in the UAE are dominated by **colloquial Gulf phrasing**, not textbook MSA.

Roo Code + DeepSeek workflow:
1. For every English seed keyword, generate 5–8 Gulf-Arabic query variants (formal MSA, colloquial Gulf, and "how do I..." conversational forms — the third category is what AI search engines match against).
2. Cross-check each variant's real search volume via Google Keyword Planner API (Arabic locale, UAE geo) before committing — DeepSeek can hypothesize phrasing, it cannot verify real demand.
3. Prioritize **transactional + local-intent** clusters first: "استخراج + [service]", "[service] + دبي", "كم تكلفة + [service]", "أفضل شركة + [service] في دبي".
4. Build an Arabic keyword-to-page map (spreadsheet or Supabase table) before content generation — one primary keyword cluster per page, no cannibalization between EN and AR pages targeting the same intent (they should be treated as separate SERPs, not duplicates).

---

## 5. On-Page Content Rules (Arabic)

- **Title tags**: Arabic title tags should front-load the primary local query, and stay under ~60 characters *rendered* — Arabic script renders wider per character than Latin, so the practical limit is closer to 45–50 Arabic characters to avoid SERP truncation.
- **Meta descriptions**: Written as a genuine answer/benefit statement in Gulf business tone, not a translated English meta.
- **H1/H2 structure**: Headings phrased as real Arabic search queries (see DeepSeek prompt rule 4 above) — this doubles as AI-search optimization since LLM answer engines extract headings as candidate direct-answer text.
- **First 100 words**: Must contain the direct, extractable answer to the primary query in plain Arabic sentences — critical for both Google's featured snippets and AI Overviews/ChatGPT Search citation selection.
- **Internal linking**: Arabic pages link to other Arabic pages by default; only cross-link to English when no Arabic equivalent exists yet. Never mix EN/AR internal links inside body copy without a clear language-switch UI cue.
- **Numerals**: Use Eastern Arabic vs. Western Arabic numerals consistently based on what your specific audience segment expects in UAE business content — Western numerals (1,2,3) are standard for UAE business/government content; do not default to Eastern numerals (١٢٣) unless explicitly targeting a more traditional MSA audience.

---

## 6. Structured Data (Schema) — Bilingual & AI-Search Ready

### 6.1 LocalBusiness / ProfessionalService Schema
- Maintain **one JSON-LD block per language**, injected per page, not a single mixed-language block.
- Include `"availableLanguage": ["en", "ar"]`.
- Arabic schema must have genuinely translated `name`, `description`, `areaServed`, and `serviceType` fields — do not just duplicate the English schema with an Arabic wrapper.
- Include `sameAs` linking to your Google Business Profile, and ensure the GBP itself has an Arabic business description (see Section 8).

### 6.2 FAQPage Schema (Arabic)
- Every FAQ page/section needs native Arabic Q&A pairs in the schema — this is the single highest-leverage schema type for AI Overviews and ChatGPT Search citations in 2026, since these engines heavily mine FAQPage and HowTo schema for direct-answer extraction.
- Questions should mirror actual Arabic search queries from Section 4's keyword map, not translated English FAQ questions.

### 6.3 BreadcrumbList Schema
- Localized breadcrumb labels per language (`الرئيسية > الموافقات > موافقة ديوا` vs `Home > Approvals > DEWA Approval`).

### 6.4 Service / HowTo Schema for Approval Processes
- Government approval processes (DEWA, DCD, DDA, Trakhees, etc.) are ideal `HowTo` schema candidates — step-by-step, numbered, in Arabic — this format is disproportionately favored by AI answer engines when a user asks "how do I get DEWA approval in Dubai."

---

## 7. AI Search Engine Optimization (GEO — Generative Engine Optimization)

Beyond classic SEO, structure content so LLM-based engines (Google AI Overviews, ChatGPT Search, Perplexity, Gemini, Copilot) select and cite you as a source, in **both** languages:

1. **Answer-first structure**: Every page should have a 2–3 sentence direct answer immediately after the H1, before any marketing copy — both EN and AR versions.
2. **Self-contained sections**: Each H2 section should be understandable in isolation (AI engines often extract a single section, not the whole page) — include the entity name (e.g., "Dubai Approval Consultants" / "دبي أبروفال كونسلتنتس") within key sections rather than relying on pronouns, so extracted snippets remain attributable.
3. **Original data/proof points**: Include specific, citable facts your competitors don't have (approval timelines in business days, real fee ranges, number of projects completed) — AI engines strongly prefer citing pages with concrete, checkable numbers over generic marketing claims.
4. **Author/entity signals**: Add an `Organization` schema with clear `founder`/`employee` entities and credentials where relevant — E-E-A-T signals matter more, not less, for AI citation in regulated/government-adjacent niches.
5. **Freshness signals**: Include a visible "last updated" date on process/approval pages and keep `dateModified` in schema accurate — approval procedures and fees change, and AI engines deprioritize stale process content.
6. **Bilingual consistency check**: Run a periodic audit prompting ChatGPT Search and Perplexity directly with your target Arabic queries to check whether your Arabic pages are being surfaced/cited at all — if not, diagnose via Section 3 (indexation) before assuming it's a content quality issue.

---

## 8. Local SEO — Google Business Profile (Arabic)

- Add a fully Arabic-translated business description (not machine-translated — use the DeepSeek localized version, human-reviewed).
- Add Arabic service names inside GBP's Services section.
- Encourage/request customer reviews in Arabic where possible — Google's local ranking algorithm and AI Overviews both weight language-matched review content when a query is in Arabic.
- Ensure NAP (Name, Address, Phone) consistency across GBP, schema, and footer in both language versions — inconsistent bilingual NAP is a common local-pack ranking suppressor.

---

## 9. Zero-Bloat RTL Styling (Preserving 100/100 Performance)

Instruct Roo Code to use **CSS Logical Properties** exclusively — this mirrors layout for RTL automatically from the same stylesheet, at zero extra byte weight:

| Instead of | Use |
|---|---|
| `margin-left` / `margin-right` | `margin-inline-start` / `margin-inline-end` |
| `padding-left` / `padding-right` | `padding-inline-start` / `padding-inline-end` |
| `text-align: left/right` | `text-align: start/end` |
| `left: 0` / `right: 0` (positioning) | `inset-inline-start: 0` / `inset-inline-end: 0` |
| `border-left` | `border-inline-start` |
| `float: left/right` | `float: inline-start/inline-end` |

- No separate RTL stylesheet, no extra JS-based mirroring library — the `dir="rtl"` attribute on `<html>` combined with logical properties handles it natively in all modern browsers.
- Arabic typography: load a proper Arabic-optimized web font (e.g., a variable font covering Arabic + Latin) with `font-display: swap` and subset to required glyphs only, to avoid CLS/LCP regressions on Arabic pages specifically — test Arabic page Lighthouse scores separately from English, they are not guaranteed identical.

---

## 10. Performance & Core Web Vitals Checklist (Both Languages)

- Static HTML output for every EN and AR page (Section 0).
- Images: served via modern formats (AVIF/WebP), responsive `srcset`, lazy-loaded below the fold.
- Fonts: preloaded for the critical Arabic/Latin font subset in use on that specific route.
- No render-blocking third-party scripts on either language version — audit that analytics/chat widgets don't disproportionately slow the Arabic route.
- Run Lighthouse/PageSpeed Insights on **both** an English and an Arabic URL after every deploy — RTL layout shifts are a common, easy-to-miss CLS regression source that English-only testing won't catch.

---

## 11. Roo Code — Action Plan / Build Sequence

1. Set up the dynamic route handler for `/ar/[...slug]` alongside the existing `/[...slug]`.
2. Build the shared `<html lang dir>` wrapper that reads the active locale from the route segment.
3. Build `/scripts/localize-content.js` — the DeepSeek batch localization pipeline (Section 2), with manifest-based diffing and a `--review` staging mode.
4. Build a shared `<Hreflang>` layout component that auto-generates all four required tags (Section 3.1) from a single slug-pair config — never hand-author per page.
5. Generate `sitemap-en.xml`, `sitemap-ar.xml`, `sitemap-index.xml` with reciprocal alternate annotations.
6. Build the bilingual JSON-LD schema components: `LocalBusiness`, `FAQPage`, `BreadcrumbList`, `HowTo` (Section 6), each accepting a `locale` prop.
7. Convert all CSS to logical properties (Section 9); remove any physical `left/right` properties from the global stylesheet.
8. Build the Arabic keyword-to-page mapping table (Section 4) before generating any new Arabic content — this drives H1/H2/meta generation, not the reverse.
9. Implement answer-first content structure (Section 7) in the page template for both locales.
10. Deploy to staging, run Lighthouse on both locale versions of at least 3 representative page types, fix any RTL-specific CLS/LCP regressions.
11. Submit both sitemaps to Google Search Console; monitor indexation split by language for the first 2–4 weeks post-launch.
12. Set up a recurring (monthly) GEO audit (Section 7.6) — manually query ChatGPT Search/Perplexity with top Arabic target queries and log whether the site is cited.

---

## 12. Ongoing Monitoring & KPIs

| Metric | Tool | Target |
|---|---|---|
| PageSpeed score (EN + AR, mobile) | PageSpeed Insights | 95–100 both locales |
| Indexed pages (EN vs AR split) | GSC Coverage report | ~1:1 parity within 4 weeks |
| Arabic keyword rankings | GSC Performance (filter by Arabic queries) / rank tracker | Top 10 for priority cluster within 90 days |
| AI engine citation rate | Manual monthly query audit | Cited in ≥1 AI engine per priority query within 90 days |
| Local pack visibility (Arabic queries) | GBP Insights / manual search | Appear in local pack for top 5 service+location terms |
| Hreflang errors | GSC International Targeting / Screaming Frog | Zero reciprocal errors |

---

**End of master file.** Feed this directly to Roo Code as persistent project context, and reference specific section numbers when issuing individual build tasks so implementation stays traceable to this spec.
