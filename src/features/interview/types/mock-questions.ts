// Mock interview questions for AI interview simulation

export interface InterviewQuestion {
    readonly id: string;
    readonly question: string;
    readonly category: "introduction" | "technical" | "behavioral" | "situational" | "closing";
    readonly hint?: string;
}

export const mockInterviewQuestions: InterviewQuestion[] = [
    {
        id: "q-1",
        category: "introduction",
        question: "Xin chào! Tôi là AI Interviewer của SmartHire. Trước khi bắt đầu, bạn có thể giới thiệu ngắn gọn về bản thân mình không?",
    },
    {
        id: "q-2",
        category: "introduction",
        question: "Điều gì đã thúc đẩy bạn ứng tuyển vào vị trí này? Bạn kỳ vọng gì ở cơ hội này?",
        hint: "Hãy nói về động lực và mục tiêu nghề nghiệp của bạn.",
    },
    {
        id: "q-3",
        category: "technical",
        question: "Bạn có thể mô tả một dự án gần đây mà bạn tự hào nhất không? Vai trò của bạn trong dự án đó là gì?",
        hint: "Sử dụng mô hình STAR: Situation, Task, Action, Result.",
    },
    {
        id: "q-4",
        category: "technical",
        question: "Khi gặp một bug phức tạp trong production, quy trình debug của bạn thường như thế nào?",
        hint: "Chia sẻ cách tiếp cận có hệ thống của bạn.",
    },
    {
        id: "q-5",
        category: "behavioral",
        question: "Hãy kể về một lần bạn phải làm việc dưới áp lực deadline rất gấp. Bạn đã xử lý tình huống đó như thế nào?",
        hint: "Focus vào kỹ năng quản lý thời gian và ưu tiên công việc.",
    },
    {
        id: "q-6",
        category: "behavioral",
        question: "Bạn đã bao giờ không đồng ý với quyết định của team lead hoặc manager chưa? Bạn xử lý như thế nào?",
        hint: "Thể hiện kỹ năng giao tiếp và giải quyết xung đột.",
    },
    {
        id: "q-7",
        category: "situational",
        question: "Nếu bạn được giao một công nghệ hoàn toàn mới mà bạn chưa từng sử dụng, bạn sẽ tiếp cận việc học nó như thế nào?",
        hint: "Cho thấy khả năng tự học và thích nghi.",
    },
    {
        id: "q-8",
        category: "closing",
        question: "Cảm ơn bạn đã hoàn thành buổi phỏng vấn! Bạn có câu hỏi nào muốn hỏi lại không?",
    },
];
