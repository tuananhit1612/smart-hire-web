import { CandidateProfile } from "./profile";

/**
 * Empty profile fixture - for new users or testing empty states
 * Shows 0% completion in ProfileCompletionWidget
 */
export const emptyProfile: CandidateProfile = {
  id: "empty-1",
  fullName: "",
  headline: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  avatarUrl: "",
  about: "",
  summary: "",
  yearsOfExperience: 0,
  expectedSalary: "",
  skills: [],
  experiences: [],
  educations: [],
  certificates: [],
  projects: [],
  languages: [],
  socialLinks: [],
};

/**
 * Partial profile fixture - for testing intermediate states
 * Shows ~40% completion in ProfileCompletionWidget
 */
export const partialProfile: CandidateProfile = {
  id: "partial-1",
  fullName: "Trần Thị Bình",
  headline: "",
  title: "Junior Developer",
  email: "binh.tran@example.com",
  phone: "+84 909 123 456",
  location: "Hà Nội, Việt Nam",
  avatarUrl: "",
  about: "Mới bắt đầu sự nghiệp lập trình.",
  summary: "",
  yearsOfExperience: 1,
  expectedSalary: "",
  skills: [
    { id: "1", name: "JavaScript", level: "Beginner" },
    { id: "2", name: "HTML/CSS", level: "Intermediate" },
  ],
  experiences: [],
  educations: [
    {
      id: "1",
      degree: "Cử nhân",
      school: "Đại học Công nghệ Hà Nội",
      fieldOfStudy: "Công nghệ thông tin",
      startDate: "2019",
      endDate: "2023",
    },
  ],
  certificates: [],
  projects: [],
  languages: [
    { id: "1", language: "Tiếng Việt", proficiency: "Native" },
  ],
  socialLinks: [],
};

/**
 * Filled profile fixture - for testing complete states
 * Shows 100% completion in ProfileCompletionWidget
 */
export const filledProfile: CandidateProfile = {
  id: "1",
  fullName: "Nguyễn Văn An",
  headline: "Kỹ sư Frontend Cao cấp | Chuyên gia React & Next.js",
  title: "Lập trình viên Frontend Cao cấp",
  email: "an.nguyen@example.com",
  phone: "+84 912 345 678",
  location: "TP. Hồ Chí Minh, Việt Nam",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  about: "Lập trình viên frontend đam mê với hơn 5 năm kinh nghiệm xây dựng các ứng dụng web hiện đại. Chuyên sâu về React, Next.js và TypeScript. Yêu thích việc tạo ra giao diện người dùng đẹp mắt, hiệu suất cao.",
  summary: "Kỹ sư Frontend Cao cấp giàu kinh nghiệm với lịch sử làm việc được chứng minh trong ngành công nghệ thông tin. Thành thạo React.js, Next.js và Điện toán đám mây.",
  yearsOfExperience: 5,
  expectedSalary: "25.000.000 - 40.000.000 VND",
  skills: [
    { id: "1", name: "React", level: "Expert" },
    { id: "2", name: "TypeScript", level: "Expert" },
    { id: "3", name: "Next.js", level: "Advanced" },
    { id: "4", name: "Tailwind CSS", level: "Expert" },
    { id: "5", name: "Node.js", level: "Advanced" },
    { id: "6", name: "GraphQL", level: "Intermediate" },
    { id: "7", name: "PostgreSQL", level: "Intermediate" },
    { id: "8", name: "Docker", level: "Beginner" },
  ],
  experiences: [
    {
      id: "1",
      role: "Lập trình viên Frontend Cao cấp",
      company: "TechCorp Việt Nam",
      startDate: "2022-01",
      location: "TP. Hồ Chí Minh",
      locationType: "Hybrid",
      employmentType: "Full-time",
      description: "Dẫn dắt phát triển frontend cho nền tảng SaaS doanh nghiệp. Xây dựng hệ thống thiết kế, cải thiện hiệu suất 40%, hướng dẫn các lập trình viên junior.",
    },
    {
      id: "2",
      role: "Lập trình viên Frontend",
      company: "StartupXYZ",
      startDate: "2019-06",
      endDate: "2021-12",
      location: "Làm việc từ xa",
      locationType: "Remote",
      employmentType: "Full-time",
      description: "Xây dựng ứng dụng web responsive sử dụng React và Redux. Phối hợp với designers để triển khai giao diện chính xác đến từng pixel.",
    },
    {
      id: "3",
      role: "Lập trình viên Junior",
      company: "Digital Agency",
      startDate: "2018-01",
      endDate: "2019-05",
      location: "Đà Nẵng",
      locationType: "Onsite",
      employmentType: "Full-time",
      description: "Phát triển landing pages và websites marketing. Học hỏi các công nghệ frontend hiện đại và best practices.",
    },
  ],
  educations: [
    {
      id: "1",
      degree: "Cử nhân Khoa học",
      school: "Đại học Bách khoa TP. Hồ Chí Minh",
      fieldOfStudy: "Khoa học Máy tính",
      startDate: "2014",
      endDate: "2018",
    },
  ],
  certificates: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect - Associate",
      issuingOrganization: "Amazon Web Services",
      issueDate: "2023-05",
      expirationDate: "2026-05",
      credentialUrl: "https://aws.amazon.com/certification/",
    },
    {
      id: "2",
      name: "Meta Frontend Developer Professional Certificate",
      issuingOrganization: "Coursera",
      issueDate: "2021-08",
      credentialUrl: "https://coursera.org",
    }
  ],
  projects: [
    {
      id: "1",
      name: "SmartHire AI Platform",
      role: "Trưởng nhóm Frontend",
      startDate: "2023-01",
      description: "Nền tảng tuyển dụng toàn diện sử dụng AI để kết nối ứng viên với công việc phù hợp.",
      technologies: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
      link: "https://smarthire.ai"
    },
    {
      id: "2",
      name: "E-commerce Dashboard",
      role: "Lập trình viên độc lập",
      startDate: "2021-05",
      endDate: "2021-09",
      description: "Bảng điều khiển quản trị để quản lý sản phẩm, đơn hàng và khách hàng.",
      technologies: ["React", "Redux", "Firebase"],
      link: "https://demo-dashboard.com"
    }
  ],
  languages: [
    { id: "1", language: "Tiếng Việt", proficiency: "Native" },
    { id: "2", language: "Tiếng Anh", proficiency: "Fluent" },
  ],
  socialLinks: [
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "GitHub", url: "https://github.com" },
    { platform: "Website", url: "https://example.com" },
  ],
};

/**
 * Default export - alias for filledProfile (backward compatibility)
 */
export const mockProfile = filledProfile;

/**
 * All fixtures for easy access
 */
export const profileFixtures = {
  empty: emptyProfile,
  partial: partialProfile,
  filled: filledProfile,
} as const;

export type ProfileFixtureType = keyof typeof profileFixtures;
