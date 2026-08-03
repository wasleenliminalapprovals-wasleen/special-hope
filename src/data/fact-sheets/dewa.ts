import type { FactSheet } from "../../types";

/**
 * Fact sheet — Dubai Electricity & Water Authority (DEWA)
 * Single source of truth for verified DEWA fees, timelines and documents.
 * STATUS: "pending" — all figures are INDICATIVE and MUST be verified by the
 * user against current DEWA tariffs before pages are marked "auto".
 */
export const dewaFactSheet: FactSheet = {
  key: "dewa",
  name: "Dubai Electricity and Water Authority",
  nameAr: "هيئة كهرباء ومياه دبي",
  portalUrl: "https://www.dewa.gov.ae",
  lastVerified: "pending",
  fees: [
    {
      name: "New connection (electricity) fee",
      amount: "≈ AED 100–300 + per-kVA charges",
      notes: "Connection fee based on load; meter installation additional.",
    },
    {
      name: "Meter installation fee",
      amount: "≈ AED 300–500",
      notes: "Per meter, subject to DEWA tariff schedule.",
    },
    {
      name: "NOC fee",
      amount: "≈ AED 100–500",
      notes: "Typical for connection NOC / clearance NOC.",
    },
    {
      name: "Security deposit (electricity)",
      amount: "Refundable, based on load",
      notes: "Calculated per kVA; returned at account closure.",
    },
    {
      name: "Load enhancement fee",
      amount: "Varies with added load (kVA)",
      notes: "Assessed on engineering review of load increase.",
    },
  ],
  timelines: [
    { stage: "Application & document check", duration: "1–2 working days" },
    { stage: "Engineering review / NOC", duration: "3–7 working days" },
    { stage: "Connection works / meter installation", duration: "5–10 working days after approval" },
    { stage: "Final energisation / activation", duration: "1–3 working days after inspection" },
  ],
  documents: [
    { name: "Title deed or registered lease / tenancy", notes: "Valid registration" },
    { name: "Dubai Municipality building permit", notes: "For new connections / fit-outs" },
    { name: "Electrical layout / single-line drawings", notes: "Stamped by certified engineer" },
    { name: "Passport / Emirates ID of applicant", notes: "Authorised signatory" },
    { name: "NOC from developer / community", notes: "Where applicable" },
  ],
  notes:
    "DEWA tariffs and connection fees are published on dewa.gov.ae and updated periodically. All figures are indicative until lastVerified is set. Re-verify before publishing time-sensitive numbers.",
};
