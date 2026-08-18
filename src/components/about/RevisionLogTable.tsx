/**
 * RevisionLogTable — Sheet 03 "Wasleen Group" revision-log table (server component).
 *
 * Design (plans/about-us-redesign-mega-plan.md Sheet 03, line 86):
 * - The plan explicitly requires a **real semantic `<table>`** (not card columns):
 *   REV / DIVISION / SCOPE / STATUS rows, Roboto Mono, rows hover-highlight,
 *   and the current division marked with a "YOU ARE HERE" dot + amber status.
 * - A real table is deliberate, not incidental: `<caption>`, `<th scope="col">`
 *   and `<th scope="row">` give screen readers and AI answer engines the same
 *   column/row semantics the data has. The visible text is the schema text.
 * - The "YOU ARE HERE" row (row C in EN / AR data) is marked with
 *   `aria-current="true"`, an amber `border-inline-start` (logical property,
 *   mirrors in RTL) and the shared `.about-here-dot` marker — the same dot
 *   used in Sheet 02, which already carries the reduced-motion `animation: none`
 *   guard in about.css.
 *
 * Responsive (360–390px first):
 * - The `<table>` keeps its full semantics on mobile via an `overflow-x-auto`
 *   wrapper + `min-w-[600px]` on the table itself (standard data-table
 *   treatment). The plan's alternative — collapsing to cards — would destroy
 *   table semantics, so it is deliberately not used here.
 *
 * Motion / accessibility:
 * - Row hover-highlight is gated behind `@media (hover: hover)` in about.css so
 *   touch devices never leave a sticky hover state behind.
 * - No scroll-triggered animation (unlike Sheet 02's RevisionLogBlock): the
 *   table is data, and data stays static. Static rendering is also Q10 /
 *   no-JS / reduced-motion safe by construction.
 *
 * Locale-agnostic: every string (caption, headers, row cells, status) arrives
 * via props from about.ts / about-ar.ts. Uses only logical positioning
 * utilities and logical CSS properties — RTL-safe with zero code changes.
 */

import type { AboutContent } from "@/data/about";

type RevisionLogRow = AboutContent["group"]["tableRows"][number];

interface RevisionLogTableProps {
  /** Localized caption — "GROUP REVISION LOG" / "سجل مراجعات المجموعة". */
  caption: string;
  /** Localized column headers — REV / DIVISION / SCOPE / STATUS (or AR). */
  headers: string[];
  /** Revision rows (REV / division / scope / status). */
  rows: RevisionLogRow[];
}

export default function RevisionLogTable({
  caption,
  headers,
  rows,
}: RevisionLogTableProps) {
  return (
    <div className="about-revlog-table-wrap overflow-x-auto">
      <table className="about-revlog-table w-full min-w-[600px] border-collapse font-roboto-mono text-start text-xs">
        <caption className="about-revlog-table-caption">{caption}</caption>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="about-revlog-table-head">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={`${row.rev}-${row.division}`}
              aria-current={row.youAreHere ? "true" : undefined}
              className={`about-revlog-table-row ${
                row.youAreHere ? "about-revlog-table-row--here" : ""
              }`}
            >
              <th scope="row" className="about-revlog-table-rev">
                {row.rev}
              </th>
              <td className="about-revlog-table-division">{row.division}</td>
              <td className="about-revlog-table-scope">{row.scope}</td>
              <td className="about-revlog-table-status">
                <span className="about-revlog-table-status-text">
                  {row.youAreHere && (
                    <span
                      aria-hidden="true"
                      className="about-here-dot about-table-here-dot"
                    />
                  )}
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
