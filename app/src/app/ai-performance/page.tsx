"use client";

import PageHeader from "@/components/PageHeader";
import {
  aiCallSummary,
  aiPositiveOutcomes,
  aiNegativeSignals,
  aiEstimatedValue,
  sentimentTrend,
  aiCallsOverTime,
} from "@/lib/mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Phone, CheckCircle2, ArrowRightLeft, PhoneOff, DollarSign, Clock, Zap } from "lucide-react";

export default function AIPerformance() {
  const { totalCalls, resolvedByAI, transferredToHuman, abandoned } = aiCallSummary;
  const resolvedPct = Math.round((resolvedByAI / totalCalls) * 100);
  const transferredPct = Math.round((transferredToHuman / totalCalls) * 100);
  const abandonedPct = Math.round((abandoned / totalCalls) * 100);

  return (
    <>
      <PageHeader
        title="AI Performance"
        subtitle="Last 30 days — measuring what the AI actually delivers"
      />

      {/* Call Outcome Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/10">
              <Phone size={20} className="text-navy" />
            </div>
            <p className="text-sm font-medium text-text-secondary">Total Calls</p>
          </div>
          <p className="text-3xl font-bold text-text">{totalCalls}</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-light">
              <CheckCircle2 size={20} className="text-success" />
            </div>
            <p className="text-sm font-medium text-text-secondary">Resolved by AI</p>
          </div>
          <p className="text-3xl font-bold text-success">{resolvedByAI}</p>
          <p className="text-xs text-text-secondary mt-1">{resolvedPct}% resolution rate</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning-light">
              <ArrowRightLeft size={20} className="text-amber-700" />
            </div>
            <p className="text-sm font-medium text-text-secondary">Transferred</p>
          </div>
          <p className="text-3xl font-bold text-text">{transferredToHuman}</p>
          <p className="text-xs text-text-secondary mt-1">{transferredPct}% of calls</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-critical-light">
              <PhoneOff size={20} className="text-critical" />
            </div>
            <p className="text-sm font-medium text-text-secondary">Abandoned</p>
          </div>
          <p className="text-3xl font-bold text-text">{abandoned}</p>
          <p className="text-xs text-text-secondary mt-1">{abandonedPct}% of calls</p>
        </div>
      </div>

      {/* Resolution breakdown bar */}
      <div className="rounded-xl bg-card border border-border p-6 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
          Call Resolution Breakdown
        </h2>
        <div className="h-6 w-full rounded-full bg-bg overflow-hidden flex">
          <div className="h-full bg-success" style={{ width: `${resolvedPct}%` }} />
          <div className="h-full bg-warning" style={{ width: `${transferredPct}%` }} />
          <div className="h-full bg-critical" style={{ width: `${abandonedPct}%` }} />
        </div>
        <div className="flex gap-6 mt-3 text-xs text-text-secondary">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-success" /> Resolved ({resolvedPct}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-warning" /> Transferred ({transferredPct}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-critical" /> Abandoned ({abandonedPct}%)
          </span>
        </div>
      </div>

      {/* Positive / Negative + Estimated Value */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        {/* Positive Outcomes */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-success uppercase tracking-wider mb-4">
            Positive Outcomes
          </h2>
          <ul className="space-y-3">
            {aiPositiveOutcomes.map((item) => (
              <li key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-text">{item.label}</span>
                <span className="font-mono text-sm font-bold text-text">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Negative Signals */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-critical uppercase tracking-wider mb-4">
            Negative Signals
          </h2>
          <ul className="space-y-3">
            {aiNegativeSignals.map((item) => (
              <li key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-text">{item.label}</span>
                <span className="font-mono text-sm font-bold text-text">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Estimated Value */}
        <div className="rounded-xl bg-navy p-5 shadow-sm text-white">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white/70">
            Estimated Value
          </h2>
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-gold" />
              <div>
                <p className="text-2xl font-bold">{aiEstimatedValue.hoursSaved} hrs/month</p>
                <p className="text-xs text-white/60">Hours Saved</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Zap size={20} className="text-gold" />
              <div>
                <p className="text-2xl font-bold">{aiEstimatedValue.afterHoursLeads}</p>
                <p className="text-xs text-white/60">After-Hours Leads Captured</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign size={20} className="text-gold" />
              <div>
                <p className="text-2xl font-bold">{aiEstimatedValue.revenueProtected}/mo</p>
                <p className="text-xs text-white/60">Revenue Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Calls Over Time */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            Weekly Call Volume
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={aiCallsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#666" />
              <YAxis tick={{ fontSize: 12 }} stroke="#666" />
              <Tooltip />
              <Legend />
              <Bar dataKey="resolved" fill="#2E7D32" name="Resolved" radius={[2, 2, 0, 0]} />
              <Bar dataKey="transferred" fill="#F9A825" name="Transferred" radius={[2, 2, 0, 0]} />
              <Bar dataKey="abandoned" fill="#C62828" name="Abandoned" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Trend */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            Sentiment Trend
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={sentimentTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke="#666" />
              <YAxis tick={{ fontSize: 12 }} stroke="#666" tickFormatter={(v) => `${v}%`} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="positive" stroke="#2E7D32" strokeWidth={2} name="Positive" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="neutral" stroke="#666666" strokeWidth={2} name="Neutral" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="negative" stroke="#C62828" strokeWidth={2} name="Negative" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
