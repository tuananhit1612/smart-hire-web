import { Job, JobType, JobLevel, JobStatus, Skill, JobRemote } from "../types/job";
import { HrJobResponse, CreateJobRequest, UpdateJobRequest, JobSkillDto } from "../types/hr-job-api-types";

/** Convert Backend Job DTO to Frontend Job State */
export function mapHrJobToFeJob(dto: HrJobResponse): Job {
    const mustHaveSkills: Skill[] = [];
    const niceToHaveSkills: Skill[] = [];

    dto.skills?.forEach((s) => {
        if (s.skillType === "MUST_HAVE") {
            mustHaveSkills.push({ id: `skill-${Date.now()}-${Math.random()}`, name: s.skillName });
        } else {
            niceToHaveSkills.push({ id: `skill-${Date.now()}-${Math.random()}`, name: s.skillName });
        }
    });

    return {
        id: String(dto.id),
        companyId: String(dto.companyId),
        title: dto.title,
        department: "General", // API doesn't have department directly, or maybe generic
        type: dto.jobType as JobType,
        level: dto.jobLevel as JobLevel,
        location: dto.location || "",
        remote: dto.isRemote ? "remote" : "onsite", // Approx mapping
        salaryMin: dto.salaryMin !== null ? dto.salaryMin : undefined,
        salaryMax: dto.salaryMax !== null ? dto.salaryMax : undefined,
        salaryCurrency: dto.salaryCurrency || "VND",
        description: dto.description || "",
        requirements: dto.requirements || "",
        benefits: dto.benefits || "",
        mustHaveSkills,
        niceToHaveSkills,
        status: dto.status as JobStatus,
        applicantCount: dto.totalApplications || 0,
        viewCount: dto.totalViews || 0,
        createdAt: dto.createdAt,
        updatedAt: dto.updatedAt,
        deadline: dto.deadline || undefined,
    };
}

/** Convert Frontend Job fields to Create DTO */
export function mapFeJobToCreateRequest(job: Omit<Job, "id" | "createdAt" | "updatedAt">, companyId: number): CreateJobRequest {
    const skills: JobSkillDto[] = [
        ...job.mustHaveSkills.map((s) => ({ skillName: s.name, skillType: "MUST_HAVE" as const })),
        ...job.niceToHaveSkills.map((s) => ({ skillName: s.name, skillType: "NICE_TO_HAVE" as const })),
    ];

    return {
        companyId,
        title: job.title,
        description: job.description,
        requirements: job.requirements,
        benefits: job.benefits,
        jobType: job.type,
        jobLevel: job.level,
        location: job.location,
        isRemote: job.remote === "remote" || job.remote === "hybrid",
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryCurrency: job.salaryCurrency,
        deadline: job.deadline,
        skills,
    };
}

/** Convert Frontend Job fields to Update DTO */
export function mapFeJobToUpdateRequest(updates: Partial<Job>): UpdateJobRequest {
    const req: UpdateJobRequest = {};
    if (updates.title !== undefined) req.title = updates.title;
    if (updates.description !== undefined) req.description = updates.description;
    if (updates.requirements !== undefined) req.requirements = updates.requirements;
    if (updates.benefits !== undefined) req.benefits = updates.benefits;
    if (updates.type !== undefined) req.jobType = updates.type;
    if (updates.level !== undefined) req.jobLevel = updates.level;
    if (updates.location !== undefined) req.location = updates.location;
    if (updates.remote !== undefined) req.isRemote = updates.remote === "remote" || updates.remote === "hybrid";
    if (updates.salaryMin !== undefined) req.salaryMin = updates.salaryMin;
    if (updates.salaryMax !== undefined) req.salaryMax = updates.salaryMax;
    if (updates.salaryCurrency !== undefined) req.salaryCurrency = updates.salaryCurrency;
    if (updates.deadline !== undefined) req.deadline = updates.deadline;

    if (updates.mustHaveSkills || updates.niceToHaveSkills) {
        // We typically replace all skills in updates, assuming frontend merges them
        // If updates just has one array, this mapping might be incomplete if it doesn't get the full existing job,
        // so usually it's better to update full job instead of partial, but let's handle it.
        const mergedSkills: JobSkillDto[] = [];
        if (updates.mustHaveSkills) {
            mergedSkills.push(...updates.mustHaveSkills.map(s => ({ skillName: s.name, skillType: "MUST_HAVE" as const })));
        }
        if (updates.niceToHaveSkills) {
            mergedSkills.push(...updates.niceToHaveSkills.map(s => ({ skillName: s.name, skillType: "NICE_TO_HAVE" as const })));
        }
        if (mergedSkills.length > 0) {
            req.skills = mergedSkills;
        }
    }

    return req;
}
