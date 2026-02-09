import { CVData } from '../types/types';

// DATA 1: Standard / Intern (Nguyễn Minh Trang)
export const MOCK_DATA_INTERN: CVData = {
    personalInfo: {
        fullName: "NGUYỄN MINH TRANG",
        title: "Audit Intern",
        email: "trangnt@topcv.vn",
        phone: "(034) 612 662",
        socials: [
            { id: "1", network: "LinkedIn", url: "linkedin.com/in/tranthib" },
            { id: "2", network: "Website", url: "tranthib-sales.com" }
        ],
        location: "Thanh Xuân, Hà Nội",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Trang&gender=female",
    },
    summary: "Là một sinh viên năm cuối trường Đại học Ngoại Thương, tự tin với khả năng nghiên cứu, phân tích và tổng hợp thông tin. Khả năng giao tiếp và truyền đạt năng lượng, luôn đề cao kỷ luật và trách nhiệm trong công việc.\n\nMục tiêu ngắn hạn: Đạt 8.0 IELTS; Tốt nghiệp đại học Ngoại Thương bằng Xuất sắc.\nMục tiêu dài hạn: Trở thành công dân toàn cầu, làm việc chuyên nghiệp trong lĩnh vực Kiểm toán.",
    education: [
        {
            id: "edu-1",
            school: "Đại học Ngoại Thương Hà Nội",
            degree: "Cử nhân",
            field: "Ngân hàng và Tài chính quốc tế",
            startDate: "2021",
            endDate: "2025",
            description: "• Xếp loại: Xuất sắc (GPA 3.8 trên các môn đã hoàn thành).\n• Thành tích: Top 5 sinh viên xuất sắc nhất khoa năm 2023."
        }
    ],
    experience: [
        {
            id: "exp-1",
            company: "Pha Lê Cà Phê",
            position: "Nhân viên Bán hàng Part-time",
            location: "Hà Nội",
            startDate: "2024",
            endDate: "Nay",
            isCurrent: true,
            description: "• Thu ngân và hướng dẫn khách hàng sử dụng dịch vụ.\n• Quản lý nguyên vật liệu và báo cáo doanh thu cuối ca."
        }
    ],
    skills: [
        { id: "s1", name: "Tiếng Anh (IELTS 7.5)", level: "advanced", category: "technical" },
        { id: "s2", name: "Tin học văn phòng", level: "advanced", category: "technical" },
        { id: "s3", name: "Thuyết trình", level: "expert", category: "soft" },
        { id: "s4", name: "Làm việc nhóm", level: "expert", category: "soft" }
    ],
    projects: [
        {
            id: "act-1",
            name: "CLB Nguồn nhân lực - ĐH Ngoại Thương",
            role: "Thành viên Ban Sự kiện",
            startDate: "2022",
            endDate: "2025",
            technologies: ["Event Planning", "Communication"],
            description: "• Tham gia tổ chức chuỗi sự kiện Career Path và Meet-up."
        }
    ]
};

