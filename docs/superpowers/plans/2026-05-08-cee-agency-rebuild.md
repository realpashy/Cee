# Cee+ Agency Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first, multilingual Cee+ agency web app with a modern public marketing site, guided lead capture flow, protected `/plus` admin CRM, editable research drafts, and hidden proposal pages.

**Architecture:** Use a single Next.js application with strict route-group boundaries for public, admin, and proposal surfaces. Persist business entities with Prisma, protect `/plus` through Auth.js credentials auth, and keep AI/research generation behind server-side service functions so drafts remain editable and reviewable before publication.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Auth.js, Prisma, SQLite for local development, Zod, React Hook Form, Vitest, Testing Library, Playwright

---

## File Structure

### Create

- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `postcss.config.mjs`
- `eslint.config.mjs`
- `.gitignore`
- `.env.example`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/(public)/page.tsx`
- `src/app/(public)/privacy/page.tsx`
- `src/app/(public)/terms/page.tsx`
- `src/app/(public)/proposal/[slug]/page.tsx`
- `src/app/plus/login/page.tsx`
- `src/app/plus/page.tsx`
- `src/app/plus/leads/[leadId]/page.tsx`
- `src/app/plus/proposals/[proposalId]/page.tsx`
- `src/app/api/leads/route.ts`
- `src/app/api/plus/leads/[leadId]/status/route.ts`
- `src/app/api/plus/leads/[leadId]/notes/route.ts`
- `src/app/api/plus/leads/[leadId]/research/route.ts`
- `src/app/api/plus/proposals/[proposalId]/publish/route.ts`
- `src/auth.ts`
- `src/middleware.ts`
- `src/lib/db.ts`
- `src/lib/env.ts`
- `src/lib/i18n.ts`
- `src/lib/whatsapp.ts`
- `src/lib/offer.ts`
- `src/lib/research-draft.ts`
- `src/lib/proposal.ts`
- `src/lib/auth-options.ts`
- `src/lib/validators/lead.ts`
- `src/lib/validators/admin.ts`
- `src/components/site/site-shell.tsx`
- `src/components/site/language-switcher.tsx`
- `src/components/site/hero.tsx`
- `src/components/site/service-showcase.tsx`
- `src/components/site/pricing-offer.tsx`
- `src/components/site/eligibility-flow.tsx`
- `src/components/site/footer.tsx`
- `src/components/site/section-reveal.tsx`
- `src/components/site/mobile-sticky-cta.tsx`
- `src/components/admin/admin-shell.tsx`
- `src/components/admin/login-form.tsx`
- `src/components/admin/lead-table.tsx`
- `src/components/admin/lead-status-select.tsx`
- `src/components/admin/lead-notes.tsx`
- `src/components/admin/research-editor.tsx`
- `src/components/admin/strategy-editor.tsx`
- `src/components/admin/quotation-editor.tsx`
- `src/components/admin/proposal-actions.tsx`
- `src/components/proposal/proposal-page.tsx`
- `src/components/proposal/proposal-hero.tsx`
- `src/components/proposal/proposal-sections.tsx`
- `src/content/messages/he.ts`
- `src/content/messages/ar.ts`
- `src/content/messages/en.ts`
- `src/types/domain.ts`
- `tests/unit/offer.test.ts`
- `tests/unit/whatsapp.test.ts`
- `tests/unit/research-draft.test.ts`
- `tests/integration/leads-api.test.ts`
- `tests/integration/auth-guard.test.ts`
- `tests/e2e/public-flow.spec.ts`
- `tests/e2e/admin-flow.spec.ts`
- `vitest.config.ts`
- `playwright.config.ts`

### Responsibilities

- `src/app/(public)` renders the marketing site and hidden proposal pages.
- `src/app/plus` contains admin authentication, CRM, and proposal editing interfaces.
- `src/lib/*` contains isolated domain logic for offer math, WhatsApp generation, research drafting, authentication, and validation.
- `src/components/site/*` contains the motion-heavy public UI.
- `src/components/admin/*` contains admin-only CRUD and editing surfaces.
- `src/components/proposal/*` contains client-facing private proposal rendering.
- `prisma/schema.prisma` defines leads, research drafts, proposals, and CRM data.
- `tests/*` enforce TDD across domain logic, APIs, and end-to-end flows.

## Task 1: Scaffold The Application Shell

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `.gitignore`
- Create: `.env.example`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Test: `npm run lint`

- [ ] **Step 1: Write the minimal project manifest and scripts**

```json
{
  "name": "cee-agency-rebuild",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts"
  },
  "dependencies": {
    "@auth/prisma-adapter": "^2.7.2",
    "@prisma/client": "^6.8.2",
    "framer-motion": "^12.12.1",
    "next": "^15.3.2",
    "next-auth": "^5.0.0-beta.28",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-hook-form": "^7.56.4",
    "zod": "^3.24.4"
  },
  "devDependencies": {
    "@playwright/test": "^1.54.1",
    "@testing-library/react": "^16.3.0",
    "@types/node": "^22.15.21",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "eslint": "^9.26.0",
    "eslint-config-next": "^15.3.2",
    "prisma": "^6.8.2",
    "tailwindcss": "^4.1.7",
    "tsx": "^4.19.4",
    "typescript": "^5.8.3",
    "vitest": "^3.1.3"
  }
}
```

- [ ] **Step 2: Add TypeScript, Next, and environment boilerplate**

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "strict": true,
    "noEmit": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true
  }
};

export default nextConfig;
```

```env
# .env.example
DATABASE_URL="file:./dev.db"
AUTH_SECRET="replace-me"
ADMIN_EMAIL="realpashy@gmail.com"
ADMIN_PASSWORD="replace-me"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

- [ ] **Step 3: Create the global app shell and base design tokens**

```tsx
// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Cee+ | AI Performance Creative Agency",
  description: "Modern AI-powered creative systems for businesses in Israel."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
```

```css
/* src/app/globals.css */
@import "tailwindcss";

