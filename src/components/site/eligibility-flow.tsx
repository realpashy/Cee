"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { SiteMessages } from "@/lib/i18n";

type FormState = {
  fullName: string;
  businessName: string;
  phone: string;
  serviceInterest: string;
  primaryGoal: string;
  biggestChallenge: string;
  urgency: (typeof urgencyOptions)[number];
};

type ChannelKey =
  | "physical_location"
  | "tiktok"
  | "facebook"
  | "instagram"
  | "google_business_profile"
  | "website";

type BookingDay = {
  dateKey: string;
  label: string;
  subtitle: string;
  slots: string[];
};

const channelOptions: Array<{
  key: ChannelKey;
  placeholder: string;
  hint: string;
  label: string;
}> = [
  {
    key: "physical_location",
    label: "Physical Location",
    placeholder: "Store address or area",
    hint: "Shop, clinic, office, or showroom"
  },
  {
    key: "tiktok",
    label: "TikTok",
    placeholder: "TikTok channel or URL",
    hint: "Profile, handle, or video page"
  },
  {
    key: "facebook",
    label: "Facebook",
    placeholder: "Facebook page or URL",
    hint: "Business page or campaign profile"
  },
  {
    key: "instagram",
    label: "Instagram",
    placeholder: "Instagram handle or URL",
    hint: "Main account, reels page, or profile"
  },
  {
    key: "google_business_profile",
    label: "Google Business Profile",
    placeholder: "Google Business Profile URL",
    hint: "Maps or business listing presence"
  },
  {
    key: "website",
    label: "Website",
    placeholder: "Website URL",
    hint: "Homepage, landing page, or store URL"
  }
];

const urgencyOptions = ["within_7_days", "this_month", "just_exploring"] as const;

const initialState: FormState = {
  fullName: "",
  businessName: "",
  phone: "",
  serviceInterest: "Creative Launch",
  primaryGoal: "",
  biggestChallenge: "",
  urgency: "within_7_days"
};

function firstNameFrom(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || "";
}

