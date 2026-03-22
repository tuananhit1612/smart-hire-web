import { CVData } from "./types";

export interface CVVersion {
  id: string;
  name: string;
  templateId: string;
  templateName: string;
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
  thumbnail?: string;
  data: CVData;
}

// Mock CV versions with FULL detailed content
export const mockCVVersions: CVVersion[] = [
  {
    id: "cv-1",
    name: "CV Chính - Frontend Developer",
    templateId: "modern-professional",
    templateName: "Modern Professional",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    isDefault: true,
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=200&h=280&fit=crop",
    data: {
      personalInfo: {
        fullName: "Nguyễn Văn An",
        email: "an.nguyen@email.com",
        phone: "+84 909 123 456",
        location: "TP. Hồ Chí Minh, Việt Nam",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=An",
        socials: [
          { id: "s1", network: "LinkedIn" as const, url: "https://linkedin.com/in/annguyen" },
          { id: "s2", network: "Website" as const, url: "https://annguyen.dev" }
        ]
      },
      summary: "Frontend Developer với hơn 3 năm kinh nghiệm chuyên sâu trong phát triển web applications sử dụng React, TypeScript và Next.js. Có kinh nghiệm làm việc trong môi trường Agile, phối hợp chặt chẽ với team Backend và Design để xây dựng các sản phẩm có trải nghiệm người dùng xuất sắc. Đam mê với clean code, performance optimization và các công nghệ mới nhất trong hệ sinh thái JavaScript.",
      education: [
        {
          id: "edu-1",
          school: "Đại học Bách Khoa TP. Hồ Chí Minh",
          degree: "Kỹ sư",
          field: "Khoa học Máy tính",
          startDate: "2017-09",
          endDate: "2021-06",
          description: "Tốt nghiệp loại Giỏi với GPA 3.5/4.0. Đề tài tốt nghiệp: Xây dựng hệ thống quản lý học tập trực tuyến sử dụng React và Node.js.",
        },
        {
          id: "edu-2",
          school: "THPT Chuyên Lê Hồng Phong",
          degree: "Trung học phổ thông",
          field: "Chuyên Tin học",
          startDate: "2014-09",
          endDate: "2017-06",
          description: "Giải Ba Học sinh giỏi cấp Thành phố môn Tin học.",
        },
      ],
      experience: [
        {
          id: "exp-1",
          company: "TechCorp Vietnam",
          position: "Senior Frontend Developer",
          location: "TP. Hồ Chí Minh",
          startDate: "2022-06",
          endDate: "",
          isCurrent: true,
          description: "• Lead team 4 Frontend developers phát triển nền tảng SaaS phục vụ 50,000+ users\n• Thiết kế và implement Design System với Storybook, giảm 40% thời gian development\n• Tối ưu Core Web Vitals, tăng Lighthouse Performance từ 65 lên 95+\n• Mentor junior developers, conduct code reviews và tech sharing sessions\n• Phối hợp với Product và Backend team trong việc định nghĩa API contracts",
        },
        {
          id: "exp-2",
          company: "StartupXYZ",
          position: "Frontend Developer",
          location: "TP. Hồ Chí Minh",
          startDate: "2021-07",
          endDate: "2022-05",
          isCurrent: false,
          description: "• Phát triển từ đầu landing pages và dashboard cho ứng dụng fintech\n• Implement real-time features sử dụng WebSocket và React Query\n• Xây dựng CI/CD pipeline với GitHub Actions, automated testing với Jest & Cypress\n• Làm việc trực tiếp với khách hàng quốc tế trong môi trường tiếng Anh",
        },
        {
          id: "exp-3",
          company: "FPT Software",
          position: "Frontend Developer Intern",
          location: "TP. Hồ Chí Minh",
          startDate: "2021-01",
          endDate: "2021-06",
          isCurrent: false,
          description: "• Tham gia dự án outsource cho khách hàng Nhật Bản\n• Học và áp dụng React, Redux trong dự án thực tế\n• Được training về Agile/Scrum methodology",
        },
      ],
      skills: [
        { id: "sk-1", name: "React", level: "expert", category: "technical" },
        { id: "sk-2", name: "TypeScript", level: "expert", category: "technical" },
        { id: "sk-3", name: "Next.js", level: "advanced", category: "technical" },
        { id: "sk-4", name: "Tailwind CSS", level: "expert", category: "technical" },
        { id: "sk-5", name: "Node.js", level: "intermediate", category: "technical" },
        { id: "sk-6", name: "GraphQL", level: "intermediate", category: "technical" },
        { id: "sk-7", name: "Jest / Cypress", level: "advanced", category: "technical" },
        { id: "sk-8", name: "Git / GitHub", level: "advanced", category: "technical" },
        { id: "sk-9", name: "Figma", level: "intermediate", category: "technical" },
        { id: "sk-10", name: "AWS (S3, CloudFront)", level: "beginner", category: "technical" },
        { id: "sk-11", name: "Leadership", level: "intermediate", category: "soft" },
        { id: "sk-12", name: "Communication", level: "advanced", category: "soft" },
        { id: "sk-13", name: "Problem Solving", level: "advanced", category: "soft" },
        { id: "sk-14", name: "Teamwork", level: "advanced", category: "soft" },
      ],
      projects: [
        {
          id: "proj-1",
          name: "SmartHire Platform",
          description: "Nền tảng tuyển dụng thông minh sử dụng AI để matching ứng viên với công việc phù hợp. Xây dựng dashboard cho HR với analytics, quản lý quy trình tuyển dụng end-to-end.",
          technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
          link: "https://smarthire.vn",
          startDate: "2023-06",
          endDate: "2024-01",
        },
        {
          id: "proj-2",
          name: "E-commerce Admin Dashboard",
          description: "Dashboard quản trị cho hệ thống thương mại điện tử với real-time inventory tracking, order management và analytics. Xử lý 10,000+ orders/ngày.",
          technologies: ["React", "Redux Toolkit", "Material-UI", "Chart.js", "Socket.io"],
          link: "https://github.com/annguyen/ecommerce-dashboard",
          startDate: "2022-09",
          endDate: "2023-03",
        },
        {
          id: "proj-3",
          name: "Personal Portfolio",
          description: "Website portfolio cá nhân với blog tích hợp, dark mode và animations. SEO optimized với perfect Lighthouse scores.",
          technologies: ["Next.js", "MDX", "Framer Motion", "Vercel"],
          link: "https://annguyen.dev",
          startDate: "2022-01",
          endDate: "2022-02",
        },
      ],
      languages: [
        { id: "lang-1", name: "Tiếng Việt", level: "native" as const },
        { id: "lang-2", name: "Tiếng Anh", level: "upper-intermediate" as const },
        { id: "lang-3", name: "Tiếng Nhật", level: "elementary" as const },
      ],
      certifications: [
        { id: "cert-1", name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "2023-06", expiry: "2026-06", url: "https://aws.amazon.com/certification" },
        { id: "cert-2", name: "Meta Front-End Developer", issuer: "Meta (Coursera)", date: "2022-12" },
      ],
      awards: [
        { id: "award-1", title: "Best Innovation Award", issuer: "TechCorp Vietnam Hackathon", date: "2023-03", description: "Giải nhất cuộc thi hackathon nội bộ với dự án AI-powered code review tool." },
        { id: "award-2", title: "Giải Ba HSG Thành phố", issuer: "Sở GD&ĐT TP.HCM", date: "2016-11" },
      ],
    },
  },
  {
    id: "cv-2",
    name: "CV Tiếng Anh - Software Engineer",
    templateId: "minimalist",
    templateName: "Minimalist",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    isDefault: false,
    thumbnail: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=200&h=280&fit=crop",
    data: {
      personalInfo: {
        fullName: "An Nguyen",
        email: "an.nguyen@email.com",
        phone: "+84 909 123 456",
        location: "Ho Chi Minh City, Vietnam",
        socials: [
          { id: "s3", network: "LinkedIn" as const, url: "https://linkedin.com/in/annguyen" },
          { id: "s4", network: "Website" as const, url: "https://annguyen.dev" }
        ]
      },
      summary: "Passionate Frontend Developer with 3+ years of experience building scalable web applications using React, TypeScript, and Next.js. Proven track record of leading development teams, optimizing performance, and delivering high-quality user experiences. Strong advocate for clean code, modern best practices, and continuous learning.",
      education: [
        {
          id: "edu-1",
          school: "Ho Chi Minh City University of Technology",
          degree: "Bachelor of Engineering",
          field: "Computer Science",
          startDate: "2017-09",
          endDate: "2021-06",
          description: "Graduated with Honors (GPA: 3.5/4.0). Thesis: Building an Online Learning Management System using React and Node.js.",
        },
      ],
      experience: [
        {
          id: "exp-1",
          company: "TechCorp Vietnam",
          position: "Senior Frontend Developer",
          location: "Ho Chi Minh City",
          startDate: "2022-06",
          endDate: "",
          isCurrent: true,
          description: "• Lead a team of 4 Frontend developers building a SaaS platform serving 50,000+ users\n• Designed and implemented a Design System with Storybook, reducing development time by 40%\n• Optimized Core Web Vitals, improving Lighthouse Performance score from 65 to 95+\n• Mentor junior developers, conduct code reviews and tech sharing sessions",
        },
        {
          id: "exp-2",
          company: "StartupXYZ",
          position: "Frontend Developer",
          location: "Ho Chi Minh City",
          startDate: "2021-07",
          endDate: "2022-05",
          isCurrent: false,
          description: "• Built landing pages and dashboard for a fintech application from scratch\n• Implemented real-time features using WebSocket and React Query\n• Set up CI/CD pipeline with GitHub Actions, automated testing with Jest & Cypress",
        },
      ],
      skills: [
        { id: "sk-1", name: "React", level: "expert", category: "technical" },
        { id: "sk-2", name: "TypeScript", level: "expert", category: "technical" },
        { id: "sk-3", name: "Next.js", level: "advanced", category: "technical" },
        { id: "sk-4", name: "Node.js", level: "intermediate", category: "technical" },
        { id: "sk-5", name: "GraphQL", level: "intermediate", category: "technical" },
        { id: "sk-6", name: "English Communication", level: "advanced", category: "soft" },
        { id: "sk-7", name: "Leadership", level: "intermediate", category: "soft" },
      ],
      projects: [
        {
          id: "proj-1",
          name: "SmartHire Platform",
          description: "AI-powered recruitment platform for matching candidates with suitable jobs. Built HR dashboard with analytics and end-to-end recruitment management.",
          technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
          link: "https://smarthire.vn",
        },
      ],
      languages: [
        { id: "lang-1", name: "Vietnamese", level: "native" as const },
        { id: "lang-2", name: "English", level: "upper-intermediate" as const },
      ],
      certifications: [],
      awards: [],
    },
  },
  {
    id: "cv-3",
    name: "CV Fullstack Developer",
    templateId: "creative",
    templateName: "Creative",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    isDefault: false,
    thumbnail: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=200&h=280&fit=crop",
    data: {
      personalInfo: {
        fullName: "Nguyễn Văn An",
        email: "an.nguyen@email.com",
        phone: "+84 909 123 456",
        location: "TP. Hồ Chí Minh",
        socials: [
          { id: "s5", network: "LinkedIn" as const, url: "https://linkedin.com/in/annguyen" },
          { id: "s6", network: "Website" as const, url: "https://annguyen.dev" }
        ]
      },
      summary: "Fullstack Developer với kinh nghiệm vững chắc cả Frontend (React, Next.js) và Backend (Node.js, Go). Có khả năng thiết kế và xây dựng hệ thống end-to-end, từ database design đến API development và UI implementation. Luôn tìm kiếm cơ hội thử thách và học hỏi công nghệ mới.",
      education: [
        {
          id: "edu-1",
          school: "Đại học Bách Khoa TP. Hồ Chí Minh",
          degree: "Kỹ sư",
          field: "Khoa học Máy tính",
          startDate: "2017-09",
          endDate: "2021-06",
          description: "Tốt nghiệp loại Giỏi với GPA 3.5/4.0.",
        },
      ],
      experience: [
        {
          id: "exp-1",
          company: "TechCorp Vietnam",
          position: "Fullstack Developer",
          location: "TP. Hồ Chí Minh",
          startDate: "2022-06",
          endDate: "",
          isCurrent: true,
          description: "• Phát triển cả Frontend và Backend cho nền tảng SaaS\n• Thiết kế RESTful APIs và GraphQL endpoints\n• Implement microservices architecture với Docker và Kubernetes\n• Database design và optimization với PostgreSQL và Redis",
        },
        {
          id: "exp-2",
          company: "StartupXYZ",
          position: "Junior Fullstack Developer",
          location: "TP. Hồ Chí Minh",
          startDate: "2021-07",
          endDate: "2022-05",
          isCurrent: false,
          description: "• Xây dựng REST APIs với Node.js Express\n• Phát triển Frontend với React và TypeScript\n• Làm việc với MongoDB và PostgreSQL",
        },
      ],
      skills: [
        { id: "sk-1", name: "React", level: "advanced", category: "technical" },
        { id: "sk-2", name: "Node.js", level: "advanced", category: "technical" },
        { id: "sk-3", name: "TypeScript", level: "advanced", category: "technical" },
        { id: "sk-4", name: "Go", level: "intermediate", category: "technical" },
        { id: "sk-5", name: "PostgreSQL", level: "advanced", category: "technical" },
        { id: "sk-6", name: "Docker", level: "intermediate", category: "technical" },
        { id: "sk-7", name: "Redis", level: "intermediate", category: "technical" },
        { id: "sk-8", name: "Problem Solving", level: "advanced", category: "soft" },
      ],
      projects: [
        {
          id: "proj-1",
          name: "E-commerce Microservices",
          description: "Hệ thống thương mại điện tử với kiến trúc microservices. Bao gồm: User Service, Product Service, Order Service, Payment Gateway.",
          technologies: ["Node.js", "Go", "gRPC", "PostgreSQL", "Redis", "Docker"],
          link: "https://github.com/annguyen/ecommerce-microservices",
        },
        {
          id: "proj-2",
          name: "Real-time Chat Application",
          description: "Ứng dụng chat real-time với WebSocket. Hỗ trợ group chat, direct messages, file sharing.",
          technologies: ["React", "Socket.io", "Node.js", "MongoDB"],
          link: "https://github.com/annguyen/chat-app",
        },
      ],
      languages: [],
      certifications: [],
      awards: [],
    },
  },
  {
    id: "cv-4",
    name: "CV Junior - Fresh Graduate",
    templateId: "simple",
    templateName: "Simple Clean",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    isDefault: false,
    thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&h=280&fit=crop",
    data: {
      personalInfo: {
        fullName: "Nguyễn Văn An",
        email: "an.nguyen@email.com",
        phone: "+84 909 123 456",
        location: "TP. Hồ Chí Minh",
        socials: [
          { id: "s7", network: "LinkedIn" as const, url: "https://linkedin.com/in/annguyen" }
        ]
      },
      summary: "Fresh graduate đam mê công nghệ, đặc biệt là lập trình web. Có nền tảng vững chắc về Computer Science và kinh nghiệm thực tập tại công ty công nghệ. Mong muốn tìm vị trí Junior Developer để phát triển kỹ năng và đóng góp vào dự án thực tế.",
      education: [
        {
          id: "edu-1",
          school: "Đại học Bách Khoa TP. Hồ Chí Minh",
          degree: "Kỹ sư",
          field: "Khoa học Máy tính",
          startDate: "2017-09",
          endDate: "2021-06",
          description: "• GPA: 3.5/4.0 - Tốt nghiệp loại Giỏi\n• Đề tài tốt nghiệp: Xây dựng hệ thống quản lý học tập online\n• Các môn học nổi bật: Data Structures, Algorithms, Web Development, Database Systems\n• Hoạt động ngoại khóa: Thành viên CLB Tin học, Volunteer trong các sự kiện tech",
        },
        {
          id: "edu-2",
          school: "THPT Chuyên Lê Hồng Phong",
          degree: "Trung học phổ thông",
          field: "Chuyên Tin học",
          startDate: "2014-09",
          endDate: "2017-06",
          description: "Giải Ba Học sinh giỏi cấp Thành phố môn Tin học.",
        },
      ],
      experience: [
        {
          id: "exp-1",
          company: "FPT Software",
          position: "Frontend Developer Intern",
          location: "TP. Hồ Chí Minh",
          startDate: "2021-01",
          endDate: "2021-06",
          isCurrent: false,
          description: "• Tham gia dự án outsource cho khách hàng Nhật Bản\n• Học và áp dụng React, Redux trong dự án thực tế\n• Hỗ trợ team fix bugs và implement minor features\n• Được training về Agile/Scrum methodology",
        },
      ],
      skills: [
        { id: "sk-1", name: "JavaScript", level: "intermediate", category: "technical" },
        { id: "sk-2", name: "React", level: "beginner", category: "technical" },
        { id: "sk-3", name: "HTML/CSS", level: "intermediate", category: "technical" },
        { id: "sk-4", name: "Python", level: "intermediate", category: "technical" },
        { id: "sk-5", name: "Git", level: "beginner", category: "technical" },
        { id: "sk-6", name: "SQL", level: "beginner", category: "technical" },
        { id: "sk-7", name: "Eager to Learn", level: "expert", category: "soft" },
        { id: "sk-8", name: "Teamwork", level: "advanced", category: "soft" },
      ],
      projects: [
        {
          id: "proj-1",
          name: "Đồ án tốt nghiệp: Learning Management System",
          description: "Hệ thống quản lý học tập online cho sinh viên và giảng viên. Chức năng: Quản lý khóa học, bài tập, điểm số, forum thảo luận.",
          technologies: ["React", "Node.js", "MongoDB", "Express"],
          startDate: "2020-09",
          endDate: "2021-05",
        },
        {
          id: "proj-2",
          name: "Personal Blog",
          description: "Blog cá nhân để chia sẻ kiến thức về lập trình. Tự học và implement từ đầu.",
          technologies: ["HTML", "CSS", "JavaScript", "Firebase"],
          link: "https://anblog.netlify.app",
        },
      ],
      languages: [],
      certifications: [],
      awards: [],
    },
  },
  {
    id: "cv-5",
    name: "CV Remote Work",
    templateId: "modern-dark",
    templateName: "Modern Dark",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    isDefault: false,
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=280&fit=crop",
    data: {
      personalInfo: {
        fullName: "Nguyễn Văn An",
        email: "an.nguyen@email.com",
        phone: "+84 909 123 456",
        location: "Remote - Vietnam (GMT+7)",
        socials: [
          { id: "s8", network: "LinkedIn" as const, url: "https://linkedin.com/in/annguyen" },
          { id: "s9", network: "Website" as const, url: "https://annguyen.dev" }
        ]
      },
      summary: "Remote-first Frontend Developer với 3+ năm kinh nghiệm làm việc với các team phân tán toàn cầu. Thành thạo giao tiếp async, tự quản lý thời gian hiệu quả và có kinh nghiệm overlap với múi giờ US/EU. Sẵn sàng cho các vị trí remote full-time hoặc contract.",
      education: [
        {
          id: "edu-1",
          school: "Đại học Bách Khoa TP. Hồ Chí Minh",
          degree: "Kỹ sư",
          field: "Khoa học Máy tính",
          startDate: "2017-09",
          endDate: "2021-06",
          description: "Tốt nghiệp loại Giỏi với GPA 3.5/4.0.",
        },
      ],
      experience: [
        {
          id: "exp-1",
          company: "Remote US Startup",
          position: "Senior Frontend Developer (Remote)",
          location: "Remote - US Company",
          startDate: "2023-01",
          endDate: "",
          isCurrent: true,
          description: "• Làm việc 100% remote với team ở US (overlap 4-5 tiếng/ngày)\n• Sử dụng async communication qua Slack, Notion, Loom\n• Weekly sync meetings qua Zoom\n• Code reviews và pair programming qua VS Code Live Share\n• Tự quản lý timeline và deliverables",
        },
        {
          id: "exp-2",
          company: "TechCorp Vietnam",
          position: "Frontend Developer (Hybrid)",
          location: "TP. Hồ Chí Minh / Remote",
          startDate: "2021-07",
          endDate: "2022-12",
          isCurrent: false,
          description: "• Làm việc hybrid: 2 ngày office, 3 ngày remote\n• Phối hợp với team members ở các văn phòng khác nhau\n• Maintain documentation cho async collaboration",
        },
      ],
      skills: [
        { id: "sk-1", name: "React", level: "expert", category: "technical" },
        { id: "sk-2", name: "TypeScript", level: "expert", category: "technical" },
        { id: "sk-3", name: "Next.js", level: "advanced", category: "technical" },
        { id: "sk-4", name: "Async Communication", level: "expert", category: "soft" },
        { id: "sk-5", name: "Time Management", level: "expert", category: "soft" },
        { id: "sk-6", name: "Self-Discipline", level: "advanced", category: "soft" },
        { id: "sk-7", name: "Written English", level: "advanced", category: "soft" },
        { id: "sk-8", name: "Documentation", level: "advanced", category: "soft" },
      ],
      projects: [
        {
          id: "proj-1",
          name: "Remote Team Dashboard",
          description: "Dashboard cho team remote tracking time zones, availability, và async standups.",
          technologies: ["Next.js", "Supabase", "TailwindCSS"],
          link: "https://github.com/annguyen/remote-dashboard",
        },
      ],
      languages: [],
      certifications: [],
      awards: [],
    },
  },
];

// Get CV version by ID
export function getCVVersionById(id: string): CVVersion | undefined {
  return mockCVVersions.find((cv) => cv.id === id);
}

// Get default CV
export function getDefaultCV(): CVVersion | undefined {
  return mockCVVersions.find((cv) => cv.isDefault);
}
