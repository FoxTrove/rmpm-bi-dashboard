import { NextResponse } from "next/server";
import { getRentRoll } from "@/lib/appfolio/client";
import { transformPortfolio } from "@/lib/transformers/portfolio";
import type { DashboardPortfolioData } from "@/lib/transformers/portfolio";
import type { ApiResponse } from "@/lib/appfolio/types";

// Static fallback data
const mockProperties = [
  { name: "Oak Apartments", units: 48, occupied: 46, vacancy: "4.2%", rent: "$72,450", status: "success" as const },
  { name: "Pine Court", units: 32, occupied: 31, vacancy: "3.1%", rent: "$49,200", status: "success" as const },
  { name: "Maple Ridge", units: 24, occupied: 22, vacancy: "8.3%", rent: "$33,000", status: "warning" as const },
  { name: "Cedar Heights", units: 56, occupied: 54, vacancy: "3.6%", rent: "$86,400", status: "success" as const },
  { name: "Birch Terrace", units: 18, occupied: 18, vacancy: "0%", rent: "$28,800", status: "success" as const },
  { name: "Elm Ridge", units: 40, occupied: 37, vacancy: "7.5%", rent: "$55,500", status: "warning" as const },
  { name: "Spruce Commons", units: 28, occupied: 27, vacancy: "3.6%", rent: "$43,200", status: "success" as const },
  { name: "Willow Park", units: 64, occupied: 62, vacancy: "3.1%", rent: "$99,200", status: "success" as const },
];

const mockFallback: DashboardPortfolioData = {
  properties: mockProperties,
  vacancyByProperty: mockProperties.map((p) => ({
    name: p.name.split(" ")[0],
    vacancy: parseFloat(p.vacancy),
  })),
  occupancyPie: [
    { name: "Occupied", value: 297 },
    { name: "Vacant", value: 13 },
  ],
  summaryCards: [
    { label: "Total Properties", value: "8" },
    { label: "Total Units", value: "310" },
    { label: "Avg Occupancy", value: "95.8%" },
    { label: "Total Monthly Rent", value: "$467,750" },
  ],
};

export async function GET() {
  try {
    const rentRoll = await getRentRoll();
    const data = transformPortfolio(rentRoll);

    const response: ApiResponse<DashboardPortfolioData> = {
      data,
      source: "appfolio",
      cachedAt: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" },
    });
  } catch (err) {
    console.error("[AppFolio Portfolio] Falling back to mock data:", err);

    const response: ApiResponse<DashboardPortfolioData> = {
      data: mockFallback,
      source: "mock",
      error: err instanceof Error ? err.message : "Unknown error",
    };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "no-store" },
    });
  }
}
