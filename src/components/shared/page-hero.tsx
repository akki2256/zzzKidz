import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("gradient-hero border-b border-border py-14 sm:py-16 lg:py-20", className)}>
      <Container>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 max-w-4xl font-display text-4xl uppercase sm:text-5xl lg:text-6xl">
          {title}
          {titleAccent ? <span className="text-accent"> {titleAccent}</span> : null}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-foreground-muted sm:text-lg">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
