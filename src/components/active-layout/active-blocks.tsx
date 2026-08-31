import type { ReactNode } from "react";
import { ActiveAsterisk } from "@/components/active-layout/active-decor";
import { cn } from "@/lib/utils";

type Tone = "white" | "mint" | "royal" | "purple";

const toneBg: Record<Tone, string> = {
  white: "bg-white text-[#172c5f]",
  mint: "bg-[#d2fefe] text-[#172c5f]",
  royal: "bg-[#5261ac] text-white",
  purple: "bg-[#7c5cbf] text-white",
};

export function ActiveSection({
  tone = "white",
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
  const onDark = tone === "royal" || tone === "purple";

  return (
    <section className={cn("py-14 sm:py-16", toneBg[tone], className)}>
      <div className="active-container">
        {eyebrow ? (
          <p
            className={cn(
              "flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em]",
              onDark ? "text-[#ffc215]" : "text-[#ec1f8f]",
            )}
          >
            <ActiveAsterisk size={18} color={onDark ? "#ffc215" : "#ec1f8f"} />
            {eyebrow}
          </p>
        ) : null}
        {heading ? (
          <h2
            className={cn(
              "active-display max-w-3xl text-[clamp(1.5rem,3.4vw,2.35rem)]",
              eyebrow && "mt-3",
            )}
          >
            {heading}
          </h2>
        ) : null}
        {description ? (
          <p
            className={cn(
              "mt-3 max-w-2xl text-sm leading-relaxed",
              onDark ? "text-white/80" : "text-[#172c5f]/70",
            )}
          >
            {description}
          </p>
        ) : null}
        {children ? <div className={heading || description ? "mt-10" : undefined}>{children}</div> : null}
      </div>
    </section>
  );
}

type Item = { title: string; description: string };

export function ActiveItemGrid({
  items,
  columns = 3,
  tone = "light",
}: {
  items: readonly Item[];
  columns?: 2 | 3 | 4 | 5;
  tone?: "light" | "dark";
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
    5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  }[columns];

  return (
    <div className={cn("grid gap-4", cols)}>
      {items.map((item) => (
        <article
          key={item.title}
          className={cn(
            "rounded-2xl p-6",
            tone === "dark"
              ? "bg-white/10 text-white"
              : "border border-[rgba(23,44,95,0.1)] bg-white text-[#172c5f] shadow-sm",
          )}
        >
          <h3 className="text-base font-extrabold uppercase tracking-wide">{item.title}</h3>
          <p
            className={cn(
              "mt-2 text-sm leading-relaxed",
              tone === "dark" ? "text-white/80" : "text-[#172c5f]/70",
            )}
          >
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}
