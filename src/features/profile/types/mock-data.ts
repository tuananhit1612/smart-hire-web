import { CandidateProfile } from "./profile";

const DEFAULT_PROFILE: CandidateProfile = {
  id: "",
  fullName: "",
  title: "",
  email: "",
  location: "",
  about: "",
  skills: [],
  experiences: [],
  educations: [],
  certificates: [],
  projects: [],
  languages: [],
  socialLinks: [],
};

export const emptyProfile: CandidateProfile = { ...DEFAULT_PROFILE };
export const partialProfile: CandidateProfile = { ...DEFAULT_PROFILE };
export const filledProfile: CandidateProfile = { ...DEFAULT_PROFILE };

export const mockProfile = filledProfile;

export const profileFixtures = {
  empty: emptyProfile,
  partial: partialProfile,
  filled: filledProfile,
} as const;

export type ProfileFixtureType = keyof typeof profileFixtures;
