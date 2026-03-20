import { api } from '@/core/api/client';
import { Application } from '@/features/jobs/types/mock-applications';

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
        
    // --- Application Tracking ---
    getMyApplications: () =>
        api.get<Application[]>('/api/v1/applications'),
};
