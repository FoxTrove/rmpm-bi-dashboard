// AppFolio Reporting API v2 response types
// Field names and types match actual API responses

// --- Rent Roll Report ---
export interface AppFolioRentRollEntry {
  property: string;
  property_name: string | null;
  property_id: number;
  property_address: string;
  property_city: string;
  property_state: string;
  property_zip: string;
  property_type: string;
  unit: string;
  unit_id: number;
  unit_type: string | null;
  bd_ba: string | null;
  sqft: number | null;
  tenant: string | null;
  tenant_id: number | null;
  status: string; // "Current" | "Vacant-Unrented" | "Vacant-Rented" | "Notice-Unrented" | "Notice-Rented" | "Evict"
  market_rent: string; // decimal string e.g. "1249.00"
  rent: string; // decimal string
  deposit: string; // decimal string
  lease_from: string | null;
  lease_to: string | null;
  move_in: string | null;
  move_out: string | null;
  past_due: string;
  monthly_charges: string;
  rent_ready: string;
  occupancy_id: number;
}

// --- Workflow (In-Progress) ---
export interface AppFolioWorkflow {
  workflow_name: string;
  current_step: string;
  status: string;
  property: string | null;
  attachable_for: string;
  assigned_to: string;
  due_date: string | null;
}

// --- Completed Workflow ---
export interface AppFolioCompletedWorkflow {
  workflow_name: string;
  property: string | null;
  attachable_for: string;
  completed_at: string;
  started_at: string;
  result: string;
}

// --- Prospect Source Tracking ---
export interface AppFolioProspectSource {
  source: string;
  guest_card_inquiries: number;
  showings: number;
  applications: number;
  approved_applications: number;
  converted_tenants: number;
}

// --- Rental Application ---
export interface AppFolioRentalApplication {
  rental_application_id: number;
  applicants: string;
  property_name: string;
  unit_name: string;
  status: string; // "New" | "Decision Pending" | "Approved" | "Converted" | "Converting" | "Denied" | "Canceled"
  received: string;
  lead_source: string;
  desired_move_in: string;
  monthly_salary: string;
  assigned_user: string;
  created_by: string;
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
