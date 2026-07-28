# Plan: Grid Hover Effects, TrustStrip Colors, ProcessOverview BG, WhatsApp Fix, Guide Cards, Contact Maps, Footer Maps

## Overview

This plan addresses 7 interconnected UI improvements across the Wasleen Approvals website. All changes are cosmetic/UX only — no data layer, no schema, no routing changes. Each task is scoped to specific files with no side effects on other components.

---

## Task 1: Standardize Beautiful Grid Hover Effects Across All Hub Pages

### Current State
Each hub page uses slightly different hover styles:
- [`src/components/ui/Card.tsx`](../src/components/ui/Card.tsx:77) — `hover:shadow-dropdown` only, no lift
- [`src/components/sections/ServiceCategories.tsx`](../src/components/sections/ServiceCategories.tsx:137) — passes `hover:-translate-y-1 hover:shadow-dropdown hover:border-brand-blue/40` via className prop
- [`src/app/approvals/page.tsx`](../src/app/approvals/page.tsx:156) — `hover:shadow-dropdown hover:border-brand-blue/30` (no lift)
- [`src/app/guides/page.tsx`](../src/app/guides/page.tsx:118,177) — `hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 hover:border-l-4 hover:border-l-brand-blue hover:bg-gradient-to-br hover:from-white hover:to-card-bg`
- [`src/app/services/page.tsx`](../src/app/services/page.tsx:119) — `hover:shadow-dropdown hover:border-brand-blue/30` (no lift)

### Desired Effect (consistent across all grids)

A unified hover effect that:
1. **Lifts** the card (`-translate-y-1`)
2. **Deepens shadow** (`shadow-dropdown` → `shadow-lg` feels more premium)
3. **Shows a subtle brand-blue border glow** (`border-brand-blue/40`)
4. **Shows a left accent border** (like guides already has: `border-l-4 border-l-brand-blue`) — this adds a beautiful brand touch
5. **Slightly brightens the background** with a subtle gradient (`hover:bg-gradient-to-br hover:from-white hover:to-card-bg`)
6. **Reveals a right-arrow icon** that was hidden (`opacity-0 group-hover:opacity-100`)
7. **Colors the title** (`group-hover:text-link-blue`)
8. **Smooth transitions** (`transition-all duration-300 ease-out`)

### Files to Modify

| File | Change |
|------|--------|
| [`src/components/ui/Card.tsx`](../src/components/ui/Card.tsx) | Update `cardClasses` to include lift + gradient + left-border-accent on hover. Preserve existing `transition-shadow` but switch to `transition-all duration-300 ease-out`. Add `group` class and left-border accent. |
| [`src/app/approvals/page.tsx`](../src/app/approvals/page.tsx:156) | Update Link className to match unified hover spec (lift, gradient bg, left border accent, title color change, arrow reveal). |
| [`src/app/services/page.tsx`](../src/app/services/page.tsx:119) | Same unified hover effect on service cards. |
| [`src/app/guides/page.tsx`](../src/app/guides/page.tsx:118,177) | Already close to the unified spec — minor alignment if needed (ensure consistency). |

### Readability Safeguards
- Text colors do NOT change on hover (only title gets `link-blue`)
- Background gradient is VERY subtle (`from-white to-card-bg` where `card-bg = #EAF1FB` is a pale blue)
- `line-clamp` prevents text overflow
- Transition duration is `300ms` — fast enough to feel responsive, slow enough to not be jarring

---

## Task 2: Add Color to TrustStrip Authority Logos

### Current State
[`src/components/sections/TrustStrip.tsx`](../src/components/sections/TrustStrip.tsx:80) uses `grayscale hover:grayscale-0 transition-all duration-300` — logos start B&W and colorize on hover.

### Why B&W?
This is intentional — grayscale logos prevent visual clutter on a page with many different logo styles/colors. However, the user wants them in color.

### Change
- Remove `grayscale` class from the container div (line 80)
- Keep `hover:grayscale-0` — actually remove the entire grayscale approach
- Authority logos will render in their original colors
- Keep the card container hover effects (`hover:shadow-dropdown hover:-translate-y-0.5`) for interactivity

### File to Modify
- [`src/components/sections/TrustStrip.tsx`](../src/components/sections/TrustStrip.tsx:80) — Change `grayscale hover:grayscale-0` to just the card container hover

---

## Task 3: Update ProcessOverview "How It Works" Grid Background

