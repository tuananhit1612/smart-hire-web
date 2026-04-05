/**
 * ═══════════════════════════════════════════════════════════
 *  Profile Mapper — API ↔ FE conversions
 *  Handles the few remaining differences between API shapes
 *  and frontend types after the field-rename pass.
 *
 *  Differences handled:
 *  • id:               number (API) ↔ string (FE)
 *  • proficiencyLevel: "EXPERT" (API) ↔ "Expert" (FE)
 *  • technologies:     "A, B" (API) ↔ ["A", "B"] (FE)
 *  • isCurrent:        API field ↔ derived from !endDate
 *  • address (API)     ↔ location (FE)
 *  • summary (API)     ↔ about (FE alias)
 * ═══════════════════════════════════════════════════════════
 */

import type {
  Gender,
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
  ProficiencyLevel,
} from "../types/profile-api-types";

import type {
  CandidateProfile,
  Education,
  Experience,
  Project,
  Skill,
} from "../types/profile";

// ─── Helpers ─────────────────────────────────────────────

/** "EXPERT" → "Expert" */
function capitalizeLevel(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

/** "Expert" → "EXPERT" */
function uppercaseLevel(s: string): string {
  return s.toUpperCase();
}

/** Comma-separated string → array */
function techStringToArray(s: string): string[] {
  if (!s) return [];
  return s.split(",").map((t) => t.trim()).filter(Boolean);
}

/** Array → comma-separated string */
function techArrayToString(arr: string[]): string {
  return arr.join(", ");
}

/** Convert empty string to undefined so it's omitted from JSON */
function emptyToUndefined(s: string | undefined | null): string | undefined {
  if (s === null || s === undefined || s === "") return undefined;
  return s;
}

/** Vietnamese display label → Backend Gender enum */
const genderDisplayToApi: Record<string, Gender> = {
  "Nam": "MALE",
  "Nữ": "FEMALE",
  "Khác": "OTHER",
  "Không muốn tiết lộ": "OTHER",
};

/** Backend Gender enum → Vietnamese display label */
const genderApiToDisplay: Record<string, string> = {
  "MALE": "Nam",
  "FEMALE": "Nữ",
  "OTHER": "Khác",
};

function toStr(id: number | string): string {
  return String(id);
}

function toNum(id: string | number): number {
  return typeof id === "number" ? id : parseInt(id, 10);
}

// ─── API → FE ────────────────────────────────────────────

export function mapProfileFromApi(
  res: CandidateProfileResponse
): Partial<CandidateProfile> {
  return {
    id: toStr(res.id),
    fullName: res.fullName,
    headline: res.headline || "",
    email: res.email,
    phone: res.phone || "",
    location: res.address || "",
    country: res.country || "",
    state: res.state || "",
    city: res.city || "",
    linkedIn: res.linkedinUrl || "",
    website: res.personalWebsite || "",
    gender: res.gender ? (genderApiToDisplay[res.gender] || res.gender) : undefined,
    avatarUrl: res.avatarUrl || undefined,
    about: res.summary || "",
    summary: res.summary || undefined,
    yearsOfExperience: res.yearsOfExperience || undefined,
    jobPreference: res.jobPreference ? {
      jobTitles: res.jobPreference.jobTitles || [],
      preferredLocations: res.jobPreference.preferredLocations || [],
      preferredIndustry: res.jobPreference.preferredIndustry || "",
      employmentType: res.jobPreference.employmentType || "",
      preferredExperienceLevel: res.jobPreference.preferredExperienceLevel || "",
      companySize: res.jobPreference.companySize || "",
      workPreference: res.jobPreference.workPreference as "Remote" | "Onsite" | "Hybrid" || "",
      willingToRelocate: res.jobPreference.willingToRelocate || false,
      availabilityDate: res.jobPreference.availabilityDate || "",
      salary: res.jobPreference.salary || "",
    } : undefined,
  };
}

export function mapEducationFromApi(res: EducationResponse): Education {
  return {
    id: toStr(res.id),
    degree: res.degree || "",
    institution: res.institution,
    gpa: res.gpa || undefined,
    fieldOfStudy: res.fieldOfStudy || "",
    startDate: res.startDate || "",
    endDate: res.endDate || "",
    logoUrl: undefined, // Not in backend DTO
  };
}

export function mapExperienceFromApi(res: ExperienceResponse): Experience {
  return {
    id: toStr(res.id),
    title: res.title,
    companyName: res.companyName,
    isCurrent: res.isCurrent ?? !res.endDate,
    startDate: res.startDate || "",
    endDate: res.endDate || undefined,
    description: res.description || "",
    location: "", // Not in backend DTO — FE-only field
  };
}

export function mapProjectFromApi(res: ProjectResponse): Project {
  return {
    id: toStr(res.id),
    projectName: res.projectName,
    startDate: res.startDate || "",
    endDate: res.endDate || "",
    description: res.description || "",
    technologies: techStringToArray(res.technologies || ""),
    link: res.link || "",
  };
}

export function mapSkillFromApi(res: SkillResponse): Skill {
  return {
    id: toStr(res.id),
    skillName: res.skillName,
    proficiencyLevel: res.proficiencyLevel
      ? (capitalizeLevel(res.proficiencyLevel) as Skill["proficiencyLevel"])
      : undefined,
  };
}

// ─── FE → API ────────────────────────────────────────────

export function mapProfileToApi(
  profile: Partial<CandidateProfile>
): ProfilePayload {
  return {
    headline: emptyToUndefined(profile.headline),
    address: emptyToUndefined(profile.location),
    country: emptyToUndefined(profile.country),
    state: emptyToUndefined(profile.state),
    city: emptyToUndefined(profile.city),
    linkedinUrl: emptyToUndefined(profile.linkedIn),
    personalWebsite: emptyToUndefined(profile.website),
    gender: profile.gender ? (genderDisplayToApi[profile.gender] || profile.gender as Gender) : undefined,
    summary: emptyToUndefined(profile.about || profile.summary),
    yearsOfExperience: profile.yearsOfExperience,
    jobPreference: profile.jobPreference ? {
      jobTitles: profile.jobPreference.jobTitles || [],
      preferredLocations: profile.jobPreference.preferredLocations || [],
      preferredIndustry: emptyToUndefined(profile.jobPreference.preferredIndustry),
      employmentType: emptyToUndefined(profile.jobPreference.employmentType),
      preferredExperienceLevel: emptyToUndefined(profile.jobPreference.preferredExperienceLevel),
      companySize: emptyToUndefined(profile.jobPreference.companySize),
      workPreference: emptyToUndefined(profile.jobPreference.workPreference),
      willingToRelocate: profile.jobPreference.willingToRelocate,
      availabilityDate: emptyToUndefined(profile.jobPreference.availabilityDate),
      salary: emptyToUndefined(profile.jobPreference.salary),
    } : undefined,
  };
}

export function mapEducationToApi(edu: Education): EducationPayload {
  return {
    degree: emptyToUndefined(edu.degree),
    institution: edu.institution,
    gpa: edu.gpa,
    fieldOfStudy: emptyToUndefined(edu.fieldOfStudy),
    startDate: emptyToUndefined(edu.startDate),
    endDate: emptyToUndefined(edu.endDate),
  };
}

export function mapExperienceToApi(exp: Experience): ExperiencePayload {
  const endDate = emptyToUndefined(exp.endDate);
  return {
    title: exp.title,
    companyName: exp.companyName,
    isCurrent: exp.isCurrent ?? !endDate,
    startDate: emptyToUndefined(exp.startDate),
    endDate,
    description: emptyToUndefined(exp.description),
  };
}

export function mapProjectToApi(proj: Project): ProjectPayload {
  return {
    projectName: proj.projectName,
    description: emptyToUndefined(proj.description),
    technologies: emptyToUndefined(techArrayToString(proj.technologies)),
    startDate: emptyToUndefined(proj.startDate),
    endDate: emptyToUndefined(proj.endDate),
    link: emptyToUndefined(proj.link),
  };
}

export function mapSkillToApi(skill: Skill): SkillPayload {
  return {
    skillName: skill.skillName,
    proficiencyLevel: skill.proficiencyLevel
      ? uppercaseLevel(skill.proficiencyLevel) as ProficiencyLevel
      : "BEGINNER" as ProficiencyLevel,
  };
}
