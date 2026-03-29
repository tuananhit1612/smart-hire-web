/**
 * ═══════════════════════════════════════════════════════════
 *  Axios API Client — Central HTTP instance
 *
 *  • Auth: Reads JWT from localStorage via tokenStorage
 *  • Auth: Reads JWT from tokenStorage (localStorage)
 *  • Request:  Attaches Bearer token + JSON Content-Type
 *  • Response: Unwraps data, normalizes errors to ApiError
 *  • 401:      Attempts silent refresh via /auth/refresh
 *             → if refresh fails, clears session + redirect
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
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

// ─── Request Interceptor ─────────────────────────────────
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const requestUrl = config.url ?? "";
    const isPublicAuthEndpoint =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/auth/refresh-token") ||
      requestUrl.includes("/auth/forgot-password") ||
      requestUrl.includes("/auth/reset-password");

    if (!isPublicAuthEndpoint) {
      const token = tokenStorage.getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Safely apply JSON content type only if we are NOT sending FormData
    if (config.data && !(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Refresh Token Logic ─────────────────────────────────

/**
 * Prevents multiple concurrent refresh calls.
 * When a refresh is in-flight, subsequent 401s queue up
 * and resolve/reject together once the refresh completes.
 */
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token!);
    }
  });
  failedQueue = [];
}

function clearSessionAndRedirect() {
  tokenStorage.clearTokens();
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    window.location.href = "/login";
  }
}

// ─── Response Interceptor ────────────────────────────────
apiClient.interceptors.response.use(
  // Success — pass through
  (response) => response,

  // Error — normalize into ApiError, attempt refresh on 401
  async (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
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
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // ── 401 — Attempt token refresh ──────────────────────
    if (status === 401 && !originalRequest._retry) {
      // Don't attempt refresh for auth endpoints themselves
      const url = originalRequest.url ?? "";
      if (url.includes("/auth/login") || url.includes("/auth/register") || url.includes("/auth/refresh-token")) {
        return Promise.reject(
          new ApiError("UNAUTHORIZED", 401, serverMessage ?? "Thông tin đăng nhập không chính xác.")
        );
      }

      if (isRefreshing) {
        // Another refresh is already in-flight — queue this request
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = tokenStorage.getRefreshToken();
      if (!refreshToken) {
        isRefreshing = false;
        processQueue(new Error("No refresh token"), null);
        clearSessionAndRedirect();
        return Promise.reject(
          new ApiError("UNAUTHORIZED", 401, "Phiên đăng nhập đã hết hạn.")
        );
      }

      try {
        // Call refresh endpoint directly with axios (not apiClient)
        // to avoid the interceptor loop
        const refreshRes = await axios.post(
          `${apiClient.defaults.baseURL}/auth/refresh-token`,
          { refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const newAccessToken = refreshRes.data?.data?.accessToken;
        const newRefreshToken = refreshRes.data?.data?.refreshToken;

        if (!newAccessToken) {
          throw new Error("Invalid refresh response");
        }

        // Store new tokens
        tokenStorage.setTokens(newAccessToken, newRefreshToken ?? refreshToken);

        // Resolve all queued requests with the new token
        processQueue(null, newAccessToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearSessionAndRedirect();
        return Promise.reject(
          new ApiError("UNAUTHORIZED", 401, "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.")
        );
      } finally {
        isRefreshing = false;
      }
    }

    // ── 403 — Forbidden ──────────────────────────────────
    if (status === 403) {
      return Promise.reject(
        new ApiError("FORBIDDEN", 403, serverMessage ?? "Bạn không có quyền thực hiện thao tác này.")
      );
    }

    // ── 422 — Validation errors ──────────────────────────
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

    // ── 404 — Not Found ──────────────────────────────────
    if (status === 404) {
      return Promise.reject(
        new ApiError("NOT_FOUND", 404, serverMessage ?? "Không tìm thấy dữ liệu.")
      );
    }

    // ── 5xx — Server error ───────────────────────────────
    if (status >= 500) {
      return Promise.reject(
        new ApiError(
          "SERVER_ERROR",
          status,
          serverMessage ?? "Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau."
        )
      );
    }

    // ── Other errors — generic ───────────────────────────
    return Promise.reject(
      new ApiError(
        "UNKNOWN_ERROR",
        status,
        serverMessage ?? "Đã xảy ra lỗi không xác định."
      )
    );
  }
);

/**
 * Transforms relative backend file paths (e.g. "covers/123.jpg" or "logos/123.png")
 * into absolute URLs that the frontend can render by prepending the backend URL.
 */
export function getImageUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http") || path.startsWith("data:") || path.startsWith("blob:")) {
    return path;
  }
  
  // Example: If NEXT_PUBLIC_API_URL is "http://localhost:8080/api"
  // We want the base to be "http://localhost:8080"
  let baseUrl = "http://localhost:8080";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    baseUrl = apiUrl.replace(/\/api$/, "");
  }

  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `${baseUrl}/uploads/${cleanPath}`;
}
