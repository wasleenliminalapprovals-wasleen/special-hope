#!/usr/bin/env node
/** Diff embedded `ar` (pseo-pages.json) vs pseo-pages-ar.json entry.ar for a slug. */
import { readFileSync } from 'fs';

const EN_FILE = 'src/data/pseo/pseo-pages.json';
const AR_FILE = 'src/data/pseo/pseo-pages-ar.json';

function diffPaths(a, b, path, out) {
  if (JSON.stringify(a) === JSON.stringify(b)) return;
  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
    out.push(path + ':\n  embedded: ' + JSON.stringify(a) + '\n  separate: ' + JSON.stringify(b));
    return;
  }
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) {
    diffPaths(a[k], b[k], path + '.' + k, out);
  }
}

const slug = process.argv[2];
if (!slug) {
  console.error('usage: node scripts/pseo/diff-ar-embedded.mjs <slug>');
  process.exit(1);
}
const data = JSON.parse(readFileSync(EN_FILE, 'utf8'));
const dataAr = JSON.parse(readFileSync(AR_FILE, 'utf8'));
const page = data.find((p) => p.slug === slug);
const arEntry = dataAr.find((e) => e.slug === slug);
if (!page || !arEntry) {
  console.error('entry missing for ' + slug);
  process.exit(1);
}
const out = [];
diffPaths(page.ar, arEntry.ar, 'ar', out);
if (out.length === 0) {
  console.log('IDENTICAL for ' + slug);
} else {
  console.log('DIFFS for ' + slug + ' (' + out.length + '):');
  for (const d of out) console.log('\n' + d);
}
