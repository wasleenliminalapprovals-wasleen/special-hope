/**
 * Blog article page — 13-section layout (plan §7) + article @graph schema.
 *
 * Server-rendered (no client components). Sections:
 *   5.1  reading progress bar          5.8  author bio card
 *   5.2  post hero (cat, H1, meta)     5.9  sticky sidebar (TOC/facts/CTA)
 *   5.3  hero image                    5.10 prev/next rail (deterministic)
 *   5.4  stats strip                   5.11 all-categories (light inversion)
 *   5.5  post layout grid              5.12 newsletter bottom
 *   5.6  post content (ArticleBody)    5.13 inline IIFE (progress, TOC
 *   5.7  article footer (tags+share)        scroll-spy, share, copy, reveal)
 *
 * All interactive behaviour lives in the single inline IIFE at the end (no
 * client components, no extra JS bundles); `prefers-reduced-motion` is
 * respected. Prev/next are deterministic server-side links (master rule #5:
 * no JS-only navigation). Schema is the full article stack from
 * `blogArticleSchemaStack` (BlogPosting + WebPage + OfferCatalog + FAQPage? +
 * HowTo? + BreadcrumbList).
 *
 * @see plans/blog-pre-build-plan.md §7 / §8.1 / §9 Phase 5
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
import ArticleSidebar, { type TocHeading } from "@/components/blog/ArticleSidebar";
import { BLOG_POSTS } from "@/data/blog-posts";
import { AUTHOR_REGISTRY } from "@/data/authors";
import {
  formatBlogDate,
  getActiveBlogCategories,
  getAdjacentPosts,
  getBlogCategory,
  getCategoryName,
  getPostHeroImage,
  readTimeLabel,
  relatedPosts,
  resolvePost,
} from "@/lib/blog";
import { blogArticleSchemaStack } from "@/lib/blog-schema";
import { NAP, SITE } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";

const BASE = SITE.url.replace(/\/+$/, "");

/** wa.me links use digits only — strip the "+" prefix from NAP.whatsapp. */
const WA_DIGITS = NAP.whatsapp.replace(/\D/g, "");

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = resolvePost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  const author = AUTHOR_REGISTRY[post.authorId];
  return {
    title: post.seoTitle,
    description: post.description,
    alternates: { canonical: url, languages: hreflangAlternates(SITE.url, url) },
    openGraph: {
      title: post.seoTitle,
      description: post.description,
      url: `${BASE}${url}`,
      type: "article",
      siteName: SITE.name,
      images: [
        {
          url: `${BASE}/logos/og-image-blog-authority-updates.jpg`,
          width: 1200,
          height: 630,
          alt: "Dubai Approvals Blog & Updates — Wasleen Liminal Approval Consultants",
        },
      ],
      publishedTime: post.publishedAt,
      modifiedTime: post.lastUpdated,
      authors: [author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.description,
      images: [`${BASE}/logos/og-image-blog-authority-updates.jpg`],
    },
  };
}

