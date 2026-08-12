# Performance Fixes Round 2 — Mobile PSI 77 → Target 90+

**Date:** 2026-08-12
**Based on:** Lighthouse 13.4.1 mobile audit (LCP 4.6s, TBT 240ms, SI 4.1s, FCP 1.4s, CLS 0)
**Constraint (NON-NEGOTIABLE):** Zero visual/design/structure/content change. All edits are loading-strategy and analytics-config changes only.

---

## Diagnosis Summary (confirmed against code)

| # | Root Cause | Evidence in Code | Leverage |
|---|-----------|------------------|----------|
| 1 | Font preload hashes are stale — preloads fetch wrong files, real LCP fonts are discovered only after render-blocking CSS parses | [`src/app/layout.tsx`](../src/app/layout.tsx:117) preloads `904be59b21bd51cb-s.p.woff2` + `1e41be92c43b3255-s.p.woff2`; audit + prior plan [`plans/performance-optimization-plan.md`](performance-optimization-plan.md:15) show the real files are `970d71e7dcbc144d-s.woff2` + `b3f718d64f9a6dea-s.woff2` | LCP 4.6 → ~1.5s |
| 2 | GA4 loaded twice — GTM already contains a GA4 tag (audit shows `gtag/js?id=G-SJF4WHM8QJ&cx=c&gtm=4e68a1`), and the layout also loads `gtag/js?id=G-SJF4WHM8QJ` directly. `/ar` pages load GTM+GA4 a second time from the AR layout | [`src/app/layout.tsx`](../src/app/layout.tsx:168), [`src/app/ar/layout.tsx`](../src/app/ar/layout.tsx:121) | ~185–370 KiB unused JS, TBT |
| 3 | GTM + Meta Pixel run on the main thread after `load` (`lazyOnload`) | [`src/app/layout.tsx`](../src/app/layout.tsx:148), [`src/app/layout.tsx`](../src/app/layout.tsx:191) | TBT/SI/INP |
| 4 | (OPTIONAL — deferred) shared 3 KiB font CSS chunk | [`src/lib/fonts.ts`](../src/lib/fonts.ts:13) | ~160ms, structural risk |

---

## Fix 1 — Correct & automate font preloads

**Goal:** The LCP hero text font starts downloading in parallel with CSS instead of after it (saves ~870ms critical-path latency).

**Steps:**
1. (Verify, read-only) Run `npm run build`. Inspect `.next/static/media/` for the actual `*-s.woff2` filenames. Also check the emitted HTML (`.next/server/app/index.html`) for any `<link rel="preload" as="font">` Next may already emit.
2. In [`src/app/layout.tsx`](../src/app/layout.tsx:117), update the two `<link rel="preload" as="font">` `href` values to the **actual hashed filenames** from the build (the `-s.woff2` files referenced by the `@font-face` CSS — NOT the stale `-s.p.woff2` hashes currently hardcoded).
   - If step 1 shows Next already emits correct preloads, instead **remove** the manual preloads to avoid duplicate requests.
   - Keep `as="font"`, `type="font/woff2"`, `crossOrigin="anonymous"` exactly as-is.
3. (Automation guardrail) Create `scripts/check-font-preloads.mjs`: after `next build`, scan `.next/static/media/*.woff2` and verify every hashed font referenced in the preloads of `src/app/layout.tsx` exists. **Warn only** (exit 0) — must never break CI/deploys.
4. Add `"check:fonts": "node scripts/check-font-preloads.mjs"` to `package.json` scripts. Optionally add as `postbuild` **warn-only** hook.

**Do NOT:** change `font-display`, font weights, font files, or the CSS variable structure.

---

## Fix 2 — Remove duplicate direct GA4 (keep GA4 inside GTM only)

**Goal:** Stop loading gtag.js twice (GTM-internal + direct). Fixes double pageview counts and removes ~185 KiB.

**Steps (both layouts — root layout wraps all routes):**
1. [`src/app/layout.tsx`](../src/app/layout.tsx:168) — remove the entire `{gaId && (…)}` block (the `<Script src={/gtag/js?id=…}>` + `<Script id="ga4-init">`). This block currently contains the `gtag('config', …)` and also the `window.dataLayer = window.dataLayer || []` init.
2. [`src/app/layout.tsx`](../src/app/layout.tsx:1) — add an early, minimal dataLayer initializer so `sendGTMEvent()` pushes made before GTM loads are queued and not lost:
   ```tsx
   <Script id="data-layer-init" strategy="beforeInteractive">
     {`window.dataLayer = window.dataLayer || [];`}
   </Script>
   ```
