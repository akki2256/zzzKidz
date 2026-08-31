import { PulseStubPage } from "@/components/pulse-layout/pulse-stub-page";
import { programStripImages } from "@/content/media";

export function PulseProgramsPage() {
  return (
    <PulseStubPage
      title="Programs"
      description="Explore Move Lab zones, activities and complete movement literacy programmes designed for school spaces and age groups."
      image={programStripImages[0]}
    />
  );
}
