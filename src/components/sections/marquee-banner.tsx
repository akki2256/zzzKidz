import { siteConfig } from "@/content/site";

const phrases = [
  { text: "STRONGER BODIES", style: "solid" as const },
  { text: "SHARPER MINDS", style: "outline" as const },
  { text: "BRIGHTER FUTURES", style: "accent" as const },
  { text: "MOVE BETTER", style: "solid" as const },
  { text: "GET STRONGER", style: "outline" as const },
  { text: "GROW TOGETHER", style: "accent" as const },
  { text: "ACTIVE KIDS", style: "solid" as const },
  { text: "FIT INDIA", style: "outline" as const },
  { text: siteConfig.name.toUpperCase(), style: "accent" as const },
];

function Phrase({
  text,
  style,
}: {
  text: string;
  style: "solid" | "outline" | "accent";
}) {
  const className =
    style === "accent"
      ? "text-accent"
      : style === "outline"
        ? "text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.85)]"
        : "text-white";

  return (
    <span className={`font-display text-3xl uppercase tracking-[0.06em] sm:text-4xl md:text-5xl ${className}`}>
      {text}
    </span>
  );
}

export function MarqueeBanner() {
  const track = [...phrases, ...phrases];

  return (
    <section
      aria-label="Brand statements"
      className="relative overflow-hidden border-y border-border bg-black py-5 sm:py-6"
    >
      <div className="marquee-track flex w-max items-center gap-8 sm:gap-12">
        {track.map((item, i) => (
          <span key={`${item.text}-${i}`} className="inline-flex items-center gap-8 sm:gap-12">
            <Phrase text={item.text} style={item.style} />
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );
}
