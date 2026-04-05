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
    id: "res-001",
    completedAt: "2023-11-20T10:00:00Z",
    totalScore: 85,
    maxScore: 100,
    grade: "B+",
    summary: "Ứng viên có kỹ năng tốt, trả lời rõ ràng phần lớn câu hỏi nhưng cần cải thiện phần System Design.",
    evaluations: [
        {
            questionId: "q1",
            question: "Hãy mô tả khái niệm Virtual DOM trong React.",
            category: "technical",
            userAnswer: "Virtual DOM là một bản sao nhẹ của DOM thực, giúp React tối ưu hóa việc cập nhật giao diện bằng cách so sánh sự khác biệt (diffing) và chỉ re-render những phần thay đổi.",
            overallScore: 9,
            strengths: ["Hiểu đúng bản chất", "Giải thích ngắn gọn"],
            improvements: ["Có thể nhắc thêm về Fiber tree để ghi điểm tuyệt đối"],
            rubricScores: [
                {
                    criterion: "clarity",
                    label: "Độ rõ ràng",
                    score: 9,
                    maxScore: 10,
                    feedback: "Giải thích rất dễ hiểu.",
                    color: "text-[#22c55e]"
                },
                {
                    criterion: "relevance",
                    label: "Sự liên quan",
                    score: 10,
                    maxScore: 10,
                    feedback: "Đi thẳng vào vấn đề.",
                    color: "text-emerald-500"
                },
                {
                    criterion: "structure",
                    label: "Cấu trúc trả lời",
                    score: 8,
                    maxScore: 10,
                    feedback: "Tốt nhưng hơi ngắn.",
                    color: "text-amber-500"
                }
            ]
        }
    ]
};
