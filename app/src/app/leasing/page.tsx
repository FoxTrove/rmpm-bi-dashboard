"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import DataSourceBadge from "@/components/DataSourceBadge";
import { useAppFolioData } from "@/hooks/useAppFolioData";
import { ChevronDown, AlertCircle } from "lucide-react";
import {
  leasingFunnel as mockLeasingFunnel,
  leadSources as mockLeadSources,
  activeLeads as mockActiveLeads,
  leadsOverTime as mockLeadsOverTime,
} from "@/lib/mock-data";
import type { DashboardLeasingData } from "@/lib/appfolio/types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const fallback = {
  leasingFunnel: mockLeasingFunnel,
  leadSources: mockLeadSources,
  activeLeads: mockActiveLeads,
  leadsOverTime: mockLeadsOverTime,
} as DashboardLeasingData;

const statusOptions = [
  "All",
  "Showing Scheduled",
  "Application Pending",
  "Approved",
  "Awaiting Response",
];

export default function Leasing() {
  const { data, source, error } = useAppFolioData<DashboardLeasingData>(
    "/api/appfolio/leasing",
    fallback
  );

  const { leasingFunnel, leadSources, activeLeads, leadsOverTime } = data!;

  // Filters
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [urgentOnly, setUrgentOnly] = useState(false);

  // Unique sources from data
  const sourceOptions = useMemo(() => {
    const unique = new Set(activeLeads.map((l) => l.source));
    return ["All", ...Array.from(unique).filter((s) => s && s !== "\u2014").sort()];
  }, [activeLeads]);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return activeLeads.filter((lead) => {
      if (statusFilter !== "All" && lead.status !== statusFilter) return false;
      if (sourceFilter !== "All" && lead.source !== sourceFilter) return false;
      if (urgentOnly && !lead.urgent) return false;
      return true;
    });
  }, [activeLeads, statusFilter, sourceFilter, urgentOnly]);

  const hasActiveFilters = statusFilter !== "All" || sourceFilter !== "All" || urgentOnly;

  const clearFilters = () => {
    setStatusFilter("All");
    setSourceFilter("All");
    setUrgentOnly(false);
  };

  return (
    <>
      <PageHeader
        title="Leasing Pipeline"
        subtitle="Full funnel visibility — from inquiry to signed lease"
      />

      <div className="mb-4 flex justify-end">
        <DataSourceBadge source={source} error={error} />
      </div>

      {/* Funnel Visualization */}
      <div className="rounded-xl bg-card border border-border p-6 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-6">
          Conversion Funnel
        </h2>
        <div className="flex items-end justify-between gap-2">
          {leasingFunnel.map((stage, i) => {
            const height = 40 + stage.pct * 1.6;
            return (
              <div key={stage.stage} className="flex flex-1 flex-col items-center">
                <div
                  className="w-full rounded-t-lg transition-all"
                  style={{
                    height: `${height}px`,
                    background: `linear-gradient(180deg, #1E3A5F ${100 - i * 20}%, #2A4F7F)`,
                    opacity: 1 - i * 0.12,
                  }}
                />
                <div className="mt-3 text-center">
                  <p className="text-2xl font-bold text-text">{stage.count}</p>
                  <p className="text-xs font-medium text-text-secondary">{stage.stage}</p>
                  <p className="text-xs text-text-secondary">({stage.pct}%)</p>
                  {stage.weekDelta > 0 && (
                    <p className="mt-1 text-[11px] font-medium text-success">
                      +{stage.weekDelta} this week
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Connecting arrows */}
        <div className="flex items-center justify-between px-12 -mt-[100px] mb-[60px] pointer-events-none">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="text-lg text-text-secondary/40">&rarr;</span>
          ))}
        </div>
      </div>

      {/* Lead Source Breakdown + Trends Chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        {/* Lead Sources */}
        <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              Lead Source Breakdown
            </h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg">
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Source</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Leads</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Conversion</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Avg Response</th>
              </tr>
            </thead>
            <tbody>
              {leadSources.map((src, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-bg/50">
                  <td className="px-5 py-3 font-medium text-text">{src.source}</td>
                  <td className="px-5 py-3 text-text-secondary">{src.leads}</td>
                  <td className="px-5 py-3 font-medium text-success">{src.conversion}%</td>
                  <td className="px-5 py-3">
                    <StatusBadge
                      level={
                        src.responseTime === "Instant"
                          ? "success"
                          : parseInt(src.responseTime) <= 10
                          ? "success"
                          : parseInt(src.responseTime) <= 15
                          ? "warning"
                          : "critical"
                      }
                      text={src.responseTime}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Leads Over Time Chart */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            Weekly Lead Trends
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={leadsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#666" />
              <YAxis tick={{ fontSize: 12 }} stroke="#666" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="inquiries"
                stackId="1"
                stroke="#1E3A5F"
                fill="#1E3A5F"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="showings"
                stackId="2"
                stroke="#C41230"
                fill="#C41230"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="leased"
                stackId="3"
                stroke="#2E7D32"
                fill="#2E7D32"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Leads Table with Filters */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
            Active Leads
          </h2>
        </div>

        {/* Filter Bar */}
        <div className="px-5 py-3 border-b border-border bg-bg/50">
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none rounded-lg border border-border bg-white px-3 py-1.5 pr-8 text-xs font-medium text-text cursor-pointer hover:border-navy/30 focus:outline-none focus:ring-1 focus:ring-navy"
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt === "All" ? "All Statuses" : opt}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
            </div>

            {/* Source Filter */}
            <div className="relative">
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="appearance-none rounded-lg border border-border bg-white px-3 py-1.5 pr-8 text-xs font-medium text-text cursor-pointer hover:border-navy/30 focus:outline-none focus:ring-1 focus:ring-navy"
              >
                {sourceOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt === "All" ? "All Sources" : opt}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
            </div>

            {/* Urgent Toggle */}
            <button
              onClick={() => setUrgentOnly(!urgentOnly)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                urgentOnly
                  ? "border-critical/30 bg-critical-light text-critical"
                  : "border-border bg-white text-text-secondary hover:border-navy/30"
              }`}
            >
              <AlertCircle size={12} />
              Urgent only
            </button>

            {/* Clear & Count */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-navy hover:underline font-medium"
              >
                Clear filters
              </button>
            )}

            <span className="text-xs text-text-secondary ml-auto">
              {filteredLeads.length} of {activeLeads.length} leads
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg">
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Property</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Lead</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Source</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Status</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Response Time</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Assigned To</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Next Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-text-secondary">
                    No leads match your filters.{" "}
                    <button onClick={clearFilters} className="text-navy hover:underline">
                      Clear filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, i) => (
                  <tr
                    key={i}
                    className={`border-b border-border last:border-0 hover:bg-bg/50 ${
                      lead.urgent ? "bg-critical-light/30" : ""
                    }`}
                  >
                    <td className="px-5 py-3 font-medium text-text">{lead.property}</td>
                    <td className="px-5 py-3 text-text-secondary">{lead.name}</td>
                    <td className="px-5 py-3 text-text-secondary">{lead.source}</td>
                    <td className="px-5 py-3">
                      <StatusBadge
                        level={
                          lead.status === "Showing Scheduled"
                            ? "success"
                            : lead.status === "Application Sent"
                            ? "info"
                            : lead.urgent
                            ? "critical"
                            : "warning"
                        }
                        text={lead.status}
                      />
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`font-mono text-xs ${
                          lead.urgent ? "font-bold text-critical" : "text-text-secondary"
                        }`}
                      >
                        {lead.responseTime}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-text-secondary">
                      {lead.assignedTo === "Unassigned" ? (
                        <span className="font-medium text-critical">{lead.assignedTo}</span>
                      ) : (
                        lead.assignedTo
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {lead.urgent ? (
                        <span className="rounded bg-critical px-2 py-1 text-xs font-bold text-white">
                          {lead.nextAction}
                        </span>
                      ) : (
                        <span className="text-text-secondary">{lead.nextAction}</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
