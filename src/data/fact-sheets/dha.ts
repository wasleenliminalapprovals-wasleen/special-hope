import type { FactSheet } from "../../types";

/**
 * Fact sheet — Dubai Health Authority (DHA)
 * Single source of truth for verified DHA fees, timelines and documents.
 * STATUS: "pending" — all figures are INDICATIVE and MUST be verified by the
 * user against current DHA fee schedules before pages are marked "auto".
 */
export const dhaFactSheet: FactSheet = {
  key: "dha",
  name: "Dubai Health Authority",
  nameAr: "هيئة الصحة بدبي",
  portalUrl: "https://www.dha.gov.ae",
  lastVerified: "pending",
  fees: [
    {
      name: "Health facility license (initial)",
      amount: "≈ AED 1,500–5,000",
      notes: "Category-dependent (clinic, laboratory, etc.).",
    },
    {
      name: "Health facility renewal",
      amount: "≈ AED 1,000–3,000",
      notes: "Annual renewal, category-dependent.",
    },
    {
      name: "Inspection fee",
      amount: "≈ AED 500–2,000",
      notes: "Pre-licensing and periodic inspections.",
    },
  ],
  timelines: [
    { stage: "Application & document review", duration: "2–5 working days" },
    { stage: "Facility / premises inspection", duration: "3–10 working days" },
    { stage: "License issuance", duration: "2–7 working days after approval" },
  ],
  documents: [
    { name: "DET / DED trade license (health activity)", notes: "Issued or in progress" },
    { name: "Floor plan of facility", notes: "Approved drawings showing layout" },
    { name: "Staff qualifications / licenses", notes: "For medical and nursing staff" },
    { name: "Emirates ID / passports", notes: "Applicant and responsible person" },
    { name: "Lease / Ejari", notes: "Valid premises registration" },
  ],
  notes:
    "DHA licensing applies to health facilities and clinics; requirements vary by facility type. All figures are indicative until lastVerified is set. Re-verify against dha.gov.ae before publishing time-sensitive numbers.",
};
