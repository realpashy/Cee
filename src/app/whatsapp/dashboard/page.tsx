import Link from "next/link";
import { ArrowLeft, BadgeCheck, Gift, LayoutTemplate, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/whatsapp/metric-card";
import { SectionHeading } from "@/components/whatsapp/section-heading";
import { getWhatsappDashboardData } from "@/server/whatsapp/module-data";

export default async function WhatsappDashboardPage() {
  const data = await getWhatsappDashboardData();
  const approvedTemplates =
    data.templatesByStatus.find((item) => item.status === "approved")?._count._all ?? 0;

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="لوحة التحكم"
        title="مركز تشغيل حملات واتساب والكوبونات"
        description="من هنا نتابع العملاء، الجمهور، القوالب، وحالة المطالبات في مساحة منفصلة تمامًا عن CRM الداخلي الخاص بـ Cee+."
      />

      {!data.schemaReady ? (
        <Card className="border-amber-400/30 bg-amber-500/10">
          <CardContent className="p-5 text-sm leading-7 text-amber-100">
            جداول واتساب غير موجودة بعد في قاعدة البيانات الحالية. الواجهة جاهزة، لكن نحتاج تشغيل migration حتى تبدأ
            البيانات بالظهور بشكل فعلي.
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          eyebrow="Tenants"
          title="العملاء النشطون"
          value={String(data.tenantsCount)}
          detail="أنشطة تجارية لديها حساب واتساب أو حملة جاهزة داخل النظام."
          trend="up"
          trendLabel="بنية متعددة العملاء"
        />
        <MetricCard
          eyebrow="Campaigns"
          title="الحملات المسجلة"
          value={String(data.campaignsCount)}
          detail="عدد الحملات التي تم إعدادها داخل مساحة /whatsapp."
          trend="neutral"
        />
        <MetricCard
          eyebrow="Audience"
          title="جهات الجمهور"
          value={String(data.audienceCount)}
          detail="هذه البيانات تخص عملاء الـ Tenants فقط، وليست leads الخاصة بـ /plus."
          trend="up"
          trendLabel="عزل كامل عن Agency CRM"
        />
        <MetricCard
          eyebrow="Vouchers"
          title="الكوبونات المولدة"
          value={String(data.vouchersCount)}
          detail="إجمالي القسائم التي تم إنشاؤها لتجارب الهبوط والعروض."
          trend="neutral"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <Badge variant="success">Pipeline</Badge>
                <CardTitle className="mt-3 text-2xl">نظرة تشغيلية سريعة</CardTitle>
                <CardDescription>
                  الواجهة الجديدة صارت أقرب إلى منتج SaaS حقيقي: حملات، قوالب، وتتبع جمهور في مكان واحد.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="rounded-full">
                <Link href="/whatsapp/campaigns/new">
                  <span>حملة جديدة</span>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[20px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-5">
              <UsersRound className="h-6 w-6 text-[var(--wa-accent)]" />
              <p className="mt-4 text-lg font-black">مسار العملاء</p>
              <p className="mt-2 text-sm leading-7 text-[var(--wa-muted-foreground)]">
                إدارة Tenant وربط حساب واتساب والقالب المناسب لكل نشاط.
              </p>
            </div>
            <div className="rounded-[20px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-5">
              <LayoutTemplate className="h-6 w-6 text-[var(--wa-accent)]" />
              <p className="mt-4 text-lg font-black">اعتماد القوالب</p>
              <p className="mt-2 text-sm leading-7 text-[var(--wa-muted-foreground)]">
                {approvedTemplates} قوالب بحالة `approved` جاهزة للإرسال الفعلي عند ربط المزود.
              </p>
            </div>
            <div className="rounded-[20px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-5">
              <Gift className="h-6 w-6 text-[var(--wa-accent)]" />
              <p className="mt-4 text-lg font-black">الكوبونات</p>
              <p className="mt-2 text-sm leading-7 text-[var(--wa-muted-foreground)]">
                متابعة التوليد، الإرسال، والاسترداد اليدوي في المراحل القادمة.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Badge variant="info">Recent activity</Badge>
            <CardTitle className="mt-3 text-2xl">آخر طلبات الجمهور</CardTitle>
            <CardDescription>هذه السجلات تأتي من AudienceContact و CampaignSubmission وليس من `Lead`.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.recentSubmissions.length ? (
              data.recentSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="rounded-[18px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black">{submission.audienceContact.fullName}</p>
                      <p className="mt-1 text-sm text-[var(--wa-muted-foreground)]">
                        {submission.tenant.name} • {submission.campaign.offerTitle}
                      </p>
                    </div>
                    <Badge variant="neutral">{submission.status}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-[var(--wa-muted-foreground)]">
                    {submission.audienceContact.phoneE164}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-[18px] border border-dashed border-[var(--wa-border)] p-5 text-sm text-[var(--wa-muted-foreground)]">
                لا توجد طلبات جمهور حتى الآن. أول مطالبة من صفحة الهبوط ستظهر هنا.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <Badge variant="warning">Fresh setup</Badge>
              <CardTitle className="mt-3 text-2xl">آخر الحملات التي تم إعدادها</CardTitle>
              <CardDescription>نقطة انطلاق جيدة لاختبار الواجهة بالبيانات الفعلية من Prisma.</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link href="/whatsapp/campaigns">
                <span>عرض كل الحملات</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          {data.recentCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="rounded-[22px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-black">{campaign.name}</p>
                  <p className="mt-1 text-sm text-[var(--wa-muted-foreground)]">{campaign.tenant.name}</p>
                </div>
                <Badge variant={campaign.status === "active" ? "success" : "neutral"}>{campaign.status}</Badge>
              </div>
              <p className="mt-4 text-lg font-black leading-8">{campaign.offerTitle}</p>
              <p className="mt-2 text-sm leading-7 text-[var(--wa-muted-foreground)]">
                {campaign.offerDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="neutral">{campaign.discountType}</Badge>
                <Badge variant="info">{campaign.expiryRule}</Badge>
                <Badge variant="success">
                  <BadgeCheck className="h-3 w-3" />
                  <span>{campaign.slug}</span>
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
