/**
 * Arabic blog search — mirrors the EN utility page (plan §6, DNA §4).
 * Route: `/ar/blog/search`.
 *
 * Server component (no client JS — the single scroll-reveal observer is an
 * inline IIFE, matching the EN search page pattern).
 *
 * - Empty `?q=` → server redirect to `/ar/blog` (plan §6.1).
 * - Full-text search over Arabic title/lead/description/tags/body via
 *   `searchArabicPosts()` (src/lib/blog-ar.ts); the query is preserved in the
 *   input.
 * - SEO: `noindex,follow` utility page + `WebPage` + `BreadcrumbList` with the
 *   `"ar"` locale (plan §6.2).
 * - All labels are Arabic; all links are `/ar`-prefixed; the `.btn-read` arrow
 *   flips to "←" for RTL. JSON-LD breadcrumbs use `AR.breadcrumb.home` +
 *   `AR.nav.blog` (byte-identical NAP/name contract with the Arabic index).
 *
 * @see src/app/blog/search/page.tsx (EN source)
 * @see plans/blog-pre-build-plan.md §6 (search page)
 * @see src/lib/blog-ar.ts (searchArabicPosts / extractArabicSnippet)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import {
  formatArabicBlogDate,
  getActiveArabicBlogCategories,
  getArabicCategoryName,
  readTimeLabelAr,
  searchArabicPosts,
} from "@/lib/blog-ar";
import { AR } from "@/lib/constants";
import { breadcrumbList, webPageSchema } from "@/lib/schema";

const PAGE_TITLE = "بحث في مدونة موافقات دبي";
const PAGE_DESCRIPTION =
  "ابحث في مدونة وسلين للموافقات عن أدلة بلدية دبي والدفاع المدني وهيئة دبي للتطوير وديوا والمناطق الحرة — الجداول والرسوم وقوائم المستندات بالعربية.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  robots: { index: false, follow: true },
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

/** Render a snippet with `<mark>` on every matched token (no innerHTML).
 *  Arabic has no case folding, so `toLowerCase()` is a no-op for Arabic text —
 *  the helper carries over verbatim from the EN page. */
function highlightSnippet(text: string, query: string): ReactNode[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  const lower = text.toLowerCase();
  const matches: { start: number; end: number }[] = [];
  for (const token of tokens) {
    if (!token) continue;
    let from = 0;
    for (;;) {
      const idx = lower.indexOf(token, from);
      if (idx === -1) break;
      matches.push({ start: idx, end: idx + token.length });
      from = idx + token.length;
    }
  }
  matches.sort((a, b) => a.start - b.start);

  /* Merge overlapping/adjacent matches so marks never nest. */
  const merged: { start: number; end: number }[] = [];
  for (const m of matches) {
    const last = merged[merged.length - 1];
    if (last && m.start <= last.end) last.end = Math.max(last.end, m.end);
    else merged.push({ start: m.start, end: m.end });
  }

  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const m of merged) {
    if (m.start > cursor) parts.push(text.slice(cursor, m.start));
    parts.push(
      <mark key={`${m.start}-${m.end}`} className="search-highlight">
        {text.slice(m.start, m.end)}
      </mark>,
    );
    cursor = m.end;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts.length ? parts : [text];
}

