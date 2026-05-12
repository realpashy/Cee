import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { isAdminLoginValid } from "@/lib/validators/admin";

export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        if (
          credentials?.email &&
          credentials?.password &&
          isAdminLoginValid({
            email: String(credentials.email),
            password: String(credentials.password)
          })
        ) {
          return {
            id: "admin",
            email: String(credentials.email),
            name: "Cee+ Admin"
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/plus/login"
  }
} satisfies NextAuthConfig;
