export enum NotificationType {
    APPLICATION_STATUS = "APPLICATION_STATUS",
    INTERVIEW_INVITE = "INTERVIEW_INVITE",
    AI_ANALYSIS = "AI_ANALYSIS",
    JOB_MATCH = "JOB_MATCH",
    SYSTEM = "SYSTEM",
}

export enum NotificationCategory {
    APPLIED = "APPLIED",
    SHORTLISTED = "SHORTLISTED",
    REJECTED = "REJECTED",
    VIEWED = "VIEWED",
    INTERVIEW_SCHEDULED = "INTERVIEW_SCHEDULED",
    INTERVIEW_REMINDER = "INTERVIEW_REMINDER",
    INTERVIEW_RESCHEDULED = "INTERVIEW_RESCHEDULED",
    INTERVIEW_CANCELLED = "INTERVIEW_CANCELLED",
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

export const mockNotifications: Notification[] = [];
