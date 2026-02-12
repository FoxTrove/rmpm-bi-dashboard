"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface CacheEntry<T> {
  data: T;
  source: "appfolio" | "mock";
  error: string | null;
  timestamp: number;
}

// Module-level cache — persists across navigation within the same session
const dataCache = new Map<string, CacheEntry<unknown>>();
const CACHE_MAX_AGE_MS = 5 * 60 * 1000; // 5 minutes

interface UseAppFolioDataResult<T> {
  data: T | null;
  source: "appfolio" | "mock" | "loading";
  error: string | null;
  isLoading: boolean;
  refetch: () => void;
}

const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

export function useAppFolioData<T>(
  apiPath: string,
  fallbackData: T
): UseAppFolioDataResult<T> {
  // Check cache for initial state
  const cached = dataCache.get(apiPath) as CacheEntry<T> | undefined;
  const hasFreshCache = cached && Date.now() - cached.timestamp < CACHE_MAX_AGE_MS;

  const [data, setData] = useState<T>(hasFreshCache ? cached.data : fallbackData);
  const [source, setSource] = useState<"appfolio" | "mock" | "loading">(
    hasFreshCache ? cached.source : "loading"
  );
  const [error, setError] = useState<string | null>(hasFreshCache ? cached.error : null);
  const [isLoading, setIsLoading] = useState(!hasFreshCache);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(apiPath);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json.data);
      setSource(json.source);
      setError(json.error || null);

      // Update cache
      dataCache.set(apiPath, {
        data: json.data,
        source: json.source,
        error: json.error || null,
        timestamp: Date.now(),
      });
    } catch (err) {
      // Keep showing whatever we have (fallback or previous data)
      if (!hasFreshCache) {
        setSource("mock");
      }
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  }, [apiPath, hasFreshCache]);

  useEffect(() => {
    // If cache is fresh, skip immediate fetch but still schedule refresh
    if (hasFreshCache) {
      setIsLoading(false);
    } else {
      fetchData();
    }

    intervalRef.current = setInterval(fetchData, REFRESH_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchData, hasFreshCache]);

  return { data, source, error, isLoading, refetch: fetchData };
}
