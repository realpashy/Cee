"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue
} from "framer-motion";
import {
  Bot,
  CheckCircle2,
  ChevronLeft,
  Gift,
  Heart,
  Megaphone,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
  Trophy,
  Users,
  WandSparkles
} from "lucide-react";

import { SectionReveal } from "@/components/site/section-reveal";
import quotationData from "@/content/quotation/sweetime.json";
import { cn } from "@/lib/utils";

const positioningCards = [
  {
    title: "שיווק שמחובר לביצועים",
    text: "לא רק חשיפות או לייקים, אלא קמפיינים שמביאים תנועה לחנות, רכישות, הרשמות וקופונים שמניעים קנייה.",
    icon: Target
  },
  {
    title: "קריאייטיב מהיר עם AI",
    text: "Cee+ משתמשת ב-AI כדי לייצר הוקים, קופי, זוויות תוכן ווריאציות מודעה בקצב גבוה יותר ועם יותר בדיקות.",
    icon: Bot
  },
  {
    title: "חוויה מותאמת ל-Sweetime",
    text: "ההצעה נשענת על העולם הצבעוני של Sweetime, על חוויית החנות, ועל מוצרים שקל למכור מחדש בצורה חכמה.",
    icon: WandSparkles
  },
  {
    title: "נאמנות ולקוחות חוזרים",
    text: "מועדון, הטבות, WhatsApp וקמפיינים חוזרים שמחזירים לקוחות לקנייה נוספת, לא רק לביקור חד־פעמי.",
    icon: Heart
  }
] as const;

const includedServices = [
  { title: "אסטרטגיה חודשית", text: "כיוון חודשי לפי מוצרים, חגים, מבצעים ומטרות מכירה.", icon: Sparkles },
  { title: "ניהול קמפיינים", text: "Meta / TikTok, קהלים, תקציבים, אופטימיזציה וקריאייטיב.", icon: Megaphone },
  { title: "קופי ומסרים", text: "שפה שיווקית שמתאימה ל-Sweetime ולקהל המקומי.", icon: MessageCircle },
  { title: "קריאייטיב AI + תוכן", text: "רעיונות, וריאציות, הוקים וסקריפטים להאצת ההפקה.", icon: Bot },
  { title: "הצעות ומבצעים", text: "בניית סיבות חזקות לקנות עכשיו, ולא אחר כך.", icon: Gift },
  { title: "מועדון ו-WhatsApp", text: "תשתית לקשר חוזר עם לקוחות ולהחזרת קונים לחנות.", icon: Users },
  { title: "Cross-sell והגדלת סל", text: "תוספות חכמות להזמנה, מארזים והצעות משלימות.", icon: ShoppingBag },
  { title: "דוחות ותובנות", text: "מעקב ביצועים, מסקנות והחלטות לשיפור מתמשך.", icon: Trophy }
] as const;

const trustCards = [
  {
    title: "Cee+ Hands-on",
    text: "Cee+ לא רק מגדירה כיוון, אלא מלווה בפועל את הקריאייטיב, המודעות, המסרים והמבצעים.",
    icon: Sparkles
  },
  {
    title: "חשיבה על כל המסלול",
    text: "מהמודעה ועד לחנות, להרשמה, לקופון ולחזרה של הלקוח — כמערכת אחת.",
    icon: Store
  },
  {
    title: "ניסיון נרחב בפרסום",
    text: "ניסיון בניהול בפועל של מעל ‎₪10M+‎ בתקציבי פרסום, עם דגש על ביצועים וקריאייטיב שעובד.",
    icon: Target
  },
  {
    title: "Growth Partner אמיתי",
    text: "Cee+ בונה מנוע צמיחה עסקי, לא רק קמפיין חודשי שנגמר בלי תשתית להמשך.",
    icon: Trophy
  }
] as const;

const finalHighlights = [
  "בניית מנגנון שמחבר בין פרסום, תוכן, מועדון לקוחות ו-WhatsApp.",
  "שימוש ב-Creative + AI כדי להפיק יותר רעיונות, מהר יותר, עם בדיקות חכמות.",
  "מסלול שמכוון גם להגדלת תנועה לחנות וגם ליצירת לקוחות חוזרים לאורך זמן."
] as const;

const proposalMeta = [
  { label: "מאת", value: "ג'מאל ג'ובראן | Cee+", forceLtr: false },
  { label: "תאריך", value: "29/05/2026", forceLtr: true },
  { label: "בתוקף עד", value: "06/06/2026", forceLtr: true }
] as const;

