export default function PublicCampaignSuccessPage() {
  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#070807] px-4 text-white">
      <section className="max-w-lg rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--brand-lime)]">
          تم استلام طلبك
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight">خلال لحظات سيصلك الكوبون على الواتساب.</h1>
        <p className="mt-4 text-base leading-8 text-[var(--brand-silver)]">
          إذا لم تصلك الرسالة خلال دقيقة، تأكد من أن الرقم صحيح أو حاول مرة أخرى لاحقًا.
        </p>
      </section>
    </main>
  );
}
