import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateResearchDraft } from "@/lib/research-draft";
import { leadSchema } from "@/lib/validators/lead";
import { buildLeadWhatsappHref } from "@/lib/whatsapp";

export async function POST(request: Request) {
  const parsedBody = leadSchema.parse(await request.json());
  const whatsappHref = buildLeadWhatsappHref(parsedBody);
  const draft = generateResearchDraft(parsedBody);

  const lead = await db.lead.create({
    data: {
      fullName: parsedBody.fullName,
      businessName: parsedBody.businessName,
      phone: parsedBody.phone,
      email: parsedBody.email || null,
      city: parsedBody.city || null,
      websiteUrl: parsedBody.websiteUrl || null,
      instagramUrl: parsedBody.instagramUrl || null,
      facebookUrl: parsedBody.facebookUrl || null,
      serviceInterest: parsedBody.serviceInterest,
      monthlyBudget: parsedBody.monthlyBudget || null,
      primaryGoal: parsedBody.primaryGoal,
      biggestChallenge: parsedBody.biggestChallenge,
      currentChannels: parsedBody.currentChannels,
      urgency: parsedBody.urgency,
      qualificationAnswers: parsedBody.qualificationAnswers,
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

  return NextResponse.json({ leadId: lead.id, whatsappHref }, { status: 201 });
}
