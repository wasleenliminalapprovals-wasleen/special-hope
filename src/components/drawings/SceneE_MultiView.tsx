/**
 * SceneE_MultiView — Animated multi-view elevation drawing.
 *
 * Design: A professional building elevation drawing showing:
 * - Front elevation view of a building
 * - Roof profile with parapet
 * - Floor levels with height annotations
 * - Window and door openings
 * - Material hatching
 * - Side elevation (smaller, inset)
 * - Section cut references
 * - Height dimension lines
 *
 * @see /plans/complete-build-plan.md (Phase 12.6 — Scene E)
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

// Main elevation
const ELEV = {
  x: 100,
  y: 150,
  width: 360,
  height: 340,
};

// Ground line
const GROUND_Y = ELEV.y + ELEV.height;

// Roof parapet
const PARAPET_HEIGHT = 20;
const ROOF_Y = ELEV.y - PARAPET_HEIGHT;

// Floor levels (from ground up)
const FLOOR_HEIGHT = 150;
const GROUND_FLOOR_Y = GROUND_Y - FLOOR_HEIGHT;
const FIRST_FLOOR_Y = GROUND_FLOOR_Y - FLOOR_HEIGHT;

// Windows (front elevation)
const WINDOWS_FRONT = [
  { x: 150, y: GROUND_FLOOR_Y + 30, w: 60, h: 80 },
  { x: 260, y: GROUND_FLOOR_Y + 30, w: 60, h: 80 },
  { x: 190, y: FIRST_FLOOR_Y + 30, w: 50, h: 70 },
  { x: 290, y: FIRST_FLOOR_Y + 30, w: 50, h: 70 },
];

// Door (front elevation)
const DOOR = { x: 360, y: GROUND_FLOOR_Y + 20, w: 50, h: 120 };

// Side elevation (inset, right side)
const SIDE = {
  x: 540,
  y: 200,
  width: 180,
  height: 240,
};
const SIDE_GROUND_Y = SIDE.y + SIDE.height;

/* ============================================================
   SceneE Component
   ============================================================ */

interface SceneEProps {
  className?: string;
}

