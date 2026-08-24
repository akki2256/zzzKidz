import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

type CtaLinkProps = Omit<ButtonProps, "asChild"> &
  LinkProps & {
    children: React.ReactNode;
  };

export function CtaLink({
  href,
  children,
  className,
  onClick,
  prefetch = true,
  scroll = true,
  ...props
}: CtaLinkProps) {
  return (
    <Button
      asChild
      className={cn("touch-manipulation active:scale-[0.98] active:duration-100", className)}
      {...props}
    >
      <Link href={href} prefetch={prefetch} scroll={scroll} onClick={onClick}>
        {children}
      </Link>
    </Button>
  );
}
