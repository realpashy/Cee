import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(8),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  OPENAI_API_KEY: z.string().min(1).optional(),
  OPENAI_MODEL: z.string().min(1).optional(),
  WHATSAPP_CRON_SECRET: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  SUPABASE_STORAGE_BUCKET: z.string().min(1).optional(),
  WHATSAPP_PROVIDER: z.enum(["meta", "mock"]).optional(),
  META_WHATSAPP_VERIFY_TOKEN: z.string().min(1).optional(),
  META_WHATSAPP_APP_SECRET: z.string().min(1).optional()
});

export const env = envSchema.parse(process.env);
