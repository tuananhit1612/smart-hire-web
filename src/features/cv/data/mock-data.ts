import { CVData } from '../types/types';

/**
 * Sample CV data — Realistic Vietnamese professional profile.
 * Every template loads with this data pre-filled so the user
 * can immediately see what the template looks like and edit inline.
 */
export const SAMPLE_CV_DATA: CVData = {
    personalInfo: {
        fullName: "Nguyễn Văn Minh",
        title: "Senior Frontend Developer",
        email: "nguyenvanminh@gmail.com",
        phone: "0912 345 678",
        location: "TP. Hồ Chí Minh, Việt Nam",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
        socials: [
            { id: "s1", network: "LinkedIn", url: "linkedin.com/in/nguyenvanminh" },
            { id: "s2", network: "GitHub", url: "github.com/nguyenvanminh" },
        ],
    },
    summary:
        "Frontend Developer với hơn 5 năm kinh nghiệm xây dựng các ứng dụng web hiện đại sử dụng React, Next.js và TypeScript. Có khả năng thiết kế UI/UX, tối ưu hiệu suất và làm việc nhóm hiệu quả trong môi trường Agile. Đam mê tạo ra những trải nghiệm người dùng mượt mà và chuyên nghiệp.",
    experience: [
        {
            id: "exp1",
            company: "TechViet Solutions",
            position: "Senior Frontend Developer",
            location: "TP. Hồ Chí Minh",
            startDate: "2022-03",
            endDate: "",
            isCurrent: true,
            description:
                "Dẫn dắt team 5 người phát triển nền tảng SaaS phục vụ hơn 50.000 người dùng. Thiết kế kiến trúc micro-frontend, giảm 40% thời gian tải trang. Triển khai CI/CD pipeline và code review cho toàn bộ dự án frontend.",
        },
        {
            id: "exp2",
            company: "DigiCraft Agency",
            position: "Frontend Developer",
            location: "TP. Hồ Chí Minh",
            startDate: "2020-01",
            endDate: "2022-02",
            isCurrent: false,
            description:
                "Phát triển giao diện cho hơn 15 dự án web thương mại điện tử và landing page. Sử dụng React, Redux, và Tailwind CSS để xây dựng UI responsive. Tích hợp RESTful API và tối ưu SEO cho các trang sản phẩm.",
        },
        {
            id: "exp3",
            company: "FPT Software",
            position: "Junior Frontend Developer",
            location: "Hà Nội",
            startDate: "2018-07",
            endDate: "2019-12",
            isCurrent: false,
            description:
                "Tham gia phát triển ứng dụng quản lý nhân sự cho khách hàng Nhật Bản. Xây dựng các component tái sử dụng với Vue.js. Viết unit test đạt coverage 85%.",
        },
    ],
    education: [
        {
            id: "edu1",
            school: "Đại học Bách Khoa TP.HCM",
            degree: "Cử nhân",
            field: "Khoa học Máy tính",
            startDate: "2014",
            endDate: "2018",
            description: "GPA: 3.6/4.0 — Tốt nghiệp loại Giỏi. Đồ án tốt nghiệp: Xây dựng hệ thống quản lý thư viện trực tuyến.",
        },
    ],
    skills: [
        { id: "sk1", name: "React / Next.js", level: "expert", category: "technical" },
        { id: "sk2", name: "TypeScript", level: "expert", category: "technical" },
        { id: "sk3", name: "HTML5 & CSS3", level: "expert", category: "technical" },
        { id: "sk4", name: "Tailwind CSS", level: "advanced", category: "technical" },
        { id: "sk5", name: "Node.js", level: "advanced", category: "technical" },
        { id: "sk6", name: "Git & CI/CD", level: "advanced", category: "technical" },
        { id: "sk7", name: "Figma / UI Design", level: "intermediate", category: "technical" },
        { id: "sk8", name: "Giao tiếp & Thuyết trình", level: "advanced", category: "soft" },
        { id: "sk9", name: "Quản lý dự án", level: "intermediate", category: "soft" },
    ],
    projects: [
        {
            id: "prj1",
            name: "SmartShop — Nền tảng TMĐT",
            role: "Tech Lead",
            description:
                "Xây dựng platform thương mại điện tử với giỏ hàng, thanh toán online, và quản lý kho hàng. Phục vụ hơn 10.000 đơn hàng mỗi tháng.",
            technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL"],
            link: "https://smartshop.vn",
            startDate: "2023-01",
            endDate: "2023-08",
        },
        {
            id: "prj2",
            name: "TaskFlow — Quản lý công việc",
            role: "Fullstack Developer",
            description:
                "Ứng dụng quản lý task theo phương pháp Kanban với real-time collaboration, drag & drop, và thông báo tức thời.",
            technologies: ["React", "Socket.io", "Express", "MongoDB"],
            link: "https://github.com/nguyenvanminh/taskflow",
            startDate: "2022-06",
            endDate: "2022-11",
        },
    ],
    languages: [
        { id: "lang1", name: "Tiếng Việt", level: "native" },
        { id: "lang2", name: "Tiếng Anh", level: "upper-intermediate" },
        { id: "lang3", name: "Tiếng Nhật", level: "elementary" },
    ],
    certifications: [
        {
            id: "cert1",
            name: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            date: "2023-06",
            url: "https://aws.amazon.com/certification/",
        },
        {
            id: "cert2",
            name: "Meta Front-End Developer Professional Certificate",
            issuer: "Meta (Coursera)",
            date: "2022-09",
        },
    ],
    awards: [
        {
            id: "aw1",
            title: "Best Innovation Award",
            issuer: "TechViet Solutions",
            date: "2023",
            description: "Giải nhất cuộc thi sáng tạo nội bộ với dự án tối ưu hiệu suất ứng dụng, giảm 60% thời gian phản hồi.",
        },
        {
            id: "aw2",
            title: "Sinh viên xuất sắc",
            issuer: "Đại học Bách Khoa TP.HCM",
            date: "2018",
            description: "Top 5% sinh viên tốt nghiệp với GPA cao nhất khoa Khoa học Máy tính.",
        },
    ],
};

