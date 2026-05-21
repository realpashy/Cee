import { PlaceholderPage } from "@/components/whatsapp/placeholder-page";

export default async function WhatsappCampaignDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PlaceholderPage
      eyebrow="تفاصيل الحملة"
      title={`الحملة ${id}`}
      description="ستجمع هذه الصفحة أداء الحملة، إعدادات العرض، حالة القالب، والجمهور المرتبط بها."
      points={[
        "ملخص الأداء العام وعدد المطالبات والكوبونات والرسائل.",
        "حالة القالب المعتمد ومخاطر الإرسال إن لم يكن approved.",
        "رابط صفحة الهبوط العام ومراجعة نص الموافقة المرتبط بها.",
        "مخطط المتابعات اللاحقة وسياسات quiet hours."
      ]}
    />
  );
}
