"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
  TabletSmartphone,
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
    text: "ההצעה לא נראית גנרית. היא נשענת על העולם הצבעוני של Sweetime, על חוויית חנות, ועל מוצרים שקל למכור מחדש.",
    icon: WandSparkles
  },
  {
    title: "נאמנות ולקוחות חוזרים",
    text: "מועדון, הטבות, WhatsApp, גלגל מתנות וקמפיינים חוזרים שמחזירים לקוחות לקנייה נוספת, לא רק לפעם אחת.",
    icon: Heart
  }
] as const;

const includedServices = [
  { title: "אסטרטגיה חודשית", text: "כיוון חודשי לפי מוצרים, חגים, מבצעים ומטרות מכירה.", icon: Sparkles },
  { title: "ניהול קמפיינים", text: "Meta / TikTok, קהלים, תקציבים, אופטימיזציה וקריאייטיב.", icon: Megaphone },
  { title: "קופי ומסרים", text: "שפה שיווקית שמתאימה ל-Sweetime וללקוחות המקומיים.", icon: MessageCircle },
  { title: "קריאייטיב AI + תוכן", text: "רעיונות, וריאציות, הוקים וסקריפטים להאצת ההפקה.", icon: Bot },
  { title: "הצעות ומבצעים", text: "בניית סיבות חזקות לקנות עכשיו, לא אחר כך.", icon: Gift },
  { title: "מועדון ו-WhatsApp", text: "תשתית לקשר חוזר עם לקוחות ולהחזרת קונים לחנות.", icon: Users },
  { title: "Cross-sell והגדלת סל", text: "תוספות חכמות להזמנה, מארזים והצעות משלימות.", icon: ShoppingBag },
  { title: "דוחות ותובנות", text: "מעקב ביצועים, מסקנות והחלטות לשיפור מתמשך.", icon: Trophy }
] as const;

const trustCards = [
  {
    title: "Hands-on של Cee+",
    text: "Cee+ לא רק מגדירה כיוון, אלא מלווה בפועל את הקריאייטיב, המודעות והמבצעים.",
    icon: Sparkles
  },
  {
    title: "חשיבה על כל המסלול",
    text: "מהמודעה ועד לחנות, להרשמה, לקופון ולחזרה של הלקוח – כמערכת אחת.",
    icon: Store
  },
  {
    title: "ניסיון נרחב בפרסום",
    text: "מעל ₪10M בתקציבי פרסום מנוהלים, עם דגש על ביצועים וקריאייטיב שעובד.",
    icon: Target
  },
  {
    title: "Growth Partner אמיתי",
    text: "Cee+ בונה מנוע צמיחה עסקי, לא רק קמפיין חודשי שנגמר בלי תשתית.",
    icon: Trophy
  }
] as const;

const rewardExamples = ["10% הנחה", "קינוח מתנה", "הטבת יום הולדת", "מבצע חברי מועדון"] as const;

