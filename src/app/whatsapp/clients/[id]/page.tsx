import { PlaceholderPage } from "@/components/whatsapp/placeholder-page";

export default async function WhatsappClientDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PlaceholderPage
      eyebrow="ملف العميل"
      title={`إعدادات العميل ${id}`}
      description="سيعرض هذا الملف العلامة التجارية، حسابات واتساب، الحملات، وحالة الامتثال الخاصة بهذا العميل."
      points={[
        "ربط Agency Lead بالـ Tenant عند الحاجة فقط، دون خلط العملاء النهائيين في /plus.",
        "إدارة ألوان الهوية والشعار وصور العروض العامة.",
        "تحديد حسابات واتساب المربوطة وحالة مزامنة القوالب.",
        "عرض ملخص الحضور: جمهور، حملات، كوبونات، ورسائل."
      ]}
    />
  );
}
