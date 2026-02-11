"use client";

import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const properties = [
  { name: "Oak Apartments", units: 48, occupied: 46, vacancy: "4.2%", rent: "$72,450", maintenance: 3, status: "success" as const },
  { name: "Pine Court", units: 32, occupied: 31, vacancy: "3.1%", rent: "$49,200", maintenance: 1, status: "success" as const },
  { name: "Maple Ridge", units: 24, occupied: 22, vacancy: "8.3%", rent: "$33,000", maintenance: 5, status: "warning" as const },
  { name: "Cedar Heights", units: 56, occupied: 54, vacancy: "3.6%", rent: "$86,400", maintenance: 2, status: "success" as const },
  { name: "Birch Terrace", units: 18, occupied: 18, vacancy: "0%", rent: "$28,800", maintenance: 0, status: "success" as const },
  { name: "Elm Ridge", units: 40, occupied: 37, vacancy: "7.5%", rent: "$55,500", maintenance: 4, status: "warning" as const },
  { name: "Spruce Commons", units: 28, occupied: 27, vacancy: "3.6%", rent: "$43,200", maintenance: 1, status: "success" as const },
  { name: "Willow Park", units: 64, occupied: 62, vacancy: "3.1%", rent: "$99,200", maintenance: 3, status: "success" as const },
];

const vacancyByProperty = properties.map((p) => ({
  name: p.name.split(" ")[0],
  vacancy: parseFloat(p.vacancy),
}));

const occupancyPie = [
  { name: "Occupied", value: 811 },
  { name: "Vacant", value: 36 },
];

const COLORS = ["#1E3A5F", "#E5E7EB"];

const maintenanceSummary = [
  { category: "Plumbing", count: 8 },
  { category: "Electrical", count: 4 },
  { category: "HVAC", count: 6 },
  { category: "Appliance", count: 5 },
  { category: "General", count: 12 },
];

export default function Portfolio() {
  return (
    <>
      <PageHeader
        title="Portfolio Performance"
        subtitle="All properties at a glance — 847 doors under management"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
        {[
          { label: "Total Properties", value: "23" },
          { label: "Total Units", value: "847" },
          { label: "Avg Occupancy", value: "95.8%" },
          { label: "Total Monthly Rent", value: "$467,750" },
        ].map((card) => (
          <div key={card.label} className="rounded-xl bg-card border border-border p-5 shadow-sm">
            <p className="text-sm font-medium text-text-secondary">{card.label}</p>
            <p className="mt-1 text-2xl font-bold text-text">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        {/* Vacancy by Property */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm lg:col-span-2">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            Vacancy Rate by Property
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={vacancyByProperty}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#666" />
              <YAxis tick={{ fontSize: 12 }} stroke="#666" tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value) => [`${value}%`, "Vacancy"]} />
              <Bar dataKey="vacancy" fill="#1E3A5F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Occupancy Pie */}
        <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            Overall Occupancy
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={occupancyPie}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                dataKey="value"
                strokeWidth={0}
              >
                {occupancyPie.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 text-xs text-text-secondary">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-navy" /> Occupied (811)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-border" /> Vacant (36)
            </span>
          </div>
        </div>
      </div>

      {/* Properties Table */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
            All Properties
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg">
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Property</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Units</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Occupied</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Vacancy</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Monthly Rent</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Open Maint.</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-bg/50">
                  <td className="px-5 py-3 font-medium text-text">{p.name}</td>
                  <td className="px-5 py-3 text-text-secondary">{p.units}</td>
                  <td className="px-5 py-3 text-text-secondary">{p.occupied}</td>
                  <td className="px-5 py-3 text-text-secondary">{p.vacancy}</td>
                  <td className="px-5 py-3 font-mono text-text">{p.rent}</td>
                  <td className="px-5 py-3 text-text-secondary">{p.maintenance}</td>
                  <td className="px-5 py-3">
                    <StatusBadge level={p.status} text={p.status === "success" ? "Healthy" : "Attention"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance Overview */}
      <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
          Maintenance by Category
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={maintenanceSummary} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis type="number" tick={{ fontSize: 12 }} stroke="#666" />
            <YAxis dataKey="category" type="category" tick={{ fontSize: 12 }} stroke="#666" width={80} />
            <Tooltip />
            <Bar dataKey="count" fill="#C41230" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
