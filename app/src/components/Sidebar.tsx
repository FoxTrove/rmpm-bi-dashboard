"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  TrendingUp,
  RefreshCw,
  Users,
  Bot,
  UserCheck,
  Settings,
  DollarSign,
  Wrench,
  Heart,
  Sparkles,
  Plug,
  Sun,
  SlidersHorizontal,
  Eye,
  Calculator,
} from "lucide-react";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/briefing", label: "Morning Briefing", icon: Sun },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/portfolio", label: "Portfolio", icon: Building2 },
      { href: "/financials", label: "Financial Hub", icon: DollarSign },
      { href: "/leasing", label: "Leasing Pipeline", icon: TrendingUp },
      { href: "/renewals", label: "Renewals Center", icon: RefreshCw },
      { href: "/maintenance", label: "Maintenance Ops", icon: Wrench },
      { href: "/tenants", label: "Tenant Insights", icon: Heart },
    ],
  },
  {
    label: "Communication",
    items: [
      { href: "/owners", label: "Owner Comms", icon: Users },
      { href: "/owner-portal", label: "Owner Portal", icon: Eye },
      { href: "/team", label: "Team Performance", icon: UserCheck },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/ai-performance", label: "AI Performance", icon: Bot },
      { href: "/ai-insights", label: "AI Insights", icon: Sparkles },
      { href: "/scenarios", label: "What-If Modeler", icon: SlidersHorizontal },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/integrations", label: "Integrations", icon: Plug },
      { href: "/system", label: "System Health", icon: Settings },
    ],
  },
  {
    label: "",
    items: [
      { href: "/roi", label: "ROI Calculator", icon: Calculator },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-navy text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <Image
          src="/logo.png"
          alt="Real Property Management of the Rockies"
          width={180}
          height={60}
          className="brightness-0 invert"
          priority
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pt-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            <span className="mb-1.5 block px-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30">
              {group.label}
            </span>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                        active
                          ? "bg-white/15 text-white"
                          : "text-white/60 hover:bg-white/8 hover:text-white/90"
                      }`}
                    >
                      <Icon size={16} strokeWidth={active ? 2.2 : 1.8} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-5 py-3">
        <div className="flex items-center gap-2 text-[11px] text-white/40">
          <div className="h-2 w-2 rounded-full bg-success" />
          All systems operational
        </div>
        <p className="mt-1 text-[10px] text-white/20">Synced with AppFolio — 2 min ago</p>
      </div>
    </aside>
  );
}
