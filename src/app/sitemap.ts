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
 *   7. Blog (live posts en/ar pairs — hub + every live post URL)
 *
 * SEO best practices applied:
 *   - Every <url> includes self-referencing hreflang (en/ar) + x-default
 *   - x-default always points to the English (canonical) URL
 *   - lastModified: real dates, never artificially bumped
 *   - priority and changefreq omitted — Google ignores them in sitemaps
 *   - All URLs canonical via alternates.x-default
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md  — SEO rules
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md   — Sitemap requirements
 */

import type { MetadataRoute } from "next";
import { approvals } from "@/data/approvals";
import { guides } from "@/data/guides";
import { services } from "@/data/services";
import { loadPseoPages, getPseoArabicEntry } from "@/lib/pseo-data";
import { SITE } from "@/lib/constants";
import { getLivePosts } from "@/lib/blog";
import { getLiveArabicPosts } from "@/lib/blog-ar";

const BASE_URL = SITE.url;

/* ── Helper: generate complete alternates for an en/ar page pair ── */
function alt(enUrl: string, arUrl: string) {
  return {
    languages: {
      en: enUrl,
      ar: arUrl,
      "x-default": enUrl, // x-default always points to English (canonical)
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
) {
  const enUrl = `${BASE_URL}${enPath}`;
  const arUrl = `${BASE_URL}${arPath}`;

  // English
  entries.push({
    url: enUrl,
    lastModified: new Date(enLastMod),
    alternates: alt(enUrl, arUrl),
  });
  // Arabic
  entries.push({
    url: arUrl,
    lastModified: new Date(arLastMod),
    alternates: alt(enUrl, arUrl),
  });
}

/* ================================================================
   MAIN SITEMAP EXPORT
   ================================================================ */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  /* ── 1. Homepage ──────────────────────────────────────────── */
  pushPair(entries, "", "/ar", "2026-07-15", "2026-07-28");

  /* ── 2. Static pages (about-us, contact-us, free-quote) ──── */
  pushPair(entries, "/about-us", "/ar/about-us", "2026-08-18", "2026-08-18");
  pushPair(entries, "/contact-us", "/ar/contact-us", "2026-07-01", "2026-07-28");
  pushPair(entries, "/free-quote", "/ar/free-quote", "2026-08-03", "2026-08-03");
  pushPair(entries, "/license", "/ar/license", "2026-07-31", "2026-07-31");
  pushPair(entries, "/privacy-policy", "/ar/privacy-policy", "2026-08-02", "2026-08-02");

  /* ── 3. Hub pages (approvals, guides, services) ──────────── */
  pushPair(entries, "/approvals", "/ar/approvals", "2026-07-15", "2026-07-28");
  pushPair(entries, "/guides", "/ar/guides", "2026-07-15", "2026-07-28");
  pushPair(entries, "/services", "/ar/services", "2026-07-01", "2026-07-28");

  /* ── 4. Approval pages (52 en + 52 ar = 104) ─────────────── */
  for (const approval of approvals) {
    const slug = approval.slug;
    const lastMod = approval.lastUpdated || "2026-07-01";
    const enUrl = `${BASE_URL}/approvals/${slug}`;
    const arUrl = `${BASE_URL}/ar/approvals/${slug}`;

    entries.push({
      url: enUrl,
      lastModified: new Date(lastMod),
      alternates: alt(enUrl, arUrl),
    });

    entries.push({
      url: arUrl,
      lastModified: new Date(lastMod),
      alternates: alt(enUrl, arUrl),
    });
  }

  /* ── 5. Service pages (5 en + 5 ar = 10) ─────────────────── */
  for (const service of services) {
    const slug = service.slug;
    const lastMod = service.lastUpdated || "2026-07-01";
    const enUrl = `${BASE_URL}/services/${slug}`;
    const arUrl = `${BASE_URL}/ar/services/${slug}`;

    entries.push({
      url: enUrl,
      lastModified: new Date(lastMod),
      alternates: alt(enUrl, arUrl),
    });

    entries.push({
      url: arUrl,
      lastModified: new Date(lastMod),
      alternates: alt(enUrl, arUrl),
    });
  }

  /* ── 6. Guide / Q&A pages (30+ en + 30+ ar = 60+) ────────── */
  for (const guide of guides) {
    const slug = guide.slug;
    const lastMod = guide.lastUpdated || "2026-07-01";
    const enUrl = `${BASE_URL}/guides/${slug}`;
    const arUrl = `${BASE_URL}/ar/guides/${slug}`;

    entries.push({
      url: enUrl,
      lastModified: new Date(lastMod),
      alternates: alt(enUrl, arUrl),
    });

    entries.push({
      url: arUrl,
      lastModified: new Date(lastMod),
      alternates: alt(enUrl, arUrl),
    });
  }

  /* ── 7. Blog (plan §8.3) ───────────────────────────────────── */
  // Only `live` posts enter sitemap.xml (plan §9 Phase 0 #5; PM flips
  // status "ready" → "live" at deploy). lastModified = post.lastUpdated.
  // /blog/search and /ar/blog/search are noindex and excluded. Now that
  // /ar/blog routes ship, both hubs and every live post URL are emitted as
  // en/ar hreflang pairs (38 article URLs at publish: 19 en + 19 ar). The
  // AR URL is only emitted when an Arabic rewrite actually exists (defensive
  // guard mirrors the pSEO section below).
  const liveBlog = getLivePosts();
  const liveArabicBlog = getLiveArabicPosts();
  const liveArabicSlugs = new Set(liveArabicBlog.map((p) => p.slug));
  const blogHubDate = liveBlog[0]?.lastUpdated || "2026-07-28";

  pushPair(entries, "/blog", "/ar/blog", blogHubDate, blogHubDate);

  for (const post of liveBlog) {
    const enUrl = `${BASE_URL}/blog/${post.slug}`;
    const arUrl = `${BASE_URL}/ar/blog/${post.slug}`;
    const hasAr = liveArabicSlugs.has(post.slug);

    entries.push({
      url: enUrl,
      lastModified: new Date(post.lastUpdated),
      alternates: hasAr
        ? alt(enUrl, arUrl)
        : { languages: { en: enUrl, "x-default": enUrl } },
    });

    if (hasAr) {
      entries.push({
        url: arUrl,
        lastModified: new Date(post.lastUpdated),
        alternates: alt(enUrl, arUrl),
      });
    }
  }

  /* ── 8. pSEO pages (en + ar when Arabic exists) ───────────── */
  // pSEO pages render under /guides/{slug}. Slugs are deduped by the
  // generation engine, but we guard against collisions with existing
  // guides so the sitemap never lists a URL twice.
  const guideSlugs = new Set(guides.map((g) => g.slug));

  for (const page of loadPseoPages()) {
    if (guideSlugs.has(page.slug)) continue;

    const lastMod =
      page.lastVerified && page.lastVerified !== "pending"
        ? page.lastVerified
        : new Date().toISOString().slice(0, 10);

    const enUrl = `${BASE_URL}/guides/${page.slug}`;
    const arEntry = getPseoArabicEntry(page.slug);
    const arUrl = `${BASE_URL}/ar/guides/${page.slug}`;

    entries.push({
      url: enUrl,
      lastModified: new Date(lastMod),
      alternates: arEntry
        ? alt(enUrl, arUrl)
        : { languages: { en: enUrl, "x-default": enUrl } },
    });

    if (arEntry) {
      entries.push({
        url: arUrl,
        lastModified: new Date(lastMod),
        alternates: alt(enUrl, arUrl),
      });
    }
  }

  return entries;
}
