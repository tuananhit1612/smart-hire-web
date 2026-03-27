/**
 * ═══════════════════════════════════════════════════════════
 *  Notification REST API — Endpoint wrappers
 *
 *  GET    /notifications              → list (paginated)
 *  GET    /notifications/unread-count → badge count
 *  PATCH  /notifications/:id/read     → mark one read
 *  PATCH  /notifications/read-all     → mark all read
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";
import type { ApiWrapper, PageResponse } from "@/shared/types/api";

// ─── DTO Mirrors ─────────────────────────────────────────

export interface NotificationResponse {
  id: number;
  type: string;
  title: string;
  message: string;
  referenceId: number | null;
  referenceType: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface UnreadCountResponse {
  count: number;
}

export interface NotificationListParams {
  page?: number;
  size?: number;
  unreadOnly?: boolean;
}

// ─── API Methods ─────────────────────────────────────────

export const notificationApi = {
  /**
   * List notifications for the current user (paginated).
   */
  list: async (params: NotificationListParams = {}) => {
    const { data } = await apiClient.get<ApiWrapper<PageResponse<NotificationResponse>>>(
      "/notifications",
      { params }
    );
    return data.data;
  },

  /**
   * Get unread notification count for badge display.
   */
  getUnreadCount: async (): Promise<number> => {
    const { data } = await apiClient.get<ApiWrapper<UnreadCountResponse>>(
      "/notifications/unread-count"
    );
    return data.data.count;
  },

  /**
   * Mark a single notification as read.
   */
  markAsRead: async (id: number) => {
    const { data } = await apiClient.patch<ApiWrapper<NotificationResponse>>(
      `/notifications/${id}/read`
    );
    return data.data;
  },

  /**
   * Mark all notifications as read.
   */
  markAllAsRead: async () => {
    await apiClient.patch<ApiWrapper<void>>("/notifications/read-all");
  },
};
