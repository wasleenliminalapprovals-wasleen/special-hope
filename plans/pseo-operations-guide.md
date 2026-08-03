# pSEO Operations Guide — Manual Work, Images & Weekly Review

**Location:** `plans/pseo-operations-guide.md`
**Applies to:** The pSEO domination engine (`dubaiapprovalconsultants.com`)
**Companion to:** `plans/pseo-domination-engine-plan.md` (architecture & build)

The pSEO engine is fully automated. **You do not check pages every day.** This guide is the
small, deliberate manual work that keeps the machine accurate and the pages trustworthy —
roughly **10–20 minutes once per week**.

---

## 1. The Automation (what runs without you)

| Cadence | Job | Script | Output |
|---|---|---|---|
| 9:00 AM / 3:00 PM / 9:00 PM UAE (daily) | Generate next 3 pages (EN + Gulf-Arabic AR) | [`scripts/pseo/generate.ts`](../scripts/pseo/generate.ts) | `src/data/pseo/pseo-pages.json`, `pseo-pages-ar.json`, `scripts/pseo/queue.json` |
| Sunday 8:00 AM UAE | Weekly fact-review report | [`scripts/pseo/weekly-report.ts`](../scripts/pseo/weekly-report.ts) | `scripts/pseo/fact-review.md`, `scripts/pseo/reports/LATEST.md` |

Everything is committed and pushed by GitHub Actions (`.github/workflows/pseo-generate.yml`),
which triggers Vercel's auto-rebuild. Generated pages are automatically added to the sitemap
(`src/app/sitemap.ts`) and the `llms.txt` / `llms-full.txt` routes, in both English and Arabic.

**Your only recurring manual task is the Sunday fact-review** — see Section 2.

---

## 2. The Weekly Fact-Review (10–20 min, Sunday)

### 2.1 How the fact gate works

Every fee/timeline figure a page publishes is checked against the authority **fact sheet**
(`src/data/fact-sheets/*.ts`). Any figure not found in the fact sheet is flagged as
`needs-review` and written to [`scripts/pseo/fact-review.md`](../scripts/pseo/fact-review.md) as
an unchecked `- [ ]` item. This is a **conservative** scanner — it only ever adds findings, it
never silently approves a number.

### 2.2 The Sunday workflow

1. **Open the Sunday report** — `scripts/pseo/reports/LATEST.md` (or `fact-review.md` directly).
2. **Read each finding.** Every line looks like:
   ```md
   ## 2026-08-02 — dewa-approval-connection-complete-guide (dewa)
   - [ ] FAQ "What is the DEWA connection fee ...": "AED 100" — not found in the ...
   ```
   Each finding names the page slug, the authority, where the figure appears, and the exact figure.
3. **Verify against the official authority portal** (never a third-party source):
   - Dubai Municipality: `dm.gov.ae` (Buildings / Permits fees)
   - Dubai Civil Defense: `dcd.gov.ae` (Fire safety NOC fees)
   - DEWA: `dewa.gov.ae` (connection tariffs)
   - DDA: `dda.gov.ae` (fit-out guidelines)
   - DET: `ded.ae` (trade license fees)
   - RERA / Ejari: `rera.gov.ae`, `ejari.ae`
   - RTA: `rta.ae` (transport/permits)
   - DHA: `dha.gov.ae` (health approvals)
   - Dubai Police: `dubaipolice.gov.ae` (security NOCs)
4. **Two possible outcomes:**
   - **Figure is correct** → tick the box in `fact-review.md` (`[x]`) and add the fee/timeline to
     the relevant fact sheet (`src/data/fact-sheets/<authority>.ts`) so future pages inherit it.
   - **Figure is wrong or outdated** → correct the page content directly in
     `src/data/pseo/pseo-pages.json` (and `pseo-pages-ar.json`), then update the fact sheet.
5. **When the whole sheet is verified**, set `lastVerified` to today's real date
   (e.g. `"2026-08-09"`) in that authority's fact sheet. Pages whose authority has a
   `lastVerified` date are no longer force-marked `needs-review`.
