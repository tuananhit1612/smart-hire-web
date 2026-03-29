import { apiClient } from "@/shared/lib/api-client";
import { ApiWrapper } from "@/shared/types/api";

// ── Enums ──
type Severity = "HIGH" | "MEDIUM" | "LOW";
type ItemStatus = "STRONG" | "GOOD" | "IMPROVE" | "WEAK" | "CRITICAL";
type SectionStatus = "STRONG" | "GOOD" | "IMPROVE" | "WEAK";
type ActionType = "KEEP" | "IMPROVE" | "REWRITE" | "MUST_FIX";
type Priority = "HIGH" | "MEDIUM" | "LOW" | "NONE";
type Confidence = "HIGH" | "MEDIUM" | "LOW";

// ── Section Item (per bullet / field) ──
export interface ReviewItem {
  type: "BULLET" | "SECTION" | "FIELD";
  originalText: string;
  status: ItemStatus;
  reason: string;
  action: ActionType;
  priority: Priority;
  confidence: Confidence;
  suggestedText: string | null;
}

// ── Section Breakdown ──
export interface ReviewSection {
  name: string;
  score: number;
  status: SectionStatus;
  items: ReviewItem[];
}

// ── Top Issue ──
export interface TopIssue {
  section: string;
  severity: Severity;
  category: string;
  description: string;
  quote: string;
}

// ── Legacy types (kept for backward compat) ──
export interface CvIssue {
  category: string;
  severity: Severity;
  description: string;
  quote: string;
}

export interface CvSuggestion {
  section: string;
  suggestion: string;
}

// ── Data Completeness Analysis ──
export interface DataCompleteness {
  level: "CRITICAL" | "POOR" | "ADEQUATE" | "GOOD";
  filledSections: number;
  totalExpectedSections: number;
  missingCritical: string[];
  junkEntries: string[];
  verdict: string;
  canOptimize: boolean;
}

// ── Full API Response ──
export interface AiCvReviewResponse {
  id: number;
  cvFileId: number;

  // New structured fields
  overallScore: number;       // 0-100
  atsScore: number;           // 0-100
  sectionScores: string;      // JSON string → ReviewSection[]
  topIssues: string;          // JSON string → TopIssue[]
  dataCompleteness: string;   // JSON string → DataCompleteness

  // Legacy fields
  overallRating: number;
  summary: string;
  strengths: string;          // JSON string → string[]
  weaknesses: string;         // JSON string → string[]
  issues: string;             // JSON string → CvIssue[]
  suggestions: string;        // JSON string → CvSuggestion[]
  createdAt: string;
}
// ── Optimization Response types ──
export interface OptimizedItem {
  originalText: string;
  optimizedText: string;
  action: "KEEP" | "IMPROVED" | "REWRITTEN";
  changeReason: string;
}

export interface OptimizedSection {
  sectionName: string;
  items: OptimizedItem[];
}

export interface OptimizeResponse {
  optimizedSections: OptimizedSection[];
  optimizedSummary: string;
  changeCount: number;
  preservedCount: number;
}

const BASE = "/ai/cv-review";

export const cvAiApi = {
  /** POST /ai/cv-review/:cvFileId — Trigger new AI review */
  triggerReview: (cvFileId: number) =>
    apiClient.post<ApiWrapper<AiCvReviewResponse>>(`${BASE}/${cvFileId}`),

  /** GET /ai/cv-review/:cvFileId — Get latest review */
  getReview: (cvFileId: number) =>
    apiClient.get<ApiWrapper<AiCvReviewResponse>>(`${BASE}/${cvFileId}`),

  /** POST /ai/cv-review/:cvFileId/optimize — Optimize full CV */
  optimizeCv: (cvFileId: number) =>
    apiClient.post<ApiWrapper<string>>(`${BASE}/${cvFileId}/optimize`),
};
