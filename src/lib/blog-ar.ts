/**
 * Arabic blog helpers — merge layer combining EN structural metadata with
 * native-Arabic content (src/data/blog-posts-ar.ts) by slug.
 *
 * The EN BlogPost owns the structural fields (category, author, readTime,
 * dates, status, linkOuts, relatedPostSlugs, featured/trending). The Arabic
 * entry owns ONLY the content fields (title/seoTitle/description/lead/body/
 * faqs/tags) plus its images embedded as `image` body sections with Arabic
 * alt text. This layer joins the two so the /ar/blog routes can render full
 * BlogPost-shaped objects in Arabic, reusing the existing UI/data helpers
 * that are generic over `BlogPost` (getPostHeroImage, getPostSearchText).
 *
 * @see src/data/blog-posts-ar.ts (C-AR native-Arabic rewrites, NOT translations)
 * @see plans/blog-pre-build-plan.md §9 (C-AR role / acceptance)
 */
import type { BlogCategory, BlogCategoryId, BlogImage, BlogPost } from "@/types";
import { BLOG_CATEGORIES } from "@/data/blog-categories";
import { BLOG_POSTS } from "@/data/blog-posts";
import { blogPosts as AR_BLOG_POSTS } from "@/data/blog-posts-ar";
import { HERO_SLIDE_SLUGS, getPostHeroImage, getPostSearchText } from "@/lib/blog";
import { AR } from "@/lib/constants";

/* ============================================================
   ARABIC CATEGORY LOCALIZATION
   Native-Arabic names/descriptions for all 8 approved categories (A–H),
   mirroring plans/blog-categories-topics-urls.md §3. Only A/C/E/G/H are
   active this wave; inactive ones (B/D/F) are still mapped for future use.
   ============================================================ */

export const AR_BLOG_CATEGORY_NAMES: Record<BlogCategoryId, string> = {
  "approval-news": "أخبار الموافقات وتحديثات اللوائح",
  comparisons: "مقارنات الموافقات",
  "project-journeys": "رحلات الموافقات حسب نوع المشروع",
  "costs-timelines": "قصص تكاليف وجداول الموافقات",
  "authority-deep-dives": "تعمّق في الجهات الرسمية",
  "rejection-stories": "قصص الرفض والأخطاء",
  "free-zones": "المناطق الحرة ومجتمعات المطورين",
  "docs-drawings": "رؤى التوثيق والرسومات",
};

export const AR_BLOG_CATEGORY_DESCRIPTIONS: Record<BlogCategoryId, string> = {
  "approval-news":
    "ما الذي تغيّر؟ تعاميم رسمية وقوانين جديدة وخدمات إلكترونية وإطلاقات من جهات الموافقات في دبي.",
  comparisons: "أيهما أفضل وكيف يختلفان؟ جهة مقابل جهة، إجراء مقابل إجراء. محجوز لمصادر مستقبلية.",
  "project-journeys": "كيف تبدو الموافقات لمشروعي؟ رحلات المباني الجاهزة والبنية التحتية والاستخدامات المختلطة.",
  "costs-timelines": "تفصيلات قصصية للتكاليف والجداول من مشاريع حقيقية. محجوز لمصادر مستقبلية.",
  "authority-deep-dives": "كيف تعمل هذه الجهة فعلياً؟ نظرة داخلية على جهات الموافقات في دبي.",
  "rejection-stories": "قصص تحريرية عن الرفض والدروس المستفادة. محجوز لمصادر مستقبلية.",
  "free-zones": "زوايا الموافقات الخاصة بالمناطق والمجتمعات في المناطق الحرة بدبي.",
  "docs-drawings": "التقديم الرقمي ومعايير نمذجة معلومات المباني (BIM) والخرائط (GIS) والرسومات في مشاريع دبي.",
};

/** Arabic display name with safe fallback to the EN name. */
export function getArabicCategoryName(id: BlogCategoryId): string {
  return AR_BLOG_CATEGORY_NAMES[id] ?? id;
}

/** Localize a category into Arabic (name + description; structure unchanged). */
export function getArabicCategory(cat: BlogCategory): BlogCategory {
  return {
    ...cat,
    name: AR_BLOG_CATEGORY_NAMES[cat.id] ?? cat.name,
    description: AR_BLOG_CATEGORY_DESCRIPTIONS[cat.id] ?? cat.description,
  };
}

/** Active categories (A/C/E/G/H) sorted by display order, Arabic labels. */
export function getActiveArabicBlogCategories(): BlogCategory[] {
  return BLOG_CATEGORIES.filter((c) => c.active)
    .sort((a, b) => a.order - b.order)
    .map(getArabicCategory);
}

/* ============================================================
   MERGE LAYER — EN structural fields + AR content by slug.
   ============================================================ */

/**
 * Full merge — returns a BlogPost-shaped object with Arabic content.
 * Joins the EN post's structural metadata with its native-Arabic content.
 * Images are extracted from the Arabic body (Arabic alt text); `stats` is
 * dropped because the EN labels would not read correctly in Arabic (the AR
 * article page guards `post.stats && post.stats.length > 0`). The returned
 * post keeps the EN slug (URL parity contract: /ar/blog/{slug} mirrors
 * /blog/{slug}).
 */
function toArabicPost(en: BlogPost): BlogPost | undefined {
  const ar = AR_BLOG_POSTS.find((e) => e.slug === en.slug)?.ar;
  if (!ar) return undefined;
  const images = ar.body
    .filter((b): b is { type: "image"; image: BlogImage } => b.type === "image")
    .map((b) => b.image);
  return {
    ...en,
    slug: en.slug,
    title: ar.title,
    seoTitle: ar.seoTitle,
    description: ar.description,
    lead: ar.lead,
    body: ar.body,
    faqs: ar.faqs,
    tags: ar.tags,
    images: images.length > 0 ? images : en.images,
    stats: undefined,
  };
}

