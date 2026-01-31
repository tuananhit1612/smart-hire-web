export type JobType = "Full-time" | "Part-time" | "Contract" | "Remote" | "Internship" | "Freelance";
export type JobLevel = "Intern" | "Fresher" | "Junior" | "Middle" | "Senior" | "Lead" | "Manager";

export interface CompanyInfo {
  name: string;
  logoUrl: string;
  coverImageUrl?: string; // Company office/team image
  description?: string;
  website?: string;
  industry?: string;
  size?: string; // e.g., "50-100 employees", "500+ employees"
  founded?: number;
}

export interface LocationInfo {
  city: string;
  address?: string; // Full address
  district?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Job {
  id: string;
  title: string;
  company: string;
  logoUrl: string;
  location: string; // Simple location for card display
  type: JobType;
  level: JobLevel;
  salary: string;
  postedAt: string; // ISO Date string
  description: string; // Short description for card
  skills: string[];
  
  // Extended fields for detail page
  fullDescription?: string;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  companyDescription?: string;
  deadline?: string; // ISO Date string
  
  // New fields for richer detail
  companyInfo?: CompanyInfo;
  locationInfo?: LocationInfo;
  workingHours?: string;
  teamSize?: string;
  reportTo?: string;
}
