// Mock data for CV Files

import { CVFile, CVFileVersion } from '../types/cv-file-types';

const createVersion = (
    id: string,
    versionNumber: number,
    fileName: string,
    fileSize: number,
    fileType: 'pdf' | 'docx',
    daysAgo: number,
    note?: string
): CVFileVersion => ({
    id,
    versionNumber,
    fileName,
    fileSize,
    fileType,
    uploadedAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
    note,
});

export const MOCK_CV_FILES: CVFile[] = [
    {
        id: 'cv-001',
        name: 'CV Frontend Developer',
        description: 'CV chính cho vị trí Frontend Developer, tập trung React/Next.js',
        status: 'active',
        isDefault: true,
        currentVersion: createVersion(
            'v-001-3',
            3,
            'CV_Frontend_Developer_v3.pdf',
            245760, // ~240KB
            'pdf',
            2,
            'Thêm dự án SmartHire và cập nhật kỹ năng TypeScript'
        ),
        versions: [
            createVersion('v-001-3', 3, 'CV_Frontend_Developer_v3.pdf', 245760, 'pdf', 2, 'Thêm dự án SmartHire và cập nhật kỹ năng TypeScript'),
            createVersion('v-001-2', 2, 'CV_Frontend_Developer_v2.pdf', 231424, 'pdf', 15, 'Cập nhật kinh nghiệm làm việc'),
            createVersion('v-001-1', 1, 'CV_Frontend_Developer_v1.pdf', 204800, 'pdf', 45, 'Phiên bản đầu tiên'),
        ],
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        matchScore: 92,
    },
    {
        id: 'cv-002',
        name: 'CV Fullstack Developer',
        description: 'CV cho vị trí Fullstack với Spring Boot + React',
        status: 'active',
        isDefault: false,
        currentVersion: createVersion(
            'v-002-2',
            2,
            'CV_Fullstack_Developer_v2.docx',
            189440, // ~185KB
            'docx',
            7,
            'Bổ sung kinh nghiệm Java Spring Boot'
        ),
        versions: [
            createVersion('v-002-2', 2, 'CV_Fullstack_Developer_v2.docx', 189440, 'docx', 7, 'Bổ sung kinh nghiệm Java Spring Boot'),
            createVersion('v-002-1', 1, 'CV_Fullstack_Developer_v1.docx', 174080, 'docx', 30, 'Phiên bản đầu tiên'),
        ],
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        matchScore: 85,
    },
    {
        id: 'cv-003',
        name: 'CV Data Analyst',
        description: 'CV cho vị trí phân tích dữ liệu',
        status: 'draft',
        isDefault: false,
        currentVersion: createVersion(
            'v-003-1',
            1,
            'CV_Data_Analyst_Draft.pdf',
            156672, // ~153KB
            'pdf',
            3,
            'Bản nháp đầu tiên'
        ),
        versions: [
            createVersion('v-003-1', 1, 'CV_Data_Analyst_Draft.pdf', 156672, 'pdf', 3, 'Bản nháp đầu tiên'),
        ],
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
        id: 'cv-004',
        name: 'CV Mobile Developer',
        description: 'CV cho vị trí React Native/Flutter',
        status: 'archived',
        isDefault: false,
        currentVersion: createVersion(
            'v-004-1',
            1,
            'CV_Mobile_Developer.pdf',
            198656, // ~194KB
            'pdf',
            60,
            'CV cũ, đã archive'
        ),
        versions: [
            createVersion('v-004-1', 1, 'CV_Mobile_Developer.pdf', 198656, 'pdf', 60, 'CV cũ, đã archive'),
        ],
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        matchScore: 68,
    },
];

// Helper function to format file size
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Helper function to format relative time
export function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} tháng trước`;
    return `${Math.floor(diffDays / 365)} năm trước`;
}
