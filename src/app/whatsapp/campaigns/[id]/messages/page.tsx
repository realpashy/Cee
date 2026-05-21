import { PlaceholderPage } from "@/components/whatsapp/placeholder-page";

export default function WhatsappCampaignMessagesPage() {
  return (
    <PlaceholderPage
      eyebrow="الرسائل"
      title="سجل رسائل واتساب وحالات التسليم"
      description="هنا ستظهر الرسائل الصادرة والواردة، حالات sent/delivered/read/failed، والردود أو إلغاء الاشتراك."
      points={[
        "سجل مرتب زمنيًا يوضح القالب المستخدم والرسالة الناتجة.",
        "تتبع statuses القادمة من webhook مثل delivered وread وfailed.",
        "التعامل مع الردود أو كلمات إلغاء الاشتراك بشكل مركزي.",
        "إظهار سبب الفشل عند رفض الرسالة أو تعطل الإرسال."
      ]}
    />
  );
}
