type PhaseOnePageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PhaseOnePage({ eyebrow, title, description }: PhaseOnePageProps) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--brand-lime)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight md:text-5xl">{title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--brand-silver)]">{description}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["عزل العملاء", "موافقة موثقة", "إرسال آمن"].map((item) => (
          <div key={item} className="rounded-[16px] border border-white/10 bg-black/30 p-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--brand-lime)] text-sm font-black text-black">
              +
            </span>
            <p className="mt-4 text-lg font-black">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