function extractCurrencyValue(input: string) {
  const match = input.replace(/,/g, "").match(/₪\s?(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
}

function formatCurrency(value: number) {
  return `₪${value.toLocaleString("he-IL")}`;
}

function getTotalInvestment(plan: (typeof quotationData.plans)[number]) {
  const adBudget = extractCurrencyValue(plan.adBudget);
  const managementFee = extractCurrencyValue(plan.managementFee);

  if (!adBudget || !managementFee) {
    return null;
  }

  return adBudget + managementFee;
}

function StripeLayer({
  colorA,
  colorB,
  x,
  y,
  opacity = 0.32
}: {
  colorA: string;
  colorB: string;
  x: MotionValue<string>;
  y: MotionValue<string>;
  opacity?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ x, y, opacity }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, ${colorA} 0px, ${colorA} 18px, ${colorB} 18px, ${colorB} 46px)`
        }}
      />
    </motion.div>
  );
}

function ProposalSection({
  id,
  tone = "white",
  children,
  className,
  innerClassName
}: {
  id?: string;
  tone?: "white" | "blue" | "pink" | "blend" | "cee";
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const stripeY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const stripeX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const tones = {
    white: {
      panel: "bg-white border-[#D9E5F1]",
      stripeA: "rgba(22,155,238,0.07)",
      stripeB: "rgba(242,56,147,0.02)",
      glowA: "rgba(22,155,238,0.16)",
      glowB: "rgba(242,56,147,0.12)"
    },
    blue: {
      panel: "bg-[linear-gradient(180deg,#F4FAFF_0%,#FFFFFF_100%)] border-[#D7E6F6]",
      stripeA: "rgba(28,162,235,0.12)",
      stripeB: "rgba(255,255,255,0.00)",
      glowA: "rgba(28,162,235,0.18)",
      glowB: "rgba(242,56,147,0.10)"
    },
    pink: {
      panel: "bg-[linear-gradient(180deg,#FFF6FB_0%,#FFFFFF_100%)] border-[#F0D8E5]",
      stripeA: "rgba(242,56,147,0.10)",
      stripeB: "rgba(22,155,238,0.03)",
      glowA: "rgba(242,56,147,0.18)",
      glowB: "rgba(22,155,238,0.12)"
    },
    blend: {
      panel: "bg-[linear-gradient(135deg,#FCFEFF_0%,#F3FAFF_52%,#FFF5FB_100%)] border-[#D9E5F1]",
      stripeA: "rgba(22,155,238,0.09)",
      stripeB: "rgba(242,56,147,0.07)",
      glowA: "rgba(22,155,238,0.15)",
      glowB: "rgba(242,56,147,0.16)"
    },
    cee: {
      panel: "bg-[#090B11] border-[#202531]",
      stripeA: "rgba(149,223,30,0.10)",
      stripeB: "rgba(255,255,255,0.01)",
      glowA: "rgba(149,223,30,0.20)",
      glowB: "rgba(149,223,30,0.10)"
    }
  } as const;

  const theme = tones[tone];

  return (
    <section ref={ref} id={id} className={cn("px-4 py-4 md:px-8 md:py-5", className)}>
      <div
        className={cn(
          "relative mx-auto max-w-[1240px] overflow-hidden rounded-[8px] border px-5 py-8 shadow-[0_20px_55px_rgba(16,32,68,0.07)] md:px-8 md:py-10",
          theme.panel,
          innerClassName
        )}
      >
        <StripeLayer colorA={theme.stripeA} colorB={theme.stripeB} x={stripeX} y={stripeY} />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 top-4 h-44 w-44 rounded-[8px] blur-3xl"
          style={{
            y: glowY,
            background: `radial-gradient(circle, ${theme.glowA} 0%, transparent 72%)`
          }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 right-0 h-52 w-52 rounded-[8px] blur-3xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], ["10%", "-6%"]),
            background: `radial-gradient(circle, ${theme.glowB} 0%, transparent 72%)`
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "right";
  dark?: boolean;
}) {
  return (
    <div className={cn("mx-auto max-w-4xl", align === "center" ? "text-center" : "text-right")}>
      <p className={cn("text-sm font-bold tracking-[0.18em]", dark ? "text-[#95DF1E]" : "text-[#F23893]")}>{eyebrow}</p>
      <h2 className={cn("mt-3 text-[2rem] font-black leading-[1.08] md:text-[2.8rem]", dark ? "text-white" : "text-[#102044]")}>
        {title}
      </h2>
      <p className={cn("mt-4 text-base leading-8 md:text-lg", dark ? "text-white/78" : "text-[#4D5D74]")}>{description}</p>
    </div>
  );
}

function QuotationButton({
  href,
  children,
  variant = "primary",
  className
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "recommended" | "cee";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[8px] px-5 py-3 text-sm font-bold transition duration-200 hover:-translate-y-0.5",
        variant === "primary" &&
          "bg-[#102044] text-white shadow-[0_16px_28px_rgba(16,32,68,0.18)] hover:bg-[#0B1A38]",
        variant === "secondary" &&
          "border border-[#B9D7EE] bg-[#102044] text-white shadow-[0_10px_22px_rgba(16,32,68,0.07)] hover:border-[#102044] hover:bg-[#0C1732]",
        variant === "recommended" &&
          "bg-[#F23893] text-white shadow-[0_16px_28px_rgba(242,56,147,0.24)] hover:bg-[#D91D78]",
        variant === "cee" &&
          "border border-[#95DF1E]/35 bg-[#0B0D12] text-white shadow-[0_16px_32px_rgba(7,9,12,0.28)] hover:border-[#95DF1E] hover:bg-[#11141C]",
        className
      )}
    >
      {children}
    </a>
  );
}

function PricingCard({ plan, index }: { plan: (typeof quotationData.plans)[number]; index: number }) {
  const totalInvestment = getTotalInvestment(plan);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative flex h-full flex-col rounded-[8px] border bg-white p-5 shadow-[0_18px_42px_rgba(16,32,68,0.08)]",
        plan.recommended ? "border-[#F4B4D5]" : "border-[#D8E4EE]"
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1.5 rounded-t-[8px]",
          plan.recommended
            ? "bg-[linear-gradient(90deg,#F23893,#169BEE)]"
            : index === 1
              ? "bg-[linear-gradient(90deg,#169BEE,#81CFFF)]"
              : "bg-[linear-gradient(90deg,#D8EAF8,#B7D8F2)]"
        )}
      />

      <div className="mt-2 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div
            className={cn(
              "inline-flex rounded-[8px] px-3 py-1 text-xs font-bold",
              plan.recommended ? "bg-[#FFF0F8] text-[#B51667]" : "bg-[#EEF7FF] text-[#0F5E9D]"
            )}
          >
            {plan.badge ?? plan.label}
          </div>
          <h3 className="text-center text-[1.85rem] font-black leading-[1.02] text-[#102044]">{plan.name}</h3>
          {plan.badge ? <p className="text-sm font-bold text-[#F23893]">{plan.label}</p> : null}
        </div>

        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-[8px] text-base font-black text-white",
            plan.recommended ? "bg-[#F23893]" : index === 1 ? "bg-[#169BEE]" : "bg-[#7CBEEA]"
          )}
        >
          {index + 1}
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="rounded-[8px] border border-[#D8E4EE] bg-[#F7FBFF] px-4 py-3">
          <p className="text-xs font-bold tracking-[0.12em] text-[#169BEE]">תקציב מודעות</p>
          <p className="mt-2 text-xl font-black text-[#102044]">{plan.adBudget}</p>
        </div>
        <div className="rounded-[8px] border border-[#F8D0E3] bg-[#FFF7FB] px-4 py-3">
          <p className="text-xs font-bold tracking-[0.12em] text-[#F23893]">ניהול / שירות</p>
          <p className="mt-2 text-xl font-black text-[#102044]">{plan.managementFee}</p>
        </div>
        {totalInvestment ? (
          <div className="rounded-[8px] bg-[#102044] px-4 py-3 text-white">
            <p className="text-xs font-bold tracking-[0.12em] text-white/75">סה״כ השקעה חודשית</p>
            <p className="mt-2 text-[1.95rem] font-black leading-none">{formatCurrency(totalInvestment)}</p>
            <p className="mt-2 text-xs text-white/75">כולל תקציב מדיה + דמי ניהול / שירות</p>
          </div>
        ) : null}
      </div>

      <p className="mt-5 text-sm font-bold leading-7 text-[#102044]">{plan.paymentNote}</p>
      <p className="mt-4 text-base leading-8 text-[#425168]">{plan.description}</p>

      <ul className="mt-5 space-y-3">
        {plan.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3 text-sm leading-7 text-[#102044]">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#169BEE]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {plan.note ? (
        <div className="mt-5 rounded-[8px] border border-[#D8E4EE] bg-[#F7FBFF] px-4 py-3 text-sm leading-7 text-[#425168]">
          {plan.note}
        </div>
      ) : null}

      {plan.scalingNote ? (
        <div
          className={cn(
            "mt-5 rounded-[8px] px-4 py-3 text-sm leading-7",
            plan.recommended ? "bg-[#FFF0F8] text-[#A82062]" : "bg-[#EEF7FF] text-[#13588E]"
          )}
        >
          <p className="font-bold">{plan.scalingNote}</p>
          {"example" in plan && plan.example ? <p className="mt-1 text-xs">{plan.example}</p> : null}
        </div>
      ) : null}

      <div className="mt-auto pt-6">
        <QuotationButton href="#recommendation" variant={plan.recommended ? "recommended" : "primary"} className="w-full">
          {plan.button}
        </QuotationButton>
      </div>
    </motion.article>
  );
}

function RecommendationButton() {
  return (
    <QuotationButton
      href="https://wa.me/972502242816"
      variant="cee"
      className="w-full max-w-[340px] items-center justify-between px-5 py-4"
    >
      <div className="flex flex-col items-start text-right">
        <span className="text-base font-black" dir="ltr">
          Cee Bigger, Sell Faster
        </span>
        <span className="text-sm font-medium text-[#95DF1E]">שליחת הודעה לג׳מאל</span>
      </div>
      <ChevronLeft className="h-4 w-4 text-[#95DF1E]" />
    </QuotationButton>
  );
}

export function SweetimeQuotationPage() {
  const recommendedPlan = quotationData.plans.find((plan) => plan.recommended) ?? quotationData.plans[2];
  const recommendedTotal = getTotalInvestment(recommendedPlan);

  return (
    <main
      lang="he"
      dir="rtl"
      className="scroll-smooth bg-[linear-gradient(180deg,#F5F8FC_0%,#EFF7FF_36%,#FFF5FB_66%,#F9FBFF_100%)] text-right [font-family:var(--font-he),Heebo,system-ui,sans-serif]"
    >
      <ProposalSection tone="blend" className="pt-6">
        <div className="grid gap-8 lg:grid-cols-[0.54fr_0.46fr] lg:items-center">
          <SectionReveal>
            <div className="space-y-5">
              <div className="rounded-[8px] border border-[#D8E4EE] bg-white/92 p-4 shadow-[0_14px_30px_rgba(16,32,68,0.05)]">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-3">
                    <Image
                      src="/quotation/sweetime/cee-wordmark.webp"
                      alt="לוגו Cee+"
                      width={184}
                      height={56}
                      className="h-auto w-[138px]"
                    />
                    <div className="rounded-[8px] bg-[#F7FBFF] px-3 py-2 text-sm leading-6 text-[#4D5D74]">
                      <p className="font-bold text-[#102044]">
                        <span dir="ltr">Cee+</span> Growth Partner
                      </p>
                      <p>הצעת מחיר פרטית ותוכנית צמיחה שיווקית עבור Sweetime נוף הגליל</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <Image
                      src="/quotation/sweetime/logo-blue.jpg"
                      alt="לוגו Sweetime"
                      width={591}
                      height={591}
                      className="mr-auto h-auto w-[104px] rounded-[8px]"
                    />
                    <div className="grid gap-2">
                      {proposalMeta.map((item) => (
                        <div key={item.label} className="rounded-[8px] border border-[#DCEAF4] bg-white px-3 py-2 text-sm text-[#425168]">
                          <span className="font-bold text-[#102044]">{item.label}: </span>
                          <span dir={item.forceLtr ? "ltr" : undefined}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="inline-flex rounded-[8px] border border-[#F8D0E3] bg-[#FFF3FA] px-4 py-2 text-sm font-bold text-[#C41F72]">
                  תוכנית צמיחה צבעונית, ברורה ומבוססת ביצועים ל-Sweetime
                </div>
                <h1 className="text-[2.45rem] font-black leading-[1.03] text-[#102044] md:text-[4.1rem]">
                  {quotationData.hero.headline}
                </h1>
                <p className="max-w-2xl text-[1.16rem] font-bold leading-9 text-[#D21C77] md:text-[1.42rem]">
                  {quotationData.hero.subheadline}
                </p>
                <p className="max-w-2xl text-base leading-8 text-[#425168] md:text-lg">
                  {quotationData.hero.supportingText.replace("ההצעה הזו נבנתה", "ההצעה של Cee+ נבנתה")}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {quotationData.hero.badges.map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-3 rounded-[8px] border border-[#D8E4EE] bg-white px-4 py-3 text-sm font-bold text-[#102044] shadow-[0_10px_20px_rgba(16,32,68,0.04)]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#EAF7FF] text-[#169BEE]">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    {badge}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <QuotationButton href="#plans">
                  {quotationData.hero.primaryCta}
                  <ChevronLeft className="h-4 w-4" />
                </QuotationButton>
                <QuotationButton href="#recommendation" variant="secondary">
                  {quotationData.hero.secondaryCta}
                </QuotationButton>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="space-y-4">
              <div className="overflow-hidden rounded-[8px] border border-[#D8E4EE] bg-white p-3 shadow-[0_22px_56px_rgba(16,32,68,0.08)]">
                <div className="relative overflow-hidden rounded-[8px]">
                  <Image
                    src="/quotation/sweetime/store-transformation.webp"
                    alt="המחשת לפני ואחרי לעיצוב חוויית Sweetime"
                    width={1536}
                    height={1024}
                    className="h-[420px] w-full object-cover md:h-[520px]"
                    priority
                  />
                  <div className="absolute inset-x-4 top-4 flex justify-between text-xs font-black text-white">
                    <span className="rounded-[8px] bg-[#102044]/76 px-3 py-2">לפני</span>
                    <span className="rounded-[8px] bg-[#F23893]/86 px-3 py-2">אחרי עם כיוון של <span dir="ltr">Cee+</span></span>
                  </div>
                  <div className="absolute bottom-4 right-4 rounded-[8px] bg-white/94 px-3 py-2 shadow-[0_10px_22px_rgba(16,32,68,0.16)]">
                    <Image
                      src="/quotation/sweetime/logo-blue.jpg"
                      alt="Sweetime"
                      width={591}
                      height={591}
                      className="h-auto w-[92px]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-[8px] border border-[#D8E4EE] bg-white p-4 shadow-[0_14px_32px_rgba(16,32,68,0.06)]">
                  <div className="grid items-center gap-4 sm:grid-cols-[0.38fr_0.62fr]">
                    <Image
                      src="/quotation/sweetime/product-box.jpg"
                      alt="מארז Sweetime"
                      width={225}
                      height={225}
                      className="h-auto w-full rounded-[8px]"
                    />
                    <div className="space-y-2">
                      <p className="text-lg font-black text-[#102044]">מערכת צמיחה מלאה במקום רק קמפיין</p>
                      <p className="text-sm leading-7 text-[#4D5D74]">
                        מודעות, הצעות, מועדון, WhatsApp והזמנות מהירות — כחוויה אחת שמייצרת יותר תנועה, הרשמות ורכישות.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[8px] border border-[#D8E4EE] bg-[linear-gradient(180deg,#EEF7FF,#FFF7FB)] p-4 shadow-[0_14px_32px_rgba(16,32,68,0.06)]">
                  <p className="text-lg font-black text-[#102044]">מיקוד עסקי</p>
                  <p className="mt-3 text-sm leading-7 text-[#4D5D74]">
                    ההצעה נבנתה כדי לשלב בין משיכת לקוחות חדשים, הגדלת סל קנייה, והחזרת לקוחות קיימים דרך ערוצים שעובדים יחד.
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </ProposalSection>

      <ProposalSection tone="white">
        <SectionHeading
          eyebrow="הגישה"
          title="לא רק פרסום — אלא מערכת שיווקית צבעונית שעובדת יחד"
          description="Cee+ ממליצה לבנות ל-Sweetime מסלול שמחבר בין קריאייטיב, פרסום, הטבות, חוויית חנות, אתר הזמנות ו-WhatsApp. המטרה היא להפוך עניין לקנייה, וקנייה לנאמנות."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {positioningCards.map((card) => (
            <motion.article
              key={card.title}
              whileHover={{ y: -4 }}
              className="rounded-[8px] border border-[#D8E4EE] bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-5 shadow-[0_14px_32px_rgba(16,32,68,0.05)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#EEF7FF] text-[#169BEE]">
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-black text-[#102044]">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#5D6B82]">{card.text}</p>
            </motion.article>
          ))}
        </div>
      </ProposalSection>

      <ProposalSection id="plans" tone="blend">
        <SectionHeading
          eyebrow="הצעת מחיר"
          title="מסלולי ההשקעה האפשריים"
          description="שלושה מסלולים ברורים — מהתחלה זהירה ועד למסלול Growth Engine מלא. בכל מסלול מוצג גם סך ההשקעה הכוללת: תקציב מדיה + דמי ניהול / שירות."
        />

        <div className="mt-8 grid gap-5 xl:grid-cols-3">
          {quotationData.plans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
      </ProposalSection>

      <ProposalSection id="growth-engine" tone="blue">
        <SectionHeading
          eyebrow="Growth Engine"
          title={quotationData.growthEngine.title}
          description={quotationData.growthEngine.subtitle}
        />

        <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-8 text-[#425168]">
          {quotationData.growthEngine.explanation}
        </p>

        <div className="mt-8 grid gap-3 lg:grid-cols-7">
          {quotationData.growthEngine.flow.map((step, index) => (
            <div key={step} className="relative rounded-[8px] border border-[#D2E6F5] bg-white px-4 py-4 text-center shadow-[0_12px_26px_rgba(16,32,68,0.04)]">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#169BEE] text-sm font-black text-white">
                {index + 1}
              </div>
              <p className="mt-3 text-sm font-bold leading-6 text-[#102044]">{step}</p>
              {index < quotationData.growthEngine.flow.length - 1 ? (
                <div className="absolute left-[-14px] top-1/2 hidden -translate-y-1/2 lg:block">
                  <ChevronLeft className="h-5 w-5 text-[#169BEE]" />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[8px] border border-[#D8E4EE] bg-white p-4 shadow-[0_18px_40px_rgba(16,32,68,0.07)]">
            <div className="mx-auto max-w-[340px] rounded-[8px] bg-[#0F2042] p-3 shadow-[0_18px_42px_rgba(16,32,68,0.16)]">
              <div className="relative overflow-hidden rounded-[8px] border border-white/10 bg-white">
                <Image
                  src="/quotation/sweetime/tablet-club.webp"
                  alt="מסך המחשה למועדון Sweetime"
                  width={1024}
                  height={1536}
                  className="h-auto w-full object-cover"
                />
                <div className="absolute right-3 top-3 rounded-[8px] bg-white/92 px-2 py-1 shadow-[0_8px_18px_rgba(16,32,68,0.14)]">
                  <Image
                    src="/quotation/sweetime/logo-blue.jpg"
                    alt="Sweetime"
                    width={591}
                    height={591}
                    className="h-auto w-[72px]"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-[8px] border border-[#F8D0E3] bg-[#FFF5FA] px-4 py-3 text-sm leading-7 text-[#A01F63]">
              <p className="font-bold">מסך המחשה למועדון Sweetime</p>
              <p className="mt-1">
                Cee+ תספק ותקים את הטאבלט בחנות כמתנה כחלק מהמסלול המלא, כדי להפוך את ההרשמה לחוויה נגישה, ברורה ומזמינה.
              </p>
            </div>
          </div>

          <div className="rounded-[8px] border border-[#D8E4EE] bg-white p-5 shadow-[0_18px_40px_rgba(16,32,68,0.07)]">
            <p className="text-xl font-black text-[#102044]">המועדון כערוץ צמיחה, לא כגימיק</p>
            <p className="mt-3 text-sm leading-7 text-[#4D5D74]">
              הטאבלט בחנות, ההרשמה למועדון והמשך התקשורת ב-WhatsApp יוצרים מנגנון שמחזיר לקוחות לקנייה נוספת — עם יותר סיבה להגיע שוב.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["10% הנחה", "קינוח מתנה", "הטבת יום הולדת", "מבצע חברי מועדון"].map((reward) => (
                <div
                  key={reward}
                  className="rounded-[8px] border border-[#F8D0E3] bg-[#FFF7FB] px-4 py-3 text-sm font-bold text-[#B11F67]"
                >
                  {reward}
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[8px] border border-[#D8E4EE] bg-[#F7FBFF] px-4 py-4">
              <p className="text-sm font-bold text-[#102044]">למה זה חשוב ל-Sweetime?</p>
              <p className="mt-2 text-sm leading-7 text-[#4D5D74]">
                כי עסק מתוקים נשען חזק על חזרה, המלצה ורכישה אימפולסיבית. מועדון טוב מאפשר להפוך ביקור אחד לקשר מתמשך.
              </p>
            </div>
          </div>
        </div>
      </ProposalSection>

      <ProposalSection id="ordering-website" tone="pink">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-5">
            <SectionHeading
              eyebrow="אתר הזמנות"
              title={quotationData.orderingWebsite.title}
              description={quotationData.orderingWebsite.text}
              align="right"
            />
            <div className="rounded-[8px] border border-[#F8D0E3] bg-white px-5 py-4 text-sm leading-7 text-[#4D5D74] shadow-[0_12px_28px_rgba(242,56,147,0.06)]">
              <p className="font-bold text-[#C01F72]">{quotationData.orderingWebsite.banner}</p>
              <p className="mt-2">{quotationData.orderingWebsite.crossSell}</p>
            </div>
            <div className="rounded-[8px] bg-[#102044] px-5 py-4 text-white">
              <p className="text-sm font-bold tracking-[0.12em] text-white/70">חשוב לגרסת V1</p>
              <p className="mt-2 text-lg font-black">אתר ההזמנות יושק תחילה עם תשלום במזומן בלבד, כדי לאפשר עלייה מהירה ופשוטה לאוויר.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[8px] border border-[#D8E4EE] bg-white p-4 shadow-[0_18px_40px_rgba(16,32,68,0.07)]">
              <div className="relative overflow-hidden rounded-[8px] border border-[#D8E4EE] bg-[#F7FBFF] p-3">
                <div className="absolute right-6 top-6 rounded-[8px] bg-white/94 px-2 py-1 shadow-[0_8px_18px_rgba(16,32,68,0.14)]">
                  <Image
                    src="/quotation/sweetime/logo-blue.jpg"
                    alt="Sweetime"
                    width={591}
                    height={591}
                    className="h-auto w-[78px]"
                  />
                </div>
                <Image
                  src="/quotation/sweetime/ordering-website-mockup.webp"
                  alt="מסך המחשה לאתר ההזמנות"
                  width={1536}
                  height={1024}
                  className="h-auto w-full rounded-[8px]"
                />
              </div>
              <div className="mt-4 rounded-[8px] border border-[#D8E4EE] bg-[#F7FBFF] px-4 py-3 text-sm leading-7 text-[#4D5D74]">
                <p className="font-bold text-[#102044]">מסך המחשה לאתר ההזמנות</p>
                <p className="mt-1">
                  כיוון ויזואלי למסך הזמנות מהיר, עם מוצרים מובילים, חוויית שימוש פשוטה והכנה עתידית ל-Cross-sell.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {quotationData.orderingWebsite.products.map((product, index) => (
                <div
                  key={product}
                  className={cn(
                    "rounded-[8px] border bg-white px-4 py-4 shadow-[0_10px_24px_rgba(16,32,68,0.04)]",
                    index % 2 === 0 ? "border-[#D8E4EE]" : "border-[#F8D0E3]"
                  )}
                >
                  <p className="text-sm font-bold text-[#102044]">{product}</p>
                  <p className="mt-2 text-xs leading-6 text-[#5D6B82]">מוצר דגל שיכול להשתלב במסך הזמנה מהיר וב-Cross-sell.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ProposalSection>

      <ProposalSection tone="white">
        <SectionHeading
          eyebrow="מה כולל"
          title="מה Cee+ מספקת בפועל במסגרת העבודה"
          description="לא רק פרסום ממומן, אלא מעטפת של אסטרטגיה, קריאייטיב, מסרים, מועדון לקוחות, WhatsApp ותשתית צמיחה מתמשכת."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {includedServices.map((item) => (
            <div key={item.title} className="rounded-[8px] border border-[#D8E4EE] bg-white p-5 shadow-[0_14px_32px_rgba(16,32,68,0.05)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#EEF7FF] text-[#169BEE]">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-black text-[#102044]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#5D6B82]">{item.text}</p>
            </div>
          ))}
        </div>
      </ProposalSection>

      <ProposalSection id="why-cee" tone="cee" innerClassName="shadow-[0_24px_60px_rgba(8,10,14,0.34)]">
        <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <div className="space-y-5">
            <SectionHeading
              eyebrow="למה Cee+"
              title="למה לעבוד עם Cee+"
              description="כי Cee+ לא מסתכלת רק על מודעה בודדת. הגישה היא לבנות ל-Sweetime תהליך שיווקי שלם שמחובר למכירה, לחוויה ולחזרה של לקוחות."
              align="right"
              dark
            />

            <div className="rounded-[8px] border border-[#95DF1E]/20 bg-[#0F131C] px-6 py-8 text-white shadow-[0_18px_40px_rgba(149,223,30,0.10)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold tracking-[0.14em] text-[#95DF1E]">ניסיון מרכזי</p>
                  <p className="mt-3 text-[3.1rem] font-black leading-none" dir="ltr">
                    ₪10M+
                  </p>
                  <p className="mt-3 text-lg font-bold">בניהול בפועל של תקציבי פרסום</p>
                </div>
                <Image
                  src="/quotation/sweetime/cee-wordmark.webp"
                  alt="לוגו Cee+"
                  width={184}
                  height={56}
                  className="h-auto w-[120px]"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {trustCards.map((card) => (
              <div key={card.title} className="rounded-[8px] border border-[#202531] bg-[#0F131C] p-5 shadow-[0_14px_32px_rgba(0,0,0,0.22)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#95DF1E]/12 text-[#95DF1E]">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-black text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </ProposalSection>

      <ProposalSection id="recommendation" tone="blend" className="pb-10">
        <div className="grid gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-bold tracking-[0.16em] text-[#F23893]">המלצה סופית</p>
            <h2 className="text-[2.45rem] font-black leading-[1.03] text-[#102044] md:text-[3.5rem]">
              המסלול המומלץ: Sweetime Growth Engine
            </h2>
            <p className="text-lg font-bold leading-8 text-[#D21C77]">{quotationData.finalRecommendation.subtitle}</p>
            <p className="max-w-2xl text-base leading-8 text-[#425168]">
              {quotationData.finalRecommendation.summary.replace("מסלול זה מתאים במיוחד", "המסלול הזה מתאים במיוחד")}
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[8px] border border-[#D8E4EE] bg-white px-4 py-4 shadow-[0_10px_22px_rgba(16,32,68,0.04)]">
                <p className="text-xs font-bold tracking-[0.12em] text-[#169BEE]">תקציב מדיה</p>
                <p className="mt-2 text-2xl font-black text-[#102044]">{recommendedPlan.adBudget}</p>
              </div>
              <div className="rounded-[8px] border border-[#F8D0E3] bg-[#FFF6FB] px-4 py-4 shadow-[0_10px_22px_rgba(242,56,147,0.05)]">
                <p className="text-xs font-bold tracking-[0.12em] text-[#F23893]">ניהול, תוכן ו-Growth Engine</p>
                <p className="mt-2 text-2xl font-black text-[#102044]">{recommendedPlan.managementFee}</p>
              </div>
              {recommendedTotal ? (
                <div className="rounded-[8px] bg-[#102044] px-4 py-4 text-white shadow-[0_14px_32px_rgba(16,32,68,0.12)] sm:col-span-2">
                  <p className="text-xs font-bold tracking-[0.12em] text-white/75">סך השקעה חודשי כולל</p>
                  <p className="mt-2 text-[2.25rem] font-black leading-none">{formatCurrency(recommendedTotal)} + מע״מ על השירות</p>
                  <p className="mt-2 text-sm text-white/75">כלומר ₪5,500 מדיה + ₪5,000 ניהול, תוכן ו-Growth Engine.</p>
                </div>
              ) : null}
            </div>

            <div className="grid gap-3">
              {finalHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[8px] border border-[#D8E4EE] bg-white px-4 py-3 text-sm leading-7 text-[#102044] shadow-[0_10px_22px_rgba(16,32,68,0.04)]"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#169BEE]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <RecommendationButton />
          </div>

          <div className="rounded-[8px] border border-[#D8E4EE] bg-white p-5 shadow-[0_18px_40px_rgba(16,32,68,0.07)]">
            <div className="flex items-start justify-between gap-4">
              <Image
                src="/quotation/sweetime/logo-blue.jpg"
                alt="לוגו Sweetime"
                width={591}
                height={591}
                className="h-auto w-[120px] rounded-[8px]"
              />
              <Image
                src="/quotation/sweetime/cee-wordmark.webp"
                alt="לוגו Cee+"
                width={184}
                height={56}
                className="h-auto w-[120px]"
              />
            </div>

            <div className="mt-5 space-y-3">
              {quotationData.finalRecommendation.items.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[8px] bg-[#F7FBFF] px-4 py-3 text-sm leading-7 text-[#102044]">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#169BEE]" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[8px] border border-[#F8D0E3] bg-[linear-gradient(135deg,#FFF4FB,#F7FBFF)] px-4 py-4 text-sm leading-7 text-[#425168]">
              <p className="font-bold text-[#102044]">למה זו ההמלצה הנכונה ביותר כרגע?</p>
              <p className="mt-2">
                כי Sweetime צריכה יותר ממודעות. היא צריכה מנגנון שמחבר בין כניסה של לקוח, חוויית חנות, הרשמה, הטבה,
                WhatsApp, Cross-sell וחזרה לקנייה. זה ההבדל בין קמפיין לבין Growth Engine.
              </p>
            </div>

            <div className="mt-5 rounded-[8px] bg-[#102044] px-4 py-4 text-sm leading-7 text-white">
              <p className="font-bold">מה Cee+ מתחייבת להביא לשולחן?</p>
              <p className="mt-2 text-white/80">
                תכנון חכם יותר, קריאייטיב מהיר יותר, הצעות חזקות יותר, ודרך ברורה יותר להפוך קהל מתעניין ללקוחות חוזרים.
              </p>
            </div>
          </div>
        </div>
      </ProposalSection>
    </main>
  );
}