// DATA 2: Modern / Leader (Trần Mạnh Dũng)
export const MOCK_DATA_LEADER: CVData = {
    personalInfo: {
        fullName: "TRẦN MẠNH DŨNG",
        title: "Content Leader",
        email: "dung.tran@topcv.vn",
        phone: "0912 345 789",
        location: "Cầu Giấy, Hà Nội",
        socials: [
            { id: "1", network: "Website", url: "facebook.com/TopCV.vn" }
        ],
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dung&gender=male",
    },
    summary: "Content Leader với 5 năm kinh nghiệm xây dựng và triển khai chiến lược nội dung đa nền tảng cho các thương hiệu trong lĩnh vực FMCG và Công nghệ. Tôi có thế mạnh quản lý đội ngũ Content từ 5-10 người, từng góp phần tăng 40% Organic Traffic và tỉ lệ chuyển đổi từ nội dung gấp 2-3 lần.\n\nHướng đến vai trò Marketing Leader trong 1-2 năm tới.",
    experience: [
        {
            id: "exp-1",
            company: "Công ty Công nghệ NTC Tech",
            position: "Content Team Lead",
            location: "Hà Nội",
            startDate: "2023",
            endDate: "Nay",
            isCurrent: true,
            description: "• Xây dựng chiến lược nội dung cho website, social media và các kênh digital.\n• Quản lý đội ngũ Content (4-6 người), đào tạo nhân sự mới.\n• Dẫn dắt các dự án nội dung trọng điểm như: Ra mắt sản phẩm mới, chiến dịch thương hiệu mùa cao điểm."
        },
        {
            id: "exp-2",
            company: "Agency NDS - Marketing & Advertising",
            position: "Content Executive",
            location: "Hà Nội",
            startDate: "2019",
            endDate: "2023",
            isCurrent: false,
            description: "• Triển khai và quản lý hơn 100 chiến dịch nội dung (Website & Social) cho các thương hiệu FMCG, F&B.\n• Viết bài chuẩn SEO, tăng traffic website khách hàng lên 200%."
        }
    ],
    education: [
        {
            id: "edu-1",
            school: "Đại học Kinh tế Quốc dân",
            degree: "Cử nhân",
            field: "Marketing & Advertising",
            startDate: "2015",
            endDate: "2019",
            description: "Giải Nhì cuộc thi 'Chiến lược truyền thông sáng tạo'."
        }
    ],
    skills: [
        { id: "s1", name: "Content Strategy", level: "expert", category: "technical" },
        { id: "s2", name: "SEO / SEM", level: "advanced", category: "technical" },
        { id: "s3", name: "Team Management", level: "expert", category: "soft" },
        { id: "s4", name: "Data Analysis", level: "advanced", category: "technical" }
    ],
    projects: []
};

// DATA 3: Professional / Developer (Lê Chiến)
export const MOCK_DATA_SENIOR: CVData = {
    personalInfo: {
        fullName: "LÊ CHIẾN",
        title: "Front End Developer",
        email: "chien.le@topcv.vn",
        phone: "(024) 6680 5588",
        location: "Quận Đống Đa, Hà Nội",
        socials: [
            { id: "1", network: "GitHub", url: "github.com/lechien" }
        ],
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chien&gender=male",
    },
    summary: "Lập trình viên Front End với 3+ năm kinh nghiệm, đã tham gia phát triển hơn 20 dự án web application. Thành thạo ReactJS, VueJS và có kinh nghiệm làm việc với Design System.\n\nMục tiêu: Trở thành Senior Front End Developer trong 2 năm tới và đóng góp vào các sản phẩm công nghệ có hàng triệu người dùng.",
    experience: [
        {
            id: "exp-1",
            company: "Công ty TNHH MTV SVT",
            position: "Front End Developer",
            location: "Hà Nội",
            startDate: "2021",
            endDate: "2024",
            isCurrent: false,
            description: "• Quản lý các dự án phát triển trang web từ khâu thiết kế ban đầu cho đến hoàn thiện.\n• Phát triển và tích hợp các chủ đề tùy chỉnh với WordPress, PHP-Fusion.\n• Tối ưu hóa hiệu năng website, đạt điểm Lighthouse 90+."
        },
        {
            id: "exp-2",
            company: "Công ty CP Công nghệ NDS",
            position: "Flutter Developer",
            location: "Hà Nội",
            startDate: "2019",
            endDate: "2021",
            isCurrent: false,
            description: "• Phối hợp với các thành viên trong team thực hiện lập trình và phát triển các sản phẩm trên nền tảng Mobile App.\n• Build và đưa 5+ ứng dụng lên App Store & Google Play."
        }
    ],
    education: [
        {
            id: "edu-1",
            school: "Đại học TopCV",
            degree: "Kỹ sư",
            field: "Công nghệ thông tin",
            startDate: "2014",
            endDate: "2017",
            description: "Tốt nghiệp loại Giỏi."
        }
    ],
    skills: [
        { id: "s1", name: "ReactJS / VueJS", level: "expert", category: "technical" },
        { id: "s2", name: "HTML5 / CSS3 / SCSS", level: "expert", category: "technical" },
        { id: "s3", name: "Flutter / Dart", level: "advanced", category: "technical" },
        { id: "s4", name: "Git / JIRA", level: "advanced", category: "technical" }
    ],
    projects: []
};

