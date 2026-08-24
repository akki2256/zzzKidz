import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "dark" | "paper" | "accent";

const toneClass: Record<Tone, string> = {
  dark: "bg-black text-white",
  paper: "bg-[#f1f1ef] text-[#0b0b0b]",
  accent: "bg-[#c8ff00] text-[#0b0b0b]",
};

const eyebrowClass: Record<Tone, string> = {
  dark: "text-[#c8ff00]",
  paper: "text-[#55555c]",
  accent: "text-black/60",
};

const bodyClass: Record<Tone, string> = {
  dark: "text-white/65",
  paper: "text-[#55555c]",
  accent: "text-black/70",
};

const gridLineClass: Record<Tone, string> = {
  dark: "border-white/14 bg-white/14",
  paper: "border-black/12 bg-black/12",
  accent: "border-black/20 bg-black/20",
};

const cellClass: Record<Tone, string> = {
  dark: "bg-black",
  paper: "bg-[#f1f1ef]",
  accent: "bg-[#c8ff00]",
};

/** Section shell that owns the Studio layout's alternating tone rhythm. */
export function StudioSection({
  tone = "dark",
  eyebrow,
  heading,
  description,
  children,
  className,
}: {
  tone?: Tone;
  eyebrow?: string;
  heading?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-16 sm:py-20", toneClass[tone], className)}>
      <div className="studio-container">
        {eyebrow ? (
          <p className={cn("studio-eyebrow", eyebrowClass[tone])}>{eyebrow}</p>
        ) : null}
        {heading ? (
          <h2
            className={cn(
              "studio-display max-w-3xl text-[clamp(2rem,5.5vw,3.75rem)]",
              eyebrow && "mt-4",
            )}
          >
            {heading}
          </h2>
        ) : null}
        {description ? (
          <p className={cn("mt-4 max-w-2xl text-sm leading-relaxed", bodyClass[tone])}>
            {description}
          </p>
        ) : null}
        {children ? <div className={heading || description ? "mt-12" : ""}>{children}</div> : null}
      </div>
    </section>
  );
}

type Item = { title: string; description: string };

/**
 * Hairline grid of title/description cells — the Studio layout's default way
 * of presenting any list of pillars, benefits or outcomes.
 */
export function StudioItemGrid({
  items,
  tone = "dark",
  columns = 4,
  numbered = false,
}: {
  items: readonly Item[];
  tone?: Tone;
  columns?: 2 | 3 | 4 | 5;
  numbered?: boolean;
}) {
  const columnClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
    5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  }[columns];

  return (
    <div
      className={cn(
        "grid gap-px border",
        gridLineClass[tone],
        columnClass,
      )}
    >
      {items.map((item, index) => (
        <article key={item.title} className={cn("p-7", cellClass[tone])}>
          {numbered ? (
            <p className={cn("studio-eyebrow", eyebrowClass[tone])}>
              {String(index + 1).padStart(2, "0")}
            </p>
          ) : null}
          <h3
            className={cn(
              "studio-display text-[clamp(1.25rem,2.2vw,1.7rem)]",
              numbered && "mt-3",
            )}
          >
            {item.title}
          </h3>
          <p className={cn("mt-3 text-sm leading-relaxed", bodyClass[tone])}>
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}

/** Uppercase chip row for short keyword lists. */
export function StudioChips({
  items,
  tone = "dark",
}: {
  items: readonly string[];
  tone?: Tone;
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "border px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.1em]",
            tone === "dark"
              ? "border-white/20 text-white/85"
              : "border-black/20 text-[#0b0b0b]",
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