function formatSlotLabel(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${displayHour}:00 ${suffix}`;
}

function generateBookingDays(locale: SiteMessages["locale"]) {
  const today = new Date();
  const days: BookingDay[] = [];
  const dateLocale =
    locale === "he" ? "he-IL" : locale === "ar" ? "ar" : "en-US";
  const nextLabel =
    locale === "he"
      ? "היום הזמין הבא"
      : locale === "ar"
        ? "أقرب يوم متاح"
        : "Next available day";
  const followingLabel =
    locale === "he"
      ? "היום שאחריו"
      : locale === "ar"
        ? "اليوم الذي يليه"
        : "Following day";

  for (let offset = 1; offset <= 2; offset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);

    const seed = date.getDate() + date.getMonth() * 3;
    const slotCount = 3 + (seed % 2);
    const hours = [10, 11, 12, 13, 14, 15, 16, 17];
    const startIndex = seed % 3;
    const selectedHours = hours.slice(startIndex, startIndex + slotCount);

    days.push({
      dateKey: date.toISOString().slice(0, 10),
      label: date.toLocaleDateString(dateLocale, {
        weekday: "short",
        month: "short",
        day: "numeric"
      }),
      subtitle: offset === 1 ? nextLabel : followingLabel,
      slots: selectedHours.map(formatSlotLabel)
    });
  }

  return days;
}

export function EligibilityFlow({ messages }: { messages: SiteMessages }) {
  const isRtl = messages.locale !== "en";
  const ui = useMemo(
    () =>
      messages.locale === "he"
        ? {
          greetingFallback: "נעים להכיר 👋",
          greetingPrefix: "היי",
          stepTwoSubtitle: "בואו נבין קודם מה אתם באמת רוצים לגדל.",
          stepThreeTitle: "עכשיו נזהה את צוואר הבקבוק.",
          stepThreeSubtitle: "ככל שתהיו מדויקים יותר, ההצעה תהיה חדה יותר.",
          stepFourTitle: "שלב אחרון לפני WhatsApp.",
          stepFourSubtitle: "נשתמש בזה כדי להכין את כרטיס הליד ואת הצעד הבא.",
          submitError: "השליחה נכשלה. נסו שוב בעוד רגע.",
          eligibleEyebrow: "נמצאתם מתאימים",
          eligibleTitle: "העסק שלכם נראה כמו התאמה חזקה.",
          eligibleBody:
            "קיבלנו את הפרטים ונחזור אליכם תוך 24 שעות, בדרך כלל בתוך כ-30 דקות. אם WhatsApp לא נפתח אוטומטית, אפשר להמשיך ידנית למטה.",
          featuresHint: "בחרו כל ערוץ פעיל שאתם משתמשים בו כרגע.",
          bookingDayLabel: "יום מועדף לשיחת אסטרטגיה",
          bookingSlotLabel: "שעת שיחה מועדפת",
          availableSlotsSuffix: "זמנים פנויים",
          slotDuration: "שיחת אסטרטגיה של שעה",
          summaryTitle: "סיכום",
          activeChannelsLabel: "ערוצים פעילים",
          preferredCallLabel: "שיחה מועדפת",
          back: "חזרה",
          preparing: "מכינים...",
          continueWhatsapp: "המשך ל-WhatsApp",
          intakeLive: "לייב Intake",
          leadSnapshot: "תמונת ליד",
          currentFocus: "פוקוס נוכחי",
          service: "שירות",
          urgency: "דחיפות",
          channels: "ערוצים",
          call: "שיחה",
          serviceDescriptions: {
            "השקת קריאייטיב": "בדיקה מהירה לקריאייטיב פרימיום.",
            "מנוע צמיחה": "תוכן שוטף ונכסים חזקים יותר לקמפיינים.",
            "שותף חודשי": "ליווי אסטרטגי חודשי צמוד."
          },
          urgencyLabels: {
            within_7_days: "בתוך 7 ימים",
            this_month: "החודש",
            just_exploring: "רק בודקים"
          },
          urgencyDescriptions: {
            within_7_days: "מתאים להטמעה מהירה ולמומנטום מיידי.",
            this_month: "טוב לעסקים שמכינים את המהלך הבא שלהם.",
            just_exploring: "מתאים אם אתם עדיין משווים כיוונים."
          }
        }
        : messages.locale === "ar"
          ? {
            greetingFallback: "تشرفنا 👋",
            greetingPrefix: "أهلًا",
            stepTwoSubtitle: "خلّينا نحدد أولًا ماذا تريد أن تنمّي فعليًا.",
            stepThreeTitle: "الآن نحدد أين العائق الأساسي.",
            stepThreeSubtitle: "كلما كنت أدق، كانت الخطة أذكى.",
            stepFourTitle: "آخر خطوة قبل WhatsApp.",
            stepFourSubtitle: "سنستخدم هذا لإعداد سجل lead والخطوة التالية.",
            submitError: "فشلت عملية الإرسال. حاول مرة أخرى بعد قليل.",
            eligibleEyebrow: "أنت مؤهل",
            eligibleTitle: "نشاطك يبدو مناسبًا جدًا.",
            eligibleBody:
              "استلمنا بياناتك وسنرجع لك خلال 24 ساعة، وغالبًا خلال حوالي 30 دقيقة. إذا لم يفتح WhatsApp تلقائيًا، يمكنك المتابعة يدويًا بالأسفل.",
            featuresHint: "اختر كل قناة فعالة تستخدمها حاليًا.",
            bookingDayLabel: "اليوم المفضل لمكالمة الاستراتيجية",
            bookingSlotLabel: "الوقت المفضل للمكالمة",
            availableSlotsSuffix: "مواعيد متاحة",
            slotDuration: "جلسة استراتيجية لمدة ساعة",
            summaryTitle: "الملخص",
            activeChannelsLabel: "القنوات النشطة",
            preferredCallLabel: "المكالمة المفضلة",
            back: "رجوع",
            preparing: "جارٍ التحضير...",
            continueWhatsapp: "تابع إلى WhatsApp",
            intakeLive: "Intake مباشر",
            leadSnapshot: "ملخص الـ lead",
            currentFocus: "التركيز الحالي",
            service: "الخدمة",
            urgency: "الاستعجال",
            channels: "القنوات",
            call: "المكالمة",
            serviceDescriptions: {
              "إطلاق كرياتيف": "اختبار سريع لكرياتيف فاخر.",
              "محرك النمو": "محتوى مستمر وأصول أقوى للحملات.",
              "شريك شهري": "دعم استراتيجي شهري قريب."
            },
            urgencyLabels: {
              within_7_days: "خلال 7 أيام",
              this_month: "هذا الشهر",
              just_exploring: "ما زلت أستكشف"
            },
            urgencyDescriptions: {
              within_7_days: "الأفضل للتنفيذ السريع والانطلاقة الفورية.",
              this_month: "مناسب للأنشطة التي تجهز خطوتها القادمة.",
              just_exploring: "مناسب إذا كنت ما زلت تقارن الاتجاهات."
            }
          }
          : {
            greetingFallback: "Nice to meet you 👋",
            greetingPrefix: "Hello",
            stepTwoSubtitle: "Let’s map what you actually want to grow first.",
            stepThreeTitle: "Now let’s identify the bottleneck.",
            stepThreeSubtitle: "The more specific this is, the sharper the proposal will be.",
            stepFourTitle: "Last step before WhatsApp.",
            stepFourSubtitle: "We’ll use this to prepare the lead record and next action.",
            submitError: "Submission failed. Please try again in a moment.",
            eligibleEyebrow: "You're Eligible",
            eligibleTitle: "Your business looks like a strong fit.",
            eligibleBody:
              "We've received your details and we'll get back to you within 24 hours, usually within 30 minutes. If WhatsApp does not open automatically, you can continue manually below.",
            featuresHint: "Select every active channel you currently use.",
            bookingDayLabel: "Preferred Strategy Call Day",
            bookingSlotLabel: "Preferred Time Slot",
            availableSlotsSuffix: "available slots",
            slotDuration: "1-hour strategy session",
            summaryTitle: "Summary",
            activeChannelsLabel: "Active channels",
            preferredCallLabel: "Preferred call",
            back: "Back",
            preparing: "Preparing...",
            continueWhatsapp: "Continue to WhatsApp",
            intakeLive: "Intake Live",
            leadSnapshot: "Lead Snapshot",
            currentFocus: "Current Focus",
            service: "Service",
            urgency: "Urgency",
            channels: "Channels",
            call: "Call",
            serviceDescriptions: {
              "Creative Launch": "Fast premium creative testing.",
              "Growth Engine": "Ongoing content and campaign assets.",
              "Monthly Partner": "Hands-on strategic monthly support."
            },
            urgencyLabels: {
              within_7_days: "Within 7 days",
              this_month: "This month",
              just_exploring: "Just exploring"
            },
            urgencyDescriptions: {
              within_7_days: "Best for fast deployment and immediate momentum.",
              this_month: "Good for businesses preparing their next move.",
              just_exploring: "Best if you are still comparing directions."
            }
          },
    [messages.locale]
  );

  const localizedChannelOptions = useMemo(
    () =>
      channelOptions.map((option) => {
        if (messages.locale === "he") {
          const map = {
            physical_location: {
              label: "מיקום פיזי",
              placeholder: "כתובת החנות או האזור",
              hint: "חנות, קליניקה, משרד או אולם תצוגה"
            },
            tiktok: {
              label: "TikTok",
              placeholder: "ערוץ TikTok או קישור",
              hint: "פרופיל, שם משתמש או עמוד וידאו"
            },
            facebook: {
              label: "Facebook",
              placeholder: "עמוד Facebook או קישור",
              hint: "עמוד עסקי או פרופיל קמפיין"
            },
            instagram: {
              label: "Instagram",
              placeholder: "שם משתמש או קישור ל-Instagram",
              hint: "חשבון ראשי, עמוד Reels או פרופיל"
            },
            google_business_profile: {
              label: "Google Business Profile",
              placeholder: "קישור ל-Google Business Profile",
              hint: "נוכחות במפות או ברישום העסק"
            },
            website: {
              label: "אתר",
              placeholder: "קישור לאתר",
              hint: "עמוד בית, דף נחיתה או חנות"
            }
          } as const;
          return { ...option, ...map[option.key] };
        }

        if (messages.locale === "ar") {
          const map = {
            physical_location: {
              label: "موقع فعلي",
              placeholder: "عنوان المحل أو المنطقة",
              hint: "محل، عيادة، مكتب، أو معرض"
            },
            tiktok: {
              label: "TikTok",
              placeholder: "قناة TikTok أو الرابط",
              hint: "الحساب، اليوزر، أو صفحة الفيديو"
            },
            facebook: {
              label: "Facebook",
              placeholder: "صفحة Facebook أو الرابط",
              hint: "صفحة النشاط أو حساب الحملة"
            },
            instagram: {
              label: "Instagram",
              placeholder: "حساب Instagram أو الرابط",
              hint: "الحساب الرئيسي، صفحة reels، أو البروفايل"
            },
            google_business_profile: {
              label: "Google Business Profile",
              placeholder: "رابط Google Business Profile",
              hint: "الظهور على الخرائط أو صفحة النشاط"
            },
            website: {
              label: "الموقع",
              placeholder: "رابط الموقع",
              hint: "الصفحة الرئيسية، صفحة هبوط، أو متجر"
            }
          } as const;
          return { ...option, ...map[option.key] };
        }

        return option;
      }),
    [messages.locale]
  );

  const [form, setForm] = useState<FormState>(initialState);
  const [selectedChannels, setSelectedChannels] = useState<ChannelKey[]>([]);
  const [channelDetails, setChannelDetails] = useState<Record<ChannelKey, string>>({
    physical_location: "",
    tiktok: "",
    facebook: "",
    instagram: "",
    google_business_profile: "",
    website: ""
  });
  const bookingDays = useMemo(() => generateBookingDays(messages.locale), [messages.locale]);
  const [selectedDate, setSelectedDate] = useState(bookingDays[0]?.dateKey ?? "");
  const [selectedSlot, setSelectedSlot] = useState(bookingDays[0]?.slots[0] ?? "");
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [whatsappHref, setWhatsappHref] = useState<string | null>(null);
  const serviceOptions = messages.pricing.cards.map((card) => card.name);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      serviceInterest: serviceOptions.includes(current.serviceInterest)
        ? current.serviceInterest
        : serviceOptions[0] ?? current.serviceInterest
    }));
  }, [serviceOptions]);

  useEffect(() => {
    const onPlanSelect = (event: Event) => {
      const customEvent = event as CustomEvent<{ planName?: string }>;
      const planName = customEvent.detail?.planName;
      if (!planName) {
        return;
      }

      updateField("serviceInterest", planName);
      setStep((current) => (current < 1 ? 1 : current));
    };

    window.addEventListener("cee-plan-select", onPlanSelect as EventListener);
    return () =>
      window.removeEventListener("cee-plan-select", onPlanSelect as EventListener);
  }, []);

  const activeBookingDay =
    bookingDays.find((day) => day.dateKey === selectedDate) ?? bookingDays[0];

  const steps = useMemo(
    () => [
      {
        title: messages.intake.stepLabel,
        subtitle: messages.intake.subtitle
      },
      {
        title: firstNameFrom(form.fullName)
          ? `${ui.greetingPrefix} ${firstNameFrom(form.fullName)} 👋`
          : ui.greetingFallback,
        subtitle: ui.stepTwoSubtitle
      },
      {
        title: ui.stepThreeTitle,
        subtitle: ui.stepThreeSubtitle
      },
      {
        title: ui.stepFourTitle,
        subtitle: ui.stepFourSubtitle
      }
    ],
    [form.fullName, messages.intake.stepLabel, messages.intake.subtitle, ui]
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const currentChannels = selectedChannels
        .map((channel) => {
          const label =
            localizedChannelOptions.find((item) => item.key === channel)?.label ?? channel;
          const detail = channelDetails[channel]?.trim();
          return detail ? `${label}: ${detail}` : label;
        })
        .join(" | ");

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          currentChannels,
          qualificationAnswers: {
            selectedDate,
            selectedSlot
          }
        })
      });

      if (!response.ok) {
        throw new Error("Lead submission failed");
      }

      const data = (await response.json()) as { whatsappHref: string };
      setWhatsappHref(data.whatsappHref);

      window.setTimeout(() => {
        window.location.assign(data.whatsappHref);
      }, 1800);
    } catch {
      setSubmitError(ui.submitError);
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  }

  function toggleChannel(channel: ChannelKey) {
    setSelectedChannels((current) => {
      if (current.includes(channel)) {
        return current.filter((item) => item !== channel);
      }

      return [...current, channel];
    });
  }

  function updateChannelDetail(channel: ChannelKey, value: string) {
    setChannelDetails((current) => ({
      ...current,
      [channel]: value
    }));
  }

  const progress = ((step + 1) / steps.length) * 100;

  function renderChoiceIndicator(active: boolean) {
    return (
      <span
        className={[
          "flex h-5 w-5 items-center justify-center rounded-full border transition",
          active
            ? "border-[var(--brand-lime)] bg-[var(--brand-lime)]"
            : "border-white/18 bg-black/20"
        ].join(" ")}
      >
        <Image
          src="/brand/plus.png"
          alt=""
          aria-hidden="true"
          width={12}
          height={12}
          className={active ? "h-3 w-3 object-contain" : "h-3 w-3 object-contain opacity-55"}
        />
      </span>
    );
  }

  if (whatsappHref) {
    return (
      <section
        id="intake"
        className="glass-panel relative mx-auto max-w-[760px] overflow-hidden rounded-[10px] p-6 md:p-8"
      >
        <div className="absolute right-[-2rem] top-[-2rem] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(149,223,30,0.2),transparent_66%)] blur-2xl" />
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-lime)]">
          {ui.eligibleEyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-black md:text-5xl">
          {ui.eligibleTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--brand-silver)]">
          {ui.eligibleBody}
        </p>
        <a href={whatsappHref} className="btn-primary mt-6">
          {messages.intake.successCta}
        </a>
      </section>
    );
  }

  return (
    <section
      id="intake"
      className="glass-panel relative mx-auto max-w-[920px] overflow-hidden rounded-[10px] lg:min-h-[620px]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div
        className={[
          "absolute inset-y-0 hidden w-[32%] bg-[linear-gradient(180deg,rgba(149,223,30,0.08),rgba(149,223,30,0.02))] lg:block",
          isRtl ? "left-0 border-r border-white/6" : "right-0 border-l border-white/6"
        ].join(" ")}
      />
      <div className="absolute right-[-4rem] top-[-4rem] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(149,223,30,0.18),transparent_68%)] blur-3xl" />

      <div className="relative flex items-center justify-between rounded-t-[10px] border-b border-white/8 bg-white/3 px-6 py-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-lime)]">
            {messages.intake.eyebrow}
          </p>
          <h2
            className={[
              "mt-2 font-black text-white text-[2.35rem] md:text-[2.8rem]",
              messages.locale === "ar"
                ? "leading-[1.18] tracking-normal"
                : "leading-[0.98] tracking-[-0.03em]"
            ].join(" ")}
          >
            {messages.intake.title}
          </h2>
        </div>
        <div className="min-w-24">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
              className="h-full rounded-full bg-[var(--brand-lime)]"
            />
          </div>
        </div>
      </div>

      <div className="relative p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.25 }}
            className={[
              isRtl ? "text-right lg:pl-[calc(32%+2rem)]" : "text-left lg:pr-[calc(32%+2rem)]"
            ].join(" ")}
          >
            <div className="mb-6 flex flex-wrap gap-2">
              {steps.map((_, index) => (
                <span
                  key={index}
                  className={[
                    "rounded-[10px] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.24em] transition-all",
                    index === step
                      ? "bg-[var(--brand-lime)] text-[var(--brand-black)]"
                      : "border border-white/8 bg-black/20 text-[var(--brand-silver)]"
                  ].join(" ")}
                >
                  0{index + 1}
                </span>
              ))}
            </div>

            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white">
              {steps[step]?.title}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--brand-silver)]">
              {steps[step]?.subtitle}
            </p>

            <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
              {step === 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={form.fullName}
                    onChange={(event) => updateField("fullName", event.target.value)}
                    placeholder={messages.intake.formLabels.fullName}
                    className="rounded-[10px] border border-white/8 bg-[rgb(24_25_24)] px-4 py-4 outline-none transition focus:border-[var(--brand-lime)]"
                  />
                  <input
                    value={form.businessName}
                    onChange={(event) => updateField("businessName", event.target.value)}
                    placeholder={messages.intake.formLabels.businessName}
                    className="rounded-[10px] border border-white/8 bg-[rgb(24_25_24)] px-4 py-4 outline-none transition focus:border-[var(--brand-lime)]"
                  />
                </div>
              ) : null}

              {step === 1 ? (
                <div className="grid gap-4">
                  <div>
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-silver)]">
                      {messages.intake.formLabels.serviceInterest}
                    </p>
                    <div className="grid gap-3 md:grid-cols-3">
                      {serviceOptions.map((option) => {
                        const active = form.serviceInterest === option;

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => updateField("serviceInterest", option)}
                            className={[
                              "flex min-h-[88px] items-start gap-3 rounded-[10px] border px-4 py-4 transition",
                              isRtl ? "flex-row-reverse text-right" : "text-left",
                              active
                                ? "border-[var(--brand-lime)] bg-[linear-gradient(180deg,rgba(149,223,30,0.16),rgba(149,223,30,0.06))] shadow-[0_18px_40px_rgba(149,223,30,0.08)]"
                                : "border-white/8 bg-[rgb(24_25_24)] hover:border-white/18"
                            ].join(" ")}
                          >
                            <span className="mt-0.5">{renderChoiceIndicator(active)}</span>
                            <span className="block">
                              <span className="block text-sm font-black text-white">
                                {option}
                              </span>
                              <span className="mt-2 block text-xs leading-6 text-[var(--brand-silver)]">
                                {ui.serviceDescriptions[option as keyof typeof ui.serviceDescriptions] ??
                                  messages.pricing.cards.find((card) => card.name === option)
                                    ?.description}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <input
                    value={form.primaryGoal}
                    onChange={(event) => updateField("primaryGoal", event.target.value)}
                    placeholder={messages.intake.formLabels.primaryGoal}
                    className="rounded-[10px] border border-white/8 bg-[rgb(24_25_24)] px-4 py-4 outline-none transition focus:border-[var(--brand-lime)]"
                  />
                </div>
              ) : null}

              {step === 2 ? (
                <div className="grid gap-4">
                  <input
                    value={form.biggestChallenge}
                    onChange={(event) => updateField("biggestChallenge", event.target.value)}
                    placeholder={messages.intake.formLabels.biggestChallenge}
                    className="rounded-[10px] border border-white/8 bg-[rgb(24_25_24)] px-4 py-4 outline-none transition focus:border-[var(--brand-lime)]"
                  />
                  <div>
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-silver)]">
                      {messages.intake.formLabels.currentChannels}
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {localizedChannelOptions.map((channel) => {
                        const active = selectedChannels.includes(channel.key);

                        return (
                          <button
                            key={channel.key}
                            type="button"
                            onClick={() => toggleChannel(channel.key)}
                            className={[
                              "flex min-h-[88px] items-start gap-3 rounded-[10px] border px-4 py-4 transition",
                              isRtl ? "flex-row-reverse text-right" : "text-left",
                              active
                                ? "border-[var(--brand-lime)] bg-[linear-gradient(180deg,rgba(149,223,30,0.16),rgba(149,223,30,0.06))] shadow-[0_18px_40px_rgba(149,223,30,0.08)]"
                                : "border-white/10 bg-[rgb(24_25_24)] hover:border-white/20"
                            ].join(" ")}
                          >
                            <span className="mt-0.5">{renderChoiceIndicator(active)}</span>
                            <span className="block">
                              <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                                {channel.label}
                              </span>
                              <span className="mt-2 block text-xs leading-5 text-[var(--brand-silver)]">
                                {channel.hint}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {selectedChannels.length ? (
                      <div className="mt-4 grid gap-3">
                        {selectedChannels.map((channel) => {
                          const channelMeta = localizedChannelOptions.find((item) => item.key === channel);

                          return (
                            <div
                              key={channel}
                              className="rounded-[10px] border border-white/8 bg-[rgb(24_25_24)] p-3"
                            >
                              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-lime)]">
                                {channelMeta?.label ?? channel}
                              </p>
                              <input
                                value={channelDetails[channel]}
                                onChange={(event) =>
                                  updateChannelDetail(channel, event.target.value)
                                }
                                placeholder={channelMeta?.placeholder}
                                className="w-full rounded-[10px] border border-white/8 bg-[rgb(17_18_17)] px-4 py-3 outline-none transition focus:border-[var(--brand-lime)]"
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-[var(--brand-silver)]">
                        {ui.featuresHint}
                      </p>
                    )}
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder={messages.intake.formLabels.phone}
                    className="rounded-[10px] border border-white/8 bg-[rgb(24_25_24)] px-4 py-3 outline-none transition focus:border-[var(--brand-lime)] md:col-span-2"
                  />
                  <div className="md:col-span-2">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-silver)]">
                      {messages.intake.formLabels.urgency}
                    </p>
                    <div className="grid gap-3">
                      {urgencyOptions.map((option) => {
                        const active = form.urgency === option;

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => updateField("urgency", option)}
                            className={[
                              "flex items-start gap-3 rounded-[10px] border px-4 py-4 transition",
                              isRtl ? "flex-row-reverse text-right" : "text-left",
                              active
                                ? "border-[var(--brand-lime)] bg-[linear-gradient(180deg,rgba(149,223,30,0.14),rgba(149,223,30,0.05))] text-white shadow-[0_18px_40px_rgba(149,223,30,0.08)]"
                                : "border-white/8 bg-[rgb(24_25_24)] text-[var(--brand-silver)] hover:border-white/20"
                            ].join(" ")}
                          >
                            <span className="mt-0.5">{renderChoiceIndicator(active)}</span>
                            <span className="block">
                              <span className="block text-sm font-bold text-white">
                                {ui.urgencyLabels[option]}
                              </span>
                              <span className="mt-1 block text-xs leading-5 text-[var(--brand-silver)]">
                                {ui.urgencyDescriptions[option]}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-silver)]">
                      {ui.bookingDayLabel}
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {bookingDays.map((day) => {
                        const active = selectedDate === day.dateKey;

                        return (
                          <button
                            key={day.dateKey}
                            type="button"
                            onClick={() => {
                              setSelectedDate(day.dateKey);
                              setSelectedSlot(day.slots[0] ?? "");
                            }}
                            className={[
                              "flex min-h-[92px] items-start gap-3 rounded-[10px] border px-4 py-4 transition",
                              isRtl ? "flex-row-reverse text-right" : "text-left",
                              active
                                ? "border-[var(--brand-lime)] bg-[linear-gradient(180deg,rgba(149,223,30,0.16),rgba(149,223,30,0.06))] shadow-[0_18px_40px_rgba(149,223,30,0.08)]"
                                : "border-white/8 bg-[rgb(24_25_24)] hover:border-white/20"
                            ].join(" ")}
                          >
                            <span className="mt-0.5">{renderChoiceIndicator(active)}</span>
                            <span className="block">
                              <span className="block text-sm font-black text-white">
                                {day.label}
                              </span>
                              <span className="mt-1 block text-xs leading-5 text-[var(--brand-silver)]">
                                {day.subtitle}
                              </span>
                              <span className="mt-2 block text-xs leading-5 text-[var(--brand-lime)]">
                                {day.slots.length} {ui.availableSlotsSuffix}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-silver)]">
                      {ui.bookingSlotLabel}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {activeBookingDay?.slots.map((slot) => {
                        const active = selectedSlot === slot;

                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={[
                              "flex min-h-[72px] items-center gap-3 rounded-[10px] border px-4 py-4 transition",
                              isRtl ? "flex-row-reverse text-right" : "text-left",
                              active
                                ? "border-[var(--brand-lime)] bg-[linear-gradient(180deg,rgba(149,223,30,0.16),rgba(149,223,30,0.06))] shadow-[0_18px_40px_rgba(149,223,30,0.08)]"
                                : "border-white/8 bg-[rgb(24_25_24)] hover:border-white/20"
                            ].join(" ")}
                          >
                            <span className="mt-0.5">{renderChoiceIndicator(active)}</span>
                            <span className="block">
                              <span className="block text-sm font-black text-white">
                                {slot}
                              </span>
                              <span className="mt-1 block text-xs leading-5 text-[var(--brand-silver)]">
                                {ui.slotDuration}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="rounded-[10px] border border-[var(--brand-lime)]/14 bg-[var(--brand-lime)]/6 p-4 md:col-span-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-lime)]">
                      {ui.summaryTitle}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--brand-silver)]">
                      {messages.locale === "he"
                        ? `${form.businessName || "העסק שלכם"} רוצה ${form.primaryGoal || "לגדול מהר יותר"} וכרגע נתקע בגלל ${form.biggestChallenge || "צוואר בקבוק לא ברור"}.`
                        : messages.locale === "ar"
                          ? `${form.businessName || "نشاطك"} يريد ${form.primaryGoal || "أن ينمو أسرع"} لكنه متعطل حاليًا بسبب ${form.biggestChallenge || "عنق زجاجة غير واضح"}.`
                          : `${form.businessName || "Your business"} wants to ${form.primaryGoal || "grow faster"} and is currently blocked by ${form.biggestChallenge || "an unclear bottleneck"}.`}
                    </p>
                    {selectedChannels.length ? (
                      <p className="mt-2 text-sm leading-7 text-[var(--brand-silver)]">
                        {ui.activeChannelsLabel}:{" "}
                        {selectedChannels
                          .map(
                            (channel) =>
                              localizedChannelOptions.find((item) => item.key === channel)?.label ?? channel
                          )
                          .join(", ")}
                        .
                      </p>
                    ) : null}
                    <p className="mt-2 text-sm leading-7 text-[var(--brand-silver)]">
                      {ui.preferredCallLabel}:{" "}
                      {messages.locale === "he"
                        ? `${activeBookingDay?.label} בשעה ${selectedSlot}`
                        : messages.locale === "ar"
                          ? `${activeBookingDay?.label} الساعة ${selectedSlot}`
                          : `${activeBookingDay?.label} at ${selectedSlot}`}
                      .
                    </p>
                  </div>
                </div>
              ) : null}

              <div className={["flex flex-col gap-3 sm:flex-row sm:justify-between", isRtl ? "sm:flex-row-reverse" : ""].join(" ")}>
                <button
                  type="button"
                  onClick={() => setStep((current) => Math.max(0, current - 1))}
                  disabled={step === 0}
                  className="btn-outline disabled:opacity-35"
                >
                  {ui.back}
                </button>

                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setStep((current) => Math.min(steps.length - 1, current + 1))
                    }
                    className="btn-primary"
                  >
                    {messages.intake.nextStep}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-60"
                  >
                    {isSubmitting ? ui.preparing : ui.continueWhatsapp}
                  </button>
                )}
              </div>

              {submitError ? <p className="text-sm text-red-300">{submitError}</p> : null}
            </form>
          </motion.div>
        </AnimatePresence>

        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className={[
            "absolute inset-y-0 hidden w-[32%] lg:flex lg:items-center lg:px-6 xl:px-8",
            isRtl ? "left-0 justify-center" : "right-0 justify-center"
          ].join(" ")}
        >
          <div className={["relative flex w-full max-w-[292px] flex-col", isRtl ? "text-right" : "text-left"].join(" ")}>
            <div
              className={[
                "glass-panel flex items-center gap-3 rounded-[10px] px-4 py-3",
                isRtl ? "flex-row-reverse justify-end" : ""
              ].join(" ")}
            >
              <Image
                src="/brand/cee-wordmark.png"
                alt="Cee+"
                width={136}
                height={48}
                className="h-auto w-[88px]"
              />
              <span className="rounded-full border border-white/8 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.24em] text-[var(--brand-silver)]">
                {ui.intakeLive}
              </span>
            </div>
            <div className="mt-4 rounded-[10px] border border-white/8 bg-[linear-gradient(180deg,rgba(9,10,8,0.82),rgba(14,16,12,0.92))] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
              <div className="space-y-4">
                <div className="rounded-[10px] border border-white/8 bg-black/25 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--brand-lime)]">
                    {ui.leadSnapshot}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--brand-silver)]">
                    {messages.locale === "he"
                      ? `${form.businessName || "העסק שלכם"} מתקדם לעבר ${form.primaryGoal || "כיוון צמיחה חד יותר"}.`
                      : messages.locale === "ar"
                        ? `${form.businessName || "نشاطك"} يتجه نحو ${form.primaryGoal || "اتجاه نمو أوضح"}.`
                        : `${form.businessName || "Your business"} is building toward ${form.primaryGoal || "a sharper growth direction"}.`}
                  </p>
                </div>
                <div className="rounded-[10px] border border-white/8 bg-black/25 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--brand-lime)]">
                    {ui.currentFocus}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--brand-silver)]">
                    {ui.service}: {form.serviceInterest}
                  </p>
                  <p className="mt-1 text-sm leading-7 text-[var(--brand-silver)]">
                    {ui.urgency}: {ui.urgencyLabels[form.urgency]}
                  </p>
                  {selectedChannels.length ? (
                    <p className="mt-1 text-sm leading-7 text-[var(--brand-silver)]">
                      {ui.channels}:{" "}
                      {selectedChannels
                        .map(
                          (channel) =>
                            localizedChannelOptions.find((item) => item.key === channel)?.label ?? channel
                        )
                        .join(", ")}
                    </p>
                  ) : null}
                  <p className="mt-1 text-sm leading-7 text-[var(--brand-silver)]">
                    {ui.call}:{" "}
                    {messages.locale === "he"
                      ? `${activeBookingDay?.label} בשעה ${selectedSlot}`
                      : messages.locale === "ar"
                        ? `${activeBookingDay?.label} الساعة ${selectedSlot}`
                        : `${activeBookingDay?.label} at ${selectedSlot}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
