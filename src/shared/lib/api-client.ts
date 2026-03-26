/**
 * ═══════════════════════════════════════════════════════════
 *  Axios API Client — Central HTTP instance
 *
 *  • Auth: Reads JWT from localStorage via tokenStorage
 *  • Request:  Attaches Bearer token + JSON Content-Type
 *  • Response: Unwraps data, normalizes errors to ApiError
 *  • 401:      Clears session, redirects to /login
 * ═══════════════════════════════════════════════════════════
 */

import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { ApiError } from "./api-error";
import { tokenStorage } from "@/features/auth/lib/token-storage";

// ─── Constants ───────────────────────────────────────────
const SESSION_STORAGE_KEY = "smarthire-session";

// ─── Axios Instance ──────────────────────────────────────
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ─── Request Interceptor ─────────────────────────────────
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ────────────────────────────────
apiClient.interceptors.response.use(
  // Success — unwrap response.data
  (response) => response,

  // Error — normalize into ApiError
  (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
    // Network / timeout error (no response from server)
    if (!error.response) {
      return Promise.reject(
        new ApiError(
          "NETWORK_ERROR",
          0,
          "Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng."
        )
      );
    }

    const { status, data } = error.response;
    const serverMessage = data?.message;

    // 401 — Unauthorized → clear session, redirect to login
    if (status === 401) {
      // Clear all auth state
      if (typeof window !== "undefined") {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        tokenStorage.clearTokens();
        window.location.href = "/login";
      }
      return Promise.reject(
        new ApiError("UNAUTHORIZED", 401, serverMessage ?? "Phiên đăng nhập đã hết hạn.")
      );
    }

    // 403 — Forbidden
    if (status === 403) {
      return Promise.reject(
        new ApiError("FORBIDDEN", 403, serverMessage ?? "Bạn không có quyền thực hiện thao tác này.")
      );
    }

    // 422 — Validation errors
    if (status === 422) {
      return Promise.reject(
        new ApiError(
          "VALIDATION_ERROR",
          422,
          serverMessage ?? "Dữ liệu không hợp lệ.",
          data?.errors
        )
      );
    }

    // 404 — Not Found
    if (status === 404) {
      return Promise.reject(
        new ApiError("NOT_FOUND", 404, serverMessage ?? "Không tìm thấy dữ liệu.")
      );
    }

    // 5xx — Server error
    if (status >= 500) {
      return Promise.reject(
        new ApiError(
          "SERVER_ERROR",
          status,
          serverMessage ?? "Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau."
        )
      );
    }

    // Other errors — generic
    return Promise.reject(
      new ApiError(
        "UNKNOWN_ERROR",
        status,
        serverMessage ?? "Đã xảy ra lỗi không xác định."
      )
    );
  }
);
