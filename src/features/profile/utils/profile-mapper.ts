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
  CandidateProfileResponse,
  UpdateProfilePayload,
  EducationResponse,
  CreateEducationPayload,
  ExperienceResponse,
  CreateExperiencePayload,
  ProjectResponse,
  CreateProjectPayload,
  SkillResponse,
  CreateSkillPayload,
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
    lastName: res.lastName,
    headline: res.headline,
    title: res.title,
    email: res.email,
    phone: res.phone,
    location: res.address ?? "",
    country: res.country,
    state: res.state,
    city: res.city,
    gender: res.gender,
    linkedIn: res.linkedIn,
    website: res.website,
    avatarUrl: res.avatarUrl,
    about: res.summary ?? "",
    summary: res.summary,
    yearsOfExperience: res.yearsOfExperience,
    expectedSalary: res.expectedSalary,
  };
}

export function mapEducationFromApi(res: EducationResponse): Education {
  return {
    id: toStr(res.id),
    degree: res.degree,
    institution: res.institution,
    gpa: res.gpa,
    fieldOfStudy: res.fieldOfStudy,
    startDate: res.startDate,
    endDate: res.endDate,
    logoUrl: res.logoUrl,
  };
}

export function mapExperienceFromApi(res: ExperienceResponse): Experience {
  return {
    id: toStr(res.id),
    title: res.title,
    companyName: res.companyName,
    isCurrent: res.isCurrent ?? !res.endDate,
    startDate: res.startDate,
    endDate: res.endDate,
    description: res.description,
    location: res.location,
  };
}

export function mapProjectFromApi(res: ProjectResponse): Project {
  return {
    id: toStr(res.id),
    projectName: res.projectName,
    startDate: res.startDate,
    endDate: res.endDate,
    description: res.description,
    technologies: techStringToArray(res.technologies),
    link: res.link,
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
): UpdateProfilePayload {
  return {
    fullName: profile.fullName,
    lastName: profile.lastName,
    headline: profile.headline,
    title: profile.title,
    phone: profile.phone,
    address: profile.location,
    country: profile.country,
    state: profile.state,
    city: profile.city,
    gender: profile.gender,
    linkedIn: profile.linkedIn,
    website: profile.website,
    avatarUrl: profile.avatarUrl,
    summary: profile.about || profile.summary,
    yearsOfExperience: profile.yearsOfExperience,
    expectedSalary: profile.expectedSalary,
  };
}

export function mapEducationToApi(edu: Education): CreateEducationPayload {
  return {
    degree: edu.degree,
    institution: edu.institution,
    gpa: edu.gpa,
    fieldOfStudy: edu.fieldOfStudy,
    startDate: edu.startDate,
    endDate: edu.endDate,
  };
}

export function mapExperienceToApi(exp: Experience): CreateExperiencePayload {
  return {
    title: exp.title,
    companyName: exp.companyName,
    isCurrent: exp.isCurrent ?? !exp.endDate,
    startDate: exp.startDate,
    endDate: exp.endDate,
    description: exp.description,
    location: exp.location,
  };
}

export function mapProjectToApi(proj: Project): CreateProjectPayload {
  return {
    projectName: proj.projectName,
    startDate: proj.startDate,
    endDate: proj.endDate,
    description: proj.description,
    technologies: techArrayToString(proj.technologies),
    link: proj.link,
  };
}

export function mapSkillToApi(skill: Skill): CreateSkillPayload {
  return {
    skillName: skill.skillName,
    proficiencyLevel: skill.proficiencyLevel
      ? uppercaseLevel(skill.proficiencyLevel)
      : undefined,
  };
}
