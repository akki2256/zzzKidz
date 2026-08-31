"use client";

import type { ReactNode } from "react";
import { PageLayout } from "@/components/theme/page-layout";
import { Suspense } from "react";

type MultiLayoutPageProps = {
  original: ReactNode;
  studio: ReactNode;
  active: ReactNode;
  pulse: ReactNode;
};

/**
 * Renders the variant for the active layout. Studio / Active / Pulse may
 * read search params, so they are wrapped in Suspense.
 */
export function MultiLayoutPage({ original, studio, active, pulse }: MultiLayoutPageProps) {
  return (
    <PageLayout
      variants={{
        original,
        studio: <Suspense fallback={null}>{studio}</Suspense>,
        active: <Suspense fallback={null}>{active}</Suspense>,
        pulse: <Suspense fallback={null}>{pulse}</Suspense>,
      }}
    />
  );
}
