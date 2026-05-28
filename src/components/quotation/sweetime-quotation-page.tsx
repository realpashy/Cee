"use client";

import Image from "next/image";
import {
  Bot,
  Candy,
  CheckCircle2,
  ChevronLeft,
  CircleDollarSign,
  Gift,
  Heart,
  Megaphone,
  MessageCircle,
  ShoppingCart,
  Sparkles,
  Store,
  TabletSmartphone,
  Target,
  Trophy,
  Users,
  WandSparkles
} from "lucide-react";
import { motion } from "framer-motion";
import quotationData from "@/content/quotation/sweetime.json";
import { SectionReveal } from "@/components/site/section-reveal";
import { cn } from "@/lib/utils";

const positioningCards = [
  {
    title: "שיווק מבוסס ביצועים",
    text: "קמפיינים שממוקדים בתנועה לחנות, פניות, קופונים, מכירות וסימנים אמיתיים מהשטח.",
    icon: Target
  },
  {
    title: "תוכן בעזרת AI",
    text: "שימוש נרחב ב-AI ליצירת רעיונות, הוקים, תסריטים, קופי, מודעות וזוויות קריאייטיב.",
    icon: Bot
  },
  {
    title: "תוכן מקורי וממוקד",
    text: "יצירת תוכן שמחובר למוצרים, לאווירת החנות, לטרנדים ולקהל המקומי.",
    icon: WandSparkles
  },
  {
    title: "צמיחת הסניף המקומי",
    text: "מיקוד בנוף הגליל והסביבה כדי להביא יותר אנשים רלוונטיים לחנות.",
    icon: Store
  },
  {
    title: "נאמנות ולקוחות חוזרים",
    text: "בניית מערכת שמחזירה לקוחות דרך מועדון, הטבות, WhatsApp ומבצעים חכמים.",
    icon: Heart
  }
] as const;

const includedServices = [
  {
    title: "אסטרטגיה חודשית",
    text: "תוכנית פעולה ברורה לפי מוצרים, מבצעים, חגים והזדמנויות.",
    icon: Sparkles
  },
  {
    title: "ניהול מודעות Meta / TikTok",
    text: "ניהול קמפיינים, קהלים, תקציבים ואופטימיזציה.",
    icon: Megaphone
  },
  {
    title: "כתיבת מסרים וקופי",
    text: "מסרים שמותאמים לקהל המקומי ולמוצרים של Sweetime.",
    icon: MessageCircle
  },
  {
    title: "שימוש נרחב ב-AI",
    text: "רעיונות, סקריפטים, קריאייטיב, קופי, וריאציות מודעות ותוכן.",
    icon: Bot
  },
  {
    title: "תוכן מקורי וממוקד",
    text: "תוכן שמחובר לחנות, למוצרים, לטרנדים ולחוויית הקנייה.",
    icon: Candy
  },
  {
    title: "יצירת הצעות ומבצעים",
    text: "מבצעים חכמים שמניעים לפעולה ומגדילים תנועה לחנות.",
    icon: Gift
  },
  {
    title: "שיווק ב-WhatsApp",
    text: "קמפיינים, עדכונים, הטבות ומבצעים לקהל שכבר מכיר את Sweetime.",
    icon: MessageCircle
  },
  {
    title: "מועדון ונאמנות לקוחות",
    text: "מערכת שמייצרת לקוחות חוזרים ולא רק קנייה חד-פעמית.",
    icon: Users
  },
  {
    title: "דוחות ותובנות",
    text: "סיכום ביצועים, למידה והמלצות להמשך.",
    icon: Trophy
  },
  {
    title: "אופטימיזציה שוטפת",
    text: "שיפור קמפיינים ותוכן לפי נתונים מהשטח.",
    icon: CircleDollarSign
  }
] as const;