### Current State
[`src/components/sections/ProcessOverview.tsx`](../src/components/sections/ProcessOverview.tsx:45) — Section bg is `bg-light-bg` (#f8fafc, very light gray). Step cards have NO explicit background (transparent).

### Change
1. Change section background to `bg-white` (to contrast with the new card backgrounds)
2. Give each step card a themed background — `bg-card-bg` (#EAF1FB, light blue)
3. Add the standardized hover effect (lift + shadow + left accent border) to each step card
4. Keep the step number circle styling (absolute positioned, brand-blue)

### File to Modify
- [`src/components/sections/ProcessOverview.tsx`](../src/components/sections/ProcessOverview.tsx)

---

## Task 4: Fix WhatsApp Floating Button Visibility

### Current State
[`src/components/sections/FloatingWhatsApp.tsx`](../src/components/sections/FloatingWhatsApp.tsx) is included in root [`src/app/layout.tsx`](../src/app/layout.tsx:142) — it renders on every page.

### Issue Diagnosis
The button has a potential CSS issue on line 52:
```tsx
className="md:size-28"
```
`size-28` in Tailwind = `7rem` (112px). This is applied to the **MessageCircle icon** on `md:` screens and above. The button container is `w-14 h-14` (56px) on mobile and `md:w-16 md:h-16` (64px) on desktop. An icon of 112px inside a 64px container could cause rendering issues (overflow hidden, icon clipped or invisible).

### Fix
Change `md:size-28` to `md:size-6` (24px) on line 52, matching the mobile size. The icon should consistently be 24px regardless of viewport.

Additionally, ensure the button has sufficient z-index — it already has `z-50` which is correct.

### File to Modify
- [`src/components/sections/FloatingWhatsApp.tsx`](../src/components/sections/FloatingWhatsApp.tsx:52)

---

## Task 5: Update Guide Hub Page Cards — Light Blue Background + Hover

### Current State
[`src/app/guides/page.tsx`](../src/app/guides/page.tsx:118,177) — Both hub guide cards and Q&A guide cards use `bg-white` with no background color in default state.

### Change
1. Change default card bg from `bg-white` to `bg-card-bg` (#EAF1FB, light blue)
2. Already have beautiful hover effects — keep as-is since they already match the unified spec
3. The `hover:bg-gradient-to-br hover:from-white hover:to-card-bg` will transition from light-blue to a brighter state

### Files to Modify
- [`src/app/guides/page.tsx`](../src/app/guides/page.tsx) — Both card Link elements

---

## Task 6: Contact Us — Two Business Maps

### Current State
[`src/app/contact-us/page.tsx`](../src/app/contact-us/page.tsx:168-181) has a single generic Dubai map iframe.

### Change
Replace the single map with two maps side by side showing the two actual business locations:

**Map 1 — Wasleen Technical Services (Pergola & Car Parking Solutions)**
```html
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.447891748681!2d55.299419775383804!3d25.255514377673393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f436925673a6f%3A0xdd525a8229093985!2sWasleen%20Technical%20Services%20%E2%80%93%20Pergola%20%26%20Car%20Parking%20Solutions%20in%20Dubai!5e0!3m2!1sen!2sae!4v1785229567827!5m2!1sen!2sae" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
```

**Map 2 — Wasleen Pergolas & CinemaxSky**
```html
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.1380597540597!2d55.38031657538407!3d25.265940777666803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa1176f7006181aff%3A0x734697b9bc64aefe!2sWasleen%20Pergolas%20%26%20CinemaxSky!5e0!3m2!1sen!2sae!4v1785229637998!5m2!1sen!2sae" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
```

### Layout Design
- Replace the current right-column single map with a **vertical stack of two smaller maps**
- Each map: `aspect-[4/3]` or fixed height `250px` on desktop
- Each map gets a label/title above it (e.g., "Our Main Office" and "Our Showroom")
- Keep the business hours card below the two maps
- The left column (contact methods) stays unchanged

### Files to Modify
- [`src/app/contact-us/page.tsx`](../src/app/contact-us/page.tsx)

---

## Task 7: Footer — Two Maps Side by Side

### Current State
[`src/components/layout/Footer.tsx`](../src/components/layout/Footer.tsx:122-135) has a single generic Dubai map embed.

### Change
Replace the single map with **two maps side by side** in a 2-column grid:

Layout:
```
[Map 1 — Wasleen Technical Services]  [Map 2 — Wasleen Pergolas & CinemaxSky]
```

- Use `grid grid-cols-1 md:grid-cols-2 gap-4`
- Each map: `h-[180px]` on desktop, `h-[160px]` on mobile
- Each gets a small label above
- Preserve the border styling and rounded corners

### Files to Modify
- [`src/components/layout/Footer.tsx`](../src/components/layout/Footer.tsx)

---

## Execution Order (Logical Sequence)

| Step | Task | Files | Risk Level |
|------|------|-------|------------|
| 1 | Fix WhatsApp button icon size | `FloatingWhatsApp.tsx` | Low — 1 line change |
| 2 | Add color to TrustStrip logos | `TrustStrip.tsx` | Low — remove grayscale class |
| 3 | Update ProcessOverview bg + card styles | `ProcessOverview.tsx` | Low — visual only |
| 4 | Update guide cards to light blue bg | `guides/page.tsx` | Low — change bg-white to bg-card-bg |
| 5 | Standardize hover effects on Card component | `ui/Card.tsx` | Medium — shared component, test all usages |
| 6 | Standardize hover effects on approvals hub | `approvals/page.tsx` | Low — visual only |
| 7 | Standardize hover effects on services hub | `services/page.tsx` | Low — visual only |
| 8 | Contact Us — two maps | `contact-us/page.tsx` | Medium — layout restructure |
| 9 | Footer — two maps side by side | `layout/Footer.tsx` | Medium — layout restructure |
| 10 | Verify build + visual check | `npm run build` | Critical — must pass |

---

## Verification Checklist

- [ ] `npm run build` completes without errors
- [ ] No TypeScript errors
- [ ] All grid cards have consistent hover effects (lift, shadow, left accent, title color)
- [ ] TrustStrip logos show in color by default
- [ ] "How It Works" cards have light blue (`bg-card-bg`) background
- [ ] Guide hub cards have light blue (`bg-card-bg`) background
- [ ] WhatsApp floating button visible on all pages (check mobile + desktop)
- [ ] Contact Us page shows two specific business maps with labels
- [ ] Footer shows two maps side by side
- [ ] PageSpeed score remains 95+ (no new heavy resources)
- [ ] No layout shifts (maps have explicit aspect ratios)
