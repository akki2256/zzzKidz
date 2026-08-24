"use client";

import {
  Activity,
  Brain,
  ClipboardCheck,
  Dumbbell,
  Heart,
  School,
  Shield,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/lib/media";

const iconMap: Record<string, LucideIcon> = {
  strength: Dumbbell,
  mind: Brain,
  heart: Heart,
  shield: Shield,
  users: Users,
  spark: Sparkles,
  target: Target,
  activity: Activity,
  school: School,
  clipboard: ClipboardCheck,
};

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: keyof typeof iconMap;
  index?: string;
  className?: string;
  tone?: "dark" | "light";
  image?: SiteImage;
};

export function FeatureCard({
  title,
  description,
  icon = "spark",
  index,
  className,
  tone = "dark",
  image,
}: FeatureCardProps) {
  const Icon = iconMap[icon] ?? Sparkles;
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={cn(
        "card-shine group relative flex h-full min-h-[17.5rem] flex-col overflow-hidden rounded-xl border",
        tone === "dark"
          ? "border-border bg-background-elevated/80 hover:border-accent/50 hover:shadow-[var(--shadow-glow)]"
          : "border-border-dark bg-surface-white hover:border-accent/40 hover:shadow-[var(--shadow-soft)]",
        className,
      )}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
              transition: { type: "spring", stiffness: 420, damping: 26 },
            }
      }
    >
      {image ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="320px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <motion.span
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full",
              tone === "dark" ? "bg-accent-soft text-accent" : "bg-accent text-white",
            )}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </motion.span>
          {index ? (
            <span className="text-sm font-bold tabular-nums text-foreground-muted">{index}</span>
          ) : null}
        </div>

        <h3
          className={cn(
            "font-heading min-h-[3.25rem] text-lg uppercase leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-accent",
            tone === "dark" ? "text-foreground" : "text-foreground-inverse",
          )}
        >
          {title}
        </h3>

        <p
          className={cn(
            "mt-3 flex-1 min-h-[4.5rem] text-base font-medium leading-relaxed line-clamp-4",
            tone === "dark" ? "text-foreground-muted" : "text-foreground-inverse-muted",
          )}
        >
          {description}
        </p>
      </div>
    </motion.article>
  );
}
