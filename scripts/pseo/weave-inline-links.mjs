// weave-inline-links.mjs
// pSEO maintenance script: weaves mid-content internal links into the Law 3/2026 content cluster
// pages (EN + AR stores) that currently have too few inline links to pass check-inline-links.mjs.
//
// Threshold (mirrors check-inline-links.mjs):
//   total >= 4 && total <= 6 && inlineSectionCount >= 3 && dupes.length === 0
// where links are counted in directAnswer + non-"Related Dubai approvals" sections.
//
// Passes (all scoped to the Law 3/2026 cluster — parentApprovalSlug === 'dubai-building-quality-safety-certificate'):
//   A. Normalize absolute URLs -> relative (https://www.dubaiapprovalconsultants.com/... -> /...)
//   B. Dedupe: if a link URL appears more than once in the counted scope, keep the first instance
//      and unwrap the rest back to plain anchor text (prevents checker DUPES).
//   C. Filler: for pages still below threshold, append a pillar CTA paragraph to the
//      "How Wasleen Approvals Can Help" section and sibling-guide linking paragraphs to distinct
//      sections until total/sections meet the threshold. Sibling slugs are auto-derived from each
//      page's relatedSlugs; anchor text uses real titles from the stores.
//
// Usage: node scripts/pseo/weave-inline-links.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const EN_PATH = 'src/data/pseo/pseo-pages.json';
const AR_PATH = 'src/data/pseo/pseo-pages-ar.json';

const PILLAR_SLUG = 'dubai-building-quality-safety-certificate';
const EXCLUDE_RE = /^Related Dubai approvals|^الموافقات ذات الصلة|^تصاريح دبي ذات الصلة|^موافقات ذات صلة/;
const HELP_RE = /how wasleen|how we can help|how we help|wasleen approvals can help/i;

const EN_PILLAR_URL = `/approvals/${PILLAR_SLUG}`;
const AR_PILLAR_URL = `/ar/approvals/${PILLAR_SLUG}`;

const EN_PILLAR_ANCHOR = 'Dubai Building Quality Safety Certificate';
const AR_PILLAR_ANCHOR = 'شهادة الجودة والسلامة';

const EN_PILLAR_SENTENCE =
  `For help obtaining your certificate, Wasleen Approvals manages the full [${EN_PILLAR_ANCHOR}](${EN_PILLAR_URL}) ` +
  'process — from Technical Report preparation to submission and follow-up until approval.';

const AR_PILLAR_SENTENCE =
  `لمساعدتك في الحصول على الشهادة، تتولى وسلين للاستشارات إدارة عملية [${AR_PILLAR_ANCHOR}](${AR_PILLAR_URL}) ` +
  'بالكامل — من إعداد التقرير الفني إلى التقديم والمتابعة حتى الاعتماد.';

const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;

function extractLinks(text) {
  const links = [];
  const re = new RegExp(linkRe.source, 'g');
  let m;
  while ((m = re.exec(text)) !== null) links.push(m[2]);
  return links;
}

/* Walk every text location (directAnswer + all blocks of non-excluded sections) and invoke
   cb(location) where location has get()/set(s). Document order is preserved. The setter writes
   back to the underlying store field so mutations persist. */
function walkCountedTexts(body, cb) {
  const call = (get, set) => cb({ get, set });
  // directAnswer first (checker counts it in `all`)
  if (typeof body.directAnswer === 'string') {
    call(() => body.directAnswer, (s) => { body.directAnswer = s; });
  }
  for (const sec of body.sections || []) {
    if (EXCLUDE_RE.test(sec.heading || '')) continue;
    const walkBlock = (b) => {
      if (!b || typeof b !== 'object') return;
      if (typeof b.text === 'string') call(() => b.text, (s) => { b.text = s; });
      if (Array.isArray(b.items)) {
        for (let i = 0; i < b.items.length; i++) {
          const idx = i;
          call(() => b.items[idx], (s) => { b.items[idx] = s; });
        }
      }
      if (Array.isArray(b.rows)) {
        for (let r = 0; r < b.rows.length; r++) {
          for (let c = 0; c < b.rows[r].length; c++) {
            const ri = r;
            const ci = c;
            call(() => b.rows[ri][ci], (s) => { b.rows[ri][ci] = s; });
          }
        }
      }
    };
    for (const b of sec.blocks || []) walkBlock(b);
  }
}

