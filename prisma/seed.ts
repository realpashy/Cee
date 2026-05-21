import {
  CampaignStatus,
  DiscountType,
  LeadStatus,
  PrismaClient,
  TemplateSyncStatus,
  WhatsappAccountStatus,
  WhatsappProvider,
  WhatsappTemplateStatus
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.lead.upsert({
    where: { id: "seed-lead-1" },
    update: {
      fullName: "Ahmad Nassar",
      businessName: "Nassar Home Decor",
      phone: "0500000000",
      email: "owner@example.com",
      city: "Nazareth",
      websiteUrl: "https://example.com",
      instagramUrl: "https://instagram.com/example",
      facebookUrl: "https://facebook.com/example",
      serviceInterest: "Growth Engine",
      primaryGoal: "Increase qualified WhatsApp leads",
      biggestChallenge: "Weak ad creatives and unclear brand positioning",
      currentChannels: "Instagram, Facebook, WhatsApp",
      urgency: "Within 7 days",
      monthlyBudget: "₪1,500-₪4,000",
      qualificationAnswers: {
        niche: "Home decor",
        teamSize: "4",
        market: "North Israel"
      },
      status: LeadStatus.RESEARCH_DRAFT,
      adminNotes:
        "Promising fit. Needs sharper creative positioning and a cleaner lead handoff flow.",
      whatsappHref:
        "https://wa.me/972502242816?text=Hi%20Cee%2B%2C%20I%20just%20completed%20the%20eligibility%20form."
    },
    create: {
      id: "seed-lead-1",
      fullName: "Ahmad Nassar",
      businessName: "Nassar Home Decor",
      phone: "0500000000",
      email: "owner@example.com",
      city: "Nazareth",
      websiteUrl: "https://example.com",
      instagramUrl: "https://instagram.com/example",
      facebookUrl: "https://facebook.com/example",
      serviceInterest: "Growth Engine",
      primaryGoal: "Increase qualified WhatsApp leads",
      biggestChallenge: "Weak ad creatives and unclear brand positioning",
      currentChannels: "Instagram, Facebook, WhatsApp",
      urgency: "Within 7 days",
      monthlyBudget: "₪1,500-₪4,000",
      qualificationAnswers: {
        niche: "Home decor",
        teamSize: "4",
        market: "North Israel"
      },
      status: LeadStatus.RESEARCH_DRAFT,
      adminNotes:
        "Promising fit. Needs sharper creative positioning and a cleaner lead handoff flow.",
      whatsappHref:
        "https://wa.me/972502242816?text=Hi%20Cee%2B%2C%20I%20just%20completed%20the%20eligibility%20form."
    }
  });

  await prisma.researchDraft.upsert({
    where: { leadId: "seed-lead-1" },
    update: {
      overview:
        "A local home decor brand with strong raw product potential but weak premium signaling.",
      brandObservations:
        "Visual identity is inconsistent across channels and lacks a premium campaign system.",
      growthOpportunities:
        "A tighter content engine and higher-end creative direction could improve trust and lead quality.",
      risksAndGaps:
        "The business may continue leaking warm traffic if landing and WhatsApp handoff stay fragmented.",
      editableJson: {
        audience: "Homeowners and apartment renovators",
        notes: ["Needs stronger hooks", "Website likely underperforming"]
      }
    },
    create: {
      leadId: "seed-lead-1",
      overview:
        "A local home decor brand with strong raw product potential but weak premium signaling.",
      brandObservations:
        "Visual identity is inconsistent across channels and lacks a premium campaign system.",
      growthOpportunities:
        "A tighter content engine and higher-end creative direction could improve trust and lead quality.",
      risksAndGaps:
        "The business may continue leaking warm traffic if landing and WhatsApp handoff stay fragmented.",
      editableJson: {
        audience: "Homeowners and apartment renovators",
        notes: ["Needs stronger hooks", "Website likely underperforming"]
      }
    }
  });

  await prisma.proposal.upsert({
    where: { leadId: "seed-lead-1" },
    update: {
      slug: "nassar-home-decor-growth-plan",
      intro:
        "We see a brand with strong products but not yet the premium presentation required to scale confidently.",
      businessSnapshot:
        "Nassar Home Decor has strong category relevance and enough visual raw material to support a better-performing growth system.",
      currentStanding:
        "The current digital presence creates interest, but not enough premium trust or campaign consistency.",
      servicePlan:
        "We would combine upgraded visual direction, AI commercial content, and a cleaner website-to-WhatsApp conversion path.",
      quotation:
        "Recommended starting package: Growth Engine at ₪3,500 with optional landing-page expansion.",
      bonusStack:
        "Includes a 7-day growth roadmap, hook system, and ad-ready asset formatting.",
      whatsappCta:
        "Reply on WhatsApp to approve the direction and we will prepare the first deployment sprint."
    },
    create: {
      leadId: "seed-lead-1",
      slug: "nassar-home-decor-growth-plan",
      intro:
        "We see a brand with strong products but not yet the premium presentation required to scale confidently.",
      businessSnapshot:
        "Nassar Home Decor has strong category relevance and enough visual raw material to support a better-performing growth system.",
      currentStanding:
        "The current digital presence creates interest, but not enough premium trust or campaign consistency.",
      servicePlan:
        "We would combine upgraded visual direction, AI commercial content, and a cleaner website-to-WhatsApp conversion path.",
      quotation:
        "Recommended starting package: Growth Engine at ₪3,500 with optional landing-page expansion.",
      bonusStack:
        "Includes a 7-day growth roadmap, hook system, and ad-ready asset formatting.",
      whatsappCta:
        "Reply on WhatsApp to approve the direction and we will prepare the first deployment sprint."
    }
  });

  const tenant = await prisma.tenant.upsert({
    where: { slug: "demo-shop" },
    update: {
      name: "Demo Shop",
      agencyLeadId: "seed-lead-1",
      defaultLanguage: "ar"
    },
    create: {
      name: "Demo Shop",
      slug: "demo-shop",
      agencyLeadId: "seed-lead-1",
      defaultLanguage: "ar"
    }
  });

  await prisma.clientBrand.upsert({
    where: { tenantId: tenant.id },
    update: {
      primaryColor: "#95df1e",
      offerStyle: "premium_dark"
    },
    create: {
      tenantId: tenant.id,
      primaryColor: "#95df1e",
      offerStyle: "premium_dark"
    }
  });

  const whatsappAccount = await prisma.whatsappAccount.upsert({
    where: { id: "seed-whatsapp-account-1" },
    update: {
      tenantId: tenant.id,
      provider: WhatsappProvider.MOCK,
      businessName: "Demo Shop",
      displayName: "Demo Shop",
      status: WhatsappAccountStatus.connected,
      templateSyncStatus: TemplateSyncStatus.synced
    },
    create: {
      id: "seed-whatsapp-account-1",
      tenantId: tenant.id,
      provider: WhatsappProvider.MOCK,
      businessName: "Demo Shop",
      displayName: "Demo Shop",
      status: WhatsappAccountStatus.connected,
      templateSyncStatus: TemplateSyncStatus.synced
    }
  });

  const approvedTemplate = await prisma.whatsappTemplate.upsert({
    where: {
      tenantId_name_language: {
        tenantId: tenant.id,
        name: "voucher_delivery_ar",
        language: "ar"
      }
    },
    update: {
      whatsappAccountId: whatsappAccount.id,
      status: WhatsappTemplateStatus.approved,
      bodyText:
        "أهلاً {{1}} 👋\nكوبونك من {{2}} جاهز 🎁\nالكود: {{3}}\nصالح حتى: {{4}}\nللإلغاء أرسل: إلغاء"
    },
    create: {
      tenantId: tenant.id,
      whatsappAccountId: whatsappAccount.id,
      name: "voucher_delivery_ar",
      category: "marketing",
      language: "ar",
      status: WhatsappTemplateStatus.approved,
      bodyText:
        "أهلاً {{1}} 👋\nكوبونك من {{2}} جاهز 🎁\nالكود: {{3}}\nصالح حتى: {{4}}\nللإلغاء أرسل: إلغاء",
      variables: ["name", "businessName", "voucherCode", "expiryDate"]
    }
  });

  await prisma.whatsappTemplate.upsert({
    where: {
      tenantId_name_language: {
        tenantId: tenant.id,
        name: "promotion_ar_draft",
        language: "ar"
      }
    },
    update: {
      whatsappAccountId: whatsappAccount.id,
      status: WhatsappTemplateStatus.draft,
      bodyText:
        "أهلاً {{1}} 👋\nلدى {{2}} عرض جديد لك:\n{{3}}\nللإلغاء أرسل: إلغاء"
    },
    create: {
      tenantId: tenant.id,
      whatsappAccountId: whatsappAccount.id,
      name: "promotion_ar_draft",
      category: "marketing",
      language: "ar",
      status: WhatsappTemplateStatus.draft,
      bodyText:
        "أهلاً {{1}} 👋\nلدى {{2}} عرض جديد لك:\n{{3}}\nللإلغاء أرسل: إلغاء",
      variables: ["name", "businessName", "offer"]
    }
  });

  const campaign = await prisma.campaign.upsert({
    where: {
      tenantId_slug: {
        tenantId: tenant.id,
        slug: "ramadan-offer"
      }
    },
    update: {
      whatsappTemplateId: approvedTemplate.id,
      status: CampaignStatus.active
    },
    create: {
      tenantId: tenant.id,
      whatsappTemplateId: approvedTemplate.id,
      name: "Ramadan Voucher Offer",
      slug: "ramadan-offer",
      offerTitle: "احصل على خصم 50 شيكل فوراً على الواتساب",
      offerDescription: "اكتب اسمك ورقم الواتساب وسنرسل لك الكوبون خلال لحظات.",
      discountType: DiscountType.fixed_amount,
      discountValue: "50",
      expiryRule: "7_days",
      consentText:
        "أوافق على استلام رسالة واتساب من Demo Shop و/أو Cee+ تحتوي على الكوبون، التحديثات، العروض والرسائل التسويقية. يمكنني إلغاء الاشتراك في أي وقت عبر إرسال كلمة إلغاء.",
      consentTextVersion: "1",
      status: CampaignStatus.active
    }
  });

  await prisma.landingPage.upsert({
    where: { campaignId: campaign.id },
    update: {
      tenantId: tenant.id,
      slug: "ramadan-offer",
      title: campaign.offerTitle,
      subtitle: campaign.offerDescription,
      isPublished: true
    },
    create: {
      tenantId: tenant.id,
      campaignId: campaign.id,
      slug: "ramadan-offer",
      title: campaign.offerTitle,
      subtitle: campaign.offerDescription,
      isPublished: true
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
