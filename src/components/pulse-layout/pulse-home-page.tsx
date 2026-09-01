import { PulseHero } from "@/components/pulse-layout/pulse-hero";
import { PulseOutcomesScroll } from "@/components/pulse-layout/pulse-outcomes-scroll";
import { PulseZzzReveal } from "@/components/pulse-layout/pulse-zzz-reveal";
import { HeroRibbon } from "@/components/shared/hero-ribbon";

/**
 * Pulse homepage — video hero followed by the ZZZ movement reveal.
 */
export function PulseHomePage() {
  return (
    <>
      <PulseHero />
      <HeroRibbon />
      <PulseZzzReveal />
      <PulseOutcomesScroll />
    </>
  );
}
