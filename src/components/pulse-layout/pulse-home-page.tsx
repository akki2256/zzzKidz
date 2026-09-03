import { PulseActivitiesScroll } from "@/components/pulse-layout/pulse-activities-scroll";
import { PulseHero } from "@/components/pulse-layout/pulse-hero";
import { PulseHomeScrollRoot } from "@/components/pulse-layout/pulse-home-scroll-root";
import { PulseHowWeWorkScroll } from "@/components/pulse-layout/pulse-how-we-work-scroll";
import { PulseOutcomesScroll } from "@/components/pulse-layout/pulse-outcomes-scroll";
import { PulsePeComparisonScroll } from "@/components/pulse-layout/pulse-pe-comparison-scroll";
import { PulseTeamSection } from "@/components/pulse-layout/pulse-team-section";
import { PulseZzzReveal } from "@/components/pulse-layout/pulse-zzz-reveal";
import { HeroRibbon } from "@/components/shared/hero-ribbon";

/**
 * Pulse homepage — video hero followed by the ZZZ movement reveal.
 */
export function PulseHomePage() {
  return (
    <PulseHomeScrollRoot>
      <div className="pulse-home-scroll">
        <section
          id="pulse-hero-chapter"
          data-pulse-snap
          data-pulse-snap-type="chapter"
          className="pulse-snap-chapter flex h-[100svh] max-h-[100svh] flex-col overflow-hidden"
          aria-label="Hero"
        >
          <PulseHero />
          <HeroRibbon />
        </section>
        <PulseZzzReveal />
        <PulseOutcomesScroll />
        <PulsePeComparisonScroll />
        <PulseActivitiesScroll />
        <PulseHowWeWorkScroll />
        <PulseTeamSection />
      </div>
    </PulseHomeScrollRoot>
  );
}
