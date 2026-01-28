import { CandidateProfile } from "./profile";

export const MOCK_PROFILE: CandidateProfile = {
  id: "c-123456",
  fullName: "Lương Quang Bình",
  title: "Senior Fullstack Developer",
  email: "binhlq@example.com",
  phone: "+84 987 654 321",
  location: "Ho Chi Minh City, Vietnam",
  // avatarUrl: "https://github.com/shadcn.png", // Uncomment to use real image
  avatarUrl: undefined,
  about:
    "I am a passionate software engineer with over 5 years of experience in building scalable web applications. My expertise lies in the React ecosystem, specifically Next.js and TypeScript. I love solving complex problems and creating intuitive user experiences.",
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/binhlq" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/binhlq" },
    { platform: "Website", url: "https://binh.dev" },
  ],
  skills: [
    { id: "s1", name: "React", level: "Expert" },
    { id: "s2", name: "Next.js", level: "Expert" },
    { id: "s3", name: "TypeScript", level: "Advanced" },
    { id: "s4", name: "Node.js", level: "Advanced" },
    { id: "s5", name: "Tailwind CSS", level: "Expert" },
    { id: "s6", name: "PostgreSQL", level: "Intermediate" },
    { id: "s7", name: "Docker", level: "Intermediate" },
    { id: "s8", name: "AWS", level: "Beginner" },
  ],
  experiences: [
    {
      id: "e1",
      role: "Senior Frontend Engineer",
      company: "TechCorp Vietnam",
      startDate: "2023-01",
      endDate: "Present",
      description:
        "Leading the frontend team in migrating legacy monolith to micro-frontends architecture. Improved site performance by 40%.",
      logoUrl: "/companies/techcorp.png",
    },
    {
      id: "e2",
      role: "Fullstack Developer",
      company: "StartupZ",
      startDate: "2020-06",
      endDate: "2022-12",
      description:
        "Built the MVP for a logistic SaaS platform from scratch using MERN stack. grew user base to 10k users.",
    },
  ],
  educations: [
    {
      id: "edu1",
      degree: "Bachelor of Science in Computer Science",
      school: "Ho Chi Minh City University of Technology",
      fieldOfStudy: "Software Engineering",
      startDate: "2016",
      endDate: "2020",
    },
  ],
};