3. [`src/app/ar/layout.tsx`](../src/app/ar/layout.tsx:120) — remove the `{gtmId && <GoogleTagManager …/>}` block AND the `{gaId && (…)}` direct-GA4 block. The root layout already provides GTM + GA4 for all routes including `/ar` (see Fix 3). This eliminates double GTM/GA4 on every Arabic page.
4. [`src/components/layout/LanguageSwitcher.tsx`](../src/components/layout/LanguageSwitcher.tsx:49) — replace the raw `(window as any).gtag("event", "language_switch", …)` call (guarded by `if (window.gtag)`) with `sendGTMEvent({ event: "language_switch", … })` so the event is pushed to the dataLayer and is no longer dependent on gtag existing early. Import `sendGTMEvent` from `@next/third-parties/google`. No visual change.

**Analytics impact:** GA4 pageviews, `trackEvent()` events, `page_view`, and Google Ads (no `AW-` IDs exist in code, so Ads tags live in GTM) are all unaffected — they flow through GTM. Meta Pixel is independent (`fbq`).

---

## Fix 3 — Load GTM + Meta Pixel on idle / after-LCP

**Goal:** Move ~145 KiB of third-party script parsing off the main thread during the Lighthouse capture window.

**Steps:**
1. [`src/lib/meta-pixel.ts`](../src/lib/meta-pixel.ts:68) — add a module-level pending queue so events fired before the pixel base code loads are **not lost**:
   - `metaEvent()`: if `window.fbq` is not a function, push `{event, data}` to an internal `pendingQueue`; otherwise call `fbq("track", event, data)`.
   - Add `drainFbqQueue()`: when `window.fbq` becomes available, replay all queued events, then clear.
2. Create [`src/components/analytics/AnalyticsLoader.tsx`](../src/components/analytics/AnalyticsLoader.tsx) — a `"use client"` component that injects, after idle or a ~4s timeout (`requestIdleCallback(…, {timeout: 4000})` with `setTimeout(3000)` fallback):
   - GTM: async `<script src="https://www.googletagmanager.com/gtm.js?id=GTM_ID">` (guarded against double-append).
   - Meta Pixel base code: replicate the existing loader snippet (define `fbq` stub + queue, async-load `fbevents.js`, `fbq('init', META_PIXEL_ID)`), then `drainFbqQueue()` on script `onload` so the early PageView fires.
   - No-ops gracefully when IDs are empty or scripts already present.
3. [`src/app/layout.tsx`](../src/app/layout.tsx) — replace the raw GTM `<Script strategy="lazyOnload">` and the Meta Pixel base `<Script strategy="lazyOnload">` with `<AnalyticsLoader />`. **Keep** the `<noscript>` GTM iframe and Meta Pixel `<noscript>` img fallbacks, and the `data-layer-init` script from Fix 2. Keep `MetaPixelTracker` and `PageViewTracker` exactly as-is (their helpers are now queue-aware).

**Tracking safety:** GTM processes queued dataLayer events on load; the fbq queue guarantees the first PageView is not dropped when the pixel loads late.

---

## Fix 4 — (OPTIONAL / DEFERRED) consolidate shared font CSS chunk

Do **not** execute in this pass. The 3 KiB shared `@font-face` chunk exists because [`src/lib/fonts.ts`](../src/lib/fonts.ts:13) is imported by both EN and AR layouts. Restructuring it (per-layout font imports) changes the "single source of truth" design and carries structural risk. Fix 1 already recovers the dominant font latency. Re-evaluate only if the score is still below target after Fixes 1–3.

---

## Verification Gate (BEFORE any re-test)

1. `npm run build` completes with zero errors.
2. `npm run lint` passes.
3. No TypeScript errors.
4. Visual check: homepage, one approval page, one `/ar` page — pixel-identical to before (headless screenshot comparison recommended).

## Tracking Verification (must pass)

1. **GTM Preview:** exactly ONE `page_view` per load; `cta_click` / `contact_click` / `generate_lead` fire on clicks.
2. **GA4 Realtime:** activity appears once per load.
3. **Meta Pixel:** PageView fires on first load (verify via Meta Pixel Helper) — the queue must replay it even though the pixel loads after LCP.
4. **`language_switch`:** switching EN↔AR fires the event.
5. **Arabic route** (`/ar`): GTM + GA4 + Pixel each load exactly once (no AR-layout duplication).

## Final Performance Re-test

Run PageSpeed Insights mobile (same URL as audit). Success = LCP < 2.5s, TBT < 200ms, score 90+ with no design/content/structure change.

---

## Files Touched (complete list)

| File | Change |
|------|--------|
| `src/app/layout.tsx` | Fix 1 preloads, Fix 2 remove GA4 + add dataLayer init, Fix 3 swap to AnalyticsLoader |
| `src/app/ar/layout.tsx` | Fix 2 remove redundant GoogleTagManager + GA4 |
| `src/components/layout/LanguageSwitcher.tsx` | Fix 2 use sendGTMEvent |
| `src/lib/meta-pixel.ts` | Fix 3 pending queue + drain |
| `src/components/analytics/AnalyticsLoader.tsx` | NEW — Fix 3 deferred loader |
| `scripts/check-font-preloads.mjs` | NEW — Fix 1 automation (warn-only) |
| `package.json` | Add `check:fonts` script |
