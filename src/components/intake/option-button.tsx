"use client";

import { motion } from "framer-motion";

export function OptionButton({
  label,
  description,
  active,
  onClick,
  rtl = false
}: {
  label: string;
  description?: string;
  active: boolean;
  onClick: () => void;
  rtl?: boolean;
}) {
  return (
    <motion.button
      dir={rtl ? "rtl" : "ltr"}
      type="button"
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={[
        "group w-full rounded-[10px] border px-4 py-4 text-left transition",
        rtl ? "text-right [direction:rtl]" : "text-left",
        active
          ? "border-[var(--brand-lime)] bg-[linear-gradient(180deg,rgba(149,223,30,0.16),rgba(149,223,30,0.05))] shadow-[0_20px_48px_rgba(149,223,30,0.08)]"
          : "border-white/10 bg-[rgb(20_22_19)] hover:border-white/20 hover:bg-[rgb(24_26_22)]"
      ].join(" ")}
    >
      <div
        className={[
          "flex items-start gap-3",
          rtl ? "flex-row-reverse justify-between text-right" : ""
        ].join(" ")}
      >
        <span
          className={[
            "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition",
            active
              ? "border-[var(--brand-lime)] bg-[var(--brand-lime)] text-[var(--brand-black)]"
              : "border-white/20 bg-black/20 text-[var(--brand-silver)]"
          ].join(" ")}
        >
          <span className="text-[11px] font-black">+</span>
        </span>
        <span className={["block flex-1", rtl ? "text-right" : ""].join(" ")}>
          <span className="block text-sm font-black text-white">{label}</span>
          {description ? (
            <span className="mt-1 block text-sm leading-6 text-[var(--brand-silver)]">
              {description}
            </span>
          ) : null}
        </span>
      </div>
    </motion.button>
  );
}
