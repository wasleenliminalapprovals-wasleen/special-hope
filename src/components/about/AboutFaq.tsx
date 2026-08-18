/**
 * AboutFaq — Sheet 10 · FAQ accordion.
 *
 * Reuses the shared Accordion (accessible toggle, aria-expanded / aria-controls,
 * keyboard support) inside a scoped `.about-faq` wrapper. The wrapper remaps the
 * global color tokens the Accordion is built from to the cyanotype day/night
 * palette (see about.css §26), so the shared component stays theme-correct on
 * this page without being modified.
 *
 * FAQ answers may contain a simple `[label](url)` link (e.g. the licence link).
 * It is rendered here as a real server-rendered <Link>. The FAQPage schema
 * emitted at assembly (G1) strips the same syntax so visible text === schema
 * text (rule: .roo/rules/03-SEO-AI-SEARCH-MASTER.md).
 *
 * Plan: plans/about-us-redesign-mega-plan.md §2 (Sheet 10) / §4.3 (files)
 */

import Link from "next/link";
import type { ReactNode } from "react";
import Accordion from "@/components/ui/Accordion";
import type { AboutContent, SheetMeta } from "@/data/about";

interface AboutFaqProps {
  faq: AboutContent["faq"];
  sheet: SheetMeta;
}

const LINK_PATTERN = /(\[[^\]]+\]\([^)]+\))/g;
const LINK_MATCHER = /^\[([^\]]+)\]\(([^)]+)\)$/;

/** Renders `[label](url)` link syntax inside an answer as a real <Link>. */
function renderAnswer(text: string): ReactNode {
  const parts = text.split(LINK_PATTERN);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    const match = LINK_MATCHER.exec(part);
    if (!match) return part;
    const [, label, href] = match;
    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    }
    return (
      <Link key={i} href={href}>
        {label}
      </Link>
    );
  });
}

export default function AboutFaq({ faq, sheet }: AboutFaqProps) {
  return (
    <section
      id={sheet.id}
      aria-labelledby="about-faq-heading"
      className="relative overflow-hidden bg-(--about-bg)"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <p className="about-sheet-tag font-roboto-mono text-xs uppercase tracking-[0.2em]">
          SHEET {sheet.number} · {sheet.label}
        </p>
        <h2
          id="about-faq-heading"
          className="mt-4 font-montserrat text-h2 font-bold leading-tight text-(--about-heading)"
        >
          {faq.heading}
        </h2>
        <div className="about-faq mx-auto mt-10 max-w-3xl">
          <Accordion
            items={faq.items.map((item) => ({
              title: item.question,
              content: renderAnswer(item.answer),
            }))}
            defaultOpenIndex={0}
          />
        </div>
      </div>
    </section>
  );
}
