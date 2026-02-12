import { NextResponse } from "next/server";
import { checkHealth } from "@/lib/appfolio/client";

export async function GET() {
  const result = await checkHealth();
  return NextResponse.json(result, {
    status: result.ok ? 200 : 503,
    headers: { "Cache-Control": "no-store" },
  });
}
