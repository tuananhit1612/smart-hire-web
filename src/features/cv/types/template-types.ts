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
// Mock data for templates
export const TEMPLATES: CVTemplate[] = [
    {
        id: 'modern-tech',
        name: 'Modern Tech Lead',
        description: 'Thiết kế hiện đại với thanh sidebar, tối ưu để hiển thị kỹ năng công nghệ. Phù hợp cho Developer.',
        thumbnail: '/templates/modern-tech.png',
        style: 'professional',
        positions: ['developer', 'other'],
        features: ['Bố cục Sidebar', 'Thanh kỹ năng', 'Timeline kinh nghiệm', 'Giao diện hiện đại'],
        popularity: 98,
        colors: {
            primary: '#0ea5e9',
            secondary: '#f0f9ff',
            accent: '#10b981',
        }
    },
    {
        id: 'minimal-clean',
        name: 'Minimal Professional',
        description: 'Phong cách tối giản, tinh tế, tập trung vào nội dung. Phù hợp cho mọi ngành nghề.',
        thumbnail: '/templates/minimal-clean.png',
        style: 'minimal',
        positions: ['business', 'marketing', 'other'],
        features: ['Một cột đơn giản', 'Typography sạch', 'Tối ưu không gian', 'Dễ đọc'],
        popularity: 95,
        colors: {
            primary: '#1f2937',
            secondary: '#f9fafb',
            accent: '#10b981',
        }
    },
    {
        id: 'creative-portfolio',
        name: 'Creative Portfolio',
        description: 'Phá cách và ấn tượng, dành riêng cho Designer và các công việc sáng tạo.',
        thumbnail: '/templates/creative-portfolio.png',
        style: 'creative',
        positions: ['designer', 'marketing'],
        features: ['Lưới hình ảnh', 'Nhấn mạnh Portfolio', 'Màu sắc nổi bật', 'Sáng tạo'],
        popularity: 92,
        colors: {
            primary: '#8b5cf6',
            secondary: '#f5f3ff',
            accent: '#ec4899',
        }
    },
    {
        id: 'executive-classic',
        name: 'Executive Classic',
        description: 'Trang trọng, lịch sự, chuẩn mực cho các vị trí quản lý cấp cao.',
        thumbnail: '/templates/executive-classic.png',
        style: 'professional',
        positions: ['business', 'other'],
        features: ['Bố cục truyền thống', 'Nội dung chi tiết', 'Font chữ trang trọng', 'Chuyên nghiệp'],
        popularity: 88,
        colors: {
            primary: '#1e40af',
            secondary: '#eff6ff',
            accent: '#d97706',
        }
    },
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
