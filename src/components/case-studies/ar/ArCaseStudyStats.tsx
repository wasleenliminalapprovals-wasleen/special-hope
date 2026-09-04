/**
 * ArCaseStudyStats — Arabic Section 2: Stats Strip (case-studies mega-plan
 * Part 5.1 #2 / Step 6b.3).
 *
 * Server component. RTL-safe port of the EN `CaseStudyStats`. Renders the
 * four Arabic facts (`ar.arStats`, authored natively) with the TRUE values as
 * plain HTML text in the SSR markup — always crawlable, never dependent on
 * JavaScript (Part 11.2 gate).
 *
 * Two deliberate Arabic deviations from the EN twin:
 *  1. Icons are assigned from an ARABIC-keyword map (the EN map keys on
 *     English stat labels, which never appear here).
 *  2. `CaseStudyTypewriter` is NOT used — its per-character reveal breaks
 *     Arabic letter joining/ligatures (RTL shaping). Values render as static
 *     text inside the same `.cs-stagger` reveal.
 *
 * @see plans/case-studies-mega-plan.md Part 5.1 #2 / Step 6b.3 / gate 11.2
 */

import {
  Banknote,
  CircleCheck,
  Landmark,
  Ruler,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { CaseStudyStat } from "@/types/case-study";
import CaseStudyReveal from "../CaseStudyReveal";

interface ArCaseStudyStatsProps {
  stats: CaseStudyStat[];
  className?: string;
}

const ICON_MAP: { keywords: string[]; icon: LucideIcon }[] = [
  {
    keywords: [
      "جهة",
      "الجهات",
      "هيئة",
      "البلدية",
      "الدفاع المدني",
      "الموافقة",
      "الرخصة",
      "المجلس",
      "الدائرة",
    ],
    icon: Landmark,
  },
  {
    keywords: ["رسوم", "الرسوم", "تكلفة", "سعر", "درهم", "مبلغ", "ميزانية", "الإجمالي"],
    icon: Banknote,
  },
  {
    keywords: [
      "نطاق",
      "مخطط",
      "المخططات",
      "مستند",
      "مستندات",
      "مساحة",
      "مراجعة",
      "منطقة",
      "تشطيب",
      "أعمال",
    ],
    icon: Ruler,
  },
  {
    keywords: ["حالة", "الحالة", "مدة", "أيام", "تسليم", "موعد", "إنجاز", "زمن"],
    icon: CircleCheck,
  },
];

function iconForLabel(label: string): LucideIcon {
  for (const entry of ICON_MAP) {
    if (entry.keywords.some((keyword) => label.includes(keyword))) {
      return entry.icon;
    }
  }
  return Sparkles;
}

export default function ArCaseStudyStats({
  stats,
  className = "",
}: ArCaseStudyStatsProps) {
  if (stats.length === 0) return null;

  return (
    <section
      aria-labelledby="ar-case-study-facts-heading"
      className={`bg-light-bg ${className}`.trim()}
    >
      <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 md:py-10">
        <h2 id="ar-case-study-facts-heading" className="sr-only">
          حقائق المشروع
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
                    <dt className="text-caption font-medium tracking-wide text-body-text/70">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 font-montserrat text-h3 font-bold leading-tight text-heading-text">
                      {stat.value}
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
