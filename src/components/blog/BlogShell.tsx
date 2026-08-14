/**
 * BlogShell — scoped dark-canvas wrapper for all `/blog` routes.
 *
 * Server component (no client JS). Renders the `.blog-dark` canvas
 * (black + dark-blue gradient, DNA RULE 1) defined in
 * `src/app/blog/blog.css`, which is imported only by
 * `src/app/blog/layout.tsx` (Phase 2) so the white-site `@theme` in
 * `src/app/globals.css` stays untouched.
 *
 * The wrapper is intentionally content-agnostic (no max-width): pages
 * use the `.blog-container` utility for their content column so
 * full-bleed strips like `BlogMarquee` can span the whole canvas.
 *
 * @see plans/blog-pre-build-plan.md §4.1 (BlogShell in layout.tsx)
 * @see reference details/blog-design-dna-implementation-plan.md §2
 */

import type { ReactNode } from "react";

interface BlogShellProps {
  children: ReactNode;
}

export default function BlogShell({ children }: BlogShellProps) {
  return <div className="blog-dark">{children}</div>;
}
