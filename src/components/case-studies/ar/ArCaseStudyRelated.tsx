"use client";

/**
 * ArCaseStudyRelated — Section 11: Related (Arabic /ar/ twin).
 *
 * Client component (fires `case_study_related_click` with EN `case_slug`).
 * Arabic RTL-safe twin of `CaseStudyRelated` (mega-plan Part 14 Step 6b.3).
 * Renders:
 * - Up to 3 related case-study cards (`.cs-card-lift`) linked to their Arabic
 *   `/ar/case-studies/{slug}` pages. Each card resolves its EN twin against
 *   `caseStudiesArabic` and renders the NATIVE Arabic `arTitle` + `arLocation`
 *   — a related case with no authored Arabic entry yet is skipped (never a
 *   404, never an English leak during the phased build).
 * - Sentence-anchored related approval + guide links (`.cs-underline-grow`)
 *   resolved against the Arabic data modules with Arabic names (و joiner).
 *
 * All links are real server-rendered `<a>` elements (Next `Link`); `onClick`
 * only sends analytics — navigation never depends on JavaScript.
 *
 * @see src/components/case-studies/CaseStudyRelated.tsx (EN twin, LOCKED)
 * @see src/components/case-studies/ar/ar-labels.ts
 */

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import type { ComponentProps } from "react";
import type { ApprovalCaseStudy } from "@/types/case-study";
import { caseStudies } from "@/data/case-studies";
import { caseStudiesArabic } from "@/data/case-studies-ar";
import { approvals as approvalsAr } from "@/data/approvals-ar";
import { guides as guidesAr } from "@/data/guides-ar";
import { trackCaseStudyRelatedClick } from "@/lib/case-studies";
import Badge from "@/components/ui/Badge";
import { AR_CASE_STUDY_STATUS_LABELS } from "./ar-labels";

interface ArCaseStudyRelatedProps {
  study: ApprovalCaseStudy;
}

type BadgeVariant = ComponentProps<typeof Badge>["variant"];

function badgeVariant(status: ApprovalCaseStudy["projectStatus"]): BadgeVariant {
  if (status === "completed") return "success";
  if (status === "in-progress") return "warning";
  return "outline";
}

export default function ArCaseStudyRelated({ study }: ArCaseStudyRelatedProps) {
  const relatedCases = study.relatedCaseStudySlugs
    .map((slug) => {
      const en = caseStudies.find((item) => item.slug === slug);
      const arEntry = caseStudiesArabic.find((item) => item.slug === slug);
      if (!en || !arEntry) return null;
      return { en, arTitle: arEntry.arTitle, arLocation: arEntry.arLocation };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 3);

  const relatedApprovals = study.relatedApprovalSlugs
    .map((slug) => {
      const arRel = approvalsAr.find((item) => item.slug === slug);
      if (!arRel) return null;
      return { slug, name: arRel.ar.shortName ?? arRel.ar.name };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 3);

  const relatedGuideList = study.relatedGuideSlugs
    .map((slug) => {
      const gAr = guidesAr.find((item) => item.slug === slug);
      if (!gAr) return null;
      return { slug, title: gAr.ar.title };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 3);

  if (
    relatedCases.length === 0 &&
    relatedApprovals.length === 0 &&
    relatedGuideList.length === 0
  ) {
    return null;
  }

  return (
    <section aria-labelledby="ar-case-study-related-heading" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <h2
          id="ar-case-study-related-heading"
          className="text-h2 font-montserrat font-bold text-heading-text"
        >
          دراسات حالة ذات صلة
        </h2>

        {relatedCases.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCases.map(({ en, arTitle, arLocation }) => (
              <Link
                key={en.slug}
                href={`/ar/case-studies/${en.slug}`}
                onClick={() =>
                  trackCaseStudyRelatedClick({
                    case_slug: study.slug,
                    target: `case-study:${en.slug}`,
                  })
                }
                className="cs-card-lift block rounded-md border border-border-light bg-card-bg p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-brand-blue">
                    <FileText size={20} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <Badge variant={badgeVariant(en.projectStatus)}>
                    {AR_CASE_STUDY_STATUS_LABELS[en.projectStatus]}
                  </Badge>
                </div>
                <h3 className="mt-4 font-montserrat text-h4 font-bold leading-snug text-heading-text">
                  {arTitle}
                </h3>
                <p className="mt-2 text-body-sm text-body-text/80">{arLocation}</p>
                <span className="cs-underline-grow mt-4 inline-flex items-center gap-1 text-body-sm font-medium text-link-blue">
                  عرض دراسة الحالة
                  <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        )}

        {(relatedApprovals.length > 0 || relatedGuideList.length > 0) && (
          <div className="mt-10 flex flex-col gap-6 text-body text-body-text lg:flex-row lg:gap-12">
            {relatedApprovals.length > 0 && (
              <div className="cs-reading-col">
                <h3 className="font-montserrat text-h4 font-bold text-heading-text">
                  موافقات ذات صلة
                </h3>
                <p className="mt-2">
                  اطّلع على{" "}
                  {relatedApprovals.map((item, index) => (
                    <span key={item.slug}>
                      {index > 0 && " و "}
                      <Link
                        href={`/ar/approvals/${item.slug}`}
                        onClick={() =>
                          trackCaseStudyRelatedClick({
                            case_slug: study.slug,
                            target: `approval:${item.slug}`,
                          })
                        }
                        className="cs-underline-grow font-medium text-link-blue"
                      >
                        {item.name}
                      </Link>
                    </span>
                  ))}{" "}
                  بالتفصيل.
                </p>
              </div>
            )}

            {relatedGuideList.length > 0 && (
              <div className="cs-reading-col">
                <h3 className="font-montserrat text-h4 font-bold text-heading-text">
                  أدلة ذات صلة
                </h3>
                <p className="mt-2">
                  اقرأ{" "}
                  {relatedGuideList.map((item, index) => (
                    <span key={item.slug}>
                      {index > 0 && " و "}
                      <Link
                        href={`/ar/guides/${item.slug}`}
                        onClick={() =>
                          trackCaseStudyRelatedClick({
                            case_slug: study.slug,
                            target: `guide:${item.slug}`,
                          })
                        }
                        className="cs-underline-grow font-medium text-link-blue"
                      >
                        {item.title}
                      </Link>
                    </span>
                  ))}
                  .
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
