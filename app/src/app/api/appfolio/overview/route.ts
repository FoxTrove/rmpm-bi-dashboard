import { NextResponse } from "next/server";
import { getRentRoll } from "@/lib/appfolio/client";
import { transformOverview } from "@/lib/transformers/overview";
import { kpiCards } from "@/lib/mock-data";
import type { ApiResponse, DashboardOverviewData } from "@/lib/appfolio/types";

export async function GET() {
  try {
    const rentRoll = await getRentRoll();
    const data = transformOverview(rentRoll);

    const response: ApiResponse<DashboardOverviewData> = {
      data,
      source: "appfolio",
      cachedAt: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" },
    });
  } catch (err) {
    console.error("[AppFolio Overview] Falling back to mock data:", err);

    const response: ApiResponse<DashboardOverviewData> = {
      data: { kpiCards },
      source: "mock",
      error: err instanceof Error ? err.message : "Unknown error",
    };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "no-store" },
    });
  }
}
