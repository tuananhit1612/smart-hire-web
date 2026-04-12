/**
 * ═══════════════════════════════════════════════════════════
 *  Shared Enums — Single source of truth for backend enums
 *
 *  Mirrors: com.smarthire.backend.shared.enums.*
 *  Every enum here matches its Java counterpart exactly.
 * ═══════════════════════════════════════════════════════════
 */

// ─── Auth ────────────────────────────────────────────────
export type Role = "CANDIDATE" | "HR" | "ADMIN";

// ─── Profile / Candidate ─────────────────────────────────
export type Gender = "MALE" | "FEMALE" | "OTHER";
export type ProficiencyLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";

// ─── Job ─────────────────────────────────────────────────
export type JobType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";
export type JobLevel = "INTERN" | "JUNIOR" | "MID" | "SENIOR" | "LEAD" | "MANAGER";
export type JobStatus = "DRAFT" | "OPEN" | "CLOSED";
export type SkillType = "MUST_HAVE" | "NICE_TO_HAVE";

// ─── Application ─────────────────────────────────────────
export type ApplicationStage =
  | "APPLIED"
  | "SCREENING"
  | "INTERVIEW"
  | "OFFER"
  | "HIRED"
  | "REJECTED";

// ─── Interview ───────────────────────────────────────────
export type InterviewStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

// ─── CV ──────────────────────────────────────────────────
export type CvFileType = "PDF" | "DOCX";
export type CvSource = "UPLOAD" | "BUILDER";

// ─── Company ─────────────────────────────────────────────
export type CompanySize =
  | "STARTUP"
  | "SMALL"
  | "MEDIUM"
  | "LARGE"
  | "ENTERPRISE";

// ─── Onboarding Documents ────────────────────────────────
export type DocumentType =
    | "RESUME_STAMPED"
    | "ID_FRONT"
    | "ID_BACK"
    | "MEDICAL_CERT"
    | "DEGREE"
    | "RESIDENCY_CERT"
    | "OTHER";

export type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";
