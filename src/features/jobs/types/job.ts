export type JobType = "Full-time" | "Part-time" | "Contract" | "Remote" | "Internship" | "Freelance";
export type JobLevel = "Intern" | "Fresher" | "Junior" | "Middle" | "Senior" | "Lead" | "Manager";
export type JobStatus = "open" | "closed";

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

export interface ContactInfo {
  name: string;
  title?: string; // e.g., "HR Manager", "Recruiter"
  email: string;
  phone: string;
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
  
  // Job status
  status?: JobStatus; // Default is "open"
  closedAt?: string; // ISO Date string when job was closed
  
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
  contactInfo?: ContactInfo;
  workingHours?: string;
  teamSize?: string;
  reportTo?: string;
}

