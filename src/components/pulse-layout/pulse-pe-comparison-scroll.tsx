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
  PULSE_BEAT_VH,
  PULSE_GRID_PHASE_VH,
  PULSE_PE_TITLE_VH,
  pulseBeatWindow,
  pulseItemWindow,
  pulseKeyframeOffsets,
  pulsePhaseBounds,
  pulsePhaseFadeEdge,
  pulseSectionHeightVh,
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

/** Title beat, problems grid, transition headlines, then solutions. */
const COMPARISON_RUNWAY_VH =
  PULSE_PE_TITLE_VH +
  PULSE_GRID_PHASE_VH +
  transitionBeats.length * PULSE_BEAT_VH +
  PULSE_GRID_PHASE_VH;

const [TITLE_START, TITLE_END, PROBLEMS_END, TRANSITION_END, SOLUTIONS_END] = pulsePhaseBounds([
  PULSE_PE_TITLE_VH,
  PULSE_GRID_PHASE_VH,
  transitionBeats.length * PULSE_BEAT_VH,
  PULSE_GRID_PHASE_VH,
]);

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
        <div className="relative min-h-[12rem] flex-1 overflow-hidden sm:min-h-[16rem] lg:min-h-[26rem]">
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

        <div className="flex shrink-0 flex-col gap-1.5 bg-white p-4 sm:gap-2 sm:p-5 lg:p-6">
          <div className="flex items-start gap-2">
            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#0b0b0b]" aria-hidden />
            <h3 className="text-[clamp(0.9rem,1.8vw,1.2rem)] font-bold leading-tight text-[#0b0b0b]">
              {point.title}
            </h3>
          </div>
          <p className="pl-6 text-[clamp(0.78rem,1.25vw,0.95rem)] leading-snug text-[#0b0b0b]/70">
            {point.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

type TransitionBeatProps = {
  beatIndex: number;
  progress: MotionValue<number>;
};

function TransitionBeat({ beatIndex, progress }: TransitionBeatProps) {
  const reduceMotion = useReducedMotion();
  const beatCount = transitionBeats.length;
  const transitionSpan = TRANSITION_END - PROBLEMS_END;
  const beatSpan = transitionSpan / beatCount;
  const beatStart = PROBLEMS_END + beatIndex * beatSpan;
  const beatEnd = beatStart + beatSpan;
  const { fadeIn, holdStart, holdEnd, fadeOut } = pulseBeatWindow(beatStart, beatEnd);

  const opacity = useTransform(
    progress,
    pulseKeyframeOffsets([beatStart, fadeIn, holdStart, holdEnd, fadeOut, beatEnd]),
    [0, 0.5, 1, 1, 0.5, 0],
  );
  const y = useTransform(
    progress,
    pulseKeyframeOffsets([beatStart, fadeIn, holdEnd, beatEnd]),
    ["12%", "0%", "0%", "-8%"],
  );

  const beat = transitionBeats[beatIndex];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6"
      style={reduceMotion ? { opacity: beatIndex === 1 ? 1 : 0, y: 0 } : { opacity, y }}
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
  const titleTop = useTransform(progress, titleRange, ["50%", "12%"]);
  const titleX = useTransform(progress, titleRange, ["-50%", "0%"]);
  const titleY = useTransform(progress, titleRange, ["-50%", "0%"]);
  const titleScale = useTransform(progress, titleRange, [1, 0.56]);
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
  const scrollHintOpacity = useTransform(
    progress,
    pulseKeyframeOffsets([revealEnd, PROBLEMS_END, TRANSITION_END, TRANSITION_END + solutionsFade]),
    [0, 1, 1, 0],
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
          <motion.h2
            className="font-display pointer-events-none absolute z-[3] w-max max-w-full origin-top-left uppercase leading-[0.92] tracking-[0.01em] text-white text-[clamp(2rem,7vw,5rem)]"
            style={
              reduceMotion
                ? { left: "0%", top: "12%", x: 0, y: 0, scale: 0.56 }
                : { left: titleLeft, top: titleTop, x: titleX, y: titleY, scale: titleScale }
            }
          >
            Problems with <span className="pulse-accent-text">Traditional P.E.</span>
          </motion.h2>

          <motion.div
            className="flex h-full flex-col justify-end pb-6 pt-[min(16vh,8.5rem)] sm:justify-end sm:pb-8 sm:pt-[min(18vh,9.5rem)]"
            style={reduceMotion ? { opacity: 1, y: 0 } : { opacity: gridOpacity, y: gridY }}
          >
            <div className="grid min-h-[min(52svh,28rem)] grid-cols-2 gap-3 overflow-visible sm:gap-4 lg:min-h-[min(74svh,48rem)] lg:grid-cols-4">
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
      </motion.div>

      {/* Transition headlines */}
      <div className="pointer-events-none absolute inset-0 z-[2]">
        {transitionBeats.map((_, index) => (
          <TransitionBeat key={transitionBeats[index].lines[0].text} beatIndex={index} progress={progress} />
        ))}
      </div>

      {/* Solutions — Move Lab */}
      <motion.div
        className="absolute inset-0 flex flex-col"
        style={reduceMotion ? { opacity: 0, pointerEvents: "none" } : { opacity: solutionsOpacity }}
      >
        <div className="pulse-container flex flex-1 flex-col justify-center py-6 sm:py-8">
          <div className="overflow-hidden">
            <h2 className="font-display mb-6 text-[clamp(2rem,6vw,4.5rem)] uppercase leading-[0.9] text-[#0b0b0b] sm:mb-8">
              The <span className="pulse-accent-text">difference</span>
            </h2>
          </div>

          <div className="grid min-h-[min(62svh,40rem)] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
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

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-between px-6 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/35 sm:flex sm:px-10"
        style={reduceMotion ? undefined : { opacity: scrollHintOpacity }}
      >
        <span>Scroll to compare</span>
        <span>04 points</span>
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
