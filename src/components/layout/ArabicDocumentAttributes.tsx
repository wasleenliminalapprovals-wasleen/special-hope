"use client";

import { useEffect } from "react";

/**
 * Client-only helper for Arabic routes.
 *
 * Next.js only allows the ROOT layout to render the <html>/<body> elements.
 * The Arabic segment layout therefore cannot set <html lang="ar-AE" dir="rtl">
 * server-side (that would nest a second <html> inside the root layout's
 * <html> and break hydration). This component updates document.documentElement
 * AFTER hydration — which is safe because useEffect never runs on the server,
 * so server HTML and client HTML stay in sync and no hydration mismatch occurs.
 */
export default function ArabicDocumentAttributes() {
  useEffect(() => {
    document.documentElement.lang = "ar-AE";
    document.documentElement.dir = "rtl";
  }, []);

  return null;
}
