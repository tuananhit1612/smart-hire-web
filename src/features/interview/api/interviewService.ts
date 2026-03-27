/**
 * ═════════════════════════════════════════════════════════
 *  Interview Service — API calls for interview scheduling
 *  Base path: /api/interviews
 *  Source: InterviewController.java
 * ═════════════════════════════════════════════════════════
 */

import { api } from "@/core/api";
import type {
    InterviewResponse,
    CreateInterviewRequest,
    UpdateInterviewRequest,
    InterviewStatus,
} from "../types/interview-types";

/** BE wraps all responses in ApiResponse<T> */
interface ApiResponse<T> {
    success: boolean;
    code: string;
    message?: string;
    data: T;
}

const BASE = "/api/interviews";

export const interviewService = {
    /**
     * Create a new interview room
     * POST /api/interviews
     */
    create: async (data: CreateInterviewRequest): Promise<InterviewResponse> => {
        const res = await api.post<ApiResponse<InterviewResponse>>(BASE, data);
        return res.data;
    },

    /**
     * Get interview by ID
     * GET /api/interviews/{id}
     */
    getById: async (id: number): Promise<InterviewResponse> => {
        const res = await api.get<ApiResponse<InterviewResponse>>(`${BASE}/${id}`);
        return res.data;
    },

    /**
     * Get all interviews for a specific application
     * GET /api/interviews/application/{applicationId}
     */
    getByApplication: async (applicationId: number): Promise<InterviewResponse[]> => {
        const res = await api.get<ApiResponse<InterviewResponse[]>>(
            `${BASE}/application/${applicationId}`
        );
        return res.data;
    },

    /**
     * Get all interviews for the currently authenticated user
     * GET /api/interviews/my
     */
    getMy: async (): Promise<InterviewResponse[]> => {
        const res = await api.get<ApiResponse<InterviewResponse[]>>(`${BASE}/my`);
        return res.data;
    },

    /**
     * Update an existing interview
     * PUT /api/interviews/{id}
     */
    update: async (id: number, data: UpdateInterviewRequest): Promise<InterviewResponse> => {
        const res = await api.put<ApiResponse<InterviewResponse>>(`${BASE}/${id}`, data);
        return res.data;
    },

    /**
     * Change interview status
     * PATCH /api/interviews/{id}/status
     */
    changeStatus: async (id: number, status: InterviewStatus): Promise<InterviewResponse> => {
        const res = await api.patch<ApiResponse<InterviewResponse>>(
            `${BASE}/${id}/status`,
            { status }
        );
        return res.data;
    },

    /**
     * Delete an interview
     * DELETE /api/interviews/{id}
     */
    delete: async (id: number): Promise<void> => {
        await api.delete<ApiResponse<void>>(`${BASE}/${id}`);
    },
};
