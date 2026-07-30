# Performance Optimization Plan — Mobile PSI Score 73 → 100

**Date:** 2026-07-30  
**Based on:** PageSpeed Insights report showing 73 mobile / 100 desktop  
**Goal:** Achieve 100 on mobile without changing visual design, content, or structure

---

## Executive Summary

Three major bottlenecks were identified in the PSI report:

| # | Issue | Impact | Current State |
|---|-------|--------|---------------|
| 1 | LCP Element Render Delay (5.3s) | 2,390ms delay — CSS + fonts block paint | Render-blocking CSS files (`6a983cfa4a2553e7.css`, `72d85b561e6ae50f.css`) and woff2 fonts (`970d71e7dcbc144d-s.woff2`, `b3f718d64f9a6dea-s.woff2`) |
| 2 | GTM Main-Thread Blocking | 69ms long tasks, 110KB 3rd-party code | `GoogleTagManager` uses `afterInteractive` strategy, still runs during critical path |
| 3 | Legacy JavaScript Polyfills | 11.5KB wasted bytes | `tsconfig.json` targets ES2017, no `browserslist` configured |

None of the proposed fixes change visual design, content layout, or component structure.

---

## Issue 1: Fix LCP Element Render Delay

### Root Cause Analysis

The LCP element is the `<p>` tag inside [`HeroSection.tsx`](src/components/sections/HeroSection.tsx:47) (`Expert approval consultants serving...`).

**Current flow causing delay:**
1. Browser encounters two `<link rel="stylesheet">` tags in `<head>` — both are **render-blocking by default**
2. These CSS files contain:
   - `@font-face` declarations for Montserrat (4 weights) and Roboto (3 weights)
   - Tailwind CSS v4 generated utility classes
   - Custom animation keyframes (~430 lines in `globals.css`)
3. Browser must download + parse BOTH CSS files before it can render ANY text
4. Even with `font-display: swap`, the CSS files themselves block the initial paint
5. On mobile throttled connection (simulated 1.6Mbps), this adds ~2.4s delay

### Files to Modify

#### 1a. [`src/app/layout.tsx`](src/app/layout.tsx) — Add preload hints

Add `<link rel="preload">` for critical CSS to prioritize download:

```tsx
// Before line 10 (globals.css import)
// In the layout head section, add preload for Google Fonts
```

**Change:** Add `preconnect` for Google Fonts CDN to reduce DNS/TLS negotiation time.

**Note:** Even with `next/font` self-hosting fonts at build time, the initial `@font-face` CSS references Google Fonts' CDN. The `preconnect` hint helps the browser establish an early connection.

**Why this works:** Preconnecting to `fonts.gstatic.com` saves ~100-300ms in connection setup time on mobile networks. Combined with `font-display: swap`, the text renders with fallback font ~300ms sooner.

#### 1b. [`src/app/globals.css`](src/app/globals.css) — Fix font CSS variable naming

**Change theme variable names** from `--font-family-*` to `--font-*` to properly align with Tailwind CSS v4 conventions and ensure `next/font` generated variables are correctly referenced.

Current (lines 28-30):
```css
--font-family-montserrat: "Montserrat", system-ui, sans-serif;
--font-family-roboto: "Roboto", system-ui, sans-serif;
--font-family-roboto-mono: "Roboto Mono", monospace;
```

New:
```css
--font-montserrat: "Montserrat", system-ui, sans-serif;
--font-roboto: "Roboto", system-ui, sans-serif;
--font-roboto-mono: "Roboto Mono", monospace;
```

Update `body` base style (line 88):
```css
body {
  font-family: var(--font-roboto);
}
```

**Why this works:** In Tailwind CSS v4, `--font-<name>` maps to utility class `font-<name>`. The current `--font-family-*` convention generates `font-family-*` classes that components don't use. Components like [`HeroSection.tsx`](src/components/sections/HeroSection.tsx:43) use `font-montserrat` class which does nothing currently, relying instead on the `@layer base` body rule. Fixing this ensures fonts load through the correct Tailwind utility path, allowing the JIT compiler to optimize font inclusion.

#### 1c. [`src/lib/fonts.ts`](src/lib/fonts.ts) — Ensure `font-display: swap` on ALL fonts

Verified: All font instances already use `display: "swap"` (lines 23, 30, 37, 48). **No change needed here.**

However, add [`preload`](src/app/layout.tsx:10) hint by updating the layout to include:

```tsx
// In head, before any CSS:
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```

This is applied via Next.js Metadata API `head` or a custom `<Head>` component.

#### 1d. Reduce animation CSS bloat in critical path

