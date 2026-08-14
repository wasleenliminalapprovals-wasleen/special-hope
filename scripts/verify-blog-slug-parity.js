/* Verify 19 EN blog slugs match 19 AR blog slugs in src/data/blog-posts.ts and blog-posts-ar.ts */
const fs = require('fs');

const en = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
const ar = fs.readFileSync('src/data/blog-posts-ar.ts', 'utf8');

// EN uses double quotes, AR uses single quotes; both at 4-space indent top-level entry slug
const slugLines = (s) =>
  s
    .split('\n')
    .filter((l) => /^\s{4}slug:\s*["']/.test(l))
    .map((l) => l.replace(/^\s{4}slug:\s*["']([^"']+)["'],?/, '$1').trim());

const es = slugLines(en);
const as = slugLines(ar);

console.log('EN count:', es.length);
console.log('AR count:', as.length);

const enSet = new Set(es);
const arSet = new Set(as);

const missing = es.filter((x) => !arSet.has(x));
const extra = as.filter((x) => !enSet.has(x));
const dupes = as.filter((x, i) => as.indexOf(x) !== i);

console.log('AR missing:', missing.length ? missing : 'NONE');
console.log('AR extra:', extra.length ? extra : 'NONE');
console.log('AR duplicate slugs:', dupes.length ? [...new Set(dupes)] : 'NONE');
console.log('PARITY ' + (missing.length === 0 && extra.length === 0 && es.length === 19 && as.length === 19 ? 'PASS' : 'FAIL'));