/* ─── Variant helpers for different templates ─── */

const SAMPLE_BA: CVData = {
    ...SAMPLE_CV_DATA,
    id: "ba",
    personalInfo: {
        ...SAMPLE_CV_DATA.personalInfo,
        fullName: "Trần Thị Hương",
        title: "Business Analyst",
        email: "huongtran.ba@gmail.com",
        phone: "0987 654 321",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    },
    summary:
        "Business Analyst với 4 năm kinh nghiệm trong lĩnh vực ngân hàng và fintech. Thành thạo phân tích yêu cầu, viết user stories, và thiết kế quy trình nghiệp vụ. Có kỹ năng SQL mạnh và kinh nghiệm làm việc với các hệ thống core banking.",
};

const SAMPLE_MANAGER: CVData = {
    ...SAMPLE_CV_DATA,
    id: "manager",
    personalInfo: {
        ...SAMPLE_CV_DATA.personalInfo,
        fullName: "Lê Quốc Bảo",
        title: "Project Manager",
        email: "baole.pm@gmail.com",
        phone: "0903 111 222",
        avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop",
    },
    summary:
        "Project Manager với 7 năm kinh nghiệm quản lý dự án phần mềm quy mô lớn. Chứng chỉ PMP và Scrum Master. Đã dẫn dắt team từ 10–30 người, quản lý budget lên đến $500K. Chuyên về Agile/Scrum methodology.",
};

const SAMPLE_DESIGNER: CVData = {
    ...SAMPLE_CV_DATA,
    id: "designer",
    personalInfo: {
        ...SAMPLE_CV_DATA.personalInfo,
        fullName: "Phạm Ngọc Anh",
        title: "UI/UX Designer",
        email: "ngocanh.design@gmail.com",
        phone: "0909 888 777",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
        socials: [
            { id: "s1", network: "Behance", url: "behance.net/ngocanhdesign" },
            { id: "s2", network: "Dribbble", url: "dribbble.com/ngocanhdesign" },
        ],
    },
    summary:
        "UI/UX Designer sáng tạo với 5 năm kinh nghiệm thiết kế giao diện ứng dụng mobile và web. Thành thạo Figma, Adobe XD, và Design System. Đam mê tạo ra trải nghiệm người dùng trực quan và đẹp mắt.",
};

const SAMPLE_MARKETING: CVData = {
    ...SAMPLE_CV_DATA,
    id: "marketing",
    personalInfo: {
        ...SAMPLE_CV_DATA.personalInfo,
        fullName: "Đoàn Thanh Tùng",
        title: "Creative Content Director",
        email: "tungdoan.creative@gmail.com",
        phone: "0933 444 555",
        avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a6dc6?q=80&w=300&auto=format&fit=crop",
        socials: [
            { id: "s1", network: "Instagram", url: "instagram.com/tungdoan" },
            { id: "s2", network: "Behance", url: "behance.net/tungdoan" },
        ]
    },
    summary:
        "Giám đốc nội dung sáng tạo với năng lượng Gen Z bùng nổ. Chuyên trị các chiến dịch Viral Marketing, Tiktok Trend và xây dựng thương hiệu cộng đồng. Từng tạo ra 3 chiến dịch lọt top trending Youtube và Tiktok Việt Nam năm 2023.",
};

/* ─── Template → Sample Data mapping ─── */

export const MOCK_DATA_MAP: Record<string, CVData> = {
    'modern-tech': SAMPLE_CV_DATA,
    'minimal-clean': SAMPLE_BA,
    'creative-portfolio': SAMPLE_DESIGNER,
    'executive-classic': SAMPLE_MANAGER,
    // Add mapping for the new 5 templates once we have their IDs
    'aesthetic-developer': SAMPLE_CV_DATA,
    'elegant-creative': SAMPLE_DESIGNER,
    'bold-founder': SAMPLE_MANAGER,
    'neobrutalism': SAMPLE_MARKETING,
    'geometric-corporate': SAMPLE_BA,
};

export function getMockDataForTemplate(templateId: string): CVData {
    return MOCK_DATA_MAP[templateId] || SAMPLE_CV_DATA;
}
