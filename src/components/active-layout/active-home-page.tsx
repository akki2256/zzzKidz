import { ActiveFinalCta } from "@/components/active-layout/active-cta";
import { ActiveHero } from "@/components/active-layout/active-hero";
import { ActiveMission } from "@/components/active-layout/active-mission";
import { ActivePathFaq } from "@/components/active-layout/active-path-faq";
import { ActiveProgramsGrid } from "@/components/active-layout/active-programs-grid";
import { ActivePromiseQuote } from "@/components/active-layout/active-promise-quote";

/**
 * Active Kids homepage flow from reference snapshots:
 * full-bleed hero → mint mission → winding path FAQ → quote → offerings → CTA
 */
export function ActiveHomePage() {
  return (
    <>
      <ActiveHero />
      <ActiveMission />
      <ActivePathFaq />
      <ActivePromiseQuote />
      <ActiveProgramsGrid />
      <ActiveFinalCta />
    </>
  );
}
