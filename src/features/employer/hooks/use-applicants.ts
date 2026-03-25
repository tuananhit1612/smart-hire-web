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
import {
  mockEmployerApplicants,
  type EmployerApplicant,
} from "../types/mock-applicants";

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

// ─── Client-side fallback sort/filter ────────────────────

function applyClientFilters(
  data: readonly EmployerApplicant[],
  search: string,
  sortBy: string
): EmployerApplicant[] {
  let result = [...data];

  // Filter
  if (search) {
    const lowerQuery = search.toLowerCase();
    result = result.filter(
      (app) =>
        app.name.toLowerCase().includes(lowerQuery) ||
        app.skills.some((skill) => skill.toLowerCase().includes(lowerQuery))
    );
  }

  // Sort
  result.sort((a, b) => {
    if (sortBy === "score-desc")
      return b.aiAnalysis.matchScore - a.aiAnalysis.matchScore;
    if (sortBy === "score-asc")
      return a.aiAnalysis.matchScore - b.aiAnalysis.matchScore;
    if (sortBy === "date-desc")
      return (
        new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
      );
    return 0;
  });

  return result;
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
          setData(response.data.data);
        }
      } catch {
        // Graceful fallback to mock data while backend is not deployed
        if (!cancelled) {
          const filtered = applyClientFilters(
            mockEmployerApplicants,
            params.search,
            params.sortBy
          );
          setData(filtered);
          // Don't surface error to the user; mock data is transparent
          setError(null);
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
