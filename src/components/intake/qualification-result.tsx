"use client";

import { motion } from "framer-motion";

export function QualificationResult({
  eyebrow,
  title,
  subtitle,
  continueLabel,
  directionLabel,
  serviceLabel,
  opportunityLabel,
  recommendedSolution,
  recommendedService,
  opportunitySummary,
  highlights,
  onContinue,
  rtl = false
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  continueLabel: string;
  directionLabel: string;
  serviceLabel: string;
  opportunityLabel: string;
  recommendedSolution: string;
  recommendedService: string;
  opportunitySummary: string;
  highlights: string[];
  onContinue: () => void;
  rtl?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-7"
    >
      <div className={rtl ? "text-right" : "text-left"}>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-lime)]">
          {eyebrow}
        </p>
        <h3
          className={[
            "mt-3 text-[1.85rem] font-black text-white md:text-[2.35rem]",
            rtl ? "max-w-3xl" : "max-w-2xl",
            "leading-[1.12]"
          ].join(" ")}
        >
          {title}
        </h3>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--brand-silver)]">{subtitle}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[18px] border border-[var(--brand-lime)]/20 bg-[linear-gradient(180deg,rgba(149,223,30,0.12),rgba(149,223,30,0.04))] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-lime)]">
            {directionLabel}
          </p>
          <p className="mt-3 text-lg font-bold leading-8 text-white">{recommendedSolution}</p>
        </div>
        <div className="rounded-[18px] border border-white/10 bg-[rgb(18_20_17)] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-lime)]">
            {serviceLabel}
          </p>
          <p className="mt-3 text-lg font-bold leading-8 text-white">{recommendedService}</p>
        </div>
      </div>

      <div className="rounded-[18px] border border-white/10 bg-[rgb(18_20_17)] p-5">
        <div className={rtl ? "text-right" : "text-left"}>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-lime)]">
            {opportunityLabel}
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--brand-silver)]">{opportunitySummary}</p>
          <div className={["mt-4 flex flex-wrap gap-2", rtl ? "justify-end" : ""].join(" ")}>
            {highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] font-bold text-[var(--brand-silver)]"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={rtl ? "text-right" : "text-left"}>
        <button type="button" onClick={onContinue} className="btn-primary">
          {continueLabel}
        </button>
      </div>
    </motion.div>
  );
}
