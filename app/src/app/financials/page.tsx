"use client";

import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import {
  financialSummary,
  revenueByMonth,
  propertyFinancials,
  rentCollectionStatus,
  expenseBreakdown,
} from "@/lib/mock-data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DollarSign, TrendingUp, Percent, CreditCard, ArrowUpRight } from "lucide-react";

const EXPENSE_COLORS = ["#C41230", "#1E3A5F", "#C9A227", "#2E7D32", "#F9A825", "#666666", "#94A3B8"];

export default function Financials() {
  const s = financialSummary;

  return (
    <>
      <PageHeader
        title="Financial Hub"
        subtitle="Portfolio financials — pulled from AppFolio in real-time"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
        {[
          { label: "Total Revenue", value: s.totalRevenue, icon: DollarSign, sub: s.yoyRevenueGrowth + " YoY", color: "text-success" },
          { label: "Total Expenses", value: s.totalExpenses, icon: CreditCard, sub: "This month", color: "text-text" },
          { label: "Net Operating Income", value: s.noi, icon: TrendingUp, sub: s.noiMargin + " margin", color: "text-success" },
          { label: "Collection Rate", value: s.collectionRate, icon: Percent, sub: s.outstandingBalance + " outstanding", color: "text-success" },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-xl bg-card border border-border p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-text-secondary">{card.label}</p>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/10">
                  <Icon size={16} className="text-navy" />
                </div>
              </div>
              <p className="text-2xl font-bold text-text">{card.value}</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight size={12} className="text-success" />
                <span className={`text-xs font-medium ${card.color}`}>{card.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue/Expense/NOI Chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm lg:col-span-2">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            Revenue vs Expenses vs NOI
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#666" />
              <YAxis tick={{ fontSize: 11 }} stroke="#666" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#2E7D32" fill="#2E7D32" fillOpacity={0.1} name="Revenue" />
              <Area type="monotone" dataKey="expenses" stroke="#C41230" fill="#C41230" fillOpacity={0.1} name="Expenses" />
              <Area type="monotone" dataKey="noi" stroke="#1E3A5F" fill="#1E3A5F" fillOpacity={0.15} strokeWidth={2.5} name="NOI" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown Pie */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            Expense Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="amount"
                nameKey="category"
                strokeWidth={0}
              >
                {expenseBreakdown.map((_, index) => (
                  <Cell key={index} fill={EXPENSE_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {expenseBreakdown.slice(0, 5).map((item, i) => (
              <div key={item.category} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-text-secondary">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: EXPENSE_COLORS[i] }} />
                  {item.category}
                </span>
                <span className="font-mono text-text">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rent Collection Status */}
      <div className="rounded-xl bg-card border border-border p-6 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
          Rent Collection Status — February 2025
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {rentCollectionStatus.map((status) => (
            <div
              key={status.label}
              className={`rounded-lg p-4 border ${
                status.label === "Paid in Full"
                  ? "border-success/30 bg-success-light"
                  : status.label === "Partial Payment"
                  ? "border-warning/30 bg-warning-light"
                  : "border-critical/30 bg-critical-light"
              }`}
            >
              <p className="text-2xl font-bold text-text">{status.count}</p>
              <p className="text-xs text-text-secondary">{status.label}</p>
              <p className="text-xs font-mono text-text-secondary mt-1">{status.pct}% of tenants</p>
            </div>
          ))}
        </div>
      </div>

      {/* Property Financials Table */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
            Property P&L Summary
          </h2>
          <span className="text-xs text-text-secondary">Data from AppFolio — synced 2 min ago</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg">
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Property</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Units</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Revenue</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Expenses</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">NOI</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Margin</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Collection</th>
              </tr>
            </thead>
            <tbody>
              {propertyFinancials.map((p, i) => {
                const margin = parseFloat(p.margin);
                return (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-bg/50">
                    <td className="px-5 py-3 font-medium text-text">{p.property}</td>
                    <td className="px-5 py-3 text-text-secondary">{p.units}</td>
                    <td className="px-5 py-3 font-mono text-success">{p.revenue}</td>
                    <td className="px-5 py-3 font-mono text-text-secondary">{p.expenses}</td>
                    <td className="px-5 py-3 font-mono font-bold text-text">{p.noi}</td>
                    <td className="px-5 py-3">
                      <StatusBadge
                        level={margin >= 33 ? "success" : margin >= 25 ? "warning" : "critical"}
                        text={p.margin}
                      />
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge
                        level={parseFloat(p.collection) >= 97 ? "success" : parseFloat(p.collection) >= 95 ? "warning" : "critical"}
                        text={p.collection}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-navy/20 bg-navy/5">
                <td className="px-5 py-3 font-bold text-text">Total Portfolio</td>
                <td className="px-5 py-3 font-bold text-text">847</td>
                <td className="px-5 py-3 font-mono font-bold text-success">$467,750</td>
                <td className="px-5 py-3 font-mono font-bold text-text-secondary">$312,400</td>
                <td className="px-5 py-3 font-mono font-bold text-text">$155,350</td>
                <td className="px-5 py-3"><StatusBadge level="success" text="33.2%" /></td>
                <td className="px-5 py-3"><StatusBadge level="success" text="97.3%" /></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}
