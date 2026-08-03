/**
 * PseoRelatedBlock — Internal linking to related approval/guide pages.
 *
 * Uses descriptive anchor text and card styling. The related ItemList JSON-LD
 * is emitted by `pseoSchemaStack()`, so the links here and the schema stay in
 * sync via the same `related` input.
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md (Internal linking rules)
 */

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

export interface PseoRelatedItem {
  name: string;
  href: string;
  description?: string;
}

interface PseoRelatedBlockProps {
  title?: string;
  /** Resolved related items (name + locale-prefixed href) */
  items: PseoRelatedItem[];
  className?: string;
}

export default function PseoRelatedBlock({
  title = "Related pages",
  items,
  className = "",
}: PseoRelatedBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className={`bg-light-bg ${className}`.trim()}>
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-3">
            {title}
          </h2>
          <p className="text-body-lg text-body-text mb-8 max-w-3xl">
            Explore related approvals and guides for complete requirements,
            documents, and timelines.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-start gap-3 p-4 rounded-md bg-white border border-border-light shadow-card hover:border-brand-blue/30 hover:shadow-dropdown transition-all duration-200 group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-card-bg text-brand-blue shrink-0">
                  <FileText size={20} strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-body font-montserrat font-bold text-heading-text mb-0.5 group-hover:text-brand-blue-hover transition-colors">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-body-sm text-body-text/70">
                      {item.description}
                    </p>
                  )}
                </div>
                <ArrowRight
                  size={16}
                  strokeWidth={1.75}
                  className="text-body-text/30 group-hover:text-brand-blue shrink-0 mt-1 transition-colors"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
