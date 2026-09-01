"use client";

import { useLenis } from "lenis/react";
import type { VirtualScrollData } from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type PulseZzzPhase = "idle" | "playing" | "complete";

type PulseZzzGateContextValue = {
  phase: PulseZzzPhase;
  beginZzzSequence: () => void;
  markComplete: () => void;
};

const PulseZzzGateContext = createContext<PulseZzzGateContextValue | null>(null);

const HERO_ID = "pulse-hero-chapter";
const ZZZ_ID = "pulse-after-hero";
const HERO_SCROLL_THRESHOLD = 12;
const SNAP_DURATION = 0.85;

export function usePulseZzzGate() {
  const ctx = useContext(PulseZzzGateContext);
  if (!ctx) {
    throw new Error("usePulseZzzGate must be used within PulseZzzGateProvider");
  }
  return ctx;
}

function setZzzLock(locked: boolean) {
  document.documentElement.dataset.pulseZzzLock = locked ? "true" : "false";
}

/**
 * First downward visit from the hero plays the ZZZ reveal and locks until it finishes.
 * After that, scroll is free — no chapter snaps, so the homepage does not page like a PDF.
 */
export function PulseZzzGateProvider({ children }: { children: ReactNode }) {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  const [phase, setPhase] = useState<PulseZzzPhase>("idle");
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const markComplete = useCallback(() => {
    if (phaseRef.current === "complete") return;
    phaseRef.current = "complete";
    setPhase("complete");
    setZzzLock(false);
    lenisRef.current?.start();
  }, []);

  const beginZzzSequence = useCallback(() => {
    const instance = lenisRef.current;
    if (phaseRef.current !== "idle" || !instance) return false;

    const zzz = document.getElementById(ZZZ_ID);
    if (!zzz) return false;

    phaseRef.current = "playing";
    setPhase("playing");

    instance.scrollTo(zzz, {
      offset: 0,
      immediate: true,
      force: true,
    });

    setZzzLock(true);
    instance.stop();
    return true;
  }, []);

  const scrollToChapter = useCallback((id: string) => {
    const instance = lenisRef.current;
    const target = document.getElementById(id);
    if (!instance || !target) return;
    instance.scrollTo(target, {
      offset: 0,
      duration: SNAP_DURATION,
      easing: (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t)),
      force: true,
    });
  }, []);

  useEffect(() => {
    const instance = lenisRef.current;
    if (!instance) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      phaseRef.current = "complete";
      setPhase("complete");
      setZzzLock(false);
      return;
    }

    const hero = document.getElementById(HERO_ID);
    const zzz = document.getElementById(ZZZ_ID);
    if (hero && zzz && instance.scroll >= hero.offsetHeight - HERO_SCROLL_THRESHOLD) {
      if (Math.abs(zzz.getBoundingClientRect().top) <= HERO_SCROLL_THRESHOLD) {
        phaseRef.current = "complete";
        setPhase("complete");
      }
    }

    const isOnHero = () => instance.scroll <= HERO_SCROLL_THRESHOLD;

    const onVirtualScroll = ({ deltaY }: VirtualScrollData) => {
      if (document.documentElement.dataset.pulseMenuOpen === "true") return;
      if (phaseRef.current !== "idle") return;
      if (!isOnHero() || deltaY <= 0) return;
      beginZzzSequence();
    };

    const onScroll = () => {
      if (phaseRef.current !== "idle") return;
      if (instance.scroll <= HERO_SCROLL_THRESHOLD) return;
      const heroEl = document.getElementById(HERO_ID);
      if (heroEl && instance.scroll < heroEl.offsetHeight) {
        beginZzzSequence();
      }
    };

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('a[href="#pulse-after-hero"]');
      if (!link) return;
      event.preventDefault();
      if (phaseRef.current === "idle") beginZzzSequence();
      else if (phaseRef.current === "complete") scrollToChapter(ZZZ_ID);
    };

    instance.on("virtual-scroll", onVirtualScroll);
    instance.on("scroll", onScroll);
    window.addEventListener("click", onAnchorClick, { capture: true });

    return () => {
      instance.off("virtual-scroll", onVirtualScroll);
      instance.off("scroll", onScroll);
      window.removeEventListener("click", onAnchorClick, { capture: true });
      setZzzLock(false);
    };
  }, [lenis, beginZzzSequence, scrollToChapter]);

  return (
    <PulseZzzGateContext.Provider value={{ phase, beginZzzSequence, markComplete }}>
      {children}
    </PulseZzzGateContext.Provider>
  );
}
