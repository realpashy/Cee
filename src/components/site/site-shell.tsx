import type { ReactNode } from "react";
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
  return (
    <div
      data-lang={currentLanguage}
      className="site-grid min-h-screen bg-[var(--brand-black)] text-[var(--brand-off-white)]"
    >
      <CursorGlow />
      <div className="glow-orb left-[10%] top-20 h-40 w-40" />
      <div className="glow-orb right-[8%] top-[30rem] h-48 w-48" />
      <div className="glow-orb left-[28%] top-[68rem] h-56 w-56 opacity-10" />
      <div className="glow-orb right-[18%] top-[120rem] h-60 w-60 opacity-10" />
      <div className="ambient-line top-[7.6rem]" />

      <SiteHeader currentLanguage={currentLanguage} messages={messages} />

      <div className="site-frame relative z-10 px-4 md:px-8 xl:px-10">
        {children}
        <Footer messages={messages} />
      </div>
    </div>
  );
}
