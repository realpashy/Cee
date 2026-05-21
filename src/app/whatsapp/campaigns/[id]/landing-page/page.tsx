import { PlaceholderPage } from "@/components/whatsapp/placeholder-page";

export default function WhatsappCampaignLandingPageEditor() {
  return (
    <PlaceholderPage
      eyebrow="صفحة الهبوط"
      title="تخصيص صفحة العرض العامة"
      description="صفحات الهبوط ستكون عربية أولًا، متجاوبة، ومبنية على هوية العميل وليس هوية Cee+ فقط."
      points={[
        "اختيار Hero قوي يوصل قيمة العرض مباشرة على الهاتف.",
        "إظهار مزايا واتساب، الثقة، ونص الموافقة بشكل واضح وغير مزعج.",
        "تخصيص الشعار والألوان والصورة الرئيسية حسب هوية العميل.",
        "مراجعة fallback success state والتأكد من وضوح التعليمات بعد الإرسال."
      ]}
    />
  );
}
