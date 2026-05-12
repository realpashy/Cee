"use client";

export function AssistantMessage({
  eyebrow,
  title,
  body,
  align = "left"
}: {
  eyebrow: string;
  title: string;
  body: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[var(--brand-lime)]">
        {eyebrow}
      </p>
      <h3 className="mt-3 text-[1.95rem] font-black leading-[1.02] text-white md:text-[2.4rem]">
        {title}
      </h3>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--brand-silver)]">
        {body}
      </p>
    </div>
  );
}
