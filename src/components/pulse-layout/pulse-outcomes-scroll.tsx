"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { usePulseSmoothScrollProgress } from "@/hooks/use-pulse-smooth-scroll-progress";
import {
  PULSE_SCROLL_PER_ITEM_VH,
  pulseKeyframeOffsets,
  pulseSectionHeightVh,
} from "@/lib/pulse-scroll";

type Outcome = {
  title: string;
  image: string;
  imageAlt: string;
  accent: string;
};

const outcomes: Outcome[] = [
  {
    title: "Healthier Bodies",
    image: "/images/placeholders/Gemini_Generated_Image_22ywf322ywf322yw.png",
    imageAlt: "Children completing a movement circuit in a Triple Z Kids Move Lab",
    accent: "#13ff72",
  },
  {
    title: "Sharper Minds",
    image: "/images/placeholders/Gemini_Generated_Image_a8murna8murna8mu.png",
    imageAlt: "Children practising supervised gymnastics ring movements",
    accent: "#ff4d67",
  },
  {
    title: "Confident Individuals",
    image: "/images/placeholders/Screenshot 2026-08-24 235314.png",
    imageAlt: "Child confidently completing a supported aerial movement",
    accent: "#b8c2ff",
  },
  {
    title: "Stronger Communities",
    image: "/images/placeholders/Gemini_Generated_Image_d4z7jed4z7jed4z7.png",
    imageAlt: "Children training together across different movement stations",
    accent: "#ffc215",
  },
  {
    title: "A Fitter, Stronger India",
    image: "/images/placeholders/Gemini_Generated_Image_o01s9io01s9io01s.png",
    imageAlt: "Children smiling together during a Move Lab training session",
    accent: "#13ff72",
  },
];

const SCROLL_RUNWAY_VH =
  Math.max(outcomes.length - 1, 1) * PULSE_SCROLL_PER_ITEM_VH;

type OutcomePanelProps = {
  outcome: Outcome;
  index: number;
  progress: MotionValue<number>;
  sizes: string;
};

function OutcomePanel({ outcome, index, progress, sizes }: OutcomePanelProps) {
  const reduceMotion = useReducedMotion();
  const step = 1 / Math.max(outcomes.length - 1, 1);
  const enterStart = Math.max(0, (index - 1) * step);
  const enterEnd = index * step;

  const top = useTransform(
    progress,
    pulseKeyframeOffsets(index === 0 ? [0, 1] : [enterStart, enterEnd]),
    index === 0 ? ["0%", "0%"] : ["100%", "0%"],
  );
  const opacity = useTransform(
    progress,
    pulseKeyframeOffsets(index === 0 ? [0, 1] : [enterStart, enterEnd]),
    index === 0 ? [1, 1] : [0, 1],
  );

  return (
    <motion.article
      className="absolute inset-0 overflow-hidden bg-[#111313]"
      style={reduceMotion ? { top: 0, opacity: 1 } : { top, opacity }}
      aria-label={outcome.title}
    >
      <Image
        src={outcome.image}
        alt={outcome.imageAlt}
        fill
        sizes={sizes}
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/85"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-5">
        <span
          className="mb-2 block text-[0.65rem] font-extrabold uppercase tracking-[0.16em] sm:text-[0.7rem]"
          style={{ color: outcome.accent }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-[clamp(1.7rem,7vw,2.65rem)] uppercase leading-[0.92] tracking-[0.01em] text-white lg:text-[clamp(0.95rem,2.2vw,2.65rem)]">
          {outcome.title}
        </h3>
      </div>
    </motion.article>
  );
}

type OutcomesStageProps = {
  progress: MotionValue<number>;
};

function OutcomesStage({ progress }: OutcomesStageProps) {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(19,255,114,0.12),transparent_32%),linear-gradient(180deg,#070909_0%,rgba(7,9,9,0.76)_42%,#070909_100%)]"
      />

      <div className="pulse-container relative flex h-full w-full flex-col justify-center pb-5 pt-[calc(4.75rem+0.5rem)] sm:pb-6 sm:pt-[calc(5rem+0.75rem)]">
        <p className="pulse-eyebrow mb-3 shrink-0 text-white/50 lg:mb-4">
          What movement builds
        </p>

        {/* Mobile + tablet: one full-width outcome at a time */}
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl lg:hidden">
          {outcomes.map((outcome, index) => (
            <OutcomePanel
              key={outcome.title}
              outcome={outcome}
              index={index}
              progress={progress}
              sizes="100vw"
            />
          ))}
        </div>

        {/* Desktop: five equal columns */}
        <div className="hidden h-[min(78svh,62rem)] min-h-[28rem] grid-cols-5 gap-2 lg:grid">
          {outcomes.map((outcome, index) => (
            <div key={outcome.title} className="relative min-w-0 overflow-hidden">
              <OutcomePanel
                outcome={outcome}
                index={index}
                progress={progress}
                sizes="20vw"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/40 sm:mt-5">
          <span>Scroll to explore</span>
          <span>05 outcomes</span>
        </div>
      </div>
    </>
  );
}

/** Photo outcomes — full-bleed on mobile, five-column runway on desktop. */
export function PulseOutcomesScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const scrollHeightVh = pulseSectionHeightVh(SCROLL_RUNWAY_VH);

  const scrollYProgress = usePulseSmoothScrollProgress(sectionRef);

  if (reduceMotion) {
    return (
      <section
        id="pulse-outcomes"
        className="pulse-snap-start relative border-b border-white/10 bg-[#070909] py-16 sm:py-24"
        data-pulse-snap
        data-pulse-snap-type="runway"
        aria-label="Movement outcomes"
      >
        <div className="pulse-container">
          <p className="pulse-eyebrow text-white/50">What movement builds</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {outcomes.map((outcome, index) => (
              <article
                key={outcome.title}
                className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#111313] sm:aspect-[3/4]"
                aria-label={outcome.title}
              >
                <Image
                  src={outcome.image}
                  alt={outcome.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span
                    className="mb-1 block text-[0.65rem] font-extrabold uppercase tracking-[0.16em]"
                    style={{ color: outcome.accent }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl uppercase leading-[0.92] text-white">
                    {outcome.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="pulse-outcomes"
      data-pulse-snap
      data-pulse-snap-type="runway"
      className="pulse-snap-start relative border-b border-white/10 bg-[#070909]"
      style={{ height: `${scrollHeightVh}vh` }}
      aria-label="Movement outcomes"
    >
      <div className="sticky top-0 z-[1] flex h-[100svh] min-h-[36rem] w-full items-center overflow-hidden bg-[#070909]">
        <OutcomesStage progress={scrollYProgress} />
      </div>
    </section>
  );
}
