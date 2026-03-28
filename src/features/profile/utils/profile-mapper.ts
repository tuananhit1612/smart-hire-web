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
    city: res.city || "",
    gender: res.gender || undefined,
    avatarUrl: res.avatarUrl || undefined,
    about: res.summary || "",
    summary: res.summary || undefined,
    yearsOfExperience: res.yearsOfExperience || undefined,
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
    startDate: "",     // Not in backend DTO — FE-only field
    endDate: "",       // Not in backend DTO — FE-only field
    description: res.description || "",
    technologies: techStringToArray(res.technologies || ""),
    link: "",          // Not in backend DTO — FE-only field
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
    headline: profile.headline,
    address: profile.location,
    city: profile.city,
    gender: profile.gender as Gender,
    summary: profile.about || profile.summary || undefined,
    yearsOfExperience: profile.yearsOfExperience,
  };
}

export function mapEducationToApi(edu: Education): EducationPayload {
  return {
    degree: edu.degree,
    institution: edu.institution,
    gpa: edu.gpa,
    fieldOfStudy: edu.fieldOfStudy,
    startDate: edu.startDate,
    endDate: edu.endDate,
  };
}

export function mapExperienceToApi(exp: Experience): ExperiencePayload {
  return {
    title: exp.title,
    companyName: exp.companyName,
    isCurrent: exp.isCurrent ?? !exp.endDate,
    startDate: exp.startDate,
    endDate: exp.endDate,
    description: exp.description,
  };
}

export function mapProjectToApi(proj: Project): ProjectPayload {
  return {
    projectName: proj.projectName,
    description: proj.description,
    technologies: techArrayToString(proj.technologies),
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
