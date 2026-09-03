"use client";

import { useEffect } from "react";
import { Lightbulb } from "lucide-react";
import type { CaseStudyProTip } from "@/types/case-study";
import { trackCaseStudyProTipView } from "@/lib/case-studies";
import { useInView } from "./use-in-view";

interface CaseStudyProTipProps {
  /** Case-study slug used as the analytics `case_slug` dimension. */
  slug: string;
  /** The tip content (title + body). */
  tip: CaseStudyProTip;
  /** Extra classes (spacing / placement within a section). */
  className?: string;
}

/**
 * PRO TIP callout — mega-plan Part 7.2.
 *
 * Perfectly square (right-angled), corner drafting ticks, `bg-card-bg` +
 * `border-border-light`, small amber `PRO TIP` chip. No rotation, no tilt —
 * precision reads as competence. The small amber chip is the single amber
 * carve-out allowed outside CTAs (documented in case-studies.css).
 *
 * Fires `case_study_pro_tip_view` once when the box enters the viewport.
 */
export default function CaseStudyProTip({ slug, tip, className = "" }: CaseStudyProTipProps) {
  const { ref, inView } = useInView<HTMLElement>();

  useEffect(() => {
    if (inView) {
      trackCaseStudyProTipView({ case_slug: slug, tip: tip.title });
    }
  }, [inView, slug, tip.title]);

  return (
    <aside
      ref={ref}
      aria-label={`Pro tip: ${tip.title}`}
      className={`cs-pro-tip relative p-6 ${className}`.trim()}
    >
      {/* Corner drafting ticks — L-shaped marks, purely decorative. */}
      <span className="cs-pro-tip-tick cs-pro-tip-tick--tl" aria-hidden="true" />
      <span className="cs-pro-tip-tick cs-pro-tip-tick--tr" aria-hidden="true" />
      <span className="cs-pro-tip-tick cs-pro-tip-tick--bl" aria-hidden="true" />
      <span className="cs-pro-tip-tick cs-pro-tip-tick--br" aria-hidden="true" />

      <span className="cs-pro-tip-chip">
        <Lightbulb size={14} strokeWidth={1.75} aria-hidden="true" />
        Pro tip
      </span>

      <h4 className="font-montserrat text-h4 font-bold text-heading-text mt-3">
        {tip.title}
      </h4>

      <p className="text-body text-body-text mt-2">{tip.body}</p>
    </aside>
  );
}
