"use client";

import { useState } from "react";

type PublicCampaignFormProps = {
  tenantSlug: string;
  campaignSlug: string;
  consentText: string;
  landingPageUrl: string;
};

export function PublicCampaignForm({
  tenantSlug,
  campaignSlug,
  consentText,
  landingPageUrl
}: PublicCampaignFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch(`/api/public/lead-capture${window.location.search}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        tenantSlug,
        campaignSlug,
        fullName: String(formData.get("fullName") || ""),
        phone: String(formData.get("phone") || ""),
        cityOrArea: String(formData.get("cityOrArea") || ""),
        consentAccepted: formData.get("consentAccepted") === "on",
        landingPageUrl,
        language: "ar",
        website: String(formData.get("website") || "")
      })
    });

    setIsSubmitting(false);

    if (!response.ok) {
      setError("لم نتمكن من إرسال الطلب. تأكد من الرقم وحاول مرة أخرى.");
      return;
    }

    window.location.assign(`${landingPageUrl}/success`);
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />
      <input
        name="fullName"
        required
        placeholder="الاسم الكامل"
        className="w-full rounded-[12px] border border-white/10 bg-black/40 px-4 py-4 outline-none focus:border-[var(--brand-lime)]"
      />
      <input
        name="phone"
        required
        placeholder="رقم واتساب"
        className="w-full rounded-[12px] border border-white/10 bg-black/40 px-4 py-4 outline-none focus:border-[var(--brand-lime)]"
      />
      <input
        name="cityOrArea"
        placeholder="المدينة أو المنطقة (اختياري)"
        className="w-full rounded-[12px] border border-white/10 bg-black/40 px-4 py-4 outline-none focus:border-[var(--brand-lime)]"
      />
      <label className="flex items-start gap-3 text-sm leading-7 text-[var(--brand-silver)]">
        <input type="checkbox" name="consentAccepted" required className="mt-2" />
        <span>{consentText}</span>
      </label>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-[12px] bg-[var(--brand-lime)] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-black disabled:opacity-60"
      >
        {isSubmitting ? "جاري الإرسال..." : "أرسل الكوبون على واتساب"}
      </button>
    </form>
  );
}
