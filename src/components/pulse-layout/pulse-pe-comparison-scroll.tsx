"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { peComparison } from "@/content/site";
import { usePulseSmoothScrollProgress } from "@/hooks/use-pulse-smooth-scroll-progress";
import { mediaPath } from "@/lib/media";
import {
  PULSE_GRID_PHASE_VH,
  PULSE_HEADLINE_HOLD_VH,
  PULSE_HEADLINE_MOVE_VH,
  PULSE_PE_TITLE_VH,
  pulseHeadlineSlideKeyframes,
  pulseItemWindow,
  pulseKeyframeOffsets,
  pulsePhaseBounds,
  pulsePhaseFadeEdge,
  pulseSectionHeightVh,
  pulseBeatWindow,
} from "@/lib/pulse-scroll";

type ComparisonPair = {
  traditional: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  moveLab: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
};

const comparisonPairs: ComparisonPair[] = [
  {
    traditional: {
      title: peComparison.traditional.points[0].title,
      description: peComparison.traditional.points[0].description,
      image: mediaPath("Screenshot 2026-08-24 234834.png"),
      imageAlt: "Traditional P.E. session with limited activity variety",
    },
    moveLab: {
      title: peComparison.moveLab.points[0].title,
      description: peComparison.moveLab.points[0].description,
      image: mediaPath("Screenshot 2026-08-24 234955.png"),
      imageAlt: "Structured strength training in a Triple Z Kids Move Lab",
    },
  },
  {
    traditional: {
      title: peComparison.traditional.points[1].title,
      description: peComparison.traditional.points[1].description,
      image: mediaPath("Screenshot 2026-08-24 234746.png"),
      imageAlt: "Student disengaged during a conventional P.E. class",
    },
    moveLab: {
      title: peComparison.moveLab.points[1].title,
      description: peComparison.moveLab.points[1].description,
      image: mediaPath("Screenshot 2026-08-24 235036.png"),
      imageAlt: "Student developing skills on gymnastics rings with coach support",
    },
  },
  {
    traditional: {
      title: peComparison.traditional.points[2].title,
      description: peComparison.traditional.points[2].description,
      image: mediaPath("Screenshot 2026-08-24 234946.png"),
      imageAlt: "Unstructured outdoor play without progressive skill coaching",
    },
    moveLab: {
      title: peComparison.moveLab.points[2].title,
      description: peComparison.moveLab.points[2].description,
      image: mediaPath("Screenshot 2026-08-24 235240.png"),
      imageAlt: "Engaging agility training session in the Move Lab",
    },
  },
  {
    traditional: {
      title: peComparison.traditional.points[3].title,
      description: peComparison.traditional.points[3].description,
      image: mediaPath("Screenshot 2026-08-24 235109.png"),
      imageAlt: "Student sitting out during a traditional P.E. period",
    },
    moveLab: {
      title: peComparison.moveLab.points[3].title,
      description: peComparison.moveLab.points[3].description,
      image: mediaPath("Screenshot 2026-08-24 235357.png"),
      imageAlt: "Students celebrating progress together in the Move Lab",
    },
  },
];

const transitionBeats = [
  { lines: [{ text: "Let's have", accent: false }] },
  {
    lines: [
      { text: "A look into", accent: false },
      { text: "The Move Lab", accent: true },
    ],
  },
  {
    lines: [
      { text: "Your school after", accent: false },
      { text: "Our partnership", accent: true },
    ],
  },
] as const;

const HEADLINE_RUNWAY_VH =
  PULSE_HEADLINE_HOLD_VH * transitionBeats.length +
  PULSE_HEADLINE_MOVE_VH * Math.max(transitionBeats.length - 1, 0);

/** Title beat, problems grid, transition headlines, then solutions. */
const COMPARISON_RUNWAY_VH =
  PULSE_PE_TITLE_VH + PULSE_GRID_PHASE_VH + HEADLINE_RUNWAY_VH + PULSE_GRID_PHASE_VH;

const [TITLE_START, TITLE_END, PROBLEMS_END, TRANSITION_END, SOLUTIONS_END] = pulsePhaseBounds([
  PULSE_PE_TITLE_VH,
  PULSE_GRID_PHASE_VH,
  HEADLINE_RUNWAY_VH,
  PULSE_GRID_PHASE_VH,
]);

