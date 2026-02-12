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

function isVacant(status: string): boolean {
  return status.toLowerCase().startsWith("vacant");
}

function formatCurrency(amount: number): string {
  return `$${Math.round(amount).toLocaleString()}`;
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
    if (!isVacant(entry.status)) {
      prop.occupied++;
      prop.totalRent += parseFloat(entry.rent || "0");
    }
  }

  // Build properties array — only show multi-unit properties (2+ units) for readability
  const allProperties: DashboardProperty[] = Array.from(propertyMap.entries())
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

  // For the table: show properties with 2+ units (avoids showing 1000+ single-unit homes)
  const properties = allProperties.filter((p) => p.units >= 2);

  // Vacancy bar chart — top 15 multi-unit properties by unit count
  const vacancyByProperty = properties.slice(0, 15).map((p) => ({
    name: p.name.length > 15 ? p.name.substring(0, 15) + "..." : p.name,
    vacancy: parseFloat(p.vacancy),
  }));

  // Occupancy pie — total across ALL units
  const totalUnits = rentRoll.length;
  const occupiedUnits = rentRoll.filter((e) => !isVacant(e.status)).length;
  const vacantUnits = totalUnits - occupiedUnits;

  const occupancyPie = [
    { name: "Occupied", value: occupiedUnits },
    { name: "Vacant", value: vacantUnits },
  ];

  // Summary cards
  const totalMonthlyRent = rentRoll
    .filter((e) => !isVacant(e.status))
    .reduce((sum, e) => sum + parseFloat(e.rent || "0"), 0);
  const avgOccupancy =
    totalUnits > 0
      ? ((occupiedUnits / totalUnits) * 100).toFixed(1)
      : "0.0";

  // Count distinct properties (including single-unit)
  const totalPropertyCount = propertyMap.size;

  const summaryCards = [
    { label: "Total Properties", value: totalPropertyCount.toLocaleString() },
    { label: "Total Units", value: totalUnits.toLocaleString() },
    { label: "Avg Occupancy", value: `${avgOccupancy}%` },
    { label: "Total Monthly Rent", value: formatCurrency(totalMonthlyRent) },
  ];

  return { properties, vacancyByProperty, occupancyPie, summaryCards };
}
