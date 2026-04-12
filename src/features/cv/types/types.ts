// CV Data Types for SmartHire CV Builder

export interface SocialLink {
    id: string;
    network: 'LinkedIn' | 'GitHub' | 'Website' | 'Behance' | 'Dribbble' | 'Twitter' | 'Facebook' | 'Instagram' | 'Other';
    url: string;
}

export interface PersonalInfo {
    fullName: string;
    title?: string;
    email: string;
    phone: string;
    location: string;
    website?: string; // Deprecated, use socials
    avatarUrl?: string;
    socials: SocialLink[];
    additionalInfo?: { label: string; value: string }[];
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
    level: number | 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category: 'technical' | 'soft';
    description?: string;
}

export interface Language {
    id: string;
    name: string;
    level: 'beginner' | 'elementary' | 'intermediate' | 'upper-intermediate' | 'advanced' | 'native';
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    expiry?: string;
    url?: string;
}

export interface Award {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description?: string;
}

export interface Project {
    id: string;
    name: string;
    role?: string;
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
    languages: Language[];
    certifications: Certification[];
    awards: Award[];
    sectionOrder?: CVSection[];
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
    | 'projects'
    | 'languages'
    | 'certifications'
    | 'awards';

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
    { id: 'languages', title: 'Ngôn ngữ', icon: 'Globe', description: 'Trình độ ngoại ngữ' },
    { id: 'certifications', title: 'Chứng chỉ', icon: 'Award', description: 'Các chứng chỉ đạt được' },
    { id: 'awards', title: 'Giải thưởng', icon: 'Trophy', description: 'Giải thưởng và thành tích' },
];

// Default empty CV data
export const DEFAULT_CV_DATA: CVData = {
    personalInfo: {
        fullName: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        socials: [],
    },
    summary: '',
    education: [],
    experience: [],
    skills: [],
    projects: [],
    languages: [],
    certifications: [],
    awards: [],
};

// ─── Design Tokens ─────────────────────────────────────────────────────────

export interface CVDesignTokens {
    fontFamily: string;
    fontSize: number;          // scale factor 0.8–1.2
    accentColor: string;       // hex
    spacing: 'compact' | 'normal' | 'relaxed';
    sectionOrder: CVSection[];
    hiddenSections: CVSection[];
    headerStyle: 'classic' | 'modern' | 'minimal';
    columnLayout: '1-col' | '2-col';
}

export const FONT_OPTIONS = [
    { id: 'sans', label: 'Inter / Sans', family: "'Inter', sans-serif" },
    { id: 'roboto', label: 'Roboto', family: "'Roboto', sans-serif" },
    { id: 'playfair', label: 'Playfair Display', family: "'Playfair Display', serif" },
    { id: 'merriweather', label: 'Merriweather', family: "'Merriweather', serif" },
    { id: 'poppins', label: 'Poppins', family: "'Poppins', sans-serif" },
    { id: 'source', label: 'Source Sans Pro', family: "'Source Sans 3', sans-serif" },
] as const;

export const ACCENT_PRESETS = [
    '#E11D48', // rose-600
    '#2563EB', // blue-600
    '#059669', // emerald-600
    '#7C3AED', // violet-600
    '#D97706', // amber-600
    '#0891B2', // cyan-600
    '#DC2626', // red-600
    '#4F46E5', // indigo-600
    '#0D9488', // teal-600
    '#64748B', // slate-500
] as const;

export const DEFAULT_SECTION_ORDER: CVSection[] = [
    'personal', 'summary', 'experience', 'education',
    'skills', 'projects', 'languages', 'certifications', 'awards',
];

export const DEFAULT_DESIGN_TOKENS: CVDesignTokens = {
    fontFamily: 'sans',
    fontSize: 1,
    accentColor: '#E11D48',
    spacing: 'normal',
    sectionOrder: DEFAULT_SECTION_ORDER,
    hiddenSections: [],
    headerStyle: 'modern',
    columnLayout: '1-col',
};
