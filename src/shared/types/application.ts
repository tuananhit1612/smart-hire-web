/**
 * ═══════════════════════════════════════════════════════════
 *  Application Types — Re-exports from shared enums
 *
 *  Keeps backwards-compatibility with existing imports while
 *  using the centralized enum definition.
 * ═══════════════════════════════════════════════════════════
 */

import type { ApplicationStage as ApplicationStageType } from "./enums";

/** Re-export as enum for backward compatibility with existing switch/if statements */
export enum ApplicationStage {
    APPLIED = "APPLIED",
    INTERVIEW = "INTERVIEW",
    HIRED = "HIRED",
    REJECTED = "REJECTED",
}

export type ApplicationStatus = ApplicationStageType;
