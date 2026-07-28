/**
 * DrawingSymbols — Shared SVG symbol library for engineering drawing scenes.
 *
 * All components use currentColor for stroke fill so they adapt to parent
 * container color schemes (white on dark blueprint, dark on light paper).
 *
 * @see /plans/complete-build-plan.md (Phase 12 — Animated SVG Drawings)
 */

/* ============================================================
   Types
   ============================================================ */

export interface DrawingSymbolProps {
  className?: string;
}

/* ============================================================
   BlueprintGrid — Background grid pattern
   Renders as SVG <defs> with two pattern layers (minor + major).
   Use within a parent SVG: include <BlueprintGrid id="..." /> in <defs>,
   then draw <rect> elements referencing the pattern IDs.
   ============================================================ */

interface BlueprintGridProps extends DrawingSymbolProps {
  /** Unique ID prefix for the patterns (required for useId or manual) */
  id: string;
  gridSize?: number;
  subDivisions?: number;
  opacity?: number;
}

export function BlueprintGrid({
  id,
  gridSize = 40,
  subDivisions = 4,
  opacity = 0.15,
}: BlueprintGridProps) {
  const minorGrid = gridSize / subDivisions;

  return (
    <defs>
      {/* Minor grid lines */}
      <pattern
        id={`${id}-minor`}
        width={gridSize}
        height={gridSize}
        patternUnits="userSpaceOnUse"
      >
        <path
          d={`M ${minorGrid} 0 L ${minorGrid} ${gridSize} M 0 ${minorGrid} L ${gridSize} ${minorGrid}`}
          stroke="currentColor"
          strokeWidth="0.5"
          opacity={opacity * 0.5}
        />
      </pattern>

      {/* Major grid lines */}
      <pattern
        id={`${id}-major`}
        width={gridSize}
        height={gridSize}
        patternUnits="userSpaceOnUse"
      >
        <path
          d={`M ${gridSize} 0 L ${gridSize} ${gridSize} M 0 ${gridSize} L ${gridSize} ${gridSize}`}
          stroke="currentColor"
          strokeWidth="1"
          opacity={opacity}
        />
      </pattern>
    </defs>
  );
}

/* ============================================================
   CompassNorth — North arrow / compass rose
   Rotates in with animation
   ============================================================ */

interface CompassNorthProps extends DrawingSymbolProps {
  x?: number;
  y?: number;
  size?: number;
  animated?: boolean;
  delay?: number;
}

