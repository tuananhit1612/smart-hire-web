import { apiClient } from "@/shared/lib/api-client";
import { CVData } from "@/features/cv/types/types";
import { ApiWrapper } from "@/shared/types/api";

export interface SaveCVPayload {
  title?: string;
  templateId: string;
  cvData: CVData;
}

export interface ExportPDFPayload {
  templateId: string;
  cvData: CVData;
  design?: any; // To pass CSS variables info
}

export interface CvBuilderApiResponse {
  id: number;
  cvFileId: number;
  candidateProfileId: number;
  templateId: string;
  sectionsData: CVData;
  createdAt: string;
  updatedAt: string;
}

export const cvApi = {
  /**
   * Tạo MỚI 1 CV Builder (tạo CvFile + CvBuilderData mới, không ghi đè)
   */
  createCV: async (payload: SaveCVPayload) => {
    const requestData = {
      title: payload.title,
      templateId: payload.templateId,
      sectionsData: payload.cvData,
    };
    const response = await apiClient.post("/cv-builder", requestData);
    return response.data;
  },

  /**
   * Cập nhật CV cụ thể theo cvFileId (dùng khi save từ CV Analysis hoặc edit existing CV)
   */
  updateCV: async (cvFileId: number, payload: SaveCVPayload) => {
    const requestData = {
      title: payload.title,
      templateId: payload.templateId,
      sectionsData: payload.cvData,
    };
    const response = await apiClient.put(`/cv-builder/${cvFileId}`, requestData);
    return response.data;
  },

  /**
   * Lấy TẤT CẢ CV builder data của user hiện tại
   */
  getAllCVs: async () => {
    return apiClient.get<CvBuilderApiResponse[]>("/cv-builder");
  },

  /**
   * Gọi Next.js API để render và sinh PDF file qua Puppeteer.
   * Chú ý dùng Window Fetch chứ không dùng apiClient, vì apiClient sẽ trỏ tới Java backend (localhost:8080).
   */
  exportPDF: async (payload: ExportPDFPayload): Promise<Blob> => {
    const response = await fetch("/api/cv/export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errMessage = "Lỗi khi tạo file PDF từ server.";
      try {
        const errorData = await response.json();
        if (errorData.error) errMessage = errorData.error;
      } catch (e) {}
      throw new Error(errMessage);
    }

    return response.blob(); // Trả về dạng Binary File để download
  },

  /**
   * Lấy CV Builder data theo cvFileId.
   */
  getCvBuilderByCvFileId: (cvFileId: number) =>
    apiClient.get<CvBuilderApiResponse>(`/cv-builder/${cvFileId}`),
};
