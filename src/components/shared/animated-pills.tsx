"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

type AnimatedPillsProps = {
  items: readonly string[];
  className?: string;
};

export function AnimatedPills({ items, className }: AnimatedPillsProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border bg-background-elevated px-4 py-2 text-sm font-medium text-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("flex flex-wrap gap-2", className)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
      }}
    >
      {items.map((item) => (
        <motion.span
          key={item}
          variants={{
            hidden: { opacity: 0, scale: 0.85, y: 10 },
            show: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.45, ease: easeOutExpo },
            },
          }}
          whileHover={{ scale: 1.04, y: -2 }}
          className="cursor-default rounded-full border border-border bg-background-elevated px-4 py-2 text-sm font-medium text-foreground transition-colors duration-300 hover:border-accent/50 hover:bg-accent-soft hover:text-accent"
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}
