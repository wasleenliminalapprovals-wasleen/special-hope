# Final Plan: 100% Arabic Pages — Complete Audit & Fix

## Summary of Investigation

I conducted a thorough audit of ALL files that render on Arabic (`/ar/`) pages. This document lists **every instance** of English text found on Arabic pages, the root cause, and the exact fix required — without modifying themes, styles, or component logic beyond the scope of this task.

---

## Issue 1: Mobile Menu Opens on AR Language Switch

### Root Cause
In [`src/components/layout/Header.tsx`](../src/components/layout/Header.tsx:61-63), the `useEffect` watching `pathname` only closes mega menus but **does not close the mobile menu**:

```typescript
// Line 61-63 — ONLY closes mega menus
useEffect(() => {
  setActiveMegaMenu(null);
}, [pathname]);
```

When a user clicks the AR link in `LanguageSwitcher`, the client-side navigation to `/ar` triggers a `pathname` change. The Header re-renders but `isMobileMenuOpen` remains in its previous state (or gets re-triggered), causing the mobile drawer to appear.

### Fix
Add `setIsMobileMenuOpen(false)` to the existing `useEffect`:

```typescript
useEffect(() => {
  setActiveMegaMenu(null);
  setIsMobileMenuOpen(false);  // ← ADD THIS LINE
}, [pathname]);
```

**File to modify**: `src/components/layout/Header.tsx`  
**Scope**: Single line addition. No style/theme changes.

---

## Issue 2: Arabic Homepage Shows English Content

### Root Cause
[`src/app/ar/page.tsx`](../src/app/ar/page.tsx:126-144) imports and renders **5 shared components** that contain **hardcoded English text**. These components do not accept a `locale` prop and cannot render Arabic.

### Full Audit of English in Each Component

#### 2A. [`TrustStrip`](../src/components/sections/TrustStrip.tsx:105-107)
| Line | English Text | Arabic Replacement |
|------|-------------|-------------------|
| 106 | `"Approved by Dubai's Leading Authorities"` | `"معتمد من أبرز الجهات الرسمية في دبي"` |

#### 2B. [`ServiceCategories`](../src/components/sections/ServiceCategories.tsx:105-111, 115-140, 143-149)
| Line(s) | English Text | Arabic Replacement |
|---------|-------------|-------------------|
| 106 | `"Approval Services We Handle"` | `"خدمات الموافقات التي نقدمها"` |
| 108-111 | `"From government permits to technical drawings..."` | `"من التصاريح الحكومية إلى الرسومات الفنية — ندير كل موافقة يحتاجها مشروعك في دبي."` |
| 35-36 | `"Government & Regulatory"` | `"الحكومية والتنظيمية"` |
| 38-39 | `"DM, DCD, RTA & government authority approvals"` | `"موافقات بلدية دبي والدفاع المدني وهيئة الطرق والمواصلات"` |
| 43-44 | `"Free Zone Approvals"` | `"المناطق الحرة"` |
| 46-47 | `"DSO, Dubai South, TECOM & free zone permits"` | `"تصاريح واحة دبي للسيليكون ودبي الجنوب وتيكوم"` |
| 51-52 | `"Developer & Community"` | `"المطورين والمجتمعات"` |
| 53-54 | `"Emaar, Nakheel & developer approvals"` | `"موافقات إعمار ونخيل والمطورين"` |
| 59-60 | `"Property & Registration"` | `"العقارات والتسجيل"` |
| 61-62 | `"Title deeds, registration & property documents"` | `"سندات الملكية والتسجيل والمستندات العقارية"` |
| 67-68 | `"Technical & Utility"` | `"الفنية والمرافق"` |
| 69-70 | `"DEWA, district cooling & infrastructure connections"` | `"ديوا وتبريد المناطق وتوصيلات البنية التحتية"` |
| 75-76 | `"Trade, Food & Hospitality"` | `"التجارة والأغذية والضيافة"` |
| 77-78 | `"Food safety, trade licenses & hotel permits"` | `"السلامة الغذائية والرخص التجارية وتصاريح الفنادق"` |
| 83-84 | `"Fit-Out & Construction"` | `"التشطيبات والبناء"` |
| 85-86 | `"Interior fit-out, renovation & building permits"` | `"التشطيبات الداخلية والتجديد وتصاريح البناء"` |
| 91-92 | `"Drawing & Documentation"` | `"الرسومات والوثائق"` |
| 93-94 | `"2D, 3D, CAD drawings & technical submissions"` | `"الرسومات ثنائية وثلاثية الأبعاد وتقديمات CAD"` |
| 135 | `"{count}+ approvals"` (badge) | `"{count}+ موافقة"` |
| **136** | **`href="/approvals?category=${cat.slug}"`** | **`href="/ar/approvals?category=${cat.slug}"`** |
| **145** | **`href="/approvals"`** | **`href="/ar/approvals"`** |
| 148 | `"View All 52+ Approval Types →"` | `"عرض جميع أنواع الموافقات الـ 52+ ←"` |

