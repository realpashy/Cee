export type WhatsappAdminRole = "CEE_OWNER" | "CEE_ADMIN" | "CLIENT_ADMIN" | "CLIENT_VIEWER";

export type WhatsappAdminContext = {
  role: WhatsappAdminRole;
  tenantId: string | null;
};

export type TenantScopeWhere = {
  tenantId?: string;
};

export function canReadAcrossTenants(context: WhatsappAdminContext) {
  return context.role === "CEE_OWNER" || context.role === "CEE_ADMIN";
}

export function assertTenantScope(
  context: WhatsappAdminContext,
  requestedTenantId: string | null
): TenantScopeWhere {
  if (canReadAcrossTenants(context)) {
    return requestedTenantId ? { tenantId: requestedTenantId } : {};
  }

  if (!context.tenantId || requestedTenantId !== context.tenantId) {
    throw new Error("Missing or invalid tenant scope.");
  }

  return { tenantId: context.tenantId };
}

export function requireTenantScope(context: WhatsappAdminContext, requestedTenantId?: string | null) {
  const tenantId = requestedTenantId ?? context.tenantId;

  if (!tenantId) {
    throw new Error("A tenantId is required for this WhatsApp module query.");
  }

  return assertTenantScope(context, tenantId);
}
