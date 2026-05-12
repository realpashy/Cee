"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { SiteMessages } from "@/lib/i18n";

export function PricingOffer({ messages }: { messages: SiteMessages }) {
  const featuresLabel =
    messages.locale === "he"
      ? "מה כלול"
      : messages.locale === "ar"
        ? "ما الذي يشمله"
        : "Included Features";

  function choosePlan(planName: string) {
    window.dispatchEvent(
      new CustomEvent("cee-plan-select", {
        detail: { planName }
      })
    );
    document.getElementById("intake")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  return (
    <section id="plans" className="relative py-20">
      <div className="absolute inset-x-[15%] top-14 h-56 rounded-full bg-[radial-gradient(circle,rgba(149,223,30,0.12),transparent_64%)] blur-3xl" />

      <div className="mx-auto max-w-[980px] text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[var(--brand-lime)]">
          {messages.pricing.eyebrow}
        </p>
        <h2 className="mt-4 text-[3rem] font-black leading-none tracking-[-0.04em] text-white md:text-[4rem]">
          {messages.pricing.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--brand-silver)]">
          {messages.pricing.subtitle}
        </p>
      </div>

      <div className="relative mt-12 grid w-full gap-6 lg:grid-cols-3">
        {messages.pricing.cards.map((card, index) => {
          const highlighted = index === 1;

          return (
            <motion.article
              key={card.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={[
                "relative rounded-[10px] border p-7 text-left shadow-[0_20px_70px_rgba(0,0,0,0.28)]",
                highlighted
                  ? "border-[var(--brand-lime)]/60 bg-[linear-gradient(180deg,rgba(34,39,29,0.98),rgba(17,18,16,0.98))]"
                  : "glass-panel"
              ].join(" ")}
              dir={messages.locale === "en" ? "ltr" : "rtl"}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(149,223,30,0.45),transparent)]" />
              <div className="absolute right-[-4rem] top-[-4rem] h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(149,223,30,0.18),transparent_66%)] blur-2xl" />

              {card.badge ? (
                <div className="absolute right-5 top-4 rounded-full bg-[var(--brand-lime)] px-3 py-1 text-[9px] font-black uppercase tracking-[0.24em] text-[var(--brand-black)]">
                  {card.badge}
                </div>
              ) : null}

              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/8 bg-black/35">
                  <Image
                    src={highlighted ? "/brand/2x-plus.png" : "/brand/plus.png"}
                    alt=""
                    aria-hidden="true"
                    width={56}
                    height={24}
                    className={highlighted ? "h-auto w-8" : "h-auto w-5"}
                  />
                </span>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white">
                  {card.name}
                </p>
              </div>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-5xl font-black leading-none text-[var(--brand-lime)]">
                  {card.price}
                </span>
                {card.suffix ? (
                  <span className="mb-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-silver)]">
                    {card.suffix}
                  </span>
                ) : null}
              </div>

              <p className="mt-5 min-h-16 text-sm leading-6 text-[var(--brand-silver)]">
                {card.description}
              </p>

              <div className="mt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-lime)]/90">
                  {featuresLabel}
                </p>
                <ul className="mt-4 space-y-3">
                  {card.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-6 text-[var(--brand-off-white)]"
                    >
                      <span className="mt-1 text-[var(--brand-lime)]">+</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => choosePlan(card.name)}
                className={[
                  "mt-8 inline-flex w-full items-center justify-center text-center",
                  highlighted ? "btn-primary" : "btn-outline"
                ].join(" ")}
              >
                {card.cta}
              </button>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
