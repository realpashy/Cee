import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/whatsapp/section-heading";
import { getWhatsappTemplatesData } from "@/server/whatsapp/module-data";

export default async function WhatsappTemplatesPage() {
  const { schemaReady, templates } = await getWhatsappTemplatesData();

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="القوالب"
        title="مكتبة القوالب الرسمية لكل عميل"
        description="لا يمكن لأي حملة إرسال رسائل فعلية إلا عبر قالب approved. هذه الشاشة تجعل تلك الحقيقة واضحة ومقروءة."
      />

      {!schemaReady ? (
        <Card className="border-amber-400/30 bg-amber-500/10">
          <CardContent className="p-5 text-sm leading-7 text-amber-100">
            لا يمكن قراءة القوالب حاليًا لأن قاعدة البيانات لم تستلم جداول واتساب بعد.
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">حالة القوالب الحالية</CardTitle>
          <CardDescription>مرتبطة بالـ Tenant وبحساب واتساب المحدد، مع حالة حقيقية منطقية للإرسال.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="grid gap-4 rounded-[20px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-5 lg:grid-cols-[1fr_auto]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-lg font-black">{template.name}</p>
                  <Badge variant={template.status === "approved" ? "success" : template.status === "draft" ? "neutral" : "warning"}>
                    {template.status}
                  </Badge>
                  <Badge variant="info">{template.language.toUpperCase()}</Badge>
                </div>
                <p className="mt-2 text-sm text-[var(--wa-muted-foreground)]">
                  {template.tenant.name} • {template.whatsappAccount.displayName} • {template.category}
                </p>
                <p className="mt-4 rounded-[16px] border border-[var(--wa-border)] bg-[var(--wa-surface)] p-4 text-sm leading-7 text-[var(--wa-muted-foreground)]">
                  {template.bodyText}
                </p>
              </div>
              <div className="flex flex-col gap-2 lg:items-end">
                <Badge variant="neutral">Vars: {Array.isArray(template.variables) ? template.variables.length : 0}</Badge>
                {template.providerTemplateId ? (
                  <Badge variant="neutral">{template.providerTemplateId}</Badge>
                ) : (
                  <Badge variant="warning">Provider ID missing</Badge>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
