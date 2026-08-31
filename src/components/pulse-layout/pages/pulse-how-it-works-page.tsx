import { PulseStubPage } from "@/components/pulse-layout/pulse-stub-page";
import { solutionFeatureImage } from "@/content/media";

export function PulseHowItWorksPage() {
  return (
    <PulseStubPage
      title="How It Works"
      description="From site assessment to ongoing coaching support — see how we deliver an end-to-end school fitness solution."
      image={solutionFeatureImage}
    />
  );
}
