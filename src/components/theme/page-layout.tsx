"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useLayout } from "@/components/theme/layout-provider";
import { easeOutExpo } from "@/lib/motion";
import type { SiteLayout } from "@/lib/layout/types";

type PageLayoutProps = {
  variants: Record<SiteLayout, ReactNode>;
};

export function PageLayout({ variants }: PageLayoutProps) {
  const { layout } = useLayout();
  const reduceMotion = useReducedMotion();
  const active = variants[layout];

  if (reduceMotion) {
    return <>{active}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={layout}
        initial={{ opacity: 1, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.28, ease: easeOutExpo }}
      >
        {active}
      </motion.div>
    </AnimatePresence>
  );
}
