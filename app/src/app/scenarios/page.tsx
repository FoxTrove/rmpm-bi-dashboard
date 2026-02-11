"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import {
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const BASE = {
  totalUnits: 847,
  occupiedUnits: 811,
  avgRent: 1425,
  monthlyExpenses: 312400,
  vacancyRate: 4.2,
  annualRentGrowth: 3.0,
  expenseGrowth: 2.0,
  turnoverCost: 3500,
  avgTurnoverDays: 35,
};

function computeScenario(
  vacancyRate: number,
  rentAdjust: number,
  expenseChange: number,
  newUnits: number
) {
  const totalUnits = BASE.totalUnits + newUnits;
  const occupied = Math.round(totalUnits * (1 - vacancyRate / 100));
  const avgRent = BASE.avgRent * (1 + rentAdjust / 100);
  const monthlyRevenue = occupied * avgRent;
  const monthlyExpenses = (BASE.monthlyExpenses + newUnits * 380) * (1 + expenseChange / 100);
  const noi = monthlyRevenue - monthlyExpenses;
  const annualRevenue = monthlyRevenue * 12;
  const annualNOI = noi * 12;
  const noiMargin = (noi / monthlyRevenue) * 100;

  const baseOccupied = BASE.occupiedUnits;
  const baseRevenue = baseOccupied * BASE.avgRent;
  const baseNOI = baseRevenue - BASE.monthlyExpenses;
  const revenueDelta = monthlyRevenue - baseRevenue;
  const noiDelta = noi - baseNOI;

  // 12 month projection
  const projection = [];
  for (let m = 1; m <= 12; m++) {
    const monthName = new Date(2025, 1 + m, 1).toLocaleString("en-US", { month: "short" });
    const growthFactor = 1 + ((BASE.annualRentGrowth + rentAdjust) / 100) * (m / 12);
    const expFactor = 1 + ((BASE.expenseGrowth + expenseChange) / 100) * (m / 12);
    const projRev = occupied * avgRent * growthFactor;
    const projExp = monthlyExpenses * expFactor;
    const baselineRev = baseOccupied * BASE.avgRent * (1 + (BASE.annualRentGrowth / 100) * (m / 12));
    const baselineExp = BASE.monthlyExpenses * (1 + (BASE.expenseGrowth / 100) * (m / 12));
    projection.push({
      month: monthName,
      scenarioNOI: Math.round(projRev - projExp),
      baselineNOI: Math.round(baselineRev - baselineExp),
      scenarioRev: Math.round(projRev),
      baselineRev: Math.round(baselineRev),
    });
  }

  return {
    totalUnits,
    occupied,
    avgRent: Math.round(avgRent),
    monthlyRevenue: Math.round(monthlyRevenue),
    monthlyExpenses: Math.round(monthlyExpenses),
    noi: Math.round(noi),
    annualRevenue: Math.round(annualRevenue),
    annualNOI: Math.round(annualNOI),
    noiMargin: noiMargin.toFixed(1),
    revenueDelta: Math.round(revenueDelta),
    noiDelta: Math.round(noiDelta),
    projection,
  };
}

