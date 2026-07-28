/**
 * RelatedGuides — Internal linking to related guide/Q&A pages.
 *
 * Shows 3-5 related guide cards with descriptive anchor text.
 * Mirrors the RelatedApprovals pattern for consistency.
 *
 * @usage
 * ```tsx
 * <RelatedGuides slugs={guide.relatedSlugs} />
 * ```
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md — Internal linking rules
 */

import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { guides } from "@/data/guides";

interface RelatedGuidesProps {
  /** Array of guide slugs to display */
  slugs: string[];
  className?: string;
}

/** Category-specific CTA text */
const ctaTexts: Record<string, string> = {
  "how-long": "Read the guide",
  "dcd-": "Read the guide",
  "dm-": "Read the guide",
  "rta-": "Read the guide",
  "dso-": "Read the guide",
  "nakheel": "Read the guide",
  "emaar": "Read the guide",
  "ejari": "Read the guide",
  dewa: "Read the guide",
  "dubai-approval-fees": "Read the guide",
  "approval-timelines": "Read the guide",
  "complete-guide": "Read the guide",
  "how-to-avoid": "Read the guide",
  default: "Read the guide",
};

function getCta(slug: string): string {
  for (const [key, text] of Object.entries(ctaTexts)) {
    if (slug.includes(key)) return text;
  }
  return ctaTexts.default;
}

export default function RelatedGuides({
  slugs,
  className = "",
}: RelatedGuidesProps) {
  if (!slugs || slugs.length === 0) return null;

  // Map slugs to guide data
  const related = slugs
    .map((slug) => guides.find((g) => g.slug === slug))
    .filter(Boolean);

  if (related.length === 0) return null;

  return (
    <section className={`bg-white ${className}`.trim()}>
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-3">
            Related Guides
          </h2>
          <p className="text-body-lg text-body-text mb-8 max-w-3xl">
            Explore our comprehensive guides and Q&A pages for more
            detailed information.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((guide) => {
              if (!guide) return null;

              return (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="flex items-start gap-3 p-4 rounded-md bg-white border border-border-light shadow-card hover:border-brand-blue/30 hover:shadow-dropdown transition-all duration-200 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-md bg-card-bg text-brand-blue shrink-0">
                    <BookOpen size={20} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-body-sm font-montserrat font-bold text-heading-text mb-0.5 group-hover:text-brand-blue-hover transition-colors line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-caption text-body-text/80">
                      {guide.type === "qa" ? "Q&A" : "Guide"}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    strokeWidth={1.75}
                    className="text-body-text/30 group-hover:text-brand-blue shrink-0 mt-1 transition-colors"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
