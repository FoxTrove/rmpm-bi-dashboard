"use client";

import PageHeader from "@/components/PageHeader";
import DemoDataBanner from "@/components/DemoDataBanner";
import { integrationCategories } from "@/lib/mock-data";
import { CheckCircle2, Circle, ArrowRight, Plug, Zap } from "lucide-react";

const statusStyles = {
  connected: { dot: "bg-success", text: "text-success", label: "Connected", bg: "bg-success-light/50 border-success/20" },
  active: { dot: "bg-success", text: "text-success", label: "Active", bg: "bg-success-light/50 border-success/20" },
  live: { dot: "bg-success", text: "text-success", label: "Live", bg: "bg-success-light/50 border-success/20" },
  synced: { dot: "bg-success", text: "text-success", label: "Synced", bg: "bg-success-light/50 border-success/20" },
  available: { dot: "bg-gray-300", text: "text-text-secondary", label: "Available", bg: "bg-bg border-border" },
};

const logoBg: Record<string, string> = {
  AF: "bg-blue-600", Z: "bg-blue-500", A: "bg-red-600", R: "bg-red-500",
  FB: "bg-blue-700", VA: "bg-purple-600", TW: "bg-red-500", SG: "bg-blue-500",
  OA: "bg-gray-900", ST: "bg-indigo-600", PL: "bg-gray-800", QB: "bg-green-600",
  DS: "bg-yellow-500", GD: "bg-blue-500", TU: "bg-blue-800", RP: "bg-orange-500",
  SL: "bg-gray-700", NE: "bg-sky-500", WS: "bg-cyan-600",
};

export default function Integrations() {
  const connectedCount = integrationCategories.reduce(
    (sum, cat) => sum + cat.integrations.filter((i) => i.status !== "available").length,
    0
  );
  const totalCount = integrationCategories.reduce(
    (sum, cat) => sum + cat.integrations.length,
    0
  );

  return (
    <>
      <PageHeader
        title="Integrations Hub"
        subtitle="Every tool connected — one unified data layer"
      />
      <DemoDataBanner />

      {/* Summary Banner */}
      <div className="rounded-xl bg-gradient-to-r from-navy to-navy-light p-6 shadow-lg mb-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <Plug size={28} className="text-gold" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{connectedCount} Active Integrations</h2>
              <p className="text-sm text-white/60">
                {totalCount - connectedCount} additional integrations available to connect
              </p>
            </div>
          </div>
          <div className="hidden lg:flex gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-gold">Real-time</p>
              <p className="text-xs text-white/50">Data Sync</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gold">Zero</p>
              <p className="text-xs text-white/50">Manual Entry</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gold">1</p>
              <p className="text-xs text-white/50">Dashboard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Flow Diagram */}
      <div className="rounded-xl bg-card border border-border p-6 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-5">
          How Data Flows Through Your System
        </h2>
        <div className="flex items-center justify-center gap-2 flex-wrap py-4">
          {[
            { label: "AppFolio", sub: "Source of truth" },
            { label: "RPM Command Center", sub: "Unified layer", highlight: true },
            { label: "Owner Reports", sub: "Auto-generated" },
          ].map((node, i) => (
            <div key={node.label} className="flex items-center gap-2">
              <div
                className={`rounded-xl px-5 py-3 text-center border-2 ${
                  node.highlight
                    ? "border-navy bg-navy text-white shadow-lg"
                    : "border-border bg-card text-text"
                }`}
              >
                <p className="font-bold text-sm">{node.label}</p>
                <p className={`text-[10px] ${node.highlight ? "text-white/60" : "text-text-secondary"}`}>
                  {node.sub}
                </p>
              </div>
              {i < 2 && <ArrowRight size={20} className="text-text-secondary mx-1" />}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-2 text-xs text-text-secondary">
          <span className="flex items-center gap-1"><Zap size={10} className="text-success" /> Zillow, Apartments.com, Facebook</span>
          <span className="flex items-center gap-1"><Zap size={10} className="text-success" /> Voice AI, SMS, Email</span>
          <span className="flex items-center gap-1"><Zap size={10} className="text-success" /> Stripe, DocuSign, Screening</span>
        </div>
      </div>

      {/* Integration Categories */}
      <div className="space-y-6">
        {integrationCategories.map((category) => (
          <div key={category.category}>
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-3">
              {category.category}
            </h2>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {category.integrations.map((integration) => {
                const style = statusStyles[integration.status as keyof typeof statusStyles] || statusStyles.available;
                const bg = logoBg[integration.logo] || "bg-gray-500";
                return (
                  <div
                    key={integration.name}
                    className={`rounded-xl border p-4 shadow-sm transition-all hover:shadow-md ${style.bg}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} text-white font-bold text-xs`}>
                        {integration.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-semibold text-text text-sm">{integration.name}</h3>
                          <div className="flex items-center gap-1">
                            {integration.status !== "available" ? (
                              <CheckCircle2 size={13} className="text-success" />
                            ) : (
                              <Circle size={13} className="text-gray-300" />
                            )}
                            <span className={`text-[11px] font-medium ${style.text}`}>
                              {style.label}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-text-secondary mb-2">{integration.description}</p>
                        {integration.status !== "available" ? (
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-text-secondary">
                            <span>Sync: {integration.syncFrequency}</span>
                            <span>Last: {integration.lastSync}</span>
                            <span className="text-navy font-medium">{integration.dataPoints}</span>
                          </div>
                        ) : (
                          <button className="rounded-lg border border-navy/30 px-3 py-1 text-[11px] font-medium text-navy hover:bg-navy/5 transition-colors">
                            Connect
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
