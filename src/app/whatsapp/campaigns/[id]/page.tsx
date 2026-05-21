import { PhaseOnePage } from "@/components/whatsapp/phase-one-page";

export default async function WhatsappCampaignDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PhaseOnePage
      eyebrow="تفاصيل الحملة"
      title={`الحملة ${id}`}
      description="ستجمع هذه الصفحة أداء الحملة، إعدادات العرض، حالة القالب، والجمهور المرتبط بها."
    />
  );
}
