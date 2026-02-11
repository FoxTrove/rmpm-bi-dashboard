"use client";

import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import {
  aiRentOptimization,
  predictiveMaintenance,
  aiLeadScoring,
  aiMarketIntel,
  aiOwnerNarrative,
  revenueImpactForecast,
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
} from "recharts";
import {
  Sparkles,
  DollarSign,
  Wrench,
  Target,
  Globe,
  FileText,
  TrendingUp,
  ArrowUpRight,
  AlertTriangle,
  Zap,
  Brain,
} from "lucide-react";

export default function AIInsights() {
  const totalUpside = aiRentOptimization.reduce(
    (sum, r) => sum + (r.suggestedRent - r.currentRent),
    0
  );

  return (
    <>
      <PageHeader
        title="AI Insights"
        subtitle="Predictive intelligence — the AI doesn't just answer calls, it runs your business"
      />

      {/* AI Value Banner */}
      <div className="rounded-xl bg-gradient-to-r from-navy to-navy-light p-6 shadow-lg mb-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <Brain size={22} className="text-gold" />
          </div>
          <div>
            <h2 className="text-lg font-bold">AI is analyzing your entire portfolio, 24/7</h2>
            <p className="text-sm text-white/60">
              Market data, tenant behavior, maintenance patterns, and financial trends — all processed automatically
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mt-4">
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-2xl font-bold text-gold">${(totalUpside * 12).toLocaleString()}/yr</p>
            <p className="text-xs text-white/60">Identified Revenue Upside</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-2xl font-bold text-gold">$17,050</p>
            <p className="text-xs text-white/60">Preventive Savings (vs Emergency)</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-2xl font-bold text-gold">4 tenants</p>
            <p className="text-xs text-white/60">Flagged At-Risk Before Notice</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-2xl font-bold text-gold">47 hrs/mo</p>
            <p className="text-xs text-white/60">Team Time Saved</p>
          </div>
        </div>
      </div>

      {/* Rent Optimization */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 mb-6">
        <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden lg:col-span-3">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <DollarSign size={16} className="text-success" />
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              AI Rent Optimization
            </h2>
            <span className="ml-auto rounded-full bg-success-light px-2.5 py-0.5 text-[11px] font-medium text-success">
              +${totalUpside.toLocaleString()}/mo potential
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-bg">
                  <th className="px-4 py-3 text-left font-medium text-text-secondary">Property / Unit</th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary">Current Rent</th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary">Market Rate</th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary">AI Suggested</th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary">Upside</th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {aiRentOptimization.map((r) => (
                  <tr key={r.unit} className="border-b border-border last:border-0 hover:bg-bg/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-text">{r.property}</p>
                      <p className="text-xs text-text-secondary">Unit {r.unit}</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-text-secondary">${r.currentRent.toLocaleString()}</td>
                    <td className="px-4 py-3 font-mono text-text-secondary">${r.marketRate.toLocaleString()}</td>
                    <td className="px-4 py-3 font-mono font-bold text-navy">${r.suggestedRent.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono font-bold text-success">{r.upside}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-12 rounded-full bg-bg">
                          <div
                            className="h-1.5 rounded-full bg-success"
                            style={{ width: `${r.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-text-secondary">{r.confidence}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Forecast */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm lg:col-span-2">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            Revenue Impact Forecast
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueImpactForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#666" />
              <YAxis tick={{ fontSize: 10 }} stroke="#666" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
              <Legend />
              <Area type="monotone" dataKey="current" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.1} name="Current Path" strokeDasharray="5 5" />
              <Area type="monotone" dataKey="optimized" stroke="#2E7D32" fill="#2E7D32" fillOpacity={0.15} strokeWidth={2.5} name="AI Optimized" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-3 rounded-lg bg-success-light p-3 text-center">
            <p className="text-sm font-bold text-success">
              +$36,850/yr projected with AI rent optimization
            </p>
          </div>
        </div>
      </div>

      {/* Predictive Maintenance */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Wrench size={16} className="text-warning" />
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
            Predictive Maintenance Alerts
          </h2>
          <span className="ml-auto text-xs text-text-secondary">AI analyzing equipment age, repair history, and seasonal patterns</span>
        </div>
        <div className="divide-y divide-border">
          {predictiveMaintenance.map((item, i) => (
            <div key={i} className="px-5 py-5 hover:bg-bg/50">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-text">{item.property}</h3>
                    <span className="text-text-secondary">—</span>
                    <span className="text-sm text-text-secondary">{item.item}</span>
                  </div>
                  <p className="text-sm font-medium text-critical mt-1">{item.prediction}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-secondary">Confidence:</span>
                  <span className={`font-mono text-sm font-bold ${item.confidence >= 80 ? "text-critical" : "text-warning"}`}>
                    {item.confidence}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-text-secondary mb-3">
                Based on: {item.basedOn}
              </p>
              <div className="flex gap-4">
                <div className="rounded-lg bg-critical-light px-3 py-2">
                  <p className="text-[10px] uppercase text-text-secondary font-medium">If it breaks</p>
                  <p className="text-sm font-bold text-critical">{item.estimatedCost}</p>
                </div>
                <div className="rounded-lg bg-success-light px-3 py-2">
                  <p className="text-[10px] uppercase text-text-secondary font-medium">Fix now</p>
                  <p className="text-sm font-bold text-success">{item.preventiveCost}</p>
                </div>
                <div className="rounded-lg bg-navy/5 px-3 py-2">
                  <p className="text-[10px] uppercase text-text-secondary font-medium">You save</p>
                  <p className="text-sm font-bold text-navy">
                    ${(parseInt(item.estimatedCost.replace(/[$,]/g, "")) - parseInt(item.preventiveCost.replace(/[$,]/g, ""))).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Scoring + Market Intel */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        {/* AI Lead Scoring */}
        <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Target size={16} className="text-navy" />
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              AI Lead Scoring
            </h2>
          </div>
          <div className="divide-y divide-border">
            {aiLeadScoring.map((lead) => (
              <div key={lead.name} className="px-5 py-4 hover:bg-bg/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${
                        lead.score >= 80
                          ? "bg-success"
                          : lead.score >= 50
                          ? "bg-navy"
                          : "bg-gray-400"
                      }`}
                    >
                      {lead.score}
                    </div>
                    <div>
                      <p className="font-medium text-text text-sm">{lead.name}</p>
                      <p className="text-xs text-text-secondary">{lead.property}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2 ml-12">
                  {lead.signals.map((signal, i) => (
                    <span key={i} className="rounded-full bg-bg px-2 py-0.5 text-[10px] text-text-secondary">
                      {signal}
                    </span>
                  ))}
                </div>
                <p className="ml-12 text-xs font-medium text-navy flex items-center gap-1">
                  <Zap size={11} />
                  {lead.predictedAction}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Market Intelligence */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={16} className="text-navy" />
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              AI Market Intelligence
            </h2>
          </div>
          <div className="rounded-lg bg-bg p-4 mb-4">
            <p className="text-sm text-text leading-relaxed">{aiMarketIntel.marketSummary}</p>
          </div>

          <h3 className="text-xs font-semibold text-success uppercase tracking-wider mb-2">
            Opportunities
          </h3>
          <ul className="space-y-2 mb-4">
            {aiMarketIntel.opportunities.map((opp, i) => (
              <li key={i} className="flex items-start gap-2 rounded-lg bg-success-light/50 p-3">
                <ArrowUpRight size={14} className="text-success mt-0.5 shrink-0" />
                <span className="text-xs text-text">{opp.text}</span>
                <StatusBadge level={opp.impact === "high" ? "success" : "neutral"} text={opp.impact} />
              </li>
            ))}
          </ul>

          <h3 className="text-xs font-semibold text-critical uppercase tracking-wider mb-2">
            Threats
          </h3>
          <ul className="space-y-2">
            {aiMarketIntel.threats.map((threat, i) => (
              <li key={i} className="flex items-start gap-2 rounded-lg bg-critical-light/50 p-3">
                <AlertTriangle size={14} className="text-critical mt-0.5 shrink-0" />
                <span className="text-xs text-text">{threat.text}</span>
                <StatusBadge level={threat.impact === "high" ? "critical" : "warning"} text={threat.impact} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI-Generated Owner Narrative */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <FileText size={16} className="text-navy" />
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
            AI-Generated Owner Narrative
          </h2>
          <span className="ml-auto rounded-full bg-navy/10 px-2.5 py-0.5 text-[11px] font-medium text-navy flex items-center gap-1">
            <Sparkles size={10} />
            Written by AI — not a data dump
          </span>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium text-text">{aiOwnerNarrative.owner}</p>
              <p className="text-xs text-text-secondary">Generated {aiOwnerNarrative.generated}</p>
            </div>
          </div>
          <div className="rounded-xl border border-navy/20 bg-navy/[0.02] p-6">
            {aiOwnerNarrative.narrative.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-sm text-text leading-relaxed mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-4 text-xs text-text-secondary italic">
            This narrative is auto-generated from your AppFolio data, AI call logs, maintenance records, and market analysis.
            It replaces the manual &quot;copy-paste-into-email&quot; process entirely. Owners get a story, not a spreadsheet.
          </p>
        </div>
      </div>
    </>
  );
}