// Default fallback
// DATA 4: Sales Admin (Nguyễn Huyền Trang) - Pink Theme
export const MOCK_DATA_SALES_ADMIN: CVData = {
    personalInfo: {
        fullName: "NGUYỄN HUYỀN TRANG",
        title: "Senior Sales Administrator",
        email: "trang.nguyen@email.com",
        phone: "(090) 123 4567",
        socials: [
            { id: "1", network: "LinkedIn", url: "linkedin.com/in/phamvand" },
            { id: "2", network: "Website", url: "phamvand-leadership.com" }
        ],
        location: "Quận 3, TP. Hồ Chí Minh",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Trang&gender=female&hairColor=2c1b18",
        additionalInfo: [
            { label: "Ngày sinh", value: "04/02/1996" },
            { label: "Trạng thái", value: "Đang tìm việc" }
        ]
    },
    summary: "Chuyên viên Sales Admin với 5+ năm kinh nghiệm hỗ trợ vận hành đội ngũ kinh doanh B2B quy mô lớn. Có tư duy tổ chức xuất sắc, thành thạo các hệ thống CRM (Salesforce, HubSpot) và ERP. Từng quản lý quy trình xử lý đơn hàng giúp giảm 15% thời gian giao hàng và tăng 95% độ hài lòng của khách hàng nội bộ. Mong muốn phát triển lên vị trí Trưởng nhóm Sales Admin tại các doanh nghiệp đa quốc gia.",
    experience: [
        {
            id: '1',
            company: "Công ty Cổ phần Công nghệ Misa",
            position: "Senior Sales Admin",
            startDate: "2021",
            endDate: "Nay",
            description: "• Quản lý và điều phối luồng đơn hàng cho đội ngũ Sales 20 người, đảm bảo 100% đơn hàng được xử lý đúng hạn (SLA).\n• Phân tích số liệu kinh doanh hàng tuần/tháng, xây dựng dashboard báo cáo doanh thu gửi Ban Giám đốc.\n• Trực tiếp làm việc với bộ phận Kho vận và Kế toán để giải quyết các vấn đề về công nợ và giao nhận.\n• Đào tạo quy trình và hướng dẫn sử dụng CRM cho nhân sự Sales mới.",
            isCurrent: true
        },
        {
            id: '2',
            company: "VinGroup - VinCommerce",
            position: "Sales Admin Executive",
            startDate: "2018",
            endDate: "2021",
            description: "• Tiếp nhận và xử lý trung bình 50+ đơn đặt hàng B2B mỗi ngày trên hệ thống SAP.\n• Soạn thảo hợp đồng, báo giá và quản lý hồ sơ khách hàng trọng yếu.\n• Hỗ trợ tổ chức các sự kiện hội thảo khách hàng, tri ân đối tác hàng năm.\n• Giải quyết khiếu nại khách hàng, duy trì tỷ lệ hài lòng (CSAT) trên 4.8/5.",
            isCurrent: false
        }
    ],
    education: [
        {
            id: '1',
            school: "Đại Học Kinh Tế TP.HCM",
            degree: "Cử nhân Quản trị Kinh doanh",
            field: "Chuyên ngành Thương mại Quốc tế",
            startDate: "2014",
            endDate: "2018"
        }
    ],
    skills: [
        { id: '1', name: "Quản trị quan hệ khách hàng (CRM)", level: 95, category: "technical", description: "Salesforce, HubSpot" },
        { id: '2', name: "Hệ thống ERP & SAP", level: 90, category: "technical" },
        { id: '3', name: "Phân tích số liệu & Báo cáo", level: 85, category: "technical", description: "Excel Advanced, Power BI" },
        { id: '4', name: "Soạn thảo văn bản & Hợp đồng", level: 90, category: "technical" },
        { id: '5', name: "Quản lý thời gian", level: 90, category: "soft" },
        { id: '6', name: "Giao tiếp & Đàm phán", level: 85, category: "soft" }
    ],
    projects: [
        {
            id: '1',
            name: "Dự án Số hóa Quy trình Sales",
            description: "Đại diện bộ phận Sales Admin tham gia dự án triển khai Salesforce. Xây dựng quy trình nhập liệu chuẩn, giúp giảm 30% sai sót dữ liệu đầu vào.",
            technologies: ["Salesforce", "Visio"]
        }
    ]
};

