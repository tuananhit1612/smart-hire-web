/**
 * ═══════════════════════════════════════════════════════════
 *  Candidate Dashboard API — Client Layer
 *
 *  Backend DTO mapping:
 *    GET /api/dashboard/candidate/overview → CandidateDashboardOverview
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";
import type { ApiWrapper } from "@/shared/types/api";

// ─── Types (mirrors backend DTOs) ────────────────────

export interface WeeklyActivityItem {
    day: string;           // "T2", "T3", ...
    applications: number;
    views: number;
}

export interface RecentApplicationItem {
    id: number;
    jobId: number;
    jobTitle: string;
    companyName: string;
    currentStage: string;  // "APPLIED" | "INTERVIEW" | "HIRED" | "REJECTED"
    appliedAt: string;     // ISO-8601
    updatedAt: string;
}

export interface CandidateDashboardOverview {
    totalApplications: number;
    stageBreakdown: Record<string, number>;  // { "APPLIED": 5, "INTERVIEW": 2, ... }
    recentApplications: RecentApplicationItem[];
    upcomingInterviews: number;
    profileCompleteness: number; // 0-100
    weeklyActivity: WeeklyActivityItem[];
}

// ─── API Methods ─────────────────────────────────────

export const candidateDashboardApi = {
    /** Fetch candidate dashboard overview */
    getOverview: async (): Promise<CandidateDashboardOverview> => {
        const { data } = await apiClient.get<ApiWrapper<CandidateDashboardOverview>>(
            "/dashboard/candidate/overview"
        );
        return data.data;
    },
};