const finalHighlights = [
  "בניית מנגנון שמחבר בין פרסום, תוכן, מועדון לקוחות ו-WhatsApp.",
  "שימוש ב-Creative + AI כדי להפיק יותר רעיונות, מהר יותר, עם בדיקות חכמות.",
  "מסלול שמכוון גם להגדלת תנועה לחנות וגם ליצירת לקוחות חוזרים לאורך זמן."
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

function ProposalSection({
  id,
  tone = "white",
  children,
  className
}: {
  id?: string;
  tone?: "white" | "blue" | "pink" | "blend";
  children: React.ReactNode;
  className?: string;
}) {
  const toneClasses = {
    white: "bg-white",
    blue: "bg-[linear-gradient(180deg,#EFF8FF_0%,#F7FBFF_100%)]",
    pink: "bg-[linear-gradient(180deg,#FFF4FB_0%,#FFFFFF_100%)]",
    blend: "bg-[linear-gradient(135deg,#FDFEFF_0%,#F4FAFF_48%,#FFF5FB_100%)]"
  };

  const shadowClasses = {
    white: "from-[#169BEE]/10 via-transparent to-[#F23893]/8",
    blue: "from-[#169BEE]/18 via-transparent to-[#8BD4FF]/10",
    pink: "from-[#F23893]/18 via-transparent to-[#FFB9DE]/10",
    blend: "from-[#169BEE]/14 via-transparent to-[#F23893]/12"
  };

  return (
    <section id={id} className={cn("px-4 py-4 md:px-8 md:py-5", className)}>
      <div
        className={cn(
          "relative mx-auto max-w-[1240px] overflow-hidden rounded-[8px] border border-[#D9E5F1] px-5 py-8 shadow-[0_20px_55px_rgba(16,32,68,0.07)] md:px-8 md:py-10",
          toneClasses[tone]
        )}
      >
        <motion.div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -left-16 top-0 h-40 w-40 rounded-[8px] bg-radial opacity-90 blur-3xl",
            shadowClasses[tone]
          )}
          animate={{ x: [0, 36, 8], y: [0, 14, -8], opacity: [0.55, 0.8, 0.6] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror", ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -bottom-10 right-0 h-44 w-44 rounded-[8px] bg-radial opacity-80 blur-3xl",
            shadowClasses[tone]
          )}
          animate={{ x: [0, -26, 10], y: [0, -14, 8], opacity: [0.45, 0.68, 0.48] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror", ease: "easeInOut" }}
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
  align = "center"
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "right";
}) {
  return (
    <div className={cn("mx-auto max-w-4xl", align === "center" ? "text-center" : "text-right")}>
      <p className="text-sm font-bold tracking-[0.18em] text-[#F23893]">{eyebrow}</p>
      <h2 className="mt-3 text-[2rem] font-black leading-[1.08] text-[#102044] md:text-[2.8rem]">{title}</h2>
      <p className="mt-4 text-base leading-8 text-[#4D5D74] md:text-lg">{description}</p>
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
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[8px] px-5 py-3 text-sm font-bold transition duration-200 hover:-translate-y-0.5",
        variant === "primary"
          ? "bg-[#102044] text-white shadow-[0_16px_28px_rgba(16,32,68,0.18)] hover:bg-[#0B1A38]"
          : "border border-[#B9D7EE] bg-white text-[#102044] shadow-[0_10px_22px_rgba(16,32,68,0.07)] hover:border-[#F23893] hover:text-[#C51A74]",
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
        plan.recommended ? "border-[#F6B5D6]" : "border-[#D8E4EE]"
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
          <h3 className="text-[1.85rem] font-black leading-[1.02] text-[#102044]">{plan.name}</h3>
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

      <p className="mt-5 text-sm leading-7 text-[#4D5D74]">{plan.paymentNote}</p>
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
        <QuotationButton href="#recommendation" className="w-full">
          {plan.button}
        </QuotationButton>
      </div>
    </motion.article>
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
              <div className="flex flex-wrap items-start justify-between gap-4 rounded-[8px] border border-[#D8E4EE] bg-white/90 p-4 shadow-[0_14px_30px_rgba(16,32,68,0.05)]">
                <div className="space-y-2">
                  <Image
                    src="/quotation/sweetime/cee-wordmark.webp"
                    alt="לוגו Cee+"
                    width={184}
                    height={56}
                    className="h-auto w-[138px]"
                  />
                  <div className="rounded-[8px] bg-[#F7FBFF] px-3 py-2 text-sm leading-6 text-[#4D5D74]">
                    <p className="font-bold text-[#102044]">Cee+ Growth Partner</p>
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
                  <div className="rounded-[8px] border border-[#F8D0E3] bg-[#FFF7FB] px-3 py-2 text-sm font-bold text-[#B61B69]">
                    מסמך הצעת מחיר / פורמט הצגה דמוי-PDF
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
                <Image
                  src="/quotation/sweetime/interior.jpg"
                  alt="פנים חנות Sweetime"
                  width={1900}
                  height={1267}
                  className="h-[420px] w-full rounded-[8px] object-cover md:h-[520px]"
                  priority
                />
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
                        מודעות, הצעות, מועדון, גלגל מתנות, WhatsApp והזמנות מהירות — כחוויה אחת שמייצרת תנועה ומכירה.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[8px] border border-[#F8D0E3] bg-white p-4 shadow-[0_14px_32px_rgba(242,56,147,0.07)]">
                  <Image
                    src="/quotation/sweetime/logo-pink.jpg"
                    alt="לוגו Sweetime ורוד"
                    width={688}
                    height={688}
                    className="h-auto w-full rounded-[8px]"
                  />
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
            <div
              key={step}
              className="rounded-[8px] border border-[#D2E6F5] bg-white px-4 py-4 text-center shadow-[0_12px_26px_rgba(16,32,68,0.04)]"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#EEF7FF] text-[#169BEE]">
                {index === 0 ? (
                  <Megaphone className="h-4 w-4" />
                ) : index === 1 ? (
                  <Store className="h-4 w-4" />
                ) : index === 2 ? (
                  <TabletSmartphone className="h-4 w-4" />
                ) : index === 3 ? (
                  <Gift className="h-4 w-4" />
                ) : index === 4 ? (
                  <Users className="h-4 w-4" />
                ) : index === 5 ? (
                  <MessageCircle className="h-4 w-4" />
                ) : (
                  <ShoppingBag className="h-4 w-4" />
                )}
              </div>
              <p className="mt-3 text-sm font-bold leading-6 text-[#102044]">{step}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[8px] border border-[#D8E4EE] bg-white p-4 shadow-[0_18px_40px_rgba(16,32,68,0.07)]">
            <div className="mx-auto max-w-[340px] rounded-[8px] bg-[#0F2042] p-3 shadow-[0_18px_42px_rgba(16,32,68,0.16)]">
              <div className="overflow-hidden rounded-[8px] border border-white/10 bg-white">
                <Image
                  src="/quotation/sweetime/spin-wheel.jpg"
                  alt="מסך המחשה למועדון Sweetime"
                  width={168}
                  height={299}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
            <div className="mt-4 rounded-[8px] border border-[#F8D0E3] bg-[#FFF5FA] px-4 py-3 text-sm leading-7 text-[#A01F63]">
              <p className="font-bold">מסך המחשה למועדון Sweetime</p>
              <p className="mt-1">
                במקום רכיב שנראה כמו מערכת פעילה אבל לא באמת עובד, Cee+ מציגה כאן את מבנה הטאבלט והגלגל כמוקאפ צילום
                ברור למסלול המוצע.
              </p>
            </div>
          </div>

          <div className="rounded-[8px] border border-[#D8E4EE] bg-white p-5 shadow-[0_18px_40px_rgba(16,32,68,0.07)]">
            <p className="text-xl font-black text-[#102044]">המועדון כערוץ צמיחה, לא כגימיק</p>
            <p className="mt-3 text-sm leading-7 text-[#4D5D74]">
              הטאבלט בחנות, גלגל ההטבות, ההרשמה למועדון והמשך התקשורת ב-WhatsApp יוצרים מנגנון שמחזיר לקוחות לקנייה
              נוספת — עם יותר סיבה להגיע שוב.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {rewardExamples.map((reward) => (
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
              <p className="text-sm font-bold tracking-[0.12em] text-white/70">מטרת המערכת</p>
              <p className="mt-2 text-lg font-black">
                להפוך מוצרי דגל כמו קרפ, וופל, פנקייק בולס ומארזים להזמנה מהירה יותר ול-Cross-sell חכם יותר.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[8px] border border-[#D8E4EE] bg-white p-4 shadow-[0_18px_40px_rgba(16,32,68,0.07)]">
              <div className="overflow-hidden rounded-[8px] border border-[#D8E4EE] bg-[#F7FBFF]">
                <Image
                  src="/quotation/sweetime/reference-board.png"
                  alt="מסך המחשה לאתר ההזמנות"
                  width={935}
                  height={1683}
                  className="h-auto w-full"
                />
              </div>
              <div className="mt-4 rounded-[8px] border border-[#D8E4EE] bg-[#F7FBFF] px-4 py-3 text-sm leading-7 text-[#4D5D74]">
                <p className="font-bold text-[#102044]">מסך המחשה לאתר ההזמנות</p>
                <p className="mt-1">
                  זהו כיוון ויזואלי למסך הזמנות מהיר, עם מוצרים, הצעת ערך ברורה, ו-Cross-sell נלווה במקום אלמנט דמה
                  אינטראקטיבי.
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

      <ProposalSection id="why-cee" tone="blue">
        <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <div className="space-y-5">
            <SectionHeading
              eyebrow="למה Cee+"
              title="למה לעבוד עם Cee+ על ההצעה הזו?"
              description="כי Cee+ לא מסתכלת רק על מודעה בודדת. הגישה היא לבנות ל-Sweetime תהליך שיווקי שלם שמחובר למכירה, לחוויה ולחזרה של לקוחות."
              align="right"
            />

            <div className="rounded-[8px] bg-[linear-gradient(135deg,#169BEE,#0F2D66)] px-6 py-8 text-white shadow-[0_18px_40px_rgba(22,155,238,0.24)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold tracking-[0.14em] text-white/80">ניסיון מרכזי</p>
                  <p className="mt-3 text-[3.1rem] font-black leading-none">₪10M+</p>
                  <p className="mt-3 text-lg font-bold">בתקציבי פרסום מנוהלים</p>
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
              <div key={card.title} className="rounded-[8px] border border-[#D8E4EE] bg-white p-5 shadow-[0_14px_32px_rgba(16,32,68,0.05)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#FFF0F8] text-[#F23893]">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-black text-[#102044]">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5D6B82]">{card.text}</p>
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
              {quotationData.finalRecommendation.summary.replace("המסלול", "ההמלצה של Cee+")}
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

            <div className="flex flex-col gap-3 sm:flex-row">
              <QuotationButton href="https://wa.me/972000000000">
                ממשיכים עם Cee+
                <ChevronLeft className="h-4 w-4" />
              </QuotationButton>
              <QuotationButton href="#plans" variant="secondary">
                חזרה למסלולים
              </QuotationButton>
            </div>
          </div>

          <div className="rounded-[8px] border border-[#D8E4EE] bg-white p-5 shadow-[0_18px_40px_rgba(16,32,68,0.07)]">
            <div className="flex items-start justify-between gap-4">
              <Image
                src="/quotation/sweetime/logo-pink.jpg"
                alt="לוגו Sweetime ורוד"
                width={688}
                height={688}
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
                WhatsApp, Cross-sell וחזרה לקנייה. זה בדיוק ההבדל בין קמפיין לבין Growth Engine.
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
