"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { SiteMessages } from "@/lib/i18n";

function scrollToIntake() {
  document.getElementById("intake")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

export function Hero({ messages }: { messages: SiteMessages }) {
  return (
    <section className="relative overflow-hidden pb-20 pt-6 md:pb-28 md:pt-8">
      <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_70%_22%,rgba(149,223,30,0.16),transparent_24%),radial-gradient(circle_at_34%_12%,rgba(149,223,30,0.09),transparent_18%)]" />

      <div className="grid min-h-[84vh] w-full gap-10 lg:grid-cols-[0.6fr_0.4fr] lg:items-center">
        <div className="relative z-10 py-4 pr-2 md:py-8 md:pr-6 lg:pr-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[var(--brand-lime)]">
            {messages.hero.eyebrow}
          </p>

          <h1 className="mt-6 max-w-full text-[3.3rem] font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-[4.8rem] lg:max-w-[10.8ch] lg:text-[5.2rem] lg:leading-[1.02]">
            {messages.hero.titleLines.map((line, index) => {
              const isAccent = line.includes("Bigger") || line.includes("Faster");

              return (
                <span
                  key={`${line}-${index}`}
                  className={[
                    "hero-title-line",
                    isAccent ? "text-[var(--brand-lime)]" : ""
                  ].join(" ")}
                >
                  {line}
                </span>
              );
            })}
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-[var(--brand-silver)]">
            {messages.hero.subtitle}
          </p>

          <div className="mt-7 flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-silver)]">
            <span className="glass-panel rounded-full px-4 py-2">
              Premium Visual Positioning
            </span>
            <span className="glass-panel rounded-full px-4 py-2">
              Fast WhatsApp Conversion Flow
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={scrollToIntake}
              className="inline-flex items-center justify-center gap-3 rounded-[10px] border border-[var(--brand-lime)]/45 bg-[var(--brand-lime)] px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-[var(--brand-black)] shadow-[0_0_36px_rgba(149,223,30,0.2)] transition hover:scale-[1.03] hover:bg-[var(--brand-lime-bright)]"
            >
              <Image
                src="/brand/2x-plus.png"
                alt=""
                aria-hidden="true"
                width={112}
                height={42}
                className="h-auto w-[76px] rounded-[5px] bg-[rgb(14_15_14)] p-1.5"
              />
              {messages.hero.primaryCta}
            </button>
            <a
              href="#services"
              className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--brand-silver)] transition hover:text-[var(--brand-off-white)]"
            >
              {messages.hero.secondaryCta}
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10"
              >
                ↓
              </motion.span>
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto h-[400px] w-full max-w-[500px] lg:h-[540px] lg:max-w-[560px]"
        >
          <motion.div
            animate={{ opacity: [0.75, 1, 0.75], scale: [1, 1.04, 1] }}
            transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY }}
            className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(149,223,30,0.18),transparent_62%)] blur-2xl md:h-[420px] md:w-[420px]"
          />
          <div className="absolute inset-0 rounded-[10px] bg-[linear-gradient(180deg,rgba(149,223,30,0.06),rgba(149,223,30,0.01))]" />
          <motion.div
            animate={{ rotate: [0, 4, 0], y: [0, -4, 0] }}
            transition={{ duration: 5.8, repeat: Number.POSITIVE_INFINITY }}
            className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-[10px] border border-white/8 bg-[rgb(18_20_17_/_0.82)] shadow-[0_25px_90px_rgba(0,0,0,0.52)] backdrop-blur-2xl md:h-[320px] md:w-[320px]"
          >
            <div className="absolute inset-x-6 top-5 flex items-center justify-between text-[9px] uppercase tracking-[0.3em] text-[var(--brand-silver)]/60">
              <span>{messages.hero.proofLabel}</span>
              <span>Ver: 2.0.4_AI</span>
            </div>

            <div className="absolute left-1/2 top-1/2 flex h-[112px] w-[210px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[10px] border border-white/8 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] shadow-[0_10px_60px_rgba(149,223,30,0.07)] backdrop-blur-xl">
              <Image
                src="/brand/cee-logo.png"
                alt="Cee+ logo"
                width={180}
                height={62}
                className="h-auto w-[124px]"
              />
            </div>

            <div className="absolute bottom-5 left-6 text-[9px] uppercase tracking-[0.3em] text-[var(--brand-silver)]/60">
              {messages.hero.proofValue}
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY }}
            className="absolute right-4 top-[18%] h-[210px] w-[120px] rounded-[10px] border border-[var(--brand-lime)]/28 bg-[rgb(17_19_15_/_0.85)] shadow-[0_0_40px_rgba(149,223,30,0.08)]"
          >
            <div className="absolute inset-x-4 top-5 h-2 rounded-full bg-white/8" />
            <div className="absolute bottom-8 left-4 right-4 h-1.5 rounded-full bg-[var(--brand-lime)]" />
            <div className="absolute right-4 top-14 h-5 w-5 rounded-full bg-[var(--brand-lime)] shadow-[0_0_25px_rgba(149,223,30,0.4)]" />
          </motion.div>

          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute left-5 top-[34%] h-[92px] w-[150px] rounded-[10px] border border-white/8 bg-[rgb(23_24_22_/_0.85)] backdrop-blur-xl"
          />
          <motion.div
            animate={{ x: [0, -8, 0], y: [0, 6, 0] }}
            transition={{ duration: 4.4, repeat: Number.POSITIVE_INFINITY }}
            className="glass-panel absolute right-10 top-[60%] rounded-[10px] px-4 py-3 text-[9px] font-bold uppercase tracking-[0.28em] text-[var(--brand-silver)]"
          >
            Revenue system live
          </motion.div>
          <div className="absolute left-20 top-[52%] flex h-[46px] w-[238px] items-center rounded-full border border-white/8 bg-[rgb(30_31_28_/_0.85)] px-4 py-3 text-[9px] font-bold uppercase tracking-[0.28em] text-[var(--brand-silver)]">
            <Image
              src="/brand/plus.png"
              alt=""
              aria-hidden="true"
              width={28}
              height={28}
              className="mr-2 h-5 w-5 object-contain"
            />
            Strategic Model 1.5
          </div>
        </motion.div>
      </div>
    </section>
  );
}
