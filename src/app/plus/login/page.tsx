import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--brand-black)] px-4">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8">
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
