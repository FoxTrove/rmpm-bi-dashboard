"use client";

import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import { renewalSummary, renewalStatus, renewals } from "@/lib/mock-data";

export default function Renewals() {
  return (
    <>
      <PageHeader
        title="Renewals Center"
        subtitle="Upcoming lease expirations and renewal pipeline"
      />

      {/* Urgency Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
        {renewalSummary.map((item) => (
          <div
            key={item.label}
            className={`rounded-xl border p-5 shadow-sm ${
              item.color === "critical"
                ? "border-critical/30 bg-critical-light"
                : item.color === "warning"
                ? "border-warning/30 bg-warning-light"
                : item.color === "success"
                ? "border-success/30 bg-success-light"
                : "border-border bg-card"
            }`}
          >
            <p className="text-sm font-medium text-text-secondary">{item.label}</p>
            <p className="mt-1 text-3xl font-bold text-text">{item.count} units</p>
            {item.revenue && (
              <p className="mt-1 text-sm font-mono text-text-secondary">
                {item.revenue} at risk
              </p>
            )}
          </div>
        ))}
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
              {renewals.map((r, i) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
