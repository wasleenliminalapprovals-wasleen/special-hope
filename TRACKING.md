# TRACKING.md — Analytics Event & Tag Reference

**Applies to:** `dubaiapprovalconsultants.com` (Next.js 15, Vercel)
**Last verified:** 2026-09-01

This document is the single source of truth for how analytics events reach GTM,
GA4, Google Ads, and Meta Pixel. Read it before touching **any** analytics code.

---

## 0. The One Rule That Must Never Break

> **`window.dataLayer[0]` MUST always be the official `gtm.start` marker:**
> ```js
> { "gtm.start": <unix-ms timestamp>, event: "gtm.js" }
> ```

It is pushed in an inline `<script>` during HTML parse in
[`src/app/layout.tsx`](src/app/layout.tsx:172) — before hydration, before GTM loads,
before `PageViewTracker` pushes `page_view`.

**Why (one-line incident summary):** Aug 2026 — GA4 went completely dark because
`dataLayer[0]` was `page_view` (the `gtm.start` marker was missing) and GTM was also
deferred to browser idle. GTM's GA4 Configuration tag threw a tag error on `gtm.init`
(GTM health beacon `TS5googtag.TI5.TE2`), so the container-mode gtag.js never received
its config command and GA4 never initialized. **Fixed** by restoring the `gtm.start`
marker in `layout.tsx` and loading GTM at normal timing in `AnalyticsLoader.tsx`.
**Guarded** by [`tests/tracking-regression.js`](tests/tracking-regression.js).

Do not "optimize" this. Do not reorder the early init. Do not remove or defer it.
If `dataLayer[0]` is ever anything other than the `gtm.start` marker, the regression
test fails and the deploy must be stopped.

---

## 1. Identifiers (from `.env` / site config)

| System | ID | Used by |
|---|---|---|
| Google Tag Manager | `GTM-P45BMK7J` | GTM container (all tags below) |
| GA4 Measurement | `G-SJF4WHM8QJ` | GA4 Configuration tag (`__googtag`, tag_id 5) |
| Google Ads | `18364819521` / label `lDoJCPGZmdwcEMHQg7VE` | Google Ads conversion tag (`__awct`, tag_id 7) |
| Meta Pixel | `4406234089664940` | Meta Pixel base code (injected by `AnalyticsLoader`) |

---

## 2. GTM Container — Tag & Trigger Dependencies

Derived from the GTM container export captured during the Aug 2026 investigation.
This is what each dataLayer event feeds:

| Trigger / event | GTM tag that fires | Notes |
|---|---|---|
| `gtm.init` (GTM boot) | GA4 Configuration `G-SJF4WHM8QJ` (`__googtag`, tag_id 5) | **Fails with TE2 tag error if `dataLayer[0]` is not the `gtm.start` marker** |
| `gtm.js` (GTM loaded) | tag_id 5 — `gtm.elementVisibility` auto-event listener | Installs form-element-visibility listener |
| `/free-quote` page + `gtm.elementVisibility` (trigger `259481548_4`) | `generate_lead` (`__gaawe`, tag_id 6) | Fires when the quote wizard's elements become visible |
| `quote_submit_success` | Google Ads conversion (`__awct`, tag_id 7) | **The paid-ads conversion event — driven by the form success path** |
| `popup_*` events | popup tag (tag_id 21) | Popup view/close/form/WhatsApp interactions |
| `popup_submit_success` | tags 3 & 4 | Popup lead success |

---

## 3. DataLayer Event Inventory

All GTM/GA4 events are pushed with `trackEvent()` from
[`src/lib/analytics.ts`](src/lib/analytics.ts:57) (which wraps `sendGTMEvent`), or
`sendGTMEvent` directly. Meta-only events use helpers in
[`src/lib/meta-pixel.ts`](src/lib/meta-pixel.ts).

### 3.1 Core / lifecycle events

| Event | File:line | Trigger | GTM tag dependency |
|---|---|---|---|
| `gtm.js` (`gtm.start` marker) | [`src/app/layout.tsx`](src/app/layout.tsx:172) | document creation (inline, pre-hydration) | **ALL tags** — see §0 |
| `page_view` | [`src/components/analytics/PageViewTracker.tsx`](src/components/analytics/PageViewTracker.tsx:25) | every route change | GA4 Configuration tag (collected as page_view) |

### 3.2 Free-quote wizard events

