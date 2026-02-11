"use client";

import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import { teamMembers, mariaScorecard } from "@/lib/mock-data";
import { Trophy, CheckCircle2, AlertTriangle } from "lucide-react";

export default function TeamPerformance() {
  return (
    <>
      <PageHeader
        title="Team Performance"
        subtitle="Property manager scorecards — accountability without micromanagement"
      />

      {/* Leaderboard */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Trophy size={16} className="text-gold" />
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
            Property Manager Leaderboard
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg">
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Rank</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Manager</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Doors</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Response Time</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Renewal Rate</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Tasks Done</th>
                <th className="px-5 py-3 text-left font-medium text-text-secondary">Score</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr
                  key={member.rank}
                  className={`border-b border-border last:border-0 hover:bg-bg/50 ${
                    member.rank === 1 ? "bg-gold/5" : ""
                  }`}
                >
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                        member.rank === 1
                          ? "bg-gold text-white"
                          : member.rank === 2
                          ? "bg-gray-300 text-gray-700"
                          : member.rank === 3
                          ? "bg-amber-600 text-white"
                          : "bg-bg text-text-secondary"
                      }`}
                    >
                      {member.rank}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-medium text-text">{member.name}</td>
                  <td className="px-5 py-3 text-text-secondary">{member.doors}</td>
                  <td className="px-5 py-3">
                    <StatusBadge
                      level={
                        parseInt(member.responseTime) <= 15
                          ? "success"
                          : parseInt(member.responseTime) <= 30
                          ? "warning"
                          : "critical"
                      }
                      text={member.responseTime}
                    />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-bg">
                        <div
                          className={`h-2 rounded-full ${
                            member.renewalRate >= 90
                              ? "bg-success"
                              : member.renewalRate >= 85
                              ? "bg-warning"
                              : "bg-critical"
                          }`}
                          style={{ width: `${member.renewalRate}%` }}
                        />
                      </div>
                      <span className="text-text-secondary">{member.renewalRate}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-text-secondary">{member.tasksDone}%</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-lg font-bold ${
                        member.score >= 90
                          ? "text-success"
                          : member.score >= 80
                          ? "text-navy"
                          : "text-warning"
                      }`}
                    >
                      {member.score}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Individual Scorecard - Maria */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
        <div className="bg-navy px-6 py-4">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider">
            {mariaScorecard.name} — Performance Dashboard
          </h3>
          <p className="text-white/60 text-xs mt-1">{mariaScorecard.portfolio}</p>
        </div>
        <div className="p-6">
          <h4 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
            This Month
          </h4>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3 mb-6">
            {mariaScorecard.metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div>
                  <p className="text-xs text-text-secondary">{metric.label}</p>
                  <p className="text-lg font-bold text-text">{metric.value}</p>
                  <p className="text-xs text-text-secondary">Target: {metric.target}</p>
                </div>
                <CheckCircle2 size={24} className={metric.met ? "text-success" : "text-critical"} />
              </div>
            ))}
          </div>

          <h4 className="text-sm font-semibold text-text uppercase tracking-wider mb-3">
            Attention Needed
          </h4>
          <ul className="space-y-2">
            {mariaScorecard.attention.map((item, i) => (
              <li key={i} className="flex items-center gap-2 rounded-lg bg-warning-light p-3">
                <AlertTriangle size={16} className="text-amber-700 shrink-0" />
                <span className="text-sm text-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
