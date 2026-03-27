export interface RubricScore {
    readonly criterion: string;
    readonly label: string;
    readonly score: number;
    readonly maxScore: number;
    readonly feedback: string;
    readonly color: string;
}

export interface AnswerEvaluation {
    readonly questionId: string;
    readonly question: string;
    readonly category: "introduction" | "technical" | "behavioral" | "situational" | "closing";
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

export const mockInterviewResult: InterviewResult = {
    id: "",
    completedAt: "",
    totalScore: 0,
    maxScore: 100,
    grade: "C",
    summary: "",
    evaluations: [],
};
