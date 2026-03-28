/**
 * ═══════════════════════════════════════════════════════════
 *  Job API — Endpoint wrappers for public job search
 *
 *  GET  /jobs/public          → searchJobs (filtered list)
 *  GET  /jobs/public/{id}     → getJobDetail
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";
import type { ApiWrapper } from "@/shared/types/api";
import type { JobResponse } from "../types/job-api-types";

// ─── BE DTO mirrors ──────────────────────────────────────



// ─── Search Params ────────────────────────────────────────
export interface JobSearchParams {
  keyword?: string;
  location?: string;
  jobLevel?: string;
  jobType?: string;
  salaryMin?: number;
  salaryMax?: number;
}

// ─── API Methods ─────────────────────────────────────────
export const jobApi = {
  /**
   * Search public jobs with optional filters.
   * Backend returns full list (no server-side pagination).
   */
  search: async (params: JobSearchParams = {}): Promise<JobResponse[]> => {
    const query = new URLSearchParams();
    if (params.keyword) query.set("keyword", params.keyword);
    if (params.location) query.set("location", params.location);
    if (params.jobLevel) query.set("jobLevel", params.jobLevel);
    if (params.jobType) query.set("jobType", params.jobType);
    if (params.salaryMin != null)
      query.set("salaryMin", String(params.salaryMin));
    if (params.salaryMax != null)
      query.set("salaryMax", String(params.salaryMax));

    const qs = query.toString();
    const url = qs ? `/jobs/public?${qs}` : '/jobs/public';
    const res = await apiClient.get<ApiWrapper<JobResponse[]>>(url);
    return res.data.data;
  },

  /**
   * Get a single job by ID (public endpoint).
   */
  getDetail: async (id: number): Promise<JobResponse> => {
    const res = await apiClient.get<ApiWrapper<JobResponse>>(
      `/jobs/public/${id}`
    );
    return res.data.data;
  },
};
