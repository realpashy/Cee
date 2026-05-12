"use client";

import { motion } from "framer-motion";
import { OptionButton } from "@/components/intake/option-button";

export function QuestionStep({
  title,
  body,
  options,
  value,
  onSelect,
  textValue,
  onTextChange,
  textPlaceholder,
  rtl = false
}: {
  title: string;
  body: string;
  options?: Array<{ label: string; value?: string; description?: string }>;
  value?: string;
  onSelect?: (value: string) => void;
  textValue?: string;
  onTextChange?: (value: string) => void;
  textPlaceholder?: string;
  rtl?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.28 }}
      className="space-y-6"
    >
      <div className={rtl ? "text-right" : "text-left"}>
        <h3 className="text-[1.9rem] font-black leading-[1.04] text-white md:text-[2.3rem]">
          {title}
        </h3>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--brand-silver)]">
          {body}
        </p>
      </div>

      {options?.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {options.map((option) => (
            <OptionButton
              key={option.value ?? option.label}
              label={option.label}
              description={option.description}
              active={value === (option.value ?? option.label)}
              onClick={() => onSelect?.(option.value ?? option.label)}
              rtl={rtl}
            />
          ))}
        </div>
      ) : null}

      {onTextChange ? (
        <textarea
          value={textValue}
          onChange={(event) => onTextChange(event.target.value)}
          placeholder={textPlaceholder}
          rows={4}
          className={[
            "w-full rounded-[10px] border border-white/10 bg-[rgb(20_22_19)] px-4 py-4 text-base leading-7 text-white outline-none transition focus:border-[var(--brand-lime)]",
            rtl ? "text-right" : "text-left"
          ].join(" ")}
        />
      ) : null}
    </motion.div>
  );
}
