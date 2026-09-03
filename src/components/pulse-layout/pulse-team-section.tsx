"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "framer-motion";
import { useCallback, useId, useRef, useState } from "react";
import { usePulseSmoothScrollProgress } from "@/hooks/use-pulse-smooth-scroll-progress";
import { mediaPath } from "@/lib/media";
import { springSoft } from "@/lib/motion";
import {
  pulseKeyframeOffsets,
  pulsePhaseBounds,
  pulseSectionHeightVh,
} from "@/lib/pulse-scroll";

type TeamMember = {
  name: string;
  role: string;
  description: string;
  image: string;
  imageAlt: string;
};

/** Placeholder profiles for layout preview — not real staff. */
const teamMembers: TeamMember[] = [
  {
    name: "Aarav Mehta",
    role: "Programme Director",
    description:
      "Shapes the Move Lab curriculum so every school session builds strength, skill and confidence in a clear weekly rhythm.",
    image: mediaPath("Screenshot 2026-08-24 234730.png"),
    imageAlt: "Portrait placeholder for Aarav Mehta",
  },
  {
    name: "Diya Sharma",
    role: "Head Coach",
    description:
      "Leads on-floor coaching, safety standards and coach mentoring so children stay engaged and properly supervised.",
    image: mediaPath("Screenshot 2026-08-24 234746.png"),
    imageAlt: "Portrait placeholder for Diya Sharma",
  },
  {
    name: "Kabir Rao",
    role: "School Partnerships",
    description:
      "Works with principals and PE teams on space, timetable and rollout so the lab fits how the school already operates.",
    image: mediaPath("Screenshot 2026-08-24 235337.png"),
    imageAlt: "Portrait placeholder for Kabir Rao",
  },
  {
    name: "Meera Iyer",
    role: "Curriculum Lead",
    description:
      "Designs age-wise progressions across rings, agility, mobility and games so skills build term after term.",
    image: mediaPath("Screenshot 2026-08-24 235137.png"),
    imageAlt: "Portrait placeholder for Meera Iyer",
  },
  {
    name: "Rohan Kapoor",
    role: "Operations Lead",
    description:
      "Coordinates equipment, installation and ongoing support so the lab stays ready for every class of the week.",
    image: mediaPath("Screenshot 2026-08-24 235413.png"),
    imageAlt: "Portrait placeholder for Rohan Kapoor",
  },
];

const STACK_TINTS = ["#111111", "#f4f4f0", "#d9ffe8", "#ffffff", "#ecece8"] as const;
const THROW_DISTANCE = 140;
const THROW_VELOCITY = 720;

const TEAM_TITLE_VH = 40;
const TEAM_REVEAL_VH = 72;
const TEAM_RUNWAY_VH = TEAM_TITLE_VH + TEAM_REVEAL_VH;
const [, TITLE_END] = pulsePhaseBounds([TEAM_TITLE_VH, TEAM_REVEAL_VH]);
const TITLE_RANGE = pulseKeyframeOffsets([0, TITLE_END]);

function stackPose(depth: number) {
  const swings = [0, -8, 7, -5, 10];
  return {
    x: depth === 0 ? 0 : depth % 2 === 0 ? 16 : -18,
    y: depth * 8,
    rotate: swings[depth] ?? depth * 3,
    scale: 1 - Math.min(depth, 4) * 0.03,
    opacity: depth > 3 ? 0 : 1,
  };
}

function wasThrown(info: PanInfo) {
  const distance = Math.hypot(info.offset.x, info.offset.y);
  const speed = Math.hypot(info.velocity.x, info.velocity.y);
  return distance > THROW_DISTANCE || speed > THROW_VELOCITY;
}

type TeamCardProps = {
  member: TeamMember;
  depth: number;
  isFront: boolean;
  reduceMotion: boolean | null;
  onThrow: () => void;
};

function TeamCard({ member, depth, isFront, reduceMotion, onThrow }: TeamCardProps) {
  const dragOrigin = useRef({ x: 0, y: 0 });
  const [touchedOpen, setTouchedOpen] = useState(false);
  const expanded = Boolean(reduceMotion || (isFront && touchedOpen));

  return (
    <motion.article
      layout={false}
      className={`pulse-team-card group absolute inset-0 cursor-grab touch-none overflow-hidden rounded-[1.35rem] active:cursor-grabbing sm:rounded-[1.75rem] ${
        expanded ? "is-open" : ""
      }`}
      style={{
        zIndex: teamMembers.length - depth,
        background: isFront ? "#0a0a0a" : STACK_TINTS[depth] ?? "#f4f4f0",
        boxShadow:
          "0 28px 60px rgba(0,0,0,0.38), inset 0 0 0 1px rgba(255,255,255,0.08)",
      }}
      drag={Boolean(isFront && !reduceMotion)}
      dragListener={isFront}
      dragElastic={0.18}
      dragSnapToOrigin={!isFront}
      whileTap={isFront ? { cursor: "grabbing", scale: 1.015 } : undefined}
      initial={false}
      animate={stackPose(depth)}
      transition={springSoft}
      onDragStart={(_, info) => {
        dragOrigin.current = { x: info.point.x, y: info.point.y };
      }}
      onDragEnd={(_, info) => {
        const moved = Math.hypot(info.offset.x, info.offset.y);
        if (wasThrown(info)) {
          setTouchedOpen(false);
          onThrow();
          return;
        }
        if (moved < 10 && isFront) {
          setTouchedOpen((open) => !open);
        }
      }}
      aria-label={`${member.name}, ${member.role}. ${member.description}`}
      aria-expanded={isFront ? expanded : undefined}
    >
      <Image
        src={member.image}
        alt={member.imageAlt}
        fill
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 540px"
        className="object-cover"
        draggable={false}
        priority={isFront}
      />

      {isFront ? (
        <div className="pulse-team-ribbon absolute inset-x-0 bottom-0 px-5 pb-6 pt-12 sm:px-7 sm:pb-8 sm:pt-14">
          <h3 className="overflow-visible font-display text-[clamp(1.35rem,5.5vw,2.2rem)] uppercase leading-[1.05] tracking-[0.02em] text-white pt-[0.16em] pb-[0.2em] [text-shadow:0_2px_12px_rgba(0,0,0,0.85)]">
            {member.name}
          </h3>
          <div className="pulse-team-ribbon-copy">
            <p className="text-left text-[0.78rem] leading-relaxed text-white/90 sm:text-[0.9rem]">
              <span className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[var(--p-accent)]">
                {member.role}
              </span>
              {member.description}
            </p>
          </div>
        </div>
      ) : null}
    </motion.article>
  );
}

