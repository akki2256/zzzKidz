"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LAYOUT_OPTIONS, type SiteLayout } from "@/lib/layout/types";
import { useLayout } from "@/components/theme/layout-provider";

type ThemeSelectorProps = {
  className?: string;
  compact?: boolean;
};

export function ThemeSelector({ className, compact = false }: ThemeSelectorProps) {
  const { layout, setLayout, isTransitioning } = useLayout();
  const reduceMotion = useReducedMotion();

  const track =
    layout === "premium"
      ? "border-white/12 bg-white/[0.06]"
      : layout === "studio"
        ? "border-white/20 bg-white/[0.06]"
        : "border-white/15 bg-black/30";

  const activePill =
    layout === "premium"
      ? "bg-[#f4f2f7] text-[#100c18]"
      : layout === "studio"
        ? "bg-[#c8ff00] text-[#0b0b0b]"
        : "bg-accent text-white shadow-sm";

  const ring =
    layout === "premium"
      ? "focus-visible:ring-white/60 focus-visible:ring-offset-[#0b0812]"
      : layout === "studio"
        ? "focus-visible:ring-[#c8ff00] focus-visible:ring-offset-black"
        : "focus-visible:ring-accent";

  return (
    <div
      className={cn("flex flex-col items-start gap-1", className)}
      role="group"
      aria-label="Website layout"
    >
      {!compact ? (
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.12em]",
            layout === "original" ? "text-foreground-muted" : "text-white/50",
          )}
        >
          Layout
        </span>
      ) : null}
      <div
        className={cn(
          "inline-flex rounded-full border p-0.5 transition-opacity duration-200",
          track,
          isTransitioning && !reduceMotion && "opacity-80",
        )}
      >
        {LAYOUT_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={layout === option.value}
            title={option.description}
            onClick={() => setLayout(option.value as SiteLayout)}
            className={cn(
              "min-h-[32px] rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em] transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              ring,
              layout === option.value
                ? activePill
                : "text-white/60 hover:text-white",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
