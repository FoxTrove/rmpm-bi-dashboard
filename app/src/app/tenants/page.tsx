"use client";

import PageHeader from "@/components/PageHeader";
import DemoDataBanner from "@/components/DemoDataBanner";
import StatusBadge from "@/components/StatusBadge";
import {
  tenantKPIs,
  tenantRiskScores,
  tenantSatisfactionTrend,
  communicationLog,
  tenantTenure,
} from "@/lib/mock-data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Heart,
  Users,
  Clock,
  MessageSquare,
  AlertTriangle,
  Shield,
  TrendingUp,
} from "lucide-react";

export default function Tenants() {
  const k = tenantKPIs;

  return (
    <>
      <PageHeader
        title="Tenant Insights"
        subtitle="Retention intelligence, communication tracking, and satisfaction monitoring"
      />
      <DemoDataBanner />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6 mb-6">
        {[
          { label: "Total Tenants", value: k.totalTenants, icon: Users },
          { label: "Avg Tenure", value: k.avgTenure, icon: Clock },
          { label: "Satisfaction", value: k.satisfactionScore, icon: Heart },
          { label: "Retention Rate", value: k.retentionRate, icon: TrendingUp },
          { label: "Late Payments", value: k.latePayments, icon: AlertTriangle },
          { label: "Open Complaints", value: k.openComplaints, icon: MessageSquare },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-xl bg-card border border-border p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} className="text-navy" />
                <p className="text-xs font-medium text-text-secondary">{card.label}</p>
              </div>
              <p className="text-2xl font-bold text-text">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Tenant Risk Scores */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Shield size={16} className="text-rpm-red" />
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
            Tenant Risk Assessment
          </h2>
          <span className="ml-auto text-xs text-text-secondary">AI-powered churn prediction</span>
        </div>
        <div className="divide-y divide-border">
          {tenantRiskScores.map((tenant) => (
            <div
              key={tenant.tenant}
              className={`px-5 py-4 hover:bg-bg/50 ${
                tenant.riskLevel === "critical" ? "bg-critical-light/20" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm text-white ${
                      tenant.riskScore >= 80
                        ? "bg-critical"
                        : tenant.riskScore >= 60
                        ? "bg-warning"
                        : tenant.riskScore >= 30
                        ? "bg-gray-400"
                        : "bg-success"
                    }`}
                  >
                    {tenant.riskScore}
                  </div>
                  <div>
                    <p className="font-medium text-text">{tenant.tenant}</p>
                    <p className="text-xs text-text-secondary">
                      {tenant.unit} — {tenant.rentAmount}/mo
                    </p>
                  </div>
                </div>
                <StatusBadge
                  level={tenant.riskLevel as "critical" | "warning" | "success" | "neutral"}
                  text={
                    tenant.riskScore >= 80
                      ? "High Risk"
                      : tenant.riskScore >= 60
                      ? "At Risk"
                      : tenant.riskScore >= 30
                      ? "Monitor"
                      : "Stable"
                  }
                />
              </div>
              <div className="flex flex-wrap gap-2 ml-[52px]">
                {tenant.factors.map((factor, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-bg px-2.5 py-1 text-[11px] text-text-secondary"
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Satisfaction Trend + Tenure Distribution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        {/* Satisfaction Trend */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            Satisfaction Score Trend
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={tenantSatisfactionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#666" />
              <YAxis domain={[3.5, 4.5]} tick={{ fontSize: 12 }} stroke="#666" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#1E3A5F"
                strokeWidth={2.5}
                dot={{ fill: "#1E3A5F", r: 4 }}
                name="Satisfaction Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tenure Distribution */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            Tenant Tenure Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={tenantTenure}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="range" tick={{ fontSize: 11 }} stroke="#666" />
              <YAxis tick={{ fontSize: 12 }} stroke="#666" />
              <Tooltip />
              <Bar dataKey="count" fill="#1E3A5F" radius={[4, 4, 0, 0]} name="Tenants" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Communication Log */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <MessageSquare size={16} className="text-navy" />
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
            Recent Communication Log
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg">
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Tenant</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Type</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Subject</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Date</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody>
              {communicationLog.map((log, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-bg/50">
                  <td className="px-5 py-3 font-medium text-text">{log.tenant}</td>
                  <td className="px-5 py-3">
                    <StatusBadge
                      level={log.type === "Phone" ? "info" : log.type === "SMS" ? "success" : "neutral"}
                      text={log.type}
                    />
                  </td>
                  <td className="px-5 py-3 text-text-secondary">
                    {log.subject}
                    {log.auto && (
                      <span className="ml-1.5 rounded bg-navy/10 px-1.5 py-0.5 text-[10px] font-medium text-navy">
                        AUTO
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-text-secondary">{log.date}</td>
                  <td className="px-5 py-3 text-text-secondary text-xs">{log.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