#### 2C. [`ProcessOverview`](../src/components/sections/ProcessOverview.tsx:48-54, 12-41)
| Line(s) | English Text | Arabic Replacement |
|---------|-------------|-------------------|
| 49 | `"How It Works"` | `"كيف نعمل"` |
| 52-53 | `"A streamlined process designed to save you time..."` | `"عملية مبسطة مصممة لتوفير وقتك وإزالة تعقيد نظام الموافقات في دبي."` |
| 15-17 | Step 1 title+desc: `"Submit Your Requirements"` / `"Tell us about your project..."` | `"تقديم متطلباتك"` / `"أخبرنا عن مشروعك — النوع والموقع والنطاق. سنحدد كل موافقة تحتاجها."` |
| 22-24 | Step 2: `"We Prepare & Submit"` / `"Our team compiles..."` | `"نحن نعد ونقدم"` / `"يجمع فريقنا جميع المستندات والرسومات والنماذج المطلوبة. نقدم للجهة المختصة نيابة عنك."` |
| 29-31 | Step 3: `"We Track & Follow Up"` / `"We monitor the application..."` | `"نتابع ونسأل"` / `"نتابع حالة الطلب ونرد على الاستفسارات ونجري المراجعات حسب الحاجة."` |
| 36-38 | Step 4: `"Approval Delivered"` / `"Once approved, we deliver..."` | `"تم تسليم الموافقة"` / `"بعد الموافقة، نسلمك الشهادة أو التصريح ونتأكد من أن كل شيء جاهز."` |

#### 2D. [`GeoContentSection`](../src/components/sections/GeoContentSection.tsx:19-141)
**ALL** content is hardcoded English. Full list:
| Line(s) | English | Must be Arabic |
|---------|---------|----------------|
| 19 | `"Trusted Across Dubai's Key Commercial & Residential Hubs"` | Heading |
| 23-31 | First paragraph about DM, DDA, DEWA, DCD, Trakhees | Full paragraph |
| 33-42 | Second paragraph about locations | Full paragraph |
| 44-52 | Third paragraph about registered engineers | Full paragraph |
| 56-61 | `"View all 52+ approval types →"` + `href="/approvals"` | Arabic text + `/ar/approvals` |
| 68 | `"Why Dubai Chooses Wasleen for Project Approvals"` | Heading |
| 73-89 | Stats: "Approval Types Covered", "Projects Successfully Delivered", etc. | Arabic |
| 92-99 | Paragraph about team + `href="/about-us"` | Arabic + `/ar/about-us` |
| 105 | `"Comprehensive Approval Services Across Every Authority"` | Heading |
| 108-131 | Long paragraph with multiple English links | Full Arabic + `/ar/` paths |
| **110** | **`href="/approvals"`** | **`href="/ar/approvals"`** |
| **112** | **`href="/approvals/dubai-municipality-building-permit"`** | **`href="/ar/approvals/dubai-municipality-building-permit"`** |
| **114** | **`href="/approvals/dubai-civil-defense-approval"`** | **`href="/ar/approvals/dubai-civil-defense-approval"`** |
| **115** | **`href="/approvals/dewa-approval"`** | **`href="/ar/approvals/dewa-approval"`** |
| **121-129** | **Multiple `/approvals/...` links** | **All `/ar/approvals/...`** |
| **136** | **`href="/contact-us"`** | **`href="/ar/contact-us"`** |
| 139 | `"Get Your Free Approval Assessment →"` | Arabic text |

#### 2E. [`AuthorityUpdates`](../src/components/sections/AuthorityUpdates.tsx:73-79, 24-65, 117-122)
| Line(s) | English Text | Arabic Replacement |
|---------|-------------|-------------------|
| 74 | `"Dubai Approval Authority Updates"` | `"آخر تحديثات جهات الموافقات في دبي"` |
| 76-79 | `"Stay informed on the latest regulatory changes..."` | Arabic subtitle |
| 26-31 | DM update (name + summary) | Arabic |
| 33-39 | DCD update (name + summary) | Arabic |
| 41-47 | DEWA update (name + summary) | Arabic |
| 49-55 | DDA update (name + summary) | Arabic |
| 57-64 | DMCC update (name + summary) | Arabic |
| **118** | **`href="/approvals/${item.slug}"`** | **`href="/ar/approvals/${item.slug}"`** |
| 121 | `"Read More →"` | `"اقرأ المزيد ←"` |