const trustCards = [
  {
    title: "ניהול Hands-On",
    text: "ניהול ישיר, מעורבות יומיומית ושיפור מתמשך.",
    icon: Sparkles
  },
  {
    title: "Performance First",
    text: "קמפיינים שמכוונים לתוצאות עסקיות ולא למדדי אגו.",
    icon: Target
  },
  {
    title: "AI-Enhanced Creative",
    text: "שימוש ב-AI כדי לייצר יותר רעיונות, וריאציות ותוכן מהר יותר.",
    icon: Bot
  },
  {
    title: "Growth Partner",
    text: "לא רק ספק פרסום — שותף לבניית מערכת צמיחה לעסק.",
    icon: Trophy
  }
] as const;

const productCards = [
  { name: "קרפ שוקולד", price: "₪26" },
  { name: "וופל בלגי", price: "₪24" },
  { name: "פנקייק בולס", price: "₪22" },
  { name: "עוגת יום הולדת", price: "₪150+" },
  { name: "עוגיות", price: "₪18" },
  { name: "מארז מתוקים", price: "₪69" }
] as const;

const rewardExamples = ["10% הנחה", "מוצר מתנה", "הטבת יום הולדת", "מבצע לחברים בלבד"];

const navLinks = [
  { href: "#pricing", label: "הצעת מחיר" },
  { href: "#plans", label: "מסלולים" },
  { href: "#growth-engine", label: "Growth Engine" },
  { href: "#included", label: "מה כולל" },
  { href: "#why-me", label: "למה אני" },
  { href: "#contact", label: "צור קשר" }
] as const;

const orderedPlans = [...quotationData.plans].sort((a, b) => Number(b.recommended) - Number(a.recommended));

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
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-200 hover:-translate-y-0.5",
        variant === "primary"
          ? "bg-[linear-gradient(135deg,#169BEE,#F23893)] text-white shadow-[0_18px_35px_rgba(242,56,147,0.2)]"
          : "border border-[rgba(22,155,238,0.22)] bg-white text-[#0F2D66] shadow-[0_12px_30px_rgba(16,32,68,0.06)]",
        className
      )}
    >
      {children}
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={cn("space-y-4", centered ? "mx-auto max-w-4xl text-center" : "max-w-3xl text-right")}>
      <p className="text-sm font-bold tracking-[0.18em] text-[#F23893]">{eyebrow}</p>
      <h2 className="text-[2rem] font-black leading-[1.08] text-[#102044] md:text-[2.8rem]">{title}</h2>
      <p className="text-base leading-8 text-[#425168] md:text-lg">{description}</p>
    </div>
  );
}

function PricingCard({ plan, index }: { plan: (typeof quotationData.plans)[number]; index: number }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22 }}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[30px] border bg-white p-6 shadow-[0_22px_60px_rgba(16,32,68,0.08)]",
        plan.recommended
          ? "border-[#F23893]/45 ring-2 ring-[#F23893]/15"
          : "border-[#D7E8F8]"
      )}
    >
      {plan.recommended ? (
        <div className="absolute inset-x-5 top-0 h-2 rounded-b-full bg-[linear-gradient(90deg,#F23893,#169BEE)]" />
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          {plan.badge ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F23893] px-3 py-1 text-xs font-bold text-white">
              <Sparkles className="h-3.5 w-3.5" />
              {plan.badge}
            </div>
          ) : (
            <div className="inline-flex rounded-full bg-[#EAF7FF] px-3 py-1 text-xs font-bold text-[#0869B8]">
              {plan.label}
            </div>
          )}
          <h3 className="text-[1.9rem] font-black leading-[1.08] text-[#102044]">{plan.name}</h3>
          {plan.badge ? (
            <p className="text-sm font-bold text-[#F23893]">{plan.label}</p>
          ) : null}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full text-lg font-black text-white",
            plan.recommended ? "bg-[#F23893]" : index === 1 ? "bg-[#169BEE]" : "bg-[#68B9F2]"
          )}
        >
          {index + 1}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-base font-bold text-[#0869B8]">{plan.adBudget}</p>
        <p className="text-[2.5rem] font-black leading-none text-[#102044]">{plan.managementFee}</p>
        <p className="text-sm leading-7 text-[#5D6B82]">{plan.paymentNote}</p>
      </div>

      <p className="mt-5 text-base leading-8 text-[#425168]">{plan.description}</p>

      <ul className="mt-6 space-y-3">
        {plan.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3 text-sm leading-7 text-[#102044]">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#169BEE]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {plan.note ? (
        <div className="mt-5 rounded-[22px] border border-[#D7E8F8] bg-[#F8FCFF] px-4 py-3 text-sm leading-7 text-[#425168]">
          {plan.note}
        </div>
      ) : null}

      {plan.scalingNote ? (
        <div
          className={cn(
            "mt-5 rounded-[22px] px-4 py-3 text-sm leading-7",
            plan.recommended
              ? "bg-[#FFF0F8] text-[#B21B66]"
              : "bg-[#EAF7FF] text-[#0F4D86]"
          )}
        >
          <p className="font-bold">{plan.scalingNote}</p>
          {"example" in plan && plan.example ? <p className="mt-1 text-xs">{plan.example}</p> : null}
        </div>
      ) : null}

      <div className="mt-auto pt-6">
        <QuotationButton href="#contact" className="w-full justify-center">
          {plan.button}
        </QuotationButton>
      </div>
    </motion.article>
  );
}

