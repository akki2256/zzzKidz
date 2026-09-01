"use client";

import { useScroll } from "framer-motion";
import type { RefObject } from "react";

/**
 * Direct scroll scrub for pinned Pulse sections — matches Lenis + GSAP ScrollTrigger
 * on julianfella.de (smooth wheel via Lenis, transforms tied 1:1 to scroll progress).
 */
export function usePulseScrollProgress(target: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });

  return scrollYProgress;
}

/** @deprecated Use usePulseScrollProgress — spring lag fought Lenis scrub. */
export const usePulseSmoothScrollProgress = usePulseScrollProgress;
