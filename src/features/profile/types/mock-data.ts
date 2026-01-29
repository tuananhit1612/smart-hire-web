import { CandidateProfile } from "./profile";

export const mockProfile: CandidateProfile = {
  id: "1",
  fullName: "Nguyễn Văn An",
  title: "Senior Frontend Developer",
  email: "an.nguyen@example.com",
  phone: "+84 912 345 678",
  location: "Ho Chi Minh City, Vietnam",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  about: "Passionate frontend developer with 5+ years of experience building modern web applications. Specialized in React, Next.js, and TypeScript. Love creating beautiful, performant user interfaces that delight users.",
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
      role: "Senior Frontend Developer",
      company: "TechCorp Vietnam",
      startDate: "2022-01",
      description: "Led frontend development for enterprise SaaS platform. Implemented design system, improved performance by 40%, mentored junior developers.",
    },
    {
      id: "2",
      role: "Frontend Developer",
      company: "StartupXYZ",
      startDate: "2019-06",
      endDate: "2021-12",
      description: "Built responsive web applications using React and Redux. Collaborated with designers to implement pixel-perfect UI components.",
    },
    {
      id: "3",
      role: "Junior Developer",
      company: "Digital Agency",
      startDate: "2018-01",
      endDate: "2019-05",
      description: "Developed landing pages and marketing websites. Learned modern frontend technologies and best practices.",
    },
  ],
  educations: [
    {
      id: "1",
      degree: "Bachelor of Science",
      school: "Ho Chi Minh City University of Technology",
      fieldOfStudy: "Computer Science",
      startDate: "2014",
      endDate: "2018",
    },
  ],
  socialLinks: [
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "GitHub", url: "https://github.com" },
    { platform: "Website", url: "https://example.com" },
  ],
};
