import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/whatsapp/section-heading";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
};

export function PlaceholderPage({ eyebrow, title, description, points }: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <Card>
        <CardContent className="space-y-5 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="neutral">قيد التطوير</Badge>
            <Badge variant="info">واجهة تشغيلية</Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {points.map((point, index) => (
              <div
                key={point}
                className="rounded-[5px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-4"
              >
                <Badge variant={index === 0 ? "success" : "neutral"}>{String(index + 1).padStart(2, "0")}</Badge>
                <p className="mt-3 text-sm leading-6 text-[var(--wa-foreground)]">{point}</p>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-[5px] border border-[var(--wa-border)]">
            <div className="grid grid-cols-[1.2fr_1fr_120px] gap-3 border-b border-[var(--wa-border)] bg-[var(--wa-surface-muted)] px-4 py-3 text-xs font-medium text-[var(--wa-muted-foreground)]">
              <span>العنصر</span>
              <span>الوصف</span>
              <span className="text-left">الحالة</span>
            </div>
            {points.slice(0, 3).map((point, index) => (
              <div
                key={`row-${point}`}
                className="grid grid-cols-[1.2fr_1fr_120px] gap-3 border-b border-[var(--wa-border)] px-4 py-3 text-sm last:border-b-0"
              >
                <span className="font-medium text-[var(--wa-foreground-strong)]">{title}</span>
                <span className="text-[var(--wa-muted-foreground)]">{point}</span>
                <div className="flex justify-start md:justify-end">
                  <Badge variant={index === 0 ? "success" : "neutral"}>{index === 0 ? "جاهز" : "لاحقًا"}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
