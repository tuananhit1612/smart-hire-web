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
  content?: string;
  referenceId: number | null;
  referenceType: string | null;
  isRead: boolean;
  createdAt: string;
}

/** Compat alias — develop branch uses NotificationDto */
export type NotificationDto = NotificationResponse;

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
  list: (page = 0, size = 20) =>
    apiClient.get<ApiWrapper<PageResponse<NotificationResponse>>>(
      "/notifications",
      { params: { page, size } }
    ),

  /**
   * Get unread notification count for badge display.
   */
  getUnreadCount: () =>
    apiClient.get<ApiWrapper<{ unreadCount: number }>>(
      "/notifications/unread-count"
    ),

  /**
   * Get paginated notifications with full params.
   */
  getNotifications: (params: NotificationListParams = {}) =>
    apiClient.get<ApiWrapper<PageResponse<NotificationResponse>>>(
      "/notifications",
      { params }
    ),

  /**
   * Mark a single notification as read.
   */
  markAsRead: (id: number) =>
    apiClient.patch<ApiWrapper<void>>(
      `/notifications/${id}/read`
    ),

  /**
   * Mark all notifications as read.
   */
  markAllAsRead: () =>
    apiClient.patch<ApiWrapper<{ updated: number }>>(
      "/notifications/read-all"
    ),
};
