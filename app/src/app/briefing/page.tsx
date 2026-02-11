"use client";

import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import {
  Sun,
  AlertTriangle,
  Trophy,
  Target,
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Phone,
  Calendar,
  Sparkles,
} from "lucide-react";

const today = new Date();
const dateStr = today.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function MorningBriefing() {
  return (
    <>
      <PageHeader
        title="Morning Briefing"
        subtitle="AI-generated daily executive summary — personalized for you"
      />

      {/* Greeting Card */}
      <div className="rounded-2xl bg-gradient-to-br from-navy via-navy-light to-navy p-8 shadow-lg mb-6 text-white relative overflow-hidden">
        <div className="absolute top-4 right-6 opacity-10">
          <Sun size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-gold text-sm font-medium mb-2">
            <Sparkles size={14} />
            <span>AI-Generated Briefing</span>
            <span className="text-white/30 mx-2">|</span>
            <span className="text-white/50">{dateStr}</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Good morning, Jarid.</h2>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
            Your portfolio is performing well. Occupancy is up, collections are strong, and the AI
            handled 94% of after-hours calls last night. There are <strong className="text-gold">3 items
            that need your attention</strong> and <strong className="text-gold">2 wins worth celebrating</strong>.
          </p>
        </div>
      </div>

      {/* Three columns: Attention / Wins / Today's Numbers */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">

        {/* Needs Attention */}
        <div className="rounded-xl bg-card border border-border shadow-sm">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <AlertTriangle size={16} className="text-critical" />
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              Needs Your Attention
            </h2>
            <span className="ml-auto rounded-full bg-critical-light px-2 py-0.5 text-[11px] font-bold text-critical">3</span>
          </div>
          <div className="p-5 space-y-4">
            <div className="rounded-lg bg-critical-light/50 p-4 border border-critical/10">
              <div className="flex items-center gap-2 mb-1">
                <StatusBadge level="critical" text="Urgent" />
                <span className="text-xs text-text-secondary">Leasing</span>
              </div>
              <p className="text-sm font-medium text-text mb-1">
                3 leads have gone &gt;2 hours without a response
              </p>
              <p className="text-xs text-text-secondary">
                James T. (456 Oak Ave) and Tom H. (987 Spruce Way) are unassigned. Sarah M. is waiting on a callback.
              </p>
              <p className="text-xs font-medium text-navy mt-2 flex items-center gap-1 cursor-pointer hover:underline">
                <ArrowRight size={11} /> View in Leasing Pipeline
              </p>
            </div>

            <div className="rounded-lg bg-warning-light/50 p-4 border border-warning/10">
              <div className="flex items-center gap-2 mb-1">
                <StatusBadge level="warning" text="Action Needed" />
                <span className="text-xs text-text-secondary">Renewals</span>
              </div>
              <p className="text-sm font-medium text-text mb-1">
                Martinez (Oak Apts 4B) — lease expires in 7 days, zero contact
              </p>
              <p className="text-xs text-text-secondary">
                This is a $1,650/mo unit. AI risk score: 92. If we lose this tenant, estimated 45-day vacancy = $2,475 lost revenue.
              </p>
              <p className="text-xs font-medium text-navy mt-2 flex items-center gap-1 cursor-pointer hover:underline">
                <ArrowRight size={11} /> View in Renewals Center
              </p>
            </div>

            <div className="rounded-lg bg-warning-light/50 p-4 border border-warning/10">
              <div className="flex items-center gap-2 mb-1">
                <StatusBadge level="warning" text="Review" />
                <span className="text-xs text-text-secondary">Maintenance</span>
              </div>
              <p className="text-sm font-medium text-text mb-1">
                AI flagged HVAC system at Willow Park (Units 15-22) for preventive maintenance
              </p>
              <p className="text-xs text-text-secondary">
                87% confidence of failure within 30 days. Fix now: $850. Emergency repair: $4,200+.
                Recommend scheduling this week.
              </p>
              <p className="text-xs font-medium text-navy mt-2 flex items-center gap-1 cursor-pointer hover:underline">
                <ArrowRight size={11} /> View AI Recommendation
              </p>
            </div>
          </div>
        </div>

        {/* Wins */}
        <div className="rounded-xl bg-card border border-border shadow-sm">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Trophy size={16} className="text-gold" />
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              Wins to Celebrate
            </h2>
            <span className="ml-auto rounded-full bg-success-light px-2 py-0.5 text-[11px] font-bold text-success">2</span>
          </div>
          <div className="p-5 space-y-4">
            <div className="rounded-lg bg-success-light/50 p-4 border border-success/10">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-success" />
                <p className="text-sm font-medium text-text">Vacancy rate hit a 12-month low</p>
              </div>
              <p className="text-xs text-text-secondary">
                4.2% — down from 5.8% in September. That&apos;s 14 more units occupied, generating an additional $19,950/mo in revenue vs 6 months ago.
              </p>
            </div>

            <div className="rounded-lg bg-success-light/50 p-4 border border-success/10">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-success" />
                <p className="text-sm font-medium text-text">Maria S. closed 5 leases this week</p>
              </div>
              <p className="text-xs text-text-secondary">
                Her average lead-to-lease time is 8 days, vs team average of 14. She&apos;s on pace for her best month ever. Consider sharing this with the team as a benchmark.
              </p>
            </div>

            {/* Quiet wins */}
            <div className="border-t border-border pt-3 mt-3">
              <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Running Smoothly</p>
              <ul className="space-y-2 text-xs text-text-secondary">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-success" />
                  142 owner reports delivered automatically this week
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-success" />
                  AI voice answered 94% of after-hours calls — 0 missed leads
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-success" />
                  All AppFolio data syncing in real-time — no manual entry
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-success" />
                  Rent collection at 97.3% — ahead of last month
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Today's Numbers */}
        <div className="rounded-xl bg-card border border-border shadow-sm">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Target size={16} className="text-navy" />
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              Today&apos;s Snapshot
            </h2>
          </div>
          <div className="p-5 space-y-4">
            {[
              { icon: DollarSign, label: "Revenue MTD", value: "$467,750", sub: "On track for $471K target", good: true },
              { icon: TrendingUp, label: "Occupancy", value: "95.8%", sub: "1.8% above market average", good: true },
              { icon: Phone, label: "AI Calls (Last 24h)", value: "34", sub: "31 resolved, 3 escalated", good: true },
              { icon: Users, label: "Active Leads", value: "127", sub: "12 showings scheduled today", good: true },
              { icon: Calendar, label: "Renewals This Week", value: "4 due", sub: "2 signed, 1 negotiating, 1 no contact", good: false },
              { icon: Clock, label: "Avg Response Time", value: "12 min", sub: "Target: <15 min", good: true },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.good ? "bg-navy/10" : "bg-warning-light"}`}>
                    <Icon size={16} className={item.good ? "text-navy" : "text-amber-700"} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">{item.label}</span>
                      <span className="text-sm font-bold text-text">{item.value}</span>
                    </div>
                    <p className="text-[11px] text-text-secondary">{item.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Focus Areas */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
            Recommended Team Focus Today
          </h2>
          <p className="text-xs text-text-secondary mt-1">AI-prioritized based on urgency, revenue impact, and deadlines</p>
        </div>
        <div className="divide-y divide-border">
          {[
            { person: "Maria S.", tasks: ["Call Martinez re: renewal (Oak Apts 4B) — $1,650/mo at risk", "Follow up on 2 pending applications"], priority: "critical" },
            { person: "Chris T.", tasks: ["Respond to James T. lead (456 Oak Ave) — 3 hours waiting", "Prepare renewal offer for Johnson (Pine Ct 12)"], priority: "warning" },
            { person: "Devon R.", tasks: ["Schedule HVAC preventive maintenance at Willow Park", "Complete 3 overdue maintenance inspections"], priority: "warning" },
            { person: "Jordan K.", tasks: ["Respond to Tom H. lead (987 Spruce Way) — 1.5 hours waiting", "Review and assign 2 new maintenance requests"], priority: "warning" },
          ].map((person) => (
            <div key={person.person} className="px-5 py-4 hover:bg-bg/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-text text-sm">{person.person}</span>
                <StatusBadge
                  level={person.priority as "critical" | "warning"}
                  text={person.priority === "critical" ? "High Priority" : "Action Items"}
                />
              </div>
              <ul className="space-y-1.5">
                {person.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy/40" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* AI Confidence Note */}
      <div className="rounded-lg bg-navy/5 border border-navy/10 p-4 text-center">
        <p className="text-xs text-text-secondary">
          This briefing was generated automatically by analyzing your AppFolio data, AI call logs, maintenance records, leasing pipeline,
          and market trends. It updates every morning at 6:00am MT and is also emailed to you.
        </p>
        <p className="text-[11px] text-text-secondary/60 mt-1">
          No human assembled this report. The system sees everything and tells you only what matters.
        </p>
      </div>
    </>
  );
}
