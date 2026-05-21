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
        <CardContent className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
          {points.map((point, index) => (
            <div key={point} className="rounded-[20px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-5">
              <Badge variant={index === 0 ? "success" : "neutral"}>{String(index + 1).padStart(2, "0")}</Badge>
              <p className="mt-4 text-sm leading-7 text-[var(--wa-muted-foreground)]">{point}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
