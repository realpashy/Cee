import Link from "next/link";
import { ArrowLeft, Building2, MessageSquareText, Palette, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/whatsapp/metric-card";
import { SectionHeading } from "@/components/whatsapp/section-heading";
import { getWhatsappClientsData } from "@/server/whatsapp/module-data";

export default async function WhatsappClientsPage() {
  const { schemaReady, tenants } = await getWhatsappClientsData();

  const totalAccounts = tenants.reduce((sum, tenant) => sum + tenant.whatsappAccounts.length, 0);
  const totalAudience = tenants.reduce((sum, tenant) => sum + tenant._count.audienceContacts, 0);
  const brandedTenants = tenants.filter((tenant) => tenant.brand).length;

  return (
    <div className="space-y-5">
      <SectionHeading
        eyebrow="العملاء"
        title="ملفات العملاء وربط القنوات"
        description="قائمة العملاء الذين يستخدمون محرك واتساب، مع فصل كامل عن Agency CRM داخل /plus."
        actions={
          <>
            <Button variant="outline" size="sm">
              Active tenants
            </Button>
            <Button size="sm">إضافة عميل</Button>
          </>
        }
      />

      {!schemaReady ? (
        <Card className="border-amber-400/30 bg-amber-500/10">
          <CardContent className="p-5 text-sm leading-6 text-amber-900 dark:text-amber-200">
            لا يمكن تحميل ملفات العملاء قبل إنشاء جداول واتساب في قاعدة البيانات.
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard eyebrow="Tenants" title="إجمالي العملاء" value={String(tenants.length)} detail="عدد ملفات العملاء المعرفة في الوحدة." />
        <MetricCard eyebrow="Audience" title="إجمالي الجمهور" value={String(totalAudience)} detail="جهات الاتصال التابعة للعملاء فقط." />
        <MetricCard eyebrow="Accounts" title="حسابات واتساب" value={String(totalAccounts)} detail="الحسابات المربوطة داخل ملفات العملاء." />
        <MetricCard eyebrow="Branding" title="هوية بصرية" value={String(brandedTenants)} detail="عدد العملاء الذين يملكون ClientBrand مربوطًا." />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>جدول العملاء</CardTitle>
              <CardDescription>عرض مختصر منظم بدل البطاقات الثقيلة، مع إبراز القناة والهوية والحجم التشغيلي.</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              تصفية
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex min-w-[220px] items-center gap-2 rounded-[5px] border border-[var(--wa-border)] bg-[var(--wa-surface)] px-3 py-2 text-sm text-[var(--wa-muted-foreground)]">
              <Building2 className="h-4 w-4" />
              <span>ابحث عن عميل أو slug...</span>
            </div>
            <Button variant="outline" size="sm">
              اللغة
            </Button>
            <Button variant="outline" size="sm">
              الحسابات
            </Button>
          </div>

          <div className="overflow-hidden rounded-[5px] border border-[var(--wa-border)]">
            <div className="grid grid-cols-[1.2fr_140px_120px_120px_140px_120px] gap-3 border-b border-[var(--wa-border)] bg-[var(--wa-surface-muted)] px-4 py-3 text-xs font-medium text-[var(--wa-muted-foreground)]">
              <span>العميل</span>
              <span>اللغة</span>
              <span>الحملات</span>
              <span>الجمهور</span>
              <span>الحسابات</span>
              <span className="text-left">الإجراء</span>
            </div>
            {tenants.map((tenant) => (
              <div
                key={tenant.id}
                className="grid grid-cols-[1.2fr_140px_120px_120px_140px_120px] gap-3 border-b border-[var(--wa-border)] px-4 py-3 text-sm last:border-b-0"
              >
                <div>
                  <p className="font-medium text-[var(--wa-foreground-strong)]">{tenant.name}</p>
                  <p className="mt-1 text-xs text-[var(--wa-muted-foreground)]">/l/{tenant.slug}/...</p>
                </div>
                <div className="flex items-center">
                  <Badge variant="neutral">{tenant.defaultLanguage.toUpperCase()}</Badge>
                </div>
                <span>{tenant._count.campaigns}</span>
                <span>{tenant._count.audienceContacts}</span>
                <div className="flex flex-wrap gap-1">
                  {tenant.whatsappAccounts.length ? (
                    tenant.whatsappAccounts.map((account) => (
                      <Badge key={account.id} variant={account.status === "connected" ? "success" : "neutral"}>
                        {account.provider}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="warning">لا يوجد</Badge>
                  )}
                </div>
                <div className="flex justify-start md:justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/whatsapp/clients/${tenant.id}`}>
                      <span>فتح</span>
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
            {!tenants.length ? (
              <div className="px-4 py-5 text-sm text-[var(--wa-muted-foreground)]">لا توجد ملفات عملاء حتى الآن.</div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        {tenants.slice(0, 3).map((tenant) => (
          <Card key={`summary-${tenant.id}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-base">{tenant.name}</CardTitle>
                <Badge variant="neutral">{tenant.defaultLanguage.toUpperCase()}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-[var(--wa-muted-foreground)]">
                <Users className="h-4 w-4" />
                <span>{tenant._count.audienceContacts} جهة جمهور</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--wa-muted-foreground)]">
                <MessageSquareText className="h-4 w-4" />
                <span>{tenant.whatsappAccounts.length} حساب واتساب</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--wa-muted-foreground)]">
                <Palette className="h-4 w-4" />
                <span>{tenant.brand ? `هوية ${tenant.brand.offerStyle}` : "هوية غير مربوطة"}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
