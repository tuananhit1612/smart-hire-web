// src/features/employer/types/mock-applicants.ts

import { ApplicationStatus, ApplicationStage } from "@/shared/types/application";

export interface AIAnalysis {
    readonly matchScore: number; // 0-100
    readonly strengths: string[];
    readonly gaps: string[];
    readonly summary: string;
    readonly breakdown: {
        skillMatch: number;      // 0-100
        experienceMatch: number; // 0-100
        semanticMatch: number;   // 0-100 (Culture/Communication)
    };
}

export interface ApplicantNote {
    id: string;
    author: string;
    text: string;
    createdAt: string;
}

export interface ActivityLog {
    id: string;
    action: string;
    timestamp: string;
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
    readonly notes: ApplicantNote[];
    readonly activities: ActivityLog[];
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
        experienceYears: 6,
        skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
        cvUrl: "#",
        aiAnalysis: {
            matchScore: 96,
            strengths: ["Expert level React/Next.js", "Strong leadership experience", "Perfect tech stack match"],
            gaps: [],
            summary: "Ứng viên hoàn hảo cho vị trí Senior. Kỹ năng chuyên môn xuất sắc và có kinh nghiệm lead team.",
            breakdown: {
                skillMatch: 98,
                experienceMatch: 95,
                semanticMatch: 92
            }
        },
        notes: [
            { id: "n1", author: "HR Recruit", text: "CV rất ấn tượng, nên phỏng vấn sớm.", createdAt: "2026-02-05T10:00:00Z" }
        ],
        activities: [
            { id: "a1", action: "Nộp hồ sơ", timestamp: "2026-02-05T09:00:00Z" }
        ]
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
        skills: ["Node.js", "React", "PostgreSQL", "Docker", "AWS"],
        cvUrl: "#",
        aiAnalysis: {
            matchScore: 88,
            strengths: ["Strong Fullstack profile", "Backend knowledge adds value", "Cloud experience"],
            gaps: ["Less focus on advanced frontend performance"],
            summary: "Ứng viên mạnh, có thể cân được cả task Backend. Phù hợp nếu team cần Fullstack.",
            breakdown: {
                skillMatch: 90,
                experienceMatch: 85,
                semanticMatch: 85
            }
        },
        notes: [],
        activities: [
            { id: "a6", action: "Nộp hồ sơ", timestamp: "2026-02-06T08:00:00Z" }
        ]
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
            matchScore: 72,
            strengths: ["Solid React fundamentals", "Good cultural fit potential"],
            gaps: ["Lacks TypeScript experience", "Experience below Senior requirement"],
            summary: "Tiềm năng nhưng còn non kinh nghiệm (Junior+). Cần đào tạo thêm về TypeScript.",
            breakdown: {
                skillMatch: 75,
                experienceMatch: 60,
                semanticMatch: 85
            }
        },
        notes: [],
        activities: [
            { id: "a2", action: "Nộp hồ sơ", timestamp: "2026-02-04T14:30:00Z" },
            { id: "a3", action: "Chuyển sang Screening", timestamp: "2026-02-05T08:00:00Z" }
        ]
    },
    {
        id: "cand-005",
        name: "Hoàng Văn E",
        email: "hoang.e@example.com",
        phone: "0933333333",
        avatarUrl: "https://i.pravatar.cc/150?u=cand005",
        appliedAt: "2026-02-06T11:00:00Z",
        status: ApplicationStage.APPLIED,
        currentTitle: "Freelance Web Dev",
        experienceYears: 3,
        skills: ["WordPress", "jQuery", "PHP", "Basic React"],
        cvUrl: "#",
        aiAnalysis: {
            matchScore: 65,
            strengths: ["Broad web knowledge", "Good communication"],
            gaps: ["Outdated tech stack", "Minimal Modern React experience"],
            summary: "Kỹ năng hơi cũ so với yêu cầu hiện tại. Phù hợp dự án maintain hơn là dev mới.",
            breakdown: {
                skillMatch: 60,
                experienceMatch: 65,
                semanticMatch: 70
            }
        },
        notes: [],
        activities: [
            { id: "a7", action: "Nộp hồ sơ", timestamp: "2026-02-06T11:00:00Z" }
        ]
    },
    {
        id: "cand-003",
        name: "Lê Văn C",
        email: "le.c@example.com",
        phone: "0912345678",
        appliedAt: "2026-02-01T10:00:00Z",
        status: ApplicationStage.REJECTED,
        currentTitle: "Graphic Designer",
        experienceYears: 3,
        skills: ["Figma", "Photoshop", "HTML", "CSS"],
        cvUrl: "#",
        aiAnalysis: {
            matchScore: 35,
            strengths: ["Great eye for design", "UI/UX mindset"],
            gaps: ["Zero JavaScript programming skills", "Wrong career path application"],
            summary: "Ứng viên là Designer, không có kỹ năng lập trình để làm Frontend Dev.",
            breakdown: {
                skillMatch: 20,
                experienceMatch: 30,
                semanticMatch: 60
            }
        },
        notes: [
            { id: "n2", author: "Lead Dev", text: "Thiếu kiến thức lập trình logic.", createdAt: "2026-02-03T14:00:00Z" }
        ],
        activities: [
            { id: "a4", action: "Nộp hồ sơ", timestamp: "2026-02-01T10:00:00Z" },
            { id: "a5", action: "Từ chối hồ sơ", timestamp: "2026-02-03T15:00:00Z" }
        ]
    }
];
