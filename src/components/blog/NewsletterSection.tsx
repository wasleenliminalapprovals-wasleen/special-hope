/**
 * NewsletterSection — ZONE 9 of the blog index (plan §5).
 *
 * Server component. Newsletter capture using the WhatsApp pattern (no email
 * backend — the submit button opens WhatsApp with a pre-filled subscribe
 * message via `wa.me/{phone}`).
 *   - `.nl-stars` — decorative gold ✦ marks (`--accent-2`, #F5A623).
 *   - `.nl-form` — real `<form>`; the index inline JS (todo #20) intercepts
 *     `data-wa-form` submit, appends the typed name, and opens WhatsApp.
 *   - `.nl-input` — labelled via `aria-label` (no visible label to keep the
 *     compact pill design).
 *   - `.nl-hint` — reassurance line (no spam).
 *
 * @see plans/blog-pre-build-plan.md §5 (ZONE 9)
 */

import { NAP } from "@/lib/constants";

export const NL_MESSAGE = `Hello Wasleen Liminal Approval Consultants, I'd like to subscribe to your monthly Dubai approvals newsletter.`;

export default function NewsletterSection() {
  return (
    <section className="newsletter-zone" aria-labelledby="newsletter-heading">
      <div className="blog-container">
        <div className="newsletter blog-glass fade-in">
          <div className="nl-stars" aria-hidden="true">
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </div>

          <div className="zone-head reveal">
            <p className="blog-eyebrow">Newsletter</p>
            <h2 id="newsletter-heading" className="zone-title">
              Approval updates, monthly
            </h2>
          </div>

          <p className="nl-lead">
            One email a month covering Dubai approval news, fee changes and Law
            3 of 2026 building-safety updates. Subscribe on WhatsApp and get the
            next issue straight to your phone.
          </p>

          <form className="nl-form" data-wa-form>
            <input
              className="nl-input"
              type="text"
              name="name"
              placeholder="Your name"
              aria-label="Your name"
              autoComplete="name"
              data-wa-input
            />
            <button className="nl-submit" type="submit" data-wa-submit>
              Subscribe on WhatsApp
            </button>
          </form>

          <p className="nl-hint">
            No spam — one email a month, and you can unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
