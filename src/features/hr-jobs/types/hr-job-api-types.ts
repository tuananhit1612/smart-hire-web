/**
 * ═══════════════════════════════════════════════════════════
 *  HR Job API Types — 1:1 with backend Job DTOs
 *
 *  Source: com.smarthire.backend.features.job.dto.*
 * ═══════════════════════════════════════════════════════════
 */

import type { JobLevel,JobStatus,JobType,SkillType } from "@/shared/types/enums";

// Re-export for convenience
export type { JobLevel as HrJobLevel,JobStatus as HrJobStatus,JobType as HrJobType };

/** Mirrors JobSkillDto.java */
export interface JobSkillDto {
  skillName: string;
  skillType: SkillType;
}

/** Mirrors CreateJobRequest.java */
export interface CreateJobRequest {
  companyId: number;
  title: string;
  description?: string;
  requirements?: string;
  benefits?: string;
  jobType: JobType;
  jobLevel: JobLevel;
  location?: string;
  isRemote: boolean;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  deadline?: string;               // YYYY-MM-DD
  skills: JobSkillDto[];
}

export type UpdateJobRequest = Partial<CreateJobRequest>;

/** Mirrors ChangeJobStatusRequest (just a status string) */
export interface ChangeJobStatusRequest {
  status: JobStatus;
}

/** Mirrors JobResponse.java */
export interface HrJobResponse {
  id: number;
  companyId: number;
  companyName: string;
  companyLogoUrl: string | null;
  createdBy: number;
  title: string;
  description: string | null;
  requirements: string | null;
  benefits: string | null;
  jobType: JobType;
  jobLevel: JobLevel;
  location: string | null;
  isRemote: boolean;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;
  deadline: string | null;
  status: JobStatus;
  skills: JobSkillDto[];
  createdAt: string;
  updatedAt: string;
  /** Optional analytical properties returned by some views */
  totalApplications?: number;
  totalViews?: number;
}
