import Image from "next/image";
import type { SiteMessages } from "@/lib/i18n";

export function Footer({ messages }: { messages: SiteMessages }) {
  const isRtl = messages.locale !== "en";

  return (
    <footer id="about" className="border-t border-white/8 pb-24 pt-12 md:pb-10">
      <div className="flex w-full flex-col gap-7">
        <div
          className={[
            "flex flex-col justify-between gap-5 lg:flex-row lg:items-center",
            isRtl ? "items-end text-right lg:flex-row-reverse" : "items-start text-left"
          ].join(" ")}
        >
          <div className={isRtl ? "text-right" : "text-left"}>
            <Image
              src="/brand/cee-wordmark.png"
              alt="Cee+"
              width={176}
              height={64}
              className="h-auto w-[118px] md:w-[136px]"
            />
            <p className="mt-2 max-w-md text-sm leading-7 text-[var(--brand-silver)]">
              {messages.footer.tagline}
            </p>
          </div>

          <nav
            className={[
              "flex flex-wrap gap-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-silver)]",
              isRtl ? "flex-row-reverse justify-end" : ""
            ].join(" ")}
          >
            <a href="#services">{messages.nav.expertise}</a>
            <a href="#services">{messages.nav.portfolio}</a>
            <a href="#plans">{messages.nav.plans}</a>
            <a href="#about">{messages.nav.agency}</a>
            <a href="#intake">{messages.nav.scaleNow}</a>
          </nav>
        </div>

        <div
          className={[
            "flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-6 text-xs text-[var(--brand-silver)]",
            isRtl ? "text-right lg:flex-row-reverse" : "text-left"
          ].join(" ")}
        >
          <div className={["flex gap-5", isRtl ? "flex-row-reverse" : ""].join(" ")}>
            <a href="/privacy">{messages.footer.privacy}</a>
            <a href="/terms">{messages.footer.terms}</a>
            <a href="/accessibility" target="_blank" rel="noreferrer">
              {messages.footer.accessibility}
            </a>
          </div>
          <p>{messages.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
