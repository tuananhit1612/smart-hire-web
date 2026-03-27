import { CandidateProfile } from "./profile";

export const emptyProfile: CandidateProfile = {} as CandidateProfile;
export const partialProfile: CandidateProfile = {} as CandidateProfile;
export const filledProfile: CandidateProfile = {} as CandidateProfile;

export const mockProfile = filledProfile;

export const profileFixtures = {
  empty: emptyProfile,
  partial: partialProfile,
  filled: filledProfile,
} as const;

export type ProfileFixtureType = keyof typeof profileFixtures;
