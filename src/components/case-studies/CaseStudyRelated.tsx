"use client";

/**
 * CaseStudyRelated — Section 11: Related (Part 5.1 #11).
 *
 * Client component (fires `case_study_related_click`). Renders:
 * - Up to 3 related case-study cards (`.cs-card-lift`), linked to their pages.
 * - Sentence-anchored related approval + guide links (`.cs-underline-grow`).
 *
 * All links are real server-rendered `<a>` elements (Next `Link`); `onClick`
 * only sends analytics — navigation never depends on JavaScript (Part 2 rule).
 * Anchors use descriptive text ("DDA Approval requirements") — never
 * "click here" (Part 3, internal linking rules).
 */

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import type { ApprovalCaseStudy } from "@/types/case-study";
import { caseStudies } from "@/data/case-studies";
import { approvals } from "@/data/approvals";
import { guides } from "@/data/guides";
import { CASE_STUDY_STATUS_LABELS, caseStudyUrl, trackCaseStudyRelatedClick } from "@/lib/case-studies";
import Badge from "@/components/ui/Badge";
import type { ComponentProps } from "react";

interface CaseStudyRelatedProps {
  study: ApprovalCaseStudy;
}

type BadgeVariant = ComponentProps<typeof Badge>["variant"];

function badgeVariant(status: ApprovalCaseStudy["projectStatus"]): BadgeVariant {
  if (status === "completed") return "success";
  if (status === "in-progress") return "warning";
  return "outline";
}

export default function CaseStudyRelated({ study }: CaseStudyRelatedProps) {
  const relatedCases = study.relatedCaseStudySlugs
    .map((slug) => caseStudies.find((item) => item.slug === slug))
    .filter((item): item is ApprovalCaseStudy => Boolean(item))
    .slice(0, 3);

  const relatedApprovals = study.relatedApprovalSlugs
    .map((slug) => approvals.find((item) => item.slug === slug))
    .filter((item): item is (typeof approvals)[number] => Boolean(item))
    .slice(0, 3);

  const relatedGuideList = study.relatedGuideSlugs
    .map((slug) => guides.find((item) => item.slug === slug))
    .filter((item): item is (typeof guides)[number] => Boolean(item))
    .slice(0, 3);

  if (
    relatedCases.length === 0 &&
    relatedApprovals.length === 0 &&
    relatedGuideList.length === 0
  ) {
    return null;
  }

  return (
    <section aria-labelledby="case-study-related-heading" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-14">
        <h2
          id="case-study-related-heading"
          className="text-h2 font-montserrat font-bold text-heading-text"
        >
          Related Case Studies
        </h2>

        {relatedCases.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCases.map((item) => (
              <Link
                key={item.slug}
                href={caseStudyUrl(item.slug, "en")}
                onClick={() =>
                  trackCaseStudyRelatedClick({
                    case_slug: study.slug,
                    target: `case-study:${item.slug}`,
                  })
                }
                className="cs-card-lift block rounded-md border border-border-light bg-card-bg p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-brand-blue">
                    <FileText size={20} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <Badge variant={badgeVariant(item.projectStatus)}>
                    {CASE_STUDY_STATUS_LABELS[item.projectStatus]}
                  </Badge>
                </div>
                <h3 className="mt-4 font-montserrat text-h4 font-bold leading-snug text-heading-text">
                  {item.projectTitle}
                </h3>
                <p className="mt-2 text-body-sm text-body-text/80">{item.location}</p>
                <span className="cs-underline-grow mt-4 inline-flex items-center gap-1 text-body-sm font-medium text-link-blue">
                  View case study
                  <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
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
                  Related approvals
                </h3>
                <p className="mt-2">
                  Explore the{" "}
                  {relatedApprovals.map((item, index) => (
                    <span key={item.slug}>
                      {index > 0 && ", "}
                      <Link
                        href={`/approvals/${item.slug}`}
                        onClick={() =>
                          trackCaseStudyRelatedClick({
                            case_slug: study.slug,
                            target: `approval:${item.slug}`,
                          })
                        }
                        className="cs-underline-grow font-medium text-link-blue"
                      >
                        {item.name} requirements
                      </Link>
                    </span>
                  ))}{" "}
                  in detail.
                </p>
              </div>
            )}

            {relatedGuideList.length > 0 && (
              <div className="cs-reading-col">
                <h3 className="font-montserrat text-h4 font-bold text-heading-text">
                  Related guides
                </h3>
                <p className="mt-2">
                  Read{" "}
                  {relatedGuideList.map((item, index) => (
                    <span key={item.slug}>
                      {index > 0 && " and "}
                      <Link
                        href={`/guides/${item.slug}`}
                        onClick={() =>
                          trackCaseStudyRelatedClick({
                            case_slug: study.slug,
                            target: `guide:${item.slug}`,
                          })
                        }
                        className="cs-underline-grow font-medium text-link-blue"
                      >
                        {item.title.toLowerCase()}
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
