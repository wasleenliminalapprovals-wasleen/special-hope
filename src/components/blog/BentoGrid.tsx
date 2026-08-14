/**
 * BentoGrid — ZONE 5 of the blog index (plan §5).
 *
 * Server component. Asymmetric 3-column post grid —
 * rows `2fr 1fr / 1fr 1fr 1fr / 1fr 2fr` = 7 visible cards
 * (card 0 and card 6 span 2 columns). Props-driven so the server-driven
 * category filter (ZONE 2) feeds this component the current set.
 *
 *   - `.post-card` — surface tile; top hairline → accent on hover.
 *   - `.post-thumb` — 16:9 emoji watercolor (3rem, opacity 0.15, hover
 *     scale 1.1); hero image overlays it when the post has one.
 *   - Posts beyond the 7th render in the hidden `#bento-more-grid`, revealed
 *     by the `.btn-load-more` stub (index JS → "All posts shown", hides button).
 *
 * @see plans/blog-pre-build-plan.md §5 (ZONE 5)
 */

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types";
import {
  formatBlogDate,
  getCategoryName,
  getPostHeroImage,
  readTimeLabel,
} from "@/lib/blog";

interface BentoGridProps {
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

export default function BentoGrid({ posts }: BentoGridProps) {
  if (posts.length === 0) return null;

  const visible = posts.slice(0, VISIBLE_COUNT);
  const more = posts.slice(VISIBLE_COUNT);

  const renderCard = (post: BlogPost, index: number) => {
    const heroImg = getPostHeroImage(post);
    const spanClass =
      index === 0 || index === 6 ? "bento-span-2" : "";
    return (
      <article
        key={post.slug}
        className={`post-card${spanClass ? ` ${spanClass}` : ""}`}
      >
        <Link
          href={`/blog/${post.slug}`}
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
          <span className="post-cat-tag">{getCategoryName(post.categoryId)}</span>
          <h3 className="post-title">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>
          <p className="post-meta">
            <span>{formatBlogDate(post.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span>{readTimeLabel(post.readTime)}</span>
          </p>
        </div>
      </article>
    );
  };

  return (
    <section className="bento-zone" aria-labelledby="bento-heading">
      <div className="blog-container">
        <div className="zone-head reveal">
          <p className="blog-eyebrow">Latest articles</p>
          <h2 id="bento-heading" className="zone-title">
            Recent posts
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
                Load more posts
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
