import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[5px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wa-ring)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--wa-foreground-strong)] text-[var(--wa-surface)] hover:bg-[var(--wa-foreground)]",
        secondary:
          "border border-[var(--wa-border)] bg-[var(--wa-surface)] text-[var(--wa-foreground)] hover:bg-[var(--wa-surface-muted)]",
        ghost:
          "text-[var(--wa-muted-foreground)] hover:bg-[var(--wa-surface-muted)] hover:text-[var(--wa-foreground)]",
        outline:
          "border border-[var(--wa-border)] bg-transparent text-[var(--wa-foreground)] hover:bg-[var(--wa-surface-muted)]"
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-5"
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
