import Link from "next/link";
import {
  ArrowLeft,
  CircleDollarSign,
  Gift,
  LayoutTemplate,
  MessageSquareText,
  UsersRound
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/whatsapp/metric-card";
import { SectionHeading } from "@/components/whatsapp/section-heading";
import { getWhatsappDashboardData } from "@/server/whatsapp/module-data";

const overviewTabs = ["Overview", "Analytics", "Reports", "Notifications"] as const;

export default async function WhatsappDashboardPage() {
  const data = await getWhatsappDashboardData();
  const approvedTemplates =
    data.templatesByStatus.find((item) => item.status === "approved")?._count._all ?? 0;

  const bars = [
    { label: "يناير", value: Math.max(data.tenantsCount, 2) },
    { label: "فبراير", value: Math.max(data.campaignsCount, 3) },
    { label: "مارس", value: Math.max(data.audienceCount, 5) },
    { label: "أبريل", value: Math.max(data.vouchersCount, 4) },
    { label: "مايو", value: Math.max(approvedTemplates, 2) },
    { label: "يونيو", value: Math.max(data.recentSubmissions.length, 3) }
  ];
  const maxBarValue = Math.max(...bars.map((bar) => bar.value), 1);

  return (
    <div className="space-y-5">
      <SectionHeading
        eyebrow="لوحة التحكم"
        title="نظرة تشغيلية على منظومة واتساب"
        description="مساحة منظمة لإدارة العملاء، الحملات، المطالبات، والقوالب الرسمية بعيدًا عن CRM الداخلي الخاص بـ Cee+."
        actions={
          <>
            <Button variant="outline" size="sm">
              آخر 30 يومًا
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

      <div className="flex flex-wrap gap-2">
        {overviewTabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={
              index === 0
                ? "rounded-[999px] border border-[var(--wa-accent-border)] bg-[var(--wa-surface)] px-3 py-1.5 text-xs font-medium text-[var(--wa-foreground-strong)] shadow-[0_0_0_1px_rgba(139,197,63,0.08)]"
                : "rounded-[999px] border border-transparent bg-[var(--wa-surface-muted)] px-3 py-1.5 text-xs font-medium text-[var(--wa-muted-foreground)]"
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {!data.schemaReady ? (
        <Card className="border-amber-400/30 bg-amber-500/10">
          <CardContent className="p-5 text-sm leading-6 text-amber-900 dark:text-amber-200">
            جداول واتساب غير موجودة بعد في قاعدة البيانات الحالية. الواجهة جاهزة بصريًا، لكن نحتاج تشغيل migration
            حتى تظهر البيانات الفعلية.
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          eyebrow="Clients"
          title="العملاء النشطون"
          value={String(data.tenantsCount)}
          detail="أنشطة تجارية مفعلة داخل مساحة واتساب."
          trend="up"
          trendLabel="نشاط مستقر"
        />
        <MetricCard
          eyebrow="Campaigns"
          title="الحملات"
          value={String(data.campaignsCount)}
          detail="الحملات الجاهزة أو المفعلة ضمن النظام."
          trend="neutral"
        />
        <MetricCard
          eyebrow="Audience"
          title="جهات الجمهور"
          value={String(data.audienceCount)}
          detail="هذه الجهات تخص عملاء الـ Tenants فقط."
          trend="up"
          trendLabel="معزولة عن /plus"
        />
        <MetricCard
          eyebrow="Vouchers"
          title="الكوبونات"
          value={String(data.vouchersCount)}
          detail="إجمالي القسائم الناتجة عن المطالبات."
          trend="neutral"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.45fr_0.95fr]">
        <Card className="bg-[linear-gradient(180deg,var(--wa-surface),var(--wa-surface-muted))]">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>نظرة عامة</CardTitle>
                <CardDescription>مؤشرات تشغيلية مبسطة على طريقة لوحات المتابعة الحديثة.</CardDescription>
              </div>
              <Badge variant="neutral">Overview</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="flex min-h-[240px] items-end gap-3 border-b border-[var(--wa-border)] pb-1">
                {bars.map((bar) => (
                  <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-[999px] bg-[linear-gradient(180deg,var(--wa-accent),color-mix(in srgb,var(--wa-accent),black 18%))]"
                      style={{ height: `${Math.max((bar.value / maxBarValue) * 180, 22)}px` }}
                    />
                    <span className="text-[11px] text-[var(--wa-muted-foreground)]">{bar.label}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  {
                    label: "العملاء",
                    value: data.tenantsCount,
                    icon: UsersRound
                  },
                  {
                    label: "القوالب approved",
                    value: approvedTemplates,
                    icon: LayoutTemplate
                  },
                  {
                    label: "الرسائل الجاهزة",
                    value: data.recentSubmissions.length,
                    icon: MessageSquareText
                  },
                  {
                    label: "قيمة التشغيل",
                    value: data.vouchersCount,
                    icon: CircleDollarSign
                  }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-[14px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[var(--wa-border)] bg-[var(--wa-surface)]">
                        <item.icon className="h-4 w-4 text-[var(--wa-foreground-strong)]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--wa-foreground-strong)]">{item.label}</p>
                        <p className="text-xs text-[var(--wa-muted-foreground)]">حالة تشغيلية مباشرة</p>
                      </div>
                    </div>
                    <span className="text-lg font-semibold text-[var(--wa-foreground-strong)]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[linear-gradient(180deg,var(--wa-surface),var(--wa-surface-muted))]">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>آخر المطالبات</CardTitle>
                <CardDescription>طلبات الجمهور الواردة من صفحات الهبوط والحملات.</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/whatsapp/compliance">الامتثال</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.recentSubmissions.length ? (
              data.recentSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="grid grid-cols-[1fr_auto] items-start gap-3 rounded-[14px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--wa-foreground-strong)]">
                      {submission.audienceContact.fullName}
                    </p>
                    <p className="mt-1 text-xs text-[var(--wa-muted-foreground)]">
                      {submission.tenant.name} • {submission.campaign.offerTitle}
                    </p>
                    <p className="mt-1 text-xs text-[var(--wa-muted-foreground)]">
                      {submission.audienceContact.phoneE164}
                    </p>
                  </div>
                  <Badge variant="neutral">{submission.status}</Badge>
                </div>
              ))
            ) : (
              <div className="rounded-[14px] border border-dashed border-[var(--wa-border)] px-4 py-5 text-sm text-[var(--wa-muted-foreground)]">
                لا توجد مطالبات حتى الآن.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[linear-gradient(180deg,var(--wa-surface),var(--wa-surface-muted))]">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>الحملات الأخيرة</CardTitle>
              <CardDescription>جدول مختصر للحملات الأكثر حداثة داخل النظام.</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/whatsapp/campaigns">
                <span>عرض الكل</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-[18px] border border-[var(--wa-border)]">
            <div className="grid grid-cols-[1.4fr_1fr_110px_110px_110px] gap-3 border-b border-[var(--wa-border)] bg-[var(--wa-surface-muted)] px-4 py-3 text-xs font-medium text-[var(--wa-muted-foreground)]">
              <span>الحملة</span>
              <span>العميل</span>
              <span>النوع</span>
              <span>الانتهاء</span>
              <span className="text-left">الحالة</span>
            </div>
            {data.recentCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="grid grid-cols-[1.4fr_1fr_110px_110px_110px] gap-3 border-b border-[var(--wa-border)] px-4 py-3 text-sm last:border-b-0"
              >
                <div>
                  <p className="font-medium text-[var(--wa-foreground-strong)]">{campaign.offerTitle}</p>
                  <p className="mt-1 text-xs text-[var(--wa-muted-foreground)]">{campaign.slug}</p>
                </div>
                <span className="text-[var(--wa-foreground)]">{campaign.tenant.name}</span>
                <span className="text-[var(--wa-muted-foreground)]">{campaign.discountType}</span>
                <span className="text-[var(--wa-muted-foreground)]">{campaign.expiryRule}</span>
                <div className="flex justify-start md:justify-end">
                  <Badge variant={campaign.status === "active" ? "success" : "neutral"}>{campaign.status}</Badge>
                </div>
              </div>
            ))}
            {!data.recentCampaigns.length ? (
              <div className="px-4 py-5 text-sm text-[var(--wa-muted-foreground)]">لا توجد حملات بعد.</div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-[linear-gradient(180deg,var(--wa-surface),var(--wa-surface-muted))]">
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)]">
              <LayoutTemplate className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-[var(--wa-muted-foreground)]">القوالب المعتمدة</p>
              <p className="text-xl font-semibold text-[var(--wa-foreground-strong)]">{approvedTemplates}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[linear-gradient(180deg,var(--wa-surface),var(--wa-surface-muted))]">
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)]">
              <Gift className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-[var(--wa-muted-foreground)]">الكوبونات المولدة</p>
              <p className="text-xl font-semibold text-[var(--wa-foreground-strong)]">{data.vouchersCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[linear-gradient(180deg,var(--wa-surface),var(--wa-surface-muted))]">
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)]">
              <MessageSquareText className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-[var(--wa-muted-foreground)]">المتابعات الحديثة</p>
              <p className="text-xl font-semibold text-[var(--wa-foreground-strong)]">{data.recentSubmissions.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
