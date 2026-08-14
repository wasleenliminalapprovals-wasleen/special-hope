import type { BlogCategory, BlogCategoryId, BlogImage, BlogPost } from "@/types";
import { BLOG_CATEGORIES } from "@/data/blog-categories";
import { BLOG_POSTS } from "@/data/blog-posts";

/**
 * Blog data helpers — single access layer for the blog index, article,
 * search and sitemap. Data sources: src/data/blog-categories.ts (categories
 * file §3) and src/data/blog-posts.ts (categories file §4).
 *
 * @see plans/blog-pre-build-plan.md §5 (index) / §6 (search) / §8 (sitemap)
 */

/** All 8 approved categories (A–H), source-of-truth order. */
export function getBlogCategories(): BlogCategory[] {
  return BLOG_CATEGORIES;
}

/** Active categories sorted by display order (A/C/E/G/H this wave). */
export function getActiveBlogCategories(): BlogCategory[] {
  return BLOG_CATEGORIES.filter((c) => c.active).sort((a, b) => a.order - b.order);
}

/** Lookup a category by id or slug. */
export function getBlogCategory(idOrSlug: BlogCategoryId | string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
}

/** Category display name with safe fallback. */
export function getCategoryName(id: BlogCategoryId): string {
  return getBlogCategory(id)?.name ?? id;
}

/**
 * Posts the index/UI renders: everything except `draft`, newest first.
 * Converges to `status === "live"` when the full wave is published.
 */
export function getVisiblePosts(): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.status !== "draft").sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

/** Only fully-published posts — used by sitemap.xml (Phase 8). */
export function getLivePosts(): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.status === "live").sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

/**
 * Filter posts by category slug; "all"/undefined resets to the full set.
 * Category filtering is server-driven via `/blog?category={slug}` (no
 * separate category index URLs — plan §0 finding #9).
 */
export function filterPosts(category?: string | null): BlogPost[] {
  if (!category || category === "all") return getVisiblePosts();
  const cat = getBlogCategory(category);
  if (!cat) return getVisiblePosts();
  return getVisiblePosts().filter((p) => p.categoryId === cat.id);
}

/** Posts in one category (ordered newest first). */
export function getPostsByCategory(categoryId: BlogCategoryId): BlogPost[] {
  return getVisiblePosts().filter((p) => p.categoryId === categoryId);
}

/** ZONE 3 featured pick (single post). */
export function getFeaturedPost(): BlogPost | undefined {
  return getVisiblePosts().find((p) => p.featured);
}

/** ZONE 6 trending posts — declared `trending` flag; falls back to newest. */
export function getTrendingPosts(limit = 10): BlogPost[] {
  const trending = getVisiblePosts().filter((p) => p.trending);
  const pool = trending.length > 0 ? trending : getVisiblePosts();
  return pool.slice(0, limit);
}

/**
 * ZONE 1 hero slideshow — explicit 5-slide authority-varied set
 * (plan §9 Phase 0 #3 hero rule: DM / DEWA / DDA / DCD / BIM-GIS).
 * Never reuse the same hero on same-day posts.
 */
export const HERO_SLIDE_SLUGS = [
  "dubai-building-regulations-2026-updates", // A1 — DM / Law 3 (regulatory roundup)
  "dewa-marafeq-infrastructure-noc-digital-submission", // A3 — DEWA
  "dda-circular-667-fire-life-safety-construction", // A5 — DDA
  "dubai-civil-defence-ai-lab-digital-approvals", // A7 — DCD
  "dubai-municipality-bim-gis-digital-approvals", // H1 — DM BIM/GIS (drawings)
] as const;

export function getHeroSlides(): BlogPost[] {
  const posts = getVisiblePosts();
  const slides = HERO_SLIDE_SLUGS.map((slug) => posts.find((p) => p.slug === slug)).filter(
    (p): p is BlogPost => Boolean(p),
  );
  return slides.length > 0 ? slides : posts.slice(0, 5);
}

/** ZONE 7 silo blocks — active categories (with posts), display order. */
export function getSiloBlocks(): { category: BlogCategory; posts: BlogPost[] }[] {
  return getActiveBlogCategories()
    .map((category) => ({ category, posts: getPostsByCategory(category.id) }))
    .filter((block) => block.posts.length > 0);
}

/** Resolve a single post by slug (article pages 404 when undefined). */
export function resolvePost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Resolve 1–2 sibling posts for internal linking. */
export function relatedPosts(post: BlogPost, limit = 2): BlogPost[] {
  return post.relatedPostSlugs
    .map((slug) => resolvePost(slug))
    .filter((p): p is BlogPost => Boolean(p))
    .slice(0, limit);
}

