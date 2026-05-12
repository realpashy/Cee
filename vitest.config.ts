import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  test: {
    environment: "node",
    env: {
      DATABASE_URL: "file:./dev.db",
      AUTH_SECRET: "replace-me-secret",
      ADMIN_EMAIL: "realpashy@gmail.com",
      ADMIN_PASSWORD: "replace-me",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000"
    }
  },
  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: `${path.resolve(__dirname, "src")}/`
      }
    ]
  }
});
