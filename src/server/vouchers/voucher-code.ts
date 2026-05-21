import { randomBytes } from "node:crypto";

export function generateVoucherCode(prefix = "CEE") {
  const normalizedPrefix = prefix
    .replace(/[^A-Za-z0-9]/g, "")
    .slice(0, 6)
    .toUpperCase();
  const suffix = randomBytes(3).toString("hex").toUpperCase();

  return `${normalizedPrefix || "CEE"}-${suffix}`;
}
