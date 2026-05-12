"use client";

export function MobileStickyCta({ label }: { label: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/80 p-4 backdrop-blur-xl md:hidden">
      <button
        type="button"
        onClick={() => {
          document.getElementById("intake")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }}
        className="w-full whitespace-nowrap rounded-[10px] bg-[var(--brand-lime)] px-4 py-3 text-center text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--brand-black)]"
      >
        {label}
      </button>
    </div>
  );
}
