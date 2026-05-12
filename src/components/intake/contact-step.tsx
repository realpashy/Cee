"use client";

import type { ContactDetails, IntakeLocale } from "@/components/intake/types";

export function ContactStep({
  value,
  onChange,
  labels,
  languageNames,
  rtl = false
}: {
  value: ContactDetails;
  onChange: <K extends keyof ContactDetails>(key: K, nextValue: ContactDetails[K]) => void;
  labels: Record<string, string>;
  languageNames: Record<IntakeLocale, string>;
  rtl?: boolean;
}) {
  const languages: IntakeLocale[] = ["en", "he", "ar"];

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input value={value.fullName} onChange={(event) => onChange("fullName", event.target.value)} placeholder={labels.fullName} className={["rounded-[10px] border border-white/10 bg-[rgb(20_22_19)] px-4 py-4 text-white outline-none focus:border-[var(--brand-lime)]", rtl ? "text-right" : "text-left"].join(" ")} />
        <input value={value.phone} onChange={(event) => onChange("phone", event.target.value)} placeholder={labels.phone} className={["rounded-[10px] border border-white/10 bg-[rgb(20_22_19)] px-4 py-4 text-white outline-none focus:border-[var(--brand-lime)]", rtl ? "text-right" : "text-left"].join(" ")} />
        <input value={value.email} onChange={(event) => onChange("email", event.target.value)} placeholder={labels.email} className={["rounded-[10px] border border-white/10 bg-[rgb(20_22_19)] px-4 py-4 text-white outline-none focus:border-[var(--brand-lime)]", rtl ? "text-right" : "text-left"].join(" ")} />
        <input value={value.businessName} onChange={(event) => onChange("businessName", event.target.value)} placeholder={labels.businessName} className={["rounded-[10px] border border-white/10 bg-[rgb(20_22_19)] px-4 py-4 text-white outline-none focus:border-[var(--brand-lime)]", rtl ? "text-right" : "text-left"].join(" ")} />
      </div>
      <input value={value.websiteOrSocial} onChange={(event) => onChange("websiteOrSocial", event.target.value)} placeholder={labels.websiteOrSocial} className={["rounded-[10px] border border-white/10 bg-[rgb(20_22_19)] px-4 py-4 text-white outline-none focus:border-[var(--brand-lime)]", rtl ? "text-right" : "text-left"].join(" ")} />
      <div className={rtl ? "text-right" : "text-left"}>
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-silver)]">
          {labels.preferredLanguage}
        </p>
        <div className={["flex gap-2", rtl ? "flex-row-reverse justify-end" : ""].join(" ")}>
          {languages.map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => onChange("preferredLanguage", language)}
              className={[
                "rounded-[10px] border px-4 py-3 text-sm font-bold uppercase transition",
                value.preferredLanguage === language
                  ? "border-[var(--brand-lime)] bg-[var(--brand-lime)] text-[var(--brand-black)]"
                  : "border-white/10 bg-[rgb(20_22_19)] text-[var(--brand-silver)]"
              ].join(" ")}
            >
              {languageNames[language]}
            </button>
          ))}
        </div>
      </div>
      <label
        className={[
          "flex items-start gap-3 text-sm leading-6 text-[var(--brand-silver)]",
          rtl ? "flex-row-reverse justify-end text-right" : "justify-start text-left"
        ].join(" ")}
      >
        <input
          type="checkbox"
          checked={value.consentAccepted}
          onChange={(event) => onChange("consentAccepted", event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-black/30 accent-[var(--brand-lime)]"
        />
        <span>{labels.consent}</span>
      </label>
    </div>
  );
}
