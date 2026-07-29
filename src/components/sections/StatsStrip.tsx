/**
 * StatsStrip — At-a-glance authority facts for approval pages.
 *
 * Displays 4 key facts (authority, timeline, mandatory for, document count)
 * in a horizontal strip with icons. Optimized for AI snippet extraction.
 *
 * @usage
 * ```tsx
 * <StatsStrip stats={[
 *   { label: "Authority", value: "Dubai Municipality (DM)" },
 *   { label: "Timeline", value: "5–10 business days" },
 *   { label: "Mandatory for", value: "All construction projects" },
 *   { label: "Documents Required", value: "8–12 documents" },
 * ]} />
 * ```
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md — Stats Strip (Section 2)
 */

import { Shield, Clock, FileText, CheckCircle } from "lucide-react";
import type { StatFact } from "@/types";

interface StatsStripProps {
  stats: StatFact[];
  className?: string;
}

const iconMap: Record<string, typeof Shield> = {
  authority: Shield,
  timeline: Clock,
  "mandatory-for": CheckCircle,
  "documents-required": FileText,
  "key-focus": Shield,
  validity: Clock,
  purpose: CheckCircle,
  stage: Clock,
  "zone-type": Shield,
  "area": Shield,
  "zones-covered": FileText,
  "system": FileText,
  "location": Shield,
  "zone-focus": Shield,
  "communities": Shield,
  "key-zone": Shield,
};

/** Derive icon key from label text (supports both English and Arabic labels) */
function getIconKey(label: string): string {
  const lower = label.toLowerCase();
  /* English matching */
  if (lower.includes("authority") || lower.includes("focus") || lower.includes("zone") || lower.includes("community")) return "authority";
  if (lower.includes("time") || lower.includes("timeline") || lower.includes("validity") || lower.includes("stage")) return "timeline";
  if (lower.includes("mandatory") || lower.includes("purpose")) return "mandatory-for";
  if (lower.includes("document") || lower.includes("count")) return "documents-required";
  if (lower.includes("area") || lower.includes("location")) return "area";
  if (lower.includes("key")) return "key-focus";
  /* Arabic matching */
  if (lower.includes("جهة") || lower.includes("سلطة") || lower.includes("منطقة") || lower.includes("مجتمع")) return "authority";
  if (lower.includes("مدة") || lower.includes("وقت") || lower.includes("صلاحية") || lower.includes("مرحلة")) return "timeline";
  if (lower.includes("إلزامي") || lower.includes("الغرض") || lower.includes("مطلوب")) return "mandatory-for";
  if (lower.includes("مستند") || lower.includes("وثيقة") || lower.includes("عدد")) return "documents-required";
  if (lower.includes("مساحة") || lower.includes("موقع")) return "area";
  if (lower.includes("رئيسي") || lower.includes("محوري")) return "key-focus";
  return "authority";
}

export default function StatsStrip({ stats, className = "" }: StatsStripProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className={`bg-light-bg ${className}`.trim()}>
      <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const iconKey = getIconKey(stat.label);
            const Icon = iconMap[iconKey] || Shield;

            return (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-md bg-white border border-border-light shadow-card"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-card-bg text-brand-blue shrink-0 mt-0.5">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <p className="text-caption font-medium text-body-text/80 uppercase tracking-wide mb-0.5">
                    {stat.label}
                  </p>
                  <p className="text-body font-montserrat font-bold text-heading-text leading-tight">
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
