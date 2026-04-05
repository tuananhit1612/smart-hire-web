import { Job } from '../types/job';
import { CVData } from '../../cv/types/types';

export interface Applicant {
    id: string;
    jobId: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    resumeUrl?: string;
    appliedAt: string;
    status: 'new' | 'reviewing' | 'shortlisted' | 'interviewed' | 'offered' | 'rejected';
    rating?: number;
    notes?: string;
    experience: string;
    currentCompany?: string;
    expectedSalary?: number;
    skills: string[];
    cvData?: CVData;
}

export const APPLICANT_STATUSES = {
    new: { label: 'Mới', color: 'sky' },
    reviewing: { label: 'Đang xem', color: 'amber' },
    shortlisted: { label: 'Vào vòng trong', color: 'purple' },
    interviewed: { label: 'Đã phỏng vấn', color: 'blue' },
    offered: { label: 'Đã offer', color: 'green' },
    rejected: { label: 'Từ chối', color: 'red' },
};

export const MOCK_APPLICANTS: Applicant[] = [];

export function getApplicantsByJobId(jobId: string): Applicant[] {
    return MOCK_APPLICANTS.filter(a => a.jobId === jobId);
}
