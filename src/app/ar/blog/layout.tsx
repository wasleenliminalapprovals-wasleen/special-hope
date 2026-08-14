/**
 * Arabic blog layout — shared shell for every `/ar/blog` route.
 *
 * Mirrors `src/app/blog/layout.tsx`. Imports the SAME scoped stylesheet
 * (`@/app/blog/blog.css`) — Next.js dedupes the module so the CSS loads
 * exactly once even though both layouts reference it. Wraps every Arabic
 * blog page in `BlogShell` (`.blog-dark` canvas); RTL direction comes from
 * the parent `ar/layout.tsx` (`dir="rtl"`).
 *
 * Title template overrides the `ar/layout` template for blog routes with the
 * "… | وسلين للموافقات" brand suffix.
 *
 * @see src/app/blog/layout.tsx (EN source)
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/blog/blog.css";
import BlogShell from "@/components/blog/BlogShell";

export const metadata: Metadata = {
  title: {
    default: "مدونة موافقات دبي | وسلين للموافقات",
    template: "%s | وسلين للموافقات",
  },
};

export default function ArabicBlogLayout({ children }: { children: ReactNode }) {
  return <BlogShell>{children}</BlogShell>;
}
