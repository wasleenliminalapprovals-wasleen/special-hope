/**
 * ArticleSidebarArabic — Arabic variant of the sticky article rail
 * (plan §5.9, C-AR §7). Mirrors `ArticleSidebar.tsx` 1:1 with Arabic labels
 * and the Arabic helpers from the merge layer (`@/lib/blog-ar`).
 *
 * Server component (no client JS). Renders, top to bottom:
 *   - `.toc` — "في هذه الصفحة" links to every H2/H3 heading (anchor ids from
 *     the shared `postHeadingId`, which is Unicode-aware so Arabic headings
 *     produce valid, non-empty ids); the article inline JS scroll-spies
 *     `.toc-link` and toggles `.is-active`.
 *   - `.sidebar-facts` — `.fact-item` rows from real post data, Arabic labels
 *     (read time, category, author, last updated — never fabricated).
 *   - `.sidebar-related` — `.sb-related-item` links to sibling Arabic posts
 *     (hero image thumbnail or Arabic-initial fallback letter).
 *   - `.sidebar-cta-card` — `.btn-scta` (contact) + `.btn-scta-outline`,
 *     pointing at the Arabic contact/services pages.
 *
 * Styling is shared with the EN rail via `src/app/blog/blog.css` (§8.4).
 *
 * @see src/components/blog/ArticleSidebar.tsx (EN source)
 * @see plans/blog-pre-build-plan.md §5.9
 */

import Image from "next/image";
import Link from "next/link";
import { Clock, FolderOpen, RefreshCw, User } from "lucide-react";
import type { BlogPost } from "@/types";
import {
  formatArabicBlogDate,
  getArabicCategoryName,
  getPostHeroImage,
  readTimeLabelAr,
} from "@/lib/blog-ar";
import { AUTHOR_REGISTRY } from "@/data/authors";
import { postHeadingId } from "../ArticleBody";
import type { TocHeading } from "../ArticleSidebar";

interface ArticleSidebarArabicProps {
  post: BlogPost;
  headings: TocHeading[];
  related: BlogPost[];
}

export default function ArticleSidebarArabic({
  post,
  headings,
  related,
}: ArticleSidebarArabicProps) {
  const author = AUTHOR_REGISTRY[post.authorId];

  const facts = [
    { icon: Clock, label: "وقت القراءة", value: readTimeLabelAr(post.readTime) },
    { icon: FolderOpen, label: "الفئة", value: getArabicCategoryName(post.categoryId) },
    { icon: User, label: "الكاتب", value: author.arabicName },
    {
      icon: RefreshCw,
      label: "آخر تحديث",
      value: formatArabicBlogDate(post.lastUpdated),
    },
  ];

  return (
    <>
      {headings.length > 0 && (
        <nav className="toc" aria-label="في هذه الصفحة">
          <h2 className="toc-title">في هذه الصفحة</h2>
          <ul className="toc-list">
            {headings.map((h, i) => (
              <li key={i}>
                <a
                  className={`toc-link${h.level === 3 ? " is-h3" : ""}`}
                  href={`#${h.id}`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="sidebar-facts">
        {facts.map((fact, i) => {
          const Icon = fact.icon;
          return (
            <div className="fact-item" key={i}>
              <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
              <span className="fact-label">{fact.label}</span>
              <span className="fact-value">{fact.value}</span>
            </div>
          );
        })}
      </div>

      {post.linkOuts.length > 0 && (
        <nav className="sidebar-resources" aria-label="موارد ذات صلة">
          <h2 className="sidebar-resources-title">موارد ذات صلة</h2>
          <ul className="sidebar-resources-list">
            {post.linkOuts.map((link, i) => (
              <li key={i}>
                <Link href={link.href} className="sb-resource-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {related.length > 0 && (
        <div className="sidebar-related">
          <h2 className="sidebar-related-title">تابع القراءة</h2>
          {related.map((p) => {
            const thumb = getPostHeroImage(p);
            return (
              <Link
                key={p.slug}
                href={`/ar/blog/${p.slug}`}
                className="sb-related-item"
              >
                {thumb ? (
                  <Image
                    src={thumb.src}
                    alt=""
                    width={72}
                    height={48}
                    className="sb-related-thumb"
                    loading="lazy"
                  />
                ) : (
                  <span
                    className="sb-related-thumb sb-related-thumb-fallback"
                    aria-hidden="true"
                  >
                    {getArabicCategoryName(p.categoryId).charAt(0)}
                  </span>
                )}
                <span className="sb-related-info">
                  <span className="sb-related-title">{p.title}</span>
                  <span className="sb-related-meta">
                    {getArabicCategoryName(p.categoryId)} ·{" "}
                    {readTimeLabelAr(p.readTime)}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      )}

      <aside className="sidebar-cta-card" aria-label="احصل على مساعدة في الموافقات">
        <h2 className="sidebar-cta-title">هل تحتاج إنجاز هذه الموافقة؟</h2>
        <p className="sidebar-cta-text">
          احصل على خارطة طريق سريعة ودقيقة للموافقة من مستشار مرخّص — دون تخمين
          أو تأخير.
        </p>
        <Link href="/ar/contact-us" className="btn-scta">
          تحدث إلى مستشار موافقات
        </Link>
        <Link href="/ar/services" className="btn-scta-outline">
          استكشف خدماتنا
        </Link>
      </aside>
    </>
  );
}
