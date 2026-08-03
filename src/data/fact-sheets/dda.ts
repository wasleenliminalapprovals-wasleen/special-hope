import type { FactSheet } from "../../types";

/**
 * Fact sheet — Dubai Development Authority (DDA)
 * Single source of truth for verified DDA fees, timelines and documents.
 * STATUS: "pending" — all figures are INDICATIVE and MUST be verified by the
 * user against current DDA fee schedules before pages are marked "auto".
 */
export const ddaFactSheet: FactSheet = {
  key: "dda",
  name: "Dubai Development Authority",
  nameAr: "هيئة دبي للتطوير",
  portalUrl: "https://www.dda.gov.ae",
  lastVerified: "pending",
  fees: [
    {
      name: "Building / fit-out permit fee",
      amount: "≈ AED 20–40 per sq ft (indicative)",
      notes: "Based on works value and area within DDA jurisdiction.",
    },
    {
      name: "Preliminary / concept approval",
      amount: "≈ AED 500–2,000",
      notes: "Design concept review before detailed submission.",
    },
    {
      name: "NOC fee",
      amount: "≈ AED 100–500 per NOC",
      notes: "Per authority NOC coordinated by DDA.",
    },
    {
      name: "Inspection / completion fees",
      amount: "≈ AED 500–2,000",
      notes: "Final inspection and completion sign-off.",
    },
  ],
  timelines: [
    { stage: "Application & document review", duration: "1–3 working days" },
    { stage: "Technical / design review", duration: "3–10 working days" },
    { stage: "NOC coordination", duration: "2–5 working days" },
    { stage: "Permit issuance", duration: "1–3 working days after approval" },
    { stage: "Final inspection & completion", duration: "3–7 working days" },
  ],
  documents: [
    { name: "Registered lease / tenancy within DDA jurisdiction", notes: "Dubai South / Expo City area" },
    { name: "Approved architectural drawings", notes: "Stamped by certified engineer" },
    { name: "Structural / MEP submissions", notes: "Where applicable" },
    { name: "NOCs from relevant authorities", notes: "DCD, DEWA, RTA as applicable" },
    { name: "Emirates ID / passport of applicant", notes: "Authorised signatory" },
  ],
  notes:
    "DDA governs building and fit-out works in the Dubai South / Expo City area. All figures are indicative until lastVerified is set. Re-verify against dda.gov.ae before publishing time-sensitive numbers.",
};
