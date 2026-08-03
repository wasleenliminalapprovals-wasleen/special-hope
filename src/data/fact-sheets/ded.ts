import type { FactSheet } from "../../types";

/**
 * Fact sheet — Department of Economy & Tourism (DET) / DED trade license
 * Single source of truth for verified trade-license fees, timelines and documents.
 * STATUS: "pending" — all figures are INDICATIVE and MUST be verified by the
 * user against current DET fee schedules before pages are marked "auto".
 */
export const dedFactSheet: FactSheet = {
  key: "ded",
  name: "Department of Economy and Tourism (DET) — Trade License",
  nameAr: "دائرة الاقتصاد والسياحة — رخصة تجارية",
  portalUrl: "https://www.det.gov.ae",
  lastVerified: "pending",
  fees: [
    {
      name: "Trade name reservation",
      amount: "≈ AED 620–1,000",
      notes: "Varies with legal structure; reserved via DET.",
    },
    {
      name: "Initial approval (approval to proceed)",
      amount: "≈ AED 120–500",
      notes: "Confirms activity is licensable.",
    },
    {
      name: "Trade license issuance",
      amount: "≈ AED 1,000–15,000+",
      notes: "Heavily activity-dependent; renewal and activity additions extra.",
    },
    {
      name: "Ejari (tenancy) registration requirement",
      amount: "≈ AED 220 + knowledge dirham",
      notes: "Valid Ejari required as part of licensing.",
    },
    {
      name: "Knowledge & Innovation Dirham",
      amount: "AED 10 + 10% of applicable fee",
      notes: "Added to most DET transactions.",
    },
  ],
  timelines: [
    { stage: "Trade name reservation", duration: "1–3 working days" },
    { stage: "Initial approval", duration: "1–5 working days" },
    { stage: "Ejari + external NOCs", duration: "2–7 working days" },
    { stage: "License issuance", duration: "1–5 working days after approvals" },
  ],
  documents: [
    { name: "Passport copy (all shareholders)", notes: "Valid for 6+ months" },
    { name: "Emirates ID", notes: "Where applicable" },
    { name: "Entry visa / residence visa (for mainland)", notes: "As per legal structure" },
    { name: "Ejari-registered tenancy contract", notes: "Required for mainland office" },
    { name: "Initial approval / MOA", notes: "Per DET process" },
  ],
  notes:
    "Trade license fees vary strongly by business activity and legal structure. All figures are indicative until lastVerified is set. Re-verify against det.gov.ae (Invest in Dubai) before publishing time-sensitive numbers.",
};
