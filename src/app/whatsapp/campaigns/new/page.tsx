import { PlaceholderPage } from "@/components/whatsapp/placeholder-page";

export default function NewWhatsappCampaignPage() {
  return (
    <PlaceholderPage
      eyebrow="حملة جديدة"
      title="إنشاء حملة كوبون واتساب"
      description="Phase 1 يجهز النموذج والبيانات الأساسية. بناء محرر الحملات الكامل يأتي في المرحلة التالية."
      points={[
        "اختيار العميل وربط حساب واتساب الصحيح قبل أي إرسال.",
        "تحديد نوع العرض، القالب، وسياسة تكرار المطالبة لنفس الرقم.",
        "تخصيص نص الموافقة والنسخة الخاصة به لكل حملة.",
        "ضبط حدود الإرسال، الصمت الليلي، والمتابعة لاحقًا."
      ]}
    />
  );
}
