// Notification types & fixtures for F11-1104

export enum NotificationType {
    APPLICATION_STATUS = "APPLICATION_STATUS",
    INTERVIEW_INVITE = "INTERVIEW_INVITE",
    AI_ANALYSIS = "AI_ANALYSIS",
    JOB_MATCH = "JOB_MATCH",
    SYSTEM = "SYSTEM",
}

/**
 * Sub-category for more specific notification context.
 * Used to differentiate notifications within the same type.
 */
export enum NotificationCategory {
    // APPLICATION_STATUS sub-categories
    APPLIED = "APPLIED",
    SCREENING = "SCREENING",
    SHORTLISTED = "SHORTLISTED",
    REJECTED = "REJECTED",
    OFFER = "OFFER",
    VIEWED = "VIEWED",

    // INTERVIEW_INVITE sub-categories
    INTERVIEW_SCHEDULED = "INTERVIEW_SCHEDULED",
    INTERVIEW_REMINDER = "INTERVIEW_REMINDER",
    INTERVIEW_RESCHEDULED = "INTERVIEW_RESCHEDULED",
    INTERVIEW_CANCELLED = "INTERVIEW_CANCELLED",

    // AI & Others
    AI_SCORE = "AI_SCORE",
    AI_SUGGESTION = "AI_SUGGESTION",
    NEW_MATCH = "NEW_MATCH",
    SYSTEM_UPDATE = "SYSTEM_UPDATE",
}

export interface NotificationMetadata {
    readonly company?: string;
    readonly position?: string;
    readonly stage?: string;
    readonly score?: number;
    readonly interviewDate?: string;
    readonly interviewType?: string;
}

export interface Notification {
    readonly id: string;
    readonly type: NotificationType;
    readonly category: NotificationCategory;
    readonly title: string;
    readonly message: string;
    isRead: boolean;
    readonly createdAt: string;
    readonly link?: string;
    readonly metadata?: NotificationMetadata;
}

// ─────────────────────────────────────────────────────────
// FIXTURE GROUP 1: Application Flow (Apply → Stage Updates)
// ─────────────────────────────────────────────────────────

const applyFixtures: Notification[] = [
    {
        id: "fix-apply-001",
        type: NotificationType.APPLICATION_STATUS,
        category: NotificationCategory.APPLIED,
        title: "Ứng tuyển thành công",
        message: "Bạn đã ứng tuyển thành công vị trí Senior Frontend Developer tại FPT Software. Nhà tuyển dụng sẽ xem xét hồ sơ của bạn.",
        isRead: false,
        createdAt: "2026-02-12T10:00:00Z",
        link: "/applications",
        metadata: { company: "FPT Software", position: "Senior Frontend Developer", stage: "Applied" },
    },
    {
        id: "fix-apply-002",
        type: NotificationType.APPLICATION_STATUS,
        category: NotificationCategory.VIEWED,
        title: "Hồ sơ đã được xem",
        message: "Nhà tuyển dụng VNG Corporation đã xem hồ sơ ứng tuyển vị trí Fullstack Developer của bạn.",
        isRead: false,
        createdAt: "2026-02-12T08:30:00Z",
        link: "/applications",
        metadata: { company: "VNG Corporation", position: "Fullstack Developer", stage: "Viewed" },
    },
    {
        id: "fix-apply-003",
        type: NotificationType.APPLICATION_STATUS,
        category: NotificationCategory.APPLIED,
        title: "Ứng tuyển thành công",
        message: "Hồ sơ ứng tuyển vị trí Backend Engineer tại Tiki đã được gửi. Chúc bạn may mắn!",
        isRead: true,
        createdAt: "2026-02-11T14:00:00Z",
        link: "/applications",
        metadata: { company: "Tiki", position: "Backend Engineer", stage: "Applied" },
    },
];

// ─────────────────────────────────────────────────────────
// FIXTURE GROUP 2: Stage Update Flow
// ─────────────────────────────────────────────────────────

const stageUpdateFixtures: Notification[] = [
    {
        id: "fix-stage-001",
        type: NotificationType.APPLICATION_STATUS,
        category: NotificationCategory.SCREENING,
        title: "Chuyển sang vòng Screening",
        message: "Hồ sơ của bạn tại Shopee đã được chuyển sang vòng Screening. HR sẽ liên hệ bạn sớm.",
        isRead: false,
        createdAt: "2026-02-12T09:15:00Z",
        link: "/applications",
        metadata: { company: "Shopee", position: "React Native Developer", stage: "Screening" },
    },
    {
        id: "fix-stage-002",
        type: NotificationType.APPLICATION_STATUS,
        category: NotificationCategory.SHORTLISTED,
        title: "Bạn đã lọt vào Shortlist!",
        message: "Chúc mừng! Hồ sơ của bạn tại MoMo đã được đưa vào danh sách rút gọn cho vị trí Tech Lead.",
        isRead: false,
        createdAt: "2026-02-11T16:00:00Z",
        link: "/applications",
        metadata: { company: "MoMo", position: "Tech Lead", stage: "Shortlisted" },
    },
    {
        id: "fix-stage-003",
        type: NotificationType.APPLICATION_STATUS,
        category: NotificationCategory.OFFER,
        title: "🎉 Bạn nhận được Offer!",
        message: "Chúc mừng! NashTech đã gửi lời mời làm việc cho vị trí Senior Developer. Xem chi tiết ngay!",
        isRead: true,
        createdAt: "2026-02-10T11:00:00Z",
        link: "/applications",
        metadata: { company: "NashTech", position: "Senior Developer", stage: "Offer" },
    },
    {
        id: "fix-stage-004",
        type: NotificationType.APPLICATION_STATUS,
        category: NotificationCategory.REJECTED,
        title: "Hồ sơ không phù hợp",
        message: "Rất tiếc, hồ sơ ứng tuyển vị trí DevOps Engineer tại Grab không phù hợp lần này. Đừng nản, cơ hội khác đang chờ bạn!",
        isRead: true,
        createdAt: "2026-02-09T10:30:00Z",
        link: "/applications",
        metadata: { company: "Grab", position: "DevOps Engineer", stage: "Rejected" },
    },
];

