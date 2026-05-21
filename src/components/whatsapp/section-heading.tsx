import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-3">
      <Badge variant="success" className="w-fit">
        {eyebrow}
      </Badge>
      <div>
        <h2 className="text-3xl font-black tracking-[-0.05em] lg:text-4xl">{title}</h2>
        <p className="mt-3 max-w-3xl text-base leading-8 text-[var(--wa-muted-foreground)]">{description}</p>
      </div>
    </div>
  );
}
