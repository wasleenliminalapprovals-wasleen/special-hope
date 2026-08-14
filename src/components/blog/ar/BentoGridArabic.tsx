/**
 * BentoGridArabic — Arabic variant of ZONE 5 (plan §5, C-AR §9).
 *
 * Mirrors `BentoGrid.tsx`: asymmetric 3-column post grid (7 visible cards,
 * hidden "load more" set), Arabic strings, `/ar/blog/{slug}` links and the
 * AR helpers (`getArabicCategoryName`, `formatArabicBlogDate`,
 * `readTimeLabelAr`). The per-category emoji map is locale-neutral.
 *
 * @see src/components/blog/BentoGrid.tsx (EN source)
 */

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types";
import {
  formatArabicBlogDate,
  getArabicCategoryName,
  getPostHeroImage,
  readTimeLabelAr,
} from "@/lib/blog-ar";

interface BentoGridArabicProps {
  /** Posts to render (already filtered server-side when a category is active). */
  posts: BlogPost[];
}

/** Deterministic per-category emoji for the 16:9 watercolor thumb. */
const CATEGORY_EMOJI: Record<string, string> = {
  "approval-news": "📰",
  comparisons: "⚖️",
  "project-journeys": "🏗️",
  "costs-timelines": "💰",
  "authority-deep-dives": "🏛️",
  "rejection-stories": "⚠️",
  "free-zones": "🏙️",
  "docs-drawings": "📐",
};

const VISIBLE_COUNT = 7;

export default function BentoGridArabic({ posts }: BentoGridArabicProps) {
  if (posts.length === 0) return null;

  const visible = posts.slice(0, VISIBLE_COUNT);
  const more = posts.slice(VISIBLE_COUNT);

  const renderCard = (post: BlogPost, index: number) => {
    const heroImg = getPostHeroImage(post);
    const spanClass = index === 0 || index === 6 ? "bento-span-2" : "";
    return (
      <article
        key={post.slug}
        className={`post-card${spanClass ? ` ${spanClass}` : ""}`}
      >
        <Link
          href={`/ar/blog/${post.slug}`}
          className="post-thumb"
          tabIndex={-1}
          aria-hidden="true"
        >
          <span className="post-thumb-emoji">{CATEGORY_EMOJI[post.categoryId] ?? "📄"}</span>
          {heroImg ? (
            <Image
              src={heroImg.src}
              alt=""
              width={heroImg.width}
              height={heroImg.height}
              className="post-thumb-img"
              sizes="(max-width: 640px) 100vw, (max-width: 992px) 50vw, 33vw"
            />
          ) : null}
        </Link>
        <div className="post-body">
          <span className="post-cat-tag">{getArabicCategoryName(post.categoryId)}</span>
          <h3 className="post-title">
            <Link href={`/ar/blog/${post.slug}`}>{post.title}</Link>
          </h3>
          <p className="post-meta">
            <span>{formatArabicBlogDate(post.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span>{readTimeLabelAr(post.readTime)}</span>
          </p>
        </div>
      </article>
    );
  };

  return (
    <section className="bento-zone" aria-labelledby="bento-heading">
      <div className="blog-container">
        <div className="zone-head reveal">
          <p className="blog-eyebrow">أحدث المقالات</p>
          <h2 id="bento-heading" className="zone-title">
            المشاركات الأخيرة
          </h2>
        </div>

        <div className="bento-grid fade-in">{visible.map((post, i) => renderCard(post, i))}</div>

        {more.length > 0 ? (
          <>
            <div className="bento-more" id="bento-more-grid" hidden>
              <div className="bento-grid">
                {more.map((post, i) => renderCard(post, i + VISIBLE_COUNT))}
              </div>
            </div>
            <div className="bento-more-actions">
              <button
                type="button"
                className="btn-load-more"
                data-load-more
                data-hidden-count={more.length}
              >
                تحميل المزيد من المقالات
                <span className="btn-load-more-count" aria-hidden="true">
                  ({more.length})
                </span>
              </button>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
