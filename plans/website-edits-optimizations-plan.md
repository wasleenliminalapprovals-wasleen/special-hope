# Website Edits & Optimizations — Detailed Implementation Plan

## Overview

This plan covers 9 tasks for the Wasleen Approvals website (Next.js 15, Tailwind CSS v4, TypeScript). Each task is isolated, ordered logically, and designed to maintain the current 100/100 performance score.

---

## Task 1: Page Integrity & Missing Content

### 🎯 Objective
Audit all pages linked in the navigation menus (Approvals & Services) to ensure they exist and return valid content. Create any missing pages with full SEO/GEO/AI-optimized content.

### 🔍 Current State (Discovered Issues)

**MegaMenu Approvals slugs vs Data slugs — KNOWN MISMATCHES:**

| Menu Link | Data Slug | Status |
|---|---|---|
| `dubai-municipality-approval` | `dubai-municipality-building-permit` | ❌ Mismatch |
| `ded-approval` | Not found in data | ❌ Missing |
| `rera-approval` | `rera-permit` in category slugs | ❌ Mismatch |
| `dubai-police-approval` | Not confirmed in data | ❌ Verify |
| `jafza-approval` | `jebel-ali-free-zone-approval` in data | ❌ Mismatch |
| `dso-approval` | `dubai-silicon-oasis-approval` in data | ❌ Mismatch |
| `impz-approval` | Not confirmed in data | ❌ Verify |
| `emaar-approval` | `emaar-community-approval` in data | ❌ Mismatch |
| `nakheel-approval` | `nakheel-developer-approval` in data | ❌ Mismatch |
| `damac-approval` | `damac-properties-approval` in data | ❌ Mismatch |
| `community-approval` | Not confirmed in data | ❌ Verify |
| `dm-food-approval` | `food-control-department-approval` in data | ❌ Mismatch |
| `fit-out-works-approval` | `interior-fit-out-approval` in data | ❌ Mismatch |

**MegaMenu Services slugs vs Data slugs:**

| Menu Link | Data Slug | Status |
|---|---|---|
| `3d-designs` | `3d-design-visualization` | ❌ Mismatch |
| `cad-drawings` | `cad-documentation` | ❌ Mismatch |
| `project-management` | Not in services data | ❌ Missing |
| `fit-outs` | Not in services data | ❌ Missing |

### 📋 Implementation Steps

1. **Slug Audit Script**: Run a comprehensive match between all menu-linked slugs and available data slugs to identify exact mismatches.
2. **Decision: Fix Links vs Create Pages**: 
   - For minor mismatches (e.g., `3d-designs` → `3d-design-visualization`), fix the menu link.
   - For truly missing pages (e.g., `project-management`, `fit-outs`), create new pages with full SEO content.
3. **Create New Approval Pages** (if any authority is missing from data): Use the [`ApprovalData`](src/types/index.ts:133) interface, follow SEO rules from [`03-SEO-AI-SEARCH-MASTER.md`](.roo/rules/03-SEO-AI-SEARCH-MASTER.md).
4. **Create New Service Pages** (if missing): Use the [`ServiceData`](src/types/index.ts:230) interface.
5. **Update MegaMenu Links**: Fix any mismatched hrefs in [`MegaMenu.tsx`](src/components/layout/MegaMenu.tsx).
6. **Verify**: Build the project and confirm no 404s for any menu-linked URL.

### 📁 Files to Modify
- [`src/components/layout/MegaMenu.tsx`](src/components/layout/MegaMenu.tsx) — Fix hrefs in `APPROVAL_CATEGORIES` and `SERVICES`
- [`src/data/approvals.ts`](src/data/approvals.ts) — Add missing approval entries if needed
- [`src/data/services.ts`](src/data/services.ts) — Add missing service entries if needed
- [`src/components/layout/Footer.tsx`](src/components/layout/Footer.tsx) — Fix any links if they also reference wrong slugs

---

## Task 2: Mobile Menu Dropdowns

### 🎯 Objective
Fix the "Approvals" and "Services" dropdowns in the mobile navigation menu so they toggle open/closed when tapped.