// DATA 5: CHRO (Trương Mỹ Linh) - Green Theme
export const MOCK_DATA_CHRO: CVData = {
    personalInfo: {
        fullName: "TRƯƠNG MỸ LINH",
        title: "Chief Human Resources Officer (CHRO)",
        email: "linh.truong@hr-exec.com",
        phone: "(091) 888 9999",
        socials: [
            { id: "1", network: "Behance", url: "behance.net/lehoangc" },
            { id: "2", network: "Dribbble", url: "dribbble.com/lehoangc" },
            { id: "3", network: "Instagram", url: "instagram.com/art.lehoangc" }
        ],
        location: "Hoàn Kiếm, Hà Nội",
        website: "linkedin.com/in/mylinh-chro",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linh&gender=female&clothing=blazerAndShirt&glasses=round",
        additionalInfo: [
            { label: "Kinh nghiệm", value: "12 năm" },
            { label: "Cấp bậc", value: "C-Level" }
        ]
    },
    summary: "Giám đốc Nhân sự chiến lược với hơn 12 năm kinh nghiệm dẫn dắt chuyển đổi tổ chức tại các tập đoàn công nghệ và sản xuất quy mô >1000 nhân sự. Chuyên gia trong việc xây dựng văn hóa hiệu suất cao, phát triển nhân tài và tối ưu hóa chi phí nhân sự. Từng được vinh danh 'Lãnh đạo nhân sự xuất sắc' năm 2023 với thành tích giảm 25% tỷ lệ nghỉ việc (Turnover Rate) và xây dựng thành công khung năng lực lãnh đạo kế cận.",
    experience: [
        {
            id: '1',
            company: "Tập đoàn công nghệ FPT Software",
            position: "HR Director",
            startDate: "2020",
            endDate: "Nay",
            description: "• Hoạch định chiến lược nhân sự toàn cầu, hỗ trợ mở rộng thị trường sang Nhật Bản và Mỹ.\n• Xây dựng và triển khai mô hình 'Agile HR', chuyển đổi cách thức đánh giá hiệu suất từ KPI sang OKRs.\n• Thiết kế chương trình 'Future Leaders', đào tạo và bổ nhiệm 20+ quản lý cấp trung trong 2 năm.\n• Quản lý ngân sách nhân sự 5 triệu USD, tối ưu hóa chi phí tuyển dụng giảm 20% thông qua Employer Branding.",
            isCurrent: true
        },
        {
            id: '2',
            company: "Suntory PepsiCo Vietnam",
            position: "Head of Talent Acquisition & Development",
            startDate: "2016",
            endDate: "2020",
            description: "• Quản lý hoạt động tuyển dụng toàn quốc, tuyển dụng thành công 500+ vị trí mỗi năm.\n• Xây dựng khung năng lực (Competency Framework) và lộ trình thăng tiến cho khối Sales & Marketing.\n• Triển khai hệ thống E-Learning, nâng cao 40% số giờ đào tạo trung bình/nhân viên.",
            isCurrent: false
        }
    ],
    education: [
        {
            id: '1',
            school: "Đại học Ngoại Thương",
            degree: "Thạc sĩ Quản trị Kinh doanh (MBA)",
            field: "Quản trị Nguồn nhân lực",
            startDate: "2014",
            endDate: "2016"
        },
        {
            id: '2',
            school: "Đại học Luật Hà Nội",
            degree: "Cử nhân Luật",
            field: "Luật Lao động",
            startDate: "2008",
            endDate: "2012"
        }
    ],
    skills: [
        { id: '1', name: "Hoạch định chiến lược nhân sự", level: 98, category: "technical" },
        { id: '2', name: "Văn hóa doanh nghiệp & DEI", level: 95, category: "technical" },
        { id: '3', name: "Quản trị hiệu suất (KPIs/OKRs)", level: 95, category: "technical" },
        { id: '4', name: "Tuyển dụng & Thu hút nhân tài", level: 90, category: "technical" },
        { id: '5', name: "Lãnh đạo & Truyền cảm hứng", level: 95, category: "soft" },
        { id: '6', name: "Tư duy chiến lược", level: 95, category: "soft" }
    ],
    projects: [
        {
            id: '1',
            name: "Chuyển đổi số HR (HRIS Transformation)",
            description: "Trưởng ban dự án triển khai SAP SuccessFactors, số hóa 100% quy trình nhân sự, giảm 50% giấy tờ hành chính.",
            technologies: ["SAP SuccessFactors", "Digital Transformation"]
        }
    ]
};

