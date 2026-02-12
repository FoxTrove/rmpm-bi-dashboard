// ============================================================
// Mock data for RPM Rockies Command Center prototype
// ============================================================

// -- Overview KPIs --
export const kpiCards = [
  { label: "Total Doors", value: "847", trend: "+12 this month", trendUp: true },
  { label: "Vacancy Rate", value: "4.2%", trend: "-0.3% vs last month", trendUp: true },
  { label: "Leasing Pipeline", value: "$284K", trend: "+$18K this week", trendUp: true },
  { label: "Avg Response Time", value: "12 min", trend: "-3 min vs last week", trendUp: true, color: "green" },
  { label: "Renewals Due (30d)", value: "23", trend: "7 critical", trendUp: false, color: "amber" },
  { label: "Owner Reports Sent", value: "142/156", trend: "91% delivered", trendUp: true, progress: 91 },
];

// -- Activity Feed --
export const activityFeed = [
  { text: "Lead qualified — 123 Main St", time: "3 min ago", icon: "lead" },
  { text: "Renewal signed — Unit 4B, Oak Apartments", time: "1 hour ago", icon: "renewal" },
  { text: "Maintenance completed — 456 Elm St", time: "2 hours ago", icon: "maintenance" },
  { text: "Owner report sent — Johnson Portfolio (12 properties)", time: "3 hours ago", icon: "report", auto: true },
  { text: "AI call resolved — Rent inquiry — No escalation needed", time: "4 hours ago", icon: "ai" },
  { text: "Application approved — 789 Pine Dr", time: "5 hours ago", icon: "lead" },
  { text: "Lease signed — Unit 2A, Maple Ridge", time: "6 hours ago", icon: "renewal" },
  { text: "Showing scheduled — 321 Birch Ln", time: "7 hours ago", icon: "lead" },
];

// -- Alerts --
export const alerts = [
  { level: "critical", text: "3 leads with no response >2 hours" },
  { level: "warning", text: "7 renewals expiring in <14 days — no contact" },
  { level: "warning", text: "Owner report failed to send — Smith Property" },
  { level: "success", text: "All systems operational" },
];

// -- Leasing Pipeline Funnel --
export const leasingFunnel = [
  { stage: "Inquiries", count: 127, pct: 100, weekDelta: 31 },
  { stage: "Showings", count: 43, pct: 34, weekDelta: 12 },
  { stage: "Applications", count: 18, pct: 14, weekDelta: 5 },
  { stage: "Approved", count: 12, pct: 9, weekDelta: 3 },
  { stage: "Leased", count: 8, pct: 6, weekDelta: 2 },
];

// -- Lead Sources --
export const leadSources = [
  { source: "Zillow", leads: 52, conversion: 7.2, responseTime: "8 min" },
  { source: "Website", leads: 34, conversion: 9.1, responseTime: "11 min" },
  { source: "Apartments.com", leads: 28, conversion: 5.4, responseTime: "14 min" },
  { source: "Phone (AI Answered)", leads: 13, conversion: 12.3, responseTime: "Instant" },
];

// -- Active Leads --
export const activeLeads = [
  { property: "123 Main St", name: "Sarah M.", source: "Zillow", status: "Showing Scheduled", responseTime: "4 min", assignedTo: "Maria S.", nextAction: "Tomorrow 2pm", urgent: false },
  { property: "456 Oak Ave", name: "James T.", source: "Website", status: "Awaiting Response", responseTime: "3 hours", assignedTo: "Unassigned", nextAction: "URGENT", urgent: true },
  { property: "789 Pine Dr", name: "Lisa K.", source: "AI Call", status: "Application Sent", responseTime: "Instant", assignedTo: "Auto", nextAction: "Awaiting docs", urgent: false },
  { property: "321 Birch Ln", name: "Mike R.", source: "Apartments.com", status: "Showing Scheduled", responseTime: "12 min", assignedTo: "Chris T.", nextAction: "Thursday 10am", urgent: false },
  { property: "654 Cedar Ct", name: "Anna W.", source: "Zillow", status: "Inquiry", responseTime: "6 min", assignedTo: "Devon R.", nextAction: "Follow up call", urgent: false },
  { property: "987 Spruce Way", name: "Tom H.", source: "Website", status: "Awaiting Response", responseTime: "1.5 hours", assignedTo: "Jordan K.", nextAction: "Respond today", urgent: true },
];

