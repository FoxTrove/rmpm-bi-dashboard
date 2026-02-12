import type { AppFolioRentRollEntry, DashboardOverviewData, DashboardKPI } from "../appfolio/types";

function isVacant(status: string): boolean {
  return status.toLowerCase().startsWith("vacant");
}

export function transformOverview(rentRoll: AppFolioRentRollEntry[]): DashboardOverviewData {
  const totalDoors = rentRoll.length;
  const vacantUnits = rentRoll.filter((e) => isVacant(e.status)).length;
  const occupiedUnits = totalDoors - vacantUnits;
  const vacancyRate = totalDoors > 0 ? ((vacantUnits / totalDoors) * 100).toFixed(1) : "0.0";

  // Total monthly rent (parse string to number)
  const totalRent = rentRoll
    .filter((e) => !isVacant(e.status))
    .reduce((sum, e) => sum + parseFloat(e.rent || "0"), 0);

  // Renewals due within 30 days
  const now = new Date();
  const thirtyDaysOut = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const fourteenDaysOut = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  const renewalsDue30d = rentRoll.filter((e) => {
    if (!e.lease_to || isVacant(e.status)) return false;
    const leaseEnd = new Date(e.lease_to);
    return leaseEnd >= now && leaseEnd <= thirtyDaysOut;
  });

  const criticalRenewals = renewalsDue30d.filter((e) => {
    const leaseEnd = new Date(e.lease_to!);
    return leaseEnd <= fourteenDaysOut;
  }).length;

  const kpiCards: DashboardKPI[] = [
    {
      label: "Total Doors",
      value: totalDoors.toLocaleString(),
      trend: `${vacantUnits} vacant`,
      trendUp: vacantUnits === 0,
    },
    {
      label: "Vacancy Rate",
      value: `${vacancyRate}%`,
      trend: `${vacantUnits} units empty`,
      trendUp: parseFloat(vacancyRate) < 5,
    },
    {
      label: "Monthly Revenue",
      value: `$${Math.round(totalRent).toLocaleString()}`,
      trend: `${occupiedUnits} units collecting`,
      trendUp: true,
    },
    {
      label: "Renewals Due (30d)",
      value: renewalsDue30d.length.toString(),
      trend: criticalRenewals > 0 ? `${criticalRenewals} critical` : "All on track",
      trendUp: criticalRenewals === 0,
      color: criticalRenewals > 0 ? "amber" : undefined,
    },
  ];

  return { kpiCards };
}
