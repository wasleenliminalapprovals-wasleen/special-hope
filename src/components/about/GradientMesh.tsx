/**
 * GradientMesh — B2 drifting gradient layer.
 * Plan: plans/about-us-redesign-mega-plan.md §4.1 / §9 Phase B
 *
 * Decorative, theme-agnostic background wash for the About sheets
 * (Sheet 01 hero "gradient drift", reused wherever the assembly wants
 * a soft colour wash behind content).
 *
 * - Compositor-friendly: ONLY `transform: translate3d` is animated
 *   (CSS keyframes in about.css) — never filter/opacity — so the
 *   drift stays on the compositor thread.
 * - Zero JS: pure presentational Server Component; the drift is driven
 *   by CSS animation, so there is no client hydration cost.
 * - Locale-agnostic + RTL-safe: no text; blobs are symmetric radial
 *   washes positioned with logical inset-block/inline props only.
 * - aria-hidden: purely decorative, blobs never capture events.
 *
 * Usage: place inside a `position:relative; overflow-hidden` parent;
 * the mesh fills it with `absolute inset-0`.
 */
export default function GradientMesh({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`about-grad-mesh pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="about-grad-blob about-grad-blob--deep" />
      <div className="about-grad-blob about-grad-blob--steel" />
      <div className="about-grad-blob about-grad-blob--sky" />
      <div className="about-grad-blob about-grad-blob--amber" />
    </div>
  );
}
