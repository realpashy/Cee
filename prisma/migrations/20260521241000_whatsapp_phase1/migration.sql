-- CreateEnum
CREATE TYPE "TenantUserRole" AS ENUM ('CEE_OWNER', 'CEE_ADMIN', 'CLIENT_ADMIN', 'CLIENT_VIEWER');

-- CreateEnum
CREATE TYPE "WhatsappProvider" AS ENUM ('META_CLOUD', 'MOCK', 'TWILIO_PLACEHOLDER');

-- CreateEnum
CREATE TYPE "WhatsappAccountStatus" AS ENUM ('draft', 'connected', 'needs_attention', 'disabled');

-- CreateEnum
CREATE TYPE "TemplateSyncStatus" AS ENUM ('never_synced', 'synced', 'sync_failed');

-- CreateEnum
CREATE TYPE "WhatsappTemplateStatus" AS ENUM ('draft', 'submitted', 'approved', 'rejected', 'paused', 'disabled');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('draft', 'active', 'paused', 'archived');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('fixed_amount', 'percentage', 'free_item', 'custom_text');

-- CreateEnum
CREATE TYPE "CampaignSubmissionStatus" AS ENUM ('received', 'voucher_pending', 'voucher_sent', 'blocked', 'failed');

-- CreateEnum
CREATE TYPE "VoucherStatus" AS ENUM ('active', 'redeemed', 'expired', 'cancelled');

-- CreateEnum
CREATE TYPE "GeneratedAssetType" AS ENUM ('voucher_square', 'voucher_story', 'voucher_background');

-- CreateEnum
CREATE TYPE "WhatsappMessageDirection" AS ENUM ('outbound', 'inbound');