6. **Commit and push.** Vercel rebuilds. You're done for the week.

> **Never bump `lastVerified` without actually verifying** — the `dateModified` shown on pages
> and in schema must be honest.

### 2.3 How to read the summary footer

`fact-review.md` ends with a regeneration summary:
```md
_Regenerated 2026-08-02: 9 pages scanned, 44 unverified figure(s) across 9 page(s)._
```
- **"No unverified figures found."** under a page = that page is fully covered by its fact sheet.
- A page listing findings = figures still need human confirmation (or belong in the fact sheet).
- **"No fact sheet for this authority — all figures are unverified."** = the authority has **no
  fact sheet at all** — highest priority to fix (see Section 4, gap #1).

---

## 3. Image Naming Convention & the 20 Planned Images

### 3.1 Naming convention (for ALL new images)

```
{subject}-{context}-{location}.webp
```
- **lowercase, hyphenated, keyword-descriptive** (SEO filenames matter)
- WebP format, reasonable dimensions (1200×1200, 1920×1080, 2336×1760 are all in use)
- Every image lives in `public/images/` and must be registered in
  [`src/data/images.ts`](../src/data/images.ts) with `alt`, `caption`, `topicTags` and an Arabic
  `ar` block.

### 3.2 The 20 planned images (reserved, `status: "planned"`)

These filenames are already registered in [`src/data/images.ts`](../src/data/images.ts) (lines
267–506) with alt text, captions and Arabic variants. **They are excluded from auto-matching
until the `.webp` file physically exists in `public/images/`.**

To activate one: (1) drop the `.webp` into `public/images/`, (2) flip its `status` to
`"available"` in `images.ts`.

| # | Filename (add to `public/images/`) | Best match (topic tags) |
|---|---|---|
| 1 | `dubai-approval-consultants-consultation.webp` | general consultation |
| 2 | `dm-building-permit-dubai-municipality.webp` | dm, building-permit |
| 3 | `dcd-fire-safety-noc-dubai-civil-defense.webp` | dcd, fire, safety, noc |
| 4 | `dewa-electricity-connection-approval.webp` | dewa, utility, connection |
| 5 | `dda-fit-out-approval-engineering.webp` | dda, fitout, engineering |
| 6 | `trade-license-approval-dubai-business-activity.webp` | trade, license, business |
| 7 | `restaurant-food-business-approval-dubai.webp` | restaurant, food, dm |
| 8 | `approval-cost-fees-budget-dubai.webp` | cost, fees, budget |
| 9 | `mainland-vs-free-zone-approval-dubai.webp` | compare, mainland, freezone |
| 10 | `approval-rejection-reasons-dubai.webp` | rejection, troubleshooting |
| 11 | `ejari-tenancy-registration-dubai.webp` | ejari, tenancy, rera |
| 12 | `blueprint-drawing-submission-approval-dubai.webp` | drawing, blueprint, submission |
| 13 | `commercial-office-fit-out-approval-dubai.webp` | fitout, office, commercial |
| 14 | `warehouse-industrial-approval-dubai.webp` | warehouse, industrial, dm |
| 15 | `mep-electrical-mechanical-approval-dubai.webp` | mep, electrical, mechanical |
| 16 | `signage-advertising-approval-dubai.webp` | signage, advertising, dm |
| 17 | `structural-approval-engineering-dubai.webp` | structural, engineering, dm |
| 18 | `villa-renovation-approval-dubai.webp` | villa, residential, renovation |
| 19 | `free-zone-community-noc-approval-dubai.webp` | freezone, community, noc |
| 20 | `project-completion-handover-approval-dubai.webp` | completion, handover, dm |

### 3.3 Current image situation (known limitation)

- **17 images are `available`** and already auto-matched by the engine
  ([`pickImage`](../scripts/pseo/generate.ts:153) → `matchImageByTopic` in
  [`src/data/images.ts`](../src/data/images.ts:537)).
- Because only 17 exist, **pages reuse images** (e.g. the same consultation or fit-out shot
  appears on several pages). This is acceptable short-term but weakens image-uniqueness for SEO.
- **Priority:** create the 20 planned images for the 20 most important topics, then expand with
  new `{subject}-{context}-{location}.webp` files as the queue grows. Each new image should be
  registered with unique `alt`/`caption`/`topicTags` + Arabic variants.

---

## 4. Known Gaps to Resolve

| # | Gap | What to do |
|---|---|---|
| 1 | **`restaurant-food-business-approval-checklist` has authority `dm-food` with NO fact sheet** | Create `src/data/fact-sheets/dm-food.ts` (DM Food Control fees/timelines) **or** remap the queue item's `authority` to `dm` if figures belong to Dubai Municipality generally. Until fixed, every figure on that page is "unverified". |
| 2 | **All fact sheets start with `lastVerified: "pending"`** | Every page stays `needs-review` until you complete the Sunday verification for each authority. This is by design — do it once per authority and it cascades to all its pages. |
| 3 | **Image reuse (17 available images)** | Create the 20 planned images (Section 3.2) to give each major topic a dedicated image. |
| 4 | **Fact sheets exist for 10 authorities only** | As the queue expands into other authorities (e.g. `dubai-south`, `dmcc`, `jafza`, `tra`), create a fact sheet for each **before** scheduling pages for it, or every page it generates will be flagged unverified. |
| 5 | **No Arabic fact sheet files** | Arabic pages inherit figures from the EN fact sheet. If an authority publishes different Arabic fees, add an `ar` block to the fact sheet. |

---

## 5. Adding New Content (the pipeline in plain English)

1. **Reserve a slug** — add a `PseoQueueItem` to [`scripts/pseo/queue.json`](../scripts/pseo/queue.json)
   with `status: "pending"`, `scheduledDate`, `kind`, `authority`, keywords, and related approval
   slugs. Run `npx tsx scripts/pseo/validate-queue.mjs` (or `npx tsx scripts/pseo/queue.ts`) to
   check for slug collisions.
2. **Ensure a fact sheet exists** for that `authority` (see gap #4) and that the
   `relatedApprovalSlugs` all resolve to real approval pages (the engine's internal-link mesh).
3. **Let the cron pick it up** — the next scheduled batch generates the EN + AR page, runs the
   quality gate (word count, FAQ depth, ≥3 internal links, meta lengths, sibling similarity) and
   the fact gate, writes the JSON stores, and commits.
4. **Verify it appears** in `fact-review.md` on the next Sunday, and in the sitemap / llms files
   (auto).

**Do not** edit `src/data/pseo/pseo-pages.json` by hand for routine additions — always go through
the queue so quality gates and fact flags run.

---

## 6. Manual Commands (developer / troubleshooting)

Run from the project root:

```bash
# Generate the next 3 queued pages (EN + AR) locally
npx tsx scripts/pseo/generate.ts 3

# Re-run the weekly fact-review report locally
npx tsx scripts/pseo/weekly-report.ts

# Validate the queue (slug collisions, schema shape)
npx tsx scripts/pseo/validate-queue.mjs

# Type-check the whole project
npx tsc --noEmit

# Full SSG build (confirms every generated page compiles)
npm run build
```

> **Windows cmd note:** do not run inline `npx tsx -e "..."` with nested quotes — write a small
> temp script file instead (`scripts/pseo/_tmp-*.ts`), run it, then delete it.

---

## 7. NAP & Compliance Reminders (never drift)

- Phone / WhatsApp: **+971567648220** (matching `src/lib/constants.ts`)
- Email: `approvals@wasleen.com`
- Domain for all canonicals, hreflang `@id`s and sitemap URLs:
  `https://www.dubaiapprovalconsultants.com`
- Figures on pages must match the fact sheets; fact sheets must match the authority portal.
- Never fabricate stats, review counts, ratings, or awards in generated content.

---

_Last updated: 2026-08-02 — pSEO pilot complete (9 pages EN + AR, build 255/255, fact-review.md clean at 44 genuine findings)._
