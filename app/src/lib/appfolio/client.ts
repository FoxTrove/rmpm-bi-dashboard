import type {
  AppFolioRentRollEntry,
  AppFolioWorkflow,
  AppFolioCompletedWorkflow,
  AppFolioProspectSource,
  AppFolioRentalApplication,
} from "./types";

// --- Configuration ---

const APPFOLIO_DATABASE = process.env.APPFOLIO_DATABASE || "rpmco004";
const APPFOLIO_CLIENT_ID = process.env.APPFOLIO_CLIENT_ID || "";
const APPFOLIO_CLIENT_SECRET = process.env.APPFOLIO_CLIENT_SECRET || "";
const BASE_URL = `https://${APPFOLIO_DATABASE}.appfolio.com/api/v2`;

// --- Rate Limiter (sliding window: 7 requests per 15 seconds) ---

const MAX_REQUESTS = 7;
const WINDOW_MS = 15_000;
const requestTimestamps: number[] = [];

async function waitForRateLimit(): Promise<void> {
  const now = Date.now();
  // Remove timestamps outside the window
  while (requestTimestamps.length > 0 && requestTimestamps[0] < now - WINDOW_MS) {
    requestTimestamps.shift();
  }
  if (requestTimestamps.length >= MAX_REQUESTS) {
    const waitUntil = requestTimestamps[0] + WINDOW_MS;
    const delay = waitUntil - now;
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  requestTimestamps.push(Date.now());
}

// --- In-Memory Cache (TTL: 5 minutes) ---

const CACHE_TTL_MS = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// --- Auth Header ---

function getAuthHeader(): string {
  const credentials = Buffer.from(`${APPFOLIO_CLIENT_ID}:${APPFOLIO_CLIENT_SECRET}`).toString(
    "base64"
  );
  return `Basic ${credentials}`;
}

// --- Paginated Fetch ---

async function fetchReport<T>(reportName: string, params?: Record<string, string>): Promise<T[]> {
  const cacheKey = `${reportName}:${JSON.stringify(params || {})}`;
  const cached = getCached<T[]>(cacheKey);
  if (cached) return cached;

  const allResults: T[] = [];
  let url: string | null = `${BASE_URL}/reports/${reportName}.json`;

  while (url) {
    await waitForRateLimit();

    const fetchUrl: URL = new URL(url);
    if (params && allResults.length === 0) {
      for (const [key, value] of Object.entries(params)) {
        fetchUrl.searchParams.set(key, value);
      }
    }

    const response = await fetch(fetchUrl.toString(), {
      method: "POST",
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`AppFolio API error: ${response.status} ${response.statusText}`);
    }

    const body = await response.json();

    // AppFolio returns results at top level or in a `results` array
    const results = Array.isArray(body) ? body : body.results || [];
    allResults.push(...results);

    // Pagination
    url = body.next_page_url || null;
  }

  setCache(cacheKey, allResults);
  return allResults;
}

// --- Public API Methods ---

export async function getRentRoll(): Promise<AppFolioRentRollEntry[]> {
  return fetchReport<AppFolioRentRollEntry>("rent_roll");
}

export async function getInProgressWorkflows(): Promise<AppFolioWorkflow[]> {
  return fetchReport<AppFolioWorkflow>("in_progress_workflows");
}

export async function getCompletedWorkflows(): Promise<AppFolioCompletedWorkflow[]> {
  return fetchReport<AppFolioCompletedWorkflow>("completed_processes");
}

export async function getProspectSourceTracking(): Promise<AppFolioProspectSource[]> {
  return fetchReport<AppFolioProspectSource>("prospect_source_tracking");
}

export async function getRentalApplications(): Promise<AppFolioRentalApplication[]> {
  return fetchReport<AppFolioRentalApplication>("rental_applications");
}

// --- Health Check ---

export async function checkHealth(): Promise<{
  ok: boolean;
  database: string;
  error?: string;
}> {
  try {
    if (!APPFOLIO_CLIENT_ID || !APPFOLIO_CLIENT_SECRET) {
      return { ok: false, database: APPFOLIO_DATABASE, error: "Missing API credentials" };
    }

    await waitForRateLimit();

    // Simple rent_roll call with minimal params to test connectivity
    const response = await fetch(`${BASE_URL}/reports/rent_roll.json`, {
      method: "POST",
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        ok: false,
        database: APPFOLIO_DATABASE,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    return { ok: true, database: APPFOLIO_DATABASE };
  } catch (err) {
    return {
      ok: false,
      database: APPFOLIO_DATABASE,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

// --- Cache Management ---

export function clearCache(): void {
  cache.clear();
}

export function getCacheTimestamp(key: string): string | null {
  const entry = cache.get(key);
  if (!entry) return null;
  return new Date(entry.timestamp).toISOString();
}
