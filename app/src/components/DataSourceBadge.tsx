"use client";

import { Wifi, WifiOff } from "lucide-react";

interface DataSourceBadgeProps {
  source: "appfolio" | "mock" | "loading";
  error?: string | null;
}

export default function DataSourceBadge({ source, error }: DataSourceBadgeProps) {
  if (source === "loading") return null;

  if (source === "appfolio") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
        <Wifi size={12} />
        Live
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-2.5 py-1 text-xs font-medium text-warning"
      title={error || "Using demo data — AppFolio connection unavailable"}
    >
      <WifiOff size={12} />
      Demo data
    </span>
  );
}