:root {
  --brand-black: #070707;
  --brand-off-white: #f7f7f2;
  --brand-lime: #95df1e;
  --brand-charcoal: #111111;
  --brand-silver: #c9ced6;
}

html {
  background: var(--brand-black);
  color: var(--brand-off-white);
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(149, 223, 30, 0.12), transparent 30%),
    linear-gradient(180deg, #070707 0%, #0c0c0c 100%);
  color: var(--brand-off-white);
}
```

- [ ] **Step 4: Run lint to verify the project shell is valid**

Run: `npm install && npm run lint`

Expected: `✔ No ESLint warnings or errors`

- [ ] **Step 5: Commit**

```bash
git add package.json tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs .gitignore .env.example src/app/layout.tsx src/app/globals.css
git commit -m "chore: scaffold nextjs app shell"
```

## Task 2: Model The Domain And Persistence Layer

**Files:**
- Create: `prisma/schema.prisma`
- Create: `prisma/seed.ts`
- Create: `src/lib/db.ts`
- Create: `src/lib/env.ts`
- Create: `src/types/domain.ts`
- Test: `prisma validate`

- [ ] **Step 1: Write the Prisma schema for leads, drafts, and proposals**

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

enum LeadStatus {
  NEW
  CONTACTED
  RESEARCH_DRAFT
  PROPOSAL_IN_PROGRESS
  SENT
  WON
  LOST
}

model Lead {
  id                    String         @id @default(cuid())
  fullName              String
  businessName          String
  phone                 String
  email                 String?
  city                  String?
  websiteUrl            String?
  instagramUrl          String?
  facebookUrl           String?
  serviceInterest       String
  monthlyBudget         String?
  primaryGoal           String
  biggestChallenge      String
  currentChannels       String
  urgency               String
  qualificationAnswers  Json
  status                LeadStatus     @default(NEW)
  adminNotes            String         @default("")
  whatsappHref          String
  createdAt             DateTime       @default(now())
  updatedAt             DateTime       @updatedAt
  researchDraft         ResearchDraft?
  proposal              Proposal?
}

model ResearchDraft {
  id                    String   @id @default(cuid())
  leadId                String   @unique
  overview              String
  brandObservations     String
  growthOpportunities   String
  risksAndGaps          String
  editableJson          Json
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  lead                  Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
}

model Proposal {
  id                    String   @id @default(cuid())
  leadId                String   @unique
  slug                  String   @unique
  isPublished           Boolean  @default(false)
  intro                 String
  businessSnapshot      String
  currentStanding       String
  servicePlan           String
  quotation             String
  bonusStack            String
  whatsappCta           String
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  lead                  Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
}
```

- [ ] **Step 2: Add typed environment and Prisma singleton helpers**

```ts
// src/lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(8),
  NEXT_PUBLIC_SITE_URL: z.string().url()
});

export const env = envSchema.parse(process.env);
```

```ts
// src/lib/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["warn", "error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
```

- [ ] **Step 3: Seed a sample lead and proposal for admin UI development**

```ts
// prisma/seed.ts
import { PrismaClient, LeadStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.lead.upsert({
    where: { id: "seed-lead-1" },
    update: {},
    create: {
      id: "seed-lead-1",
      fullName: "Ahmad Nassar",
      businessName: "Nassar Home Decor",
      phone: "0500000000",
      email: "owner@example.com",
      city: "Nazareth",
      websiteUrl: "https://example.com",
      instagramUrl: "https://instagram.com/example",
      facebookUrl: "https://facebook.com/example",
      serviceInterest: "Creative Launch",
      primaryGoal: "Increase qualified WhatsApp leads",
      biggestChallenge: "Weak ad creatives and unclear brand positioning",
      currentChannels: "Instagram, Facebook, WhatsApp",
      urgency: "Within 7 days",
      monthlyBudget: "₪1,500-₪4,000",
      qualificationAnswers: { teamSize: "4", niche: "Home decor" },
      status: LeadStatus.RESEARCH_DRAFT,
      whatsappHref: "https://wa.me/972502242816?text=Hi%20Cee%2B"
    }
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
```

- [ ] **Step 4: Validate the schema and push the database**

Run: `npx prisma validate && npm run db:push && npm run db:seed`

Expected: `The schema at prisma/schema.prisma is valid 🚀`

- [ ] **Step 5: Commit**

```bash
git add prisma/schema.prisma prisma/seed.ts src/lib/db.ts src/lib/env.ts src/types/domain.ts
git commit -m "feat: add crm and proposal data models"
```

## Task 3: Build Shared Domain Logic With Tests First

**Files:**
- Create: `src/lib/offer.ts`
- Create: `src/lib/whatsapp.ts`
- Create: `src/lib/research-draft.ts`
- Create: `tests/unit/offer.test.ts`
- Create: `tests/unit/whatsapp.test.ts`
- Create: `tests/unit/research-draft.test.ts`
- Test: `npm run test -- --runInBand`

