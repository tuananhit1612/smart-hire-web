/**
 * Interview Fixtures — Expanded question sets & sample evaluations
 *
 * Contains:
 *  - 3 themed question sets (Frontend, Backend, General)
 *  - 5 sample evaluations with varying performance levels
 *  - Helper utilities for selecting fixtures
 */

import type { InterviewQuestion } from "./mock-questions";

// ─── Question Set Types ──────────────────────────────
export interface QuestionSet {
    readonly id: string;
    readonly label: string;
    readonly description: string;
    readonly role: string;
    readonly questions: InterviewQuestion[];
}

// ─── Sample Evaluation Types ─────────────────────────
export interface SampleAnswer {
    readonly questionId: string;
    readonly answer: string;
}

export interface SampleRubric {
    readonly clarity: number;
    readonly relevance: number;
    readonly structure: number;
}

export interface SampleEvaluation {
    readonly id: string;
    readonly label: string;
    readonly performanceLevel: "excellent" | "good" | "average" | "below-average" | "poor";
    readonly overallScore: number;
    readonly grade: string;
    readonly setId: string;
    readonly answers: {
        readonly questionId: string;
        readonly answer: string;
        readonly rubric: SampleRubric;
        readonly score: number;
        readonly strengths: string[];
        readonly improvements: string[];
    }[];
}

// ═══════════════════════════════════════════════════════
//  QUESTION SET 1 — Frontend Developer
// ═══════════════════════════════════════════════════════
export const frontendQuestionSet: QuestionSet = {
    id: "qs-frontend",
    label: "Frontend Developer",
    description: "Câu hỏi tập trung vào React, UI/UX, performance và kiến trúc frontend.",
    role: "Frontend Developer",
    questions: [
        {
            id: "fe-1",
            category: "introduction",
            question: "Chào bạn! Hãy giới thiệu về bản thân và kinh nghiệm frontend development của bạn.",
        },
        {
            id: "fe-2",
            category: "technical",
            question: "Bạn có thể giải thích sự khác biệt giữa Server-Side Rendering (SSR), Static Site Generation (SSG) và Client-Side Rendering (CSR)? Khi nào bạn sẽ chọn mỗi phương pháp?",
            hint: "Đề cập đến SEO, hiệu suất, trải nghiệm người dùng và use cases cụ thể.",
        },
        {
            id: "fe-3",
            category: "technical",
            question: "Hãy mô tả cách bạn tối ưu performance cho một ứng dụng React lớn. Bạn đã áp dụng những kỹ thuật nào?",
            hint: "Code splitting, lazy loading, memoization, virtual scrolling, image optimization.",
        },
        {
            id: "fe-4",
            category: "technical",
            question: "Bạn quản lý state trong ứng dụng React như thế nào? So sánh các cách tiếp cận mà bạn đã sử dụng.",
            hint: "useState, useReducer, Context, Zustand, Redux, React Query — pros/cons của mỗi cái.",
        },
        {
            id: "fe-5",
            category: "behavioral",
            question: "Kể về một lần bạn phải refactor một component phức tạp. Quy trình bạn đã follow là gì?",
            hint: "Cách tiếp cận: viết tests trước, refactor từng phần, đảm bảo backward compatibility.",
        },
        {
            id: "fe-6",
            category: "behavioral",
            question: "Bạn xử lý feedback từ designer về UI/UX như thế nào khi bạn nghĩ đó không phải là cách tốt nhất?",
            hint: "Kỹ năng giao tiếp cross-functional và trình bày ý kiến kỹ thuật.",
        },
        {
            id: "fe-7",
            category: "situational",
            question: "Nếu ứng dụng của bạn bị reported là chậm trên mobile devices, bạn sẽ tiếp cận vấn đề này như thế nào?",
            hint: "Profiling, Lighthouse, network throttling, giảm bundle size, responsive images.",
        },
        {
            id: "fe-8",
            category: "situational",
            question: "Team bạn đang dùng một UI library cũ và muốn migrate sang một library mới. Bạn sẽ lên kế hoạch như thế nào?",
            hint: "Incremental migration, adapter pattern, parallel running, rollback strategy.",
        },
        {
            id: "fe-9",
            category: "technical",
            question: "Hãy giải thích về accessibility (a11y) trong web. Bạn đã implement những gì để đảm bảo ứng dụng accessible?",
            hint: "ARIA labels, keyboard navigation, screen reader, color contrast, semantic HTML.",
        },
        {
            id: "fe-10",
            category: "closing",
            question: "Cảm ơn bạn! Bạn có muốn chia sẻ thêm điều gì về bản thân hoặc hỏi về vị trí này không?",
        },
    ],
};

