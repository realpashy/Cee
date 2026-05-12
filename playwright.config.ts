import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: "http://127.0.0.1:3011"
  },
  webServer: {
    command: "npm run dev -- --port 3011",
    port: 3011,
    reuseExistingServer: false,
    timeout: 120_000
  }
});
