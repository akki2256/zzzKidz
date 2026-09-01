"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { usePulseSmoothScrollProgress } from "@/hooks/use-pulse-smooth-scroll-progress";
import { mediaPath } from "@/lib/media";
import {
  PULSE_SCROLL_LONG_LIST_VH,
  pulseFocusSpread,
  pulseKeyframeOffsets,
  pulseSectionHeightVh,
} from "@/lib/pulse-scroll";

type Activity = {
  title: string;
  image: string;
  imageAlt: string;
};

const activities: Activity[] = [
  {
    title: "Calisthenics",
    image: mediaPath("Screenshot 2026-08-24 234955.png"),
    imageAlt: "Student strength training session in a Move Lab",
  },
  {
    title: "Functional Training",
    image: mediaPath("Screenshot 2026-08-24 234918.png"),
    imageAlt: "Functional fitness activity in a Move Lab",
  },
  {
    title: "Gymnastics Rings",
    image: mediaPath("Screenshot 2026-08-24 235036.png"),
    imageAlt: "Gymnastics rings training with coach support",
  },
  {
    title: "Trampoline Training",
    image: mediaPath("Screenshot 2026-08-24 235118.png"),
    imageAlt: "Trampoline rebound training session",
  },
  {
    title: "Pilates",
    image: mediaPath("Screenshot 2026-08-24 235211.png"),
    imageAlt: "Pilates and core stability session",
  },
  {
    title: "Hammock Fitness",
    image: mediaPath("Screenshot 2026-08-24 235314.png"),
    imageAlt: "Student completing a supported aerial movement",
  },
  {
    title: "Agility",
    image: mediaPath("Screenshot 2026-08-24 235240.png"),
    imageAlt: "Student agility ladder drill",
  },
  {
    title: "Speed",
    image: mediaPath("Screenshot 2026-08-24 234908.png"),
    imageAlt: "Student sprinting through an agility course",
  },
  {
    title: "Mobility",
    image: mediaPath("Screenshot 2026-08-24 235026.png"),
    imageAlt: "Student flexibility and mobility work",
  },
  {
    title: "Flexibility",
    image: mediaPath("Screenshot 2026-08-24 234938.png"),
    imageAlt: "Student balance and body control exercise",
  },
  {
    title: "Fun Games",
    image: mediaPath("Screenshot 2026-08-24 234946.png"),
    imageAlt: "Move Lab group activity and games",
  },
  {
    title: "Team Activities",
    image: mediaPath("Screenshot 2026-08-24 235357.png"),
    imageAlt: "Team activity and social connection in the Move Lab",
  },
  {
    title: "Mindfulness",
    image: mediaPath("Screenshot 2026-08-24 235109.png"),
    imageAlt: "Student focus and concentration during training",
  },
  {
    title: "Stretching",
    image: mediaPath("Screenshot 2026-08-24 235003.png"),
    imageAlt: "Move Lab coaching and supervised stretching",
  },
];

/** Tight row rhythm — single line titles with minimal gap. */
const TEXT_ITEM_HEIGHT = 76;
const TEXT_ITEM_GAP = 0;
const TEXT_ROW_STRIDE = TEXT_ITEM_HEIGHT + TEXT_ITEM_GAP;

/** Image card sizing — active card centred in the viewport column. */
const IMAGE_ITEM_HEIGHT = 440;
const IMAGE_GAP = 16;

/** Match homepage scroll pacing — one viewport step per activity transition. */
const SCROLL_RUNWAY_VH = Math.max(activities.length - 1, 1) * PULSE_SCROLL_LONG_LIST_VH;

/** Narrow band — one dominant active title at a time. */
const focusSpread = pulseFocusSpread(activities.length, 0.36);

