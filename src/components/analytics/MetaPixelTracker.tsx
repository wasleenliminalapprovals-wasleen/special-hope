/**
 * MetaPixelTracker — fires Meta Pixel events on client-side route changes.
 *
 * - Fires `PageView` on EVERY route change, including the first mount. The
 *   base code in the root layout intentionally contains no inline PageView,
 *   so this guarantees exactly one PageView per page view (Meta's documented
 *   SPA pattern) and avoids the double-fire a base-code inline track would
 *   cause on first load.
 * - Fires `ViewContent` when the route is a content page — `/approvals/*`,
 *   `/guides/*`, `/services/*` and their Arabic equivalents (`/ar/...`).
 *
 * Mount this ONCE in `src/app/layout.tsx` inside `<body>` (which already
 * wraps `/ar` routes) — never in `src/app/ar/layout.tsx`. Must be wrapped in
 * `<Suspense>` (useSearchParams requirement).
 *
 * @see plans/meta-pixel-implementation-plan.md §4
 * @see /reference details/analytics-tracking.md (Section 8 — Meta Pixel)
 */

"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { metaPageView, metaViewContent } from "@/lib/meta-pixel";

/** Map a pathname to a Meta content_type, or null for non-content routes. */
function getContentType(pathname: string): string | null {
  const p = pathname.toLowerCase();
  if (p.startsWith("/approvals") || p.startsWith("/ar/approvals")) return "approval";
  if (p.startsWith("/guides") || p.startsWith("/ar/guides")) return "guide";
  if (p.startsWith("/services") || p.startsWith("/ar/services")) return "service";
  return null;
}

export default function MetaPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    metaPageView();

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    const contentType = getContentType(pathname);
    if (contentType) {
      metaViewContent({
        content_name: url,
        content_type: contentType,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
