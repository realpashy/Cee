import { describe, expect, it } from "vitest";
import { resolveSiteLanguage } from "@/lib/i18n";
import { isAdminLoginValid } from "@/lib/validators/admin";

describe("resolveSiteLanguage", () => {
  it("defaults to English for the public site", () => {
    expect(resolveSiteLanguage(undefined)).toBe("en");
  });
});

describe("isAdminLoginValid", () => {
  it("matches the configured admin credentials", () => {
    expect(
      isAdminLoginValid({
        email: "realpashy@gmail.com",
        password: "replace-me"
      })
    ).toBe(true);
  });
});
