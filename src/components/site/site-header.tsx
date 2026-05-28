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
  const isRtl = currentLanguage !== "en";
  const navItems = [
    { href: "#services", label: messages.nav.expertise },
    { href: "#plans", label: messages.nav.plans },
    { href: "#intake", label: messages.nav.roadmap }
  ];

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
          ? "border-b border-white/8 bg-[rgb(6_7_6_/_0.78)] backdrop-blur-2xl shadow-[0_18px_48px_rgba(0,0,0,0.34)]"
          : "border-b border-transparent bg-transparent"
      ].join(" ")}
    >
      <div
        className={[
          "site-frame relative z-10 flex items-center justify-between gap-4 px-4 py-4 md:px-8 xl:px-10",
          isRtl ? "flex-row-reverse" : ""
        ].join(" ")}
      >
        <a
          href="#"
          className="flex flex-col rounded-[12px] border border-transparent px-3 py-2 transition hover:border-white/10 hover:bg-white/3"
        >
          <Image
            src="/brand/cee-wordmark.png"
            alt="Cee+"
            width={136}
            height={48}
            className="h-auto w-[92px] md:w-[108px]"
            priority
          />
        </a>

        <nav
          className={[
            "hidden items-center gap-3 rounded-full border border-white/8 bg-[rgb(255_255_255_/_0.03)] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-silver)] xl:flex",
            isRtl ? "justify-end" : ""
          ].join(" ")}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 transition hover:bg-white/6 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={["flex items-center gap-3", isRtl ? "flex-row-reverse" : ""].join(" ")}>
          <LanguageSwitcher currentLanguage={currentLanguage} />
          <a href="#intake" className="btn-primary hidden h-[44px] px-5 py-0 text-[11px] lg:inline-flex">
            {messages.nav.scaleNow}
          </a>
        </div>
      </div>
    </header>
  );
}
