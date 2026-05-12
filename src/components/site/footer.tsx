import Image from "next/image";
import type { SiteMessages } from "@/lib/i18n";

export function Footer({ messages }: { messages: SiteMessages }) {
  return (
    <footer id="about" className="border-t border-white/8 pb-24 pt-12 md:pb-10">
      <div className="flex w-full flex-col gap-7">
        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          <div>
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

          <nav className="flex flex-wrap gap-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-silver)]">
            <a href="#services">Expertise</a>
            <a href="#services">Portfolio</a>
            <a href="#plans">Plans</a>
            <a href="#about">Agency</a>
            <a href="#intake">Scale Now</a>
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-6 text-xs text-[var(--brand-silver)]">
          <div className="flex gap-5">
            <a href="/privacy">{messages.footer.privacy}</a>
            <a href="/terms">{messages.footer.terms}</a>
          </div>
          <p>{messages.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
