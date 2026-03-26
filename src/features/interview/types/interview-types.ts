/**
 * ═════════════════════════════════════════════════════════
 *  Interview Types — Matches BE DTOs exactly
 *  Source: InterviewController.java, InterviewResponse.java,
 *          CreateInterviewRequest.java, UpdateInterviewRequest.java
 * ═════════════════════════════════════════════════════════
 */

/** Maps to BE enum InterviewStatus */
export type InterviewStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

/** Maps to BE InterviewResponse DTO */
export interface InterviewResponse {
    id: number;
    applicationId: number;
    createdBy: number;
    roomName: string;
    roomCode: string;
    scheduledAt: string; // ISO datetime from BE LocalDateTime
    durationMinutes: number;
    meetingUrl: string | null;
    note: string | null;
    status: InterviewStatus;
    createdAt: string;
    updatedAt: string;
}

/** Maps to BE CreateInterviewRequest DTO */
export interface CreateInterviewRequest {
    applicationId: number;
    roomName: string;
    scheduledAt: string; // ISO datetime
    durationMinutes?: number;
    meetingUrl?: string;
    note?: string;
}

/** Maps to BE UpdateInterviewRequest DTO */
export interface UpdateInterviewRequest {
    roomName?: string;
    scheduledAt?: string;
    durationMinutes?: number;
    meetingUrl?: string;
    note?: string;
}
