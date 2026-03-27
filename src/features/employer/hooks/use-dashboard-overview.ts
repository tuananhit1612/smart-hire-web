"use client";

import { useState, useEffect, useCallback } from "react";
import {
    fetchHrDashboardOverview,
    type HrDashboardOverview,
} from "@/features/employer/api/dashboard-api";

interface UseDashboardOverviewReturn {
    data: HrDashboardOverview | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

/**
 * Hook to fetch HR dashboard overview data.
 * Provides loading / error / data states + a manual refetch.
 */
export function useDashboardOverview(): UseDashboardOverviewReturn {
    const [data, setData] = useState<HrDashboardOverview | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await fetchHrDashboardOverview();
            setData(result);
        } catch (err: unknown) {
            const msg =
                err instanceof Error
                    ? err.message
                    : "Không thể tải dữ liệu dashboard";
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    return { data, isLoading, error, refetch: load };
}
