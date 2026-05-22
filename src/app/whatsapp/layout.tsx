import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "@/auth";
import { WhatsappShell } from "@/components/whatsapp/shell";

export const dynamic = "force-dynamic";

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
  let session;

  try {
    session = await auth();
  } catch {
    redirect("/plus/login");
  }

  if (!session?.user) {
    redirect("/plus/login");
  }

  return <WhatsappShell navItems={navItems}>{children}</WhatsappShell>;
}
