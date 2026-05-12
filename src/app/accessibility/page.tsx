import Link from "next/link";
import { getMessages, resolveSiteLanguage } from "@/lib/i18n";

export default async function AccessibilityPage({
  searchParams
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const language = resolveSiteLanguage(params.lang);
  const messages = getMessages(language);
  const isRtl = language !== "en";

  const copy =
    language === "he"
      ? {
          title: "הצהרת נגישות",
          intro:
            "Cee+ פועל לשפר את נגישות האתר בהתאם לעקרונות תקן ישראלי 5568 והנחיות WCAG ברמת AA, ככל שמתאים לאתר ולשירותים המוצגים בו.",
          item1: "האתר כולל כלי נגישות בסיסיים להגדלת טקסט, ניגודיות גבוהה, הדגשת קישורים והפחתת תנועה.",
          item2: "המבנה, הניווט והשדות המרכזיים נבנו מתוך כוונה לתמוך בשימוש במקלדת, בקריאת מסך ובהתאמה למובייל.",
          item3: "אם נתקלתם בקושי נגישותי, אפשר לפנות דרך טופס הפנייה באתר או דרך WhatsApp ואנו נבדוק זאת.",
          credit: "פותח על ידי Cee+",
          tagline: "כולנו שווים",
          back: "חזרה לאתר"
        }
      : language === "ar"
        ? {
            title: "بيان إمكانية الوصول",
            intro:
              "تعمل Cee+ على تحسين إمكانية الوصول في الموقع وفق مبادئ المعيار الإسرائيلي 5568 وإرشادات WCAG بمستوى AA، بما يتناسب مع طبيعة الموقع والخدمات المعروضة فيه.",
            item1: "يتضمن الموقع أدوات وصول أساسية مثل تكبير النص، التباين العالي، إبراز الروابط، وتقليل الحركة.",
            item2: "تم بناء البنية العامة والتنقل والنماذج الأساسية بهدف دعم الاستخدام عبر لوحة المفاتيح وقراء الشاشة والهواتف.",
            item3: "إذا واجهت أي عائق في الوصول، يمكنك التواصل عبر نموذج الموقع أو عبر WhatsApp وسنقوم بمراجعته.",
            credit: "تم تطويره بواسطة Cee+",
            tagline: "نحن جميعًا متساوون",
            back: "العودة إلى الموقع"
          }
        : {
            title: "Accessibility Statement",
            intro:
              "Cee+ is working to improve site accessibility in line with Israeli Standard 5568 and WCAG AA principles, as relevant to this website and its services.",
            item1: "The site includes basic accessibility tools for larger text, higher contrast, underlined links, and reduced motion.",
            item2: "The core layout, navigation, and intake flow are designed to support keyboard use, screen readers, and mobile access.",
            item3: "If you encounter an accessibility issue, you can contact us through the website intake form or via WhatsApp and we will review it.",
            credit: "Developed by Cee+",
            tagline: "We’re all equal",
            back: "Back to site"
          };

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="site-grid min-h-screen bg-[var(--brand-black)] px-4 py-16 text-[var(--brand-off-white)] md:px-8"
    >
      <div className="mx-auto max-w-3xl rounded-[22px] border border-white/10 bg-[rgb(14_16_14_/_0.94)] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.34)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--brand-lime)]">
          {messages.footer.accessibility}
        </p>
        <h1 className="mt-4 text-4xl font-black text-white">{copy.title}</h1>
        <p className="mt-4 text-base leading-8 text-[var(--brand-silver)]">{copy.intro}</p>
        <ul className="mt-8 space-y-4 text-base leading-8 text-[var(--brand-silver)]">
          <li>{copy.item1}</li>
          <li>{copy.item2}</li>
          <li>{copy.item3}</li>
        </ul>
        <div className="mt-8 rounded-[16px] border border-white/10 bg-white/4 p-5">
          <p className="text-sm font-bold text-white">{copy.credit}</p>
          <p className="mt-2 text-sm leading-7 text-[var(--brand-silver)]">{copy.tagline}</p>
        </div>
        <div className={["mt-8", isRtl ? "text-right" : "text-left"].join(" ")}>
          <Link href={`/?lang=${language}`} className="btn-primary">
            {copy.back}
          </Link>
        </div>
      </div>
    </main>
  );
}
