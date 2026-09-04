"use client";

/**
 * ArCaseStudyProTip — Arabic PRO TIP callout (case-studies mega-plan Part 7.2 /
 * Step 6b.3).
 *
 * RTL-safe Arabic port of the EN `CaseStudyProTip`: identical perfectly-square
 * drafting-tick styling, `bg-card-bg` + `border-border-light`, small amber chip
 * and `prefers-reduced-motion`-safe CSS — only the visible copy is Arabic
 * ("نصيحة احترافية"). The `tip` content comes from `ar.arProTips` and is
 * rendered verbatim, so the `/ar/` page stays 100% Arabic (Part 10.2).
 *
 * Fires `case_study_pro_tip_view` once when the box enters the viewport —
 * analytics keep the shared EN `case_slug` dimension (Part 9).
 *
 * @see plans/case-studies-mega-plan.md Part 7.2 / Step 6b.3
 */

import { useEffect } from "react";
import { Lightbulb } from "lucide-react";
import type { CaseStudyProTip } from "@/types/case-study";
import { trackCaseStudyProTipView } from "@/lib/case-studies";
import { useInView } from "../use-in-view";

interface ArCaseStudyProTipProps {
  /** Case-study slug (shared EN slug) used as the analytics `case_slug`. */
  slug: string;
  /** Arabic tip content (title + body), from `ar.arProTips`. */
  tip: CaseStudyProTip;
  /** Extra classes (spacing / placement within a section). */
  className?: string;
}

export default function ArCaseStudyProTip({
  slug,
  tip,
  className = "",
}: ArCaseStudyProTipProps) {
  const { ref, inView } = useInView<HTMLElement>();

  useEffect(() => {
    if (inView) {
      trackCaseStudyProTipView({ case_slug: slug, tip: tip.title });
    }
  }, [inView, slug, tip.title]);

  return (
    <aside
      ref={ref}
      aria-label={`نصيحة احترافية: ${tip.title}`}
      className={`cs-pro-tip relative p-6 ${className}`.trim()}
    >
      {/* Corner drafting ticks — L-shaped marks, purely decorative. */}
      <span className="cs-pro-tip-tick cs-pro-tip-tick--tl" aria-hidden="true" />
      <span className="cs-pro-tip-tick cs-pro-tip-tick--tr" aria-hidden="true" />
      <span className="cs-pro-tip-tick cs-pro-tip-tick--bl" aria-hidden="true" />
      <span className="cs-pro-tip-tick cs-pro-tip-tick--br" aria-hidden="true" />

      <span className="cs-pro-tip-chip">
        <Lightbulb size={14} strokeWidth={1.75} aria-hidden="true" />
        نصيحة احترافية
      </span>

      <h4 className="font-montserrat text-h4 font-bold text-heading-text mt-3">
        {tip.title}
      </h4>

      <p className="text-body text-body-text mt-2">{tip.body}</p>
    </aside>
  );
}
