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
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Badge variant={trend === "up" ? "success" : trend === "down" ? "warning" : "neutral"}>
            {eyebrow}
          </Badge>
          {trendLabel ? (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-bold",
                trend === "up"
                  ? "text-emerald-300"
                  : trend === "down"
                    ? "text-amber-200"
                    : "text-[var(--wa-muted-foreground)]"
              )}
            >
              {trend === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : null}
              {trend === "down" ? <ArrowDownRight className="h-3.5 w-3.5" /> : null}
              <span>{trendLabel}</span>
            </div>
          ) : null}
        </div>
        <CardTitle className="text-sm text-[var(--wa-muted-foreground)]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-black tracking-[-0.05em]">{value}</div>
        <CardDescription className="mt-3">{detail}</CardDescription>
      </CardContent>
    </Card>
  );
}