// -- Renewals --
export const renewalSummary = [
  { label: "Critical (0-14 days)", count: 7, revenue: "$12,850/mo", color: "critical" },
  { label: "Urgent (15-30 days)", count: 16, revenue: "$28,400/mo", color: "warning" },
  { label: "Upcoming (31-60 days)", count: 34, revenue: "", color: "success" },
  { label: "Planned (61-90 days)", count: 52, revenue: "", color: "neutral" },
];

export const renewalStatus = [
  { label: "Renewed", count: 23, pct: 58 },
  { label: "In Negotiation", count: 8, pct: 20 },
  { label: "No Contact Yet", count: 6, pct: 15 },
  { label: "Moving Out", count: 3, pct: 7 },
];

export const renewals = [
  { property: "Oak Apartments", unit: "4B", tenant: "Martinez", leaseEnds: "Feb 18", status: "No Contact", level: "critical", urgency: "critical", assignedTo: "Maria S.", lastContact: "Never" },
  { property: "Pine Court", unit: "12", tenant: "Johnson", leaseEnds: "Feb 22", status: "Negotiating", level: "warning", urgency: "warning", assignedTo: "Chris T.", lastContact: "Feb 8" },
  { property: "Main Street", unit: "—", tenant: "Williams", leaseEnds: "Feb 28", status: "Renewed", level: "success", urgency: "warning", assignedTo: "Maria S.", lastContact: "Feb 10" },
  { property: "Elm Ridge", unit: "6A", tenant: "Davis", leaseEnds: "Mar 5", status: "Negotiating", level: "warning", urgency: "success", assignedTo: "Devon R.", lastContact: "Feb 9" },
  { property: "Cedar Heights", unit: "3C", tenant: "Brown", leaseEnds: "Mar 12", status: "No Contact", level: "warning", urgency: "success", assignedTo: "Jordan K.", lastContact: "Never" },
  { property: "Birch Terrace", unit: "8", tenant: "Wilson", leaseEnds: "Mar 18", status: "Renewed", level: "success", urgency: "success", assignedTo: "Chris T.", lastContact: "Feb 7" },
  { property: "Maple Commons", unit: "15B", tenant: "Taylor", leaseEnds: "Mar 25", status: "Moving Out", level: "critical", urgency: "neutral", assignedTo: "Maria S.", lastContact: "Feb 6" },
];

// -- Owner Communications --
export const ownerReportStatus = { sent: 142, scheduled: 11, failed: 3, total: 156 };

export const ownerReports = [
  { owner: "Johnson Portfolio", properties: 12, status: "sent", sentAt: "Feb 10, 8:02am" },
  { owner: "Smith Family Trust", properties: 8, status: "failed", sentAt: "Failed — retry scheduled" },
  { owner: "Garcia Holdings", properties: 5, status: "sent", sentAt: "Feb 10, 8:01am" },
  { owner: "Williams Group", properties: 15, status: "sent", sentAt: "Feb 10, 8:03am" },
  { owner: "Chen Investments", properties: 3, status: "scheduled", sentAt: "Scheduled for Feb 11" },
  { owner: "Patel Properties", properties: 7, status: "sent", sentAt: "Feb 10, 8:01am" },
  { owner: "Anderson LLC", properties: 4, status: "sent", sentAt: "Feb 10, 8:04am" },
  { owner: "Rivera Trust", properties: 9, status: "scheduled", sentAt: "Scheduled for Feb 11" },
];

// -- AI Performance --
export const aiCallSummary = {
  totalCalls: 847,
  resolvedByAI: 612,
  transferredToHuman: 198,
  abandoned: 37,
};

export const aiPositiveOutcomes = [
  { label: "Showing Scheduled", count: 127 },
  { label: "Question Answered", count: 312 },
  { label: "Maintenance Logged", count: 89 },
  { label: "Payment Info Provided", count: 84 },
];

