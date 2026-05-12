import { auth } from "@/auth";
import { db } from "@/lib/db";

function toCsvCell(value: unknown) {
  const normalized =
    value === null || value === undefined
      ? ""
      : typeof value === "string"
        ? value
        : JSON.stringify(value);

  return `"${normalized.replaceAll('"', '""')}"`;
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const leads = await db.lead.findMany({
    orderBy: { createdAt: "desc" }
  });

  const headers = [
    "created_at",
    "full_name",
    "phone",
    "email",
    "business_name",
    "preferred_language",
    "business_type",
    "main_goal",
    "biggest_problem",
    "current_marketing",
    "monthly_budget",
    "timeline",
    "success_goal",
    "service_interest",
    "lead_score",
    "intent_level",
    "ai_recommended_solution",
    "status",
    "source",
    "tags"
  ];

  const rows = leads.map((lead) =>
    [
      lead.createdAt.toISOString(),
      lead.fullName,
      lead.phone,
      lead.email,
      lead.businessName,
      lead.preferredLanguage,
      lead.businessType,
      lead.mainGoal,
      lead.biggestProblem,
      lead.currentMarketing,
      lead.monthlyBudget,
      lead.timeline,
      lead.successGoal,
      lead.serviceInterest,
      lead.leadScore,
      lead.intentLevel,
      lead.aiRecommendedSolution,
      lead.status,
      lead.source,
      lead.tags
    ]
      .map(toCsvCell)
      .join(",")
  );

  return new Response([headers.join(","), ...rows].join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="cee-leads.csv"'
    }
  });
}
