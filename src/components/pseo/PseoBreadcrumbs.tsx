/**
 * PseoBreadcrumbs — Accessible breadcrumb navigation for pSEO pages.
 *
 * Server component. Renders the visible breadcrumb trail; the matching
 * BreadcrumbList JSON-LD is provided separately by `pseoSchemaStack()`.
 *
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md (BreadcrumbList on every page)
 */

import Link from "next/link";

export interface PseoBreadcrumbItem {
  name: string;
  href: string;
}

interface PseoBreadcrumbsProps {
  /** Ordered trail: Home → Guides → This page */
  items: PseoBreadcrumbItem[];
}

export default function PseoBreadcrumbs({ items }: PseoBreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-caption text-body-text/80">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span
                  className="text-body-text font-medium truncate max-w-[220px]"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-link-blue transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