export const aiNegativeSignals = [
  { label: "Want to talk to human", count: 142 },
  { label: "Caller Frustrated", count: 31 },
  { label: "Repeat Calls (unresolved)", count: 25 },
];

export const aiEstimatedValue = {
  hoursSaved: 47,
  afterHoursLeads: 89,
  revenueProtected: "$12,400",
};

export const sentimentTrend = [
  { week: "Jan 20-26", positive: 58, neutral: 28, negative: 14, net: 44 },
  { week: "Jan 27-Feb 2", positive: 61, neutral: 27, negative: 12, net: 49 },
  { week: "Feb 3-9", positive: 64, neutral: 24, negative: 12, net: 52 },
  { week: "Feb 10-16", positive: 67, neutral: 22, negative: 11, net: 56 },
];

// -- Team Performance --
export const teamMembers = [
  { rank: 1, name: "Maria S.", doors: 187, responseTime: "8 min", renewalRate: 94, tasksDone: 98, score: 96 },
  { rank: 2, name: "Chris T.", doors: 203, responseTime: "14 min", renewalRate: 89, tasksDone: 95, score: 91 },
  { rank: 3, name: "Devon R.", doors: 156, responseTime: "22 min", renewalRate: 86, tasksDone: 87, score: 84 },
  { rank: 4, name: "Jordan K.", doors: 178, responseTime: "31 min", renewalRate: 82, tasksDone: 79, score: 76 },
];

export const mariaScorecard = {
  name: "Maria Sanchez",
  portfolio: "187 doors across 12 owners",
  metrics: [
    { label: "Avg Response Time", value: "8 min", target: "<15 min", met: true },
    { label: "Renewal Rate", value: "94%", target: "85%", met: true },
    { label: "Owner Reports Sent", value: "24/24", target: "100%", met: true },
    { label: "Maintenance Closed", value: "31/34", target: "91%", met: true },
    { label: "Leads Converted", value: "12%", target: "10%", met: true },
  ],
  attention: [
    "2 renewals expiring <14 days — no contact",
    "1 maintenance request >48 hours open",
  ],
};

// -- System Health --
export const integrations = [
  { name: "AppFolio", status: "connected", detail: "Last sync: 2 min ago" },
  { name: "Voice AI", status: "active", detail: "847 calls this month" },
  { name: "Email System", status: "connected", detail: "142 reports sent this week" },
  { name: "Website Widget", status: "live", detail: "34 inquiries today" },
  { name: "Calendar", status: "synced", detail: "Showings auto-scheduled" },
];

export const dataFlows = [
  { from: "AppFolio", to: "Dashboard", status: "Real-time" },
  { from: "Dashboard", to: "Owner Reports", status: "Automated" },
  { from: "Website", to: "Lead Pipeline", status: "Instant capture" },
  { from: "Voice AI", to: "CRM", status: "Auto-logged" },
];

// -- Charts Data --
export const vacancyTrend = [
  { month: "Sep", rate: 5.8 },
  { month: "Oct", rate: 5.2 },
  { month: "Nov", rate: 4.9 },
  { month: "Dec", rate: 4.6 },
  { month: "Jan", rate: 4.5 },
  { month: "Feb", rate: 4.2 },
];

export const leadsOverTime = [
  { week: "W1", inquiries: 98, showings: 32, applications: 12, leased: 5 },
  { week: "W2", inquiries: 105, showings: 38, applications: 14, leased: 6 },
  { week: "W3", inquiries: 112, showings: 40, applications: 16, leased: 7 },
  { week: "W4", inquiries: 127, showings: 43, applications: 18, leased: 8 },
];

export const aiCallsOverTime = [
  { week: "W1", resolved: 140, transferred: 48, abandoned: 10 },
  { week: "W2", resolved: 152, transferred: 50, abandoned: 9 },
  { week: "W3", resolved: 158, transferred: 51, abandoned: 9 },
  { week: "W4", resolved: 162, transferred: 49, abandoned: 9 },
];