export function CompassNorth({
  className = "",
  x = 0,
  y = 0,
  size = 60,
  animated = true,
  delay = 2.5,
}: CompassNorthProps) {
  const half = size / 2;
  const arrowTip = half - 4;
  const arrowBase = half + 10;
  const arrowHalfWidth = 8;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className={`${animated ? "animate-rotate-in" : ""} ${className}`}
      aria-label="North arrow"
      style={{ animationDelay: `${delay}s`, opacity: animated ? 0 : 1 }}
    >
      {/* Circle */}
      <circle
        cx={half}
        cy={half}
        r={half - 2}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* North arrow (pointing up) */}
      <polygon
        points={`${half},${arrowTip} ${half + arrowHalfWidth},${arrowBase} ${half},${arrowBase - 4} ${half - arrowHalfWidth},${arrowBase}`}
        fill="currentColor"
      />

      {/* South arrow (pointing down, hollow) */}
      <polygon
        points={`${half},${size - arrowTip} ${half + arrowHalfWidth},${size - arrowBase} ${half},${size - arrowBase + 4} ${half - arrowHalfWidth},${size - arrowBase}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* "N" label */}
      <text
        x={half}
        y={arrowTip - 6}
        textAnchor="middle"
        fill="currentColor"
        fontSize={size * 0.18}
        fontWeight="bold"
        fontFamily="var(--font-family-roboto-mono), monospace"
      >
        N
      </text>
    </svg>
  );
}

/* ============================================================
   DimensionLine — Horizontal or vertical dimension line
   with arrows/tick marks and measurement text
   ============================================================ */

interface DimensionLineProps extends DrawingSymbolProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  offset?: number;
  animated?: boolean;
  delay?: number;
}

export function DimensionLine({
  className = "",
  x1,
  y1,
  x2,
  y2,
  label = "",
  offset = 20,
  animated = true,
  delay = 2,
}: DimensionLineProps) {
  const isHorizontal = y1 === y2;
  const isVertical = x1 === x2;

  // Extension lines offset
  const extOffset = 8;

  // Calculate dimension line position
  let dx1 = x1;
  let dy1 = y1;
  let dx2 = x2;
  let dy2 = y2;

  if (isHorizontal) {
    dy1 = y1 + offset;
    dy2 = y2 + offset;
  } else if (isVertical) {
    dx1 = x1 + offset;
    dx2 = x2 + offset;
  }

  // Tick marks at ends
  const tickSize = 6;

  // Calculate midpoint for text
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const labelY = isHorizontal ? dy1 + 16 : (dy1 + dy2) / 2;
  const labelX = isVertical ? dx1 + 16 : (dx1 + dx2) / 2;

  const lineLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const dashLength = Math.max(lineLength, 10);
  const style = animated
    ? ({
        "--draw-length": `${dashLength * 2}`,
        "--draw-duration": "1s",
        animationDelay: `${delay}s`,
      } as React.CSSProperties)
    : {};

  return (
    <g
      className={`${animated ? "animate-draw-line" : ""} ${className}`}
      style={style}
    >
      {/* Extension lines */}
      {isHorizontal && (
        <>
          <line x1={x1} y1={y1} x2={x1} y2={dy1} stroke="currentColor" strokeWidth="0.75" />
          <line x1={x2} y1={y2} x2={x2} y2={dy2} stroke="currentColor" strokeWidth="0.75" />
        </>
      )}
      {isVertical && (
        <>
          <line x1={x1} y1={y1} x2={dx1} y2={y1} stroke="currentColor" strokeWidth="0.75" />
          <line x1={x2} y1={y2} x2={dx2} y2={y2} stroke="currentColor" strokeWidth="0.75" />
        </>
      )}

      {/* Dimension line */}
      <line x1={dx1} y1={dy1} x2={dx2} y2={dy2} stroke="currentColor" strokeWidth="1" />

      {/* Tick marks */}
      {isHorizontal && (
        <>
          <line
            x1={dx1} y1={dy1 - tickSize}
            x2={dx1} y2={dy1 + tickSize}
            stroke="currentColor" strokeWidth="1.5"
          />
          <line
            x1={dx2} y1={dy2 - tickSize}
            x2={dx2} y2={dy2 + tickSize}
            stroke="currentColor" strokeWidth="1.5"
          />
        </>
      )}
      {isVertical && (
        <>
          <line
            x1={dx1 - tickSize} y1={dy1}
            x2={dx1 + tickSize} y2={dy1}
            stroke="currentColor" strokeWidth="1.5"
          />
          <line
            x1={dx2 - tickSize} y1={dy2}
            x2={dx2 + tickSize} y2={dy2}
            stroke="currentColor" strokeWidth="1.5"
          />
        </>
      )}

      {/* Label */}
      {label && (
        <text
          x={isVertical ? labelX : midX}
          y={isHorizontal ? labelY : midY}
          textAnchor="middle"
          dominantBaseline={isHorizontal ? "hanging" : "middle"}
          fill="currentColor"
          fontSize="10"
          fontFamily="var(--font-family-roboto-mono), monospace"
          opacity={0.8}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/* ============================================================
   DrawingFrame — Outer border frame with title block area
   ============================================================ */

interface DrawingFrameProps extends DrawingSymbolProps {
  width?: number;
  height?: number;
  animated?: boolean;
}

export function DrawingFrame({
  className = "",
  width = 800,
  height = 600,
  animated = true,
}: DrawingFrameProps) {
  const margin = 20;
  const tbWidth = 200;
  const tbHeight = 60;
  const innerDashLength = 2 * (width + height - 2 * margin);

  const style = animated
    ? ({
        "--draw-length": `${innerDashLength}`,
        "--draw-duration": "2s",
      } as React.CSSProperties)
    : {};

  return (
    <g
      className={`${animated ? "animate-draw-line" : ""} ${className}`}
      style={style}
    >
      {/* Outer border cut */}
      <rect
        x={margin}
        y={margin}
        width={width - 2 * margin}
        height={height - 2 * margin}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Inner border */}
      <rect
        x={margin + 8}
        y={margin + 8}
        width={width - 2 * margin - 16}
        height={height - 2 * margin - 16}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity={0.5}
      />
    </g>
  );
}

/* ============================================================
   TitleBlock — Professional drawing title block (bottom-right)
   ============================================================ */

interface TitleBlockProps extends DrawingSymbolProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  projectName?: string;
  drawingTitle?: string;
  drawingNumber?: string;
  scale?: string;
  date?: string;
  revision?: string;
  animated?: boolean;
  delay?: number;
}

export function TitleBlock({
  className = "",
  x = 0,
  y = 0,
  width = 240,
  height = 100,
  projectName = "PROJECT",
  drawingTitle = "FLOOR PLAN",
  drawingNumber = "DRW-001",
  scale = "1:100",
  date = "",
  revision = "A",
  animated = true,
  delay = 3,
}: TitleBlockProps) {
  const rows = [
    { label: "PROJECT", value: projectName },
    { label: "DRAWING", value: drawingTitle },
    { label: "SCALE", value: scale },
    { label: "DATE", value: date },
    { label: "REV", value: revision },
  ];

  const rowHeight = height / rows.length;
  const col1X = x + 8;
  const col2X = x + width * 0.35;

  const style = animated
    ? ({
        animationDelay: `${delay}s`,
      } as React.CSSProperties)
    : {};

  return (
    <g
      className={`${animated ? "animate-fade-in" : ""} ${className}`}
      style={{ ...style, opacity: animated ? 0 : 1 }}
    >
      {/* Title block border */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Drawing number at top */}
      <text
        x={x + width - 8}
        y={y + rowHeight - 6}
        textAnchor="end"
        fill="currentColor"
        fontSize="10"
        fontWeight="bold"
        fontFamily="var(--font-family-roboto-mono), monospace"
      >
        {drawingNumber}
      </text>

      {/* Horizontal dividers and row data */}
      {rows.map((row, i) => {
        const rowY = y + (i + 1) * rowHeight;
        return (
          <g key={row.label}>
            {i < rows.length - 1 && (
              <line
                x1={x}
                y1={rowY}
                x2={x + width}
                y2={rowY}
                stroke="currentColor"
                strokeWidth="0.75"
                opacity={0.5}
              />
            )}
            {/* Vertical divider */}
            <line
              x1={col2X}
              y1={rowY - rowHeight}
              x2={col2X}
              y2={rowY}
              stroke="currentColor"
              strokeWidth="0.75"
              opacity={0.5}
            />
            <text
              x={col1X}
              y={rowY - 6}
              fill="currentColor"
              fontSize="7"
              fontFamily="var(--font-family-roboto-mono), monospace"
              opacity={0.6}
            >
              {row.label}
            </text>
            <text
              x={col2X + 6}
              y={rowY - 6}
              fill="currentColor"
              fontSize="8"
              fontWeight="bold"
              fontFamily="var(--font-family-roboto-mono), monospace"
            >
              {row.value}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/* ============================================================
   ApprovalStamp — Animated "APPROVED" stamp
   ============================================================ */

interface ApprovalStampProps extends DrawingSymbolProps {
  x?: number;
  y?: number;
  size?: number;
  text?: string;
  animated?: boolean;
  delay?: number;
}

export function ApprovalStamp({
  className = "",
  x = 0,
  y = 0,
  size = 80,
  text = "APPROVED",
  animated = true,
  delay = 3.5,
}: ApprovalStampProps) {
  const half = size / 2;
  const innerR = half - 6;

  const style = animated
    ? ({
        animationDelay: `${delay}s`,
      } as React.CSSProperties)
    : {};

  return (
    <g
      className={`${animated ? "animate-stamp-press" : ""} ${className}`}
      style={{ ...style, opacity: animated ? 0 : 1 }}
    >
      {/* Outer circle */}
      <circle
        cx={x + half}
        cy={y + half}
        r={half - 2}
        fill="none"
        stroke="#C8102E"
        strokeWidth="2.5"
        opacity={0.85}
      />

      {/* Inner circle */}
      <circle
        cx={x + half}
        cy={y + half}
        r={innerR}
        fill="none"
        stroke="#C8102E"
        strokeWidth="1"
        opacity={0.4}
      />

      {/* "APPROVED" text arc — using straight text for simplicity */}
      <text
        x={x + half}
        y={y + half - 4}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#C8102E"
        fontSize={size * 0.16}
        fontWeight="bold"
        fontFamily="var(--font-family-roboto-mono), monospace"
        opacity={0.85}
      >
        {text}
      </text>

      {/* Small text inside */}
      <text
        x={x + half}
        y={y + half + 12}
        textAnchor="middle"
        fill="#C8102E"
        fontSize={size * 0.1}
        fontFamily="var(--font-family-roboto-mono), monospace"
        opacity={0.7}
      >
        WASLEEN
      </text>

      {/* Star marks on sides */}
      <text
        x={x + half - innerR + 8}
        y={y + half + 3}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#C8102E"
        fontSize={10}
        opacity={0.6}
      >
        ✦
      </text>
      <text
        x={x + half + innerR - 8}
        y={y + half + 3}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#C8102E"
        fontSize={10}
        opacity={0.6}
      >
        ✦
      </text>
    </g>
  );
}

/* ============================================================
   DoorSymbol — Door in plan view (wall line + swing arc)
   ============================================================ */

interface DoorSymbolProps extends DrawingSymbolProps {
  x: number;
  y: number;
  width?: number;
  direction?: "up" | "down" | "left" | "right";
  animated?: boolean;
  delay?: number;
}

export function DoorSymbol({
  className = "",
  x,
  y,
  width = 24,
  direction = "up",
  animated = true,
  delay = 0,
}: DoorSymbolProps) {
  const leafLen = width;
  const arcR = leafLen;

  let doorX = x;
  let doorY = y;
  let leafX2 = x;
  let leafY2 = y;
  let sweepFlag = 0;

  switch (direction) {
    case "up":
      doorX = x;
      doorY = y + leafLen;
      leafX2 = x + leafLen;
      leafY2 = y + leafLen;
      sweepFlag = 1;
      break;
    case "down":
      doorX = x + leafLen;
      doorY = y;
      leafX2 = x;
      leafY2 = y;
      sweepFlag = 1;
      break;
    case "left":
      doorX = x + leafLen;
      doorY = y + leafLen;
      leafX2 = x + leafLen;
      leafY2 = y;
      sweepFlag = 1;
      break;
    case "right":
      doorX = x;
      doorY = y;
      leafX2 = x;
      leafY2 = y + leafLen;
      sweepFlag = 1;
      break;
  }

  const style = animated
    ? ({
        "--draw-length": `${leafLen + arcR * 1.6}`,
        "--draw-duration": "0.6s",
        animationDelay: `${delay}s`,
      } as React.CSSProperties)
    : {};

  return (
    <g
      className={`${animated ? "animate-draw-line" : ""} ${className}`}
      style={style}
    >
      {/* Door leaf */}
      <line
        x1={x}
        y1={y}
        x2={leafX2}
        y2={leafY2}
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Swing arc */}
      <path
        d={`M ${doorX},${doorY} A ${arcR},${arcR} 0 0,${sweepFlag} ${leafX2},${leafY2}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity={0.6}
      />
    </g>
  );
}

