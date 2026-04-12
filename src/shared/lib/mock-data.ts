/**
 * ═══════════════════════════════════════════════════════════
 *  MOCK DATA — Comprehensive fake data for GitHub Pages Demo
 *
 *  This file provides realistic Vietnamese mock data for
 *  all API endpoints so the app runs fully client-side.
 * ═══════════════════════════════════════════════════════════
 */

// ─── Users ───────────────────────────────────────────────

export const MOCK_CANDIDATE_USER = {
  id: 1,
  email: "nguyenvana@gmail.com",
  fullName: "Nguyễn Văn An",
  phone: "0901234567",
  role: "CANDIDATE",
  avatarUrl: null,
  isActive: true,
  isOnboarded: true,
  createdAt: "2025-01-15T08:00:00Z",
  updatedAt: "2025-04-10T10:30:00Z",
};

export const MOCK_HR_USER = {
  id: 2,
  email: "hr@techcorp.vn",
  fullName: "Trần Thị Bích",
  phone: "0912345678",
  role: "HR",
  avatarUrl: null,
  isActive: true,
  isOnboarded: true,
  createdAt: "2025-01-10T08:00:00Z",
  updatedAt: "2025-04-10T10:30:00Z",
};

export const MOCK_LOGIN_RESPONSE = {
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJuZ3V5ZW52YW5hQGdtYWlsLmNvbSIsInJvbGUiOiJDQU5ESURBVEUiLCJpYXQiOjE3MTQ1NTY4MDAsImV4cCI6MTcxNDY0MzIwMH0.demo-token",
  refreshToken: "mock-refresh-token-xxxx-yyyy-zzzz",
  tokenType: "Bearer",
  userId: 1,
  email: "nguyenvana@gmail.com",
  fullName: "Nguyễn Văn An",
  role: "CANDIDATE",
  isOnboarded: true,
};

// ─── Jobs ────────────────────────────────────────────────

