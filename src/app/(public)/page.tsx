import { Hero } from "@/components/site/hero";
import { EligibilityFlow } from "@/components/site/eligibility-flow";
import { MobileStickyCta } from "@/components/site/mobile-sticky-cta";
import { PricingOffer } from "@/components/site/pricing-offer";
import { SectionReveal } from "@/components/site/section-reveal";
import { ServiceShowcase } from "@/components/site/service-showcase";
import { SiteShell } from "@/components/site/site-shell";
import { getDirection, getMessages, resolveSiteLanguage } from "@/lib/i18n";

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const language = resolveSiteLanguage(params.lang);
  const messages = getMessages(language);
  const direction = getDirection(language);

  return (
    <SiteShell currentLanguage={language} messages={messages}>
      <main dir={direction} className="w-full pb-6 pt-24 md:pb-8 md:pt-28">
        <SectionReveal>
          <Hero messages={messages} />
        </SectionReveal>

        <ServiceShowcase messages={messages} />

        <SectionReveal>
          <PricingOffer messages={messages} />
        </SectionReveal>

        <SectionReveal>
          <div className="py-12 md:py-20">
            <EligibilityFlow messages={messages} />
          </div>
        </SectionReveal>
      </main>

      <MobileStickyCta label={messages.stickyCta} />
    </SiteShell>
  );
}
