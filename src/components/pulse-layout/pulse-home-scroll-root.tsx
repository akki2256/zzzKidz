"use client";

import { ReactLenis, useLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { PulseHomeSectionSnap } from "@/components/pulse-layout/pulse-home-section-snap";
import { PulseOutcomesStepController } from "@/components/pulse-layout/pulse-outcomes-step";
import { PulseZzzGateProvider } from "@/components/pulse-layout/pulse-zzz-gate";

type PulseHomeScrollRootProps = {
  children: ReactNode;
};

/**
 * Inertial scroll tuned to match julianfella.de (Webflow + Lenis + GSAP).
 * @see https://www.julianfella.de/
 */
function LenisMenuSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const sync = () => {
      const menuOpen = document.documentElement.dataset.pulseMenuOpen === "true";
      const zzzLock = document.documentElement.dataset.pulseZzzLock === "true";
      if (menuOpen || zzzLock) lenis.stop();
      else lenis.start();
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-pulse-menu-open", "data-pulse-zzz-lock"],
    });

    return () => observer.disconnect();
  }, [lenis]);

  return null;
}

export function PulseHomeScrollRoot({ children }: PulseHomeScrollRootProps) {
  return (
    <ReactLenis
      root
      options={{
        /** Same ballpark as Julian Fella portfolio sites */
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.65,
        syncTouch: true,
      }}
    >
      <PulseZzzGateProvider>
        <LenisMenuSync />
        <PulseHomeSectionSnap />
        <PulseOutcomesStepController />
        {children}
      </PulseZzzGateProvider>
    </ReactLenis>
  );
}
