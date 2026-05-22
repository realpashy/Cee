import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/whatsapp/metric-card";
import { SectionHeading } from "@/components/whatsapp/section-heading";
import { getWhatsappComplianceData } from "@/server/whatsapp/module-data";

export default async function WhatsappCompliancePage() {
  const { schemaReady, consentRecords } = await getWhatsappComplianceData();

  const unsubscribed = consentRecords.filter((record) => record.audienceContact.unsubscribed).length;
  const directSource = consentRecords.filter((record) => !record.utmSource).length;

  return (
    <div className="space-y-5">
      <SectionHeading
        eyebrow="الامتثال"
        title="إثبات الموافقة وسجل التواصل"
        description="واجهة امتثال مبدئية لعرض نص الموافقة، وقت القبول، مصدر الطلب، وحالة الاشتراك لكل جهة جمهور."
        actions={
          <>
            <Button variant="outline" size="sm">
              Export CSV
            </Button>
            <Button variant="outline" size="sm">
              Filters
            </Button>
          </>
        }
      />

      {!schemaReady ? (
        <Card className="border-amber-400/30 bg-amber-500/10">
          <CardContent className="p-5 text-sm leading-6 text-amber-900 dark:text-amber-200">
            جداول الامتثال غير موجودة بعد في قاعدة البيانات الحالية.
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard eyebrow="Records" title="سجلات الموافقة" value={String(consentRecords.length)} detail="آخر السجلات المتاحة للمراجعة." />
        <MetricCard eyebrow="Subscribed" title="مشتركون" value={String(consentRecords.length - unsubscribed)} detail="جهات ما زالت قابلة للتواصل." trend="up" trendLabel="صالحة حاليًا" />
        <MetricCard eyebrow="Unsubscribed" title="إلغاء الاشتراك" value={String(unsubscribed)} detail="سجلات تحتاج احترام الإيقاف." trend="down" trendLabel="تتطلب عزلًا" />
        <MetricCard eyebrow="Source" title="زيارات مباشرة" value={String(directSource)} detail="مطالبات بدون UTM source واضح." />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>جدول الموافقات</CardTitle>
              <CardDescription>سجل قانوني وتشغيلي منظم بدل الكتل النصية الطويلة.</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Latest first
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-[5px] border border-[var(--wa-border)]">
            <div className="grid grid-cols-[1fr_1fr_120px_140px_160px_130px] gap-3 border-b border-[var(--wa-border)] bg-[var(--wa-surface-muted)] px-4 py-3 text-xs font-medium text-[var(--wa-muted-foreground)]">
              <span>جهة الجمهور</span>
              <span>الحملة / العميل</span>
              <span>المصدر</span>
              <span>وقت القبول</span>
              <span>نسخة الموافقة</span>
              <span className="text-left">الحالة</span>
            </div>
            {consentRecords.length ? (
              consentRecords.map((record) => (
                <div
                  key={record.id}
                  className="grid grid-cols-[1fr_1fr_120px_140px_160px_130px] gap-3 border-b border-[var(--wa-border)] px-4 py-3 text-sm last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-[var(--wa-foreground-strong)]">{record.audienceContact.fullName}</p>
                    <p className="mt-1 text-xs text-[var(--wa-muted-foreground)]">{record.audienceContact.phoneE164}</p>
                  </div>
                  <div>
                    <p>{record.campaign.offerTitle}</p>
                    <p className="mt-1 text-xs text-[var(--wa-muted-foreground)]">{record.tenant.name}</p>
                  </div>
                  <span>{record.utmSource ?? "direct"}</span>
                  <span>{record.acceptedAt.toLocaleDateString("en-GB")}</span>
                  <div className="space-y-2">
                    <Badge variant="neutral">{record.consentTextVersion}</Badge>
                    <p className="line-clamp-2 text-xs leading-5 text-[var(--wa-muted-foreground)]">{record.consentText}</p>
                  </div>
                  <div className="flex justify-start md:justify-end">
                    <Badge variant={record.audienceContact.unsubscribed ? "warning" : "success"}>
                      {record.audienceContact.unsubscribed ? "unsubscribed" : "subscribed"}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-5 text-sm text-[var(--wa-muted-foreground)]">لا توجد سجلات موافقة بعد.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
