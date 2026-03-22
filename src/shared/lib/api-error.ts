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
