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

type OutcomeColumnProps = {
  outcome: Outcome;
  index: number;
  progress: MotionValue<number>;
};

function OutcomeColumn({ outcome, index, progress }: OutcomeColumnProps) {
  const reduceMotion = useReducedMotion();
  const step = 1 / Math.max(outcomes.length - 1, 1);
  const enterStart = Math.max(0, (index - 1) * step);
  const enterEnd = index * step;

  const top = useTransform(
    progress,
    index === 0 ? [0, 1] : [enterStart, enterEnd],
    index === 0 ? ["0%", "0%"] : ["100%", "0%"],
  );
  const opacity = useTransform(
    progress,
    index === 0 ? [0, 1] : [enterStart, enterEnd],
    index === 0 ? [1, 1] : [0, 1],
  );

  return (
    <div className="relative h-full min-w-0 overflow-hidden">
      <motion.div
        className="absolute inset-x-0 h-full will-change-transform"
        style={reduceMotion ? { top: 0, opacity: 1 } : { top, opacity }}
      >
        <article
          className="group relative h-full overflow-hidden bg-[#111313]"
          aria-label={outcome.title}
        >
          <Image
            src={outcome.image}
            alt={outcome.imageAlt}
            fill
            sizes="20vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/85"
          />
          <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 lg:p-5">
            <span
              className="mb-2 block text-[0.5rem] font-extrabold uppercase tracking-[0.14em] sm:text-[0.6rem]"
              style={{ color: outcome.accent }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-[clamp(0.8rem,2.4vw,2.65rem)] uppercase leading-[0.88] tracking-[0.01em] text-white">
              {outcome.title}
            </h3>
          </div>
        </article>
      </motion.div>
    </div>
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

      <div className="pulse-container relative flex h-full w-full flex-col justify-center py-4 sm:py-6">
        <div className="grid h-[min(90svh,74.4rem)] min-h-[33.8rem] grid-cols-5 gap-1.5 sm:gap-2">
          {outcomes.map((outcome, index) => (
            <OutcomeColumn
              key={outcome.title}
              outcome={outcome}
              index={index}
              progress={progress}
            />
          ))}
        </div>

        <div className="mt-6 hidden items-center justify-between text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/40 sm:flex">
          <span>Scroll to explore</span>
          <span>05 outcomes</span>
        </div>
      </div>
    </>
  );
}

/** Five equal-width photo columns that rise into place one by one while pinned. */
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
        <div className="relative flex min-h-[100svh] items-center">
          <OutcomesStage progress={scrollYProgress} />
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
