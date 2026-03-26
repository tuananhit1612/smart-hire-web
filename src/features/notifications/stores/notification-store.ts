"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  Notification Store — Zustand store for in-app notifications
 *
 *  Manages notification list, unread count, read/unread state,
 *  and delete operations via real backend API calls.
 *
 *  Falls back to mock data when the API is unreachable
 *  (e.g. user not authenticated or server down).
 *
 *  No `persist` — data is always fresh from the server.
 * ═══════════════════════════════════════════════════════════
 */

import { create } from "zustand";
import {
  notificationApi,
  type NotificationResponse,
} from "../api/notification-api";
import {
  mockNotifications,
  type Notification,
  type NotificationType,
  type NotificationCategory,
} from "../types/mock-notifications";
import { getErrorMessage } from "@/shared/lib/api-error";

// ─── Helpers: Map backend DTO → existing frontend type ───

function toNotification(raw: NotificationResponse): Notification {
  return {
    id: String(raw.id),
    type: raw.type as NotificationType,
    category: raw.category as NotificationCategory,
    title: raw.title,
    message: raw.message,
    isRead: raw.isRead,
    createdAt: raw.createdAt,
    link: raw.link,
    metadata: raw.metadata as Notification["metadata"],
  };
}

// ─── Store Interface ─────────────────────────────────────

interface NotificationState {
  /** All notifications currently loaded */
  notifications: Notification[];
  /** Number of unread notifications */
  unreadCount: number;
  /** True while the initial fetch is in-flight */
  isLoading: boolean;
  /** Error message from the last failed API call */
  error: string | null;
  /** True when data comes from mock (API unreachable) */
  isMockData: boolean;

  // ── Actions ──────────────────────────────────────────
  /** Fetch notifications from the backend (with mock fallback) */
  fetchNotifications: () => Promise<void>;
  /** Mark a single notification as read */
  markAsRead: (id: string) => Promise<void>;
  /** Mark all notifications as read */
  markAllAsRead: () => Promise<void>;
  /** Delete a single notification */
  deleteNotification: (id: string) => Promise<void>;
}

// ─── Store Implementation ────────────────────────────────

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  isMockData: false,

  // ── Fetch ────────────────────────────────────────────
  fetchNotifications: async () => {
    if (get().isLoading) return;

    set({ isLoading: true, error: null });

    try {
      const response = await notificationApi.list(0, 50);
      const notifications = response.data.content.map(toNotification);
      const unreadCount = notifications.filter((n) => !n.isRead).length;

      set({
        notifications,
        unreadCount,
        isLoading: false,
        isMockData: false,
      });
    } catch (error) {
      // Graceful fallback: use mock data so the UI is never empty
      const fallback = [...mockNotifications];
      const unreadCount = fallback.filter((n) => !n.isRead).length;
      const message = getErrorMessage(
        error,
        "Không thể tải thông báo từ máy chủ."
      );

      set({
        notifications: fallback,
        unreadCount,
        isLoading: false,
        error: message,
        isMockData: true,
      });
    }
  },

  // ── Mark as Read ─────────────────────────────────────
  markAsRead: async (id: string) => {
    const { notifications, isMockData } = get();
    const target = notifications.find((n) => n.id === id);
    if (!target || target.isRead) return;

    // Optimistic update
    set({
      notifications: notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, get().unreadCount - 1),
    });

    // Call API only when using real data
    if (!isMockData) {
      try {
        await notificationApi.markAsRead(Number(id));
      } catch {
        // Revert optimistic update on failure
        set({
          notifications: notifications.map((n) =>
            n.id === id ? { ...n, isRead: false } : n
          ),
          unreadCount: get().unreadCount + 1,
        });
      }
    }
  },

  // ── Mark All as Read ─────────────────────────────────
  markAllAsRead: async () => {
    const { notifications, isMockData } = get();
    const hadUnread = notifications.some((n) => !n.isRead);
    if (!hadUnread) return;

    // Optimistic update
    const previousNotifications = notifications;
    set({
      notifications: notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    });

    if (!isMockData) {
      try {
        await notificationApi.markAllAsRead();
      } catch {
        // Revert on failure
        set({
          notifications: previousNotifications,
          unreadCount: previousNotifications.filter((n) => !n.isRead).length,
        });
      }
    }
  },

  // ── Delete ───────────────────────────────────────────
  deleteNotification: async (id: string) => {
    const { notifications, isMockData } = get();
    const target = notifications.find((n) => n.id === id);
    if (!target) return;

    // Optimistic update
    const remaining = notifications.filter((n) => n.id !== id);
    set({
      notifications: remaining,
      unreadCount: remaining.filter((n) => !n.isRead).length,
    });

    if (!isMockData) {
      try {
        await notificationApi.delete(Number(id));
      } catch {
        // Revert on failure
        set({
          notifications,
          unreadCount: notifications.filter((n) => !n.isRead).length,
        });
      }
    }
  },
}));
