import { apiClient } from "@/shared/lib/api-client";
import { DocumentType } from "@/shared/types/enums";
import { ApiWrapper } from "@/shared/types/api";

export type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export interface OnboardingCvData {
    cvFileId: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    linkedin: string;
    website: string;
    country: string;
    state: string;
    city: string;
    gender: string;
    summary?: string;
    skills?: string[];
    experience?: {
        company?: string;
        title?: string;
        startDate?: string;
        endDate?: string;
        description?: string;
    }[];
    education?: {
        school?: string;
        degree?: string;
        major?: string;
        startDate?: string;
        endDate?: string;
    }[];
}

export interface UploadCvResponse {
    cvFileId: number;
    status: string;
    message: string;
}

export interface ParseStatusResponse {
    status: string;
    message: string;
    data?: OnboardingCvData;
}

export interface CompleteOnboardingPayload {
    roleId: string | null;
    experienceLevel: string | null;
    verifiedCvData?: OnboardingCvData | null;
}
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
   * Upload CV and trigger AI Parsing
   */
  uploadCv: async (file: File): Promise<UploadCvResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<UploadCvResponse>(
      "/v1/onboarding/upload-cv",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  /**
   * Poll AI Parsing status
   */
  getParseStatus: async (cvFileId: number): Promise<ParseStatusResponse> => {
    const response = await apiClient.get<ParseStatusResponse>(
      `/v1/onboarding/parse-status/${cvFileId}`,
      { timeout: 60000 }
    );
    return response.data;
  },

  /**
   * Submit all candidate data and complete onboarding
   */
  completeOnboarding: async (payload: CompleteOnboardingPayload): Promise<void> => {
    await apiClient.post("/v1/onboarding/complete", payload);
  },

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
