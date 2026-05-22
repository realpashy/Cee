import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/whatsapp/metric-card";
import { SectionHeading } from "@/components/whatsapp/section-heading";
import { getWhatsappCampaignsData } from "@/server/whatsapp/module-data";

export default async function WhatsappCampaignsPage() {
  const { schemaReady, campaigns } = await getWhatsappCampaignsData();

  const activeCampaigns = campaigns.filter((campaign) => campaign.status === "active").length;
  const totalSubmissions = campaigns.reduce((sum, campaign) => sum + campaign._count.submissions, 0);
  const totalMessages = campaigns.reduce((sum, campaign) => sum + campaign._count.messages, 0);

  return (
    <div className="space-y-5">
      <SectionHeading
        eyebrow="الحملات"
        title="حملات عروض مبنية على موافقة واضحة"
        description="إدارة الحملات والقوالب والمطالبات في شاشة أكثر قربًا من أدوات التشغيل الحديثة واللوحات المرجعية."
        actions={
          <>
            <Button variant="outline" size="sm">
              Active only
            </Button>
            <Button asChild size="sm">
              <Link href="/whatsapp/campaigns/new">
                <span>إضافة حملة</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </>
        }
      />

      {!schemaReady ? (
        <Card className="border-amber-400/30 bg-amber-500/10">
          <CardContent className="p-5 text-sm leading-6 text-amber-900 dark:text-amber-200">
            بيانات الحملات غير متاحة بعد لأن جداول واتساب لم تُنشأ في قاعدة البيانات الحالية.
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard eyebrow="Campaigns" title="إجمالي الحملات" value={String(campaigns.length)} detail="جميع الحملات المسجلة في الوحدة." />
        <MetricCard eyebrow="Active" title="الحملات النشطة" value={String(activeCampaigns)} detail="حملات بحالة active." trend="up" trendLabel="جاهزة للتشغيل" />
        <MetricCard eyebrow="Claims" title="المطالبات" value={String(totalSubmissions)} detail="عدد CampaignSubmission عبر كل الحملات." />
        <MetricCard eyebrow="Messages" title="الرسائل" value={String(totalMessages)} detail="إجمالي الرسائل الناتجة عن هذه الحملات." />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>سجل الحملات</CardTitle>
              <CardDescription>جدول أوضح للحملات بدل البطاقات الكبيرة، مع إبراز الحالة والقالب والمخرجات.</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              تصفية
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" size="sm">
              الكل
            </Button>
            <Button variant="outline" size="sm">
              active
            </Button>
            <Button variant="outline" size="sm">
              paused
            </Button>
            <Button variant="outline" size="sm">
              draft
            </Button>
          </div>

          <div className="overflow-hidden rounded-[5px] border border-[var(--wa-border)]">
            <div className="grid grid-cols-[1.5fr_1fr_110px_110px_110px_160px_120px] gap-3 border-b border-[var(--wa-border)] bg-[var(--wa-surface-muted)] px-4 py-3 text-xs font-medium text-[var(--wa-muted-foreground)]">
              <span>الحملة</span>
              <span>العميل</span>
              <span>المطالبات</span>
              <span>الرسائل</span>
              <span>الكوبونات</span>
              <span>القالب</span>
              <span className="text-left">الحالة</span>
            </div>
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="grid grid-cols-[1.5fr_1fr_110px_110px_110px_160px_120px] gap-3 border-b border-[var(--wa-border)] px-4 py-3 text-sm last:border-b-0"
              >
                <div>
                  <p className="font-medium text-[var(--wa-foreground-strong)]">{campaign.offerTitle}</p>
                  <p className="mt-1 text-xs text-[var(--wa-muted-foreground)]">{campaign.slug}</p>
                </div>
                <span>{campaign.tenant.name}</span>
                <span>{campaign._count.submissions}</span>
                <span>{campaign._count.messages}</span>
                <span>{campaign._count.vouchers}</span>
                <div className="flex flex-wrap gap-1">
                  {campaign.whatsappTemplate ? (
                    <Badge variant={campaign.whatsappTemplate.status === "approved" ? "success" : "warning"}>
                      {campaign.whatsappTemplate.name}
                    </Badge>
                  ) : (
                    <Badge variant="warning">بدون قالب</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 md:justify-end">
                  <Badge variant={campaign.status === "active" ? "success" : "neutral"}>{campaign.status}</Badge>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/whatsapp/campaigns/${campaign.id}`}>
                      <span>عرض</span>
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
            {!campaigns.length ? (
              <div className="px-4 py-5 text-sm text-[var(--wa-muted-foreground)]">لا توجد حملات مسجلة بعد.</div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
