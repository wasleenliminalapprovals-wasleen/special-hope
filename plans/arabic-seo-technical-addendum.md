# ADDENDUM v2 — Technical Architecture Fixes for Bilingual Build
**Supersedes/extends:** `arabic-seo-master-implementation.md` §1, §2, §3, §6, §9, §11
**Context:** Next.js App Router codebase. Content lives in TypeScript data files (`src/data/approvals.ts`, `src/data/guides.ts`, `src/data/services.ts`), not markdown. Components: `Header.tsx`, `Footer.tsx`, `MobileNav.tsx`, `layout.tsx`.

Feed this alongside the master file. Where they conflict, this addendum is correct — it reflects the real codebase.

---

## A. i18n Route Architecture (fixes Gap #1)

Use Next.js **route groups**, not a literal `/ar/` folder mixed into existing routes:

```
src/app/
  (site)/
    layout.tsx              # shared shell, reads locale from segment
    [locale]/
      page.tsx              # home — matches both / and /ar/ via locale param
      approvals/
        [slug]/page.tsx
      guides/
        [slug]/page.tsx
      services/
        [slug]/page.tsx
```

Recommended: a single `[locale]` dynamic segment (`en` | `ar`) at the root, rather than route groups `(en)`/`(ar)`, because route groups don't appear in the URL — you need `ar` literally in the path (`/ar/dewa-approvals`), which route groups don't give you. Use:

```
src/app/
  [locale]/
    layout.tsx
    page.tsx
    approvals/[slug]/page.tsx
    guides/[slug]/page.tsx
    services/[slug]/page.tsx
```

- `middleware.ts` rewrites bare `/` → `/en` internally (English stays visually root — see Section B) while `/ar/...` maps directly to `[locale]=ar`.
- `generateStaticParams` at the `[locale]` layout level returns `[{locale:'en'}, {locale:'ar'}]`, and each leaf route's `generateStaticParams` returns the cross product of locale × slug (Section D).
- **Do not** let English and Arabic diverge into separate folder trees with duplicated route logic — one route tree parameterized by `locale` is what keeps 100+ pages maintainable and prevents the two versions drifting out of sync on future features.

---

## B. Middleware Strategy (fixes Gap #2)

`middleware.ts` responsibilities, in order:

1. **URL normalization**: `/ar` (no trailing slash) → 308 redirect → `/ar/`. Enforce trailing-slash consistency via `next.config.ts` (`trailingSlash: true` scoped to the `/ar` prefix, or handled explicitly in middleware if you need mixed behavior).
2. **No auto-redirect based on browser Accept-Language on first visit.** This is a deliberate SEO decision: geo/language auto-redirects at the root can cause Googlebot (which crawls with English-locale headers from US IPs) to never discover `/ar/` content, and can trigger Google's own guidance against locale-based cloaking-adjacent redirects. Instead: default `/` serves English, `/ar/` serves Arabic, and you offer a visible switcher (Section E) — never force-redirect.
3. **Locale persistence**: once a user manually picks a language via the switcher, set a `NEXT_LOCALE` cookie so return visits to `/` optionally show a *dismissible* banner ("View in Arabic?") rather than a redirect — banner, not redirect, preserves crawlability.
4. **404 handling per locale**: unmatched `/ar/*` paths should fall through to an Arabic-language 404 page, not the English one — mixing languages on the error page is a small but real UX/trust break.

```ts
// middleware.ts (core logic sketch)
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === '/ar') {
    return NextResponse.redirect(new URL('/ar/', req.url), 308);
  }
  return NextResponse.next();
}
export const config = { matcher: ['/ar', '/ar/:path*'] };
```

---

## C. Bilingual Content/Data Model (fixes Gap #3 & #4 — the critical path)

Since content lives in typed arrays, not files, restructure each data source to carry both locales **in one record**, not two parallel arrays (parallel arrays drift out of sync; a single record with locale fields cannot silently lose its Arabic counterpart).

### Before (current, English-only):
```ts
interface ApprovalData {
  slug: string;
  title: string;
  description: string;
  steps: string[];
  faqs: { question: string; answer: string }[];
}
```

### After (bilingual):
```ts
interface LocalizedField {
  en: string;
  ar: string;
}

interface ApprovalData {
  slug: LocalizedField;          // en: "dewa-approvals", ar: "موافقات-ديوا"
  title: LocalizedField;
  description: LocalizedField;
  steps: LocalizedField[];
  faqs: { question: LocalizedField; answer: LocalizedField }[];
  lastUpdated: string;            // ISO date, shared — feeds dateModified schema
}
```

