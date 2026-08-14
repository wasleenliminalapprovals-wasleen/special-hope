/**
 * Arabic blog article page — mirrors the EN 13-section layout (plan §7,
 * C-AR §7) + article @graph schema, fully in Arabic.
 *
 * Same architecture as `src/app/blog/[slug]/page.tsx`: server-rendered, no
 * client components. Content comes from the Arabic merge layer
 * (`@/lib/blog-ar`) — native-Arabic rewrites joined to the EN structural
 * fields. `ArticleBody` renders the Arabic body using the Unicode-aware
 * `postHeadingId` (Arabic headings now produce valid, non-empty anchors for
 * the TOC + scroll-spy) with an Arabic FAQ heading. The sticky rail is
 * `ArticleSidebarArabic`. JSON-LD uses the `"ar"` locale and hreflang
 * alternates point at the EN twin (`/blog/{slug}`).
 *
 * Sections (mirror of EN): 5.1 progress bar · 5.2 post hero · 5.3 hero
 * image · 5.4 stats strip (guarded — Arabic merge drops `stats`) · 5.5
 * content grid · 5.6 ArticleBody · 5.7 tags + share · 5.8 author bio ·
 * 5.9 ArticleSidebarArabic · 5.10 prev/next · 5.11 all categories · 5.12
 * newsletter · 5.13 inline IIFE.
 *
 * @see src/app/blog/[slug]/page.tsx (EN source)
 * @see plans/blog-pre-build-plan.md §7 / §8.1 / §9 (C-AR)
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock,
  Facebook,
  Linkedin,
  Link2,
  MessageCircle,
  Twitter,
} from "lucide-react";
import type { BlogSection } from "@/types";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import ArticleBody, { postHeadingId } from "@/components/blog/ArticleBody";
import ArticleSidebarArabic from "@/components/blog/ar/ArticleSidebarArabic";
import { type TocHeading } from "@/components/blog/ArticleSidebar";
import { NL_MESSAGE_AR } from "@/components/blog/ar/NewsletterSectionArabic";
import { AUTHOR_REGISTRY } from "@/data/authors";
import { getBlogCategory } from "@/lib/blog";
import {
  formatArabicBlogDate,
  getActiveArabicBlogCategories,
  getAdjacentArabicPosts,
  getArabicCategoryName,
  getPostHeroImage,
  getVisibleArabicPosts,
  readTimeLabelAr,
  relatedArabicPosts,
  resolveArabicPost,
} from "@/lib/blog-ar";
import { blogArticleSchemaStack } from "@/lib/blog-schema";
import { AR, NAP, SITE } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";

const BASE = SITE.url.replace(/\/+$/, "");

/** wa.me links use digits only — strip the "+" prefix from NAP.whatsapp. */
const WA_DIGITS = NAP.whatsapp.replace(/\D/g, "");

export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleArabicPosts().map((post) => ({ slug: post.slug }));
}

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = resolveArabicPost(slug);
  if (!post) return {};
  const url = `/ar/blog/${post.slug}`;
  const author = AUTHOR_REGISTRY[post.authorId];
  return {
    title: post.seoTitle,
    description: post.description,
    alternates: {
      canonical: url,
      languages: hreflangAlternates(SITE.url, url),
    },
    openGraph: {
      title: post.seoTitle,
      description: post.description,
      url: `${BASE}${url}`,
      type: "article",
      locale: "ar_AE",
      siteName: AR.siteName,
      images: [
        {
          url: `${BASE}/logos/og-image-blog-authority-updates.jpg`,
          width: 1200,
          height: 630,
          alt: "مدونة موافقات دبي وتحديثات الجهات — وسلين ليمينال لاستشارات الموافقات",
        },
      ],
      publishedTime: post.publishedAt,
      modifiedTime: post.lastUpdated,
      authors: [author.arabicName],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.description,
      images: [`${BASE}/logos/og-image-blog-authority-updates.jpg`],
    },
  };
}