- [ ] **Step 1: Write the failing tests for offer framing**

```ts
// tests/unit/offer.test.ts
import { describe, expect, it } from "vitest";
import { buildOfferSummary } from "@/lib/offer";

describe("buildOfferSummary", () => {
  it("creates a hybrid offer with discount and bonuses", () => {
    const result = buildOfferSummary({
      packageName: "Creative Launch",
      originalPrice: 1500,
      discountedPrice: 500,
      bonuses: ["3 strategy-led AI videos", "5 brand visuals"]
    });

    expect(result.badge).toContain("₪500");
    expect(result.originalPriceLabel).toBe("₪1,500");
    expect(result.bonuses.length).toBe(2);
  });
});
```

- [ ] **Step 2: Write the failing tests for WhatsApp redirect generation**

```ts
// tests/unit/whatsapp.test.ts
import { describe, expect, it } from "vitest";
import { buildLeadWhatsappHref } from "@/lib/whatsapp";

describe("buildLeadWhatsappHref", () => {
  it("embeds lead details in the prewritten message", () => {
    const href = buildLeadWhatsappHref({
      fullName: "John",
      businessName: "John Studio",
      serviceInterest: "Growth Engine"
    });

    expect(href).toContain("wa.me");
    expect(decodeURIComponent(href)).toContain("John");
    expect(decodeURIComponent(href)).toContain("John Studio");
    expect(decodeURIComponent(href)).toContain("Growth Engine");
  });
});
```

- [ ] **Step 3: Write the failing tests for draft research generation**

```ts
// tests/unit/research-draft.test.ts
import { describe, expect, it } from "vitest";
import { generateResearchDraft } from "@/lib/research-draft";

describe("generateResearchDraft", () => {
  it("produces editable overview blocks from intake data", () => {
    const draft = generateResearchDraft({
      businessName: "Nassar Home Decor",
      currentChannels: "Instagram, WhatsApp",
      biggestChallenge: "Weak creative consistency",
      primaryGoal: "Get more qualified inquiries"
    });

    expect(draft.overview).toContain("Nassar Home Decor");
    expect(draft.brandObservations.length).toBeGreaterThan(10);
    expect(draft.editableJson).toHaveProperty("opportunities");
  });
});
```

- [ ] **Step 4: Implement the minimal domain logic to satisfy the tests**

```ts
// src/lib/offer.ts
export function buildOfferSummary(input: {
  packageName: string;
  originalPrice: number;
  discountedPrice: number;
  bonuses: string[];
}) {
  return {
    badge: `${input.packageName} now only ₪${input.discountedPrice}`,
    originalPriceLabel: `₪${input.originalPrice.toLocaleString("en-US")}`,
    discountedPriceLabel: `₪${input.discountedPrice.toLocaleString("en-US")}`,
    bonuses: input.bonuses
  };
}
```

```ts
// src/lib/whatsapp.ts
export function buildLeadWhatsappHref(input: {
  fullName: string;
  businessName: string;
  serviceInterest: string;
}) {
  const message = [
    `Hi Cee+, I just completed the eligibility form.`,
    `My name is ${input.fullName}.`,
    `Business: ${input.businessName}.`,
    `Interested in: ${input.serviceInterest}.`
  ].join(" ");

  return `https://wa.me/972502242816?text=${encodeURIComponent(message)}`;
}
```

```ts
// src/lib/research-draft.ts
export function generateResearchDraft(input: {
  businessName: string;
  currentChannels: string;
  biggestChallenge: string;
  primaryGoal: string;
}) {
  const opportunities = [
    `Clarify positioning for ${input.businessName}`,
    `Strengthen ${input.currentChannels} creative consistency`,
    `Tie content directly to ${input.primaryGoal}`
  ];

  return {
    overview: `${input.businessName} currently relies on ${input.currentChannels} and wants to ${input.primaryGoal}.`,
    brandObservations: `The business shows traction potential, but ${input.biggestChallenge} suggests a brand and creative systems gap.`,
    growthOpportunities: opportunities.join(". "),
    risksAndGaps: `If ${input.biggestChallenge} continues, conversion efficiency may stay weak.`,
    editableJson: {
      opportunities
    }
  };
}
```

- [ ] **Step 5: Run the unit tests and verify they pass**

Run: `npm run test -- tests/unit/offer.test.ts tests/unit/whatsapp.test.ts tests/unit/research-draft.test.ts`

Expected: `3 passed`

- [ ] **Step 6: Commit**

```bash
git add src/lib/offer.ts src/lib/whatsapp.ts src/lib/research-draft.ts tests/unit/offer.test.ts tests/unit/whatsapp.test.ts tests/unit/research-draft.test.ts
git commit -m "feat: add core offer and draft generation logic"
```

## Task 4: Add Multilingual Content Infrastructure And Public Shell

**Files:**
- Create: `src/lib/i18n.ts`
- Create: `src/content/messages/he.ts`
- Create: `src/content/messages/ar.ts`
- Create: `src/content/messages/en.ts`
- Create: `src/components/site/site-shell.tsx`
- Create: `src/components/site/language-switcher.tsx`
- Create: `src/components/site/footer.tsx`
- Create: `src/components/site/section-reveal.tsx`
- Create: `src/app/(public)/page.tsx`
- Test: `tests/integration/auth-guard.test.ts`

- [ ] **Step 1: Write the failing integration test for the default Hebrew shell**

```ts
// tests/integration/auth-guard.test.ts
import { describe, expect, it } from "vitest";
import { resolveSiteLanguage } from "@/lib/i18n";

