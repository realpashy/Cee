"use client";

import { IntakeFlow } from "@/components/intake/intake-flow";
import type { SiteMessages } from "@/lib/i18n";

export function EligibilityFlow({ messages }: { messages: SiteMessages }) {
  return <IntakeFlow messages={messages} />;
}