-- CreateEnum
CREATE TYPE "WhatsappMessageStatus" AS ENUM ('queued', 'sent', 'delivered', 'read', 'failed', 'replied');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('queued', 'processing', 'completed', 'failed', 'cancelled');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('tenant_created', 'tenant_updated', 'campaign_created', 'campaign_updated', 'template_changed', 'send_launched', 'audience_exported', 'consent_recorded', 'unsubscribe_recorded', 'voucher_redeemed', 'whatsapp_account_connected', 'settings_changed');

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "agencyLeadId" TEXT,
    "defaultLanguage" TEXT NOT NULL DEFAULT 'ar',
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantUser" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "TenantUserRole" NOT NULL DEFAULT 'CLIENT_VIEWER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientBrand" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "logoUrl" TEXT,
    "primaryColor" TEXT NOT NULL DEFAULT '#95df1e',
    "secondaryColor" TEXT,
    "coverImageUrl" TEXT,
    "offerStyle" TEXT NOT NULL DEFAULT 'premium_dark',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhatsappAccount" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "provider" "WhatsappProvider" NOT NULL DEFAULT 'META_CLOUD',
    "phoneNumberId" TEXT,
    "wabaId" TEXT,
    "businessName" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "accessTokenRef" TEXT,
    "secretKeyRef" TEXT,
    "status" "WhatsappAccountStatus" NOT NULL DEFAULT 'draft',
    "templateSyncStatus" "TemplateSyncStatus" NOT NULL DEFAULT 'never_synced',
    "lastTemplateSyncAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhatsappAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhatsappTemplate" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "whatsappAccountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'ar',
    "bodyText" TEXT NOT NULL,
    "variables" JSONB NOT NULL DEFAULT '[]',
    "status" "WhatsappTemplateStatus" NOT NULL DEFAULT 'draft',
    "providerTemplateId" TEXT,
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhatsappTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "whatsappTemplateId" TEXT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "offerTitle" TEXT NOT NULL,
    "offerDescription" TEXT NOT NULL,
    "discountType" "DiscountType" NOT NULL,
    "discountValue" TEXT,
    "expiryRule" TEXT NOT NULL,
    "activeFrom" TIMESTAMP(3),
    "activeTo" TIMESTAMP(3),
    "consentText" TEXT NOT NULL,
    "consentTextVersion" TEXT NOT NULL DEFAULT '1',
    "dailySendingCap" INTEGER NOT NULL DEFAULT 100,
    "maxMessagesPerContact" INTEGER NOT NULL DEFAULT 3,
    "quietHoursStart" TEXT,
    "quietHoursEnd" TEXT,
    "duplicatePolicy" TEXT NOT NULL DEFAULT 'return_existing_active_voucher',
    "status" "CampaignStatus" NOT NULL DEFAULT 'draft',
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignStep" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "delayHours" INTEGER NOT NULL DEFAULT 0,
    "config" JSONB NOT NULL DEFAULT '{}',
    "position" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandingPage" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "theme" JSONB NOT NULL DEFAULT '{}',
    "trustBadges" JSONB NOT NULL DEFAULT '[]',
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LandingPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudienceContact" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneOriginal" TEXT NOT NULL,
    "phoneE164" TEXT NOT NULL,
    "email" TEXT,
    "cityOrArea" TEXT,
    "preferredLanguage" TEXT NOT NULL DEFAULT 'ar',
    "unsubscribed" BOOLEAN NOT NULL DEFAULT false,
    "unsubscribedAt" TIMESTAMP(3),
    "lastMessageAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AudienceContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignSubmission" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "audienceContactId" TEXT NOT NULL,
    "landingPageUrl" TEXT NOT NULL,
    "sourcePage" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmContent" TEXT,
    "utmTerm" TEXT,
    "adId" TEXT,
    "referrer" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "language" TEXT NOT NULL DEFAULT 'ar',
    "status" "CampaignSubmissionStatus" NOT NULL DEFAULT 'received',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsentRecord" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "audienceContactId" TEXT NOT NULL,
    "campaignSubmissionId" TEXT NOT NULL,
    "consentText" TEXT NOT NULL,
    "consentTextVersion" TEXT NOT NULL,
    "checkboxAccepted" BOOLEAN NOT NULL,
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "landingPageUrl" TEXT NOT NULL,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmContent" TEXT,
    "utmTerm" TEXT,
    "adId" TEXT,
    "language" TEXT NOT NULL DEFAULT 'ar',
    "referrer" TEXT,
    "sourcePage" TEXT,

    CONSTRAINT "ConsentRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "audienceContactId" TEXT NOT NULL,
    "campaignSubmissionId" TEXT NOT NULL,
    "consentRecordId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "offerSnapshot" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "usageLimit" INTEGER NOT NULL DEFAULT 1,
    "status" "VoucherStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoucherRedemption" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "voucherId" TEXT NOT NULL,
    "audienceContactId" TEXT NOT NULL,
    "redeemedBy" TEXT,
    "redeemedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "VoucherRedemption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneratedAsset" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "voucherId" TEXT,
    "type" "GeneratedAssetType" NOT NULL,
    "storageUrl" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeneratedAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhatsappMessage" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "whatsappAccountId" TEXT NOT NULL,
    "campaignId" TEXT,
    "audienceContactId" TEXT,
    "voucherId" TEXT,
    "templateId" TEXT,
    "providerMessageId" TEXT,
    "direction" "WhatsappMessageDirection" NOT NULL DEFAULT 'outbound',
    "status" "WhatsappMessageStatus" NOT NULL DEFAULT 'queued',
    "body" TEXT,
    "mediaUrl" TEXT,
    "failureReason" TEXT,
    "sentAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhatsappMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhatsappMessageEvent" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "whatsappMessageId" TEXT,
    "providerMessageId" TEXT,
    "eventType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WhatsappMessageEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Segment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "campaignId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Segment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SegmentRule" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "segmentId" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SegmentRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudienceTag" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AudienceTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudienceContactTag" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "audienceContactId" TEXT NOT NULL,
    "audienceTagId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AudienceContactTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnsubscribeEvent" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "audienceContactId" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "channel" TEXT NOT NULL DEFAULT 'whatsapp',
    "isGlobal" BOOLEAN NOT NULL DEFAULT false,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnsubscribeEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuspiciousAttempt" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "campaignId" TEXT,
    "ipAddress" TEXT,
    "phoneE164" TEXT,
    "reason" TEXT NOT NULL,
    "payload" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SuspiciousAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "actorId" TEXT,
    "action" "AuditAction" NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'queued',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "nextRunAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lockedAt" TIMESTAMP(3),
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_slug_key" ON "Tenant"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_agencyLeadId_key" ON "Tenant"("agencyLeadId");

