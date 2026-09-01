"use client";

import { useLenis } from "lenis/react";
import type { VirtualScrollData } from "lenis";
import { useEffect, useRef } from "react";
import { usePulseZzzGate } from "@/components/pulse-layout/pulse-zzz-gate";
import {
  PE_COMPARISON_GRID_LIMIT,
  PE_COMPARISON_GRID_PROGRESS,
  PE_COMPARISON_TITLE_PROGRESS,
} from "@/components/pulse-layout/pulse-pe-comparison-scroll";

const ZZZ_ID = "pulse-after-hero";
const OUTCOMES_ID = "pulse-outcomes";
const PE_ID = "pulse-pe-comparison";
const ALIGN_PX = 16;
const OUTCOME_COUNT = 5;
const OUTCOME_LAST = OUTCOME_COUNT - 1;
const PE_TITLE_STEP = OUTCOME_COUNT;
const PE_GRID_STEP = OUTCOME_COUNT + 1;
const LAST_STEP = PE_GRID_STEP;
const STEP_DURATION = 0.85;
const GESTURE_THRESHOLD = 18;

function setStepLock(locked: boolean) {
  document.documentElement.dataset.pulseOutcomesLock = locked ? "true" : "false";
}

function consumeGesture(event: WheelEvent | TouchEvent) {
  (event as WheelEvent & { lenisStopPropagation?: boolean }).lenisStopPropagation = true;
  if (event.cancelable) event.preventDefault();
}

function isAligned(id: string, slack = ALIGN_PX) {
  const el = document.getElementById(id);
  if (!el) return false;
  return Math.abs(el.getBoundingClientRect().top) <= slack;
}

function outcomeProgress(step: number) {
  if (step <= 0) return 0;
  if (step >= OUTCOME_LAST) return 1;
  return step / OUTCOME_LAST;
}

function scrollForProgress(section: HTMLElement, progress: number) {
  const runway = Math.max(section.offsetHeight - window.innerHeight, 0);
  return section.offsetTop + progress * runway;
}

function peSectionProgress(scroll: number) {
  const pe = document.getElementById(PE_ID);
  if (!pe) return 1;
  const runway = Math.max(pe.offsetHeight - window.innerHeight, 1);
  return (scroll - pe.offsetTop) / runway;
}

const snapEase = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Discrete homepage steps after ZZZ: 5 outcome images, PE title, then all 4 problem cards.
 */
export function PulseOutcomesStepController() {
  const lenis = useLenis();
  const { phase } = usePulseZzzGate();
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const stepRef = useRef(-1);
  const snappingRef = useRef(false);
  const releasedRef = useRef(false);

  useEffect(() => {
    if (!lenis) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let snapGen = 0;

    const snapTo = (target: number | HTMLElement, onArrive?: () => void) => {
      const gen = ++snapGen;
      snappingRef.current = true;
      setStepLock(true);
      let settled = false;
      const unlock = () => {
        if (gen !== snapGen || settled) return;
        settled = true;
        snappingRef.current = false;
        setStepLock(false);
        onArrive?.();
      };
      window.setTimeout(unlock, STEP_DURATION * 1000 + 280);
      lenis.scrollTo(target, {
        offset: 0,
        duration: STEP_DURATION,
        easing: snapEase,
        lock: true,
        force: true,
        onComplete: unlock,
      });
    };

    const goToStep = (step: number) => {
      releasedRef.current = false;
      stepRef.current = step;

      if (step <= OUTCOME_LAST) {
        const section = document.getElementById(OUTCOMES_ID);
        if (!section) return;
        snapTo(scrollForProgress(section, outcomeProgress(step)));
        return;
      }

      const pe = document.getElementById(PE_ID);
      if (!pe) return;
      const progress =
        step === PE_TITLE_STEP ? PE_COMPARISON_TITLE_PROGRESS : PE_COMPARISON_GRID_PROGRESS;
      snapTo(scrollForProgress(pe, progress));
    };

    const goToZzz = () => {
      const zzz = document.getElementById(ZZZ_ID);
      if (!zzz) return;
      stepRef.current = -1;
      releasedRef.current = false;
      snapTo(zzz);
    };

    const shouldReclaimToGrid = () => {
      const pe = document.getElementById(PE_ID);
      if (!pe) return false;
      const rect = pe.getBoundingClientRect();
      const inPe =
        rect.top <= ALIGN_PX && rect.bottom > window.innerHeight * 0.35;
      if (!inPe) return false;
      return peSectionProgress(lenis.scroll) <= PE_COMPARISON_GRID_LIMIT + 0.04;
    };

    const onVirtualScroll = ({ deltaY, event }: VirtualScrollData) => {
      if (phaseRef.current !== "complete") return;
      if (document.documentElement.dataset.pulseMenuOpen === "true") return;
      if (document.documentElement.dataset.pulseZzzLock === "true") return;

      if (!snappingRef.current && (isAligned("pulse-hero-chapter", 48) || isAligned(ZZZ_ID, 48))) {
        stepRef.current = -1;
        releasedRef.current = false;
      }

      if (releasedRef.current) {
        if (deltaY < 0 && shouldReclaimToGrid()) {
          consumeGesture(event);
          if (snappingRef.current || Math.abs(deltaY) < GESTURE_THRESHOLD) return;
          goToStep(PE_GRID_STEP);
        }
        return;
      }

      if (stepRef.current < 0) {
        if (!isAligned(ZZZ_ID, 48)) return;
        if (deltaY <= 0) return;
        consumeGesture(event);
        if (snappingRef.current || Math.abs(deltaY) < GESTURE_THRESHOLD) return;
        goToStep(0);
        return;
      }

      if (stepRef.current === LAST_STEP && deltaY > 0) {
        releasedRef.current = true;
        return;
      }

      consumeGesture(event);
      if (snappingRef.current || Math.abs(deltaY) < GESTURE_THRESHOLD) return;

      if (deltaY > 0) {
        goToStep(stepRef.current + 1);
        return;
      }

      if (stepRef.current > 0) goToStep(stepRef.current - 1);
      else goToZzz();
    };

    const onScroll = () => {
      if (phaseRef.current !== "complete" || snappingRef.current) return;

      if (releasedRef.current) {
        if (lenis.direction < 0 && shouldReclaimToGrid()) {
          goToStep(PE_GRID_STEP);
        }
        return;
      }

      if (stepRef.current >= 0) return;

      const zzz = document.getElementById(ZZZ_ID);
      if (!zzz) return;
      if (zzz.getBoundingClientRect().top < -ALIGN_PX) {
        goToStep(0);
      }
    };

    lenis.on("virtual-scroll", onVirtualScroll);
    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("virtual-scroll", onVirtualScroll);
      lenis.off("scroll", onScroll);
      setStepLock(false);
    };
  }, [lenis]);

  return null;
}
