/**
 * ═══════════════════════════════════════════════════════════
 *  Realtime Event Types — mirrors backend RealtimeEvent<T>
 * ═══════════════════════════════════════════════════════════
 */

/** Event types published by the backend */
export enum EventType {
  NEW_NOTIFICATION = "NEW_NOTIFICATION",
  APPLICATION_SUBMITTED = "APPLICATION_SUBMITTED",
  APPLICATION_STAGE_CHANGED = "APPLICATION_STAGE_CHANGED",
  AI_MATCHING_COMPLETED = "AI_MATCHING_COMPLETED",
  AI_PARSING_COMPLETED = "AI_PARSING_COMPLETED",
  AI_REVIEW_COMPLETED = "AI_REVIEW_COMPLETED",
}

/** Generic realtime event envelope — mirrors RealtimeEvent.java */
export interface RealtimeEvent<T = unknown> {
  /** Event type discriminator */
  type: string;
  /** Event payload — varies by type */
  payload: T;
  /** ISO timestamp of when the event was created */
  timestamp: string;
  /** User ID who triggered this event */
  triggeredBy: number | null;
}

/** Payload for APPLICATION_STAGE_CHANGED events */
export interface StageChangedPayload {
  applicationId: number;
  jobId: number;
  jobTitle: string;
  fromStage: string;
  toStage: string;
}

/** Payload for APPLICATION_SUBMITTED events */
export interface ApplicationSubmittedPayload {
  applicationId: number;
  jobId: number;
  jobTitle: string;
  candidateProfileId: number;
  stage: string;
}
