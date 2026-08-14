/**
 * BlogCategoryGrid — ZONE 4 of the blog index (plan §5).
 *
 * Server component. Active categories in a 1px-gap tile grid
 * (`.blog-tile-grid` → `repeat(4,1fr); gap:1px; background:var(--border)`):
 *   - `.cat-card` — solid surface tile; hover `translateY(-2px)` + bottom
 *     accent edge (`.blog-accent-edge`, scaleX 0→1).
 *   - Each card is a real `<Link>` to `/blog?category={slug}` (server filter).
 *   - Per-card post count comes from `getPostsByCategory` (real data).
 *
 * @see plans/blog-pre-build-plan.md §5 (ZONE 4)
 */

import Link from "next/link";
import { getActiveBlogCategories, getPostsByCategory } from "@/lib/blog";

export default function BlogCategoryGrid() {
  const categories = getActiveBlogCategories();
  if (categories.length === 0) return null;

  return (
    <section className="cat-grid-zone" aria-labelledby="cat-grid-heading">
      <div className="blog-container">
        <div className="zone-head reveal">
          <p className="blog-eyebrow">Browse by topic</p>
          <h2 id="cat-grid-heading" className="zone-title">
            Explore approval categories
          </h2>
        </div>

        <div className="blog-tile-grid cat-grid fade-in">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog?category=${cat.slug}`}
              className="cat-card blog-accent-edge"
            >
              <span className="cat-code" aria-hidden="true">
                {cat.code}
              </span>
              <h3 className="cat-name">{cat.name}</h3>
              <p className="cat-desc">{cat.description}</p>
              <p className="cat-count">
                {getPostsByCategory(cat.id).length}{" "}
                {getPostsByCategory(cat.id).length === 1 ? "post" : "posts"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
