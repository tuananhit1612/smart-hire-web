import { apiClient } from "@/shared/lib/api-client";
import { CVData } from "@/features/cv/types/types";

export interface SaveCVPayload {
  title: string;
  templateId: string;
  cvData: CVData;
}

export interface ExportPDFPayload {
  templateId: string;
  cvData: CVData;
  design?: any; // To pass CSS variables info
}

export const cvApi = {
  /**
   * Đồng bộ CV Data về Java Backend.
   */
  saveCV: async (payload: SaveCVPayload) => {
    // Backend API mapping: PUT /api/v1/cv-builder
    // Payload mapping: CvBuilderRequest { templateId: string, sectionsData: { ... } }
    const requestData = {
      templateId: payload.templateId,
      sectionsData: payload.cvData,
    };
    const response = await apiClient.put("/v1/cv-builder", requestData);
    return response.data;
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
};