// ============================================================
// Financial Hub
// ============================================================

export const financialSummary = {
  totalRevenue: "$467,750",
  totalExpenses: "$312,400",
  noi: "$155,350",
  noiMargin: "33.2%",
  collectionRate: "97.3%",
  outstandingBalance: "$12,640",
  avgRentPerUnit: "$1,425",
  yoyRevenueGrowth: "+6.2%",
};

export const revenueByMonth = [
  { month: "Sep", revenue: 442000, expenses: 298000, noi: 144000 },
  { month: "Oct", revenue: 448000, expenses: 302000, noi: 146000 },
  { month: "Nov", revenue: 451000, expenses: 305000, noi: 146000 },
  { month: "Dec", revenue: 455000, expenses: 308000, noi: 147000 },
  { month: "Jan", revenue: 461000, expenses: 310000, noi: 151000 },
  { month: "Feb", revenue: 467750, expenses: 312400, noi: 155350 },
];

export const propertyFinancials = [
  { property: "Willow Park", units: 64, revenue: "$99,200", expenses: "$61,400", noi: "$37,800", margin: "38.1%", collection: "98.4%" },
  { property: "Cedar Heights", units: 56, revenue: "$86,400", expenses: "$55,200", noi: "$31,200", margin: "36.1%", collection: "97.8%" },
  { property: "Oak Apartments", units: 48, revenue: "$72,450", expenses: "$48,300", noi: "$24,150", margin: "33.3%", collection: "96.9%" },
  { property: "Elm Ridge", units: 40, revenue: "$55,500", expenses: "$39,800", noi: "$15,700", margin: "28.3%", collection: "94.2%" },
  { property: "Pine Court", units: 32, revenue: "$49,200", expenses: "$31,100", noi: "$18,100", margin: "36.8%", collection: "99.1%" },
  { property: "Maple Ridge", units: 24, revenue: "$33,000", expenses: "$24,600", noi: "$8,400", margin: "25.5%", collection: "92.1%" },
  { property: "Spruce Commons", units: 28, revenue: "$43,200", expenses: "$28,500", noi: "$14,700", margin: "34.0%", collection: "98.2%" },
  { property: "Birch Terrace", units: 18, revenue: "$28,800", expenses: "$23,500", noi: "$5,300", margin: "18.4%", collection: "100%" },
];

export const rentCollectionStatus = [
  { label: "Paid in Full", count: 789, pct: 93.2 },
  { label: "Partial Payment", count: 22, pct: 2.6 },
  { label: "Past Due (1-30d)", count: 28, pct: 3.3 },
  { label: "Past Due (30+d)", count: 8, pct: 0.9 },
];

export const expenseBreakdown = [
  { category: "Maintenance & Repairs", amount: 89400, pct: 28.6 },
  { category: "Property Taxes", amount: 62480, pct: 20.0 },
  { category: "Insurance", amount: 46860, pct: 15.0 },
  { category: "Utilities", amount: 37490, pct: 12.0 },
  { category: "Management Fees", amount: 34370, pct: 11.0 },
  { category: "Landscaping", amount: 21800, pct: 7.0 },
  { category: "Other", amount: 20000, pct: 6.4 },
];

// ============================================================
// Maintenance Operations
// ============================================================

export const maintenanceKPIs = {
  openWorkOrders: 19,
  avgCompletionTime: "2.4 days",
  emergencyOpen: 2,
  scheduledThisWeek: 14,
  avgCostPerOrder: "$285",
  tenantSatisfaction: "4.6/5",
};

