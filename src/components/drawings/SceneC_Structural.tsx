/**
 * SceneC_Structural — Animated structural engineering drawing.
 *
 * Design: A professional structural framing plan showing:
 * - Column grid with gridlines (A, B, C and 1, 2, 3, 4)
 * - Columns (filled squares at grid intersections)
 * - Beams spanning between columns
 * - Slab edge outline
 * - Reinforcement callouts
 * - Section cut indicators
 * - Notes annotations
 *
 * @see /plans/complete-build-plan.md (Phase 12.4 — Scene C)
 */

"use client";

import { useId } from "react";
import {
  BlueprintGrid,
  CompassNorth,
  DimensionLine,
  TitleBlock,
  ApprovalStamp,
} from "./DrawingSymbols";

/* ============================================================
   Layout Constants (viewBox: 0 0 800 640)
   ============================================================ */

// Column grid
const GRID = {
  originX: 160,
  originY: 120,
  spacingX: 120,
  spacingY: 100,
  cols: 4, // Gridlines 1-4
  rows: 3, // Gridlines A-C
};

// Column size
const COL_SIZE = 16;

// Slab edge offset from outer columns
const SLAB_OFFSET = 30;

/* ============================================================
   SceneC Component
   ============================================================ */

interface SceneCProps {
  className?: string;
}

