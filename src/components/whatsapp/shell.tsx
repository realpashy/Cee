"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { MoonStar, SunMedium, BellRing, Search, Sparkles, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { WhatsappThemeProvider, useWhatsappTheme } from "@/components/whatsapp/theme-provider";

type NavItem = {
  href: "/whatsapp" | `/whatsapp/${string}`;
  label: string;
};

function ThemeToggle() {
  const { mode, toggleMode } = useWhatsappTheme();

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={toggleMode}
      className="rounded-full px-3.5"
      aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {mode === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
      <span>{mode === "dark" ? "Light" : "Dark"}</span>
    </Button>
  );
}

function ShellFrame({ navItems, children }: { navItems: readonly NavItem[]; children: ReactNode }) {
  const pathname = usePathname();

  return (
    <main dir="rtl" className="min-h-screen bg-[var(--wa-bg)] text-[var(--wa-foreground)] transition-colors">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="whatsapp-orb whatsapp-orb-a" />
        <div className="whatsapp-orb whatsapp-orb-b" />
        <div className="whatsapp-grid" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1680px] gap-6 px-3 py-3 sm:px-4 lg:px-6">
        <aside className="hidden w-[280px] shrink-0 lg:block">
          <div className="sticky top-4 overflow-hidden rounded-[32px] border border-[var(--wa-border)] bg-[var(--wa-sidebar-bg)] p-5 shadow-[var(--wa-shadow-soft)] backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[var(--wa-accent)]">
                  Cee+ WhatsApp
                </p>
                <h1 className="mt-3 text-2xl font-black tracking-[-0.04em]">مركز الحملات الذكي</h1>
              </div>
              <div className="rounded-2xl border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] p-3 text-[var(--wa-accent)]">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5 rounded-[24px] border border-[var(--wa-border)] bg-[var(--wa-surface)] p-4">
              <div className="flex items-center justify-between">
                <Badge variant="success">Live</Badge>
                <ThemeToggle />
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--wa-muted-foreground)]">
                واجهة تشغيل لحملات الكوبونات، القوالب، وتتبع تفاعل الجمهور عبر واتساب.
              </p>
            </div>

            <nav className="mt-6 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href as Route}
                    className={cn(
                      "group flex items-center justify-between rounded-[20px] border px-4 py-3 text-sm font-bold transition",
                      isActive
                        ? "border-[var(--wa-accent)]/30 bg-[var(--wa-accent-soft)] text-[var(--wa-foreground-strong)] shadow-[0_20px_44px_rgba(149,223,30,0.12)]"
                        : "border-transparent text-[var(--wa-muted-foreground)] hover:border-[var(--wa-border)] hover:bg-[var(--wa-surface-muted)] hover:text-[var(--wa-foreground)]"
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronLeft className={cn("h-4 w-4 transition", isActive ? "opacity-100" : "opacity-35 group-hover:opacity-100")} />
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <header className="sticky top-3 z-20 rounded-[28px] border border-[var(--wa-border)] bg-[var(--wa-header-bg)] px-4 py-4 shadow-[var(--wa-shadow-soft)] backdrop-blur-2xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--wa-accent)]">
                  Operations Suite
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] lg:text-3xl">
                  نظام واتساب للعملاء والعروض الذكية
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex min-w-[220px] items-center gap-2 rounded-full border border-[var(--wa-border)] bg-[var(--wa-surface)] px-4 py-2.5 text-sm text-[var(--wa-muted-foreground)]">
                  <Search className="h-4 w-4" />
                  <span>ابحث عن حملة، عميل، أو كوبون...</span>
                </div>
                <Button variant="secondary" size="sm" className="rounded-full px-3.5">
                  <BellRing className="h-4 w-4" />
                  <span>3 تنبيهات</span>
                </Button>
                <div className="lg:hidden">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </header>

          <div className="pb-8">{children}</div>
        </div>
      </div>
    </main>
  );
}

export function WhatsappShell({ navItems, children }: { navItems: readonly NavItem[]; children: ReactNode }) {
  return (
    <WhatsappThemeProvider>
      <ShellFrame navItems={navItems}>{children}</ShellFrame>
    </WhatsappThemeProvider>
  );
}
