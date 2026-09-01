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
const ALIGN_PX = 16;
const GESTURE_THRESHOLD = 18;
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

function setChapterLock(locked: boolean) {
  document.documentElement.dataset.pulseOutcomesLock = locked ? "true" : "false";
}

function consumeGesture(event: WheelEvent | TouchEvent) {
  (event as WheelEvent & { lenisStopPropagation?: boolean }).lenisStopPropagation = true;
  if (event.cancelable) event.preventDefault();
}

function isAligned(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  return Math.abs(el.getBoundingClientRect().top) <= ALIGN_PX;
}

const snapEase = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Hero ↔ ZZZ is a discrete chapter step.
 * First downward visit plays the reveal and locks until it finishes.
 * After that, up/down snaps fully between hero and the completed ZZZ screen.
 */
export function PulseZzzGateProvider({ children }: { children: ReactNode }) {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  const [phase, setPhase] = useState<PulseZzzPhase>("idle");
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const snappingRef = useRef(false);

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

  const snapToChapter = useCallback((id: string) => {
    const instance = lenisRef.current;
    const target = document.getElementById(id);
    if (!instance || !target || snappingRef.current) return;

    snappingRef.current = true;
    setChapterLock(true);
    const unlock = () => {
      snappingRef.current = false;
      setChapterLock(false);
    };
    window.setTimeout(() => {
      if (snappingRef.current) unlock();
    }, SNAP_DURATION * 1000 + 280);
    instance.scrollTo(target, {
      offset: 0,
      duration: SNAP_DURATION,
      easing: snapEase,
      lock: true,
      force: true,
      onComplete: unlock,
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

    const onVirtualScroll = ({ deltaY, event }: VirtualScrollData) => {
      if (document.documentElement.dataset.pulseMenuOpen === "true") return;

      if (phaseRef.current === "idle") {
        if (!isOnHero() || deltaY <= 0) return;
        beginZzzSequence();
        return;
      }

      if (phaseRef.current !== "complete") return;
      if (document.documentElement.dataset.pulseZzzLock === "true") return;

      const onHero = isOnHero() || isAligned(HERO_ID);
      const onZzz = isAligned(ZZZ_ID);
      const zzzEl = document.getElementById(ZZZ_ID);
      const zzzTop = zzzEl?.getBoundingClientRect().top ?? 0;
      const halfBetween =
        zzzTop > ALIGN_PX && zzzTop < window.innerHeight * 0.88;

      if (!onHero && !onZzz && !halfBetween) return;
      if (onZzz && deltaY > 0) return;

      if (deltaY > 0 && (onHero || halfBetween)) {
        consumeGesture(event);
        if (snappingRef.current || Math.abs(deltaY) < GESTURE_THRESHOLD) return;
        snapToChapter(ZZZ_ID);
        return;
      }

      if (deltaY < 0 && (onZzz || halfBetween)) {
        consumeGesture(event);
        if (snappingRef.current || Math.abs(deltaY) < GESTURE_THRESHOLD) return;
        snapToChapter(HERO_ID);
      }
    };

    const onScroll = () => {
      if (phaseRef.current === "idle") {
        if (instance.scroll <= HERO_SCROLL_THRESHOLD) return;
        const heroEl = document.getElementById(HERO_ID);
        if (heroEl && instance.scroll < heroEl.offsetHeight) {
          beginZzzSequence();
        }
        return;
      }

      if (phaseRef.current !== "complete" || snappingRef.current) return;
      const zzzEl = document.getElementById(ZZZ_ID);
      if (!zzzEl) return;
      const top = zzzEl.getBoundingClientRect().top;
      if (top > ALIGN_PX && top < window.innerHeight * 0.72 && instance.direction < 0) {
        snapToChapter(HERO_ID);
      }
    };

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('a[href="#pulse-after-hero"]');
      if (!link) return;
      event.preventDefault();
      if (phaseRef.current === "idle") beginZzzSequence();
      else if (phaseRef.current === "complete") snapToChapter(ZZZ_ID);
    };

    instance.on("virtual-scroll", onVirtualScroll);
    instance.on("scroll", onScroll);
    window.addEventListener("click", onAnchorClick, { capture: true });

    return () => {
      instance.off("virtual-scroll", onVirtualScroll);
      instance.off("scroll", onScroll);
      window.removeEventListener("click", onAnchorClick, { capture: true });
      setZzzLock(false);
      setChapterLock(false);
    };
  }, [lenis, beginZzzSequence, snapToChapter]);

  return (
    <PulseZzzGateContext.Provider value={{ phase, beginZzzSequence, markComplete }}>
      {children}
    </PulseZzzGateContext.Provider>
  );
}
