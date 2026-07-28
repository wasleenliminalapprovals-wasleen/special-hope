/**
 * Dynamic sitemap.xml generator — all 97+ pages.
 *
 * Generates URLs for every page type using the data-driven approach:
 * - Static pages (home, about-us, contact-us)
 * - Hub pages (approvals, guides, services)
 * - Approval service pages (52) — from @/data/approvals
 * - Guide / Q&A pages (30+) — from @/data/guides
 * - Service pages (5) — from @/data/services
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md for SEO rules
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md for sitemap requirements
 */

import type { MetadataRoute } from "next";
import { approvals } from "@/data/approvals";
import { guides } from "@/data/guides";
import { services } from "@/data/services";
import { SITE } from "@/lib/constants";

const BASE_URL = SITE.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  /* ================================================================
     1. STATIC PAGES
     ================================================================ */

  // Homepage
  entries.push({
    url: BASE_URL,
    lastModified: new Date("2026-07-15"),
    changeFrequency: "weekly",
    priority: 1.0,
  });

  // About Us
  entries.push({
    url: `${BASE_URL}/about-us`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: "monthly",
    priority: 0.5,
  });

  // Contact Us
  entries.push({
    url: `${BASE_URL}/contact-us`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: "monthly",
    priority: 0.5,
  });

  /* ================================================================
     2. HUB PAGES
     ================================================================ */

  entries.push({
    url: `${BASE_URL}/approvals`,
    lastModified: new Date("2026-07-15"),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  entries.push({
    url: `${BASE_URL}/guides`,
    lastModified: new Date("2026-07-15"),
    changeFrequency: "weekly",
    priority: 0.8,
  });

  entries.push({
    url: `${BASE_URL}/services`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: "weekly",
    priority: 0.8,
  });

  /* ================================================================
     3. APPROVAL PAGES — 52 entries from data
     ================================================================ */

  for (const approval of approvals) {
    entries.push({
      url: `${BASE_URL}/approvals/${approval.slug}`,
      lastModified: new Date(approval.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  /* ================================================================
     4. GUIDE / Q&A PAGES — 30+ entries from data
     ================================================================ */

  for (const guide of guides) {
    entries.push({
      url: `${BASE_URL}/guides/${guide.slug}`,
      lastModified: new Date(guide.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  /* ================================================================
     5. SERVICE PAGES — 5 entries from data
     ================================================================ */

  for (const service of services) {
    entries.push({
      url: `${BASE_URL}/services/${service.slug}`,
      lastModified: new Date(service.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  /* ================================================================
     6. GEO FILES — llms.txt & llms-full.txt for AI crawler discovery
     ================================================================ */

  entries.push({
    url: `${BASE_URL}/llms.txt`,
    lastModified: new Date("2026-07-28"),
    changeFrequency: "weekly",
    priority: 0.5,
  });

  entries.push({
    url: `${BASE_URL}/llms-full.txt`,
    lastModified: new Date("2026-07-28"),
    changeFrequency: "weekly",
    priority: 0.5,
  });

  return entries;
}
