import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { isValidCronRequest } from "@/server/jobs/cron-auth";

export async function POST(request: Request) {
  if (!isValidCronRequest(request, env.WHATSAPP_CRON_SECRET)) {
    return NextResponse.json({ error: "Unauthorized job processor." }, { status: 401 });
  }

  const queuedJobs = await db.job.findMany({
    where: {
      status: "queued",
      nextRunAt: {
        lte: new Date()
      },
      type: {
        in: ["generate_voucher_visual", "send_whatsapp_voucher"]
      }
    },
    orderBy: { nextRunAt: "asc" },
    take: 10
  });

  return NextResponse.json({
    ok: true,
    processed: 0,
    queued: queuedJobs.length
  });
}