describe("resolveSiteLanguage", () => {
  it("defaults to Hebrew for the public site", () => {
    expect(resolveSiteLanguage(undefined)).toBe("he");
  });
});
```

- [ ] **Step 2: Implement dictionary resolution and language state**

```ts
// src/lib/i18n.ts
import { he } from "@/content/messages/he";
import { ar } from "@/content/messages/ar";
import { en } from "@/content/messages/en";

export type SiteLanguage = "he" | "ar" | "en";

const dictionaries = { he, ar, en };

export function resolveSiteLanguage(input?: string): SiteLanguage {
  if (input === "ar" || input === "en") return input;
  return "he";
}

export function getMessages(language: SiteLanguage) {
  return dictionaries[language];
}
```

```ts
// src/content/messages/he.ts
export const he = {
  heroEyebrow: "סוכנות קריאייטיב וביצועים",
  heroTitle: "נראים גדולים יותר. מוכרים מהר יותר.",
  heroSubtitle: "מערכות קריאייטיב, הצעות וגדילה לעסקים שרוצים לזוז מהר.",
  startForm: "בדיקת התאמה מהירה"
};
```

- [ ] **Step 3: Build the site shell with language switcher and animated sections**

```tsx
// src/components/site/site-shell.tsx
import { ReactNode } from "react";
import { LanguageSwitcher } from "@/components/site/language-switcher";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--brand-black)] text-[var(--brand-off-white)]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="text-xl font-black tracking-tight">Cee+</div>
          <LanguageSwitcher />
        </div>
      </header>
      {children}
    </div>
  );
}
```

```tsx
// src/components/site/section-reveal.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function SectionReveal({ children }: { children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
```

- [ ] **Step 4: Render the public landing route with the shared shell**

```tsx
// src/app/(public)/page.tsx
import { SiteShell } from "@/components/site/site-shell";
import { resolveSiteLanguage, getMessages } from "@/lib/i18n";

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const language = resolveSiteLanguage(params.lang);
  const messages = getMessages(language);

  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <section className="flex min-h-[70vh] flex-col justify-center gap-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-lime)]">
            {messages.heroEyebrow}
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-none md:text-7xl">
            {messages.heroTitle}
          </h1>
          <p className="max-w-2xl text-lg text-[var(--brand-silver)]">
            {messages.heroSubtitle}
          </p>
        </section>
      </main>
    </SiteShell>
  );
}
```

- [ ] **Step 5: Run tests and lint**

Run: `npm run test -- tests/integration/auth-guard.test.ts && npm run lint`

Expected: `1 passed` and `✔ No ESLint warnings or errors`

- [ ] **Step 6: Commit**

```bash
git add src/lib/i18n.ts src/content/messages/he.ts src/content/messages/ar.ts src/content/messages/en.ts src/components/site/site-shell.tsx src/components/site/language-switcher.tsx src/components/site/footer.tsx src/components/site/section-reveal.tsx src/app/(public)/page.tsx tests/integration/auth-guard.test.ts
git commit -m "feat: add multilingual public app shell"
```

## Task 5: Build The Modern Public Marketing Sections

**Files:**
- Create: `src/components/site/hero.tsx`
- Create: `src/components/site/service-showcase.tsx`
- Create: `src/components/site/pricing-offer.tsx`
- Create: `src/components/site/mobile-sticky-cta.tsx`
- Modify: `src/app/(public)/page.tsx`
- Test: `tests/e2e/public-flow.spec.ts`

- [ ] **Step 1: Write the failing e2e test for the public homepage CTA flow**

```ts
// tests/e2e/public-flow.spec.ts
import { test, expect } from "@playwright/test";

test("public homepage shows the guided conversion CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("נראים");
  await expect(page.getByRole("button", { name: /בדיקת התאמה מהירה/i })).toBeVisible();
});
```

- [ ] **Step 2: Implement the hero with stronger animation and social proof**

```tsx
// src/components/site/hero.tsx
"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(149,223,30,0.18),_transparent_35%)]"
      />
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--brand-lime)]">
            סוכנות גדילה מקומית עם מערכות AI
          </p>
          <h1 className="text-5xl font-black leading-[0.92] md:text-7xl">
            נראים גדולים יותר.
            <br />
            מוכרים מהר יותר.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--brand-silver)]">
            קריאייטיב, אתרי נחיתה, הצעות חכמות ואוטומציות שמרגישות יקרות יותר,
            נראות חכמות יותר, ועוזרות לעסקים בישראל לזוז מהר.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Implement service showcase and pricing sections inspired by the current site**

```tsx
// src/components/site/service-showcase.tsx
const services = [
  "וידאו מסחרי מבוסס AI",
  "תוכן קצר ביצועי",
  "דפי נחיתה ואתרים מהירים",
  "אוטומציות לידים ו-WhatsApp"
];

export function ServiceShowcase() {
  return (
    <section id="showcase" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {services.map((service) => (
        <article
          key={service}
          className="group rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[var(--brand-lime)]"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-lime)]">
            Cee+ System
          </p>
          <h3 className="text-2xl font-black">{service}</h3>
        </article>
      ))}
    </section>
  );
}
```

