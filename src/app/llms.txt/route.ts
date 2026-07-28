/**
 * llms.txt Route Handler — AI Manifest Index
 *
 * Serves `llms.txt` at https://www.dubaiapprovalconsultants.com/llms.txt
 * A plain-text markdown index of all pages organized by category.
 * This is the PRIMARY file AI search engines (ChatGPT Search, Perplexity,
 * Google AI Overviews, Bing Copilot) fetch first to discover site content.
 *
 * @see plans/geo-phase-13-plan.md §Step 13.2
 * @see src/lib/geo.ts — `buildLlmsIndex()` generates the actual content
 */

import { NextResponse } from "next/server";
import { approvals } from "@/data/approvals";
import { guides } from "@/data/guides";
import { services } from "@/data/services";
import { buildLlmsIndex } from "@/lib/geo";

export const dynamic = "force-static";

export async function GET() {
  const content = buildLlmsIndex(approvals, guides, services);

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
