"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  Calculator,
  DollarSign,
  Clock,
  TrendingUp,
  Users,
  Bot,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  Zap,
  Info,
} from "lucide-react";

type Estimate = "conservative" | "moderate";

const VALUE_DRIVERS = [
  {
    id: "vacancy",
    label: "Reduced Vacancy Time",
    icon: TrendingUp,
    source: "RentPrep, Multifamily Dive — avg turnover 20-30 days, cost $3,872/unit",
    assumptions: {
      conservative: "15% annual turnover, 50% of vacancies improved, 7 fewer days vacant",
      moderate: "15% annual turnover, 70% of vacancies improved, 10 fewer days vacant",
    },
    calculate: (doors: number, avgRent: number, est: Estimate) => {
      const turnovers = doors * 0.15;
      const pctImproved = est === "conservative" ? 0.5 : 0.7;
      const daysSaved = est === "conservative" ? 7 : 10;
      const dailyRent = avgRent / 30;
      return Math.round(turnovers * pctImproved * daysSaved * dailyRent);
    },
  },
  {
    id: "rent_optimization",
    label: "AI Rent Optimization",
    icon: DollarSign,
    source: "CBRE 2024 — AI-driven rent optimization increases effective rents 3-7% on applicable units",
    assumptions: {
      conservative: "20% of renewals are underpriced, avg 2.5% increase on those units only",
      moderate: "30% of renewals are underpriced, avg 3% increase on those units only",
    },
    calculate: (doors: number, avgRent: number, est: Estimate) => {
      const renewals = doors * 0.7;
      const pctUnderpriced = est === "conservative" ? 0.20 : 0.30;
      const avgIncreasePct = est === "conservative" ? 0.025 : 0.03;
      return Math.round(renewals * pctUnderpriced * (avgRent * avgIncreasePct) * 12);
    },
  },
  {
    id: "labor_savings",
    label: "Team Time Savings",
    icon: Clock,
    source: "Second Nature, AppFolio — PMs report 15-25 hrs/wk saved on admin, 6+ hrs on maintenance coordination",
    assumptions: {
      conservative: "25 hours/week saved across team at $28/hr avg loaded cost",
      moderate: "35 hours/week saved across team at $28/hr avg loaded cost",
    },
    calculate: (doors: number, _avgRent: number, est: Estimate) => {
      const baseHours = est === "conservative" ? 25 : 35;
      const scaledHours = Math.min(baseHours * 1.5, baseHours + (doors - 500) * 0.01);
      const hours = Math.max(baseHours, scaledHours);
      const hourlyRate = 28;
      return Math.round(hours * hourlyRate * 52);
    },
  },
  {
    id: "ai_calls",
    label: "AI Voice — After-Hours Leads",
    icon: Bot,
    source: "AbsentAnswer — 62% of after-hours calls missed; Dialzara — most callers never call back",
    assumptions: {
      conservative: "5 additional leases/month from captured after-hours leads, valued at 14 fewer vacancy days each",
      moderate: "8 additional leases/month from captured leads, valued at 14 fewer vacancy days each",
    },
    calculate: (_doors: number, avgRent: number, est: Estimate) => {
      const capturedLeasesPerMonth = est === "conservative" ? 5 : 8;
      const vacancyDaysSaved = 14;
      const dailyRent = avgRent / 30;
      return Math.round(capturedLeasesPerMonth * vacancyDaysSaved * dailyRent * 12);
    },
  },
  {
    id: "retention",
    label: "Improved Tenant Retention",
    icon: Users,
    source: "Renew AI — 3% in-unit retention improvement, 7% higher renewal rates with proactive outreach",
    assumptions: {
      conservative: "5% reduction in turnover, turnover cost = 2.5 months rent",
      moderate: "8% reduction in turnover, turnover cost = 2.5 months rent",
    },
    calculate: (doors: number, avgRent: number, est: Estimate) => {
      const turnovers = doors * 0.15;
      const improvement = est === "conservative" ? 0.05 : 0.08;
      const savedTurnovers = turnovers * improvement;
      const turnoverCost = avgRent * 2.5;
      return Math.round(savedTurnovers * turnoverCost);
    },
  },
  {
    id: "maintenance",
    label: "Predictive Maintenance Savings",
    icon: Shield,
    source: "McKinsey — 25-30% maintenance cost reduction with AI; preventive repairs 60-80% cheaper than emergency",
    assumptions: {
      conservative: "2% of units avoid emergency repair/yr, saving $2,000 per avoided emergency",
      moderate: "3% of units avoid emergency repair/yr, saving $2,300 per avoided emergency",
    },
    calculate: (doors: number, _avgRent: number, est: Estimate) => {
      const pct = est === "conservative" ? 0.02 : 0.03;
      const savingsPerEvent = est === "conservative" ? 2000 : 2300;
      return Math.round(doors * pct * savingsPerEvent);
    },
  },
  {
    id: "rent_engine",
    label: "Rent Engine Replacement",
    icon: Zap,
    source: "Direct cost elimination — verify actual subscription cost with team",
    assumptions: {
      conservative: "Estimated $6,000/yr subscription (verify with actual cost)",
      moderate: "Estimated $8,000/yr subscription (verify with actual cost)",
    },
    calculate: (_doors: number, _avgRent: number, est: Estimate) => {
      return est === "conservative" ? 6000 : 8000;
    },
  },
];

