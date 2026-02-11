import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  progress?: number;
  color?: string;
}

export default function KPICard({ label, value, trend, trendUp, progress }: KPICardProps) {
  return (
    <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
      <p className="text-sm font-medium text-text-secondary">{label}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-text">{value}</p>
      <div className="mt-2 flex items-center gap-1.5">
        {trendUp ? (
          <ArrowUpRight size={14} className="text-success" />
        ) : (
          <ArrowDownRight size={14} className="text-critical" />
        )}
        <span className={`text-xs font-medium ${trendUp ? "text-success" : "text-critical"}`}>
          {trend}
        </span>
      </div>
      {progress !== undefined && (
        <div className="mt-3">
          <div className="h-2 w-full rounded-full bg-bg">
            <div
              className="h-2 rounded-full bg-success transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