### Fix Strategy for Issue 2
Since these 5 components are shared with English pages and the user said "do not change themes/codes/components", the cleanest approach is:

**Create Arabic-specific inline sections or new Arabic-only components** in `src/app/ar/page.tsx` or new files in `src/components/sections/`:

1. **`TrustStrip`** → Replace with inline Arabic version in `ar/page.tsx` (simple enough)
2. **`ServiceCategories`** → Create `ServiceCategoriesArabic.tsx` with Arabic text + `/ar/` links
3. **`ProcessOverview`** → Replace with inline Arabic version in `ar/page.tsx`
4. **`GeoContentSection`** → Create `GeoContentSectionArabic.tsx` with Arabic text + `/ar/` links
5. **`AuthorityUpdates`** → Create `AuthorityUpdatesArabic.tsx` with Arabic text + `/ar/` links

**Files to modify**: `src/app/ar/page.tsx` (imports + usage) + new component files  
**Files NOT modified**: Original English components remain untouched

---

## Issue 3: MegaMenu Services Labels in English for Arabic

### Root Cause
In [`src/components/layout/MegaMenu.tsx`](../src/components/layout/MegaMenu.tsx:150-161), the `getServices()` function returns **English labels** even when `locale === "ar"`:

```typescript
function getServices(locale: "en" | "ar"): ServiceItem[] {
  const prefix = locale === "ar" ? "/ar" : "";
  return [
    { label: "2D Drawings", ... },      // ← Always English!
    { label: "3D Designs", ... },       // ← Always English!
    { label: "CAD Drawings", ... },     // ← Always English!
    { label: "Project Management", ... },// ← Always English!
    { label: "Fit-Outs", ... },         // ← Always English!
    { label: "Interior (Wasleen)", ... },
    { label: "Pergolas", ... },
  ];
}
```

Additionally, `"Project Management"` and `"Fit-Outs"` don't exist as actual service pages (they aren't in `data/services.ts`). The real services are: `2d-drawings`, `3d-design-visualization`, `cad-documentation`, `approval-management`, `document-clearing`.

### Fix
Add Arabic labels when `locale === "ar"`:

```typescript
function getServices(locale: "en" | "ar"): ServiceItem[] {
  const prefix = locale === "ar" ? "/ar" : "";
  if (locale === "ar") {
    return [
      { label: "الرسومات ثنائية الأبعاد", href: `${prefix}/services/2d-drawings` },
      { label: "التصميم ثلاثي الأبعاد", href: `${prefix}/services/3d-design-visualization` },
      { label: "توثيق CAD", href: `${prefix}/services/cad-documentation` },
      { label: "إدارة الموافقات", href: `${prefix}/services/approval-management` },
      { label: "إنهاء المعاملات", href: `${prefix}/services/document-clearing` },
      { label: "الديكور الداخلي", href: "https://wasleen.com", isExternal: true },
      { label: "البرجولات", href: "https://www.pergolas.wasleen.com", isExternal: true },
    ];
  }
  // ... existing English array
}
```

**File to modify**: `src/components/layout/MegaMenu.tsx`

---

## Issue 4: English Badges in Arabic Approvals Hub Page

### Root Cause
In [`src/app/ar/approvals/page.tsx`](../src/app/ar/approvals/page.tsx:188-193), the approval cards display English data from the English `approvals.ts`:

```typescript
<Badge variant="outline">{approval.typicalTimeline}</Badge>   // e.g., "5-10 business days"
<Badge variant="outline">{approval.authorityAbbr}</Badge>      // e.g., "DM"
```

The `approval` variable comes from English `approvals` array (line 162: `group.items.map((approval) =>`), so `typicalTimeline` and `authorityAbbr` are English.

### Fix
Replace with Arabic-friendly alternatives:
- Instead of `approval.authorityAbbr` (e.g., "DM"), use `AR.categories[approval.category]` (e.g., "الحكومية والتنظيمية")
- Instead of `approval.typicalTimeline` (e.g., "5-10 business days"), use `arEntry?.ar?.stats?.find(s => s.label.includes("مدة"))?.value` or simply hide the timeline badge

**File to modify**: `src/app/ar/approvals/page.tsx`

---

## Issue 5: English Category Label in Approval Detail Page

### Root Cause
In [`src/app/ar/approvals/[slug]/page.tsx`](../src/app/ar/approvals/[slug]/page.tsx:138), the schema uses the **English category label**:

