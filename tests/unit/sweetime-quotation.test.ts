import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import quotationData from "@/content/quotation/sweetime.json";
import { metadata } from "@/app/quotation/sweetime/page";
import { SweetimeQuotationPage } from "@/components/quotation/sweetime-quotation-page";

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

  it("renders as a Cee+ quotation sheet with static mockup sections and no site chrome", () => {
    const markup = renderToStaticMarkup(SweetimeQuotationPage());

    expect(markup).toContain("Cee+");
    expect(markup).not.toContain("למה לעבוד איתי");
    expect(markup).not.toContain("צור קשר");
    expect(markup).not.toContain("הצטרפות למועדון Sweetime</p><p");
    expect(markup).toContain("מסך המחשה למועדון Sweetime");
    expect(markup).toContain("מסך המחשה לאתר ההזמנות");
    expect(markup).toContain("₪9,000");
    expect(markup).toContain("₪10,500");
  });
});
