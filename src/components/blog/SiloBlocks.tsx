/**
 * SiloBlocks — ZONE 7 of the blog index (plan §5).
 *
 * Server component. Topical silo clusters — one block per active category
 * that has published posts (via `getSiloBlocks()` — categories A/E/G/C/H).
 *   - Alternating blocks get the `.blog-alt` light-inversion signature
 *     (surface `--alt-bg`, headings/links → `--alt-text`).
 *   - `.silo-post-row` — full-width row; hover shifts `padding-left` 8px +
 *     accent border-l (authored in ZONE LAYOUT CSS).
 *   - `.silo-cta` — real `<Link>` to the category filter (`/blog?category=`).
 *
 * @see plans/blog-pre-build-plan.md §5 (ZONE 7)
 */

import Link from "next/link";
import { formatBlogDate, getSiloBlocks } from "@/lib/blog";

export default function SiloBlocks() {
  const blocks = getSiloBlocks();
  if (blocks.length === 0) return null;

  return (
    <section className="silos-zone" aria-labelledby="silos-heading">
      <div className="blog-container">
        <div className="zone-head reveal">
          <p className="blog-eyebrow">Topical clusters</p>
          <h2 id="silos-heading" className="zone-title">
            Approval guides by topic
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
                  href={`/blog?category=${block.category.slug}`}
                >
                  All {block.category.name.toLowerCase()} guides
                  <span aria-hidden="true"> →</span>
                </Link>
              </div>

              <ul className="silo-posts">
                {block.posts.map((post) => (
                  <li key={post.slug}>
                    <Link className="silo-post-row" href={`/blog/${post.slug}`}>
                      <time className="silo-post-date" dateTime={post.publishedAt}>
                        {formatBlogDate(post.publishedAt)}
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
