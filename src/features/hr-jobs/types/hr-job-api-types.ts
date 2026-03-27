export interface JobSkillDto {
    skillName: string;
    skillType: "MUST_HAVE" | "NICE_TO_HAVE";
}

export interface CreateJobRequest {
    companyId: number;
    title: string;
    description?: string;
    requirements?: string;
    benefits?: string;
    jobType: string;             // FULL_TIME | PART_TIME | CONTRACT | INTERNSHIP
    jobLevel: string;            // INTERN | JUNIOR | MID | SENIOR | LEAD | MANAGER
    location?: string;
    isRemote: boolean;
    salaryMin?: number;
    salaryMax?: number;
    salaryCurrency?: string;
    deadline?: string;           // YYYY-MM-DD
    skills: JobSkillDto[];
}

export interface UpdateJobRequest extends Partial<CreateJobRequest> {}

export interface ChangeJobStatusRequest {
    status: string;              // DRAFT | OPEN | CLOSED
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
    jobType: string;
    jobLevel: string;
    location: string | null;
    isRemote: boolean;
    salaryMin: number | null;
    salaryMax: number | null;
    salaryCurrency: string;
    deadline: string | null;
    status: string;
    skills: JobSkillDto[];
    createdAt: string;
    updatedAt: string;
    /* Optional analytical properties returned by some views */
    totalApplications?: number;
    totalViews?: number;
}
