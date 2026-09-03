"use client";

import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  Dumbbell,
  PencilRuler,
  ShieldCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { processSteps } from "@/content/site";
import { usePulseSmoothScrollProgress } from "@/hooks/use-pulse-smooth-scroll-progress";
import {
  PULSE_SCROLL_LONG_LIST_VH,
  pulseFocusSpread,
  pulseKeyframeOffsets,
  pulseSectionHeightVh,
} from "@/lib/pulse-scroll";

const stepIcons: LucideIcon[] = [
  ClipboardList,
  PencilRuler,
  Dumbbell,
  ShieldCheck,
  Users,
  CalendarDays,
  ClipboardCheck,
  Wrench,
];

const STEP_COUNT = processSteps.length;
const RUNWAY_VH = STEP_COUNT * PULSE_SCROLL_LONG_LIST_VH;
const focusSpread = pulseFocusSpread(STEP_COUNT, 0.72);
/** Approximate row height used until measured. */
const ROW_ESTIMATE = 168;

function useViewportHeight(ref: RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => setHeight(node.clientHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return height;
}

type StepRowProps = {
  index: number;
  progress: MotionValue<number>;
};

function StepRow({ index, progress }: StepRowProps) {
  const step = processSteps[index];
  const Icon = stepIcons[index] ?? ClipboardList;
  const steps = Math.max(STEP_COUNT - 1, 1);
  const center = index / steps;
  const accent = index % 2 === 1;
  const alignRight = index % 2 === 1;

  const opacity = useTransform(
    progress,
    pulseKeyframeOffsets([
      center - focusSpread,
      center - focusSpread * 0.32,
      center,
      center + focusSpread * 0.38,
      center + focusSpread,
    ]),
    [0.14, 0.4, 1, 0.42, 0.14],
  );
  const scale = useTransform(
    progress,
    pulseKeyframeOffsets([center - focusSpread * 0.4, center, center + focusSpread * 0.4]),
    [0.92, 1, 0.94],
  );
  const glow = useTransform(
    progress,
    pulseKeyframeOffsets([center - focusSpread * 0.28, center, center + focusSpread * 0.28]),
    [0.12, 1, 0.18],
  );
  const nodeShadow = useTransform(glow, (v) =>
    accent
      ? `0 0 ${16 + v * 32}px rgba(19, 255, 114, ${0.15 + v * 0.4})`
      : `0 0 ${10 + v * 18}px rgba(255, 255, 255, ${0.05 + v * 0.14})`,
  );

  return (
    <motion.article
      className="pulse-how-step relative grid w-full grid-cols-1 items-start gap-4 py-5 md:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] md:gap-x-6 md:py-7 lg:gap-x-10"
      style={{ opacity, scale }}
      aria-label={`Step ${index + 1}: ${step.title}`}
    >
      {/* Desktop left column */}
      <div className={`hidden min-w-0 md:block ${alignRight ? "invisible" : "text-right"}`}>
        {!alignRight ? (
          <StepCopy index={index} title={step.title} points={step.points} accent={accent} align="right" />
        ) : null}
      </div>

      <div className="relative z-[2] flex items-start gap-4 md:justify-center md:gap-0">
        <motion.div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border sm:h-14 sm:w-14 ${
            accent ? "pulse-how-node-accent" : "pulse-how-node"
          }`}
          style={{ boxShadow: nodeShadow }}
        >
          <Icon
            className={`h-5 w-5 sm:h-6 sm:w-6 ${accent ? "text-[var(--p-accent)]" : "text-white"}`}
            aria-hidden
            strokeWidth={1.75}
          />
        </motion.div>

        {/* Mobile copy beside node */}
        <div className="min-w-0 flex-1 md:hidden">
          <StepCopy index={index} title={step.title} points={step.points} accent={accent} align="left" />
        </div>
      </div>

      {/* Desktop right column */}
      <div className={`hidden min-w-0 md:block ${alignRight ? "text-left" : "invisible"}`}>
        {alignRight ? (
          <StepCopy index={index} title={step.title} points={step.points} accent={accent} align="left" />
        ) : null}
      </div>
    </motion.article>
  );
}

function StepCopy({
  index,
  title,
  points,
  accent,
  align,
}: {
  index: number;
  title: string;
  points: readonly string[];
  accent: boolean;
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "ml-auto max-w-xl" : "mr-auto max-w-xl"}>
      <p
        className={`text-[0.68rem] font-bold uppercase tracking-[0.22em] ${
          accent ? "text-[var(--p-accent)]" : "text-white/45"
        }`}
      >
        Step {String(index + 1).padStart(2, "0")}
      </p>
      <h3
        className={`mt-2 font-display text-[clamp(1.25rem,2.6vw,2.2rem)] uppercase leading-[0.95] tracking-[0.01em] ${
          accent ? "text-[var(--p-accent)]" : "text-white"
        }`}
      >
        {title}
      </h3>
      <ul className="mt-3 space-y-1.5 text-[clamp(0.82rem,1.15vw,0.98rem)] leading-relaxed text-white/68">
        {points.map((point) => (
          <li
            key={point}
            className={`flex gap-2 ${align === "right" ? "justify-end" : "justify-start"}`}
          >
            <span
              className={`mt-[0.55em] h-1 w-1 shrink-0 rounded-full ${
                accent ? "bg-[var(--p-accent)]" : "bg-white/55"
              } ${align === "right" ? "order-2" : ""}`}
              aria-hidden
            />
            <span className={align === "right" ? "text-right" : "text-left"}>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type HowWeWorkStageProps = {
  progress: MotionValue<number>;
  showIntro?: boolean;
};

function HowWeWorkStage({ progress, showIntro = true }: HowWeWorkStageProps) {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const viewportH = useViewportHeight(viewportRef);
  const [rowStride, setRowStride] = useState(ROW_ESTIMATE);

  useLayoutEffect(() => {
    const stack = stackRef.current;
    if (!stack || STEP_COUNT < 2) return;
    const measure = () => {
      const first = stack.children[0] as HTMLElement | undefined;
      const second = stack.children[1] as HTMLElement | undefined;
      if (first && second) {
        setRowStride(second.offsetTop - first.offsetTop);
      } else if (first) {
        setRowStride(first.offsetHeight);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stack);
    return () => observer.disconnect();
  }, []);

  const steps = Math.max(STEP_COUNT - 1, 1);
  const listStart = viewportH / 2 - rowStride / 2;
  const listEnd = viewportH / 2 - (steps * rowStride + rowStride / 2);
  const listY = useTransform(progress, [0, 1], [listStart, listEnd]);
  const lineScale = useTransform(progress, [0, 1], [0.06, 1]);

  return (
    <div className="pulse-container relative flex h-full w-full flex-col py-8 sm:py-10">
      {showIntro ? (
        <header className="relative z-[2] mb-4 shrink-0 sm:mb-6">
          <p className="pulse-eyebrow text-white/50">How we work</p>
          <h2 className="font-display mt-3 max-w-4xl text-[clamp(2rem,5.5vw,4rem)] uppercase leading-[0.9] text-white">
            From first visit to <span className="pulse-accent-text">lasting partnership</span>
          </h2>
        </header>
      ) : null}

      <div ref={viewportRef} className="relative min-h-0 flex-1 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[#070909] to-transparent sm:h-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[#070909] to-transparent sm:h-24"
        />

        {/* Desktop center spine */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-8 left-1/2 top-8 hidden w-px -translate-x-1/2 bg-white/10 md:block"
        >
          <motion.div
            className="pulse-how-spine absolute inset-x-0 top-0 h-full origin-top"
            style={reduceMotion ? { scaleY: 1 } : { scaleY: lineScale }}
          />
        </div>

        {/* Mobile left spine */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-8 left-6 top-8 w-px bg-white/10 md:hidden"
        >
          <motion.div
            className="pulse-how-spine absolute inset-x-0 top-0 h-full origin-top"
            style={reduceMotion ? { scaleY: 1 } : { scaleY: lineScale }}
          />
        </div>

        <motion.div
          ref={stackRef}
          className="relative will-change-transform"
          style={reduceMotion ? { y: listStart || 0 } : { y: listY }}
        >
          {processSteps.map((step, index) => (
            <StepRow key={step.title} index={index} progress={progress} />
          ))}
        </motion.div>
      </div>

      <p className="relative z-[2] mt-3 hidden text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/35 sm:block">
        Scroll through {STEP_COUNT} steps
      </p>
    </div>
  );
}

function ReducedMotionHowWeWork() {
  return (
    <section
      id="pulse-how-we-work"
      className="relative border-b border-white/10 bg-[#070909] py-16 sm:py-24"
      aria-label="How we work — eight delivery steps"
    >
      <div className="pulse-container">
        <p className="pulse-eyebrow text-white/50">How we work</p>
        <h2 className="font-display mt-3 max-w-4xl text-[clamp(2.2rem,6vw,4.5rem)] uppercase leading-[0.9] text-white">
          From first visit to <span className="pulse-accent-text">lasting partnership</span>
        </h2>
        <ol className="relative mt-12 space-y-10 border-l border-white/15 pl-8">
          {processSteps.map((step, index) => {
            const Icon = stepIcons[index] ?? ClipboardList;
            const accent = index % 2 === 1;
            return (
              <li key={step.title} className="relative">
                <span
                  className={`absolute -left-[2.55rem] flex h-10 w-10 items-center justify-center rounded-full border ${
                    accent ? "pulse-how-node-accent" : "pulse-how-node"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${accent ? "text-[var(--p-accent)]" : "text-white"}`}
                    aria-hidden
                  />
                </span>
                <StepCopy
                  index={index}
                  title={step.title}
                  points={step.points}
                  accent={accent}
                  align="left"
                />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

type PulseHowWeWorkScrollProps = {
  /** When false, hides the sticky intro (useful on /how-it-works which has its own hero). */
  showIntro?: boolean;
};

/**
 * Sticky vertical flowchart — active step centers as the user scrolls the runway.
 */
export function PulseHowWeWorkScroll({ showIntro = true }: PulseHowWeWorkScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const scrollHeightVh = pulseSectionHeightVh(RUNWAY_VH);
  const scrollYProgress = usePulseSmoothScrollProgress(sectionRef);

  if (reduceMotion) {
    return <ReducedMotionHowWeWork />;
  }

  return (
    <section
      ref={sectionRef}
      id="pulse-how-we-work"
      className="relative border-b border-white/10 bg-[#070909]"
      style={{ height: `${scrollHeightVh}vh` }}
      aria-label="How we work — eight delivery steps"
    >
      <div className="sticky top-0 z-[1] flex h-[100svh] min-h-[36rem] w-full items-center overflow-hidden bg-[#070909]">
        <HowWeWorkStage progress={scrollYProgress} showIntro={showIntro} />
      </div>
    </section>
  );
}
