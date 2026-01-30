export type JobType = "Full-time" | "Part-time" | "Contract" | "Remote" | "Internship" | "Freelance";
export type JobLevel = "Intern" | "Fresher" | "Junior" | "Middle" | "Senior" | "Lead" | "Manager";

export interface Job {
  id: string;
  title: string;
  company: string;
  logoUrl: string;
  location: string;
  type: JobType;
  level: JobLevel;
  salary: string;
  postedAt: string; // ISO Date string
  description: string;
  skills: string[];
}