function TeamDeck() {
  const reduceMotion = useReducedMotion();
  const [order, setOrder] = useState(() => teamMembers.map((_, index) => index));

  const sendFrontToBack = useCallback(() => {
    setOrder((current) => {
      if (current.length < 2) return current;
      return [...current.slice(1), current[0]];
    });
  }, []);

  return (
    <div className="pulse-team-deck relative mx-auto" data-lenis-prevent="">
      {order.map((memberIndex, depth) => (
        <TeamCard
          key={teamMembers[memberIndex].name}
          member={teamMembers[memberIndex]}
          depth={depth}
          isFront={depth === 0}
          reduceMotion={reduceMotion}
          onThrow={sendFrontToBack}
        />
      ))}
    </div>
  );
}

type TeamStageProps = {
  progress: MotionValue<number>;
};

function TeamStage({ progress }: TeamStageProps) {
  const reduceMotion = useReducedMotion();
  const headingId = useId();
  const titleLeft = useTransform(progress, TITLE_RANGE, ["50%", "0%"]);
  const titleTop = useTransform(progress, TITLE_RANGE, ["50%", "0%"]);
  const titleX = useTransform(progress, TITLE_RANGE, ["-50%", "0%"]);
  const titleY = useTransform(progress, TITLE_RANGE, ["-50%", "0%"]);
  const titleScale = useTransform(progress, TITLE_RANGE, [1, 0.52]);
  const deckOpacity = useTransform(progress, TITLE_RANGE, [0, 1]);
  const deckY = useTransform(progress, TITLE_RANGE, ["10%", "0%"]);
  const deckPointer = useTransform(progress, (value) => (value >= TITLE_END - 0.04 ? "auto" : "none"));

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#070909]">
      <div className="pulse-container relative h-full">
        <div className="absolute inset-x-0 bottom-0 top-[4.75rem] sm:top-[5rem]">
          <motion.div
            className="pointer-events-none absolute z-[3] w-max max-w-[min(100%,22rem)] origin-top-left pt-[0.14em] text-left sm:max-w-xl"
            style={
              reduceMotion
                ? { left: "0%", top: "0%", x: 0, y: 0, scale: 0.62 }
                : { left: titleLeft, top: titleTop, x: titleX, y: titleY, scale: titleScale }
            }
          >
            <p className="pulse-eyebrow mb-2 text-white/50 sm:mb-3">Our team</p>
            <h2
              id={headingId}
              className="font-display uppercase leading-[0.92] tracking-[0.01em] text-white text-[clamp(2rem,7vw,5rem)]"
            >
              The people behind <span className="pulse-accent-text">the lab</span>
            </h2>
          </motion.div>

          <motion.div
            className="flex h-full items-end justify-center pb-8 pt-[min(5.25rem,16vw)] sm:pb-10 sm:pt-[min(6rem,11vw)]"
            style={
              reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: deckOpacity, y: deckY, pointerEvents: deckPointer }
            }
          >
            <TeamDeck />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/** Title parks from center like PE, then the team deck fills the remaining viewport. */
export function PulseTeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const headingId = useId();
  const scrollYProgress = usePulseSmoothScrollProgress(sectionRef);
  const scrollHeightVh = pulseSectionHeightVh(TEAM_RUNWAY_VH);

  if (reduceMotion) {
    return (
      <section
        id="pulse-team"
        className="relative border-t border-white/10 bg-[#070909] py-14 sm:py-24"
        aria-labelledby={headingId}
      >
        <div className="pulse-container text-center">
          <p className="pulse-eyebrow text-white/50">Our team</p>
          <h2 id={headingId} className="pulse-how-heading mx-auto mt-3 max-w-2xl text-white">
            The people behind <span className="pulse-accent-text">the lab</span>
          </h2>
          <div className="mt-10 flex justify-center">
            <TeamDeck />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="pulse-team"
      data-pulse-snap
      data-pulse-snap-type="runway"
      className="pulse-snap-start relative border-t border-white/10 bg-[#070909]"
      style={{ height: `${scrollHeightVh}vh` }}
      aria-label="Our team"
    >
      <div className="sticky top-0 z-[1] h-[100svh] max-h-[100svh] w-full overflow-hidden">
        <TeamStage progress={scrollYProgress} />
      </div>
    </section>
  );
}
