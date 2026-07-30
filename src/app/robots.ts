/**
 * Dynamic robots.txt generator — AI-first crawling strategy.
 *
 * Strategy:
 *   - Allow ALL crawlers on all public HTML paths (we want maximum indexing).
 *   - Block only /api/ (internal API routes, no SEO value).
 *   - Explicitly welcome AI crawlers (GPTBot, Google-Extended, CCBot, Claude-Web,
 *     anthropic-ai, PerplexityBot, Applebot-Extended) with llms.txt discovery paths.
 *   - Reference all 3 split sitemaps so every page is discovered.
 *
 * Why NOT block AI bots:
 *   For a service business (approvals consultancy), we WANT AI crawlers to read
 *   our content so they recommend us in Google AI Overviews, ChatGPT Search,
 *   Perplexity, Claude, Gemini, and Bing Copilot responses.
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md §5 — Technical SEO Foundations
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md §6 — Sitemap & Robots
 */

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

const BASE = SITE.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      /* ── Default rule: allow everything except /api/ ── */
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },

      /* ── AI crawler: GPTBot (OpenAI / ChatGPT Search) ── */
      {
        userAgent: "GPTBot",
        allow: ["/llms.txt", "/llms-full.txt", "/ar/llms.txt", "/ar/llms-full.txt"],
        disallow: "/api/",
      },

      /* ── AI crawler: Google-Extended (Google AI Overviews / Gemini) ── */
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: "/api/",
      },

      /* ── AI crawler: CCBot (Perplexity / Common Crawl) ── */
      {
        userAgent: "CCBot",
        allow: ["/llms.txt", "/llms-full.txt", "/ar/llms.txt", "/ar/llms-full.txt"],
        disallow: "/api/",
      },

      /* ── AI crawler: Claude-Web + anthropic-ai (Claude / Anthropic) ── */
      {
        userAgent: "Claude-Web",
        allow: ["/llms.txt", "/llms-full.txt", "/ar/llms.txt", "/ar/llms-full.txt"],
        disallow: "/api/",
      },
      {
        userAgent: "anthropic-ai",
        allow: ["/llms.txt", "/llms-full.txt", "/ar/llms.txt", "/ar/llms-full.txt"],
        disallow: "/api/",
      },

      /* ── AI crawler: PerplexityBot ── */
      {
        userAgent: "PerplexityBot",
        allow: ["/llms.txt", "/llms-full.txt", "/ar/llms.txt", "/ar/llms-full.txt"],
        disallow: "/api/",
      },

      /* ── AI crawler: Applebot-Extended (Apple Intelligence) ── */
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: "/api/",
      },

      /* ── AI / search crawler: Bytespider (ByteDance / Doubao) ── */
      {
        userAgent: "Bytespider",
        allow: ["/llms.txt", "/llms-full.txt", "/ar/llms.txt", "/ar/llms-full.txt"],
        disallow: "/api/",
      },

      /* ── AI crawler: FacebookBot (Meta AI) ── */
      {
        userAgent: "FacebookBot",
        allow: "/",
        disallow: "/api/",
      },
    ],

    sitemap: `${BASE}/sitemap.xml`,
  };
}
