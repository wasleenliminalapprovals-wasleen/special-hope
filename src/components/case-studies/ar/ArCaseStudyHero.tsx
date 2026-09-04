"use client";

/**
 * ArCaseStudyHero — Section 1: Hero + Direct Answer (Arabic /ar/ twin).
 *
 * Client component. Arabic RTL-safe twin of `CaseStudyHero` (mega-plan Part 14
 * Step 6b.3). Fires `case_study_view` once when the hero enters the viewport
 * (EN `case_slug` is kept for analytics — event-name only). Renders:
 *   - Breadcrumb above the H1 (labels passed in, native Arabic)
 *   - Status chip (Arabic label from `AR_CASE_STUDY_STATUS_LABELS`)
 *   - H1 = Arabic primary keyword (`ar.arTitle`)
 *   - The 2–3 sentence Arabic direct answer (GEO-liftable verbatim)
 *   - A real `آخر تحديث` line (Arabic date via `formatArabicDate`)
 *   - Hero secondary CTA (`case_study_cta_click`, position=hero) → `/ar/free-quote`
 *
 * The hero CTA is a real server-rendered `<a href>` (never JS-only
 * navigation); the onClick only fires the analytics event — the link works
 * with JavaScript disabled.
 *
 * @see src/components/case-studies/CaseStudyHero.tsx (EN twin, LOCKED)
 * @see src/components/case-studies/ar/ar-labels.ts
 */

import { useEffect } from "react";
import Link from "next/link";
import { FileText, CalendarDays } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { ApprovalCaseStudy, CaseStudyArabicContent } from "@/types/case-study";
import type { BreadcrumbItem } from "@/lib/schema";
import { trackCaseStudyCtaClick, trackCaseStudyView } from "@/lib/case-studies";
import { useInView } from "../use-in-view";
import {
  AR_CASE_STUDY_BREADCRUMB_LABEL,
  AR_CASE_STUDY_STATUS_LABELS,
  formatArabicDate,
} from "./ar-labels";

interface ArCaseStudyHeroProps {
  study: ApprovalCaseStudy;
  ar: CaseStudyArabicContent;
  /** Home > Case Studies > This (3 items, Arabic labels) */
  breadcrumbs: BreadcrumbItem[];
}

function statusVariant(
  status: ApprovalCaseStudy["projectStatus"],
): "default" | "success" | "warning" | "outline" {
  if (status === "completed") return "success";
  if (status === "in-progress") return "warning";
  return "outline";
}

export default function ArCaseStudyHero({
  study,
  ar,
  breadcrumbs,
}: ArCaseStudyHeroProps) {
  const { ref, inView } = useInView<HTMLElement>();

  useEffect(() => {
    if (inView) {
      trackCaseStudyView({
        case_slug: study.slug,
        authority: study.authorities.join(", "),
      });
    }
  }, [inView, study.slug, study.authorities]);

  return (
    <section ref={ref} aria-labelledby="ar-case-study-hero-title" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-16">
        {/* Breadcrumb above H1 */}
        <nav aria-label={AR_CASE_STUDY_BREADCRUMB_LABEL} className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-caption text-body-text/80">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={crumb.slug} className="flex items-center gap-2">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-body-text/40">
                      /
                    </span>
                  )}
                  {isLast ? (
                    <span aria-current="page" className="font-medium text-body-text">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.slug}
                      className="cs-underline-grow text-link-blue transition-colors hover:text-brand-blue"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="cs-reading-col">
          {/* Status chip + last-updated line */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge variant={statusVariant(study.projectStatus)}>
              {AR_CASE_STUDY_STATUS_LABELS[study.projectStatus]}
            </Badge>
            <span className="inline-flex items-center gap-1.5 text-caption text-body-text/70">
              <CalendarDays size={16} strokeWidth={1.75} aria-hidden="true" />
              آخر تحديث {formatArabicDate(study.lastUpdated)}
            </span>
          </div>

          {/* H1 = Arabic primary keyword */}
          <h1
            id="ar-case-study-hero-title"
            className="text-h1 font-montserrat font-bold leading-tight text-heading-text"
          >
            {ar.arTitle}
          </h1>

          {/* Direct answer — self-contained, GEO-liftable verbatim */}
          <p className="mt-6 text-body-lg leading-relaxed text-body-text">
            {ar.arDirectAnswer}
          </p>

          {/* Hero secondary CTA (position=hero) */}
          <div className="mt-8">
            <Link
              href="/ar/free-quote"
              onClick={() =>
                trackCaseStudyCtaClick({ case_slug: study.slug, position: "hero" })
              }
              className="inline-flex items-center justify-center gap-2 rounded-md bg-cta-amber px-6 py-3 text-body font-medium text-brand-black transition-colors duration-200 hover:bg-cta-amber-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta-amber focus-visible:ring-offset-2"
              aria-label="احصل على عرض سعر مجاني لموافقة من هذا النوع في دبي"
            >
              <FileText size={20} strokeWidth={1.75} aria-hidden="true" />
              احصل على عرض سعر مجاني
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
