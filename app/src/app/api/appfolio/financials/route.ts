import { NextResponse } from "next/server";
import { getRentRoll } from "@/lib/appfolio/client";
import { transformFinancials } from "@/lib/transformers/financials";
import type { DashboardFinancialsData, ApiResponse } from "@/lib/appfolio/types";

// Static fallback data
const mockFallback: DashboardFinancialsData = {
  financialSummary: {
    totalRevenue: "$467,750",
    totalExpenses: "$312,400",
    noi: "$155,350",
    noiMargin: "33.2%",
    collectionRate: "97.3%",
    outstandingBalance: "$12,640",
    avgRentPerUnit: "$1,425",
    yoyRevenueGrowth: "+6.2%",
  },
  revenueByMonth: [
    { month: "Sep", revenue: 442000, expenses: 298000, noi: 144000 },
    { month: "Oct", revenue: 448000, expenses: 302000, noi: 146000 },
    { month: "Nov", revenue: 451000, expenses: 305000, noi: 146000 },
    { month: "Dec", revenue: 455000, expenses: 308000, noi: 147000 },
    { month: "Jan", revenue: 461000, expenses: 310000, noi: 151000 },
    { month: "Feb", revenue: 467750, expenses: 312400, noi: 155350 },
  ],
  propertyFinancials: [
    { property: "Willow Park", units: 64, revenue: "$99,200", expenses: "$61,400", noi: "$37,800", margin: "38.1%", collection: "98.4%" },
    { property: "Cedar Heights", units: 56, revenue: "$86,400", expenses: "$55,200", noi: "$31,200", margin: "36.1%", collection: "97.8%" },
    { property: "Oak Apartments", units: 48, revenue: "$72,450", expenses: "$48,300", noi: "$24,150", margin: "33.3%", collection: "96.9%" },
    { property: "Elm Ridge", units: 40, revenue: "$55,500", expenses: "$39,800", noi: "$15,700", margin: "28.3%", collection: "94.2%" },
  ],
  rentCollectionStatus: [
    { label: "Paid in Full", count: 789, pct: 93.2 },
    { label: "Partial Payment", count: 22, pct: 2.6 },
    { label: "Past Due (1-30d)", count: 28, pct: 3.3 },
    { label: "Past Due (30+d)", count: 8, pct: 0.9 },
  ],
  expenseBreakdown: [
    { category: "Maintenance & Repairs", amount: 89400, pct: 28.6 },
    { category: "Property Taxes", amount: 62480, pct: 20.0 },
    { category: "Insurance", amount: 46860, pct: 15.0 },
    { category: "Utilities", amount: 37490, pct: 12.0 },
    { category: "Management Fees", amount: 34370, pct: 11.0 },
    { category: "Landscaping", amount: 21800, pct: 7.0 },
    { category: "Other", amount: 20000, pct: 6.4 },
  ],
};

export async function GET() {
  try {
    const rentRoll = await getRentRoll();
    const data = transformFinancials(rentRoll);

    const response: ApiResponse<DashboardFinancialsData> = {
      data,
      source: "appfolio",
      cachedAt: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" },
    });
  } catch (err) {
    console.error("[AppFolio Financials] Falling back to mock data:", err);

    const response: ApiResponse<DashboardFinancialsData> = {
      data: mockFallback,
      source: "mock",
      error: err instanceof Error ? err.message : "Unknown error",
    };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "no-store" },
    });
  }
}
