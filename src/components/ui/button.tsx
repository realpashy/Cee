import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[14px] text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wa-accent)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--wa-accent)] text-[var(--wa-accent-foreground)] shadow-[0_18px_44px_rgba(149,223,30,0.22)] hover:-translate-y-0.5 hover:bg-[var(--wa-accent-strong)]",
        secondary:
          "border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] text-[var(--wa-foreground)] hover:-translate-y-0.5 hover:border-[var(--wa-accent)]/50 hover:bg-[var(--wa-surface)]",
        ghost:
          "text-[var(--wa-muted-foreground)] hover:bg-[var(--wa-surface-muted)] hover:text-[var(--wa-foreground)]",
        outline:
          "border border-[var(--wa-border)] bg-transparent text-[var(--wa-foreground)] hover:-translate-y-0.5 hover:border-[var(--wa-accent)]/50 hover:bg-[var(--wa-accent-soft)]"
      },
      size: {
        sm: "h-9 px-3.5",
        md: "h-11 px-4.5",
        lg: "h-12 px-5"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
