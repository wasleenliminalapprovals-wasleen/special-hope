import { notFound } from "next/navigation";

/**
 * Arabic catch-all route.
 *
 * Every unmatched /ar/... URL (e.g. /ar/this-page-does-not-exist) matches this
 * segment catch-all and calls notFound(), which renders src/app/ar/not-found.tsx
 * inside src/app/ar/layout.tsx — the Arabic 404 with Arabic header/footer and
 * dir="rtl", returning a true HTTP 404.
 *
 * This also fixes the language-toggle hydration crash: /ar/... URLs now always
 * resolve inside the "ar" segment, so the root layout's RootLayoutClient never
 * has to make a server-vs-client pathname decision for them (no React #418).
 *
 * Route precedence (all win over this catch-all):
 *   - static pages: /ar/about-us, /ar/contact-us, /ar/free-quote, /ar/license,
 *     /ar/privacy-policy
 *   - dynamic pages: /ar/approvals/[slug], /ar/blog/[slug], /ar/guides/[slug],
 *     /ar/services/[slug]
 *   - route handlers: /ar/llms.txt, /ar/llms-full.txt
 *   - home: /ar alone (a non-optional catch-all requires >= 1 segment)
 */
export default function ArabicCatchAllPage() {
  notFound();
}
