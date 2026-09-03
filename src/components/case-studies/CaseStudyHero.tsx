"use client";

/**
 * CaseStudyHero — Section 1: Hero + Direct Answer (Part 5.1 #1).
 *
 * Client component (fires `case_study_view` once when the hero enters the
 * viewport, Part 9.1) that renders:
 *   - Breadcrumb above the H1 (Home > Case Studies > This, from the server)
 *   - Status chip (quoted / in-progress / completed — reads `projectStatus`)
 *   - H1 = primary keyword (`projectTitle`)
 *   - The 2–3 sentence direct answer (GEO-liftable verbatim)
 *   - A real `last updated` line under the H1
 *   - Hero secondary CTA (`case_study_cta_click`, position=hero, Part 8)
 *
 * The hero CTA is a real server-rendered `<a href>` (never JS-only
 * navigation); the onClick only fires the analytics event — the link works
 * with JavaScript disabled.
 */

import { useEffect } from "react";
import Link from "next/link";
import { FileText, CalendarDays } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { ApprovalCaseStudy } from "@/types/case-study";
import type { BreadcrumbItem } from "@/lib/schema";
import {
  CASE_STUDY_STATUS_LABELS,
  trackCaseStudyCtaClick,
  trackCaseStudyView,
} from "@/lib/case-studies";
import { useInView } from "./use-in-view";

interface CaseStudyHeroProps {
  study: ApprovalCaseStudy;
  /** Home > Case Studies > This (3 items) */
  breadcrumbs: BreadcrumbItem[];
}

function statusVariant(
  status: ApprovalCaseStudy["projectStatus"],
): "default" | "success" | "warning" | "outline" {
  if (status === "completed") return "success";
  if (status === "in-progress") return "warning";
  return "outline";
}

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default function CaseStudyHero({ study, breadcrumbs }: CaseStudyHeroProps) {
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
    <section ref={ref} aria-labelledby="case-study-hero-title" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-16">
        {/* Breadcrumb above H1 */}
        <nav aria-label="Breadcrumb" className="mb-6">
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
              {CASE_STUDY_STATUS_LABELS[study.projectStatus]}
            </Badge>
            <span className="inline-flex items-center gap-1.5 text-caption text-body-text/70">
              <CalendarDays size={16} strokeWidth={1.75} aria-hidden="true" />
              Last updated {formatDate(study.lastUpdated)}
            </span>
          </div>

          {/* H1 = primary keyword */}
          <h1
            id="case-study-hero-title"
            className="text-h1 font-montserrat font-bold leading-tight text-heading-text"
          >
            {study.projectTitle}
          </h1>

          {/* Direct answer — self-contained, GEO-liftable verbatim */}
          <p className="mt-6 text-body-lg leading-relaxed text-body-text">{study.directAnswer}</p>

          {/* Hero secondary CTA (position=hero) */}
          <div className="mt-8">
            <Link
              href="/free-quote"
              onClick={() => trackCaseStudyCtaClick({ case_slug: study.slug, position: "hero" })}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-cta-amber px-6 py-3 text-body font-medium text-brand-black transition-colors duration-200 hover:bg-cta-amber-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta-amber focus-visible:ring-offset-2"
              aria-label="Get a free Dubai approval quote for this project type"
            >
              <FileText size={20} strokeWidth={1.75} aria-hidden="true" />
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