// ═══════════════════════════════════════════════════════
//  QUESTION SET 2 — Backend Developer
// ═══════════════════════════════════════════════════════
export const backendQuestionSet: QuestionSet = {
    id: "qs-backend",
    label: "Backend Developer",
    description: "Câu hỏi về API design, database, security, scalability và system design.",
    role: "Backend Developer",
    questions: [
        {
            id: "be-1",
            category: "introduction",
            question: "Chào bạn! Hãy giới thiệu về kinh nghiệm backend development và tech stack bạn thường sử dụng.",
        },
        {
            id: "be-2",
            category: "technical",
            question: "Hãy so sánh RESTful API và GraphQL. Khi nào bạn sẽ chọn mỗi cái?",
            hint: "Performance, flexibility, caching, complexity, learning curve, use cases.",
        },
        {
            id: "be-3",
            category: "technical",
            question: "Bạn thiết kế database schema cho một hệ thống e-commerce như thế nào? Hãy mô tả các bảng chính và mối quan hệ.",
            hint: "Normalization, indexing, relationships, considerations cho scale.",
        },
        {
            id: "be-4",
            category: "technical",
            question: "Hãy giải thích cách bạn implement authentication và authorization trong ứng dụng. Những security best practices nào bạn follow?",
            hint: "JWT, OAuth2, RBAC, password hashing, rate limiting, CORS.",
        },
        {
            id: "be-5",
            category: "behavioral",
            question: "Kể về một lần hệ thống bị downtime. Bạn đã xử lý và khắc phục như thế nào?",
            hint: "Incident response, root cause analysis, post-mortem, prevention.",
        },
        {
            id: "be-6",
            category: "behavioral",
            question: "Bạn đã bao giờ phải optimize một query chạy rất chậm không? Quy trình bạn đã làm là gì?",
            hint: "EXPLAIN plan, indexing, query rewriting, caching, denormalization.",
        },
        {
            id: "be-7",
            category: "situational",
            question: "Nếu API endpoint của bạn bất ngờ nhận được traffic gấp 100 lần bình thường, bạn sẽ xử lý thế nào?",
            hint: "Rate limiting, auto-scaling, caching, queue, circuit breaker.",
        },
        {
            id: "be-8",
            category: "situational",
            question: "Bạn cần migrate dữ liệu từ database cũ sang database mới mà không downtime. Bạn sẽ lên kế hoạch như thế nào?",
            hint: "Dual-write, shadow reads, gradual migration, rollback plan.",
        },
        {
            id: "be-9",
            category: "technical",
            question: "Hãy giải thích về microservices. Khi nào nên và không nên sử dụng? Bạn xử lý communication giữa các services như thế nào?",
            hint: "Message queues, gRPC, service mesh, saga pattern, eventual consistency.",
        },
        {
            id: "be-10",
            category: "closing",
            question: "Cảm ơn bạn! Bạn có câu hỏi nào về team, tech stack hoặc văn hóa công ty không?",
        },
    ],
};

