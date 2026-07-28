/**
 * SceneB_SitePlan — Animated site/plot plan for approvals and services pages.
 *
 * Design: A professional site plan showing:
 * - Plot boundary with survey markers
 * - Building footprint with setbacks
 * - Access road, driveway, parking
 * - Landscaping and green areas
 * - Dimension annotations with setback labels
 * - Compass north arrow
 * - Title block
 *
 * @see /plans/complete-build-plan.md (Phase 12.3 — Scene B)
 */

"use client";

import { useId } from "react";
import {
  BlueprintGrid,
  CompassNorth,
  DimensionLine,
  TitleBlock,
  ApprovalStamp,
  RoomLabel,
} from "./DrawingSymbols";

/* ============================================================
   Layout Constants (viewBox: 0 0 800 640)
   ============================================================ */

const PLOT = {
  x: 100,
  y: 80,
  width: 600,
  height: 460,
};

const BUILDING = {
  x: 200,
  y: 180,
  width: 300,
  height: 240,
};

// Setbacks
const SETBACK_FRONT = BUILDING.x - PLOT.x; // 100
const SETBACK_REAR = PLOT.x + PLOT.width - (BUILDING.x + BUILDING.width); // 200
const SETBACK_LEFT = BUILDING.y - PLOT.y; // 100
const SETBACK_RIGHT = PLOT.y + PLOT.height - (BUILDING.y + BUILDING.height); // 140

// Driveway
const DRIVEWAY = {
  x1: BUILDING.x + BUILDING.width / 2 - 30,
  y1: PLOT.y + PLOT.height,
  x2: BUILDING.x + BUILDING.width / 2 - 30,
  y2: PLOT.y + PLOT.height + 80,
  width: 60,
};

// Parking
const PARKING_SPOTS = [
  { x: BUILDING.x + BUILDING.width + 30, y: BUILDING.y + 40 },
  { x: BUILDING.x + BUILDING.width + 30, y: BUILDING.y + 90 },
  { x: BUILDING.x + BUILDING.width + 30, y: BUILDING.y + 140 },
];

// Trees
const TREES = [
  { cx: 380, cy: 110, r: 12 },
  { cx: 420, cy: 95, r: 10 },
  { cx: 340, cy: 100, r: 14 },
  { cx: 160, cy: 200, r: 10 },
  { cx: 150, cy: 250, r: 12 },
  { cx: 145, cy: 310, r: 10 },
  { cx: 350, cy: 480, r: 11 },
  { cx: 400, cy: 490, r: 13 },
  { cx: 300, cy: 485, r: 10 },
];

/* ============================================================
   SceneB Component
   ============================================================ */

interface SceneBProps {
  className?: string;
}