```typescript
serviceCategory: getCategoryLabel(approval.category),  // ← English!
```

There's already an Arabic function `getArabicCategoryLabel()` defined on line 107-110, but it's not being used.

### Fix
Change line 138 from:
```typescript
serviceCategory: getCategoryLabel(approval.category),
```
to:
```typescript
serviceCategory: getArabicCategoryLabel(approval.category),
```

**File to modify**: `src/app/ar/approvals/[slug]/page.tsx`

---

## Issue 6: English Data in Arabic Services Detail Page

### Root Cause
In [`src/app/ar/services/[slug]/page.tsx`](../src/app/ar/services/[slug]/page.tsx:153-164), the `relatedApprovalEntries` includes English data:

```typescript
return {
  slug: a.slug,
  name: arApproval?.ar?.name ?? a.name,
  authorityAbbr: a.authorityAbbr,        // ← English (e.g., "DM")
  typicalTimeline: a.typicalTimeline,    // ← English (e.g., "5-10 business days")
};
```

These `authorityAbbr` and `typicalTimeline` values are from the English data source. If they are rendered on the page, they'll show English text.

### Fix Options
1. If these fields are not rendered in the JSX (only used for sorting/filtering), they can remain as-is but should be reviewed.
2. If they ARE rendered, replace with Arabic equivalents or remove from the returned object.

**File to modify**: `src/app/ar/services/[slug]/page.tsx`

---

## Summary: Files to Modify

| # | File | Change | Type |
|---|------|--------|------|
| 1 | `src/components/layout/Header.tsx` | Add `setIsMobileMenuOpen(false)` on pathname change | 1 line |
| 2 | `src/app/ar/page.tsx` | Replace English component imports with Arabic equivalents | Multiple imports |
| 3 | `src/components/sections/ServiceCategoriesArabic.tsx` | NEW: Arabic service categories | New file |
| 4 | `src/components/sections/GeoContentSectionArabic.tsx` | NEW: Arabic geo content | New file |
| 5 | `src/components/sections/AuthorityUpdatesArabic.tsx` | NEW: Arabic authority updates | New file |
| 6 | `src/components/layout/MegaMenu.tsx` | Add Arabic labels in `getServices()` | ~15 lines |
| 7 | `src/app/ar/approvals/page.tsx` | Fix badge text from English to Arabic | ~4 lines |
| 8 | `src/app/ar/approvals/[slug]/page.tsx` | Use `getArabicCategoryLabel()` | 1 line |
| 9 | `src/app/ar/services/[slug]/page.tsx` | Review `authorityAbbr`/`typicalTimeline` usage | ~2 lines |

---

## Files NOT Modified (Confirmed Clean)

The following Arabic pages/templates were audited and found to correctly use Arabic data + `/ar/` paths:

- ✅ `src/app/ar/layout.tsx` — Arabic metadata, RTL, schema
- ✅ `src/app/ar/about-us/page.tsx` — (uses CTASectionArabic)
- ✅ `src/app/ar/contact-us/page.tsx` — (uses CTASectionArabic)
- ✅ `src/app/ar/not-found.tsx` — Arabic text
- ✅ `src/app/ar/guides/[slug]/page.tsx` — Correctly uses `gAr.ar.*` and `/ar/` paths
- ✅ `src/app/ar/guides/page.tsx` — Correctly uses `arEntry?.ar?.*` and `/ar/` paths
- ✅ `src/app/ar/services/page.tsx` — Correctly uses `arEntry?.ar?.*` and `/ar/` paths
- ✅ `src/components/layout/Footer.tsx` — Already has Arabic translations for all sections
- ✅ `src/components/layout/LanguageSwitcher.tsx` — No English text displayed (just "EN"/"AR" labels)
- ✅ `src/components/sections/CTASectionArabic.tsx` — Already Arabic-only component
- ✅ `src/lib/constants.ts` — Full Arabic UI constants available

---

## Implementation Order

1. **Fix Issue 1** (Header.tsx — 1 line) — Highest priority: mobile menu bug
2. **Fix Issue 2** (Arabic homepage) — Create Arabic versions of 3 components + inline 2 sections
3. **Fix Issue 3** (MegaMenu.tsx) — Arabic service labels in mega menu
4. **Fix Issue 4** (Approvals hub page) — Arabic badges
5. **Fix Issue 5** (Approval detail page) — Arabic category label in schema
6. **Fix Issue 6** (Services detail page) — Arabic related approvals data
7. **Build & verify** — `npm run build` with 0 errors
8. **Git commit & push** — Deploy to Vercel for verification
