import { create } from "zustand";
import { CandidateProfile } from "@/features/profile/types/profile";
import { mockProfile } from "@/features/profile/types/mock-data";

interface ProfileStore {
  profile: CandidateProfile;
  setProfile: (profile: CandidateProfile) => void;
  updateProfile: (updates: Partial<CandidateProfile>) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: mockProfile,
  setProfile: (profile) => set({ profile }),
  updateProfile: (updates) =>
    set((state) => ({ profile: { ...state.profile, ...updates } })),
}));
