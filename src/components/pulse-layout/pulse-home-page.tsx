import { PulseHero } from "@/components/pulse-layout/pulse-hero";
import { PulseZzzReveal } from "@/components/pulse-layout/pulse-zzz-reveal";

/**
 * Pulse homepage — video hero followed by the ZZZ movement reveal.
 */
export function PulseHomePage() {
  return (
    <>
      <PulseHero />
      <PulseZzzReveal />
    </>
  );
}
