import { db } from "@/lib/db";

function isMissingTableError(error: unknown) {
  return error instanceof Error && error.message.includes("does not exist in the current database");
}

export async function getWhatsappDashboardData() {
  try {
    const [
      tenantsCount,
      campaignsCount,
      audienceCount,
      vouchersCount,
      templatesByStatus,
      recentCampaigns,
      recentSubmissions
    ] = await Promise.all([
      db.tenant.count(),
      db.campaign.count(),
      db.audienceContact.count(),
      db.voucher.count(),
      db.whatsappTemplate.groupBy({
        by: ["status"],
        _count: { _all: true }
      }),
      db.campaign.findMany({
        orderBy: { createdAt: "desc" },
        take: 4,
        include: {
          tenant: {
            select: { name: true }
          }
        }
      }),
      db.campaignSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          audienceContact: {
            select: { fullName: true, phoneE164: true }
          },
          campaign: {
            select: { offerTitle: true }
          },
          tenant: {
            select: { name: true }
          }
        }
      })
    ]);

    return {
      schemaReady: true,
      tenantsCount,
      campaignsCount,
      audienceCount,
      vouchersCount,
      templatesByStatus,
      recentCampaigns,
      recentSubmissions
    };
  } catch (error) {
    if (isMissingTableError(error)) {
      return {
        schemaReady: false,
        tenantsCount: 0,
        campaignsCount: 0,
        audienceCount: 0,
        vouchersCount: 0,
        templatesByStatus: [],
        recentCampaigns: [],
        recentSubmissions: []
      };
    }

    throw error;
  }
}

export async function getWhatsappClientsData() {
  try {
    return {
      schemaReady: true,
      tenants: await db.tenant.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          brand: true,
          campaigns: {
            select: { id: true, status: true }
          },
          whatsappAccounts: {
            select: {
              id: true,
              displayName: true,
              status: true,
              provider: true
            }
          },
          _count: {
            select: {
              audienceContacts: true,
              campaigns: true,
              vouchers: true
            }
          }
        }
      })
    };
  } catch (error) {
    if (isMissingTableError(error)) {
      return { schemaReady: false, tenants: [] };
    }

    throw error;
  }
}

export async function getWhatsappCampaignsData() {
  try {
    return {
      schemaReady: true,
      campaigns: await db.campaign.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          tenant: {
            select: { name: true }
          },
          whatsappTemplate: {
            select: { name: true, status: true }
          },
          _count: {
            select: {
              submissions: true,
              vouchers: true,
              messages: true
            }
          }
        }
      })
    };
  } catch (error) {
    if (isMissingTableError(error)) {
      return { schemaReady: false, campaigns: [] };
    }

    throw error;
  }
}

export async function getWhatsappTemplatesData() {
  try {
    return {
      schemaReady: true,
      templates: await db.whatsappTemplate.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          tenant: {
            select: { name: true }
          },
          whatsappAccount: {
            select: { displayName: true }
          }
        }
      })
    };
  } catch (error) {
    if (isMissingTableError(error)) {
      return { schemaReady: false, templates: [] };
    }

    throw error;
  }
}

export async function getWhatsappComplianceData() {
  try {
    return {
      schemaReady: true,
      consentRecords: await db.consentRecord.findMany({
        orderBy: { acceptedAt: "desc" },
        take: 12,
        include: {
          tenant: {
            select: { name: true }
          },
          campaign: {
            select: { offerTitle: true }
          },
          audienceContact: {
            select: { fullName: true, phoneE164: true, unsubscribed: true }
          }
        }
      })
    };
  } catch (error) {
    if (isMissingTableError(error)) {
      return { schemaReady: false, consentRecords: [] };
    }

    throw error;
  }
}
