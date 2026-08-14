/**
 * BlogMarquee — full-width horizontal news/authority ticker strip.
 *
 * Server component (no client JS). Mechanics are entirely CSS-driven
 * (src/app/blog/blog.css §8.1):
 *   - `.blog-marquee-track` animates `scrollLeft` 50s linear infinite;
 *   - the track holds TWO identical `.blog-marquee-copy` rows so the
 *     translateX(-50%) end-state lands exactly on a copy boundary
 *     (seamless loop, no visible jump);
 *   - hovering the `.blog-scroller` pauses the animation (hover-pause);
 *   - `prefers-reduced-motion` forces the track static (no jump, no
 *     hidden content) — both copies remain visible side-by-side.
 *
 * A11y: the duplicated second copy is `aria-hidden="true"` so assistive
 * tech reads the content exactly once.
 *
 * @param items — headline strings. Data-driven per DNA RULE 2: Phase 3
 *   (ZONE 1b) wires real category/topic headlines from the approved
 *   categories file; this component is content-agnostic.
 *
 * @see plans/blog-pre-build-plan.md §4.2 (marquee include)
 * @see reference details/blog-design-dna-implementation-plan.md §2.3
 */

interface BlogMarqueeProps {
  /** Headline strings rendered once in the visible copy (duplicated for the loop). */
  items: string[];
}

export default function BlogMarquee({ items }: BlogMarqueeProps) {
  if (!items || items.length === 0) return null;

  const renderCopy = (prefix: "a" | "b") =>
    items.map((item, i) => (
      <span key={`${prefix}-${i}`} className="blog-marquee-item">
        {item}
      </span>
    ));

  return (
    <div className="blog-marquee">
      <div className="blog-scroller">
        <div className="blog-marquee-track">
          <div className="blog-marquee-copy">{renderCopy("a")}</div>
          <div className="blog-marquee-copy" aria-hidden="true">
            {renderCopy("b")}
          </div>
        </div>
      </div>
    </div>
  );
}