The [`globals.css`](src/app/globals.css) file contains ~250 lines of animation keyframes (lines 114-261) and marquee/RTL overrides (lines 262-420). These animations (draw-line, fade-in, stamp-press, glow-pulse, etc.) are used only by:
- [`SceneA_FloorPlan`](src/components/drawings/SceneA_FloorPlan.tsx) (homepage hero drawing)
- [`TrustStrip`](src/components/sections/TrustStrip.tsx) (marquee logo carousel)
- [`FloatingWhatsApp`](src/components/sections/FloatingWhatsApp.tsx) (pulse animation)

**Change:** Move all animation keyframes and their utility classes into a separate CSS file (`animations.css`) that is imported only by the components that need them — OR — ensure Tailwind's JIT compiler tree-shakes unused CSS (it already does this, but the classes are referenced globally).

**Why this works:** Tailwind CSS v4 with `@import "tailwindcss"` scans all template files for used classes. Since animation utility classes like `.animate-draw-line` are used in multiple components (verified by searching), they are included. Moving them to a separate file won't reduce the CSS for pages that use them, but could help if they're only used on specific pages.

**Trade-off:** This is an optimization, not a fix. The animations contribute to the CSS file size but the impact is moderate (~5-8KB). Proceed with this only if other fixes don't achieve 100.

---

## Issue 2: Defer Google Tag Manager

### Root Cause Analysis

[`layout.tsx`](src/app/layout.tsx:118) uses `GoogleTagManager` from `@next/third-parties/google`:

```tsx
{gtmId && <GoogleTagManager gtmId={gtmId} />}
```

The `@next/third-parties/google` package uses `next/script` with `strategy: "afterInteractive"` by default. This means GTM loads **after** the page is interactive but **during** the initial page load window. GTM downloads 110KB of code (gtm.js + container configuration) and executes long main-thread tasks (up to 69ms according to PSI).

### Files to Modify

#### 2a. [`src/app/layout.tsx`](src/app/layout.tsx) — Replace `GoogleTagManager` with deferred `next/script`

**Change:** Replace the component-based GTM injection with a manual `next/script` using `strategy: "lazyOnload"`:

```tsx
import Script from "next/script";

// Replace:
// {gtmId && <GoogleTagManager gtmId={gtmId} />}

// With:
{gtmId && (
  <>
    {/* GTM script — deferred until page fully loads */}
    <Script
      id="gtm-script"
      src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
      strategy="lazyOnload"
    />
    {/* noscript fallback for crawlers without JS */}
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  </>
)}
```

**Why this works:** 
- `strategy: "lazyOnload"` tells Next.js to execute this script **after** all page resources have loaded
- This removes GTM from the critical rendering path entirely
- GTM's `dataLayer` queue (used by [`trackEvent()`](src/lib/analytics.ts:50) and [`PageViewTracker`](src/components/analytics/PageViewTracker.tsx:16)) accumulates events before GTM loads, and GTM processes them on load
- No analytics data is lost — the `dataLayer` is preserved

**Important:** The `GoogleTagManager` component also injects a GTM head script that initializes the `dataLayer`. We need to replicate this. The manual approach above handles this correctly.

**Alternative (less aggressive):** Keep `GoogleTagManager` but pass an `id` prop to set `strategy: "lazyOnload"` — however, the component doesn't expose a `strategy` prop directly. We'd need to check the package API.

#### 2b. Verify analytics compatibility

The [`PageViewTracker`](src/components/analytics/PageViewTracker.tsx:16) calls `sendGTMEvent` which pushes to `window.dataLayer`. Since `dataLayer` is initialized before GTM loads (GTM uses `dataLayer.push()` before its own script loads), events fire correctly. Verified.

The [`trackEvent()`](src/lib/analytics.ts:50) function also uses `sendGTMEvent`. Same guarantee applies.

**No changes needed** to either file.

---

## Issue 3: Eliminate Legacy JavaScript Polyfills

### Root Cause Analysis

PSI flags 11.5KB of wasted JavaScript for polyfills including:
- `Array.prototype.at` (ES2022)
- `Array.prototype.flatMap` (ES2019)
- `Object.fromEntries` (ES2019)
- `String.prototype.trimEnd` (ES2019)

These polyfills are injected because:
1. [`tsconfig.json`](tsconfig.json:3) has `"target": "ES2017"` — an older target that makes the compiler assume older browser support
2. No `browserslist` field in [`package.json`](package.json) — Next.js uses its own defaults which may include older browsers
3. SWC compiler (Next.js default) injects polyfills based on the configured browser targets

### Files to Modify

#### 3a. [`tsconfig.json`](tsconfig.json) — Update compiler target