export const MOCK_JOBS = [
  {
    id: 1,
    companyId: 1,
    companyName: "TechCorp Vietnam",
    companyLogoUrl: null,
    createdBy: 2,
    title: "Senior Frontend Developer (React/Next.js)",
    description: "Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm với React và Next.js để tham gia phát triển các sản phẩm SaaS hàng đầu. Bạn sẽ làm việc cùng đội ngũ kỹ sư tài năng, được tiếp cận công nghệ mới nhất và có cơ hội phát triển sự nghiệp vượt bậc.",
    requirements: "- 3+ năm kinh nghiệm với React.js\\n- Thành thạo TypeScript\\n- Kinh nghiệm với Next.js App Router\\n- Hiểu biết về TailwindCSS\\n- Kinh nghiệm làm việc với RESTful APIs",
    benefits: "- Lương 25-40 triệu/tháng\\n- Remote 2 ngày/tuần\\n- Bảo hiểm sức khỏe Premium\\n- 15 ngày phép/năm\\n- Review lương 2 lần/năm",
    jobType: "FULL_TIME",
    jobLevel: "SENIOR",
    location: "Hồ Chí Minh",
    isRemote: false,
    salaryMin: 25000000,
    salaryMax: 40000000,
    salaryCurrency: "VND",
    deadline: "2025-06-30",
    status: "OPEN",
    skills: [
      { skillName: "React.js", skillType: "MUST_HAVE" },
      { skillName: "TypeScript", skillType: "MUST_HAVE" },
      { skillName: "Next.js", skillType: "MUST_HAVE" },
      { skillName: "TailwindCSS", skillType: "NICE_TO_HAVE" },
    ],
    createdAt: "2025-04-01T09:00:00Z",
    updatedAt: "2025-04-01T09:00:00Z",
  },
  {
    id: 2,
    companyId: 2,
    companyName: "FPT Software",
    companyLogoUrl: null,
    createdBy: 3,
    title: "Java Spring Boot Backend Engineer",
    description: "FPT Software tuyển dụng Backend Engineer có kinh nghiệm Java Spring Boot để tham gia dự án outsourcing cho khách hàng Nhật Bản. Đây là cơ hội tuyệt vời để bạn làm việc trong môi trường quốc tế, nâng cao kỹ năng và nhận mức lương cạnh tranh.",
    requirements: "- 2+ năm kinh nghiệm Java\\n- Thành thạo Spring Boot, Spring Security\\n- Kinh nghiệm PostgreSQL/MySQL\\n- Hiểu biết về Docker, CI/CD\\n- Tiếng Nhật N3+ là lợi thế lớn",
    benefits: "- Lương 20-35 triệu/tháng\\n- Thưởng dự án hấp dẫn\\n- Cơ hội đi onsite Nhật Bản\\n- Đào tạo tiếng Nhật miễn phí\\n- Bảo hiểm PVI Care",
    jobType: "FULL_TIME",
    jobLevel: "MID",
    location: "Hà Nội",
    isRemote: false,
    salaryMin: 20000000,
    salaryMax: 35000000,
    salaryCurrency: "VND",
    deadline: "2025-07-15",
    status: "OPEN",
    skills: [
      { skillName: "Java", skillType: "MUST_HAVE" },
      { skillName: "Spring Boot", skillType: "MUST_HAVE" },
      { skillName: "PostgreSQL", skillType: "MUST_HAVE" },
      { skillName: "Docker", skillType: "NICE_TO_HAVE" },
    ],
    createdAt: "2025-04-02T09:00:00Z",
    updatedAt: "2025-04-02T09:00:00Z",
  },
  {
    id: 3,
    companyId: 3,
    companyName: "VNG Corporation",
    companyLogoUrl: null,
    createdBy: 4,
    title: "DevOps Engineer (AWS/K8s)",
    description: "VNG Corporation đang tìm kiếm DevOps Engineer giàu kinh nghiệm để xây dựng và vận hành hạ tầng cloud cho hệ sinh thái Zalo, ZaloPay. Bạn sẽ chịu trách nhiệm CI/CD pipeline, container orchestration và đảm bảo uptime 99.99% cho hàng triệu người dùng.",
    requirements: "- 3+ năm kinh nghiệm DevOps/SRE\\n- Thành thạo AWS (EC2, ECS, RDS, S3)\\n- Kubernetes & Helm Charts\\n- Terraform/Pulumi IaC\\n- Monitoring: Grafana, Prometheus",
    benefits: "- Lương 30-50 triệu/tháng\\n- RSU (cổ phiếu)\\n- Laptop gaming cấu hình cao\\n- Gym + bể bơi nội bộ\\n- Team building hàng quý",
    jobType: "FULL_TIME",
    jobLevel: "SENIOR",
    location: "Hồ Chí Minh",
    isRemote: true,
    salaryMin: 30000000,
    salaryMax: 50000000,
    salaryCurrency: "VND",
    deadline: "2025-08-01",
    status: "OPEN",
    skills: [
      { skillName: "AWS", skillType: "MUST_HAVE" },
      { skillName: "Kubernetes", skillType: "MUST_HAVE" },
      { skillName: "Terraform", skillType: "MUST_HAVE" },
      { skillName: "Docker", skillType: "MUST_HAVE" },
    ],
    createdAt: "2025-04-03T09:00:00Z",
    updatedAt: "2025-04-03T09:00:00Z",
  },
  {
    id: 4,
    companyId: 4,
    companyName: "Momo (M_Service)",
    companyLogoUrl: null,
    createdBy: 5,
    title: "Mobile Developer (React Native)",
    description: "Momo đang mở rộng đội ngũ phát triển ứng dụng di động với React Native. Tham gia một trong những ứng dụng fintech hàng đầu Việt Nam với hơn 30 triệu người dùng, cùng xây dựng trải nghiệm thanh toán số hoàn hảo.",
    requirements: "- 2+ năm React Native\\n- TypeScript bắt buộc\\n- Redux/Zustand state management\\n- RESTful API + WebSocket\\n- Experience with CI/CD (Fastlane, CodePush)",
    benefits: "- Lương 22-38 triệu/tháng\\n- Equity vesting 4 năm\\n- Bảo hiểm Bảo Việt Premium\\n- MacBook Pro M3 Max\\n- Thưởng KPI hàng quý",
    jobType: "FULL_TIME",
    jobLevel: "MID",
    location: "Hồ Chí Minh",
    isRemote: false,
    salaryMin: 22000000,
    salaryMax: 38000000,
    salaryCurrency: "VND",
    deadline: "2025-07-01",
    status: "OPEN",
    skills: [
      { skillName: "React Native", skillType: "MUST_HAVE" },
      { skillName: "TypeScript", skillType: "MUST_HAVE" },
      { skillName: "Redux", skillType: "NICE_TO_HAVE" },
    ],
    createdAt: "2025-04-04T09:00:00Z",
    updatedAt: "2025-04-04T09:00:00Z",
  },
  {
    id: 5,
    companyId: 5,
    companyName: "Tiki Corporation",
    companyLogoUrl: null,
    createdBy: 6,
    title: "Data Engineer (Python/Spark)",
    description: "Tiki cần Data Engineer để xây dựng data pipeline xử lý dữ liệu e-commerce quy mô lớn. Bạn sẽ làm việc với petabyte dữ liệu hàng ngày, tối ưu hoá hệ thống recommendation và analytics real-time phục vụ triệu khách hàng.",
    requirements: "- 2+ năm Data Engineering\\n- Python, PySpark, SQL\\n- Airflow/Dagster\\n- AWS Glue, Redshift, S3\\n- Kinh nghiệm với Kafka streaming",
    benefits: "- Lương 25-45 triệu/tháng\\n- Discount 30% sản phẩm Tiki\\n- Flexible working hours\\n- Hackathon nội bộ hàng tháng\\n- Khóa học Coursera miễn phí",
    jobType: "FULL_TIME",
    jobLevel: "MID",
    location: "Hồ Chí Minh",
    isRemote: true,
    salaryMin: 25000000,
    salaryMax: 45000000,
    salaryCurrency: "VND",
    deadline: "2025-06-15",
    status: "OPEN",
    skills: [
      { skillName: "Python", skillType: "MUST_HAVE" },
      { skillName: "Apache Spark", skillType: "MUST_HAVE" },
      { skillName: "SQL", skillType: "MUST_HAVE" },
      { skillName: "Kafka", skillType: "NICE_TO_HAVE" },
    ],
    createdAt: "2025-04-05T09:00:00Z",
    updatedAt: "2025-04-05T09:00:00Z",
  },
  {
    id: 6,
    companyId: 6,
    companyName: "Shopee Vietnam",
    companyLogoUrl: null,
    createdBy: 7,
    title: "UI/UX Designer (Product Design)",
    description: "Shopee Vietnam tuyển UI/UX Designer tham gia thiết kế trải nghiệm mua sắm online cho hàng triệu người dùng Đông Nam Á. Từ checkout flow đến gamification, bạn sẽ có cơ hội impact trực tiếp lên sản phẩm quy mô lớn.",
    requirements: "- 2+ năm kinh nghiệm UI/UX Design\\n- Thành thạo Figma\\n- Portfolio ấn tượng\\n- Kinh nghiệm user research\\n- Hiểu biết về design system",
    benefits: "- Lương 18-32 triệu/tháng\\n- SeaMoney benefits package\\n- Free lunch & snacks\\n- Annual trip nước ngoài\\n- Shuttle bus miễn phí",
    jobType: "FULL_TIME",
    jobLevel: "MID",
    location: "Hồ Chí Minh",
    isRemote: false,
    salaryMin: 18000000,
    salaryMax: 32000000,
    salaryCurrency: "VND",
    deadline: "2025-06-20",
    status: "OPEN",
    skills: [
      { skillName: "Figma", skillType: "MUST_HAVE" },
      { skillName: "User Research", skillType: "MUST_HAVE" },
      { skillName: "Prototyping", skillType: "NICE_TO_HAVE" },
    ],
    createdAt: "2025-04-06T09:00:00Z",
    updatedAt: "2025-04-06T09:00:00Z",
  },
];

