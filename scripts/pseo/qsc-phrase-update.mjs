#!/usr/bin/env node
/**
 * QSC Phrase Update helper — "Quality and Safety Certificate" -> "...for buildings"
 * Scope: pages built from plans/law-3-2026-content-cluster-plan.md (cluster guides in pseo-pages.json + pseo-pages-ar.json)
 *
 * Usage:
 *   node scripts/pseo/qsc-phrase-update.mjs --dump <slug> [<slug>...]
 *   node scripts/pseo/qsc-phrase-update.mjs --apply <slug> [<slug>...]
 *   node scripts/pseo/qsc-phrase-update.mjs --dump --all
 *
 * Modes:
 *   --dump  : print every target occurrence with JSON path + context (no writes)
 *   --apply : transform and write files, printing a per-field report
 */
import { readFileSync, writeFileSync } from 'fs';

const EN_FILE = 'src/data/pseo/pseo-pages.json';
const AR_FILE = 'src/data/pseo/pseo-pages-ar.json';

const EN_ADD = ' for buildings';
const AR_ADD = ' للمباني';

// EN protected forms (official names + compound technical phrases). Matched case-insensitively.
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

// AR protected forms (compound technical phrases). Target is 'شهادة الجودة والسلامة'.
const AR_PROTECT = [
  'شهادة الجودة والسلامة للمباني', // already-correct (idempotency)
  'شهادة الجودة والسلامة المباني', // followed by "المباني" as object/construct (avoid "للمباني المباني")
  'التقرير الفني لشهادة الجودة والسلامة', // Technical Report
  'طلب شهادة الجودة والسلامة', // application
  'متطلبات شهادة الجودة والسلامة', // requirements
  'رسوم شهادة الجودة والسلامة', // fees
  'إجراءات شهادة الجودة والسلامة', // process
  'صلاحية شهادة الجودة والسلامة', // validity
  'خدمة شهادة الجودة والسلامة', // service
  'قائمة شهادة الجودة والسلامة', // checklist
];

function esc(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function countOcc(str, target) {
  const re = new RegExp(esc(target), 'gi');
  let c = 0;
  while (re.exec(str)) c++;
  return c;
}

/** Layer-based transform: sentinel protected forms, replace target, restore. Case-preserving. */
function transformLayers(s, layers) {
  const sents = [];
  let out = s;
  for (const L of layers) {
    const sorted = [...L.protect].sort((a, b) => b.length - a.length);
    for (const p of sorted) {
      const re = new RegExp(esc(p), 'gi');
      out = out.replace(re, (m) => {
        const tok = '@@QSC' + sents.length + '@@';
        sents.push(m);
        return tok;
      });
    }
    // Capture optional trailing plural "s" (e.g. "Certificates") so it isn't stranded
    // after the inserted addendum: "Certificate" + "s" -> "Certificates for buildings".
    const re = new RegExp('(' + esc(L.target) + ')(s?)', 'gi');
    out = out.replace(re, (m, base, pluralS) => base + pluralS + L.add);
  }
  sents.forEach((orig, i) => {
    out = out.split('@@QSC' + i + '@@').join(orig);
  });
  return out;
}

function transformEN(s) {
  return transformLayers(s, [
    { target: 'Quality & Safety Certificate', add: EN_ADD, protect: EN_AMP_PROTECT },
    { target: 'Quality and Safety Certificate', add: EN_ADD, protect: EN_PROTECT },
  ]);
}

function transformAR(s) {
  return transformLayers(s, [
    { target: 'شهادة الجودة والسلامة', add: AR_ADD, protect: AR_PROTECT },
  ]);
}

function walk(obj, path, transformFn, changes) {
  if (typeof obj === 'string') {
    const before = obj;
    const after = transformFn(obj);
    if (after !== before) changes.push({ path, before, after });
    return after;
  }
  if (Array.isArray(obj)) {
    return obj.map((v, i) => walk(v, path + '[' + i + ']', transformFn, changes));
  }
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const k of Object.keys(obj)) {
      out[k] = walk(obj[k], path + '.' + k, transformFn, changes);
    }
    return out;
  }
  return obj;
}

function firstDiffSnippet(before, after) {
  let i = 0;
  while (i < before.length && i < after.length && before[i] === after[i]) i++;
  const b = '…' + before.slice(Math.max(0, i - 45), i + 100).replace(/\n/g, '\\n') + '…';
  const a = '…' + after.slice(Math.max(0, i - 45), i + 100).replace(/\n/g, '\\n') + '…';
  return b + '  ==>  ' + a;
}

function main() {
  const args = process.argv.slice(2);
  const mode = args.includes('--dump') ? 'dump' : args.includes('--apply') ? 'apply' : null;
  if (!mode) {
    console.error('Usage: node scripts/pseo/qsc-phrase-update.mjs (--dump|--apply) <slug>... | --all');
    process.exit(1);
  }
  const rest = args.filter((a) => a !== '--dump' && a !== '--apply');
  const all = rest.includes('--all');
  const slugs = all ? [] : rest.filter((a) => !a.startsWith('--'));
  if (!all && slugs.length === 0) {
    console.error('Provide at least one slug or --all');
    process.exit(1);
  }

  const data = JSON.parse(readFileSync(EN_FILE, 'utf8'));
  const dataAr = JSON.parse(readFileSync(AR_FILE, 'utf8'));

  const targets = all ? data.map((p) => p.slug) : slugs;
  let totalChanges = 0;

  for (const slug of targets) {
    const page = data.find((p) => p.slug === slug);
    if (!page) {
      console.error('EN slug not found: ' + slug);
      process.exit(1);
    }
    const arEntry = dataAr.find((e) => e.slug === slug);
    if (!arEntry) {
      console.error('AR slug not found: ' + slug);
      process.exit(1);
    }
    console.log('\n==== ' + slug + ' ====');
    const changes = [];
    const newPage = {};
    for (const k of Object.keys(page)) {
      if (k === 'ar') {
        newPage.ar = walk(page.ar, 'ar', transformAR, changes);
      } else {
        newPage[k] = walk(page[k], 'EN.' + k, transformEN, changes);
      }
    }
    const arChanges = [];
    arEntry.ar = walk(arEntry.ar, 'AR.ar', transformAR, arChanges);

    for (const c of changes) {
      console.log('  [' + c.path + ']  ' + firstDiffSnippet(c.before, c.after));
    }
    for (const c of arChanges) {
      console.log('  [' + c.path + ']  ' + firstDiffSnippet(c.before, c.after));
    }
    totalChanges += changes.length + arChanges.length;
    if (changes.length + arChanges.length === 0) console.log('  (no changes)');

    if (mode === 'apply') {
      const idx = data.indexOf(page);
      data[idx] = newPage;
    }
  }

  if (mode === 'apply') {
    const endsNL = (f) => /\]\n$/.test(readFileSync(f, 'utf8'));
    writeFileSync(EN_FILE, JSON.stringify(data, null, 2) + (endsNL(EN_FILE) ? '\n' : ''));
    writeFileSync(AR_FILE, JSON.stringify(dataAr, null, 2) + (endsNL(AR_FILE) ? '\n' : ''));
    console.log('\nWROTE ' + EN_FILE + ' and ' + AR_FILE + ' (' + totalChanges + ' field changes)');
  } else {
    console.log('\nDUMP total fields with occurrences: ' + totalChanges + ' (dry run, no write)');
  }
}

main();
