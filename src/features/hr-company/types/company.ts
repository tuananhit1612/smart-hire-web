// Company Types for SmartHire HR Company Profile

export interface SocialLink {
    platform: 'LinkedIn' | 'Facebook' | 'Twitter' | 'Website' | 'GitHub';
    url: string;
}

export interface Benefit {
    id: string;
    icon: string;
    title: string;
    description: string;
}

export interface Company {
    id: string;
    name: string;
    tagline?: string;
    industry: string;
    size: 'STARTUP' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE';
    location: string;
    address?: string;
    website?: string;
    email?: string;
    phone?: string;
    logoUrl?: string;
    coverUrl?: string;
    about: string;
    description?: string;
    founded?: string;
    techStack: string[];
    benefits: Benefit[];
    socialLinks: SocialLink[];
    culture?: string;
    mission?: string;
    vision?: string;
}

export const COMPANY_SIZES: Record<Company['size'], string> = {
    'STARTUP': '1-10 nhân viên',
    'SMALL': '11-50 nhân viên',
    'MEDIUM': '51-200 nhân viên',
    'LARGE': '201-500 nhân viên',
    'ENTERPRISE': 'Trên 500 nhân viên',
};

export const INDUSTRIES = [
    'Công nghệ thông tin',
    'Tài chính - Ngân hàng',
    'Thương mại điện tử',
    'Giáo dục',
    'Y tế - Sức khỏe',
    'Sản xuất',
    'Bất động sản',
    'Marketing - Quảng cáo',
    'Tư vấn',
    'Khác',
];

export const DEFAULT_COMPANY: Company = {
    id: '',
    name: '',
    industry: '',
    size: 'SMALL',
    location: '',
    about: '',
    techStack: [],
    benefits: [],
    socialLinks: [],
};
