export type IntakeLocale = "en" | "he" | "ar";

export type BusinessAnswers = {
  businessType: string;
  mainGoal: string;
  biggestProblem: string;
  currentMarketing: string[];
  monthlyBudget: string;
  timeline: string;
  successGoal: string;
};

export type AnalysisResult = {
  leadScore: number;
  intentLevel: "Low" | "Medium" | "High";
  businessType: string;
  mainGoal: string;
  biggestChallenge: string;
  recommendedSolution: string;
  recommendedService: string;
  summary: string;
  suggestedFollowUp: string;
  tags: string[];
};

export type ContactDetails = {
  fullName: string;
  phone: string;
  email: string;
  businessName: string;
  websiteOrSocial: string;
  preferredLanguage: IntakeLocale;
  consentAccepted: boolean;
};
