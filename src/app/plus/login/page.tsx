import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--brand-black)] px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(149,223,30,0.1),transparent_20%),radial-gradient(circle_at_80%_12%,rgba(149,223,30,0.08),transparent_24%)]" />
      <div className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,22,19,0.92),rgba(10,11,10,0.96))] p-8 shadow-[var(--brand-shadow-panel)] backdrop-blur-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-lime)]">
          Private Access
        </p>
        <h1 className="mt-3 text-3xl font-black">Cee+ Admin Login</h1>
        <p className="mt-3 text-base leading-7 text-[var(--brand-silver)]">
          הכניסה הזו מגינה על ה-CRM, טיוטות המחקר, והצעות הלקוחות הפרטיות.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
