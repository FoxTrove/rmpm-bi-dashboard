import { NextResponse } from "next/server";
import { getRentRoll, getInProgressWorkflows, getProspectSourceTracking, getRentalApplications } from "@/lib/appfolio/client";
import { generateBriefing } from "@/lib/briefing/generate";
import type { BriefingData } from "@/lib/briefing/generate";
import type { ApiResponse } from "@/lib/appfolio/types";

// --- 4-hour server-side cache ---
let cachedBriefing: { data: BriefingData; timestamp: number } | null = null;
const CACHE_TTL_MS = 4 * 60 * 60 * 1000;

// --- Static fallback ---
const fallbackBriefing: BriefingData = {
  greeting:
    "Good morning, Jarid. Your portfolio is performing well. Occupancy is strong and the team is on track. There are a few items that need your attention and some wins worth celebrating.",
  attentionItems: [
    {
      level: "critical",
      category: "Leasing",
      title: "3 leads waiting for response",
      detail:
        "Multiple leads have gone over 2 hours without a response. Assign or follow up to avoid losing potential tenants.",
    },
    {
      level: "warning",
      category: "Renewals",
      title: "Lease expiring with no contact",
      detail:
        "At least one unit has a lease expiring within 7 days and zero outreach has been made. Revenue is at risk.",
    },
  ],
  wins: [
    {
      title: "Vacancy rate trending down",
      detail:
        "Your vacancy rate is below the market average. The leasing team has been closing well this month.",
    },
    {
      title: "Strong rent collection",
      detail: "Collections are on pace for target this month. Keep the momentum going.",
    },
  ],
  teamFocus: [
    {
      person: "Leasing Team",
      priority: "critical",
      tasks: [
        "Respond to unassigned leads immediately",
        "Follow up on pending applications",
      ],
    },
    {
      person: "Renewals Team",
      priority: "warning",
      tasks: [
        "Contact tenants with upcoming lease expirations",
        "Prepare renewal offers for negotiation",
      ],
    },
  ],
  snapshot: [
    { label: "Occupancy", value: "95.8%", sub: "Above market average", good: true },
    { label: "Vacancy Rate", value: "4.2%", sub: "Trending down", good: true },
    { label: "Active Leads", value: "—", sub: "Check leasing pipeline", good: true },
    { label: "Renewals Due (30d)", value: "—", sub: "Review renewals center", good: false },
    { label: "Avg Response Time", value: "—", sub: "Target: <15 min", good: true },
  ],
};

export async function GET() {
  // Check cache
  if (cachedBriefing && Date.now() - cachedBriefing.timestamp < CACHE_TTL_MS) {
    const response: ApiResponse<BriefingData> = {
      data: cachedBriefing.data,
      source: "appfolio",
      cachedAt: new Date(cachedBriefing.timestamp).toISOString(),
    };
    return NextResponse.json(response, {
      headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=300" },
    });
  }

  try {
    // Fetch AppFolio data in parallel
    const [rentRoll, workflows, prospectSources, applications] = await Promise.all([
      getRentRoll(),
      getInProgressWorkflows(),
      getProspectSourceTracking(),
      getRentalApplications(),
    ]);

    // Build portfolio snapshot for AI
    const isVacant = (status: string) => status.toLowerCase().startsWith("vacant");
    const totalUnits = rentRoll.length;
    const vacantUnits = rentRoll.filter((e) => isVacant(e.status)).length;
    const occupiedUnits = totalUnits - vacantUnits;
    const vacancyRate = totalUnits > 0 ? ((vacantUnits / totalUnits) * 100).toFixed(1) : "0.0";
    const totalMonthlyRent = rentRoll
      .filter((e) => !isVacant(e.status))
      .reduce((sum, e) => sum + parseFloat(e.rent || "0"), 0);

    // Group by property to find high-vacancy ones
    const propMap = new Map<string, { total: number; vacant: number }>();
    for (const entry of rentRoll) {
      const name = entry.property_name || "Unknown";
      if (!propMap.has(name)) propMap.set(name, { total: 0, vacant: 0 });
      const p = propMap.get(name)!;
      p.total++;
      if (isVacant(entry.status)) p.vacant++;
    }
    const propertiesWithHighVacancy = Array.from(propMap.entries())
      .filter(([, d]) => d.total > 1 && d.total > 0 && (d.vacant / d.total) * 100 > 7)
      .map(([name]) => name);

    // Renewals
    const now = new Date();
    const fourteenDays = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const renewals30d = rentRoll.filter((e) => {
      if (!e.lease_to || isVacant(e.status)) return false;
      const end = new Date(e.lease_to);
      return end >= now && end <= thirtyDays;
    });
    const criticalRenewals = renewals30d.filter((e) => new Date(e.lease_to!) <= fourteenDays).length;
    const urgentRenewals = renewals30d.length - criticalRenewals;

    // Active leads — real statuses: New, Decision Pending, Approved, Converting
    const activeLeads = applications.filter(
      (a) => ["New", "Decision Pending", "Approved", "Converting"].includes(a.status)
    ).length;

    // Top sources — real field: guest_card_inquiries
    const topLeadSources = prospectSources
      .filter((s) => s.guest_card_inquiries > 0)
      .sort((a, b) => b.guest_card_inquiries - a.guest_card_inquiries)
      .slice(0, 3)
      .map((s) => s.source);

    const briefingData = await generateBriefing({
      totalProperties: propMap.size,
      totalUnits,
      occupiedUnits,
      vacantUnits,
      vacancyRate,
      totalMonthlyRent,
      criticalRenewals,
      urgentRenewals,
      totalRenewals30d: renewals30d.length,
      activeLeads,
      propertiesWithHighVacancy,
      topLeadSources,
    });

    // Cache the result
    cachedBriefing = { data: briefingData, timestamp: Date.now() };

    const response: ApiResponse<BriefingData> = {
      data: briefingData,
      source: "appfolio",
      cachedAt: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=300" },
    });
  } catch (err) {
    console.error("[Briefing] Falling back to static content:", err);

    const response: ApiResponse<BriefingData> = {
      data: fallbackBriefing,
      source: "mock",
      error: err instanceof Error ? err.message : "Unknown error",
    };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "no-store" },
    });
  }
}
