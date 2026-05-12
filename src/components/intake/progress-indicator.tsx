"use client";

export function ProgressIndicator({
  current,
  total,
  progressLabel,
  stepLabel,
  rtl = false
}: {
  current: number;
  total: number;
  progressLabel: string;
  stepLabel: string;
  rtl?: boolean;
}) {
  const safeTotal = Math.max(total, 1);
  const clampedCurrent = Math.min(Math.max(current, 0), safeTotal);
  const percent = Math.round((clampedCurrent / safeTotal) * 100);

  return (
    <div className="space-y-3">
      <div
        className={[
          "flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.22em]",
          rtl ? "flex-row-reverse" : ""
        ].join(" ")}
      >
        <span className="text-[var(--brand-lime)]">{progressLabel}</span>
        <span className="text-[var(--brand-silver)]">{stepLabel}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full border border-white/10 bg-[rgb(17_19_16)]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-lime),var(--brand-lime-bright))] shadow-[0_0_24px_rgba(149,223,30,0.35)] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
