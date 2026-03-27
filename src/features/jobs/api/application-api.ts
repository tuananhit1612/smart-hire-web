/**
 * ═══════════════════════════════════════════════════════════
 *  Application API — Endpoint wrappers for job applications
 *
 *  POST   /applications/apply  → apply
 *  GET    /applications        → list (paginated, for tracking page)
 *  GET    /applications/me     → list my applications (flat)
 *  GET    /applications/{id}   → get detail with stage history
 *  DELETE /applications/{id}   → withdraw (hard delete)
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";
import type { PageResponse } from "@/shared/types/api";

// ─── BE DTO mirrors ──────────────────────────────────────

/** Mirrors ApplicationTrackingResponse.java */
export interface ApplicationTrackingResponse {
  id: number;
  jobId: number;
  jobTitle: string;
  companyName: string;
  /** e.g. "APPLIED" | "SCREENING" | "INTERVIEW" | "OFFER" | "HIRED" | "REJECTED" */
  currentStage: string;
  appliedAt: string; // ISO-8601 from LocalDateTime
  updatedAt: string;
}

/** Mirrors ApplicationHistoryResponse.java */
export interface ApplicationHistoryResponse {
  id: number;
  fromStage: string | null;
  toStage: string;
  note: string | null;
  createdAt: string;
  changedByName: string | null;
}

/** Mirrors ApplicationDetailResponse.java */
export interface ApplicationDetailResponse {
  id: number;
  jobId: number;
  jobTitle: string;
  companyName: string;
  currentStage: string;
  appliedAt: string;
  updatedAt: string;
  history: ApplicationHistoryResponse[];
}

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
   * List all applications for the current authenticated user (paginated).
   */
  list: (page = 0, size = 50) =>
    apiClient.get<PageResponse<ApplicationTrackingResponse>>(
      `/applications?page=${page}&size=${size}`
    ),

  /**
   * List all applications for the current authenticated user (flat list).
   */
  listMine: () =>
    apiClient.get<ApplicationTrackingDto[]>("/applications/me"),

  /**
   * Get full detail (including stage history) for a single application.
   */
  getDetail: (id: number) =>
    apiClient.get<ApplicationDetailResponse>(`/applications/${id}`),

  /**
   * Withdraw (delete) an application by its application ID.
   * @param applicationId — The application entity ID
   */
  withdraw: (applicationId: number) =>
    apiClient.delete<void>(`/applications/${applicationId}`),
};