export default async function ArabicSearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params?.q === "string" ? params.q.trim() : "";

  /* Empty query → the search page is meaningless; send users to the hub. */
  if (!query) redirect("/ar/blog");

  const results = searchArabicPosts(query);
  const total = results.length;
  const activeCategories = getActiveArabicBlogCategories();

  /** 7 gradient pills — 5 active categories + browse-all + contact. */
  const pills = [
    ...activeCategories.map((c) => ({
      label: c.name.split(":")[0].trim() || c.name,
      href: `/ar/blog?category=${c.slug}`,
    })),
    { label: "تصفح جميع المقالات", href: "/ar/blog" },
    { label: "تحدث إلى مستشار موافقات", href: "/ar/contact-us" },
  ].slice(0, 7);

  const schemas = [
    webPageSchema(
      {
        url: "/ar/blog/search",
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        dateModified: "2026-08-13",
      },
      "ar",
    ),
    breadcrumbList(
      [
        { position: 1, name: AR.breadcrumb.home, slug: "/ar" },
        { position: 2, name: AR.nav.blog, slug: "/ar/blog" },
        { position: 3, name: "بحث", slug: "/ar/blog/search" },
      ],
      "ar",
    ),
  ];

  const searchScript = `(function () {
  "use strict";
  var targets = Array.prototype.slice.call(document.querySelectorAll(".fade-in, .reveal"));
  if (targets.length === 0) return;
  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (t) { t.classList.add("is-visible"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  targets.forEach(function (t) { io.observe(t); });
})();`;

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="blog-container">
        <BlogBreadcrumbs
          items={[
            { name: AR.breadcrumb.home, href: "/ar" },
            { name: AR.nav.blog, href: "/ar/blog" },
            { name: "بحث", href: "/ar/blog/search" },
          ]}
        />
      </div>

      <section className="search-page blog-container" aria-label="نتائج البحث في المدونة">
        <div className="search-hero fade-in">
          <span className="blog-eyebrow">بحث في المدونة</span>
          <h1 className="search-hero-title">
            نتائج عن <em>“{query}”</em>
          </h1>
          <p className="search-count">
            {total === 0 ? (
              "لا توجد مقالات"
            ) : (
              <>
                <strong>{total}</strong> {total === 1 ? "مقالة" : "مقالات"} مطابقة
              </>
            )}
          </p>

          <form
            className="search-form blog-dual-border"
            action="/ar/blog/search"
            method="get"
            role="search"
          >
            <label htmlFor="search-query" className="sr-only">
              ابحث في أدلة موافقات دبي
            </label>
            <input
              id="search-query"
              type="search"
              name="q"
              defaultValue={query}
              placeholder="ابحث عن موافقات دبي…"
              autoComplete="off"
            />
            <button type="submit" className="btn-scta" aria-label="ابحث في المدونة">
              بحث
            </button>
          </form>
        </div>

        {total > 0 ? (
          <div className="results-grid reveal">
            {results.map(({ post, snippet }) => (
              <article key={post.slug} className="result-card">
                <div className="result-card-meta">
                  <span className="post-cat-tag">
                    {getArabicCategoryName(post.categoryId)}
                  </span>
                  <span className="result-card-date">
                    {formatArabicBlogDate(post.lastUpdated)} · {readTimeLabelAr(post.readTime)}
                  </span>
                </div>
                <h2 className="result-card-title">
                  <Link href={`/ar/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="result-card-excerpt">
                  {highlightSnippet(snippet, query)}
                </p>
                <Link href={`/ar/blog/${post.slug}`} className="btn-read">
                  اقرأ المقال <span className="btn-arrow" aria-hidden="true">←</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-results reveal">
            <div className="no-results-inner">
              <h2 className="no-results-title">
                لا توجد نتائج عن <em>“{query}”</em>
              </h2>
              <p>
                جرّب كلمة مختلفة — أسماء الجهات (ديوا، الدفاع المدني، هيئة دبي
                للتطوير، بلدية دبي)، أنواع المستندات، أو كلمات مثل «تصريح» أو
                «شهادة عدم ممانعة» أو «التشطيبات». أو انتقل مباشرة إلى إحدى الفئات أدناه.
              </p>
              <div className="no-results-pills">
                {pills.map((pill, i) => (
                  <Link
                    key={`${pill.href}-${i}`}
                    href={pill.href}
                    className={`wg-pill wg-pill-${(i % 7) + 1}`}
                  >
                    {pill.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <script dangerouslySetInnerHTML={{ __html: searchScript }} />
    </>
  );
}
