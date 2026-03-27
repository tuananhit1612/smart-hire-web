/**
 * ═══════════════════════════════════════════════════════════
 *  Notification Types — Matching backend DTOs
 *
 *  RealtimeEvent<T>  — WebSocket message format
 *  EventType         — Backend event types
 *  NotificationData  — Unified model for UI
 * ═══════════════════════════════════════════════════════════
 */

// ─── WebSocket Event Types ──────────────────────────────

/** Matches backend com.smarthire.backend.shared.enums.EventType */
export enum EventType {
    APPLICATION_SUBMITTED = "APPLICATION_SUBMITTED",
    APPLICATION_STAGE_CHANGED = "APPLICATION_STAGE_CHANGED",
    AI_MATCHING_COMPLETED = "AI_MATCHING_COMPLETED",
    AI_CV_PARSED = "AI_CV_PARSED",
    AI_CV_REVIEWED = "AI_CV_REVIEWED",
}

/** Matches backend com.smarthire.backend.shared.dto.RealtimeEvent<T> */
export interface RealtimeEvent<T = Record<string, unknown>> {
    type: string;
    payload: T;
    timestamp: string;
    triggeredBy: number | null;
}

// ─── Stage Changed Payload ──────────────────────────────

export interface StageChangedPayload {
    applicationId: number;
    jobId: number;
    jobTitle: string;
    fromStage: string;
    toStage: string;
}

// ─── Application Submitted Payload ──────────────────────

export interface ApplicationSubmittedPayload {
    applicationId: number;
    jobId: number;
    jobTitle: string;
    candidateProfileId: number;
    stage: string;
}

// ─── REST API Response (from NotificationController) ────

export interface NotificationResponse {
    id: number;
    type: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    link?: string;
    metadata?: Record<string, unknown>;
}

// ─── Unified Notification Model (for UI) ────────────────

export interface NotificationData {
    id: string;
    type: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    link?: string;
    metadata?: Record<string, unknown>;
    /** True if this notification came from a realtime WebSocket event */
    isRealtime?: boolean;
}

// ─── Connection Status ──────────────────────────────────

export type SocketConnectionStatus = "connecting" | "connected" | "disconnected" | "error";
