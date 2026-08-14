/**
 * BlogBreadcrumbs — accessible breadcrumb trail for `/blog` routes.
 *
 * Server component (no client JS). Mirrors the site's `PseoBreadcrumbs`
 * pattern: semantic `<nav aria-label="Breadcrumb">` + `<ol>`, last item
 * is the current page (rendered as text, not a link) with
 * `aria-current="page"`. Styling lives in `src/app/blog/blog.css`
 * (.blog-crumbs) so the dark theme stays inside the scoped stylesheet.
 *
 * Paired with `BreadcrumbList` JSON-LD provided by each page (plan §4.4 —
 * "Paired with BreadcrumbList JSON-LD (always)").
 *
 * @see plans/blog-pre-build-plan.md §4.4 (breadcrumb levels)
 * @see src/components/pseo/PseoBreadcrumbs.tsx (site pattern mirrored)
 */

import Link from "next/link";

export interface BlogBreadcrumbItem {
  name: string;
  href: string;
}

interface BlogBreadcrumbsProps {
  /** Ordered trail: Home → Blog → {Category} → {Article} */
  items: BlogBreadcrumbItem[];
}

export default function BlogBreadcrumbs({ items }: BlogBreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="blog-crumbs">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i}>
              {i > 0 && (
                <span aria-hidden="true" className="blog-crumbs-sep">
                  /
                </span>
              )}
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.href}>{item.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