export default async function ArabicBlogArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = resolveArabicPost(slug);
  if (!post) notFound();

  const category = getBlogCategory(post.categoryId);
  const author = AUTHOR_REGISTRY[post.authorId];
  const reviewer = post.reviewerId ? AUTHOR_REGISTRY[post.reviewerId] : undefined;
  const hero = getPostHeroImage(post);
  const related = relatedArabicPosts(post, 3);
  const activeCategories = getActiveArabicBlogCategories();
  const { prev: prevPost, next: nextPost } = getAdjacentArabicPosts(post);
  const url = `/ar/blog/${post.slug}`;
  const canonical = `${BASE}${url}`;

  const headings: TocHeading[] = post.body
    .filter((b): b is Extract<BlogSection, { type: "heading" }> => b.type === "heading")
    .map((b) => ({ id: postHeadingId(b.text), text: b.text, level: b.level }));

  const breadcrumbs = [
    { name: AR.breadcrumb.home, href: "/ar" },
    { name: AR.nav.blog, href: "/ar/blog" },
    ...(category
      ? [
          {
            name: getArabicCategoryName(post.categoryId),
            href: `/ar/blog?category=${category.slug}`,
          },
        ]
      : []),
    { name: post.title, href: url },
  ];

  const schemaBreadcrumbs = [
    { position: 1, name: AR.breadcrumb.home, slug: "/ar" },
    { position: 2, name: AR.nav.blog, slug: "/ar/blog" },
    ...(category
      ? [
          {
            position: 3,
            name: getArabicCategoryName(post.categoryId),
            slug: `/ar/blog?category=${category.slug}`,
          },
        ]
      : []),
    { position: category ? 4 : 3, name: post.title, slug: url },
  ];

  const schemas = blogArticleSchemaStack(
    {
      url,
      title: post.title,
      description: post.description,
      post,
      breadcrumbs: schemaBreadcrumbs,
    },
    "ar",
  );

  const encodedUrl = encodeURIComponent(canonical);
  const encodedTitle = encodeURIComponent(post.title);
  const shares = [
    {
      label: "مشاركة على لينكد إن",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: Linkedin,
    },
    {
      label: "مشاركة على إكس (تويتر)",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: Twitter,
    },
    {
      label: "مشاركة عبر واتساب",
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      Icon: MessageCircle,
    },
    {
      label: "مشاركة على فيسبوك",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: Facebook,
    },
  ];

  /* §5.13 — single inline IIFE: progress, TOC scroll-spy, share/copy,
     WhatsApp newsletter, scroll reveals. Mirrors the EN article IIFE with
     Arabic copy feedback and the Arabic newsletter message. */
  const articleScript = `(function () {
  "use strict";

  /* 5.13.1 — reading progress bar */
  var bar = document.getElementById("blog-progress-bar");
  function updateProgress() {
    if (!bar) return;
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var pct = max > 0 ? ((doc.scrollTop || document.body.scrollTop) / max) * 100 : 0;
    bar.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  /* 5.13.2 — TOC scroll-spy (section top <= 120px) */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc-link"));
  var tocTargets = tocLinks.map(function (link) {
    return document.getElementById(link.getAttribute("href").slice(1));
  });
  function updateTOC() {
    var current = -1;
    tocTargets.forEach(function (t, i) {
      if (t && t.getBoundingClientRect().top <= 120) current = i;
    });
    tocLinks.forEach(function (link, i) {
      link.classList.toggle("is-active", i === current);
    });
  }
  if (tocLinks.length > 0) {
    window.addEventListener("scroll", updateTOC, { passive: true });
    window.addEventListener("resize", updateTOC);
    updateTOC();
  }

  /* 5.13.3 — share popups (600x400) + copy-link feedback (2000ms) */
  Array.prototype.slice.call(document.querySelectorAll("[data-share-url]")).forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.open(btn.getAttribute("data-share-url"), "share", "width=600,height=400");
    });
  });
  var copyBtn = document.querySelector("[data-copy-link]");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var url = copyBtn.getAttribute("data-copy-link");
      if (!url) return;
      var done = function () {
        var original = copyBtn.innerHTML;
        copyBtn.innerHTML = "✓ تم النسخ!";
        setTimeout(function () { copyBtn.innerHTML = original; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(function () {});
      } else {
        done();
      }
    });
  }

  /* 5.13.4 — WhatsApp newsletter form (mirrors the Arabic index ZONE 9) */
  var waForm = document.querySelector("[data-wa-form]");
  if (waForm) {
    waForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = waForm.querySelector("[data-wa-input]");
      var name = input ? input.value.trim() : "";
      var message = ${JSON.stringify(NL_MESSAGE_AR)};
      if (name) message += " اسمي " + name + ".";
      window.open("https://wa.me/${WA_DIGITS}?text=" + encodeURIComponent(message), "_blank", "noopener");
    });
  }

  /* 5.13.5 — scroll reveals (.fade-in + .reveal, mirrors index/search) */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".fade-in, .reveal"));
  if (reveals.length > 0) {
    if (!("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }
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

      {/* §5.1 — reading progress bar */}
      <div id="blog-progress-bar" className="progress-bar" aria-hidden="true" />

      <div className="blog-container">
        <BlogBreadcrumbs items={breadcrumbs} />
      </div>

      <article className="post-article" aria-labelledby="post-title">
        {/* §5.2 — post hero */}
        <header className="post-hero fade-in">
          <div className="post-hero-glow" aria-hidden="true" />
          <span className="post-cat-tag">{getArabicCategoryName(post.categoryId)}</span>
          <h1 id="post-title">{post.title}</h1>
          <p className="post-lead">{post.lead}</p>
          <div className="post-meta">
            <span className="meta-avatar" aria-hidden="true">
              {author.arabicName.charAt(0)}
            </span>
            <span className="meta-author">
              <span className="meta-author-name">{author.arabicName}</span>
              <span className="meta-author-title">{author.titleAr}</span>
            </span>
            <span className="meta-sep" aria-hidden="true">•</span>
            <span className="meta-item">
              <CalendarDays size={15} strokeWidth={1.75} aria-hidden="true" />
              {formatArabicBlogDate(post.publishedAt)}
            </span>
            <span className="meta-sep" aria-hidden="true">•</span>
            <span className="meta-item">
              <Clock size={15} strokeWidth={1.75} aria-hidden="true" />
              {readTimeLabelAr(post.readTime)}
            </span>
          </div>
        </header>

        {/* §5.3 — hero image */}
        {hero && (
          <figure className="post-hero-image fade-in">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              priority
            />
          </figure>
        )}

        {/* §5.4 — stats strip (Arabic merge drops `stats`, so the guard
            keeps this zone inert for Arabic posts — same as the EN page) */}
        {post.stats && post.stats.length > 0 && (
          <div className="stats-strip fade-in" role="list" aria-label="Key facts">
            {post.stats.map((stat, i) => (
              <div className="stat-cell" role="listitem" key={i}>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* §5.5 — content + sidebar grid */}
        <div className="post-layout">
          <div className="post-main">
            {/* §5.6 — post content (Arabic FAQ heading via `faqHeading`) */}
            <div className="post-content">
              <ArticleBody body={post.body} faqs={post.faqs} faqHeading="الأسئلة الشائعة" />
            </div>

            {/* §5.7 — article footer: tags + share */}
            <footer className="article-footer">
              <div className="article-tags" aria-label="مواضيع المقال">
                {post.tags.map((tag, i) => (
                  <span className="tag-chip" key={i}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="article-share">
                <span className="share-label">{AR.misc.share}</span>
                {shares.map((s, i) => {
                  const Icon = s.Icon;
                  return (
                    <button
                      key={i}
                      type="button"
                      className="share-btn"
                      data-share-url={s.url}
                      aria-label={s.label}
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </button>
                  );
                })}
                <button
                  type="button"
                  className="share-btn share-copy"
                  data-copy-link={canonical}
                  aria-label="نسخ رابط المقال"
                >
                  <Link2 size={18} strokeWidth={1.75} />
                </button>
              </div>
            </footer>

            {/* §5.8 — author bio card (E-E-A-T) */}
            <section className="author-bio-card reveal" aria-label="عن الكاتب">
              <div className="author-bio-avatar blog-avatar-ring" aria-hidden="true">
                {author.arabicName.charAt(0)}
              </div>
              <div className="author-bio-body">
                <h2 className="author-bio-name">{author.arabicName}</h2>
                <p className="author-bio-role">{author.titleAr}</p>
                <p className="author-bio-text">
                  {author.arabicName} يكتب عن موافقات البناء في دبي ضمن فريق وسلين
                  للموافقات — ويغطي بلدية دبي والدفاع المدني وهيئة دبي للتطوير وديوا
                  وعمليات الموافقات في المناطق الحرة.
                </p>
                {reviewer && (
                  <p className="author-bio-reviewer">
                    راجعه {reviewer.arabicName}، {reviewer.titleAr}
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* §5.9 — sticky sidebar (Arabic) */}
          <aside className="sidebar" aria-label="الشريط الجانبي للمقال">
            <ArticleSidebarArabic post={post} headings={headings} related={related} />
          </aside>
        </div>

        {/* §5.10 — prev/next (deterministic, different-category preference) */}
        {(prevPost || nextPost) && (
          <nav className="prev-next reveal" aria-label="مقالات أخرى">
            {prevPost ? (
              <Link href={`/ar/blog/${prevPost.slug}`} className="prev-next-card prev">
                <span className="prev-next-direction">→ المقال السابق</span>
                <span className="prev-next-title">{prevPost.title}</span>
                <span className="prev-next-meta">
                  {getArabicCategoryName(prevPost.categoryId)} ·{" "}
                  {readTimeLabelAr(prevPost.readTime)}
                </span>
              </Link>
            ) : (
              <span className="prev-next-card prev is-empty" aria-hidden="true" />
            )}
            {nextPost ? (
              <Link href={`/ar/blog/${nextPost.slug}`} className="prev-next-card next">
                <span className="prev-next-direction">المقال التالي ←</span>
                <span className="prev-next-title">{nextPost.title}</span>
                <span className="prev-next-meta">
                  {getArabicCategoryName(nextPost.categoryId)} ·{" "}
                  {readTimeLabelAr(nextPost.readTime)}
                </span>
              </Link>
            ) : (
              <span className="prev-next-card next is-empty" aria-hidden="true" />
            )}
          </nav>
        )}

        {/* §5.11 — all categories (light inversion) */}
        <section
          className="all-categories reveal"
          aria-labelledby="all-categories-heading"
        >
          <div className="blog-container">
            <h2 id="all-categories-heading" className="all-categories-title">
              استكشف جميع مواضيع الموافقات
            </h2>
            <p className="all-categories-text">
              كل فئة في مدونة موافقات دبي — من التعمّق في الجهات إلى رحلات المشاريع.
            </p>
            <div className="all-categories-grid">
              {activeCategories.map((c) => (
                <Link
                  key={c.id}
                  href={`/ar/blog?category=${c.slug}`}
                  className="cat-pill-full"
                >
                  {c.name}
                </Link>
              ))}
              <Link href="/ar/blog" className="cat-pill-full">
                تصفح جميع المقالات
              </Link>
            </div>
          </div>
        </section>

        {/* §5.12 — newsletter bottom */}
        <section className="nl-bottom reveal" aria-labelledby="nl-bottom-heading">
          <div className="blog-container">
            <div className="nl-bottom-inner blog-glass">
              <span className="nl-stars" aria-hidden="true">
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
              </span>
              <h2 id="nl-bottom-heading" className="nl-bottom-title">
                احصل على تحديثات الموافقات الجديدة بالبريد
              </h2>
              <p className="nl-bottom-text">
                أدلة عملية حول موافقات دبي — رسالة واحدة شهرياً، دون رسائل مزعجة،
                ويمكنك إلغاء الاشتراك في أي وقت.
              </p>
              <form className="nl-form" data-wa-form>
                <input
                  className="nl-input"
                  type="text"
                  name="name"
                  placeholder="اسمك"
                  aria-label="اسمك"
                  autoComplete="name"
                  data-wa-input
                />
                <button className="nl-submit" type="submit" data-wa-submit>
                  اشترك عبر واتساب
                </button>
              </form>
            </div>
          </div>
        </section>
      </article>

      <script dangerouslySetInnerHTML={{ __html: articleScript }} />
    </>
  );
}
