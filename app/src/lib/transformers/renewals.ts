import type {
  AppFolioRentRollEntry,
  AppFolioWorkflow,
  DashboardRenewalsData,
  DashboardRenewalSummary,
  DashboardRenewalStatus,
  DashboardRenewal,
} from "../appfolio/types";

function isVacant(status: string): boolean {
  return status.toLowerCase().startsWith("vacant");
}

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatCurrency(amount: number): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(amount >= 10000 ? 0 : 1)}K/mo`;
  }
  return `$${amount.toLocaleString()}/mo`;
}

type UrgencyColor = "critical" | "warning" | "success" | "neutral";

function getUrgencyBucket(days: number): { label: string; color: UrgencyColor } {
  if (days <= 14) return { label: "Critical (0-14 days)", color: "critical" };
  if (days <= 30) return { label: "Urgent (15-30 days)", color: "warning" };
  if (days <= 60) return { label: "Upcoming (31-60 days)", color: "success" };
  return { label: "Planned (61-90 days)", color: "neutral" };
}

function getRenewalStatus(
  entry: AppFolioRentRollEntry,
  workflows: AppFolioWorkflow[]
): { status: string; level: "critical" | "warning" | "success"; assignedTo: string; lastContact: string } {
  const propName = entry.property_name || "";
  const unitName = entry.unit || "";

  // Match workflow: property matches and workflow is a renewal type
  const workflow = workflows.find(
    (w) =>
      w.property === propName &&
      w.workflow_name.toLowerCase().includes("renewal")
  ) || workflows.find(
    (w) =>
      w.attachable_for === unitName &&
      w.workflow_name.toLowerCase().includes("renewal")
  );

  if (!workflow) {
    if (entry.status.includes("Notice")) {
      return { status: "Moving Out", level: "critical", assignedTo: "Unassigned", lastContact: "—" };
    }
    return { status: "No Contact", level: "critical", assignedTo: "Unassigned", lastContact: "Never" };
  }

  const stepLower = (workflow.current_step || "").toLowerCase();
  const statusLower = (workflow.status || "").toLowerCase();

  if (stepLower.includes("signed") || stepLower.includes("completed") || statusLower.includes("renewed")) {
    return {
      status: "Renewed",
      level: "success",
      assignedTo: workflow.assigned_to || "—",
      lastContact: workflow.due_date ? formatDate(workflow.due_date) : "—",
    };
  }

  if (stepLower.includes("notice") || stepLower.includes("move") || stepLower.includes("vacate")) {
    return {
      status: "Moving Out",
      level: "critical",
      assignedTo: workflow.assigned_to || "—",
      lastContact: workflow.due_date ? formatDate(workflow.due_date) : "—",
    };
  }

  return {
    status: "Negotiating",
    level: "warning",
    assignedTo: workflow.assigned_to || "—",
    lastContact: workflow.due_date ? formatDate(workflow.due_date) : "—",
  };
}

export function transformRenewals(
  rentRoll: AppFolioRentRollEntry[],
  workflows: AppFolioWorkflow[]
): DashboardRenewalsData {
  const now = new Date();
  const ninetyDaysOut = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

  const expiringLeases = rentRoll.filter((entry) => {
    if (!entry.lease_to || isVacant(entry.status)) return false;
    const leaseEnd = new Date(entry.lease_to);
    return leaseEnd >= now && leaseEnd <= ninetyDaysOut;
  });

  const buckets: Record<string, { count: number; revenue: number; color: UrgencyColor; label: string }> = {
    "Critical (0-14 days)": { count: 0, revenue: 0, color: "critical", label: "Critical (0-14 days)" },
    "Urgent (15-30 days)": { count: 0, revenue: 0, color: "warning", label: "Urgent (15-30 days)" },
    "Upcoming (31-60 days)": { count: 0, revenue: 0, color: "success", label: "Upcoming (31-60 days)" },
    "Planned (61-90 days)": { count: 0, revenue: 0, color: "neutral", label: "Planned (61-90 days)" },
  };

  for (const entry of expiringLeases) {
    const days = daysUntil(entry.lease_to!);
    const bucket = getUrgencyBucket(days);
    buckets[bucket.label].count++;
    buckets[bucket.label].revenue += parseFloat(entry.rent || "0");
  }

  const renewalSummary: DashboardRenewalSummary[] = Object.values(buckets).map((b) => ({
    label: b.label,
    count: b.count,
    revenue: b.count > 0 && (b.color === "critical" || b.color === "warning")
      ? formatCurrency(b.revenue)
      : "",
    color: b.color,
  }));

  const statusCounts: Record<string, number> = {
    Renewed: 0,
    Negotiating: 0,
    "No Contact": 0,
    "Moving Out": 0,
  };

  const renewalDetails: DashboardRenewal[] = expiringLeases
    .map((entry) => {
      const { status, level, assignedTo, lastContact } = getRenewalStatus(entry, workflows);
      if (statusCounts[status] !== undefined) statusCounts[status]++;
      const days = daysUntil(entry.lease_to!);
      const urgency = getUrgencyBucket(days).color;
      return {
        property: entry.property_name || "Unknown",
        unit: entry.unit || "—",
        tenant: entry.tenant || "—",
        leaseEnds: formatDate(entry.lease_to!),
        status,
        level,
        urgency,
        assignedTo,
        lastContact,
      };
    })
    .sort((a, b) => {
      const urgencyOrder = { critical: 0, warning: 1, success: 2, neutral: 3 };
      return (urgencyOrder[a.urgency] ?? 3) - (urgencyOrder[b.urgency] ?? 3);
    });

  const totalWithStatus = Object.values(statusCounts).reduce((a, b) => a + b, 0);
  const renewalStatus: DashboardRenewalStatus[] = [
    { label: "Renewed", count: statusCounts["Renewed"], pct: 0 },
    { label: "In Negotiation", count: statusCounts["Negotiating"], pct: 0 },
    { label: "No Contact Yet", count: statusCounts["No Contact"], pct: 0 },
    { label: "Moving Out", count: statusCounts["Moving Out"], pct: 0 },
  ].map((s) => ({
    ...s,
    pct: totalWithStatus > 0 ? Math.round((s.count / totalWithStatus) * 100) : 0,
  }));

  return { renewalSummary, renewalStatus, renewals: renewalDetails };
}
