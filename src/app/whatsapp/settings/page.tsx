import { CheckCircle2, LockKeyhole, MoonStar, ShieldCheck, SunMedium } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/whatsapp/section-heading";

export default function WhatsappSettingsPage() {
  return (
    <div className="space-y-5">
      <SectionHeading
        eyebrow="الإعدادات"
        title="الثيم، الحماية، وإعدادات التشغيل"
        description="إعدادات منظمة بأسلوب منتج إداري: أوضح، أقل ضوضاء بصرية، وأسهل للمراجعة اليومية."
        actions={
          <>
            <Button variant="outline" size="sm">
              Theme
            </Button>
            <Button size="sm">حفظ التغييرات</Button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <Badge variant="neutral">Theme mode</Badge>
                <CardTitle className="mt-3">أوضاع العرض</CardTitle>
                <CardDescription>الوضع الفاتح هو الافتراضي الآن، مع وضع داكن هادئ ومهني داخل /whatsapp فقط.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[5px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-[5px] border border-[var(--wa-border)] bg-[var(--wa-surface)]">
                <SunMedium className="h-4 w-4" />
              </div>
              <p className="mt-4 text-base font-medium text-[var(--wa-foreground-strong)]">Light workspace</p>
              <p className="mt-2 text-sm leading-6 text-[var(--wa-muted-foreground)]">
                خلفية حيادية، بطاقات بيضاء، وتباين نظيف أقرب إلى لوحات SaaS المرجعية.
              </p>
            </div>
            <div className="rounded-[5px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-[5px] border border-[var(--wa-border)] bg-[var(--wa-surface)]">
                <MoonStar className="h-4 w-4" />
              </div>
              <p className="mt-4 text-base font-medium text-[var(--wa-foreground-strong)]">Dark workspace</p>
              <p className="mt-2 text-sm leading-6 text-[var(--wa-muted-foreground)]">
                نفس النظام البصري، لكن بدرجات داكنة هادئة دون توهج أو تأثيرات تسويقية.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Badge variant="warning">Phase 1 guards</Badge>
            <CardTitle className="mt-3">ضوابط الحماية</CardTitle>
            <CardDescription>الأساسات الأمنية والمنطقية التي تم ربطها قبل تفعيل الإرسال الحقيقي.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: ShieldCheck, text: "حدود معدل حسب IP ورقم الهاتف على صفحات التقاط المطالبات." },
              { icon: LockKeyhole, text: "حماية endpoint معالجة الوظائف عبر WHATSAPP_CRON_SECRET." },
              { icon: CheckCircle2, text: "منع استخدام أي قالب فعلي إلا إذا كانت حالته approved." }
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-start gap-3 rounded-[5px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-4"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] border border-[var(--wa-border)] bg-[var(--wa-surface)]">
                  <item.icon className="h-4 w-4" />
                </div>
                <p className="text-sm leading-6 text-[var(--wa-muted-foreground)]">{item.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
