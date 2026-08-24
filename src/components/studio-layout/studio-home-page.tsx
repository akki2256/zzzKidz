import { StudioCategoryGrid } from "@/components/studio-layout/studio-category-grid";
import { StudioFinalCta } from "@/components/studio-layout/studio-cta";
import { StudioHero } from "@/components/studio-layout/studio-hero";
import { StudioMission } from "@/components/studio-layout/studio-mission";
import { StudioProgramCards } from "@/components/studio-layout/studio-program-cards";
import { StudioPromiseBand } from "@/components/studio-layout/studio-promise-band";
import { StudioPromoTiles } from "@/components/studio-layout/studio-promo-tiles";
import { StudioStatement } from "@/components/studio-layout/studio-statement";
import { StudioStatsBand } from "@/components/studio-layout/studio-stats-band";

/**
 * Editorial flow: full-bleed hero → statement → promo tiles → program cards →
 * activity tile grid → number band → promises → mission → CTA.
 */
export function StudioHomePage() {
  return (
    <>
      <StudioHero />
      <StudioStatement />
      <StudioPromoTiles />
      <StudioProgramCards />
      <StudioCategoryGrid />
      <StudioStatsBand />
      <StudioPromiseBand />
      <StudioMission />
      <StudioFinalCta />
    </>
  );
}
