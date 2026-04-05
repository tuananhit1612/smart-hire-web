/**
 * ═══════════════════════════════════════════════════════════
 *  Job Mapper — convert backend JobResponse → frontend Job
 *
 *  Keeps existing components (JobCard, JobDetail) unchanged
 *  by translating API shapes into the local Job type.
 * ═══════════════════════════════════════════════════════════
 */

import type { Job, JobType, JobLevel } from "../types/job";
import type { JobResponse } from "../types/job-api-types";
import type { JobType as ApiJobType, JobLevel as ApiJobLevel } from "@/shared/types/enums";

// ─── Enum Mappings ──────────────────────────────────────

const JOB_TYPE_MAP: Record<ApiJobType, JobType> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
};

const JOB_LEVEL_MAP: Record<ApiJobLevel, JobLevel> = {
  INTERN: "Intern",
  JUNIOR: "Junior",
  MID: "Middle",
  SENIOR: "Senior",
  LEAD: "Lead",
  MANAGER: "Manager",
};

// ─── Salary Formatter ───────────────────────────────────

function formatSalary(min: number | null, max: number | null): string {
  if (min == null && max == null) return "Thỏa thuận";
  const fmt = (n: number) =>
    n >= 1_000_000
      ? `${(n / 1_000_000).toLocaleString("vi-VN")}M`
      : n.toLocaleString("vi-VN");
  if (min != null && max != null) return `${fmt(min)} - ${fmt(max)}`;
  if (min != null) return `Từ ${fmt(min)}`;
  return `Đến ${fmt(max!)}`;
}

// ─── Mapper ─────────────────────────────────────────────

export function mapJobResponseToJob(r: JobResponse): Job {
  return {
    id: String(r.id),
    title: r.title,
    company: r.companyName,
    logoUrl: r.companyLogoUrl ?? "/images/company-placeholder.png",
    location: r.location ?? "Việt Nam",
    type: JOB_TYPE_MAP[r.jobType] ?? "Full-time",
    level: JOB_LEVEL_MAP[r.jobLevel] ?? "Junior",
    salary: formatSalary(r.salaryMin, r.salaryMax),
    postedAt: r.createdAt,
    description: r.description ?? "",
    skills: r.skills?.map((s) => s.skillName) ?? [],

    // Detail-page fields
    fullDescription: r.description ?? undefined,
    requirements: r.requirements ? r.requirements.split("\n").filter(Boolean) : undefined,
    benefits: r.benefits ? r.benefits.split("\n").filter(Boolean) : undefined,
    deadline: r.deadline ?? undefined,
    status: r.status === "OPEN" ? "open" : "closed",

    // Company info
    companyInfo: {
      name: r.companyName,
      logoUrl: r.companyLogoUrl ?? "/images/company-placeholder.png",
    },

    // Location info
    locationInfo: {
      city: r.location ?? "Việt Nam",
      address: undefined,
    },
  };
}
