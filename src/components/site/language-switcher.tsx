import type { SiteLanguage } from "@/lib/i18n";

const languages: SiteLanguage[] = ["he", "ar", "en"];

export function LanguageSwitcher({
  currentLanguage
}: {
  currentLanguage: SiteLanguage;
}) {
  return (
    <div
      aria-label="Language switcher"
      className="flex items-center gap-1 rounded-[10px] border border-white/10 bg-[rgb(255_255_255_/_0.03)] p-1"
    >
      {languages.map((language) => {
        const isActive = language === currentLanguage;

        return (
          <a
            key={language}
            href={`/?lang=${language}`}
            className={[
              "rounded-[8px] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] transition",
              isActive
                ? "bg-[var(--brand-lime)] text-[var(--brand-black)]"
                : "text-[var(--brand-silver)] hover:text-[var(--brand-off-white)]"
            ].join(" ")}
          >
            {language}
          </a>
        );
      })}
    </div>
  );
}