// ─── Applications (Employer Kanban) ─────────────────────

export const MOCK_APPLICATIONS = [
  {
    id: 1,
    jobId: 1,
    jobTitle: "Senior Frontend Developer (React/Next.js)",
    candidateId: 10,
    candidateName: "Phạm Minh Tuấn",
    candidateEmail: "tuanpm@gmail.com",
    candidateAvatarUrl: null,
    stage: "APPLIED",
    coverLetter: "Tôi rất quan tâm đến vị trí này và muốn đóng góp vào đội ngũ phát triển sản phẩm của quý công ty.",
    appliedAt: "2025-04-05T14:30:00Z",
    stageHistory: [],
  },
  {
    id: 2,
    jobId: 1,
    jobTitle: "Senior Frontend Developer (React/Next.js)",
    candidateId: 11,
    candidateName: "Lê Hoàng Anh",
    candidateEmail: "hoanganh.le@gmail.com",
    candidateAvatarUrl: null,
    stage: "SCREENING",
    coverLetter: "Với 4 năm kinh nghiệm React và TypeScript, tôi tin mình sẽ phù hợp.",
    appliedAt: "2025-04-04T09:15:00Z",
    stageHistory: [
      { stage: "APPLIED", changedAt: "2025-04-04T09:15:00Z" },
      { stage: "SCREENING", changedAt: "2025-04-06T10:00:00Z" },
    ],
  },
  {
    id: 3,
    jobId: 1,
    jobTitle: "Senior Frontend Developer (React/Next.js)",
    candidateId: 12,
    candidateName: "Trần Đức Huy",
    candidateEmail: "duchuy.tran@outlook.com",
    candidateAvatarUrl: null,
    stage: "INTERVIEW",
    coverLetter: "Tôi đã dẫn dắt team frontend 5 người tại startup trước đó.",
    appliedAt: "2025-04-03T11:00:00Z",
    stageHistory: [
      { stage: "APPLIED", changedAt: "2025-04-03T11:00:00Z" },
      { stage: "SCREENING", changedAt: "2025-04-04T16:00:00Z" },
      { stage: "INTERVIEW", changedAt: "2025-04-07T09:00:00Z" },
    ],
  },
  {
    id: 4,
    jobId: 1,
    jobTitle: "Senior Frontend Developer (React/Next.js)",
    candidateId: 13,
    candidateName: "Nguyễn Thị Mai",
    candidateEmail: "mai.nguyen@gmail.com",
    candidateAvatarUrl: null,
    stage: "OFFER",
    coverLetter: "Tôi đặc biệt quan tâm đến sản phẩm SaaS và mong muốn đóng góp.",
    appliedAt: "2025-04-01T08:00:00Z",
    stageHistory: [
      { stage: "APPLIED", changedAt: "2025-04-01T08:00:00Z" },
      { stage: "SCREENING", changedAt: "2025-04-02T10:00:00Z" },
      { stage: "INTERVIEW", changedAt: "2025-04-04T14:00:00Z" },
      { stage: "OFFER", changedAt: "2025-04-08T09:00:00Z" },
    ],
  },
  {
    id: 5,
    jobId: 2,
    jobTitle: "Java Spring Boot Backend Engineer",
    candidateId: 14,
    candidateName: "Võ Quang Khải",
    candidateEmail: "khai.vo@gmail.com",
    candidateAvatarUrl: null,
    stage: "HIRED",
    coverLetter: "3 năm kinh nghiệm Spring Boot và microservices.",
    appliedAt: "2025-03-25T10:00:00Z",
    stageHistory: [
      { stage: "APPLIED", changedAt: "2025-03-25T10:00:00Z" },
      { stage: "SCREENING", changedAt: "2025-03-26T10:00:00Z" },
      { stage: "INTERVIEW", changedAt: "2025-03-28T14:00:00Z" },
      { stage: "OFFER", changedAt: "2025-04-01T09:00:00Z" },
      { stage: "HIRED", changedAt: "2025-04-05T09:00:00Z" },
    ],
  },
];

