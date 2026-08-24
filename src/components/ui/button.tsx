import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold uppercase tracking-[0.08em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-cta text-white shadow-[0_10px_30px_rgba(225,29,46,0.35)] hover:bg-cta-hover hover:-translate-y-0.5",
        secondary:
          "bg-transparent text-foreground border border-white/30 hover:border-white hover:bg-white/5",
        light:
          "bg-surface-white text-foreground-inverse hover:bg-surface-light hover:-translate-y-0.5",
        ghost: "bg-transparent text-foreground hover:bg-accent-soft hover:text-white",
        outline:
          "border border-border text-foreground hover:bg-surface-muted hover:border-border-strong",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-10 px-5 text-xs",
        lg: "h-12 px-8 text-sm",
        xl: "h-14 px-10 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
