// CV Template Types for SmartHire CV Builder

export type JobPosition = 'developer' | 'designer' | 'marketing' | 'business' | 'other';
export type TemplateStyle = 'professional' | 'creative' | 'minimal' | 'ats-friendly';

export interface CVTemplate {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    style: TemplateStyle;
    positions: JobPosition[];
    features: string[];
    popularity: number;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
    };
}

// Position config for selector
export interface PositionConfig {
    id: JobPosition;
    name: string;
    icon: string;
    description: string;
    color: string;
}

export const POSITIONS: PositionConfig[] = [
    {
        id: 'developer',
        name: 'Developer',
        icon: 'Code2',
        description: 'Software Engineer, Web Dev, Mobile Dev',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'designer',
        name: 'Designer',
        icon: 'Palette',
        description: 'UI/UX, Graphic, Product Designer',
        color: 'from-pink-500 to-rose-500'
    },
    {
        id: 'marketing',
        name: 'Marketing',
        icon: 'TrendingUp',
        description: 'Digital Marketing, SEO, Content',
        color: 'from-orange-500 to-amber-500'
    },
    {
        id: 'business',
        name: 'Business',
        icon: 'Briefcase',
        description: 'Sales, HR, Finance, Management',
        color: 'from-emerald-500 to-teal-500'
    },
    {
        id: 'other',
        name: 'Khác',
        icon: 'MoreHorizontal',
        description: 'Các vị trí khác',
        color: 'from-violet-500 to-purple-500'
    }
];

// Style filter config
export interface StyleConfig {
    id: TemplateStyle | 'all';
    name: string;
    icon: string;
}

export const STYLES: StyleConfig[] = [
    { id: 'all', name: 'Tất cả', icon: 'LayoutGrid' },
    { id: 'professional', name: 'Professional', icon: 'Award' },
    { id: 'creative', name: 'Creative', icon: 'Sparkles' },
    { id: 'minimal', name: 'Minimal', icon: 'Minus' },
    { id: 'ats-friendly', name: 'ATS-Friendly', icon: 'ScanLine' }
];

// Mock templates data
export const TEMPLATES: CVTemplate[] = [
    {
        id: 'modern-tech',
        name: 'Modern Tech',
        description: 'Clean và hiện đại, tối ưu cho Developer và Tech roles',
        thumbnail: '/templates/modern-tech.png',
        style: 'professional',
        positions: ['developer', 'other'],
        features: ['ATS-friendly', 'Clean layout', 'Tech focus', 'Dark mode ready'],
        popularity: 98,
        colors: {
            primary: '#4F46E5',
            secondary: '#6366F1',
            accent: '#818CF8'
        }
    },
    {
        id: 'creative-portfolio',
        name: 'Creative Portfolio',
        description: 'Nổi bật và sáng tạo, phù hợp cho Designer và Creative roles',
        thumbnail: '/templates/creative-portfolio.png',
        style: 'creative',
        positions: ['designer', 'marketing'],
        features: ['Eye-catching', 'Portfolio section', 'Color accents', 'Visual hierarchy'],
        popularity: 92,
        colors: {
            primary: '#EC4899',
            secondary: '#F472B6',
            accent: '#F9A8D4'
        }
    },
    {
        id: 'executive-classic',
        name: 'Executive Classic',
        description: 'Trang trọng và chuyên nghiệp, dành cho Business và Management',
        thumbnail: '/templates/executive-classic.png',
        style: 'professional',
        positions: ['business', 'other'],
        features: ['Traditional layout', 'Formal style', 'Print-ready', 'Timeless design'],
        popularity: 88,
        colors: {
            primary: '#1E3A5F',
            secondary: '#2E5077',
            accent: '#4A7C99'
        }
    },
    {
        id: 'minimal-clean',
        name: 'Minimal Clean',
        description: 'Đơn giản và tinh tế, phù hợp mọi ngành nghề',
        thumbnail: '/templates/minimal-clean.png',
        style: 'minimal',
        positions: ['developer', 'designer', 'marketing', 'business', 'other'],
        features: ['Ultra clean', 'Whitespace focused', 'Universal', 'Easy to read'],
        popularity: 95,
        colors: {
            primary: '#18181B',
            secondary: '#3F3F46',
            accent: '#71717A'
        }
    },
    {
        id: 'ats-optimized',
        name: 'ATS Optimized',
        description: 'Tối ưu hóa cho hệ thống ATS, đảm bảo CV được scan chính xác',
        thumbnail: '/templates/ats-optimized.png',
        style: 'ats-friendly',
        positions: ['developer', 'designer', 'marketing', 'business', 'other'],
        features: ['100% ATS compatible', 'Simple structure', 'Keyword friendly', 'Standard fonts'],
        popularity: 90,
        colors: {
            primary: '#059669',
            secondary: '#10B981',
            accent: '#34D399'
        }
    },
    {
        id: 'gradient-modern',
        name: 'Gradient Modern',
        description: 'Hiện đại với gradient đẹp mắt, ấn tượng từ cái nhìn đầu tiên',
        thumbnail: '/templates/gradient-modern.png',
        style: 'creative',
        positions: ['developer', 'designer'],
        features: ['Gradient header', 'Modern look', 'Standout design', 'Color accents'],
        popularity: 85,
        colors: {
            primary: '#7C3AED',
            secondary: '#8B5CF6',
            accent: '#A78BFA'
        }
    }
];

// Helper function to filter templates
export function filterTemplates(
    templates: CVTemplate[],
    position: JobPosition | null,
    style: TemplateStyle | 'all'
): CVTemplate[] {
    return templates.filter((template) => {
        const matchPosition = !position || template.positions.includes(position);
        const matchStyle = style === 'all' || template.style === style;
        return matchPosition && matchStyle;
    });
}
