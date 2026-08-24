"use client";

import { Suspense } from "react";
import type { ReactNode } from "react";
import { PageLayout } from "@/components/theme/page-layout";

type MultiLayoutPageProps = {
  original: ReactNode;
  premium: ReactNode;
  studio: ReactNode;
};

/**
 * Renders the variant for the active layout. Premium and Studio variants read
 * search params for program filtering, so they are wrapped in Suspense.
 */
export function MultiLayoutPage({ original, premium, studio }: MultiLayoutPageProps) {
  return (
    <PageLayout
      variants={{
        original,
        premium: <Suspense fallback={null}>{premium}</Suspense>,
        studio: <Suspense fallback={null}>{studio}</Suspense>,
      }}
    />
  );
}
