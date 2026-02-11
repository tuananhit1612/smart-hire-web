// Notification types & mock data for F11-1102

export enum NotificationType {
    APPLICATION_STATUS = "APPLICATION_STATUS",
    INTERVIEW_INVITE = "INTERVIEW_INVITE",
    AI_ANALYSIS = "AI_ANALYSIS",
    JOB_MATCH = "JOB_MATCH",
    SYSTEM = "SYSTEM",
}

export interface Notification {
    readonly id: string;
    readonly type: NotificationType;
    readonly title: string;
    readonly message: string;
    isRead: boolean;
    readonly createdAt: string;
    readonly link?: string;
}

export const mockNotifications: Notification[] = [
    {
        id: "notif-001",
        type: NotificationType.APPLICATION_STATUS,
        title: "Hồ sơ đã được xem",
        message: "Nhà tuyển dụng FPT Software đã xem hồ sơ ứng tuyển vị trí Senior Frontend Developer của bạn.",
        isRead: false,
        createdAt: "2026-02-10T14:30:00Z",
        link: "/applications",
    },
    {
        id: "notif-002",
        type: NotificationType.INTERVIEW_INVITE,
        title: "Lời mời phỏng vấn",
        message: "Bạn được mời phỏng vấn vòng Technical tại VNG Corporation vào 15/02/2026, 10:00 AM.",
        isRead: false,
        createdAt: "2026-02-10T10:00:00Z",
        link: "/applications",
    },
    {
        id: "notif-003",
        type: NotificationType.AI_ANALYSIS,
        title: "AI đã phân tích CV",
        message: "Kết quả AI Matching cho vị trí Fullstack Developer: Điểm phù hợp 88%. Xem chi tiết ngay.",
        isRead: false,
        createdAt: "2026-02-09T16:45:00Z",
        link: "/applications",
    },
    {
        id: "notif-004",
        type: NotificationType.JOB_MATCH,
        title: "Việc làm phù hợp mới",
        message: "Có 3 vị trí React Developer mới phù hợp với hồ sơ của bạn. Xem ngay!",
        isRead: false,
        createdAt: "2026-02-09T09:00:00Z",
        link: "/jobs",
    },
    {
        id: "notif-005",
        type: NotificationType.APPLICATION_STATUS,
        title: "Chuyển sang vòng Screening",
        message: "Hồ sơ của bạn tại Tiki đã được chuyển sang vòng Screening. Chúc bạn may mắn!",
        isRead: true,
        createdAt: "2026-02-08T11:20:00Z",
        link: "/applications",
    },
    {
        id: "notif-006",
        type: NotificationType.SYSTEM,
        title: "Cập nhật hệ thống",
        message: "SmartHire vừa ra mắt tính năng CV Builder mới. Tạo CV chuyên nghiệp chỉ trong 5 phút!",
        isRead: true,
        createdAt: "2026-02-07T08:00:00Z",
        link: "/cv-builder",
    },
    {
        id: "notif-007",
        type: NotificationType.AI_ANALYSIS,
        title: "Gợi ý cải thiện CV",
        message: "AI phát hiện CV của bạn thiếu phần Projects. Thêm dự án để tăng điểm matching lên 15%.",
        isRead: true,
        createdAt: "2026-02-06T14:00:00Z",
        link: "/cv-builder",
    },
    {
        id: "notif-008",
        type: NotificationType.APPLICATION_STATUS,
        title: "Hồ sơ bị từ chối",
        message: "Rất tiếc, hồ sơ ứng tuyển vị trí Backend Developer tại Shopee không phù hợp lần này.",
        isRead: true,
        createdAt: "2026-02-05T10:30:00Z",
        link: "/applications",
    },
    {
        id: "notif-009",
        type: NotificationType.INTERVIEW_INVITE,
        title: "Nhắc nhở phỏng vấn",
        message: "Phỏng vấn vòng HR tại NashTech sẽ diễn ra vào ngày mai, 09:00 AM. Chuẩn bị thật tốt nhé!",
        isRead: true,
        createdAt: "2026-02-04T17:00:00Z",
        link: "/applications",
    },
    {
        id: "notif-010",
        type: NotificationType.JOB_MATCH,
        title: "Cơ hội việc làm hot",
        message: "Vị trí Tech Lead tại MoMo vừa đăng tuyển, phù hợp 92% với profile của bạn!",
        isRead: true,
        createdAt: "2026-02-03T12:00:00Z",
        link: "/jobs",
    },
];
