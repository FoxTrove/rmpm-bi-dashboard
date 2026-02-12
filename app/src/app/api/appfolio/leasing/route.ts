import { NextResponse } from "next/server";
import { getProspectSourceTracking, getRentalApplications } from "@/lib/appfolio/client";
import { transformLeasing } from "@/lib/transformers/leasing";
import { leasingFunnel, leadSources, activeLeads, leadsOverTime } from "@/lib/mock-data";
import type { ApiResponse, DashboardLeasingData } from "@/lib/appfolio/types";

export async function GET() {
  try {
    const [prospectSources, applications] = await Promise.all([
      getProspectSourceTracking(),
      getRentalApplications(),
    ]);

    const data = transformLeasing(prospectSources, applications);

    const response: ApiResponse<DashboardLeasingData> = {
      data,
      source: "appfolio",
      cachedAt: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" },
    });
  } catch (err) {
    console.error("[AppFolio Leasing] Falling back to mock data:", err);

    const response: ApiResponse<DashboardLeasingData> = {
      data: { leasingFunnel, leadSources, activeLeads, leadsOverTime },
      source: "mock",
      error: err instanceof Error ? err.message : "Unknown error",
    };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "no-store" },
    });
  }
}
