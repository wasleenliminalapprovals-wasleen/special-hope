import type { ReactNode } from "react";

interface BlueprintGridProps {
  children?: ReactNode;
  /** Fade the bottom edge of the grid into the page background. */
  fadeBottom?: boolean;
  /** Extra classes merged onto the wrapper. */
  className?: string;
}

/**
 * BlueprintGrid — drawing-sheet backdrop primitive (Phase B1).
 *
 * Server component. Provides the blueprint-grid background, four corner crop
 * marks and an optional bottom fade behind arbitrary content.
 *
 * Locale-agnostic: the crop marks use logical start/end positioning so they
 * track RTL automatically (no JS locale conditionals, no physical left/right).
 *
 * Token-dependent visuals (grid lines, ink, fade) are defined in
 * src/components/about/about.css through the semantic `--about-*` custom
 * properties, which switch on `data-theme="day" | "night"` (Phase B1a).
 */
export default function BlueprintGrid({
  children,
  fadeBottom = false,
  className = "",
}: BlueprintGridProps) {
  return (
    <div
      className={`about-blueprint-grid relative overflow-hidden ${
        fadeBottom ? "about-blueprint-fade" : ""
      } ${className}`.trim()}
    >
      <span
        aria-hidden="true"
        className="about-crop-mark about-crop-mark--tl absolute top-0 start-0"
      />
      <span
        aria-hidden="true"
        className="about-crop-mark about-crop-mark--tr absolute top-0 end-0"
      />
      <span
        aria-hidden="true"
        className="about-crop-mark about-crop-mark--bl absolute bottom-0 start-0"
      />
      <span
        aria-hidden="true"
        className="about-crop-mark about-crop-mark--br absolute bottom-0 end-0"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
