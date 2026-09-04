/**
 * ArCaseStudySidebar — Part 18.6: Related-pages sidebar (Arabic /ar/ twin).
 *
 * Server component. Arabic RTL-safe twin of `CaseStudySidebar` (mega-plan
 * Part 14 Step 6b.3). Sticky desktop rail of related-page links inside the
 * "What We Did" section (`.cs-spec-rail`), plus a compact mobile block below —
 * exactly like the EN twin.
 *
 * Resolves `relatedApprovalSlugs` / `relatedServiceSlugs` against the ARABIC
 * data modules (`approvals-ar.ts`, `services-ar.ts`) so every link targets an
 * existing `/ar/` page (never a 404) and shows the native Arabic name (no
 * English leaks onto the `/ar/` page). All links are real server-rendered
 * `<a>` elements (Next `Link`) with descriptive text.
 *
 * @see src/components/case-studies/CaseStudySidebar.tsx (EN twin, LOCKED)
 * @see src/data/approvals-ar.ts / src/data/services-ar.ts
 */

import Link from "next/link";
import type { ApprovalCaseStudy } from "@/types/case-study";
import { approvals as approvalsAr } from "@/data/approvals-ar";
import { services as servicesAr } from "@/data/services-ar";

interface ArCaseStudySidebarProps {
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
          <h3 className="cs-sb-heading">الموافقات ذات الصلة</h3>
          <ul className="cs-sb-list">
            {approvalItems.map((item) => (
              <li key={item.slug}>
                <Link href={`/ar/approvals/${item.slug}`} className="cs-sb-link">
                  <span className="cs-sb-badge">موافقة</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {serviceItems.length > 0 && (
        <div className="cs-sb-card mt-4">
          <h3 className="cs-sb-heading">خدماتنا</h3>
          <ul className="cs-sb-list">
            {serviceItems.map((item) => (
              <li key={item.slug}>
                <Link href={`/ar/services/${item.slug}`} className="cs-sb-link">
                  <span className="cs-sb-badge">خدمة</span>
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

export default function ArCaseStudySidebar({ study }: ArCaseStudySidebarProps) {
  const approvalItems: SidebarItem[] = study.relatedApprovalSlugs
    .map((slug) => approvalsAr.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 3)
    .map((item) => ({ slug: item.slug, name: item.ar.name }));

  const serviceItems: SidebarItem[] = study.relatedServiceSlugs
    .map((slug) => servicesAr.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 3)
    .map((item) => ({ slug: item.slug, name: item.ar.name }));

  if (approvalItems.length === 0 && serviceItems.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop sticky rail (hidden below lg) — flex child of the two-column row */}
      <aside aria-label="صفحات ذات صلة" className="cs-spec-rail hidden lg:block">
        <RelatedCards approvalItems={approvalItems} serviceItems={serviceItems} />
      </aside>

      {/* Mobile compact block (visible below lg) */}
      <div className="mt-8 lg:hidden">
        <RelatedCards approvalItems={approvalItems} serviceItems={serviceItems} />
      </div>
    </>
  );
}
