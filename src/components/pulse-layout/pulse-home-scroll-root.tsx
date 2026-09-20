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

/** Smooth-scroll to in-page anchors (Contact menu → #pulse-contact). */
function LenisHashScroll() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const scrollToHash = (hash: string) => {
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!(target instanceof HTMLElement)) return;
      lenis.scrollTo(target, { offset: -88, duration: 1.15 });
    };

    const onHashChange = () => scrollToHash(window.location.hash);

    const frame = window.requestAnimationFrame(() => onHashChange());

    window.addEventListener("hashchange", onHashChange);

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.(
        'a[href^="#"], a[href^="/#"]',
      );
      if (!(link instanceof HTMLAnchorElement)) return;

      const href = link.getAttribute("href");
      if (!href) return;

      const hash = href.startsWith("/#")
        ? href.slice(1)
        : href.startsWith("#")
          ? href
          : null;
      if (!hash || hash === "#") return;

      if (hash === "#pulse-after-hero") return;

      if (href.startsWith("#") || (href.startsWith("/#") && window.location.pathname === "/")) {
        event.preventDefault();
        if (window.location.hash !== hash) {
          window.history.pushState(null, "", hash);
        }
        scrollToHash(hash);
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
    };
  }, [lenis]);

  return null;
}

export function PulseHomeScrollRoot({ children }: PulseHomeScrollRootProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        smoothWheel: true,
        wheelMultiplier: 0.62,
        touchMultiplier: 1.4,
        syncTouch: true,
      }}
    >
      <PulseZzzGateProvider>
        <LenisMenuSync />
        <LenisHashScroll />
        {children}
      </PulseZzzGateProvider>
    </ReactLenis>
  );
}