export const workOrders = [
  { id: "WO-2847", property: "Oak Apartments", unit: "12B", type: "Plumbing", description: "Leaking kitchen faucet", priority: "high", status: "In Progress", assignedVendor: "Rocky Mtn Plumbing", created: "Feb 9", daysOpen: 2, cost: "$340" },
  { id: "WO-2846", property: "Cedar Heights", unit: "3A", type: "HVAC", description: "Furnace not heating", priority: "emergency", status: "Dispatched", assignedVendor: "Alpine HVAC", created: "Feb 10", daysOpen: 1, cost: "Est. $500" },
  { id: "WO-2845", property: "Willow Park", unit: "22C", type: "Electrical", description: "Outlet not working in bedroom", priority: "medium", status: "Scheduled", assignedVendor: "Front Range Electric", created: "Feb 8", daysOpen: 3, cost: "Est. $175" },
  { id: "WO-2844", property: "Elm Ridge", unit: "6A", type: "Appliance", description: "Dishwasher won't drain", priority: "medium", status: "Awaiting Parts", assignedVendor: "A+ Appliance", created: "Feb 7", daysOpen: 4, cost: "Est. $225" },
  { id: "WO-2843", property: "Pine Court", unit: "8", type: "General", description: "Replace smoke detector batteries", priority: "low", status: "Scheduled", assignedVendor: "In-House", created: "Feb 10", daysOpen: 1, cost: "$25" },
  { id: "WO-2842", property: "Maple Ridge", unit: "5B", type: "Plumbing", description: "Running toilet", priority: "medium", status: "Completed", assignedVendor: "Rocky Mtn Plumbing", created: "Feb 6", daysOpen: 0, cost: "$180" },
  { id: "WO-2841", property: "Birch Terrace", unit: "2", type: "General", description: "Touch-up paint hallway", priority: "low", status: "Scheduled", assignedVendor: "In-House", created: "Feb 9", daysOpen: 2, cost: "$60" },
];

export const vendors = [
  { name: "Rocky Mtn Plumbing", specialty: "Plumbing", rating: 4.8, jobsCompleted: 87, avgResponseTime: "2 hrs", avgCost: "$310", insuranceCurrent: true },
  { name: "Alpine HVAC", specialty: "HVAC", rating: 4.7, jobsCompleted: 52, avgResponseTime: "1 hr", avgCost: "$485", insuranceCurrent: true },
  { name: "Front Range Electric", specialty: "Electrical", rating: 4.5, jobsCompleted: 41, avgResponseTime: "4 hrs", avgCost: "$225", insuranceCurrent: true },
  { name: "A+ Appliance", specialty: "Appliance", rating: 4.3, jobsCompleted: 63, avgResponseTime: "6 hrs", avgCost: "$195", insuranceCurrent: true },
  { name: "In-House Team", specialty: "General", rating: 4.9, jobsCompleted: 234, avgResponseTime: "30 min", avgCost: "$45", insuranceCurrent: true },
];

export const maintenanceCostTrend = [
  { month: "Sep", cost: 14200, orders: 48 },
  { month: "Oct", cost: 13800, orders: 45 },
  { month: "Nov", cost: 15600, orders: 52 },
  { month: "Dec", cost: 16900, orders: 58 },
  { month: "Jan", cost: 15100, orders: 51 },
  { month: "Feb", cost: 12400, orders: 43 },
];

// ============================================================
// Tenant Insights
// ============================================================

export const tenantKPIs = {
  totalTenants: 811,
  avgTenure: "2.3 yrs",
  satisfactionScore: "4.2/5",
  retentionRate: "87%",
  latePayments: 36,
  openComplaints: 8,
};

export const tenantRiskScores = [
  { tenant: "Martinez, R.", unit: "Oak Apts 4B", riskScore: 92, riskLevel: "critical", factors: ["Lease expiring in 7 days", "No renewal contact", "2 maintenance complaints"], rentAmount: "$1,650" },
  { tenant: "Chen, L.", unit: "Elm Ridge 9C", riskScore: 78, riskLevel: "warning", factors: ["Late payment 2 of last 3 months", "Noise complaint filed"], rentAmount: "$1,400" },
  { tenant: "Brooks, T.", unit: "Cedar Heights 11A", riskScore: 71, riskLevel: "warning", factors: ["Requested early termination info", "Lease ends in 45 days"], rentAmount: "$1,875" },
  { tenant: "Nguyen, H.", unit: "Willow Park 18B", riskScore: 45, riskLevel: "neutral", factors: ["Renewed last year", "Minor maintenance request"], rentAmount: "$1,550" },
  { tenant: "Johnson, M.", unit: "Main St", riskScore: 12, riskLevel: "success", factors: ["5-year tenant", "Always pays early", "Zero complaints"], rentAmount: "$1,850" },
  { tenant: "Williams, S.", unit: "Pine Court 12", riskScore: 65, riskLevel: "warning", factors: ["Negotiating renewal", "Requested rent reduction"], rentAmount: "$1,525" },
];

