/**
 * ═══════════════════════════════════════════════════════════
 *  Notification API Service
 *  REST endpoints for notification management.
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";
import type { ApiWrapper, PageResponse } from "@/shared/types/api";

// ─── Response Types ──────────────────────────────────────

export interface NotificationDto {
  id: number;
  type: string;
  title: string;
  content: string;
  referenceType: string | null;
  referenceId: number | null;
  isRead: boolean;
  createdAt: string; // ISO datetime
}

// ─── API Methods ─────────────────────────────────────────

export const notificationApi = {
  /** GET /notifications?page=&size= */
  list: (page = 0, size = 20) =>
    apiClient.get<ApiWrapper<PageResponse<NotificationDto>>>(
      `/notifications?page=${page}&size=${size}`
    ),

  /** GET /notifications/unread-count */
  getUnreadCount: () =>
    apiClient.get<ApiWrapper<{ unreadCount: number }>>(
      "/notifications/unread-count"
    ),

  /** PATCH /notifications/:id/read */
  markAsRead: (id: number) =>
    apiClient.patch<ApiWrapper<void>>(`/notifications/${id}/read`),

  /** PATCH /notifications/read-all */
  markAllAsRead: () =>
    apiClient.patch<ApiWrapper<{ updated: number }>>(
      "/notifications/read-all"
    ),
};
