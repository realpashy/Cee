import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateAiLeadSummary } from "@/lib/lead-analysis";
import { checkRateLimit } from "@/lib/rate-limit";
import { generateResearchDraft } from "@/lib/research-draft";
import { leadSubmissionSchema } from "@/lib/validators/lead";
import { buildLeadWhatsappHref } from "@/lib/whatsapp";

function getRequestKey(request: Request) {
  return request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "local";
}

export async function POST(request: Request) {
  const rateKey = `lead-submit:${getRequestKey(request)}`;
  if (!checkRateLimit(rateKey, 8, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  const parsedBody = leadSubmissionSchema.parse(await request.json());
  const analysis = await generateAiLeadSummary(
    parsedBody.answers,
    parsedBody.contact.preferredLanguage
  );
  const whatsappHref = buildLeadWhatsappHref({
    fullName: parsedBody.contact.fullName,
    businessName: parsedBody.contact.businessName,
    serviceInterest: analysis.recommendedService,
    recommendedSolution: analysis.recommendedSolution
  });
  const draft = generateResearchDraft({
    businessName: parsedBody.contact.businessName,
    currentChannels: parsedBody.answers.currentMarketing,
    biggestChallenge: parsedBody.answers.biggestProblem,
    primaryGoal: parsedBody.answers.mainGoal,
    recommendedSolution: analysis.recommendedSolution,
    tags: analysis.tags
  });

  const lead = await db.lead.create({
    data: {
      fullName: parsedBody.contact.fullName,
      businessName: parsedBody.contact.businessName,
      phone: parsedBody.contact.phone,
      email: parsedBody.contact.email,
      websiteOrSocial: parsedBody.contact.websiteOrSocial || null,
      preferredLanguage: parsedBody.contact.preferredLanguage,
      consentAccepted: parsedBody.contact.consentAccepted,
      businessType: parsedBody.answers.businessType,
      mainGoal: parsedBody.answers.mainGoal,
      biggestProblem: parsedBody.answers.biggestProblem,
      currentMarketing: parsedBody.answers.currentMarketing,
      timeline: parsedBody.answers.timeline,
      successGoal: parsedBody.answers.successGoal,
      serviceInterest: analysis.recommendedService,
      monthlyBudget: parsedBody.answers.monthlyBudget,
      primaryGoal: parsedBody.answers.mainGoal,
      biggestChallenge: parsedBody.answers.biggestProblem,
      currentChannels: parsedBody.answers.currentMarketing,
      urgency: parsedBody.answers.timeline,
      qualificationAnswers: parsedBody.qualificationAnswers,
      conversationAnswers: parsedBody.answers,
      leadScore: analysis.leadScore,
      intentLevel: analysis.intentLevel,
      aiSummary: analysis.summary,
      aiRecommendedSolution: analysis.recommendedSolution,
      aiSuggestedFollowUp: analysis.suggestedFollowUp,
      tags: analysis.tags,
      whatsappHref,
      researchDraft: {
        create: {
          overview: draft.overview,
          brandObservations: draft.brandObservations,
          growthOpportunities: draft.growthOpportunities,
          risksAndGaps: draft.risksAndGaps,
          editableJson: draft.editableJson
        }
      }
    }
  });

  return NextResponse.json(
    {
      leadId: lead.id,
      whatsappHref,
      analysis
    },
    { status: 201 }
  );
}
