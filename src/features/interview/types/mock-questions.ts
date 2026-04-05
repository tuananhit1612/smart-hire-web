export interface InterviewQuestion {
    readonly id: string;
    readonly question: string;
    readonly category: "introduction" | "technical" | "behavioral" | "situational" | "closing";
    readonly hint?: string;
}

export const mockInterviewQuestions: InterviewQuestion[] = [];
