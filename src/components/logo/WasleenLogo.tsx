import WasleenIcon from "./WasleenIcon";

interface WasleenLogoProps {
  size?: number;
  className?: string;
}

export default function WasleenLogo({ size = 48, className = "" }: WasleenLogoProps) {
  const titleSize = size * 0.34;
  const subtitleSize = size * 0.17;
  const gap = size * 0.28;

  return (
    <div
      className={`flex items-center ${className}`}
      style={{ gap }}
    >
      <WasleenIcon size={size} />
      <div style={{ lineHeight: 1.15 }}>
        <p
          style={{
            fontSize: titleSize,
            fontWeight: 800,
            margin: 0,
            letterSpacing: "0.5px",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: "#C8102E" }}>WASLEEN </span>
          <span style={{ color: "#00843D" }}>LIMINAL</span>
        </p>
        <p
          style={{
            fontSize: subtitleSize,
            fontWeight: 700,
            color: "#000000",
            letterSpacing: "3px",
            margin: "4px 0 0",
            whiteSpace: "nowrap",
          }}
        >
          APPROVAL CONSULTANTS
        </p>
      </div>
    </div>
  );
}
