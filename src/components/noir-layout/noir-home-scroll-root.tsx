"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type NoirHomeScrollRootProps = {
  children: ReactNode;
};

/**
 * Light Lenis smoothing for the Noir homepage — no snap locks.
 * Tree stays stable across SSR/hydration; reduced-motion only toggles options.
 */
export function NoirHomeScrollRoot({ children }: NoirHomeScrollRootProps) {
  const reduceMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: reduceMotion ? 1 : 0.09,
        smoothWheel: !reduceMotion,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.3,
        syncTouch: !reduceMotion,
      }}
    >
      {children}
    </ReactLenis>
  );
}
