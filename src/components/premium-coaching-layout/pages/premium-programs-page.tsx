"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  PremiumConsultationCta,
  PremiumFinalCta,
} from "@/components/premium-coaching-layout/premium-cta-sections";
import { PremiumPageHero } from "@/components/premium-coaching-layout/premium-page-hero";
import { PremiumProgramDiscovery } from "@/components/premium-coaching-layout/premium-program-discovery";
import { PremiumRelatedPrograms } from "@/components/premium-coaching-layout/premium-related-programs";
import { programCategories, type ProgramCategory } from "@/content/programs";

function resolveCategory(value: string | null): ProgramCategory | "all" {
  if (!value) return "all";
  return (programCategories as readonly string[]).includes(value)
    ? (value as ProgramCategory)
    : "all";
}

function PremiumProgramsBody() {
  const searchParams = useSearchParams();
  const category = resolveCategory(searchParams.get("category"));

  return <PremiumProgramDiscovery showViewAll={false} initialCategory={category} />;
}

export function PremiumProgramsPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="Programs"
        title="Find the right Move Lab program for your school"
        description="A world-class fitness and movement center in your school — fully equipped, beautifully designed and expertly managed."
      />
      <Suspense fallback={null}>
        <PremiumProgramsBody />
      </Suspense>
      <PremiumConsultationCta />
      <PremiumRelatedPrograms />
      <PremiumFinalCta />
    </>
  );
}
