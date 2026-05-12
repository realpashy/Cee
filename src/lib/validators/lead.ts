import { z } from "zod";

const contactLanguageSchema = z.enum(["en", "he", "ar"]);

export const intakeAnswerSchema = z.object({
  businessType: z.string().min(2),
  mainGoal: z.string().min(2),
  biggestProblem: z.string().min(2),
  currentMarketing: z.array(z.string().min(2)).min(1),
  monthlyBudget: z.string().min(2),
  timeline: z.string().min(2),
  successGoal: z.string().min(8)
});

export const aiLeadSummarySchema = z.object({
  leadScore: z.number().int().min(1).max(100),
  intentLevel: z.enum(["Low", "Medium", "High"]),
  businessType: z.string().min(2),
  mainGoal: z.string().min(2),
  biggestChallenge: z.string().min(2),
  recommendedSolution: z.string().min(8),
  recommendedService: z.string().min(2),
  summary: z.string().min(12),
  suggestedFollowUp: z.string().min(12),
  tags: z.array(z.string().min(2)).min(1)
});

export const leadAnalysisRequestSchema = intakeAnswerSchema.extend({
  locale: contactLanguageSchema
});

export const leadSubmissionSchema = z.object({
  contact: z.object({
    fullName: z.string().min(2),
    phone: z.string().min(7),
    email: z.string().email(),
    businessName: z.string().min(2),
    websiteOrSocial: z.string().optional().or(z.literal("")),
    preferredLanguage: contactLanguageSchema,
    consentAccepted: z.literal(true)
  }),
  answers: intakeAnswerSchema,
  analysis: aiLeadSummarySchema,
  qualificationAnswers: z.record(z.string(), z.any()).default({})
});

export type IntakeAnswers = z.infer<typeof intakeAnswerSchema>;
export type LeadAnalysisRequest = z.infer<typeof leadAnalysisRequestSchema>;
export type AiLeadSummary = z.infer<typeof aiLeadSummarySchema>;
export type LeadSubmissionInput = z.infer<typeof leadSubmissionSchema>;
