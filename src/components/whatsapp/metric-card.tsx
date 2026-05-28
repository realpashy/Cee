import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  eyebrow: string;
  title: string;
  value: string;
  detail: string;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
};

export function MetricCard({ eyebrow, title, value, detail, trend = "neutral", trendLabel }: MetricCardProps) {
  return (
    <Card className="overflow-hidden bg-[linear-gradient(180deg,var(--wa-surface),var(--wa-surface-muted))]">
      <CardHeader className="gap-3 pb-3">
        <div className="flex items-center justify-between gap-3">
          <Badge variant={trend === "up" ? "success" : trend === "down" ? "warning" : "neutral"} className="w-fit">
            {eyebrow}
          </Badge>
          {trendLabel ? (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                trend === "up"
                  ? "text-[var(--wa-accent-ink)]"
                  : trend === "down"
                    ? "text-[var(--wa-warning-ink)]"
                    : "text-[var(--wa-muted-foreground)]"
              )}
            >
              {trend === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : null}
              {trend === "down" ? <ArrowDownRight className="h-3.5 w-3.5" /> : null}
              <span>{trendLabel}</span>
            </div>
          ) : null}
        </div>
        <CardTitle className="text-sm font-medium text-[var(--wa-muted-foreground)]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-[34px] font-semibold tracking-[-0.05em] text-[var(--wa-foreground-strong)]">{value}</div>
        <CardDescription className="mt-2 text-xs leading-6">{detail}</CardDescription>
      </CardContent>
    </Card>
  );
}