-- CreateIndex
CREATE INDEX "Tenant_agencyLeadId_idx" ON "Tenant"("agencyLeadId");

-- CreateIndex
CREATE INDEX "Tenant_createdAt_idx" ON "Tenant"("createdAt");

-- CreateIndex
CREATE INDEX "TenantUser_tenantId_idx" ON "TenantUser"("tenantId");

-- CreateIndex
CREATE INDEX "TenantUser_email_idx" ON "TenantUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TenantUser_tenantId_email_key" ON "TenantUser"("tenantId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "ClientBrand_tenantId_key" ON "ClientBrand"("tenantId");

-- CreateIndex
CREATE INDEX "WhatsappAccount_tenantId_idx" ON "WhatsappAccount"("tenantId");

-- CreateIndex
CREATE INDEX "WhatsappAccount_phoneNumberId_idx" ON "WhatsappAccount"("phoneNumberId");

-- CreateIndex
CREATE INDEX "WhatsappAccount_wabaId_idx" ON "WhatsappAccount"("wabaId");

-- CreateIndex
CREATE INDEX "WhatsappAccount_status_idx" ON "WhatsappAccount"("status");

-- CreateIndex
CREATE INDEX "WhatsappTemplate_tenantId_idx" ON "WhatsappTemplate"("tenantId");

-- CreateIndex
CREATE INDEX "WhatsappTemplate_whatsappAccountId_idx" ON "WhatsappTemplate"("whatsappAccountId");

-- CreateIndex
CREATE INDEX "WhatsappTemplate_status_idx" ON "WhatsappTemplate"("status");

-- CreateIndex
CREATE UNIQUE INDEX "WhatsappTemplate_tenantId_name_language_key" ON "WhatsappTemplate"("tenantId", "name", "language");

-- CreateIndex
CREATE UNIQUE INDEX "WhatsappTemplate_tenantId_providerTemplateId_key" ON "WhatsappTemplate"("tenantId", "providerTemplateId");

-- CreateIndex
CREATE INDEX "Campaign_tenantId_idx" ON "Campaign"("tenantId");

-- CreateIndex
CREATE INDEX "Campaign_whatsappTemplateId_idx" ON "Campaign"("whatsappTemplateId");

-- CreateIndex
CREATE INDEX "Campaign_status_idx" ON "Campaign"("status");

-- CreateIndex
CREATE INDEX "Campaign_createdAt_idx" ON "Campaign"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_tenantId_slug_key" ON "Campaign"("tenantId", "slug");

-- CreateIndex
CREATE INDEX "CampaignStep_tenantId_idx" ON "CampaignStep"("tenantId");

-- CreateIndex
CREATE INDEX "CampaignStep_campaignId_idx" ON "CampaignStep"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignStep_campaignId_position_key" ON "CampaignStep"("campaignId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_campaignId_key" ON "LandingPage"("campaignId");

-- CreateIndex
CREATE INDEX "LandingPage_tenantId_idx" ON "LandingPage"("tenantId");

-- CreateIndex
CREATE INDEX "LandingPage_campaignId_idx" ON "LandingPage"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_tenantId_slug_key" ON "LandingPage"("tenantId", "slug");

-- CreateIndex
CREATE INDEX "AudienceContact_tenantId_idx" ON "AudienceContact"("tenantId");

-- CreateIndex
CREATE INDEX "AudienceContact_phoneE164_idx" ON "AudienceContact"("phoneE164");

-- CreateIndex
CREATE INDEX "AudienceContact_unsubscribed_idx" ON "AudienceContact"("unsubscribed");

-- CreateIndex
CREATE INDEX "AudienceContact_createdAt_idx" ON "AudienceContact"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "AudienceContact_tenantId_phoneE164_key" ON "AudienceContact"("tenantId", "phoneE164");

-- CreateIndex
CREATE INDEX "CampaignSubmission_tenantId_idx" ON "CampaignSubmission"("tenantId");

-- CreateIndex
CREATE INDEX "CampaignSubmission_campaignId_idx" ON "CampaignSubmission"("campaignId");

-- CreateIndex
CREATE INDEX "CampaignSubmission_audienceContactId_idx" ON "CampaignSubmission"("audienceContactId");

-- CreateIndex
CREATE INDEX "CampaignSubmission_createdAt_idx" ON "CampaignSubmission"("createdAt");

-- CreateIndex
CREATE INDEX "ConsentRecord_tenantId_idx" ON "ConsentRecord"("tenantId");

-- CreateIndex
CREATE INDEX "ConsentRecord_campaignId_idx" ON "ConsentRecord"("campaignId");

-- CreateIndex
CREATE INDEX "ConsentRecord_audienceContactId_idx" ON "ConsentRecord"("audienceContactId");

-- CreateIndex
CREATE INDEX "ConsentRecord_acceptedAt_idx" ON "ConsentRecord"("acceptedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_code_key" ON "Voucher"("code");

-- CreateIndex
CREATE INDEX "Voucher_tenantId_idx" ON "Voucher"("tenantId");

-- CreateIndex
CREATE INDEX "Voucher_campaignId_idx" ON "Voucher"("campaignId");

-- CreateIndex
CREATE INDEX "Voucher_audienceContactId_idx" ON "Voucher"("audienceContactId");

-- CreateIndex
CREATE INDEX "Voucher_code_idx" ON "Voucher"("code");

-- CreateIndex
CREATE INDEX "Voucher_status_idx" ON "Voucher"("status");

-- CreateIndex
CREATE INDEX "Voucher_createdAt_idx" ON "Voucher"("createdAt");

-- CreateIndex
CREATE INDEX "VoucherRedemption_tenantId_idx" ON "VoucherRedemption"("tenantId");

-- CreateIndex
CREATE INDEX "VoucherRedemption_voucherId_idx" ON "VoucherRedemption"("voucherId");

-- CreateIndex
CREATE INDEX "VoucherRedemption_audienceContactId_idx" ON "VoucherRedemption"("audienceContactId");

-- CreateIndex
CREATE INDEX "VoucherRedemption_redeemedAt_idx" ON "VoucherRedemption"("redeemedAt");

-- CreateIndex
CREATE INDEX "GeneratedAsset_tenantId_idx" ON "GeneratedAsset"("tenantId");

-- CreateIndex
CREATE INDEX "GeneratedAsset_voucherId_idx" ON "GeneratedAsset"("voucherId");

-- CreateIndex
CREATE INDEX "GeneratedAsset_createdAt_idx" ON "GeneratedAsset"("createdAt");

-- CreateIndex
CREATE INDEX "WhatsappMessage_tenantId_idx" ON "WhatsappMessage"("tenantId");

-- CreateIndex
CREATE INDEX "WhatsappMessage_campaignId_idx" ON "WhatsappMessage"("campaignId");

-- CreateIndex
CREATE INDEX "WhatsappMessage_audienceContactId_idx" ON "WhatsappMessage"("audienceContactId");

-- CreateIndex
CREATE INDEX "WhatsappMessage_providerMessageId_idx" ON "WhatsappMessage"("providerMessageId");

-- CreateIndex
CREATE INDEX "WhatsappMessage_status_idx" ON "WhatsappMessage"("status");

-- CreateIndex
CREATE INDEX "WhatsappMessage_createdAt_idx" ON "WhatsappMessage"("createdAt");

-- CreateIndex
CREATE INDEX "WhatsappMessageEvent_tenantId_idx" ON "WhatsappMessageEvent"("tenantId");

-- CreateIndex
CREATE INDEX "WhatsappMessageEvent_whatsappMessageId_idx" ON "WhatsappMessageEvent"("whatsappMessageId");

-- CreateIndex
CREATE INDEX "WhatsappMessageEvent_providerMessageId_idx" ON "WhatsappMessageEvent"("providerMessageId");

-- CreateIndex
CREATE INDEX "WhatsappMessageEvent_eventType_idx" ON "WhatsappMessageEvent"("eventType");

-- CreateIndex
CREATE INDEX "WhatsappMessageEvent_occurredAt_idx" ON "WhatsappMessageEvent"("occurredAt");

-- CreateIndex
CREATE INDEX "Segment_tenantId_idx" ON "Segment"("tenantId");

-- CreateIndex
CREATE INDEX "Segment_campaignId_idx" ON "Segment"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "Segment_tenantId_name_key" ON "Segment"("tenantId", "name");

-- CreateIndex
CREATE INDEX "SegmentRule_tenantId_idx" ON "SegmentRule"("tenantId");

-- CreateIndex
CREATE INDEX "SegmentRule_segmentId_idx" ON "SegmentRule"("segmentId");

-- CreateIndex
CREATE INDEX "AudienceTag_tenantId_idx" ON "AudienceTag"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "AudienceTag_tenantId_name_key" ON "AudienceTag"("tenantId", "name");

-- CreateIndex
CREATE INDEX "AudienceContactTag_tenantId_idx" ON "AudienceContactTag"("tenantId");

-- CreateIndex
CREATE INDEX "AudienceContactTag_audienceContactId_idx" ON "AudienceContactTag"("audienceContactId");

-- CreateIndex
CREATE INDEX "AudienceContactTag_audienceTagId_idx" ON "AudienceContactTag"("audienceTagId");

-- CreateIndex
CREATE UNIQUE INDEX "AudienceContactTag_audienceContactId_audienceTagId_key" ON "AudienceContactTag"("audienceContactId", "audienceTagId");

-- CreateIndex
CREATE INDEX "UnsubscribeEvent_tenantId_idx" ON "UnsubscribeEvent"("tenantId");

-- CreateIndex
CREATE INDEX "UnsubscribeEvent_audienceContactId_idx" ON "UnsubscribeEvent"("audienceContactId");

-- CreateIndex
CREATE INDEX "UnsubscribeEvent_occurredAt_idx" ON "UnsubscribeEvent"("occurredAt");

-- CreateIndex
CREATE INDEX "SuspiciousAttempt_tenantId_idx" ON "SuspiciousAttempt"("tenantId");

-- CreateIndex
CREATE INDEX "SuspiciousAttempt_campaignId_idx" ON "SuspiciousAttempt"("campaignId");

-- CreateIndex
CREATE INDEX "SuspiciousAttempt_phoneE164_idx" ON "SuspiciousAttempt"("phoneE164");

-- CreateIndex
CREATE INDEX "SuspiciousAttempt_createdAt_idx" ON "SuspiciousAttempt"("createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_tenantId_idx" ON "AuditLog"("tenantId");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "Job_tenantId_idx" ON "Job"("tenantId");

-- CreateIndex
CREATE INDEX "Job_type_idx" ON "Job"("type");

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "Job"("status");

-- CreateIndex
CREATE INDEX "Job_nextRunAt_idx" ON "Job"("nextRunAt");

-- CreateIndex
CREATE INDEX "Job_lockedAt_idx" ON "Job"("lockedAt");

-- CreateIndex
CREATE INDEX "Job_createdAt_idx" ON "Job"("createdAt");

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_agencyLeadId_fkey" FOREIGN KEY ("agencyLeadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantUser" ADD CONSTRAINT "TenantUser_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientBrand" ADD CONSTRAINT "ClientBrand_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsappAccount" ADD CONSTRAINT "WhatsappAccount_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsappTemplate" ADD CONSTRAINT "WhatsappTemplate_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsappTemplate" ADD CONSTRAINT "WhatsappTemplate_whatsappAccountId_fkey" FOREIGN KEY ("whatsappAccountId") REFERENCES "WhatsappAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_whatsappTemplateId_fkey" FOREIGN KEY ("whatsappTemplateId") REFERENCES "WhatsappTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignStep" ADD CONSTRAINT "CampaignStep_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandingPage" ADD CONSTRAINT "LandingPage_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandingPage" ADD CONSTRAINT "LandingPage_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudienceContact" ADD CONSTRAINT "AudienceContact_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignSubmission" ADD CONSTRAINT "CampaignSubmission_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignSubmission" ADD CONSTRAINT "CampaignSubmission_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignSubmission" ADD CONSTRAINT "CampaignSubmission_audienceContactId_fkey" FOREIGN KEY ("audienceContactId") REFERENCES "AudienceContact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsentRecord" ADD CONSTRAINT "ConsentRecord_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsentRecord" ADD CONSTRAINT "ConsentRecord_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsentRecord" ADD CONSTRAINT "ConsentRecord_audienceContactId_fkey" FOREIGN KEY ("audienceContactId") REFERENCES "AudienceContact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsentRecord" ADD CONSTRAINT "ConsentRecord_campaignSubmissionId_fkey" FOREIGN KEY ("campaignSubmissionId") REFERENCES "CampaignSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_audienceContactId_fkey" FOREIGN KEY ("audienceContactId") REFERENCES "AudienceContact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_campaignSubmissionId_fkey" FOREIGN KEY ("campaignSubmissionId") REFERENCES "CampaignSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_consentRecordId_fkey" FOREIGN KEY ("consentRecordId") REFERENCES "ConsentRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherRedemption" ADD CONSTRAINT "VoucherRedemption_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherRedemption" ADD CONSTRAINT "VoucherRedemption_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherRedemption" ADD CONSTRAINT "VoucherRedemption_audienceContactId_fkey" FOREIGN KEY ("audienceContactId") REFERENCES "AudienceContact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedAsset" ADD CONSTRAINT "GeneratedAsset_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedAsset" ADD CONSTRAINT "GeneratedAsset_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsappMessage" ADD CONSTRAINT "WhatsappMessage_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsappMessage" ADD CONSTRAINT "WhatsappMessage_whatsappAccountId_fkey" FOREIGN KEY ("whatsappAccountId") REFERENCES "WhatsappAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsappMessage" ADD CONSTRAINT "WhatsappMessage_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsappMessage" ADD CONSTRAINT "WhatsappMessage_audienceContactId_fkey" FOREIGN KEY ("audienceContactId") REFERENCES "AudienceContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsappMessage" ADD CONSTRAINT "WhatsappMessage_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsappMessage" ADD CONSTRAINT "WhatsappMessage_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "WhatsappTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsappMessageEvent" ADD CONSTRAINT "WhatsappMessageEvent_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsappMessageEvent" ADD CONSTRAINT "WhatsappMessageEvent_whatsappMessageId_fkey" FOREIGN KEY ("whatsappMessageId") REFERENCES "WhatsappMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Segment" ADD CONSTRAINT "Segment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Segment" ADD CONSTRAINT "Segment_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SegmentRule" ADD CONSTRAINT "SegmentRule_segmentId_fkey" FOREIGN KEY ("segmentId") REFERENCES "Segment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudienceTag" ADD CONSTRAINT "AudienceTag_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudienceContactTag" ADD CONSTRAINT "AudienceContactTag_audienceContactId_fkey" FOREIGN KEY ("audienceContactId") REFERENCES "AudienceContact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudienceContactTag" ADD CONSTRAINT "AudienceContactTag_audienceTagId_fkey" FOREIGN KEY ("audienceTagId") REFERENCES "AudienceTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnsubscribeEvent" ADD CONSTRAINT "UnsubscribeEvent_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnsubscribeEvent" ADD CONSTRAINT "UnsubscribeEvent_audienceContactId_fkey" FOREIGN KEY ("audienceContactId") REFERENCES "AudienceContact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuspiciousAttempt" ADD CONSTRAINT "SuspiciousAttempt_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