export default function SceneC_Structural({ className = "" }: SceneCProps) {
  const uid = useId();

  // Gridline labels
  const colLabels = ["1", "2", "3", "4"];
  const rowLabels = ["A", "B", "C"];

  // Compute actual positions
  const gridPoints: { col: number; row: number; cx: number; cy: number }[] = [];
  for (let c = 0; c < GRID.cols; c++) {
    for (let r = 0; r < GRID.rows; r++) {
      gridPoints.push({
        col: c,
        row: r,
        cx: GRID.originX + c * GRID.spacingX,
        cy: GRID.originY + r * GRID.spacingY,
      });
    }
  }

  // Slab edges
  const slabLeft = GRID.originX - SLAB_OFFSET;
  const slabTop = GRID.originY - SLAB_OFFSET;
  const slabRight = GRID.originX + (GRID.cols - 1) * GRID.spacingX + SLAB_OFFSET;
  const slabBottom = GRID.originY + (GRID.rows - 1) * GRID.spacingY + SLAB_OFFSET;

  return (
    <div className={`relative w-full aspect-[5/4] ${className}`}>
      <svg
        viewBox="0 0 800 640"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Animated structural framing plan showing column grid, beams, slab edges, and reinforcement callouts"
        role="img"
      >
        {/* ============================================================
           BACKGROUND — Grid
           ============================================================ */}
        <BlueprintGrid id={uid} gridSize={40} subDivisions={4} opacity={0.06} />
        <rect x="0" y="0" width="800" height="640" fill={`url(#${uid}-minor)`} />
        <rect x="0" y="0" width="800" height="640" fill={`url(#${uid}-major)`} />

        {/* ============================================================
           SLAB EDGE — dashed outer boundary
           ============================================================ */}
        <rect
          x={slabLeft}
          y={slabTop}
          width={slabRight - slabLeft}
          height={slabBottom - slabTop}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="10 5"
          className="animate-draw-line"
          style={
            {
              "--draw-length": (slabRight - slabLeft + slabBottom - slabTop) * 4,
              "--draw-duration": "1.5s",
              animationDelay: "0.2s",
            } as React.CSSProperties
          }
        />

        {/* Slab label */}
        <text
          x={slabRight - 10}
          y={slabTop + 16}
          textAnchor="end"
          fill="currentColor"
          fontSize="8"
          fontFamily="var(--font-family-roboto-mono), monospace"
          opacity={0.5}
          className="animate-fade-in"
          style={{ animationDelay: "1.8s", opacity: 0 }}
        >
          SLAB EDGE
        </text>

        {/* ============================================================
           GRIDLINES — Axis lines with labels
           ============================================================ */}
        {/* Vertical gridlines */}
        {colLabels.map((label, c) => {
          const x = GRID.originX + c * GRID.spacingX;
          return (
            <g key={`${uid}-vgrid-${c}`}>
              <line
                x1={x}
                y1={slabTop - 20}
                x2={x}
                y2={slabBottom + 20}
                stroke="currentColor"
                strokeWidth="0.75"
                opacity={0.35}
                className="animate-draw-line"
                style={
                  {
                    "--draw-length": (slabBottom - slabTop + 40) * 2,
                    "--draw-duration": "0.8s",
                    animationDelay: `${0.5 + c * 0.12}s`,
                  } as React.CSSProperties
                }
              />
              {/* Circle with label at bottom */}
              <circle
                cx={x}
                cy={slabBottom + 32}
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity={0.5}
                className="animate-fade-in"
                style={{ animationDelay: `${1.5 + c * 0.1}s`, opacity: 0 }}
              />
              <text
                x={x}
                y={slabBottom + 36}
                textAnchor="middle"
                fill="currentColor"
                fontSize="11"
                fontWeight="bold"
                fontFamily="var(--font-family-roboto-mono), monospace"
                opacity={0.7}
                className="animate-fade-in"
                style={{ animationDelay: `${1.6 + c * 0.1}s`, opacity: 0 }}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Horizontal gridlines */}
        {rowLabels.map((label, r) => {
          const y = GRID.originY + r * GRID.spacingY;
          return (
            <g key={`${uid}-hgrid-${r}`}>
              <line
                x1={slabLeft - 20}
                y1={y}
                x2={slabRight + 20}
                y2={y}
                stroke="currentColor"
                strokeWidth="0.75"
                opacity={0.35}
                className="animate-draw-line"
                style={
                  {
                    "--draw-length": (slabRight - slabLeft + 40) * 2,
                    "--draw-duration": "0.8s",
                    animationDelay: `${0.8 + r * 0.12}s`,
                  } as React.CSSProperties
                }
              />
              {/* Circle with label at left */}
              <circle
                cx={slabLeft - 32}
                cy={y}
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity={0.5}
                className="animate-fade-in"
                style={{ animationDelay: `${1.8 + r * 0.1}s`, opacity: 0 }}
              />
              <text
                x={slabLeft - 32}
                y={y + 4}
                textAnchor="middle"
                fill="currentColor"
                fontSize="11"
                fontWeight="bold"
                fontFamily="var(--font-family-roboto-mono), monospace"
                opacity={0.7}
                className="animate-fade-in"
                style={{ animationDelay: `${1.9 + r * 0.1}s`, opacity: 0 }}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* ============================================================
           BEAMS — spanning between columns
           ============================================================ */}
        {/* Horizontal beams (along rows) */}
        {Array.from({ length: GRID.rows }, (_, r) => {
          const y = GRID.originY + r * GRID.spacingY;
          return Array.from({ length: GRID.cols - 1 }, (_, c) => {
            const x1 = GRID.originX + c * GRID.spacingX;
            const x2 = GRID.originX + (c + 1) * GRID.spacingX;
            const idx = r * (GRID.cols - 1) + c;
            const segLen = x2 - x1;
            return (
              <line
                key={`${uid}-hbeam-${idx}`}
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                opacity={0.7}
                className="animate-draw-line"
                style={
                  {
                    "--draw-length": segLen * 2,
                    "--draw-duration": "0.6s",
                    animationDelay: `${1.2 + idx * 0.06}s`,
                  } as React.CSSProperties
                }
              />
            );
          });
        })}

        {/* Vertical beams (along columns) */}
        {Array.from({ length: GRID.cols }, (_, c) => {
          const x = GRID.originX + c * GRID.spacingX;
          return Array.from({ length: GRID.rows - 1 }, (_, r) => {
            const y1 = GRID.originY + r * GRID.spacingY;
            const y2 = GRID.originY + (r + 1) * GRID.spacingY;
            const idx = c * (GRID.rows - 1) + r;
            const segLen = y2 - y1;
            return (
              <line
                key={`${uid}-vbeam-${idx}`}
                x1={x}
                y1={y1}
                x2={x}
                y2={y2}
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                opacity={0.7}
                className="animate-draw-line"
                style={
                  {
                    "--draw-length": segLen * 2,
                    "--draw-duration": "0.6s",
                    animationDelay: `${1.6 + idx * 0.06}s`,
                  } as React.CSSProperties
                }
              />
            );
          });
        })}

        {/* ============================================================
           COLUMNS — filled squares at grid intersections
           ============================================================ */}
        {gridPoints.map((pt, i) => (
          <g
            key={`${uid}-col-${i}`}
            className="animate-fade-in"
            style={{ animationDelay: `${2.2 + i * 0.06}s`, opacity: 0 }}
          >
            <rect
              x={pt.cx - COL_SIZE / 2}
              y={pt.cy - COL_SIZE / 2}
              width={COL_SIZE}
              height={COL_SIZE}
              fill="currentColor"
              fillOpacity={0.25}
              stroke="currentColor"
              strokeWidth="2"
            />
            {/* Column crosshatch */}
            <line
              x1={pt.cx - COL_SIZE / 2 + 3}
              y1={pt.cy - COL_SIZE / 2 + 3}
              x2={pt.cx + COL_SIZE / 2 - 3}
              y2={pt.cy + COL_SIZE / 2 - 3}
              stroke="currentColor"
              strokeWidth="1"
              opacity={0.5}
            />
            <line
              x1={pt.cx + COL_SIZE / 2 - 3}
              y1={pt.cy - COL_SIZE / 2 + 3}
              x2={pt.cx - COL_SIZE / 2 + 3}
              y2={pt.cy + COL_SIZE / 2 - 3}
              stroke="currentColor"
              strokeWidth="1"
              opacity={0.5}
            />
          </g>
        ))}

        {/* ============================================================
           REINFORCEMENT CALLOUTS
           ============================================================ */}
        {[
          { x: 400, y: 180, label: "4T16" },
          { x: 520, y: 180, label: "4T16" },
          { x: 400, y: 280, label: "4T20" },
          { x: 520, y: 280, label: "4T20" },
        ].map((callout, i) => (
          <g
            key={`${uid}-rebar-${i}`}
            className="animate-fade-in"
            style={{ animationDelay: `${2.6 + i * 0.1}s`, opacity: 0 }}
          >
            {/* Callout bubble */}
            <ellipse
              cx={callout.x}
              cy={callout.y}
              rx="28"
              ry="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity={0.6}
            />
            <text
              x={callout.x}
              y={callout.y + 4}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="currentColor"
              fontSize="9"
              fontWeight="bold"
              fontFamily="var(--font-family-roboto-mono), monospace"
            >
              {callout.label}
            </text>
          </g>
        ))}

        {/* ============================================================
           SECTION CUT INDICATOR — A-A
           ============================================================ */}
        <g
          className="animate-draw-line"
          style={
            {
              "--draw-length": "200",
              "--draw-duration": "0.6s",
              animationDelay: "3.2s",
            } as React.CSSProperties
          }
        >
          {/* Section line */}
          <line
            x1={slabLeft - 10}
            y1={GRID.originY + GRID.spacingY / 2}
            x2={slabRight + 10}
            y2={GRID.originY + GRID.spacingY / 2}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="12 6 2 6"
            opacity={0.6}
          />

          {/* Arrow heads */}
          <polygon
            points={`${slabLeft - 10},${GRID.originY + GRID.spacingY / 2} ${slabLeft - 4},${GRID.originY + GRID.spacingY / 2 - 6} ${slabLeft - 4},${GRID.originY + GRID.spacingY / 2 + 6}`}
            fill="currentColor"
            opacity={0.6}
          />
          <polygon
            points={`${slabRight + 10},${GRID.originY + GRID.spacingY / 2} ${slabRight + 4},${GRID.originY + GRID.spacingY / 2 - 6} ${slabRight + 4},${GRID.originY + GRID.spacingY / 2 + 6}`}
            fill="currentColor"
            opacity={0.6}
          />

          {/* Section label */}
          <text
            x={slabLeft - 24}
            y={GRID.originY + GRID.spacingY / 2 + 4}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="currentColor"
            fontSize="12"
            fontWeight="bold"
            fontFamily="var(--font-family-roboto-mono), monospace"
            opacity={0.7}
            className="animate-fade-in"
            style={{ animationDelay: "3.5s", opacity: 0 }}
          >
            A
          </text>
          <text
            x={slabRight + 24}
            y={GRID.originY + GRID.spacingY / 2 + 4}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="currentColor"
            fontSize="12"
            fontWeight="bold"
            fontFamily="var(--font-family-roboto-mono), monospace"
            opacity={0.7}
            className="animate-fade-in"
            style={{ animationDelay: "3.6s", opacity: 0 }}
          >
            A
          </text>
        </g>

        {/* ============================================================
           NOTES / ANNOTATIONS
           ============================================================ */}
        <g
          className="animate-fade-in"
          style={{ animationDelay: "3.8s", opacity: 0 }}
        >
          <text
            x={slabLeft}
            y={slabBottom + 60}
            fill="currentColor"
            fontSize="8"
            fontFamily="var(--font-family-roboto-mono), monospace"
            opacity={0.5}
          >
            NOTES:
          </text>
          <text
            x={slabLeft}
            y={slabBottom + 74}
            fill="currentColor"
            fontSize="7"
            fontFamily="var(--font-family-roboto-mono), monospace"
            opacity={0.4}
          >
            1. ALL CONCRETE GRADE: C40/50
          </text>
          <text
            x={slabLeft}
            y={slabBottom + 86}
            fill="currentColor"
            fontSize="7"
            fontFamily="var(--font-family-roboto-mono), monospace"
            opacity={0.4}
          >
            2. REINFORCEMENT: Y16-Y20 BARS
          </text>
          <text
            x={slabLeft}
            y={slabBottom + 98}
            fill="currentColor"
            fontSize="7"
            fontFamily="var(--font-family-roboto-mono), monospace"
            opacity={0.4}
          >
            3. SLAB THICKNESS: 200mm
          </text>
        </g>

        {/* ============================================================
           DIMENSIONS
           ============================================================ */}
        <DimensionLine
          x1={GRID.originX}
          y1={slabTop - 10}
          x2={GRID.originX + (GRID.cols - 1) * GRID.spacingX}
          y2={slabTop - 10}
          label="9.0 m"
          offset={-18}
          delay={4.0}
        />
        <DimensionLine
          x1={GRID.originX}
          y1={slabTop}
          x2={GRID.originX}
          y2={GRID.originY + (GRID.rows - 1) * GRID.spacingY}
          label="10.0 m"
          offset={-18}
          delay={4.2}
        />

        {/* ============================================================
           COMPASS NORTH
           ============================================================ */}
        <g transform="translate(60, 60)">
          <CompassNorth size={48} animated delay={4.6} />
        </g>

        {/* ============================================================
           TITLE BLOCK
           ============================================================ */}
        <TitleBlock
          x={slabRight - 140}
          y={slabBottom + 60}
          width={210}
          height={90}
          projectName="WASLEEN APPROVALS"
          drawingTitle="STRUCTURAL FRAMING PLAN"
          drawingNumber="DRW-C-001"
          scale="1:100"
          date="2026"
          revision="A"
          delay={5.0}
        />

        {/* ============================================================
           APPROVAL STAMP
           ============================================================ */}
        <ApprovalStamp
          x={slabLeft + 20}
          y={slabBottom + 50}
          size={70}
          text="APPROVED"
          delay={5.5}
        />
      </svg>
    </div>
  );
}
