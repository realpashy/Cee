import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PublicCampaignForm } from "@/components/whatsapp/public-campaign-form";

export default async function PublicCampaignLandingPage({
  params
}: {
  params: Promise<{ tenantSlug: string; campaignSlug: string }>;
}) {
  const { tenantSlug, campaignSlug } = await params;
  const campaign = await db.campaign.findFirst({
    where: {
      slug: campaignSlug,
      status: "active",
      tenant: { slug: tenantSlug }
    },
    include: { tenant: true }
  });

  if (!campaign) {
    notFound();
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#070807] px-4 py-8 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl flex-col justify-center">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--brand-lime)]">
            عرض واتساب من {campaign.tenant.name}
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight">{campaign.offerTitle}</h1>
          <p className="mt-4 text-base leading-8 text-[var(--brand-silver)]">
            {campaign.offerDescription}
          </p>
          <PublicCampaignForm
            tenantSlug={tenantSlug}
            campaignSlug={campaignSlug}
            consentText={campaign.consentText}
            landingPageUrl={`/l/${tenantSlug}/${campaignSlug}`}
          />
        </div>
      </section>
    </main>
  );
}
