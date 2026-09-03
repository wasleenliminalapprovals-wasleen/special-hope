"use client";

/**
 * CaseStudyCta — Section 12: CTA / Free Quote (Part 5.1 #12, Part 8).
 *
 * Reuses the EXISTING `CTASection` (and its free-quote wizard events) — no
 * rebuild. Placements:
 * - `position="mid"` → compact inline strip after Section 9. Real `<a href>`
 *   (Next `Link`) to `/free-quote`; `onClick` only fires `case_study_cta_click`
 *   (position=mid) — navigation never depends on JavaScript.
 * - `position="end"` → the full reused `CTASection` brand-blue band (fires its
 *   own `contact_click` / `quote_*` events via the existing wizard).
 *
 * (Hero placement — `case_study_cta_click` position=hero — lives in
 * `CaseStudyHero`, which needs a real anchor for its primary CTA.)
 */

import Link from "next/link";
import { FileText } from "lucide-react";
import type { ApprovalCaseStudy } from "@/types/case-study";
import { trackCaseStudyCtaClick } from "@/lib/case-studies";
import CTASection from "@/components/sections/CTASection";

interface CaseStudyCtaProps {
  study: ApprovalCaseStudy;
  position: "mid" | "end";
}

export default function CaseStudyCta({ study, position }: CaseStudyCtaProps) {
  if (position === "end") {
    return <CTASection />;
  }

  return (
    <section aria-labelledby="case-study-mid-cta-heading" className="bg-brand-blue">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <h2
              id="case-study-mid-cta-heading"
              className="text-h3 font-montserrat font-bold text-white"
            >
              Need the same approval handled for you?
            </h2>
            <p className="mt-2 text-body text-white/85">
              Get a free quote for your {study.projectType.toLowerCase()} project —
              no obligation, no hidden fees.
            </p>
          </div>
          <Link
            href="/free-quote"
            onClick={() =>
              trackCaseStudyCtaClick({ case_slug: study.slug, position: "mid" })
            }
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-cta-amber px-6 py-3 font-montserrat text-body-sm font-bold text-brand-black transition-colors hover:bg-cta-amber-hover"
          >
            <FileText size={20} strokeWidth={1.75} aria-hidden="true" />
            Get Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
