import { describe, expect, it } from "vitest";

import quotationData from "@/content/quotation/sweetime.json";
import { metadata } from "@/app/quotation/sweetime/page";

describe("Sweetime quotation route contract", () => {
  it("keeps the route private with noindex and nofollow metadata", () => {
    expect(metadata.title).toContain("Sweetime");
    expect(metadata.robots).toMatchObject({
      index: false,
      follow: false
    });
  });

  it("uses the quotation data pack with exactly one recommended plan", () => {
    expect(quotationData.route).toBe("/quotation/sweetime");
    expect(quotationData.metadata.lang).toBe("he");
    expect(quotationData.metadata.dir).toBe("rtl");
    expect(quotationData.plans).toHaveLength(3);
    expect(quotationData.plans.filter((plan) => plan.recommended)).toHaveLength(1);
    expect(quotationData.plans.at(-1)?.id).toBe("sweetime-growth-engine");
  });
});
