/**
 * ═══════════════════════════════════════════════════════════
 *  Job API Types — 1:1 with backend JobResponse & query params
 * ═══════════════════════════════════════════════════════════
 */

// ─── Backend Enums ──────────────────────────────────────

export type ApiJobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERN"
  | "FREELANCE"
  | "REMOTE";

export type ApiJobLevel =
  | "INTERN"
  | "JUNIOR"
  | "MIDDLE"
  | "SENIOR"
  | "LEAD"
  | "MANAGER"
  | "DIRECTOR";

export type ApiJobStatus = "DRAFT" | "OPEN" | "CLOSED" | "PAUSED";

// ─── Backend Response ────────────────────────────────────

/** Matches the backend `JobResponse` DTO exactly */
export interface JobResponse {
  id: number;
  title: string;
  description: string;
  requirements: string | null;
  benefits: string | null;
  jobType: ApiJobType;
  jobLevel: ApiJobLevel;
  status: ApiJobStatus;
  salaryMin: number | null;
  salaryMax: number | null;
  city: string | null;
  address: string | null;
  deadline: string | null; // ISO date "2025-06-01"
  companyId: number;
  companyName: string;
  companyLogoUrl: string | null;
  createdByUserId: number;
  totalApplications: number;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
}

// ─── Query Params ────────────────────────────────────────

/** GET /public/jobs — query params */
export interface JobSearchParams {
  page?: number;
  size?: number;
  keyword?: string;
  city?: string;
  jobType?: ApiJobType;
  jobLevel?: ApiJobLevel;
}
