import type { ReactNode } from "react";

interface ArCaseStudyTableProps {
  /** Optional caption — visible by default, or visually hidden via `hideCaption`. */
  caption?: string;
  /** Column headers (each rendered as a `<th scope="col">`). */
  headers: string[];
  /** Body rows — one array per row; each item renders as a `<td>`. */
  rows: ReactNode[][];
  /** Visually hide the caption while keeping it announced to screen readers. */
  hideCaption?: boolean;
  /** Extra classes (spacing / placement) — applied to the scroll wrapper. */
  className?: string;
  /** Extra classes applied to the `<table>` element itself (e.g. row-reveal wiring). */
  tableClassName?: string;
}

/**
 * Responsive table primitive — Arabic RTL-safe twin of `CaseStudyTable`
 * (mega-plan Part 14 Step 6b.2). Shares the exact `.cs-table-wrap` /
 * semantic `<table>` / `<thead>` / `<tbody>` structure and design-token
 * classes of the EN primitive so AI answer engines and screen readers parse
 * `/ar/` tables identically.
 *
 * RTL difference: the caption and `<th>` cells use logical `text-start`
 * (the EN twin uses physical `text-left`). On the `dir="rtl"` Arabic pages
 * `text-start` resolves to the right edge, which is what native Arabic
 * table headers require.
 *
 * @see src/components/case-studies/CaseStudyTable.tsx (EN twin, LOCKED)
 */
export default function ArCaseStudyTable({
  caption,
  headers,
  rows,
  hideCaption = false,
  className = "",
  tableClassName = "",
}: ArCaseStudyTableProps) {
  return (
    <div className={`cs-table-wrap ${className}`.trim()}>
      <table className={tableClassName}>
        {caption && (
          <caption
            className={
              hideCaption
                ? "sr-only"
                : "mb-3 text-start text-caption font-medium text-body-text/80"
            }
          >
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-card-bg">
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="border-b border-border-light px-4 py-3 text-start font-montserrat text-body-sm font-bold text-heading-text"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border-light">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 align-top text-body-sm text-body-text"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