export default function Scenarios() {
  const [vacancyRate, setVacancyRate] = useState(BASE.vacancyRate);
  const [rentAdjust, setRentAdjust] = useState(0);
  const [expenseChange, setExpenseChange] = useState(0);
  const [newUnits, setNewUnits] = useState(0);

  const scenario = computeScenario(vacancyRate, rentAdjust, expenseChange, newUnits);
  const isPositive = scenario.noiDelta >= 0;

  return (
    <>
      <PageHeader
        title="What-If Scenario Modeler"
        subtitle="Drag the sliders — watch your financials change in real-time"
      />

      {/* Sliders */}
      <div className="rounded-xl bg-card border border-border p-6 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-5">
          <SlidersHorizontal size={16} className="text-navy" />
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
            Adjust Your Scenario
          </h2>
          <button
            onClick={() => { setVacancyRate(BASE.vacancyRate); setRentAdjust(0); setExpenseChange(0); setNewUnits(0); }}
            className="ml-auto text-xs text-navy hover:underline"
          >
            Reset to current
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {/* Vacancy Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-text">Vacancy Rate</label>
              <span className={`text-sm font-bold font-mono ${vacancyRate > BASE.vacancyRate ? "text-critical" : vacancyRate < BASE.vacancyRate ? "text-success" : "text-text"}`}>
                {vacancyRate.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={vacancyRate}
              onChange={(e) => setVacancyRate(parseFloat(e.target.value))}
              className="w-full accent-navy h-2 rounded-full"
            />
            <div className="flex justify-between text-[10px] text-text-secondary mt-1">
              <span>0% (Full)</span>
              <span className="text-navy font-medium">Current: {BASE.vacancyRate}%</span>
              <span>15%</span>
            </div>
          </div>

          {/* Rent Adjustment */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-text">Rent Adjustment</label>
              <span className={`text-sm font-bold font-mono ${rentAdjust > 0 ? "text-success" : rentAdjust < 0 ? "text-critical" : "text-text"}`}>
                {rentAdjust > 0 ? "+" : ""}{rentAdjust.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="15"
              step="0.5"
              value={rentAdjust}
              onChange={(e) => setRentAdjust(parseFloat(e.target.value))}
              className="w-full accent-navy h-2 rounded-full"
            />
            <div className="flex justify-between text-[10px] text-text-secondary mt-1">
              <span>-10%</span>
              <span className="text-navy font-medium">Current: $1,425 avg</span>
              <span>+15%</span>
            </div>
          </div>

          {/* Expense Change */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-text">Expense Change</label>
              <span className={`text-sm font-bold font-mono ${expenseChange > 0 ? "text-critical" : expenseChange < 0 ? "text-success" : "text-text"}`}>
                {expenseChange > 0 ? "+" : ""}{expenseChange.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="-15"
              max="20"
              step="0.5"
              value={expenseChange}
              onChange={(e) => setExpenseChange(parseFloat(e.target.value))}
              className="w-full accent-navy h-2 rounded-full"
            />
            <div className="flex justify-between text-[10px] text-text-secondary mt-1">
              <span>-15%</span>
              <span className="text-navy font-medium">Current: $312K/mo</span>
              <span>+20%</span>
            </div>
          </div>

          {/* Portfolio Growth */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-text">Add New Units</label>
              <span className={`text-sm font-bold font-mono ${newUnits > 0 ? "text-success" : "text-text"}`}>
                +{newUnits} units
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              step="10"
              value={newUnits}
              onChange={(e) => setNewUnits(parseInt(e.target.value))}
              className="w-full accent-navy h-2 rounded-full"
            />
            <div className="flex justify-between text-[10px] text-text-secondary mt-1">
              <span>0</span>
              <span className="text-navy font-medium">Current: 847 doors</span>
              <span>+200</span>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className={`rounded-xl p-6 shadow-sm mb-6 border-2 ${isPositive ? "bg-success-light/30 border-success/30" : "bg-critical-light/30 border-critical/30"}`}>
        <div className="flex items-center gap-2 mb-4">
          {isPositive ? (
            <TrendingUp size={20} className="text-success" />
          ) : (
            <TrendingDown size={20} className="text-critical" />
          )}
          <h2 className="text-lg font-bold text-text">
            {isPositive ? "This scenario improves your bottom line" : "This scenario reduces your bottom line"}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-4 border border-border">
            <p className="text-xs text-text-secondary">Monthly Revenue</p>
            <p className="text-xl font-bold text-text">${scenario.monthlyRevenue.toLocaleString()}</p>
            <p className={`text-xs font-medium mt-1 ${scenario.revenueDelta >= 0 ? "text-success" : "text-critical"}`}>
              {scenario.revenueDelta >= 0 ? "+" : ""}${scenario.revenueDelta.toLocaleString()}/mo vs current
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 border border-border">
            <p className="text-xs text-text-secondary">Monthly NOI</p>
            <p className="text-xl font-bold text-text">${scenario.noi.toLocaleString()}</p>
            <p className={`text-xs font-medium mt-1 ${scenario.noiDelta >= 0 ? "text-success" : "text-critical"}`}>
              {scenario.noiDelta >= 0 ? "+" : ""}${scenario.noiDelta.toLocaleString()}/mo vs current
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 border border-border">
            <p className="text-xs text-text-secondary">Annual NOI</p>
            <p className="text-xl font-bold text-text">${scenario.annualNOI.toLocaleString()}</p>
            <p className={`text-xs font-medium mt-1 ${scenario.noiDelta >= 0 ? "text-success" : "text-critical"}`}>
              {scenario.noiDelta >= 0 ? "+" : ""}${(scenario.noiDelta * 12).toLocaleString()}/yr impact
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 border border-border">
            <p className="text-xs text-text-secondary">NOI Margin</p>
            <p className="text-xl font-bold text-text">{scenario.noiMargin}%</p>
            <p className="text-xs text-text-secondary mt-1">
              {scenario.totalUnits} units, {scenario.occupied} occupied
            </p>
          </div>
        </div>
      </div>

      {/* 12-Month Projection Chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            12-Month NOI Projection
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={scenario.projection}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#666" />
              <YAxis tick={{ fontSize: 10 }} stroke="#666" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
              <Legend />
              <Area type="monotone" dataKey="baselineNOI" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.1} name="Current Path" strokeDasharray="5 5" />
              <Area type="monotone" dataKey="scenarioNOI" stroke={isPositive ? "#2E7D32" : "#C62828"} fill={isPositive ? "#2E7D32" : "#C62828"} fillOpacity={0.12} strokeWidth={2.5} name="Your Scenario" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            12-Month Revenue Projection
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={scenario.projection}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#666" />
              <YAxis tick={{ fontSize: 10 }} stroke="#666" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
              <Legend />
              <Area type="monotone" dataKey="baselineRev" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.1} name="Current Path" strokeDasharray="5 5" />
              <Area type="monotone" dataKey="scenarioRev" stroke="#1E3A5F" fill="#1E3A5F" fillOpacity={0.12} strokeWidth={2.5} name="Your Scenario" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="rounded-xl bg-gradient-to-r from-navy to-navy-light p-6 shadow-lg text-white">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-gold" />
          <h2 className="text-sm font-semibold uppercase tracking-wider">AI-Recommended Scenarios to Explore</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {[
            {
              title: "Optimize Underpriced Units",
              description: "Raise rent 3% on 6 identified below-market units at renewal. Projected impact: +$5,196/yr with zero vacancy risk.",
              action: () => { setRentAdjust(3); setVacancyRate(4.2); setExpenseChange(0); setNewUnits(0); },
            },
            {
              title: "Worst Case: Recession",
              description: "Model 8% vacancy + 5% expense increase. See how the portfolio holds up under stress. Spoiler: NOI stays positive.",
              action: () => { setVacancyRate(8); setExpenseChange(5); setRentAdjust(-2); setNewUnits(0); },
            },
            {
              title: "Growth: Add 100 Doors",
              description: "What if you add 100 units next year? See the revenue scale while expenses grow at a lower rate.",
              action: () => { setNewUnits(100); setVacancyRate(5); setRentAdjust(2); setExpenseChange(1); },
            },
          ].map((suggestion) => (
            <button
              key={suggestion.title}
              onClick={suggestion.action}
              className="rounded-lg bg-white/10 p-4 text-left hover:bg-white/15 transition-colors"
            >
              <p className="text-sm font-bold text-white mb-1">{suggestion.title}</p>
              <p className="text-xs text-white/60 mb-2">{suggestion.description}</p>
              <span className="text-xs text-gold font-medium flex items-center gap-1">
                Apply scenario <ArrowRight size={11} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
