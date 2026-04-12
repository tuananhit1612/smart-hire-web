/**
 * ═══════════════════════════════════════════════════════════
 *  useCandidateDashboard — Fetches real dashboard data
 *
 *  Returns { data, isLoading, error } for the dashboard page.
 *  Falls back gracefully if API fails.
 * ═══════════════════════════════════════════════════════════
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import {
    candidateDashboardApi,
    type CandidateDashboardOverview,
} from "../api/candidate-dashboard-api";

interface UseCandidateDashboardReturn {
    data: CandidateDashboardOverview | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useCandidateDashboard(): UseCandidateDashboardReturn {
    const [data, setData] = useState<CandidateDashboardOverview | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await candidateDashboardApi.getOverview();
            setData(result);
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Không thể tải dữ liệu dashboard.";
            setError(message);
            console.error("[useCandidateDashboard] Error:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}
