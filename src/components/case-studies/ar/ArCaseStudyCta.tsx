"use client";

/**
 * ArCaseStudyCta — Section 12: CTA / Free Quote (Arabic /ar/ twin).
 *
 * Client component. Arabic RTL-safe twin of `CaseStudyCta` (mega-plan Part 14
 * Step 6b.3). Placements:
 * - `position="mid"` → compact brand-blue inline strip after Section 9. Real
 *   `<a href>` (Next `Link`) to `/ar/free-quote`; `onClick` only fires
 *   `case_study_cta_click` (position=mid) — navigation never depends on JS.
 * - `position="end"` → the full reused `CTASectionArabic` brand-blue band
 *   (fires its own `contact_click` / `quote_*` events via the existing
 *   Arabic free-quote wizard).
 *
 * (Hero placement — `case_study_cta_click` position=hero — lives in
 * `ArCaseStudyHero`, which needs a real anchor for its primary CTA.)
 *
 * @see src/components/case-studies/CaseStudyCta.tsx (EN twin, LOCKED)
 * @see src/components/sections/CTASectionArabic.tsx
 */

import Link from "next/link";
import { FileText } from "lucide-react";
import type { ApprovalCaseStudy, CaseStudyArabicContent } from "@/types/case-study";
import { trackCaseStudyCtaClick } from "@/lib/case-studies";
import CTASectionArabic from "@/components/sections/CTASectionArabic";

interface ArCaseStudyCtaProps {
  study: ApprovalCaseStudy;
  ar: CaseStudyArabicContent;
  position: "mid" | "end";
}

export default function ArCaseStudyCta({
  study,
  ar,
  position,
}: ArCaseStudyCtaProps) {
  if (position === "end") {
    return <CTASectionArabic />;
  }

  return (
    <section aria-labelledby="ar-case-study-mid-cta-heading" className="bg-brand-blue">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <h2
              id="ar-case-study-mid-cta-heading"
              className="text-h3 font-montserrat font-bold text-white"
            >
              هل تحتاج إلى نفس الموافقة لمشروعك؟
            </h2>
            <p className="mt-2 text-body text-white/85">
              احصل على عرض سعر مجاني لمشروع {ar.arProjectType} — دون أي التزام
              أو رسوم خفية.
            </p>
          </div>
          <Link
            href="/ar/free-quote"
            onClick={() =>
              trackCaseStudyCtaClick({ case_slug: study.slug, position: "mid" })
            }
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-cta-amber px-6 py-3 font-montserrat text-body-sm font-bold text-brand-black transition-colors hover:bg-cta-amber-hover"
          >
            <FileText size={20} strokeWidth={1.75} aria-hidden="true" />
            احصل على عرض سعر مجاني
          </Link>
        </div>
      </div>
    </section>
  );
}
