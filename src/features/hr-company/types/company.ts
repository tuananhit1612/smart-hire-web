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
    size: '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';
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
    '1-10': '1-10 nhân viên',
    '11-50': '11-50 nhân viên',
    '51-200': '51-200 nhân viên',
    '201-500': '201-500 nhân viên',
    '501-1000': '501-1000 nhân viên',
    '1000+': 'Trên 1000 nhân viên',
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
    size: '11-50',
    location: '',
    about: '',
    techStack: [],
    benefits: [],
    socialLinks: [],
};
