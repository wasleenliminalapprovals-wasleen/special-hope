/**
 * ArticleSidebar — sticky right rail of the blog article page (plan §5.9).
 *
 * Server component (no client JS). Renders, top to bottom:
 *   - `.toc` — "On this page" links to every H2/H3 heading (anchor ids from
 *     `postHeadingId`); the article inline JS scroll-spies `.toc-link`
 *     and toggles `.is-active` when the section top passes 120px.
 *   - `.sidebar-facts` — `.fact-item` rows derived from real post data
 *     (read time, category, author, last updated — never fabricated).
 *   - `.sidebar-related` — `.sb-related-item` links to sibling posts
 *     (hero image thumbnail or gradient-letter fallback).
 *   - `.sidebar-cta-card` — `.btn-scta` (contact) + `.btn-scta-outline`.
 *
 * Styling lives in `src/app/blog/blog.css` (§8.4). Sticky top 24px; the
 * 992px breakpoint drops the rail below the content column.
 *
 * @see plans/blog-pre-build-plan.md §5.9
 */

import Image from "next/image";
import Link from "next/link";
import { Clock, FolderOpen, RefreshCw, User } from "lucide-react";
import type { BlogPost } from "@/types";
import {
  formatBlogDate,
  getCategoryName,
  getPostHeroImage,
  readTimeLabel,
} from "@/lib/blog";
import { AUTHOR_REGISTRY } from "@/data/authors";
import { postHeadingId } from "./ArticleBody";

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface ArticleSidebarProps {
  post: BlogPost;
  headings: TocHeading[];
  related: BlogPost[];
}

export default function ArticleSidebar({ post, headings, related }: ArticleSidebarProps) {
  const author = AUTHOR_REGISTRY[post.authorId];

  const facts = [
    { icon: Clock, label: "Read time", value: readTimeLabel(post.readTime) },
    { icon: FolderOpen, label: "Category", value: getCategoryName(post.categoryId) },
    { icon: User, label: "Author", value: author.name },
    { icon: RefreshCw, label: "Last updated", value: formatBlogDate(post.lastUpdated) },
  ];

  return (
    <>
      {headings.length > 0 && (
        <nav className="toc" aria-label="On this page">
          <h2 className="toc-title">On this page</h2>
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
        <nav className="sidebar-resources" aria-label="Related resources">
          <h2 className="sidebar-resources-title">Related resources</h2>
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
          <h2 className="sidebar-related-title">Keep reading</h2>
          {related.map((p) => {
            const thumb = getPostHeroImage(p);
            return (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="sb-related-item">
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
                    {p.categoryId.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="sb-related-info">
                  <span className="sb-related-title">{p.title}</span>
                  <span className="sb-related-meta">
                    {getCategoryName(p.categoryId)} · {readTimeLabel(p.readTime)}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      )}

      <aside className="sidebar-cta-card" aria-label="Get approval help">
        <h2 className="sidebar-cta-title">Need this approval done?</h2>
        <p className="sidebar-cta-text">
          Get a fast, accurate approval roadmap from a licensed consultant — no
          guesswork, no delays.
        </p>
        <Link href="/contact-us" className="btn-scta">
          Talk to an approval consultant
        </Link>
        <Link href="/services" className="btn-scta-outline">
          Explore our services
        </Link>
      </aside>
    </>
  );
}