// ═══════════════════════════════════════════════════════
//  QUESTION SET 3 — General / Soft Skills
// ═══════════════════════════════════════════════════════
export const generalQuestionSet: QuestionSet = {
    id: "qs-general",
    label: "General / Soft Skills",
    description: "Câu hỏi đánh giá kỹ năng mềm, leadership, teamwork và career goals.",
    role: "Any Role",
    questions: [
        {
            id: "gs-1",
            category: "introduction",
            question: "Hãy kể cho tôi nghe về hành trình sự nghiệp của bạn. Điều gì đã dẫn bạn đến vị trí hiện tại?",
        },
        {
            id: "gs-2",
            category: "behavioral",
            question: "Kể về một lần bạn phải đưa ra quyết định khó khăn mà ảnh hưởng đến cả team. Bạn đã cân nhắc như thế nào?",
            hint: "Thể hiện tư duy phân tích, cân nhắc các stakeholders, và accountability.",
        },
        {
            id: "gs-3",
            category: "behavioral",
            question: "Bạn đã bao giờ thất bại trong một dự án hoặc task chưa? Bạn đã học được gì từ trải nghiệm đó?",
            hint: "Thể hiện sự trung thực, growth mindset, và khả năng rút kinh nghiệm.",
        },
        {
            id: "gs-4",
            category: "behavioral",
            question: "Hãy mô tả cách bạn mentor hoặc giúp đỡ một đồng nghiệp junior. Kết quả như thế nào?",
            hint: "Leadership, patience, teaching approach, measurable outcomes.",
        },
        {
            id: "gs-5",
            category: "situational",
            question: "Nếu hai thành viên trong team có xung đột nghiêm trọng ảnh hưởng đến tiến độ dự án, bạn sẽ xử lý thế nào?",
            hint: "Conflict resolution, active listening, finding common ground.",
        },
        {
            id: "gs-6",
            category: "situational",
            question: "PM yêu cầu bạn commit một deadline mà bạn biết là không thể đạt được. Bạn sẽ phản hồi như thế nào?",
            hint: "Negotiation, data-driven pushback, alternative solutions, managing expectations.",
        },
        {
            id: "gs-7",
            category: "behavioral",
            question: "Bạn quản lý work-life balance như thế nào? Đặc biệt trong những giai đoạn dự án cao điểm?",
            hint: "Self-care, boundaries, prioritization, sustainable pace.",
        },
        {
            id: "gs-8",
            category: "situational",
            question: "Bạn nhận ra rằng technical decision của team lead sẽ gây ra tech debt lớn trong tương lai. Bạn sẽ làm gì?",
            hint: "Respectful challenge, data presentation, long-term thinking.",
        },
        {
            id: "gs-9",
            category: "introduction",
            question: "Mục tiêu nghề nghiệp 3-5 năm tới của bạn là gì? Vị trí này phù hợp với kế hoạch đó như thế nào?",
            hint: "Cụ thể, realistic, liên kết với company và vị trí ứng tuyển.",
        },
        {
            id: "gs-10",
            category: "closing",
            question: "Cảm ơn bạn đã hoàn thành phỏng vấn! Bạn có muốn bổ sung điều gì không?",
        },
    ],
};

// ─── All Question Sets ───────────────────────────────
export const allQuestionSets: QuestionSet[] = [
    frontendQuestionSet,
    backendQuestionSet,
    generalQuestionSet,
];

// ═══════════════════════════════════════════════════════
//  SAMPLE EVALUATIONS — 5 performance levels
// ═══════════════════════════════════════════════════════

