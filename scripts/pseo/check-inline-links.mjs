// Analyze inline internal links in paragraph/directAnswer blocks per PSEO page.
// Usage: node scripts/pseo/check-inline-links.mjs [--detail] [--links]
import { readFileSync } from 'node:fs';

const enPath = 'src/data/pseo/pseo-pages.json';
const arPath = 'src/data/pseo/pseo-pages-ar.json';

const linkRe = /\[[^\]]+\]\(([^)]+)\)/g;
const relatedRe = /^Related Dubai approvals|^الموافقات ذات الصلة|^تصاريح دبي ذات الصلة|^موافقات ذات صلة/;

function extractLinks(text) {
  const links = [];
  let m;
  const re = new RegExp(linkRe.source, 'g');
  while ((m = re.exec(text)) !== null) {
    links.push(m[1]);
  }
  return links;
}

function analyzeEntry(entry) {
  const directAnswerLinks = typeof entry.directAnswer === 'string'
    ? extractLinks(entry.directAnswer) : [];
  let paragraphLinks = [];
  let relatedListLinks = [];
  const inlineSections = [];
  for (const sec of entry.sections || []) {
    const isRelated = relatedRe.test(sec.heading || '');
    let secCount = 0;
    const secLinks = [];
    for (const block of sec.blocks || []) {
      const walk = (b) => {
        if (!b || typeof b !== 'object') return;
        if (typeof b.text === 'string') {
          const l = extractLinks(b.text);
          secLinks.push(...l);
        }
        if (Array.isArray(b.items)) for (const it of b.items) walk({ text: it });
        if (Array.isArray(b.rows)) for (const row of b.rows) for (const cell of row) walk({ text: cell });
      };
      walk(block);
    }
    secCount = secLinks.length;
    if (isRelated) relatedListLinks.push(...secLinks);
    else paragraphLinks.push(...secLinks);
    if (!isRelated && secCount > 0) inlineSections.push(`${sec.heading}(${secCount})`);
  }
  return { directAnswerLinks, paragraphLinks, relatedListLinks, inlineSections };
}

function analyze(path, useArNesting) {
  const data = JSON.parse(readFileSync(path, 'utf8'));
  const rows = [];
  for (const entry of data) {
    const body = useArNesting ? entry.ar : entry;
    const { directAnswerLinks, paragraphLinks, relatedListLinks, inlineSections } = analyzeEntry(body);
    const all = [...directAnswerLinks, ...paragraphLinks];
    const total = all.length;
    const dupes = all.filter((u, i) => all.indexOf(u) !== i);
    rows.push({
      slug: entry.slug,
      directAnswerLinks,
      paragraphLinks,
      relatedListLinks,
      inlineSectionCount: inlineSections.length,
      inlineSections,
      total,
      dupes: [...new Set(dupes)],
    });
  }
  return rows;
}

function print(title, rows) {
  console.log(`=== ${title} ===`);
  for (const r of rows) {
    const status = r.total >= 4 && r.total <= 6 && r.inlineSectionCount >= 3 && r.dupes.length === 0
      ? 'OK' : 'TODO';
    console.log(
      `${status}\t${r.slug}\tDA=${r.directAnswerLinks.length}\tpara=${r.paragraphLinks.length}\tsecs=${r.inlineSectionCount}\ttotal=${r.total}${r.dupes.length ? `\tDUPES=${r.dupes.join(',')}` : ''}`
    );
    if (process.argv.includes('--links')) {
      const all = [...r.directAnswerLinks, ...r.paragraphLinks];
      if (all.length) console.log(`      links: ${all.join(' | ')}`);
    }
    if (process.argv.includes('--detail') && r.inlineSections.length) {
      console.log(`      ${r.inlineSections.join(' | ')}`);
    }
  }
}

print('EN (pseo-pages.json)', analyze(enPath, false));
console.log('');
print('AR (pseo-pages-ar.json)', analyze(arPath, true));
