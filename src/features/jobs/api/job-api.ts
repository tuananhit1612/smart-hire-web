/**
 * ═══════════════════════════════════════════════════════════
 *  Job API — Endpoint wrappers for public job search
 *
 *  GET  /jobs/public          → searchJobs (filtered list)
 *  GET  /jobs/public/{id}     → getJobDetail
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";

// ─── BE DTO mirrors ──────────────────────────────────────

export interface JobSkillDto {
  skillName: string;
  skillType: string;
}

/**
 * Mirrors JobResponse.java from the backend.
 * Enum values: JobType = FULL_TIME | PART_TIME | CONTRACT | INTERNSHIP
 *              JobLevel = INTERN | JUNIOR | MID | SENIOR | LEAD | MANAGER
 *              JobStatus = (OPEN | CLOSED, etc.)
 */
export interface JobResponseDto {
  id: number;
  companyId: number;
  companyName: string;
  companyLogoUrl: string | null;
  createdBy: number;
  title: string;
  description: string;
  requirements: string | null;
  benefits: string | null;
  jobType: string; // FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP
  jobLevel: string; // INTERN, JUNIOR, MID, SENIOR, LEAD, MANAGER
  location: string;
  isRemote: boolean;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  deadline: string | null; // ISO date
  status: string; // OPEN / CLOSED
  skills: JobSkillDto[];
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
}

/** Wraps BE ApiResponse<T> structure */
interface ApiResponseWrapper<T> {
  success: boolean;
  code: string;
  message?: string;
  data: T;
}

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
  search: async (params: JobSearchParams = {}): Promise<JobResponseDto[]> => {
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
    const url = "/jobs/public" + (qs ? "?" + qs : "");
    const res = await apiClient.get<ApiResponseWrapper<JobResponseDto[]>>(url);
    return res.data.data;
  },

  /**
   * Get a single job by ID (public endpoint).
   */
  getDetail: async (id: number): Promise<JobResponseDto> => {
    const res = await apiClient.get<ApiResponseWrapper<JobResponseDto>>(
      `/jobs/public/${id}`
    );
    return res.data.data;
  },
};
