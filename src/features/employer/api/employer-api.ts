/**
 * ═══════════════════════════════════════════════════════════
 *  Employer Applicant API — Endpoint wrappers for
 *  employer-side applicant management.
 *
 *  Follows the same pattern as features/jobs/api/application-api.ts
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";
import type { EmployerApplicant } from "../types/mock-applicants";
import type { AIAnalysis } from "../types/mock-applicants";

// ─── Request / Response Types ────────────────────────────

export interface ApplicantListParams {
  jobId: string;
  search?: string;
  sortBy?: "score-desc" | "score-asc" | "date-desc";
  page?: number;
  limit?: number;
}

export interface ApplicantListResponse {
  data: EmployerApplicant[];
  total: number;
}

export interface UpdateStagePayload {
  stage: string;
  note?: string;
}

// ─── API Methods ─────────────────────────────────────────

export const employerApplicantApi = {
  /**
   * List applicants for a specific job posting.
   */
  list: (params: ApplicantListParams) =>
    apiClient.get<ApplicantListResponse>(
      `/employer/jobs/${params.jobId}/applicants`,
      {
        params: {
          search: params.search,
          sortBy: params.sortBy,
          page: params.page,
          limit: params.limit,
        },
      }
    ),

  /**
   * Get a single applicant's full details.
   */
  getById: (jobId: string, applicantId: string) =>
    apiClient.get<EmployerApplicant>(
      `/employer/jobs/${jobId}/applicants/${applicantId}`
    ),

  /**
   * Move an applicant to a different pipeline stage.
   */
  updateStage: (jobId: string, applicantId: string, data: UpdateStagePayload) =>
    apiClient.patch<EmployerApplicant>(
      `/employer/jobs/${jobId}/applicants/${applicantId}/stage`,
      data
    ),

  /**
   * Trigger an AI re-analysis of an applicant's CV against the job.
   */
  reAnalyze: (jobId: string, applicantId: string) =>
    apiClient.post<AIAnalysis>(
      `/employer/jobs/${jobId}/applicants/${applicantId}/re-analyze`
    ),
};