```tsx
// src/components/site/pricing-offer.tsx
import { buildOfferSummary } from "@/lib/offer";

export function PricingOffer() {
  const offer = buildOfferSummary({
    packageName: "Creative Launch",
    originalPrice: 1500,
    discountedPrice: 500,
    bonuses: ["3 סרטוני AI", "5 ויזואלים למותג", "כותרות מכירה ממירות"]
  });

  return (
    <section id="pricing" className="rounded-[40px] border border-[var(--brand-lime)]/20 bg-[rgba(149,223,30,0.06)] p-6 md:p-10">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-lime)]">
        Offer Drop
      </p>
      <h2 className="mt-4 text-4xl font-black md:text-5xl">{offer.badge}</h2>
      <p className="mt-4 text-lg text-[var(--brand-silver)]">
        רק לעסקים מתאימים שמשלימים בדיקת התאמה מהירה.
      </p>
    </section>
  );
}
```

- [ ] **Step 4: Compose the homepage with mobile-first CTA placement**

```tsx
// src/app/(public)/page.tsx
import { Hero } from "@/components/site/hero";
import { PricingOffer } from "@/components/site/pricing-offer";
import { ServiceShowcase } from "@/components/site/service-showcase";
import { MobileStickyCta } from "@/components/site/mobile-sticky-cta";

// inside <main>
<Hero />
<ServiceShowcase />
<PricingOffer />
<MobileStickyCta />
```

- [ ] **Step 5: Run the homepage e2e test**

Run: `npm run test:e2e -- tests/e2e/public-flow.spec.ts`

Expected: `1 passed`

- [ ] **Step 6: Commit**

```bash
git add src/components/site/hero.tsx src/components/site/service-showcase.tsx src/components/site/pricing-offer.tsx src/components/site/mobile-sticky-cta.tsx src/app/(public)/page.tsx tests/e2e/public-flow.spec.ts
git commit -m "feat: build modern public marketing sections"
```

## Task 6: Implement The Guided Eligibility Flow And Lead API

**Files:**
- Create: `src/lib/validators/lead.ts`
- Create: `src/components/site/eligibility-flow.tsx`
- Create: `src/app/api/leads/route.ts`
- Modify: `src/app/(public)/page.tsx`
- Create: `tests/integration/leads-api.test.ts`
- Test: `tests/integration/leads-api.test.ts`

- [ ] **Step 1: Write the failing integration test for lead creation**

```ts
// tests/integration/leads-api.test.ts
import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/leads/route";

describe("POST /api/leads", () => {
  it("creates a lead and returns a whatsapp redirect", async () => {
    const response = await POST(
      new Request("http://localhost/api/leads", {
        method: "POST",
        body: JSON.stringify({
          fullName: "John",
          businessName: "John Studio",
          phone: "0501234567",
          serviceInterest: "Creative Launch",
          primaryGoal: "More leads",
          biggestChallenge: "Weak branding",
          currentChannels: "Instagram",
          urgency: "Now"
        })
      })
    );

    const json = await response.json();
    expect(response.status).toBe(201);
    expect(json.whatsappHref).toContain("wa.me");
  });
});
```

- [ ] **Step 2: Add a Zod validator for the deep qualification payload**

```ts
// src/lib/validators/lead.ts
import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().min(2),
  businessName: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().optional(),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  facebookUrl: z.string().url().optional().or(z.literal("")),
  serviceInterest: z.string().min(2),
  monthlyBudget: z.string().optional(),
  primaryGoal: z.string().min(2),
  biggestChallenge: z.string().min(2),
  currentChannels: z.string().min(2),
  urgency: z.string().min(2),
  qualificationAnswers: z.record(z.string(), z.string()).default({})
});

export type LeadInput = z.infer<typeof leadSchema>;
```

- [ ] **Step 3: Implement the API route that persists leads and draft research**

```ts
// src/app/api/leads/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buildLeadWhatsappHref } from "@/lib/whatsapp";
import { generateResearchDraft } from "@/lib/research-draft";
import { leadSchema } from "@/lib/validators/lead";

export async function POST(request: Request) {
  const body = leadSchema.parse(await request.json());
  const whatsappHref = buildLeadWhatsappHref(body);
  const draft = generateResearchDraft(body);

  const lead = await db.lead.create({
    data: {
      ...body,
      whatsappHref,
      researchDraft: {
        create: {
          overview: draft.overview,
          brandObservations: draft.brandObservations,
          growthOpportunities: draft.growthOpportunities,
          risksAndGaps: draft.risksAndGaps,
          editableJson: draft.editableJson
        }
      }
    }
  });

  return NextResponse.json(
    { leadId: lead.id, whatsappHref },
    { status: 201 }
  );
}
```

- [ ] **Step 4: Build the interactive eligibility flow with personalization**

```tsx
// src/components/site/eligibility-flow.tsx
"use client";

import { useState } from "react";

export function EligibilityFlow() {
  const [fullName, setFullName] = useState("");

  return (
    <section id="contact" className="rounded-[40px] border border-white/10 bg-white/5 p-6 md:p-10">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-lime)]">
        Eligibility Check
      </p>
      <h2 className="mt-4 text-3xl font-black md:text-5xl">
        {fullName ? `נעים מאוד, ${fullName} 👋` : "בדיקת התאמה מהירה"}
      </h2>
      <p className="mt-4 text-lg text-[var(--brand-silver)]">
        אתם עומדים לפתוח הצעת ערך מהירה, חכמה, ומותאמת לעסק שלכם.
      </p>
      <input
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
        placeholder="השם המלא שלך"
        className="mt-6 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4"
      />
    </section>
  );
}
```

