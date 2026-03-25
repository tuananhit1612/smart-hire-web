/**
 * ═══════════════════════════════════════════════════════════
 *  Application API — Endpoint wrappers for job applications
 *
 *  POST   /applications/apply  → apply
 *  GET    /applications/me     → list my applications (flat)
 *  DELETE /applications/{id}   → withdraw (hard delete)
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";

// ─── Request Types ────────────────────────────────────────
export interface ApplyPayload {
  jobId: number;
  cvFileId: number;
}

// ─── Response Types ───────────────────────────────────────
/** Matches BE ApplicationResponse (returned by POST /apply) */
export interface ApplyResponse {
  id: number;
  jobId: number;
  candidateProfileId: number;
  cvFileId: number;
  stage: string;
  appliedAt: string;
}

/** Matches BE ApplicationTrackingResponse (returned by GET /me) */
export interface ApplicationTrackingDto {
  id: number;
  jobId: number;
  jobTitle: string;
  companyName: string;
  currentStage: string;
  appliedAt: string;
  updatedAt: string;
}

// ─── API Methods ─────────────────────────────────────────
export const applicationApi = {
  /**
   * Submit a new application for a job.
   */
  apply: (data: ApplyPayload) =>
    apiClient.post<ApplyResponse>("/applications/apply", data),

  /**
   * List all applications for the current authenticated user (flat list).
   */
  listMine: () =>
    apiClient.get<ApplicationTrackingDto[]>("/applications/me"),

  /**
   * Withdraw (delete) an application by its application ID.
   * @param applicationId — The application entity ID
   */
  withdraw: (applicationId: number) =>
    apiClient.delete<void>(`/applications/${applicationId}`),
};
