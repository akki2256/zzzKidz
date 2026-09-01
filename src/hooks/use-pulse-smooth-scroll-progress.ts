"use client";

import { useScroll, type MotionValue } from "framer-motion";
import type { RefObject } from "react";

type AcceleratedMotionValue = MotionValue<number> & {
  accelerate?: unknown;
};

/**
 * Direct scroll scrub for pinned Pulse sections — matches Lenis + GSAP ScrollTrigger
 * on julianfella.de (smooth wheel via Lenis, transforms tied 1:1 to scroll progress).
 */
export function usePulseScrollProgress(target: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });

  /**
   * Motion 13 copies this onto useTransform() outputs and plays them with
   * element.animate() + ScrollTimeline. Chrome then requires WAAPI offsets
   * to sit in [0, 1] and never decrease. Pulse ranges include duplicates
   * (stagger windows) and values outside 0–1 (activity focus bands), which
   * crash production: "Offsets must be monotonically non-decreasing."
   */
  (scrollYProgress as AcceleratedMotionValue).accelerate = undefined;

  return scrollYProgress;
}

/** @deprecated Use usePulseScrollProgress — spring lag fought Lenis scrub. */
export const usePulseSmoothScrollProgress = usePulseScrollProgress;
