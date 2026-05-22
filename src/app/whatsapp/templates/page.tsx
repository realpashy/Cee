import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/whatsapp/metric-card";
import { SectionHeading } from "@/components/whatsapp/section-heading";
import { getWhatsappTemplatesData } from "@/server/whatsapp/module-data";

export default async function WhatsappTemplatesPage() {
  const { schemaReady, templates } = await getWhatsappTemplatesData();

  const approved = templates.filter((template) => template.status === "approved").length;
  const draft = templates.filter((template) => template.status === "draft").length;
  const missingProviderId = templates.filter((template) => !template.providerTemplateId).length;

  return (
    <div className="space-y-5">
      <SectionHeading
        eyebrow="القوالب"
        title="مكتبة القوالب الرسمية"
        description="جميع القوالب مرتبطة بالعميل والحساب المناسب، مع إبراز واضح للحالات الصالحة للإرسال الفعلي."
        actions={
          <>
            <Button variant="outline" size="sm">
              العربية
            </Button>
            <Button size="sm">قالب جديد</Button>
          </>
        }
      />

      {!schemaReady ? (
        <Card className="border-amber-400/30 bg-amber-500/10">
          <CardContent className="p-5 text-sm leading-6 text-amber-900 dark:text-amber-200">
            لا يمكن قراءة القوالب حاليًا لأن قاعدة البيانات لم تستلم جداول واتساب بعد.
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard eyebrow="Templates" title="إجمالي القوالب" value={String(templates.length)} detail="كل القوالب المسجلة داخل الوحدة." />
        <MetricCard eyebrow="Approved" title="قوالب approved" value={String(approved)} detail="القوالب الوحيدة الصالحة للإرسال الفعلي." trend="up" trendLabel="جاهزة للاستخدام" />
        <MetricCard eyebrow="Draft" title="مسودات" value={String(draft)} detail="قوالب ما زالت في مرحلة الإعداد أو المراجعة." />
        <MetricCard eyebrow="Provider" title="بدون Provider ID" value={String(missingProviderId)} detail="قوالب تحتاج ربطًا أو مزامنة قبل التشغيل." trend="down" trendLabel="تحتاج متابعة" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>الجدول الرئيسي</CardTitle>
              <CardDescription>عرض قريب من واجهات التذاكر والعمليات: بيانات سريعة، حالات واضحة، ونص مختصر قابل للمراجعة.</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              تصفية
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-[5px] border border-[var(--wa-border)]">
            <div className="grid grid-cols-[1.2fr_120px_120px_1fr_150px_130px] gap-3 border-b border-[var(--wa-border)] bg-[var(--wa-surface-muted)] px-4 py-3 text-xs font-medium text-[var(--wa-muted-foreground)]">
              <span>القالب</span>
              <span>الفئة</span>
              <span>اللغة</span>
              <span>العميل / الحساب</span>
              <span>المعرّف</span>
              <span className="text-left">الحالة</span>
            </div>
            {templates.map((template) => (
              <div
                key={template.id}
                className="grid grid-cols-[1.2fr_120px_120px_1fr_150px_130px] gap-3 border-b border-[var(--wa-border)] px-4 py-3 text-sm last:border-b-0"
              >
                <div>
                  <p className="font-medium text-[var(--wa-foreground-strong)]">{template.name}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--wa-muted-foreground)]">{template.bodyText}</p>
                </div>
                <span>{template.category}</span>
                <span>{template.language.toUpperCase()}</span>
                <span>
                  {template.tenant.name} • {template.whatsappAccount.displayName}
                </span>
                <span className="text-xs text-[var(--wa-muted-foreground)]">
                  {template.providerTemplateId ?? "غير مربوط"}
                </span>
                <div className="flex justify-start md:justify-end">
                  <Badge
                    variant={
                      template.status === "approved"
                        ? "success"
                        : template.status === "draft"
                          ? "neutral"
                          : "warning"
                    }
                  >
                    {template.status}
                  </Badge>
                </div>
              </div>
            ))}
            {!templates.length ? (
              <div className="px-4 py-5 text-sm text-[var(--wa-muted-foreground)]">لا توجد قوالب حتى الآن.</div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