### Migration path for Roo Code:
1. Write a one-time codemod script that reads the existing `approvals.ts`/`guides.ts`/`services.ts` arrays, wraps every translatable string field in `{ en: <existing value>, ar: "" }`, and writes the updated TS files back — preserving all existing English data untouched.
2. Run the DeepSeek localization script (from master file §2) **against these TS files directly** — not against markdown — reading each `en` field, generating the `ar` value, and writing it back into the same object's `ar` field. This replaces the "`/content/en/` → `/content/ar/`" file-folder assumption in the original master file, which does not match this codebase.
3. `slug.ar` must be generated and stored explicitly (don't derive it at render time) — it's both a route param and an SEO asset (Arabic-script slug, per master file §1) and needs manual review, not silent auto-generation.
4. Every render call becomes `data.title[locale]` instead of `data.title` — this is a mechanical but repo-wide change across every component consuming these data files. Budget this as its own task, done before any Arabic route goes live, not in parallel.

---

## D. `generateStaticParams` for Arabic Routes (fixes Gap #9)

```ts
// src/app/[locale]/approvals/[slug]/page.tsx
export async function generateStaticParams() {
  return approvals.flatMap((a) => [
    { locale: 'en', slug: a.slug.en },
    { locale: 'ar', slug: a.slug.ar },
  ]);
}
```
Repeat identically for `guides/[slug]` and `services/[slug]`. This must be updated at the same time as Section C's data model change — they're the same task, not sequential ones.

---

## E. Language Switcher Component (fixes Gap #6)

- Lives in `Header.tsx` (visible, top-level — not buried in footer) and duplicated in `MobileNav.tsx` for mobile.
- Behavior: toggles between the **current page's EN/AR counterpart**, not always the homepage — i.e., on `/dewa-approvals` the switcher links to `/ar/dewa-approvals` (using `slug.ar` from Section C), not `/ar/`.
- Implementation: a simple `<Link>` using `usePathname()` + the current record's locale-paired slug, wrapped in a small client component. No heavy i18n library needed for a two-locale switch.
- Accessibility: `hreflang` attribute on the switcher link itself, and `aria-label` in the *target* language ("عرض بالعربية" / "View in English").

---

## F. Header/Footer/Nav Localization (fixes Gap #7)

- `NAV_ITEMS` (and equivalent footer/mobile-nav constants) must become `LocalizedField`-shaped objects (Section C pattern), not hardcoded strings — same fix, applied to UI chrome instead of content data.
- Create a small `src/data/i18n/ui-strings.ts` file for all chrome/UI copy (nav labels, buttons, form placeholders, "Read more", footer legal text) — this is separate from the content data files, since it's static UI copy, not per-page content, and should be human-reviewed once rather than run through the batch DeepSeek pipeline.

---

## G. CSS Physical→Logical Audit Scope (fixes Gap #8)

Explicit scope for Roo Code — audit and convert every occurrence in:
- `globals.css`
- `Header.tsx` (confirmed issue: `left-0 right-0` → `inset-inline-0`)
- `Footer.tsx`, `MobileNav.tsx`
- Any component using Tailwind directional utilities: `ml-*`, `mr-*`, `pl-*`, `pr-*`, `text-left`, `text-right`, `left-*`, `right-*`, `border-l-*`, `border-r-*`, `float-left/right`

Tailwind-specific fix: Tailwind v3.3+ ships logical-property utilities natively — replace `ml-4` with `ms-4` (margin-inline-start), `mr-4` with `me-4`, `text-left` with `text-start`, `text-right` with `text-end`, `left-0`/`right-0` with `start-0`/`end-0`. Run a repo-wide grep for the physical-property class list above and convert systematically; do not rely on manual spot-fixes — grep count should hit zero before Arabic launch.

---

## H. Arabic Font Strategy (fixes Gap #5)

- Use `next/font/google` with an Arabic-capable variable font — **IBM Plex Sans Arabic** or **Noto Sans Arabic** are the standard, well-hinted choices for UAE business content (Noto Sans Arabic has broader glyph coverage; IBM Plex Sans Arabic pairs more naturally with common Latin sans-serifs if you want visual consistency between EN/AR).
- Subset to `arabic` + `latin` only via the `subsets` option — do not load the full glyph set.
- `next/font` self-hosts and inlines `font-display: swap` automatically, which handles the CLS risk Roo Code flagged — the missing piece was simply naming the font and wiring the config, not a deeper architectural gap.

```ts
import { Noto_Sans_Arabic } from 'next/font/google';
const notoArabic = Noto_Sans_Arabic({ subsets: ['arabic'], display: 'swap', variable: '--font-arabic' });
```
Apply `notoArabic.variable` on the `<html>` element only when `locale === 'ar'`, alongside your existing Latin font variable — swap the CSS `font-family` reference at the root based on locale, not per-component.

---

## I. Sitemap & Robots (fixes Gap #10 & #11)

`src/app/sitemap.ts` (Next.js native sitemap route) rebuilt to emit both locales with reciprocal alternates:

```ts
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const a of approvals) {
    entries.push({
      url: `https://www.dubaiapprovalconsultants.com/${a.slug.en}`,
      lastModified: a.lastUpdated,
      alternates: { languages: {
        en: `https://www.dubaiapprovalconsultants.com/${a.slug.en}`,
        ar: `https://www.dubaiapprovalconsultants.com/ar/${a.slug.ar}`,
      }}
    });
    entries.push({
      url: `https://www.dubaiapprovalconsultants.com/ar/${a.slug.ar}`,
      lastModified: a.lastUpdated,
      alternates: { languages: {
        en: `https://www.dubaiapprovalconsultants.com/${a.slug.en}`,
        ar: `https://www.dubaiapprovalconsultants.com/ar/${a.slug.ar}`,
      }}
    });
  }
  return entries;
}
```
Next.js's native `alternates.languages` field in the sitemap API generates correct `xhtml:link` hreflang entries automatically — no need to hand-build two separate XML files as the original master file suggested; that was written for a non-Next.js-native context. Use this single dynamic `sitemap.ts` instead.

`src/app/robots.ts` — confirm it points at the single dynamically generated sitemap:
```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.dubaiapprovalconsultants.com/sitemap.xml',
  };
}
```

---

## J. Locale-Aware Schema & Metadata (fixes Gap #12 & #13)

`organizationSchema()` → parameterize by locale:
```ts
function organizationSchema(locale: 'en' | 'ar') {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": locale === 'ar' ? "دبي أبروفال كونسلتنتس" : "Dubai Approval Consultants",
    "availableLanguage": ["en", "ar"],
    // ...rest of fields sourced from LocalizedField data, per locale
  };
}
```
Call with the active `locale` at render time in each page's JSON-LD injection — never render the English schema object on Arabic pages.

`layout.tsx` — `openGraph.locale` must switch with the route:
```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = params;
  return {
    openGraph: { locale: locale === 'ar' ? 'ar_AE' : 'en_AE' },
    alternates: {
      canonical: `.../${locale === 'ar' ? 'ar/' : ''}${slug}`,
      languages: { 'en-AE': enUrl, 'ar-AE': arUrl, 'x-default': enUrl },
    },
  };
}
```
This also gives you the hreflang tags from master file §3.1 "for free" via Next.js's native `alternates.languages` metadata API, instead of hand-rolled `<link>` components — cleaner and less error-prone at 100+ pages.

---

## K. `next.config.ts` (fixes Gap #16)

- No `i18n` block needed (that's the Pages Router API; App Router uses the `[locale]` segment approach above instead — do not mix the two).
- Confirm `trailingSlash` behavior is consistent with Section B's normalization rule.
- If images or fonts are served from a CDN, confirm `images.domains`/`remotePatterns` aren't scoped in a way that accidentally excludes Arabic-page asset paths (rare, but worth a one-line check given the new route segment).

---

## L. Revised Build Sequence (fixes Gap #18 — replaces master file §11)

**Phase 0 — Foundation (must complete before any Arabic page exists):**
1. Data model migration (Section C): add `LocalizedField` shape, codemod existing data files.
2. `[locale]` route segment restructure (Section A) + `middleware.ts` (Section B).
3. UI chrome localization file + Header/Footer/Nav refactor to consume it (Sections E, F).
4. Arabic font wiring (Section H).
5. CSS logical-properties audit and conversion (Section G).

**Phase 1 — Content pipeline:**
6. DeepSeek batch script targeting the TS data files directly (Section C.2), with staged review before writing `ar` fields.
7. Arabic keyword-to-page mapping (master file §4) — do this in parallel with Phase 0, not after; it should inform the `ar` slugs and titles generated in this phase.

**Phase 2 — Technical SEO wiring:**
8. `generateStaticParams` update across all dynamic routes (Section D).
9. `sitemap.ts` / `robots.ts` rebuild (Section I).
10. Locale-aware schema + `generateMetadata` hreflang/OG (Section J).

**Phase 3 — QA & launch:**
11. Full grep pass confirming zero remaining physical CSS properties.
12. Lighthouse on EN + AR for every page *type* (home, approval detail, guide, service) — not just one sample page.
13. Manual click-through of the language switcher on every page type, both directions.
14. Submit sitemap to GSC, monitor indexation split (master file §12).
15. Begin monthly GEO citation audit (master file §7.6).

---

**End of addendum.** This resolves Gaps #1–13, #16, #18. Gaps #14, #15, #17 (GBP copy specifics, Arabic social presence, keyword-tool selection) are content/marketing-ops tasks, not code — track those separately in your content workflow, not in Roo Code's build backlog.