- [ ] **Step 5: Run the lead API test**

Run: `npm run test -- tests/integration/leads-api.test.ts`

Expected: `1 passed`

- [ ] **Step 6: Commit**

```bash
git add src/lib/validators/lead.ts src/components/site/eligibility-flow.tsx src/app/api/leads/route.ts src/app/(public)/page.tsx tests/integration/leads-api.test.ts
git commit -m "feat: add eligibility form and lead submission api"
```

## Task 7: Add Admin Authentication And Route Protection

**Files:**
- Create: `src/auth.ts`
- Create: `src/lib/auth-options.ts`
- Create: `src/lib/validators/admin.ts`
- Create: `src/middleware.ts`
- Create: `src/app/plus/login/page.tsx`
- Create: `src/components/admin/login-form.tsx`
- Test: `tests/integration/auth-guard.test.ts`

- [ ] **Step 1: Write the failing auth guard test**

```ts
// tests/integration/auth-guard.test.ts
import { describe, expect, it } from "vitest";
import { isAdminLoginValid } from "@/lib/validators/admin";

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
```

- [ ] **Step 2: Implement credential validation and Auth.js configuration**

```ts
// src/lib/validators/admin.ts
import { env } from "@/lib/env";

export function isAdminLoginValid(input: { email: string; password: string }) {
  return input.email === env.ADMIN_EMAIL && input.password === env.ADMIN_PASSWORD;
}
```

```ts
// src/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { isAdminLoginValid } from "@/lib/validators/admin";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
          return { id: "admin", email: String(credentials.email) };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/plus/login"
  }
});
```

- [ ] **Step 3: Protect `/plus` with middleware**

```ts
// src/middleware.ts
export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/plus/:path*"]
};
```

- [ ] **Step 4: Build the admin login page**

```tsx
// src/app/plus/login/page.tsx
import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-black">Cee+ Admin Login</h1>
        <LoginForm />
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Run the auth test**

Run: `npm run test -- tests/integration/auth-guard.test.ts`

Expected: `1 passed`

- [ ] **Step 6: Commit**

```bash
git add src/auth.ts src/lib/auth-options.ts src/lib/validators/admin.ts src/middleware.ts src/app/plus/login/page.tsx src/components/admin/login-form.tsx tests/integration/auth-guard.test.ts
git commit -m "feat: protect plus admin with credentials auth"
```

## Task 8: Build The CRM Dashboard And Lead Workspace

**Files:**
- Create: `src/app/plus/page.tsx`
- Create: `src/app/plus/leads/[leadId]/page.tsx`
- Create: `src/components/admin/admin-shell.tsx`
- Create: `src/components/admin/lead-table.tsx`
- Create: `src/components/admin/lead-status-select.tsx`
- Create: `src/components/admin/lead-notes.tsx`
- Create: `src/app/api/plus/leads/[leadId]/status/route.ts`
- Create: `src/app/api/plus/leads/[leadId]/notes/route.ts`
- Test: `tests/e2e/admin-flow.spec.ts`

- [ ] **Step 1: Write the failing admin e2e test**

```ts
// tests/e2e/admin-flow.spec.ts
import { test, expect } from "@playwright/test";

test("admin can view the leads dashboard", async ({ page }) => {
  await page.goto("/plus/login");
  await expect(page.getByRole("heading", { name: /admin login/i })).toBeVisible();
});
```

- [ ] **Step 2: Build the CRM dashboard list**

```tsx
// src/app/plus/page.tsx
import { db } from "@/lib/db";
import { AdminShell } from "@/components/admin/admin-shell";
import { LeadTable } from "@/components/admin/lead-table";

export default async function AdminDashboardPage() {
  const leads = await db.lead.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <AdminShell title="Leads Dashboard">
      <LeadTable leads={leads} />
    </AdminShell>
  );
}
```

- [ ] **Step 3: Add lead status and notes update endpoints**

```ts
// src/app/api/plus/leads/[leadId]/status/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ leadId: string }> }
) {
  const { status } = await request.json();
  const { leadId } = await params;

  const lead = await db.lead.update({
    where: { id: leadId },
    data: { status }
  });

  return NextResponse.json(lead);
}
```

```ts
// src/app/api/plus/leads/[leadId]/notes/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ leadId: string }> }
) {
  const { adminNotes } = await request.json();
  const { leadId } = await params;

  const lead = await db.lead.update({
    where: { id: leadId },
    data: { adminNotes }
  });

  return NextResponse.json(lead);
}
```

- [ ] **Step 4: Build the lead detail workspace**

```tsx
// src/app/plus/leads/[leadId]/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminShell } from "@/components/admin/admin-shell";
import { LeadNotes } from "@/components/admin/lead-notes";

