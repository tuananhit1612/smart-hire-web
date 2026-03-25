/**
 * ═══════════════════════════════════════════════════════════
 *  Application API — Endpoint wrappers for job applications
 *
 *  FE021: `list` and `getDetail` are now fully wired to the
 *  real backend. `withdraw` was already wired previously.
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";

// ─── Shared spring pageable shape ────────────────────────
export interface SpringPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // 0-based current page index
  size: number;
}

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

// ─── Legacy / request types ──────────────────────────────
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
   * List all applications for the current authenticated user.
   * Returns a Spring-paginated page of ApplicationTrackingResponse.
   */
  list: (page = 0, size = 50) =>
    apiClient.get<SpringPage<ApplicationTrackingResponse>>(
      `/applications?page=${page}&size=${size}`
    ),

  /**
   * Get full detail (including stage history) for a single application.
   */
  getDetail: (id: number) =>
    apiClient.get<ApplicationDetailResponse>(`/applications/${id}`),

  /**
   * Withdraw an application for a specific job.
   */
  withdraw: (jobId: string) =>
    apiClient.delete<void>(`/applications/${jobId}`),

  /**
   * Submit a new application for a job.
   */
  apply: (data: ApplyPayload) =>
    apiClient.post<ApplicationResponse>("/applications", data),
};
