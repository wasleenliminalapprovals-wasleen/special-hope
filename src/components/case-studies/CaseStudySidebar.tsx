/**
 * CaseStudySidebar — Part 18.6: Related-pages sidebar.
 *
 * Server component. Mirrors the blog sidebar pattern (ArticleSidebar): a
 * sticky desktop rail of related-page links placed inside the "What We Did"
 * section (`.cs-spec-rail` from Part 7.1), plus a compact mobile block below
 * the same section. The rail is NOT present on every page at all times —
 * it renders nothing when a study has no related pages (Part 18.6).
 *
 * Resolves `relatedApprovalSlugs` and `relatedServiceSlugs` against the real
 * data modules so every link targets an existing page (never a 404). All links
 * are real server-rendered `<a>` elements (Next `Link`) with descriptive text.
 */

import Link from "next/link";
import type { ApprovalCaseStudy } from "@/types/case-study";
import { approvals } from "@/data/approvals";
import { services } from "@/data/services";

interface CaseStudySidebarProps {
  study: ApprovalCaseStudy;
}

interface SidebarItem {
  slug: string;
  name: string;
}

function RelatedCards({
  approvalItems,
  serviceItems,
}: {
  approvalItems: SidebarItem[];
  serviceItems: SidebarItem[];
}) {
  return (
    <>
      {approvalItems.length > 0 && (
        <div className="cs-sb-card">
          <h3 className="cs-sb-heading">Related Approvals</h3>
          <ul className="cs-sb-list">
            {approvalItems.map((item) => (
              <li key={item.slug}>
                <Link href={`/approvals/${item.slug}`} className="cs-sb-link">
                  <span className="cs-sb-badge">Approval</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {serviceItems.length > 0 && (
        <div className="cs-sb-card mt-4">
          <h3 className="cs-sb-heading">Our Services</h3>
          <ul className="cs-sb-list">
            {serviceItems.map((item) => (
              <li key={item.slug}>
                <Link href={`/services/${item.slug}`} className="cs-sb-link">
                  <span className="cs-sb-badge">Service</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default function CaseStudySidebar({ study }: CaseStudySidebarProps) {
  const approvalItems: SidebarItem[] = study.relatedApprovalSlugs
    .map((slug) => approvals.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 3)
    .map(({ slug, name }) => ({ slug, name }));

  const serviceItems: SidebarItem[] = study.relatedServiceSlugs
    .map((slug) => services.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 3)
    .map(({ slug, name }) => ({ slug, name }));

  if (approvalItems.length === 0 && serviceItems.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop sticky rail (hidden below lg) — flex child of the two-column row */}
      <aside aria-label="Related pages" className="cs-spec-rail hidden lg:block">
        <RelatedCards approvalItems={approvalItems} serviceItems={serviceItems} />
      </aside>

      {/* Mobile compact block (visible below lg) */}
      <div className="mt-8 lg:hidden">
        <RelatedCards approvalItems={approvalItems} serviceItems={serviceItems} />
      </div>
    </>
  );
}
