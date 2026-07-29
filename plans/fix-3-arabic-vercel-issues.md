# Fix 3 Critical Arabic Vercel Preview Issues

**Date:** 2026-07-29
**Branch:** `feature/arabic-market` (same branch, DO NOT create new branch)
**Goal:** Fix all 3 issues found on Vercel preview without touching English pages, themes, or components

---

## Root Cause Summary

| Issue | Root Cause | Fix Strategy |
|-------|-----------|--------------|
| **1. Arabic homepage empty** | [`src/app/ar/page.tsx`](src/app/ar/page.tsx) only has a bare hero `<section>` — missing all 7 other sections that [`src/app/page.tsx`](src/app/page.tsx) has | Add same section components in Arabic using `AR` constants |
| **1b. Mobile menu always visible** | CSS `[dir="rtl"]` override on MobileNav `translate-x` may flip the drawer into visible position | Fix CSS override or add `isOpen` guard |
| **2. English words in Arabic pages** | DeepSeek staging JSON at [`scripts/staging/approvals-ar.json`](scripts/staging/approvals-ar.json) was **never written** to source files [`src/data/approvals-ar.ts`](src/data/approvals-ar.ts). Source still has stub/placeholder content. | Run existing `node scripts/write-staging-to-source.js` to flush staging to source |
| **3. Language switcher icon** | [`LanguageSwitcher.tsx`](src/components/layout/LanguageSwitcher.tsx) uses `<Languages>` lucide icon + text label | Replace with iconless colored boxes showing only "AR"/"EN", optionally with SVG flags |

---

## Issue 1: Fix Arabic Homepage (`src/app/ar/page.tsx`)

### Current State
```typescript
// src/app/ar/page.tsx — ONLY has:
<section className="bg-brand-blue text-white py-16 px-4 text-center">
  <h1 className="text-h1 font-bold mb-4">{AR.tagline}</h1>
  <p className="text-body-lg max-w-3xl mx-auto">{AR.description}</p>
</section>
```

### Target State — Mirror English Homepage
The English homepage at [`src/app/page.tsx`](src/app/page.tsx:92-142) has this section stack:

| Order | Section Component | English File Import | Arabic Equivalent |
|-------|------------------|-------------------|-------------------|
| 1 | HeroSection | [`HeroSection`](src/components/sections/HeroSection.tsx) | **SKIP** — HeroSection has hardcoded English + SVG drawings. Instead, keep the existing hero `<section>` styled same as English but using `AR` constants, matching the same visual design as HeroSection (blue background, CTA buttons) |
| 2 | TrustStrip | [`TrustStrip`](src/components/sections/TrustStrip.tsx) | Reuse `<TrustStrip />` — logo images are universal, component handles its own content |
| 3 | ServiceCategories | [`ServiceCategories`](src/components/sections/ServiceCategories.tsx) | Reuse `<ServiceCategories />` — component handles Arabic via locale detection |
| 4 | ProcessOverview | [`ProcessOverview`](src/components/sections/ProcessOverview.tsx) | Reuse `<ProcessOverview />` — component handles Arabic via locale detection |
| 5 | GeoContentSection | [`GeoContentSection`](src/components/sections/GeoContentSection.tsx) | Reuse `<GeoContentSection />` — needs checking if it handles Arabic |
| 6 | FAQBlock | [`FAQBlock`](src/components/sections/FAQBlock.tsx) | Add inline Arabic FAQ items using `AR` constants |
| 7 | AuthorityUpdates | [`AuthorityUpdates`](src/components/sections/AuthorityUpdates.tsx) | Reuse `<AuthorityUpdates />` |
| 8 | CTASection | [`CTASection`](src/components/sections/CTASection.tsx) | Use `<CTASectionArabic />` which already exists at [`src/components/sections/CTASectionArabic.tsx`](src/components/sections/CTASectionArabic.tsx) |

### What to Import
```typescript
import TrustStrip from "@/components/sections/TrustStrip";
import ServiceCategories from "@/components/sections/ServiceCategories";
import ProcessOverview from "@/components/sections/ProcessOverview";
import GeoContentSection from "@/components/sections/GeoContentSection";
import FAQBlock from "@/components/sections/FAQBlock";
import AuthorityUpdates from "@/components/sections/AuthorityUpdates";
import CTASectionArabic from "@/components/sections/CTASectionArabic";
```

### FAQ Items (Arabic)
Add 6 Arabic FAQ items inline (same pattern as English page but in Arabic):
```typescript
const faqItems = [
  {
    question: "ما أنواع الموافقات التي تتعامل معها وسلين في دبي؟",
    answer: "تتعامل وسلين مع أكثر من 52 نوعاً من الموافقات في جميع أنحاء دبي، تشمل بلدية دبي وهيئة دبي للتطوير وهيئة كهرباء ومياه دبي والدفاع المدني بدبي وموافقات المناطق الحرة وغيرها."
  },
  // ... 5 more questions
];
```

