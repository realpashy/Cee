import { PlaceholderPage } from "@/components/whatsapp/placeholder-page";

export default function WhatsappCampaignAudiencePage() {
  return (
    <PlaceholderPage
      eyebrow="الجمهور"
      title="مشتركو الحملة وطلبات الكوبون"
      description="تعرض هذه الصفحة AudienceContact و CampaignSubmission بدل خلطهم مع leads الخاصة بـ /plus."
      points={[
        "عرض جهات الجمهور مع آخر مطالبة وحالة الاشتراك الحالية.",
        "تمييز الأرقام التي حاولت المطالبة أكثر من مرة داخل نافذة المنع.",
        "إظهار UTM ومصدر الحملة لكل submission.",
        "ربط كل AudienceContact بسجل الموافقة والقسائم المولدة له."
      ]}
    />
  );
}
