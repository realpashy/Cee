import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-[5px] border px-2.5 py-1 text-[11px] font-medium",
  {
    variants: {
      variant: {
        neutral: "border-[var(--wa-border)] bg-[var(--wa-surface-muted)] text-[var(--wa-muted-foreground)]",
        success: "border-[var(--wa-accent-border)] bg-[var(--wa-accent-soft)] text-[var(--wa-accent-ink)]",
        info: "border-[var(--wa-info-border)] bg-[var(--wa-info-soft)] text-[var(--wa-info-ink)]",
        warning: "border-[var(--wa-warning-border)] bg-[var(--wa-warning-soft)] text-[var(--wa-warning-ink)]"
      }
    },
    defaultVariants: {
      variant: "neutral"
    }
  }
);

type BadgeProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
