import { expect, test } from "@playwright/test";

test("public homepage shows the guided conversion CTA", async ({ page }) => {
  await page.goto("/?lang=en");
  await expect(page.getByText(/grow your business/i).first()).toBeVisible();
  await expect(page.getByText(/start ai intake/i)).toBeVisible();
});