/* Mirror check-inline-links.mjs counting on the counted scope. */
function computeState(body) {
  const direct = [];
  if (typeof body.directAnswer === 'string') direct.push(...extractLinks(body.directAnswer));
  const para = [];
  let inlineSections = 0;
  for (const sec of body.sections || []) {
    if (EXCLUDE_RE.test(sec.heading || '')) continue;
    let secCount = 0;
    const walk = (b) => {
      if (!b || typeof b !== 'object') return;
      if (typeof b.text === 'string') {
        const ls = extractLinks(b.text);
        para.push(...ls);
        secCount += ls.length;
      }
      if (Array.isArray(b.items)) for (const it of b.items) walk({ text: it });
      if (Array.isArray(b.rows)) for (const row of b.rows) for (const cell of row) walk({ text: cell });
    };
    for (const b of sec.blocks || []) walk(b);
    if (secCount > 0) inlineSections++;
  }
  const all = [...direct, ...para];
  const dupes = all.filter((u, i) => all.indexOf(u) !== i);
  return {
    total: all.length,
    inlineSections,
    dupes: [...new Set(dupes)],
    urls: [...new Set(all)],
  };
}

function isOk(s) {
  return s.total >= 4 && s.total <= 6 && s.inlineSections >= 3 && s.dupes.length === 0;
}

function sectionLinkCount(sec) {
  let n = 0;
  const walk = (b) => {
    if (!b || typeof b !== 'object') return;
    if (typeof b.text === 'string') n += extractLinks(b.text).length;
    if (Array.isArray(b.items)) for (const it of b.items) walk({ text: it });
    if (Array.isArray(b.rows)) for (const row of b.rows) for (const cell of row) walk({ text: cell });
  };
  for (const b of sec.blocks || []) walk(b);
  return n;
}

/* Pass A: strip the absolute domain prefix so links use the relative site convention. */
function normalizeAbsolute(body) {
  let changed = false;
  walkCountedTexts(body, (loc) => {
    const t = loc.get();
    if (t.includes('https://www.dubaiapprovalconsultants.com')) {
      loc.set(t.split('https://www.dubaiapprovalconsultants.com').join(''));
      changed = true;
    }
  });
  return changed;
}

/* Pass B: keep the first occurrence of each link URL in the counted scope; unwrap later ones. */
function dedupeLinks(body) {
  let changed = false;
  const seen = new Set();
  walkCountedTexts(body, (loc) => {
    const text = loc.get();
    const re = new RegExp(linkRe.source, 'g');
    const matches = [];
    let m;
    while ((m = re.exec(text)) !== null) matches.push({ anchor: m[1], url: m[2], start: m.index, end: re.lastIndex });
    let rebuilt = false;
    let out = '';
    let idx = 0;
    for (const o of matches) {
      out += text.slice(idx, o.start);
      if (seen.has(o.url)) {
        out += o.anchor; // unwrap duplicate link to plain text
        rebuilt = true;
      } else {
        seen.add(o.url);
        out += text.slice(o.start, o.end);
      }
      idx = o.end;
    }
    if (rebuilt) {
      out += text.slice(idx);
      loc.set(out);
      changed = true;
    }
  });
  return changed;
}

/* Cleanup pass: remove paragraph blocks that have no string text. Earlier buggy runs pushed
   { type:'paragraph', text: undefined } which JSON.stringify collapses to an empty paragraph.
   Safe and idempotent — only strips text-less paragraph blocks. */
