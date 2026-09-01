/** Short brand statement displayed immediately below homepage heroes. */
export function HeroRibbon() {
  return (
    <section aria-label="Brand statement" className="overflow-hidden bg-black py-1.5 sm:py-2">
      <div
        className="mx-auto flex min-h-11 w-[calc(100%-0.5rem)] items-center justify-center bg-[#e5e5e5] px-4 py-2 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.08)] sm:min-h-12 sm:px-8"
        style={{
          clipPath:
            "polygon(0.75rem 0, 100% 0, calc(100% - 0.75rem) 100%, 0 100%)",
        }}
      >
        <p className="font-display text-balance text-[clamp(0.95rem,2.5vw,1.4rem)] uppercase leading-none tracking-[0.025em] text-[#111113] sm:whitespace-nowrap">
          We don&apos;t just build strong bodies, we build{" "}
          <span className="text-[#087b3a]">stronger lives.</span>
        </p>
      </div>
    </section>
  );
}