export function SweetimeQuotationPage() {
  return (
    <main
      lang="he"
      dir="rtl"
      className="scroll-smooth bg-[linear-gradient(180deg,#fefcff_0%,#f5fbff_22%,#fff8fc_48%,#f8fbff_100%)] text-right [font-family:var(--font-he),Heebo,system-ui,sans-serif]"
    >
      <div className="fixed inset-x-0 bottom-3 z-50 px-4 md:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3 rounded-full border border-white/80 bg-white/95 p-2 shadow-[0_18px_40px_rgba(16,32,68,0.16)] backdrop-blur">
          <QuotationButton href="#contact" className="flex-1 justify-center py-3">
            נתחיל יחד
          </QuotationButton>
          <QuotationButton href="#plans" variant="secondary" className="flex-1 justify-center py-3">
            למסלולים
          </QuotationButton>
        </div>
      </div>

      <header className="sticky top-0 z-40 px-3 pt-3">
        <div className="mx-auto max-w-[1280px] rounded-[28px] border border-white/70 bg-white/88 px-4 py-3 shadow-[0_16px_38px_rgba(16,32,68,0.08)] backdrop-blur xl:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-[20px] border border-[#D7E8F8] bg-[#F8FCFF] px-3 py-2">
                <p className="text-[11px] font-black text-[#102044]">Cee+</p>
                <p className="text-[11px] font-semibold text-[#5D6B82]">Growth Partner</p>
                <p className="text-[10px] text-[#5D6B82]">הצעת צמיחה שיווקית</p>
              </div>
              <div className="hidden h-10 w-px bg-[#D7E8F8] lg:block" />
              <nav className="hidden items-center gap-6 lg:flex">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-bold text-[#102044] transition hover:text-[#F23893]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex items-center justify-between gap-4">
              <Image
                src="/quotation/sweetime/logo-blue.jpg"
                alt="לוגו Sweetime כחול"
                width={126}
                height={64}
                className="h-auto w-[108px] sm:w-[126px]"
              />
              <a href="#contact" className="text-sm font-bold text-[#169BEE] transition hover:text-[#F23893]">
                צור קשר
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(circle_at_top_right,rgba(242,56,147,0.18),transparent_28%),radial-gradient(circle_at_top_left,rgba(22,155,238,0.16),transparent_34%),linear-gradient(180deg,#ffffff,transparent)]" />
        <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-[rgba(255,217,90,0.18)] blur-3xl" />
        <div className="absolute right-0 top-24 h-56 w-56 rounded-full bg-[rgba(242,56,147,0.16)] blur-3xl" />

        <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.54fr_0.46fr] lg:items-center">
          <SectionReveal>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D7E8F8] bg-white px-4 py-2 text-sm font-bold text-[#0F4D86] shadow-[0_12px_30px_rgba(16,32,68,0.06)]">
                <Sparkles className="h-4 w-4 text-[#F23893]" />
                הצעת צמיחה מותאמת במיוחד ל-Sweetime נוף הגליל
              </div>

              <div className="space-y-5">
                <h1 className="text-[2.5rem] font-black leading-[1.06] text-[#102044] md:text-[4.1rem]">
                  {quotationData.hero.headline}
                </h1>
                <p className="max-w-2xl text-[1.15rem] font-bold leading-9 text-[#F23893] md:text-[1.45rem]">
                  {quotationData.hero.subheadline}
                </p>
                <p className="max-w-2xl text-base leading-8 text-[#425168] md:text-lg">
                  {quotationData.hero.supportingText}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {quotationData.hero.badges.map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-3 rounded-[24px] border border-[#D7E8F8] bg-white px-4 py-3 text-sm font-bold text-[#102044] shadow-[0_12px_28px_rgba(16,32,68,0.06)]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF7FF] text-[#169BEE]">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    {badge}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
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
            <div className="relative mx-auto w-full max-w-[620px]">
              <div className="absolute -left-6 -top-6 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#F23893] shadow-[0_14px_34px_rgba(242,56,147,0.18)]">
                מערכת צמיחה מלאה
              </div>
              <div className="overflow-hidden rounded-[36px] border border-white/70 bg-white p-3 shadow-[0_28px_80px_rgba(16,32,68,0.12)]">
                <div className="relative overflow-hidden rounded-[28px] border border-[#D7E8F8]">
                  <Image
                    src="/quotation/sweetime/interior.jpg"
                    alt="פנים חנות Sweetime מלאה בממתקים ובצבעים"
                    width={1900}
                    height={1267}
                    className="h-[470px] w-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.42))]" />
                </div>
                <div className="relative -mt-16 flex flex-col items-start gap-4 px-3 md:flex-row md:items-end md:justify-between">
                  <div className="rounded-[28px] border border-white/80 bg-white p-3 shadow-[0_18px_45px_rgba(16,32,68,0.14)]">
                    <Image
                      src="/quotation/sweetime/product-box.jpg"
                      alt="מארז מתוקים ממותג של Sweetime"
                      width={225}
                      height={225}
                      className="h-auto w-[140px] rounded-[18px] md:w-[180px]"
                    />
                  </div>
                  <div className="rounded-[28px] border border-white/80 bg-white/94 p-4 shadow-[0_18px_45px_rgba(16,32,68,0.14)] backdrop-blur">
                    <Image
                      src="/quotation/sweetime/logo-pink.jpg"
                      alt="לוגו Sweetime ורוד"
                      width={688}
                      height={688}
                      className="h-auto w-[120px]"
                    />
                    <div className="mt-3 space-y-2 text-sm text-[#425168]">
                      <p className="font-bold text-[#102044]">מערכת מלאה במקום רק מודעות</p>
                      <p>מודעות, הצעות, הרשמה, Wheel, WhatsApp והזמנות מהירות.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <SectionReveal>
        <section className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-[1280px] rounded-[40px] border border-[#D7E8F8] bg-white px-6 py-10 shadow-[0_24px_70px_rgba(16,32,68,0.08)] md:px-10">
            <SectionHeading
              eyebrow="הגישה"
              title="הגישה הקודמת לא הספיקה — עכשיו בונים מערכת צמיחה"
              description="הפעילות לא תתבסס רק על העלאת פוסטים או קמפיינים רגילים. המטרה היא לחבר בין פרסום ממומן, תוכן, הצעות, חוויית חנות, מועדון לקוחות, WhatsApp ושימור לקוחות — כדי ליצור צמיחה אמיתית ומתמשכת."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {positioningCards.map((card) => (
                <motion.article
                  key={card.title}
                  whileHover={{ y: -6 }}
                  className="rounded-[30px] border border-[#D7E8F8] bg-[linear-gradient(180deg,#ffffff,#f8fcff)] p-5 shadow-[0_18px_40px_rgba(16,32,68,0.05)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-[#EAF7FF] text-[#169BEE]">
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-[#102044]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5D6B82]">{card.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="plans" className="px-4 py-10 md:py-16">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading
              eyebrow="הצעת מחיר"
              title="מסלולי הצעת המחיר"
              description="שלושה מסלולים ברורים — מהתחלה זהירה ועד מנוע צמיחה מלא. תקציב המודעות משולם ישירות על ידי Sweetime לפלטפורמות הפרסום."
            />

            <div className="mt-10 grid gap-6 xl:grid-cols-3" id="pricing">
              {orderedPlans.map((plan, index) => (
                <PricingCard key={plan.id} plan={plan} index={index} />
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="growth-engine" className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-[1280px] rounded-[40px] border border-[#D7E8F8] bg-[linear-gradient(180deg,#EAF7FF,#FFF7FB)] px-6 py-10 shadow-[0_24px_70px_rgba(16,32,68,0.08)] md:px-10">
            <SectionHeading
              eyebrow="Growth Engine"
              title={quotationData.growthEngine.title}
              description={quotationData.growthEngine.subtitle}
            />

            <p className="mx-auto mt-6 max-w-4xl text-center text-base leading-8 text-[#425168]">
              {quotationData.growthEngine.explanation}
            </p>

            <div className="mt-10 grid gap-4 lg:grid-cols-7">
              {quotationData.growthEngine.flow.map((step, index) => (
                <div
                  key={step}
                  className="relative rounded-[28px] border border-[#CFE5F7] bg-white px-4 py-5 text-center shadow-[0_14px_32px_rgba(16,32,68,0.05)]"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF7FF] text-[#169BEE]">
                    {index === 0 ? (
                      <Megaphone className="h-5 w-5" />
                    ) : index === 1 ? (
                      <Store className="h-5 w-5" />
                    ) : index === 2 ? (
                      <TabletSmartphone className="h-5 w-5" />
                    ) : index === 3 ? (
                      <Gift className="h-5 w-5" />
                    ) : index === 4 ? (
                      <Users className="h-5 w-5" />
                    ) : index === 5 ? (
                      <MessageCircle className="h-5 w-5" />
                    ) : (
                      <ShoppingCart className="h-5 w-5" />
                    )}
                  </div>
                  <p className="mt-4 text-sm font-bold leading-6 text-[#102044]">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="rounded-[36px] border border-[#D7E8F8] bg-white p-4 shadow-[0_20px_50px_rgba(16,32,68,0.08)]">
                <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#169BEE,#63C8FF)] p-5">
                  <div className="rounded-[26px] border border-white/25 bg-white/90 p-4 shadow-[0_16px_32px_rgba(16,32,68,0.12)]">
                    <p className="text-center text-[1.35rem] font-black text-[#102044]">הצטרפות למועדון Sweetime</p>
                    <div className="mt-5 space-y-3">
                      {["שם", "טלפון", "יום הולדת"].map((field) => (
                        <div
                          key={field}
                          className="rounded-[18px] border border-[#D7E8F8] bg-[#F8FCFF] px-4 py-3 text-sm text-[#5D6B82]"
                        >
                          {field}
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex-1 rounded-full bg-[linear-gradient(135deg,#F23893,#169BEE)] px-5 py-3 text-center text-sm font-bold text-white">
                        סובב את הגלגל
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {rewardExamples.map((reward) => (
                      <div
                        key={reward}
                        className="rounded-[20px] border border-white/35 bg-white/18 px-4 py-3 text-center text-sm font-bold text-white backdrop-blur"
                      >
                        {reward}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[36px] border border-[#D7E8F8] bg-white p-4 shadow-[0_20px_50px_rgba(16,32,68,0.08)]">
                <Image
                  src="/quotation/sweetime/spin-wheel.jpg"
                  alt="גלגל ההטבות של Sweetime"
                  width={168}
                  height={299}
                  className="mx-auto h-auto w-full max-w-[340px] rounded-[24px] object-cover"
                />
                <div className="mt-5 rounded-[26px] bg-[#FFF0F8] px-5 py-4 text-sm leading-7 text-[#8B275E]">
                  במקום QR פסיבי, הטאבלט תמיד פתוח על מסך הרשמה. הלקוח נרשם, מסובב, מקבל הטבה — ונכנס אוטומטית למועדון
                  הלקוחות.
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="ordering-website" className="px-4 py-14 md:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="rounded-[40px] border border-[#D7E8F8] bg-white p-4 shadow-[0_22px_60px_rgba(16,32,68,0.08)]">
              <div className="mx-auto max-w-[350px] rounded-[34px] border-[12px] border-[#102044] bg-white p-4 shadow-[0_20px_55px_rgba(16,32,68,0.12)]">
                <div className="overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#F5FBFF,#FFF4FA)] p-4">
                  <div className="flex items-center justify-between">
                    <Image
                      src="/quotation/sweetime/logo-blue.jpg"
                      alt="לוגו Sweetime"
                      width={591}
                      height={591}
                      className="h-auto w-[92px]"
                    />
                    <div className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#F23893]">עגלה</div>
                  </div>
                  <div className="mt-4 rounded-[22px] bg-white px-4 py-3 text-sm text-[#5D6B82] shadow-[0_12px_28px_rgba(16,32,68,0.06)]">
                    הזמנה מהירה לקינוחים חמים, קרים ומארזים
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {productCards.slice(0, 4).map((product, index) => (
                      <div key={product.name} className="rounded-[24px] bg-white p-3 shadow-[0_12px_28px_rgba(16,32,68,0.05)]">
                        <div
                          className={cn(
                            "h-24 rounded-[18px]",
                            index % 2 === 0
                              ? "bg-[linear-gradient(135deg,#FDE3F2,#FBC1E0)]"
                              : "bg-[linear-gradient(135deg,#DDF4FF,#B6E2FF)]"
                          )}
                        />
                        <p className="mt-3 text-sm font-bold text-[#102044]">{product.name}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-black text-[#F23893]">{product.price}</span>
                          <span className="rounded-full bg-[#EAF7FF] px-2 py-1 text-[11px] font-bold text-[#169BEE]">
                            הוסף
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <SectionHeading
                eyebrow="אתר הזמנות"
                title={quotationData.orderingWebsite.title}
                description={quotationData.orderingWebsite.text}
                centered={false}
              />
              <div className="rounded-[32px] border border-[#D7E8F8] bg-white p-6 shadow-[0_18px_50px_rgba(16,32,68,0.06)]">
                <div className="grid gap-4 sm:grid-cols-2">
                  {productCards.map((product, index) => (
                    <div key={product.name} className="rounded-[24px] border border-[#E0EDF9] bg-[#FBFDFF] p-4">
                      <div
                        className={cn(
                          "h-28 rounded-[18px]",
                          index % 3 === 0
                            ? "bg-[linear-gradient(135deg,#FFE4F1,#FFC9E1)]"
                            : index % 3 === 1
                              ? "bg-[linear-gradient(135deg,#EAF7FF,#D4F0FF)]"
                              : "bg-[linear-gradient(135deg,#FFF7D6,#FFE58C)]"
                        )}
                      />
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="font-bold text-[#102044]">{product.name}</p>
                          <p className="mt-1 text-sm text-[#5D6B82]">{product.price}</p>
                        </div>
                        <span className="rounded-full bg-[#169BEE] px-3 py-2 text-xs font-bold text-white">הזמן עכשיו</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-[24px] border border-[#FBC1E0] bg-[#FFF0F8] px-5 py-4 text-sm leading-7 text-[#8B275E]">
                  <p className="font-bold">{quotationData.orderingWebsite.banner}</p>
                  <p className="mt-2">{quotationData.orderingWebsite.crossSell}</p>
                </div>
              </div>
              <p className="text-base leading-8 text-[#425168]">
                המטרה היא לא רק לאפשר הזמנה, אלא להגדיל סל קנייה דרך תוספות חכמות, מוצרים משלימים והצעות רלוונטיות.
              </p>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="included" className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading
              eyebrow="מה כולל"
              title="מה כולל השירות?"
              description="מעטפת מלאה שמחברת בין אסטרטגיה, תוכן, פרסום, AI, WhatsApp ומערכת לקוחות חוזרים."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {includedServices.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-[#D7E8F8] bg-white p-5 shadow-[0_16px_36px_rgba(16,32,68,0.05)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#EAF7FF] text-[#169BEE]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-black text-[#102044]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5D6B82]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="why-me" className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-[1280px] rounded-[40px] border border-[#D7E8F8] bg-[linear-gradient(180deg,#ffffff,#f6fbff)] px-6 py-10 shadow-[0_22px_60px_rgba(16,32,68,0.06)] md:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div className="space-y-5">
                <SectionHeading
                  eyebrow="למה אני"
                  title="למה לעבוד איתי?"
                  description="הגישה שלי היא לא לייצר רעש שיווקי, אלא לבנות פעילות שמחוברת לביצועים. המיקוד הוא בתוצאות עסקיות: תנועה לחנות, פניות, קופונים, לקוחות חוזרים ומכירות — לא רק לייקים ותגובות."
                  centered={false}
                />
                <div className="rounded-[34px] bg-[linear-gradient(135deg,#169BEE,#0A68B8)] px-6 py-8 text-white shadow-[0_20px_55px_rgba(22,155,238,0.24)]">
                  <p className="text-sm font-bold tracking-[0.14em] text-white/80">נתון מרכזי</p>
                  <p className="mt-3 text-[3.4rem] font-black leading-none">₪10M+</p>
                  <p className="mt-3 text-lg font-bold">בתקציבי פרסום מנוהלים</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {trustCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-[30px] border border-[#D7E8F8] bg-white p-5 shadow-[0_16px_36px_rgba(16,32,68,0.05)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#FFF0F8] text-[#F23893]">
                      <card.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-black text-[#102044]">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#5D6B82]">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="recommendation" className="px-4 pb-24 pt-10 md:pb-28 md:pt-16">
          <div
            id="contact"
            className="mx-auto max-w-[1280px] overflow-hidden rounded-[42px] border border-white/60 bg-[linear-gradient(135deg,#169BEE_0%,#4FC9FF_28%,#F79DCC_66%,#F23893_100%)] px-6 py-10 text-white shadow-[0_30px_90px_rgba(16,32,68,0.14)] md:px-10"
          >
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="text-sm font-bold tracking-[0.16em] text-white/80">המלצה סופית</p>
                <h2 className="mt-4 text-[2.3rem] font-black leading-[1.06] md:text-[3.6rem]">
                  {quotationData.finalRecommendation.title}
                </h2>
                <p className="mt-4 text-lg font-bold leading-8 text-white/92">
                  {quotationData.finalRecommendation.subtitle}
                </p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/88">
                  {quotationData.finalRecommendation.summary}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <QuotationButton href="https://wa.me/972000000000" className="bg-white text-[#F23893] shadow-[0_16px_36px_rgba(255,255,255,0.24)] hover:bg-[#fff7fb]">
                    נתחיל יחד
                  </QuotationButton>
                  <QuotationButton href="#plans" variant="secondary" className="border-white/50 bg-white/15 text-white backdrop-blur hover:bg-white/22">
                    בחירת מסלול
                  </QuotationButton>
                </div>
              </div>

              <div className="rounded-[34px] border border-white/35 bg-white/14 p-5 backdrop-blur">
                <Image
                  src="/quotation/sweetime/logo-pink.jpg"
                  alt="לוגו Sweetime"
                  width={688}
                  height={688}
                  className="h-auto w-[136px] rounded-[22px] bg-white/90 p-2"
                />
                <div className="mt-5 space-y-3">
                  {quotationData.finalRecommendation.items.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[22px] bg-white/16 px-4 py-3 text-sm leading-7 text-white">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-white" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-xs leading-6 text-white/80">
                  תקציב הפרסום משולם ישירות ע״י הלקוח לפלטפורמות Meta / TikTok. דמי הניהול והשירות משולמים עבור ניהול,
                  תוכן, אסטרטגיה ו-Growth Engine.
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>
    </main>
  );
}
