/**
 * ═══════════════════════════════════════════════════════════
 *  Profile API Service
 *  Thin wrapper around apiClient for profile endpoints.
 *  Pattern matches auth-api.ts — returns Axios responses.
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";
import type {
  ApiWrapper,
  CandidateProfileResponse,
  UpdateProfilePayload,
  EducationResponse,
  CreateEducationPayload,
  UpdateEducationPayload,
  ExperienceResponse,
  CreateExperiencePayload,
  UpdateExperiencePayload,
  ProjectResponse,
  CreateProjectPayload,
  UpdateProjectPayload,
  SkillResponse,
  CreateSkillPayload,
  UpdateSkillPayload,
  CvFileResponse,
} from "../types/profile-api-types";

const BASE = "/candidate/profile";

export const profileApi = {
  // ─── Profile ─────────────────────────────────────────────

  /** GET /candidate/profile */
  getProfile: () =>
    apiClient.get<ApiWrapper<CandidateProfileResponse>>(BASE),

  /** POST /candidate/profile — first-time creation */
  createProfile: (data: UpdateProfilePayload) =>
    apiClient.post<ApiWrapper<CandidateProfileResponse>>(BASE, data),

  /** PUT /candidate/profile — update existing */
  updateProfile: (data: UpdateProfilePayload) =>
    apiClient.put<ApiWrapper<CandidateProfileResponse>>(BASE, data),

  /** POST /candidate/profile/avatar — upload avatar (multipart/form-data) */
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<ApiWrapper<CandidateProfileResponse>>(
      `${BASE}/avatar`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  },

  // ─── Education CRUD ────────────────────────────────────

  /** GET /candidate/profile/educations */
  getEducations: () =>
    apiClient.get<ApiWrapper<EducationResponse[]>>(`${BASE}/educations`),

  /** POST /candidate/profile/educations */
  createEducation: (data: CreateEducationPayload) =>
    apiClient.post<ApiWrapper<EducationResponse>>(`${BASE}/educations`, data),

  /** PUT /candidate/profile/educations/:id */
  updateEducation: (id: number, data: UpdateEducationPayload) =>
    apiClient.put<ApiWrapper<EducationResponse>>(`${BASE}/educations/${id}`, data),

  /** DELETE /candidate/profile/educations/:id */
  deleteEducation: (id: number) =>
    apiClient.delete(`${BASE}/educations/${id}`),

  // ─── Experience CRUD ───────────────────────────────────

  /** GET /candidate/profile/experiences */
  getExperiences: () =>
    apiClient.get<ApiWrapper<ExperienceResponse[]>>(`${BASE}/experiences`),

  /** POST /candidate/profile/experiences */
  createExperience: (data: CreateExperiencePayload) =>
    apiClient.post<ApiWrapper<ExperienceResponse>>(`${BASE}/experiences`, data),

  /** PUT /candidate/profile/experiences/:id */
  updateExperience: (id: number, data: UpdateExperiencePayload) =>
    apiClient.put<ApiWrapper<ExperienceResponse>>(`${BASE}/experiences/${id}`, data),

  /** DELETE /candidate/profile/experiences/:id */
  deleteExperience: (id: number) =>
    apiClient.delete(`${BASE}/experiences/${id}`),

  // ─── Project CRUD ──────────────────────────────────────

  /** GET /candidate/profile/projects */
  getProjects: () =>
    apiClient.get<ApiWrapper<ProjectResponse[]>>(`${BASE}/projects`),

  /** POST /candidate/profile/projects */
  createProject: (data: CreateProjectPayload) =>
    apiClient.post<ApiWrapper<ProjectResponse>>(`${BASE}/projects`, data),

  /** PUT /candidate/profile/projects/:id */
  updateProject: (id: number, data: UpdateProjectPayload) =>
    apiClient.put<ApiWrapper<ProjectResponse>>(`${BASE}/projects/${id}`, data),

  /** DELETE /candidate/profile/projects/:id */
  deleteProject: (id: number) =>
    apiClient.delete(`${BASE}/projects/${id}`),

  // ─── Skill CRUD ────────────────────────────────────────

  /** GET /candidate/profile/skills */
  getSkills: () =>
    apiClient.get<ApiWrapper<SkillResponse[]>>(`${BASE}/skills`),

  /** POST /candidate/profile/skills */
  createSkill: (data: CreateSkillPayload) =>
    apiClient.post<ApiWrapper<SkillResponse>>(`${BASE}/skills`, data),

  /** PUT /candidate/profile/skills/:id */
  updateSkill: (id: number, data: UpdateSkillPayload) =>
    apiClient.put<ApiWrapper<SkillResponse>>(`${BASE}/skills/${id}`, data),

  /** DELETE /candidate/profile/skills/:id */
  deleteSkill: (id: number) =>
    apiClient.delete(`${BASE}/skills/${id}`),

  // ─── CV Files ──────────────────────────────────────────

  /** GET /candidate/profile/cv-files */
  getCvFiles: () =>
    apiClient.get<ApiWrapper<CvFileResponse[]>>(`${BASE}/cv-files`),

  /** POST /candidate/profile/cv-files — upload (multipart/form-data) */
  uploadCvFile: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<ApiWrapper<CvFileResponse>>(`${BASE}/cv-files`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  /** DELETE /candidate/profile/cv-files/:id */
  deleteCvFile: (id: number) =>
    apiClient.delete(`${BASE}/cv-files/${id}`),

  /** PUT /candidate/profile/cv-files/:id/primary */
  setCvFilePrimary: (id: number) =>
    apiClient.put(`${BASE}/cv-files/${id}/primary`),

  /** GET /candidate/profile/cv-files/:id/download */
  downloadCvFile: (id: number) =>
    apiClient.get<Blob>(`${BASE}/cv-files/${id}/download`, {
      responseType: "blob",
    }),
};
