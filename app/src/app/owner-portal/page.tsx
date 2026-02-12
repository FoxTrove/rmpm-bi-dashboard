"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import DemoDataBanner from "@/components/DemoDataBanner";
import StatusBadge from "@/components/StatusBadge";
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
  Eye,
  Home,
  DollarSign,
  FileText,
  Wrench,
  TrendingUp,
  Download,
  CheckCircle2,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const ownerFinancials = [
  { month: "Sep", income: 18200, expenses: 4800, net: 13400 },
  { month: "Oct", income: 18200, expenses: 3200, net: 15000 },
  { month: "Nov", income: 18200, expenses: 5100, net: 13100 },
  { month: "Dec", income: 18200, expenses: 2900, net: 15300 },
  { month: "Jan", income: 18200, expenses: 3600, net: 14600 },
  { month: "Feb", income: 18200, expenses: 2400, net: 15800 },
];

const ownerProperties = [
  {
    address: "123 Main Street, Fort Collins",
    status: "Leased",
    statusLevel: "success" as const,
    tenant: "Johnson, M.",
    leaseEnd: "August 31, 2025",
    rent: "$1,850/mo",
    rentStatus: "Paid Current",
    activity: ["No maintenance requests this month", "Rent received on time (12 consecutive months)", "Lease renewal notice sent — 180 days out"],
  },
  {
    address: "456 Oak Avenue, Loveland",
    status: "For Lease (12 days)",
    statusLevel: "warning" as const,
    tenant: null,
    leaseEnd: null,
    rent: "$1,650/mo (listed)",
    rentStatus: "Vacant",
    activity: ["23 inquiries received", "8 showings completed", "2 applications under review — decision by Friday", "AI answered 6 after-hours calls about this listing"],
  },
  {
    address: "789 Pine Drive, Windsor",
    status: "Leased",
    statusLevel: "success" as const,
    tenant: "Davis, P.",
    leaseEnd: "March 15, 2026",
    rent: "$2,100/mo",
    rentStatus: "Paid Current",
    activity: ["Minor maintenance: replaced bathroom faucet ($145)", "Tenant satisfaction survey: 4.5/5", "Property inspection scheduled for March"],
  },
];

