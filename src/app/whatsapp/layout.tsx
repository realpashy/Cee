import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "@/auth";

const navItems = [
  { href: "/whatsapp/dashboard", label: "لوحة التحكم" },
  { href: "/whatsapp/clients", label: "العملاء" },
  { href: "/whatsapp/campaigns", label: "الحملات" },
  { href: "/whatsapp/segments", label: "الشرائح" },
  { href: "/whatsapp/templates", label: "القوالب" },
  { href: "/whatsapp/compliance", label: "الامتثال" },
  { href: "/whatsapp/settings", label: "الإعدادات" }
] as const;

export default async function WhatsappLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/plus/login");
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[var(--brand-black)] text-[var(--brand-off-white)]">
      <div className="border-b border-white/10 bg-black/40 px-4 py-4 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--brand-lime)]">
              Cee+ WhatsApp
            </p>
            <h1 className="mt-1 text-2xl font-black">محرك الكوبونات والحملات</h1>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm font-bold text-[var(--brand-silver)]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[10px] border border-white/10 px-3 py-2 transition hover:border-[var(--brand-lime)] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">{children}</div>
    </main>
  );
}
