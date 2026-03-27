/**
 * ═══════════════════════════════════════════════════════════
 *  Notification API — REST endpoints for notifications
 *
 *  Matches backend NotificationController:
 *    GET    /api/notifications          → paginated list
 *    GET    /api/notifications/unread-count → { unreadCount }
 *    PATCH  /api/notifications/:id/read → mark one as read
 *    PATCH  /api/notifications/read-all → mark all as read
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";
import type { ApiWrapper, PageResponse } from "@/shared/types/api";
import type { NotificationResponse } from "../types/notification-types";

/** Compat alias — develop branch uses NotificationDto, FE023 uses NotificationResponse */
export type { NotificationResponse as NotificationDto };

export const notificationApi = {
    /**
     * Get paginated notifications for the current user.
     */
    getNotifications: (page = 0, size = 20) =>
        apiClient.get<ApiWrapper<PageResponse<NotificationResponse>>>(
            "/notifications",
            { params: { page, size } }
        ),

    /** Alias for getNotifications — used by notification-store from develop */
    list: (page = 0, size = 20) =>
        apiClient.get<ApiWrapper<PageResponse<NotificationResponse>>>(
            "/notifications",
            { params: { page, size } }
        ),

    /**
     * Get unread notification count.
     */
    getUnreadCount: () =>
        apiClient.get<ApiWrapper<{ unreadCount: number }>>(
            "/notifications/unread-count"
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
