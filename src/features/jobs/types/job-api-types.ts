/**
 * ═══════════════════════════════════════════════════════════
 *  Job API Types — 1:1 with backend JobResponse.java
 *
 *  Source: com.smarthire.backend.features.job.dto.*
 * ═══════════════════════════════════════════════════════════
 */

import type { JobType, JobLevel, JobStatus, SkillType } from "@/shared/types/enums";

// Re-export for convenience
export type { JobType, JobLevel, JobStatus };

// ─── Backend DTOs ────────────────────────────────────────

/** Mirrors JobSkillDto.java */
export interface JobSkillDto {
  skillName: string;
  skillType: SkillType;
}

/** Mirrors JobResponse.java — 1:1 field mapping */
export interface JobResponse {
  id: number;
  companyId: number;
  companyName: string;
  companyLogoUrl: string | null;
  createdBy: number;
  title: string;
  description: string;
  requirements: string | null;
  benefits: string | null;
  jobType: JobType;
  jobLevel: JobLevel;
  location: string | null;
  isRemote: boolean;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;
  deadline: string | null;       // ISO date "2025-06-01"
  status: JobStatus;
  skills: JobSkillDto[];
  createdAt: string;             // ISO datetime
  updatedAt: string;             // ISO datetime
}

// ─── Query Params ────────────────────────────────────────

/** GET /jobs/public — query params */
export interface JobSearchParams {
  keyword?: string;
  location?: string;
  jobLevel?: JobLevel;
  jobType?: JobType;
  salaryMin?: number;
  salaryMax?: number;
}
