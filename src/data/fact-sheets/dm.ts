import type { FactSheet } from "../../types";

/**
 * Fact sheet — Dubai Municipality (DM)
 * Single source of truth for verified DM fees, timelines and documents.
 * STATUS: "pending" — all figures are INDICATIVE and MUST be verified by the
 * user against current DM fee schedules before pages are marked "auto".
 */
export const dmFactSheet: FactSheet = {
  key: "dm",
  name: "Dubai Municipality",
  nameAr: "بلدية دبي",
  portalUrl: "https://www.dm.gov.ae",
  lastVerified: "pending",
  fees: [
    {
      name: "Building permit fee",
      amount: "≈ AED 25–35 per sq ft (or % of construction value)",
      notes: "Calculated on gross floor area / value of works; varies by zone and type.",
    },
    {
      name: "Preliminary building permit (pre-permit)",
      amount: "≈ AED 500–1,500",
      notes: "Concept/preliminary approval before detailed drawings.",
    },
    {
      name: "NOC fee",
      amount: "≈ AED 120–500 per NOC",
      notes: "Typical for authority-to-authority no-objection certificates.",
    },
    {
      name: "Completion certificate",
      amount: "≈ AED 1,000–3,000 (indicative)",
      notes: "Based on project category and inspection complexity.",
    },
    {
      name: "Signage permit",
      amount: "≈ AED 100–2,000",
      notes: "Varies by sign type, size and location.",
    },
    {
      name: "Knowledge & Innovation Dirham",
      amount: "AED 10 + 10% of applicable fee",
      notes: "Statutory levy added to most DM transactions.",
    },
  ],
  timelines: [
    { stage: "Preliminary / pre-permit review", duration: "2–5 working days" },
    { stage: "Building permit technical review", duration: "3–10 working days" },
    { stage: "NOC issuance", duration: "1–3 working days after authority sign-off" },
    { stage: "Inspection (works inspection / final)", duration: "Within 2–7 working days of request" },
    { stage: "Completion certificate issuance", duration: "5–15 working days after passing final inspection" },
  ],
  documents: [
    { name: "Title deed (for owner) or registered lease / tenancy contract", notes: "Must be registered and valid" },
    { name: "Dubai Municipality building drawings (approved sets)", notes: "Site plan, floor plans, elevations, sections" },
    { name: "NOCs from relevant authorities", notes: "DCD, DEWA, RTA, developer/community as applicable" },
    { name: "Structural / MEP calculations", notes: "Stamp by certified engineer where required" },
    { name: "Completed application form + applicable fees", notes: "Via DM smart services / DubaiNow portal" },
    { name: "Emirates ID / passport of applicant", notes: "Copy of authorised signatory" },
  ],
  notes:
    "Dubai Municipality fees change periodically. All figures are indicative until lastVerified is set. Re-verify against dm.gov.ae or the DM smart services portal before publishing time-sensitive numbers.",
};
