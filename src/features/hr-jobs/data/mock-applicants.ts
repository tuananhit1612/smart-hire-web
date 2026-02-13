import { Job } from '../types/job';
import { CVData } from '../../cv/types/types';
import {
    MOCK_DATA_SENIOR,
    MOCK_DATA_INTERN,
    MOCK_DATA_LEADER,
    MOCK_DATA_SALES_ADMIN,
    MOCK_DATA_CHRO,
    MOCK_DATA_SALES_EXEC,
    MOCK_DATA_BA,
} from '../../cv/data/mock-data';

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

// Helper to create personalized CV data from a template
function createCVForApplicant(base: CVData, name: string, email: string, phone: string, company?: string, title?: string): CVData {
    return {
        ...base,
        personalInfo: {
            ...base.personalInfo,
            fullName: name.toUpperCase(),
            email,
            phone,
            title: title || base.personalInfo.title,
        },
        experience: company && base.experience.length > 0
            ? [{ ...base.experience[0], company, isCurrent: true }, ...base.experience.slice(1)]
            : base.experience,
    };
}

export const MOCK_APPLICANTS: Applicant[] = [
    {
        id: 'app-001',
        jobId: 'job-001',
        name: 'Nguyễn Văn An',
        email: 'an.nguyen@gmail.com',
        phone: '0901234567',
        appliedAt: '2026-02-01T10:30:00Z',
        status: 'shortlisted',
        rating: 4.5,
        experience: '5 năm',
        currentCompany: 'FPT Software',
        expectedSalary: 45000000,
        skills: ['React', 'TypeScript', 'Next.js', 'Node.js'],
        cvData: createCVForApplicant(MOCK_DATA_SENIOR, 'Nguyễn Văn An', 'an.nguyen@gmail.com', '0901234567', 'FPT Software', 'Senior Frontend Developer'),
    },
    {
        id: 'app-002',
        jobId: 'job-001',
        name: 'Trần Thị Bình',
        email: 'binh.tran@gmail.com',
        phone: '0912345678',
        appliedAt: '2026-02-02T14:15:00Z',
        status: 'new',
        rating: 4,
        experience: '3 năm',
        currentCompany: 'VNG Corporation',
        expectedSalary: 35000000,
        skills: ['React', 'Vue.js', 'JavaScript'],
        cvData: createCVForApplicant(MOCK_DATA_INTERN, 'Trần Thị Bình', 'binh.tran@gmail.com', '0912345678', 'VNG Corporation', 'Frontend Developer'),
    },
    {
        id: 'app-003',
        jobId: 'job-001',
        name: 'Lê Minh Cường',
        email: 'cuong.le@gmail.com',
        phone: '0923456789',
        appliedAt: '2026-02-03T09:00:00Z',
        status: 'reviewing',
        rating: 3.5,
        experience: '4 năm',
        currentCompany: 'Tiki',
        expectedSalary: 40000000,
        skills: ['React', 'Angular', 'TypeScript'],
        cvData: createCVForApplicant(MOCK_DATA_LEADER, 'Lê Minh Cường', 'cuong.le@gmail.com', '0923456789', 'Tiki', 'Frontend Developer'),
    },
    {
        id: 'app-004',
        jobId: 'job-001',
        name: 'Phạm Thị Dung',
        email: 'dung.pham@gmail.com',
        phone: '0934567890',
        appliedAt: '2026-02-04T11:45:00Z',
        status: 'interviewed',
        rating: 5,
        experience: '6 năm',
        currentCompany: 'Shopee',
        expectedSalary: 55000000,
        skills: ['React', 'Next.js', 'GraphQL', 'AWS'],
        cvData: createCVForApplicant(MOCK_DATA_BA, 'Phạm Thị Dung', 'dung.pham@gmail.com', '0934567890', 'Shopee', 'Senior Frontend Engineer'),
    },
    {
        id: 'app-005',
        jobId: 'job-002',
        name: 'Hoàng Đức Em',
        email: 'em.hoang@gmail.com',
        phone: '0945678901',
        appliedAt: '2026-02-01T16:20:00Z',
        status: 'new',
        experience: '3 năm',
        currentCompany: 'MISA',
        expectedSalary: 30000000,
        skills: ['Node.js', 'PostgreSQL', 'Docker'],
        cvData: createCVForApplicant(MOCK_DATA_SALES_EXEC, 'Hoàng Đức Em', 'em.hoang@gmail.com', '0945678901', 'MISA', 'Backend Developer'),
    },
    {
        id: 'app-006',
        jobId: 'job-002',
        name: 'Vũ Thị Phương',
        email: 'phuong.vu@gmail.com',
        phone: '0956789012',
        appliedAt: '2026-02-02T08:30:00Z',
        status: 'shortlisted',
        rating: 4.5,
        experience: '4 năm',
        currentCompany: 'Grab',
        expectedSalary: 38000000,
        skills: ['Go', 'Kubernetes', 'PostgreSQL', 'Redis'],
        cvData: createCVForApplicant(MOCK_DATA_CHRO, 'Vũ Thị Phương', 'phuong.vu@gmail.com', '0956789012', 'Grab', 'Backend Engineer'),
    },
    {
        id: 'app-007',
        jobId: 'job-003',
        name: 'Đặng Văn Giang',
        email: 'giang.dang@gmail.com',
        phone: '0967890123',
        appliedAt: '2026-01-30T10:00:00Z',
        status: 'offered',
        rating: 5,
        experience: '5 năm',
        currentCompany: 'Freelancer',
        expectedSalary: 42000000,
        skills: ['Figma', 'UI Design', 'Prototyping', 'Design Systems'],
        cvData: createCVForApplicant(MOCK_DATA_SALES_ADMIN, 'Đặng Văn Giang', 'giang.dang@gmail.com', '0967890123', undefined, 'Product Designer'),
    },
    {
        id: 'app-008',
        jobId: 'job-007',
        name: 'Ngô Thị Hoa',
        email: 'hoa.ngo@gmail.com',
        phone: '0978901234',
        appliedAt: '2026-02-03T15:00:00Z',
        status: 'reviewing',
        experience: '2 năm',
        currentCompany: 'FPT IS',
        expectedSalary: 22000000,
        skills: ['Selenium', 'Cypress', 'Postman', 'JIRA'],
        cvData: createCVForApplicant(MOCK_DATA_INTERN, 'Ngô Thị Hoa', 'hoa.ngo@gmail.com', '0978901234', 'FPT IS', 'QA Engineer'),
    },
];

export function getApplicantsByJobId(jobId: string): Applicant[] {
    return MOCK_APPLICANTS.filter(a => a.jobId === jobId);
}
