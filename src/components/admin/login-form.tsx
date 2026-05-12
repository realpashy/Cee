"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [email, setEmail] = useState("realpashy@gmail.com");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    setIsSubmitting(false);

    if (result?.error) {
      setError("הפרטים לא נכונים. נסו שוב.");
      return;
    }

    window.location.assign("/plus");
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 outline-none transition focus:border-[var(--brand-lime)]"
        placeholder="Admin email"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 outline-none transition focus:border-[var(--brand-lime)]"
        placeholder="Password"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[var(--brand-lime)] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[var(--brand-black)] disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Enter Admin"}
      </button>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </form>
  );
}
