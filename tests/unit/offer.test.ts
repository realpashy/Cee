import { describe, expect, it } from "vitest";
import { buildOfferSummary } from "@/lib/offer";

describe("buildOfferSummary", () => {
  it("creates a hybrid offer with discount and bonuses", () => {
    const result = buildOfferSummary({
      packageName: "Creative Launch",
      originalPrice: 1500,
      discountedPrice: 500,
      bonuses: ["3 strategy-led AI videos", "5 brand visuals"]
    });

    expect(result.badge).toContain("₪500");
    expect(result.originalPriceLabel).toBe("₪1,500");
    expect(result.bonuses.length).toBe(2);
  });
});
