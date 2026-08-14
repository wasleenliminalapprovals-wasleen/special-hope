/**
 * Blog layout — shared shell for every `/blog` route.
 *
 * Phase 2 (Shared Layout, plan §4 / §9 Phase 2). Responsibilities:
 *   - Import the scoped blog stylesheet `./blog.css` — this is the ONLY
 *     import point; the white-site `@theme` in globals.css stays untouched.
 *   - Wrap every blog page in `BlogShell` (`.blog-dark` canvas).
 *   - Provide a `title` template so child pages get the
 *     "… | Wasleen Approvals" brand suffix (site meta rule).
 *
 * Breadcrumbs: the reusable `BlogBreadcrumbs` component (created in this
 * phase) is rendered by each page with its own trail — Blog index
 * `Home → Blog`, articles `Home → Blog → {Category} → {Article}`,
 * search `Home → Blog → Search` (plan §4.4). Each page pairs it with
 * `BreadcrumbList` JSON-LD. Metadata (title/description/canonical/OG) is
 * per-page via `generateMetadata`/`metadata` in later phases.
 *
 * @see plans/blog-pre-build-plan.md §4 (shared layout) / §9 Phase 2
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./blog.css";
import BlogShell from "@/components/blog/BlogShell";
import ScrollReveal from "@/components/blog/ScrollReveal";

export const metadata: Metadata = {
  title: {
    default: "Dubai Approvals Blog | Wasleen Approvals",
    template: "%s | Wasleen Approvals",
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <BlogShell>
      <ScrollReveal />
      {children}
    </BlogShell>
  );
}