export default function SceneE_MultiView({ className = "" }: SceneEProps) {
  const uid = useId();

  return (
    <div className={`relative w-full aspect-[5/4] ${className}`}>
      <svg
        viewBox="0 0 800 640"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Animated building elevation drawing showing front and side views with floor levels, windows, doors, and height annotations"
        role="img"
      >
        {/* ============================================================
           BACKGROUND — Grid
           ============================================================ */}
        <BlueprintGrid id={uid} gridSize={40} subDivisions={4} opacity={0.06} />
        <rect x="0" y="0" width="800" height="640" fill={`url(#${uid}-minor)`} />
        <rect x="0" y="0" width="800" height="640" fill={`url(#${uid}-major)`} />

        {/* ============================================================
           VIEW LABELS
           ============================================================ */}
        <text
          x={ELEV.x + ELEV.width / 2}
          y={ELEV.y - 50}
          textAnchor="middle"
          fill="currentColor"
          fontSize="12"
          fontWeight="bold"
          fontFamily="var(--font-family-roboto-mono), monospace"
          opacity={0.6}
          className="animate-fade-in"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          FRONT ELEVATION
        </text>

        <text
          x={SIDE.x + SIDE.width / 2}
          y={SIDE.y - 30}
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontWeight="bold"
          fontFamily="var(--font-family-roboto-mono), monospace"
          opacity={0.5}
          className="animate-fade-in"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          SIDE ELEVATION
        </text>

        {/* ============================================================
           GROUND LINE — Main elevation
           ============================================================ */}
        <line
          x1={ELEV.x - 40}
          y1={GROUND_Y}
          x2={ELEV.x + ELEV.width + 40}
          y2={GROUND_Y}
          stroke="currentColor"
          strokeWidth="2.5"
          className="animate-draw-line"
          style={
            {
              "--draw-length": (ELEV.width + 80) * 2,
              "--draw-duration": "0.8s",
              animationDelay: "0.4s",
            } as React.CSSProperties
          }
        />

        {/* Ground hatch */}
        <g
          className="animate-fade-in"
          style={{ animationDelay: "1.0s", opacity: 0 }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <line
              key={`${uid}-ground-hatch-${i}`}
              x1={ELEV.x - 30 + i * 40}
              y1={GROUND_Y + 5}
              x2={ELEV.x - 10 + i * 40}
              y2={GROUND_Y + 20}
              stroke="currentColor"
              strokeWidth="0.75"
              opacity={0.2}
            />
          ))}
        </g>

        {/* ============================================================
           BUILDING OUTLINE — Front elevation
           ============================================================ */}
        <rect
          x={ELEV.x}
          y={ROOF_Y}
          width={ELEV.width}
          height={ELEV.height + PARAPET_HEIGHT}
          fill="currentColor"
          fillOpacity={0.03}
          stroke="currentColor"
          strokeWidth="2"
          className="animate-draw-line"
          style={
            {
              "--draw-length": (ELEV.width + ELEV.height + PARAPET_HEIGHT) * 4,
              "--draw-duration": "1.2s",
              animationDelay: "0.6s",
            } as React.CSSProperties
          }
        />

        {/* Parapet top detail */}
        <line
          x1={ELEV.x}
          y1={ROOF_Y}
          x2={ELEV.x + ELEV.width}
          y2={ROOF_Y}
          stroke="currentColor"
          strokeWidth="3"
          className="animate-draw-line"
          style={
            {
              "--draw-length": ELEV.width * 2,
              "--draw-duration": "0.4s",
              animationDelay: "0.8s",
            } as React.CSSProperties
          }
        />

        {/* Parapet coping */}
        <line
          x1={ELEV.x - 5}
          y1={ROOF_Y - 5}
          x2={ELEV.x + ELEV.width + 5}
          y2={ROOF_Y - 5}
          stroke="currentColor"
          strokeWidth="1.5"
          opacity={0.4}
          className="animate-draw-line"
          style={
            {
              "--draw-length": (ELEV.width + 10) * 2,
              "--draw-duration": "0.4s",
              animationDelay: "0.9s",
            } as React.CSSProperties
          }
        />

        {/* ============================================================
           FLOOR LEVEL LINES
           ============================================================ */}
        {/* First Floor line */}
        <line
          x1={ELEV.x}
          y1={FIRST_FLOOR_Y}
          x2={ELEV.x + ELEV.width}
          y2={FIRST_FLOOR_Y}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="6 3"
          opacity={0.5}
          className="animate-draw-line"
          style={
            {
              "--draw-length": ELEV.width * 2,
              "--draw-duration": "0.5s",
              animationDelay: "1.2s",
            } as React.CSSProperties
          }
        />

        {/* Ground Floor line */}
        <line
          x1={ELEV.x}
          y1={GROUND_FLOOR_Y}
          x2={ELEV.x + ELEV.width}
          y2={GROUND_FLOOR_Y}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="6 3"
          opacity={0.5}
          className="animate-draw-line"
          style={
            {
              "--draw-length": ELEV.width * 2,
              "--draw-duration": "0.5s",
              animationDelay: "1.3s",
            } as React.CSSProperties
          }
        />

        {/* Floor labels */}
        <text
          x={ELEV.x - 8}
          y={FIRST_FLOOR_Y + 4}
          textAnchor="end"
          fill="currentColor"
          fontSize="8"
          fontFamily="var(--font-family-roboto-mono), monospace"
          opacity={0.5}
          className="animate-fade-in"
          style={{ animationDelay: "1.6s", opacity: 0 }}
        >
          1ST FL
        </text>
        <text
          x={ELEV.x - 8}
          y={GROUND_FLOOR_Y + 4}
          textAnchor="end"
          fill="currentColor"
          fontSize="8"
          fontFamily="var(--font-family-roboto-mono), monospace"
          opacity={0.5}
          className="animate-fade-in"
          style={{ animationDelay: "1.7s", opacity: 0 }}
        >
          GRD FL
        </text>

        {/* ============================================================
           WINDOWS — Front elevation
           ============================================================ */}
        {WINDOWS_FRONT.map((win, i) => (
          <g
            key={`${uid}-win-${i}`}
            className="animate-draw-line"
            style={
              {
                "--draw-length": (win.w + win.h) * 4,
                "--draw-duration": "0.5s",
                animationDelay: `${1.5 + i * 0.12}s`,
              } as React.CSSProperties
            }
          >
            {/* Window frame */}
            <rect
              x={win.x}
              y={win.y}
              width={win.w}
              height={win.h}
              fill="currentColor"
              fillOpacity={0.05}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* Window cross (mullion) */}
            <line
              x1={win.x + win.w / 2}
              y1={win.y}
              x2={win.x + win.w / 2}
              y2={win.y + win.h}
              stroke="currentColor"
              strokeWidth="0.75"
              opacity={0.4}
            />
            <line
              x1={win.x}
              y1={win.y + win.h / 2}
              x2={win.x + win.w}
              y2={win.y + win.h / 2}
              stroke="currentColor"
              strokeWidth="0.75"
              opacity={0.4}
            />
            {/* Window sill */}
            <line
              x1={win.x - 4}
              y1={win.y + win.h}
              x2={win.x + win.w + 4}
              y2={win.y + win.h}
              stroke="currentColor"
              strokeWidth="1"
              opacity={0.5}
            />
          </g>
        ))}

        {/* ============================================================
           DOOR — Front elevation
           ============================================================ */}
        <g
          className="animate-draw-line"
          style={
            {
              "--draw-length": (DOOR.w + DOOR.h) * 4,
              "--draw-duration": "0.6s",
              animationDelay: "2.0s",
            } as React.CSSProperties
          }
        >
          {/* Door frame */}
          <rect
            x={DOOR.x}
            y={DOOR.y}
            width={DOOR.w}
            height={DOOR.h}
            fill="currentColor"
            fillOpacity={0.06}
            stroke="currentColor"
            strokeWidth="1.5"
          />

          {/* Door panel divisions */}
          <line
            x1={DOOR.x + DOOR.w / 2}
            y1={DOOR.y}
            x2={DOOR.x + DOOR.w / 2}
            y2={DOOR.y + DOOR.h}
            stroke="currentColor"
            strokeWidth="0.75"
            opacity={0.3}
          />
          <line
            x1={DOOR.x}
            y1={DOOR.y + DOOR.h * 0.4}
            x2={DOOR.x + DOOR.w}
            y2={DOOR.y + DOOR.h * 0.4}
            stroke="currentColor"
            strokeWidth="0.75"
            opacity={0.3}
          />

          {/* Door handle */}
          <circle
            cx={DOOR.x + DOOR.w * 0.75}
            cy={DOOR.y + DOOR.h * 0.5}
            r="2.5"
            fill="currentColor"
            opacity={0.5}
          />

          {/* Door frame head */}
          <line
            x1={DOOR.x - 4}
            y1={DOOR.y}
            x2={DOOR.x + DOOR.w + 4}
            y2={DOOR.y}
            stroke="currentColor"
            strokeWidth="2"
            opacity={0.5}
          />
        </g>

        {/* ============================================================
           MATERIAL HATCHING — Brick/blockwork pattern
           ============================================================ */}
        <g
          className="animate-fade-in"
          style={{ animationDelay: "2.4s", opacity: 0 }}
        >
          {Array.from({ length: 6 }, (_, row) =>
            Array.from({ length: 12 }, (_, col) => {
              const bx = ELEV.x + 20 + col * 30 + (row % 2) * 15;
              const by = ROOF_Y + 40 + row * 45;
              if (bx + 25 > ELEV.x + ELEV.width - 20) return null;
              if (by + 35 > GROUND_Y - 20) return null;
              // Check if overlapping windows or door
              const inWindow = WINDOWS_FRONT.some(
                (w) => bx > w.x - 10 && bx < w.x + w.w + 10 && by > w.y - 10 && by < w.y + w.h + 10
              );
              const inDoor =
                bx > DOOR.x - 10 && bx < DOOR.x + DOOR.w + 10 && by > DOOR.y - 10 && by < DOOR.y + DOOR.h + 10;
              if (inWindow || inDoor) return null;
              return (
                <rect
                  key={`${uid}-brick-${row}-${col}`}
                  x={bx}
                  y={by}
                  width="28"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity={0.15}
                  rx="1"
                />
              );
            })
          )}
        </g>

        {/* ============================================================
           SIDE ELEVATION (inset, right side)
           ============================================================ */}
        {/* Ground line */}
        <line
          x1={SIDE.x - 20}
          y1={SIDE_GROUND_Y}
          x2={SIDE.x + SIDE.width + 20}
          y2={SIDE_GROUND_Y}
          stroke="currentColor"
          strokeWidth="2"
          className="animate-draw-line"
          style={
            {
              "--draw-length": (SIDE.width + 40) * 2,
              "--draw-duration": "0.6s",
              animationDelay: "2.6s",
            } as React.CSSProperties
          }
        />

        {/* Building outline */}
        <rect
          x={SIDE.x}
          y={SIDE.y}
          width={SIDE.width}
          height={SIDE.height}
          fill="currentColor"
          fillOpacity={0.03}
          stroke="currentColor"
          strokeWidth="1.5"
          className="animate-draw-line"
          style={
            {
              "--draw-length": (SIDE.width + SIDE.height) * 4,
              "--draw-duration": "0.8s",
              animationDelay: "2.8s",
            } as React.CSSProperties
          }
        />

        {/* Roof slope */}
        <line
          x1={SIDE.x}
          y1={SIDE.y}
          x2={SIDE.x + SIDE.width / 2}
          y2={SIDE.y - 30}
          stroke="currentColor"
          strokeWidth="2"
          className="animate-draw-line"
          style={
            {
              "--draw-length": Math.sqrt((SIDE.width / 2) ** 2 + 30 ** 2) * 2,
              "--draw-duration": "0.5s",
              animationDelay: "3.0s",
            } as React.CSSProperties
          }
        />
        <line
          x1={SIDE.x + SIDE.width / 2}
          y1={SIDE.y - 30}
          x2={SIDE.x + SIDE.width}
          y2={SIDE.y}
          stroke="currentColor"
          strokeWidth="2"
          className="animate-draw-line"
          style={
            {
              "--draw-length": Math.sqrt((SIDE.width / 2) ** 2 + 30 ** 2) * 2,
              "--draw-duration": "0.5s",
              animationDelay: "3.1s",
            } as React.CSSProperties
          }
        />

        {/* Side window */}
        <rect
          x={SIDE.x + 30}
          y={SIDE.y + 60}
          width={SIDE.width - 60}
          height={50}
          fill="currentColor"
          fillOpacity={0.05}
          stroke="currentColor"
          strokeWidth="1"
          className="animate-draw-line"
          style={
            {
              "--draw-length": (SIDE.width - 60 + 50) * 4,
              "--draw-duration": "0.4s",
              animationDelay: "3.3s",
            } as React.CSSProperties
          }
        />

        {/* ============================================================
           HEIGHT DIMENSIONS — Main elevation
           ============================================================ */}
        {/* Overall height */}
        <DimensionLine
          x1={ELEV.x + ELEV.width + 40}
          y1={ROOF_Y - 5}
          x2={ELEV.x + ELEV.width + 40}
          y2={GROUND_Y}
          label="+10.0 m"
          offset={20}
          delay={3.6}
        />

        {/* Floor-to-floor */}
        <DimensionLine
          x1={ELEV.x + ELEV.width + 50}
          y1={GROUND_FLOOR_Y}
          x2={ELEV.x + ELEV.width + 50}
          y2={GROUND_Y}
          label="3.0 m"
          offset={16}
          delay={3.8}
        />

        {/* ============================================================
           COMPASS NORTH
           ============================================================ */}
        <g transform="translate(60, 60)">
          <CompassNorth size={40} animated delay={4.2} />
        </g>

        {/* ============================================================
           TITLE BLOCK
           ============================================================ */}
        <TitleBlock
          x={SIDE.x + SIDE.width - 180}
          y={SIDE_GROUND_Y + 30}
          width={180}
          height={80}
          projectName="WASLEEN APPROVALS"
          drawingTitle="ELEVATIONS"
          drawingNumber="DRW-E-001"
          scale="1:150"
          date="2026"
          revision="A"
          delay={4.6}
        />

        {/* ============================================================
           APPROVAL STAMP
           ============================================================ */}
        <ApprovalStamp
          x={ELEV.x + 20}
          y={ELEV.y + ELEV.height - 100}
          size={65}
          text="APPROVED"
          delay={5.0}
        />
      </svg>
    </div>
  );
}
