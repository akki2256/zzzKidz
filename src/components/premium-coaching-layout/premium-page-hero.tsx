import Link from "next/link";

type PremiumPageHeroProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description: string;
  breadcrumbLabel?: string;
};

export function PremiumPageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  breadcrumbLabel,
}: PremiumPageHeroProps) {
  return (
    <section className="pt-10 pb-6 sm:pt-14">
      <div className="premium-container">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
          {eyebrow}
        </p>
        <h1 className="premium-display mt-4 max-w-3xl text-[clamp(1.8rem,4vw,2.75rem)] text-white">
          {title}
          {titleAccent ? <span className="text-white/60"> {titleAccent}</span> : null}
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60">{description}</p>
        {breadcrumbLabel ? (
          <nav aria-label="Breadcrumb" className="mt-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-[11px] text-white/40">
              <li>
                <Link href="/" className="hover:text-white/70">
                  Homepage
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li className="font-semibold text-white/75">{breadcrumbLabel}</li>
            </ol>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
