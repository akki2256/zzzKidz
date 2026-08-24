import { Suspense } from "react";
import { PremiumCoachCards } from "@/components/premium-coaching-layout/premium-coach-cards";
import {
  PremiumConsultationCta,
  PremiumFinalCta,
} from "@/components/premium-coaching-layout/premium-cta-sections";
import { PremiumHero } from "@/components/premium-coaching-layout/premium-hero";
import { PremiumProgramDiscovery } from "@/components/premium-coaching-layout/premium-program-discovery";
import { PremiumRelatedPrograms } from "@/components/premium-coaching-layout/premium-related-programs";

/**
 * Reference page flow: floating header → aurora hero with stat cards →
 * category rail + searchable card grid → consultation CTA → support cards →
 * related programs → final CTA → rounded footer card.
 */
export function PremiumHomePage() {
  return (
    <>
      <PremiumHero />
      <Suspense fallback={null}>
        <PremiumProgramDiscovery limit={9} showViewAll />
      </Suspense>
      <PremiumConsultationCta />
      <PremiumCoachCards />
      <PremiumRelatedPrograms />
      <PremiumFinalCta />
    </>
  );
}
