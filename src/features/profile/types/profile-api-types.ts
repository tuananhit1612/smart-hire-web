/**
 * ═══════════════════════════════════════════════════════════
 *  Profile API Types — Synchronized with Backend DTOs
 * ═══════════════════════════════════════════════════════════
 */

import { ApiWrapper } from "@/shared/types/api";

// ─── Enums Reference ─────────────────────────────────────

export type Gender = "MALE" | "FEMALE" | "OTHER";
export type JobLevel = "INTERN" | "JUNIOR" | "MIDDLE" | "SENIOR" | "LEAD" | "MANAGER" | "DIRECTOR";
export type ProficiencyLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
export type CvFileType = "PDF" | "DOCX";
export type CvSource = "UPLOADED" | "BUILT";

// ─── Candidate Profile ───────────────────────────────────

export interface CandidateProfileResponse {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  headline: string | null;
  summary: string | null;
  dateOfBirth: string | null; // ISO Date "1995-01-15"
  gender: Gender | null;
  address: string | null;
  city: string | null;
  yearsOfExperience: number | null;
  jobLevel: JobLevel | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProfilePayload {
  headline?: string;
  summary?: string;
  dateOfBirth?: string;
  gender?: Gender;
  address?: string;
  city?: string;
  yearsOfExperience?: number;
  jobLevel?: JobLevel;
  phone?: string;
}

// ─── Education ───────────────────────────────────────────

export interface EducationResponse {
  id: number;
  institution: string;
  degree: string | null;
  fieldOfStudy: string | null;
  startDate: string | null;
  endDate: string | null;
  gpa: number | null;
  description: string | null;
  logoUrl?: string | null;
}

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

export interface ExperienceResponse {
  id: number;
  companyName: string;
  title: string;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
  location: string | null;
}

export interface ExperiencePayload {
  companyName: string;
  title: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
  location?: string;
}

// ─── Project ─────────────────────────────────────────────

export interface ProjectResponse {
  id: number;
  projectName: string;
  description: string | null;
  technologies: string | null; // comma-separated
  startDate: string | null;
  endDate: string | null;
  link: string | null;
}

export interface ProjectPayload {
  projectName: string;
  description?: string;
  technologies?: string;
  startDate?: string;
  endDate?: string;
  link?: string;
}

// ─── Skill ───────────────────────────────────────────────

export interface SkillResponse {
  id: number;
  skillName: string;
  proficiencyLevel: ProficiencyLevel | null;
}

export interface SkillPayload {
  skillName: string;
  proficiencyLevel: ProficiencyLevel;
}

// ─── CV Files ─────────────────────────────────────────────

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
