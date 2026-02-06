// src/features/employer/types/mock-applicants.ts

import { ApplicationStatus, ApplicationStage } from "@/shared/types/application";

export interface AIAnalysis {
    readonly matchScore: number; // 0-100
    readonly strengths: string[];
    readonly gaps: string[];
    readonly summary: string;
}

export interface EmployerApplicant {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly avatarUrl?: string;
    readonly appliedAt: string; // ISO 8601
    readonly status: ApplicationStatus;
    readonly currentTitle: string;
    readonly experienceYears: number;
    readonly skills: string[];
    readonly aiAnalysis: AIAnalysis;
    readonly cvUrl: string;
}

export const mockEmployerApplicants: ReadonlyArray<EmployerApplicant> = [
    {
        id: "cand-001",
        name: "Nguyễn Văn A",
        email: "nguyen.a@example.com",
        phone: "0901234567",
        avatarUrl: "https://i.pravatar.cc/150?u=cand001",
        appliedAt: "2026-02-05T09:00:00Z",
        status: ApplicationStage.APPLIED,
        currentTitle: "Senior Frontend Developer",
        experienceYears: 5,
        skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        cvUrl: "#",
        aiAnalysis: {
            matchScore: 92,
            strengths: ["Strong React ecosystem knowledge", "5 years experience matches Senior level", "Experience with exact tech stack"],
            gaps: [],
            summary: "Ứng viên rất phù hợp về mặt kỹ thuật. Kinh nghiệm dày dạn với React/Next.js."
        }
    },
    {
        id: "cand-002",
        name: "Trần Thị B",
        email: "tran.b@example.com",
        phone: "0909876543",
        avatarUrl: "https://i.pravatar.cc/150?u=cand002",
        appliedAt: "2026-02-04T14:30:00Z",
        status: ApplicationStage.SCREENING,
        currentTitle: "Frontend Developer",
        experienceYears: 2,
        skills: ["React", "JavaScript", "CSS", "Redux"],
        cvUrl: "#",
        aiAnalysis: {
            matchScore: 75,
            strengths: ["Solid React fundamentals", "Good cultural fit potential"],
            gaps: ["Lacks TypeScript experience", "Experience below Senior requirement"],
            summary: "Ứng viên tiềm năng nhưng cần đào tạo thêm về TypeScript. Phù hợp vị trí Mid-level hơn."
        }
    },
    {
        id: "cand-003",
        name: "Lê Văn C",
        email: "le.c@example.com",
        phone: "0912345678",
        appliedAt: "2026-02-01T10:00:00Z",
        status: ApplicationStage.REJECTED,
        currentTitle: "Web Designer",
        experienceYears: 3,
        skills: ["Figma", "HTML", "CSS", "Basic JS"],
        cvUrl: "#",
        aiAnalysis: {
            matchScore: 45,
            strengths: ["Strong UI/UX design skills"],
            gaps: ["No React/Next.js experience", "Mainly design focused"],
            summary: "Chuyên môn thiên về Design, không đáp ứng yêu cầu lập trình Frontend chuyên sâu."
        }
    },
    {
        id: "cand-004",
        name: "Phạm Minh D",
        email: "pham.d@example.com",
        phone: "0987654321",
        avatarUrl: "https://i.pravatar.cc/150?u=cand004",
        appliedAt: "2026-02-06T08:00:00Z",
        status: ApplicationStage.APPLIED,
        currentTitle: "Fullstack Developer",
        experienceYears: 4,
        skills: ["Node.js", "React", "PostgreSQL", "Docker"],
        cvUrl: "#",
        aiAnalysis: {
            matchScore: 88,
            strengths: ["Fullstack capabilities", "Backend knowledge adds value"],
            gaps: ["Less focus on UI/UX nuances"],
            summary: "Ứng viên Fullstack mạnh, có thể hỗ trợ cả Backend khi cần."
        }
    }
];
