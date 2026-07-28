/**
 * SceneA_FloorPlan — Animated architectural floor plan for homepage hero.
 *
 * Design: A professional 1-bedroom apartment floor plan with:
 * - Blueprint-style grid background
 * - Animated wall drawing (stroke-dashoffset technique)
 * - Doors with swing arcs
 * - Window break lines
 * - Room labels with leader lines
 * - Dimension lines
 * - Compass north arrow
 * - Title block
 * - Approval stamp
 *
 * All animations respect prefers-reduced-motion.
 * Uses "use client" for CSS animation-based rendering.
 *
 * @see /plans/complete-build-plan.md (Phase 12.2 — Scene A)
 */

"use client";

import { useId } from "react";
import {
  BlueprintGrid,
  CompassNorth,
  DimensionLine,
  TitleBlock,
  ApprovalStamp,
  DoorSymbol,
  WindowSymbol,
  RoomLabel,
  StairSymbol,
} from "./DrawingSymbols";

/* ============================================================
   Layout Constants (viewBox: 0 0 800 640)
   ============================================================ */

const OUTER = { x1: 40, y1: 40, x2: 760, y2: 600 };

// Interior walls — vertical divider at x=540
const DIVIDER_X = 540;

// Horizontal divisions on right wing
const BATH_Y2 = 200;
const KITCHEN_Y1 = 250;
const KITCHEN_Y2 = 420;
const ENTRY_Y1 = 470;

// Horizontal divider on left wing
const LEFT_DIVIDER_Y = 310;

/* ============================================================
   Wall segments for draw animation
   Each wall is a {x1,y1,x2,y2} line segment
   ============================================================ */

/** Outer walls — drawn first */
const outerWalls = [
  // Top
  { x1: OUTER.x1, y1: OUTER.y1, x2: OUTER.x2, y2: OUTER.y1 },
  // Right
  { x1: OUTER.x2, y1: OUTER.y1, x2: OUTER.x2, y2: OUTER.y2 },
  // Bottom
  { x1: OUTER.x2, y1: OUTER.y2, x2: OUTER.x1, y2: OUTER.y2 },
  // Left
  { x1: OUTER.x1, y1: OUTER.y2, x2: OUTER.x1, y2: OUTER.y1 },
];

/** Interior walls — drawn second */
const interiorWalls = [
  // Main vertical divider
  { x1: DIVIDER_X, y1: OUTER.y1, x2: DIVIDER_X, y2: OUTER.y2 },
  // Left side horizontal divider (bedroom/living room)
  { x1: OUTER.x1, y1: LEFT_DIVIDER_Y, x2: DIVIDER_X - 60, y2: LEFT_DIVIDER_Y },
  // Bathroom top wall
  { x1: DIVIDER_X, y1: OUTER.y1, x2: OUTER.x2, y2: OUTER.y1 },
];

/** Night storage / wall stubs */
const stubWalls = [
  // Bathroom right wall
  { x1: OUTER.x2, y1: OUTER.y1, x2: OUTER.x2, y2: BATH_Y2 },
  // Kitchen divider
  { x1: DIVIDER_X, y1: KITCHEN_Y1, x2: OUTER.x2, y2: KITCHEN_Y1 },
  // Kitchen right wall
  { x1: OUTER.x2, y1: KITCHEN_Y1, x2: OUTER.x2, y2: KITCHEN_Y2 },
  // Kitchen-bottom / Entry-top
  { x1: DIVIDER_X, y1: KITCHEN_Y2, x2: OUTER.x2, y2: KITCHEN_Y2 },
  // Entry left wall
  { x1: DIVIDER_X, y1: ENTRY_Y1, x2: DIVIDER_X, y2: OUTER.y2 },
];

/** All walls combined for total length calc */
const allWalls = [...outerWalls, ...interiorWalls, ...stubWalls];

/* ============================================================
   Helper: compute total wall length for animation scaling
   ============================================================ */

function computeWallLength(walls: { x1: number; y1: number; x2: number; y2: number }[]): number {
  return walls.reduce((sum, w) => sum + Math.sqrt((w.x2 - w.x1) ** 2 + (w.y2 - w.y1) ** 2), 0);
}