### Mobile Menu Fix
The mobile menu always showing is caused by the CSS `[dir="rtl"]` override of `translate-x` in [`src/components/layout/MobileNav.tsx`](src/components/layout/MobileNav.tsx). The RTL override flips `-translate-x-full` (hidden off-screen-left in LTR) to `translate-x-full` (hidden off-screen-right in RTL), but if the override applies incorrectly or the base class gets overridden, the panel becomes visible.

**Fix:** Add a guard `isOpen` check before applying transform. The MobileNav already receives `isOpen` prop — ensure the panel div has:
```tsx
className={cn(
  "fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-dropdown z-50 transition-transform duration-300",
  isOpen ? "translate-x-0" : "translate-x-full",
  "[dir='rtl'] &": isOpen ? "translate-x-0" : "-translate-x-full",
)}
```

---

## Issue 2: Fix English Words in Arabic Pages

### Root Cause Diagram
```
English data files (approvals.ts, guides.ts, services.ts)
    │
    ▼
DeepSeek localization → scripts/staging/approvals-ar.json ✅ (EXISTS)
    │
    ▼
Write to source script → scripts/write-staging-to-source.js ✅ (EXISTS)
    │
    ▼
STOPPED HERE — script was NEVER executed
    │
    ▼
Source files (approvals-ar.ts, guides-ar.ts, services-ar.ts) still have STUB content
```

### Fix — Single Command
```bash
cd "d:/Wasleen Liminal Approvals/wasleen-liminal-approvals" && node scripts/write-staging-to-source.js
```

This script reads:
- [`scripts/staging/approvals-ar.json`](scripts/staging/approvals-ar.json) → writes to [`src/data/approvals-ar.ts`](src/data/approvals-ar.ts) (~10,876 lines of proper Arabic)
- [`scripts/staging/guides-ar.json`](scripts/staging/guides-ar.json) → writes to [`src/data/guides-ar.ts`](src/data/guides-ar.ts) (~742 lines of proper Arabic)
- [`scripts/staging/services-ar.json`](scripts/staging/services-ar.json) → writes to [`src/data/services-ar.ts`](src/data/services-ar.ts) (~527 lines of proper Arabic)

### What This Fixes
| English Content Source | Arabic Content Source | After Fix |
|----------------------|---------------------|-----------|
| `data/approvals.ts` — 52 EN approvals | `data/approvals-ar.ts` — STUBS with English | DeepSeek Arabic content with all fields |
| `data/guides.ts` — 30+ EN guides | `data/guides-ar.ts` — STUBS with English | DeepSeek Arabic content |
| `data/services.ts` — 5 EN services | `data/services-ar.ts` — STUBS with English | DeepSeek Arabic content |

### Additional Structural Fixes (from content overhaul plan)

#### 1. Add `stats` field to Arabic type + data
The [`ApprovalArabicContent`](src/types/index.ts:207-242) type is missing a `stats: StatFact[]` field. The Arabic template at [`src/app/ar/approvals/[slug]/page.tsx:259`](src/app/ar/approvals/[slug]/page.tsx:259) passes `ar.stats` to `<StatsStrip>`, but since the type doesn't have it, the staging JSON's `stats` field won't survive writing.

**Fix:** Add `stats: StatFact[]` to `ApprovalArabicContent` type in [`src/types/index.ts`](src/types/index.ts).

#### 2. Verify `typicalTimeline` and `typicalCostRange` in Arabic
The Arabic template at lines 246, 250 uses `ar.typicalTimeline` and `ar.typicalCostRange`. These must be present in the staging JSON and the type definition.

#### 3. Build + Verify
After running the script and fixing types:
```bash
npx next build
```
Expected: 233 pages, zero TypeScript errors, zero English in Arabic headings.

---

## Issue 3: Redesign Language Switcher

### Current Design
[`src/components/layout/LanguageSwitcher.tsx`](src/components/layout/LanguageSwitcher.tsx:60-88)
- Uses `<Languages>` icon from `lucide-react` (size 16-18px)
- `variant="icon"`: light background, icon + hidden `sm:inline` text
- `variant="full"`: blue button, icon + visible text

### Target Design
- **No icon** — remove `<Languages>` entirely
- **Two small boxes** side by side (or a single box showing the opposite language)
- **Arabic box** (`AR`): light green background `#E8F5E9` or `bg-green-50`
- **English box** (`EN`): blue background `#E3F2FD` or `bg-blue-50`
- **Active language**: bold/colored differently (e.g., darker background or border)
- **Inactive language**: lighter, clickable to switch
- **Optional**: SVG flags (UAE flag for Arabic, UK flag for English)

