"use client";

import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import DataSourceBadge from "@/components/DataSourceBadge";
import { SkeletonPage } from "@/components/Skeleton";
import { useAppFolioData } from "@/hooks/useAppFolioData";
import type { BriefingData } from "@/lib/briefing/generate";
import {
  Sun,
  AlertTriangle,
  Trophy,
  Target,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const today = new Date();
const dateStr = today.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const fallbackBriefing: BriefingData = {
  greeting:
    "Good morning, Jarid. Your portfolio is performing well. Occupancy is strong and the team is on track. There are a few items that need your attention and some wins worth celebrating.",
  attentionItems: [
    {
      level: "critical",
      category: "Leasing",
      title: "3 leads waiting for response",
      detail:
        "Multiple leads have gone over 2 hours without a response. Assign or follow up to avoid losing potential tenants.",
    },
    {
      level: "warning",
      category: "Renewals",
      title: "Lease expiring with no contact",
      detail:
        "At least one unit has a lease expiring within 7 days and zero outreach has been made. Revenue is at risk.",
    },
    {
      level: "warning",
      category: "Maintenance",
      title: "Preventive maintenance flagged",
      detail:
        "AI flagged an HVAC system for preventive maintenance. Fix now is significantly cheaper than an emergency repair.",
    },
  ],
  wins: [
    {
      title: "Vacancy rate trending down",
      detail:
        "Your vacancy rate is below the market average. The leasing team has been closing well this month.",
    },
    {
      title: "Strong rent collection",
      detail:
        "Collections are on pace for target this month. Keep the momentum going.",
    },
  ],
  teamFocus: [
    {
      person: "Maria S.",
      priority: "critical",
      tasks: [
        "Call tenant re: renewal — revenue at risk",
        "Follow up on 2 pending applications",
      ],
    },
    {
      person: "Chris T.",
      priority: "warning",
      tasks: [
        "Respond to waiting leads",
        "Prepare renewal offer for upcoming expiration",
      ],
    },
    {
      person: "Devon R.",
      priority: "warning",
      tasks: [
        "Schedule preventive maintenance",
        "Complete overdue maintenance inspections",
      ],
    },
  ],
  snapshot: [
    { label: "Occupancy", value: "95.8%", sub: "Above market average", good: true },
    { label: "Vacancy Rate", value: "4.2%", sub: "Trending down", good: true },
    { label: "Active Leads", value: "127", sub: "12 showings scheduled", good: true },
    { label: "Renewals Due (30d)", value: "4 due", sub: "Review renewals center", good: false },
    { label: "Avg Response Time", value: "12 min", sub: "Target: <15 min", good: true },
  ],
};

export default function MorningBriefing() {
  const { data, source, error, isLoading } = useAppFolioData<BriefingData>(
    "/api/briefing",
    fallbackBriefing
  );

  const briefing = data!;

  const badgeSource = source === "appfolio" ? "appfolio" : source;

  return (
    <>
      <PageHeader
        title="Morning Briefing"
        subtitle="AI-generated daily executive summary — personalized for you"
      />

      <div className="mb-4 flex justify-end">
        {source === "appfolio" ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700">
            <Sparkles size={12} />
            AI-Generated
          </span>
        ) : (
          <DataSourceBadge source={badgeSource} error={error} />
        )}
      </div>

      {isLoading ? (
        <SkeletonPage />
      ) : (
      <>
      {/* Greeting Card */}
      <div className="rounded-2xl bg-gradient-to-br from-navy via-navy-light to-navy p-8 shadow-lg mb-6 text-white relative overflow-hidden">
        <div className="absolute top-4 right-6 opacity-10">
          <Sun size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-gold text-sm font-medium mb-2">
            <Sparkles size={14} />
            <span>{source === "appfolio" ? "AI-Generated Briefing" : "Demo Briefing"}</span>
            <span className="text-white/30 mx-2">|</span>
            <span className="text-white/50">{dateStr}</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Good morning, Jarid.</h2>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
            {briefing.greeting}
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
            <span className="ml-auto rounded-full bg-critical-light px-2 py-0.5 text-[11px] font-bold text-critical">
              {briefing.attentionItems.length}
            </span>
          </div>
          <div className="p-5 space-y-4">
            {briefing.attentionItems.map((item, i) => (
              <div
                key={i}
                className={`rounded-lg p-4 border ${
                  item.level === "critical"
                    ? "bg-critical-light/50 border-critical/10"
                    : "bg-warning-light/50 border-warning/10"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <StatusBadge
                    level={item.level}
                    text={item.level === "critical" ? "Urgent" : "Action Needed"}
                  />
                  <span className="text-xs text-text-secondary">{item.category}</span>
                </div>
                <p className="text-sm font-medium text-text mb-1">{item.title}</p>
                <p className="text-xs text-text-secondary">{item.detail}</p>
                {item.link && (
                  <p className="text-xs font-medium text-navy mt-2 flex items-center gap-1 cursor-pointer hover:underline">
                    <ArrowRight size={11} /> {item.link}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Wins */}
        <div className="rounded-xl bg-card border border-border shadow-sm">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Trophy size={16} className="text-gold" />
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              Wins to Celebrate
            </h2>
            <span className="ml-auto rounded-full bg-success-light px-2 py-0.5 text-[11px] font-bold text-success">
              {briefing.wins.length}
            </span>
          </div>
          <div className="p-5 space-y-4">
            {briefing.wins.map((win, i) => (
              <div key={i} className="rounded-lg bg-success-light/50 p-4 border border-success/10">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} className="text-success" />
                  <p className="text-sm font-medium text-text">{win.title}</p>
                </div>
                <p className="text-xs text-text-secondary">{win.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Snapshot */}
        <div className="rounded-xl bg-card border border-border shadow-sm">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Target size={16} className="text-navy" />
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              Today&apos;s Snapshot
            </h2>
          </div>
          <div className="p-5 space-y-4">
            {briefing.snapshot.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.good ? "bg-navy/10" : "bg-warning-light"}`}>
                  <Target size={16} className={item.good ? "text-navy" : "text-amber-700"} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">{item.label}</span>
                    <span className="text-sm font-bold text-text">{item.value}</span>
                  </div>
                  <p className="text-[11px] text-text-secondary">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Focus Areas */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
            Recommended Team Focus Today
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            {source === "appfolio"
              ? "AI-prioritized based on your real AppFolio data"
              : "AI-prioritized based on urgency, revenue impact, and deadlines"}
          </p>
        </div>
        <div className="divide-y divide-border">
          {briefing.teamFocus.map((person) => (
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
          {source === "appfolio"
            ? "This briefing was generated by Claude AI using your live AppFolio data — rent roll, workflows, prospect sources, and rental applications. It refreshes every 4 hours."
            : "This is a demo briefing with static content. Connect your AppFolio API and Anthropic API key to see AI-generated insights from your real portfolio data."}
        </p>
      </div>
      </>
      )}
    </>
  );
}
