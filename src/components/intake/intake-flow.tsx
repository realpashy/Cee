"use client";

import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AnalysisLoader } from "@/components/intake/analysis-loader";
import { AssistantMessage } from "@/components/intake/assistant-message";
import { ContactStep } from "@/components/intake/contact-step";
import { ProgressIndicator } from "@/components/intake/progress-indicator";
import { QualificationResult } from "@/components/intake/qualification-result";
import { QuestionStep } from "@/components/intake/question-step";
import type { AnalysisResult, BusinessAnswers, ContactDetails, IntakeLocale } from "@/components/intake/types";
import type { SiteMessages } from "@/lib/i18n";

type Phase = "intro" | "questions" | "analysis" | "result" | "contact" | "success";

const baseAnswers: BusinessAnswers = {
  businessType: "",
  mainGoal: "",
  biggestProblem: "",
  currentMarketing: "",
  monthlyBudget: "",
  timeline: "",
  successGoal: ""
};

export function IntakeFlow({ messages }: { messages: SiteMessages }) {
  const locale = messages.locale as IntakeLocale;
  const isRtl = locale !== "en";
  const [phase, setPhase] = useState<Phase>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<BusinessAnswers>(baseAnswers);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [contact, setContact] = useState<ContactDetails>({
    fullName: "",
    phone: "",
    email: "",
    businessName: "",
    websiteOrSocial: "",
    preferredLanguage: locale,
    consentAccepted: false
  });
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [whatsappHref, setWhatsappHref] = useState<string | null>(null);

  const copy = useMemo(() => {
    const common = {
      assistantLabel: locale === "he" ? "עוזר Intake חכם" : locale === "ar" ? "مساعد Intake ذكي" : "AI intake assistant",
      liveReadLabel: locale === "he" ? "קריאה חיה" : locale === "ar" ? "قراءة مباشرة" : "Live read",
      introTime: locale === "he" ? "אורך התהליך: בערך 60 שניות" : locale === "ar" ? "المدة: حوالي 60 ثانية" : "Takes around 60 seconds",
      introCommitment: locale === "he" ? "ללא התחייבות" : locale === "ar" ? "بدون التزام" : "No commitment",
      introReview: locale === "he" ? "סקירת עסק מבוססת AI" : locale === "ar" ? "مراجعة أعمال مدعومة بالذكاء" : "AI-powered business review",
      start: locale === "he" ? "להתחיל את ה-AI Intake" : locale === "ar" ? "ابدأ AI Intake" : "Start AI Intake",
      back: locale === "he" ? "חזרה" : locale === "ar" ? "رجوع" : "Back",
      next: locale === "he" ? "המשך" : locale === "ar" ? "التالي" : "Continue",
      reviewTitle: locale === "he" ? "Cee+ Jules בודק את המקרה שלכם" : locale === "ar" ? "Cee+ Jules يراجع حالتك الآن" : "Cee+ Jules is reviewing your case",
      reviewSubtitle: locale === "he" ? "עוד רגע תקבלו כיוון צמיחה מומלץ." : locale === "ar" ? "بعد لحظات ستحصل على اتجاه النمو المقترح." : "Your recommended growth direction is being prepared.",
      reviewLines:
        locale === "he"
          ? [
              "מנתחים את סוג העסק...",
              "בודקים פוטנציאל צמיחה...",
              "מצליבים מטרות עם שירותי Cee+...",
              "מכינים תוצאת התאמה...",
              "מייצרים כיוון המשך..."
            ]
          : locale === "ar"
            ? [
                "جولز يراجع نوع النشاط...",
                "يفحص فرصة النمو...",
                "يطابق الأهداف مع خدمات Cee+...",
                "يجهز نتيجة التأهيل...",
                "يبني التوصية التالية..."
              ]
            : [
                "Reviewing your business type...",
                "Checking growth potential...",
                "Matching goals with Cee+ services...",
                "Preparing your qualification result...",
                "Building the recommended next move..."
              ],
      qualifiedTitle: locale === "he" ? "נמצאתם מתאימים ל-Growth Review של Cee+" : locale === "ar" ? "أنت مؤهل لمراجعة النمو من Cee+" : "You’re qualified for a Cee+ Growth Review.",
      qualifiedSubtitle:
        locale === "he"
          ? "לפי התשובות שלכם יש כאן הזדמנות ברורה לחזק נראות, תוכן והמרה."
          : locale === "ar"
            ? "بحسب إجاباتك، هناك فرصة واضحة لتحسين الظهور والمحتوى والتحويل."
            : "Based on your answers, there is a clear opportunity to improve visibility, content quality, and conversion performance.",
      continueToContact: locale === "he" ? "שלב אחרון - שלחו את ההמלצה" : locale === "ar" ? "خطوة أخيرة - أرسلوا التوصية" : "One final step — send my recommendation",
      resultEyebrow: locale === "he" ? "הזדמנות צמיחה זוהתה" : locale === "ar" ? "تم رصد فرصة نمو" : "Growth opportunity detected",
      leadScoreLabel: locale === "he" ? "ציון ליד" : locale === "ar" ? "درجة الليد" : "Lead score",
      directionLabel: locale === "he" ? "כיוון מומלץ" : locale === "ar" ? "الاتجاه المقترح" : "Recommended direction",
      summaryLabel: locale === "he" ? "סיכום אסטרטגי" : locale === "ar" ? "ملخص استراتيجي" : "Strategy summary",
      sending: locale === "he" ? "שולחים..." : locale === "ar" ? "جارٍ الإرسال..." : "Sending...",
      analysisSignal:
        locale === "he"
          ? "Jules ינתח את סוג העסק, הבעיה המרכזית, התקציב והדחיפות כדי להרכיב כיוון צמיחה נכון."
          : locale === "ar"
            ? "سيحلل Jules نوع النشاط، المشكلة الرئيسية، الميزانية، والاستعجال ليقترح اتجاه نمو مناسب."
            : "Jules will analyze the business type, core bottleneck, budget, and urgency to build the right growth direction.",
      contactTitle: locale === "he" ? "שלב אחרון - לאן לשלוח את ההמלצה?" : locale === "ar" ? "خطوة أخيرة — أين نرسل التوصية؟" : "One final step — where should we send your personalized recommendation?",
      send: locale === "he" ? "שלחו את ה-Growth Review" : locale === "ar" ? "أرسلوا مراجعة النمو" : "Send My Growth Review",
      successTitle: locale === "he" ? "הטופס נשלח בהצלחה." : locale === "ar" ? "تم إرسال الطلب بنجاح." : "Your intake was submitted successfully.",
      successBody: locale === "he" ? "Cee+ יעבור על התשובות ויחזור אליכם עם הצעד הכי נכון." : locale === "ar" ? "ستراجع Cee+ إجاباتك وتعود إليك بأفضل خطوة تالية." : "Cee+ will review your answers and contact you with the best next step.",
      openWhatsapp: messages.intake.successCta
    };

    return {
      ...common,
      introHeadline:
        locale === "he"
          ? "בואו נראה איך Cee+ יכול להצמיח את העסק שלכם."
          : locale === "ar"
            ? "دعنا نرى كيف يمكن لـ Cee+ أن ينمّي نشاطك."
            : "Let’s see how Cee+ can grow your business.",
      introBody:
        locale === "he"
          ? "ענו על כמה שאלות קצרות ו-Cee+ Jules ינתח את העסק, יבדוק התאמה, וימליץ על כיוון הצמיחה הטוב ביותר."
          : locale === "ar"
            ? "أجب عن عدة أسئلة سريعة وسيقوم Cee+ Jules بتحليل نشاطك، تأهيل حالتك، واقتراح أفضل اتجاه للنمو."
            : "Answer a few quick questions and Cee+ Jules will analyze your business, qualify your case, and recommend the best growth direction.",
      labels: {
        fullName: locale === "he" ? "שם מלא" : locale === "ar" ? "الاسم الكامل" : "Full name",
        phone: locale === "he" ? "טלפון / WhatsApp" : locale === "ar" ? "الهاتف / WhatsApp" : "Phone / WhatsApp",
        email: locale === "he" ? "אימייל" : locale === "ar" ? "البريد الإلكتروني" : "Email",
        businessName: locale === "he" ? "שם העסק" : locale === "ar" ? "اسم النشاط" : "Business name",
        websiteOrSocial: locale === "he" ? "אתר / Instagram (לא חובה)" : locale === "ar" ? "الموقع / إنستغرام (اختياري)" : "Website / Instagram page (optional)",
        preferredLanguage: locale === "he" ? "שפה מועדפת" : locale === "ar" ? "اللغة المفضلة" : "Preferred language",
        consent:
          locale === "he"
            ? "אני מאשר/ת ש-Cee+ יכול ליצור איתי קשר לגבי הפנייה."
            : locale === "ar"
              ? "أوافق على أن تتواصل Cee+ معي بخصوص طلبي."
              : "I agree that Cee+ may contact me regarding my request."
      }
    };
  }, [locale, messages.intake.successCta]);

  const questionSet = useMemo(() => {
    const biggestProblemOptions =
      answers.mainGoal === "Get more leads"
        ? [
            "I do not get enough leads",
            "My brand looks weak online",
            "I am starting from zero",
            "I do too much manually"
          ]
        : answers.mainGoal === "Increase online sales"
          ? [
              "I get traffic but not enough sales",
              "My ads are not profitable",
              "My brand looks weak online",
              "I need better content/videos"
            ]
          : [
              "I get traffic but not enough sales",
              "I do not get enough leads",
              "My ads are not profitable",
              "My brand looks weak online",
              "I need better content/videos",
              "I do too much manually",
              "I am starting from zero"
            ];

    const translate = (value: string) => {
      if (locale === "he") {
        const map: Record<string, string> = {
          "What type of business are you running?": "איזה סוג עסק אתם מנהלים?",
          "What do you want Cee+ to help you with most?": "במה אתם הכי רוצים ש-Cee+ יעזור לכם?",
          "What is your current biggest problem?": "מה הבעיה העיקרית שלכם כרגע?",
          "How are you currently marketing your business?": "איך אתם משווקים את העסק היום?",
          "What is your monthly marketing budget or expected budget?": "מה תקציב השיווק החודשי או המתוכנן?",
          "How soon do you want to start improving results?": "תוך כמה זמן אתם רוצים להתחיל לשפר תוצאות?",
          "Which result would make this project successful for you?": "איזו תוצאה תהפוך את הפרויקט הזה להצלחה מבחינתכם?",
          "Tell Jules what success looks like.": "ספרו ל-Jules איך נראית הצלחה מבחינתכם.",
          "Good choice — this helps us understand your growth path.": "בחירה טובה - זה עוזר לנו להבין את מסלול הצמיחה שלכם.",
          "Nice, we’re getting a clearer picture.": "מצוין, התמונה מתחילה להתבהר.",
          "Budget range helps Jules match the right scale of execution.": "טווח התקציב עוזר ל-Jules להתאים את רמת הביצוע.",
          "Urgency is a strong signal for how we shape the next step.": "הדחיפות היא סימן חזק לדרך שבה נבנה את השלב הבא.",
          "Select the closest fit so we can personalize the direction.": "בחרו את מה שהכי קרוב כדי שנוכל לדייק את הכיוון.",
          "Example: more bookings, more sales, better ads, stronger brand, automated leads…": "לדוגמה: יותר פגישות, יותר מכירות, מודעות טובות יותר, מותג חזק יותר, לידים אוטומטיים..."
        };
        return map[value] ?? value;
      }
      if (locale === "ar") {
        const map: Record<string, string> = {
          "What type of business are you running?": "ما نوع النشاط الذي تديره؟",
          "What do you want Cee+ to help you with most?": "ما أكثر شيء تريد أن تساعدك فيه Cee+؟",
          "What is your current biggest problem?": "ما أكبر مشكلة تواجهك الآن؟",
          "How are you currently marketing your business?": "كيف تسوق نشاطك حاليًا؟",
          "What is your monthly marketing budget or expected budget?": "ما ميزانية التسويق الشهرية أو المتوقعة؟",
          "How soon do you want to start improving results?": "متى تريد أن تبدأ تحسين النتائج؟",
          "Which result would make this project successful for you?": "ما النتيجة التي ستجعل هذا المشروع ناجحًا بالنسبة لك؟",
          "Tell Jules what success looks like.": "اخبر Jules كيف يبدو النجاح بالنسبة لك.",
          "Good choice — this helps us understand your growth path.": "اختيار ممتاز — هذا يساعدنا على فهم مسار النمو لديك.",
          "Nice, we’re getting a clearer picture.": "ممتاز، أصبحت الصورة أوضح الآن.",
          "Budget range helps Jules match the right scale of execution.": "نطاق الميزانية يساعد Jules على مطابقة مستوى التنفيذ المناسب.",
          "Urgency is a strong signal for how we shape the next step.": "الاستعجال إشارة قوية لكيفية تشكيل الخطوة التالية.",
          "Select the closest fit so we can personalize the direction.": "اختر الأقرب حتى نخصص الاتجاه بدقة.",
          "Example: more bookings, more sales, better ads, stronger brand, automated leads…": "مثال: حجوزات أكثر، مبيعات أكثر، إعلانات أفضل، علامة أقوى، ليدز مؤتمتة…"
        };
        return map[value] ?? value;
      }
      return value;
    };

    const mapOption = (label: string) => {
      const localized = translate(label);
      return { label: localized, value: label };
    };

    return [
      {
        key: "businessType" as const,
        title: translate("What type of business are you running?"),
        body: translate("Select the closest fit so we can personalize the direction."),
        options: [
          "Local business / physical store",
          "Ecommerce store",
          "Service provider",
          "Real estate / construction",
          "Restaurant / food brand",
          "Personal brand / creator",
          "Startup / SaaS",
          "Other"
        ].map(mapOption)
      },
      {
        key: "mainGoal" as const,
        title: translate("What do you want Cee+ to help you with most?"),
        body: translate("Select the closest fit so we can personalize the direction."),
        options: [
          "Get more leads",
          "Increase online sales",
          "Create better ads and videos",
          "Improve my website / landing page",
          "Automate my sales or follow-up process",
          "Build a full growth system",
          "Not sure yet"
        ].map(mapOption)
      },
      {
        key: "biggestProblem" as const,
        title: translate("What is your current biggest problem?"),
        body: translate("Good choice — this helps us understand your growth path."),
        options: biggestProblemOptions.map(mapOption)
      },
      {
        key: "currentMarketing" as const,
        title: translate("How are you currently marketing your business?"),
        body: translate("Nice, we’re getting a clearer picture."),
        options: [
          "Meta ads",
          "Google ads",
          "TikTok / Reels",
          "Organic social media",
          "Word of mouth only",
          "Website / SEO",
          "I am not marketing yet"
        ].map(mapOption)
      },
      {
        key: "monthlyBudget" as const,
        title: translate("What is your monthly marketing budget or expected budget?"),
        body: translate("Budget range helps Jules match the right scale of execution."),
        options: [
          "Under ₪2,000",
          "₪2,000–₪5,000",
          "₪5,000–₪10,000",
          "₪10,000–₪25,000",
          "₪25,000+",
          "Not sure yet"
        ].map(mapOption)
      },
      {
        key: "timeline" as const,
        title: translate("How soon do you want to start improving results?"),
        body: translate("Urgency is a strong signal for how we shape the next step."),
        options: ["Immediately", "This month", "Within 1–3 months", "Just exploring"].map(mapOption)
      },
      {
        key: "successGoal" as const,
        title: translate("Which result would make this project successful for you?"),
        body: translate("Tell Jules what success looks like."),
        textPlaceholder: translate(
          "Example: more bookings, more sales, better ads, stronger brand, automated leads…"
        )
      }
    ];
  }, [answers.mainGoal, locale]);

  const currentQuestion = questionSet[questionIndex];

  async function runAnalysis() {
    setPhase("analysis");
    const response = await fetch("/api/leads/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...answers,
        locale
      })
    });

    if (!response.ok) {
      throw new Error("Analysis failed");
    }

    const payload = (await response.json()) as { analysis: AnalysisResult };
    await new Promise((resolve) => window.setTimeout(resolve, 4300));
    setAnalysis(payload.analysis);
    setPhase("result");
  }

  function canContinueQuestion() {
    const key = currentQuestion.key;
    const value = answers[key];
    return typeof value === "string" && value.trim().length >= (key === "successGoal" ? 8 : 2);
  }

  async function submitLead() {
    setSubmitState("loading");
    setSubmitError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact,
          answers,
          analysis,
          qualificationAnswers: {
            source: "cee-conversational-intake",
            assistant: "Cee+ Jules"
          }
        })
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const payload = (await response.json()) as { whatsappHref: string };
      setWhatsappHref(payload.whatsappHref);
      setSubmitState("success");
      setPhase("success");
    } catch {
      setSubmitState("error");
      setSubmitError(
        locale === "he"
          ? "השליחה נכשלה. נסו שוב בעוד רגע."
          : locale === "ar"
            ? "فشل الإرسال. حاول مرة أخرى بعد قليل."
            : "Submission failed. Please try again."
      );
    }
  }

  return (
    <section id="intake" className="glass-panel relative mx-auto max-w-[1120px] overflow-hidden rounded-[24px]">
      <div className={["grid min-h-[760px] lg:grid-cols-[0.36fr_0.64fr]", isRtl ? "lg:[direction:rtl]" : ""].join(" ")}>
        <aside className="relative overflow-hidden border-b border-white/8 bg-[linear-gradient(180deg,rgba(149,223,30,0.08),rgba(149,223,30,0.03))] p-6 lg:border-b-0 lg:border-r lg:border-white/8 lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_22%,rgba(149,223,30,0.12),transparent_26%)]" />
          <div className="relative">
            <div className={["flex items-center gap-3", isRtl ? "flex-row-reverse justify-end" : ""].join(" ")}>
              <Image src="/brand/cee-wordmark.png" alt="Cee+" width={136} height={48} className="h-auto w-[104px]" />
              <span className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-silver)]">
                Cee+ Jules
              </span>
            </div>

            <div className={["mt-8", isRtl ? "text-right" : "text-left"].join(" ")}>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--brand-lime)]">
                {copy.assistantLabel}
              </p>
              <h2
                className={[
                  "mt-4 text-[2.2rem] font-black text-white md:text-[2.8rem]",
                  locale === "ar" ? "leading-[1.16]" : "leading-[1.02]"
                ].join(" ")}
              >
                {phase === "intro" ? copy.introHeadline : phase === "analysis" ? copy.reviewTitle : phase === "result" ? copy.qualifiedTitle : messages.intake.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--brand-silver)]">
                {phase === "intro" ? copy.introBody : phase === "analysis" ? copy.reviewSubtitle : phase === "result" ? copy.qualifiedSubtitle : messages.intake.subtitle}
              </p>
            </div>

            <div className={["mt-8 flex flex-wrap gap-3", isRtl ? "justify-end" : ""].join(" ")}>
              {[copy.introTime, copy.introCommitment, copy.introReview].map((pill) => (
                <span key={pill} className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[11px] font-bold text-[var(--brand-silver)]">
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-[18px] border border-white/10 bg-[rgb(12_14_12_/_0.75)] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-lime)]">
                {copy.liveReadLabel}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-silver)]">
                {analysis
                  ? analysis.summary
                  : copy.analysisSignal}
              </p>
            </div>
          </div>
        </aside>

        <div className="p-6 md:p-8 lg:p-10">
          {phase === "intro" ? (
            <div className="flex min-h-[640px] flex-col justify-between">
              <div />
              <div className={isRtl ? "text-right" : "text-left"}>
                <AssistantMessage
                  eyebrow={messages.intake.eyebrow}
                  title={copy.introHeadline}
                  body={copy.introBody}
                  align={isRtl ? "right" : "left"}
                />
              </div>
              <div className={["flex items-center justify-between gap-4", isRtl ? "flex-row-reverse" : ""].join(" ")}>
                <ProgressIndicator current={0} total={questionSet.length} />
                <button type="button" onClick={() => setPhase("questions")} className="btn-primary">
                  {copy.start}
                </button>
              </div>
            </div>
          ) : null}

          {phase === "questions" ? (
            <div className="flex min-h-[640px] flex-col justify-between">
              <div>
                <ProgressIndicator current={questionIndex} total={questionSet.length} />
                <div className="mt-8">
                  <AnimatePresence mode="wait">
                    <QuestionStep
                      key={currentQuestion.key}
                      title={currentQuestion.title}
                      body={currentQuestion.body}
                      options={"options" in currentQuestion ? currentQuestion.options : undefined}
                      value={answers[currentQuestion.key]}
                      onSelect={(value) =>
                        setAnswers((current) => ({ ...current, [currentQuestion.key]: value }))
                      }
                      textValue={"textPlaceholder" in currentQuestion ? answers.successGoal : undefined}
                      onTextChange={
                        "textPlaceholder" in currentQuestion
                          ? (value) => setAnswers((current) => ({ ...current, successGoal: value }))
                          : undefined
                      }
                      textPlaceholder={"textPlaceholder" in currentQuestion ? currentQuestion.textPlaceholder : undefined}
                      rtl={isRtl}
                    />
                  </AnimatePresence>
                </div>
              </div>

              <div className={["mt-8 flex items-center justify-between gap-3", isRtl ? "flex-row-reverse" : ""].join(" ")}>
                <button
                  type="button"
                  onClick={() => {
                    if (questionIndex === 0) {
                      setPhase("intro");
                      return;
                    }
                    setQuestionIndex((current) => current - 1);
                  }}
                  className="btn-outline"
                >
                  {copy.back}
                </button>
                <button
                  type="button"
                  disabled={!canContinueQuestion()}
                  onClick={() => {
                    if (questionIndex === questionSet.length - 1) {
                      void runAnalysis();
                      return;
                    }
                    setQuestionIndex((current) => current + 1);
                  }}
                  className="btn-primary disabled:opacity-40"
                >
                  {copy.next}
                </button>
              </div>
            </div>
          ) : null}

          {phase === "analysis" ? <AnalysisLoader lines={copy.reviewLines} title={copy.reviewTitle} subtitle={copy.reviewSubtitle} /> : null}

          {phase === "result" && analysis ? (
            <div className="flex min-h-[640px] flex-col justify-center">
              <QualificationResult
                eyebrow={copy.resultEyebrow}
                title={copy.qualifiedTitle}
                subtitle={copy.qualifiedSubtitle}
                continueLabel={copy.continueToContact}
                scoreLabel={copy.leadScoreLabel}
                directionLabel={copy.directionLabel}
                summaryLabel={copy.summaryLabel}
                analysis={analysis}
                onContinue={() => setPhase("contact")}
                rtl={isRtl}
              />
            </div>
          ) : null}

          {phase === "contact" && analysis ? (
            <div className="flex min-h-[640px] flex-col justify-between">
              <div>
                <AssistantMessage
                  eyebrow={messages.intake.eyebrow}
                  title={copy.contactTitle}
                  body={analysis.suggestedFollowUp}
                  align={isRtl ? "right" : "left"}
                />
                <div className="mt-8">
                  <ContactStep
                    value={contact}
                    onChange={(key, nextValue) =>
                      setContact((current) => ({ ...current, [key]: nextValue }))
                    }
                    labels={copy.labels}
                    rtl={isRtl}
                  />
                </div>
              </div>
              <div className={["mt-8 flex items-center justify-between gap-3", isRtl ? "flex-row-reverse" : ""].join(" ")}>
                <button type="button" onClick={() => setPhase("result")} className="btn-outline">
                  {copy.back}
                </button>
                <button
                  type="button"
                  disabled={
                    submitState === "loading" ||
                    !contact.fullName ||
                    !contact.phone ||
                    !contact.email ||
                    !contact.businessName ||
                    !contact.consentAccepted
                  }
                  onClick={() => void submitLead()}
                  className="btn-primary disabled:opacity-40"
                >
                  {submitState === "loading" ? copy.sending : copy.send}
                </button>
              </div>
              {submitError ? <p className="mt-4 text-sm text-red-300">{submitError}</p> : null}
            </div>
          ) : null}

          {phase === "success" ? (
            <div className="flex min-h-[640px] flex-col justify-center">
                <AssistantMessage
                eyebrow={messages.intake.eyebrow}
                title={copy.successTitle}
                body={copy.successBody}
                align={isRtl ? "right" : "left"}
              />
              {whatsappHref ? (
                <a href={whatsappHref} className="btn-primary mt-8 w-fit">
                  {copy.openWhatsapp}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
