import { NextResponse } from "next/server";
import { getRentRoll, getInProgressWorkflows } from "@/lib/appfolio/client";
import { transformRenewals } from "@/lib/transformers/renewals";
import { renewalSummary, renewalStatus, renewals } from "@/lib/mock-data";
import type { ApiResponse, DashboardRenewalsData } from "@/lib/appfolio/types";

export async function GET() {
  try {
    const [rentRoll, workflows] = await Promise.all([
      getRentRoll(),
      getInProgressWorkflows(),
    ]);

    const data = transformRenewals(rentRoll, workflows);

    const response: ApiResponse<DashboardRenewalsData> = {
      data,
      source: "appfolio",
      cachedAt: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" },
    });
  } catch (err) {
    console.error("[AppFolio Renewals] Falling back to mock data:", err);

    const response: ApiResponse<DashboardRenewalsData> = {
      data: {
        renewalSummary: renewalSummary as DashboardRenewalsData["renewalSummary"],
        renewalStatus,
        renewals: renewals as DashboardRenewalsData["renewals"],
      },
      source: "mock",
      error: err instanceof Error ? err.message : "Unknown error",
    };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "no-store" },
    });
  }
}
