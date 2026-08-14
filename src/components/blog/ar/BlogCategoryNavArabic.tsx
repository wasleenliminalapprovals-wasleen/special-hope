/**
 * BlogCategoryNavArabic — Arabic variant of ZONE 2 (plan §5, C-AR §9).
 *
 * Mirrors `BlogCategoryNav.tsx`: sticky pill bar of real `<Link>`s to
 * `/ar/blog` (reset) and `/ar/blog?category={slug}` (server-driven filter).
 * Categories use the native-Arabic names via `getActiveArabicBlogCategories`.
 *
 * @see src/components/blog/BlogCategoryNav.tsx (EN source)
 */

import Link from "next/link";
import { getActiveArabicBlogCategories } from "@/lib/blog-ar";

interface BlogCategoryNavArabicProps {
  /** Currently selected category slug — "all" / a slug / undefined (no filter). */
  activeCategory?: string | null;
}

export default function BlogCategoryNavArabic({
  activeCategory,
}: BlogCategoryNavArabicProps) {
  const categories = getActiveArabicBlogCategories();
  const active = !activeCategory || activeCategory === "all" ? "all" : activeCategory;

  return (
    <nav className="blog-sticky-top cat-pill-bar" aria-label="فئات المدونة">
      <div className="blog-container">
        <div className="cat-pill-row">
          <Link
            href="/ar/blog"
            className={`cat-pill${active === "all" ? " is-active" : ""}`}
            aria-current={active === "all" ? "page" : undefined}
          >
            الكل
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/ar/blog?category=${cat.slug}`}
              className={`cat-pill${active === cat.slug ? " is-active" : ""}`}
              aria-current={active === cat.slug ? "page" : undefined}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