/* ============================================================
   SceneA Component
   ============================================================ */

interface SceneAProps {
  className?: string;
}

export default function SceneA_FloorPlan({ className = "" }: SceneAProps) {
  const uid = useId();
  const totalWallLength = computeWallLength(allWalls);

  return (
    <div className={`relative w-full aspect-[5/4] ${className}`}>
      <svg
        viewBox="0 0 800 640"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Animated architectural floor plan showing a residential apartment layout with rooms, doors, windows, and dimension annotations"
        role="img"
      >
        {/* ============================================================
           BACKGROUND — Blueprint grid (in defs, then drawn as rects)
           ============================================================ */}
        <BlueprintGrid id={uid} gridSize={40} subDivisions={4} opacity={0.12} />
        <rect x="0" y="0" width="800" height="640" fill={`url(#${uid}-minor)`} />
        <rect x="0" y="0" width="800" height="640" fill={`url(#${uid}-major)`} />

        {/* ============================================================
           WALL GROUP — all walls with draw animation, then infinite glow
           ============================================================ */}
        <g className="animate-wall-glow-loop">
          {/* OUTER WALLS — drawn sequentially (delay: 0s) */}
          {outerWalls.map((wall, i) => {
            const segLen = Math.sqrt((wall.x2 - wall.x1) ** 2 + (wall.y2 - wall.y1) ** 2);
            return (
              <line
                key={`${uid}-outer-${i}`}
                x1={wall.x1}
                y1={wall.y1}
                x2={wall.x2}
                y2={wall.y2}
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-draw-line"
                style={
                  {
                    "--draw-length": segLen * 2,
                    "--draw-duration": `${1.5 * (segLen / totalWallLength) + 0.3}s`,
                    animationDelay: `${0.3 + i * 0.08}s`,
                    strokeDasharray: segLen * 2,
                  } as React.CSSProperties
                }
              />
            );
          })}

          {/* INTERIOR WALLS — drawn second (delay: 0.8s) */}
          {interiorWalls.map((wall, i) => {
            const segLen = Math.sqrt((wall.x2 - wall.x1) ** 2 + (wall.y2 - wall.y1) ** 2);
            return (
              <line
                key={`${uid}-inner-${i}`}
                x1={wall.x1}
                y1={wall.y1}
                x2={wall.x2}
                y2={wall.y2}
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-draw-line"
                style={
                  {
                    "--draw-length": segLen * 2,
                    "--draw-duration": "0.8s",
                    animationDelay: `${0.8 + i * 0.12}s`,
                    strokeDasharray: segLen * 2,
                  } as React.CSSProperties
                }
              />
            );
          })}

          {/* STUB WALLS — drawn third (delay: 1.2s) */}
          {stubWalls.map((wall, i) => {
            const segLen = Math.sqrt((wall.x2 - wall.x1) ** 2 + (wall.y2 - wall.y1) ** 2);
            return (
              <line
                key={`${uid}-stub-${i}`}
                x1={wall.x1}
                y1={wall.y1}
                x2={wall.x2}
                y2={wall.y2}
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-draw-line"
                style={
                  {
                    "--draw-length": segLen * 2,
                    "--draw-duration": "0.6s",
                    animationDelay: `${1.2 + i * 0.1}s`,
                    strokeDasharray: segLen * 2,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </g>

        {/* ============================================================
           DOORS — with swing arcs (delay: 1.8s)
           ============================================================ */}
        <DoorSymbol x={DIVIDER_X} y={175} width={22} direction="down" delay={1.8} />
        <DoorSymbol x={DIVIDER_X} y={415} width={22} direction="down" delay={1.9} />
        <DoorSymbol x={DIVIDER_X + 4} y={95} width={20} direction="right" delay={2.0} />
        <DoorSymbol x={DIVIDER_X + 4} y={290} width={20} direction="right" delay={2.1} />
        <DoorSymbol x={670} y={OUTER.y2} width={22} direction="up" delay={2.2} />

        {/* ============================================================
           WINDOWS — break lines on walls (delay: 2.4s)
           ============================================================ */}
        {/* Bedroom: top wall window */}
        <WindowSymbol x={140} y={OUTER.y1} width={120} delay={2.4} />
        {/* Bedroom: left wall window */}
        <WindowSymbol x={OUTER.x1} y={120} width={80} vertical delay={2.5} />
        {/* Living room: bottom wall window */}
        <WindowSymbol x={160} y={OUTER.y2} width={140} delay={2.6} />
        {/* Living room: left wall window */}
        <WindowSymbol x={OUTER.x1} y={400} width={90} vertical delay={2.7} />
        {/* Kitchen: right wall window */}
        <WindowSymbol x={OUTER.x2} y={280} width={60} vertical delay={2.8} />
        {/* Bathroom: top wall window (small) */}
        <WindowSymbol x={630} y={OUTER.y1} width={50} delay={2.9} />

        {/* ============================================================
           ROOM LABELS — fade in with leader lines (delay: 3s)
           ============================================================ */}
        <RoomLabel
          x={240} y={135}
          targetX={240} targetY={180}
          label="BEDROOM"
          sublabel="18.5 m²"
          delay={3.0}
        />

        <RoomLabel
          x={220} y={505}
          targetX={220} targetY={450}
          label="LIVING ROOM"
          sublabel="32.0 m²"
          delay={3.15}
        />

        <RoomLabel
          x={680} y={120}
          targetX={660} targetY={100}
          label="BATHROOM"
          sublabel="6.2 m²"
          delay={3.3}
        />

        <RoomLabel
          x={700} y={320}
          targetX={660} targetY={290}
          label="KITCHEN"
          sublabel="8.8 m²"
          delay={3.45}
        />

        <RoomLabel
          x={680} y={540}
          targetX={650} targetY={520}
          label="ENTRY"
          sublabel="4.0 m²"
          delay={3.6}
        />

        {/* Corridor label */}
        <RoomLabel
          x={430} y={390}
          targetX={450} targetY={350}
          label="CORRIDOR"
          sublabel=""
          delay={3.75}
        />

        {/* ============================================================
           DIMENSION LINES — (delay: 4s)
           ============================================================ */}
        {/* Overall width */}
        <DimensionLine
          x1={OUTER.x1} y1={OUTER.y1}
          x2={OUTER.x2} y2={OUTER.y1}
          label="18.0 m"
          offset={-25}
          delay={4.0}
        />

        {/* Overall height */}
        <DimensionLine
          x1={OUTER.x2} y1={OUTER.y1}
          x2={OUTER.x2} y2={OUTER.y2}
          label="14.0 m"
          offset={25}
          delay={4.2}
        />

        {/* Left wing width */}
        <DimensionLine
          x1={OUTER.x1} y1={OUTER.y2}
          x2={DIVIDER_X} y2={OUTER.y2}
          label="12.5 m"
          offset={25}
          delay={4.4}
        />

        {/* ============================================================
           STAIR SYMBOL — (delay: 4.6s)
           ============================================================ */}
        <StairSymbol
          x={670}
          y={500}
          width={50}
          height={70}
          steps={6}
          direction="up"
          delay={4.6}
        />

        {/* ============================================================
           COMPASS ROSE — rotate in (delay: 4.8s)
           ============================================================ */}
        <g transform="translate(60, 60)">
          <CompassNorth size={48} animated delay={4.8} />
        </g>

        {/* ============================================================
           TITLE BLOCK — bottom-right (delay: 5s)
           ============================================================ */}
        <TitleBlock
          x={OUTER.x2 - 240}
          y={OUTER.y2 - 100}
          width={240}
          height={100}
          projectName="WASLEEN APPROVALS"
          drawingTitle="TYPICAL FLOOR PLAN"
          drawingNumber="DRW-A-001"
          scale="1:100"
          date="2026"
          revision="A"
          delay={5.0}
        />

        {/* ============================================================
           APPROVAL STAMP — looping stamp press animation (delay: 5.5s)
           ============================================================ */}
        <ApprovalStamp
          x={OUTER.x1 + 60}
          y={OUTER.y2 - 115}
          size={120}
          text="APPROVED"
          delay={5.5}
        />
      </svg>
    </div>
  );
}
