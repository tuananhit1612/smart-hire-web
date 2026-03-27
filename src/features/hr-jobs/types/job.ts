// Job Types for SmartHire HR Job Management

export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
export type JobLevel = 'INTERN' | 'JUNIOR' | 'MID' | 'SENIOR' | 'LEAD' | 'MANAGER';
export type JobRemote = 'onsite' | 'hybrid' | 'remote';
export type JobStatus = 'DRAFT' | 'OPEN' | 'CLOSED'; // Removed 'paused'
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
    id?: string;
    name: string;
    level?: SkillLevel;
}

export interface Job {
    id: string; // Keep as string for Frontend store compat, mapped to internal Number ID.
    companyId: string;
    title: string;
    department: string;
    type: JobType;
    level: JobLevel;
    location: string;
    remote: JobRemote;
    salaryMin?: number;
    salaryMax?: number;
    salaryCurrency: string;
    description: string;
    requirements: string;
    benefits?: string;
    mustHaveSkills: Skill[];
    niceToHaveSkills: Skill[];
    status: JobStatus;
    applicantCount: number;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
    deadline?: string;
}

// Constants for dropdowns
export const JOB_TYPES: Record<JobType, string> = {
    'FULL_TIME': 'Toàn thời gian',
    'PART_TIME': 'Bán thời gian',
    'CONTRACT': 'Hợp đồng',
    'INTERNSHIP': 'Thực tập',
};

export const JOB_LEVELS: Record<JobLevel, string> = {
    'INTERN': 'Thực tập sinh (Intern)',
    'JUNIOR': 'Junior (0-2 năm)',
    'MID': 'Middle (2-4 năm)',
    'SENIOR': 'Senior (4-7 năm)',
    'LEAD': 'Tech Lead (7+ năm)',
    'MANAGER': 'Manager',
};

export const JOB_REMOTES: Record<JobRemote, string> = {
    'onsite': 'Làm việc tại văn phòng',
    'hybrid': 'Hybrid (Office + Remote)',
    'remote': 'Remote 100%',
};

export const JOB_STATUSES: Record<JobStatus, { label: string; color: string }> = {
    'DRAFT': { label: 'Bản nháp', color: 'amber' },
    'OPEN': { label: 'Đang tuyển', color: 'green' },
    'CLOSED': { label: 'Đã đóng', color: 'slate' },
};

export const SKILL_LEVELS: Record<SkillLevel, string> = {
    'beginner': 'Cơ bản',
    'intermediate': 'Trung bình',
    'advanced': 'Nâng cao',
    'expert': 'Chuyên gia',
};

export const DEPARTMENTS = [
    'Engineering',
    'Product',
    'Design',
    'Data Science',
    'DevOps',
    'QA',
    'Marketing',
    'Sales',
    'HR',
    'Finance',
    'Operations',
    'Customer Success',
];

export const DEFAULT_JOB: Omit<Job, 'id' | 'createdAt' | 'updatedAt'> = {
    companyId: '',
    title: '',
    department: 'Engineering',
    type: 'FULL_TIME',
    level: 'MID',
    location: '',
    remote: 'hybrid',
    salaryCurrency: 'VND',
    description: '',
    requirements: '',
    mustHaveSkills: [],
    niceToHaveSkills: [],
    status: 'DRAFT',
    applicantCount: 0,
    viewCount: 0,
};
