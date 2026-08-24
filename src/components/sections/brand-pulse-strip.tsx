"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/content/site";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

const phrases = [
  { text: "Stronger Bodies", style: "solid" as const },
  { text: "Sharper Minds", style: "outline" as const },
  { text: "Brighter Futures", style: "accent" as const },
  { text: "Move Better", style: "solid" as const },
  { text: "Get Stronger", style: "outline" as const },
  { text: "Grow Together", style: "accent" as const },
  { text: "Active Kids", style: "solid" as const },
  { text: siteConfig.name, style: "accent" as const },
];

function PhraseChip({
  text,
  style,
}: {
  text: string;
  style: "solid" | "outline" | "accent";
}) {
  const reduceMotion = useReducedMotion();

  const base =
    "inline-flex items-center rounded-full px-5 py-2.5 font-display text-lg uppercase tracking-[0.06em] transition-shadow duration-500 sm:text-xl";

  const styleClass =
    style === "accent"
      ? "border border-accent/40 bg-accent-soft text-accent glow-pulse"
      : style === "outline"
        ? "border border-white/25 bg-transparent text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.75)]"
        : "border border-white/10 bg-white/5 text-white";

  return (
    <motion.span
      className={`${base} ${styleClass}`}
      whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      {text}
    </motion.span>
  );
}

export function BrandPulseStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Brand statements"
      className="relative overflow-hidden border-y border-border bg-black py-8 sm:py-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,46,0.12),transparent_65%)]"
      />

      {reduceMotion ? (
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 px-4 sm:gap-4">
          {phrases.map((item) => (
            <PhraseChip key={item.text} text={item.text} style={item.style} />
          ))}
        </div>
      ) : (
        <motion.div
          className="relative z-10 flex flex-wrap items-center justify-center gap-3 px-4 sm:gap-4"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
          }}
        >
          {phrases.map((item) => (
            <motion.div
              key={item.text}
              variants={{
                hidden: { opacity: 0, y: 16, scale: 0.94 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5, ease: easeOutExpo },
                },
              }}
            >
              <PhraseChip text={item.text} style={item.style} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
