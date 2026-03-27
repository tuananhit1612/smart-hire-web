/**
 * ═════════════════════════════════════════════════════════
 *  Interview UI Types — Shared types for interview screens
 *  These are the non-mock type definitions used across
 *  setup, session, result, and report pages.
 * ═════════════════════════════════════════════════════════
 */

// ─── Chat / Session Types ────────────────────────────

export type QuestionCategory = "introduction" | "technical" | "behavioral" | "situational" | "closing";

export interface InterviewQuestion {
    readonly id: string;
    readonly question: string;
    readonly category: QuestionCategory;
    readonly hint?: string;
}

export interface ChatMessage {
    id: string;
    role: "ai" | "user";
    content: string;
    timestamp: Date;
    category?: QuestionCategory;
}

// ─── Evaluation / Result Types ───────────────────────

export interface RubricScore {
    readonly criterion: string;
    readonly label: string;
    readonly score: number;       // 0-10
    readonly maxScore: number;    // always 10
    readonly feedback: string;
    readonly color: string;       // tailwind color key
}

export interface AnswerEvaluation {
    readonly questionId: string;
    readonly question: string;
    readonly category: QuestionCategory;
    readonly userAnswer: string;
    readonly rubricScores: RubricScore[];
    readonly overallScore: number;
    readonly strengths: string[];
    readonly improvements: string[];
}

export interface InterviewResult {
    readonly id: string;
    readonly completedAt: string;
    readonly totalScore: number;
    readonly maxScore: number;
    readonly grade: "A+" | "A" | "B+" | "B" | "C+" | "C" | "D";
    readonly summary: string;
    readonly evaluations: AnswerEvaluation[];
}

// ─── Report Types ────────────────────────────────────

export interface SkillRadar {
    readonly skill: string;
    readonly score: number;    // 0-100
    readonly maxScore: number; // always 100
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

// ─── Category Label Config ───────────────────────────

export const CATEGORY_LABELS: Record<QuestionCategory, { label: string; color: string }> = {
    introduction: { label: "Giới thiệu", color: "bg-[#22c55e]/10 dark:bg-[#22c55e]/20 text-[#22c55e]" },
    technical: { label: "Kỹ thuật", color: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400" },
    behavioral: { label: "Hành vi", color: "bg-[#FFAB00]/10 dark:bg-[#FFAB00]/20 text-[#FFAB00]" },
    situational: { label: "Tình huống", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" },
    closing: { label: "Kết thúc", color: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400" },
};
