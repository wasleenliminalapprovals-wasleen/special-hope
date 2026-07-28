/**
 * TimelineCostTable — Timeline & cost breakdown table.
 *
 * Shows stage-by-stage processing time and estimated costs.
 * Designed for AI extraction — structured tables are favored by AI answer engines.
 *
 * @usage
 * ```tsx
 * <TimelineCostTable
 *   entries={approval.timelineTable}
 *   disclaimer="Costs are indicative. Contact us for a precise quote."
 * />
 * ```
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md — Section 7: Timeline & cost
 */

import { AlertCircle, Clock, DollarSign } from "lucide-react";

interface TimelineEntry {
  stage: string;
  duration: string;
  cost: string;
  notes?: string;
}

interface TimelineCostTableProps {
  entries: TimelineEntry[];
  /** Optional disclaimer shown below the table */
  disclaimer?: string;
  className?: string;
}

export default function TimelineCostTable({
  entries,
  disclaimer,
  className = "",
}: TimelineCostTableProps) {
  if (!entries || entries.length === 0) return null;

  return (
    <section className={`bg-light-bg ${className}`.trim()}>
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-3">
            Timeline & Cost Breakdown
          </h2>
          <p className="text-body-lg text-body-text mb-8 max-w-3xl">
            Estimated processing times and costs for each stage of the approval
            process. Actual timelines depend on document readiness and authority workload.
          </p>

          <div className="overflow-x-auto rounded-md border border-border-light">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-card-bg border-b border-border-light">
                  <th scope="col" className="px-4 py-3 text-caption font-bold text-heading-text uppercase tracking-wide">
                    Stage
                  </th>
                  <th scope="col" className="px-4 py-3 text-caption font-bold text-heading-text uppercase tracking-wide">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={14} strokeWidth={1.75} />
                      Duration
                    </span>
                  </th>
                  <th scope="col" className="px-4 py-3 text-caption font-bold text-heading-text uppercase tracking-wide">
                    <span className="inline-flex items-center gap-1">
                      <DollarSign size={14} strokeWidth={1.75} />
                      Cost (AED)
                    </span>
                  </th>
                  <th scope="col" className="px-4 py-3 text-caption font-bold text-heading-text uppercase tracking-wide hidden md:table-cell">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {entries.map((entry, index) => (
                  <tr
                    key={index}
                    className="hover:bg-white/80 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-body-sm font-medium text-body-text">
                      {entry.stage}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-body-text">
                      {entry.duration}
                    </td>
                    <td className="px-4 py-3 text-body-sm font-medium text-body-text">
                      {entry.cost}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-body-text/70 hidden md:table-cell">
                      {entry.notes || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {disclaimer && (
            <p className="mt-4 text-caption text-body-text/80 flex items-start gap-1.5">
              <AlertCircle size={14} strokeWidth={1.75} className="shrink-0 mt-0.5" />
              {disclaimer}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
