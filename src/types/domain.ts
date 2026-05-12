import type { LeadStatus, Prisma } from "@prisma/client";

export type QualificationAnswers = Prisma.JsonValue;

export type LeadRecord = {
  id: string;
  fullName: string;
  businessName: string;
  phone: string;
  email: string | null;
  city: string | null;
  websiteUrl: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  websiteOrSocial: string | null;
  preferredLanguage: string | null;
  consentAccepted: boolean;
  businessType: string | null;
  mainGoal: string | null;
  biggestProblem: string | null;
  currentMarketing: string | null;
  timeline: string | null;
  successGoal: string | null;
  serviceInterest: string;
  monthlyBudget: string | null;
  primaryGoal: string;
  biggestChallenge: string;
  currentChannels: string;
  urgency: string;
  qualificationAnswers: QualificationAnswers;
  conversationAnswers: QualificationAnswers | null;
  leadScore: number | null;
  intentLevel: string | null;
  aiSummary: string | null;
  aiRecommendedSolution: string | null;
  aiSuggestedFollowUp: string | null;
  tags: QualificationAnswers | null;
  source: string;
  status: LeadStatus;
  adminNotes: string;
  whatsappHref: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ResearchDraftRecord = {
  id: string;
  leadId: string;
  overview: string;
  brandObservations: string;
  growthOpportunities: string;
  risksAndGaps: string;
  editableJson: QualificationAnswers;
  createdAt: Date;
  updatedAt: Date;
};

export type ProposalRecord = {
  id: string;
  leadId: string;
  slug: string;
  isPublished: boolean;
  intro: string;
  businessSnapshot: string;
  currentStanding: string;
  servicePlan: string;
  quotation: string;
  bonusStack: string;
  whatsappCta: string;
  createdAt: Date;
  updatedAt: Date;
};
