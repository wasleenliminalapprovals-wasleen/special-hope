/**
 * BlogHero — ZONE 1 of the blog index (plan §5).
 *
 * Server component. 650px tall layered hero:
 *   - `.hero-mesh` (meshPulse 8s) + `.hero-grain` 0.03 + `.hero-grid-lines` 60px
 *   - `.hero-inner` grid `1fr 380px`; left = eyebrow+rule, H1 `.hero-title`,
 *     a 5-slide crossfade slideshow (1.4s opacity, JS advances every 4500ms),
 *     `.hero-dots` controls and a 4-cell `.hero-stats` strip (real data —
 *     post/category counts + average read time, no fabricated figures).
 *   - right = `.sidebar-search` (dual-border focus glow → `/blog/search?q=`)
 *     + vertical `.hero-ticker` (tickerUp 40s, hover-pause via `.blog-scroller`,
 *     duplicated list so translateY(-50%) loops seamlessly).
 *
 * Slideshow mechanics live in the single index IIFE (`page.tsx`): the first
 * `.hero-slide` carries `is-active` at SSR; JS toggles the rest and respects
 * `prefers-reduced-motion` (first slide shown, no auto-advance; manual dots
 * still work).
 *
 * @see plans/blog-pre-build-plan.md §5 (ZONE 1)
 * @see src/app/blog/blog.css §6 (hero-mesh / ticker / hero-slide consumers)
 */

import Image from "next/image";
import Link from "next/link";
import {
  formatBlogDate,
  getActiveBlogCategories,
  getCategoryName,
  getHeroSlides,
  getPostHeroImage,
  getVisiblePosts,
  readTimeLabel,
} from "@/lib/blog";

export default function BlogHero() {
  const slides = getHeroSlides();
  const posts = getVisiblePosts();
  const categories = getActiveBlogCategories();

  if (slides.length === 0) return null;

  const avgRead = Math.round(
    posts.reduce((sum, p) => sum + p.readTime, 0) / Math.max(posts.length, 1),
  );

  /** Real, computable index-level stats — never fabricated. */
  const stats = [
    { value: String(posts.length), label: "in-depth posts & guides" },
    { value: String(categories.length), label: "active authority categories" },
    { value: `${avgRead} min`, label: "average read time" },
    { value: "100%", label: "Dubai approvals focus" },
  ];

  const renderTickerItem = (post: (typeof posts)[number], keySuffix: string) => (
    <Link key={`${post.slug}-${keySuffix}`} href={`/blog/${post.slug}`} className="ticker-item">
      <span className="ticker-item-dot" aria-hidden="true" />
      {post.title}
    </Link>
  );

  return (
    <section className="blog-hero" aria-labelledby="blog-hero-title">
      <div className="hero-mesh" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-grid-lines" aria-hidden="true" />

      <div className="blog-container">
        <div className="hero-inner">
          {/* ── Left: eyebrow + title + slideshow + stats ── */}
          <div className="hero-left">
            <p className="blog-eyebrow">Dubai approval updates</p>
            <h1 id="blog-hero-title" className="hero-title">
              Dubai Approvals Blog & Authority Updates
            </h1>

            <div className="hero-slideshow" data-hero-slideshow>
              {slides.map((slide, i) => {
                const heroImg = getPostHeroImage(slide);
                return (
                  <article
                    key={slide.slug}
                    className={`hero-slide${i === 0 ? " is-active" : ""}`}
                    data-hero-slide={i}
                    aria-hidden={i === 0 ? "false" : "true"}
                  >
                    {heroImg ? (
                      <Image
                        src={heroImg.src}
                        alt={heroImg.alt}
                        width={heroImg.width}
                        height={heroImg.height}
                        className="hero-slide-bg"
                        priority={i === 0}
                        sizes="(max-width: 992px) 100vw, 760px"
                      />
                    ) : (
                      <div className="hero-slide-bg hero-slide-fallback" aria-hidden="true">
                        <span role="img" aria-label={slide.title}>
                          🏗️
                        </span>
                      </div>
                    )}
                    <div className="hero-slide-overlay" aria-hidden="true" />
                    <div className="hero-slide-content">
                      <span className="post-cat-tag">{getCategoryName(slide.categoryId)}</span>
                      <h2 className="hero-slide-title">
                        <Link href={`/blog/${slide.slug}`}>{slide.title}</Link>
                      </h2>
                      <p className="hero-slide-meta">
                        <span>{formatBlogDate(slide.publishedAt)}</span>
                        <span aria-hidden="true">·</span>
                        <span>{readTimeLabel(slide.readTime)}</span>
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="hero-dots" data-hero-dots role="group" aria-label="Slideshow controls">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`hero-dot${i === 0 ? " is-active" : ""}`}
                  data-hero-dot={i}
                  aria-label={`Show slide ${i + 1}`}
                  aria-selected={i === 0 ? "true" : "false"}
                />
              ))}
            </div>

            <dl className="hero-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <dt className="hero-stat-value">{stat.value}</dt>
                  <dd className="hero-stat-label">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Right: search + vertical ticker ── */}
          <aside className="hero-right">
            <div className="sidebar-search blog-dual-border">
              <h2 className="sidebar-search-title">Search the blog</h2>
              <form
                className="sidebar-search-form"
                action="/blog/search"
                method="get"
                role="search"
              >
                <label htmlFor="blog-search" className="sr-only">
                  Search Dubai approval guides
                </label>
                <input
                  id="blog-search"
                  name="q"
                  type="search"
                  placeholder="Search Dubai approvals…"
                  autoComplete="off"
                />
                <button type="submit" className="btn-scta" aria-label="Search the blog">
                  Search
                </button>
              </form>
              <p className="sidebar-search-hint">
                Try “DEWA NOC”, “fit-out permit”, “Law 3 of 2026”
              </p>
            </div>

            <div className="hero-ticker">
              <h2 className="ticker-heading">
                <span className="ticker-dot" aria-hidden="true" />
                Latest updates
              </h2>
              <div className="blog-scroller">
                <div className="ticker-track">
                  {posts.map((post) => renderTickerItem(post, "a"))}
                  <span className="ticker-seam" aria-hidden="true" />
                  {posts.map((post) => renderTickerItem(post, "b"))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
