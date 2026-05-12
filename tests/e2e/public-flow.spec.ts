import { expect, test } from "@playwright/test";

test("public homepage shows the guided conversion CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Make Your");
  await expect(
    page.getByRole("button", { name: /scale your revenue/i })
  ).toBeVisible();
});
