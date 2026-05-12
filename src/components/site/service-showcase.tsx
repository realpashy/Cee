"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SiteMessages } from "@/lib/i18n";

function BrandPill({ text }: { text: string }) {
  return (
    <div className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-[9px] font-bold uppercase tracking-[0.28em] text-[var(--brand-silver)]">
      <Image
        src="/brand/plus.png"
        alt=""
        aria-hidden="true"
        width={20}
        height={20}
        className="h-4 w-4 object-contain"
      />
      {text}
    </div>
  );
}

function ServiceMedia({
  index,
  locale,
  chipA,
  chipB
}: {
  index: number;
  locale: SiteMessages["locale"];
  chipA: string;
  chipB: string;
}) {
  if (index === 0) {
    return (
      <div className="relative h-full min-h-[300px] rounded-[10px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,20,17,0.97),rgba(10,11,10,0.98))] p-5 sm:min-h-[420px] sm:p-7">
        <div className="grid h-full gap-5 md:grid-cols-[0.42fr_0.58fr]">
          <div className="rounded-[10px] bg-[rgb(12_13_12)] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--brand-silver)]">
              {locale === "he" ? "לפני" : locale === "ar" ? "قبل" : "Before"}
            </p>
            <div className="mt-8 h-[72%] rounded-[10px] bg-[rgb(24_25_24)]" />
          </div>
          <div className="relative rounded-[10px] border border-[var(--brand-lime)]/20 bg-[rgb(17_18_16)] p-6">
            <Image
              src="/brand/cee-logo.png"
              alt="Cee+"
              width={170}
              height={60}
              className="h-auto w-[118px]"
            />
            <div className="mt-10 h-16 rounded-[10px] bg-[rgb(25_27_24)]" />
            <div className="mt-4 h-24 rounded-[10px] bg-[rgb(25_27_24)]" />
            <div className="mt-8 h-2 w-24 rounded-full bg-[var(--brand-lime)]" />
            <div className="absolute right-6 top-6 h-5 w-5 rounded-full bg-[var(--brand-lime)] shadow-[0_0_24px_rgba(149,223,30,0.45)]" />
          </div>
        </div>
        <div className="absolute bottom-6 left-7">
          <BrandPill text={chipB} />
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="relative flex h-full min-h-[300px] items-center justify-center rounded-[10px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,20,17,0.97),rgba(10,11,10,0.98))] p-5 sm:min-h-[420px] sm:p-8">
        <div className="relative h-[400px] w-[240px] rounded-[10px] border border-white/10 bg-[rgb(12_13_12)] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
          <div className="h-4 w-16 rounded-full bg-[var(--brand-lime)]/90" />
          <div className="mt-12 flex h-32 w-32 items-center justify-center rounded-full border border-[var(--brand-lime)]/20 bg-[rgb(25_27_24)] mx-auto">
            <Image
              src="/brand/plus.png"
              alt=""
              aria-hidden="true"
              width={70}
              height={70}
              className="h-auto w-14 object-contain"
            />
          </div>
          <div className="mt-12 h-3 w-24 rounded-full bg-[var(--brand-lime)] mx-auto" />
          <div className="mt-5 rounded-[10px] border border-white/8 bg-[rgb(19_20_18)] px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.24em] text-[var(--brand-lime)]">
            {locale === "he" ? "Viral Hook" : locale === "ar" ? "Viral Hook" : "Viral Hook"}
          </div>
        </div>
        <div className="absolute bottom-6 left-7">
          <BrandPill text={chipB} />
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="relative h-full min-h-[300px] overflow-hidden rounded-[10px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,20,17,0.97),rgba(10,11,10,0.98))] p-5 sm:min-h-[420px] sm:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_20%,rgba(149,223,30,0.16),transparent_28%)]" />
        <div className="grid h-full gap-5 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[10px] border border-white/8 bg-[rgb(14_15_14)] p-6">
            <Image
              src="/brand/brand-sheet.png"
              alt="Cee+ brand reference"
              width={1200}
              height={900}
              className="h-full w-full rounded-[10px] object-cover object-top"
            />
          </div>
          <div className="space-y-4">
            <div className="h-28 rounded-[10px] bg-[rgb(22_24_21)]" />
            <div className="h-28 rounded-[10px] bg-[rgb(26_28_25)]" />
            <div className="flex h-20 items-center rounded-[10px] border border-[var(--brand-lime)]/18 bg-[rgb(17_18_16)] px-5">
              <BrandPill text={chipA} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (index === 3) {
    return (
      <div className="relative h-full min-h-[300px] rounded-[10px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,20,17,0.97),rgba(10,11,10,0.98))] p-5 sm:min-h-[420px] sm:p-8">
        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-[10px] bg-[rgb(27_30_24)] p-6">
            <div className="mb-6 h-8 w-8 rounded-full border border-[var(--brand-lime)]/45" />
            <p className="text-5xl font-black leading-none text-[var(--brand-lime)]">4.2x</p>
            <p className="mt-2 text-3xl font-black leading-none text-[var(--brand-lime)]">ROAS</p>
          </div>
          <div className="rounded-[10px] bg-[var(--brand-lime)] p-6 text-[var(--brand-black)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em]">
              {locale === "he" ? "הכנסה שגדלה" : locale === "ar" ? "إيراد متصاعد" : "Revenue Scaled"}
            </p>
            <p className="mt-10 text-5xl font-black leading-none">₪9M+</p>
          </div>
        </div>
        <div className="mt-6 rounded-full bg-[rgb(33_36_30)] p-3">
          <div className="h-2 w-1/2 rounded-full bg-[var(--brand-lime)]" />
        </div>
        <div className="absolute bottom-6 left-7">
          <BrandPill text={chipB} />
        </div>
      </div>
    );
  }

  if (index === 4) {
    return (
      <div className="relative h-full min-h-[300px] rounded-[10px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,20,17,0.97),rgba(10,11,10,0.98))] p-5 sm:min-h-[420px] sm:p-7">
        <div className="rounded-[10px] border border-white/8 bg-[rgb(12_13_12)] p-6">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/cee-wordmark.png"
              alt="Cee+"
              width={136}
              height={48}
              className="h-auto w-[88px]"
            />
            <div className="h-3 w-24 rounded-full bg-white/10" />
          </div>
          <div className="mt-8 h-28 rounded-[10px] bg-[rgb(22_24_21)]" />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="h-40 rounded-[10px] bg-[rgb(18_19_18)]" />
            <div className="h-40 rounded-[10px] border border-[var(--brand-lime)]/18 bg-[rgb(17_18_16)]" />
          </div>
        </div>
        <div className="absolute bottom-6 left-7">
          <BrandPill text={chipA} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[300px] rounded-[10px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,20,17,0.97),rgba(10,11,10,0.98))] p-5 sm:min-h-[420px] sm:p-8">
      <div className="grid h-full gap-5 md:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[10px] bg-[rgb(22_24_21)] p-5">
          <div className="h-10 rounded-[10px] bg-[var(--brand-lime)]/18" />
          <div className="mt-4 h-10 rounded-[10px] bg-[rgb(30_32_29)]" />
          <div className="mt-4 h-10 rounded-[10px] bg-[rgb(30_32_29)]" />
          <div className="mt-6 flex justify-center">
            <Image
              src="/brand/plus.png"
              alt=""
              aria-hidden="true"
              width={62}
              height={62}
              className="h-auto w-14 object-contain"
            />
          </div>
        </div>
        <div className="rounded-[10px] border border-[var(--brand-lime)]/18 bg-[rgb(15_17_14)] p-5">
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 rounded-full bg-[var(--brand-lime)]" />
            <span className="h-2 flex-1 rounded-full bg-white/10" />
          </div>
          <div className="mt-8 h-24 rounded-[10px] bg-[rgb(24_26_23)]" />
          <div className="mt-6 h-3 w-24 rounded-full bg-[var(--brand-lime)]" />
          <div className="mt-7">
            <BrandPill text={chipB} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServiceShowcase({ messages }: { messages: SiteMessages }) {
  const isRtl = messages.locale !== "en";
  const isArabic = messages.locale === "ar";
  const sectionRef = useRef<HTMLElement | null>(null);
  const lockRef = useRef(false);
  const wheelLockRef = useRef(false);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [isDesktop, setIsDesktop] = useState(false);
  const serviceCount = messages.services.items.length;
  const items = useMemo(() => messages.services.items, [messages.services.items]);
  const maxIndex = Math.max(serviceCount - 1, 0);

  useEffect(() => {
    const syncViewportMode = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    syncViewportMode();
    window.addEventListener("resize", syncViewportMode);

    return () => {
      window.removeEventListener("resize", syncViewportMode);
    };
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    const lockBodyScroll = () => {
      if (lockRef.current) {
        return;
      }

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      lockRef.current = true;
    };

    const unlockBodyScroll = (targetTop?: number) => {
      if (!lockRef.current) {
        if (typeof targetTop === "number") {
          window.scrollTo({ top: targetTop, behavior: "smooth" });
        }
        return;
      }

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lockRef.current = false;

      if (typeof targetTop === "number") {
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      }
    };

    const alignSectionToViewport = (sectionTop: number) => {
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
    };

    const releaseWheelLock = window.setTimeout;

    const advanceSlide = (direction: number) => {
      setSlideDirection(direction > 0 ? 1 : -1);
      setActiveIndex((current) => {
        const nextIndex = Math.min(Math.max(current + direction, 0), maxIndex);
        return nextIndex;
      });
    };

    const onWheel = (event: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const sectionPageTop = window.scrollY + rect.top;
      const viewportHeight = window.innerHeight;
      const lockThreshold = Math.min(viewportHeight * 0.28, 220);
      const inLockZone = rect.top <= lockThreshold && rect.bottom >= viewportHeight - lockThreshold;
      if (!inLockZone) {
        return;
      }

      const direction = Math.sign(event.deltaY);
      if (direction === 0) {
        return;
      }

      event.preventDefault();
      lockBodyScroll();

      if (wheelLockRef.current) {
        return;
      }

      if (Math.abs(rect.top) > 8) {
        alignSectionToViewport(sectionPageTop);
        wheelLockRef.current = true;
        releaseWheelLock(() => {
          wheelLockRef.current = false;
        }, 420);
        return;
      }

      if (direction > 0 && activeIndexRef.current >= maxIndex) {
        unlockBodyScroll(sectionPageTop + viewportHeight);
        return;
      }

      if (direction < 0 && activeIndexRef.current <= 0) {
        unlockBodyScroll(Math.max(sectionPageTop - viewportHeight, 0));
        return;
      }

      wheelLockRef.current = true;
      advanceSlide(direction > 0 ? 1 : -1);
      releaseWheelLock(() => {
        wheelLockRef.current = false;
      }, 520);
    };

    const onResize = () => {
      setActiveIndex((current) => Math.min(current, maxIndex));
      unlockBodyScroll();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        unlockBodyScroll();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      unlockBodyScroll();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isDesktop, maxIndex]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-10 md:py-16 lg:py-0"
      style={isDesktop ? { height: "100vh" } : undefined}
    >
      <div className="mb-8 lg:hidden">
        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[var(--brand-lime)]">
          {messages.services.eyebrow}
        </p>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-silver)]">
          {messages.locale === "he"
            ? "החליקו לצדדים"
            : messages.locale === "ar"
              ? "اسحبوا أفقيًا"
              : "Swipe sideways"}
        </p>
      </div>

      <div className="relative lg:hidden">
        <div
          className={[
            "service-rail -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-4 pb-4 md:-mx-8 md:px-8 [overscroll-behavior-x:contain] [touch-action:pan-x]",
            isRtl ? "flex-row-reverse" : ""
          ].join(" ")}
        >
          {items.map((item, index) => (
            <article
              key={item.title}
              className="relative w-[88vw] max-w-[360px] shrink-0 snap-center md:w-[calc(100vw-4rem)] md:max-w-none"
              dir={isRtl ? "rtl" : "ltr"}
            >
              <div className="grid gap-6 py-2">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className={["relative z-10 max-w-[430px]", isRtl ? "mr-auto text-right" : ""].join(" ")}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[var(--brand-lime)]">
                    {item.kicker}
                  </p>
                  <h3
                    className={[
                      "mt-4 max-w-[8ch] text-[2.6rem] font-black text-white",
                      isArabic
                        ? "leading-[1.08] tracking-normal"
                        : "uppercase leading-[0.88] tracking-[-0.05em]"
                    ].join(" ")}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-6 text-base leading-7 text-[var(--brand-silver)]">
                    {item.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <BrandPill text={item.chipA} />
                    <BrandPill text={item.chipB} />
                  </div>
                  <a href="#intake" className="btn-primary mt-7">
                    {item.cta}
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  <ServiceMedia
                    index={index}
                    locale={messages.locale}
                    chipA={item.chipA}
                    chipB={item.chipB}
                  />
                </motion.div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="relative hidden lg:block">
        <div className="h-screen overflow-hidden">
          <div className="absolute left-1/2 top-0 z-10 h-screen w-full max-w-[1580px] -translate-x-1/2 px-4 md:px-8 xl:px-10">
            <div className="pt-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[var(--brand-lime)]">
                {messages.services.eyebrow}
              </p>
            </div>
          </div>
          <div
            className={[
              "pointer-events-none absolute top-1/2 z-20 hidden -translate-y-1/2 xl:block",
              isRtl ? "-left-14 2xl:-left-20" : "-right-14 2xl:-right-20"
            ].join(" ")}
          >
            <div className="flex flex-col gap-3">
              {items.map((item, index) => {
                const active = index === activeIndex;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => {
                      const section = sectionRef.current;
                      if (!section) {
                        return;
                      }
                      const targetTop =
                        window.scrollY + section.getBoundingClientRect().top;
                      setSlideDirection(index > activeIndexRef.current ? 1 : -1);
                      setActiveIndex(Math.min(index, maxIndex));
                      window.scrollTo({ top: targetTop, behavior: "smooth" });
                    }}
                    className="pointer-events-auto group relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[rgb(16_18_15_/_0.84)]"
                  >
                    <span
                      className={[
                        "h-3 w-3 rounded-full transition-all duration-200",
                        active ? "bg-[var(--brand-lime)] scale-110" : "bg-white/12"
                      ].join(" ")}
                    />
                    <span
                      className={[
                        "absolute whitespace-nowrap rounded-full border border-white/10 bg-black/75 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.24em] text-[var(--brand-silver)] opacity-0 transition group-hover:opacity-100",
                        isRtl ? "left-12" : "right-12"
                      ].join(" ")}
                    >
                      {item.navLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="absolute inset-x-[12%] top-[22%] h-[42vh] rounded-[44px] bg-[radial-gradient(circle,rgba(149,223,30,0.08),transparent_62%)] blur-3xl" />
          <div
            className="flex h-screen items-center"
          >
            <div className="relative h-full w-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={`${messages.locale}-${activeIndex}`}
                  initial={{ opacity: 0, x: slideDirection > 0 ? 120 : -120 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: slideDirection > 0 ? -120 : 120 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                  dir="ltr"
                >
                  <div
                    className={[
                      "mx-auto flex h-full w-full max-w-[1580px] flex-col items-center justify-center gap-10 px-4 py-10 md:px-8 xl:px-10 lg:flex-row lg:gap-14 lg:py-14"
                    ].join(" ")}
                  >
                    <div
                      dir={isRtl ? "rtl" : "ltr"}
                      className={[
                        "relative z-10 w-full lg:flex-[0_0_38%]",
                        isRtl
                          ? "text-right lg:order-2 lg:pr-8 xl:pr-12"
                          : "text-left lg:order-1 lg:pl-2"
                      ].join(" ")}
                    >
                      <div className={isRtl ? "ml-auto max-w-[430px]" : "max-w-[430px]"}>
                        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[var(--brand-lime)]">
                          {items[activeIndex]?.kicker}
                        </p>
                        <h3
                          className={[
                            "mt-4 max-w-[8ch] font-black text-white md:text-[4.3rem]",
                            isArabic
                              ? "text-[3rem] leading-[1.08] tracking-normal md:leading-[1.1]"
                              : "text-[3rem] uppercase leading-[0.88] tracking-[-0.05em]"
                          ].join(" ")}
                        >
                          {items[activeIndex]?.title}
                        </h3>
                        <p className="mt-6 text-base leading-7 text-[var(--brand-silver)]">
                          {items[activeIndex]?.description}
                        </p>
                        <div
                          className={[
                            "mt-6 flex flex-wrap gap-3",
                            isRtl ? "justify-end" : "justify-start"
                          ].join(" ")}
                        >
                          <BrandPill text={items[activeIndex]?.chipA ?? ""} />
                          <BrandPill text={items[activeIndex]?.chipB ?? ""} />
                        </div>
                        <a href="#intake" className="btn-primary mt-7">
                          {items[activeIndex]?.cta}
                        </a>
                      </div>
                    </div>

                    <div
                      dir="ltr"
                      className={[
                        "relative z-10 w-full lg:flex-[0_0_62%]",
                        isRtl
                          ? "lg:order-1 lg:pl-4 xl:pl-8"
                          : "lg:order-2 lg:pr-4 xl:pr-8"
                      ].join(" ")}
                    >
                      <div className={isRtl ? "mr-0 ml-auto w-full max-w-[900px]" : "w-full max-w-[900px]"}>
                        <ServiceMedia
                          index={activeIndex}
                          locale={messages.locale}
                          chipA={items[activeIndex]?.chipA ?? ""}
                          chipB={items[activeIndex]?.chipB ?? ""}
                        />
                      </div>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
