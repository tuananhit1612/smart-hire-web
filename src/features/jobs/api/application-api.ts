/**
 * ═══════════════════════════════════════════════════════════
 *  Application API — Endpoint wrappers for job applications
 *
 *  Only `withdraw` is wired to the store in this PR.
 *  `apply` and `list` are stubs for future migration.
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";

// ─── Types ───────────────────────────────────────────────
export interface ApplyPayload {
  jobId: string;
  cvId?: string;
  coverLetter?: string;
}

export interface ApplicationResponse {
  id: string;
  jobId: string;
  status: string;
  appliedAt: string;
}

// ─── API Methods ─────────────────────────────────────────
export const applicationApi = {
  /**
   * Withdraw an application for a specific job.
   * @param jobId — The job ID to withdraw from
   */
  withdraw: (jobId: string) =>
    apiClient.delete<void>(`/applications/${jobId}`),

  /**
   * Submit a new application for a job.
   * (Stub — will be wired in a future PR)
   */
  apply: (data: ApplyPayload) =>
    apiClient.post<ApplicationResponse>("/applications", data),

  /**
   * List all applications for the current user.
   * (Stub — will be wired in a future PR)
   */
  list: () =>
    apiClient.get<ApplicationResponse[]>("/applications"),
};
