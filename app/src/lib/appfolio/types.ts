// AppFolio Reporting API v2 response types

// --- Rent Roll Report ---
export interface AppFolioRentRollEntry {
  property_name: string;
  unit_name: string;
  tenant_name: string;
  tenant_email: string;
  tenant_phone: string;
  move_in_date: string;
  lease_from: string;
  lease_to: string;
  market_rent: number;
  rent: number;
  deposit: number;
  status: string; // "Current" | "Vacant" | "Notice" | "Eviction" etc.
  property_address: string;
  unit_type: string;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
}

// --- Workflow (In-Progress) ---
export interface AppFolioWorkflow {
  id: number;
  workflow_name: string;
  step_name: string;
  property_name: string;
  unit_name: string;
  tenant_name: string;
  assigned_to: string;
  started_at: string;
  updated_at: string;
  status: string;
}

// --- Completed Workflow ---
export interface AppFolioCompletedWorkflow {
  id: number;
  workflow_name: string;
  property_name: string;
  unit_name: string;
  tenant_name: string;
  completed_at: string;
  started_at: string;
  result: string;
}

// --- Prospect Source Tracking ---
export interface AppFolioProspectSource {
  source: string;
  inquiries: number;
  showings: number;
  applications: number;
  move_ins: number;
  conversion_rate: number;
}

// --- Rental Application ---
export interface AppFolioRentalApplication {
  id: number;
  applicant_name: string;
  property_name: string;
  unit_name: string;
  status: string; // "Pending" | "Approved" | "Denied" | "Cancelled"
  applied_at: string;
  source: string;
  desired_move_in: string;
  monthly_income: number;
}

// --- Generic paginated response ---
export interface AppFolioPaginatedResponse<T> {
  results: T[];
  next_page_url: string | null;
  total_count: number;
}

// --- Dashboard-shaped types (output of transformers) ---

export interface DashboardRenewalSummary {
  label: string;
  count: number;
  revenue: string;
  color: "critical" | "warning" | "success" | "neutral";
}

export interface DashboardRenewalStatus {
  label: string;
  count: number;
  pct: number;
}

export interface DashboardRenewal {
  property: string;
  unit: string;
  tenant: string;
  leaseEnds: string;
  status: string;
  level: "critical" | "warning" | "success";
  assignedTo: string;
  lastContact: string;
}

export interface DashboardRenewalsData {
  renewalSummary: DashboardRenewalSummary[];
  renewalStatus: DashboardRenewalStatus[];
  renewals: DashboardRenewal[];
}

export interface DashboardLeasingFunnel {
  stage: string;
  count: number;
  pct: number;
  weekDelta: number;
}

export interface DashboardLeadSource {
  source: string;
  leads: number;
  conversion: number;
  responseTime: string;
}

export interface DashboardActiveLead {
  property: string;
  name: string;
  source: string;
  status: string;
  responseTime: string;
  assignedTo: string;
  nextAction: string;
  urgent: boolean;
}

export interface DashboardLeadsOverTime {
  week: string;
  inquiries: number;
  showings: number;
  applications: number;
  leased: number;
}

export interface DashboardLeasingData {
  leasingFunnel: DashboardLeasingFunnel[];
  leadSources: DashboardLeadSource[];
  activeLeads: DashboardActiveLead[];
  leadsOverTime: DashboardLeadsOverTime[];
}

export interface DashboardKPI {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  color?: string;
  progress?: number;
}

export interface DashboardOverviewData {
  kpiCards: DashboardKPI[];
}

export interface ApiResponse<T> {
  data: T;
  source: "appfolio" | "mock";
  cachedAt?: string;
  error?: string;
}
