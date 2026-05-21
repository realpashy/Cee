import { PlaceholderPage } from "@/components/whatsapp/placeholder-page";

export default function WhatsappCampaignVouchersPage() {
  return (
    <PlaceholderPage
      eyebrow="الكوبونات"
      title="توليد وتتبع واسترداد الكوبونات"
      description="ستدعم هذه الصفحة البحث اليدوي بالكود أو الهاتف وتسجيل الاسترداد يدويًا في مراحل البناء التالية."
      points={[
        "البحث السريع بالكود أو رقم الهاتف للوصول إلى القسيمة.",
        "إظهار حالة الصلاحية، تاريخ الانتهاء، وحالة الاسترداد.",
        "تسجيل الاسترداد اليدوي مع اسم المنفذ وملاحظات مختصرة.",
        "ربط الصورة المولدة وسجل الرسائل بنفس القسيمة."
      ]}
    />
  );
}