function cleanupEmptyParagraphs(body) {
  let removed = 0;
  for (const sec of body.sections || []) {
    if (!Array.isArray(sec.blocks)) continue;
    const kept = [];
    for (const b of sec.blocks) {
      if (b && b.type === 'paragraph' && typeof b.text !== 'string') {
        removed++;
        continue;
      }
      kept.push(b);
    }
    if (kept.length !== sec.blocks.length) sec.blocks = kept;
  }
  return removed > 0;
}

/* Pass C: deterministic filler — append pillar CTA + sibling-guide linking paragraphs until the
   checker threshold is met. opts: { pillarUrl, pillarSentence, siblings: [{url, text}] }. */
function weaveFiller(body, opts) {
  let state = computeState(body);
  if (isOk(state)) return false;

  const eligible = (body.sections || [])
    .map((s, i) => ({ s, i }))
    .filter(({ s }) => s.heading && s.heading.trim() !== '' && !EXCLUDE_RE.test(s.heading));
  const fallbackEligible = (body.sections || [])
    .map((s, i) => ({ s, i }))
    .filter(({ s }) => !EXCLUDE_RE.test(s.heading || ''));
  if (eligible.length === 0 && fallbackEligible.length === 0) {
    console.error(`  [warn] ${opts.label}: no eligible sections to weave into`);
    return false;
  }
  const help = eligible.find((e) => HELP_RE.test(e.s.heading)) || null;

  const pool = [];
  if (!state.urls.includes(opts.pillarUrl)) {
    pool.push({ url: opts.pillarUrl, text: opts.pillarSentence });
  }
  for (const sib of opts.siblings) {
    if (!state.urls.includes(sib.url)) pool.push(sib);
  }
  if (pool.length === 0) {
    console.error(`  [warn] ${opts.label}: no new links available to add`);
    return false;
  }

  const currentUrls = () => new Set(computeState(body).urls);
  const sectionsForTarget = () => {
    const targets = eligible.length > 0 ? eligible : fallbackEligible;
    // prefer a section with no inline links yet (grows section count), else fall back to help/last
    const unlinked = targets.filter((e) => sectionLinkCount(e.s) === 0);
    if (unlinked.length > 0) return unlinked[0];
    return help || targets[targets.length - 1];
  };

  let poolIdx = 0;
  let guard = 0;
  while (guard++ < 12) {
    const st = computeState(body);
    if (isOk(st)) break;
    // never let the total exceed the checker's upper bound (6)
    if (st.total >= 6) break;
    const used = currentUrls();
    let chosen = null;
    for (let k = 0; k < pool.length; k++) {
      const cand = pool[(poolIdx + k) % pool.length];
      if (!used.has(cand.url)) {
        chosen = cand;
        poolIdx = (poolIdx + k + 1) % pool.length;
        break;
      }
    }
    if (!chosen) break;
    const target = sectionsForTarget();
    // text is guaranteed: pillar entries use `text`; sibling entries use `text`
    target.s.blocks.push({ type: 'paragraph', text: chosen.text ?? chosen.sentence });
  }
  return true;
}

/* ---- Build per-language sibling lists from the EN relatedSlugs ---- */
function buildSiblingPool(enPage, enTitleById, arTitleById) {
  const siblings = [];
  for (const slug of enPage.relatedSlugs || []) {
    if (slug === PILLAR_SLUG) continue;
    if (slug === enPage.slug) continue;
    if (slug.includes('/')) continue;
    const enTitle = enTitleById.get(slug);
    if (!enTitle) continue;
    const arTitle = arTitleById.get(slug);
    siblings.push({
      en: {
        url: `/guides/${slug}`,
        text: `For more detail, see our [guide on ${enTitle}](/guides/${slug}).`,
      },
      ar: arTitle
        ? { url: `/ar/guides/${slug}`, text: `لمزيد من التفاصيل، راجع [دليلنا حول ${arTitle}](/ar/guides/${slug}).` }
        : null,
    });
  }
  return siblings;
}

