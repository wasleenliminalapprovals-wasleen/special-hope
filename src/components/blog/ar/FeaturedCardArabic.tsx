/**
 * FeaturedCardArabic — Arabic variant of ZONE 3 (plan §5, C-AR §9).
 *
 * Mirrors `FeaturedCard.tsx` markup with Arabic strings, `/ar/blog/{slug}`
 * links and the AR helpers (`getFeaturedArabicPost`, `getArabicCategoryName`,
 * `formatArabicBlogDate`, `readTimeLabelAr`). The forward arrow flips to `←`
 * because the canvas is RTL.
 *
 * @see src/components/blog/FeaturedCard.tsx (EN source)
 */

import Image from "next/image";
import Link from "next/link";
import {
  formatArabicBlogDate,
  getArabicCategoryName,
  getFeaturedArabicPost,
  getPostHeroImage,
  readTimeLabelAr,
} from "@/lib/blog-ar";

export default function FeaturedCardArabic() {
  const post = getFeaturedArabicPost();
  if (!post) return null;

  const heroImg = getPostHeroImage(post);

  return (
    <section className="featured-zone" aria-labelledby="featured-heading">
      <div className="blog-container">
        <div className="zone-head reveal">
          <p className="blog-eyebrow">اختيار المحرر</p>
          <h2 id="featured-heading" className="zone-title">
            دليل مميز
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
              <span className="post-cat-tag">{getArabicCategoryName(post.categoryId)}</span>
              <h2 className="featured-title">
                <Link href={`/ar/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="featured-lead">{post.lead}</p>
              <p className="featured-meta">
                <span>{formatArabicBlogDate(post.publishedAt)}</span>
                <span aria-hidden="true">·</span>
                <span>{readTimeLabelAr(post.readTime)}</span>
              </p>
              <Link href={`/ar/blog/${post.slug}`} className="btn-read">
                اقرأ الدليل
                <span className="btn-arrow" aria-hidden="true">
                  ←
                </span>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
