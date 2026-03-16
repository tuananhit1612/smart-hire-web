// Mock evaluation results for AI interview answers

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

function makeRubric(clarity: number, relevance: number, structure: number, feedbacks: [string, string, string]): RubricScore[] {
    return [
        { criterion: "clarity", label: "Rõ ràng", score: clarity, maxScore: 10, feedback: feedbacks[0], color: "sky" },
        { criterion: "relevance", label: "Liên quan", score: relevance, maxScore: 10, feedback: feedbacks[1], color: "violet" },
        { criterion: "structure", label: "Cấu trúc", score: structure, maxScore: 10, feedback: feedbacks[2], color: "emerald" },
    ];
}

export const mockInterviewResult: InterviewResult = {
    id: "result-001",
    completedAt: "2026-02-17T09:00:00Z",
    totalScore: 78,
    maxScore: 100,
    grade: "B+",
    summary: "Bạn thể hiện khá tốt trong buổi phỏng vấn! Câu trả lời phần lớn rõ ràng và có liên quan. Cần cải thiện thêm phần cấu trúc câu trả lời và sử dụng phương pháp STAR cho các câu hỏi behavioral.",
    evaluations: [
        {
            questionId: "q-1",
            question: "Bạn có thể giới thiệu ngắn gọn về bản thân mình không?",
            category: "introduction",
            userAnswer: "Em tên là An, hiện tại đang làm Frontend Developer được 3 năm. Em có kinh nghiệm với React, TypeScript và Next.js. Em đang tìm cơ hội phát triển sự nghiệp ở vị trí Senior.",
            rubricScores: makeRubric(8, 7, 7, [
                "Giới thiệu ngắn gọn, dễ hiểu. Có nêu được kinh nghiệm và mục tiêu.",
                "Câu trả lời phù hợp với câu hỏi tự giới thiệu.",
                "Có thể thêm thành tựu nổi bật để tạo ấn tượng mạnh hơn.",
            ]),
            overallScore: 73,
            strengths: ["Ngắn gọn, đi thẳng vào vấn đề", "Nêu được kinh nghiệm và mục tiêu"],
            improvements: ["Thêm 1-2 thành tựu cụ thể", "Đề cập đến giá trị bạn mang lại cho công ty"],
        },
        {
            questionId: "q-3",
            question: "Bạn có thể mô tả một dự án gần đây mà bạn tự hào nhất không?",
            category: "technical",
            userAnswer: "Dự án gần đây nhất em làm là SmartHire - nền tảng tuyển dụng AI. Em đảm nhiệm toàn bộ Frontend với Next.js 14, sử dụng App Router, Tailwind CSS và Framer Motion. Em đã xây dựng hệ thống component reusable, tích hợp AI matching, CV builder. Kết quả là trang load dưới 2s, Lighthouse score trên 90.",
            rubricScores: makeRubric(9, 9, 8, [
                "Mô tả rất rõ ràng, có tech stack cụ thể và kết quả đo lường được.",
                "Hoàn toàn phù hợp với câu hỏi, thể hiện đúng vai trò và đóng góp.",
                "Câu trả lời follow theo mô hình STAR khá tốt nhưng có thể rõ hơn phần Challenge.",
            ]),
            overallScore: 87,
            strengths: ["Tech stack cụ thể và rõ ràng", "Có metric đo lường kết quả", "Thể hiện ownership"],
            improvements: ["Nêu rõ hơn thách thức đã gặp", "Thêm impact về business (users, revenue)"],
        },
        {
            questionId: "q-4",
            question: "Khi gặp một bug phức tạp trong production, quy trình debug của bạn thường như thế nào?",
            category: "technical",
            userAnswer: "Đầu tiên em sẽ check log và monitoring tool để xác định phạm vi ảnh hưởng. Sau đó reproduce bug trên staging, sử dụng DevTools và debugger để trace. Em sẽ fix và viết test case để đảm bảo không tái lại. Cuối cùng là document lại để team biết.",
            rubricScores: makeRubric(8, 8, 9, [
                "Quy trình rõ ràng, có logic từng bước.",
                "Đúng trọng tâm câu hỏi, thể hiện tư duy có hệ thống.",
                "Cấu trúc tuần tự xuất sắc: Identify → Reproduce → Fix → Prevent.",
            ]),
            overallScore: 83,
            strengths: ["Quy trình có hệ thống", "Có bước phòng ngừa (test, document)", "Tư duy engineering tốt"],
            improvements: ["Có thể cho ví dụ cụ thể một bug đã fix", "Đề cập đến communication với team khi fix"],
        },
        {
            questionId: "q-5",
            question: "Hãy kể về một lần bạn phải làm việc dưới áp lực deadline rất gấp.",
            category: "behavioral",
            userAnswer: "Có lần team em phải ship feature trong 3 ngày thay vì 2 tuần vì client yêu cầu gấp. Em đã chia nhỏ task, ưu tiên core features trước, delegate phần UI cho junior. Kết quả là ship đúng hạn với 90% features.",
            rubricScores: makeRubric(7, 8, 7, [
                "Câu trả lời dễ hiểu nhưng thiếu chi tiết cảm xúc và áp lực thực tế.",
                "Phù hợp với câu hỏi behavioral, có action và result.",
                "Thiếu phần Situation rõ ràng theo mô hình STAR.",
            ]),
            overallScore: 73,
            strengths: ["Có action rõ ràng", "Thể hiện kỹ năng delegation", "Có kết quả cụ thể"],
            improvements: ["Mô tả bối cảnh rõ hơn (dự án gì, team bao nhiêu người)", "Nêu bài học rút ra", "Áp dụng mô hình STAR đầy đủ hơn"],
        },
        {
            questionId: "q-6",
            question: "Bạn đã bao giờ không đồng ý với quyết định của team lead chưa?",
            category: "behavioral",
            userAnswer: "Có, lần lead muốn dùng Redux cho project nhỏ, em nghĩ Zustand đủ rồi. Em đã chuẩn bị so sánh performance, bundle size, DX rồi present cho team. Cuối cùng team đồng ý dùng Zustand và project ship nhanh hơn 2 ngày.",
            rubricScores: makeRubric(9, 9, 8, [
                "Ví dụ cụ thể, có dữ liệu so sánh rõ ràng.",
                "Trả lời đúng trọng tâm, thể hiện kỹ năng giao tiếp và data-driven.",
                "Cấu trúc tốt nhưng có thể thêm phần cảm xúc của lead.",
            ]),
            overallScore: 87,
            strengths: ["Ví dụ cụ thể từ thực tế", "Cách tiếp cận data-driven", "Kết quả đo lường được"],
            improvements: ["Đề cập đến phản ứng của lead", "Nêu cách duy trì quan hệ sau khi bất đồng"],
        },
        {
            questionId: "q-7",
            question: "Nếu được giao một công nghệ hoàn toàn mới, bạn sẽ tiếp cận việc học nó như thế nào?",
            category: "situational",
            userAnswer: "Em sẽ bắt đầu bằng đọc official docs, sau đó làm mini project để hands-on. Song song đó em xem video tutorial và tham gia community. Khi đủ tự tin, em sẽ apply vào dự án thật với scope nhỏ trước rồi mở rộng dần.",
            rubricScores: makeRubric(7, 7, 8, [
                "Có kế hoạch học tập nhưng hơi chung chung.",
                "Phù hợp câu hỏi, thể hiện khả năng tự học.",
                "Trình tự từ cơ bản đến nâng cao rất logic.",
            ]),
            overallScore: 73,
            strengths: ["Kế hoạch có lộ trình rõ ràng", "Kết hợp nhiều phương pháp học"],
            improvements: ["Cho ví dụ cụ thể một công nghệ đã học theo cách này", "Đề cập đến timeline cụ thể", "Nêu cách đánh giá tiến độ học"],
        },
    ],
};
