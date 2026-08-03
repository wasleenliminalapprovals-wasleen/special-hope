import type { FactSheet } from "../../types";
import { dmFactSheet } from "./dm";
import { dcdFactSheet } from "./dcd";
import { dewaFactSheet } from "./dewa";
import { ddaFactSheet } from "./dda";
import { dedFactSheet } from "./ded";
import { reraFactSheet } from "./rera";
import { rtaFactSheet } from "./rta";
import { dubaiPoliceFactSheet } from "./dubai-police";
import { dhaFactSheet } from "./dha";
import { dtcmFactSheet } from "./dtcm";

/**
 * Per-authority fact sheets — single source of truth for verified fees,
 * timelines and documents. The generation engine MUST source every concrete
 * number from these sheets (never invent figures outside them).
 *
 * All sheets start with `lastVerified: "pending"`. Pages generated from a
 * "pending" sheet are flagged `reviewStatus: "needs-review"` until the user
 * confirms the figures and sets `lastVerified` to a real date.
 *
 * @see plans/pseo-domination-engine-plan.md §2 (fact gate)
 */
export const FACT_SHEETS: FactSheet[] = [
  dmFactSheet,
  dcdFactSheet,
  dewaFactSheet,
  ddaFactSheet,
  dedFactSheet,
  reraFactSheet,
  rtaFactSheet,
  dubaiPoliceFactSheet,
  dhaFactSheet,
  dtcmFactSheet,
];

/** Lookup a fact sheet by authority key (matches AUTHORITY_BY_APPROVAL values). */
export function getFactSheet(key: string): FactSheet | undefined {
  return FACT_SHEETS.find((sheet) => sheet.key === key);
}

/** All authority keys currently covered by a fact sheet. */
export const FACT_SHEET_KEYS: string[] = FACT_SHEETS.map((sheet) => sheet.key);

/**
 * True when every fact sheet has been human-verified (lastVerified is a date).
 * The generator can treat this as a signal that fact-flagged pages are safe
 * to be published without manual intervention.
 */
export function allFactSheetsVerified(): boolean {
  return FACT_SHEETS.every((sheet) => sheet.lastVerified !== "pending");
}
