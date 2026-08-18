/**
 * Sheet02Story — Sheet 02 "Our Story" (server component).
 *
 * Design (plans/about-us-redesign-mega-plan.md Sheet 02, lines 59-72):
 * - Sheet tag (`SHEET 02 · OUR STORY`, mono amber — shared `.about-sheet-tag`
 *   convention used by every sheet) → H2 → the 3-paragraph story copy.
 * - Two-column layout on desktop (7/12 copy | 5/12 revision log). The
 *   RevisionLogBlock is the client island (draw-in border + staggered rows);
 *   everything else here is static server-rendered content.
 * - Founding timeline rail (mono, 4 nodes): `2013 INTERIOR` → `2018 APPROVALS`
 *   → `PERGOLAS` → `DIGITAL`, joined by a track line that spans node-to-node.
 *
 * Blocker-1 resolution (§7): the PERGOLAS / DIGITAL years are not confirmed,
 * so the data uses `year: "—"` for those nodes and we render it verbatim —
 * never invent years. The rail is intentionally static (no animation) so it
 * stays a calm, factual strip below the animated revision log.
 *
 * Locale-agnostic: `story` + `sheet` arrive as props from about.ts /
 * about-ar.ts. The track line uses inline `insetInlineStart/End` (logical) so
 * it mirrors correctly under RTL.
 */

import type { AboutContent, SheetMeta } from "@/data/about";
import RevisionLogBlock from "@/components/about/RevisionLogBlock";

type StoryContent = AboutContent["story"];

interface Sheet02StoryProps {
  story: StoryContent;
  /** Sheet meta for this sheet (id / number / label). */
  sheet: SheetMeta;
}

export default function Sheet02Story({ story, sheet }: Sheet02StoryProps) {
  // With N nodes, each node owns 1/N of the rail width, so the connecting
  // track spans from the centre of the first node to the centre of the last —
  // i.e. it is inset by 100/(N*2)% on both sides.
  const nodeInset = `${100 / (story.timeline.length * 2)}%`;

  return (
    <section
      id={sheet.id}
      aria-labelledby="about-story-heading"
      className="relative overflow-hidden bg-(--about-bg)"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <p className="about-sheet-tag font-roboto-mono text-xs uppercase tracking-[0.2em]">
          SHEET {sheet.number} · {sheet.label}
        </p>

        <div className="mt-6 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2
              id="about-story-heading"
              className="font-montserrat text-h2 font-bold leading-tight text-(--about-heading)"
            >
              {story.heading}
            </h2>
            <div className="mt-6 space-y-5 text-body leading-relaxed text-(--about-text)">
              {story.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <RevisionLogBlock
              revisionTitle={story.revisionTitle}
              rows={story.revisionRows}
              approvedLabel={story.approvedLabel}
            />
          </div>
        </div>

        {/* Founding timeline rail — static, factual strip. */}
        <div className="about-timeline mt-16 border-t border-(--about-line) pt-10">
          <p className="about-timeline-title font-roboto-mono text-xs uppercase tracking-widest">
            {story.timelineTitle}
          </p>
          <div className="relative mt-8">
            <div
              aria-hidden="true"
              className="about-timeline-track"
              style={{ insetInlineStart: nodeInset, insetInlineEnd: nodeInset }}
            />
            <ol className="about-timeline-nodes">
              {story.timeline.map((node, i) => (
                <li
                  key={`${node.year}-${i}`}
                  className="about-timeline-node"
                >
                  <span className="about-timeline-year font-roboto-mono">
                    {node.year}
                  </span>
                  <span className="about-timeline-dot" aria-hidden="true" />
                  <span className="about-timeline-label font-roboto-mono">
                    {node.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
