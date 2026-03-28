export interface JobSkillDto {
    skillName: string;
    skillType: "MUST_HAVE" | "NICE_TO_HAVE";
}

export type HrJobType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "FREELANCE" | "REMOTE";
export type HrJobLevel = "INTERN" | "JUNIOR" | "MIDDLE" | "SENIOR" | "LEAD" | "MANAGER" | "DIRECTOR";
export type HrJobStatus = "DRAFT" | "OPEN" | "CLOSED" | "PAUSED";

export interface CreateJobRequest {
    companyId: number;
    title: string;
    description?: string;
    requirements?: string;
    benefits?: string;
    jobType: HrJobType;
    jobLevel: HrJobLevel;
    location?: string;
    isRemote: boolean;
    salaryMin?: number;
    salaryMax?: number;
    salaryCurrency?: string;
    deadline?: string;           // YYYY-MM-DD
    skills: JobSkillDto[];
}

export type UpdateJobRequest = Partial<CreateJobRequest>;

export interface ChangeJobStatusRequest {
    status: HrJobStatus;
}

export interface HrJobResponse {
    id: number;
    companyId: number;
    companyName: string;
    companyLogoUrl: string | null;
    createdBy: number;
    title: string;
    description: string | null;
    requirements: string | null;
    benefits: string | null;
    jobType: HrJobType;
    jobLevel: HrJobLevel;
    location: string | null;
    isRemote: boolean;
    salaryMin: number | null;
    salaryMax: number | null;
    salaryCurrency: string;
    deadline: string | null;
    status: HrJobStatus;
    skills: JobSkillDto[];
    createdAt: string;
    updatedAt: string;
    /* Optional analytical properties returned by some views */
    totalApplications?: number;
    totalViews?: number;
}
