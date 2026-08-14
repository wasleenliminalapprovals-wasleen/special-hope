/**
 * BlogCategoryGridArabic — Arabic variant of ZONE 4 (plan §5, C-AR §9).
 *
 * Mirrors `BlogCategoryGrid.tsx`: 1px-gap tile grid of active categories with
 * Arabic names/descriptions (`getActiveArabicBlogCategories`) and real post
 * counts (`getPostsByArabicCategory`). Cards are real `<Link>`s to the
 * server-driven category filter.
 *
 * @see src/components/blog/BlogCategoryGrid.tsx (EN source)
 */

import Link from "next/link";
import { getActiveArabicBlogCategories, getPostsByArabicCategory } from "@/lib/blog-ar";

export default function BlogCategoryGridArabic() {
  const categories = getActiveArabicBlogCategories();
  if (categories.length === 0) return null;

  return (
    <section className="cat-grid-zone" aria-labelledby="cat-grid-heading">
      <div className="blog-container">
        <div className="zone-head reveal">
          <p className="blog-eyebrow">تصفح حسب الموضوع</p>
          <h2 id="cat-grid-heading" className="zone-title">
            استكشف فئات الموافقات
          </h2>
        </div>

        <div className="blog-tile-grid cat-grid fade-in">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/ar/blog?category=${cat.slug}`}
              className="cat-card blog-accent-edge"
            >
              <span className="cat-code" aria-hidden="true">
                {cat.code}
              </span>
              <h3 className="cat-name">{cat.name}</h3>
              <p className="cat-desc">{cat.description}</p>
              <p className="cat-count">
                {getPostsByArabicCategory(cat.id).length}{" "}
                {getPostsByArabicCategory(cat.id).length === 1 ? "مقال" : "مقالات"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
