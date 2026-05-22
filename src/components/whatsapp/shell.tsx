"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import type { ComponentType, ReactNode } from "react";
import {
  Bell,
  Building2,
  ChevronLeft,
  LayoutGrid,
  MessageSquareText,
  MoonStar,
  Search,
  Settings2,
  ShieldCheck,
  SunMedium,
  Tags,
  UsersRound
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WhatsappThemeProvider, useWhatsappTheme } from "@/components/whatsapp/theme-provider";

type NavItem = {
  href: "/whatsapp" | `/whatsapp/${string}`;
  label: string;
};

const navIcons: Record<string, ComponentType<{ className?: string }>> = {
  "/whatsapp/dashboard": LayoutGrid,
  "/whatsapp/clients": Building2,
  "/whatsapp/campaigns": MessageSquareText,
  "/whatsapp/segments": UsersRound,
  "/whatsapp/templates": Tags,
  "/whatsapp/compliance": ShieldCheck,
  "/whatsapp/settings": Settings2
};

function ThemeToggle() {
  const { mode, toggleMode } = useWhatsappTheme();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={toggleMode}
      className="px-3"
      aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {mode === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
    </Button>
  );
}

function ShellFrame({ navItems, children }: { navItems: readonly NavItem[]; children: ReactNode }) {
  const pathname = usePathname();

  return (
    <main dir="rtl" className="min-h-screen bg-[var(--wa-bg)] text-[var(--wa-foreground)] transition-colors">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] gap-4 px-3 py-3 sm:px-4 lg:px-5">
        <aside className="hidden w-[248px] shrink-0 lg:block">
          <div className="sticky top-3 border border-[var(--wa-border)] bg-[var(--wa-sidebar-bg)] p-4 shadow-[var(--wa-shadow-soft)]">
            <div className="flex items-start justify-between gap-3 border-b border-[var(--wa-border)] pb-4">
              <div>
                <p className="text-sm font-semibold text-[var(--wa-foreground-strong)]">Cee+ WhatsApp</p>
                <p className="mt-1 text-xs text-[var(--wa-muted-foreground)]">Campaign operations</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] text-[var(--wa-foreground-strong)]">
                <MessageSquareText className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <p className="px-2 text-[11px] font-medium tracking-[0.14em] text-[var(--wa-subtle-heading)]">NAVIGATION</p>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = navIcons[item.href] ?? LayoutGrid;

                  return (
                    <Link
                      key={item.href}
                      href={item.href as Route}
                      className={cn(
                        "group flex items-center justify-between rounded-[5px] border px-3 py-2.5 text-sm transition-colors",
                        isActive
                          ? "border-[var(--wa-border-strong)] bg-[var(--wa-nav-active)] text-[var(--wa-foreground-strong)]"
                          : "border-transparent text-[var(--wa-muted-foreground)] hover:border-[var(--wa-border)] hover:bg-[var(--wa-surface-muted)] hover:text-[var(--wa-foreground)]"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronLeft className={cn("h-4 w-4 transition-opacity", isActive ? "opacity-100" : "opacity-35 group-hover:opacity-100")} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="mt-5 border-t border-[var(--wa-border)] pt-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-[var(--wa-foreground-strong)]">Workspace</p>
                  <p className="mt-1 text-xs text-[var(--wa-muted-foreground)]">Light-first admin mode</p>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <header className="sticky top-3 z-20 border border-[var(--wa-border)] bg-[var(--wa-header-bg)] px-4 py-3 shadow-[var(--wa-shadow-soft)]">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="hidden h-8 w-8 items-center justify-center rounded-[5px] border border-[var(--wa-border)] bg-[var(--wa-surface-muted)] lg:flex">
                  <LayoutGrid className="h-4 w-4 text-[var(--wa-foreground-strong)]" />
                </div>
                <div>
                  <p className="text-[11px] font-medium tracking-[0.14em] text-[var(--wa-subtle-heading)]">WHATSAPP MODULE</p>
                  <h2 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-[var(--wa-foreground-strong)] lg:text-2xl">
                    نظام الحملات والكوپونات
                  </h2>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex min-w-[220px] items-center gap-2 rounded-[5px] border border-[var(--wa-border)] bg-[var(--wa-surface)] px-3 py-2 text-sm text-[var(--wa-muted-foreground)]">
                  <Search className="h-4 w-4" />
                  <span>ابحث عن حملة، عميل، أو كوبون...</span>
                </div>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                  <span>التنبيهات</span>
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
