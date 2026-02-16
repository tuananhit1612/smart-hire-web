// Job Types for SmartHire HR Job Management

export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type JobLevel = 'junior' | 'middle' | 'senior' | 'lead' | 'manager';
export type JobRemote = 'onsite' | 'hybrid' | 'remote';
export type JobStatus = 'draft' | 'open' | 'paused' | 'closed';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
    id: string;
    name: string;
    level?: SkillLevel;
}

export interface Job {
    id: string;
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
    'full-time': 'Toàn thời gian',
    'part-time': 'Bán thời gian',
    'contract': 'Hợp đồng',
    'internship': 'Thực tập',
};

export const JOB_LEVELS: Record<JobLevel, string> = {
    'junior': 'Junior (0-2 năm)',
    'middle': 'Middle (2-4 năm)',
    'senior': 'Senior (4-7 năm)',
    'lead': 'Tech Lead (7+ năm)',
    'manager': 'Manager',
};

export const JOB_REMOTES: Record<JobRemote, string> = {
    'onsite': 'Làm việc tại văn phòng',
    'hybrid': 'Hybrid (Office + Remote)',
    'remote': 'Remote 100%',
};

export const JOB_STATUSES: Record<JobStatus, { label: string; color: string }> = {
    'draft': { label: 'Bản nháp', color: 'amber' },
    'open': { label: 'Đang tuyển', color: 'green' },
    'paused': { label: 'Tạm dừng', color: 'slate' },
    'closed': { label: 'Đã đóng', color: 'red' },
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
    type: 'full-time',
    level: 'middle',
    location: '',
    remote: 'hybrid',
    salaryCurrency: 'VND',
    description: '',
    requirements: '',
    mustHaveSkills: [],
    niceToHaveSkills: [],
    status: 'draft',
    applicantCount: 0,
    viewCount: 0,
};
