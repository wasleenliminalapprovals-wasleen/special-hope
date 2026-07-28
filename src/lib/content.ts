/**
 * Content rendering utilities for inline link syntax.
 *
 * Allows descriptive text in data files to include natural inline links
 * using `[text](/relative/path)` syntax, which gets converted to HTML
 * `<a>` tags during rendering.
 *
 * @example
 *   "You may also need a [Dubai Civil Defense Approval](/approvals/dubai-civil-defense-approval)."
 *   → "You may also need a <a href=\"/approvals/dubai-civil-defense-approval\">Dubai Civil Defense Approval</a>."
 */

/**
 * Converts markdown-style `[text](url)` inline links to HTML `<a>` tags.
 * Also converts bare URLs to clickable links.
 */
export function renderInlineLinks(text: string): string {
  // Convert [text](url) to <a href="url">text</a>
  let result = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, linkText: string, url: string) => {
      // Ensure relative paths start with /
      const href = url.startsWith("http") ? url : url.startsWith("/") ? url : `/${url}`;
      return `<a href="${href}" class="text-link-blue hover:text-link-blue underline transition-colors">${linkText}</a>`;
    }
  );

  // Convert bare URLs (https://...) to clickable links (not matching already-linked)
  result = result.replace(
    /(?<!href=")(https?:\/\/[^\s<]+)/g,
    (url: string) => {
      return `<a href="${url}" class="text-link-blue hover:text-link-blue underline transition-colors" target="_blank" rel="noopener noreferrer">${url}</a>`;
    }
  );

  return result;
}

/**
 * Splits text by newlines and wraps each paragraph in the provided component.
 * Used together with `renderInlineLinks` for safe HTML rendering.
 */
export function renderDescription(description: string): string {
  return description
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p class="mb-4 last:mb-0">${renderInlineLinks(paragraph)}</p>`)
    .join("\n");
}