/* ---- Main ---- */
const enData = JSON.parse(readFileSync(EN_PATH, 'utf8'));
const arData = JSON.parse(readFileSync(AR_PATH, 'utf8'));

const enById = new Map(enData.map((p) => [p.slug, p]));
const arBySlug = new Map(arData.map((e) => [e.slug, e.ar]));
const enTitleById = new Map(enData.map((p) => [p.slug, p.title]));
const arTitleById = new Map(arData.map((e) => [e.slug, e.ar?.title]).filter(([, t]) => typeof t === 'string'));

const cluster = enData.filter((p) => p.parentApprovalSlug === PILLAR_SLUG);
console.log(`Cluster pages: ${cluster.length}`);

let enChanged = 0;
let arChanged = 0;
const results = [];

for (const enPage of cluster) {
  const slug = enPage.slug;
  const arEntry = arBySlug.get(slug);
  const siblingPool = buildSiblingPool(enPage, enTitleById, arTitleById);
  const arSiblings = siblingPool.map((s) => s.ar).filter(Boolean);

  /* EN pass */
  let enDid = false;
  if (cleanupEmptyParagraphs(enPage)) enDid = true;
  if (normalizeAbsolute(enPage)) enDid = true;
  if (dedupeLinks(enPage)) enDid = true;
  if (weaveFiller(enPage, {
    label: `EN:${slug}`,
    pillarUrl: EN_PILLAR_URL,
    pillarSentence: EN_PILLAR_SENTENCE,
    siblings: siblingPool.map((s) => s.en),
  })) enDid = true;
  if (enDid) {
    enChanged++;
  }

  /* AR pass */
  if (arEntry) {
    let arDid = false;
    if (cleanupEmptyParagraphs(arEntry)) arDid = true;
    if (normalizeAbsolute(arEntry)) arDid = true;
    if (dedupeLinks(arEntry)) arDid = true;
    if (weaveFiller(arEntry, {
      label: `AR:${slug}`,
      pillarUrl: AR_PILLAR_URL,
      pillarSentence: AR_PILLAR_SENTENCE,
      siblings: arSiblings,
    })) arDid = true;
    if (arDid) {
      arChanged++;
    }
  } else {
    console.error(`  [warn] no AR entry for ${slug}`);
  }

  const enState = computeState(enPage);
  const arState = arEntry ? computeState(arEntry) : null;
  results.push({
    slug,
    en: enState,
    ar: arState,
    enOk: isOk(enState),
    arOk: arState ? isOk(arState) : false,
  });
}

writeFileSync(EN_PATH, JSON.stringify(enData, null, 2) + '\n', 'utf8');
writeFileSync(AR_PATH, JSON.stringify(arData, null, 2) + '\n', 'utf8');
console.log(`EN: patched ${enChanged} pages -> ${EN_PATH}`);
console.log(`AR: patched ${arChanged} pages -> ${AR_PATH}`);
console.log('');

const allOk = results.every((r) => r.enOk && r.arOk);
for (const r of results) {
  const en = `EN total=${r.en.total} secs=${r.en.inlineSections}${r.en.dupes.length ? ` DUPES=${r.en.dupes.join(',')}` : ''}`;
  const ar = r.ar
    ? `AR total=${r.ar.total} secs=${r.ar.inlineSections}${r.ar.dupes.length ? ` DUPES=${r.ar.dupes.join(',')}` : ''}`
    : 'AR missing';
  console.log(`${r.enOk && r.arOk ? 'OK  ' : 'TODO'}  ${r.slug}\t${en}\t${ar}`);
}
console.log('');
console.log(allOk
  ? `ALL ${results.length} cluster pages now pass the inline-link threshold (EN + AR).`
  : `WARNING: ${results.filter((r) => !r.enOk || !r.arOk).length} cluster page(s) still below threshold.`);
