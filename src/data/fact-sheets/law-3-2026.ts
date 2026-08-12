import type { FactSheet } from "../../types";

/**
 * Fact sheet — Law No. (3) of 2026 (Quality & Safety of Buildings, Dubai)
 * Single source of truth for the legal facts behind the Law 3/2026 content
 * cluster (pillar page + guide pages). Every concrete number on generated
 * pages MUST trace to this sheet — never to a law firm's paraphrase.
 *
 * PRIMARY SOURCE: Dubai Legislation Portal (dlp.dubai.gov.ae) — the only
 * source for exact figures, dates and obligations. Full reference:
 * `reference details/Law-3-2026-Official-Fact-SheetDLP-Legal-sheet.md`.
 *
 * STATUS: "pending" — figures are drawn directly from the primary law text
 * and MUST be confirmed by the user before pages are marked "auto".
 *
 * FINE-SCHEDULE NUANCE: Article 16 sets only the outer range
 * (AED 100 – AED 1,000,000). Exact amounts per violation type are delegated
 * to a future Executive Council Chairman resolution — content must NOT claim
 * a specific violation carries a specific amount today.
 *
 * The fees/timelines arrays are crafted so the generation engine's fact gate
 * (scanForUnverifiedNumbers) allowlists every number content may legitimately
 * use: individual fine bounds, the range, the repeat cap, the deposit, and
 * each statutory duration (60 days, 1 year, 20 years, 40 years, 10/5 years,
 * 6 months, 2 years, 30 days, 3 months).
 */
export const law3_2026FactSheet: FactSheet = {
  key: "law-3-2026",
  name: "Law No. (3) of 2026 — Quality and Safety of Buildings",
  nameAr: "القانون رقم (3) لسنة 2026 بشأن جودة وسلامة المباني في إمارة دبي",
  portalUrl: "https://dlp.dubai.gov.ae",
  lastVerified: "2026-08-12",
  fees: [
    {
      name: "Fine range (any violation)",
      amount: "AED 100 – AED 1,000,000",
      notes: "Outer statutory range set by Article 16. Exact amounts per violation type are delegated to a follow-up Executive Council Chairman resolution — do not publish a per-violation schedule.",
    },
    {
      name: "Fine range (alternate wording)",
      amount: "AED 100 to 1,000,000",
      notes: "Same Article 16 range, phrased without the repeated currency marker.",
    },
    {
      name: "Minimum fine per violation",
      amount: "AED 100",
      notes: "Lower bound of the Article 16 fine range.",
    },
    {
      name: "Maximum fine per violation",
      amount: "AED 1,000,000",
      notes: "Upper bound of the Article 16 fine range.",
    },
    {
      name: "Repeat violation within 2 years — doubled fine cap",
      amount: "AED 2,000,000",
      notes: "A repeat violation within 2 years doubles the fine, capped at AED 2,000,000.",
    },
    {
      name: "Demolition security deposit (refundable)",
      amount: "AED 50,000",
      notes: "Required if the Owner opts to demolish instead of certifying; refundable if the building is demolished within the grace period.",
    },
    {
      name: "Quality and Safety Certificate fees",
      amount: "Set by Executive Council Chairman resolution",
      notes: "Article 21 — certificate fees are not fixed in the law text itself.",
    },
  ],
  timelines: [
    { stage: "Law in force after Official Gazette publication", duration: "60 days after publication" },
    { stage: "Compliance deadline (extendable)", duration: "1 year from effective date" },
    { stage: "Building age trigger for the Quality and Safety Certificate", duration: "20 years after Completion Certificate" },
    { stage: "Building age threshold for shorter certificate validity", duration: "40 years or more" },
    { stage: "Certificate validity — buildings under 40 years old", duration: "10 years" },
    { stage: "Certificate validity — buildings 40 years or more", duration: "5 years" },
    { stage: "Technical Report submission window", duration: "6 months from initial approval" },
    { stage: "Technical Report window extension (on request)", duration: "Up to 2 years" },
    { stage: "Grievance / appeal filing window", duration: "30 days" },
    { stage: "Occupant vacation window after Technical Report approval", duration: "3 months" },
    { stage: "Demolition grace period (voluntary demolition route)", duration: "Up to 1 year" },
  ],
  documents: [
    {
      name: "Quality and Safety Certificate Technical Report",
      notes: "Prepared by a DM-registered Engineering Firm; covers structural integrity, exterior cladding, electrical/mechanical installations, windows/doors/security barriers, Civil Defence compliance and CCTV/SIRA compliance.",
    },
    {
      name: "Completion Certificate date",
      notes: "Must be at least 20 years old to trigger the certificate; also determines the 10-year or 5-year validity period.",
    },
    {
      name: "Engineering Firm classification",
      notes: "Must match the building's height category per Dubai Municipality thresholds.",
    },
    {
      name: "Laboratory test results",
      notes: "From a UAE-licensed, EIAC-accredited technical laboratory where testing is required.",
    },
    {
      name: "Ownership or possession proof",
      notes: "Owner, legitimate possessor, or the Jointly Owned Property Management Entity under Law No. (6) of 2019.",
    },
  ],
  notes:
    "Official legal note — include near any legal claim: \"Every effort has been made to produce an accurate and complete English version of this legislation. However, for the purpose of its interpretation and application, reference must be made to the original Arabic text. In case of conflict, the Arabic text will prevail.\" Primary source: Dubai Legislation Portal (dlp.dubai.gov.ae). Issued 27 February 2026; in force 60 days after Official Gazette publication; compliance required within 1 year of the effective date (extendable). The Quality and Safety Certificate is NOT required for all buildings immediately — it applies to existing buildings completed at least 20 years ago. Fines range AED 100 – AED 1,000,000 (AED 2,000,000 cap for repeat violations within 2 years), with per-violation amounts pending the Executive Council Chairman resolution. Re-verify all figures on the DLP before publishing.",
};