// DATA 6: Sales Executive (Nguyễn Tùng Dương) - Blue Theme
export const MOCK_DATA_SALES_EXEC: CVData = {
    personalInfo: {
        fullName: "NGUYỄN TÙNG DƯƠNG",
        title: "B2B Sales Executive",
        email: "duong.nguyen@sales.com",
        phone: "(098) 765 4321",
        location: "Đống Đa, Hà Nội",
        socials: [
            { id: "1", network: "LinkedIn", url: "linkedin.com/in/tungduong-sales" }
        ],
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Duong1&gender=male&style=circle",
        additionalInfo: [
            { label: "Giấy phép lái xe", value: "B2" },
            { label: "Sẵn sàng đi công tác", value: "Có" }
        ]
    },
    summary: "Nhân viên kinh doanh năng động với 4 năm kinh nghiệm trong lĩnh vực Bất động sản và SaaS. Có khả năng khai thác thị trường lạnh (Cold Calling) xuất sắc và kỹ năng chốt sales 'thần tốc'. Luôn duy trì tư duy 'Win-Win' trong đàm phán. Năm 2023, tôi là 'Top Performer' của chi nhánh với doanh số đạt 15 tỷ VNĐ (120% KPI).",
    experience: [
        {
            id: '1',
            company: "CenLand - Bất động sản",
            position: "Senior Sales Executive",
            startDate: "2022",
            endDate: "Nay",
            description: "• Tư vấn và bán các sản phẩm bất động sản cao cấp (Vinhomes, Sun Group) cho khách hàng VIP.\n• Xây dựng network với hơn 300 nhà đầu tư cá nhân và đối tác ngân hàng.\n• Đạt danh hiệu 'Best Seller Quý 3/2023' với doanh số 8 tỷ VNĐ.\n• Phối hợp với Marketing triển khai các sự kiện mở bán, thu hút 500+ khách tham dự.",
            isCurrent: true
        },
        {
            id: '2',
            company: "Base.vn - Nền tảng quản trị",
            position: "Business Development Associate",
            startDate: "2020",
            endDate: "2022",
            description: "• Tìm kiếm khách hàng doanh nghiệp (B2B) có nhu cầu chuyển đổi số.\n• Thực hiện demo giải pháp phần mềm, thuyết trình và đàm phán hợp đồng.\n• Duy trì tỷ lệ chuyển đổi (Conversion Rate) từ Lead sang Deal đạt 15% (cao hơn trung bình team 5%).\n• Quản lý pipeline bán hàng trên HubSpot CRM.",
            isCurrent: false
        }
    ],
    education: [
        {
            id: '1',
            school: "Đại học Thương Mại",
            degree: "Cử nhân Kinh tế",
            field: "Thương mại điện tử",
            startDate: "2016",
            endDate: "2020"
        }
    ],
    skills: [
        { id: '1', name: "Kỹ năng bán hàng B2B", level: 90, category: "technical" },
        { id: '2', name: "Cold Calling & Prospecting", level: 95, category: "technical" },
        { id: '3', name: "Thuyết trình & Demo sản phẩm", level: 85, category: "technical" },
        { id: '4', name: "Thuyết phục & Đàm phán", level: 90, category: "soft" },
        { id: '5', name: "Xây dựng mối quan hệ", level: 95, category: "soft" }
    ],
    projects: []
};