### Implementation Plan

#### Option A: Two Buttons (Preferred)
```tsx
<div className="flex items-center gap-1" role="group" aria-label="Language switcher">
  <Link
    href={isEnglish ? targetHref : "#"}
    className={cn(
      "px-2 py-1 rounded text-xs font-bold transition-colors",
      isEnglish ? "bg-blue-100 text-blue-800 cursor-default" : "bg-gray-100 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
    )}
    aria-current={isEnglish ? "true" : undefined}
    hrefLang="en"
  >
    EN
  </Link>
  <Link
    href={!isEnglish ? targetHref : "#"}
    className={cn(
      "px-2 py-1 rounded text-xs font-bold transition-colors",
      !isEnglish ? "bg-green-100 text-green-800 cursor-default" : "bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-600"
    )}
    aria-current={!isEnglish ? "true" : undefined}
    hrefLang="ar"
  >
    AR
  </Link>
</div>
```

#### Optional: SVG Flags
Add small inline SVG flags (16x12px) before the text:
- **UAE flag**: `🇦🇪` emoji or inline SVG with red/green/black/white stripes
- **UK flag**: `🇬🇧` emoji or inline SVG with Union Jack

### Files to Modify
- [`src/components/layout/LanguageSwitcher.tsx`](src/components/layout/LanguageSwitcher.tsx) — Full rewrite of JSX, keep bidirectional logic
- **No changes to** [`Header.tsx`](src/components/layout/Header.tsx) or any parent — the component API (`variant`) stays the same

---

## Implementation Order (Strict)

```
Phase A: Fix Arabic Homepage + Mobile Menu  [DO FIRST]
├── A1: Edit src/app/ar/page.tsx — add all 7 sections
├── A2: Build + verify /ar/ renders all sections
└── A3: Fix MobileNav CSS RTL bug

Phase B: Pipeline Completion  [DO SECOND]
├── B1: Add stats field to ApprovalArabicContent type in types/index.ts
├── B2: Run node scripts/write-staging-to-source.js
├── B3: Build — verify 0 TypeScript errors
├── B4: Spot-check 5 Arabic approval pages for English words
└── B5: Run node scripts/validate-ar-parity.js

Phase C: Language Switcher  [DO THIRD]
├── C1: Rewrite LanguageSwitcher.tsx JSX (iconless boxes)
├── C2: Add optional SVG flags
├── C3: Build + verify toggle works in both directions
└── C4: Test on mobile viewport (360px)

Phase D: Verification
├── D1: npx next build — 0 errors
├── D2: Check /ar/ homepage — all sections present, sticky mobile menu gone
├── D3: Check 3 Arabic approval pages — zero English in headings/tables/FAQ
├── D4: Check language toggle works both ways
└── D5: Git commit + push to feature/arabic-market
```

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| `write-staging-to-source.js` produces TypeScript errors | Medium | High | Run build immediately after script. Fix type mismatches (e.g., missing `stats` field) before proceeding |
| Arabic homepage section components don't handle Arabic text | Medium | Medium | Test each section on /ar/ page. If component has hardcoded English, skip it and use AR.constants inline |
| MobileNav fix breaks English mobile menu | Low | High | Test mobile menu on both / (EN) and /ar/ (AR) pages after fix |
| LanguageSwitcher redesign breaks header layout | Low | Medium | Keep same padding/margin footprint. Test at 360px viewport |
| Staging JSON is out of sync with current English data | Low | Medium | Already validated parity — all 52+30+5 entries match |

---

## Files Changed (Summary)

| File | Change | Risk |
|------|--------|------|
| [`src/app/ar/page.tsx`](src/app/ar/page.tsx) | Add 7 section components + Arabic FAQ items + schema | Low |
| [`src/components/layout/MobileNav.tsx`](src/components/layout/MobileNav.tsx) | Fix RTL translate-x override | Medium |
| [`src/data/approvals-ar.ts`](src/data/approvals-ar.ts) | Full rewrite via write-staging-to-source.js | High (big file) |
| [`src/data/guides-ar.ts`](src/data/guides-ar.ts) | Full rewrite via write-staging-to-source.js | Medium |
| [`src/data/services-ar.ts`](src/data/services-ar.ts) | Full rewrite via write-staging-to-source.js | Low |
| [`src/types/index.ts`](src/types/index.ts) | Add `stats: StatFact[]` to `ApprovalArabicContent` | Low |
| [`src/components/layout/LanguageSwitcher.tsx`](src/components/layout/LanguageSwitcher.tsx) | Rewrite JSX — iconless boxes with AR/EN | Low |

**Total: 7 files modified. 0 English files touched. 0 theme files touched. 0 component structure changes.**
