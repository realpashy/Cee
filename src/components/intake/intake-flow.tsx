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
import type {
  AnalysisResult,
  BusinessAnswers,
  ContactDetails,
  IntakeLocale
} from "@/components/intake/types";
import type { SiteMessages } from "@/lib/i18n";

type Phase = "intro" | "questions" | "analysis" | "result" | "contact" | "success";

type LocalizedRecord = Record<IntakeLocale, string>;

const baseAnswers: BusinessAnswers = {
  businessType: "",
  mainGoal: "",
  biggestProblem: "",
  currentMarketing: [],
  monthlyBudget: "",
  timeline: "",
  successGoal: ""
};

const localizedChoices: Record<string, LocalizedRecord> = {
  "Local business / physical store": {
    en: "Local business / physical store",
    he: "עסק מקומי / חנות פיזית",
    ar: "نشاط محلي / متجر فعلي"
  },
  "Ecommerce store": {
    en: "Ecommerce store",
    he: "חנות איקומרס",
    ar: "متجر تجارة إلكترونية"
  },
  "Service provider": {
    en: "Service provider",
    he: "נותן שירות",
    ar: "مقدم خدمات"
  },
  "Real estate / construction": {
    en: "Real estate / construction",
    he: "נדל\"ן / בנייה",
    ar: "عقارات / مقاولات"
  },
  "Restaurant / food brand": {
    en: "Restaurant / food brand",
    he: "מסעדה / מותג אוכל",
    ar: "مطعم / علامة غذائية"
  },
  "Personal brand / creator": {
    en: "Personal brand / creator",
    he: "מותג אישי / יוצר תוכן",
    ar: "علامة شخصية / صانع محتوى"
  },
  "Startup / SaaS": {
    en: "Startup / SaaS",
    he: "סטארטאפ / SaaS",
    ar: "شركة ناشئة / SaaS"
  },
  Other: {
    en: "Other",
    he: "אחר",
    ar: "أخرى"
  },
  "Get more leads": {
    en: "Get more leads",
    he: "לקבל יותר לידים",
    ar: "الحصول على ليدز أكثر"
  },
  "Increase online sales": {
    en: "Increase online sales",
    he: "להגדיל מכירות אונליין",
    ar: "زيادة المبيعات عبر الإنترنت"
  },
  "Create better ads and videos": {
    en: "Create better ads and videos",
    he: "ליצור מודעות וסרטונים טובים יותר",
    ar: "إنشاء إعلانات وفيديوهات أقوى"
  },
  "Improve my website / landing page": {
    en: "Improve my website / landing page",
    he: "לשפר אתר / דף נחיתה",
    ar: "تحسين الموقع / صفحة الهبوط"
  },
  "Automate my sales or follow-up process": {
    en: "Automate my sales or follow-up process",
    he: "לאוטומט מכירות או מעקב",
    ar: "أتمتة المبيعات أو المتابعة"
  },
  "Build a full growth system": {
    en: "Build a full growth system",
    he: "לבנות מערכת צמיחה מלאה",
    ar: "بناء منظومة نمو كاملة"
  },
  "Not sure yet": {
    en: "Not sure yet",
    he: "עדיין לא בטוח/ה",
    ar: "لست متأكدًا بعد"
  },
  "I get traffic but not enough sales": {
    en: "I get traffic but not enough sales",
    he: "יש תנועה אבל אין מספיק מכירות",
    ar: "يوجد زيارات لكن لا توجد مبيعات كافية"
  },
  "I do not get enough leads": {
    en: "I do not get enough leads",
    he: "אין מספיק לידים",
    ar: "لا أحصل على ليدز كافية"
  },
  "My ads are not profitable": {
    en: "My ads are not profitable",
    he: "המודעות לא רווחיות",
    ar: "إعلاناتي غير مربحة"
  },
  "My brand looks weak online": {
    en: "My brand looks weak online",
    he: "המותג נראה חלש אונליין",
    ar: "العلامة تبدو ضعيفة أونلاين"
  },
  "I need better content/videos": {
    en: "I need better content/videos",
    he: "צריך תוכן / וידאו טובים יותר",
    ar: "أحتاج إلى محتوى / فيديو أفضل"
  },
  "I do too much manually": {
    en: "I do too much manually",
    he: "אני עושה יותר מדי ידנית",
    ar: "أقوم بالكثير يدويًا"
  },
  "I am starting from zero": {
    en: "I am starting from zero",
    he: "אני מתחיל/ה מאפס",
    ar: "أنا أبدأ من الصفر"
  },
  "Meta ads": {
    en: "Meta ads",
    he: "מודעות Meta",
    ar: "إعلانات Meta"
  },
  "Google ads": {
    en: "Google ads",
    he: "מודעות Google",
    ar: "إعلانات Google"
  },
  "TikTok / Reels": {
    en: "TikTok / Reels",
    he: "TikTok / Reels",
    ar: "TikTok / Reels"
  },
  "Organic social media": {
    en: "Organic social media",
    he: "סושיאל אורגני",
    ar: "سوشيال عضوي"
  },
  "Word of mouth only": {
    en: "Word of mouth only",
    he: "מפה לאוזן בלבד",
    ar: "كلام الناس فقط"
  },
  "Website / SEO": {
    en: "Website / SEO",
    he: "אתר / SEO (קידום אורגני)",
    ar: "موقع / SEO (الظهور العضوي)"
  },
  "I am not marketing yet": {
    en: "I am not marketing yet",
    he: "עדיין לא משווק/ת",
    ar: "لا أسوّق بعد"
  },
  "Under ₪2,000": {
    en: "Under ₪2,000",
    he: "מתחת ל-₪2,000",
    ar: "أقل من ₪2,000"
  },
  "₪2,000–₪5,000": {
    en: "₪2,000–₪5,000",
    he: "₪2,000–₪5,000",
    ar: "₪2,000–₪5,000"
  },
  "₪5,000–₪10,000": {
    en: "₪5,000–₪10,000",
    he: "₪5,000–₪10,000",
    ar: "₪5,000–₪10,000"
  },
  "₪10,000–₪25,000": {
    en: "₪10,000–₪25,000",
    he: "₪10,000–₪25,000",
    ar: "₪10,000–₪25,000"
  },
  "₪25,000+": {
    en: "₪25,000+",
    he: "₪25,000+",
    ar: "₪25,000+"
  },
  Immediately: {
    en: "Immediately",
    he: "מיידית",
    ar: "فورًا"
  },
  "This month": {
    en: "This month",
    he: "החודש",
    ar: "هذا الشهر"
  },
  "Within 1–3 months": {
    en: "Within 1–3 months",
    he: "בתוך 1–3 חודשים",
    ar: "خلال 1–3 أشهر"
  },
  "Just exploring": {
    en: "Just exploring",
    he: "רק בודק/ת",
    ar: "أستكشف فقط"
  },
  "Creative Launch": {
    en: "Creative Launch",
    he: "השקת קריאייטיב",
    ar: "إطلاق إبداعي"
  },
  "Growth Engine": {
    en: "Growth Engine",
    he: "מנוע צמיחה",
    ar: "محرك نمو"
  },
  "Monthly Partner": {
    en: "Monthly Partner",
    he: "שותף חודשי",
    ar: "شريك شهري"
  }
};

