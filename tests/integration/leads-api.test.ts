import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/leads/route";

describe("POST /api/leads", () => {
  it("creates a lead and returns a whatsapp redirect", async () => {
    const response = await POST(
      new Request("http://localhost/api/leads", {
        method: "POST",
        body: JSON.stringify({
          fullName: "John",
          businessName: "John Studio",
          phone: "0501234567",
          serviceInterest: "Creative Launch",
          primaryGoal: "More leads",
          biggestChallenge: "Weak branding",
          currentChannels: "Instagram",
          urgency: "Now"
        })
      })
    );

    const json = await response.json();

    expect(response.status).toBe(201);
    expect(json.whatsappHref).toContain("wa.me");
  });
});
