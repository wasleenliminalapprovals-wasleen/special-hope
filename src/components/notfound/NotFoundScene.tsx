/**
 * NotFoundScene — "The Lost Night Sheet"
 *
 * A dark cyanotype (night) engineering sheet for the 404 page:
 * - "404" drawn as blueprint line-work digits (stroke-dashoffset reveal)
 * - A dashed "AREA NOT FOUND" placeholder box crossed out with an X
 * - "???" dimension lines (no measurements recorded)
 * - A "NO DIMENSIONS" leader label
 * - A sweeping amber scan line across the sheet
 * - A rotated "REVISION NOT FOUND — RESUBMIT" rejection stamp
 * - Glow blobs (cyan + amber) pulsing behind the grid
 * - Reuses DrawingSymbols: BlueprintGrid, DrawingFrame, DimensionLine,
 *   TitleBlock, CompassNorth
 *
 * Accessibility: the scene is purely decorative and is marked
 * aria-hidden; real copy and navigation live in the parent not-found page.
 * Animations respect prefers-reduced-motion (global block) and are gated
 * behind the `.drawing-deferred` performance class until the page is idle.
 *
 * @see /plans/404-redesign-plan.md (Task 3)
 */

"use client";

import { useEffect, useId, useState } from "react";
import {
  BlueprintGrid,
  CompassNorth,
  DimensionLine,
  DrawingFrame,
  TitleBlock,
} from "../drawings/DrawingSymbols";

/* viewBox: 0 0 800 640 (aspect 5/4). DrawingFrame inner area: 20..780 × 20..620 */
const MONO = "var(--font-family-roboto-mono), monospace";

/** Digit "4" — three strokes drawn sequentially for a hand-drawn feel */
const digitFourStrokes = [
  { d: "M 12 8 L 12 102" },
  { d: "M 48 8 L 48 58" },
  { d: "M 12 58 L 48 58" },
];

interface NotFoundSceneProps {
  className?: string;
}

