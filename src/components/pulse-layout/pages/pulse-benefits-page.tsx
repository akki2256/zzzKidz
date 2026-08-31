import { PulseStubPage } from "@/components/pulse-layout/pulse-stub-page";
import { foundationImages } from "@/content/media";

export function PulseBenefitsPage() {
  return (
    <PulseStubPage
      title="Benefits"
      description="Stronger bodies, sharper minds and brighter futures — outcomes for students, schools and communities."
      image={foundationImages[0]}
    />
  );
}
