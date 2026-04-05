/**
 * ═══════════════════════════════════════════════════════════
 *  useFileUpload — React hook for file upload lifecycle
 *
 *  Uses apiClient (axios) so it gets auth interceptors +
 *  automatic token refresh for free.
 *
 *  Validates client-side → uploads via apiClient →
 *  tracks progress → exposes typed state.
 * ═══════════════════════════════════════════════════════════
 */

"use client";

import { useCallback, useState } from "react";

import { apiClient } from "@/shared/lib/api-client";
import { isApiError, getErrorMessage } from "@/shared/lib/api-error";
import {
  type FileValidationRule,
  type FileValidationResult,
  validateFile,
} from "@/shared/utils/file-validation";

/* ── Types ─────────────────────────────────────────────── */

export interface UseFileUploadState {
  /** Upload progress 0–100 */
  progress: number;
  /** True while uploading */
  isUploading: boolean;
  /** Last validation or upload error message */
  error: string | null;
  /** Validation result from the last attempt */
  validation: FileValidationResult | null;
}

export interface UseFileUploadReturn extends UseFileUploadState {
  /**
   * Validate & upload a file.
   * Returns the parsed response on success, or `null` on failure.
   */
  upload: <T>(
    file: File,
    endpoint: string,
    options?: UploadFileOptions
  ) => Promise<T | null>;

  /** Reset state for re-use */
  reset: () => void;
}

export interface UploadFileOptions {
  /** FormData field name — defaults to `"file"` */
  fieldName?: string;
  /** Extra fields to append to FormData */
  extraFields?: Record<string, string>;
  /** HTTP method — defaults to POST */
  method?: "POST" | "PUT" | "PATCH";
}

/* ── Initial state ────────────────────────────────────── */

const INITIAL_STATE: UseFileUploadState = {
  progress: 0,
  isUploading: false,
  error: null,
  validation: null,
};

/* ── Hook ─────────────────────────────────────────────── */

/**
 * ```tsx
 * const { upload, progress, isUploading, error } = useFileUpload(CV_RULES);
 *
 * const handleFile = async (file: File) => {
 *   const res = await upload<{ url: string }>(file, "/candidate/profile/cv-files");
 *   if (res) toast.success("CV uploaded!");
 * };
 * ```
 */
export function useFileUpload(
  rules?: FileValidationRule
): UseFileUploadReturn {
  const [state, setState] = useState<UseFileUploadState>(INITIAL_STATE);

  const reset = useCallback(() => setState(INITIAL_STATE), []);

  const uploadFn = useCallback(
    async <T>(
      file: File,
      endpoint: string,
      options?: UploadFileOptions
    ): Promise<T | null> => {
      // Reset previous state
      setState({ ...INITIAL_STATE, isUploading: true });

      // ── Client-side validation ──
      if (rules) {
        const result = validateFile(file, rules);
        if (!result.valid) {
          setState({
            progress: 0,
            isUploading: false,
            error: result.errors[0],
            validation: result,
          });
          return null;
        }
        setState((s) => ({ ...s, validation: result }));
      }

      // ── Build FormData ──
      const formData = new FormData();
      formData.append(options?.fieldName ?? "file", file);

      if (options?.extraFields) {
        Object.entries(options.extraFields).forEach(([k, v]) =>
          formData.append(k, v)
        );
      }

      // ── Upload via apiClient (axios) ──
      try {
        const method = options?.method ?? "POST";
        const response = await apiClient.request<T>({
          url: endpoint,
          method,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setState((s) => ({ ...s, progress: percent }));
            }
          },
        });

        setState((s) => ({ ...s, isUploading: false, progress: 100 }));
        return response.data;
      } catch (err) {
        const message = isApiError(err)
          ? err.message
          : getErrorMessage(err, "Đã xảy ra lỗi khi tải file lên");

        setState((s) => ({
          ...s,
          isUploading: false,
          error: message,
        }));
        return null;
      }
    },
    [rules]
  );

  return {
    ...state,
    upload: uploadFn,
    reset,
  };
}
