/**
 * ═════════════════════════════════════════════════════════
 *  Interview Service — API calls for interview scheduling
 *  Base path: /api/interviews
 *  Source: InterviewController.java
 * ═════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";
import type { ApiWrapper } from "@/shared/types/api";
import type {
    InterviewResponse,
    CreateInterviewRequest,
    UpdateInterviewRequest,
    InterviewStatus,
} from "../types/interview-types";

const BASE = "/interviews";

export const interviewService = {
    /**
     * Create a new interview room
     * POST /interviews
     */
    create: async (data: CreateInterviewRequest): Promise<InterviewResponse> => {
        const { data: res } = await apiClient.post<ApiWrapper<InterviewResponse>>(BASE, data);
        return res.data;
    },

    /**
     * Get interview by ID
     * GET /interviews/{id}
     */
    getById: async (id: number): Promise<InterviewResponse> => {
        const { data: res } = await apiClient.get<ApiWrapper<InterviewResponse>>(`${BASE}/${id}`);
        return res.data;
    },

    /**
     * Get all interviews for a specific application
     * GET /interviews/application/{applicationId}
     */
    getByApplication: async (applicationId: number): Promise<InterviewResponse[]> => {
        const { data: res } = await apiClient.get<ApiWrapper<InterviewResponse[]>>(
            `${BASE}/application/${applicationId}`
        );
        return res.data;
    },

    /**
     * Get all interviews for the currently authenticated user
     * GET /interviews/my
     */
    getMy: async (): Promise<InterviewResponse[]> => {
        const { data: res } = await apiClient.get<ApiWrapper<InterviewResponse[]>>(`${BASE}/my`);
        return res.data;
    },

    /**
     * Update an existing interview
     * PUT /interviews/{id}
     */
    update: async (id: number, data: UpdateInterviewRequest): Promise<InterviewResponse> => {
        const { data: res } = await apiClient.put<ApiWrapper<InterviewResponse>>(`${BASE}/${id}`, data);
        return res.data;
    },

    /**
     * Change interview status
     * PATCH /interviews/{id}/status
     */
    changeStatus: async (id: number, status: InterviewStatus): Promise<InterviewResponse> => {
        const { data: res } = await apiClient.patch<ApiWrapper<InterviewResponse>>(
            `${BASE}/${id}/status`,
            { status }
        );
        return res.data;
    },

    /**
     * Delete an interview
     * DELETE /interviews/{id}
     */
    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`${BASE}/${id}`);
    },
};
