import type {
  AppFolioProspectSource,
  AppFolioRentalApplication,
  DashboardLeasingData,
  DashboardLeasingFunnel,
  DashboardLeadSource,
  DashboardActiveLead,
  DashboardLeadsOverTime,
} from "../appfolio/types";

function getWeekLabel(date: Date): string {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const weekNum = Math.ceil(
    ((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24) + startOfYear.getDay() + 1) / 7
  );
  return `W${weekNum}`;
}

export function transformLeasing(
  prospectSources: AppFolioProspectSource[],
  applications: AppFolioRentalApplication[]
): DashboardLeasingData {
  // --- Funnel from prospect source data ---
  const totals = prospectSources.reduce(
    (acc, src) => ({
      inquiries: acc.inquiries + (src.inquiries || 0),
      showings: acc.showings + (src.showings || 0),
      applications: acc.applications + (src.applications || 0),
      moveIns: acc.moveIns + (src.move_ins || 0),
    }),
    { inquiries: 0, showings: 0, applications: 0, moveIns: 0 }
  );

  // Approved is estimated between applications and move-ins
  const approved = Math.round((totals.applications + totals.moveIns) / 2);
  const maxCount = Math.max(totals.inquiries, 1);

  const leasingFunnel: DashboardLeasingFunnel[] = [
    { stage: "Inquiries", count: totals.inquiries, pct: 100, weekDelta: 0 },
    {
      stage: "Showings",
      count: totals.showings,
      pct: Math.round((totals.showings / maxCount) * 100),
      weekDelta: 0,
    },
    {
      stage: "Applications",
      count: totals.applications,
      pct: Math.round((totals.applications / maxCount) * 100),
      weekDelta: 0,
    },
    {
      stage: "Approved",
      count: approved,
      pct: Math.round((approved / maxCount) * 100),
      weekDelta: 0,
    },
    {
      stage: "Leased",
      count: totals.moveIns,
      pct: Math.round((totals.moveIns / maxCount) * 100),
      weekDelta: 0,
    },
  ];

  // --- Lead source table ---
  const leadSources: DashboardLeadSource[] = prospectSources
    .filter((src) => src.inquiries > 0)
    .map((src) => ({
      source: src.source,
      leads: src.inquiries,
      conversion: src.conversion_rate || (src.move_ins > 0 && src.inquiries > 0
        ? Math.round((src.move_ins / src.inquiries) * 1000) / 10
        : 0),
      responseTime: "—",
    }))
    .sort((a, b) => b.leads - a.leads)
    .slice(0, 10);

  // --- Active leads from recent applications ---
  const activeLeads: DashboardActiveLead[] = applications
    .filter((app) => app.status === "Pending" || app.status === "Approved")
    .map((app) => {
      const isUrgent = app.status === "Pending" && daysSince(app.applied_at) > 2;
      return {
        property: app.property_name,
        name: app.applicant_name,
        source: app.source || "—",
        status: app.status === "Approved" ? "Approved" : "Application Pending",
        responseTime: "—",
        assignedTo: "—",
        nextAction: app.status === "Approved" ? "Lease signing" : isUrgent ? "URGENT — Review" : "Review application",
        urgent: isUrgent,
      };
    })
    .sort((a, b) => (a.urgent === b.urgent ? 0 : a.urgent ? -1 : 1))
    .slice(0, 20);

  // --- Leads over time (aggregate by week from application dates) ---
  const weekMap = new Map<string, DashboardLeadsOverTime>();
  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

  for (const app of applications) {
    const appDate = new Date(app.applied_at);
    if (appDate < fourWeeksAgo) continue;
    const weekLabel = getWeekLabel(appDate);
    if (!weekMap.has(weekLabel)) {
      weekMap.set(weekLabel, { week: weekLabel, inquiries: 0, showings: 0, applications: 0, leased: 0 });
    }
    const week = weekMap.get(weekLabel)!;
    week.applications++;
    if (app.status === "Approved") week.leased++;
  }

  const leadsOverTime: DashboardLeadsOverTime[] = Array.from(weekMap.values()).sort((a, b) =>
    a.week.localeCompare(b.week)
  );

  // If we don't have enough weekly data, fill with the funnel totals as a single entry
  if (leadsOverTime.length === 0) {
    leadsOverTime.push({
      week: "Current",
      inquiries: totals.inquiries,
      showings: totals.showings,
      applications: totals.applications,
      leased: totals.moveIns,
    });
  }

  return { leasingFunnel, leadSources, activeLeads, leadsOverTime };
}

function daysSince(dateStr: string): number {
  const d = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}
