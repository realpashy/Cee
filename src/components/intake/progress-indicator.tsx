"use client";

export function ProgressIndicator({
  current,
  total
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={[
            "h-10 w-10 rounded-[10px] border text-[10px] font-bold uppercase tracking-[0.2em] transition",
            index === current
              ? "border-[var(--brand-lime)] bg-[var(--brand-lime)] text-[var(--brand-black)]"
              : "border-white/10 bg-black/20 text-[var(--brand-silver)]"
          ].join(" ")}
        >
          <span className="flex h-full items-center justify-center">0{index + 1}</span>
        </span>
      ))}
    </div>
  );
}
