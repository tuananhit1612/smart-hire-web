export interface Certificate {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Project {
  id: string;
  projectName: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Language {
  id: string;
  language: string;
  proficiency: "Native" | "Fluent" | "Intermediate" | "Basic";
}

export interface Skill {
  id: string;
  skillName: string;
  proficiencyLevel?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface Experience {
  id: string;
  title: string;
  companyName: string;
  isCurrent?: boolean;
  startDate: string;
  endDate?: string;
  description: string;
  logoUrl?: string;
  location?: string;
  locationType?: "Remote" | "Onsite" | "Hybrid";
  employmentType?: "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  gpa?: number;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  logoUrl?: string;
}

export interface SocialLink {
  platform: "LinkedIn" | "GitHub" | "Website" | "Twitter";
  url: string;
}

export interface JobPreference {
  jobTitles: string[];
  preferredLocations: string[];
  preferredIndustry: string;
  employmentType: string;
  preferredExperienceLevel: string;
  companySize: string;
  workPreference: "Remote" | "Onsite" | "Hybrid" | "";
  willingToRelocate: boolean;
  availabilityDate: string;
  salary: string;
}

export interface EqualOpportunity {
  pronouns: string;
  disability: string;
  veteranStatus: string;
  ethnicity: string;
  sexualOrientation: string;
}

export interface AIQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface CandidateProfile {
  id: string;
  fullName: string;
  lastName?: string;
  headline?: string;
  title?: string;
  email: string;
  phone?: string;
  location: string;
  country?: string;
  state?: string;
  city?: string;
  gender?: string;
  linkedIn?: string;
  website?: string;
  avatarUrl?: string;
  about: string;
  summary?: string;
  yearsOfExperience?: number;
  expectedSalary?: string;
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
  certificates: Certificate[];
  projects: Project[];
  languages: Language[];
  socialLinks: SocialLink[];
  jobPreference?: JobPreference;
  equalOpportunity?: EqualOpportunity;
  aiQuestions?: AIQuestion[];
}
