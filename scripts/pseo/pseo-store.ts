import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import type { PseoArabicContent, PseoPage } from "../../src/types";
import { PSEO_AR_JSON, PSEO_EN_JSON } from "./queue";

/**
 * Append-safe JSON store for generated pSEO pages.
 *
 * The engine writes JSON data files (not TS) so a cron run can safely append
 * without TypeScript compilation, and the Next.js app reads them at build time
 * (tsconfig has `resolveJsonModule: true`).
 *
 * Files:
 *   - src/data/pseo/pseo-pages.json      → PseoPage[] (EN canonical + embedded ar)
 *   - src/data/pseo/pseo-pages-ar.json    → { slug, ar }[] (Arabic parity source)
 */

function readJson<T>(path: string, fallback: T): T {
  if (!existsSync(path)) return fallback;
  try {
    return JSON.parse(readFileSync(path, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson(path: string, data: unknown): void {
  const dir = dirname(path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n", "utf8");
}

/** Load all generated EN pSEO pages. */
export function loadPseoPages(): PseoPage[] {
  return readJson<PseoPage[]>(PSEO_EN_JSON, []);
}

/** Load all generated AR pSEO entries. */
export function loadPseoArabicEntries(): { slug: string; ar: PseoArabicContent }[] {
  return readJson(PSEO_AR_JSON, []);
}

/** Append one EN page (dedup by slug) and return the updated list. */
export function appendPseoPage(page: PseoPage): PseoPage[] {
  const pages = loadPseoPages().filter((p) => p.slug !== page.slug);
  pages.push(page);
  writeJson(PSEO_EN_JSON, pages);
  return pages;
}

/** Append one AR entry (dedup by slug) and return the updated list. */
export function appendPseoArabicEntry(entry: { slug: string; ar: PseoArabicContent }): void {
  const entries = loadPseoArabicEntries().filter((e) => e.slug !== entry.slug);
  entries.push(entry);
  writeJson(PSEO_AR_JSON, entries);
}

/** Remove a page + its AR entry by slug (used when a generation fails fatally). */
export function removePseoPage(slug: string): void {
  const pages = loadPseoPages().filter((p) => p.slug !== slug);
  writeJson(PSEO_EN_JSON, pages);
  const entries = loadPseoArabicEntries().filter((e) => e.slug !== slug);
  writeJson(PSEO_AR_JSON, entries);
}
