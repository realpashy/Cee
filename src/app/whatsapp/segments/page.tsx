import { PlaceholderPage } from "@/components/whatsapp/placeholder-page";

export default function WhatsappSegmentsPage() {
  return (
    <PlaceholderPage
      eyebrow="الشرائح"
      title="تقسيم الجمهور حسب السلوك والمصدر"
      description="الشرائح ستكون مرتبطة بكل Tenant وتحترم الموافقة، إلغاء الاشتراك، وتاريخ آخر رسالة."
      points={[
        "فلترة حسب الحملة، المدينة، اللغة، أو قناة المصدر.",
        "استبعاد أي جهة ألغت الاشتراك أو تجاوزت الحد المسموح للرسائل.",
        "تمييز من استلم القسيمة ولم يستردها حتى الآن.",
        "إعداد Segments قابلة لإعادة الاستخدام عبر حملات متعددة."
      ]}
    />
  );
}
