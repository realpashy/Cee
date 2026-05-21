import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em]",
  {
    variants: {
      variant: {
        neutral: "border-[var(--wa-border)] bg-[var(--wa-surface-muted)] text-[var(--wa-muted-foreground)]",
        success: "border-[var(--wa-accent)]/30 bg-[var(--wa-accent-soft)] text-[var(--wa-accent-ink)]",
        info: "border-sky-400/25 bg-sky-400/10 text-sky-200",
        warning: "border-amber-400/30 bg-amber-400/12 text-amber-200"
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