export default function ROICalculator() {
  const [doors, setDoors] = useState(847);
  const [avgRent, setAvgRent] = useState(1425);
  const [estimate, setEstimate] = useState<Estimate>("conservative");
  const [investmentAmount] = useState(150000);
  const [showAssumptions, setShowAssumptions] = useState(false);

  const values = VALUE_DRIVERS.map((driver) => ({
    ...driver,
    annualValue: driver.calculate(doors, avgRent, estimate),
    assumption: driver.assumptions[estimate],
  }));

  const totalAnnualValue = values.reduce((sum, v) => sum + v.annualValue, 0);
  const monthlyValue = Math.round(totalAnnualValue / 12);
  const roi = Math.round((totalAnnualValue / investmentAmount) * 100);
  const paybackMonths = Math.round((investmentAmount / monthlyValue) * 10) / 10;
  const threeYearValue = totalAnnualValue * 3;
  const threeYearNet = threeYearValue - investmentAmount;

  // 3-year projection
  const projectionData = [];
  let cumulativeValue = 0;
  for (let m = 1; m <= 36; m++) {
    cumulativeValue += monthlyValue;
    const monthName = m <= 12 ? `Y1-M${m}` : m <= 24 ? `Y2-M${m - 12}` : `Y3-M${m - 24}`;
    projectionData.push({
      month: monthName,
      cumulativeValue,
      investment: investmentAmount,
    });
  }

  const barData = values.map((v) => ({
    name: v.label.split("—")[0].trim().split(" ").slice(0, 2).join(" "),
    value: v.annualValue,
  }));

  return (
    <>
      <PageHeader
        title="ROI Calculator"
        subtitle="Projected return on your unified operations platform — backed by industry data"
      />

      {/* Estimate Toggle */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-medium text-text">Estimate:</span>
        <div className="flex rounded-lg border border-border overflow-hidden">
          <button
            onClick={() => setEstimate("conservative")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              estimate === "conservative"
                ? "bg-navy text-white"
                : "bg-card text-text-secondary hover:bg-bg"
            }`}
          >
            Conservative
          </button>
          <button
            onClick={() => setEstimate("moderate")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              estimate === "moderate"
                ? "bg-navy text-white"
                : "bg-card text-text-secondary hover:bg-bg"
            }`}
          >
            Moderate
          </button>
        </div>
        <button
          onClick={() => setShowAssumptions(!showAssumptions)}
          className="ml-auto flex items-center gap-1.5 text-xs text-navy hover:underline"
        >
          <Info size={13} />
          {showAssumptions ? "Hide" : "Show"} assumptions & sources
        </button>
      </div>

      {/* Hero Numbers */}
      <div className="rounded-2xl bg-gradient-to-br from-navy via-navy-light to-navy p-8 shadow-xl mb-6 text-white relative overflow-hidden">
        <div className="absolute -right-8 -top-8 opacity-5">
          <Calculator size={200} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-gold text-sm font-medium mb-4">
            <Sparkles size={14} />
            <span>{estimate === "conservative" ? "Conservative" : "Moderate"} Estimate — Based on Industry Benchmarks</span>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 mb-6">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Platform Investment</p>
              <p className="text-3xl font-bold">${investmentAmount.toLocaleString()}</p>
              <p className="text-xs text-white/40">One-time build</p>
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Year 1 Value</p>
              <p className="text-3xl font-bold text-gold">${totalAnnualValue.toLocaleString()}</p>
              <p className="text-xs text-white/40">${monthlyValue.toLocaleString()}/month</p>
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">First-Year ROI</p>
              <p className="text-3xl font-bold text-gold">{roi}%</p>
              <p className="text-xs text-white/40">Return on investment</p>
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Payback Period</p>
              <p className="text-3xl font-bold text-gold">{paybackMonths} months</p>
              <p className="text-xs text-white/40">Then pure upside</p>
            </div>
          </div>

          <div className="rounded-xl bg-white/10 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">3-Year Net Value (value created minus investment)</span>
              <span className="text-2xl font-bold text-gold">${threeYearNet.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Sliders */}
      <div className="rounded-xl bg-card border border-border p-6 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
          Your Portfolio Numbers
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-text">Doors Under Management</label>
              <span className="text-sm font-bold font-mono text-navy">{doors}</span>
            </div>
            <input type="range" min="100" max="2000" step="50" value={doors}
              onChange={(e) => setDoors(parseInt(e.target.value))}
              className="w-full accent-navy h-2 rounded-full" />
            <div className="flex justify-between text-[10px] text-text-secondary mt-1">
              <span>100</span><span>2,000</span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-text">Average Monthly Rent</label>
              <span className="text-sm font-bold font-mono text-navy">${avgRent.toLocaleString()}</span>
            </div>
            <input type="range" min="800" max="3000" step="25" value={avgRent}
              onChange={(e) => setAvgRent(parseInt(e.target.value))}
              className="w-full accent-navy h-2 rounded-full" />
            <div className="flex justify-between text-[10px] text-text-secondary mt-1">
              <span>$800</span><span>$3,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Value Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 mb-6">
        <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden lg:col-span-3">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              Value Breakdown
            </h2>
          </div>
          <div className="divide-y divide-border">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.id} className="px-5 py-4 hover:bg-bg/50">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/10">
                        <Icon size={15} className="text-navy" />
                      </div>
                      <span className="text-sm font-medium text-text">{v.label}</span>
                    </div>
                    <span className="text-sm font-bold font-mono text-success">
                      +${v.annualValue.toLocaleString()}/yr
                    </span>
                  </div>
                  {showAssumptions && (
                    <div className="ml-11 mt-2 space-y-1">
                      <p className="text-xs text-navy bg-navy/5 rounded px-2 py-1 inline-block">
                        Assumption: {v.assumption}
                      </p>
                      <p className="text-[11px] text-text-secondary italic">
                        Source: {v.source}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="px-5 py-4 bg-navy/5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-text">Total Annual Value</span>
                <span className="text-lg font-bold font-mono text-success">
                  ${totalAnnualValue.toLocaleString()}/yr
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm lg:col-span-2">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            Value by Category
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 10 }} stroke="#666" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} stroke="#666" width={90} />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Annual Value"]} />
              <Bar dataKey="value" fill="#1E3A5F" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3-Year Projection */}
      <div className="rounded-xl bg-card border border-border p-5 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
          3-Year Cumulative Value vs Investment
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={projectionData.filter((_, i) => i % 3 === 0 || i === projectionData.length - 1)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#666" />
            <YAxis tick={{ fontSize: 10 }} stroke="#666" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
            <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
            <Legend />
            <Area type="monotone" dataKey="investment" stroke="#C62828" fill="#C62828" fillOpacity={0.05} strokeDasharray="8 4" name="Investment" strokeWidth={2} />
            <Area type="monotone" dataKey="cumulativeValue" stroke="#2E7D32" fill="#2E7D32" fillOpacity={0.12} strokeWidth={2.5} name="Cumulative Value" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* What You Replace */}
      <div className="rounded-xl bg-card border border-border p-6 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
          What This Replaces
        </h2>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {[
            { old: "Rent Engine subscription", new: "Built-in voice AI + widget + reporting", savings: "Direct cost cut" },
            { old: "Manual owner report generation", new: "AI-written reports delivered 2x/week automatically", savings: "~15 hrs/week" },
            { old: "Spreadsheet KPI tracking", new: "Real-time dashboard with 50+ live metrics", savings: "~10 hrs/week" },
            { old: "Multiple logins and disconnected systems", new: "Single command center for all operations", savings: "~8 hrs/week" },
            { old: "Reactive maintenance (fix when it breaks)", new: "AI predictive alerts before failure", savings: "60-80% cheaper" },
            { old: "Guessing at rent pricing", new: "Market-data-driven per-unit optimization", savings: "3-7% lift (CBRE)" },
          ].map((item) => (
            <div key={item.old} className="flex items-center gap-3 rounded-lg border border-border p-3">
              <div className="flex-1">
                <p className="text-xs text-critical line-through">{item.old}</p>
                <p className="text-sm font-medium text-text flex items-center gap-1.5 mt-0.5">
                  <ArrowRight size={12} className="text-success" /> {item.new}
                </p>
              </div>
              <span className="rounded-full bg-success-light px-2.5 py-1 text-[11px] font-bold text-success whitespace-nowrap">
                {item.savings}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-navy to-navy-light p-8 shadow-xl text-white text-center">
        <Sparkles size={28} className="text-gold mx-auto mb-3" />
        <h2 className="text-xl font-bold mb-2">
          ${investmentAmount.toLocaleString()} investment. ${totalAnnualValue.toLocaleString()}/year in value. {paybackMonths}-month payback.
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto mb-4">
          This isn&apos;t another software subscription. It&apos;s a custom-built operations platform designed around
          exactly how RPM Rockies works — fully owned, no per-seat fees, no monthly charges.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
          {[
            "You own the code",
            "No monthly fees",
            "No per-door pricing",
            "Scales to 5,000+ doors",
          ].map((point) => (
            <span key={point} className="flex items-center gap-1.5 text-white/70">
              <CheckCircle2 size={13} className="text-gold" /> {point}
            </span>
          ))}
        </div>
      </div>

      {/* Methodology Note */}
      <div className="mt-6 rounded-lg bg-bg border border-border p-4">
        <p className="text-xs text-text-secondary leading-relaxed">
          <strong>Methodology:</strong> All projections use industry benchmark data from CBRE, McKinsey, RentPrep,
          Multifamily Dive, Second Nature, and AppFolio published research. Conservative estimates use lower-bound
          assumptions; moderate estimates use midpoint industry data. Actual results depend on implementation quality,
          market conditions, and team adoption. The Rent Engine replacement cost should be verified with your actual
          subscription pricing. These projections do not account for ongoing maintenance costs of the platform
          (estimated ~$2-4K/month for hosting, updates, and support).
        </p>
      </div>
    </>
  );
}
