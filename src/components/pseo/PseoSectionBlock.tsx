/**
 * PseoSectionBlock — Renders a pSEO content section (H2 + ordered blocks).
 *
 * Supports every block type in the pSEO content contract:
 * paragraph, heading (H3), ordered/unordered list, table, quote, and image.
 * Inline `[text](url)` links are converted to real `<a>` tags via
 * `renderInlineLinks` (descriptive-anchor internal linking).
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md (Heading hierarchy, tables, lists)
 */

import type { PseoBlock, PseoSection } from "@/types";
import { renderInlineLinks } from "@/lib/content";
import PseoImageBlock from "./PseoImageBlock";

function blockHtml(text: string): string {
  return renderInlineLinks(text);
}

function PseoBlockRenderer({ block }: { block: PseoBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          className="mb-4 last:mb-0 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blockHtml(block.text) }}
        />
      );

    case "heading":
      return (
        <h3 className="text-h3 font-montserrat text-heading-text mt-8 mb-3">
          {block.text}
        </h3>
      );

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          className={`mb-4 space-y-2 ${
            block.ordered ? "list-decimal" : "list-disc"
          } pl-5 marker:text-brand-blue`}
        >
          {block.items.map((item, i) => (
            <li
              key={i}
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blockHtml(item) }}
            />
          ))}
        </Tag>
      );
    }

    case "table":
      return (
        <div className="overflow-x-auto my-4 rounded-md border border-border-light">
          <table className="w-full text-body-sm text-left border-collapse">
            <thead>
              <tr>
                {block.headers.map((header, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="border-b border-border-light bg-card-bg px-3 py-2 font-montserrat text-heading-text"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="even:bg-light-bg">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border-b border-border-light px-3 py-2 align-top"
                      dangerouslySetInnerHTML={{ __html: blockHtml(cell) }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-brand-blue bg-card-bg p-4 rounded-r-md my-4 italic text-body-text">
          {block.text}
        </blockquote>
      );

    case "image":
      return <PseoImageBlock image={block.image} />;

    default:
      return null;
  }
}

interface PseoSectionBlockProps {
  section: PseoSection;
  index: number;
}

export default function PseoSectionBlock({
  section,
  index,
}: PseoSectionBlockProps) {
  return (
    <section aria-labelledby={`pseo-section-${index}`}>
      <h2
        id={`pseo-section-${index}`}
        className="text-h2 font-montserrat text-heading-text mt-10 mb-4 scroll-mt-24"
      >
        {section.heading}
      </h2>
      <div className="space-y-4">
        {section.blocks.map((block, i) => (
          <PseoBlockRenderer key={i} block={block} />
        ))}
      </div>
    </section>
  );
}
