import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { PseoQueueFile, PseoQueueItem } from "./types";

/** Project root (…/wasleen-liminal-approvals) */
export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

export const QUEUE_PATH = join(ROOT, "scripts", "pseo", "queue.json");
export const PSEO_EN_JSON = join(ROOT, "src", "data", "pseo", "pseo-pages.json");
export const PSEO_AR_JSON = join(ROOT, "src", "data", "pseo", "pseo-pages-ar.json");

export function loadQueue(): PseoQueueItem[] {
  const raw = JSON.parse(readFileSync(QUEUE_PATH, "utf8")) as PseoQueueFile;
  return raw.items ?? [];
}

export function saveQueue(items: PseoQueueItem[]): void {
  const data: PseoQueueFile = { items };
  writeFileSync(QUEUE_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
}

/** Pick the next `batchSize` pending items (priority DESC, then scheduledDate ASC). */
export function getNextBatch(
  items: PseoQueueItem[],
  batchSize = 3,
  todayISO = new Date().toISOString().slice(0, 10)
): PseoQueueItem[] {
  return items
    .filter((i) => i.status === "pending" && i.scheduledDate <= todayISO)
    .sort((a, b) => b.priority - a.priority || a.scheduledDate.localeCompare(b.scheduledDate))
    .slice(0, batchSize);
}

/** Extract slug strings from a TS data file (`slug: "..."`). */
function slugsFromTs(fileText: string): string[] {
  const re = /slug:\s*"([^"]+)"/g;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(fileText)) !== null) out.push(m[1]);
  return out;
}

/**
 * All slugs that must never be regenerated: existing approval pages,
 * existing guide pages, and any already-generated pSEO pages.
 */
export function existingSlugs(): Set<string> {
  const slugs = new Set<string>();

  const guidesPath = join(ROOT, "src", "data", "guides.ts");
  const approvalsPath = join(ROOT, "src", "data", "approvals.ts");
  if (existsSync(guidesPath)) slugsFromTs(readFileSync(guidesPath, "utf8")).forEach((s) => slugs.add(s));
  if (existsSync(approvalsPath)) slugsFromTs(readFileSync(approvalsPath, "utf8")).forEach((s) => slugs.add(s));

  // Already-generated pSEO pages (EN + AR slugs share the same URL namespace).
  if (existsSync(PSEO_EN_JSON)) {
    const pages = JSON.parse(readFileSync(PSEO_EN_JSON, "utf8")) as { slug: string }[];
    pages.forEach((p) => slugs.add(p.slug));
  }
  return slugs;
}

/** Apply a partial patch to one queue item by id. */
export function updateQueueItem(
  items: PseoQueueItem[],
  id: string,
  patch: Partial<PseoQueueItem>
): void {
  const item = items.find((i) => i.id === id);
  if (item) Object.assign(item, patch);
}