### 🔍 Root Cause
In [`MobileNav.tsx`](src/components/layout/MobileNav.tsx#L148-L155), the [`MegaMenuSection`](src/components/layout/MobileNav.tsx#L148) component renders [`MegaMenu`](src/components/layout/MegaMenu.tsx) with `forceMobile` but does **not** pass `isOpen` or `onToggle` props:

```tsx
function MegaMenuSection({ type }: { type: "approvals" | "services" }) {
  return (
    <MegaMenu
      type={type}
      forceMobile       // ← isOpen and onToggle are MISSING
    />
  );
}
```

In [`MegaMenu.tsx`](src/components/layout/MegaMenu.tsx#L207), the mobile button uses `onClick={onToggle}`, which is `undefined`, so clicking does nothing.

### 📋 Implementation Steps

1. Add local `useState` for `openMenu` in [`MobileNav.tsx`](src/components/layout/MobileNav.tsx) to track which menu section is open.
2. Pass `isOpen` and `onToggle` props to each [`MegaMenuSection`](src/components/layout/MobileNav.tsx#L148) render.
3. Update [`MegaMenuSection`](src/components/layout/MobileNav.tsx#L148) signature to accept and forward these props.

### 📁 Files to Modify
- [`src/components/layout/MobileNav.tsx`](src/components/layout/MobileNav.tsx) — Add state management and pass isOpen/onToggle

---

## Task 3: Hero Banner Animation & Sizing

### 🎯 Objective
1. Make the SVG floor plan animation loop endlessly
2. Change the "APPROVED" stamp emblem color to light green `#90EE90`
3. Increase the emblem size for better visibility
4. Make the floor plan drawing bigger overall

### 🔍 Current State
- The [`animate-draw-line`](src/app/globals.css#L211-L214) class uses `animation: draw-line var(--draw-duration, 1.5s) ease-out forwards` — the `forwards` fill mode means it plays once and stops.
- The [`ApprovalStamp`](src/components/drawings/DrawingSymbols.tsx#L495-L593) component uses hardcoded red (`#C8102E`) for all elements.
- The floor plan is rendered in a container with [`max-w-md` and `aspect-square`](src/components/sections/HeroSection.tsx#L92) on desktop only.

### 📋 Implementation Steps

1. **Endless Loop**: Modify the SVG group elements in [`SceneA_FloorPlan.tsx`](src/components/drawings/SceneA_FloorPlan.tsx) so that after the initial draw animation completes, a subtle pulse/glow animation loops. Alternatively, set the stamp animation to loop with a long delay between repeats.
   - Add a new CSS keyframe `@keyframes stamp-loop` in [`globals.css`](src/app/globals.css) for the stamp that combines the press animation with a long pause, then repeats.
   - For the wall lines, consider adding `animate-glow-pulse` with `infinite` after the initial draw completes.

2. **Green Emblem**: In [`ApprovalStamp`](src/components/drawings/DrawingSymbols.tsx#L495), change all `#C8102E` (red) references to `#2E9E5B` (success-green from design tokens) or a lighter green `#4CAF50` for visibility. The user specified "Light Green" — use `#66BB6A` or similar.

3. **Bigger Emblem**: Increase the `size` prop passed to [`ApprovalStamp`](src/components/drawings/SceneA_FloorPlan.tsx#L366-L372) from `80` to `100` or `120`. Adjust positioning (`x` and `y` props) as needed.

4. **Bigger Floor Plan**: 
   - Change the container width from [`max-w-md`](src/components/sections/HeroSection.tsx#L92) to `max-w-lg` or remove the max-width constraint for desktop.
   - Change from `aspect-square` to `aspect-[5/4]` (matching the SVG's own aspect ratio) or just remove the fixed aspect ratio.

### 📁 Files to Modify
- [`src/components/drawings/SceneA_FloorPlan.tsx`](src/components/drawings/SceneA_FloorPlan.tsx) — Increase stamp size, loop animation
- [`src/components/drawings/DrawingSymbols.tsx`](src/components/drawings/DrawingSymbols.tsx) — Change stamp color to light green
- [`src/components/sections/HeroSection.tsx`](src/components/sections/HeroSection.tsx) — Make floor plan container bigger
- [`src/app/globals.css`](src/app/globals.css) — Add looping animation keyframes

---

## Task 4: Mobile View Animation Placement

### 🎯 Objective
Show the animated floor plan on mobile devices, positioned securely behind the text and CTA buttons so it doesn't block readability.

### 🔍 Current State
The floor plan is hidden on mobile with [`hidden md:block`](src/components/sections/HeroSection.tsx#L92). Text and buttons are stacked above where the drawing would be.

### 📋 Implementation Steps

1. Remove `hidden md:block` classes from the drawing container.
2. Add absolute positioning to overlay the drawing behind the text column on mobile:
   - Use `absolute inset-0 opacity-20 md:opacity-100` on mobile.
   - Set `pointer-events-none` so clicks pass through to buttons.
   - Keep the relative positioning for text content (`z-index` management).
3. On desktop, keep the side-by-side layout as-is.
4. On mobile (below `md` breakpoint), make the hero section `relative` with `overflow-hidden`. Place the drawing as a background element with `absolute inset-0 opacity-15` and `z-0`. Keep the text at `z-10`.

### 📁 Files to Modify
- [`src/components/sections/HeroSection.tsx`](src/components/sections/HeroSection.tsx) — Restructure layout for mobile background drawing

---

## Task 5: "Approved by Dubai's Leading Authorities" Section

### 🎯 Objective
Replace the text-based authority badges in the Trust Strip with actual logo images from `D:\Wasleen Liminal Approvals\Logos for authority`. Arrange primary authorities prominently, with secondary authorities in a marquee/carousel below.

### 🔍 Current State
[`TrustStrip.tsx`](src/components/sections/TrustStrip.tsx) renders 6 authorities as text badges with abbreviation initials in a colored box. There's a comment `"actual logo images in Phase 12"`.

### 📋 Available Logos (35 files)
The folder contains logos for: DM, DCD, DET/DED, DEWA, DHA, Dubai Expo, Dubai Media Office, Dubai South, Dubai Holding, DWTC, DAFZ, Dubai Chamber, Dubai Customs, DFSA, DIFC, DMCC, Dubai Police, RTA, DSO, Emaar, IFZA, JAFZA, KHDA, Concordia, DDA, Meydan Free Zone, MOHRE, Nakheel, Port & Customs, UAE Emblem, UAE MOEdu.

### 📋 Implementation Steps

1. **Copy Logo Files**: Copy all relevant logo files from `D:\Wasleen Liminal Approvals\Logos for authority` to the project's `/public/logos/` directory.
2. **Define Priority Tiers**:
   - **Primary (prominent, static grid)**: DM, DCD, DEWA, DDA, RTA, Dubai Police, Dubai South, DSO
   - **Secondary (marquee animation)**: All remaining logos (Emaar, Nakheel, Damac, DMCC, DIFC, JAFZA, DAFZ, DWTC, Dubai Chamber, Dubai Customs, DFSA, Dubai Holding, Dubai Media Office, KHDA, MOHRE, Expo, Meydan, Concordia, Port & Customs, UAE MOEdu, IFZA)
3. **Refactor [`TrustStrip.tsx`](src/components/sections/TrustStrip.tsx)**:
   - Import `Image` from `next/image`.
   - Render primary logos in a professional grid layout with proper spacing, white backgrounds, and drop shadows.
   - Render secondary logos below in a CSS marquee (horizontal scroll) container.
   - Add `marquee` animation keyframes to [`globals.css`](src/app/globals.css).
4. **Styling**: Keep logos in grayscale with hover-to-color effect (maintaining existing UX pattern). Ensure consistent height for all logos.

### 📁 Files to Modify
- [`src/components/sections/TrustStrip.tsx`](src/components/sections/TrustStrip.tsx) — Complete rewrite with real images
- [`src/app/globals.css`](src/app/globals.css) — Add marquee animation keyframes
- Copy logo files to `/public/logos/`

---

## Task 6: "Approval Services We Handle" Section

### 🎯 Objective
Add authority logos to the service category cards in [`ServiceCategories.tsx`](src/components/sections/ServiceCategories.tsx), placed next to the existing Lucide icons. Add hover effects.

### 🔍 Current State
Each card shows a Lucide icon (24px) with category title and description. No authority logos.

### 📋 Implementation Steps

1. **Map Categories to Authority Logos**: Create a mapping from each category slug to the most relevant authority logo(s):
   - `government-regulatory` → DM, DCD
   - `free-zone` → DSO, DMCC
   - `developer-community` → Emaar, Nakheel
   - `property-registration` → DLD/RERA
   - `technical-utility` → DEWA
   - `trade-food-hospitality` → DM Food/DET
   - `fit-out-construction` → Trakhees/DM
   - `drawing-documentation` → DM

2. **Modify [`Card.tsx`](src/components/ui/Card.tsx)** or **Update [`ServiceCategories.tsx`](src/components/sections/ServiceCategories.tsx)**:
   - Add a second icon slot on the right side of the icon container.
   - Use `next/image` for authority logos, matching the 24px Lucide icon size.
   - Keep the layout: Lucide icon (left) + authority logo (right), side by side.

3. **Hover Effect**: Add a lift/shadow effect on card hover:
   - Scale up slightly (`transform: scale(1.02)`)
   - Enhanced shadow (`shadow-dropdown` → deeper shadow)
   - Subtle border color change
   - Add `transition-all duration-300 ease-out`

4. **Dynamic**: The categories array already drives rendering. Just add an `authorityLogo` field to each category object.

### 📁 Files to Modify
- [`src/components/sections/ServiceCategories.tsx`](src/components/sections/ServiceCategories.tsx) — Add logo mapping and second icon slot
- [`src/components/ui/Card.tsx`](src/components/ui/Card.tsx) — Optionally add support for dual icons

---

## Task 7: Global WhatsApp Button

### 🎯 Objective
Add a floating WhatsApp button visible on every page, positioned at the bottom-right, slightly elevated from the bottom edge.

### 🔍 Current State
An existing [`WhatsAppButton.tsx`](src/components/sections/WhatsAppButton.tsx) component exists but is used only in specific page contexts (e.g., contact page), not globally.

### 📋 Implementation Steps

1. **Create a Floating WhatsApp Component**: 
   - Build a new [`FloatingWhatsApp.tsx`](src/components/sections/FloatingWhatsApp.tsx) component.
   - Use a fixed positioning: `fixed bottom-6 right-6 z-50`.
   - Style as a circular button with the WhatsApp green color (`#25D366`) and phone icon.
   - Include a subtle pulse animation to draw attention.
   - Click opens WhatsApp with pre-filled message + analytics tracking.

2. **Add to Root Layout**:
   - Import and render [`FloatingWhatsApp`](src/components/sections/FloatingWhatsApp.tsx) in [`layout.tsx`](src/app/layout.tsx) just before the closing `</body>` tag.
   - Ensure it renders after Header, main content, and Footer.

3. **Mobile Responsiveness**:
   - Slightly smaller on mobile: `bottom-4 right-4` with smaller icon.
   - Ensure it doesn't overlap with the mobile hamburger menu.

### 📁 Files to Modify
- Create [`src/components/sections/FloatingWhatsApp.tsx`](src/components/sections/FloatingWhatsApp.tsx) — New component
- [`src/app/layout.tsx`](src/app/layout.tsx) — Add the floating button
- [`src/app/globals.css`](src/app/globals.css) — Add WhatsApp pulse animation

---

## Task 8: Guides Page Styling & Scalability

### 🎯 Objective
Add hover effects and more eye-catching styles to the guides hub page. Ensure the styles work dynamically for any future guides added.

### 🔍 Current State
The [`GuidesHubPage`](src/app/guides/page.tsx) renders guide cards with basic hover effects (shadow, border color). The effects are subtle.

### 📋 Implementation Steps

1. **Enhanced Card Styling**: Update the card hover effects in both the hub guides section ([line 118](src/app/guides/page.tsx#L118)) and Q&A section ([line 177](src/app/guides/page.tsx#L177)):
   - Add `hover:-translate-y-1 transform transition-all duration-300` for a lift effect.
   - Add `hover:shadow-lg` for deeper shadow.
   - Add a subtle left border accent that appears on hover: `hover:border-l-4 hover:border-l-brand-blue`.
   - Add `hover:bg-gradient-to-br hover:from-white hover:to-card-bg` for a subtle gradient on hover.

2. **Dynamic Application**: Since the cards are rendered from the [`guides`](src/data/guides.ts) data array using `.map()`, any new guide added to the data will automatically use the updated styles. No data changes needed — just CSS class updates on the `<Link>` elements.

3. **Category/Section Headers**: Add subtle hover effects to section headers too.

4. **Accessibility**: Ensure all hover effects also work with `:focus-visible` for keyboard navigation.

### 📁 Files to Modify
- [`src/app/guides/page.tsx`](src/app/guides/page.tsx) — Enhanced CSS classes on card `<Link>` elements

---

## Task 9: Hero Banner Button Hover Color

### 🎯 Objective
Fix the "View All Approvals" outline button hover state in the hero banner. Currently, the hover changes the background to white and text to brand-blue, which causes readability issues.

### 🔍 Current State
In [`HeroSection.tsx`](src/components/sections/HeroSection.tsx#L63-L70):
```tsx
<Button
  variant="outline"
  href="/approvals"
  className="text-body px-8 py-4 border-white text-white hover:bg-white hover:text-brand-blue"
>
  View All Approvals
</Button>
```

The `variant="outline"` button already has its own hover styles (see [`Button.tsx`](src/components/ui/Button.tsx#L52): `hover:bg-brand-blue hover:text-white`), and the inline class `hover:bg-white hover:text-brand-blue` overrides it. The problem is white text on white background during hover.

### 📋 Implementation Steps

1. **Change hover color**: Replace `hover:bg-white hover:text-brand-blue` with `hover:bg-cta-amber hover:text-brand-black` (using CTA amber which is a warm, visible color against white text when not hovering).
2. **Alternative**: Use `hover:bg-brand-blue-hover hover:text-white` for a deeper blue that's still readable.
3. **Remove conflicting inline overrides**: The variant `outline` already has a default hover, so the inline classes should be kept minimal.

**Recommended fix:**
```tsx
className="text-body px-8 py-4 border-white text-white hover:bg-cta-amber hover:text-brand-black hover:border-cta-amber"
```

### 📁 Files to Modify
- [`src/components/sections/HeroSection.tsx`](src/components/sections/HeroSection.tsx#L66) — Fix hover color classes

---

## Execution Order

The tasks should be executed in this order to minimize conflicts:

| Order | Task | Reason |
|---|---|---|
| 1 | **Task 9**: Button hover fix | Minimal change, quick win |
| 2 | **Task 2**: Mobile menu dropdowns | Critical UX fix, isolated change |
| 3 | **Task 1**: Page integrity audit | Foundation for menu links |
| 4 | **Task 7**: Global WhatsApp button | New component added to layout |
| 5 | **Task 3**: Hero animation & sizing | Visual changes, modifies canvas |
| 6 | **Task 4**: Mobile animation placement | Follows hero changes |
| 7 | **Task 5**: Trust Strip logos | New assets + major component rework |
| 8 | **Task 6**: Service cards logos | Depends on Task 5 logos being available |
| 9 | **Task 8**: Guides page styling | Independent, can be done anytime |

---

## Performance Impact Assessment

| Task | Risk | Mitigation |
|---|---|---|
| 1 (New pages) | Low | Static generation at build time, no runtime cost |
| 2 (Mobile menu) | Very Low | Client-side state only, minimal JS |
| 3 (Animation loop) | Low | CSS animations, no JS overhead |
| 4 (Mobile drawing) | Very Low | CSS-only repositioning |
| 5 (Logo images) | Medium | Use `next/image` with proper sizing; lazy-load below-fold logos; compress logo files |
| 6 (Service logos) | Low | Small images, same size as existing icons |
| 7 (WhatsApp button) | Very Low | Single fixed element, lightweight |
| 8 (Guides styling) | Very Low | CSS-only changes |
| 9 (Button hover) | Very Low | Single CSS class change |

**Key concern**: Task 5 adds ~35 logo images. Ensure all are:
- Optimized via `next/image` with `width`/`height` and `loading="lazy"`
- Properly sized (not oversized source files)
- Served in next-gen formats where possible (WebP)
