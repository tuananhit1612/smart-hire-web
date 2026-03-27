/**
 * ═══════════════════════════════════════════════════════════
 *  CV File Zustand Store
 *  Manages the state of candidate uploaded CV files (FE017).
 * ═══════════════════════════════════════════════════════════
 */

import { create } from "zustand";
import { profileApi } from "@/features/profile/api/profile-api";
import type { CvFileResponse } from "@/features/profile/types/profile-api-types";

interface CvFileStore {
  cvFiles: CvFileResponse[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCvFiles: () => Promise<void>;
  uploadCvFile: (file: File, isPrimary?: boolean) => Promise<void>;
  setPrimaryCv: (id: number) => Promise<void>;
  deleteCvFile: (id: number) => Promise<void>;
  downloadCvFile: (id: number, fileName: string) => Promise<void>;
  viewCvFile: (id: number, fileType: string) => Promise<void>;
}

export const useCvFileStore = create<CvFileStore>((set, get) => ({
  cvFiles: [],
  isLoading: false,
  error: null,

  fetchCvFiles: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await profileApi.getCvFiles();
      set({ cvFiles: res.data.data, isLoading: false });
    } catch (err: any) {
      set({
        isLoading: false,
        error: err.response?.data?.message || "Lỗi khi tải danh sách CV",
      });
    }
  },

  uploadCvFile: async (file: File, isPrimary?: boolean) => {
    set({ isLoading: true, error: null });
    try {
      await profileApi.uploadCvFile(file, isPrimary);
      // Reload list after upload
      await get().fetchCvFiles();
    } catch (err: any) {
      set({
        isLoading: false,
        error: err.response?.data?.message || "Lỗi khi tải lên CV",
      });
      throw err;
    }
  },

  setPrimaryCv: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await profileApi.setCvFilePrimary(id);
      // Reload list to update primary status of all items
      await get().fetchCvFiles();
    } catch (err: any) {
      set({
        isLoading: false,
        error: err.response?.data?.message || "Lỗi khi đặt CV mặc định",
      });
      throw err;
    }
  },

  deleteCvFile: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await profileApi.deleteCvFile(id);
      // Remove from local state immediately for snappy UI
      set((state) => ({
        cvFiles: state.cvFiles.filter((cv) => cv.id !== id),
        isLoading: false,
      }));
    } catch (err: any) {
      set({
        isLoading: false,
        error: err.response?.data?.message || "Lỗi khi xoá CV",
      });
      throw err;
    }
  },

  downloadCvFile: async (id: number, fileName: string) => {
    try {
      const blobData = await profileApi.downloadCvFile(id);
      // Create a blob URL and trigger synthetic download
      const blob = new Blob([blobData.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      set({ error: "Lỗi khi tải file CV" });
      throw err;
    }
  },

  viewCvFile: async (id: number, fileType: string) => {
    try {
      set({ isLoading: true });
      const blobData = await profileApi.downloadCvFile(id);
      const mimeType = fileType === "PDF" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const blob = new Blob([blobData.data], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
      
      // Cleanup after a delay since window.open is async
      setTimeout(() => window.URL.revokeObjectURL(url), 10000);
      set({ isLoading: false });
    } catch (err: any) {
      set({ error: "Lỗi khi xem file CV", isLoading: false });
      throw err;
    }
  },
}));
