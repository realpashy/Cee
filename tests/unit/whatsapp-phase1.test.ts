import { describe, expect, it } from "vitest";
import { normalizePhoneNumber } from "@/server/phone/normalize-phone";
import {
  assertTenantScope,
  canReadAcrossTenants,
  type WhatsappAdminContext
} from "@/server/tenancy/tenant-guard";
import {
  buildCaptureRateLimitKeys,
  detectHoneypotSubmission,
  shouldBlockRepeatedSubmission
} from "@/server/audience/abuse-protection";
import {
  canUseTemplateForRealOutbound,
  type WhatsappTemplateStatus
} from "@/server/whatsapp/template-status";
import { isValidCronRequest } from "@/server/jobs/cron-auth";

describe("Phase 1 WhatsApp campaign foundations", () => {
  it("normalizes local Israeli phone numbers to E.164 while preserving the original input", () => {
    expect(normalizePhoneNumber("050-123-4567")).toEqual({
      originalPhoneInput: "050-123-4567",
      phoneE164: "+972501234567"
    });
  });

  it("keeps audience tenant boundaries unless the current user is Cee+ owner", () => {
    const clientAdmin: WhatsappAdminContext = {
      role: "CLIENT_ADMIN",
      tenantId: "tenant_a"
    };
    const owner: WhatsappAdminContext = {
      role: "CEE_OWNER",
      tenantId: null
    };

    expect(assertTenantScope(clientAdmin, "tenant_a")).toEqual({ tenantId: "tenant_a" });
    expect(() => assertTenantScope(clientAdmin, "tenant_b")).toThrow(/tenant scope/i);
    expect(canReadAcrossTenants(clientAdmin)).toBe(false);
    expect(canReadAcrossTenants(owner)).toBe(true);
    expect(assertTenantScope(owner, null)).toEqual({});
  });

  it("only permits approved WhatsApp templates for real outbound sends", () => {
    const statuses: WhatsappTemplateStatus[] = [
      "draft",
      "submitted",
      "approved",
      "rejected",
      "paused",
      "disabled"
    ];

    expect(statuses.filter(canUseTemplateForRealOutbound)).toEqual(["approved"]);
  });

  it("builds separate rate-limit keys for IP and phone and detects honeypot submissions", () => {
    expect(buildCaptureRateLimitKeys({ ip: "1.2.3.4", phoneE164: "+972501234567" })).toEqual({
      ipKey: "public-capture:ip:1.2.3.4",
      phoneKey: "public-capture:phone:+972501234567"
    });
    expect(detectHoneypotSubmission("")).toBe(false);
    expect(detectHoneypotSubmission("bot-filled-this")).toBe(true);
  });

  it("blocks repeated public voucher submissions inside the configured window", () => {
    const now = new Date("2026-05-21T10:00:00.000Z");
    const recent = new Date("2026-05-21T09:45:00.000Z");
    const old = new Date("2026-05-20T09:45:00.000Z");

    expect(shouldBlockRepeatedSubmission({ lastSubmittedAt: recent, now, windowMinutes: 30 })).toBe(true);
    expect(shouldBlockRepeatedSubmission({ lastSubmittedAt: old, now, windowMinutes: 30 })).toBe(false);
    expect(shouldBlockRepeatedSubmission({ lastSubmittedAt: null, now, windowMinutes: 30 })).toBe(false);
  });

  it("protects cron/job endpoints with a server-side bearer token", () => {
    const secret = "cron-secret";

    expect(
      isValidCronRequest(
        new Request("http://localhost/api/jobs/process-voucher", {
          headers: { authorization: `Bearer ${secret}` }
        }),
        secret
      )
    ).toBe(true);

    expect(isValidCronRequest(new Request("http://localhost/api/jobs/process-voucher"), secret)).toBe(false);
  });
});
