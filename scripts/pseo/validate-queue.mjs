#!/usr/bin/env node
/**
 * Validate scripts/pseo/queue.json:
 *  1. queue.json is valid JSON
 *  2. no duplicate slugs inside the queue
 *  3. no slug collides with existing guides.ts / approvals.ts slugs
 *  4. every relatedApprovalSlugs entry exists in approvals.ts
 *
 * Run: node scripts/pseo/validate-queue.mjs
 * Exit 0 = valid, 1 = problems found.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

/** Extract slug strings from a TS data file (`slug: "..."`). */
function slugsFromTs(file) {
  const re = /slug:\s*"([^"]+)"/g;
  const out = [];
  let m;
  while ((m = re.exec(file)) !== null) out.push(m[1]);
  return out;
}

let errors = 0;
const report = (msg) => {
  console.log("  ✗ " + msg);
  errors++;
};

console.log("Validating pSEO queue...\n");

let queue;
try {
  queue = JSON.parse(read("scripts/pseo/queue.json"));
} catch (e) {
  console.error("INVALID JSON in queue.json:", e.message);
  process.exit(1);
}

if (!Array.isArray(queue.items) || queue.items.length === 0) {
  console.error("queue.json must contain a non-empty `items` array.");
  process.exit(1);
}

const guides = new Set(slugsFromTs(read("src/data/guides.ts")));
const approvals = new Set(slugsFromTs(read("src/data/approvals.ts")));

console.log(`Existing guides: ${guides.size}`);
console.log(`Existing approvals: ${approvals.size}`);
console.log(`Queue items: ${queue.items.length}\n`);

const seen = new Set();
for (const item of queue.items) {
  if (!item.slug) {
    report(`item ${item.id} has no slug`);
    continue;
  }
  if (seen.has(item.slug)) report(`duplicate queue slug: ${item.slug}`);
  seen.add(item.slug);

  if (guides.has(item.slug)) report(`collides with existing guide slug: ${item.slug}`);
  if (approvals.has(item.slug)) report(`collides with existing approval slug: ${item.slug}`);

  if (!item.kind) report(`item ${item.slug} missing kind`);
  if (!item.title) report(`item ${item.slug} missing title`);
  if (typeof item.priority !== "number") report(`item ${item.slug} missing numeric priority`);
  if (!item.scheduledDate) report(`item ${item.slug} missing scheduledDate`);

  for (const r of item.relatedApprovalSlugs || []) {
    if (!approvals.has(r)) report(`item ${item.slug}: relatedApprovalSlug not in approvals.ts -> ${r}`);
  }
}

// Sanity: every pilot guide imageHint should be resolvable later (not validated here).

if (errors === 0) {
  console.log("QUEUE VALID — no collisions, all related approval slugs resolve.");
  process.exit(0);
} else {
  console.log(`\n${errors} problem(s) found. Fix queue.json and re-run.`);
  process.exit(1);
}
