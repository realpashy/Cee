import { env } from "@/lib/env";
import type { AiLeadSummary, IntakeAnswers } from "@/lib/validators/lead";

function inferIntentLevel(score: number): AiLeadSummary["intentLevel"] {
  if (score >= 76) {
    return "High";
  }

  if (score >= 46) {
    return "Medium";
  }

  return "Low";
}

function scoreLead(answers: IntakeAnswers) {
  const budgetWeights: Record<string, number> = {
    "Under ₪2,000": 8,
    "₪2,000–₪5,000": 18,
    "₪5,000–₪10,000": 28,
    "₪10,000–₪25,000": 34,
    "₪25,000+": 40,
    "Not sure yet": 12
  };

  const timelineWeights: Record<string, number> = {
    Immediately: 26,
    "This month": 22,
    "Within 1–3 months": 14,
    "Just exploring": 7
  };

  const goalWeights: Record<string, number> = {
    "Get more leads": 14,
    "Increase online sales": 16,
    "Create better ads and videos": 13,
    "Improve my website / landing page": 12,
    "Automate my sales or follow-up process": 15,
    "Build a full growth system": 18,
    "Not sure yet": 9
  };

  const businessWeights: Record<string, number> = {
    "Local business / physical store": 10,
    "Ecommerce store": 16,
    "Service provider": 12,
    "Real estate / construction": 14,
    "Restaurant / food brand": 11,
    "Personal brand / creator": 10,
    "Startup / SaaS": 15,
    Other: 9
  };

  const score =
    (budgetWeights[answers.monthlyBudget] ?? 10) +
    (timelineWeights[answers.timeline] ?? 9) +
    (goalWeights[answers.mainGoal] ?? 10) +
    (businessWeights[answers.businessType] ?? 10);

  return Math.max(24, Math.min(96, score));
}

function buildFallbackSummary(
  answers: IntakeAnswers,
  locale: "en" | "he" | "ar"
): AiLeadSummary {
  const score = scoreLead(answers);
  const intentLevel = inferIntentLevel(score);
  const marketingText = answers.currentMarketing.join(", ");

  const solutionParts: string[] = [];

  if (answers.mainGoal.includes("ads") || answers.biggestProblem.includes("profitable")) {
    solutionParts.push("AI-powered video ads");
  }
  if (answers.mainGoal.includes("website") || answers.biggestProblem.includes("sales")) {
    solutionParts.push("landing page optimization");
  }
  if (answers.mainGoal.includes("Automate") || answers.biggestProblem.includes("manually")) {
    solutionParts.push("follow-up automation");
  }
  if (answers.mainGoal.includes("Build a full growth system")) {
    solutionParts.push("full growth system strategy");
  }

  if (!solutionParts.length) {
    solutionParts.push("creative strategy", "conversion-focused funnel improvements");
  }

  const recommendedService =
    answers.mainGoal === "Build a full growth system"
      ? "Monthly Partner"
      : answers.mainGoal === "Create better ads and videos" || answers.mainGoal === "Increase online sales"
        ? "Growth Engine"
        : "Creative Launch";

  return {
    leadScore: score,
    intentLevel,
    businessType: answers.businessType,
    mainGoal: answers.mainGoal,
    biggestChallenge: answers.biggestProblem,
    recommendedSolution: solutionParts.join(" + "),
    recommendedService,
    summary:
      locale === "he"
        ? `העסק פועל כ-${answers.businessType} ומתמקד כרגע ב-${answers.mainGoal.toLowerCase()}, עם חסם מרכזי של ${answers.biggestProblem.toLowerCase()}. נראית כאן רמת עניין ${intentLevel === "High" ? "גבוהה" : intentLevel === "Medium" ? "בינונית" : "ראשונית"} והתאמה טובה ל-${recommendedService}.`
        : locale === "ar"
          ? `هذا النشاط من نوع ${answers.businessType} ويركز حاليًا على ${answers.mainGoal.toLowerCase()}، مع تحدٍ أساسي يتمثل في ${answers.biggestProblem.toLowerCase()}. هناك مستوى اهتمام ${intentLevel === "High" ? "مرتفع" : intentLevel === "Medium" ? "متوسط" : "أولي"} وملاءمة جيدة لخدمة ${recommendedService}.`
          : `${answers.businessType} lead focused on ${answers.mainGoal.toLowerCase()} and currently blocked by ${answers.biggestProblem.toLowerCase()}. The case shows ${intentLevel.toLowerCase()} intent with a likely fit for ${recommendedService}.`,
    suggestedFollowUp:
      locale === "he"
        ? `היי {{name}}, תודה שמילאתם את ה-AI Intake של Cee+. לפי התשובות שלכם יש כאן הזדמנות חזקה סביב ${solutionParts.join(", ")}. אם תרצו, נוכל לעבור יחד על הצעד הבא בשיחת Growth Review קצרה.`
        : locale === "ar"
          ? `مرحبًا {{name}}، شكرًا لإكمال AI Intake من Cee+. بناءً على إجاباتك نرى فرصة قوية حول ${solutionParts.join(", ")}. إذا رغبت، يمكننا مراجعة الخطوة التالية معًا في مكالمة Growth Review سريعة.`
          : `Hi {{name}}, thanks for completing the Cee+ AI intake. Based on your answers, we see a strong opportunity around ${solutionParts.join(", ")}. If you want, we can walk you through the best next move in a quick growth review.`,
    tags: [
      intentLevel === "High" ? "Hot Lead" : intentLevel === "Medium" ? "Warm Lead" : "Early Lead",
      answers.businessType,
      answers.mainGoal,
      marketingText
    ]
  };
}

export async function generateAiLeadSummary(
  answers: IntakeAnswers,
  locale: "en" | "he" | "ar"
): Promise<AiLeadSummary> {
  if (!env.OPENAI_API_KEY) {
    return buildFallbackSummary(answers, locale);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text:
                  "You are Cee+ Jules, a premium growth intake analyst for an AI-driven agency. Analyze lead answers conservatively. Do not promise results. Return only valid JSON matching the requested schema."
              }
            ]
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: JSON.stringify({ locale, answers })
              }
            ]
          }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "cee_lead_summary",
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                leadScore: { type: "integer", minimum: 1, maximum: 100 },
                intentLevel: { type: "string", enum: ["Low", "Medium", "High"] },
                businessType: { type: "string" },
                mainGoal: { type: "string" },
                biggestChallenge: { type: "string" },
                recommendedSolution: { type: "string" },
                recommendedService: { type: "string" },
                summary: { type: "string" },
                suggestedFollowUp: { type: "string" },
                tags: {
                  type: "array",
                  items: { type: "string" },
                  minItems: 1
                }
              },
              required: [
                "leadScore",
                "intentLevel",
                "businessType",
                "mainGoal",
                "biggestChallenge",
                "recommendedSolution",
                "recommendedService",
                "summary",
                "suggestedFollowUp",
                "tags"
              ]
            }
          }
        }
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI analysis failed with ${response.status}`);
    }

    const payload = (await response.json()) as { output_text?: string };
    const parsed = JSON.parse(payload.output_text ?? "{}") as AiLeadSummary;
    return {
      ...buildFallbackSummary(answers, locale),
      ...parsed
    };
  } catch {
    return buildFallbackSummary(answers, locale);
  }
}