export default function OwnerPortal() {
  const [activeTab, setActiveTab] = useState<"overview" | "financials" | "reports" | "narrative">("overview");

  return (
    <>
      <PageHeader
        title="Owner Portal Preview"
        subtitle="This is exactly what your property owners see — branded, automated, zero manual work"
      />
      <DemoDataBanner />

      {/* Context Banner */}
      <div className="rounded-xl bg-navy/5 border border-navy/15 p-4 mb-6 flex items-center gap-3">
        <Eye size={18} className="text-navy shrink-0" />
        <div>
          <p className="text-sm font-medium text-text">
            You&apos;re previewing the owner experience for <strong>Johnson Portfolio (3 properties)</strong>
          </p>
          <p className="text-xs text-text-secondary">
            This portal is auto-generated from AppFolio data. Owners access it via a branded link — no AppFolio login needed.
          </p>
        </div>
      </div>

      {/* Owner Portal Mockup */}
      <div className="rounded-2xl border-2 border-navy/20 shadow-xl overflow-hidden mb-6">

        {/* Portal Header */}
        <div className="bg-navy px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="RPM Rockies"
              width={140}
              height={46}
              className="brightness-0 invert"
            />
            <div className="h-8 w-px bg-white/20" />
            <div>
              <p className="text-white font-medium text-sm">Owner Portal</p>
              <p className="text-white/50 text-xs">Johnson Portfolio — 3 Properties</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/50 text-xs">Last updated</p>
            <p className="text-white text-xs font-medium">February 11, 2025 — 8:02am MT</p>
          </div>
        </div>

        {/* Portal Tabs */}
        <div className="bg-white border-b border-border px-8">
          <div className="flex gap-1">
            {[
              { key: "overview", label: "Portfolio Overview", icon: Home },
              { key: "financials", label: "Financial Summary", icon: DollarSign },
              { key: "reports", label: "Reports & Documents", icon: FileText },
              { key: "narrative", label: "AI Summary", icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? "border-navy text-navy"
                      : "border-transparent text-text-secondary hover:text-text"
                  }`}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portal Content */}
        <div className="bg-bg p-8">
          {activeTab === "overview" && (
            <div>
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
                {[
                  { label: "Total Properties", value: "3", icon: Home },
                  { label: "Monthly Income", value: "$5,600", icon: DollarSign },
                  { label: "Occupancy", value: "67%", sub: "2 of 3 leased", icon: TrendingUp },
                  { label: "Open Maintenance", value: "0", icon: Wrench },
                ].map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.label} className="rounded-xl bg-white border border-border p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={14} className="text-navy" />
                        <p className="text-xs text-text-secondary">{card.label}</p>
                      </div>
                      <p className="text-xl font-bold text-text">{card.value}</p>
                      {card.sub && <p className="text-xs text-text-secondary">{card.sub}</p>}
                    </div>
                  );
                })}
              </div>

              {/* Property Cards */}
              <div className="space-y-4">
                {ownerProperties.map((prop) => (
                  <div key={prop.address} className="rounded-xl bg-white border border-border p-6 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-text">{prop.address}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <StatusBadge level={prop.statusLevel} text={prop.status} />
                          <span className="text-sm font-mono text-text">{prop.rent}</span>
                          {prop.rentStatus === "Paid Current" && (
                            <span className="flex items-center gap-1 text-xs text-success font-medium">
                              <CheckCircle2 size={11} /> {prop.rentStatus}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {prop.tenant && (
                      <p className="text-sm text-text-secondary mb-2">
                        Tenant: {prop.tenant} — Lease through {prop.leaseEnd}
                      </p>
                    )}
                    <div className="rounded-lg bg-bg p-4 mt-3">
                      <p className="text-xs font-medium text-text mb-2 uppercase tracking-wider">This Month&apos;s Activity</p>
                      <ul className="space-y-1.5">
                        {prop.activity.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                            <CheckCircle2 size={13} className="text-success mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "financials" && (
            <div>
              <div className="rounded-xl bg-white border border-border p-6 shadow-sm mb-6">
                <h3 className="font-bold text-text mb-4">6-Month Financial Summary</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={ownerFinancials}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#666" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#666" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
                    <Line type="monotone" dataKey="income" stroke="#2E7D32" strokeWidth={2} name="Income" dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="expenses" stroke="#C62828" strokeWidth={2} name="Expenses" dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="net" stroke="#1E3A5F" strokeWidth={2.5} name="Net to Owner" dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="rounded-xl bg-white border border-border shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-bg">
                      <th className="px-5 py-3 text-left font-medium text-text-secondary">Month</th>
                      <th className="px-5 py-3 text-left font-medium text-text-secondary">Income</th>
                      <th className="px-5 py-3 text-left font-medium text-text-secondary">Expenses</th>
                      <th className="px-5 py-3 text-left font-medium text-text-secondary">Net to Owner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ownerFinancials.map((row) => (
                      <tr key={row.month} className="border-b border-border last:border-0">
                        <td className="px-5 py-3 font-medium text-text">{row.month} 2025</td>
                        <td className="px-5 py-3 font-mono text-success">${row.income.toLocaleString()}</td>
                        <td className="px-5 py-3 font-mono text-text-secondary">${row.expenses.toLocaleString()}</td>
                        <td className="px-5 py-3 font-mono font-bold text-navy">${row.net.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-3">
              {[
                { name: "February 2025 Owner Statement", date: "Feb 10, 2025", type: "PDF" },
                { name: "January 2025 Owner Statement", date: "Jan 10, 2025", type: "PDF" },
                { name: "Year-End 2024 Summary", date: "Jan 3, 2025", type: "PDF" },
                { name: "1099 Tax Document — 2024", date: "Jan 15, 2025", type: "PDF" },
                { name: "December 2024 Owner Statement", date: "Dec 10, 2024", type: "PDF" },
                { name: "Property Inspection — 789 Pine Dr", date: "Nov 18, 2024", type: "PDF" },
              ].map((doc) => (
                <div key={doc.name} className="flex items-center justify-between rounded-xl bg-white border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/10">
                      <FileText size={18} className="text-navy" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text">{doc.name}</p>
                      <p className="text-xs text-text-secondary">{doc.date} — {doc.type}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 rounded-lg border border-navy/30 px-3 py-1.5 text-xs font-medium text-navy hover:bg-navy/5 transition-colors">
                    <Download size={12} />
                    Download
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "narrative" && (
            <div>
              <div className="rounded-xl bg-white border border-border p-6 shadow-sm mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={16} className="text-navy" />
                  <h3 className="font-bold text-text">Your AI Portfolio Summary</h3>
                  <span className="ml-auto text-xs text-text-secondary">Auto-generated Feb 10, 2025</span>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm text-text leading-relaxed mb-3">
                    Hi Mr. Johnson — here&apos;s your weekly portfolio update. Overall, your 3 properties are in great shape.
                  </p>
                  <p className="text-sm text-text leading-relaxed mb-3">
                    <strong>123 Main Street</strong> continues to run smoothly. The Johnsons have paid rent on time for 12 consecutive months,
                    and we&apos;ve proactively sent their renewal notice at 180 days out. No maintenance issues this month — your
                    lowest-cost property.
                  </p>
                  <p className="text-sm text-text leading-relaxed mb-3">
                    <strong>456 Oak Avenue</strong> has been listed for 12 days and is generating strong interest: 23 inquiries,
                    8 showings, and 2 applications currently under review. Our AI phone system handled 6 after-hours calls
                    about this listing — leads that would have been missed otherwise. We expect to have a signed lease by end of week.
                  </p>
                  <p className="text-sm text-text leading-relaxed mb-3">
                    <strong>789 Pine Drive</strong> is performing well. We replaced a bathroom faucet this month ($145 — covered
                    by reserves). The Davis family is happy — 4.5/5 on their last satisfaction survey — and their lease runs
                    through March 2026.
                  </p>
                  <p className="text-sm text-text leading-relaxed mb-3">
                    Your net income this month is projected at <strong>$15,800</strong>, up from $14,600 last month due to lower
                    maintenance costs. Year-to-date, your portfolio has returned <strong>$87,200</strong> net.
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed italic">
                    No action needed from you. If you have any questions, reply to this email or call your property manager
                    Maria S. directly.
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-navy/5 border border-navy/10 p-4 flex items-start gap-3">
                <MessageSquare size={16} className="text-navy mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-text font-medium">
                    This narrative is generated automatically from property data, maintenance logs, leasing pipeline, AI call records, and financial statements.
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    Owners receive this via email twice weekly. They never need to log into AppFolio. They never need to ask &quot;how&apos;s my property doing?&quot;
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Portal Footer */}
        <div className="bg-white border-t border-border px-8 py-4 flex items-center justify-between">
          <p className="text-xs text-text-secondary">
            Powered by Real Property Management of the Rockies
          </p>
          <div className="flex items-center gap-4 text-xs text-text-secondary">
            <span className="flex items-center gap-1">
              <MessageSquare size={11} /> Contact Manager
            </span>
            <span className="flex items-center gap-1">
              <Download size={11} /> Download All Reports
            </span>
          </div>
        </div>
      </div>

      {/* Explanation for Jarid */}
      <div className="mt-6 rounded-xl bg-card border border-border p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-3">
          Why This Matters
        </h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-lg bg-bg p-4">
            <p className="text-sm font-medium text-text mb-1">Owners stop calling you</p>
            <p className="text-xs text-text-secondary">
              They get proactive updates before they have a question. No more &quot;just checking in&quot; calls.
            </p>
          </div>
          <div className="rounded-lg bg-bg p-4">
            <p className="text-sm font-medium text-text mb-1">Zero manual work</p>
            <p className="text-xs text-text-secondary">
              Every report, statement, and narrative is auto-generated from AppFolio data. Your team never touches it.
            </p>
          </div>
          <div className="rounded-lg bg-bg p-4">
            <p className="text-sm font-medium text-text mb-1">Your brand, not AppFolio&apos;s</p>
            <p className="text-xs text-text-secondary">
              Owners see &quot;Real Property Management of the Rockies&quot; — not a generic software portal. This is your platform.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
