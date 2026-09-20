"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type NoirTileTone = "green" | "violet" | "amber" | "rose";

const tileToneClass: Record<NoirTileTone, string> = {
  green: "bg-[#0f3d28] text-[var(--n-accent)]",
  violet: "bg-[#1c1838] text-[var(--n-violet)]",
  amber: "bg-[#3a2a12] text-[var(--n-amber)]",
  rose: "bg-[#3a1424] text-[var(--n-rose)]",
};

export const noirMenuSyncColors: Record<
  NoirTileTone,
  { bg: string; fg: string }
> = {
  green: { bg: "#0f3d28", fg: "#ffffff" },
  violet: { bg: "#1c1838", fg: "#ffffff" },
  amber: { bg: "#3a2a12", fg: "#ffffff" },
  rose: { bg: "#3a1424", fg: "#ffffff" },
};

type NoirSectionProps = {
  id: string;
  number: string;
  title: string;
  tone?: NoirTileTone;
  /** Tile on the left (content right) or flipped. */
  align?: "left" | "right";
  children: ReactNode;
  className?: string;
};

/** Sticky numbered tile + content panel — Boxus section rhythm, dark. */
export function NoirSection({
  id,
  number,
  title,
  tone = "green",
  align = "left",
  children,
  className,
}: NoirSectionProps) {
  const tile = (
    <div
      className={cn("noir-section-tile", tileToneClass[tone])}
      data-noir-tile=""
      data-noir-tone={tone}
    >
      <span className="noir-section-num" aria-hidden>
        {number}
      </span>
      <h2 className="noir-section-title">{title}</h2>
    </div>
  );

  const content = (
    <div className="noir-content-panel p-6 sm:p-8 lg:p-10">{children}</div>
  );

  return (
    <section
      id={id}
      data-noir-section=""
      data-noir-tone={tone}
      className={cn("relative scroll-mt-24 border-b border-white/10 py-10 sm:py-14", className)}
      aria-labelledby={`${id}-title`}
    >
      <span id={`${id}-title`} className="sr-only">
        {title}
      </span>
      <div className="noir-container">
        {/* Mobile: always tile → content. Desktop: flip columns via align.
            Outer grid cells stretch so sticky tiles can travel the section height. */}
        <div
          className={cn(
            "grid gap-5 lg:gap-6",
            align === "left"
              ? "lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)]"
              : "lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)]",
          )}
        >
          <div className={cn(align === "right" && "lg:col-start-2 lg:row-start-1")}>{tile}</div>
          <div className={cn("min-w-0", align === "right" && "lg:col-start-1 lg:row-start-1")}>
            {content}
          </div>
        </div>
      </div>
    </section>
  );
}
