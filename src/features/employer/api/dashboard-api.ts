/**
 * ═══════════════════════════════════════════════════════════
 *  HR Dashboard API — Client Layer
 *
 *  Backend DTO mapping:
 *    GET /api/dashboard/hr/overview  → HrDashboardOverview
 *    GET /api/dashboard/hr/jobs/:id  → JobDashboardStats
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";
import type { ApiWrapper } from "@/shared/types/api";

// ─── Types (mirrors backend DTOs) ────────────────────

export interface StageFunnelItem {
    stage: string;
    count: number;
    percentage: number;
}

export interface WeeklyTrendItem {
    date: string;
    count: number;
}

export interface TopJobItem {
    jobId: number;
    title: string;
    status: string;
    applicationCount: number;
    hiredCount: number;
    newToday: number;
}

export interface RecentActivityItem {
    candidateName: string;
    action: string;
    jobTitle: string;
    timestamp: string;
    avatarUrl: string | null;
}

export interface HrDashboardOverview {
    totalJobs: number;
    openJobs: number;
    closedJobs: number;
    draftJobs: number;
    totalApplications: number;
    stageFunnel: StageFunnelItem[];
    hireRate: number;
    rejectRate: number;
    weeklyTrend: WeeklyTrendItem[];
    topJobs: TopJobItem[];
    recentActivities: RecentActivityItem[];
}

export interface JobDashboardStats {
    jobId: number;
    jobTitle: string;
    jobStatus: string;
    totalApplications: number;
    stageFunnel: StageFunnelItem[];
    hireRate: number;
    rejectRate: number;
}

// ─── API Methods ─────────────────────────────────────

export const dashboardApi = {
    /** Fetch aggregated HR dashboard overview */
    getOverview: async (): Promise<HrDashboardOverview> => {
        const { data } = await apiClient.get<ApiWrapper<HrDashboardOverview>>(
            "/dashboard/hr/overview"
        );
        return data.data;
    },

    /** Fetch per-job dashboard stats */
    getJobStats: async (jobId: number): Promise<JobDashboardStats> => {
        const { data } = await apiClient.get<ApiWrapper<JobDashboardStats>>(
            `/dashboard/hr/jobs/${jobId}/stats`
        );
        return data.data;
    },
};

/** Fetch per-job dashboard stats */
export async function fetchJobDashboardStats(
    jobId: number
): Promise<JobDashboardStats> {
    const { data } = await apiClient.get<ApiWrapper<JobDashboardStats>>(
        `/dashboard/hr/jobs/${jobId}/stats`
    );
    return data.data;
}

/** Export HR Jobs as CSV */
export async function exportHrJobsCsv(): Promise<Blob> {
    const { data } = await apiClient.get<Blob>(
        "/dashboard/reports/jobs/csv",
        { responseType: "blob" }
    );
    return data;
}

/** Export HR Applications as CSV */
export async function exportHrApplicationsCsv(): Promise<Blob> {
    const { data } = await apiClient.get<Blob>(
        "/dashboard/reports/applications/csv",
        { responseType: "blob" }
    );
    return data;
}
