/**
 * ═══════════════════════════════════════════════════════════
 *  Notification API — Endpoint wrappers for notifications
 *
 *  GET    /notifications            → list (paginated)
 *  GET    /notifications/unread-count → unread count only
 *  PATCH  /notifications/{id}/read  → mark one as read
 *  PATCH  /notifications/read-all   → mark all as read
 *  DELETE /notifications/{id}       → delete single
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";

// ─── Shared Spring pageable shape (reuse) ────────────────
export interface SpringPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

// ─── Backend DTO mirrors ─────────────────────────────────

/** Mirrors NotificationResponse.java from Spring Boot */
export interface NotificationResponse {
  id: number;
  type: string;
  category: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
  metadata?: Record<string, unknown>;
}

/** Simple count response from the unread-count endpoint */
export interface UnreadCountResponse {
  count: number;
}

// ─── API Methods ─────────────────────────────────────────

export const notificationApi = {
  /**
   * Fetch paginated notification list for the current user.
   */
  list: (page = 0, size = 20) =>
    apiClient.get<SpringPage<NotificationResponse>>(
      `/notifications?page=${page}&size=${size}`
    ),

  /**
   * Get the count of unread notifications.
   */
  getUnreadCount: () =>
    apiClient.get<UnreadCountResponse>("/notifications/unread-count"),

  /**
   * Mark a single notification as read.
   */
  markAsRead: (id: number) =>
    apiClient.patch<void>(`/notifications/${id}/read`),

  /**
   * Mark all notifications as read for the current user.
   */
  markAllAsRead: () =>
    apiClient.patch<void>("/notifications/read-all"),

  /**
   * Delete a single notification by ID.
   */
  delete: (id: number) =>
    apiClient.delete<void>(`/notifications/${id}`),
};
