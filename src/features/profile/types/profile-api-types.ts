/**
 * ═══════════════════════════════════════════════════════════
 *  Profile API Types — 1:1 with backend candidate DTOs
 *
 *  Source: com.smarthire.backend.features.candidate.dto.*
 * ═══════════════════════════════════════════════════════════
 */

import type {
  Gender,
  JobLevel,
  ProficiencyLevel,
  CvFileType,
  CvSource,
} from "@/shared/types/enums";

// Re-export for convenience
export type { Gender, JobLevel, ProficiencyLevel, CvFileType, CvSource };

// ─── Candidate Profile ───────────────────────────────────

/** Mirrors CandidateProfileResponse.java */
export interface CandidateProfileResponse {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  headline: string | null;
  summary: string | null;
  dateOfBirth: string | null;       // ISO Date "1995-01-15"
  gender: Gender | null;
  address: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  linkedinUrl: string | null;
  personalWebsite: string | null;
  yearsOfExperience: number | null;
  jobLevel: JobLevel | null;
  jobPreference: {
    jobTitles: string[];
    preferredLocations: string[];
    preferredIndustry: string | null;
    employmentType: string | null;
    preferredExperienceLevel: string | null;
    companySize: string | null;
    workPreference: string | null;
    willingToRelocate: boolean | null;
    availabilityDate: string | null;
    salary: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
}

/** Mirrors CandidateProfileRequest.java */
export interface ProfilePayload {
  headline?: string;
  summary?: string;
  dateOfBirth?: string;
  gender?: Gender;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  linkedinUrl?: string;
  personalWebsite?: string;
  yearsOfExperience?: number;
  jobLevel?: JobLevel;
  jobPreference?: {
    jobTitles?: string[];
    preferredLocations?: string[];
    preferredIndustry?: string;
    employmentType?: string;
    preferredExperienceLevel?: string;
    companySize?: string;
    workPreference?: string;
    willingToRelocate?: boolean;
    availabilityDate?: string;
    salary?: string;
  };
}

// ─── Education ───────────────────────────────────────────

/** Mirrors EducationResponse.java */
export interface EducationResponse {
  id: number;
  institution: string;
  degree: string | null;
  fieldOfStudy: string | null;
  startDate: string | null;
  endDate: string | null;
  gpa: number | null;
  description: string | null;
}

/** Mirrors EducationRequest.java */
export interface EducationPayload {
  institution: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  gpa?: number;
  description?: string;
}

// ─── Experience ──────────────────────────────────────────

/** Mirrors ExperienceResponse.java */
export interface ExperienceResponse {
  id: number;
  companyName: string;
  title: string;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
}

/** Mirrors ExperienceRequest.java */
export interface ExperiencePayload {
  companyName: string;
  title: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
}

// ─── Project ─────────────────────────────────────────────

/** Mirrors ProjectResponse.java */
export interface ProjectResponse {
  id: number;
  projectName: string;
  description: string | null;
  technologies: string | null;      // comma-separated
  startDate: string | null;
  endDate: string | null;
  link: string | null;
}

/** Mirrors ProjectRequest.java */
export interface ProjectPayload {
  projectName: string;
  description?: string;
  technologies?: string;
  startDate?: string;
  endDate?: string;
  link?: string;
}

// ─── Skill ───────────────────────────────────────────────

/** Mirrors SkillResponse.java */
export interface SkillResponse {
  id: number;
  skillName: string;
  proficiencyLevel: ProficiencyLevel | null;
}

/** Mirrors SkillRequest.java */
export interface SkillPayload {
  skillName: string;
  proficiencyLevel: ProficiencyLevel;
}

// ─── CV Files ────────────────────────────────────────────

/** Mirrors CvFileResponse.java */
export interface CvFileResponse {
  id: number;
  fileName: string;
  fileType: CvFileType;
  fileSize: number;
  source: CvSource;
  isPrimary: boolean;
  createdAt: string;
  downloadUrl: string;
}
