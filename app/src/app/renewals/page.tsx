"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import DataSourceBadge from "@/components/DataSourceBadge";
import { useAppFolioData } from "@/hooks/useAppFolioData";
import { Search, ChevronDown } from "lucide-react";
import {
  renewalSummary as mockRenewalSummary,
  renewalStatus as mockRenewalStatus,
  renewals as mockRenewals,
} from "@/lib/mock-data";
import type { DashboardRenewalsData } from "@/lib/appfolio/types";

const fallback = {
  renewalSummary: mockRenewalSummary,
  renewalStatus: mockRenewalStatus,
  renewals: mockRenewals,
} as DashboardRenewalsData;

type UrgencyFilter = "all" | "critical" | "warning" | "success" | "neutral";

const urgencyTabs: { key: UrgencyFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "critical", label: "Critical" },
  { key: "warning", label: "Urgent" },
  { key: "success", label: "Upcoming" },
  { key: "neutral", label: "Planned" },
];

const statusOptions = ["All", "Renewed", "Negotiating", "No Contact", "Moving Out"];

function getLevelForUrgency(label: string): UrgencyFilter {
  if (label.includes("Critical")) return "critical";
  if (label.includes("Urgent")) return "warning";
  if (label.includes("Upcoming")) return "success";
  if (label.includes("Planned")) return "neutral";
  return "all";
}

