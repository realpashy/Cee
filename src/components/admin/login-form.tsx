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
        className="w-full rounded-[18px] border border-white/10 bg-black/40 px-4 py-4 outline-none transition focus:border-[var(--brand-lime)] focus:bg-black/55"
        placeholder="Admin email"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="w-full rounded-[18px] border border-white/10 bg-black/40 px-4 py-4 outline-none transition focus:border-[var(--brand-lime)] focus:bg-black/55"
        placeholder="Password"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-[18px] bg-[var(--brand-lime)] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-[var(--brand-black)] shadow-[0_0_0_1px_rgba(149,223,30,0.16),0_14px_30px_rgba(149,223,30,0.14)] disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Enter Admin"}
      </button>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </form>
  );
}
