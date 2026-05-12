import { describe, expect, it } from "vitest";
import { buildLeadWhatsappHref } from "@/lib/whatsapp";

describe("buildLeadWhatsappHref", () => {
  it("embeds lead details in the prewritten message", () => {
    const href = buildLeadWhatsappHref({
      fullName: "John",
      businessName: "John Studio",
      serviceInterest: "Growth Engine"
    });

    expect(href).toContain("wa.me");
    expect(decodeURIComponent(href)).toContain("John");
    expect(decodeURIComponent(href)).toContain("John Studio");
    expect(decodeURIComponent(href)).toContain("Growth Engine");
  });
});
