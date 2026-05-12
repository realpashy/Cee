import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/db", () => ({
  db: {
    lead: {
      create: vi.fn().mockResolvedValue({ id: "lead_123" })
    }
  }
}));

vi.mock("@/lib/lead-analysis", () => ({
  generateAiLeadSummary: vi.fn().mockResolvedValue({
    leadScore: 82,
    intentLevel: "High",
    businessType: "Service provider",
    mainGoal: "Get more leads",
    biggestChallenge: "I do not get enough leads",
    recommendedSolution: "AI-powered video ads + landing page optimization",
    recommendedService: "Growth Engine",
    estimatedPrice: "₪3,500",
    incentiveTitle: "Media Buying bonus",
    incentiveDetails:
      "If we move forward, we can include the first month of media guidance / account cleanup on us.",
    summary:
      "Strong fit for a growth review with clearer positioning and stronger lead generation assets.",
    suggestedFollowUp:
      "Hi John, thanks for completing the Cee+ AI intake. We see a strong lead-generation opportunity here.",
    tags: ["Hot Lead", "Service Provider", "Needs Ads"]
  })
}));

import { POST } from "@/app/api/leads/route";

describe("POST /api/leads", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a lead and returns a whatsapp redirect", async () => {
    const response = await POST(
      new Request("http://localhost/api/leads", {
        method: "POST",
        body: JSON.stringify({
          contact: {
            fullName: "John",
            phone: "0501234567",
            email: "john@example.com",
            businessName: "John Studio",
            websiteOrSocial: "https://instagram.com/johnstudio",
            preferredLanguage: "en",
            consentAccepted: true
          },
          answers: {
            businessType: "Service provider",
            mainGoal: "Get more leads",
            biggestProblem: "I do not get enough leads",
            currentMarketing: ["Organic social media", "Meta ads"],
            monthlyBudget: "₪2,000–₪5,000",
            timeline: "This month",
            successGoal: "More qualified inquiries every week"
          },
          analysis: {
            leadScore: 82,
            intentLevel: "High",
            businessType: "Service provider",
            mainGoal: "Get more leads",
            biggestChallenge: "I do not get enough leads",
            recommendedSolution: "AI-powered video ads + landing page optimization",
            recommendedService: "Growth Engine",
            estimatedPrice: "₪3,500",
            incentiveTitle: "Media Buying bonus",
            incentiveDetails:
              "If we move forward, we can include the first month of media guidance / account cleanup on us.",
            summary:
              "Strong fit for a growth review with clearer positioning and stronger lead generation assets.",
            suggestedFollowUp:
              "Hi John, thanks for completing the Cee+ AI intake. We see a strong lead-generation opportunity here.",
            tags: ["Hot Lead", "Service Provider", "Needs Ads"]
          }
        })
      })
    );

    const json = await response.json();

    expect(response.status).toBe(201);
    expect(json.leadId).toBe("lead_123");
    expect(json.whatsappHref).toContain("wa.me");
  });
});
