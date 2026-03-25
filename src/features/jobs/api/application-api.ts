/**
 * ═══════════════════════════════════════════════════════════
 *  Application API — Endpoint wrappers for job applications
 *
 *  POST   /applications        → apply
 *  GET    /applications/me     → list my applications
 *  DELETE /applications/{id}   → withdraw
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";

// ─── Request Types ────────────────────────────────────────
export interface ApplyPayload {
  jobId: number;
  cvFileId: number;
}

// ─── Response Types ───────────────────────────────────────
export interface StageHistoryDto {
  stage: string;
  enteredAt: string;
  note?: string;
}

export interface ApplicationResponse {
  id: number;
  jobId: number;
  jobTitle: string;
  candidateProfileId: number;
  cvFileId: number;
  stage: string;
  appliedAt: string;
  updatedAt: string;
  stageHistory: StageHistoryDto[];
}

// ─── API Methods ─────────────────────────────────────────
export const applicationApi = {
  /**
   * Submit a new application for a job.
   */
  apply: (data: ApplyPayload) =>
    apiClient.post<ApplicationResponse>("/applications", data),

  /**
   * List all applications for the current authenticated user.
   */
  listMine: () =>
    apiClient.get<ApplicationResponse[]>("/applications/me"),

  /**
   * Withdraw (delete) an application by its application ID.
   * @param applicationId — The application entity ID
   */
  withdraw: (applicationId: number) =>
    apiClient.delete<void>(`/applications/${applicationId}`),
};
