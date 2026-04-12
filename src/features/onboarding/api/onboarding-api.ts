import { apiClient } from "@/shared/lib/api-client";
import { DocumentType } from "@/shared/types/enums";
import { ApiWrapper } from "@/shared/types/api";

export type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export interface OnboardingDocumentResponse {
  id: number;
  applicationId: number;
  documentType: DocumentType;
  status: VerificationStatus;
  aiFeedback: string | null;
  uploadedAt: string;
  updatedAt: string;
}

export interface OnboardingAiVerificationResult {
  isValid: boolean;
  feedbackReason: string | null;
  extractedName: string | null;
  extractedIdNumber: string | null;
  extractedDob: string | null;
}

export const onboardingApi = {
  /**
   * Upload an onboarding document.
   * Note: Uploading ID_FRONT/ID_BACK will trigger synchronous AI Verification.
   */
  uploadDocument: async (
    applicationId: number | string,
    file: File,
    documentType: DocumentType
  ): Promise<ApiWrapper<OnboardingDocumentResponse>> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);

    const res = await apiClient.post<ApiWrapper<OnboardingDocumentResponse>>(
      `/onboarding-documents/application/${applicationId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  },

  /**
   * Get all onboarding documents for an application
   */
  getDocuments: async (applicationId: number | string): Promise<ApiWrapper<OnboardingDocumentResponse[]>> => {
    const res = await apiClient.get<ApiWrapper<OnboardingDocumentResponse[]>>(
      `/onboarding-documents/application/${applicationId}`
    );
    return res.data;
  },

  /**
   * Securely download a PII document tracking blob.
   */
  downloadSecureDocumentAsUrl: async (documentId: number | string): Promise<string> => {
    const res = await apiClient.get(`/onboarding-documents/${documentId}/download`, {
      responseType: "blob",
    });
    const blob = new Blob([res.data], { type: res.headers["content-type"] });
    return URL.createObjectURL(blob);
  },

  /**
   * Update the verification status of a document (HR / ADMIN only)
   */
  updateStatus: async (
    documentId: number | string,
    status: VerificationStatus,
    comment?: string
  ): Promise<ApiWrapper<OnboardingDocumentResponse>> => {
    const params = new URLSearchParams({
      status,
    });
    if (comment) {
      params.append("comment", comment);
    }
    const res = await apiClient.put<ApiWrapper<OnboardingDocumentResponse>>(
      `/onboarding-documents/${documentId}/status?${params.toString()}`
    );
    return res.data;
  },
};
