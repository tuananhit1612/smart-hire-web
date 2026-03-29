import { apiClient } from "@/shared/lib/api-client";
import { ApiWrapper } from "@/shared/types/api";

type Severity = "HIGH" | "MEDIUM" | "LOW";

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

export interface AiCvReviewResponse {
  id: number;
  cvFileId: number;
  overallRating: number;
  summary: string;
  strengths: string;   // JSON string array
  weaknesses: string;  // JSON string array
  issues: string;      // JSON string array of CvIssue
  suggestions: string; // JSON string array of CvSuggestion
  createdAt: string;
}

const BASE = "/ai/cv-review";

export const cvAiApi = {
  /** POST /ai/cv-review/:cvFileId */
  triggerReview: (cvFileId: number) =>
    apiClient.post<ApiWrapper<AiCvReviewResponse>>(`${BASE}/${cvFileId}`),

  /** GET /ai/cv-review/:cvFileId */
  getReview: (cvFileId: number) =>
    apiClient.get<ApiWrapper<AiCvReviewResponse>>(`${BASE}/${cvFileId}`),
};