export default function NotFoundScene({ className = "" }: NotFoundSceneProps) {
  const uid = useId();
  const [deferred, setDeferred] = useState(true);

  /* Release the `.drawing-deferred` performance gate once the page is
     idle (post-LCP), so the SVG animations can play. Falls back to a
     timeout when requestIdleCallback is unavailable (older Safari). */
  useEffect(() => {
    let rafId = 0;
    let idleId = 0;
    const hasIdle = typeof window !== "undefined" && "requestIdleCallback" in window;

    const release = () => {
      rafId = window.requestAnimationFrame(() => setDeferred(false));
    };

    if (hasIdle) {
      idleId = window.requestIdleCallback(release);
    } else {
      idleId = window.setTimeout(release, 1200);
    }

    return () => {
      if (hasIdle) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className={`relative w-full aspect-[5/4] text-cyano-night-ink select-none ${
        deferred ? "drawing-deferred" : ""
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 640"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        focusable="false"
      >
        <defs>
          {/* Ambient glow gradients */}
          <radialGradient id={`${uid}-glow-cyan`} cx="0.35" cy="0.25" r="0.8">
            <stop
              offset="0%"
              stopColor="var(--color-cyano-night-ink-soft)"
              stopOpacity="0.5"
            />
            <stop
              offset="100%"
              stopColor="var(--color-cyano-night-ink-soft)"
              stopOpacity="0"
            />
          </radialGradient>
          <radialGradient id={`${uid}-glow-amber`} cx="0.72" cy="0.72" r="0.75">
            <stop
              offset="0%"
              stopColor="var(--color-cyano-night-amber)"
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              stopColor="var(--color-cyano-night-amber)"
              stopOpacity="0"
            />
          </radialGradient>
          {/* Vertical scan bar gradient */}
          <linearGradient id={`${uid}-scan`} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-cyano-night-amber)"
              stopOpacity="0"
            />
            <stop
              offset="50%"
              stopColor="var(--color-cyano-night-amber)"
              stopOpacity="0.55"
            />
            <stop
              offset="100%"
              stopColor="var(--color-cyano-night-amber)"
              stopOpacity="0"
            />
          </linearGradient>
          <BlueprintGrid id={uid} gridSize={40} subDivisions={4} opacity={0.12} />
        </defs>

        {/* ============================================================
           AMBIENT GLOW — pulsing cyan + amber blobs behind the grid
           ============================================================ */}
        <rect
          x="0"
          y="0"
          width="800"
          height="640"
          fill={`url(#${uid}-glow-cyan)`}
          className="animate-pulse-opacity"
          style={{ animationDuration: "6s" }}
        />
        <rect
          x="0"
          y="0"
          width="800"
          height="640"
          fill={`url(#${uid}-glow-amber)`}
          className="animate-pulse-opacity"
          style={{ animationDuration: "7.5s", animationDelay: "1.2s" }}
        />

        {/* ============================================================
           BLUEPRINT GRID + FRAME
           ============================================================ */}
        <rect x="0" y="0" width="800" height="640" fill={`url(#${uid}-minor)`} />
        <rect x="0" y="0" width="800" height="640" fill={`url(#${uid}-major)`} />
        <DrawingFrame width={800} height={640} />

        {/* ============================================================
           SCAN SWEEP — amber scanner travels across the sheet (RTL-safe)
           ============================================================ */}
        <g className="animate-scan-sweep" style={{ opacity: 0 }}>
          <rect
            x="384"
            y="24"
            width="32"
            height="592"
            fill={`url(#${uid}-scan)`}
          />
          <line
            x1="400"
            y1="24"
            x2="400"
            y2="616"
            stroke="var(--color-cyano-night-amber)"
            strokeWidth="1.5"
            opacity="0.65"
          />
        </g>

        {/* ============================================================
           "404" DIGITS — blueprint line-work reveal
           ============================================================ */}
        {/* First "4" */}
        <g transform="translate(300, 96)">
          {digitFourStrokes.map((stroke, i) => (
            <path
              key={`${uid}-four-a-${i}`}
              d={stroke.d}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              className="animate-draw-line"
              style={
                {
                  "--draw-length": "1",
                  "--draw-duration": "0.7s",
                  animationDelay: `${0.35 + i * 0.1}s`,
                  strokeDasharray: 1,
                } as React.CSSProperties
              }
            />
          ))}
        </g>

        {/* "0" */}
        <g transform="translate(370, 96)">
          <path
            d="M 12 8 L 48 8 L 48 102 L 12 102 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinejoin="round"
            pathLength={1}
            className="animate-draw-line"
            style={
              {
                "--draw-length": "1",
                "--draw-duration": "0.9s",
                animationDelay: "0.65s",
                strokeDasharray: 1,
              } as React.CSSProperties
            }
          />
        </g>

        {/* Second "4" */}
        <g transform="translate(440, 96)">
          {digitFourStrokes.map((stroke, i) => (
            <path
              key={`${uid}-four-b-${i}`}
              d={stroke.d}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              className="animate-draw-line"
              style={
                {
                  "--draw-length": "1",
                  "--draw-duration": "0.7s",
                  animationDelay: `${0.85 + i * 0.1}s`,
                  strokeDasharray: 1,
                } as React.CSSProperties
              }
            />
          ))}
        </g>

        {/* ============================================================
           SHEET LABEL — top-left (fade in)
           ============================================================ */}
        <g className="animate-fade-in" style={{ animationDelay: "1.2s", opacity: 0 }}>
          <text
            x="56"
            y="70"
            fill="var(--color-cyano-night-ink-soft)"
            fontSize="10"
            letterSpacing="3"
            fontFamily={MONO}
          >
            WASLEEN APPROVALS
          </text>
          <text
            x="56"
            y="86"
            fill="var(--color-cyano-night-ink-soft)"
            fontSize="8"
            letterSpacing="2"
            fontFamily={MONO}
            opacity="0.7"
          >
            DUBAI · UNITED ARAB EMIRATES
          </text>
        </g>

        {/* ============================================================
           MISSING AREA — dashed placeholder box + X (fade in)
           ============================================================ */}
        <g className="animate-fade-in" style={{ animationDelay: "1.4s", opacity: 0 }}>
          <rect
            x="120"
            y="400"
            width="180"
            height="100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="10 7"
          />
          <line
            x1="120"
            y1="400"
            x2="300"
            y2="500"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="10 7"
          />
          <line
            x1="300"
            y1="400"
            x2="120"
            y2="500"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="10 7"
          />
        </g>

        {/* ============================================================
           LEADER LABELS — "AREA NOT FOUND" + "NO DIMENSIONS"
           ============================================================ */}
        <g className="animate-fade-in" style={{ animationDelay: "1.6s", opacity: 0 }}>
          <text
            x="210"
            y="372"
            textAnchor="middle"
            fill="var(--color-cyano-night-heading)"
            fontSize="13"
            fontWeight="bold"
            letterSpacing="2"
            fontFamily={MONO}
          >
            AREA NOT FOUND
          </text>
          <line
            x1="210"
            y1="380"
            x2="210"
            y2="396"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.7"
          />
        </g>

        <g className="animate-fade-in" style={{ animationDelay: "1.8s", opacity: 0 }}>
          <text
            x="322"
            y="452"
            textAnchor="start"
            fill="var(--color-cyano-night-ink-soft)"
            fontSize="10"
            letterSpacing="1"
            fontFamily={MONO}
          >
            NO DIMENSIONS
          </text>
          <line
            x1="318"
            y1="448"
            x2="304"
            y2="470"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.6"
          />
        </g>

        {/* ============================================================
           DIMENSION LINES — "???" (no measurements recorded)
           ============================================================ */}
        <DimensionLine
          x1={120}
          y1={500}
          x2={300}
          y2={500}
          label="???"
          offset={30}
          delay={4.0}
        />
        <DimensionLine
          x1={40}
          y1={40}
          x2={760}
          y2={40}
          label="???"
          offset={-22}
          delay={4.2}
        />

        {/* ============================================================
           COMPASS ROSE — top-right (rotate in)
           ============================================================ */}
        <g transform="translate(690, 56)">
          <CompassNorth size={48} animated delay={3.4} />
        </g>

        {/* ============================================================
           TITLE BLOCK — bottom-right
           ============================================================ */}
        <TitleBlock
          x={780 - 240}
          y={620 - 100}
          width={240}
          height={100}
          projectName="WASLEEN APPROVALS"
          drawingTitle="AREA NOT FOUND"
          drawingNumber="DRW-404"
          scale="1:?"
          date="2026"
          revision="N/A"
          delay={2.8}
        />

        {/* ============================================================
           REJECTION STAMP — "REVISION NOT FOUND / RESUBMIT"
           Pressed over the missing area (looping stamp animation).
           ============================================================ */}
        <g
          transform="translate(200, 455) rotate(-10)"
          className="text-cyano-night-amber animate-stamp-loop"
          style={{ opacity: 0 }}
        >
          {/* Outer + inner rings */}
          <rect
            x="-95"
            y="-50"
            width="190"
            height="100"
            rx="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <rect
            x="-88"
            y="-43"
            width="176"
            height="86"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.6"
          />
          {/* Corner brackets */}
          <path
            d="M -95 -50 L -81 -50 M -95 -50 L -95 -36"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 95 -50 L 81 -50 M 95 -50 L 95 -36"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M -95 50 L -81 50 M -95 50 L -95 36"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 95 50 L 81 50 M 95 50 L 95 36"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          {/* Stamp text */}
          <text
            x="0"
            y="-16"
            textAnchor="middle"
            fill="currentColor"
            fontSize="16"
            fontWeight="bold"
            letterSpacing="1"
            fontFamily={MONO}
          >
            REVISION NOT FOUND
          </text>
          <text
            x="0"
            y="8"
            textAnchor="middle"
            fill="var(--color-cyano-night-ink)"
            fontSize="12"
            letterSpacing="3"
            fontFamily={MONO}
          >
            RESUBMIT
          </text>
          <text
            x="0"
            y="30"
            textAnchor="middle"
            fill="var(--color-cyano-night-ink-soft)"
            fontSize="8"
            letterSpacing="1"
            fontFamily={MONO}
          >
            WASLEEN APPROVALS · 04
          </text>
          {/* Small X marks */}
          <line x1="-82" y1="-34" x2="-70" y2="-22" stroke="currentColor" strokeWidth="1.5" />
          <line x1="-70" y1="-34" x2="-82" y2="-22" stroke="currentColor" strokeWidth="1.5" />
          <line x1="82" y1="22" x2="70" y2="34" stroke="currentColor" strokeWidth="1.5" />
          <line x1="70" y1="22" x2="82" y2="34" stroke="currentColor" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}
