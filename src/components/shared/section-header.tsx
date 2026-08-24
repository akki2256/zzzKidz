import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  align = "left",
  tone = "dark",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-heading text-3xl uppercase sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-foreground" : "text-foreground-inverse",
        )}
      >
        {title}
        {titleAccent ? (
          <>
            {" "}
            <span className="text-accent">{titleAccent}</span>
          </>
        ) : null}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base font-medium leading-relaxed sm:text-lg",
            tone === "dark" ? "text-foreground-muted" : "text-foreground-inverse-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
