/**
 * Blog search — Phase 4 (plan §6, DNA §4). Route: `/blog/search`.
 *
 * Server component (no client JS — the single scroll-reveal observer is an
 * inline IIFE, matching the index page pattern).
 *
 * - Empty `?q=` → server redirect to `/blog` (plan §6.1).
 * - Full-text search over title/lead/description/tags/body via
 *   `searchPosts()` (src/lib/blog.ts); the query is preserved in the input.
 * - SEO: `noindex,follow` utility page (prevents duplicate results URLs) +
 *   `WebPage` + `BreadcrumbList` (plan §6.2).
 * - Layout (plan §6.3):
 *   - `.search-hero` — heading shows the query + result count.
 *   - `.search-form` — signature dual-layer gradient focus border (reuses the
 *     `.blog-dual-border` primitive; same signature as newsletter/sidebar).
 *   - `.results-grid` — 1px-gap auto-fill grid (`repeat(auto-fill,
 *     minmax(min(340px,100%),1fr))`, `background:var(--border)`).
 *   - `.result-card` — title, context snippet with `<mark>` highlighting
 *     (React-rendered, no `dangerouslySetInnerHTML`), category tag, meta;
 *     hover `translateY(-2px)` + glow + `z-index:2`.
 *   - `.no-results` — empty state + 7 gradient pills `--wg-01..07`
 *     (`gradientShift` 4s, 200% bg-size, white text) each linking to a
 *     category / the hub / contact.
 *
 * @see plans/blog-pre-build-plan.md §6 (search page)
 * @see src/lib/blog.ts (searchPosts / getPostSearchText)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import {
  formatBlogDate,
  getActiveBlogCategories,
  getCategoryName,
  readTimeLabel,
  searchPosts,
} from "@/lib/blog";
import { breadcrumbList, webPageSchema } from "@/lib/schema";

const PAGE_TITLE = "Blog Search";
const PAGE_DESCRIPTION =
  "Search the Wasleen Approvals blog for Dubai Municipality, DCD, DDA, DEWA and free-zone approval guides, timelines, fees and documents.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  robots: { index: false, follow: true },
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

/** Render a snippet with `<mark>` on every matched token (no innerHTML). */
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

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params?.q === "string" ? params.q.trim() : "";

  /* Empty query → the search page is meaningless; send users to the hub. */
  if (!query) redirect("/blog");

  const results = searchPosts(query);
  const total = results.length;
  const activeCategories = getActiveBlogCategories();

  /** 7 gradient pills — 5 active categories + browse-all + contact. */
  const pills = [
    ...activeCategories.map((c) => ({
      label: c.name.split(":")[0].trim() || c.name,
      href: `/blog?category=${c.slug}`,
    })),
    { label: "Browse all articles", href: "/blog" },
    { label: "Talk to an approval consultant", href: "/contact-us" },
  ].slice(0, 7);

  const schemas = [
    webPageSchema({
      url: "/blog/search",
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      dateModified: "2026-08-13",
    }),
    breadcrumbList([
      { position: 1, name: "Home", slug: "/" },
      { position: 2, name: "Blog", slug: "/blog" },
      { position: 3, name: "Search", slug: "/blog/search" },
    ]),
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
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: "Search", href: "/blog/search" },
          ]}
        />
      </div>

      <section className="search-page blog-container" aria-label="Blog search results">
        <div className="search-hero fade-in">
          <span className="blog-eyebrow">Blog search</span>
          <h1 className="search-hero-title">
            Results for <em>“{query}”</em>
          </h1>
          <p className="search-count">
            {total === 0 ? (
              "No posts found"
            ) : (
              <>
                <strong>{total}</strong> {total === 1 ? "article" : "articles"} match
              </>
            )}
          </p>

          <form
            className="search-form blog-dual-border"
            action="/blog/search"
            method="get"
            role="search"
          >
            <label htmlFor="search-query" className="sr-only">
              Search Dubai approval guides
            </label>
            <input
              id="search-query"
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search Dubai approvals…"
              autoComplete="off"
            />
            <button type="submit" className="btn-scta" aria-label="Search the blog">
              Search
            </button>
          </form>
        </div>

        {total > 0 ? (
          <div className="results-grid reveal">
            {results.map(({ post, snippet }) => (
              <article key={post.slug} className="result-card">
                <div className="result-card-meta">
                  <span className="post-cat-tag">{getCategoryName(post.categoryId)}</span>
                  <span className="result-card-date">
                    {formatBlogDate(post.lastUpdated)} · {readTimeLabel(post.readTime)}
                  </span>
                </div>
                <h2 className="result-card-title">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="result-card-excerpt">{highlightSnippet(snippet, query)}</p>
                <Link href={`/blog/${post.slug}`} className="btn-read">
                  Read article <span className="btn-arrow" aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-results reveal">
            <div className="no-results-inner">
              <h2 className="no-results-title">
                No results for <em>“{query}”</em>
              </h2>
              <p>
                Try a different term — authority names (DEWA, DCD, DDA, Dubai
                Municipality), document types, or keywords like “permit”, “NOC” or
                “fit-out”. Or jump straight to a category below.
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
