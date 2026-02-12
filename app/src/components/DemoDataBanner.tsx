"use client";

import { FlaskConical } from "lucide-react";

export default function DemoDataBanner() {
  return (
    <div className="mb-4 flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/5 px-4 py-2.5">
      <FlaskConical size={16} className="text-warning shrink-0" />
      <p className="text-xs font-medium text-warning">
        Demo Data — This page displays sample data for preview purposes. Live integration coming soon.
      </p>
    </div>
  );
}
