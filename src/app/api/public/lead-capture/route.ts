import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  buildCaptureRateLimitKeys,
  detectHoneypotSubmission,
  getRequestIp,
  shouldBlockRepeatedSubmission
} from "@/server/audience/abuse-protection";
import { normalizePhoneNumber } from "@/server/phone/normalize-phone";
import { generateVoucherCode } from "@/server/vouchers/voucher-code";

const publicLeadCaptureSchema = z.object({
  tenantSlug: z.string().min(2),
  campaignSlug: z.string().min(2),
  fullName: z.string().min(2),
  phone: z.string().min(7),
  consentAccepted: z.literal(true),
  cityOrArea: z.string().optional().or(z.literal("")),
  landingPageUrl: z.string().url(),
  language: z.enum(["ar", "he", "en"]).default("ar"),
  website: z.string().optional().or(z.literal(""))
});

function getQueryParam(requestUrl: string, key: string) {
  return new URL(requestUrl).searchParams.get(key) || undefined;
}

async function logSuspiciousAttempt(input: {
  tenantId?: string;
  campaignId?: string;
  ipAddress?: string;
  phoneE164?: string;
  reason: string;
  payload?: unknown;
}) {
  try {
    await db.suspiciousAttempt.create({
      data: {
        tenantId: input.tenantId,
        campaignId: input.campaignId,
        ipAddress: input.ipAddress,
        phoneE164: input.phoneE164,
        reason: input.reason,
        payload: input.payload ?? {}
      }
    });
  } catch {
    // Abuse logging should never make the public form easier to break.
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = publicLeadCaptureSchema.safeParse(body);
  const ipAddress = getRequestIp(request);
  const userAgent = request.headers.get("user-agent") || undefined;

  if (!parsed.success) {
    await logSuspiciousAttempt({
      ipAddress,
      reason: "invalid_payload",
      payload: parsed.error.flatten()
    });
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (detectHoneypotSubmission(parsed.data.website)) {
    await logSuspiciousAttempt({
      ipAddress,
      reason: "honeypot",
      payload: { tenantSlug: parsed.data.tenantSlug, campaignSlug: parsed.data.campaignSlug }
    });
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const normalizedPhone = normalizePhoneNumber(parsed.data.phone);
  const rateKeys = buildCaptureRateLimitKeys({
    ip: ipAddress,
    phoneE164: normalizedPhone.phoneE164
  });

  if (
    !checkRateLimit(rateKeys.ipKey, 12, 10 * 60 * 1000) ||
    !checkRateLimit(rateKeys.phoneKey, 4, 60 * 60 * 1000)
  ) {
    await logSuspiciousAttempt({
      ipAddress,
      phoneE164: normalizedPhone.phoneE164,
      reason: "rate_limited",
      payload: { tenantSlug: parsed.data.tenantSlug, campaignSlug: parsed.data.campaignSlug }
    });
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  const campaign = await db.campaign.findFirst({
    where: {
      slug: parsed.data.campaignSlug,
      status: "active",
      tenant: {
        slug: parsed.data.tenantSlug
      }
    },
    include: {
      tenant: true
    }
  });

  if (!campaign) {
    await logSuspiciousAttempt({
      ipAddress,
      phoneE164: normalizedPhone.phoneE164,
      reason: "campaign_not_found",
      payload: { tenantSlug: parsed.data.tenantSlug, campaignSlug: parsed.data.campaignSlug }
    });
    return NextResponse.json({ error: "Campaign not found." }, { status: 404 });
  }

  const audienceContact = await db.audienceContact.upsert({
    where: {
      tenantId_phoneE164: {
        tenantId: campaign.tenantId,
        phoneE164: normalizedPhone.phoneE164
      }
    },
    update: {
      fullName: parsed.data.fullName,
      phoneOriginal: normalizedPhone.originalPhoneInput,
      cityOrArea: parsed.data.cityOrArea || null,
      preferredLanguage: parsed.data.language
    },
    create: {
      tenantId: campaign.tenantId,
      fullName: parsed.data.fullName,
      phoneOriginal: normalizedPhone.originalPhoneInput,
      phoneE164: normalizedPhone.phoneE164,
      cityOrArea: parsed.data.cityOrArea || null,
      preferredLanguage: parsed.data.language
    }
  });

  const recentSubmission = await db.campaignSubmission.findFirst({
    where: {
      tenantId: campaign.tenantId,
      campaignId: campaign.id,
      audienceContactId: audienceContact.id
    },
    orderBy: { createdAt: "desc" }
  });

  if (
    shouldBlockRepeatedSubmission({
      lastSubmittedAt: recentSubmission?.createdAt ?? null,
      windowMinutes: 30
    })
  ) {
    await logSuspiciousAttempt({
      tenantId: campaign.tenantId,
      campaignId: campaign.id,
      ipAddress,
      phoneE164: normalizedPhone.phoneE164,
      reason: "repeated_submission",
      payload: { audienceContactId: audienceContact.id }
    });
    return NextResponse.json({ error: "A voucher was already requested recently." }, { status: 429 });
  }

  const utmSource = getQueryParam(request.url, "utm_source");
  const utmMedium = getQueryParam(request.url, "utm_medium");
  const utmCampaign = getQueryParam(request.url, "utm_campaign");
  const utmContent = getQueryParam(request.url, "utm_content");
  const utmTerm = getQueryParam(request.url, "utm_term");
  const adId = getQueryParam(request.url, "ad_id");
  const referrer = request.headers.get("referer") || undefined;

  const campaignSubmission = await db.campaignSubmission.create({
    data: {
      tenantId: campaign.tenantId,
      campaignId: campaign.id,
      audienceContactId: audienceContact.id,
      landingPageUrl: parsed.data.landingPageUrl,
      sourcePage: parsed.data.landingPageUrl,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      adId,
      referrer,
      ipAddress,
      userAgent,
      language: parsed.data.language,
      status: "voucher_pending"
    }
  });

  const consentRecord = await db.consentRecord.create({
    data: {
      tenantId: campaign.tenantId,
      campaignId: campaign.id,
      audienceContactId: audienceContact.id,
      campaignSubmissionId: campaignSubmission.id,
      consentText: campaign.consentText,
      consentTextVersion: campaign.consentTextVersion,
      checkboxAccepted: parsed.data.consentAccepted,
      ipAddress,
      userAgent,
      landingPageUrl: parsed.data.landingPageUrl,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      adId,
      language: parsed.data.language,
      referrer,
      sourcePage: parsed.data.landingPageUrl
    }
  });

  const voucher = await db.voucher.create({
    data: {
      tenantId: campaign.tenantId,
      campaignId: campaign.id,
      audienceContactId: audienceContact.id,
      campaignSubmissionId: campaignSubmission.id,
      consentRecordId: consentRecord.id,
      code: generateVoucherCode(parsed.data.campaignSlug),
      offerSnapshot: {
        title: campaign.offerTitle,
        description: campaign.offerDescription,
        discountType: campaign.discountType,
        discountValue: campaign.discountValue,
        expiryRule: campaign.expiryRule
      },
      status: "active"
    }
  });

  return NextResponse.json(
    {
      ok: true,
      campaignSubmissionId: campaignSubmission.id,
      voucherCode: voucher.code
    },
    { status: 201 }
  );
}
