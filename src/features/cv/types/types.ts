// CV Data Types for SmartHire CV Builder

export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    avatarUrl?: string;
    linkedIn?: string;
    portfolio?: string;
}

export interface Education {
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    description?: string;
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    description: string;
}

export interface Skill {
    id: string;
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category: 'technical' | 'soft';
}

export interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    startDate?: string;
    endDate?: string;
}

export interface CVData {
    id?: string;
    personalInfo: PersonalInfo;
    summary: string;
    education: Education[];
    experience: Experience[];
    skills: Skill[];
    projects: Project[];
    createdAt?: Date;
    updatedAt?: Date;
    version?: number;
}

export type CVSection =
    | 'personal'
    | 'summary'
    | 'education'
    | 'experience'
    | 'skills'
    | 'projects';

export interface CVSectionConfig {
    id: CVSection;
    title: string;
    icon: string;
    description: string;
}

export const CV_SECTIONS: CVSectionConfig[] = [
    { id: 'personal', title: 'Thông tin cá nhân', icon: 'User', description: 'Họ tên, liên hệ, avatar' },
    { id: 'summary', title: 'Giới thiệu', icon: 'FileText', description: 'Tóm tắt về bản thân' },
    { id: 'education', title: 'Học vấn', icon: 'GraduationCap', description: 'Trình độ học vấn' },
    { id: 'experience', title: 'Kinh nghiệm', icon: 'Briefcase', description: 'Kinh nghiệm làm việc' },
    { id: 'skills', title: 'Kỹ năng', icon: 'Zap', description: 'Các kỹ năng chuyên môn' },
    { id: 'projects', title: 'Dự án', icon: 'FolderKanban', description: 'Các dự án đã thực hiện' },
];

// Default empty CV data
export const DEFAULT_CV_DATA: CVData = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
    },
    summary: '',
    education: [],
    experience: [],
    skills: [],
    projects: [],
};
