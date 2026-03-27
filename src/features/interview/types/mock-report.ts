export interface SkillRadar {
    readonly skill: string;
    readonly score: number;
    readonly maxScore: number;
}

export interface ReportStrength {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly evidence: string;
    readonly icon: "star" | "zap" | "target" | "trophy" | "brain";
}

export interface ReportWeakness {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly impact: "high" | "medium" | "low";
    readonly suggestion: string;
}

export interface Recommendation {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly priority: "critical" | "important" | "nice-to-have";
    readonly actionItems: string[];
    readonly resources?: string[];
}

export interface InterviewReport {
    readonly id: string;
    readonly candidateName: string;
    readonly position: string;
    readonly company: string;
    readonly completedAt: string;
    readonly overallScore: number;
    readonly maxScore: number;
    readonly verdict: "highly-recommended" | "recommended" | "conditional" | "not-recommended";
    readonly verdictLabel: string;
    readonly skillRadar: SkillRadar[];
    readonly strengths: ReportStrength[];
    readonly weaknesses: ReportWeakness[];
    readonly recommendations: Recommendation[];
    readonly aiSummary: string;
}

export const mockInterviewReport: InterviewReport = {
    id: "",
    candidateName: "",
    position: "",
    company: "",
    completedAt: "",
    overallScore: 0,
    maxScore: 100,
    verdict: "conditional",
    verdictLabel: "",
    skillRadar: [],
    strengths: [],
    weaknesses: [],
    recommendations: [],
    aiSummary: "",
};
