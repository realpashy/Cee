import { ar } from "@/content/messages/ar";
import { en } from "@/content/messages/en";
import { he } from "@/content/messages/he";

export type SiteLanguage = "he" | "ar" | "en";

export type SiteMessages = {
  locale: SiteLanguage;
  langLabel: string;
  nav: {
    expertise: string;
    portfolio: string;
    roadmap: string;
    plans: string;
    agency: string;
    scaleNow: string;
  };
  hero: {
    eyebrow: string;
    titleLines: string[];
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    topCta: string;
    proofLabel: string;
    proofValue: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{
      navLabel: string;
      kicker: string;
      title: string;
      description: string;
      cta: string;
      chipA: string;
      chipB: string;
    }>;
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: Array<{
      name: string;
      price: string;
      suffix: string;
      description: string;
      features: string[];
      cta: string;
      badge: string;
    }>;
  };
  stickyCta: string;
  intake: {
    eyebrow: string;
    title: string;
    stepLabel: string;
    subtitle: string;
    formLabels: {
      fullName: string;
      businessName: string;
      phone: string;
      serviceInterest: string;
      primaryGoal: string;
      biggestChallenge: string;
      currentChannels: string;
      urgency: string;
    };
    nextStep: string;
    successTitle: string;
    successSubtitle: string;
    successCta: string;
  };
  footer: {
    tagline: string;
    privacy: string;
    terms: string;
    accessibility: string;
    rights: string;
  };
};

const dictionaries: Record<SiteLanguage, SiteMessages> = { he, ar, en };

export function resolveSiteLanguage(input?: string): SiteLanguage {
  if (input === "ar" || input === "he") {
    return input;
  }

  return "en";
}

export function getMessages(language: SiteLanguage) {
  return dictionaries[language];
}

export function getDirection(language: SiteLanguage) {
  return language === "en" ? "ltr" : "rtl";
}
