/**
 * Dynamic robots.txt generator — AI-first crawling strategy (AEO).
 *
 * Strategy:
 *   - Allow ALL crawlers on all public HTML paths (we want maximum indexing).
 *   - Block only /api/ (internal API routes, no SEO value).
 *   - Split AI bots into two tiers for Answer Engine Optimization:
 *
 *       1. LIVE SEARCH & CITATION BOTS (PerplexityBot, OAI-SearchBot,
 *          ChatGPT-User, Claude-SearchBot, Claude-User): full site access.
 *          No `Disallow: /`, so they read our HTML in real-time and return
 *          clickable citation links to our Dubai approvals pages.
 *
 *       2. TRAINING / SCRAPER BOTS (GPTBot, Google-Extended, Applebot-Extended,
 *          anthropic-ai, CCBot, Bytespider, FacebookBot): locked to llms.txt
 *          files ONLY (Allow: llms.txt paths + Disallow: /). The specific-path
 *          Allow overrides the blanket Disallow, so they can only read clean,
 *          structured llms.txt data for model training — protecting server
 *          bandwidth on Vercel without losing AI-training visibility.
 *
 *   - Reference the sitemap so every page is discovered.
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md §5 — Technical SEO Foundations
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md §6 — Sitemap & Robots
 */

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

const BASE = SITE.url;

/** llms.txt discovery paths (English + Arabic). */
const LLMS_ALLOW = ["/llms.txt", "/llms-full.txt", "/ar/llms.txt", "/ar/llms-full.txt"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      /* ── 1. Standard search engines: allow everything except /api/ ── */
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },

      /* ── 2. LIVE SEARCH & CITATION BOTS — full HTML access ── */
      {
        userAgent: "PerplexityBot",
        allow: LLMS_ALLOW,
        disallow: "/api/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: LLMS_ALLOW,
        disallow: "/api/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: LLMS_ALLOW,
        disallow: "/api/",
      },
      {
        userAgent: "Claude-SearchBot",
        allow: LLMS_ALLOW,
        disallow: "/api/",
      },
      {
        userAgent: "Claude-User",
        allow: LLMS_ALLOW,
        disallow: "/api/",
      },

      /* ── 3. TRAINING / SCRAPER BOTS — locked to llms.txt ONLY ── */
      {
        userAgent: "GPTBot",
        allow: LLMS_ALLOW,
        disallow: ["/api/", "/"],
      },
      {
        userAgent: "Google-Extended",
        allow: LLMS_ALLOW,
        disallow: ["/api/", "/"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: LLMS_ALLOW,
        disallow: ["/api/", "/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: LLMS_ALLOW,
        disallow: ["/api/", "/"],
      },
      {
        userAgent: "CCBot",
        allow: LLMS_ALLOW,
        disallow: ["/api/", "/"],
      },
      {
        userAgent: "Bytespider",
        allow: LLMS_ALLOW,
        disallow: ["/api/", "/"],
      },
      {
        userAgent: "FacebookBot",
        allow: LLMS_ALLOW,
        disallow: ["/api/", "/"],
      },
    ],

    sitemap: `${BASE}/sitemap.xml`,
  };
}
