"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Client wrapper for the root layout that conditionally renders the
 * English Header/Footer only on non-Arabic routes.
 *
 * The Arabic layout (src/app/ar/layout.tsx) renders its own Header/Footer
 * with locale="ar", so we must NOT duplicate them here.
 */
export default function RootLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isArabicRoute = pathname.startsWith("/ar");

  return (
    <>
      {!isArabicRoute && (
        <>
          <Header locale="en" />

          <main id="main-content">{children}</main>

          <Footer locale="en" />
        </>
      )}

      {isArabicRoute && children}
    </>
  );
}