export const tenantSatisfactionTrend = [
  { month: "Sep", score: 3.9, responses: 124 },
  { month: "Oct", score: 4.0, responses: 118 },
  { month: "Nov", score: 4.0, responses: 132 },
  { month: "Dec", score: 4.1, responses: 108 },
  { month: "Jan", score: 4.1, responses: 141 },
  { month: "Feb", score: 4.2, responses: 136 },
];

export const communicationLog = [
  { tenant: "Martinez, R.", type: "Email", subject: "Renewal Notice Sent", date: "Feb 10", status: "No Response", auto: true },
  { tenant: "Chen, L.", type: "Phone", subject: "Late Payment Follow-up", date: "Feb 9", status: "Spoke — Promised by Fri", auto: false },
  { tenant: "Brooks, T.", type: "Email", subject: "Lease Options Provided", date: "Feb 8", status: "Opened", auto: false },
  { tenant: "Davis, P.", type: "SMS", subject: "Maintenance Update — ETA Tomorrow", date: "Feb 10", status: "Delivered", auto: true },
  { tenant: "Wilson, K.", type: "Email", subject: "Renewal Signed — Confirmation", date: "Feb 7", status: "Completed", auto: true },
  { tenant: "Taylor, J.", type: "Phone", subject: "Move-out Coordination", date: "Feb 6", status: "Scheduled Feb 25", auto: false },
];

export const tenantTenure = [
  { range: "<1 year", count: 198, pct: 24.4 },
  { range: "1-2 years", count: 243, pct: 30.0 },
  { range: "2-3 years", count: 187, pct: 23.1 },
  { range: "3-5 years", count: 121, pct: 14.9 },
  { range: "5+ years", count: 62, pct: 7.6 },
];

// ============================================================
// AI Insights (Predictive / Mind-blowing)
// ============================================================

export const aiRentOptimization = [
  { property: "Oak Apartments", unit: "4B", currentRent: 1650, marketRate: 1825, suggestedRent: 1795, upside: "+$145/mo", confidence: 94 },
  { property: "Elm Ridge", unit: "6A", currentRent: 1400, marketRate: 1475, suggestedRent: 1450, upside: "+$50/mo", confidence: 88 },
  { property: "Cedar Heights", unit: "11A", currentRent: 1875, marketRate: 1920, suggestedRent: 1899, upside: "+$24/mo", confidence: 91 },
  { property: "Willow Park", unit: "22C", currentRent: 1550, marketRate: 1625, suggestedRent: 1599, upside: "+$49/mo", confidence: 86 },
  { property: "Pine Court", unit: "8", currentRent: 1525, marketRate: 1580, suggestedRent: 1565, upside: "+$40/mo", confidence: 82 },
  { property: "Maple Ridge", unit: "5B", currentRent: 1300, marketRate: 1450, suggestedRent: 1425, upside: "+$125/mo", confidence: 93 },
];

export const predictiveMaintenance = [
  { property: "Willow Park", item: "HVAC System — Units 15-22", prediction: "Likely failure within 30 days", confidence: 87, basedOn: "Age (12 yrs), 3 repairs in 6 months, seasonal pattern", estimatedCost: "$4,200", preventiveCost: "$850" },
  { property: "Oak Apartments", item: "Water Heater — Building B", prediction: "End of useful life — 60 days", confidence: 82, basedOn: "Age (15 yrs), efficiency dropping, manufacturer avg lifespan", estimatedCost: "$3,800", preventiveCost: "$2,200" },
  { property: "Cedar Heights", item: "Roof Section — East Wing", prediction: "Leak risk during spring thaw", confidence: 74, basedOn: "Last inspection 18 months ago, age (22 yrs), similar property patterns", estimatedCost: "$12,000", preventiveCost: "$3,500" },
];

