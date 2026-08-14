/**
 * FeaturedCard — ZONE 3 of the blog index (plan §5).
 *
 * Server component. Single `featured` post rendered as a large editorial
 * card (min-height 480px):
 *   - `.featured-deco-inner` — gradientBorder 6s rotating conic ring
 *     (disabled under `prefers-reduced-motion`).
 *   - `.featured-bg.blog-zoom` — full-bleed hero image, slow zoom 1.03 on
 *     hover (emoji-tile fallback when the post has no image yet).
 *   - `.featured-body` — `.post-cat-tag`, clamped `.featured-title` link,
 *     lead, meta (date · read time) and a `.btn-read` (invert + arrow slide).
 *
 * The reveal is handled by the single index IntersectionObserver (`.reveal`).
 *
 * @see plans/blog-pre-build-plan.md §5 (ZONE 3)
 */

import Image from "next/image";
import Link from "next/link";
import {
  formatBlogDate,
  getCategoryName,
  getFeaturedPost,
  getPostHeroImage,
  readTimeLabel,
} from "@/lib/blog";

export default function FeaturedCard() {
  const post = getFeaturedPost();
  if (!post) return null;

  const heroImg = getPostHeroImage(post);

  return (
    <section className="featured-zone" aria-labelledby="featured-heading">
      <div className="blog-container">
        <div className="zone-head reveal">
          <p className="blog-eyebrow">Editor’s pick</p>
          <h2 id="featured-heading" className="zone-title">
            Featured guide
          </h2>
        </div>

        <article className="featured-card fade-in">
          <div className="featured-deco-inner">
            <div className="featured-bg blog-zoom">
              {heroImg ? (
                <Image
                  src={heroImg.src}
                  alt={heroImg.alt}
                  width={heroImg.width}
                  height={heroImg.height}
                  className="featured-bg-img"
                  priority
                  sizes="(max-width: 992px) 100vw, 1120px"
                />
              ) : (
                <div className="featured-bg-img featured-bg-fallback" aria-hidden="true">
                  <span role="img" aria-label={post.title}>
                    🏗️
                  </span>
                </div>
              )}
            </div>

            <div className="featured-overlay" aria-hidden="true" />

            <div className="featured-body">
              <span className="post-cat-tag">{getCategoryName(post.categoryId)}</span>
              <h2 className="featured-title">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="featured-lead">{post.lead}</p>
              <p className="featured-meta">
                <span>{formatBlogDate(post.publishedAt)}</span>
                <span aria-hidden="true">·</span>
                <span>{readTimeLabel(post.readTime)}</span>
              </p>
              <Link href={`/blog/${post.slug}`} className="btn-read">
                Read the guide
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
