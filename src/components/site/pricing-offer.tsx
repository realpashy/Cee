"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { SiteMessages } from "@/lib/i18n";

export function PricingOffer({ messages }: { messages: SiteMessages }) {
  const isRtl = messages.locale !== "en";
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
        <h2
          className={[
            "mt-4 font-black text-white text-[2.4rem] md:text-[3.2rem]",
            messages.locale === "ar"
              ? "leading-[1.18] tracking-normal"
              : "leading-[0.96] tracking-[-0.04em]"
          ].join(" ")}
        >
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
                "relative rounded-[10px] border p-7 shadow-[0_20px_70px_rgba(0,0,0,0.28)]",
                isRtl ? "text-right" : "text-left",
                highlighted
                  ? "border-[var(--brand-lime)]/60 bg-[linear-gradient(180deg,rgba(34,39,29,0.98),rgba(17,18,16,0.98))]"
                  : "glass-panel"
              ].join(" ")}
              dir={messages.locale === "en" ? "ltr" : "rtl"}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(149,223,30,0.45),transparent)]" />
              <div className="absolute right-[-4rem] top-[-4rem] h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(149,223,30,0.18),transparent_66%)] blur-2xl" />

              {card.badge ? (
                <div
                  className={[
                    "absolute top-4 rounded-full bg-[var(--brand-lime)] px-3 py-1 text-[9px] font-black uppercase tracking-[0.24em] text-[var(--brand-black)]",
                    isRtl ? "left-5" : "right-5"
                  ].join(" ")}
                >
                  {card.badge}
                </div>
              ) : null}

              <div
                className={[
                  "mb-5 flex items-center gap-3",
                  isRtl ? "flex-row-reverse justify-end text-right" : ""
                ].join(" ")}
              >
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
              <div
                className={[
                  "mt-5 flex w-full items-end gap-2",
                  isRtl ? "flex-row-reverse justify-start text-right" : "justify-start text-left"
                ].join(" ")}
              >
                <span className="text-5xl font-black leading-none text-[var(--brand-lime)]">
                  {card.price}
                </span>
                {card.suffix ? (
                  <span className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--brand-silver)]">
                    {card.suffix}
                  </span>
                ) : null}
              </div>

              <p className={["mt-5 min-h-16 text-sm leading-6 text-[var(--brand-silver)]", isRtl ? "text-right" : "text-left"].join(" ")}>
                {card.description}
              </p>

              <div className="mt-6">
                <p className={["text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-lime)]/90", isRtl ? "text-right" : "text-left"].join(" ")}>
                  {featuresLabel}
                </p>
                <ul className="mt-4 space-y-3">
                  {card.features.map((feature) => (
                    <li
                      key={feature}
                      className={[
                        "flex w-full items-start gap-3 text-sm leading-6 text-[var(--brand-off-white)]",
                        isRtl ? "flex-row-reverse justify-between text-right" : "justify-start text-left"
                      ].join(" ")}
                      dir={isRtl ? "rtl" : "ltr"}
                    >
                      <span className="mt-1 shrink-0 text-[var(--brand-lime)]">+</span>
                      <span className={isRtl ? "flex-1 text-right" : "flex-1 text-left"}>{feature}</span>
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
