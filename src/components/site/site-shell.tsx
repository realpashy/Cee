import type { ReactNode } from "react";
import { AccessibilityFab } from "@/components/site/accessibility-fab";
import { CursorGlow } from "@/components/site/cursor-glow";
import { Footer } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/site-header";
import type { SiteLanguage, SiteMessages } from "@/lib/i18n";

export function SiteShell({
  children,
  currentLanguage,
  messages
}: {
  children: ReactNode;
  currentLanguage: SiteLanguage;
  messages: SiteMessages;
}) {
  const isRtl = currentLanguage !== "en";

  return (
    <div
      data-lang={currentLanguage}
      dir={isRtl ? "rtl" : "ltr"}
      className="site-grid min-h-screen bg-[var(--brand-black)] text-[var(--brand-off-white)]"
    >
      <CursorGlow />
      <div className="glow-orb left-[8%] top-16 h-36 w-36" />
      <div className="glow-orb right-[8%] top-[28rem] h-44 w-44" />
      <div className="glow-orb left-[26%] top-[68rem] h-52 w-52 opacity-10" />
      <div className="glow-orb right-[14%] top-[118rem] h-56 w-56 opacity-10" />
      <div className="ambient-line top-[6.8rem]" />

      <SiteHeader currentLanguage={currentLanguage} messages={messages} />

      <div className="site-frame relative z-10 px-4 md:px-8 xl:px-10">
        {children}
        <Footer messages={messages} />
      </div>
      <AccessibilityFab messages={messages} />
    </div>
  );
}
