export interface Skill {
  id: string;
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string; // ISO Date or "Present"
  endDate?: string; // ISO Date or undefined if current
  description: string;
  logoUrl?: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  logoUrl?: string; // University logo
}

export interface SocialLink {
  platform: "LinkedIn" | "GitHub" | "Website" | "Twitter";
  url: string;
}

export interface CandidateProfile {
  id: string;
  fullName: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  avatarUrl?: string;
  about: string;
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
  socialLinks: SocialLink[];
}
