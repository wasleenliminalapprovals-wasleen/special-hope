import Link from "next/link";
import { ChevronDown } from "lucide-react";

/**
 * HubFaq — Z10 hub-level FAQ + crawler-friendly "Authorities covered" row.
 *
 * Part 19 §19.4.10. Native `<details>` accordion (no client JS required).
 * The FAQ list is built by `buildHubFaqs(lastUpdated)` and exported so the
 * page shell can feed the SAME array into `FAQPage` schema — the visible
 * answer text equals the schema text word-for-word (Part 12 gate).
 *
 * Answers are plain sentences (no inline markup) so schema parity stays
 * exact; real authority links live in the separate crawlable row below.
 *
 * @see plans/case-studies-mega-plan.md §19.4.10
 */

export interface HubFaqItem {
  question: string;
  answer: string;
}

/** Real, canonical authority → approval page links (all resolve today). */
export const HUB_AUTHORITY_LINKS: { code: string; href: string; label: string }[] = [
  { code: "DCD", href: "/approvals/dubai-civil-defense-approval", label: "Dubai Civil Defence approval" },
  { code: "DDA", href: "/approvals/dda-approval", label: "DDA approval" },
  { code: "DM", href: "/approvals/dubai-municipality-building-permit", label: "Dubai Municipality building permit" },
  { code: "DEWA", href: "/approvals/dewa-load-enhancement", label: "DEWA load enhancement" },
  { code: "Trakhees", href: "/approvals/jebel-ali-free-zone-approval", label: "Trakhees (JAFZA) approval" },
  { code: "RTA", href: "/approvals/rta-approval", label: "RTA approval" },
  { code: "Nakheel", href: "/approvals/nakheel-developer-approval", label: "Nakheel developer approval" },
];

/**
 * Build the hub FAQ set. `lastUpdated` is injected into the final answer so
 * the "How current is this register?" response always ends with the real
 * freshness date from the data array.
 */
export function buildHubFaqs(lastUpdated: string): HubFaqItem[] {
  return [
    {
      question: "Are these real approval projects?",
      answer:
        "Yes. Every entry in this register is a real Dubai approval project Wasleen Approvals managed or quoted for a client. Each file records the authority involved, the quoted fee, the documents submitted and the actual outcome. Nothing on this page is a fabricated or stock example.",
    },
    {
      question: "Why are the clients anonymous?",
      answer:
        "Most clients ask us to keep their identity private, so we anonymize every project by default. Each file shows only the client's sector plus a redaction notice. Where a client has given written consent to be named, their client label appears instead.",
    },
    {
      question: "Which authorities appear in the register?",
      answer:
        "The register covers the authorities our projects actually dealt with, including Dubai Civil Defence (DCD), Dubai Municipality (DM), the Dubai Development Authority (DDA), DEWA, Nakheel, Trakhees and the RTA. As we complete more projects the authority list grows automatically.",
    },
    {
      question: "Can I see the exact fees and timelines?",
      answer:
        "Yes. Each file shows the quoted fee and the planned versus actual timeline for that project. Fees are the amounts we quoted the client, not an estimate of what your project will cost \u2014 your quote depends on your building's size, use and condition.",
    },
    {
      question: "Will you take on a similar project?",
      answer:
        "If your project falls under one of the authorities above we can likely manage it end to end, from drawings and documents through to approval. Use the free quote form with your building type, area and scope and we will reply with a file-stamped quote.",
    },
    {
      question: "How current is this register?",
      answer: `Every file carries the date it was last updated. The register itself was last reviewed on ${lastUpdated}. Fees, timelines and regulations change, so each authority page also carries its own disclaimer.`,
    },
  ];
}

export interface HubFaqProps {
  /** Built with `buildHubFaqs(lastUpdated)` — same array as FAQPage schema. */
  faqs: HubFaqItem[];
}

export default function HubFaq({ faqs }: HubFaqProps) {
  return (
    <section aria-labelledby="register-faq-heading" className="rounded-md border border-border-light bg-white p-6 shadow-card">
      <div className="max-w-3xl">
        <h2
          id="register-faq-heading"
          className="font-montserrat text-h4 font-bold text-heading-text"
        >
          How to read this register
        </h2>
        <p className="mt-2 text-body-sm text-body-text/70">
          Quick answers about the proof documents above. Open each file for the
          full authority breakdown, documents and timeline.
        </p>

        <div className="mt-5 space-y-2.5">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="cs-faq-item rounded-md border border-border-light bg-light-bg px-4 py-3"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-body font-semibold text-heading-text focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown
                  size={20}
                  strokeWidth={1.75}
                  className="cs-faq-chevron shrink-0 text-brand-blue"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-2 text-body-sm leading-relaxed text-body-text/80">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        {/* Authorities covered — real crawlable links (reconciles Z3 pills). */}
        <h3 className="mt-6 font-montserrat text-h4 font-bold text-heading-text">
          Authorities covered
        </h3>
        <p className="mt-2 text-body-sm text-body-text/70">
          Jump to the approval page for each authority that appears in this
          register:
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5 font-mono text-body-sm">
          {HUB_AUTHORITY_LINKS.map((link, index) => (
            <li
              key={link.code}
              className="flex items-center gap-x-2"
            >
              {index > 0 && (
                <span className="text-body-text/40" aria-hidden="true">
                  ·
                </span>
              )}
              <Link
                href={link.href}
                className="cs-underline-grow text-link-blue hover:text-brand-blue-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                {link.code}
                <span className="sr-only"> — {link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
