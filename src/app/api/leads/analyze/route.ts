import { NextResponse } from "next/server";
import { generateAiLeadSummary } from "@/lib/lead-analysis";
import { checkRateLimit } from "@/lib/rate-limit";
import { leadAnalysisRequestSchema } from "@/lib/validators/lead";

function getRequestKey(request: Request) {
  return request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "local";
}

export async function POST(request: Request) {
  const rateKey = `lead-analysis:${getRequestKey(request)}`;
  if (!checkRateLimit(rateKey, 20, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many analysis requests. Please try again shortly." }, { status: 429 });
  }

  const parsed = leadAnalysisRequestSchema.parse(await request.json());
  const analysis = await generateAiLeadSummary(parsed, parsed.locale);

  return NextResponse.json({ analysis }, { status: 200 });
}