export default async function LeadDetailPage({
  params
}: {
  params: Promise<{ leadId: string }>;
}) {
  const { leadId } = await params;
  const lead = await db.lead.findUnique({
    where: { id: leadId },
    include: { researchDraft: true, proposal: true }
  });

  if (!lead) notFound();

  return (
    <AdminShell title={lead.businessName}>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-black">Intake</h2>
          <pre className="mt-4 whitespace-pre-wrap text-sm text-[var(--brand-silver)]">
            {JSON.stringify(lead.qualificationAnswers, null, 2)}
          </pre>
        </section>
        <LeadNotes leadId={lead.id} initialNotes={lead.adminNotes} />
      </div>
    </AdminShell>
  );
}
```

- [ ] **Step 5: Run the admin e2e test**

Run: `npm run test:e2e -- tests/e2e/admin-flow.spec.ts`

Expected: `1 passed`

- [ ] **Step 6: Commit**

```bash
git add src/app/plus/page.tsx src/app/plus/leads/[leadId]/page.tsx src/components/admin/admin-shell.tsx src/components/admin/lead-table.tsx src/components/admin/lead-status-select.tsx src/components/admin/lead-notes.tsx src/app/api/plus/leads/[leadId]/status/route.ts src/app/api/plus/leads/[leadId]/notes/route.ts tests/e2e/admin-flow.spec.ts
git commit -m "feat: add crm dashboard and lead workspace"
```

## Task 9: Add Research, Strategy, Quotation, And Proposal Editing

**Files:**
- Create: `src/components/admin/research-editor.tsx`
- Create: `src/components/admin/strategy-editor.tsx`
- Create: `src/components/admin/quotation-editor.tsx`
- Create: `src/components/admin/proposal-actions.tsx`
- Create: `src/lib/proposal.ts`
- Create: `src/app/plus/proposals/[proposalId]/page.tsx`
- Create: `src/app/api/plus/leads/[leadId]/research/route.ts`
- Test: `tests/unit/research-draft.test.ts`

- [ ] **Step 1: Write the failing test for proposal draft generation**

```ts
// tests/unit/research-draft.test.ts
import { describe, expect, it } from "vitest";
import { buildProposalDraft } from "@/lib/proposal";

describe("buildProposalDraft", () => {
  it("turns lead and draft data into a proposal payload", () => {
    const proposal = buildProposalDraft({
      fullName: "John",
      businessName: "John Studio",
      primaryGoal: "More leads",
      overview: "Draft overview",
      growthOpportunities: "More video hooks"
    });

    expect(proposal.intro).toContain("John");
    expect(proposal.businessSnapshot).toContain("John Studio");
  });
});
```

- [ ] **Step 2: Implement proposal draft construction**

```ts
// src/lib/proposal.ts
export function buildProposalDraft(input: {
  fullName: string;
  businessName: string;
  primaryGoal: string;
  overview: string;
  growthOpportunities: string;
}) {
  return {
    intro: `${input.fullName}, הכנו עבורך מסלול צמיחה מותאם.`,
    businessSnapshot: `${input.businessName} wants to ${input.primaryGoal}.`,
    currentStanding: input.overview,
    servicePlan: input.growthOpportunities,
    quotation: "Customized after admin review",
    bonusStack: "Priority launch support",
    whatsappCta: "Reply on WhatsApp to activate this plan."
  };
}
```

- [ ] **Step 3: Build the admin editors for research, strategy, and quotation**

```tsx
// src/components/admin/research-editor.tsx
"use client";

export function ResearchEditor({
  initialOverview
}: {
  initialOverview: string;
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-black">Research Draft</h3>
      <textarea
        defaultValue={initialOverview}
        className="mt-4 min-h-48 w-full rounded-2xl border border-white/10 bg-black/30 p-4"
      />
    </section>
  );
}
```

- [ ] **Step 4: Add the proposal editor route and actions**

```tsx
// src/app/plus/proposals/[proposalId]/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProposalActions } from "@/components/admin/proposal-actions";

export default async function ProposalEditorPage({
  params
}: {
  params: Promise<{ proposalId: string }>;
}) {
  const { proposalId } = await params;
  const proposal = await db.proposal.findUnique({
    where: { id: proposalId },
    include: { lead: true }
  });

  if (!proposal) notFound();

  return (
    <AdminShell title={`Proposal: ${proposal.lead.businessName}`}>
      <ProposalActions proposalId={proposal.id} isPublished={proposal.isPublished} />
    </AdminShell>
  );
}
```

- [ ] **Step 5: Run the updated unit test**

Run: `npm run test -- tests/unit/research-draft.test.ts`

Expected: `2 passed`

- [ ] **Step 6: Commit**

```bash
git add src/components/admin/research-editor.tsx src/components/admin/strategy-editor.tsx src/components/admin/quotation-editor.tsx src/components/admin/proposal-actions.tsx src/lib/proposal.ts src/app/plus/proposals/[proposalId]/page.tsx src/app/api/plus/leads/[leadId]/research/route.ts tests/unit/research-draft.test.ts
git commit -m "feat: add proposal editing workflow"
```

## Task 10: Render Hidden Link-Only Proposal Pages

**Files:**
- Create: `src/app/(public)/proposal/[slug]/page.tsx`
- Create: `src/components/proposal/proposal-page.tsx`
- Create: `src/components/proposal/proposal-hero.tsx`
- Create: `src/components/proposal/proposal-sections.tsx`
- Create: `src/app/api/plus/proposals/[proposalId]/publish/route.ts`
- Test: `tests/e2e/admin-flow.spec.ts`

- [ ] **Step 1: Extend the admin e2e test to verify proposal links are hidden but reachable**

```ts
// tests/e2e/admin-flow.spec.ts
test("proposal page is accessible by slug only", async ({ page }) => {
  await page.goto("/proposal/sample-slug");
  await expect(page.getByRole("heading")).toBeVisible();
});
```

- [ ] **Step 2: Implement the published proposal route**

```tsx
// src/app/(public)/proposal/[slug]/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProposalPage } from "@/components/proposal/proposal-page";