const HEADLINE_SLIDE = pulseHeadlineSlideKeyframes(transitionBeats.length);
const HEADLINE_SLIDE_INPUT = pulseKeyframeOffsets(
  HEADLINE_SLIDE.localInput.map(
    (value) => PROBLEMS_END + value * (TRANSITION_END - PROBLEMS_END),
  ),
);
void pulseBeatWindow;

/** Discrete snap targets used by the homepage step controller. */
export const PE_COMPARISON_TITLE_PROGRESS = TITLE_START;
export const PE_COMPARISON_GRID_PROGRESS = TITLE_END;
export const PE_COMPARISON_GRID_LIMIT = PROBLEMS_END;

type ComparisonColumnProps = {
  point: ComparisonPair["traditional"] | ComparisonPair["moveLab"];
  index: number;
  progress: MotionValue<number>;
  mode: "traditional" | "moveLab";
  phaseStart: number;
  phaseEnd: number;
  together?: boolean;
};

function ComparisonColumn({
  point,
  index,
  progress,
  mode,
  phaseStart,
  phaseEnd,
  together = false,
}: ComparisonColumnProps) {
  const { enterStart, enterMid, enterEnd } = pulseItemWindow(
    phaseStart,
    phaseEnd,
    index,
    comparisonPairs.length,
  );

  const staggeredOpacity = useTransform(
    progress,
    pulseKeyframeOffsets([phaseStart, enterStart, enterMid, enterEnd, phaseEnd]),
    [0, 0, 0.55, 1, 1],
  );
  const staggeredY = useTransform(
    progress,
    pulseKeyframeOffsets([enterStart, enterMid, enterEnd]),
    ["10%", "3%", "0%"],
  );

  const isTraditional = mode === "traditional";

  return (
    <motion.article
      className="relative z-[1] h-full min-h-0 min-w-0 hover:z-10 focus-within:z-10"
      style={together ? undefined : { opacity: staggeredOpacity, y: staggeredY }}
      aria-label={`${point.title}. ${point.description}`}
    >
      <div
        className="pulse-pe-card group flex h-full min-h-0 min-w-0 flex-col bg-white text-[#0b0b0b]"
      >
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <Image
            src={point.image}
            alt={point.imageAlt}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className={`object-cover transition-[filter] duration-700 ease-out motion-reduce:transition-none ${
              isTraditional
                ? "grayscale group-hover:grayscale-0 group-focus-within:grayscale-0 motion-reduce:grayscale"
                : ""
            }`}
          />
        </div>

        <div className="flex shrink-0 flex-col gap-1.5 bg-white px-3 py-3 sm:gap-2 sm:px-4 sm:py-4 lg:px-5 lg:py-5">
          <div className="flex items-start gap-2">
            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#0b0b0b]" aria-hidden />
            <h3 className="text-[clamp(0.85rem,1.6vw,1.15rem)] font-bold leading-tight text-[#0b0b0b]">
              {point.title}
            </h3>
          </div>
          <p className="pl-6 text-[clamp(0.75rem,1.2vw,0.92rem)] leading-snug text-[#0b0b0b]/70">
            {point.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

type TransitionBeatProps = {
  beat: (typeof transitionBeats)[number];
  beatIndex: number;
  slidePosition: MotionValue<number>;
  reduceMotion: boolean | null;
};

function PulseHeadlineSlide({ beat, beatIndex, slidePosition, reduceMotion }: TransitionBeatProps) {
  const y = useTransform(slidePosition, (position) => `${(beatIndex - position) * 100}%`);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 will-change-transform"
      style={reduceMotion ? { opacity: beatIndex === 1 ? 1 : 0, y: 0 } : { y }}
      aria-hidden
    >
      <div
        className={`mx-auto max-w-4xl text-center ${
          beatIndex === 1 ? "sm:text-right sm:pr-[8%]" : beatIndex === 2 ? "sm:text-left sm:pl-[8%]" : ""
        }`}
      >
        {beat.lines.map((line) => (
          <p
            key={line.text}
            className={`font-display uppercase leading-[0.92] tracking-[0.01em] ${
              line.accent
                ? "pulse-accent-text text-[clamp(2.4rem,9vw,6.5rem)]"
                : "text-[clamp(2rem,7vw,5rem)] text-white"
            }`}
          >
            {line.text}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

type TransitionHeadlinesProps = {
  progress: MotionValue<number>;
};

function TransitionHeadlines({ progress }: TransitionHeadlinesProps) {
  const reduceMotion = useReducedMotion();
  const problemsFade = pulsePhaseFadeEdge(TITLE_END, PROBLEMS_END);
  const solutionsFade = pulsePhaseFadeEdge(TRANSITION_END, SOLUTIONS_END);
  const slidePosition = useTransform(progress, HEADLINE_SLIDE_INPUT, HEADLINE_SLIDE.output);
  (slidePosition as MotionValue<number> & { accelerate?: unknown }).accelerate = undefined;

  const stackOpacity = useTransform(
    progress,
    pulseKeyframeOffsets([
      PROBLEMS_END - problemsFade,
      PROBLEMS_END,
      TRANSITION_END,
      TRANSITION_END + solutionsFade,
    ]),
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      style={reduceMotion ? undefined : { opacity: stackOpacity }}
    >
      {transitionBeats.map((beat, index) => (
        <PulseHeadlineSlide
          key={beat.lines[0].text}
          beat={beat}
          beatIndex={index}
          slidePosition={slidePosition}
          reduceMotion={reduceMotion}
        />
      ))}
    </motion.div>
  );
}

type ComparisonStageProps = {
  progress: MotionValue<number>;
};

function ComparisonStage({ progress }: ComparisonStageProps) {
  const reduceMotion = useReducedMotion();
  const revealEnd = TITLE_END;
  const fadeEdge = pulsePhaseFadeEdge(revealEnd, PROBLEMS_END);
  const titleRange = pulseKeyframeOffsets([TITLE_START, revealEnd]);
  const problemsHoldOpacity = useTransform(
    progress,
    pulseKeyframeOffsets([TITLE_START, PROBLEMS_END - fadeEdge, PROBLEMS_END]),
    [1, 1, 0],
  );
  const gridOpacity = useTransform(progress, titleRange, [0, 1]);
  const gridY = useTransform(progress, titleRange, ["14%", "0%"]);
  const titleLeft = useTransform(progress, titleRange, ["50%", "0%"]);
  const titleTop = useTransform(progress, titleRange, ["50%", "0%"]);
  const titleX = useTransform(progress, titleRange, ["-50%", "0%"]);
  const titleY = useTransform(progress, titleRange, ["-50%", "0%"]);
  const titleScale = useTransform(progress, titleRange, [1, 0.62]);
  const solutionsFade = pulsePhaseFadeEdge(TRANSITION_END, SOLUTIONS_END);
  const solutionsOpacity = useTransform(
    progress,
    pulseKeyframeOffsets([
      TRANSITION_END,
      TRANSITION_END + solutionsFade,
      SOLUTIONS_END - solutionsFade,
      SOLUTIONS_END,
    ]),
    [0, 1, 1, 1],
  );
  const backgroundTone = useTransform(
    progress,
    pulseKeyframeOffsets([PROBLEMS_END - fadeEdge * 1.5, TRANSITION_END + solutionsFade * 1.5]),
    [0, 1],
  );
  const backgroundColor = useTransform(backgroundTone, (value) =>
    value <= 0 ? "#070909" : `color-mix(in srgb, #f2f2f0 ${value * 100}%, #070909)`,
  );

  return (
    <motion.div className="relative h-full w-full" style={{ backgroundColor }}>
      <motion.div
        className="absolute inset-0 overflow-visible"
        style={
          reduceMotion
            ? { opacity: 1, backgroundColor: "#4e4e4e" }
            : { opacity: problemsHoldOpacity, backgroundColor: "#4e4e4e" }
        }
      >
        <div className="pulse-container relative h-full">
          <div className="absolute inset-x-0 bottom-0 top-[4.75rem] sm:top-[5rem]">
            <motion.h2
              className="font-display pointer-events-none absolute z-[3] w-max max-w-full origin-top-left pt-[0.14em] uppercase leading-[0.92] tracking-[0.01em] text-white text-[clamp(1.85rem,6vw,4.25rem)]"
              style={
                reduceMotion
                  ? { left: "0%", top: "0%", x: 0, y: 0, scale: 0.7 }
                  : { left: titleLeft, top: titleTop, x: titleX, y: titleY, scale: titleScale }
              }
            >
              Problems with <span className="pulse-accent-text">Traditional P.E.</span>
            </motion.h2>

            <motion.div
              className="flex h-full flex-col pb-5 pt-[min(7.25rem,22vw)] sm:pb-7 sm:pt-[min(8rem,12vw)]"
              style={reduceMotion ? { opacity: 1, y: 0 } : { opacity: gridOpacity, y: gridY }}
            >
              <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-visible sm:gap-4 lg:grid-cols-4">
                {comparisonPairs.map((pair, index) => (
                  <ComparisonColumn
                    key={pair.traditional.title}
                    point={pair.traditional}
                    index={index}
                    progress={progress}
                    mode="traditional"
                    phaseStart={TITLE_START}
                    phaseEnd={revealEnd}
                    together
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <TransitionHeadlines progress={progress} />

      {/* Solutions — Move Lab */}
      <motion.div
        className="absolute inset-0 flex flex-col"
        style={reduceMotion ? { opacity: 0, pointerEvents: "none" } : { opacity: solutionsOpacity }}
      >
        <div className="pulse-container flex h-full min-h-0 flex-1 flex-col justify-start pb-6 pt-[calc(4.75rem+0.85rem)] sm:pb-8 sm:pt-[calc(5rem+1rem)]">
          <h2 className="font-display mb-5 shrink-0 pt-[0.14em] text-[clamp(2rem,6vw,4.5rem)] uppercase leading-[0.92] text-[#0b0b0b] sm:mb-7">
            The <span className="pulse-accent-text">difference</span>
          </h2>

          <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-visible sm:gap-4 lg:grid-cols-4">
            {comparisonPairs.map((pair, index) => (
              <ComparisonColumn
                key={pair.moveLab.title}
                point={pair.moveLab}
                index={index}
                progress={progress}
                mode="moveLab"
                phaseStart={TRANSITION_END + solutionsFade * 0.5}
                phaseEnd={SOLUTIONS_END - solutionsFade * 0.5}
              />
            ))}
          </div>

          <p className="mt-5 hidden text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#0b0b0b]/45 sm:block">
            {peComparison.moveLab.title}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Long-scroll comparison — traditional P.E. problems, transition beats, then Move Lab solutions. */
export function PulsePeComparisonScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const scrollHeightVh = pulseSectionHeightVh(COMPARISON_RUNWAY_VH);

  const scrollYProgress = usePulseSmoothScrollProgress(sectionRef);

  if (reduceMotion) {
    return (
      <section
        id="pulse-pe-comparison"
        data-pulse-snap
        data-pulse-snap-type="runway"
        className="pulse-snap-start relative border-b border-white/10 bg-[#070909] py-16 sm:py-24"
        aria-label="Traditional P.E. versus Triple Z Kids Move Lab"
      >
        <div className="pulse-container space-y-16">
          <div>
            <h2 className="font-display mb-8 text-[clamp(2rem,6vw,4rem)] uppercase leading-[0.9] text-white">
              Problems with <span className="pulse-accent-text">Traditional P.E.</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {comparisonPairs.map((pair) => (
                <article
                  key={pair.traditional.title}
                  className="overflow-hidden bg-white"
                >
                  <div className="relative aspect-[3/4] min-h-[16rem]">
                    <Image
                      src={pair.traditional.image}
                      alt={pair.traditional.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover grayscale"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#0b0b0b]">{pair.traditional.title}</h3>
                    <p className="mt-1 text-sm text-[#0b0b0b]/70">{pair.traditional.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-[#f2f2f0] p-6 sm:p-10">
            <h2 className="font-display mb-8 text-[clamp(2rem,6vw,4rem)] uppercase leading-[0.9] text-[#0b0b0b]">
              The <span className="pulse-accent-text">difference</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {comparisonPairs.map((pair) => (
                <article
                  key={pair.moveLab.title}
                  className="overflow-hidden rounded-lg border border-black/10 bg-white"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={pair.moveLab.image}
                      alt={pair.moveLab.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#0b0b0b]">{pair.moveLab.title}</h3>
                    <p className="mt-1 text-sm text-[#0b0b0b]/68">{pair.moveLab.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="pulse-pe-comparison"
      data-pulse-snap
      data-pulse-snap-type="runway"
      className="pulse-snap-start relative border-b border-white/10 bg-[#070909]"
      style={{ height: `${scrollHeightVh}vh` }}
      aria-label="Traditional P.E. versus Triple Z Kids Move Lab"
    >
      <div className="sticky top-0 z-[5] flex h-[100svh] min-h-[36rem] w-full items-center overflow-hidden bg-[#070909]">
        <ComparisonStage progress={scrollYProgress} />
      </div>
    </section>
  );
}
