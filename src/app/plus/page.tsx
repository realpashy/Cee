import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/plus/login");
  }

  const leadsCount = await db.lead.count();

  return (
    <main className="min-h-screen bg-[var(--brand-black)] px-4 py-10 text-[var(--brand-off-white)] md:px-8">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/5 p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-lime)]">
          Plus Dashboard
        </p>
        <h1 className="mt-3 text-4xl font-black">Welcome back</h1>
        <p className="mt-3 text-base leading-7 text-[var(--brand-silver)]">
          Logged in as {session.user.email ?? "admin"}.
        </p>
        <div className="mt-8 rounded-[24px] border border-white/10 bg-black/30 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--brand-silver)]">
            Current lead volume
          </p>
          <p className="mt-3 text-5xl font-black">{leadsCount}</p>
          <p className="mt-3 text-sm leading-6 text-[var(--brand-silver)]">
            This is the protected admin entry point. The full CRM workspace is
            the next build slice.
          </p>
        </div>
      </div>
    </main>
  );
}