function useViewportHeight(ref: RefObject<HTMLDivElement | null>) {
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

type ActivityNameProps = {
  title: string;
  index: number;
  progress: MotionValue<number>;
};

function ActivityName({ title, index, progress }: ActivityNameProps) {
  const reduceMotion = useReducedMotion();
  const steps = activities.length - 1;
  const center = steps === 0 ? 0 : index / steps;

  const opacity = useTransform(
    progress,
    pulseKeyframeOffsets([
      center - focusSpread,
      center - focusSpread * 0.28,
      center,
      center + focusSpread * 0.28,
      center + focusSpread,
    ]),
    [0.1, 0.32, 1, 0.32, 0.1],
  );
  const scale = useTransform(
    progress,
    pulseKeyframeOffsets([center - focusSpread, center, center + focusSpread]),
    [0.94, 1.06, 0.94],
  );
  const x = useTransform(
    progress,
    pulseKeyframeOffsets([center - focusSpread, center, center + focusSpread]),
    [0, 12, 0],
  );

  return (
    <div
      className="flex shrink-0 items-center overflow-hidden"
      style={{ height: TEXT_ITEM_HEIGHT, marginBottom: TEXT_ITEM_GAP }}
    >
      <motion.h3
        className="max-w-full text-balance text-left text-[clamp(1.4rem,3vw,3rem)] font-medium leading-[1] tracking-tight text-white"
        style={
          reduceMotion
            ? { opacity: index === 0 ? 1 : 0.18, x: 0, scale: 1 }
            : { opacity, x, scale }
        }
      >
        {title}
      </motion.h3>
    </div>
  );
}

type ActivityImageProps = {
  activity: Activity;
  index: number;
  progress: MotionValue<number>;
};

function ActivityImageCard({ activity, index, progress }: ActivityImageProps) {
  const reduceMotion = useReducedMotion();
  const steps = activities.length - 1;
  const center = steps === 0 ? 0 : index / steps;

  const scale = useTransform(
    progress,
    pulseKeyframeOffsets([
      center - focusSpread,
      center - focusSpread * 0.35,
      center,
      center + focusSpread * 0.35,
      center + focusSpread,
    ]),
    [0.92, 0.96, 1, 0.96, 0.92],
  );
  const cardOpacity = useTransform(
    progress,
    pulseKeyframeOffsets([
      center - focusSpread,
      center - focusSpread * 0.35,
      center,
      center + focusSpread * 0.35,
      center + focusSpread,
    ]),
    [0.38, 0.62, 1, 0.62, 0.38],
  );
  const overlayOpacity = useTransform(
    progress,
    pulseKeyframeOffsets([center - focusSpread, center, center + focusSpread]),
    [0.62, 0, 0.62],
  );

  return (
    <motion.article
      className="relative w-full shrink-0 overflow-hidden rounded-3xl bg-[#111313]"
      style={{
        height: IMAGE_ITEM_HEIGHT,
        marginBottom: IMAGE_GAP,
        scale: reduceMotion ? 1 : scale,
        opacity: reduceMotion ? (index === 0 ? 1 : 0.38) : cardOpacity,
      }}
      aria-label={activity.title}
    >
      <Image
        src={activity.image}
        alt={activity.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 46vw"
        className="object-cover"
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent"
        style={reduceMotion ? undefined : { opacity: overlayOpacity }}
      />
      <p className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm md:hidden">
        {activity.title}
      </p>
    </motion.article>
  );
}

type ActivitiesStageProps = {
  progress: MotionValue<number>;
};

function ActivitiesStage({ progress }: ActivitiesStageProps) {
  const reduceMotion = useReducedMotion();
  const steps = activities.length - 1;
  const imageStride = IMAGE_ITEM_HEIGHT + IMAGE_GAP;

  const listViewportRef = useRef<HTMLDivElement>(null);
  const imageViewportRef = useRef<HTMLDivElement>(null);
  const listViewportH = useViewportHeight(listViewportRef);
  const imageViewportH = useViewportHeight(imageViewportRef);

  const listStart = listViewportH / 2 - TEXT_ITEM_HEIGHT / 2;
  const listEnd = listViewportH / 2 - (steps * TEXT_ROW_STRIDE + TEXT_ITEM_HEIGHT / 2);
  const imageStart = imageViewportH / 2 - IMAGE_ITEM_HEIGHT / 2;
  const imageEnd = imageViewportH / 2 - (steps * imageStride + IMAGE_ITEM_HEIGHT / 2);

  const listY = useTransform(progress, [0, 1], [listStart, listEnd]);
  const imagesY = useTransform(progress, [0, 1], [imageStart, imageEnd]);

  return (
    <div className="pulse-container flex h-full w-full flex-col justify-center py-8 sm:py-10">
      <div className="grid h-[min(88svh,52rem)] min-h-[30rem] grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
        <div className="relative hidden h-full min-h-0 flex-col md:flex">
          <p className="pulse-eyebrow mb-6 shrink-0 text-white/55">Activities we offer</p>

          <div className="relative min-h-0 flex-1">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#070909] to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#070909] to-transparent"
            />

            <div ref={listViewportRef} className="relative h-full overflow-hidden">
              <motion.div
                className="will-change-transform"
                style={reduceMotion ? { y: listStart || 0 } : { y: listY }}
              >
                {activities.map((activity, index) => (
                  <ActivityName
                    key={activity.title}
                    title={activity.title}
                    index={index}
                    progress={progress}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="relative flex h-full min-h-0 flex-col">
          <p className="pulse-eyebrow mb-4 shrink-0 text-white/55 md:hidden">
            Activities we offer
          </p>

          <div className="relative min-h-0 flex-1">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[#070909] to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[#070909] to-transparent"
            />

            <div ref={imageViewportRef} className="relative h-full overflow-hidden">
              <motion.div
                className="will-change-transform"
                style={reduceMotion ? { y: imageStart || 0 } : { y: imagesY }}
              >
                {activities.map((activity, index) => (
                  <ActivityImageCard
                    key={activity.title}
                    activity={activity}
                    index={index}
                    progress={progress}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 hidden items-center justify-between text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/40 sm:flex">
        <span>Scroll to explore</span>
        <span>{String(activities.length).padStart(2, "0")} activities</span>
      </div>
    </div>
  );
}

/** Scroll-locked activities showcase — names on the left, images on the right. */
export function PulseActivitiesScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const scrollHeightVh = pulseSectionHeightVh(SCROLL_RUNWAY_VH);

  const scrollYProgress = usePulseSmoothScrollProgress(sectionRef);

  if (reduceMotion) {
    return (
      <section
        id="pulse-activities"
        data-pulse-snap
        data-pulse-snap-type="runway"
        className="pulse-snap-start relative border-b border-white/10 bg-[#070909] py-16 sm:py-24"
        aria-label="Activities we offer"
      >
        <div className="relative flex min-h-[100svh] items-center">
          <ActivitiesStage progress={scrollYProgress} />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="pulse-activities"
      data-pulse-snap
      data-pulse-snap-type="runway"
      className="pulse-snap-start relative border-b border-white/10 bg-[#070909]"
      style={{ height: `${scrollHeightVh}vh` }}
      aria-label="Activities we offer"
    >
      <div className="sticky top-0 z-20 flex h-[100svh] min-h-[30rem] w-full items-center bg-[#070909]">
        <ActivitiesStage progress={scrollYProgress} />
      </div>
    </section>
  );
}
