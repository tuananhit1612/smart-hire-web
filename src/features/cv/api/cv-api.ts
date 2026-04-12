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
   * Export PDF — In demo mode, we use a client-side fallback
   * since the Puppeteer API route is not available in static export.
   */
  exportPDF: async (payload: ExportPDFPayload): Promise<Blob> => {
    // Demo mode: use window.print() as a simple PDF fallback
    if (typeof window !== "undefined") {
      window.print();
    }
    // Return an empty blob to satisfy the type contract
    return new Blob(["Demo PDF Export"], { type: "application/pdf" });
  },

  /**
   * Lấy CV Builder data theo cvFileId.
   */
  getCvBuilderByCvFileId: (cvFileId: number) =>
    apiClient.get<CvBuilderApiResponse>(`/cv-builder/${cvFileId}`),
};
