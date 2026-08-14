/**
 * BlogHeroArabic — Arabic variant of ZONE 1 (plan §5, C-AR §9).
 *
 * Mirrors `BlogHero.tsx` markup byte-for-byte so the shared index IIFE
 * (slideshow auto-advance, dots, reduced-motion) in `ar/blog/page.tsx`
 * drives it with zero changes. Only the strings, helpers and `/ar/blog`
 * links differ:
 *   - Arabic UI strings (inline translations, `AR` constants where available)
 *   - AR helpers (`getHeroArabicSlides`, `getVisibleArabicPosts`,
 *     `getActiveArabicBlogCategories`, `getArabicCategoryName`,
 *     `formatArabicBlogDate`, `readTimeLabelAr`)
 *   - search action `/ar/blog/search`, links `/ar/blog/{slug}`
 *
 * The RTL canvas comes from the parent `ar/layout.tsx` (`dir="rtl"`).
 *
 * @see src/components/blog/BlogHero.tsx (EN source)
 * @see plans/blog-pre-build-plan.md §5 (ZONE 1)
 */

import Image from "next/image";
import Link from "next/link";
import {
  formatArabicBlogDate,
  getActiveArabicBlogCategories,
  getArabicCategoryName,
  getHeroArabicSlides,
  getPostHeroImage,
  getVisibleArabicPosts,
  readTimeLabelAr,
} from "@/lib/blog-ar";

export default function BlogHeroArabic() {
  const slides = getHeroArabicSlides();
  const posts = getVisibleArabicPosts();
  const categories = getActiveArabicBlogCategories();

  if (slides.length === 0) return null;

  const avgRead = Math.round(
    posts.reduce((sum, p) => sum + p.readTime, 0) / Math.max(posts.length, 1),
  );

  /** Real, computable index-level stats — never fabricated. */
  const stats = [
    { value: String(posts.length), label: "مقالات وأدلة متعمقة" },
    { value: String(categories.length), label: "فئات جهات نشطة" },
    { value: `${avgRead} دقيقة`, label: "متوسط وقت القراءة" },
    { value: "100%", label: "التركيز على موافقات دبي" },
  ];

  const renderTickerItem = (post: (typeof posts)[number], keySuffix: string) => (
    <Link key={`${post.slug}-${keySuffix}`} href={`/ar/blog/${post.slug}`} className="ticker-item">
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
          {/* ── اليسار: العنوان + العرض المتحرك + الإحصائيات ── */}
          <div className="hero-left">
            <p className="blog-eyebrow">تحديثات موافقات دبي</p>
            <h1 id="blog-hero-title" className="hero-title">
              مدونة موافقات دبي وتحديثات الجهات
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
                      <span className="post-cat-tag">
                        {getArabicCategoryName(slide.categoryId)}
                      </span>
                      <h2 className="hero-slide-title">
                        <Link href={`/ar/blog/${slide.slug}`}>{slide.title}</Link>
                      </h2>
                      <p className="hero-slide-meta">
                        <span>{formatArabicBlogDate(slide.publishedAt)}</span>
                        <span aria-hidden="true">·</span>
                        <span>{readTimeLabelAr(slide.readTime)}</span>
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="hero-dots" data-hero-dots role="group" aria-label="عناصر التحكم في العرض">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`hero-dot${i === 0 ? " is-active" : ""}`}
                  data-hero-dot={i}
                  aria-label={`عرض الشريحة ${i + 1}`}
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

          {/* ── اليمين: البحث + الشريط العمودي ── */}
          <aside className="hero-right">
            <div className="sidebar-search blog-dual-border">
              <h2 className="sidebar-search-title">ابحث في المدونة</h2>
              <form
                className="sidebar-search-form"
                action="/ar/blog/search"
                method="get"
                role="search"
              >
                <label htmlFor="blog-search" className="sr-only">
                  ابحث عن أدلة موافقات دبي
                </label>
                <input
                  id="blog-search"
                  name="q"
                  type="search"
                  placeholder="ابحث عن موافقات دبي…"
                  autoComplete="off"
                />
                <button type="submit" className="btn-scta" aria-label="ابحث في المدونة">
                  بحث
                </button>
              </form>
              <p className="sidebar-search-hint">
                جرّب: “شهادة الدفاع المدني”، “تصريح تشطيب”، “قانون رقم 3 لسنة 2026”
              </p>
            </div>

            <div className="hero-ticker">
              <h2 className="ticker-heading">
                <span className="ticker-dot" aria-hidden="true" />
                أحدث التحديثات
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
