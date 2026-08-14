/**
 * SiloBlocksArabic — Arabic variant of ZONE 7 (plan §5, C-AR §9).
 *
 * Mirrors `SiloBlocks.tsx`: one topical block per active Arabic category that
 * has published posts (`getArabicSiloBlocks()`). The CTA flips to `←` (RTL
 * forward direction) and links to the Arabic category filter.
 *
 * @see src/components/blog/SiloBlocks.tsx (EN source)
 */

import Link from "next/link";
import { formatArabicBlogDate, getArabicSiloBlocks } from "@/lib/blog-ar";

export default function SiloBlocksArabic() {
  const blocks = getArabicSiloBlocks();
  if (blocks.length === 0) return null;

  return (
    <section className="silos-zone" aria-labelledby="silos-heading">
      <div className="blog-container">
        <div className="zone-head reveal">
          <p className="blog-eyebrow">مجموعات موضوعية</p>
          <h2 id="silos-heading" className="zone-title">
            أدلة الموافقات حسب الموضوع
          </h2>
        </div>

        <div className="silos-list fade-in">
          {blocks.map((block, i) => (
            <article
              key={block.category.id}
              className={`silo-block${i % 2 === 1 ? " blog-alt" : ""}`}
            >
              <div className="silo-head">
                <span className="silo-code" aria-hidden="true">
                  {block.category.code}
                </span>
                <div className="silo-heading">
                  <h3 className="silo-name">{block.category.name}</h3>
                  <p className="silo-desc">{block.category.description}</p>
                </div>
                <Link
                  className="silo-cta"
                  href={`/ar/blog?category=${block.category.slug}`}
                >
                  جميع أدلة {block.category.name}
                  <span aria-hidden="true"> ←</span>
                </Link>
              </div>

              <ul className="silo-posts">
                {block.posts.map((post) => (
                  <li key={post.slug}>
                    <Link className="silo-post-row" href={`/ar/blog/${post.slug}`}>
                      <time className="silo-post-date" dateTime={post.publishedAt}>
                        {formatArabicBlogDate(post.publishedAt)}
                      </time>
                      <span className="silo-post-title">{post.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