export default function Renewals() {
  const { data, source, error } = useAppFolioData<DashboardRenewalsData>(
    "/api/appfolio/renewals",
    fallback
  );

  const { renewalSummary, renewalStatus, renewals } = data!;

  // Filters
  const [urgencyFilter, setUrgencyFilter] = useState<UrgencyFilter>("all");
  const [statusFilter, setStatusFilter] = useState("All");
  const [propertySearch, setPropertySearch] = useState("");
  const [assignedToFilter, setAssignedToFilter] = useState("All");

  // Get unique assigned-to values
  const assignedToOptions = useMemo(() => {
    const unique = new Set(renewals.map((r) => r.assignedTo));
    return ["All", ...Array.from(unique).filter(Boolean).sort()];
  }, [renewals]);

  // Filter by time-based urgency (from lease end date), not status-based level
  const filteredRenewals = useMemo(() => {
    return renewals.filter((r) => {
      // Urgency filter — uses r.urgency (time-based: critical/warning/success/neutral)
      if (urgencyFilter !== "all" && r.urgency !== urgencyFilter) return false;

      // Status filter
      if (statusFilter !== "All" && r.status !== statusFilter) return false;

      // Property search
      if (propertySearch) {
        const search = propertySearch.toLowerCase();
        const matchesProperty = r.property.toLowerCase().includes(search);
        const matchesTenant = r.tenant.toLowerCase().includes(search);
        const matchesUnit = r.unit.toLowerCase().includes(search);
        if (!matchesProperty && !matchesTenant && !matchesUnit) return false;
      }

      // Assigned-to filter
      if (assignedToFilter !== "All" && r.assignedTo !== assignedToFilter) return false;

      return true;
    });
  }, [renewals, urgencyFilter, statusFilter, propertySearch, assignedToFilter]);

  const clearFilters = () => {
    setUrgencyFilter("all");
    setStatusFilter("All");
    setPropertySearch("");
    setAssignedToFilter("All");
  };

  const hasActiveFilters = urgencyFilter !== "all" || statusFilter !== "All" || propertySearch !== "" || assignedToFilter !== "All";

  return (
    <>
      <PageHeader
        title="Renewals Center"
        subtitle="Upcoming lease expirations and renewal pipeline"
      />

      <div className="mb-4 flex justify-end">
        <DataSourceBadge source={source} error={error} />
      </div>

      {/* Urgency Summary — clickable */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
        {renewalSummary.map((item) => {
          const itemUrgency = getLevelForUrgency(item.label);
          const isActive = urgencyFilter === itemUrgency;
          return (
            <button
              key={item.label}
              onClick={() => setUrgencyFilter(isActive ? "all" : itemUrgency)}
              className={`rounded-xl border p-5 shadow-sm text-left transition-all ${
                item.color === "critical"
                  ? "border-critical/30 bg-critical-light"
                  : item.color === "warning"
                  ? "border-warning/30 bg-warning-light"
                  : item.color === "success"
                  ? "border-success/30 bg-success-light"
                  : "border-border bg-card"
              } ${isActive ? "ring-2 ring-navy ring-offset-1" : "hover:shadow-md"}`}
            >
              <p className="text-sm font-medium text-text-secondary">{item.label}</p>
              <p className="mt-1 text-3xl font-bold text-text">{item.count} units</p>
              {item.revenue && (
                <p className="mt-1 text-sm font-mono text-text-secondary">
                  {item.revenue} at risk
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Filter Bar */}
      <div className="rounded-xl bg-card border border-border p-4 shadow-sm mb-6">
        <div className="flex flex-wrap items-center gap-3">
          {/* Urgency Tabs */}
          <div className="flex rounded-lg bg-bg p-1 gap-0.5">
            {urgencyTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setUrgencyFilter(tab.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  urgencyFilter === tab.key
                    ? "bg-navy text-white shadow-sm"
                    : "text-text-secondary hover:text-text hover:bg-bg"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Status Dropdown */}
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

          {/* Property Search */}
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={propertySearch}
              onChange={(e) => setPropertySearch(e.target.value)}
              placeholder="Search property, tenant, unit..."
              className="w-full rounded-lg border border-border bg-white pl-9 pr-3 py-1.5 text-xs text-text placeholder:text-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-navy"
            />
          </div>

          {/* Assigned-to Dropdown */}
          <div className="relative">
            <select
              value={assignedToFilter}
              onChange={(e) => setAssignedToFilter(e.target.value)}
              className="appearance-none rounded-lg border border-border bg-white px-3 py-1.5 pr-8 text-xs font-medium text-text cursor-pointer hover:border-navy/30 focus:outline-none focus:ring-1 focus:ring-navy"
            >
              {assignedToOptions.map((opt) => (
                <option key={opt} value={opt}>{opt === "All" ? "All Assignees" : opt}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-navy hover:underline font-medium"
            >
              Clear filters
            </button>
          )}

          {/* Result count */}
          <span className="text-xs text-text-secondary ml-auto">
            {filteredRenewals.length} of {renewals.length} renewals
          </span>
        </div>
      </div>

      {/* Renewal Status Bars */}
      <div className="rounded-xl bg-card border border-border p-6 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-5">
          Renewal Status
        </h2>
        <div className="space-y-4">
          {renewalStatus.map((status) => (
            <div key={status.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-text">{status.label}</span>
                <span className="text-sm font-mono text-text-secondary">
                  {status.count} ({status.pct}%)
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-bg">
                <div
                  className={`h-3 rounded-full transition-all ${
                    status.label === "Renewed"
                      ? "bg-success"
                      : status.label === "In Negotiation"
                      ? "bg-navy"
                      : status.label === "No Contact Yet"
                      ? "bg-warning"
                      : "bg-critical"
                  }`}
                  style={{ width: `${status.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Renewals Table */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
            Renewal Details
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg">
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Property</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Unit</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Tenant</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Lease Ends</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Status</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Assigned To</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Last Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredRenewals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-text-secondary">
                    No renewals match your filters.{" "}
                    <button onClick={clearFilters} className="text-navy hover:underline">
                      Clear filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredRenewals.map((r, i) => (
                  <tr
                    key={i}
                    className={`border-b border-border last:border-0 hover:bg-bg/50 ${
                      r.level === "critical" ? "bg-critical-light/30" : ""
                    }`}
                  >
                    <td className="px-5 py-3 font-medium text-text">{r.property}</td>
                    <td className="px-5 py-3 text-text-secondary">{r.unit}</td>
                    <td className="px-5 py-3 text-text-secondary">{r.tenant}</td>
                    <td className="px-5 py-3 font-mono text-text-secondary">{r.leaseEnds}</td>
                    <td className="px-5 py-3">
                      <StatusBadge
                        level={r.level as "critical" | "warning" | "success"}
                        text={r.status}
                      />
                    </td>
                    <td className="px-5 py-3 text-text-secondary">{r.assignedTo}</td>
                    <td className="px-5 py-3">
                      {r.lastContact === "Never" ? (
                        <span className="font-medium text-critical">{r.lastContact}</span>
                      ) : (
                        <span className="text-text-secondary">{r.lastContact}</span>
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
