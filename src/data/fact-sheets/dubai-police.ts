import type { FactSheet } from "../../types";

/**
 * Fact sheet — Dubai Police
 * Single source of truth for verified Dubai Police fees, timelines and documents.
 * STATUS: "pending" — all figures are INDICATIVE and MUST be verified by the
 * user against current Dubai Police fee schedules before pages are marked "auto".
 */
export const dubaiPoliceFactSheet: FactSheet = {
  key: "dubai-police",
  name: "Dubai Police",
  nameAr: "شرطة دبي",
  portalUrl: "https://www.dubaipolice.gov.ae",
  lastVerified: "pending",
  fees: [
    {
      name: "Security / event NOC",
      amount: "≈ AED 100–500",
      notes: "Varies by event type and scale.",
    },
    {
      name: "Security systems / installation approval",
      amount: "≈ AED 200–1,000",
      notes: "CCTV and security-system permits for commercial premises.",
    },
    {
      name: "Occupancy / licensing security approval",
      amount: "Varies by activity",
      notes: "Required for certain licensed activities (e.g., entertainment).",
    },
  ],
  timelines: [
    { stage: "Application & document check", duration: "1–3 working days" },
    { stage: "Review / background checks", duration: "3–7 working days" },
    { stage: "NOC issuance", duration: "2–5 working days after approval" },
  ],
  documents: [
    { name: "Completed application form", notes: "Via Dubai Police e-services" },
    { name: "Trade license (for commercial activities)", notes: "Where applicable" },
    { name: "Passport / Emirates ID", notes: "Applicant and principals" },
    { name: "Supporting approvals", notes: "DM / DCD / DET as applicable" },
  ],
  notes:
    "Dubai Police approvals are required for security-related and certain licensed activities. All figures are indicative until lastVerified is set. Re-verify against dubaipolice.gov.ae before publishing time-sensitive numbers.",
};
