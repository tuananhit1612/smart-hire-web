/**
 * ═══════════════════════════════════════════════════════════
 *  Job API Service — Public jobs endpoints
 *
 *  Thin wrapper around apiClient.
 *  Pattern matches profile-api.ts
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";
import type { ApiWrapper, PageResponse } from "@/shared/types/api";
import type { JobResponse, JobSearchParams } from "../types/job-api-types";

export const jobApi = {
  /**
   * GET /public/jobs — Browse public jobs with filters & pagination
   */
  getPublicJobs: (params?: JobSearchParams) => {
    // Strip undefined values so axios doesn't send empty query params
    const cleanParams: Record<string, string | number> = {};
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          cleanParams[key] = value;
        }
      });
    }
    return apiClient.get<ApiWrapper<PageResponse<JobResponse>>>(
      "/jobs/public",
      { params: cleanParams }
    );
  },

  /**
   * GET /jobs/public/{id} — Public job detail
   */
  getPublicJobById: (id: number | string) =>
    apiClient.get<ApiWrapper<JobResponse>>(`/jobs/public/${id}`),
};
