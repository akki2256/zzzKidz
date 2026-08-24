"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { CtaLink } from "@/components/shared/cta-link";
import { siteConfig } from "@/content/site";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CtaBandProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function CtaBand({
  title = "Partner With Us. Transform Together.",
  description = "We take care of everything. You see the difference. Let's build active kids, confident minds and a stronger tomorrow.",
  className,
}: CtaBandProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className={cn("py-0", className)}>
      <div className="relative overflow-hidden border-y border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,46,0.35),transparent_55%),linear-gradient(180deg,#0a0a0c,#050506)]"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
          animate={reduceMotion ? undefined : { x: [0, 40, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <Container className="relative z-10 flex flex-col items-center gap-8 px-6 py-20 text-center sm:py-24">
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: easeOutExpo }}
          >
            Next Step
          </motion.p>
          <motion.h2
            className="max-w-4xl font-display text-4xl uppercase sm:text-5xl lg:text-6xl"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOutExpo }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="max-w-2xl text-base font-medium text-foreground-muted sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, delay: 0.16, ease: easeOutExpo }}
          >
            {description}
          </motion.p>
          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, delay: 0.24, ease: easeOutExpo }}
          >
            <CtaLink href={siteConfig.cta.primaryHref} size="xl">
              {siteConfig.cta.primary}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </CtaLink>
            <CtaLink href="/programs" variant="secondary" size="xl">
              {siteConfig.cta.secondary}
            </CtaLink>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