export const sampleEvaluations: SampleEvaluation[] = [
    // ── Excellent (90+) ──
    {
        id: "eval-excellent",
        label: "Ứng viên xuất sắc",
        performanceLevel: "excellent",
        overallScore: 92,
        grade: "A+",
        setId: "qs-frontend",
        answers: [
            {
                questionId: "fe-1",
                answer: "Tôi là Minh, Senior Frontend Engineer với 6 năm kinh nghiệm. Thành tựu gần nhất: dẫn dắt team 5 người rebuild hoàn toàn e-commerce platform phục vụ 2M users/tháng, giảm load time 60% và tăng conversion 25%. Expertise: React, TypeScript, Next.js, micro-frontend architecture.",
                rubric: { clarity: 10, relevance: 9, structure: 9 },
                score: 93,
                strengths: ["Giới thiệu ấn tượng với thành tựu cụ thể", "Có metric đo lường rõ ràng", "Thể hiện leadership"],
                improvements: ["Có thể thêm motivation cho vị trí ứng tuyển"],
            },
            {
                questionId: "fe-2",
                answer: "SSR render HTML trên server mỗi request — phù hợp khi content thay đổi thường xuyên và cần SEO (ví dụ: product pages). SSG generate HTML lúc build — tốt cho content ít thay đổi như blog, docs. CSR render hoàn toàn trên client — phù hợp cho dashboard, admin panel không cần SEO. Trong dự án gần đây, tôi dùng hybrid: SSG cho landing + blog, SSR cho product catalog, CSR cho dashboard. Kết quả: TTFB giảm 70%, SEO score tăng từ 45 lên 92.",
                rubric: { clarity: 10, relevance: 10, structure: 10 },
                score: 100,
                strengths: ["Giải thích rõ ràng, dễ hiểu", "Ví dụ thực tế cụ thể", "Có metric đo lường"],
                improvements: [],
            },
            {
                questionId: "fe-5",
                answer: "Gần đây tôi refactor một OrderForm component 1200 dòng thành 8 components nhỏ. Quy trình: (1) Viết integration tests bao phủ toàn bộ flows hiện tại. (2) Extract từng section thành component riêng, chạy tests sau mỗi bước. (3) Tạo shared hooks cho logic chung (useFormValidation, useOrderCalculation). (4) Review với team, merge từng PR nhỏ. Kết quả: test coverage tăng từ 30% lên 85%, thời gian onboard dev mới giảm 50% vì code dễ hiểu hơn.",
                rubric: { clarity: 9, relevance: 10, structure: 10 },
                score: 97,
                strengths: ["Follow STAR methodology hoàn hảo", "Có process rõ ràng", "Kết quả đo lường được"],
                improvements: ["Có thể đề cập risk assessment trước khi refactor"],
            },
        ],
    },

    // ── Good (75-89) ──
    {
        id: "eval-good",
        label: "Ứng viên khá",
        performanceLevel: "good",
        overallScore: 78,
        grade: "B+",
        setId: "qs-frontend",
        answers: [
            {
                questionId: "fe-1",
                answer: "Em tên là An, làm Frontend Developer được 3 năm. Em có kinh nghiệm với React, TypeScript và Next.js. Gần đây em làm dự án SmartHire, đảm nhiệm toàn bộ frontend. Em đang tìm cơ hội phát triển lên Senior.",
                rubric: { clarity: 8, relevance: 7, structure: 7 },
                score: 73,
                strengths: ["Ngắn gọn, đi thẳng vào vấn đề", "Có kinh nghiệm rõ ràng"],
                improvements: ["Thêm thành tựu cụ thể", "Nêu giá trị mang lại cho company"],
            },
            {
                questionId: "fe-3",
                answer: "Em đã áp dụng code splitting với React.lazy và Suspense cho các routes. Sử dụng React.memo cho heavy components. Optimize images bằng next/image. Sử dụng useMemo và useCallback để tránh re-render không cần thiết. Kết quả Lighthouse score trên 90.",
                rubric: { clarity: 8, relevance: 8, structure: 7 },
                score: 77,
                strengths: ["Liệt kê được nhiều kỹ thuật", "Có metric kết quả"],
                improvements: ["Giải thích khi nào dùng kỹ thuật nào", "Thêm trade-offs của mỗi approach"],
            },
            {
                questionId: "fe-6",
                answer: "Khi designer đưa feedback mà em nghĩ không tốt, em sẽ chuẩn bị data để support ý kiến của mình. Ví dụ so sánh A/B test, user feedback. Sau đó present cho designer và team cùng thảo luận. Cuối cùng team sẽ quyết định dựa trên data.",
                rubric: { clarity: 7, relevance: 8, structure: 7 },
                score: 73,
                strengths: ["Cách tiếp cận data-driven", "Tôn trọng quy trình team"],
                improvements: ["Cần ví dụ cụ thể hơn", "Thêm kết quả của lần đó"],
            },
        ],
    },

    // ── Average (60-74) ──
    {
        id: "eval-average",
        label: "Ứng viên trung bình",
        performanceLevel: "average",
        overallScore: 65,
        grade: "C+",
        setId: "qs-backend",
        answers: [
            {
                questionId: "be-1",
                answer: "Em là Hùng, em làm backend được 2 năm. Em chủ yếu dùng Node.js và Express. Em cũng biết MongoDB và PostgreSQL. Em muốn tìm công việc tốt hơn.",
                rubric: { clarity: 6, relevance: 6, structure: 5 },
                score: 57,
                strengths: ["Có nền tảng kỹ thuật"],
                improvements: ["Quá ngắn gọn, thiếu chi tiết", "Không có thành tựu", "Motivation quá chung chung"],
            },
            {
                questionId: "be-2",
                answer: "REST thì dùng HTTP methods như GET, POST, PUT, DELETE. GraphQL thì dùng queries và mutations. REST đơn giản hơn, GraphQL linh hoạt hơn. Em thường dùng REST vì đơn giản.",
                rubric: { clarity: 6, relevance: 7, structure: 6 },
                score: 63,
                strengths: ["Hiểu cơ bản về cả hai"],
                improvements: ["Thiếu so sánh chi tiết", "Cần ví dụ use case cụ thể", "Không đề cập performance, caching"],
            },
            {
                questionId: "be-5",
                answer: "Có lần server bị down vì hết memory. Em restart server và tăng RAM. Sau đó em thêm monitoring để biết sớm hơn.",
                rubric: { clarity: 6, relevance: 6, structure: 5 },
                score: 57,
                strengths: ["Có giải pháp ngắn hạn"],
                improvements: ["Thiếu root cause analysis", "Không nêu impact và timeline", "Thiếu post-mortem process"],
            },
        ],
    },

    // ── Below Average (40-59) ──
    {
        id: "eval-below-average",
        label: "Ứng viên dưới trung bình",
        performanceLevel: "below-average",
        overallScore: 48,
        grade: "D",
        setId: "qs-general",
        answers: [
            {
                questionId: "gs-1",
                answer: "Em học CNTT, ra trường đi làm 1 năm. Trước đó em làm freelance.",
                rubric: { clarity: 4, relevance: 4, structure: 3 },
                score: 37,
                strengths: ["Trung thực"],
                improvements: ["Quá ngắn", "Không có chi tiết về kinh nghiệm", "Thiếu passion và direction"],
            },
            {
                questionId: "gs-3",
                answer: "Chưa, em chưa thất bại dự án nào.",
                rubric: { clarity: 5, relevance: 3, structure: 2 },
                score: 33,
                strengths: [],
                improvements: ["Câu trả lời quá ngắn", "Thiếu tự nhận thức", "Mọi người đều có lúc gặp khó — cần thể hiện growth mindset"],
            },
            {
                questionId: "gs-6",
                answer: "Em sẽ cố gắng làm cho xong đúng hạn. Nếu không xong thì báo lại.",
                rubric: { clarity: 5, relevance: 5, structure: 4 },
                score: 47,
                strengths: ["Có ý thức về deadline"],
                improvements: ["Thiếu kỹ năng negotiate", "Cần proactive hơn", "Không đề cập đến giải pháp thay thế"],
            },
        ],
    },

    // ── Poor (<40) ──
    {
        id: "eval-poor",
        label: "Ứng viên yếu",
        performanceLevel: "poor",
        overallScore: 28,
        grade: "D",
        setId: "qs-general",
        answers: [
            {
                questionId: "gs-1",
                answer: "Dạ em tên Tuấn.",
                rubric: { clarity: 3, relevance: 2, structure: 1 },
                score: 20,
                strengths: [],
                improvements: ["Câu trả lời quá ngắn, không có nội dung", "Cần giới thiệu kinh nghiệm, kỹ năng, mục tiêu"],
            },
            {
                questionId: "gs-2",
                answer: "Em chưa gặp tình huống đó.",
                rubric: { clarity: 3, relevance: 2, structure: 1 },
                score: 20,
                strengths: [],
                improvements: ["Không trả lời câu hỏi", "Cần chuẩn bị ví dụ cho behavioral questions"],
            },
            {
                questionId: "gs-5",
                answer: "Em sẽ báo quản lý giải quyết.",
                rubric: { clarity: 4, relevance: 3, structure: 3 },
                score: 33,
                strengths: ["Có escalation awareness"],
                improvements: ["Quá passive", "Cần thể hiện initiative", "Thiếu bước tự giải quyết trước"],
            },
        ],
    },
];

// ─── Utility: get question set by id ─────────────────
export function getQuestionSetById(id: string): QuestionSet | undefined {
    return allQuestionSets.find((qs) => qs.id === id);
}

// ─── Utility: get evaluations by performance level ───
export function getEvaluationsByLevel(level: SampleEvaluation["performanceLevel"]): SampleEvaluation[] {
    return sampleEvaluations.filter((e) => e.performanceLevel === level);
}
