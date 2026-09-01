"use client";

import { ReactLenis, useLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useEffect } from "react";
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
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 1.15,
        touchMultiplier: 1.8,
        syncTouch: true,
      }}
    >
      <PulseZzzGateProvider>
        <LenisMenuSync />
        {children}
      </PulseZzzGateProvider>
    </ReactLenis>
  );
}