export default function SceneB_SitePlan({ className = "" }: SceneBProps) {
  const uid = useId();

  return (
    <div className={`relative w-full aspect-[5/4] ${className}`}>
      <svg
        viewBox="0 0 800 640"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Animated site plan showing a plot with building footprint, setbacks, driveway, parking, and landscaping"
        role="img"
      >
        {/* ============================================================
           BACKGROUND — Grid pattern
           ============================================================ */}
        <BlueprintGrid id={uid} gridSize={50} subDivisions={5} opacity={0.08} />
        <rect x="0" y="0" width="800" height="640" fill={`url(#${uid}-minor)`} />
        <rect x="0" y="0" width="800" height="640" fill={`url(#${uid}-major)`} />

        {/* ============================================================
           PLOT BOUNDARY — Survey markers + boundary line
           ============================================================ */}
        <rect
          x={PLOT.x}
          y={PLOT.y}
          width={PLOT.width}
          height={PLOT.height}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="8 4"
          className="animate-draw-line"
          style={
            {
              "--draw-length": (PLOT.width + PLOT.height) * 4,
              "--draw-duration": "1.5s",
              animationDelay: "0.2s",
            } as React.CSSProperties
          }
        />

        {/* Survey markers at corners */}
        {[
          { x: PLOT.x, y: PLOT.y },
          { x: PLOT.x + PLOT.width, y: PLOT.y },
          { x: PLOT.x + PLOT.width, y: PLOT.y + PLOT.height },
          { x: PLOT.x, y: PLOT.y + PLOT.height },
        ].map((corner, i) => (
          <g
            key={`${uid}-marker-${i}`}
            className="animate-fade-in"
            style={{ animationDelay: `${1.0 + i * 0.15}s`, opacity: 0 }}
          >
            <circle cx={corner.x} cy={corner.y} r="4" fill="currentColor" />
            <circle cx={corner.x} cy={corner.y} r="6" fill="none" stroke="currentColor" strokeWidth="1" />
          </g>
        ))}

        {/* ============================================================
           BUILDING FOOTPRINT
           ============================================================ */}
        <rect
          x={BUILDING.x}
          y={BUILDING.y}
          width={BUILDING.width}
          height={BUILDING.height}
          fill="currentColor"
          fillOpacity={0.06}
          stroke="currentColor"
          strokeWidth="2"
          className="animate-draw-line"
          style={
            {
              "--draw-length": (BUILDING.width + BUILDING.height) * 4,
              "--draw-duration": "1.2s",
              animationDelay: "0.8s",
            } as React.CSSProperties
          }
        />

        {/* Roof hatch pattern */}
        <g
          className="animate-fade-in"
          style={{ animationDelay: "1.6s", opacity: 0 }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <line
              key={`${uid}-hatch-${i}`}
              x1={BUILDING.x + 10}
              y1={BUILDING.y + 20 + i * 28}
              x2={BUILDING.x + BUILDING.width - 10}
              y2={BUILDING.y + 20 + i * 28}
              stroke="currentColor"
              strokeWidth="0.5"
              opacity={0.3}
            />
          ))}
        </g>

        {/* Building label */}
        <text
          x={BUILDING.x + BUILDING.width / 2}
          y={BUILDING.y + BUILDING.height / 2 + 4}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
          fontSize="14"
          fontWeight="bold"
          fontFamily="var(--font-family-roboto-mono), monospace"
          className="animate-fade-in"
          style={{ animationDelay: "2.0s", opacity: 0 }}
        >
          PROPOSED BUILDING
        </text>
        <text
          x={BUILDING.x + BUILDING.width / 2}
          y={BUILDING.y + BUILDING.height / 2 + 20}
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontFamily="var(--font-family-roboto-mono), monospace"
          className="animate-fade-in"
          style={{ animationDelay: "2.1s", opacity: 0 }}
        >
          G+1 | 450 m²
        </text>

        {/* ============================================================
           SETBACK LINES — Dashed lines showing setbacks
           ============================================================ */}
        {[
          // Front setback
          {
            x1: PLOT.x + 2,
            y1: BUILDING.y,
            x2: PLOT.x + SETBACK_FRONT - 5,
            y2: BUILDING.y,
          },
          // Rear setback
          {
            x1: BUILDING.x + BUILDING.width + 5,
            y1: BUILDING.y,
            x2: PLOT.x + PLOT.width - 2,
            y2: BUILDING.y,
          },
          // Left setback
          {
            x1: BUILDING.x,
            y1: PLOT.y + 2,
            x2: BUILDING.x,
            y2: BUILDING.y - 5,
          },
          // Right setback
          {
            x1: BUILDING.x + BUILDING.width,
            y1: BUILDING.y + BUILDING.height + 5,
            x2: BUILDING.x + BUILDING.width,
            y2: PLOT.y + PLOT.height - 2,
          },
        ].map((line, i) => (
          <line
            key={`${uid}-setback-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={0.5}
            className="animate-draw-line"
            style={
              {
                "--draw-length": "100",
                "--draw-duration": "0.5s",
                animationDelay: `${1.4 + i * 0.1}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Setback dimension annotations */}
        <RoomLabel
          x={100}
          y={135}
          targetX={100}
          targetY={BUILDING.y - 5}
          label="FRONT 10.0m"
          delay={2.2}
        />
        <RoomLabel
          x={670}
          y={135}
          targetX={560}
          targetY={BUILDING.y - 5}
          label="REAR 20.0m"
          delay={2.35}
        />
        <RoomLabel
          x={155}
          y={280}
          targetX={BUILDING.x - 5}
          targetY={230}
          label="SIDE 10.0m"
          delay={2.5}
        />

        {/* ============================================================
           DRIVEWAY / ACCESS
           ============================================================ */}
        <g
          className="animate-draw-line"
          style={
            {
              "--draw-length": "200",
              "--draw-duration": "0.8s",
              animationDelay: "2.8s",
            } as React.CSSProperties
          }
        >
          {/* Driveway boundaries */}
          <line
            x1={DRIVEWAY.x1}
            y1={DRIVEWAY.y1}
            x2={DRIVEWAY.x1}
            y2={DRIVEWAY.y2}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 3"
          />
          <line
            x1={DRIVEWAY.x1 + DRIVEWAY.width}
            y1={DRIVEWAY.y1}
            x2={DRIVEWAY.x1 + DRIVEWAY.width}
            y2={DRIVEWAY.y2}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 3"
          />
          {/* Arrow showing access direction */}
          <polygon
            points={`${DRIVEWAY.x1 + DRIVEWAY.width / 2 - 6},${DRIVEWAY.y2 - 15} ${DRIVEWAY.x1 + DRIVEWAY.width / 2 + 6},${DRIVEWAY.y2 - 15} ${DRIVEWAY.x1 + DRIVEWAY.width / 2},${DRIVEWAY.y2 - 5}`}
            fill="currentColor"
            opacity={0.6}
          />
          <text
            x={DRIVEWAY.x1 + DRIVEWAY.width / 2}
            y={DRIVEWAY.y2 + 14}
            textAnchor="middle"
            fill="currentColor"
            fontSize="9"
            fontFamily="var(--font-family-roboto-mono), monospace"
            opacity={0.6}
          >
            ACCESS ROAD
          </text>
        </g>

        {/* ============================================================
           PARKING SPACES
           ============================================================ */}
        {PARKING_SPOTS.map((spot, i) => (
          <g
            key={`${uid}-parking-${i}`}
            className="animate-fade-in"
            style={{ animationDelay: `${3.0 + i * 0.15}s`, opacity: 0 }}
          >
            <rect
              x={spot.x}
              y={spot.y}
              width={24}
              height={40}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              rx="2"
            />
            {/* Diagonal hash */}
            <line
              x1={spot.x + 2}
              y1={spot.y + 2}
              x2={spot.x + 22}
              y2={spot.y + 38}
              stroke="currentColor"
              strokeWidth="0.75"
              opacity={0.4}
            />
            {/* "P" label */}
            <text
              x={spot.x + 12}
              y={spot.y + 24}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="currentColor"
              fontSize="8"
              fontWeight="bold"
              fontFamily="var(--font-family-roboto-mono), monospace"
            >
              P
            </text>
          </g>
        ))}

        {/* ============================================================
           LANDSCAPING — Trees (circular plan symbols)
           ============================================================ */}
        {TREES.map((tree, i) => (
          <g
            key={`${uid}-tree-${i}`}
            className="animate-fade-in"
            style={{ animationDelay: `${3.5 + i * 0.08}s`, opacity: 0 }}
          >
            {/* Tree canopy */}
            <circle
              cx={tree.cx}
              cy={tree.cy}
              r={tree.r}
              fill="currentColor"
              fillOpacity={0.08}
              stroke="currentColor"
              strokeWidth="1"
              opacity={0.5}
            />
            {/* Cross inside (tree symbol) */}
            <line
              x1={tree.cx - tree.r + 3}
              y1={tree.cy}
              x2={tree.cx + tree.r - 3}
              y2={tree.cy}
              stroke="currentColor"
              strokeWidth="0.75"
              opacity={0.4}
            />
            <line
              x1={tree.cx}
              y1={tree.cy - tree.r + 3}
              x2={tree.cx}
              y2={tree.cy + tree.r - 3}
              stroke="currentColor"
              strokeWidth="0.75"
              opacity={0.4}
            />
          </g>
        ))}

        {/* ============================================================
           DIMENSION LINES
           ============================================================ */}
        {/* Plot width */}
        <DimensionLine
          x1={PLOT.x}
          y1={PLOT.y}
          x2={PLOT.x + PLOT.width}
          y2={PLOT.y}
          label="PLOT 40.0 m"
          offset={-22}
          delay={4.0}
        />
        {/* Plot height */}
        <DimensionLine
          x1={PLOT.x + PLOT.width}
          y1={PLOT.y}
          x2={PLOT.x + PLOT.width}
          y2={PLOT.y + PLOT.height}
          label="PLOT 30.0 m"
          offset={22}
          delay={4.2}
        />
        {/* Building width */}
        <DimensionLine
          x1={BUILDING.x}
          y1={BUILDING.y + BUILDING.height}
          x2={BUILDING.x + BUILDING.width}
          y2={BUILDING.y + BUILDING.height}
          label="BLDG 20.0 m"
          offset={22}
          delay={4.4}
        />

        {/* ============================================================
           COMPASS NORTH
           ============================================================ */}
        <g transform="translate(60, 60)">
          <CompassNorth size={48} animated delay={4.8} />
        </g>

        {/* ============================================================
           TITLE BLOCK
           ============================================================ */}
        <TitleBlock
          x={PLOT.x + PLOT.width - 240}
          y={PLOT.y + PLOT.height - 100}
          width={240}
          height={100}
          projectName="WASLEEN APPROVALS"
          drawingTitle="SITE PLAN"
          drawingNumber="DRW-B-001"
          scale="1:200"
          date="2026"
          revision="A"
          delay={5.0}
        />

        {/* ============================================================
           APPROVAL STAMP
           ============================================================ */}
        <ApprovalStamp
          x={PLOT.x + 30}
          y={PLOT.y + PLOT.height - 100}
          size={80}
          text="APPROVED"
          delay={5.5}
        />
      </svg>
    </div>
  );
}
