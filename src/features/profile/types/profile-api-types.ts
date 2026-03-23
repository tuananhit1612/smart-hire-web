/**
 * ═══════════════════════════════════════════════════════════
 *  Profile API Types
 *  Response / request shapes for /candidate/profile endpoints
 *  aligned with BE Swagger.
 * ═══════════════════════════════════════════════════════════
 */

// ─── Enums (from BE) ─────────────────────────────────────
export type Gender = "MALE" | "FEMALE" | "OTHER";
export type JobLevel =
    | "INTERN"
    | "FRESHER"
    | "JUNIOR"
    | "MIDDLE"
    | "SENIOR"
    | "LEAD"
    | "MANAGER"
    | "DIRECTOR";

// ─── Profile Response (GET /candidate/profile) ──────────
export interface CandidateProfileResponse {
    id: number;
    userId: number;
    fullName: string;
    email: string;
    phone?: string;
    avatarUrl?: string;
    headline?: string;
    summary?: string;
    dateOfBirth?: string;
    gender?: Gender;
    address?: string;
    city?: string;
    yearsOfExperience?: number;
    jobLevel?: JobLevel;
    createdAt: string;
    updatedAt: string;
}

// ─── Profile Create / Update Payload ────────────────────
export interface ProfilePayload {
    headline?: string;
    summary?: string;
    dateOfBirth?: string;
    gender?: Gender;
    address?: string;
    city?: string;
    yearsOfExperience?: number;
    jobLevel?: JobLevel;
}

// ─── Education ──────────────────────────────────────────
export interface EducationResponse {
    id: number;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
    description?: string;
}

export interface EducationPayload {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
    description?: string;
}

// ─── Experience ─────────────────────────────────────────
export interface ExperienceResponse {
    id: number;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description?: string;
    location?: string;
}

export interface ExperiencePayload {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description?: string;
    location?: string;
}

// ─── Project ────────────────────────────────────────────
export interface ProjectResponse {
    id: number;
    name: string;
    role: string;
    startDate: string;
    endDate?: string;
    description?: string;
    technologies?: string;
    projectUrl?: string;
}

export interface ProjectPayload {
    name: string;
    role: string;
    startDate: string;
    endDate?: string;
    description?: string;
    technologies?: string;
    projectUrl?: string;
}

// ─── Skill ──────────────────────────────────────────────
export interface SkillResponse {
    id: number;
    name: string;
    level?: string;
}

export interface SkillPayload {
    name: string;
    level?: string;
}
