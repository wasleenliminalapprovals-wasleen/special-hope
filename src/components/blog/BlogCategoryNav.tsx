/**
 * BlogCategoryNav — ZONE 2 of the blog index (plan §5).
 *
 * Server component. Sticky pill bar (`.blog-sticky-top` = top:0, z-index:100,
 * backdrop blur) with a horizontally-scrollable `.cat-pill` row: an "All"
 * reset pill + one pill per active category. Filtering is **server-driven**
 * (plan §0 finding #9): every pill is a real `<Link>` to `/blog?category={slug}`
 * (RSC client-side navigation); "All" links to `/blog`. The active pill carries
 * `is-active` (accent underline via `.cat-pill::after`) + `aria-current`.
 *
 * The gradient scrollbar is pure CSS (`.cat-pill-bar` → scrollbarGlow 3s).
 *
 * @param activeCategory — server `searchParams.category` ("all" / slug / undefined).
 * @see plans/blog-pre-build-plan.md §5 (ZONE 2) + §0 finding #9
 */

import Link from "next/link";
import { getActiveBlogCategories } from "@/lib/blog";

interface BlogCategoryNavProps {
  /** Currently selected category slug — "all" / a slug / undefined (no filter). */
  activeCategory?: string | null;
}

export default function BlogCategoryNav({ activeCategory }: BlogCategoryNavProps) {
  const categories = getActiveBlogCategories();
  const active = !activeCategory || activeCategory === "all" ? "all" : activeCategory;

  return (
    <nav className="blog-sticky-top cat-pill-bar" aria-label="Blog categories">
      <div className="blog-container">
        <div className="cat-pill-row">
          <Link
            href="/blog"
            className={`cat-pill${active === "all" ? " is-active" : ""}`}
            aria-current={active === "all" ? "page" : undefined}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog?category=${cat.slug}`}
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
