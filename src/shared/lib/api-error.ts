/**
 * ═══════════════════════════════════════════════════════════
 *  ApiError — Structured error class for API failures
 *  Thrown by Axios interceptors, caught by stores/consumers
 * ═══════════════════════════════════════════════════════════
 */

export class ApiError extends Error {
  constructor(
    /** Machine-readable error code (e.g. "UNAUTHORIZED", "VALIDATION_ERROR") */
    public readonly code: string,
    /** HTTP status code (0 for network errors) */
    public readonly status: number,
    /** Human-readable error message */
    message: string,
    /** Field-level validation errors from 422 responses */
    public readonly details?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Type-guard: checks if an unknown error is an ApiError instance
 */
export function isApiError(err: unknown): err is ApiError {
  return err instanceof ApiError;
}

/**
 * Extract a user-friendly Vietnamese error message from any error.
 *
 * Priority:
 *   1. ApiError.message (set by the Axios interceptor, often from server)
 *   2. Status-based fallback for common codes
 *   3. Generic fallback for non-ApiError types
 */
export function getErrorMessage(
  err: unknown,
  fallback = "Đã có lỗi xảy ra. Vui lòng thử lại.",
): string {
  if (err instanceof ApiError) {
    // The interceptor already puts a Vietnamese message in `message`,
    // but if it's the raw "NETWORK_ERROR" code label, use a friendlier one.
    if (err.message && err.message !== err.code) return err.message;

    switch (err.status) {
      case 400: return "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.";
      case 401: return "Phiên đăng nhập đã hết hạn.";
      case 403: return "Bạn không có quyền thực hiện thao tác này.";
      case 404: return "Không tìm thấy dữ liệu.";
      case 409: return "Dữ liệu đã tồn tại.";
      case 422: return "Dữ liệu không hợp lệ.";
      case 429: return "Quá nhiều lần thử. Vui lòng đợi một lát.";
      default:  return err.status >= 500
        ? "Lỗi máy chủ. Vui lòng thử lại sau."
        : fallback;
    }
  }

  if (err instanceof TypeError && err.message.includes("fetch")) {
    return "Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng.";
  }

  return fallback;
}