export default async function BlogArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = resolvePost(slug);
  if (!post) notFound();

  const category = getBlogCategory(post.categoryId);
  const author = AUTHOR_REGISTRY[post.authorId];
  const reviewer = post.reviewerId ? AUTHOR_REGISTRY[post.reviewerId] : undefined;
  const hero = getPostHeroImage(post);
  const related = relatedPosts(post, 3);
  const activeCategories = getActiveBlogCategories();
  const { prev: prevPost, next: nextPost } = getAdjacentPosts(post);
  const url = `/blog/${post.slug}`;
  const canonical = `${BASE}${url}`;

  const headings: TocHeading[] = post.body
    .filter((b): b is Extract<BlogSection, { type: "heading" }> => b.type === "heading")
    .map((b) => ({ id: postHeadingId(b.text), text: b.text, level: b.level }));

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    ...(category ? [{ name: category.name, href: `/blog?category=${category.slug}` }] : []),
    { name: post.title, href: url },
  ];

  const schemaBreadcrumbs = [
    { position: 1, name: "Home", slug: "/" },
    { position: 2, name: "Blog", slug: "/blog" },
    ...(category ? [{ position: 3, name: category.name, slug: `/blog?category=${category.slug}` }] : []),
    { position: category ? 4 : 3, name: post.title, slug: url },
  ];

  const schemas = blogArticleSchemaStack({
    url,
    title: post.title,
    description: post.description,
    post,
    breadcrumbs: schemaBreadcrumbs,
  });

  const encodedUrl = encodeURIComponent(canonical);
  const encodedTitle = encodeURIComponent(post.title);
  const shares = [
    {
      label: "Share on LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: Linkedin,
    },
    {
      label: "Share on X (Twitter)",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: Twitter,
    },
    {
      label: "Share on WhatsApp",
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      Icon: MessageCircle,
    },
    {
      label: "Share on Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: Facebook,
    },
  ];

  const nlMessage =
    "Hello Wasleen Liminal Approval Consultants, I'd like to subscribe to your monthly Dubai approvals newsletter.";

  /* §5.13 — single inline IIFE: progress, TOC scroll-spy, share/copy,
     WhatsApp newsletter, scroll reveals. No `$`/backtick collisions. */
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
        copyBtn.innerHTML = "✓ Copied!";
        setTimeout(function () { copyBtn.innerHTML = original; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(function () {});
      } else {
        done();
      }
    });
  }

  /* 5.13.4 — WhatsApp newsletter form (mirrors index ZONE 9) */
  var waForm = document.querySelector("[data-wa-form]");
  if (waForm) {
    waForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = waForm.querySelector("[data-wa-input]");
      var name = input ? input.value.trim() : "";
      var msg = waForm.getAttribute("data-wa-message") || "";
      if (name) msg = name + ": " + msg;
      window.open("https://wa.me/${WA_DIGITS}?text=" + encodeURIComponent(msg), "_blank", "noopener");
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
        <header className="post-hero">
          <div className="post-hero-glow" aria-hidden="true" />
          <span className="post-cat-tag">{getCategoryName(post.categoryId)}</span>
          <h1 id="post-title">{post.title}</h1>
          <p className="post-lead">{post.lead}</p>
          <div className="post-meta">
            <span className="meta-avatar" aria-hidden="true">
              {author.name.charAt(0)}
            </span>
            <span className="meta-author">
              <span className="meta-author-name">{author.name}</span>
              <span className="meta-author-title">{author.titleEn}</span>
            </span>
            <span className="meta-sep" aria-hidden="true">•</span>
            <span className="meta-item">
              <CalendarDays size={15} strokeWidth={1.75} aria-hidden="true" />
              {formatBlogDate(post.publishedAt)}
            </span>
            <span className="meta-sep" aria-hidden="true">•</span>
            <span className="meta-item">
              <Clock size={15} strokeWidth={1.75} aria-hidden="true" />
              {readTimeLabel(post.readTime)}
            </span>
          </div>
        </header>

        {/* §5.3 — hero image */}
        {hero && (
          <figure className="post-hero-image">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              priority
            />
          </figure>
        )}

        {/* §5.4 — stats strip (real post data only) */}
        {post.stats && post.stats.length > 0 && (
          <div className="stats-strip" role="list" aria-label="Key facts">
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
            {/* §5.6 — post content */}
            <div className="post-content">
              <ArticleBody body={post.body} faqs={post.faqs} />
            </div>

            {/* §5.7 — article footer: tags + share */}
            <footer className="article-footer">
              <div className="article-tags" aria-label="Article topics">
                {post.tags.map((tag, i) => (
                  <span className="tag-chip" key={i}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="article-share">
                <span className="share-label">Share</span>
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
                  aria-label="Copy article link"
                >
                  <Link2 size={18} strokeWidth={1.75} />
                </button>
              </div>
            </footer>

            {/* §5.8 — author bio card (E-E-A-T) */}
            <section className="author-bio-card reveal" aria-label="About the author">
              <div className="author-bio-avatar blog-avatar-ring" aria-hidden="true">
                {author.name.charAt(0)}
              </div>
              <div className="author-bio-body">
                <h2 className="author-bio-name">{author.name}</h2>
                <p className="author-bio-role">{author.titleEn}</p>
                <p className="author-bio-text">
                  {author.name} writes on Dubai building approvals as part of the
                  Wasleen Approvals team — covering Dubai Municipality, DCD, DDA,
                  DEWA and free-zone approval processes.
                </p>
                {reviewer && (
                  <p className="author-bio-reviewer">
                    Reviewed by {reviewer.name}, {reviewer.titleEn}
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* §5.9 — sticky sidebar */}
          <aside className="sidebar" aria-label="Article sidebar">
            <ArticleSidebar post={post} headings={headings} related={related} />
          </aside>
        </div>

        {/* §5.10 — prev/next (deterministic, different-category preference) */}
        {(prevPost || nextPost) && (
          <nav className="prev-next reveal" aria-label="More articles">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="prev-next-card prev">
                <span className="prev-next-direction">← Previous article</span>
                <span className="prev-next-title">{prevPost.title}</span>
                <span className="prev-next-meta">
                  {getCategoryName(prevPost.categoryId)} · {readTimeLabel(prevPost.readTime)}
                </span>
              </Link>
            ) : (
              <span className="prev-next-card prev is-empty" aria-hidden="true" />
            )}
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="prev-next-card next">
                <span className="prev-next-direction">Next article →</span>
                <span className="prev-next-title">{nextPost.title}</span>
                <span className="prev-next-meta">
                  {getCategoryName(nextPost.categoryId)} · {readTimeLabel(nextPost.readTime)}
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
              Explore all approval topics
            </h2>
            <p className="all-categories-text">
              Every category in the Dubai approvals blog — from authority
              deep-dives to project journeys.
            </p>
            <div className="all-categories-grid">
              {activeCategories.map((c) => (
                <Link
                  key={c.id}
                  href={`/blog?category=${c.slug}`}
                  className="cat-pill-full"
                >
                  {c.name}
                </Link>
              ))}
              <Link href="/blog" className="cat-pill-full">
                Browse all articles
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
                Get new approval updates by email
              </h2>
              <p className="nl-bottom-text">
                Practical guides on Dubai approvals — one email a month, no spam,
                unsubscribe anytime.
              </p>
              <form className="nl-form" data-wa-form data-wa-message={nlMessage}>
                <input
                  className="nl-input"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  aria-label="Your name"
                  autoComplete="name"
                  data-wa-input
                />
                <button className="nl-submit" type="submit" data-wa-submit>
                  Subscribe on WhatsApp
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