// ─── Company ──────────────────────────────────────────────

export const MOCK_COMPANY = {
  id: 1,
  name: "TechCorp Vietnam",
  description: "Công ty công nghệ hàng đầu Việt Nam chuyên phát triển các giải pháp SaaS cho doanh nghiệp. Với đội ngũ hơn 200 kỹ sư tài năng, chúng tôi đã phục vụ hơn 5,000 khách hàng doanh nghiệp trên khắp Đông Nam Á.",
  industry: "Information Technology",
  companySize: "MEDIUM",
  website: "https://techcorp.vn",
  address: "Tầng 15, Bitexco Financial Tower, Quận 1, TP. HCM",
  logoUrl: null,
  coverUrl: null,
  foundedYear: 2018,
};

// ─── HR Dashboard Stats ──────────────────────────────────

export const MOCK_HR_DASHBOARD = {
  totalJobs: 12,
  activeJobs: 8,
  totalApplications: 156,
  newApplicationsToday: 7,
  interviewsThisWeek: 5,
  hiredThisMonth: 3,
  applicationsByStage: {
    APPLIED: 45,
    SCREENING: 38,
    INTERVIEW: 28,
    OFFER: 15,
    HIRED: 18,
    REJECTED: 12,
  },
  recentActivity: [
    { type: "NEW_APPLICATION", message: "Phạm Minh Tuấn ứng tuyển Senior Frontend Developer", time: "2 giờ trước" },
    { type: "STAGE_CHANGE", message: "Lê Hoàng Anh chuyển sang vòng Screening", time: "5 giờ trước" },
    { type: "INTERVIEW_SCHEDULED", message: "Phỏng vấn Trần Đức Huy lúc 14:00 ngày mai", time: "1 ngày trước" },
  ],
};

// ─── Candidate Dashboard Stats ───────────────────────────

