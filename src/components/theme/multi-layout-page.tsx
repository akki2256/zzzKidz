"use client";

import type { ReactNode } from "react";
import { PageLayout } from "@/components/theme/page-layout";
import { Suspense } from "react";

type MultiLayoutPageProps = {
  original: ReactNode;
  pulse: ReactNode;
  noir: ReactNode;
};

/**
 * Renders the variant for the active layout. Pulse / Noir may read search
 * params, so they are wrapped in Suspense.
 */
export function MultiLayoutPage({ original, pulse, noir }: MultiLayoutPageProps) {
  return (
    <PageLayout
      variants={{
        original,
        pulse: <Suspense fallback={null}>{pulse}</Suspense>,
        noir: <Suspense fallback={null}>{noir}</Suspense>,
      }}
    />
  );
}
