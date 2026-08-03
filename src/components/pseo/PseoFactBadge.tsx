/**
 * PseoFactBadge — Transparency badge for fact-sheet verification status.
 *
 * YMYL trust signal: when the fact gate flags a page as "needs-review" (or the
 * fact sheet is still "pending"), show a warning badge instead of a verified
 * date. Never present unverified figures as confirmed.
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md (Trustworthiness signals)
 */

import Badge from "@/components/ui/Badge";

interface PseoFactBadgeProps {
  /** Fact sheet last-verified date ("pending" until verified) */
  lastVerified: string;
  /** Review state flagged by the fact gate */
  reviewStatus?: "auto" | "needs-review";
  /** Rendering locale for badge text (defaults to English) */
  locale?: "en" | "ar";
}

export default function PseoFactBadge({
  lastVerified,
  reviewStatus = "auto",
  locale = "en",
}: PseoFactBadgeProps) {
  const isAr = locale === "ar";
  if (reviewStatus === "needs-review" || lastVerified === "pending") {
    return (
      <Badge variant="warning" className="mb-4">
        {isAr ? "آخر تحقق: بانتظار المراجعة" : "Last verified: pending review"}
      </Badge>
    );
  }
  return (
    <Badge variant="success" className="mb-4">
      {isAr ? `آخر تحقق: ${lastVerified}` : `Last verified: ${lastVerified}`}
    </Badge>
  );
}