| Event | File:line | Trigger | GTM tag dependency |
|---|---|---|---|
| `quote_step_next` | [`FreeQuoteForm.tsx`](src/components/sections/FreeQuoteForm.tsx:133) | wizard "Next" clicked | none (funnel analytics) |
| `quote_step_back` | [`FreeQuoteForm.tsx`](src/components/sections/FreeQuoteForm.tsx:138) | wizard "Back" clicked | none |
| `quote_submit` | [`FreeQuoteForm.tsx`](src/components/sections/FreeQuoteForm.tsx:146) | wizard "Submit" clicked | none (pre-conversion) |
| `quote_submit_success` | [`FreeQuoteForm.tsx`](src/components/sections/FreeQuoteForm.tsx:159) | Apps Script POST returns `{success:true}` | **Google Ads conversion tag** (`__awct`) + triggers `metaLead` (Meta) |
| `contact_click` | [`FreeQuoteForm.tsx`](src/components/sections/FreeQuoteForm.tsx:187) and many others (see §3.4) | WhatsApp / phone / email click | `generate_lead` (`__gaawe`, when on `/free-quote`) + bridges to Meta `Contact` |

> The Apps Script webhook (`APPS_SCRIPT.url` in
> [`src/data/free-quote.ts`](src/data/free-quote.ts:58)) is **mocked** inside the
> regression test so the conversion path is deterministic (no real leads created).

### 3.3 Popup events (`POPUP_EVENTS`)

Defined in [`src/lib/popup.ts`](src/lib/popup.ts:65); fired in
[`PopupProvider.tsx`](src/components/popup/PopupProvider.tsx:199):

| Event | Trigger | GTM tag dependency |
|---|---|---|
| `popup_view` | popup shown | popup tag (tag_id 21) |
| `popup_close` | popup dismissed | popup tag |
| `popup_form_toggle` | popup form opened | popup tag |
| `popup_form_attempt` | popup form submit attempted | popup tag |
| `popup_submit_success` | popup lead success | tags 3 & 4 |
| `popup_submit_error` | popup submit failed | popup tag |
| `popup_whatsapp_click` | popup WhatsApp click | popup tag |

### 3.4 Other GTM events

| Event | File:line | Trigger | GTM tag dependency |
|---|---|---|---|
| `contact_click` | [`ClosingCta.tsx`](src/components/about/ClosingCta.tsx:54), [`CTASection.tsx`](src/components/sections/CTASection.tsx:27), [`FloatingWhatsApp.tsx`](src/components/sections/FloatingWhatsApp.tsx:21), [`HeroSection.tsx`](src/components/sections/HeroSection.tsx:59), [`WhatsAppButton.tsx`](src/components/sections/WhatsAppButton.tsx:31), [`CTASectionArabic.tsx`](src/components/sections/CTASectionArabic.tsx:29), [`Sheet01Hero.tsx`](src/components/about/Sheet01Hero.tsx:158) | WhatsApp / phone / email clicks | `generate_lead` (on `/free-quote`) + Meta `Contact` bridge |
| `whatsapp_license_request` | [`LicenseWhatsAppButton.tsx`](src/components/sections/LicenseWhatsAppButton.tsx:31), [`LicenseWhatsAppButtonArabic.tsx`](src/components/sections/LicenseWhatsAppButtonArabic.tsx:32) | license-page WhatsApp click | bridges to Meta `Lead` (content_name: license_request) |
| `outbound_click` | [`ClosingCta.tsx`](src/components/about/ClosingCta.tsx:113), [`DivisionStrip.tsx`](src/components/about/DivisionStrip.tsx:99), [`ParcelGrid.tsx`](src/components/about/ParcelGrid.tsx:155), [`OfficeMaps.tsx`](src/components/about/OfficeMaps.tsx:41) | outbound authority link clicks | none |
| `theme_toggle` | [`CyanotypeProvider.tsx`](src/components/about/CyanotypeProvider.tsx:100) | about-page theme toggle | none |
| `sheet_rail_navigate` | [`SheetRail.tsx`](src/components/about/SheetRail.tsx:98) | about-page sheet navigation | none |
| `language_switch` | [`LanguageSwitcher.tsx`](src/components/layout/LanguageSwitcher.tsx:50) | EN/AR switch | none |

### 3.5 Meta Pixel events (fbq — NOT via GTM)

Fired only through [`src/lib/meta-pixel.ts`](src/lib/meta-pixel.ts) helpers. PII
(email/phone) is **never** routed through GTM — Meta SHA-256 hashes it client-side.

