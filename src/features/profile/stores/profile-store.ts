/**
 * ═══════════════════════════════════════════════════════════
 *  Profile Zustand Store
 *  • Starts with mockProfile (offline-first fallback)
 *  • fetchProfile()  — hydrates from GET /candidate/profile
 *  • saveProfile()   — PUTs to API then updates local state
 * ═══════════════════════════════════════════════════════════
 */

import { create } from "zustand";
import { CandidateProfile } from "@/features/profile/types/profile";
import { profileApi } from "@/features/profile/api/profile-api";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { apiClient } from "@/shared/lib/api-client";
import type {
  EducationPayload,
  ExperiencePayload,
  ProjectPayload,
  SkillPayload,
} from "@/features/profile/types/profile-api-types";
import {
  mapProfileFromApi,
  mapEducationFromApi,
  mapExperienceFromApi,
  mapProjectFromApi,
  mapSkillFromApi,
  mapProfileToApi,
  mapEducationToApi,
  mapExperienceToApi,
  mapProjectToApi,
  mapSkillToApi,
} from "@/features/profile/utils/profile-mapper";

interface ProfileStore {
  profile: CandidateProfile;
  isLoading: boolean;
  error: string | null;

  setProfile: (profile: CandidateProfile) => void;
  updateProfile: (updates: Partial<CandidateProfile>) => void;

  /** Fetch full profile from API — merges into current state */
  fetchProfile: () => Promise<void>;

  /** Save current profile to API */
  saveProfile: () => Promise<void>;

  /** Upload avatar image and update avatarUrl */
  uploadAvatar: (file: File) => Promise<void>;

  // Education Actions
  addEducation: (data: EducationPayload) => Promise<void>;
  updateEducation: (id: string, data: Partial<EducationPayload>) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;

  // Experience Actions
  addExperience: (data: ExperiencePayload) => Promise<void>;
  updateExperience: (id: string, data: Partial<ExperiencePayload>) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;