/* ============================================================
   WindowSymbol — Window break lines on a wall
   ============================================================ */

interface WindowSymbolProps extends DrawingSymbolProps {
  x: number;
  y: number;
  width: number;
  vertical?: boolean;
  animated?: boolean;
  delay?: number;
}

export function WindowSymbol({
  className = "",
  x,
  y,
  width,
  vertical = false,
  animated = true,
  delay = 0,
}: WindowSymbolProps) {
  const style = animated
    ? ({
        animationDelay: `${delay}s`,
      } as React.CSSProperties)
    : {};

  const line1 = vertical
    ? { x1: x, y1: y + 4, x2: x, y2: y + width - 4 }
    : { x1: x + 4, y1: y, x2: x + width - 4, y2: y };
  const line2 = vertical
    ? { x1: x, y1: y + 4, x2: x, y2: y + width - 4, dx: 4 }
    : { x1: x + 4, y1: y, x2: x + width - 4, y2: y, dy: 4 };

  return (
    <g
      className={`${animated ? "animate-fade-in" : ""} ${className}`}
      style={{ ...style, opacity: animated ? 0 : 1 }}
    >
      {/* Window center line */}
      <line
        x1={line1.x1}
        y1={line1.y1}
        x2={line1.x2}
        y2={line1.y2}
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Window outer lines */}
      {vertical ? (
        <>
          <line
            x1={x - 3} y1={y} x2={x - 3} y2={y + width}
            stroke="currentColor" strokeWidth="0.75"
          />
          <line
            x1={x + 3} y1={y} x2={x + 3} y2={y + width}
            stroke="currentColor" strokeWidth="0.75"
          />
        </>
      ) : (
        <>
          <line
            x1={x} y1={y - 3} x2={x + width} y2={y - 3}
            stroke="currentColor" strokeWidth="0.75"
          />
          <line
            x1={x} y1={y + 3} x2={x + width} y2={y + 3}
            stroke="currentColor" strokeWidth="0.75"
          />
        </>
      )}
    </g>
  );
}

