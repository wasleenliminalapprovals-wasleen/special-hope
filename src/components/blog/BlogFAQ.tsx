/**
 * BlogFAQ — ZONE 11 of the blog index (plan §5).
 *
 * Server component. Index-level FAQ accordion using the shared FAQ
 * primitives (`.faq-toggle` 32px circle — rotates 45° to a × when open,
 * `.faq-a` max-height 0 → 300px). One-at-a-time toggling is driven by the
 * index inline JS (todo #20) via `data-faq-toggle` / `data-faq-a`.
 *
 * `BLOG_FAQ_ITEMS` is the single source of truth for BOTH the visible
 * accordion AND the FAQPage JSON-LD (blog-schema.ts imports it) so the
 * schema text mirrors the visible text word-for-word (master rule §5).
 *
 * @see plans/blog-pre-build-plan.md §5 (ZONE 11)
 */

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export const BLOG_FAQ_ITEMS: BlogFaqItem[] = [
  {
    question: "Which approvals does Wasleen handle in Dubai?",
    answer:
      "Wasleen Liminal Approval Consultants handles Dubai Municipality (DM), Dubai Development Authority (DDA), DEWA, DCD, DHA and free-zone approvals — including building permits, fit-out permits, completion certificates and the Law 3 of 2026 building safety certificate. See the full list on our approvals hub.",
  },
  {
    question: "How long does a Dubai approval take?",
    answer:
      "Timelines vary by authority and scope — typical DM fit-out approvals run 2–6 weeks, while a completion certificate can take 4–8 weeks after the final inspection. Every guide on this blog lists the real turnaround for its approval.",
  },
  {
    question: "Do I need a Dubai Municipality approval for an office fit-out?",
    answer:
      "Yes — most commercial fit-outs in Dubai require a DM building permit (or a DDA permit inside Downtown) before work starts, plus a completion certificate once the fit-out is inspected. Our fit-out approval guide covers the exact documents.",
  },
  {
    question: "What changed with Law 3 of 2026 on building safety?",
    answer:
      "Dubai Law No. 3 of 2026 introduced a building quality and safety certificate for existing buildings. Owners must obtain it to complete sales and tenancy registrations, with renewal every five years. Our Law 3 of 2026 guides explain who needs it and how to apply.",
  },
  {
    question: "Do you work with free-zone companies?",
    answer:
      "Yes — we coordinate approvals across Dubai free zones including DDA, DMCC, DIFC, DSO, IFZA and more. Free-zone projects still need authority approvals, and we manage the NOCs and permits for you.",
  },
  {
    question: "How do I get a quote for approval services?",
    answer:
      "Message us on WhatsApp at +971567648220 with your project details and we'll respond with the required documents and an indicative fee — usually within one working day.",
  },
];

export default function BlogFAQ() {
  return (
    <section className="faq-zone" aria-labelledby="faq-heading">
      <div className="blog-container">
        <div className="zone-head reveal">
          <p className="blog-eyebrow">FAQ</p>
          <h2 id="faq-heading" className="zone-title">
            Approval questions, answered
          </h2>
        </div>

        <div className="faq-list fade-in">
          {BLOG_FAQ_ITEMS.map((item, i) => (
            <div className="faq-item" key={i}>
              <h3 className="faq-q">
                <button
                  className="faq-toggle"
                  type="button"
                  aria-expanded="false"
                  data-faq-toggle
                  aria-label={`Toggle answer for: ${item.question}`}
                >
                  <span aria-hidden="true">+</span>
                </button>
                <span>{item.question}</span>
              </h3>
              <div className="faq-a" data-faq-a>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
