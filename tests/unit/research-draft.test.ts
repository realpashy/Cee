import { describe, expect, it } from "vitest";
import { generateResearchDraft } from "@/lib/research-draft";

describe("generateResearchDraft", () => {
  it("produces editable overview blocks from intake data", () => {
    const draft = generateResearchDraft({
      businessName: "Nassar Home Decor",
      currentChannels: "Instagram, WhatsApp",
      biggestChallenge: "Weak creative consistency",
      primaryGoal: "Get more qualified inquiries"
    });

    expect(draft.overview).toContain("Nassar Home Decor");
    expect(draft.brandObservations.length).toBeGreaterThan(10);
    expect(draft.editableJson).toHaveProperty("opportunities");
  });
});
