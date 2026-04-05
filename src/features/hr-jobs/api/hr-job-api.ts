import { apiClient } from "@/shared/lib/api-client";
import { 
    CreateJobRequest, 
    UpdateJobRequest, 
    ChangeJobStatusRequest, 
    HrJobResponse,
    HrJobStatus
} from "../types/hr-job-api-types";
import { ApiWrapper } from "@/shared/types/api";

export const hrJobApi = {
    /** Lấy danh sách job do HR hiện tại tạo */
    getMyJobs: async (): Promise<HrJobResponse[]> => {
        const res = await apiClient.get<ApiWrapper<HrJobResponse[]>>('/jobs/my');
        return res.data.data;
    },

    /** Lấy chi tiết 1 job (API dùng chung endpoint public nhưng HR có thể xem của mình) 
     * Hoặc GET /jobs/{id} nếu Backend quy định khác. */
    getJobById: async (id: number): Promise<HrJobResponse> => {
        const res = await apiClient.get<ApiWrapper<HrJobResponse>>(`/jobs/${id}`);
        return res.data.data;
    },

    /** Tạo job mới */
    createJob: async (data: CreateJobRequest): Promise<HrJobResponse> => {
        const res = await apiClient.post<ApiWrapper<HrJobResponse>>('/jobs', data);
        return res.data.data;
    },

    /** Cập nhật job */
    updateJob: async (id: number, data: UpdateJobRequest): Promise<HrJobResponse> => {
        const res = await apiClient.put<ApiWrapper<HrJobResponse>>(`/jobs/${id}`, data);
        return res.data.data;
    },

    /** Đổi trạng thái (DRAFT | OPEN | CLOSED) */
    changeJobStatus: async (id: number, status: HrJobStatus): Promise<HrJobResponse> => {
        const payload: ChangeJobStatusRequest = { status };
        const res = await apiClient.patch<ApiWrapper<HrJobResponse>>(`/jobs/${id}/status`, payload);
        return res.data.data;
    },

    /** Xoá job vĩnh viễn */
    deleteJob: async (id: number): Promise<void> => {
        await apiClient.delete(`/jobs/${id}`);
    }
};
