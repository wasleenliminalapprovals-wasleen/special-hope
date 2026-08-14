/**
 * TrendingSection — ZONE 6 of the blog index (plan §5).
 *
 * Server component. Glass shell (`.blog-glass` — surface + blur 16px +
 * accent border; `.trending-shell` adds radius 40px) with eyebrow + heading
 * and a horizontally-scrolling `.trending-track` (scrollLeft 50s, hover-pause
 * via `.blog-scroller`, duplicated `.trending-copy` so translateX(-50%) loops
 * seamlessly — same pattern as the marquee).
 *
 * The second copy is `aria-hidden` so assistive tech reads each headline once.
 *
 * @see plans/blog-pre-build-plan.md §5 (ZONE 6)
 */

import Link from "next/link";
import { getTrendingPosts } from "@/lib/blog";

export default function TrendingSection() {
  const trending = getTrendingPosts(10);
  if (trending.length === 0) return null;

  const renderItem = (post: (typeof trending)[number], index: number) => (
    <Link key={post.slug} href={`/blog/${post.slug}`} className="trending-item">
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
            <p className="blog-eyebrow">Most read</p>
            <h2 id="trending-heading" className="zone-title">
              Trending this week
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
