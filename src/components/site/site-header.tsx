"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import type { SiteLanguage, SiteMessages } from "@/lib/i18n";

export function SiteHeader({
  currentLanguage,
  messages
}: {
  currentLanguage: SiteLanguage;
  messages: SiteMessages;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/8 bg-[rgb(6_7_6_/_0.68)] backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.24)]"
          : "border-b border-transparent bg-transparent"
      ].join(" ")}
    >
      <div className="site-frame relative z-10 flex items-center justify-between gap-4 px-4 py-4 md:px-8 xl:px-10">
        <a href="#" className="flex flex-col">
          <Image
            src="/brand/cee-wordmark.png"
            alt="Cee+"
            width={136}
            height={48}
            className="h-auto w-[92px] md:w-[108px]"
            priority
          />
        </a>

        <nav className="hidden items-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-silver)] xl:flex">
          <a href="#services">{messages.nav.expertise}</a>
          <a href="#services">{messages.nav.portfolio}</a>
          <a href="#plans">{messages.nav.plans}</a>
          <a href="#about">{messages.nav.agency}</a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher currentLanguage={currentLanguage} />
          <a href="#intake" className="btn-primary hidden h-[42px] px-5 py-0 text-xs lg:inline-flex">
            {messages.nav.scaleNow}
          </a>
        </div>
      </div>
    </header>
  );
}
