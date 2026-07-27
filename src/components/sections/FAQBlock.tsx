/**
 * FAQBlock — Reusable FAQ accordion block with FAQPage JSON-LD schema.
 *
 * Renders an accessible accordion and injects matching FAQPage schema.
 * The visible text content MUST match the schema content word-for-word.
 *
 * @usage
 * ```tsx
 * <FAQBlock
 *   title="Frequently Asked Questions"
 *   items={[
 *     { question: "What is DM approval?", answer: "..." },
 *   ]}
 * />
 * ```
 *
 * @see /plans/complete-build-plan.md (Phase 6.7 — Homepage FAQ)
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md (FAQPage schema rules)
 */

import Accordion from "@/components/ui/Accordion";
import type { AccordionItem } from "@/components/ui/Accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps {
  /** Section heading (default: "Frequently Asked Questions") */
  title?: string;
  /** Optional subtitle */
  subtitle?: string;
  /** FAQ items — text must match schema output exactly */
  items: FAQItem[];
  /** Additional Tailwind classes */
  className?: string;
}

/**
 * Generate FAQPage JSON-LD from FAQ items.
 * Text must match the visible accordion content exactly.
 */
function faqPageSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export default function FAQBlock({
  title = "Frequently Asked Questions",
  subtitle,
  items,
  className = "",
}: FAQBlockProps) {
  if (!items || items.length === 0) return null;

  const accordionItems: AccordionItem[] = items.map((item, index) => ({
    id: `faq-${index}`,
    title: item.question,
    content: <p>{item.answer}</p>,
  }));

  return (
    <section className={`bg-white ${className}`.trim()}>
      {/* FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema(items)),
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-h2 font-montserrat text-heading-text mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className="text-body-lg text-body-text">{subtitle}</p>
            )}
          </div>

          <Accordion items={accordionItems} />
        </div>
      </div>
    </section>
  );
}
