/**
 * llms-full.txt Route Handler — Complete Knowledge Base
 *
 * Serves `llms-full.txt` at https://www.dubaiapprovalconsultants.com/llms-full.txt
 * The entire website's expertise in a single text file. AI agents ingest this
 * for complex multi-step queries covering approvals, guides, and services.
 *
 * Content structure per page:
 *   ---
 *   ## [Page Title]
 *   ### Direct Answer
 *   ### At a Glance (stats table)
 *   ### Description
 *   ### Who Needs This
 *   ### Required Documents (table)
 *   ### Process Steps
 *   ### Timeline & Cost (table)
 *   ### Common Rejection Reasons
 *   ### FAQ
 *
 * All text passes through entity resolution and marketing fluff filtering.
 * Pages ordered by priority: Government & Regulatory → Free Zone → Developer
 * → Fit-Out → Drawing → Property → Technical → Trade → Guides → Services.
 *
 * @see plans/geo-phase-13-plan.md §Step 13.3
 * @see src/lib/geo.ts — `buildLlmsFull()` generates the actual content
 */

import { NextResponse } from "next/server";
import { approvals } from "@/data/approvals";
import { guides } from "@/data/guides";
import { services } from "@/data/services";
import { caseStudies } from "@/data/case-studies";
import { buildLlmsFull } from "@/lib/geo";
import { buildCaseStudiesLlmsFull } from "@/lib/case-studies";
import { getLivePosts } from "@/lib/blog";
import { loadPseoPages } from "@/lib/pseo-data";

export const dynamic = "force-static";

export async function GET() {
  const content = buildLlmsFull(approvals, guides, services, loadPseoPages(), getLivePosts());
  const caseStudiesSection = buildCaseStudiesLlmsFull(caseStudies);
  // Append-only (Step 8, case-studies mega-plan): LIVE case-study URLs only.
  // `src/lib/geo.ts` is untouched (addendum A.2). If no live case study exists
  // yet, the section is empty and the manifest is unchanged.
  const finalContent = caseStudiesSection
    ? `${content}\n${caseStudiesSection}`
    : content;

  return new NextResponse(finalContent, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
