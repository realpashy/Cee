export type WhatsappTemplateStatus =
  | "draft"
  | "submitted"
  | "approved"
  | "rejected"
  | "paused"
  | "disabled";

export function canUseTemplateForRealOutbound(status: WhatsappTemplateStatus) {
  return status === "approved";
}

export function assertTemplateCanSend(status: WhatsappTemplateStatus) {
  if (!canUseTemplateForRealOutbound(status)) {
    throw new Error("Only approved WhatsApp templates can be used for real outbound campaigns.");
  }
}