| Event | Helper (file:line) | Trigger |
|---|---|---|
| `PageView` | [`metaPageView`](src/lib/meta-pixel.ts:114) | once per route (`MetaPixelTracker`) |
| `ViewContent` | [`metaViewContent`](src/lib/meta-pixel.ts:119) | content views |
| `Contact` | [`metaContact`](src/lib/meta-pixel.ts:124) | bridged from `contact_click` |
| `Lead` | [`metaLead`](src/lib/meta-pixel.ts:136) | free-quote success (with email/phone advanced matching) + `whatsapp_license_request` |

---

## 4. Loading Architecture

- **GTM** is injected at **normal timing** (not idle-deferred) by
  [`AnalyticsLoader.tsx`](src/components/analytics/AnalyticsLoader.tsx) — see §0 for
  why it must never be idle-deferred.
- **Meta Pixel** base code is injected **idle-deferred** (falls back to a 2.5s timer);
  early `fbq` calls are queued and drained by
  [`drainFbqQueue`](src/lib/meta-pixel.ts:103).
- Events fired before GTM/Meta load are buffered: GTM via the early
  `window.dataLayer` init in `layout.tsx`, Meta via the pending-queue in `meta-pixel.ts`.

---

## 5. Regression Test

[`tests/tracking-regression.js`](tests/tracking-regression.js) loads the **production
build** and asserts, failing loudly (non-zero exit) for CI:

1. `dataLayer[0]` is the `gtm.start` marker (`event: "gtm.js"`).
2. The GA4 Configuration tag reports **no tag error** (`google_tag_data.gl` object
   present + a GA4 collect request to `analytics.google.com` / `stats.g.doubleclick.net`).
3. A simulated successful `/free-quote` submission pushes `quote_submit_success`
   (the Google Ads conversion signal).

Commands:

```bash
npm run test:tracking      # uses existing production build; spawns next start on :3115
npm run test:tracking:ci   # next build + test:tracking (CI entry point)

TARGET_URL=http://localhost:3100 npm run test:tracking   # against an existing server
CHROME="C:/Program Files/Google/Chrome/Application/chrome.exe" npm run test:tracking
```

Prerequisites: a production build exists (`next build`), Chrome is installed at
`CHROME` (or `process.env.CHROME`), and the machine has internet access (GTM/GA4/Meta
hit the real network, exactly like GTM Preview mode). Requires the `puppeteer-core`
devDependency.

---

## 6. Contributor Checklist (before touching analytics code)

- [ ] Read §0 first. **Never** remove/reorder the `gtm.start` marker; `dataLayer[0]`
      must stay the marker.
- [ ] **Never** idle-defer GTM. Meta Pixel may stay idle-deferred.
- [ ] Run `npm run test:tracking:ci` before **any** deploy that touches analytics.
- [ ] Push events with `trackEvent()` (or `sendGTMEvent`); **never** hand-paste raw
      gtag/GTM snippets or call `window.gtag` / `window.fbq` directly from components.
- [ ] Never route PII (email/phone) through GTM — use `metaLead()` in
      `src/lib/meta-pixel.ts`.
- [ ] Keep `page_view` out of `dataLayer[0]` — `PageViewTracker` must never run
      before the inline marker in `layout.tsx`.
- [ ] Keep the Apps Script webhook mock in `tests/tracking-regression.js` in sync with
      `APPS_SCRIPT.url` in `src/data/free-quote.ts`.
- [ ] Verify new events in GTM Preview + GA4 Realtime + Meta Test Events before deploy.
- [ ] Update this table if you add/remove/rename any event.

PERMANENT RULE: Tracking & Analytics Code Protection

Never modify, refactor, remove, rename, or reorganize any tracking/analytics-related
code unless the user explicitly asks for a tracking/analytics change in that specific
request — even when the task is unrelated on the surface (performance work, dependency
upgrades, cleanup, layout/component refactors, etc.).

Protected without exception:
- GTM/GA4/Meta Pixel initialization code (currently: AnalyticsLoader.tsx, the dataLayer
  init block in layout.tsx)
- Any dataLayer.push(...) call, its event name, or its parameters (currently includes
  FreeQuoteForm.tsx, lib/analytics.ts)
- Script loading strategy/timing for any analytics script (defer, async, lazyOnload,
  idle callback, load order)
- CSS classes, IDs, or DOM attributes any tracking trigger depends on (see TRACKING.md)
- Any tracking, measurement, or conversion IDs
- CSP headers or consent-related code, if/when either is added

If a task would require touching any of the above:
1. Stop before making the change.
2. Report back exactly what you'd need to change and why.
3. Wait for explicit approval — do not proceed because the change seems minor.

Reference TRACKING.md for the full list of tracking dependencies. Update it whenever
a tracking-related change is explicitly approved.