export const MOCK_CANDIDATE_DASHBOARD = {
  totalApplications: 8,
  activeApplications: 5,
  interviewsScheduled: 2,
  offersReceived: 1,
  profileCompleteness: 85,
};

// ─── CV Data ─────────────────────────────────────────────

export const MOCK_CV_DATA = {
  personalInfo: {
    fullName: "Nguyễn Văn An",
    email: "nguyenvana@gmail.com",
    phone: "0901234567",
    address: "Quận 7, TP. Hồ Chí Minh",
    summary: "Frontend Developer với 3 năm kinh nghiệm xây dựng ứng dụng web hiện đại. Chuyên React.js, TypeScript và Next.js. Đam mê tạo ra những giao diện đẹp mắt và trải nghiệm người dùng tuyệt vời.",
  },
  education: [
    {
      id: 1,
      school: "Đại học Bách Khoa TP.HCM",
      degree: "Kỹ sư Khoa học Máy tính",
      startDate: "2018-09",
      endDate: "2022-06",
      gpa: "3.5/4.0",
    },
  ],
  experience: [
    {
      id: 1,
      company: "TechCorp Vietnam",
      position: "Frontend Developer",
      startDate: "2022-07",
      endDate: null,
      description: "Phát triển và bảo trì hệ thống SaaS phục vụ hơn 5,000 doanh nghiệp. Xây dựng UI component library với React + TypeScript. Tối ưu performance giảm 40% thời gian tải trang.",
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Junior Frontend Developer",
      startDate: "2021-06",
      endDate: "2022-06",
      description: "Tham gia phát triển MVP cho ứng dụng e-commerce. Làm việc với React, Redux và Material UI. Viết unit tests đạt coverage 80%.",
    },
  ],
  skills: [
    { id: 1, name: "React.js", level: "EXPERT" },
    { id: 2, name: "TypeScript", level: "ADVANCED" },
    { id: 3, name: "Next.js", level: "ADVANCED" },
    { id: 4, name: "TailwindCSS", level: "ADVANCED" },
    { id: 5, name: "Node.js", level: "INTERMEDIATE" },
    { id: 6, name: "PostgreSQL", level: "INTERMEDIATE" },
    { id: 7, name: "Docker", level: "INTERMEDIATE" },
    { id: 8, name: "Git", level: "ADVANCED" },
  ],
  projects: [
    {
      id: 1,
      name: "SmartHire ATS Platform",
      description: "Hệ thống theo dõi ứng viên (ATS) hiện đại với AI Resume Builder, Kanban Pipeline và Dashboard phân tích.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "Zustand"],
      url: "https://github.com/khoazandev/smart-hire-web",
    },
    {
      id: 2,
      name: "E-commerce Dashboard",
      description: "Bảng điều khiển quản lý cho hệ thống e-commerce với analytics real-time và quản lý đơn hàng.",
      technologies: ["React", "Redux Toolkit", "Chart.js", "Node.js"],
      url: null,
    },
  ],
  certifications: [
    { id: 1, name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: 2024 },
    { id: 2, name: "Meta Frontend Developer Professional Certificate", issuer: "Meta (Coursera)", year: 2023 },
  ],
};

// ─── Notifications ────────────────────────────────────────

export const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "APPLICATION_UPDATE",
    title: "Cập nhật đơn ứng tuyển",
    message: "Đơn ứng tuyển vị trí Senior Frontend Developer của bạn đã chuyển sang vòng Phỏng vấn.",
    isRead: false,
    createdAt: "2025-04-10T14:30:00Z",
  },
  {
    id: 2,
    type: "INTERVIEW_SCHEDULED",
    title: "Lịch phỏng vấn mới",
    message: "Bạn có lịch phỏng vấn với TechCorp Vietnam vào lúc 14:00 ngày 15/04/2025.",
    isRead: false,
    createdAt: "2025-04-09T10:00:00Z",
  },
  {
    id: 3,
    type: "JOB_RECOMMENDATION",
    title: "Gợi ý việc làm phù hợp",
    message: "Có 3 vị trí Frontend Developer mới phù hợp với hồ sơ của bạn.",
    isRead: true,
    createdAt: "2025-04-08T08:00:00Z",
  },
];

// ─── Profile Sections ─────────────────────────────────────

export const MOCK_PROFILE_EDUCATIONS = MOCK_CV_DATA.education;
export const MOCK_PROFILE_EXPERIENCES = MOCK_CV_DATA.experience;
export const MOCK_PROFILE_SKILLS = MOCK_CV_DATA.skills;
export const MOCK_PROFILE_PROJECTS = MOCK_CV_DATA.projects;
