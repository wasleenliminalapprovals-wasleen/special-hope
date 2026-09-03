/**
 * CaseStudyStats — Section 2: Stats Strip (Part 5.1 #2).
 *
 * Server component. Renders the four facts (authority, quoted fee, scope,
 * status) with the TRUE values in the SSR markup — the numbers are plain HTML
 * text, so they are always crawlable and never depend on JavaScript (Part
 * 11.2 gate: "true numbers server-rendered"). No count-up is used; if one is
 * ever added it must remain a decorative overlay only.
 *
 * Icons are assigned by keyword from the stat label with a safe fallback —
 * never relies on the value, only on the label (which is authored in data).
 */

import { Banknote, CircleCheck, Landmark, Ruler, Sparkles, type LucideIcon } from "lucide-react";
import type { CaseStudyStat } from "@/types/case-study";
import CaseStudyReveal from "./CaseStudyReveal";
import CaseStudyTypewriter from "./CaseStudyTypewriter";

interface CaseStudyStatsProps {
  stats: CaseStudyStat[];
  className?: string;
}

const ICON_MAP: { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ["authority", "civil defence", "municipality", "dewa", "dda", "dcd", "approval", "permit"], icon: Landmark },
  { keywords: ["fee", "quoted", "aed", "cost", "price", "budget", "total"], icon: Banknote },
  { keywords: ["scope", "drawing", "drawings", "document", "document", "revision", "zone", "sqm", "area"], icon: Ruler },
  { keywords: ["status", "timeline", "turnaround", "duration", "days", "weeks", "delivery"], icon: CircleCheck },
];

function iconForLabel(label: string): LucideIcon {
  const lower = label.toLowerCase();
  for (const entry of ICON_MAP) {
    if (entry.keywords.some((keyword) => lower.includes(keyword))) return entry.icon;
  }
  return Sparkles;
}

export default function CaseStudyStats({ stats, className = "" }: CaseStudyStatsProps) {
  if (stats.length === 0) return null;

  return (
    <section aria-labelledby="case-study-facts-heading" className={`bg-light-bg ${className}`.trim()}>
      <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 md:py-10">
        <h2 id="case-study-facts-heading" className="sr-only">
          Project facts
        </h2>
        <CaseStudyReveal className="cs-stagger">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = iconForLabel(stat.label);
            return (
              <div key={stat.label} className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-card-bg text-brand-blue">
                  <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-caption font-medium uppercase tracking-wide text-body-text/70">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-montserrat text-h3 font-bold leading-tight text-heading-text">
                    <CaseStudyTypewriter text={stat.value} />
                  </dd>
                </div>
              </div>
            );
          })}
          </dl>
        </CaseStudyReveal>
      </div>
    </section>
  );
}
