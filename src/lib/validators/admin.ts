import { env } from "@/lib/env";

export function isAdminLoginValid(input: { email: string; password: string }) {
  return (
    input.email === env.ADMIN_EMAIL && input.password === env.ADMIN_PASSWORD
  );
}
