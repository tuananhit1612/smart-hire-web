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
import { mockProfile } from "@/features/profile/types/mock-data";
import { profileApi } from "@/features/profile/api/profile-api";
import {
  mapProfileFromApi,
  mapEducationFromApi,
  mapExperienceFromApi,
  mapProjectFromApi,
  mapSkillFromApi,
  mapProfileToApi,
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
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: mockProfile,
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
      const [eduRes, expRes, projRes, skillRes] = await Promise.all([
        profileApi.getEducations(),
        profileApi.getExperiences(),
        profileApi.getProjects(),
        profileApi.getSkills(),
      ]);

      const educations = (eduRes.data.data ?? []).map(mapEducationFromApi);
      const experiences = (expRes.data.data ?? []).map(mapExperienceFromApi);
      const projects = (projRes.data.data ?? []).map(mapProjectFromApi);
      const skills = (skillRes.data.data ?? []).map(mapSkillFromApi);

      set((state) => ({
        profile: {
          ...state.profile,
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
      // Keep mock data as fallback — UI still works offline
    }
  },

  saveProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const { profile } = get();
      const payload = mapProfileToApi(profile);
      const res = await profileApi.updateProfile(payload);
      const updated = mapProfileFromApi(res.data.data);

      set((state) => ({
        profile: { ...state.profile, ...updated },
        isLoading: false,
      }));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Không thể lưu hồ sơ.";
      set({ isLoading: false, error: message });
      throw err; // re-throw so callers can show toast
    }
  },
}));
