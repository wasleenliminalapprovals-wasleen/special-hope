import type { FactSheet } from "../../types";

/**
 * Fact sheet — Dubai Department of Economy & Tourism (Tourism) / DTCM
 * Single source of truth for verified tourism-license fees, timelines and documents.
 * STATUS: "pending" — all figures are INDICATIVE and MUST be verified by the
 * user against current DET-tourism fee schedules before pages are marked "auto".
 */
export const dtcmFactSheet: FactSheet = {
  key: "dtcm",
  name: "Dubai Department of Economy and Tourism (Tourism)",
  nameAr: "دائرة الاقتصاد والسياحة (السياحة)",
  portalUrl: "https://www.dubaitourism.gov.ae",
  lastVerified: "pending",
  fees: [
    {
      name: "Tourism license (initial)",
      amount: "≈ AED 3,000–10,000+",
      notes: "Category-dependent (hotel, travel agency, tour operator).",
    },
    {
      name: "Tourism license renewal",
      amount: "≈ AED 2,000–8,000",
      notes: "Annual renewal, category-dependent.",
    },
    {
      name: "Hotel / establishment classification fee",
      amount: "Varies by star rating",
      notes: "Classification assessments on a schedule.",
    },
    {
      name: "Entertainment / events approval",
      amount: "≈ AED 500–5,000",
      notes: "Depends on event type and venue.",
    },
  ],
  timelines: [
    { stage: "Application & document review", duration: "2–5 working days" },
    { stage: "Premises inspection / classification", duration: "3–10 working days" },
    { stage: "License issuance", duration: "2–7 working days after approval" },
  ],
  documents: [
    { name: "DET / DED trade license (tourism activity)", notes: "Issued or in progress" },
    { name: "Lease / Ejari for premises", notes: "Valid registration" },
    { name: "Floor plan / layout", notes: "Approved drawings" },
    { name: "Insurance / bonding", notes: "Per license category" },
    { name: "Staff details / credentials", notes: "Where applicable" },
  ],
  notes:
    "Tourism licensing covers hotels, travel agents, tour operators and entertainment venues. All figures are indicative until lastVerified is set. Re-verify against dubaitourism.gov.ae before publishing time-sensitive numbers.",
};
