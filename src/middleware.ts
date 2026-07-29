/**
 * Middleware — Limited Scope
 *
 * ONLY normalizes /ar → /ar/ (trailing slash).
 * NO Accept-Language auto-redirect.
 * NO root redirect.
 * NO cookie-based redirect.
 * NO locale detection or rewriting.
 *
 * Language switching is handled EXCLUSIVELY by the LanguageSwitcher component.
 *
 * @see plans/arabic-market-domination-reconciled-plan.md §1.2
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ONLY normalize /ar → /ar/ (trailing slash)
  if (pathname === "/ar") {
    return NextResponse.redirect(new URL("/ar/", req.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ar", "/ar/:path*"],
};
