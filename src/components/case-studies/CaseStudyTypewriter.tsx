"use client";

/**
 * CaseStudyTypewriter — Part 18.5 "brilliant typewriter" for the stats strip.
 *
 * A11y / SEO contract:
 *   - The FULL value is always present in the SSR markup (crawlable, works
 *     with no JavaScript) inside an `sr-only` span.
 *   - An `aria-hidden` visual span replays the type-in on mount for sighted
 *     users. On `prefers-reduced-motion` the visual span simply keeps the full
 *     text (no clearing, no caret), so visible text = schema text is preserved.
 *   - The blinking caret is a class toggle (`.cs-typewriter-caret--active`),
 *     never an inline style, and the CSS animation is disabled by reduced
 *     motion.
 *
 * Timing is deliberately crisp: a short pause so the stat block is read first,
 * then a ~38ms/char type-in with a subtle ease feel.
 */

import { useEffect, useState } from "react";

interface CaseStudyTypewriterProps {
  /** The full, server-rendered value to type in */
  text: string;
  /** ms per character — default 38 feels crisp but not frantic */
  speed?: number;
  /** pause before the type-in begins (ms) */
  startDelay?: number;
  className?: string;
}

export default function CaseStudyTypewriter({
  text,
  speed = 38,
  startDelay = 300,
  className = "",
}: CaseStudyTypewriterProps) {
  const [visible, setVisible] = useState(text);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setVisible("");
      setTyping(true);
    }, startDelay);

    return () => window.clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!typing) return;

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setVisible(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(interval);
        setTyping(false);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [typing, text, speed]);

  return (
    <span className={className}>
      <span aria-hidden="true">
        {visible}
        <span
          aria-hidden="true"
          className={`cs-typewriter-caret ${typing ? "cs-typewriter-caret--active" : ""}`}
        />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
