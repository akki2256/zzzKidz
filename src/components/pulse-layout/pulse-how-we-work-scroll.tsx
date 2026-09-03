"use client";

import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Award,
  Building2,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  Dumbbell,
  Megaphone,
  PencilRuler,
  ShieldCheck,
  TrendingUp,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { processSteps, schoolBenefits } from "@/content/site";
import { usePulseSmoothScrollProgress } from "@/hooks/use-pulse-smooth-scroll-progress";
import {
  PULSE_SCROLL_FOCUS_ITEM_VH,
  pulseFocusOpacityKeyframes,
  pulseFocusSpread,
  pulseKeyframeOffsets,
  pulsePhaseBounds,
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

const benefitIcons: LucideIcon[] = [
  TrendingUp,
  Users,
  Award,
  Building2,
  Megaphone,
];

const STEP_COUNT = processSteps.length;
const BENEFIT_COUNT = schoolBenefits.length;
const STEPS_RUNWAY_VH = Math.max(STEP_COUNT - 1, 1) * PULSE_SCROLL_FOCUS_ITEM_VH;
const BENEFITS_RUNWAY_VH = 78;
const RUNWAY_VH = STEPS_RUNWAY_VH + BENEFITS_RUNWAY_VH;
const [, STEPS_END] = pulsePhaseBounds([STEPS_RUNWAY_VH, BENEFITS_RUNWAY_VH]);

const stepFocusSpread = pulseFocusSpread(STEP_COUNT, 1.1);
const ROW_ESTIMATE = 168;
const BRANCH_HEIGHT = 112;

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
  stepsProgress: MotionValue<number>;
};

