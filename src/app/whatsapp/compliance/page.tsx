import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/whatsapp/section-heading";
import { getWhatsappComplianceData } from "@/server/whatsapp/module-data";

export default async function WhatsappCompliancePage() {
  const { schemaReady, consentRecords } = await getWhatsappComplianceData();

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="الامتثال"
        title="إثبات الموافقة وسجل التواصل"
        description="واجهة امتثال مبدئية لعرض نص الموافقة، وقت القبول، الجهة المالكة، وحالة إلغاء الاشتراك لكل AudienceContact."
      />

      {!schemaReady ? (
        <Card className="border-amber-400/30 bg-amber-500/10">
          <CardContent className="p-5 text-sm leading-7 text-amber-100">
            جداول الامتثال غير موجودة بعد في قاعدة البيانات الحالية، لذلك ستظهر هذه المساحة فارغة إلى أن يتم تطبيق
            migration.
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">آخر سجلات الموافقة</CardTitle>
          <CardDescription>هذه هي الطبقة التي نحتاجها لاحقًا لأي شكوى أو مراجعة قانونية أو تصدير إثبات.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {consentRecords.length ? (
            consentRecords.map((record) => (
              <div
                key={record.id}
                className="rounded-[20px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="success">{record.language.toUpperCase()}</Badge>
                  <Badge variant="neutral">{record.tenant.name}</Badge>
                  <Badge variant={record.audienceContact.unsubscribed ? "warning" : "info"}>
                    {record.audienceContact.unsubscribed ? "unsubscribed" : "subscribed"}
                  </Badge>
                </div>
                <p className="mt-4 text-lg font-black">{record.audienceContact.fullName}</p>
                <p className="mt-1 text-sm text-[var(--wa-muted-foreground)]">
                  {record.audienceContact.phoneE164} • {record.campaign.offerTitle}
                </p>
                <p className="mt-4 rounded-[16px] border border-[var(--wa-border)] bg-[var(--wa-surface)] p-4 text-sm leading-7 text-[var(--wa-muted-foreground)]">
                  {record.consentText}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-[var(--wa-muted-foreground)]">
                  <span>version: {record.consentTextVersion}</span>
                  <span>utm: {record.utmSource ?? "direct"}</span>
                  <span>accepted: {record.acceptedAt.toLocaleString("en-GB")}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-[20px] border border-dashed border-[var(--wa-border)] p-5 text-sm text-[var(--wa-muted-foreground)]">
              لا توجد سجلات موافقة بعد. أول Claim ناجح من صفحة الهبوط سيظهر هنا مع النص الكامل.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
