import { CheckCircle2, LockKeyhole, MoonStar, ShieldCheck, SunMedium } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/whatsapp/section-heading";

export default function WhatsappSettingsPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="الإعدادات"
        title="الثيم، الحماية، وإعدادات التشغيل"
        description="الوضع الفاتح والداكن أصبحا خاصين بـ /whatsapp فقط، حتى يبقى باقي موقع Cee+ محافظًا على هويته الحالية."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <Badge variant="success">Theme mode</Badge>
            <CardTitle className="mt-3 text-2xl">نظام ألوان مخصص للموديل</CardTitle>
            <CardDescription>Light mode أنظف للعمليات اليومية، وdark mode أكثر درامية ومناسب للعروض.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[22px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-5">
              <SunMedium className="h-6 w-6 text-[var(--wa-accent)]" />
              <p className="mt-4 text-lg font-black">Light Workspace</p>
              <p className="mt-2 text-sm leading-7 text-[var(--wa-muted-foreground)]">
                خلفية عاجية، بطاقات بيضاء ناعمة، وتباين أقوى لقراءة الجداول والحالات بسرعة.
              </p>
            </div>
            <div className="rounded-[22px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-5">
              <MoonStar className="h-6 w-6 text-[var(--wa-accent)]" />
              <p className="mt-4 text-lg font-black">Dark Command View</p>
              <p className="mt-2 text-sm leading-7 text-[var(--wa-muted-foreground)]">
                يحافظ على إحساس Cee+ المتقدم ويعطي مساحة بصرية أقوى للـ metrics والـ highlights.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Badge variant="warning">Phase 1 guards</Badge>
            <CardTitle className="mt-3 text-2xl">ضوابط الحماية الحالية</CardTitle>
            <CardDescription>هذه الأساسات تم ربطها بالموديل الجديد قبل الانتقال إلى الإرسال الحقيقي.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: ShieldCheck, text: "حدود معدل حسب IP ورقم الهاتف في التقاط المطالبات العامة." },
              { icon: LockKeyhole, text: "حماية endpoint الخاص بمعالجة الوظائف بواسطة `WHATSAPP_CRON_SECRET`." },
              { icon: CheckCircle2, text: "منع استخدام أي template حقيقي إلا إذا كانت حالته approved." }
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-start gap-3 rounded-[18px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-4"
              >
                <item.icon className="mt-1 h-5 w-5 shrink-0 text-[var(--wa-accent)]" />
                <p className="text-sm leading-7 text-[var(--wa-muted-foreground)]">{item.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
