/**
 * ═══════════════════════════════════════════════════════════
 *  Profile API Service
 *  Thin wrapper around apiClient for candidate-profile
 *  endpoints. All functions return Axios responses — let
 *  interceptors handle error normalisation to ApiError.
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";

import type {
    CandidateProfileResponse,
    ProfilePayload,
    EducationResponse,
    EducationPayload,
    ExperienceResponse,
    ExperiencePayload,
    ProjectResponse,
    ProjectPayload,
    SkillResponse,
    SkillPayload,
} from "../types/profile-api-types";

// ─── Unified BE wrapper ─────────────────────────────────
interface ApiWrapper<T> {
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
}

export const profileApi = {
    // ── Profile CRUD ─────────────────────────────────────
    getProfile: () =>
        apiClient.get<ApiWrapper<CandidateProfileResponse>>("/candidate/profile"),

    createProfile: (data: ProfilePayload) =>
        apiClient.post<ApiWrapper<CandidateProfileResponse>>("/candidate/profile", data),

    updateProfile: (data: ProfilePayload) =>
        apiClient.put<ApiWrapper<CandidateProfileResponse>>("/candidate/profile", data),

    // ── Education ────────────────────────────────────────
    listEducations: () =>
        apiClient.get<ApiWrapper<EducationResponse[]>>("/candidate/profile/educations"),

    addEducation: (data: EducationPayload) =>
        apiClient.post<ApiWrapper<EducationResponse>>("/candidate/profile/educations", data),

    updateEducation: (id: number, data: EducationPayload) =>
        apiClient.put<ApiWrapper<EducationResponse>>(`/candidate/profile/educations/${id}`, data),

    deleteEducation: (id: number) =>
        apiClient.delete<ApiWrapper<null>>(`/candidate/profile/educations/${id}`),

    // ── Experience ───────────────────────────────────────
    listExperiences: () =>
        apiClient.get<ApiWrapper<ExperienceResponse[]>>("/candidate/profile/experiences"),

    addExperience: (data: ExperiencePayload) =>
        apiClient.post<ApiWrapper<ExperienceResponse>>("/candidate/profile/experiences", data),

    updateExperience: (id: number, data: ExperiencePayload) =>
        apiClient.put<ApiWrapper<ExperienceResponse>>(`/candidate/profile/experiences/${id}`, data),

    deleteExperience: (id: number) =>
        apiClient.delete<ApiWrapper<null>>(`/candidate/profile/experiences/${id}`),

    // ── Project ──────────────────────────────────────────
    listProjects: () =>
        apiClient.get<ApiWrapper<ProjectResponse[]>>("/candidate/profile/projects"),

    addProject: (data: ProjectPayload) =>
        apiClient.post<ApiWrapper<ProjectResponse>>("/candidate/profile/projects", data),

    updateProject: (id: number, data: ProjectPayload) =>
        apiClient.put<ApiWrapper<ProjectResponse>>(`/candidate/profile/projects/${id}`, data),

    deleteProject: (id: number) =>
        apiClient.delete<ApiWrapper<null>>(`/candidate/profile/projects/${id}`),

    // ── Skill ────────────────────────────────────────────
    listSkills: () =>
        apiClient.get<ApiWrapper<SkillResponse[]>>("/candidate/profile/skills"),

    addSkill: (data: SkillPayload) =>
        apiClient.post<ApiWrapper<SkillResponse>>("/candidate/profile/skills", data),

    updateSkill: (id: number, data: SkillPayload) =>
        apiClient.put<ApiWrapper<SkillResponse>>(`/candidate/profile/skills/${id}`, data),

    deleteSkill: (id: number) =>
        apiClient.delete<ApiWrapper<null>>(`/candidate/profile/skills/${id}`),
};