// DATA 7: Business Analyst (Phạm Hoàng Anh) - Yellow Theme
export const MOCK_DATA_BA: CVData = {
    personalInfo: {
        fullName: "PHẠM HOÀNG ANH",
        title: "Senior Business Analyst",
        email: "hoanganh.ba@tech.com",
        phone: "(093) 333 4444",
        location: "Cầu Giấy, Hà Nội",
        socials: [
            { id: "1", network: "Website", url: "hoanganh-portfolio.com" }
        ],
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnhPham&gender=male&clothing=shirt&glasses=square",
        additionalInfo: [
            { label: "Chứng chỉ", value: "CBAP" },
            { label: "Tiếng Anh", value: "IELTS 7.5" }
        ]
    },
    summary: "Chuyên viên Phân tích Nghiệp vụ (BA) với tư duy logic sắc bén và 6 năm kinh nghiệm trong lĩnh vực Fintech. Thành thạo việc cầu nối giữa Business Unit và Tech Team. Có kinh nghiệm sâu sắc về Agile/Scrum, User Story Mapping và Data Analysis. Từng chủ trì phân tích nghiệp vụ cho dự án Super App ngân hàng số với 2 triệu người dùng.",
    experience: [
        {
            id: '1',
            company: "Ngân hàng TMCP Techcombank",
            position: "Senior Business Analyst",
            startDate: "2021",
            endDate: "Nay",
            description: "• Chủ trì các buổi workshop thu thập yêu cầu (Elicitation) với các bên liên quan cho dự án Mobile Banking.\n• Viết tài liệu đặc tả (SRS, FRS) và thiết kế Wireframe/Prototype bằng Figma.\n• Phân tích dữ liệu giao dịch khách hàng sử dụng SQL để đề xuất tính năng 'Gợi ý chi tiêu thông minh'.\n• Hỗ trợ đội QC trong việc viết Test Case và thực hiện UAT.",
            isCurrent: true
        },
        {
            id: '2',
            company: "Công ty Cổ phần MISA",
            position: "Business Analyst",
            startDate: "2018",
            endDate: "2021",
            description: "• Tham gia phát triển phần mềm Kế toán MISA SME.NET.\n• Nghiên cứu quy định kế toán mới (Thông tư 200, 133) để cập nhật tính năng sản phẩm.\n• Mô hình hóa quy trình nghiệp vụ (BPMN) và luồng dữ liệu (Data Flow Diagram).",
            isCurrent: false
        }
    ],
    education: [
        {
            id: '1',
            school: "Đại học Bách Khoa Hà Nội",
            degree: "Kỹ sư Công nghệ thông tin",
            field: "Hệ thống thông tin quản lý",
            startDate: "2013",
            endDate: "2018"
        }
    ],
    skills: [
        { id: '1', name: "Phân tích yêu cầu & Viết tài liệu", level: 95, category: "technical" },
        { id: '2', name: "SQL & Data Analysis", level: 90, category: "technical", description: "MySQL, PostgreSQL" },
        { id: '3', name: "Wireframe & Prototype", level: 85, category: "technical", description: "Figma, Balsamiq" },
        { id: '4', name: "Process Modeling (BPMN/UML)", level: 90, category: "technical" },
        { id: '5', name: "Agile/Scrum", level: 90, category: "soft" },
        { id: '6', name: "Tư duy phản biện", level: 85, category: "soft" }
    ],
    projects: [
        {
            id: '1',
            name: "Ví điện tử SmartPay",
            description: "Phân tích và thiết kế luồng thanh toán QR Code. Tích hợp cổng thanh toán Napas. Kết quả: Giảm thời gian thanh toán trung bình xuống 3 giây.",
            technologies: ["Figma", "Jira", "SQL"]
        }
    ]
};

export const MOCK_CV_DATA = MOCK_DATA_LEADER;

export const MOCK_DATA_MAP: Record<string, CVData> = {
    'minimal-clean': MOCK_DATA_INTERN,
    'creative-portfolio': MOCK_DATA_LEADER,
    'professional-sales': MOCK_DATA_SALES_ADMIN,
    'executive-hr': MOCK_DATA_CHRO,
    'modern-sales': MOCK_DATA_SALES_EXEC,
    'creative-ba': MOCK_DATA_BA,
    'modern-tech': MOCK_DATA_SENIOR, // Default
};

export function getMockDataForTemplate(templateId: string): CVData {
    return MOCK_DATA_MAP[templateId] || MOCK_DATA_SENIOR;
}