export const aiLeadScoring = [
  { name: "Sarah M.", property: "123 Main St", score: 94, signals: ["Pre-qualified income", "Moving from out of state (relocation)", "Requested immediate move-in"], predictedAction: "Will apply within 24 hrs" },
  { name: "Mike R.", property: "321 Birch Ln", score: 72, signals: ["Browsed 4 listings", "Asked about pet policy", "Comparing options"], predictedAction: "Needs follow-up showing" },
  { name: "Lisa K.", property: "789 Pine Dr", score: 88, signals: ["Application submitted", "Income 4x rent", "Excellent credit range"], predictedAction: "Auto-approve candidate" },
  { name: "Tom H.", property: "987 Spruce Way", score: 31, signals: ["No response to 2 follow-ups", "Inquiry was generic", "Similar pattern to non-converters"], predictedAction: "Low priority — deprioritize" },
];

export const aiMarketIntel = {
  marketSummary: "Fort Collins rental market is tightening. Vacancy rates in Northern Colorado dropped 0.4% month-over-month. Average rents for 2BR units are up 3.2% YoY. New supply deliveries are slowing — only 120 units expected in Q2 2025 vs 340 in Q2 2024.",
  opportunities: [
    { text: "6 units currently $100+ below market rate — potential $7,200/yr revenue increase with renewals", impact: "high" },
    { text: "Pet-friendly premium: 34% of leads ask about pets — $50/mo pet rent on 200 eligible units = $120K/yr", impact: "high" },
    { text: "Covered parking demand: 67 units could add $75/mo parking premium", impact: "medium" },
    { text: "Smart lock installations showing 12% faster lease-up in comparable properties", impact: "medium" },
  ],
  threats: [
    { text: "New 180-unit luxury complex opening 2 miles from Cedar Heights in Q3 2025", impact: "high" },
    { text: "Property tax reassessment expected — estimated 4-6% increase across portfolio", impact: "medium" },
    { text: "Insurance premiums trending up 8% industry-wide for Colorado properties", impact: "medium" },
  ],
};

export const aiOwnerNarrative = {
  owner: "Johnson Portfolio",
  generated: "February 10, 2025",
  narrative: `Your portfolio of 12 properties performed well this week. Occupancy remains at 96.2%, above your 94% target. Rent collection is at 98.1% — the Martinez unit at Oak Apartments (4B) is the only outstanding balance, and our team has a follow-up scheduled for Friday.\n\nThe AI voice system handled 23 calls for your properties this week, resolving 19 without human intervention. Two showings were booked after hours that likely would have been lost — one has already submitted an application.\n\nLooking ahead: I've flagged 2 upcoming renewals where market data suggests we can increase rent by $95-145/month. I'll send renewal offers next week with the optimized pricing. The HVAC at Willow Park units 15-22 is showing early signs of wear — I recommend scheduling preventive maintenance now ($850) rather than risking a mid-winter emergency repair ($4,200+).\n\nNo action needed from you this week. Everything is running.`,
};

export const revenueImpactForecast = [
  { month: "Mar", current: 467750, optimized: 472200 },
  { month: "Apr", current: 467750, optimized: 478900 },
  { month: "May", current: 467750, optimized: 485300 },
  { month: "Jun", current: 467750, optimized: 491800 },
  { month: "Jul", current: 467750, optimized: 498100 },
  { month: "Aug", current: 467750, optimized: 504600 },
];

// ============================================================
// Integrations Hub
// ============================================================

