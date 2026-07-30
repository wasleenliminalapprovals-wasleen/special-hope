/**
 * Unified sitemap.xml — single-file generator for ~190 bilingual pages.
 *
 * Google recommends a single sitemap up to 50,000 URLs / 50 MB. This
 * file serves everything in one go, eliminating the split-sitemap routing
 * issues that were causing /sitemap.xml → 404 and /sitemap/1.xml → truncated output.
 *
 * Structure (all pages en + ar):
 *   1. Homepage (2)
 *   2. Static pages (about-us, contact-us — 4)
 *   3. Hub pages (approvals, guides, services — 6)
 *   4. Approval pages (52 services × 2 languages = 104)
 *   5. Service pages (5 × 2 = 10)
 *   6. Guide / Q&A pages (30+ × 2 = 60+)
 *
 * SEO best practices applied:
 *   - lastModified: real dates, never artificially bumped
 *   - changeFrequency: weekly for hubs/home, monthly for content pages
 *   - priority: 1.0 (homepage) → 0.9 (hubs/ar-home) → 0.8 (approvals) → 0.7 (guides/services) → 0.6 (static)
 *   - alternates.languages: en-AE ↔ ar-AE with x-default
 *   - All URLs canonical via alternates.x-default
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md  — SEO rules
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md   — Sitemap requirements
 */

import type { MetadataRoute } from "next";
import { approvals } from "@/data/approvals";
import { guides } from "@/data/guides";
import { services } from "@/data/services";
import { SITE } from "@/lib/constants";

const BASE_URL = SITE.url;

/* ── Helper: generate alternates object ──────────────────────── */
function alt(path: string, arPath: string, defaultPath: string) {
  return {
    languages: {
      "ar-AE": `${BASE_URL}${arPath}`,
      "x-default": `${BASE_URL}${defaultPath}`,
    },
  };
}

/* ── Helper: push en + ar pair ───────────────────────────────── */
function pushPair(
  entries: MetadataRoute.Sitemap,
  enPath: string,
  arPath: string,
  enLastMod: string,
  arLastMod: string,
  freq: "weekly" | "monthly" | "yearly",
  enPriority: number,
  arPriority: number,
) {
  // English
  entries.push({
    url: `${BASE_URL}${enPath}`,
    lastModified: new Date(enLastMod),
    changeFrequency: freq,
    priority: enPriority,
    alternates: alt(enPath, arPath, enPath),
  });
  // Arabic
  entries.push({
    url: `${BASE_URL}${arPath}`,
    lastModified: new Date(arLastMod),
    changeFrequency: freq,
    priority: arPriority,
    alternates: alt(arPath, enPath, enPath),
  });
}

/* ================================================================
   MAIN SITEMAP EXPORT
   ================================================================ */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  /* ── 1. Homepage ──────────────────────────────────────────── */
  // Priority 1.0 = only the primary canonical homepage
  // Arabic homepage gets 0.9 — still high but signals en as primary
  pushPair(entries, "", "/ar", "2026-07-15", "2026-07-28", "weekly", 1.0, 0.9);

  /* ── 2. Static pages (about-us, contact-us) ──────────────── */
  // Priority 0.6 — stable content, low change frequency
  pushPair(entries, "/about-us", "/ar/about-us", "2026-07-01", "2026-07-28", "monthly", 0.6, 0.5);
  pushPair(entries, "/contact-us", "/ar/contact-us", "2026-07-01", "2026-07-28", "monthly", 0.6, 0.5);

  /* ── 3. Hub pages (approvals, guides, services) ──────────── */
  // Priority 0.9 / 0.8 — these are gateway pages for topical clusters.
  // Weekly change frequency signals freshness to crawlers.
  pushPair(entries, "/approvals", "/ar/approvals", "2026-07-15", "2026-07-28", "weekly", 0.9, 0.8);
  pushPair(entries, "/guides", "/ar/guides", "2026-07-15", "2026-07-28", "weekly", 0.8, 0.7);
  pushPair(entries, "/services", "/ar/services", "2026-07-01", "2026-07-28", "weekly", 0.8, 0.7);

  /* ── 4. Approval pages (52 en + 52 ar = 104) ─────────────── */
  // Priority 0.8 / 0.7 — these are the core money pages.
  // Each approval gets its own lastModified from the data source.
  for (const approval of approvals) {
    const slug = approval.slug;
    const lastMod = approval.lastUpdated || "2026-07-01";

    // English
    entries.push({
      url: `${BASE_URL}/approvals/${slug}`,
      lastModified: new Date(lastMod),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "ar-AE": `${BASE_URL}/ar/approvals/${slug}`,
          "x-default": `${BASE_URL}/approvals/${slug}`,
        },
      },
    });

    // Arabic
    entries.push({
      url: `${BASE_URL}/ar/approvals/${slug}`,
      lastModified: new Date(lastMod),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "en-AE": `${BASE_URL}/approvals/${slug}`,
          "x-default": `${BASE_URL}/approvals/${slug}`,
        },
      },
    });
  }

  /* ── 5. Service pages (5 en + 5 ar = 10) ─────────────────── */
  // Priority 0.7 / 0.6 — complementary services to approvals.
  for (const service of services) {
    const slug = service.slug;
    const lastMod = service.lastUpdated || "2026-07-01";

    // English
    entries.push({
      url: `${BASE_URL}/services/${slug}`,
      lastModified: new Date(lastMod),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "ar-AE": `${BASE_URL}/ar/services/${slug}`,
          "x-default": `${BASE_URL}/services/${slug}`,
        },
      },
    });

    // Arabic
    entries.push({
      url: `${BASE_URL}/ar/services/${slug}`,
      lastModified: new Date(lastMod),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "en-AE": `${BASE_URL}/services/${slug}`,
          "x-default": `${BASE_URL}/services/${slug}`,
        },
      },
    });
  }

  /* ── 6. Guide / Q&A pages (30+ en + 30+ ar = 60+) ────────── */
  // Priority 0.7 / 0.6 — these target AI search engines (Google AI Overviews,
  // ChatGPT Search, Perplexity) and benefit from fresh lastModified dates.
  for (const guide of guides) {
    const slug = guide.slug;
    const lastMod = guide.lastUpdated || "2026-07-01";

    // English
    entries.push({
      url: `${BASE_URL}/guides/${slug}`,
      lastModified: new Date(lastMod),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "ar-AE": `${BASE_URL}/ar/guides/${slug}`,
          "x-default": `${BASE_URL}/guides/${slug}`,
        },
      },
    });

    // Arabic
    entries.push({
      url: `${BASE_URL}/ar/guides/${slug}`,
      lastModified: new Date(lastMod),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "en-AE": `${BASE_URL}/guides/${slug}`,
          "x-default": `${BASE_URL}/guides/${slug}`,
        },
      },
    });
  }

  return entries;
}