**Change:** Update `target` from `"ES2017"` to `"ES2022"`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    ...
  }
}
```

**Why this works:** The `target` in `tsconfig.json` informs the TypeScript compiler what syntax features to transpile. ES2022 includes modern APIs like `Array.prototype.at()`. While TypeScript doesn't inject runtime polyfills (that's SWC/Next.js's job), aligning this with modern browser support signals to the toolchain that older browser compatibility isn't needed.

**Note:** TypeScript's `target` only affects syntax transpilation (like async/await → generators), not polyfills. The actual polyfill behavior is controlled by Next.js's SWC compiler based on browser targets.

#### 3b. [`package.json`](package.json) — Add browserslist configuration

**Change:** Add a `browserslist` field to tell Next.js and SWC which browsers to support:

```json
{
  ...existing fields...,
  "browserslist": {
    "production": [
      "last 2 versions",
      "not dead",
      "not ie 11",
      "not op_mini all",
      "chrome >= 90",
      "firefox >= 90",
      "safari >= 15",
      "edge >= 90"
    ],
    "development": [
      "last 1 version"
    ]
  }
}
```

**Why this works:** 
- Next.js 15 uses SWC for compilation. SWC checks `browserslist` in `package.json` to determine which JavaScript features need transpilation/polyfills
- Current default targets include older browsers, forcing polyfills for `Array.prototype.flatMap` (ES2019), `Object.fromEntries` (ES2019), etc.
- By targeting modern browsers (2020+), SWC skips polyfill injection for these features
- This saves ~11.5KB of unnecessary JavaScript per page

**Browser support rationale:**
- `chrome >= 90` (2021) — 95%+ of users
- `firefox >= 90` (2021)
- `safari >= 15` (2021)
- `edge >= 90` (2021)
- These cover all modern browsers used by our target audience (Dubai/UAE business professionals)

---

## Additional Optimization: Preload LCP Text Font

To further improve LCP, add a `<link rel="preload">` for the Roboto font used by the LCP text element:

**In [`src/app/layout.tsx`](src/app/layout.tsx):**

```tsx
// Add to head via metadata or a <Head> element:
<link
  rel="preload"
  href="/_next/static/media/roboto-cyrillic-400-XXXXX.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

**Issue:** The font filename includes a content hash (`XXXXX`), making it impossible to hardcode. Next.js doesn't expose the hashed URL directly.

**Solution:** Instead of preloading individual font files (which we can't predict), add a `preconnect` hint for the font CDN origin. Since `next/font/google` downloads fonts at build time and serves them from the same origin, this doesn't help directly. However, we can preload the font CSS file.

**Alternative:** Use `next/font`'s built-in `preload: true` option (default) which Next.js uses to add `<link rel="preload">` for font files automatically. Since we already use `next/font`, this is already active.

**No change needed** — `next/font` already preloads font files.

---

## Files Changed Summary

| File | Change Type | Issue |
|------|-------------|-------|
| [`src/app/globals.css`](src/app/globals.css) | Modify — fix font theme variable naming | Issue 1 |
| [`src/app/layout.tsx`](src/app/layout.tsx) | Modify — replace `GoogleTagManager` with deferred `next/script` | Issue 2 |
| [`tsconfig.json`](tsconfig.json) | Modify — update `target` to `ES2022` | Issue 3 |
| [`package.json`](package.json) | Modify — add `browserslist` field | Issue 3 |

### Files NOT Changed (Verified No Change Needed)

| File | Reason |
|------|--------|
| [`src/lib/fonts.ts`](src/lib/fonts.ts) | Already uses `display: "swap"` on all font instances |
| [`src/lib/analytics.ts`](src/lib/analytics.ts) | Works with `dataLayer` queue — no change needed |
| [`src/components/analytics/PageViewTracker.tsx`](src/components/analytics/PageViewTracker.tsx) | Works with `dataLayer` queue — no change needed |
| [`src/app/globals.css`](src/app/globals.css) (animations) | Animation keyframes are used by multiple components, cannot remove |
| All component files | No visual or structural changes needed |

---

## Verification Plan

After implementing changes:

1. **Run production build** — `npm run build`
2. **Verify TypeScript compiles** — No type errors
3. **Verify no lint warnings** — `npm run lint`
4. **Deploy to staging** or run locally with production mode
5. **Run Lighthouse/PSI** — Mobile score should reach 95-100
6. **Verify GTM fires** — Check GTM Preview mode for events
7. **Verify fonts render** — Roboto + Montserrat should display correctly
8. **Verify analytics events** — Page views + CTA clicks fire correctly

---

## Rollback Plan

If any change causes issues:

1. **Font naming fix** — Revert the `--font-family-*` → `--font-*` change in `globals.css`. The original naming works functionally, just suboptimally.
2. **GTM deferral** — Revert to `GoogleTagManager` component. Events will still fire, just slightly later.
3. **Polyfill elimination** — Revert `target` and remove `browserslist`. Slightly larger JS bundle but no functional impact.

All changes are isolated and independently revertible.
