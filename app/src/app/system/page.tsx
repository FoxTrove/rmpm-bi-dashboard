"use client";

import PageHeader from "@/components/PageHeader";
import DemoDataBanner from "@/components/DemoDataBanner";
import StatusBadge from "@/components/StatusBadge";
import { integrations, dataFlows } from "@/lib/mock-data";
import {
  Server,
  ArrowRight,
  CheckCircle2,
  Activity,
  RefreshCw,
} from "lucide-react";

const automationLogs = [
  { time: "8:04am", action: "Owner reports batch completed", status: "success", detail: "142/145 sent" },
  { time: "8:00am", action: "Owner reports batch started", status: "success", detail: "Processing 145 reports" },
  { time: "7:45am", action: "AppFolio data sync", status: "success", detail: "847 units synced" },
  { time: "7:30am", action: "Daily KPI calculation", status: "success", detail: "All metrics updated" },
  { time: "6:00am", action: "Scheduled maintenance check", status: "success", detail: "19 open tickets found" },
  { time: "12:00am", action: "Daily backup completed", status: "success", detail: "All data backed up" },
];

const errorAlerts = [
  { time: "8:02am", message: "Failed to send report to Smith Family Trust", severity: "warning", resolution: "Auto-retry scheduled for 9:00am" },
  { time: "7:46am", message: "AppFolio rate limit hit briefly", severity: "info", resolution: "Resolved — synced after 30s delay" },
];

export default function SystemHealth() {
  return (
    <>
      <PageHeader
        title="System Health"
        subtitle="All connected systems and automation status"
      />
      <DemoDataBanner />

      {/* Integration Status */}
      <div className="rounded-xl bg-card border border-border p-6 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-5">
          Connected Systems
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="rounded-xl border border-success/30 bg-success-light/50 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-semibold text-text">{integration.name}</span>
              </div>
              <p className="text-xs text-text-secondary capitalize">{integration.status}</p>
              <p className="text-xs text-text-secondary mt-1">{integration.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Data Flow */}
      <div className="rounded-xl bg-card border border-border p-6 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-5">
          Data Flow Status
        </h2>
        <div className="space-y-3">
          {dataFlows.map((flow, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-lg border border-border p-4"
            >
              <div className="flex items-center gap-3 min-w-[140px]">
                <Server size={16} className="text-navy" />
                <span className="text-sm font-medium text-text">{flow.from}</span>
              </div>
              <ArrowRight size={16} className="text-text-secondary" />
              <div className="flex items-center gap-3 min-w-[140px]">
                <Server size={16} className="text-navy" />
                <span className="text-sm font-medium text-text">{flow.to}</span>
              </div>
              <div className="ml-auto">
                <StatusBadge level="success" text={flow.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automation Logs + Error Alerts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Automation Logs */}
        <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Activity size={16} className="text-navy" />
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              Automation Logs (Today)
            </h2>
          </div>
          <ul className="divide-y divide-border">
            {automationLogs.map((log, i) => (
              <li key={i} className="px-5 py-3 flex items-start gap-3">
                <CheckCircle2 size={16} className="text-success mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-text-secondary">{log.time}</span>
                    <span className="text-sm font-medium text-text">{log.action}</span>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">{log.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Error Alerts */}
        <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <RefreshCw size={16} className="text-warning" />
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              Recent Alerts
            </h2>
          </div>
          <ul className="divide-y divide-border">
            {errorAlerts.map((alert, i) => (
              <li key={i} className="px-5 py-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-text-secondary">{alert.time}</span>
                  <StatusBadge
                    level={alert.severity === "warning" ? "warning" : "info"}
                    text={alert.severity === "warning" ? "Warning" : "Info"}
                  />
                </div>
                <p className="text-sm text-text">{alert.message}</p>
                <p className="text-xs text-success mt-1">{alert.resolution}</p>
              </li>
            ))}
          </ul>

          {/* Overall status */}
          <div className="px-5 py-4 bg-success-light/50 border-t border-success/20">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium text-success">
                All systems operational — 99.9% uptime this month
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
