import { PhaseOnePage } from "@/components/whatsapp/phase-one-page";

export default async function WhatsappClientDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PhaseOnePage
      eyebrow="ملف العميل"
      title={`إعدادات العميل ${id}`}
      description="سيعرض هذا الملف العلامة التجارية، حسابات واتساب، الحملات، وحالة الامتثال الخاصة بهذا العميل."
    />
  );
}
