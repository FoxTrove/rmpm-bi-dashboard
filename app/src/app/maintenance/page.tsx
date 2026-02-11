"use client";

import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import {
  maintenanceKPIs,
  workOrders,
  vendors,
  maintenanceCostTrend,
} from "@/lib/mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  Wrench,
  AlertTriangle,
  Clock,
  DollarSign,
  Star,
  CheckCircle2,
  Truck,
} from "lucide-react";

const priorityMap = {
  emergency: { level: "critical" as const, label: "Emergency" },
  high: { level: "critical" as const, label: "High" },
  medium: { level: "warning" as const, label: "Medium" },
  low: { level: "neutral" as const, label: "Low" },
};

const statusMap = {
  "In Progress": { level: "info" as const },
  "Dispatched": { level: "warning" as const },
  "Scheduled": { level: "neutral" as const },
  "Awaiting Parts": { level: "warning" as const },
  "Completed": { level: "success" as const },
};

export default function Maintenance() {
  const k = maintenanceKPIs;

  return (
    <>
      <PageHeader
        title="Maintenance Operations"
        subtitle="Work orders, vendor management, and SLA tracking — synced from AppFolio"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6 mb-6">
        {[
          { label: "Open Work Orders", value: k.openWorkOrders, icon: Wrench, color: "text-navy" },
          { label: "Avg Completion", value: k.avgCompletionTime, icon: Clock, color: "text-navy" },
          { label: "Emergency Open", value: k.emergencyOpen, icon: AlertTriangle, color: "text-critical" },
          { label: "Scheduled This Week", value: k.scheduledThisWeek, icon: CheckCircle2, color: "text-success" },
          { label: "Avg Cost/Order", value: k.avgCostPerOrder, icon: DollarSign, color: "text-navy" },
          { label: "Tenant Satisfaction", value: k.tenantSatisfaction, icon: Star, color: "text-gold" },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-xl bg-card border border-border p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} className={card.color} />
                <p className="text-xs font-medium text-text-secondary">{card.label}</p>
              </div>
              <p className="text-2xl font-bold text-text">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Work Orders Table */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
            Active Work Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg">
                <th className="px-4 py-3 text-left font-medium text-text-secondary">ID</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Property / Unit</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Description</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Priority</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Status</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Vendor</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Days Open</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Cost</th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((wo) => (
                <tr
                  key={wo.id}
                  className={`border-b border-border last:border-0 hover:bg-bg/50 ${
                    wo.priority === "emergency" ? "bg-critical-light/30" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-navy font-medium">{wo.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-text">{wo.property}</p>
                    <p className="text-xs text-text-secondary">Unit {wo.unit}</p>
                  </td>
                  <td className="px-4 py-3 text-text-secondary max-w-[200px]">{wo.description}</td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      level={priorityMap[wo.priority as keyof typeof priorityMap].level}
                      text={priorityMap[wo.priority as keyof typeof priorityMap].label}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      level={statusMap[wo.status as keyof typeof statusMap]?.level || "neutral"}
                      text={wo.status}
                    />
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{wo.assignedVendor}</td>
                  <td className="px-4 py-3">
                    <span className={`font-mono text-xs ${wo.daysOpen >= 3 ? "text-critical font-bold" : "text-text-secondary"}`}>
                      {wo.daysOpen === 0 ? "Done" : `${wo.daysOpen}d`}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text">{wo.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vendor Directory + Cost Trends */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        {/* Vendor Directory */}
        <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Truck size={16} className="text-navy" />
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              Vendor Directory
            </h2>
          </div>
          <div className="divide-y divide-border">
            {vendors.map((vendor) => (
              <div key={vendor.name} className="px-5 py-4 hover:bg-bg/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-text text-sm">{vendor.name}</span>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-gold fill-gold" />
                    <span className="text-xs font-bold text-text">{vendor.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-text-secondary">{vendor.specialty}</p>
                <div className="flex gap-4 mt-2 text-xs text-text-secondary">
                  <span>{vendor.jobsCompleted} jobs</span>
                  <span>Avg {vendor.avgResponseTime} response</span>
                  <span>Avg {vendor.avgCost}</span>
                  {vendor.insuranceCurrent && (
                    <span className="text-success font-medium">Insured</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Trends */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            Maintenance Cost & Volume Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={maintenanceCostTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#666" />
              <YAxis yAxisId="cost" tick={{ fontSize: 11 }} stroke="#666" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
              <YAxis yAxisId="orders" orientation="right" tick={{ fontSize: 11 }} stroke="#666" />
              <Tooltip formatter={(value, name) => [name === "cost" ? `$${Number(value).toLocaleString()}` : value, name === "cost" ? "Total Cost" : "Work Orders"]} />
              <Legend />
              <Bar yAxisId="cost" dataKey="cost" fill="#1E3A5F" name="Total Cost" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="orders" dataKey="orders" fill="#C9A227" name="Work Orders" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
