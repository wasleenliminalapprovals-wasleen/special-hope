#!/usr/bin/env node
/**
 * Verify QSC phrase update for cluster guide(s).
 * Checks per slug:
 *   1. EN: no BARE "Quality and Safety Certificate" / "Quality & Safety Certificate"
 *      remains (all must be followed by " for buildings" or be a protected compound)
 *   2. AR (embedded in pseo-pages.json): no BARE 'شهادة الجودة والسلامة' remains
 *   3. AR (pseo-pages-ar.json): no BARE 'شهادة الجودة والسلامة' remains
 *   NOTE: embedded `ar` and pseo-pages-ar entry.ar are NOT required to be identical —
 *   they are intentionally different renderings (embedded is the stripped fallback,
 *   separate file carries the rich internal-linked version). Both must be phrase-complete.
 *
 * Usage:
 *   node scripts/pseo/verify-qsc-guide.mjs <slug> [<slug>...]
 *   node scripts/pseo/verify-qsc-guide.mjs --all
 */
import { readFileSync } from 'fs';

const EN_FILE = 'src/data/pseo/pseo-pages.json';
const AR_FILE = 'src/data/pseo/pseo-pages-ar.json';

// EN protected compounds (same as qsc-phrase-update.mjs)
const EN_PROTECT_BASE = [
  'Dubai Building Quality and Safety Certificate', // official name
  'Building Quality and Safety Certificate', // already includes "building"
  'Quality and Safety Certificate for buildings', // already-correct (idempotency)
  'Quality and Safety Certificate Technical Report',
  'Quality and Safety Certificate application',
  'Quality and Safety Certificate process',
  'Quality and Safety Certificate fees',
  'Quality and Safety Certificate requirements',
  'Quality and Safety Certificate validity',
  'Quality and Safety Certificate checklist',
  'Quality and Safety Certificate service',
];

const EN_AMP_PROTECT_BASE = [
  'Quality & Safety Certificate for buildings',
  'Quality & Safety Certificate Technical Report',
  'Quality & Safety Certificate application',
  'Quality & Safety Certificate process',
  'Quality & Safety Certificate fees',
  'Quality & Safety Certificate requirements',
  'Quality & Safety Certificate validity',
  'Quality & Safety Certificate checklist',
  'Quality & Safety Certificate service',
];

/** Add plural ("...Certificates") variants of every protected compound. */
function pluralVariants(list) {
  const out = [];
  for (const p of list) {
    out.push(p);
    if (p.includes('Quality and Safety Certificate')) {
      out.push(p.replace('Quality and Safety Certificate', 'Quality and Safety Certificates'));
    } else if (p.includes('Quality & Safety Certificate')) {
      out.push(p.replace('Quality & Safety Certificate', 'Quality & Safety Certificates'));
    } else if (p.includes('Building Quality and Safety Certificate')) {
      out.push(p.replace('Building Quality and Safety Certificate', 'Building Quality and Safety Certificates'));
    }
  }
  return out;
}

const EN_PROTECT = pluralVariants(EN_PROTECT_BASE);
const EN_AMP_PROTECT = pluralVariants(EN_AMP_PROTECT_BASE);

// AR protected compounds
const AR_PROTECT = [
  'شهادة الجودة والسلامة للمباني',
  'شهادة الجودة والسلامة المباني',
  'التقرير الفني لشهادة الجودة والسلامة',
  'طلب شهادة الجودة والسلامة',
  'متطلبات شهادة الجودة والسلامة',
  'رسوم شهادة الجودة والسلامة',
  'إجراءات شهادة الجودة والسلامة',
  'صلاحية شهادة الجودة والسلامة',
  'خدمة شهادة الجودة والسلامة',
  'قائمة شهادة الجودة والسلامة',
];

function esc(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function collectStrings(obj, out = []) {
  if (typeof obj === 'string') {
    out.push(obj);
    return out;
  }
  if (Array.isArray(obj)) {
    for (const v of obj) collectStrings(v, out);
    return out;
  }
  if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) collectStrings(obj[k], out);
  }
  return out;
}

/** Return list of bare occurrences found in the joined string (case-insensitive). */
function bareOccurrences(joined, target, protects) {
  const found = [];
  let combined = joined;
  for (const p of protects) {
    // mask protected compounds with spaces of same length so target doesn't match inside
    const re = new RegExp(esc(p), 'gi');
    combined = combined.replace(re, (m) => ' '.repeat(m.length));
  }
  const re = new RegExp(esc(target), 'gi');
  let m;
  while ((m = re.exec(combined)) !== null) {
    found.push(m[0]);
  }
  return found;
}

function checkStrings(strings, lang) {
  const joined = strings.join('\n');
  if (lang === 'EN') {
    const amp = bareOccurrences(joined, 'Quality & Safety Certificate', EN_AMP_PROTECT);
    const and = bareOccurrences(joined, 'Quality and Safety Certificate', EN_PROTECT);
    return amp.concat(and);
  }
  return bareOccurrences(joined, 'شهادة الجودة والسلامة', AR_PROTECT);
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function main() {
  const args = process.argv.slice(2);
  const all = args.includes('--all');
  const slugs = args.filter((a) => !a.startsWith('--'));
  if (!all && slugs.length === 0) {
    console.error('Provide at least one slug or --all');
    process.exit(1);
  }
  const data = JSON.parse(readFileSync(EN_FILE, 'utf8'));
  const dataAr = JSON.parse(readFileSync(AR_FILE, 'utf8'));
  const targets = all ? data.map((p) => p.slug) : slugs;

  let ok = true;
  for (const slug of targets) {
    const page = data.find((p) => p.slug === slug);
    const arEntry = dataAr.find((e) => e.slug === slug);
    if (!page || !arEntry) {
      console.log('[FAIL] ' + slug + ': entry missing');
      ok = false;
      continue;
    }
    const problems = [];
    const notes = [];
    // 1. embedded ar presence + informational divergence note
    const embeddedAr = page.ar ?? null;
    if (!embeddedAr) {
      problems.push('missing embedded ar');
    } else if (!deepEqual(embeddedAr, arEntry.ar)) {
      notes.push('embedded ar != pseo-ar entry (expected: different renderings)');
    }
    // 2. EN bare occurrences
    const enStrings = collectStrings({ ...page, ar: undefined });
    const enBare = checkStrings(enStrings, 'EN');
    if (enBare.length) problems.push('EN bare occurrences: ' + enBare.length);
    // 3. AR bare occurrences (check both embedded + separate)
    const arStrings = collectStrings(embeddedAr || {});
    const arBare = checkStrings(arStrings, 'AR');
    if (arBare.length) problems.push('AR bare occurrences: ' + arBare.length);
    const arStrings2 = collectStrings(arEntry.ar || {});
    const arBare2 = checkStrings(arStrings2, 'AR');
    if (arBare2.length) problems.push('AR(pseo-ar) bare occurrences: ' + arBare2.length);

    if (problems.length) {
      console.log('[FAIL] ' + slug + ': ' + problems.join('; '));
      ok = false;
    } else {
      console.log('[OK]   ' + slug + (notes.length ? ' (' + notes.join('; ') + ')' : ''));
    }
  }
  console.log(ok ? '\nALL PASS' : '\nFAILURES PRESENT');
  process.exit(ok ? 0 : 1);
}

main();
