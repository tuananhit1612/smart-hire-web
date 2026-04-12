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
    id: "rep-001",
    candidateName: "Nguyễn Trung Nghĩa",
    position: "Senior Frontend Engineer",
    company: "TechCorp Vietnam",
    completedAt: "2023-11-20T10:00:00Z",
    overallScore: 85,
    maxScore: 100,
    verdict: "recommended",
    verdictLabel: "Đề xuất tuyển",
    skillRadar: [
        { skill: "React/Next.js", score: 90, maxScore: 100 },
        { skill: "TypeScript", score: 85, maxScore: 100 },
        { skill: "System Design", score: 75, maxScore: 100 },
        { skill: "Problem Solving", score: 88, maxScore: 100 }
    ],
    strengths: [
        {
            id: "s1",
            title: "Kiến thức React vững vàng",
            description: "Giải thích rõ ràng về lifecycles và hooks.",
            evidence: "Trả lời đúng 9/10 câu hỏi React.",
            icon: "star"
        }
    ],
    weaknesses: [
        {
            id: "w1",
            title: "Trải nghiệm System Design hạn chế",
            description: "Chưa có nhiều kinh nghiệm thiết kế hệ thống lớn.",
            impact: "medium",
            suggestion: "Cần được training thêm về kiến trúc Micro-frontends."
        }
    ],
    recommendations: [
        {
            id: "r1",
            title: "Tiếp tục vòng phỏng vấn Culture Fit",
            description: "Ứng viên có kỹ năng cứng tốt, cần đánh giá độ phù hợp văn hóa.",
            priority: "critical",
            actionItems: ["Lên lịch phỏng vấn vòng 2", "Gửi bài test thực tế"]
        }
    ],
    aiSummary: "Ứng viên thể hiện nền tảng kỹ thuật vững chắc, đặc biệt trong hệ sinh thái React. Tuy nhiên cần hỗ trợ thêm về kỹ năng thiết kế phần mềm ở quy mô lớn."
};
