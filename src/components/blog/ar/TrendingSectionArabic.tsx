/**
 * TrendingSectionArabic — Arabic variant of ZONE 6 (plan §5, C-AR §9).
 *
 * Mirrors `TrendingSection.tsx`: horizontally-scrolling glass shell of the
 * 10 trending Arabic posts (`getTrendingArabicPosts(10)`). Ranks use the
 * same zero-padded numeral (locale-neutral digits per project convention).
 *
 * @see src/components/blog/TrendingSection.tsx (EN source)
 */

import Link from "next/link";
import { getTrendingArabicPosts } from "@/lib/blog-ar";

export default function TrendingSectionArabic() {
  const trending = getTrendingArabicPosts(10);
  if (trending.length === 0) return null;

  const renderItem = (post: (typeof trending)[number], index: number) => (
    <Link key={post.slug} href={`/ar/blog/${post.slug}`} className="trending-item">
      <span className="trending-rank" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="trending-title">{post.title}</span>
    </Link>
  );

  return (
    <section className="trending-zone" aria-labelledby="trending-heading">
      <div className="blog-container">
        <div className="trending-shell blog-glass fade-in">
          <div className="trending-head reveal">
            <p className="blog-eyebrow">الأكثر قراءة</p>
            <h2 id="trending-heading" className="zone-title">
              الرائج هذا الأسبوع
            </h2>
          </div>

          <div className="blog-scroller">
            <div className="trending-track">
              <div className="trending-copy">{trending.map(renderItem)}</div>
              <div className="trending-copy" aria-hidden="true">
                {trending.map(renderItem)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
