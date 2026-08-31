import { cn } from "@/lib/utils";

/**
 * Hand-drawn six-point asterisk — Active Kids motif.
 * Thick rounded arms + soft center (stamp / marker feel).
 */
export function ActiveAsterisk({
  className,
  color = "#f26038",
  size = 48,
  variant = "solid",
}: {
  className?: string;
  color?: string;
  size?: number;
  variant?: "solid" | "outline";
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden
      className={className}
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="40"
          cy="17"
          rx="8"
          ry="17"
          fill={variant === "solid" ? color : "none"}
          stroke={color}
          strokeWidth={variant === "outline" ? 3.4 : 0}
          transform={`rotate(${deg} 40 40)`}
        />
      ))}
      <circle
        cx="40"
        cy="40"
        r="7.5"
        fill={variant === "solid" ? color : "none"}
        stroke={color}
        strokeWidth={variant === "outline" ? 3.4 : 0}
      />
    </svg>
  );
}

/** Alias used by path graphics. */
export const ActiveStarBurst = ActiveAsterisk;

type Pose = "run" | "lunge" | "leap" | "crawl";

/**
 * Asterisk-headed stick character — circle head with navy asterisk inside,
 * thick rounded limbs (Active Kids style from reference).
 */
export function ActiveStickFigure({
  className,
  color = "#a2b6df",
  asteriskColor = "#172c5f",
  accent,
  pose = "run",
  size = 88,
}: {
  className?: string;
  color?: string;
  asteriskColor?: string;
  /** Optional colored block behind the figure. */
  accent?: string;
  pose?: Pose;
  size?: number;
}) {
  const body: Record<Pose, { torso: string; limbs: string; head: [number, number] }> = {
    run: {
      head: [40, 22],
      torso: "M40 36 C38 46 36 54 34 62",
      limbs:
        "M40 42 C28 40 22 36 16 30 M40 42 C54 38 60 30 66 24 M34 62 C26 70 22 76 18 80 M34 62 C46 72 54 78 60 82",
    },
    lunge: {
      head: [40, 22],
      torso: "M40 36 C42 46 44 54 46 60",
      limbs:
        "M40 42 C28 44 22 50 16 56 M40 42 C54 40 62 34 68 28 M46 60 C34 68 26 74 20 78 M46 60 C58 66 66 70 74 72",
    },
    leap: {
      head: [40, 22],
      torso: "M40 36 C40 46 39 54 38 60",
      limbs:
        "M40 40 C28 32 22 26 16 20 M40 40 C54 34 62 28 70 22 M38 60 C26 60 18 58 10 54 M38 60 C52 66 62 74 70 80",
    },
    crawl: {
      head: [30, 28],
      torso: "M42 40 C52 44 62 48 70 50",
      limbs:
        "M42 40 C32 34 24 28 18 22 M42 42 C34 50 28 58 24 64 M70 50 C66 58 62 66 60 70 M70 50 C78 46 84 42 88 38",
    },
  };

  const { torso, limbs, head } = body[pose];
  const [hx, hy] = head;
  const viewBox = pose === "crawl" ? "0 0 96 80" : "0 0 80 90";
  const w = pose === "crawl" ? size * 1.15 : size;
  const h = pose === "crawl" ? size * 0.95 : size;

  return (
    <svg
      width={w}
      height={h}
      viewBox={viewBox}
      fill="none"
      aria-hidden
      className={cn(className)}
    >
      {accent ? (
        <rect
          x={pose === "crawl" ? 50 : 30}
          y={pose === "crawl" ? 34 : 50}
          width={pose === "crawl" ? 24 : 20}
          height={pose === "crawl" ? 18 : 22}
          rx="4"
          fill={accent}
        />
      ) : null}

      <path d={torso} stroke={color} strokeWidth="7" strokeLinecap="round" />
      <path d={limbs} stroke={color} strokeWidth="7" strokeLinecap="round" />

      <circle cx={hx} cy={hy} r="15" fill={color} />

      {/* Navy asterisk stamped into the head */}
      <g transform={`translate(${hx} ${hy}) scale(0.38)`}>
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-15"
            rx="5.5"
            ry="13"
            fill={asteriskColor}
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="5" fill={asteriskColor} />
      </g>
    </svg>
  );
}
