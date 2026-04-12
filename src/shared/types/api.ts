/**
 * ═══════════════════════════════════════════════════════════
 *  Shared API Types — Backend response envelopes
 *
 *  ApiWrapper<T>    — single-object response
 *  PageResponse<T>  — Spring Boot Page<T> structure
 * ═══════════════════════════════════════════════════════════
 */

/** Standard backend response shape (Axios res.data = ApiWrapper<T>) */
export interface ApiWrapper<T> {
  success: boolean;
  code: string;
  data: T;
  message: string;
}

/**
 * Spring Boot Page<T> — paginated collection.
 * Nested inside ApiWrapper: `res.data.data` = PageResponse<T>
 */
export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  /** Current page number (0-based) */
  number: number;
  /** Page size */
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
