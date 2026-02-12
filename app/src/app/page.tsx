"use client";

import KPICard from "@/components/KPICard";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import DataSourceBadge from "@/components/DataSourceBadge";
import { useAppFolioData } from "@/hooks/useAppFolioData";
import { kpiCards as mockKpiCards, activityFeed, alerts, vacancyTrend } from "@/lib/mock-data";
import type { DashboardOverviewData } from "@/lib/appfolio/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Zap,
  FileText,
  Wrench,
  Send,
  Bot,
  ArrowRight,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
  lead: Zap,
  renewal: FileText,
  maintenance: Wrench,
  report: Send,
  ai: Bot,
};

const fallback: DashboardOverviewData = { kpiCards: mockKpiCards };

export default function Overview() {
  const { data, source, error } = useAppFolioData<DashboardOverviewData>(
    "/api/appfolio/overview",
    fallback
  );

  // Merge: live KPIs replace matching labels, keep mock KPIs for items not in the live set
  const liveKPIs = data?.kpiCards || [];
  const liveLabels = new Set(liveKPIs.map((k) => k.label));
  const mergedKPIs = [
    ...liveKPIs,
    ...mockKpiCards.filter((k) => !liveLabels.has(k.label)),
  ];

  return (
    <>
      <PageHeader
        title="Overview"
        subtitle="Real Property Management of the Rockies — 10-second health check"
      />

      <div className="mb-4 flex justify-end">
        <DataSourceBadge source={source} error={error} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {mergedKPIs.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Middle row: Activity Feed + Alerts + Vacancy Trend */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Activity Feed */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm lg:col-span-1">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-3">
            {activityFeed.map((item, i) => {
              const Icon = iconMap[item.icon] || Zap;
              return (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg">
                    <Icon size={14} className="text-navy" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-text leading-snug">
                      {item.text}
                      {item.auto && (
                        <span className="ml-1.5 rounded bg-navy/10 px-1.5 py-0.5 text-[10px] font-medium text-navy">
                          AUTO
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5">{item.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Alerts & Attention */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm lg:col-span-1">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            Alerts & Attention
          </h2>
          <ul className="space-y-3">
            {alerts.map((alert, i) => (
              <li
                key={i}
                className={`rounded-lg p-3 ${
                  alert.level === "critical"
                    ? "bg-critical-light"
                    : alert.level === "warning"
                    ? "bg-warning-light"
                    : "bg-success-light"
                }`}
              >
                <div className="flex items-start gap-2">
                  <StatusBadge
                    level={alert.level as "critical" | "warning" | "success"}
                    text={
                      alert.level === "critical"
                        ? "Critical"
                        : alert.level === "warning"
                        ? "Warning"
                        : "OK"
                    }
                  />
                </div>
                <p className="mt-1.5 text-sm text-text">{alert.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Vacancy Trend Chart */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm lg:col-span-1">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            Vacancy Rate Trend
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={vacancyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#666" />
              <YAxis
                domain={[3, 7]}
                tick={{ fontSize: 12 }}
                stroke="#666"
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip formatter={(value) => [`${value}%`, "Vacancy Rate"]} />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#1E3A5F"
                strokeWidth={2.5}
                dot={{ fill: "#1E3A5F", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: "Leasing Pipeline", href: "/leasing", icon: TrendingUp },
            { label: "Owner Reports", href: "/owners", icon: FileText },
            { label: "AI Performance", href: "/ai-performance", icon: Bot },
            { label: "Team Scorecard", href: "/team", icon: Users },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="group flex items-center justify-between rounded-xl bg-card border border-border p-4 shadow-sm transition-all hover:border-navy/30 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy/10">
                    <Icon size={18} className="text-navy" />
                  </div>
                  <span className="text-sm font-medium text-text">{action.label}</span>
                </div>
                <ArrowRight
                  size={16}
                  className="text-text-secondary transition-transform group-hover:translate-x-1"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
