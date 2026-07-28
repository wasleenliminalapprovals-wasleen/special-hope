/**
 * Dynamic robots.txt generator.
 *
 * Rules:
 * - Allow all crawlers on all public paths
 * - Disallow /api/ (internal API routes)
 * - Point to the generated sitemap.xml
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md §5 — Technical SEO Foundations
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md §6 — Sitemap & Robots
 */

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
