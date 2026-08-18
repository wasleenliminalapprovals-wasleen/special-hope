/**
 * CredentialsSection — Sheet 08 "Our Credentials" + A6 approval stamp.
 *
 * Copy is unchanged from the pre-redesign page (registered consultancy,
 * registered address, licence link, disclaimer) wrapped in a subtle
 * "document review" drafting frame: a card surface with corner crop marks
 * and a title-block header strip. The NAP Registered Address is rendered
 * byte-for-byte from src/lib/constants.ts (identical to the Footer,
 * JSON-LD schema, and the old page) — NAP consistency is non-negotiable.
 *
 * The A6 single-use "APPROVED" rubber stamp (client component) sits in the
 * title strip and thuds down once when the sheet scrolls into view.
 *
 * Locale-agnostic server component: labels flow from the credentials data
 * block (about.ts EN / about-ar.ts AR) so EN and AR stay 1:1 — only the
 * Registered Address comes from the shared NAP constant.
 *
 * Plan: plans/about-us-redesign-mega-plan.md (Sheet 08, F2)
 */

import Link from "next/link";
import { NAP } from "@/lib/constants";
import ApprovalStamp from "./ApprovalStamp";
import type { AboutContent, SheetMeta } from "@/data/about";

interface CredentialsSectionProps {
  credentials: AboutContent["credentials"];
  sheet: SheetMeta;
}

export default function CredentialsSection({
  credentials,
  sheet,
}: CredentialsSectionProps) {
  const address = [
    NAP.address.streetAddress,
    NAP.address.addressLocality,
    NAP.address.addressRegion,
  ].join(", ");

  return (
    <section
      id={sheet.id}
      aria-labelledby="about-credentials-heading"
      className="relative overflow-hidden bg-(--about-bg)"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <p className="about-sheet-tag font-roboto-mono text-xs uppercase tracking-[0.2em]">
          SHEET {sheet.number} · {sheet.label}
        </p>
        <h2
          id="about-credentials-heading"
          className="mt-4 font-montserrat text-h2 font-bold leading-tight text-(--about-heading)"
        >
          {credentials.heading}
        </h2>

        <div className="about-doc-review relative mt-10">
          <span
            aria-hidden="true"
            className="about-crop-mark about-crop-mark--tl absolute top-0 start-0"
          />
          <span
            aria-hidden="true"
            className="about-crop-mark about-crop-mark--tr absolute top-0 end-0"
          />
          <span
            aria-hidden="true"
            className="about-crop-mark about-crop-mark--bl absolute bottom-0 start-0"
          />
          <span
            aria-hidden="true"
            className="about-crop-mark about-crop-mark--br absolute bottom-0 end-0"
          />

          <div className="about-doc-review-strip">
            <p className="about-doc-review-title font-roboto-mono text-xs uppercase tracking-[0.2em]">
              {credentials.heading}
            </p>
            <div className="about-doc-review-stamp">
              <ApprovalStamp label={credentials.stampLabel} />
            </div>
          </div>

          <div className="about-doc-review-body">
            {credentials.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-body leading-relaxed text-(--about-text)"
              >
                {paragraph}
              </p>
            ))}
            <p className="text-body leading-relaxed text-(--about-text)">
              <strong>{credentials.addressLabel}</strong> {address}
            </p>
            <p className="text-body leading-relaxed text-(--about-text)">
              <strong>{credentials.licenseKey}</strong>{" "}
              {credentials.licenseQualifier}{" "}
              <Link href={credentials.licenseHref} className="about-doc-link">
                {credentials.licenseLabel}
              </Link>
              .
            </p>
            <p className="about-doc-disclaimer text-body-sm italic">
              {credentials.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