// ─────────────────────────────────────────────────────────
// FIXTURE GROUP 3: Interview Invite Flow
// ─────────────────────────────────────────────────────────

const interviewFixtures: Notification[] = [
    {
        id: "fix-interview-001",
        type: NotificationType.INTERVIEW_INVITE,
        category: NotificationCategory.INTERVIEW_SCHEDULED,
        title: "Lời mời phỏng vấn Technical",
        message: "VNG Corporation mời bạn phỏng vấn vòng Technical cho vị trí Fullstack Developer vào 15/02/2026, 10:00 AM (Online - Google Meet).",
        isRead: false,
        createdAt: "2026-02-12T07:00:00Z",
        link: "/applications",
        metadata: {
            company: "VNG Corporation",
            position: "Fullstack Developer",
            interviewDate: "2026-02-15T10:00:00Z",
            interviewType: "Technical",
        },
    },
    {
        id: "fix-interview-002",
        type: NotificationType.INTERVIEW_INVITE,
        category: NotificationCategory.INTERVIEW_REMINDER,
        title: "Nhắc nhở phỏng vấn ngày mai",
        message: "Phỏng vấn vòng HR tại MoMo sẽ diễn ra vào ngày mai, 09:00 AM. Chuẩn bị thật tốt nhé!",
        isRead: false,
        createdAt: "2026-02-11T18:00:00Z",
        link: "/applications",
        metadata: {
            company: "MoMo",
            position: "Tech Lead",
            interviewDate: "2026-02-12T09:00:00Z",
            interviewType: "HR",
        },
    },
    {
        id: "fix-interview-003",
        type: NotificationType.INTERVIEW_INVITE,
        category: NotificationCategory.INTERVIEW_RESCHEDULED,
        title: "Phỏng vấn được dời lịch",
        message: "Shopee đã dời lịch phỏng vấn vòng Final từ 14/02 sang 18/02/2026, 14:00 PM. Vui lòng xác nhận.",
        isRead: true,
        createdAt: "2026-02-10T15:30:00Z",
        link: "/applications",
        metadata: {
            company: "Shopee",
            position: "React Native Developer",
            interviewDate: "2026-02-18T14:00:00Z",
            interviewType: "Final",
        },
    },
    {
        id: "fix-interview-004",
        type: NotificationType.INTERVIEW_INVITE,
        category: NotificationCategory.INTERVIEW_CANCELLED,
        title: "Phỏng vấn đã bị hủy",
        message: "Lịch phỏng vấn tại Grab cho vị trí DevOps Engineer đã được hủy. Xem chi tiết để biết thêm.",
        isRead: true,
        createdAt: "2026-02-09T08:00:00Z",
        link: "/applications",
        metadata: {
            company: "Grab",
            position: "DevOps Engineer",
            interviewType: "Technical",
        },
    },
];

// ─────────────────────────────────────────────────────────
// FIXTURE GROUP 4: AI & System (supporting)
// ─────────────────────────────────────────────────────────

const otherFixtures: Notification[] = [
    {
        id: "fix-ai-001",
        type: NotificationType.AI_ANALYSIS,
        category: NotificationCategory.AI_SCORE,
        title: "AI đã phân tích CV",
        message: "Kết quả AI Matching cho vị trí Fullstack Developer tại VNG: Điểm phù hợp 88%. Xem chi tiết.",
        isRead: true,
        createdAt: "2026-02-08T16:45:00Z",
        link: "/applications",
        metadata: { company: "VNG Corporation", position: "Fullstack Developer", score: 88 },
    },
    {
        id: "fix-ai-002",
        type: NotificationType.AI_ANALYSIS,
        category: NotificationCategory.AI_SUGGESTION,
        title: "Gợi ý cải thiện CV",
        message: "AI phát hiện CV của bạn thiếu phần Projects. Thêm dự án để tăng điểm matching lên 15%.",
        isRead: true,
        createdAt: "2026-02-07T14:00:00Z",
        link: "/cv-builder",
    },
    {
        id: "fix-job-001",
        type: NotificationType.JOB_MATCH,
        category: NotificationCategory.NEW_MATCH,
        title: "Việc làm phù hợp mới",
        message: "Có 3 vị trí React Developer mới phù hợp với hồ sơ của bạn. Xem ngay!",
        isRead: true,
        createdAt: "2026-02-06T09:00:00Z",
        link: "/jobs",
    },
    {
        id: "fix-sys-001",
        type: NotificationType.SYSTEM,
        category: NotificationCategory.SYSTEM_UPDATE,
        title: "Cập nhật hệ thống",
        message: "SmartHire vừa ra mắt tính năng CV Builder mới. Tạo CV chuyên nghiệp chỉ trong 5 phút!",
        isRead: true,
        createdAt: "2026-02-05T08:00:00Z",
        link: "/cv-builder",
    },
];

// ─────────────────────────────────────────────────────────
// Combined & sorted by createdAt (newest first)
// ─────────────────────────────────────────────────────────

export const mockNotifications: Notification[] = [
    ...applyFixtures,
    ...stageUpdateFixtures,
    ...interviewFixtures,
    ...otherFixtures,
].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
