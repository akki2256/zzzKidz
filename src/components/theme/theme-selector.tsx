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
    layout === "studio"
      ? "border-white/20 bg-white/[0.06]"
      : layout === "pulse"
        ? "border-white/15 bg-[rgba(120,120,120,0.28)] backdrop-blur-md"
        : layout === "active"
          ? "border-white/25 bg-black/20"
          : "border-white/15 bg-black/30";

  const activePill =
    layout === "studio"
      ? "bg-[#c8ff00] text-[#0b0b0b]"
      : layout === "pulse"
        ? "bg-[#13ff72] text-[#0b0b0b]"
        : layout === "active"
          ? "bg-[#ec1f8f] text-white"
          : "bg-accent text-white shadow-sm";

  const ring =
    layout === "studio"
      ? "focus-visible:ring-[#c8ff00] focus-visible:ring-offset-black"
      : layout === "pulse"
        ? "focus-visible:ring-[#13ff72] focus-visible:ring-offset-black"
        : layout === "active"
          ? "focus-visible:ring-[#ffc215] focus-visible:ring-offset-[#7c5cbf]"
          : "focus-visible:ring-accent";

  const idleText = "text-white/60 hover:text-white";

  const labelText = layout === "original" ? "text-foreground-muted" : "text-white/50";

  return (
    <div
      className={cn("flex flex-col items-start gap-1", className)}
      role="group"
      aria-label="Website layout"
    >
      {!compact ? (
        <span className={cn("text-[10px] font-semibold uppercase tracking-[0.12em]", labelText)}>
          Layout
        </span>
      ) : null}
      <div
        className={cn(
          "inline-flex flex-wrap rounded-full border p-0.5 transition-opacity duration-200",
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
              layout === option.value ? activePill : idleText,
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