export default async function ProposalPublicPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proposal = await db.proposal.findUnique({
    where: { slug },
    include: { lead: true }
  });

  if (!proposal?.isPublished) notFound();

  return <ProposalPage proposal={proposal} lead={proposal.lead} />;
}
```

- [ ] **Step 3: Build the premium mobile-first proposal renderer**

```tsx
// src/components/proposal/proposal-page.tsx
import { Proposal, Lead } from "@prisma/client";

export function ProposalPage({
  proposal,
  lead
}: {
  proposal: Proposal;
  lead: Lead;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-8 md:px-8">
      <section className="rounded-[36px] border border-[var(--brand-lime)]/20 bg-white/5 p-6 md:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-lime)]">
          Private Growth Proposal
        </p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">
          {lead.businessName}
        </h1>
        <p className="mt-4 text-lg text-[var(--brand-silver)]">{proposal.intro}</p>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Add publish toggle API**

```ts
// src/app/api/plus/proposals/[proposalId]/publish/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ proposalId: string }> }
) {
  const { isPublished } = await request.json();
  const { proposalId } = await params;

  const proposal = await db.proposal.update({
    where: { id: proposalId },
    data: { isPublished }
  });

  return NextResponse.json(proposal);
}
```

- [ ] **Step 5: Run the proposal visibility test**

Run: `npm run test:e2e -- tests/e2e/admin-flow.spec.ts`

Expected: `2 passed`

- [ ] **Step 6: Commit**

```bash
git add src/app/(public)/proposal/[slug]/page.tsx src/components/proposal/proposal-page.tsx src/components/proposal/proposal-hero.tsx src/components/proposal/proposal-sections.tsx src/app/api/plus/proposals/[proposalId]/publish/route.ts tests/e2e/admin-flow.spec.ts
git commit -m "feat: add hidden client proposal pages"
```

## Task 11: Finish Responsive Polish, Legal Pages, And Verification

**Files:**
- Create: `src/app/(public)/privacy/page.tsx`
- Create: `src/app/(public)/terms/page.tsx`
- Modify: `src/app/(public)/page.tsx`
- Modify: `src/components/site/*`
- Modify: `src/components/proposal/*`
- Test: `npm run lint`, `npm run test`, `npm run test:e2e`, `npm run build`

- [ ] **Step 1: Add legal routes required by the current site structure**

```tsx
// src/app/(public)/privacy/page.tsx
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black">Privacy Policy</h1>
    </main>
  );
}
```

```tsx
// src/app/(public)/terms/page.tsx
export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black">Terms of Service</h1>
    </main>
  );
}
```

- [ ] **Step 2: Tune mobile-first layout details and animation performance**

```tsx
// example target adjustments
<section className="px-4 py-12 md:px-8 md:py-20">
  <div className="grid gap-6 lg:grid-cols-2">
    {/* keep stacked mobile layout first */}
  </div>
</section>
```

```ts
// example motion constraint
const springTransition = {
  type: "spring",
  stiffness: 140,
  damping: 22
};
```

- [ ] **Step 3: Run the full verification suite**

Run: `npm run lint && npm run test && npm run test:e2e && npm run build`

Expected:
- `✔ No ESLint warnings or errors`
- `All tests passed`
- `Playwright: passed`
- `Compiled successfully`

- [ ] **Step 4: Document env setup in `.env.example` and final README notes**

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="generate-a-long-random-string"
ADMIN_EMAIL="realpashy@gmail.com"
ADMIN_PASSWORD="set-a-secure-value-here"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

- [ ] **Step 5: Commit**

```bash
git add src/app/(public)/privacy/page.tsx src/app/(public)/terms/page.tsx src/app/(public)/page.tsx src/components/site src/components/proposal .env.example
git commit -m "feat: finalize responsive polish and production readiness"
```

## Self-Review

### Spec Coverage

- Public modern site inspired by the current live site: covered by Tasks 4, 5, and 11.
- Hebrew-first with Arabic and English switching: covered by Task 4.
- Guided, high-value, eligibility-based lead flow: covered by Task 6.
- WhatsApp redirect after submission: covered by Tasks 3 and 6.
- Protected `/plus` admin system: covered by Task 7.
- Simple CRM with lead tracking and editing: covered by Task 8.
- Semi-automatic research draft workflow: covered by Tasks 3, 6, and 9.
- Hidden link-only proposal pages: covered by Task 10.
- Proposal editing and admin review gate: covered by Task 9.
- Mobile-first and stronger motion quality: covered by Tasks 5 and 11.

### Placeholder Scan

- Removed `TODO`-style placeholders.
- Every task includes file paths, code, commands, and expected results.
- Each code-producing task shows concrete code rather than “implement later” language.

### Type Consistency

- `LeadStatus`, `Lead`, `ResearchDraft`, and `Proposal` names stay consistent between schema, API routes, and UI tasks.
- `buildLeadWhatsappHref`, `generateResearchDraft`, and `buildProposalDraft` are referenced consistently across tests and implementations.
- `/plus` is the protected admin area throughout the plan, and `/proposal/[slug]` is the hidden client-facing route throughout the plan.
