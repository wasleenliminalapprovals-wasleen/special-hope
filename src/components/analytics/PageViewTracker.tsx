/**
 * PageViewTracker — fires `page_view` event on every client-side route change.
 *
 * Mount this ONCE in `app/layout.tsx` inside `<body>`.
 * Must be wrapped in `<Suspense>` (useSearchParams requirement).
 *
 * @see /reference details/analytics-tracking.md (Section 2)
 */

"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url =
      pathname +
      (searchParams.toString() ? `?${searchParams.toString()}` : "");

    sendGTMEvent({
      event: "page_view",
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
