// Mock interview report summary data

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

export const mockInterviewReport: InterviewReport = {
    id: "report-001",
    candidateName: "Lê Văn An",
    position: "Senior Frontend Developer",
    company: "TechViet Solutions",
    completedAt: "2026-02-17T09:00:00Z",
    overallScore: 78,
    maxScore: 100,
    verdict: "recommended",
    verdictLabel: "Khuyến nghị nhận",
    skillRadar: [
        { skill: "Giao tiếp", score: 82, maxScore: 100 },
        { skill: "Kỹ thuật", score: 85, maxScore: 100 },
        { skill: "Giải quyết vấn đề", score: 78, maxScore: 100 },
        { skill: "Teamwork", score: 75, maxScore: 100 },
        { skill: "Tự học", score: 70, maxScore: 100 },
        { skill: "Leadership", score: 65, maxScore: 100 },
    ],
    strengths: [
        {
            id: "s-1",
            title: "Kiến thức kỹ thuật vững vàng",
            description: "Thể hiện hiểu biết sâu về React, TypeScript và modern web technologies. Có khả năng so sánh framework một cách có dữ liệu.",
            evidence: "Câu trả lời về dự án SmartHire và so sánh Redux vs Zustand cho thấy kinh nghiệm thực tế mạnh.",
            icon: "brain",
        },
        {
            id: "s-2",
            title: "Tư duy có hệ thống",
            description: "Quy trình debug và giải quyết vấn đề được trình bày logic, tuần tự từ identify → reproduce → fix → prevent.",
            evidence: "Câu trả lời về debug production bug thể hiện methodology rõ ràng.",
            icon: "target",
        },
        {
            id: "s-3",
            title: "Data-driven decision making",
            description: "Có xu hướng dùng dữ liệu và metric để support cho quyết định. Đo lường kết quả bằng con số cụ thể.",
            evidence: "Lighthouse score > 90, load time < 2s, ship nhanh hơn 2 ngày khi dùng Zustand.",
            icon: "zap",
        },
        {
            id: "s-4",
            title: "Ownership & Trách nhiệm",
            description: "Thể hiện sự chủ động trong công việc, đảm nhận toàn bộ frontend và delegate task cho junior.",
            evidence: "Đảm nhiệm toàn bộ Frontend SmartHire, chủ động chia task khi deadline gấp.",
            icon: "trophy",
        },
    ],
    weaknesses: [
        {
            id: "w-1",
            title: "Thiếu phương pháp STAR cho câu hỏi behavioral",
            description: "Các câu trả lời behavioral thường thiếu phần Situation rõ ràng và bài học rút ra.",
            impact: "high",
            suggestion: "Luyện tập trả lời theo mô hình STAR: Situation → Task → Action → Result cho mỗi câu hỏi behavioral.",
        },
        {
            id: "w-2",
            title: "Chưa thể hiện kỹ năng leadership rõ ràng",
            description: "Ứng viên chủ yếu nói về công việc cá nhân, chưa thể hiện nhiều về việc mentor hay dẫn dắt team.",
            impact: "medium",
            suggestion: "Chuẩn bị ví dụ về mentoring junior, tech talks, hoặc dẫn dắt initiatives trong team.",
        },
        {
            id: "w-3",
            title: "Câu trả lời self-introduction còn generic",
            description: "Phần giới thiệu bản thân chưa có hook ấn tượng, thiếu thành tựu nổi bật tạo sự khác biệt.",
            impact: "medium",
            suggestion: "Mở đầu bằng 1-2 thành tựu ấn tượng nhất, sau đó mới đi vào chi tiết kinh nghiệm.",
        },
        {
            id: "w-4",
            title: "Thiếu liên hệ business impact",
            description: "Kết quả thường được đo bằng technical metric, chưa liên hệ đến business value (users, revenue, conversion).",
            impact: "low",
            suggestion: "Thêm business metrics: số users, tỉ lệ conversion, revenue impact khi nói về kết quả dự án.",
        },
    ],
    recommendations: [
        {
            id: "r-1",
            title: "Luyện tập phương pháp STAR",
            description: "Đây là kỹ năng quan trọng nhất cần cải thiện. Hầu hết các công ty lớn đều đánh giá theo mô hình này.",
            priority: "critical",
            actionItems: [
                "Viết sẵn 5-7 câu chuyện STAR từ kinh nghiệm thực tế",
                "Luyện nói thành tiếng, quay video và tự review",
                "Mỗi câu chuyện nên dưới 2 phút",
                "Bao gồm cả cảm xúc và suy nghĩ của bản thân",
            ],
            resources: [
                "STAR Method Interview Guide — Harvard Business Review",
                "Behavioral Interview Questions — Glassdoor",
            ],
        },
        {
            id: "r-2",
            title: "Chuẩn bị Leadership Stories",
            description: "Vị trí Senior đòi hỏi thể hiện khả năng dẫn dắt. Cần chuẩn bị ví dụ cụ thể.",
            priority: "important",
            actionItems: [
                "Chuẩn bị 3 ví dụ về mentoring junior developers",
                "Nêu được tech decisions đã influence cả team",
                "Chia sẻ về code review process và việc nâng cao chất lượng team",
            ],
        },
        {
            id: "r-3",
            title: "Xây dựng Elevator Pitch ấn tượng",
            description: "30 giây đầu quyết định ấn tượng. Cần một phần giới thiệu thật sự nổi bật.",
            priority: "important",
            actionItems: [
                "Viết 3 versions: 30 giây, 1 phút, 2 phút",
                "Bắt đầu bằng thành tựu ấn tượng nhất",
                "Kết thúc bằng giá trị bạn mang lại cho company",
            ],
        },
        {
            id: "r-4",
            title: "Bổ sung Business Metrics",
            description: "Nâng câu trả lời từ technical perspective lên business perspective sẽ tạo ấn tượng mạnh hơn.",
            priority: "nice-to-have",
            actionItems: [
                "Cho mỗi dự án, tìm 1-2 business metrics liên quan",
                "Liên hệ technical decisions với business outcomes",
                "Học cách frame kết quả theo ROI hoặc cost saving",
            ],
        },
    ],
    aiSummary:
        "Ứng viên Lê Văn An thể hiện nền tảng kỹ thuật vững vàng với kinh nghiệm thực tế phong phú trong React ecosystem. Điểm mạnh nổi bật là tư duy có hệ thống và khả năng ra quyết định dựa trên dữ liệu. Cần cải thiện kỹ năng trình bày theo mô hình STAR và thể hiện nhiều hơn về leadership experience để phù hợp với vị trí Senior. Nhìn chung, ứng viên có tiềm năng tốt và được khuyến nghị nhận với điều kiện cải thiện soft skills trong 3 tháng đầu.",
};
