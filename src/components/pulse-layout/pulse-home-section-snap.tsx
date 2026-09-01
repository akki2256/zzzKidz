"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

const SNAP_SELECTOR = "[data-pulse-snap]";

/** px — section top must be within this of viewport top to count as aligned */
const ALIGNED_PX = 10;

/**
 * Lenis chapter snap — full sections fill the viewport; no half-scrolled states.
 * Runway sections (outcomes, comparison, activities) snap on entry/exit only.
 */
export function PulseHomeSectionSnap() {
  const lenis = useLenis();
  const snappingRef = useRef(false);

  useEffect(() => {
    if (!lenis) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const chapters = () =>
      Array.from(document.querySelectorAll<HTMLElement>(SNAP_SELECTOR));

    const isRunway = (el: HTMLElement) =>
      el.dataset.pulseSnapType === "runway" || el.offsetHeight > window.innerHeight * 1.55;

    /** Sticky runway is engaged — allow free internal scroll. */
    const isInsideRunway = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      return rect.top <= ALIGNED_PX && rect.bottom >= vh * 0.92;
    };

    const resolveTarget = (): HTMLElement | null => {
      const vh = window.innerHeight;
      const list = chapters();

      for (let i = 0; i < list.length; i++) {
        const section = list[i];
        const rect = section.getBoundingClientRect();
        const runway = isRunway(section);

        if (runway && isInsideRunway(section)) {
          return null;
        }

        if (runway) {
          if (rect.top > ALIGNED_PX && rect.top < vh * 0.72) {
            return section;
          }
          if (rect.top < -ALIGNED_PX && rect.bottom > vh * 0.28 && rect.bottom < vh * 0.88) {
            const next = list[i + 1];
            return next ?? section;
          }
          continue;
        }

        if (Math.abs(rect.top) > ALIGNED_PX && Math.abs(rect.top) < vh * 0.88) {
          return section;
        }
      }

      return null;
    };

    let settleTimer: number | undefined;

    const scheduleSnap = () => {
      if (snappingRef.current) return;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(onSettle, 48);
    };

    const snapToTarget = (target: HTMLElement) => {
      if (snappingRef.current) return;
      if (Math.abs(target.getBoundingClientRect().top) <= ALIGNED_PX) return;

      snappingRef.current = true;
      lenis.scrollTo(target, {
        offset: 0,
        duration: 0.95,
        easing: (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t)),
        onComplete: () => {
          snappingRef.current = false;
        },
      });
    };

    const onSettle = () => {
      if (snappingRef.current) return;
      if (document.documentElement.dataset.pulseZzzLock === "true") return;
      if (document.documentElement.dataset.pulseOutcomesLock === "true") return;
      const target = resolveTarget();
      if (target) snapToTarget(target);
    };

    const onScroll = () => scheduleSnap();

    lenis.on("scroll", onScroll);
    window.addEventListener("wheel", scheduleSnap, { passive: true });
    window.addEventListener("touchend", scheduleSnap, { passive: true });

    return () => {
      lenis.off("scroll", onScroll);
      window.removeEventListener("wheel", scheduleSnap);
      window.removeEventListener("touchend", scheduleSnap);
      window.clearTimeout(settleTimer);
    };
  }, [lenis]);

  return null;
}