function StepRow({ index, stepsProgress }: StepRowProps) {
  const step = processSteps[index];
  const Icon = stepIcons[index] ?? ClipboardList;
  const steps = Math.max(STEP_COUNT - 1, 1);
  const center = index / steps;
  const accent = index % 2 === 1;
  const alignRight = index % 2 === 1;

  const opacityKeyframes = pulseFocusOpacityKeyframes(center, stepFocusSpread);
  const opacity = useTransform(
    stepsProgress,
    pulseKeyframeOffsets(opacityKeyframes.input),
    opacityKeyframes.output,
  );
  const scale = useTransform(
    stepsProgress,
    pulseKeyframeOffsets([
      center - stepFocusSpread,
      center - stepFocusSpread * 0.48,
      center + stepFocusSpread * 0.48,
      center + stepFocusSpread,
    ]),
    [0.92, 1, 1, 0.94],
  );
  const glow = useTransform(
    stepsProgress,
    pulseKeyframeOffsets([
      center - stepFocusSpread,
      center - stepFocusSpread * 0.48,
      center + stepFocusSpread * 0.48,
      center + stepFocusSpread,
    ]),
    [0.08, 1, 1, 0.08],
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

        <div className="min-w-0 flex-1 md:hidden">
          <StepCopy index={index} title={step.title} points={step.points} accent={accent} align="left" />
        </div>
      </div>

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

type BenefitsBranchProps = {
  progress: MotionValue<number>;
};

type BranchGeometry = {
  width: number;
  height: number;
  hubX: number;
  hubY: number;
  ends: number[];
};

function buildBranchPath(hubX: number, hubY: number, endX: number, endY: number): string {
  const trunkY = hubY + 28;
  const midY = hubY + (endY - hubY) * 0.58;
  // Keep the center branch a true vertical line — degenerate cubics often fail to draw.
  if (Math.abs(endX - hubX) < 1) {
    return `M${hubX} ${hubY} L${hubX} ${endY}`;
  }
  return `M${hubX} ${hubY} L${hubX} ${trunkY} C${hubX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
}

function BenefitsBranchFinale({ progress }: BenefitsBranchProps) {
  const reduceMotion = useReducedMotion();
  const diagramRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [geometry, setGeometry] = useState<BranchGeometry | null>(null);

  const benefitsStart = STEPS_END;
  const benefitsMid = STEPS_END + (1 - STEPS_END) * 0.38;
  const benefitsHold = STEPS_END + (1 - STEPS_END) * 0.55;

  const stageOpacity = useTransform(
    progress,
    pulseKeyframeOffsets([benefitsStart, benefitsMid, 1]),
    [0, 1, 1],
  );
  const branchDraw = useTransform(
    progress,
    pulseKeyframeOffsets([benefitsStart, benefitsMid, benefitsHold, 1]),
    [0, 0.55, 1, 1],
  );
  const titleOpacity = useTransform(
    progress,
    pulseKeyframeOffsets([benefitsStart, benefitsMid, 1]),
    [0, 1, 1],
  );
  const washOpacity = useTransform(branchDraw, (v) => Math.min(Math.max(v, 0), 1) * 0.7);

  useLayoutEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram) return;

    const measure = () => {
      const bounds = diagram.getBoundingClientRect();
      if (bounds.width < 8) return;

      const ends = schoolBenefits.map((_, index) => {
        const card = cardRefs.current[index];
        if (!card) return bounds.width * ((index + 0.5) / BENEFIT_COUNT);
        const cardBounds = card.getBoundingClientRect();
        return cardBounds.left + cardBounds.width / 2 - bounds.left;
      });

      setGeometry({
        width: bounds.width,
        height: BRANCH_HEIGHT,
        hubX: bounds.width / 2,
        hubY: 10,
        ends,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(diagram);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 z-[4] flex flex-col overflow-visible px-0 pb-4 pt-1 sm:pb-6 sm:pt-2"
      style={reduceMotion ? { opacity: 1 } : { opacity: stageOpacity }}
      aria-label="Benefits for your school"
    >
      <div className="pulse-container flex h-full min-h-0 w-full flex-col">
        <motion.div
          className="relative z-[2] shrink-0 pb-1"
          style={reduceMotion ? undefined : { opacity: titleOpacity }}
        >
          <p className="pulse-eyebrow text-[var(--p-accent)]">The outcome</p>
          <h3 className="pulse-how-heading font-display mt-2 max-w-4xl uppercase text-white">
            Benefits for <span className="pulse-accent-text">your school</span>
          </h3>
        </motion.div>

        {/* Phone + tablet: compact vertical timeline that fits the sticky viewport */}
        <div className="relative mt-3 flex min-h-0 flex-1 flex-col lg:hidden">
          <div className="pulse-how-branch-hub mx-auto mb-3 shrink-0" aria-hidden />
          <div className="relative min-h-0 flex-1">
            <div
              aria-hidden
              className="absolute bottom-3 left-[1.125rem] top-3 w-px bg-white/12"
            >
              <motion.div
                className="pulse-how-spine absolute inset-x-0 top-0 h-full origin-top"
                style={reduceMotion ? { scaleY: 1 } : { scaleY: branchDraw }}
              />
            </div>
            <ul className="flex h-full min-h-0 flex-col justify-between gap-2">
              {schoolBenefits.map((benefit, index) => (
                <li key={benefit.title} className="min-h-0">
                  <BenefitCard
                    benefit={benefit}
                    index={index}
                    progress={progress}
                    layout="mobile"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Large desktop: measured five-branch fan */}
        <div ref={diagramRef} className="relative mt-3 hidden min-h-0 flex-1 flex-col lg:flex">
          <div className="relative shrink-0" style={{ height: BRANCH_HEIGHT }}>
            <div
              className="pulse-how-branch-hub absolute left-1/2 top-0 z-[2] -translate-x-1/2"
              aria-hidden
            />

            {geometry ? (
              <svg
                className="pulse-how-branch-svg pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                viewBox={`0 0 ${geometry.width} ${geometry.height}`}
                width={geometry.width}
                height={geometry.height}
                fill="none"
                aria-hidden
              >
                <defs>
                  <linearGradient
                    id="pulse-branch-stroke"
                    x1={geometry.hubX}
                    y1={geometry.hubY}
                    x2={geometry.hubX}
                    y2={geometry.height}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="var(--p-accent)" stopOpacity="1" />
                    <stop offset="100%" stopColor="var(--p-accent)" stopOpacity="0.62" />
                  </linearGradient>
                  <linearGradient
                    id="pulse-branch-wash"
                    x1={geometry.hubX}
                    y1={geometry.hubY}
                    x2={geometry.hubX}
                    y2={geometry.height}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="var(--p-accent)" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="var(--p-accent)" stopOpacity="0" />
                  </linearGradient>
                  <filter id="pulse-branch-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="2.8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <motion.path
                  d={`M${geometry.ends[0]} ${geometry.height - 2} L${geometry.ends[BENEFIT_COUNT - 1]} ${geometry.height - 2} L${geometry.hubX} ${geometry.hubY} Z`}
                  fill="url(#pulse-branch-wash)"
                  style={reduceMotion ? { opacity: 0.7 } : { opacity: washOpacity }}
                />

                {geometry.ends.map((endX, index) => (
                  <BranchPath
                    key={`branch-${index}`}
                    d={buildBranchPath(
                      geometry.hubX,
                      geometry.hubY + 8,
                      endX,
                      geometry.height - 6,
                    )}
                    index={index}
                    drawProgress={branchDraw}
                  />
                ))}

                {geometry.ends.map((endX, index) => (
                  <BranchEndpoint
                    key={`end-${index}`}
                    cx={endX}
                    cy={geometry.height - 4}
                    index={index}
                    drawProgress={branchDraw}
                  />
                ))}
              </svg>
            ) : null}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-5 gap-3 xl:gap-4">
            {schoolBenefits.map((benefit, index) => (
              <div
                key={benefit.title}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className="min-h-0"
              >
                <BenefitCard
                  benefit={benefit}
                  index={index}
                  progress={progress}
                  layout="desktop"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BranchPath({
  d,
  index,
  drawProgress,
}: {
  d: string;
  index: number;
  drawProgress: MotionValue<number>;
}) {
  const start = index * 0.05;
  const pathLength = useTransform(drawProgress, (v) => {
    const local = Math.min(Math.max((v - start) / Math.max(1 - start, 0.001), 0), 1);
    return local;
  });
  const opacity = useTransform(pathLength, (v) => 0.4 + v * 0.6);
  const glowOpacity = useTransform(pathLength, (v) => v * 0.22);

  return (
    <g filter="url(#pulse-branch-glow)">
      <motion.path
        d={d}
        fill="none"
        stroke="var(--p-accent)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength, opacity: glowOpacity }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="url(#pulse-branch-stroke)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength, opacity }}
      />
    </g>
  );
}

function BranchEndpoint({
  cx,
  cy,
  index,
  drawProgress,
}: {
  cx: number;
  cy: number;
  index: number;
  drawProgress: MotionValue<number>;
}) {
  const start = 0.4 + index * 0.07;
  const appear = useTransform(drawProgress, (v) => {
    const local = Math.min(Math.max((v - start) / 0.28, 0), 1);
    return local;
  });

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r="4"
      className="fill-[var(--p-accent)]"
      style={{ opacity: appear, scale: appear }}
    />
  );
}

function BenefitCard({
  benefit,
  index,
  progress,
  layout,
}: {
  benefit: (typeof schoolBenefits)[number];
  index: number;
  progress: MotionValue<number>;
  layout: "desktop" | "mobile";
}) {
  const reduceMotion = useReducedMotion();
  const Icon = benefitIcons[index] ?? Award;
  const span = 1 - STEPS_END;
  const enter = STEPS_END + span * (0.42 + index * 0.08);
  const settle = Math.min(enter + span * 0.12, 0.98);

  const opacity = useTransform(
    progress,
    pulseKeyframeOffsets([enter - span * 0.06, enter, settle, 1]),
    [0, 0.55, 1, 1],
  );
  const y = useTransform(
    progress,
    pulseKeyframeOffsets([enter - span * 0.04, settle, 1]),
    layout === "mobile" ? ["8%", "0%", "0%"] : ["22%", "0%", "0%"],
  );

  return (
    <motion.article
      className={`pulse-how-benefit-card relative h-full overflow-hidden rounded-2xl border border-white/12 bg-[#101010]/92 backdrop-blur-sm ${
        layout === "mobile"
          ? "ml-10 flex min-h-0 items-start gap-3 p-2.5 sm:ml-11 sm:p-3"
          : "p-3 sm:p-3.5"
      }`}
      style={reduceMotion ? { opacity: 1, y: 0 } : { opacity, y }}
      aria-label={benefit.title}
    >
      {layout === "mobile" ? (
        <>
          <span
            aria-hidden
            className="pulse-how-node-accent absolute -left-[2.35rem] top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border sm:-left-[2.55rem] sm:h-8 sm:w-8"
          >
            <Icon className="h-3.5 w-3.5 text-[var(--p-accent)]" strokeWidth={1.75} />
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="font-display text-[clamp(0.82rem,3.4vw,1.05rem)] uppercase leading-[1.1] tracking-[0.02em] text-white">
              {benefit.title}
            </h4>
            <p className="mt-1 text-[0.72rem] leading-snug text-white/62 sm:text-[0.78rem]">
              {benefit.description}
            </p>
          </div>
        </>
      ) : (
        <>
          <span className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#0b0b0b]">
            <Icon className="h-4 w-4 text-[var(--p-accent)]" aria-hidden strokeWidth={1.75} />
          </span>
          <h4 className="font-display text-[clamp(0.78rem,1.15vw,0.98rem)] uppercase leading-[1.08] tracking-[0.02em] text-white">
            {benefit.title}
          </h4>
          <p className="mt-1.5 text-[0.72rem] leading-relaxed text-white/62 sm:text-[0.78rem]">
            {benefit.description}
          </p>
        </>
      )}
    </motion.article>
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

  const stepsProgress = useTransform(progress, [0, STEPS_END], [0, 1]);
  const listY = useTransform(stepsProgress, [0, 1], [listStart, listEnd]);
  const lineScale = useTransform(stepsProgress, [0, 1], [0.06, 1]);

  const stepsLayerOpacity = useTransform(
    progress,
    pulseKeyframeOffsets([STEPS_END - 0.04, STEPS_END + 0.04, 1]),
    [1, 0.12, 0],
  );
  const introOpacity = useTransform(
    progress,
    pulseKeyframeOffsets([STEPS_END - 0.06, STEPS_END, 1]),
    [1, 0, 0],
  );

  return (
    <div className="relative h-full w-full pb-5 pt-[calc(4.75rem+0.75rem)] sm:pb-8 sm:pt-[calc(5rem+1rem)]">
      <div ref={viewportRef} className="pulse-container relative h-full min-h-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 flex flex-col overflow-visible"
          style={reduceMotion ? undefined : { opacity: stepsLayerOpacity }}
        >
          {showIntro ? (
            <motion.header
              className="relative z-[2] mb-3 shrink-0 overflow-visible sm:mb-5"
              style={reduceMotion ? undefined : { opacity: introOpacity }}
            >
              <p className="pulse-eyebrow text-white/50">How we work</p>
              <h2 className="pulse-how-heading font-display mt-2 max-w-4xl uppercase text-white sm:mt-3">
                From first visit to <span className="pulse-accent-text">lasting partnership</span>
              </h2>
            </motion.header>
          ) : null}

          <div className="relative min-h-0 flex-1">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[#070909] to-transparent sm:h-20"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-[#070909] to-transparent sm:h-20"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute bottom-6 left-1/2 top-6 hidden w-px -translate-x-1/2 bg-white/10 md:block"
            >
              <motion.div
                className="pulse-how-spine absolute inset-x-0 top-0 h-full origin-top"
                style={reduceMotion ? { scaleY: 1 } : { scaleY: lineScale }}
              />
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute bottom-6 left-6 top-6 w-px bg-white/10 md:hidden"
            >
              <motion.div
                className="pulse-how-spine absolute inset-x-0 top-0 h-full origin-top"
                style={reduceMotion ? { scaleY: 1 } : { scaleY: lineScale }}
              />
            </div>

            <motion.div
              ref={stackRef}
              className="relative h-full will-change-transform"
              style={reduceMotion ? { y: listStart || 0 } : { y: listY }}
            >
              {processSteps.map((step, index) => (
                <StepRow key={step.title} index={index} stepsProgress={stepsProgress} />
              ))}
            </motion.div>
          </div>

          <motion.p
            className="relative z-[2] mt-2 hidden shrink-0 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/35 sm:block"
            style={reduceMotion ? undefined : { opacity: introOpacity }}
          >
            Scroll through {STEP_COUNT} steps · then school benefits
          </motion.p>
        </motion.div>

        <BenefitsBranchFinale progress={progress} />
      </div>
    </div>
  );
}

function ReducedMotionHowWeWork() {
  return (
    <section
      id="pulse-how-we-work"
      className="relative border-b border-white/10 bg-[#070909] py-16 sm:py-24"
      aria-label="How we work — delivery steps and school benefits"
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

        <div className="mt-16 border-t border-white/10 pt-12">
          <p className="pulse-eyebrow text-[var(--p-accent)]">The outcome</p>
          <h3 className="pulse-how-heading font-display mt-3 max-w-4xl uppercase text-white">
            Benefits for <span className="pulse-accent-text">your school</span>
          </h3>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
            {schoolBenefits.map((benefit, index) => {
              const Icon = benefitIcons[index] ?? Award;
              return (
                <article
                  key={benefit.title}
                  className="pulse-how-benefit-card rounded-2xl border border-white/12 bg-[#101010] p-4"
                >
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0b0b0b]">
                    <Icon className="h-4 w-4 text-[var(--p-accent)]" aria-hidden />
                  </span>
                  <h4 className="font-display text-base uppercase leading-[1.05] text-white">
                    {benefit.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/62">{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

type PulseHowWeWorkScrollProps = {
  showIntro?: boolean;
};

/**
 * Sticky vertical flowchart — steps first, then a five-branch school benefits finale.
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
      aria-label="How we work — delivery steps and school benefits"
    >
      <div className="sticky top-0 z-[1] flex h-[100svh] min-h-[36rem] w-full items-center overflow-hidden bg-[#070909]">
        <HowWeWorkStage progress={scrollYProgress} showIntro={showIntro} />
      </div>
    </section>
  );
}
