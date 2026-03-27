import { Job, JobLevel } from "../types/job";
import { CandidateProfile } from "@/features/profile/types/profile";

export interface JobMatchResult {
  job: Job;
  score: number; // 0-100
  matchReasons: string[];
  skillMatches: string[];
}

// Map experience years to job levels
const LEVEL_EXPERIENCE_MAP: Record<JobLevel, { min: number; max: number }> = {
  Intern: { min: 0, max: 0 },
  Fresher: { min: 0, max: 1 },
  Junior: { min: 1, max: 3 },
  Middle: { min: 3, max: 5 },
  Senior: { min: 5, max: 10 },
  Lead: { min: 7, max: 15 },
  Manager: { min: 8, max: 20 },
};

/**
 * Calculate skill match score between job and profile
 * Returns percentage of job skills that user has
 */
function calculateSkillMatch(job: Job, profile: CandidateProfile): { score: number; matchedSkills: string[] } {
  if (!profile.skills?.length || !job.skills?.length) {
    return { score: 0, matchedSkills: [] };
  }

  const profileSkillNames = profile.skills.map((s) => s.skillName.toLowerCase());
  const matchedSkills = job.skills.filter((skill) =>
    profileSkillNames.includes(skill.toLowerCase())
  );

  const score = (matchedSkills.length / job.skills.length) * 100;
  return { score, matchedSkills };
}

/**
 * Calculate level match score based on user experience
 */
function calculateLevelMatch(job: Job, profile: CandidateProfile): number {
  const userYears = profile.yearsOfExperience || 0;
  const levelRange = LEVEL_EXPERIENCE_MAP[job.level];

  if (!levelRange) return 50; // Default middle score

  // Perfect match if user is within range
  if (userYears >= levelRange.min && userYears <= levelRange.max) {
    return 100;
  }

  // Slightly under-qualified (close to min)
  if (userYears < levelRange.min) {
    const diff = levelRange.min - userYears;
    if (diff <= 1) return 70; // 1 year under is acceptable
    if (diff <= 2) return 40;
    return 20; // Too junior
  }

  // Over-qualified
  if (userYears > levelRange.max) {
    const diff = userYears - levelRange.max;
    if (diff <= 2) return 80; // Slightly over is fine
    return 50; // Very overqualified
  }

  return 50;
}

/**
 * Calculate location match score
 */
function calculateLocationMatch(job: Job, profile: CandidateProfile): number {
  if (!profile.location) return 30; // No location set

  // Remote jobs match everyone
  if (job.type === "Remote" || job.location === "Remote") {
    return 100;
  }

  const profileCity = profile.location.toLowerCase();
  const jobCity = job.location.toLowerCase();

  // Same city
  if (profileCity.includes(jobCity) || jobCity.includes(profileCity)) {
    return 100;
  }

  // Different city
  return 30;
}

/**
 * Calculate job type preference score
 */
function calculateTypeMatch(job: Job): number {
  switch (job.type) {
    case "Full-time":
      return 100;
    case "Remote":
      return 90;
    case "Contract":
      return 70;
    case "Part-time":
      return 60;
    case "Freelance":
      return 50;
    case "Internship":
      return 40;
    default:
      return 50;
  }
}

/**
 * Calculate overall match score for a job
 */
export function calculateJobMatchScore(
  job: Job,
  profile: CandidateProfile
): JobMatchResult {
  const skillResult = calculateSkillMatch(job, profile);
  const levelScore = calculateLevelMatch(job, profile);
  const locationScore = calculateLocationMatch(job, profile);
  const typeScore = calculateTypeMatch(job);

  // Weighted score calculation
  const score = Math.round(
    skillResult.score * 0.4 +
      levelScore * 0.25 +
      locationScore * 0.2 +
      typeScore * 0.15
  );

  // Generate match reasons
  const matchReasons: string[] = [];

  if (skillResult.matchedSkills.length > 0) {
    matchReasons.push(
      `Kỹ năng phù hợp: ${skillResult.matchedSkills.slice(0, 3).join(", ")}`
    );
  }

  if (levelScore >= 70) {
    matchReasons.push(`Cấp bậc ${job.level} phù hợp kinh nghiệm`);
  }

  if (locationScore === 100) {
    if (job.type === "Remote") {
      matchReasons.push("Làm việc từ xa");
    } else {
      matchReasons.push(`Vị trí tại ${job.location}`);
    }
  }

  if (matchReasons.length === 0) {
    matchReasons.push("Cơ hội việc làm mới");
  }

  return {
    job,
    score,
    matchReasons,
    skillMatches: skillResult.matchedSkills,
  };
}

/**
 * Get top recommended jobs for a profile
 */
export function getRecommendedJobs(
  profile: CandidateProfile,
  jobs: Job[],
  limit: number = 3
): JobMatchResult[] {
  // Check if profile has enough info for recommendations
  const hasSkills = profile.skills && profile.skills.length > 0;
  const hasLocation = Boolean(profile.location?.trim());
  const hasExperience = profile.yearsOfExperience !== undefined;

  if (!hasSkills && !hasLocation && !hasExperience) {
    return []; // Not enough profile info
  }

  // Calculate scores for all jobs
  const scoredJobs = jobs.map((job) => calculateJobMatchScore(job, profile));

  // Sort by score descending and return top N
  return scoredJobs
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .filter((result) => result.score >= 20); // Minimum 20% match
}
