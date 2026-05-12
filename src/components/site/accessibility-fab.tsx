"use client";

import { useEffect, useState } from "react";
import type { SiteMessages } from "@/lib/i18n";

type A11yPrefs = {
  textSize: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  underlineLinks: boolean;
};

const storageKey = "cee-accessibility-prefs";

export function AccessibilityFab({ messages }: { messages: SiteMessages }) {
  const isRtl = messages.locale !== "en";
  const copy =
    messages.locale === "he"
      ? {
          button: "נגישות",
          title: "כלי נגישות",
          textSize: "הגדלת טקסט",
          contrast: "ניגודיות גבוהה",
          motion: "הפחתת אנימציות",
          underline: "הדגשת קישורים",
          statement: "הצהרת נגישות",
          close: "סגור"
        }
      : messages.locale === "ar"
        ? {
            button: "إمكانية الوصول",
            title: "أدوات الوصول",
            textSize: "تكبير النص",
            contrast: "تباين عالٍ",
            motion: "تقليل الحركة",
            underline: "إبراز الروابط",
            statement: "بيان إمكانية الوصول",
            close: "إغلاق"
          }
        : {
            button: "Accessibility",
            title: "Accessibility Tools",
            textSize: "Larger text",
            contrast: "High contrast",
            motion: "Reduce motion",
            underline: "Underline links",
            statement: "Accessibility statement",
            close: "Close"
          };

  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>({
    textSize: false,
    highContrast: false,
    reducedMotion: false,
    underlineLinks: false
  });

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        setPrefs(JSON.parse(saved) as A11yPrefs);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const body = document.body;
    body.dataset.a11yText = prefs.textSize ? "large" : "normal";
    body.dataset.a11yContrast = prefs.highContrast ? "high" : "normal";
    body.dataset.a11yMotion = prefs.reducedMotion ? "reduced" : "normal";
    body.dataset.a11yLinks = prefs.underlineLinks ? "underlined" : "normal";
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(prefs));
    } catch {}
  }, [prefs]);

  function toggle<K extends keyof A11yPrefs>(key: K) {
    setPrefs((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <>
      <button
        type="button"
        aria-label={copy.button}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={["fixed bottom-5 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[rgb(12_14_12_/_0.92)] text-[var(--brand-lime)] shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl", isRtl ? "left-5" : "right-5"].join(" ")}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4.5" r="1.8" />
          <path d="M6 8.5h12" />
          <path d="M12 8.5v11" />
          <path d="M8 13.5l4-5 4 5" />
          <path d="M8.5 20.5 12 16l3.5 4.5" />
        </svg>
      </button>

      {open ? (
        <div
          dir={isRtl ? "rtl" : "ltr"}
          className={["fixed bottom-20 z-[70] w-[290px] rounded-[16px] border border-white/10 bg-[rgb(10_12_10_/_0.96)] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl", isRtl ? "left-5 text-right" : "right-5 text-left"].join(" ")}
        >
          <div className={["flex items-center justify-between gap-3", isRtl ? "flex-row-reverse" : ""].join(" ")}>
            <p className="text-sm font-black text-white">{copy.title}</p>
            <button type="button" onClick={() => setOpen(false)} className="rounded-[10px] border border-white/10 px-3 py-1.5 text-xs font-bold text-[var(--brand-silver)]">
              {copy.close}
            </button>
          </div>
          <div className="mt-4 space-y-2">
            {[
              ["textSize", copy.textSize],
              ["highContrast", copy.contrast],
              ["reducedMotion", copy.motion],
              ["underlineLinks", copy.underline]
            ].map(([key, label]) => {
              const typedKey = key as keyof A11yPrefs;
              return (
                <button
                  key={typedKey}
                  type="button"
                  onClick={() => toggle(typedKey)}
                  className={["flex w-full items-center justify-between rounded-[12px] border px-3 py-3 text-sm transition", prefs[typedKey] ? "border-[var(--brand-lime)] bg-[rgba(149,223,30,0.12)] text-white" : "border-white/10 bg-white/4 text-[var(--brand-silver)]", isRtl ? "flex-row-reverse" : ""].join(" ")}
                >
                  <span>{label}</span>
                  <span className={["h-5 w-9 rounded-full border transition", prefs[typedKey] ? "border-[var(--brand-lime)] bg-[var(--brand-lime)]" : "border-white/15 bg-black/20"].join(" ")}>
                    <span className={["mt-[1px] block h-4 w-4 rounded-full bg-[var(--brand-black)] transition", prefs[typedKey] ? (isRtl ? "mr-[18px]" : "ml-[18px]") : "ml-[1px]"].join(" ")} />
                  </span>
                </button>
              );
            })}
          </div>
          <a href={`/accessibility?lang=${messages.locale}`} className="mt-4 inline-flex text-sm font-bold text-[var(--brand-lime)]">
            {copy.statement}
          </a>
        </div>
      ) : null}
    </>
  );
}
