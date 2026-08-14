/**
 * AuthorSection — ZONE 8 of the blog index (plan §5).
 *
 * Server component. E-E-A-T signal: the licensed consultants who write and
 * review every guide on this blog.
 *   - `.eeat-badge` — trust line referencing the real DED trade licence
 *     (`LICENSE.licenseNumber`, single source of truth).
 *   - `.author-card` ×3 — Jamsheed Khalid (engineering), Kavya Ramachandran
 *     (design), and the organization entity.
 *   - `.blog-avatar-ring` — conic-gradient ring; initials monogram inside
 *     (no fabricated author photos).
 *   - `.author-links` — real `<a>` to verified profiles (`sameAs`), plus
 *     internal /about-us + /contact-us for the organization card.
 *
 * NOTE: bios are role-descriptive only — NO fabricated stats (years, counts).
 *
 * @see plans/blog-pre-build-plan.md §5 (ZONE 8)
 * @see plans/gsc-qa-author-schema-fix-plan.md §3.2 (author rules)
 */

import Link from "next/link";
import { AUTHOR_REGISTRY, type GuideAuthorId } from "@/data/authors";
import { LICENSE } from "@/lib/constants";

interface AuthorCardData {
  id: GuideAuthorId;
  monogram: string;
  bio: string;
  internalHref?: string;
  internalLabel?: string;
}

const AUTHOR_CARDS: AuthorCardData[] = [
  {
    id: "jamsheed-khalid",
    monogram: "JK",
    bio: "Senior fit-out consultant and structural engineer. Reviews all Dubai Municipality, DCD and Law 3 of 2026 building-safety content on this blog.",
  },
  {
    id: "kavya-ramachandran",
    monogram: "KR",
    bio: "Interior designer covering fit-out permits, renovation NOCs and drawing-stage approvals for DDA and Dubai free zones.",
  },
  {
    id: "organization",
    monogram: "WL",
    bio: `Wasleen Liminal Approval Consultants — the DED-licensed Dubai approvals consultancy (licence no. ${LICENSE.licenseNumber}) behind every guide on this blog.`,
    internalHref: "/about-us",
    internalLabel: "About the company",
  },
];

function profileLabel(url: string): string {
  if (url.includes("linkedin.com")) return "LinkedIn";
  if (url.includes("gravatar.com")) return "Profile";
  return "Profile";
}

export default function AuthorSection() {
  return (
    <section className="author-section" aria-labelledby="authors-heading">
      <div className="blog-container">
        <div className="zone-head reveal">
          <p className="blog-eyebrow">E-E-A-T</p>
          <h2 id="authors-heading" className="zone-title">
            Written by licensed consultants
          </h2>
        </div>

        <p className="eeat-badge fade-in">
          <span aria-hidden="true">✓</span>
          DED trade licence no. {LICENSE.licenseNumber} · Dubai approvals
          consultancy
        </p>

        <div className="author-grid fade-in">
          {AUTHOR_CARDS.map((card) => {
            const author = AUTHOR_REGISTRY[card.id];
            return (
              <article key={card.id} className="author-card">
                <div className="blog-avatar-ring author-photo" aria-hidden="true">
                  <span className="author-monogram">{card.monogram}</span>
                </div>
                <div className="author-info">
                  <h3 className="author-name">{author.name}</h3>
                  <p className="author-title">{author.titleEn}</p>
                  <p className="author-bio">{card.bio}</p>

                  {author.sameAs && author.sameAs.length > 0 ? (
                    <ul className="author-links">
                      {author.sameAs.map((url) => (
                        <li key={url}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {profileLabel(url)}
                            <span aria-hidden="true"> ↗</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : card.internalHref && card.internalLabel ? (
                    <Link className="author-links-internal" href={card.internalHref}>
                      {card.internalLabel}
                      <span aria-hidden="true"> →</span>
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
