"use client";

import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import DataSourceBadge from "@/components/DataSourceBadge";
import { SkeletonPage } from "@/components/Skeleton";
import { useAppFolioData } from "@/hooks/useAppFolioData";
import type { DashboardPortfolioData } from "@/lib/transformers/portfolio";
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

const COLORS = ["#1E3A5F", "#E5E7EB"];

const fallback: DashboardPortfolioData = {
  properties: [
    { name: "Oak Apartments", units: 48, occupied: 46, vacancy: "4.2%", rent: "$72,450", status: "success" },
    { name: "Pine Court", units: 32, occupied: 31, vacancy: "3.1%", rent: "$49,200", status: "success" },
    { name: "Maple Ridge", units: 24, occupied: 22, vacancy: "8.3%", rent: "$33,000", status: "warning" },
    { name: "Cedar Heights", units: 56, occupied: 54, vacancy: "3.6%", rent: "$86,400", status: "success" },
    { name: "Birch Terrace", units: 18, occupied: 18, vacancy: "0%", rent: "$28,800", status: "success" },
    { name: "Elm Ridge", units: 40, occupied: 37, vacancy: "7.5%", rent: "$55,500", status: "warning" },
    { name: "Spruce Commons", units: 28, occupied: 27, vacancy: "3.6%", rent: "$43,200", status: "success" },
    { name: "Willow Park", units: 64, occupied: 62, vacancy: "3.1%", rent: "$99,200", status: "success" },
  ],
  vacancyByProperty: [
    { name: "Oak", vacancy: 4.2 },
    { name: "Pine", vacancy: 3.1 },
    { name: "Maple", vacancy: 8.3 },
    { name: "Cedar", vacancy: 3.6 },
    { name: "Birch", vacancy: 0 },
    { name: "Elm", vacancy: 7.5 },
    { name: "Spruce", vacancy: 3.6 },
    { name: "Willow", vacancy: 3.1 },
  ],
  occupancyPie: [
    { name: "Occupied", value: 297 },
    { name: "Vacant", value: 13 },
  ],
  summaryCards: [
    { label: "Total Properties", value: "8" },
    { label: "Total Units", value: "310" },
    { label: "Avg Occupancy", value: "95.8%" },
    { label: "Total Monthly Rent", value: "$467,750" },
  ],
};

export default function Portfolio() {
  const { data, source, error, isLoading } = useAppFolioData<DashboardPortfolioData>(
    "/api/appfolio/portfolio",
    fallback
  );

  const { properties, vacancyByProperty, occupancyPie, summaryCards } = data!;
  const totalUnits = occupancyPie.reduce((sum, d) => sum + d.value, 0);

  return (
    <>
      <PageHeader
        title="Portfolio Performance"
        subtitle={`All properties at a glance — ${totalUnits} doors under management`}
      />

      <div className="mb-4 flex justify-end">
        <DataSourceBadge source={source} error={error} />
      </div>

      {isLoading ? (
        <SkeletonPage />
      ) : (
      <>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
        {summaryCards.map((card) => (
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
              <span className="h-2.5 w-2.5 rounded-full bg-navy" /> Occupied ({occupancyPie[0]?.value ?? 0})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-border" /> Vacant ({occupancyPie[1]?.value ?? 0})
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
                  <td className="px-5 py-3">
                    <StatusBadge level={p.status} text={p.status === "success" ? "Healthy" : "Attention"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}
    </>
  );
}
