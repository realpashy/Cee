import Link from "next/link";
import { ArrowLeft, Clock3, MailCheck, MessageCircleMore, TicketPercent } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/whatsapp/section-heading";
import { getWhatsappCampaignsData } from "@/server/whatsapp/module-data";

export default async function WhatsappCampaignsPage() {
  const { schemaReady, campaigns } = await getWhatsappCampaignsData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="الحملات"
          title="حملات عروض مبنية على موافقة واضحة"
          description="هذه الصفحة تجمع العرض، القالب، عدد المطالبات، وعدد الكوبونات الناتجة عن كل حملة."
        />
        <Button asChild className="rounded-full">
          <Link href="/whatsapp/campaigns/new">
            <span>إضافة حملة</span>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {!schemaReady ? (
        <Card className="border-amber-400/30 bg-amber-500/10">
          <CardContent className="p-5 text-sm leading-7 text-amber-100">
            بيانات الحملات غير متاحة بعد لأن جداول واتساب لم تُنشأ في قاعدة البيانات الحالية.
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-2">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <Badge variant={campaign.status === "active" ? "success" : "neutral"}>{campaign.status}</Badge>
                  <CardTitle className="mt-3 text-2xl">{campaign.offerTitle}</CardTitle>
                  <CardDescription className="mt-2">
                    {campaign.tenant.name} • {campaign.name}
                  </CardDescription>
                </div>
                <Button asChild variant="secondary" size="sm" className="rounded-full">
                  <Link href={`/whatsapp/campaigns/${campaign.id}`}>
                    <span>التفاصيل</span>
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-7 text-[var(--wa-muted-foreground)]">{campaign.offerDescription}</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[18px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-4">
                  <MessageCircleMore className="h-5 w-5 text-[var(--wa-accent)]" />
                  <p className="mt-3 text-2xl font-black">{campaign._count.submissions}</p>
                  <p className="mt-1 text-sm text-[var(--wa-muted-foreground)]">مطالبات</p>
                </div>
                <div className="rounded-[18px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-4">
                  <TicketPercent className="h-5 w-5 text-[var(--wa-accent)]" />
                  <p className="mt-3 text-2xl font-black">{campaign._count.vouchers}</p>
                  <p className="mt-1 text-sm text-[var(--wa-muted-foreground)]">كوبونات</p>
                </div>
                <div className="rounded-[18px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-4">
                  <MailCheck className="h-5 w-5 text-[var(--wa-accent)]" />
                  <p className="mt-3 text-2xl font-black">{campaign._count.messages}</p>
                  <p className="mt-1 text-sm text-[var(--wa-muted-foreground)]">رسائل</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="info">{campaign.discountType}</Badge>
                <Badge variant="neutral">{campaign.expiryRule}</Badge>
                {campaign.whatsappTemplate ? (
                  <Badge variant={campaign.whatsappTemplate.status === "approved" ? "success" : "warning"}>
                    <span>{campaign.whatsappTemplate.name}</span>
                    <span>{campaign.whatsappTemplate.status}</span>
                  </Badge>
                ) : (
                  <Badge variant="warning">بدون قالب مربوط</Badge>
                )}
                <Badge variant="neutral">
                  <Clock3 className="h-3 w-3" />
                  <span>{campaign.slug}</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
