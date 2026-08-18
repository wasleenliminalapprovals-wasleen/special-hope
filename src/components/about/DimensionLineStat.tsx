/**
 * DimensionLineStat — A3 dimension-line stat visual (Sheet 05).
 * Plan: plans/about-us-redesign-mega-plan.md §4.1 / §9 Phase B (B3)
 *
 * Wraps CountUp in an architectural "measurement annotation":
 *   number → vertical leader (with up-pointing arrowhead) →
 *   horizontal dimension line with end ticks → label.
 *
 * - The number stays real DOM text via CountUp (screen reader + AI
 *   parse; Q10 no-JS shows the SSR final value).
 * - In RTL the arrowhead flips vertically (Q6) via the `[dir="rtl"]`
 *   rule in about.css.
 * - Locale-agnostic: all copy comes from typed props; layout uses
 *   logical properties only.
 */
import CountUp from "./CountUp";

export interface DimensionLineStatProps {
  /** Numeric value — stays real DOM text via CountUp. */
  value: number;
  /** Symbol rendered after the number (e.g. "+"), aria-hidden. */
  suffix: string;
  /** Caption below the dimension line. */
  label: string;
  /** Optional extra classes on the <figure>. */
  className?: string;
}

export default function DimensionLineStat({
  value,
  suffix,
  label,
  className = "",
}: DimensionLineStatProps) {
  return (
    <figure className={`about-dim-stat flex flex-col items-center text-center ${className}`}>
      <span className="about-dim-number font-roboto-mono text-4xl font-bold tabular-nums text-(--about-heading)">
        <CountUp value={value} />
        {suffix ? (
          <span aria-hidden="true" className="about-dim-suffix">
            {suffix}
          </span>
        ) : null}
      </span>
      <span aria-hidden="true" className="about-dim-leader" />
      <span aria-hidden="true" className="about-dim-line" />
      <figcaption className="about-dim-label font-roboto-mono text-xs uppercase tracking-wider text-(--about-ink-soft)">
        {label}
      </figcaption>
    </figure>
  );
}