/**
 * Adjacent posts for the §5.10 prev/next rail — deterministic server-side
 * links (master rule: no JS-only navigation). Prefers a post from a
 * different category (plan §5.10); falls back to the nearest post in the
 * visible list. `prev` = older, `next` = newer.
 */
export function getAdjacentPosts(post: BlogPost): {
  prev?: BlogPost;
  next?: BlogPost;
} {
  const visible = getVisiblePosts();
  const idx = visible.findIndex((p) => p.slug === post.slug);
  if (idx === -1) return {};
  const older = visible.slice(idx + 1); // later in newest-first list = older
  const newer = visible.slice(0, idx).reverse(); // earlier = newer
  const pick = (list: BlogPost[]): BlogPost | undefined =>
    list.find((p) => p.categoryId !== post.categoryId) ?? list[0];
  return { prev: pick(older), next: pick(newer) };
}

/** Hero image (position "hero") or first image; undefined → emoji fallback. */
export function getPostHeroImage(post: BlogPost): BlogImage | undefined {
  return post.images.find((i) => i.position === "hero") ?? post.images[0];
}

/** Full-text index for search — title, lead, description, tags, body text. */
export function getPostContent(post: BlogPost): string {
  const parts = [post.title, post.seoTitle, post.lead, post.description, ...post.tags];
  for (const block of post.body) {
    if (
      block.type === "paragraph" ||
      block.type === "quote" ||
      block.type === "expert-insight" ||
      block.type === "heading"
    ) {
      parts.push(block.text);
    }
    if (block.type === "list") parts.push(...block.items);
    if (block.type === "table") parts.push(...block.headers, ...block.rows.flat());
  }
  return parts.join(" ").toLowerCase();
}

/** Read-time label ("8 min read"). */
export function readTimeLabel(minutes: number): string {
  return `${minutes} min read`;
}

/** ISO date → "28 July 2026" (visible "last updated" = schema dateModified). */
export function formatBlogDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/* ============================================================
   SEARCH (plan §6) — full-text over title/lead/description/tags/body.
   `getPostContent` is the lowercase index; `getPostSearchText` keeps the
   ORIGINAL case so search snippets display correctly.
   ============================================================ */

/** Searchable text in ORIGINAL case — for snippet display (plan §6.1). */
export function getPostSearchText(post: BlogPost): string {
  const parts = [post.title, post.seoTitle, post.lead, post.description, ...post.tags];
  for (const block of post.body) {
    if (
      block.type === "paragraph" ||
      block.type === "quote" ||
      block.type === "expert-insight" ||
      block.type === "heading"
    ) {
      parts.push(block.text);
    }
    if (block.type === "list") parts.push(...block.items);
    if (block.type === "table") parts.push(...block.headers, ...block.rows.flat());
  }
  return parts.join(" ");
}

export interface SearchResult {
  post: BlogPost;
  /** Context snippet around the first matched token (original case). */
  snippet: string;
}

/**
 * Ranked full-text search over visible posts (plan §6.1).
 * Title matches outrank lead/tags/body; ties break by publish date.
 */
export function searchPosts(query: string, limit = 12): SearchResult[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  const scored = getVisiblePosts()
    .map((post) => {
      const title = post.title.toLowerCase();
      const lead = post.lead.toLowerCase();
      const tags = post.tags.join(" ").toLowerCase();
      const full = getPostSearchText(post).toLowerCase();

      let score = 0;
      let firstToken = "";
      for (const token of tokens) {
        if (title.includes(token)) score += 8;
        if (lead.includes(token)) score += 3;
        if (tags.includes(token)) score += 2;
        if (full.includes(token)) score += 1;
        if (!firstToken && full.includes(token)) firstToken = token;
      }
      return { post, score, firstToken };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || b.post.publishedAt.localeCompare(a.post.publishedAt))
    .slice(0, limit);

  return scored.map(({ post, firstToken }) => ({
    post,
    snippet: extractSnippet(post, firstToken),
  }));
}

/** ~45-word context window around the first token match; falls back to the lead. */
function extractSnippet(post: BlogPost, token: string): string {
  const haystack = getPostSearchText(post);
  if (token) {
    const idx = haystack.toLowerCase().indexOf(token);
    if (idx !== -1) {
      const start = Math.max(0, idx - 90);
      const end = Math.min(haystack.length, idx + token.length + 180);
      let snippet = haystack.slice(start, end).trim();
      if (start > 0) snippet = `… ${snippet}`;
      if (end < haystack.length) snippet = `${snippet} …`;
      return snippet;
    }
  }
  return post.lead;
}
