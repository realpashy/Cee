import { z } from "zod";

const optionalText = z.string().optional().or(z.literal(""));
const optionalUrl = z.string().url().optional().or(z.literal(""));

export const leadSchema = z.object({
  fullName: z.string().min(2),
  businessName: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email().optional().or(z.literal("")),
  city: optionalText,
  websiteUrl: optionalUrl,
  instagramUrl: optionalUrl,
  facebookUrl: optionalUrl,
  serviceInterest: z.string().min(2),
  monthlyBudget: optionalText,
  primaryGoal: z.string().min(2),
  biggestChallenge: z.string().min(2),
  currentChannels: z.string().min(2),
  urgency: z.string().min(2),
  qualificationAnswers: z.record(z.string(), z.string()).default({})
});

export type LeadInput = z.infer<typeof leadSchema>;
