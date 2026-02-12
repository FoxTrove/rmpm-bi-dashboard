import type { AppFolioRentRollEntry } from "../appfolio/types";

export interface DashboardProperty {
  name: string;
  units: number;
  occupied: number;
  vacancy: string;
  rent: string;
  status: "success" | "warning";
}

export interface DashboardPortfolioData {
  properties: DashboardProperty[];
  vacancyByProperty: { name: string; vacancy: number }[];
  occupancyPie: { name: string; value: number }[];
  summaryCards: { label: string; value: string }[];
}

function formatCurrency(amount: number): string {
  if (amount >= 1000) {
    return `$${Math.round(amount).toLocaleString()}`;
  }
  return `$${amount.toLocaleString()}`;
}

export function transformPortfolio(
  rentRoll: AppFolioRentRollEntry[]
): DashboardPortfolioData {
  // Group by property_name
  const propertyMap = new Map<
    string,
    { total: number; occupied: number; totalRent: number }
  >();

  for (const entry of rentRoll) {
    const name = entry.property_name || "Unknown";
    if (!propertyMap.has(name)) {
      propertyMap.set(name, { total: 0, occupied: 0, totalRent: 0 });
    }
    const prop = propertyMap.get(name)!;
    prop.total++;
    const isOccupied =
      entry.status !== "Vacant" && entry.status !== "vacant";
    if (isOccupied) {
      prop.occupied++;
      prop.totalRent += entry.rent || 0;
    }
  }

  // Build properties array
  const properties: DashboardProperty[] = Array.from(propertyMap.entries())
    .map(([name, data]) => {
      const vacancyPct =
        data.total > 0
          ? (((data.total - data.occupied) / data.total) * 100).toFixed(1)
          : "0.0";
      return {
        name,
        units: data.total,
        occupied: data.occupied,
        vacancy: `${vacancyPct}%`,
        rent: formatCurrency(data.totalRent),
        status: (parseFloat(vacancyPct) > 7 ? "warning" : "success") as
          | "success"
          | "warning",
      };
    })
    .sort((a, b) => b.units - a.units);

  // Vacancy bar chart data — use first word of name for label
  const vacancyByProperty = properties.map((p) => ({
    name: p.name.length > 12 ? p.name.substring(0, 12) + "..." : p.name,
    vacancy: parseFloat(p.vacancy),
  }));

  // Occupancy pie
  const totalUnits = rentRoll.length;
  const occupiedUnits = rentRoll.filter(
    (e) => e.status !== "Vacant" && e.status !== "vacant"
  ).length;
  const vacantUnits = totalUnits - occupiedUnits;

  const occupancyPie = [
    { name: "Occupied", value: occupiedUnits },
    { name: "Vacant", value: vacantUnits },
  ];

  // Summary cards
  const totalMonthlyRent = rentRoll
    .filter((e) => e.status !== "Vacant" && e.status !== "vacant")
    .reduce((sum, e) => sum + (e.rent || 0), 0);
  const avgOccupancy =
    totalUnits > 0
      ? ((occupiedUnits / totalUnits) * 100).toFixed(1)
      : "0.0";

  const summaryCards = [
    { label: "Total Properties", value: properties.length.toString() },
    { label: "Total Units", value: totalUnits.toLocaleString() },
    { label: "Avg Occupancy", value: `${avgOccupancy}%` },
    { label: "Total Monthly Rent", value: formatCurrency(totalMonthlyRent) },
  ];

  return { properties, vacancyByProperty, occupancyPie, summaryCards };
}
