import { api } from '@/core/api/client';

export interface ApplyJobPayload {
    jobId: string;
    cvId: string;
    coverLetter?: string;
}

export interface ApplicationResponse {
    id: string;
    jobId: string;
    candidateId: string;
    status: string;
    appliedAt: Date;
}

export const applicationApi = {
    // --- Application Submission ---
    applyToJob: (payload: ApplyJobPayload) => 
        api.post<ApplicationResponse>('/api/v1/applications', payload),
};