/** Resolve a single Arabic post by slug (article pages 404 when undefined). */
export function resolveArabicPost(slug: string): BlogPost | undefined {
  const en = BLOG_POSTS.find((p) => p.slug === slug);
  if (!en) return undefined;
  return toArabicPost(en);
}

/**
 * Arabic posts the index/UI renders: everything except `draft` that also has
 * an Arabic rewrite, newest first. Converges to `status === "live"` at publish.
 */
export function getVisibleArabicPosts(): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.status !== "draft")
    .map(toArabicPost)
    .filter((p): p is BlogPost => Boolean(p))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Only fully-published Arabic posts — used by sitemap.xml. */
export function getLiveArabicPosts(): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.status === "live")
    .map(toArabicPost)
    .filter((p): p is BlogPost => Boolean(p))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Filter Arabic posts by category slug; "all"/undefined resets to the full set. */
export function filterArabicPosts(category?: string | null): BlogPost[] {
  if (!category || category === "all") return getVisibleArabicPosts();
  const cat = BLOG_CATEGORIES.find((c) => c.slug === category);
  if (!cat) return getVisibleArabicPosts();
  return getVisibleArabicPosts().filter((p) => p.categoryId === cat.id);
}

/** Arabic posts in one category (ordered newest first). */
export function getPostsByArabicCategory(categoryId: BlogCategoryId): BlogPost[] {
  return getVisibleArabicPosts().filter((p) => p.categoryId === categoryId);
}

/** Featured Arabic pick (single post). */
export function getFeaturedArabicPost(): BlogPost | undefined {
  return getVisibleArabicPosts().find((p) => p.featured);
}

/** Trending Arabic posts — declared `trending` flag; falls back to newest. */
export function getTrendingArabicPosts(limit = 10): BlogPost[] {
  const trending = getVisibleArabicPosts().filter((p) => p.trending);
  const pool = trending.length > 0 ? trending : getVisibleArabicPosts();
  return pool.slice(0, limit);
}

/** Hero slideshow — same 5-slide authority-varied set as EN (HERO_SLIDE_SLUGS). */
export function getHeroArabicSlides(): BlogPost[] {
  const posts = getVisibleArabicPosts();
  const slides = HERO_SLIDE_SLUGS.map((slug) => posts.find((p) => p.slug === slug)).filter(
    (p): p is BlogPost => Boolean(p),
  );
  return slides.length > 0 ? slides : posts.slice(0, 5);
}

/** Silo blocks — active Arabic categories (with posts), display order. */
export function getArabicSiloBlocks(): { category: BlogCategory; posts: BlogPost[] }[] {
  return getActiveArabicBlogCategories()
    .map((category) => ({ category, posts: getPostsByArabicCategory(category.id) }))
    .filter((block) => block.posts.length > 0);
}

/** Resolve 1–2 sibling posts (Arabic) for internal linking. */
export function relatedArabicPosts(post: BlogPost, limit = 2): BlogPost[] {
  return post.relatedPostSlugs
    .map((slug) => resolveArabicPost(slug))
    .filter((p): p is BlogPost => Boolean(p))
    .slice(0, limit);
}

/** Adjacent Arabic posts for the prev/next rail — prefers a different category. */
export function getAdjacentArabicPosts(post: BlogPost): {
  prev?: BlogPost;
  next?: BlogPost;
} {
  const visible = getVisibleArabicPosts();
  const idx = visible.findIndex((p) => p.slug === post.slug);
  if (idx === -1) return {};
  const older = visible.slice(idx + 1); // later in newest-first list = older
  const newer = visible.slice(0, idx).reverse(); // earlier = newer
  const pick = (list: BlogPost[]): BlogPost | undefined =>
    list.find((p) => p.categoryId !== post.categoryId) ?? list[0];
  return { prev: pick(older), next: pick(newer) };
}

/* ============================================================
   ARABIC FORMATS
   ============================================================ */

/** Read-time label in Arabic ("8 دقائق للقراءة"). */
export function readTimeLabelAr(minutes: number): string {
  return `${minutes} ${AR.misc.readingTime}`;
}

/** ISO date → Arabic long date, e.g. "28 يوليو 2026" (ar-AE, UTC). */
export function formatArabicBlogDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("ar-AE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/* ============================================================
   SEARCH (plan §6) — full-text over Arabic title/lead/tags/body.
   Reuses the generic `getPostSearchText` (case-preserving); Arabic has no
   case folding so tokens match directly.
   ============================================================ */

export interface SearchArabicResult {
  post: BlogPost;
  /** Context snippet around the first matched token (Arabic, original case). */
  snippet: string;
}

/** Ranked full-text search over visible Arabic posts (mirrors EN scoring). */
export function searchArabicPosts(query: string, limit = 12): SearchArabicResult[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  const scored = getVisibleArabicPosts()
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
    snippet: extractArabicSnippet(post, firstToken),
  }));
}

/** ~45-word context window around the first token match; falls back to the lead. */
function extractArabicSnippet(post: BlogPost, token: string): string {
  const haystack = getPostSearchText(post);
  if (token) {
    const idx = haystack.indexOf(token);
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

/* ============================================================
   RE-EXPORTS — generic helpers shared with the EN blog layer.
   ============================================================ */
export { getPostHeroImage } from "@/lib/blog";