  // Project Actions
  addProject: (data: ProjectPayload) => Promise<void>;
  updateProject: (id: string, data: Partial<ProjectPayload>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  // Skill Actions
  addSkill: (data: SkillPayload) => Promise<void>;
  updateSkill: (id: string, data: Partial<SkillPayload>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
}

const emptyProfile: CandidateProfile = {
  id: "",
  fullName: "",
  email: "",
  phone: "",
  location: "",
  headline: "",
  title: "",
  about: "",
  summary: "",
  avatarUrl: undefined,
  experiences: [],
  educations: [],
  skills: [],
  projects: [],
  certificates: [],
  languages: [],
  socialLinks: [],
};

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: emptyProfile,
  isLoading: false,
  error: null,

  setProfile: (profile) => set({ profile }),

  updateProfile: (updates) =>
    set((state) => ({ profile: { ...state.profile, ...updates } })),

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      /**
       * API wrapper shape: { success, code, data, message }
       * Axios res.data  = wrapper object
       * Axios res.data.data = actual payload
       * (Same pattern as auth-context.tsx)
       */

      // Profile may 404 for first-time users — handle gracefully
      let profileData: Partial<CandidateProfile> = {};
      try {
        const profileRes = await profileApi.getProfile();
        profileData = mapProfileFromApi(profileRes.data.data);
      } catch {
        // 404 = no profile yet → keep defaults
      }

      // Fetch sub-sections in parallel
      const results = await Promise.allSettled([
        profileApi.getEducations(),
        profileApi.getExperiences(),
        profileApi.getProjects(),
        profileApi.getSkills(),
      ]);

      const educations = results[0].status === "fulfilled" ? (results[0].value.data.data ?? []).map(mapEducationFromApi) : [];
      const experiences = results[1].status === "fulfilled" ? (results[1].value.data.data ?? []).map(mapExperienceFromApi) : [];
      const projects = results[2].status === "fulfilled" ? (results[2].value.data.data ?? []).map(mapProjectFromApi) : [];
      const skills = results[3].status === "fulfilled" ? (results[3].value.data.data ?? []).map(mapSkillFromApi) : [];

      set((state) => ({
        profile: {
          ...emptyProfile,
          ...profileData,
          educations,
          experiences,
          projects,
          skills,
        },
        isLoading: false,
      }));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Không thể tải hồ sơ.";
      set({ isLoading: false, error: message });
      // Keep empty data as fallback
      set({ profile: emptyProfile });
    }
  },

  saveProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const { profile } = get();
      
      // 1. Save Core User Info (Name, Phone)
      // The backend expects these in the User entity, not CandidateProfile
      await apiClient.put("/users/me", {
        fullName: profile.fullName || "",
        phone: profile.phone || "",
      });

      // 2. Save Candidate Profile Info (Headline, Summary, etc.)
      const payload = mapProfileToApi(profile);
      let res;
      if (!profile.id) {
        res = await profileApi.createProfile(payload);
      } else {
        res = await profileApi.updateProfile(payload);
      }
      const updatedProfile = mapProfileFromApi(res.data.data);

      // 2. Sync Educations
      const eduPromises = profile.educations.map(async (edu) => {
        const payload = mapEducationToApi(edu);
        if (edu.id.startsWith("edu-") || edu.id.startsWith("new-")) {
          return profileApi.createEducation(payload);
        } else {
          return profileApi.updateEducation(Number(edu.id), payload);
        }
      });

      // 3. Sync Experiences
      const expPromises = profile.experiences.map(async (exp) => {
        const payload = mapExperienceToApi(exp);
        if (exp.id.startsWith("exp-") || exp.id.startsWith("new-")) {
          return profileApi.createExperience(payload);
        } else {
          return profileApi.updateExperience(Number(exp.id), payload);
        }
      });

      // 4. Sync Projects
      const projPromises = profile.projects.map(async (proj) => {
        const payload = mapProjectToApi(proj);
        if (proj.id.startsWith("proj-") || proj.id.startsWith("new-")) {
          return profileApi.createProject(payload);
        } else {
          return profileApi.updateProject(Number(proj.id), payload);
        }
      });

      // 5. Sync Skills (since ProfileEditSkillsForm now does it immediately, we don't strictly *need* to do it here, but it's safe to sync everything just in case)
      const skillPromises = profile.skills.map(async (skill) => {
        const payload = mapSkillToApi(skill);
        if (skill.id.startsWith("skill-") || skill.id.startsWith("new-")) {
          return profileApi.createSkill(payload);
        } else {
          return profileApi.updateSkill(Number(skill.id), payload);
        }
      });

      // Execute all syncs
      await Promise.all([...eduPromises, ...expPromises, ...projPromises, ...skillPromises]);

      // Re-fetch everything cleanly from the server to get real IDs for newly created items
      await get().fetchProfile();
      
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Không thể lưu hồ sơ.";
      set({ isLoading: false, error: message });
      throw err; // re-throw so callers can show toast
    }
  },

  uploadAvatar: async (file: File) => {
    set({ isLoading: true, error: null });
    try {
      const res = await profileApi.uploadAvatar(file);
      const updated = mapProfileFromApi(res.data.data);

      set((state) => ({
        profile: { ...state.profile, avatarUrl: updated.avatarUrl },
        isLoading: false,
      }));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Không thể tải ảnh đại diện.";
      set({ isLoading: false, error: message });
      throw err;
    }
  },

  // ─── Education Actions ──────────────────────────────
  addEducation: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await profileApi.createEducation(data);
      const newEdu = mapEducationFromApi(res.data.data);
      set((state) => ({
        profile: { ...state.profile, educations: [...state.profile.educations, newEdu] },
        isLoading: false,
      }));
    } catch (err: unknown) {
      set({ isLoading: false, error: err instanceof Error ? err.message : "Gặp lỗi khi thêm học vấn" });
      throw err;
    }
  },
  updateEducation: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await profileApi.updateEducation(Number(id), data);
      const updatedEdu = mapEducationFromApi(res.data.data);
      set((state) => ({
        profile: {
          ...state.profile,
          educations: state.profile.educations.map((e) => (e.id === id ? updatedEdu : e)),
        },
        isLoading: false,
      }));
    } catch (err: unknown) {
      set({ isLoading: false, error: err instanceof Error ? err.message : "Gặp lỗi khi sửa học vấn" });
      throw err;
    }
  },
  deleteEducation: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await profileApi.deleteEducation(Number(id));
      set((state) => ({
        profile: {
          ...state.profile,
          educations: state.profile.educations.filter((e) => e.id !== id),
        },
        isLoading: false,
      }));
    } catch (err: unknown) {
      set({ isLoading: false, error: err instanceof Error ? err.message : "Gặp lỗi khi xóa học vấn" });
      throw err;
    }
  },

  // ─── Experience Actions ─────────────────────────────
  addExperience: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await profileApi.createExperience(data);
      const newExp = mapExperienceFromApi(res.data.data);
      set((state) => ({
        profile: { ...state.profile, experiences: [...state.profile.experiences, newExp] },
        isLoading: false,
      }));
    } catch (err: unknown) {
      set({ isLoading: false, error: err instanceof Error ? err.message : "Gặp lỗi khi thêm kinh nghiệm" });
      throw err;
    }
  },
  updateExperience: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await profileApi.updateExperience(Number(id), data);
      const updatedExp = mapExperienceFromApi(res.data.data);
      set((state) => ({
        profile: {
          ...state.profile,
          experiences: state.profile.experiences.map((e) => (e.id === id ? updatedExp : e)),
        },
        isLoading: false,
      }));
    } catch (err: unknown) {
      set({ isLoading: false, error: err instanceof Error ? err.message : "Gặp lỗi khi sửa kinh nghiệm" });
      throw err;
    }
  },
  deleteExperience: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await profileApi.deleteExperience(Number(id));
      set((state) => ({
        profile: {
          ...state.profile,
          experiences: state.profile.experiences.filter((e) => e.id !== id),
        },
        isLoading: false,
      }));
    } catch (err: unknown) {
      set({ isLoading: false, error: err instanceof Error ? err.message : "Gặp lỗi khi xóa kinh nghiệm" });
      throw err;
    }
  },

  // ─── Project Actions ────────────────────────────────
  addProject: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await profileApi.createProject(data);
      const newProj = mapProjectFromApi(res.data.data);
      set((state) => ({
        profile: { ...state.profile, projects: [...state.profile.projects, newProj] },
        isLoading: false,
      }));
    } catch (err: unknown) {
      set({ isLoading: false, error: err instanceof Error ? err.message : "Gặp lỗi khi thêm dự án" });
      throw err;
    }
  },
  updateProject: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await profileApi.updateProject(Number(id), data);
      const updatedProj = mapProjectFromApi(res.data.data);
      set((state) => ({
        profile: {
          ...state.profile,
          projects: state.profile.projects.map((p) => (p.id === id ? updatedProj : p)),
        },
        isLoading: false,
      }));
    } catch (err: unknown) {
      set({ isLoading: false, error: err instanceof Error ? err.message : "Gặp lỗi khi sửa dự án" });
      throw err;
    }
  },
  deleteProject: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await profileApi.deleteProject(Number(id));
      set((state) => ({
        profile: {
          ...state.profile,
          projects: state.profile.projects.filter((p) => p.id !== id),
        },
        isLoading: false,
      }));
    } catch (err: unknown) {
      set({ isLoading: false, error: err instanceof Error ? err.message : "Gặp lỗi khi xóa dự án" });
      throw err;
    }
  },

  // ─── Skill Actions ──────────────────────────────────
  addSkill: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await profileApi.createSkill(data);
      const newSkill = mapSkillFromApi(res.data.data);
      set((state) => ({
        profile: { ...state.profile, skills: [...state.profile.skills, newSkill] },
        isLoading: false,
      }));
    } catch (err: unknown) {
      set({ isLoading: false, error: err instanceof Error ? err.message : "Gặp lỗi khi thêm kỹ năng" });
      throw err;
    }
  },
  updateSkill: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await profileApi.updateSkill(Number(id), data);
      const updatedSkill = mapSkillFromApi(res.data.data);
      set((state) => ({
        profile: {
          ...state.profile,
          skills: state.profile.skills.map((s) => (s.id === id ? updatedSkill : s)),
        },
        isLoading: false,
      }));
    } catch (err: unknown) {
      set({ isLoading: false, error: err instanceof Error ? err.message : "Gặp lỗi khi sửa kỹ năng" });
      throw err;
    }
  },
  deleteSkill: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await profileApi.deleteSkill(Number(id));
      set((state) => ({
        profile: {
          ...state.profile,
          skills: state.profile.skills.filter((s) => s.id !== id),
        },
        isLoading: false,
      }));
    } catch (err: unknown) {
      set({ isLoading: false, error: err instanceof Error ? err.message : "Gặp lỗi khi xóa kỹ năng" });
      throw err;
    }
  },
}));
