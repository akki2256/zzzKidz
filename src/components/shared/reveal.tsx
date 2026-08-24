"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

export type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "blur";

type MotionState = {
  opacity: number;
  y?: number;
  x?: number;
  scale?: number;
  filter?: string;
};

const hiddenStates: Record<RevealDirection, MotionState> = {
  up: { opacity: 0, y: 24 },
  down: { opacity: 0, y: -24 },
  left: { opacity: 0, x: 36 },
  right: { opacity: 0, x: -36 },
  scale: { opacity: 0, scale: 0.94 },
  blur: { opacity: 0, y: 16, filter: "blur(6px)" },
};

const visibleStates: Record<RevealDirection, MotionState> = {
  up: { opacity: 1, y: 0 },
  down: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  scale: { opacity: 1, scale: 1 },
  blur: { opacity: 1, y: 0, filter: "blur(0px)" },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** @deprecated Use `direction="up"` instead */
  y?: number;
  direction?: RevealDirection;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y,
  direction = "up",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const hiddenState =
    direction === "up" && y !== undefined ? { opacity: 0, y } : hiddenStates[direction];

  return (
    <motion.div
      className={cn(className)}
      initial={hiddenState}
      whileInView={visibleStates[direction]}
      viewport={viewportOnce}
      transition={{ duration: 0.55, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}
