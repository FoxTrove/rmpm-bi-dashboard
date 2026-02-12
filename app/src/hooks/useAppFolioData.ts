"use client";

import { useState, useEffect, useCallback, useRef } from "react";

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
  const [data, setData] = useState<T>(fallbackData);
  const [source, setSource] = useState<"appfolio" | "mock" | "loading">("mock");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(apiPath);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json.data);
      setSource(json.source);
      setError(json.error || null);
    } catch (err) {
      // Keep showing whatever we have (fallback or previous data)
      setSource("mock");
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  }, [apiPath]);

  useEffect(() => {
    fetchData();

    intervalRef.current = setInterval(fetchData, REFRESH_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchData]);

  return { data, source, error, isLoading, refetch: fetchData };
}
