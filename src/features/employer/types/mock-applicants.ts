import { ApplicationStatus, ApplicationStage } from "@/shared/types/application";

export interface AIAnalysis {
    readonly matchScore: number;
    readonly strengths: string[];
    readonly gaps: string[];
    readonly summary: string;
    readonly breakdown: {
        skillMatch: number;
        experienceMatch: number;
        semanticMatch: number;
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
    readonly id: string | number;
    readonly jobId?: string | number;
    readonly jobTitle?: string;
    readonly fullName?: string;
    readonly name?: string;
    readonly email: string;
    readonly phone: string;
    readonly avatarUrl?: string;
    readonly appliedAt: string;
    readonly stage?: ApplicationStage;
    readonly status?: ApplicationStage;
    readonly currentTitle: string;
    readonly experienceYears: number;
    readonly skills: string[];
    readonly aiAnalysis: AIAnalysis;
    readonly cvUrl?: string;
    readonly notes: ApplicantNote[];
    readonly activities: ActivityLog[];
}

export const mockEmployerApplicants: ReadonlyArray<EmployerApplicant> = [];
