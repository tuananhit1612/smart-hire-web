import { apiClient } from "@/shared/lib/api-client";

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
            `/v1/onboarding/parse-status/${cvFileId}`
        );
        return response.data;
    },

    /**
     * Submit all candidate data and complete onboarding
     */
    completeOnboarding: async (payload: CompleteOnboardingPayload): Promise<void> => {
        await apiClient.post("/v1/onboarding/complete", payload);
    },
};
