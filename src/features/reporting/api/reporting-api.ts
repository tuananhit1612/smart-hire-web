/**
 * ═══════════════════════════════════════════════════════════
 *  Reporting API — Endpoint wrappers for report data
 *
 *  GET  /reports/applications/summary  → application stats
 *  GET  /reports/applications/export   → CSV download blob
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";

// ─── DTO Types ───────────────────────────────────────────

/** Summary statistics returned by the reporting endpoint */
export interface ApplicationSummary {
    totalApplications: number;
    activeApplications: number;
    interviewsScheduled: number;
    offersReceived: number;
    rejections: number;
    withdrawn: number;
    averageResponseDays: number;
    /** Breakdown by stage */
    byStage: Record<string, number>;
    /** Breakdown by month (YYYY-MM → count) */
    byMonth: Record<string, number>;
}

/** API wrapper matching Spring Boot convention */
interface ApiWrapper<T> {
    code: string;
    success: boolean;
    message: string;
    data: T;
}

// ─── API Methods ─────────────────────────────────────────

export const reportingApi = {
    /** Fetch application summary statistics for the current user. */
    getApplicationSummary: () =>
        apiClient.get<ApiWrapper<ApplicationSummary>>(
            "/reports/applications/summary"
        ),

    /** Download applications as CSV blob. */
    exportApplicationsCSV: () =>
        apiClient.get<Blob>("/reports/applications/export", {
            responseType: "blob",
            headers: { Accept: "text/csv" },
        }),
};
