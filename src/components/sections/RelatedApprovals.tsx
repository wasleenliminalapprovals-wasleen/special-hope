/**
 * RelatedApprovals — Internal linking to related approval pages.
 *
 * Shows 3-5 related approval cards with links. Uses descriptive anchor text
 * for SEO internal linking best practices.
 *
 * @usage
 * ```tsx
 * <RelatedApprovals slugs={approval.relatedSlugs} />
 * ```
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md — Section 12: Related approvals
 */

import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { approvals } from "@/data/approvals";

interface RelatedApprovalsProps {
  /** Array of approval slugs to display */
  slugs: string[];
  className?: string;
}

/** Category-specific CTA text for each authority type */
const ctaTexts: Record<string, string> = {
  "dubai-municipality": "Learn about DM",
  "dubai-civil-defense": "Learn about DCD",
  rta: "Learn about RTA approval",
  dewa: "Learn about DEWA",
  emaan: "Learn about Emaan approval",
  nakheel: "Learn about Nakheel approval",
  dmcc: "Learn about DMCC approval",
  tecom: "Learn about TECOM approval",
  jebel: "Learn about JAFZA approval",
  default: "View approval details",
};

function getCta(slug: string): string {
  for (const [key, text] of Object.entries(ctaTexts)) {
    if (slug.includes(key)) return text;
  }
  return ctaTexts.default;
}

export default function RelatedApprovals({
  slugs,
  className = "",
}: RelatedApprovalsProps) {
  if (!slugs || slugs.length === 0) return null;

  // Map slugs to approval data
  const related = slugs
    .map((slug) => approvals.find((a) => a.slug === slug))
    .filter(Boolean);

  if (related.length === 0) return null;

  return (
    <section className={`bg-white ${className}`.trim()}>
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-3">
            Related Approvals
          </h2>
          <p className="text-body-lg text-body-text mb-8 max-w-3xl">
            Explore other approvals that may be relevant to your project.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((approval) => {
              if (!approval) return null;

              return (
                <Link
                  key={approval.slug}
                  href={`/approvals/${approval.slug}`}
                  className="flex items-start gap-3 p-4 rounded-md bg-white border border-border-light shadow-card hover:border-brand-blue/30 hover:shadow-dropdown transition-all duration-200 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-md bg-card-bg text-brand-blue shrink-0">
                    <Shield size={20} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-body-sm font-montserrat font-bold text-heading-text mb-0.5 group-hover:text-brand-blue-hover transition-colors">
                      {approval.shortName}
                    </h3>
                    <p className="text-caption text-body-text/60">
                      {getCta(approval.slug)}
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
