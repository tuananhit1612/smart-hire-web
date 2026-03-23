/**
 * ═══════════════════════════════════════════════════════════
 *  Profile API Types
 *  Types matching 1:1 with backend API responses and payloads.
 *  Keep these in sync with the Swagger/OpenAPI spec.
 * ═══════════════════════════════════════════════════════════
 */

// ─── API Wrapper (backend envelope) ──────────────────────

/**
 * Standard backend response shape.
 * Axios res.data  = ApiWrapper<T>
 * Axios res.data.data = T (actual payload)
 */
export interface ApiWrapper<T> {
  success: boolean;
  code: string;
  data: T;
  message: string;
}

// ─── Profile ─────────────────────────────────────────────

export interface CandidateProfileResponse {
  id: number;
  fullName: string;
  lastName?: string;
  headline?: string;
  title: string;
  email: string;
  phone?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  gender?: string;
  linkedIn?: string;
  website?: string;
  avatarUrl?: string;
  summary?: string;
  yearsOfExperience?: number;
  expectedSalary?: string;
}

export interface UpdateProfilePayload {
  fullName?: string;
  lastName?: string;
  headline?: string;
  title?: string;
  phone?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  gender?: string;
  linkedIn?: string;
  website?: string;
  avatarUrl?: string;
  summary?: string;
  yearsOfExperience?: number;
  expectedSalary?: string;
}

// ─── Education ───────────────────────────────────────────

export interface EducationResponse {
  id: number;
  degree: string;
  institution: string;
  gpa?: number;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  logoUrl?: string;
}

export interface CreateEducationPayload {
  degree: string;
  institution: string;
  gpa?: number;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export type UpdateEducationPayload = Partial<CreateEducationPayload>;

// ─── Experience ──────────────────────────────────────────

export interface ExperienceResponse {
  id: number;
  title: string;
  companyName: string;
  isCurrent?: boolean;
  startDate: string;
  endDate?: string;
  description: string;
  location?: string;
}

export interface CreateExperiencePayload {
  title: string;
  companyName: string;
  isCurrent?: boolean;
  startDate: string;
  endDate?: string;
  description: string;
  location?: string;
}

export type UpdateExperiencePayload = Partial<CreateExperiencePayload>;

// ─── Project ─────────────────────────────────────────────

export interface ProjectResponse {
  id: number;
  projectName: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string; // comma-separated in API
  link?: string;
}

export interface CreateProjectPayload {
  projectName: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string; // comma-separated
  link?: string;
}

export type UpdateProjectPayload = Partial<CreateProjectPayload>;

// ─── Skill ───────────────────────────────────────────────

export interface SkillResponse {
  id: number;
  skillName: string;
  proficiencyLevel?: string; // "EXPERT", "ADVANCED", "INTERMEDIATE", "BEGINNER"
}

export interface CreateSkillPayload {
  skillName: string;
  proficiencyLevel?: string;
}

export type UpdateSkillPayload = Partial<CreateSkillPayload>;

// ─── CV File ─────────────────────────────────────────────

export interface CvFileResponse {
  id: number;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  isPrimary: boolean;
  uploadedAt: string;
}
