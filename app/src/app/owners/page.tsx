"use client";

import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import { ownerReportStatus, ownerReports } from "@/lib/mock-data";
import { Send, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function OwnerComms() {
  const { sent, scheduled, failed, total } = ownerReportStatus;
  const sentPct = Math.round((sent / total) * 100);
  const scheduledPct = Math.round((scheduled / total) * 100);
  const failedPct = Math.round((failed / total) * 100);

  return (
    <>
      <PageHeader
        title="Owner Communications"
        subtitle="Automated reporting — zero-touch, always delivered"
      />

      {/* Report Status Summary */}
      <div className="rounded-xl bg-card border border-border p-6 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-5">
          This Week&apos;s Reports
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sent */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-light">
              <CheckCircle2 size={24} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">{sent}</p>
              <p className="text-sm text-text-secondary">Sent Successfully ({sentPct}%)</p>
            </div>
          </div>
          {/* Scheduled */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Clock size={24} className="text-navy" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">{scheduled}</p>
              <p className="text-sm text-text-secondary">Scheduled ({scheduledPct}%)</p>
            </div>
          </div>
          {/* Failed */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-critical-light">
              <AlertTriangle size={24} className="text-critical" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">{failed}</p>
              <p className="text-sm text-text-secondary">Failed — Needs Review ({failedPct}%)</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-4 w-full rounded-full bg-bg overflow-hidden flex">
          <div className="h-full bg-success" style={{ width: `${sentPct}%` }} />
          <div className="h-full bg-navy" style={{ width: `${scheduledPct}%` }} />
          <div className="h-full bg-critical" style={{ width: `${failedPct}%` }} />
        </div>
        <div className="flex gap-6 mt-2 text-xs text-text-secondary">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-success" /> Sent
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-navy" /> Scheduled
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-critical" /> Failed
          </span>
        </div>
      </div>

      {/* Owner Report Preview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        {/* Report Preview Card */}
        <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
          <div className="bg-navy px-6 py-4">
            <h3 className="text-white font-bold text-sm">
              RPM ROCKIES — PROPERTY PERFORMANCE REPORT
            </h3>
            <p className="text-white/60 text-xs mt-1">Week of February 10, 2025</p>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <h4 className="font-bold text-text text-sm mb-2">123 MAIN STREET, FORT COLLINS</h4>
              <div className="flex items-center gap-2 mb-2">
                <StatusBadge level="success" text="LEASED" />
              </div>
              <div className="space-y-1 text-sm text-text-secondary">
                <p>Current Tenant: Johnson, M.</p>
                <p>Lease Expires: August 31, 2025</p>
                <p>Rent: $1,850/mo (Paid Current)</p>
              </div>
              <div className="mt-3 rounded-lg bg-bg p-3">
                <p className="text-xs font-medium text-text mb-1">THIS WEEK&apos;S ACTIVITY</p>
                <ul className="text-xs text-text-secondary space-y-0.5">
                  <li>No maintenance requests</li>
                  <li>Rent received on time</li>
                  <li>Lease renewal notice sent (180 days out)</li>
                </ul>
              </div>
            </div>
            <hr className="border-border" />
            <div>
              <h4 className="font-bold text-text text-sm mb-2">456 OAK AVENUE, LOVELAND</h4>
              <div className="flex items-center gap-2 mb-2">
                <StatusBadge level="warning" text="FOR LEASE (12 days)" />
              </div>
              <div className="mt-2 rounded-lg bg-bg p-3">
                <p className="text-xs font-medium text-text mb-1">LEASING FUNNEL</p>
                <div className="flex gap-4 text-xs text-text-secondary">
                  <span>Inquiries: <strong className="text-text">23</strong></span>
                  <span>Showings: <strong className="text-text">8</strong></span>
                  <span>Applications: <strong className="text-text">2</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-Report Settings */}
        <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-5">
            Auto-Report Settings
          </h2>
          <div className="space-y-4">
            {[
              { label: "Frequency", value: "Twice weekly (Tue/Fri)" },
              { label: "Include", value: "Active listings, occupied status, maintenance, financials" },
              { label: "Format", value: "Email + PDF attachment" },
              { label: "Trigger", value: "Automatic at 8am MT" },
              { label: "Recipients", value: "All active property owners" },
            ].map((setting) => (
              <div key={setting.label} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy/10">
                  <Send size={14} className="text-navy" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">{setting.label}</p>
                  <p className="text-sm text-text-secondary">{setting.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg bg-success-light p-4">
            <p className="text-sm font-medium text-success">
              Automation Status: Active
            </p>
            <p className="text-xs text-success/80 mt-1">
              Next batch: Tuesday, February 11 at 8:00am MT
            </p>
          </div>
        </div>
      </div>

      {/* Owner Reports Table */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
            Report Queue
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg">
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Owner</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Properties</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Status</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Sent / Scheduled</th>
              </tr>
            </thead>
            <tbody>
              {ownerReports.map((report, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-bg/50">
                  <td className="px-5 py-3 font-medium text-text">{report.owner}</td>
                  <td className="px-5 py-3 text-text-secondary">{report.properties}</td>
                  <td className="px-5 py-3">
                    <StatusBadge
                      level={
                        report.status === "sent"
                          ? "success"
                          : report.status === "scheduled"
                          ? "info"
                          : "critical"
                      }
                      text={report.status === "sent" ? "Sent" : report.status === "scheduled" ? "Scheduled" : "Failed"}
                    />
                  </td>
                  <td className="px-5 py-3 text-text-secondary text-xs">{report.sentAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
