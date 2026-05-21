import Link from "next/link";
import { ArrowLeft, Building2, MessageSquareText, Palette, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/whatsapp/section-heading";
import { getWhatsappClientsData } from "@/server/whatsapp/module-data";

export default async function WhatsappClientsPage() {
  const { schemaReady, tenants } = await getWhatsappClientsData();

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="العملاء"
        title="ملفات العملاء وربط القنوات"
        description="كل Tenant هنا يمثل نشاطًا تجاريًا يستخدم محرك واتساب، منفصلًا بالكامل عن Cee+ Agency CRM داخل /plus."
      />

      {!schemaReady ? (
        <Card className="border-amber-400/30 bg-amber-500/10">
          <CardContent className="p-5 text-sm leading-7 text-amber-100">
            لا يمكن تحميل ملفات العملاء قبل إنشاء جداول واتساب في قاعدة البيانات. بعد تنفيذ migration ستظهر
            البيانات هنا تلقائيًا.
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-2">
        {tenants.map((tenant) => (
          <Card key={tenant.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge variant="success">{tenant.defaultLanguage.toUpperCase()}</Badge>
                  <CardTitle className="mt-3 text-2xl">{tenant.name}</CardTitle>
                  <CardDescription className="mt-2">
                    slug: /l/{tenant.slug}/...
                  </CardDescription>
                </div>
                <Button asChild variant="secondary" size="sm" className="rounded-full">
                  <Link href={`/whatsapp/clients/${tenant.id}`}>
                    <span>فتح الملف</span>
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[18px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-4">
                  <Building2 className="h-5 w-5 text-[var(--wa-accent)]" />
                  <p className="mt-3 text-2xl font-black">{tenant._count.campaigns}</p>
                  <p className="mt-1 text-sm text-[var(--wa-muted-foreground)]">حملات</p>
                </div>
                <div className="rounded-[18px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-4">
                  <Users className="h-5 w-5 text-[var(--wa-accent)]" />
                  <p className="mt-3 text-2xl font-black">{tenant._count.audienceContacts}</p>
                  <p className="mt-1 text-sm text-[var(--wa-muted-foreground)]">جمهور</p>
                </div>
                <div className="rounded-[18px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-4">
                  <MessageSquareText className="h-5 w-5 text-[var(--wa-accent)]" />
                  <p className="mt-3 text-2xl font-black">{tenant.whatsappAccounts.length}</p>
                  <p className="mt-1 text-sm text-[var(--wa-muted-foreground)]">حسابات واتساب</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {tenant.whatsappAccounts.length ? (
                  tenant.whatsappAccounts.map((account) => (
                    <Badge key={account.id} variant={account.status === "connected" ? "success" : "neutral"}>
                      <span>{account.displayName}</span>
                      <span>{account.provider}</span>
                    </Badge>
                  ))
                ) : (
                  <Badge variant="warning">لا يوجد حساب واتساب مربوط بعد</Badge>
                )}
              </div>

              <div className="rounded-[20px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--wa-muted-foreground)]">
                  <Palette className="h-4 w-4 text-[var(--wa-accent)]" />
                  <span>الهوية البصرية</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--wa-muted-foreground)]">
                  {tenant.brand
                    ? `اللون الرئيسي ${tenant.brand.primaryColor} ونمط العرض ${tenant.brand.offerStyle}.`
                    : "لم يتم ربط ClientBrand بعد، ويمكننا إضافته في الخطوة التالية."}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
