interface WasleenIconProps {
  size?: number;
  className?: string;
}

export default function WasleenIcon({ size = 32, className = "" }: WasleenIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
    >
      <title>Wasleen Approvals</title>
      <desc>
        A 2D floor-plan mark inside a rounded badge, representing drafting
        and approvals
      </desc>

      {/* Badge frame — brand blue */}
      <rect
        x="15"
        y="15"
        width="170"
        height="170"
        rx="32"
        fill="none"
        stroke="#004080"
        strokeWidth={5}
      />

      {/* Outer wall boundary — brand blue */}
      <path
        d="M50,50 L150,50 L150,100 L115,100 L115,150 L50,150"
        fill="none"
        stroke="#004080"
        strokeWidth={6}
        strokeLinejoin="round"
      />

      {/* Internal partition wall — black accent */}
      <line x1="90" y1="50" x2="90" y2="100" stroke="#000000" strokeWidth={4} />

      {/* Door: leaf + swing arc — red accent */}
      <line x1="65" y1="150" x2="65" y2="130" stroke="#C8102E" strokeWidth={4} />
      <path
        d="M65,130 A20,20 0 0 1 85,150"
        fill="none"
        stroke="#C8102E"
        strokeWidth={2.5}
      />

      {/* Window break — green accent */}
      <line x1="120" y1="45" x2="120" y2="55" stroke="#00843D" strokeWidth={3} />
      <line x1="130" y1="45" x2="130" y2="55" stroke="#00843D" strokeWidth={3} />
    </svg>
  );
}
