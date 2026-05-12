import { revalidatePath } from "next/cache";
import Link from "next/link";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

async function updateLeadStatus(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");

  if (!id || !status) {
    return;
  }

  await db.lead.update({
    where: { id },
    data: { status: status as never }
  });

  revalidatePath("/plus");
}

export default async function AdminDashboardPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  let session;
  try {
    session = await auth();
  } catch {
    redirect("/plus/login");
  }

  if (!session?.user) {
    redirect("/plus/login");
  }

  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const intent = typeof params.intent === "string" ? params.intent : "";
  const businessType = typeof params.type === "string" ? params.type : "";
  const status = typeof params.status === "string" ? params.status : "";
  const score = typeof params.score === "string" ? params.score : "";
  const selectedLeadId = typeof params.lead === "string" ? params.lead : "";

  const where = {
    ...(query
      ? {
          OR: [
            { fullName: { contains: query, mode: "insensitive" as const } },
            { businessName: { contains: query, mode: "insensitive" as const } },
            { phone: { contains: query, mode: "insensitive" as const } },
            { email: { contains: query, mode: "insensitive" as const } }
          ]
        }
      : {}),
    ...(intent ? { intentLevel: intent } : {}),
    ...(businessType ? { businessType } : {}),
    ...(status ? { status: status as never } : {}),
    ...(score === "high"
      ? { leadScore: { gte: 75 } }
      : score === "mid"
        ? { leadScore: { gte: 45, lt: 75 } }
        : score === "low"
          ? { leadScore: { lt: 45 } }
          : {})
  };

  const leads = await db.lead.findMany({
    where,
    orderBy: [{ leadScore: "desc" }, { createdAt: "desc" }],
    take: 50
  });

  const selectedLead = leads.find((lead) => lead.id === selectedLeadId) ?? leads[0] ?? null;
  const filterTypes = Array.from(new Set((await db.lead.findMany({ select: { businessType: true } })).map((lead) => lead.businessType).filter(Boolean))) as string[];

  return (
    <main className="min-h-screen bg-[var(--brand-black)] px-4 py-10 text-[var(--brand-off-white)] md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 p-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-lime)]">
              Plus Dashboard
            </p>
            <h1 className="mt-3 text-4xl font-black">Conversational leads</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--brand-silver)]">
              View AI-qualified leads, inspect the full intake conversation, and export the pipeline cleanly.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/api/leads/export" className="btn-outline">
              Export CSV
            </a>
            <Link href="/" className="btn-primary">
              Open site
            </Link>
          </div>
        </div>

        <form className="grid gap-3 rounded-[22px] border border-white/10 bg-white/4 p-5 md:grid-cols-5">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search name, phone, email, business"
            className="rounded-[12px] border border-white/10 bg-[rgb(18_20_17)] px-4 py-3 text-sm outline-none focus:border-[var(--brand-lime)] md:col-span-2"
          />
          <select name="intent" defaultValue={intent} className="rounded-[12px] border border-white/10 bg-[rgb(18_20_17)] px-4 py-3 text-sm outline-none focus:border-[var(--brand-lime)]">
            <option value="">All intent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select name="type" defaultValue={businessType} className="rounded-[12px] border border-white/10 bg-[rgb(18_20_17)] px-4 py-3 text-sm outline-none focus:border-[var(--brand-lime)]">
            <option value="">All business types</option>
            {filterTypes.map((typeOption) => (
              <option key={typeOption} value={typeOption}>
                {typeOption}
              </option>
            ))}
          </select>
          <div className="flex gap-3">
            <select name="score" defaultValue={score} className="w-full rounded-[12px] border border-white/10 bg-[rgb(18_20_17)] px-4 py-3 text-sm outline-none focus:border-[var(--brand-lime)]">
              <option value="">All scores</option>
              <option value="high">75+</option>
              <option value="mid">45-74</option>
              <option value="low">Under 45</option>
            </select>
            <button type="submit" className="btn-primary">
              Filter
            </button>
          </div>
        </form>

        <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <section className="rounded-[24px] border border-white/10 bg-white/4 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black">Lead list</h2>
              <p className="text-sm text-[var(--brand-silver)]">{leads.length} results</p>
            </div>
            <div className="space-y-3">
              {leads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/plus?${new URLSearchParams({
                    ...(query ? { q: query } : {}),
                    ...(intent ? { intent } : {}),
                    ...(businessType ? { type: businessType } : {}),
                    ...(score ? { score } : {}),
                    lead: lead.id
                  }).toString()}`}
                  className={[
                    "block rounded-[18px] border p-4 transition",
                    selectedLead?.id === lead.id
                      ? "border-[var(--brand-lime)] bg-[linear-gradient(180deg,rgba(149,223,30,0.12),rgba(149,223,30,0.04))]"
                      : "border-white/10 bg-[rgb(17_18_16)] hover:border-white/20"
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-bold text-white">{lead.businessName}</p>
                      <p className="mt-1 text-sm text-[var(--brand-silver)]">{lead.fullName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-[var(--brand-lime)]">{lead.leadScore ?? "--"}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--brand-silver)]">{lead.intentLevel ?? "Pending"}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--brand-silver)]">
                    {lead.aiRecommendedSolution || lead.serviceInterest}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(Array.isArray(lead.tags) ? lead.tags : []).slice(0, 3).map((tag) => (
                      <span key={String(tag)} className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-bold text-[var(--brand-silver)]">
                        {String(tag)}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
              {!leads.length ? (
                <div className="rounded-[18px] border border-dashed border-white/10 p-8 text-sm text-[var(--brand-silver)]">
                  No leads match the current filters yet.
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-[24px] border border-white/10 bg-white/4 p-6">
            {selectedLead ? (
              <div className="space-y-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-lime)]">
                      Selected lead
                    </p>
                    <h2 className="mt-2 text-3xl font-black">{selectedLead.businessName}</h2>
                    <p className="mt-2 text-base leading-7 text-[var(--brand-silver)]">
                      {selectedLead.fullName} • {selectedLead.phone} • {selectedLead.email}
                    </p>
                  </div>
                  <form action={updateLeadStatus} className="flex items-center gap-3">
                    <input type="hidden" name="id" value={selectedLead.id} />
                    <select name="status" defaultValue={selectedLead.status} className="rounded-[12px] border border-white/10 bg-[rgb(18_20_17)] px-4 py-3 text-sm outline-none">
                      {["NEW", "CONTACTED", "RESEARCH_DRAFT", "PROPOSAL_IN_PROGRESS", "SENT", "WON", "LOST"].map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="btn-primary">
                      Save
                    </button>
                  </form>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-[18px] border border-white/10 bg-[rgb(18_20_17)] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-lime)]">Lead score</p>
                    <p className="mt-3 text-5xl font-black text-white">{selectedLead.leadScore ?? "--"}</p>
                    <p className="mt-2 text-sm text-[var(--brand-silver)]">{selectedLead.intentLevel ?? "Pending"}</p>
                  </div>
                  <div className="rounded-[18px] border border-white/10 bg-[rgb(18_20_17)] p-5 md:col-span-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-lime)]">Recommended direction</p>
                    <p className="mt-3 text-lg font-bold leading-8 text-white">
                      {selectedLead.aiRecommendedSolution || selectedLead.serviceInterest}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--brand-silver)]">
                      {selectedLead.aiSummary || "No AI summary stored yet."}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-[18px] border border-white/10 bg-[rgb(18_20_17)] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-lime)]">Conversation answers</p>
                    <dl className="mt-4 space-y-3 text-sm leading-7 text-[var(--brand-silver)]">
                      <div><dt className="font-bold text-white">Business type</dt><dd>{selectedLead.businessType}</dd></div>
                      <div><dt className="font-bold text-white">Main goal</dt><dd>{selectedLead.mainGoal}</dd></div>
                      <div><dt className="font-bold text-white">Biggest problem</dt><dd>{selectedLead.biggestProblem}</dd></div>
                      <div><dt className="font-bold text-white">Current marketing</dt><dd>{selectedLead.currentMarketing}</dd></div>
                      <div><dt className="font-bold text-white">Budget</dt><dd>{selectedLead.monthlyBudget}</dd></div>
                      <div><dt className="font-bold text-white">Timeline</dt><dd>{selectedLead.timeline}</dd></div>
                      <div><dt className="font-bold text-white">Success goal</dt><dd>{selectedLead.successGoal}</dd></div>
                    </dl>
                  </div>
                  <div className="rounded-[18px] border border-white/10 bg-[rgb(18_20_17)] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-lime)]">Follow-up</p>
                    <p className="mt-4 text-sm leading-7 text-[var(--brand-silver)]">
                      {selectedLead.aiSuggestedFollowUp || "No follow-up generated yet."}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {(Array.isArray(selectedLead.tags) ? selectedLead.tags : []).map((tag) => (
                        <span key={String(tag)} className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-bold text-[var(--brand-silver)]">
                          {String(tag)}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 rounded-[16px] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-[var(--brand-silver)]">
                      Preferred language: {selectedLead.preferredLanguage || "Not set"}<br />
                      Website/social: {selectedLead.websiteOrSocial || "—"}<br />
                      Source: {selectedLead.source}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-[18px] border border-dashed border-white/10 p-10 text-sm text-[var(--brand-silver)]">
                Pick a lead from the left to inspect the full AI intake.
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
