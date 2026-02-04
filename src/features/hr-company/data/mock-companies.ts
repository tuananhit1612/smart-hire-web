import { Company } from '../types/company';

export const MOCK_COMPANIES: Company[] = [
    {
        id: 'techcorp-vietnam',
        name: 'TechCorp Vietnam',
        tagline: 'Kiến tạo tương lai với công nghệ',
        industry: 'Công nghệ thông tin',
        size: '201-500',
        location: 'TP. Hồ Chí Minh, Việt Nam',
        address: 'Tầng 15, Landmark 81, Quận Bình Thạnh',
        website: 'https://techcorp.vn',
        email: 'careers@techcorp.vn',
        phone: '+84 28 1234 5678',
        logoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=TechCorp&backgroundColor=0369a1',
        coverUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop',
        about: `TechCorp Vietnam là công ty công nghệ hàng đầu chuyên phát triển các giải pháp phần mềm doanh nghiệp và nền tảng SaaS. Với đội ngũ hơn 300 kỹ sư tài năng, chúng tôi tự hào mang đến những sản phẩm chất lượng cao phục vụ hàng triệu người dùng trên toàn cầu.

Chúng tôi tin rằng công nghệ có thể thay đổi thế giới và mỗi dòng code đều có ý nghĩa.`,
        description: 'Công ty công nghệ hàng đầu Việt Nam với các sản phẩm SaaS phục vụ doanh nghiệp.',
        founded: '2015',
        techStack: ['React', 'TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'AWS', 'Kubernetes', 'GraphQL'],
        benefits: [
            { id: 'b1', icon: '💰', title: 'Lương thưởng cạnh tranh', description: 'Mức lương top thị trường, thưởng hiệu suất hàng quý' },
            { id: 'b2', icon: '🏥', title: 'Bảo hiểm sức khỏe', description: 'Bảo hiểm cao cấp cho bạn và gia đình' },
            { id: 'b3', icon: '📚', title: 'Học tập & Phát triển', description: 'Ngân sách học tập $1,500/năm' },
            { id: 'b4', icon: '🏠', title: 'Làm việc linh hoạt', description: 'Hybrid: 3 ngày office, 2 ngày remote' },
            { id: 'b5', icon: '🎮', title: 'Giải trí', description: 'Game room, team building hàng tháng' },
            { id: 'b6', icon: '✈️', title: 'Du lịch công ty', description: 'Team trip 2 lần/năm' },
        ],
        socialLinks: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/company/techcorp-vietnam' },
            { platform: 'Facebook', url: 'https://facebook.com/techcorpvn' },
            { platform: 'Website', url: 'https://techcorp.vn' },
        ],
        culture: 'Open, Collaborative, Innovation-driven',
        mission: 'Mang đến giải pháp công nghệ xuất sắc giúp doanh nghiệp phát triển bền vững.',
        vision: 'Trở thành công ty công nghệ hàng đầu Đông Nam Á vào năm 2030.',
    },
    {
        id: 'startupxyz',
        name: 'StartupXYZ',
        tagline: 'Fintech cho thế hệ mới',
        industry: 'Tài chính - Ngân hàng',
        size: '51-200',
        location: 'TP. Hồ Chí Minh, Việt Nam',
        address: 'WeWork, Quận 1',
        website: 'https://startupxyz.io',
        email: 'hello@startupxyz.io',
        phone: '+84 28 9876 5432',
        logoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=StartupXYZ&backgroundColor=22c55e',
        coverUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=400&fit=crop',
        about: `StartupXYZ là startup fintech đang định hình lại cách người Việt Nam quản lý tài chính cá nhân. 
        
Với ứng dụng được hơn 500,000 người dùng tin tưởng, chúng tôi cung cấp các công cụ đầu tư, tiết kiệm và thanh toán thông minh.`,
        founded: '2020',
        techStack: ['React Native', 'TypeScript', 'Python', 'FastAPI', 'MongoDB', 'GCP'],
        benefits: [
            { id: 'b1', icon: '🚀', title: 'Startup Culture', description: 'Môi trường năng động, tốc độ cao' },
            { id: 'b2', icon: '📈', title: 'ESOP', description: 'Cổ phần cho nhân viên' },
            { id: 'b3', icon: '🏠', title: 'Remote-first', description: 'Làm việc từ bất kỳ đâu' },
            { id: 'b4', icon: '🎯', title: 'Learning Budget', description: '$2,000/năm cho học tập' },
        ],
        socialLinks: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/company/startupxyz' },
            { platform: 'Twitter', url: 'https://twitter.com/startupxyz' },
        ],
        mission: 'Democratize finance for everyone.',
    },
    {
        id: 'fpt-software',
        name: 'FPT Software',
        tagline: 'Digital Transformation Partner',
        industry: 'Công nghệ thông tin',
        size: '1000+',
        location: 'Hà Nội, Việt Nam',
        address: 'FPT Tower, Cầu Giấy',
        website: 'https://fptsoftware.com',
        email: 'careers@fsoft.com.vn',
        logoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=FPT&backgroundColor=f97316',
        coverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop',
        about: `FPT Software là công ty thành viên của Tập đoàn FPT - tập đoàn công nghệ hàng đầu Việt Nam.

Với hơn 27,000 nhân viên trên toàn cầu, chúng tôi cung cấp dịch vụ outsourcing và tư vấn chuyển đổi số cho các tập đoàn đa quốc gia.`,
        founded: '1999',
        techStack: ['Java', '.NET', 'Angular', 'React', 'AWS', 'Azure', 'SAP', 'Salesforce'],
        benefits: [
            { id: 'b1', icon: '🌍', title: 'Global Exposure', description: 'Làm việc với khách hàng Fortune 500' },
            { id: 'b2', icon: '🎓', title: 'Training Programs', description: 'Chương trình đào tạo chuyên sâu' },
            { id: 'b3', icon: '💼', title: 'Career Path', description: 'Lộ trình thăng tiến rõ ràng' },
            { id: 'b4', icon: '🏥', title: 'Full Benefits', description: 'Đầy đủ chế độ phúc lợi' },
        ],
        socialLinks: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/company/fpt-software' },
            { platform: 'Facebook', url: 'https://facebook.com/fptsoftware' },
            { platform: 'Website', url: 'https://fptsoftware.com' },
        ],
    },
];

export function getCompanyById(id: string): Company | undefined {
    return MOCK_COMPANIES.find((c) => c.id === id);
}
