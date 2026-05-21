import { beforeEach, describe, expect, it, vi } from "vitest";

const dbMock = vi.hoisted(() => ({
  campaign: {
    findFirst: vi.fn()
  },
  audienceContact: {
    upsert: vi.fn()
  },
  campaignSubmission: {
    findFirst: vi.fn(),
    create: vi.fn()
  },
  consentRecord: {
    create: vi.fn()
  },
  voucher: {
    create: vi.fn()
  },
  suspiciousAttempt: {
    create: vi.fn()
  },
  lead: {
    create: vi.fn()
  }
}));

vi.mock("@/lib/db", () => ({
  db: dbMock
}));

import { POST } from "@/app/api/public/lead-capture/route";

describe("POST /api/public/lead-capture", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dbMock.campaign.findFirst.mockResolvedValue({
      id: "campaign_1",
      tenantId: "tenant_1",
      slug: "ramadan-offer",
      status: "active",
      offerTitle: "خصم 50 شيكل",
      offerDescription: "كوبون واتساب فوري",
      discountType: "fixed_amount",
      discountValue: "50",
      expiryRule: "7_days",
      consentText: "أوافق على استلام رسالة واتساب تحتوي على الكوبون.",
      consentTextVersion: "1",
      tenant: {
        id: "tenant_1",
        slug: "demo-shop",
        name: "Demo Shop"
      }
    });
    dbMock.audienceContact.upsert.mockResolvedValue({
      id: "contact_1",
      tenantId: "tenant_1",
      phoneE164: "+972501234567"
    });
    dbMock.campaignSubmission.findFirst.mockResolvedValue(null);
    dbMock.campaignSubmission.create.mockResolvedValue({ id: "submission_1" });
    dbMock.consentRecord.create.mockResolvedValue({ id: "consent_1" });
    dbMock.voucher.create.mockResolvedValue({ id: "voucher_1", code: "RAM-ABC123" });
  });

  it("stores public campaign submissions in the audience domain and never creates an agency Lead", async () => {
    const response = await POST(
      new Request("http://localhost/api/public/lead-capture?utm_source=meta", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-forwarded-for": "1.2.3.4",
          "user-agent": "vitest"
        },
        body: JSON.stringify({
          tenantSlug: "demo-shop",
          campaignSlug: "ramadan-offer",
          fullName: "أحمد",
          phone: "0501234567",
          consentAccepted: true,
          landingPageUrl: "https://cee.example/l/demo-shop/ramadan-offer",
          language: "ar",
          website: ""
        })
      })
    );

    const json = await response.json();

    expect(response.status).toBe(201);
    expect(json).toEqual({
      ok: true,
      campaignSubmissionId: "submission_1",
      voucherCode: "RAM-ABC123"
    });
    expect(dbMock.audienceContact.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          tenantId_phoneE164: {
            tenantId: "tenant_1",
            phoneE164: "+972501234567"
          }
        }
      })
    );
    expect(dbMock.campaignSubmission.create).toHaveBeenCalledOnce();
    expect(dbMock.consentRecord.create).toHaveBeenCalledOnce();
    expect(dbMock.voucher.create).toHaveBeenCalledOnce();
    expect(dbMock.lead.create).not.toHaveBeenCalled();
  });
});