/* ============================================================
   RoomLabel — Label with leader line pointing to a location
   ============================================================ */

interface RoomLabelProps extends DrawingSymbolProps {
  x: number;
  y: number;
  label: string;
  targetX: number;
  targetY: number;
  sublabel?: string;
  animated?: boolean;
  delay?: number;
}

export function RoomLabel({
  className = "",
  x,
  y,
  label,
  targetX,
  targetY,
  sublabel = "",
  animated = true,
  delay = 0,
}: RoomLabelProps) {
  const dotR = 2.5;
  const lineLength = Math.sqrt((targetX - x) ** 2 + (targetY - y) ** 2);
  const style = animated
    ? ({
        "--draw-length": `${lineLength * 2 + 20}`,
        "--draw-duration": "0.5s",
        animationDelay: `${delay}s`,
      } as React.CSSProperties)
    : {};

  return (
    <g
      className={`${animated ? "animate-draw-line" : ""} ${className}`}
      style={style}
    >
      {/* Target dot */}
      <circle cx={targetX} cy={targetY} r={dotR} fill="currentColor" />

      {/* Leader line */}
      <line
        x1={targetX}
        y1={targetY}
        x2={x}
        y2={y}
        stroke="currentColor"
        strokeWidth="0.75"
        opacity={0.6}
      />

      {/* Label background */}
      <rect
        x={x - 4}
        y={y - 10}
        width={label.length * 7 + 8}
        height="18"
        rx="2"
        fill="var(--color-brand-blue, #004080)"
        opacity={0.15}
      />

      {/* Label text */}
      <text
        x={x}
        y={y + 2}
        fill="currentColor"
        fontSize="9"
        fontWeight="bold"
        fontFamily="var(--font-family-roboto-mono), monospace"
      >
        {label}
      </text>

      {/* Sublabel */}
      {sublabel && (
        <text
          x={x}
          y={y + 14}
          fill="currentColor"
          fontSize="7"
          fontFamily="var(--font-family-roboto-mono), monospace"
          opacity={0.6}
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

/* ============================================================
   StairSymbol — Stair plan symbol
   ============================================================ */

interface StairSymbolProps extends DrawingSymbolProps {
  x: number;
  y: number;
  width: number;
  height: number;
  steps?: number;
  direction?: "up" | "down";
  animated?: boolean;
  delay?: number;
}

export function StairSymbol({
  className = "",
  x,
  y,
  width,
  height,
  steps = 4,
  direction = "up",
  animated = true,
  delay = 0,
}: StairSymbolProps) {
  const stepHeight = height / steps;
  const arrowDir = direction === "up" ? -1 : 1;

  const style = animated
    ? ({
        animationDelay: `${delay}s`,
      } as React.CSSProperties)
    : {};

  return (
    <g
      className={`${animated ? "animate-fade-in" : ""} ${className}`}
      style={{ ...style, opacity: animated ? 0 : 1 }}
    >
      {/* Step lines */}
      {Array.from({ length: steps + 1 }, (_, i) => {
        const sy = y + i * stepHeight;
        return (
          <line
            key={`step-${i}`}
            x1={x}
            y1={sy}
            x2={x + width}
            y2={sy}
            stroke="currentColor"
            strokeWidth="0.75"
          />
        );
      })}

      {/* Side line */}
      <line
        x1={x}
        y1={y}
        x2={x}
        y2={y + height}
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* Direction arrow */}
      <line
        x1={x + 4}
        y1={arrowDir === -1 ? y + height - 4 : y + 4}
        x2={x + 4}
        y2={arrowDir === -1 ? y + 4 : y + height - 4}
        stroke="currentColor"
        strokeWidth="1"
      />
      <polygon
        points={
          arrowDir === -1
            ? `${x},${y + 6} ${x + 8},${y + 6} ${x + 4},${y}`
            : `${x},${y + height - 6} ${x + 8},${y + height - 6} ${x + 4},${y + height}`
        }
        fill="currentColor"
      />
    </g>
  );
}
