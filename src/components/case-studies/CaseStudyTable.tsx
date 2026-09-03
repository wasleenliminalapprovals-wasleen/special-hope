import type { ReactNode } from "react";

interface CaseStudyTableProps {
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
 * Responsive table primitive — mega-plan Part 7.4.
 *
 * Semantic `<table>` / `<thead>` / `<tbody>` preserved so AI answer engines
 * and screen readers parse the structure cleanly; horizontal scroll on
 * 360–390px viewports via `.cs-table-wrap` (table min-width 480px).
 * Design-token classes only — never raw hex.
 */
export default function CaseStudyTable({
  caption,
  headers,
  rows,
  hideCaption = false,
  className = "",
  tableClassName = "",
}: CaseStudyTableProps) {
  return (
    <div className={`cs-table-wrap ${className}`.trim()}>
      <table className={tableClassName}>
        {caption && (
          <caption
            className={
              hideCaption
                ? "sr-only"
                : "mb-3 text-left text-caption font-medium text-body-text/80"
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
                className="border-b border-border-light px-4 py-3 text-left font-montserrat text-body-sm font-bold text-heading-text"
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
