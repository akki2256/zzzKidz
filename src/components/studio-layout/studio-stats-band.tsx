import {
  activities,
  movementLiteracy,
  processSteps,
  zones,
} from "@/content/site";

/**
 * Number-led band. Every figure is a real count derived from the catalogue —
 * no reach or membership claims are invented.
 */
const stats = [
  { lead: "Purpose-built", value: `${zones.length}`, trail: "activity zones" },
  { lead: "A curriculum of", value: `${activities.length}`, trail: "movement activities" },
  { lead: "Tracking", value: `${movementLiteracy.length}`, trail: "core movement skills" },
  { lead: "Delivered across", value: `${processSteps.length}`, trail: "managed steps" },
];

export function StudioStatsBand() {
  return (
    <section className="bg-[#c8ff00] py-16 text-[#0b0b0b] sm:py-20">
      <div className="studio-container">
        <h2 className="studio-display max-w-3xl text-[clamp(2rem,5.5vw,3.75rem)]">
          One partner. The complete solution.
        </h2>

        <dl className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.trail}>
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-black/60">
                {stat.lead}
              </dt>
              <dd>
                <span className="studio-display block text-[clamp(3.25rem,7vw,5rem)]">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm font-bold uppercase tracking-[0.1em]">
                  {stat.trail}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
