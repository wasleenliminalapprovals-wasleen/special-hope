/**
 * SceneD_ApprovalStamp — Animated approval stamp and signature scene.
 *
 * Design: A document that gets reviewed, signed, and stamped:
 * - Document sheet sliding in
 * - Checkmark review indicator
 * - Hand-drawn signature being written
 * - "APPROVED" stamp pressing down with bounce
 * - Official seal/stamp circling
 * - Decorative document lines
 *
 * Perfect for contact page, service page CTAs, or about us page.
 *
 * @see /plans/complete-build-plan.md (Phase 12.5 — Scene D)
 */

"use client";

import { useId } from "react";

/* ============================================================
   SceneD Component
   ============================================================ */

interface SceneDProps {
  className?: string;
}

export default function SceneD_ApprovalStamp({ className = "" }: SceneDProps) {
  const uid = useId();

  return (
    <div className={`relative w-full aspect-[5/4] ${className}`}>
      <svg
        viewBox="0 0 800 640"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Animated approval scene showing a document being reviewed, signed, and stamped with an official approval"
        role="img"
      >
        {/* ============================================================
           BACKGROUND — Subtle paper texture effect
           ============================================================ */}
        <rect x="0" y="0" width="800" height="640" fill="none" />

        {/* ============================================================
           DOCUMENT SHEET — slides in from top
           ============================================================ */}
        <g
          className="animate-fade-in-up"
          style={{ animationDuration: "0.8s", opacity: 0 }}
        >
          {/* Document shadow */}
          <rect
            x="131"
            y="111"
            width="542"
            height="420"
            rx="4"
            fill="currentColor"
            fillOpacity={0.08}
          />
          {/* Document body */}
          <rect
            x="125"
            y="105"
            width="542"
            height="420"
            rx="4"
            fill="currentColor"
            fillOpacity={0.04}
            stroke="currentColor"
            strokeWidth="1.5"
            opacity={0.3}
          />
          {/* Document header line */}
          <line
            x1="155"
            y1="140"
            x2="405"
            y2="140"
            stroke="currentColor"
            strokeWidth="1"
            opacity={0.25}
          />
          {/* Document content lines */}
          {[
            { y: 170, w: 480 },
            { y: 195, w: 440 },
            { y: 220, w: 490 },
            { y: 260, w: 300 },
            { y: 285, w: 460 },
            { y: 310, w: 420 },
            { y: 350, w: 350 },
            { y: 375, w: 480 },
            { y: 400, w: 390 },
          ].map((line, i) => (
            <line
              key={`${uid}-docline-${i}`}
              x1={155}
              y1={line.y}
              x2={155 + line.w}
              y2={line.y}
              stroke="currentColor"
              strokeWidth="0.75"
              opacity={0.15}
            />
          ))}
        </g>

        {/* Document label */}
        <text
          x={165}
          y={132}
          fill="currentColor"
          fontSize="9"
          fontWeight="bold"
          fontFamily="var(--font-family-roboto-mono), monospace"
          opacity={0.4}
          className="animate-fade-in"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        >
          APPROVAL APPLICATION FORM
        </text>

        {/* ============================================================
           REVIEW CHECKMARK — Animated check appearing
           ============================================================ */}
        <g
          className="animate-draw-line"
          style={
            {
              "--draw-length": "60",
              "--draw-duration": "0.6s",
              animationDelay: "1.2s",
            } as React.CSSProperties
          }
        >
          {/* Check circle */}
          <circle
            cx={610}
            cy={170}
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity={0.4}
          />
          {/* Checkmark */}
          <polyline
            points="601,170 607,178 619,164"
            fill="none"
            stroke="#2E9E5B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <text
          x={610}
          y={200}
          textAnchor="middle"
          fill="#2E9E5B"
          fontSize="8"
          fontWeight="bold"
          fontFamily="var(--font-family-roboto-mono), monospace"
          className="animate-fade-in"
          style={{ animationDelay: "1.6s", opacity: 0 }}
        >
          VERIFIED
        </text>

        {/* ============================================================
           SIGNATURE LINE — Drawn with animation
           ============================================================ */}
        <g
          className="animate-draw-line"
          style={
            {
              "--draw-length": "200",
              "--draw-duration": "1.2s",
              animationDelay: "2.0s",
            } as React.CSSProperties
          }
        >
          {/* Signature baseline */}
          <line
            x1="420"
            y1="460"
            x2="610"
            y2="460"
            stroke="currentColor"
            strokeWidth="1"
            opacity={0.3}
          />

          {/* Hand-drawn signature style path */}
          <path
            d="M 430,458 Q 440,440 450,456 T 470,454 Q 480,438 490,455 T 510,453 Q 520,442 530,454 T 550,452 Q 555,445 560,454 T 580,452 Q 585,448 590,454 T 605,453"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.6}
          />

          {/* Cross on 't' */}
          <line
            x1="540"
            y1="448"
            x2="544"
            y2="460"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity={0.4}
          />
          <line
            x1="536"
            y1="453"
            x2="548"
            y2="453"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity={0.4}
          />
        </g>

        {/* Signature label */}
        <text
          x={515}
          y={475}
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="var(--font-family-roboto-mono), monospace"
          opacity={0.3}
          className="animate-fade-in"
          style={{ animationDelay: "2.6s", opacity: 0 }}
        >
          Authorized Signature
        </text>

        {/* ============================================================
           BIG APPROVED STAMP — Stamp press with bounce
           ============================================================ */}
        <g
          className="animate-stamp-press"
          style={{ animationDelay: "3.0s", opacity: 0 }}
          transform="translate(260, 270)"
        >
          {/* Stamp outer ring */}
          <circle
            cx="70"
            cy="70"
            r="68"
            fill="none"
            stroke="#C8102E"
            strokeWidth="3"
            opacity={0.8}
          />

          {/* Stamp inner ring */}
          <circle
            cx="70"
            cy="70"
            r="58"
            fill="none"
            stroke="#C8102E"
            strokeWidth="1.5"
            opacity={0.4}
          />

          {/* Star decorations */}
          <text
            x={70}
            y={18}
            textAnchor="middle"
            fill="#C8102E"
            fontSize="12"
            opacity={0.6}
          >
            ✦
          </text>
          <text
            x={70}
            y={130}
            textAnchor="middle"
            fill="#C8102E"
            fontSize="12"
            opacity={0.6}
          >
            ✦
          </text>
          <text
            x={14}
            y={74}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#C8102E"
            fontSize="12"
            opacity={0.6}
          >
            ✦
          </text>
          <text
            x={126}
            y={74}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#C8102E"
            fontSize="12"
            opacity={0.6}
          >
            ✦
          </text>

          {/* "APPROVED" text */}
          <text
            x={70}
            y={62}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#C8102E"
            fontSize="22"
            fontWeight="bold"
            fontFamily="var(--font-family-roboto-mono), monospace"
            opacity={0.85}
          >
            APPROVED
          </text>

          {/* Subtitle */}
          <text
            x={70}
            y={88}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#C8102E"
            fontSize="11"
            fontWeight="bold"
            fontFamily="var(--font-family-roboto-mono), monospace"
            opacity={0.7}
          >
            WASLEEN APPROVALS
          </text>

          {/* Date */}
          <text
            x={70}
            y={105}
            textAnchor="middle"
            fill="#C8102E"
            fontSize="9"
            fontFamily="var(--font-family-roboto-mono), monospace"
            opacity={0.5}
          >
            2026
          </text>
        </g>

        {/* ============================================================
           GLOW EFFECT on the stamp — pulsing after stamp
           ============================================================ */}
        <circle
          cx="330"
          cy="340"
          r="75"
          fill="none"
          stroke="#C8102E"
          strokeWidth="1"
          opacity={0}
          className="animate-glow-pulse"
          style={{ animationDelay: "3.8s" }}
        />

        {/* ============================================================
           DECORATIVE — Corner accents
           ============================================================ */}
        <g
          className="animate-draw-line"
          style={
            {
              "--draw-length": "100",
              "--draw-duration": "0.6s",
              animationDelay: "4.2s",
            } as React.CSSProperties
          }
        >
          {/* Top-left corner mark */}
          <line x1="60" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="1" opacity={0.2} />
          <line x1="60" y1="60" x2="60" y2="100" stroke="currentColor" strokeWidth="1" opacity={0.2} />
          {/* Top-right corner mark */}
          <line x1="740" y1="60" x2="700" y2="60" stroke="currentColor" strokeWidth="1" opacity={0.2} />
          <line x1="740" y1="60" x2="740" y2="100" stroke="currentColor" strokeWidth="1" opacity={0.2} />
          {/* Bottom-right corner mark */}
          <line x1="740" y1="580" x2="700" y2="580" stroke="currentColor" strokeWidth="1" opacity={0.2} />
          <line x1="740" y1="580" x2="740" y2="540" stroke="currentColor" strokeWidth="1" opacity={0.2} />
          {/* Bottom-left corner mark */}
          <line x1="60" y1="580" x2="100" y2="580" stroke="currentColor" strokeWidth="1" opacity={0.2} />
          <line x1="60" y1="580" x2="60" y2="540" stroke="currentColor" strokeWidth="1" opacity={0.2} />
        </g>

        {/* ============================================================
           COMPLETION STATUS — Text appears at the end
           ============================================================ */}
        <g
          className="animate-fade-in-up"
          style={{ animationDelay: "4.6s", opacity: 0, animationDuration: "0.8s" }}
        >
          <rect
            x="330"
            y="560"
            width="140"
            height="30"
            rx="15"
            fill="currentColor"
            fillOpacity={0.06}
            stroke="#2E9E5B"
            strokeWidth="1"
            opacity={0.6}
          />
          <text
            x="400"
            y="580"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#2E9E5B"
            fontSize="12"
            fontWeight="bold"
            fontFamily="var(--font-family-roboto-mono), monospace"
          >
            ✓ APPLICATION APPROVED
          </text>
        </g>
      </svg>
    </div>
  );
}