export const integrationCategories = [
  {
    category: "Property Management",
    integrations: [
      { name: "AppFolio", status: "connected", logo: "AF", description: "Core property management, accounting, leasing", syncFrequency: "Real-time", lastSync: "2 min ago", dataPoints: "847 units, 156 owners, 1,247 transactions/mo" },
    ],
  },
  {
    category: "Listing Syndication",
    integrations: [
      { name: "Zillow", status: "connected", logo: "Z", description: "Rental listings and lead capture", syncFrequency: "Every 15 min", lastSync: "8 min ago", dataPoints: "36 active listings, 52 leads this month" },
      { name: "Apartments.com", status: "connected", logo: "A", description: "Rental listings and lead capture", syncFrequency: "Every 15 min", lastSync: "12 min ago", dataPoints: "36 active listings, 28 leads this month" },
      { name: "Realtor.com", status: "connected", logo: "R", description: "Rental listings syndication", syncFrequency: "Every 30 min", lastSync: "18 min ago", dataPoints: "36 active listings" },
      { name: "Facebook Marketplace", status: "connected", logo: "FB", description: "Social rental listings", syncFrequency: "Every 30 min", lastSync: "22 min ago", dataPoints: "12 boosted listings" },
    ],
  },
  {
    category: "Communication & AI",
    integrations: [
      { name: "VAPI Voice AI", status: "connected", logo: "VA", description: "AI-powered phone answering and routing", syncFrequency: "Real-time", lastSync: "Live", dataPoints: "847 calls handled, 72% resolution rate" },
      { name: "Twilio", status: "connected", logo: "TW", description: "SMS/MMS messaging for tenant comms", syncFrequency: "Real-time", lastSync: "Live", dataPoints: "2,340 messages sent this month" },
      { name: "SendGrid", status: "connected", logo: "SG", description: "Transactional & marketing email", syncFrequency: "Real-time", lastSync: "Live", dataPoints: "1,890 emails sent, 94% delivery rate" },
      { name: "OpenAI", status: "connected", logo: "OA", description: "GPT-powered content generation & analysis", syncFrequency: "On-demand", lastSync: "3 min ago", dataPoints: "Owner narratives, market analysis, lead scoring" },
    ],
  },
  {
    category: "Financial & Payments",
    integrations: [
      { name: "Stripe", status: "connected", logo: "ST", description: "Online rent payments processing", syncFrequency: "Real-time", lastSync: "Live", dataPoints: "$467K processed this month" },
      { name: "Plaid", status: "connected", logo: "PL", description: "Bank verification & income verification", syncFrequency: "On-demand", lastSync: "1 hr ago", dataPoints: "18 verifications this week" },
      { name: "QuickBooks", status: "available", logo: "QB", description: "Advanced accounting & tax reporting", syncFrequency: "—", lastSync: "—", dataPoints: "Ready to connect" },
    ],
  },
  {
    category: "Documents & Signing",
    integrations: [
      { name: "DocuSign", status: "connected", logo: "DS", description: "Electronic lease signing", syncFrequency: "Real-time", lastSync: "45 min ago", dataPoints: "8 leases signed this week" },
      { name: "Google Drive", status: "connected", logo: "GD", description: "Document storage & owner report archives", syncFrequency: "Every hour", lastSync: "32 min ago", dataPoints: "2,450 documents stored" },
    ],
  },
  {
    category: "Screening & Compliance",
    integrations: [
      { name: "TransUnion", status: "connected", logo: "TU", description: "Tenant background & credit checks", syncFrequency: "On-demand", lastSync: "2 hrs ago", dataPoints: "18 screenings this month" },
      { name: "RentPrep", status: "available", logo: "RP", description: "Additional screening services", syncFrequency: "—", lastSync: "—", dataPoints: "Ready to connect" },
    ],
  },
  {
    category: "Smart Property & IoT",
    integrations: [
      { name: "Smart Locks (Yale/August)", status: "available", logo: "SL", description: "Keyless entry for showings & move-ins", syncFrequency: "—", lastSync: "—", dataPoints: "Enables self-guided tours" },
      { name: "Nest / Ecobee", status: "available", logo: "NE", description: "Smart thermostat monitoring for vacant units", syncFrequency: "—", lastSync: "—", dataPoints: "Energy savings & freeze protection" },
      { name: "Water Sensor Network", status: "available", logo: "WS", description: "Leak detection in walls and under sinks", syncFrequency: "—", lastSync: "—", dataPoints: "Prevents $10K+ water damage claims" },
    ],
  },
];