function localizeChoice(value: string, locale: IntakeLocale) {
  return localizedChoices[value]?.[locale] ?? value;
}

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
    const localized = {
      en: {
        assistantLabel: "AI intake assistant",
        liveReadLabel: "Live read",
        progressLabel: "Progress",
        startStepLabel: "Ready to begin",
        introTime: "Takes around 60 seconds",
        introCommitment: "No commitment",
        introReview: "AI-powered business review",
        start: "Start AI Intake",
        back: "Back",
        next: "Continue",
        reviewTitle: "Cee+ Jules is reviewing your case",
        reviewSubtitle: "Your recommended growth direction is being prepared.",
        reviewLines: [
          "Reviewing your business type...",
          "Checking growth potential...",
          "Matching goals with Cee+ services...",
          "Preparing your qualification result...",
          "Building the recommended next move..."
        ],
        qualifiedTitle: "You’re qualified for a Cee+ Growth Review.",
        qualifiedSubtitle:
          "Your answers show a clear opportunity to improve visibility, creative quality, and conversion performance.",
        continueToContact: "One final step — send my recommendation",
        send: "Send My Growth Review",
        resultEyebrow: "Growth opportunity detected",
        directionLabel: "Recommended direction",
        serviceLabel: "Best-fit starting point",
        opportunityLabel: "What Jules sees",
        packageLabel: "Suggested package",
        packagePriceLabel: "Likely starting investment",
        packagePrefix: "We’d usually start this with",
        incentiveLabel: "Offer unlocked for this case",
        contactTitle: "One final step — where should we send your personalized recommendation?",
        contactBody:
          "We’ve mapped the first direction. Leave your details and Cee+ will send the best next move for your business.",
        sending: "Sending...",
        analysisSignal:
          "Jules will analyze your business type, main bottleneck, budget, and urgency to shape the most relevant next move.",
        successTitle: "Your intake was submitted successfully.",
        successBody:
          "Cee+ will review your answers and contact you with the best next step.",
        openWhatsapp: messages.intake.successCta,
        introHeadline: "Let’s see how Cee+ can grow your business.",
        introBody:
          "Answer a few quick questions and Cee+ Jules will analyze your business, qualify your case, and recommend the best growth direction.",
        formHeading: "Ready to scale?",
        labels: {
          fullName: "Full name",
          phone: "Phone / WhatsApp",
          email: "Email",
          businessName: "Business name",
          websiteOrSocial: "Website / Instagram page (optional)",
          preferredLanguage: "Preferred language",
          consent: "I agree that Cee+ may contact me regarding my request."
        },
        languageNames: {
          en: "English",
          he: "Hebrew",
          ar: "Arabic"
        }
      },
      he: {
        assistantLabel: "עוזר AI חכם",
        liveReadLabel: "קריאה חיה",
        progressLabel: "התקדמות",
        startStepLabel: "מתחילים",
        introTime: "אורך התהליך: בערך 60 שניות",
        introCommitment: "ללא התחייבות",
        introReview: "סקירת עסק מבוססת AI",
        start: "להתחיל את ה-AI Intake",
        back: "חזרה",
        next: "המשך",
        reviewTitle: "Cee+ Jules בודק את המקרה שלכם",
        reviewSubtitle: "עוד רגע תקבלו כיוון צמיחה מומלץ.",
        reviewLines: [
          "מנתחים את סוג העסק...",
          "בודקים פוטנציאל צמיחה...",
          "מצליבים מטרות עם שירותי Cee+...",
          "מכינים תוצאת התאמה...",
          "בונים את ההמלצה הבאה..."
        ],
        qualifiedTitle: "נמצאתם מתאימים ל-Growth Review של Cee+",
        qualifiedSubtitle:
          "לפי התשובות שלכם יש כאן פוטנציאל ברור לחזק נראות, איכות קריאייטיב, וביצועי המרה.",
        continueToContact: "שלב אחרון — שלחו את ההמלצה",
        send: "שלחו את ה-Growth Review",
        resultEyebrow: "זוהתה הזדמנות צמיחה",
        directionLabel: "הכיוון המומלץ כרגע",
        serviceLabel: "נקודת ההתחלה המתאימה",
        opportunityLabel: "מה Jules רואה כרגע",
        packageLabel: "חבילה מומלצת",
        packagePriceLabel: "עלות התחלתית משוערת",
        packagePrefix: "בדרך כלל היינו מתחילים את זה עם",
        incentiveLabel: "הטבה שנפתחה למקרה שלכם",
        contactTitle: "שלב אחרון — לאן לשלוח את ההמלצה האישית שלכם?",
        contactBody:
          "כבר בנינו את הכיוון הראשוני. השאירו פרטים ו-Cee+ ישלח את הצעד הבא שהכי מתאים לעסק שלכם.",
        sending: "שולחים...",
        analysisSignal:
          "Jules ינתח את סוג העסק, החסם המרכזי, התקציב והדחיפות כדי לבנות את הצעד הבא שהכי מתאים לכם.",
        successTitle: "הטופס נשלח בהצלחה.",
        successBody: "Cee+ יעבור על התשובות ויחזור אליכם עם הצעד הכי נכון.",
        openWhatsapp: messages.intake.successCta,
        introHeadline: "בואו נראה איך Cee+ יכול להצמיח את העסק שלכם.",
        introBody:
          "ענו על כמה שאלות קצרות ו-Cee+ Jules ינתח את העסק, יבדוק התאמה, וימליץ על כיוון הצמיחה הטוב ביותר.",
        formHeading: "מוכנים לגדול?",
        labels: {
          fullName: "שם מלא",
          phone: "טלפון / WhatsApp",
          email: "אימייל",
          businessName: "שם העסק",
          websiteOrSocial: "אתר / עמוד Instagram (לא חובה)",
          preferredLanguage: "שפה מועדפת",
          consent: "אני מאשר/ת ש-Cee+ יכול ליצור איתי קשר לגבי הפנייה."
        },
        languageNames: {
          en: "אנגלית",
          he: "עברית",
          ar: "ערבית"
        }
      },
      ar: {
        assistantLabel: "مساعد AI ذكي",
        liveReadLabel: "قراءة مباشرة",
        progressLabel: "التقدم",
        startStepLabel: "جاهز للبدء",
        introTime: "المدة: حوالي 60 ثانية",
        introCommitment: "بدون التزام",
        introReview: "مراجعة أعمال مدعومة بالذكاء",
        start: "ابدأ AI Intake",
        back: "رجوع",
        next: "متابعة",
        reviewTitle: "Cee+ Jules يراجع حالتك الآن",
        reviewSubtitle: "يتم تجهيز اتجاه النمو المقترح لك الآن.",
        reviewLines: [
          "تحليل نوع النشاط...",
          "فحص فرصة النمو...",
          "مطابقة الأهداف مع خدمات Cee+...",
          "تجهيز نتيجة التأهيل...",
          "بناء التوصية التالية..."
        ],
        qualifiedTitle: "أنت مؤهل لمراجعة نمو من Cee+",
        qualifiedSubtitle:
          "إجاباتك تُظهر فرصة واضحة لتحسين الظهور، جودة الإبداع، وأداء التحويل.",
        continueToContact: "خطوة أخيرة — أرسلوا التوصية",
        send: "أرسلوا مراجعة النمو",
        resultEyebrow: "تم رصد فرصة نمو",
        directionLabel: "الاتجاه المقترح الآن",
        serviceLabel: "أفضل نقطة بداية",
        opportunityLabel: "ما الذي يراه Jules الآن",
        packageLabel: "الباقة المقترحة",
        packagePriceLabel: "التكلفة المبدئية المتوقعة",
        packagePrefix: "غالبًا نوصي أن تبدأ هذه الحالة مع",
        incentiveLabel: "عرض تم فتحه لهذه الحالة",
        contactTitle: "خطوة أخيرة — أين نرسل توصيتك الشخصية؟",
        contactBody:
          "لقد جهزنا الاتجاه الأولي. اترك بياناتك وسيقوم Cee+ بإرسال أفضل خطوة تالية لنشاطك.",
        sending: "جارٍ الإرسال...",
        analysisSignal:
          "سيحلل Jules نوع النشاط، العائق الرئيسي، الميزانية، والاستعجال ليبني الخطوة التالية الأنسب لك.",
        successTitle: "تم إرسال النموذج بنجاح.",
        successBody: "ستراجع Cee+ إجاباتك وتعود إليك بأفضل خطوة تالية.",
        openWhatsapp: messages.intake.successCta,
        introHeadline: "دعنا نرى كيف يمكن لـ Cee+ أن ينمّي نشاطك.",
        introBody:
          "أجب عن عدة أسئلة سريعة وسيقوم Cee+ Jules بتحليل نشاطك، تقييم حالتك، واقتراح أفضل اتجاه للنمو.",
        formHeading: "جاهز للنمو؟",
        labels: {
          fullName: "الاسم الكامل",
          phone: "الهاتف / WhatsApp",
          email: "البريد الإلكتروني",
          businessName: "اسم النشاط",
          websiteOrSocial: "الموقع / صفحة Instagram (اختياري)",
          preferredLanguage: "اللغة المفضلة",
          consent: "أوافق على أن تتواصل Cee+ معي بخصوص طلبي."
        },
        languageNames: {
          en: "الإنجليزية",
          he: "العبرية",
          ar: "العربية"
        }
      }
    } satisfies Record<
      IntakeLocale,
      {
        assistantLabel: string;
        liveReadLabel: string;
        progressLabel: string;
        startStepLabel: string;
        introTime: string;
        introCommitment: string;
        introReview: string;
        start: string;
        back: string;
        next: string;
        reviewTitle: string;
        reviewSubtitle: string;
        reviewLines: string[];
        qualifiedTitle: string;
        qualifiedSubtitle: string;
        continueToContact: string;
        send: string;
        resultEyebrow: string;
        directionLabel: string;
        serviceLabel: string;
        opportunityLabel: string;
        packageLabel: string;
        packagePriceLabel: string;
        packagePrefix: string;
        incentiveLabel: string;
        contactTitle: string;
        contactBody: string;
        sending: string;
        analysisSignal: string;
        successTitle: string;
        successBody: string;
        openWhatsapp: string;
        introHeadline: string;
        introBody: string;
        formHeading: string;
        labels: Record<string, string>;
        languageNames: Record<IntakeLocale, string>;
      }
    >;

    return localized[locale];
  }, [locale, messages.intake.successCta]);

  const translate = useMemo(() => {
    return (value: string) => localizeChoice(value, locale);
  }, [locale]);

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

    const text = {
      en: {
        businessTypeTitle: "What type of business are you running?",
        mainGoalTitle: "What do you want Cee+ to help you with most?",
        biggestProblemTitle: "What is your current biggest problem?",
        currentMarketingTitle: "How are you currently marketing your business?",
        monthlyBudgetTitle: "What is your monthly marketing budget or expected budget?",
        timelineTitle: "How soon do you want to start improving results?",
        successGoalTitle: "Which result would make this project successful for you?",
        selectHint: "Select the closest fit so we can personalize the direction.",
        growthHint: "Good choice — this helps us understand your growth path.",
        multiHint: "Choose all channels that are active right now.",
        budgetHint: "Budget range helps Jules match the right scale of execution.",
        urgencyHint: "Urgency is a strong signal for how we shape the next step.",
        successHint: "Tell Jules what success looks like.",
        successPlaceholder:
          "Example: more bookings, more sales, better ads, stronger brand, automated leads…"
      },
      he: {
        businessTypeTitle: "איזה סוג עסק אתם מנהלים?",
        mainGoalTitle: "במה אתם הכי רוצים ש-Cee+ יעזור לכם?",
        biggestProblemTitle: "מה הבעיה העיקרית שלכם כרגע?",
        currentMarketingTitle: "איך אתם משווקים את העסק היום?",
        monthlyBudgetTitle: "מה תקציב השיווק החודשי או המתוכנן?",
        timelineTitle: "תוך כמה זמן אתם רוצים להתחיל לשפר תוצאות?",
        successGoalTitle: "איזו תוצאה תהפוך את הפרויקט הזה להצלחה מבחינתכם?",
        selectHint: "בחרו את מה שהכי קרוב כדי שנוכל לדייק את הכיוון.",
        growthHint: "בחירה טובה — זה עוזר לנו להבין את מסלול הצמיחה שלכם.",
        multiHint: "אפשר לבחור כמה ערוצים שפועלים אצלכם כרגע.",
        budgetHint: "טווח התקציב עוזר ל-Jules להתאים את רמת הביצוע הנכונה.",
        urgencyHint: "הדחיפות היא סימן חשוב לדרך שבה נבנה את השלב הבא.",
        successHint: "ספרו ל-Jules איך נראית הצלחה מבחינתכם.",
        successPlaceholder:
          "לדוגמה: יותר פגישות, יותר מכירות, מודעות טובות יותר, מותג חזק יותר, לידים אוטומטיים..."
      },
      ar: {
        businessTypeTitle: "ما نوع النشاط الذي تديره؟",
        mainGoalTitle: "ما أكثر شيء تريد أن تساعدك فيه Cee+؟",
        biggestProblemTitle: "ما أكبر مشكلة تواجهك الآن؟",
        currentMarketingTitle: "كيف تسوّق نشاطك اليوم؟",
        monthlyBudgetTitle: "ما ميزانية التسويق الشهرية أو المتوقعة؟",
        timelineTitle: "متى تريد أن تبدأ تحسين النتائج؟",
        successGoalTitle: "ما النتيجة التي ستجعل هذا المشروع ناجحًا بالنسبة لك؟",
        selectHint: "اختر الأقرب حتى نخصص الاتجاه بدقة.",
        growthHint: "اختيار ممتاز — هذا يساعدنا على فهم مسار النمو لديك.",
        multiHint: "اختر كل القنوات التي تعمل عليها حاليًا.",
        budgetHint: "نطاق الميزانية يساعد Jules على مطابقة مستوى التنفيذ المناسب.",
        urgencyHint: "الاستعجال إشارة مهمة لكيفية تشكيل الخطوة التالية.",
        successHint: "اخبر Jules كيف يبدو النجاح بالنسبة لك.",
        successPlaceholder:
          "مثال: حجوزات أكثر، مبيعات أكثر، إعلانات أفضل، علامة أقوى، ليدز مؤتمتة…"
      }
    }[locale];

    const mapOption = (value: string) => ({
      label: translate(value),
      value
    });

    return [
      {
        key: "businessType" as const,
        title: text.businessTypeTitle,
        body: text.selectHint,
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
        title: text.mainGoalTitle,
        body: text.selectHint,
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
        title: text.biggestProblemTitle,
        body: text.growthHint,
        options: biggestProblemOptions.map(mapOption)
      },
      {
        key: "currentMarketing" as const,
        title: text.currentMarketingTitle,
        body: text.multiHint,
        multiSelect: true,
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
        title: text.monthlyBudgetTitle,
        body: text.budgetHint,
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
        title: text.timelineTitle,
        body: text.urgencyHint,
        options: ["Immediately", "This month", "Within 1–3 months", "Just exploring"].map(mapOption)
      },
      {
        key: "successGoal" as const,
        title: text.successGoalTitle,
        body: text.successHint,
        textPlaceholder: text.successPlaceholder
      }
    ];
  }, [answers.mainGoal, locale, translate]);

  const currentQuestion = questionSet[questionIndex];
  const totalSteps = questionSet.length + 1;

  const marketingDisplay = useMemo(() => {
    if (!answers.currentMarketing.length) {
      return locale === "he"
        ? "עדיין לא נבחרו ערוצים"
        : locale === "ar"
          ? "لم يتم اختيار قنوات بعد"
          : "No channels selected yet";
    }

    return answers.currentMarketing.map((entry) => translate(entry)).join(locale === "ar" ? "، " : ", ");
  }, [answers.currentMarketing, locale, translate]);

  const liveReadText = useMemo(() => {
    if (!answers.businessType && !analysis) {
      return copy.analysisSignal;
    }

    if (analysis) {
      if (locale === "he") {
        return `כרגע Jules מזהה התאמה טובה לכיוון של ${translate(
          analysis.recommendedService
        )}, עם הזדמנות ברורה סביב ${analysis.recommendedSolution}.`;
      }

      if (locale === "ar") {
        return `يرى Jules الآن ملاءمة قوية لمسار ${translate(
          analysis.recommendedService
        )}، مع فرصة واضحة حول ${analysis.recommendedSolution}.`;
      }

      return `Jules currently sees a strong fit for ${translate(
        analysis.recommendedService
      )}, with a clear opportunity around ${analysis.recommendedSolution}.`;
    }

    if (locale === "he") {
      return `העסק שלכם פועל כ-${translate(answers.businessType || "Other")} ומתמקד כרגע ב-${translate(
        answers.mainGoal || "Not sure yet"
      )}. הערוצים הפעילים שנבחרו: ${marketingDisplay}.`;
    }

    if (locale === "ar") {
      return `نشاطك يعمل كـ ${translate(answers.businessType || "Other")} ويركز الآن على ${translate(
        answers.mainGoal || "Not sure yet"
      )}. القنوات النشطة التي اخترتها: ${marketingDisplay}.`;
    }

    return `Your business is showing up as ${translate(
      answers.businessType || "Other"
    )}, focused on ${translate(answers.mainGoal || "Not sure yet")}. Active channels selected: ${marketingDisplay}.`;
  }, [analysis, answers.businessType, answers.mainGoal, copy.analysisSignal, locale, marketingDisplay, translate]);

  const resultHighlights = useMemo(() => {
    const items = [
      answers.businessType && translate(answers.businessType),
      answers.mainGoal && translate(answers.mainGoal),
      answers.timeline && translate(answers.timeline)
    ].filter(Boolean) as string[];

    return items;
  }, [answers.businessType, answers.mainGoal, answers.timeline, translate]);

  const opportunitySummary = useMemo(() => {
    if (!analysis) {
      return "";
    }

    if (locale === "he") {
      return `לפי התשובות שלכם, יש כאן פוטנציאל אמיתי לשפר את ${translate(
        answers.mainGoal
      )}, בעיקר דרך ${analysis.recommendedSolution}. זה נראה כמו מקרה עם כוונה ${analysis.intentLevel === "High" ? "גבוהה" : analysis.intentLevel === "Medium" ? "בינונית" : "ראשונית"} להתחיל לזוז נכון.`;
    }

    if (locale === "ar") {
      return `بحسب إجاباتك، هناك فرصة حقيقية لتحسين ${translate(
        answers.mainGoal
      )}، خصوصًا عبر ${analysis.recommendedSolution}. هذا يبدو كحالة فيها مستوى نية ${analysis.intentLevel === "High" ? "مرتفع" : analysis.intentLevel === "Medium" ? "متوسط" : "أولي"} للبدء بالطريقة الصحيحة.`;
    }

    return `Based on your answers, there is a real opportunity to improve ${translate(
      answers.mainGoal
    )}, especially through ${analysis.recommendedSolution}. This looks like a ${analysis.intentLevel.toLowerCase()}-to-high intent case worth reviewing properly.`;
  }, [analysis, answers.mainGoal, locale, translate]);

  const packageSuggestion = useMemo(() => {
    if (!analysis) {
      return null;
    }

    const matched =
      messages.pricing.cards.find((card) => card.name === analysis.recommendedService) ??
      messages.pricing.cards.find((card) => card.name === translate(analysis.recommendedService)) ??
      messages.pricing.cards.find((card) => card.name.includes(analysis.recommendedService)) ??
      null;

    if (!matched) {
      return null;
    }

    return {
      name: translate(matched.name),
      price:
        matched.price === "Custom" || matched.price === "מותאם" || matched.price === "مخصص"
          ? analysis.estimatedPrice
          : matched.price,
      suffix: matched.suffix,
      description: matched.description
    };
  }, [analysis, messages.pricing.cards, translate]);

  function stepLabel(current: number) {
    if (locale === "he") {
      return `שלב ${current} מתוך ${totalSteps}`;
    }

    if (locale === "ar") {
      return `الخطوة ${current} من ${totalSteps}`;
    }

    return `Step ${current} of ${totalSteps}`;
  }

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
    await new Promise((resolve) => window.setTimeout(resolve, 5600));
    setAnalysis(payload.analysis);
    setPhase("result");
  }

  function canContinueQuestion() {
    const key = currentQuestion.key;
    const value = answers[key];

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return typeof value === "string" && value.trim().length >= (key === "successGoal" ? 8 : 2);
  }

  function toggleCurrentMarketing(value: string) {
    setAnswers((current) => {
      const next = current.currentMarketing.includes(value)
        ? current.currentMarketing.filter((entry) => entry !== value)
        : [...current.currentMarketing, value];

      return { ...current, currentMarketing: next };
    });
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
            assistant: "Cee+ Jules",
            localizedCurrentMarketing: marketingDisplay,
            estimatedPrice: analysis?.estimatedPrice,
            incentiveTitle: analysis?.incentiveTitle,
            incentiveDetails: analysis?.incentiveDetails
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
    <section
      id="intake"
      dir={isRtl ? "rtl" : "ltr"}
      className="glass-panel relative mx-auto max-w-[1120px] overflow-hidden rounded-[24px]"
    >
      <div className="grid min-h-[760px] lg:grid-cols-[0.36fr_0.64fr]">
        <aside className="relative overflow-hidden border-b border-white/8 bg-[linear-gradient(180deg,rgba(149,223,30,0.08),rgba(149,223,30,0.03))] p-6 lg:border-b-0 lg:border-r lg:border-white/8 lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_22%,rgba(149,223,30,0.12),transparent_26%)]" />
          <div className="relative">
            <div className={["flex items-center gap-3", isRtl ? "justify-end" : ""].join(" ")}>
              <Image
                src="/brand/cee-wordmark.png"
                alt="Cee+"
                width={136}
                height={48}
                className="h-auto w-[104px]"
              />
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
                  "mt-4 text-[2rem] font-black text-white md:text-[2.55rem]",
                  locale === "ar" ? "leading-[1.22]" : "leading-[1.08]"
                ].join(" ")}
              >
                {phase === "intro"
                  ? copy.introHeadline
                  : phase === "analysis"
                    ? copy.reviewTitle
                    : phase === "result"
                      ? copy.qualifiedTitle
                      : copy.formHeading}
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--brand-silver)]">
                {phase === "intro"
                  ? copy.introBody
                  : phase === "analysis"
                    ? copy.reviewSubtitle
                    : phase === "result"
                      ? copy.qualifiedSubtitle
                      : messages.intake.subtitle}
              </p>
            </div>

            <div className={["mt-8 flex flex-wrap gap-3", isRtl ? "flex-row-reverse justify-end" : ""].join(" ")}>
              {[copy.introTime, copy.introCommitment, copy.introReview].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[11px] font-bold text-[var(--brand-silver)]"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-[18px] border border-white/10 bg-[rgb(12_14_12_/_0.75)] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-lime)]">
                {copy.liveReadLabel}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-silver)]">{liveReadText}</p>
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
              <div className="space-y-5">
                <ProgressIndicator
                  current={0}
                  total={totalSteps}
                  progressLabel={copy.progressLabel}
                  stepLabel={copy.startStepLabel}
                  rtl={isRtl}
                />
                <div className={isRtl ? "text-right" : "text-left"}>
                  <button type="button" onClick={() => setPhase("questions")} className="btn-primary">
                    {copy.start}
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {phase === "questions" ? (
            <div className="flex min-h-[640px] flex-col justify-between">
              <div>
                <ProgressIndicator
                  current={questionIndex + 1}
                  total={totalSteps}
                  progressLabel={copy.progressLabel}
                  stepLabel={stepLabel(questionIndex + 1)}
                  rtl={isRtl}
                />
                <div className="mt-8">
                  <AnimatePresence mode="wait">
                    <QuestionStep
                      key={currentQuestion.key}
                      title={currentQuestion.title}
                      body={currentQuestion.body}
                      options={"options" in currentQuestion ? currentQuestion.options : undefined}
                      value={typeof answers[currentQuestion.key] === "string" ? (answers[currentQuestion.key] as string) : undefined}
                      values={Array.isArray(answers[currentQuestion.key]) ? (answers[currentQuestion.key] as string[]) : undefined}
                      multiSelect={"multiSelect" in currentQuestion ? Boolean(currentQuestion.multiSelect) : false}
                      onSelect={(value) =>
                        setAnswers((current) => ({ ...current, [currentQuestion.key]: value }))
                      }
                      onToggle={"multiSelect" in currentQuestion && currentQuestion.multiSelect ? toggleCurrentMarketing : undefined}
                      textValue={"textPlaceholder" in currentQuestion ? answers.successGoal : undefined}
                      onTextChange={
                        "textPlaceholder" in currentQuestion
                          ? (value) => setAnswers((current) => ({ ...current, successGoal: value }))
                          : undefined
                      }
                      textPlaceholder={
                        "textPlaceholder" in currentQuestion ? currentQuestion.textPlaceholder : undefined
                      }
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

          {phase === "analysis" ? (
            <AnalysisLoader
              lines={copy.reviewLines}
              title={copy.reviewTitle}
              subtitle={copy.reviewSubtitle}
              rtl={isRtl}
            />
          ) : null}

          {phase === "result" && analysis ? (
            <div className="flex min-h-[640px] flex-col justify-center">
              <QualificationResult
                eyebrow={copy.resultEyebrow}
                title={copy.qualifiedTitle}
                subtitle={copy.qualifiedSubtitle}
                continueLabel={copy.continueToContact}
                directionLabel={copy.directionLabel}
                serviceLabel={copy.serviceLabel}
                opportunityLabel={copy.opportunityLabel}
                packageLabel={copy.packageLabel}
                packagePriceLabel={copy.packagePriceLabel}
                packagePrefix={copy.packagePrefix}
                incentiveLabel={copy.incentiveLabel}
                recommendedSolution={analysis.recommendedSolution}
                recommendedService={translate(analysis.recommendedService)}
                opportunitySummary={opportunitySummary}
                highlights={resultHighlights}
                packageName={packageSuggestion?.name}
                packagePrice={packageSuggestion?.price ?? null}
                packageSuffix={packageSuggestion?.suffix ?? null}
                incentiveTitle={analysis.incentiveTitle}
                incentiveDetails={analysis.incentiveDetails}
                onContinue={() => setPhase("contact")}
                rtl={isRtl}
              />
            </div>
          ) : null}

          {phase === "contact" && analysis ? (
            <div className="flex min-h-[640px] flex-col justify-between">
              <div>
                <ProgressIndicator
                  current={totalSteps}
                  total={totalSteps}
                  progressLabel={copy.progressLabel}
                  stepLabel={stepLabel(totalSteps)}
                  rtl={isRtl}
                />
                <div className="mt-8">
                  <AssistantMessage
                    eyebrow={messages.intake.eyebrow}
                    title={copy.contactTitle}
                    body={copy.contactBody}
                    align={isRtl ? "right" : "left"}
                  />
                </div>
                <div className="mt-8">
                  <ContactStep
                    value={contact}
                    onChange={(key, nextValue) => setContact((current) => ({ ...current, [key]: nextValue }))}
                    labels={copy.labels}
                    languageNames={copy.languageNames}
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
                  onClick={() => void submitLead()}
                  disabled={
                    submitState === "loading" ||
                    !contact.fullName ||
                    !contact.phone ||
                    !contact.email ||
                    !contact.businessName ||
                    !contact.consentAccepted
                  }
                  className="btn-primary disabled:opacity-40"
                >
                  {submitState === "loading" ? copy.sending : copy.send}
                </button>
              </div>
              {submitError ? (
                <p className={["mt-3 text-sm text-red-300", isRtl ? "text-right" : "text-left"].join(" ")}>
                  {submitError}
                </p>
              ) : null}
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
                <div className={["mt-8", isRtl ? "text-right" : "text-left"].join(" ")}>
                  <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-primary inline-flex">
                    {copy.openWhatsapp}
                  </a>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
