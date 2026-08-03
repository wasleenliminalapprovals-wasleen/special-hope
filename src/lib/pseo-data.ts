/**
 * pSEO data loader — reads generated pSEO pages from JSON data files.
 *
 * The generation engine (scripts/pseo/generate.ts) writes pages to:
 *   - src/data/pseo/pseo-pages.json     (EN pages)
 *   - src/data/pseo/pseo-pages-ar.json   (AR entries, keyed by EN slug)
 *
 * These files may not exist yet (they are created by the cron-driven pilot
 * run), so every loader returns `[]` gracefully when the file is missing or
 * unparseable. This keeps the app buildable before the first generation.
 *
 * SERVER-ONLY: uses `node:fs`, so it must only be imported from server
 * components / route handlers (never from client components).
 *
 * @see plans/pseo-domination-engine-plan.md §5 (data files)
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { PseoPage, PseoArabicEntry } from "@/types";

const PSEO_DIR = join(process.cwd(), "src", "data", "pseo");
const PSEO_EN_JSON = join(PSEO_DIR, "pseo-pages.json");
const PSEO_AR_JSON = join(PSEO_DIR, "pseo-pages-ar.json");

function readJson<T>(filePath: string): T {
  if (!existsSync(filePath)) return [] as unknown as T;
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as T;
  } catch {
    return [] as unknown as T;
  }
}

/** All generated EN pSEO pages (empty array when none generated yet). */
export function loadPseoPages(): PseoPage[] {
  return readJson<PseoPage[]>(PSEO_EN_JSON);
}

/** All generated AR pSEO entries, keyed by EN slug (empty when none yet). */
export function loadPseoArabicEntries(): PseoArabicEntry[] {
  return readJson<PseoArabicEntry[]>(PSEO_AR_JSON);
}

/** Look up a single EN pSEO page by slug. */
export function getPseoPage(slug: string): PseoPage | undefined {
  return loadPseoPages().find((p) => p.slug === slug);
}

/** Look up a single AR pSEO entry by EN slug. */
export function getPseoArabicEntry(slug: string): PseoArabicEntry | undefined {
  return loadPseoArabicEntries().find((p) => p.slug === slug);
}

/** All pSEO slugs (used by generateStaticParams / sitemap). */
export function pseoSlugs(): string[] {
  return loadPseoPages().map((p) => p.slug);
}
