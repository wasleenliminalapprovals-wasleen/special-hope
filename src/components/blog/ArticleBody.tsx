/**
 * ArticleBody — renders the ordered content blocks of a blog article
 * (plan §5.6) plus the FAQ block at the end.
 *
 * Server component (no client JS). Renders `post.body: BlogSection[]`
 * discriminately:
 *   - paragraphs, H2/H3 headings (anchor ids feed the sidebar TOC)
 *   - ordered / unordered lists (`.post-list`)
 *   - tables (reusing the `.animated-row` gradient style)
 *   - blockquotes, images (`next/image`, explicit dims, lazy)
 *   - the `.expert-insight` callout
 *
 * The FAQ block uses native `<details>/<summary>` expanders (accessible,
 * no JS) so the visible text mirrors the FAQPage schema word-for-word
 * (master rule §5 / plan §8.1).
 *
 * @see plans/blog-pre-build-plan.md §5.6 / §8.1
 */

import Image from "next/image";
import type { BlogFAQ, BlogSection } from "@/types";

/** Stable anchor id for a heading — shared with the sidebar TOC + scroll-spy.
 *
 * Unicode-aware (\p{L}/\p{N}) so Arabic headings produce valid, non-empty ids
 * too (e.g. "الأسئلة الشائعة" → "الأسئلة-الشائعة"). Output for ASCII headings
 * is byte-identical to the previous [a-z0-9] implementation, so existing EN
 * anchors and TOC scroll-spy are unaffected. All-punctuation headings fall
 * back to "section" so anchor links never target an empty id.
 */
export function postHeadingId(text: string): string {
  const id = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/(^-|-$)+/g, "")
    .trim();
  return id || "section";
}

interface ArticleBodyProps {
  body: BlogSection[];
  faqs: BlogFAQ[];
  /** Override the FAQ section heading — Arabic pages pass an Arabic heading. */
  faqHeading?: string;
}

export default function ArticleBody({ body, faqs, faqHeading }: ArticleBodyProps) {
  return (
    <>
      {body.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return <p key={i}>{block.text}</p>;
          case "heading":
            return block.level === 2 ? (
              <h2 key={i} id={postHeadingId(block.text)}>
                {block.text}
              </h2>
            ) : (
              <h3 key={i} id={postHeadingId(block.text)}>
                {block.text}
              </h3>
            );
          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag key={i} className="post-list">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ListTag>
            );
          }
          case "table":
            return (
              <div key={i} className="table-wrap">
                <table className="animated-row">
                  <thead>
                    <tr>
                      {block.headers.map((h, j) => (
                        <th key={j} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td key={k}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "quote":
            return <blockquote key={i}>{block.text}</blockquote>;
          case "image":
            return (
              <figure key={i} className="post-figure">
                <Image
                  src={block.image.src}
                  alt={block.image.alt}
                  width={block.image.width}
                  height={block.image.height}
                  className="post-figure-img blog-zoom"
                  loading="lazy"
                />
                {block.image.caption && (
                  <figcaption>{block.image.caption}</figcaption>
                )}
              </figure>
            );
          case "expert-insight":
            return (
              <aside key={i} className="expert-insight">
                <p>{block.text}</p>
              </aside>
            );
          default:
            return null;
        }
      })}

      {faqs.length > 0 && (
        <>
          <h2 id="faq">{faqHeading ?? "Frequently asked questions"}</h2>
          <div className="article-faq">
            {faqs.map((faq, i) => (
              <details key={i} className="article-faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </>
      )}
    </>
  );
}
