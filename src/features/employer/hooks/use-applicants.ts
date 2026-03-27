/**
 * ═══════════════════════════════════════════════════════════
 *  useApplicants — Data-fetching hook for employer applicants
 *
 *  • Calls the real API via employerApplicantApi
 *  • Falls back to mock data while backend is unavailable
 *  • Provides loading / error / data states
 * ═══════════════════════════════════════════════════════════
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { employerApplicantApi } from "../api/employer-api";
import type { EmployerApplicant } from "../types/mock-applicants";

// ─── Params ──────────────────────────────────────────────

interface UseApplicantsParams {
  search: string;
  sortBy: "score-desc" | "score-asc" | "date-desc";
}

// ─── Return Type ─────────────────────────────────────────

interface UseApplicantsReturn {
  applicants: EmployerApplicant[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}



// ─── Hook ────────────────────────────────────────────────

export function useApplicants(
  jobId: string,
  params: UseApplicantsParams
): UseApplicantsReturn {
  const [data, setData] = useState<EmployerApplicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const refetch = useCallback(() => {
    setFetchTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchApplicants() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await employerApplicantApi.list({
          jobId,
          search: params.search || undefined,
          sortBy: params.sortBy,
        });

        if (!cancelled) {
          setData(response.data.data.data || []);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || "Failed to load applicants");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchApplicants();

    return () => {
      cancelled = true;
    };
  }, [jobId, params.search, params.sortBy, fetchTrigger]);

  return { applicants: data, isLoading, error, refetch };
}
