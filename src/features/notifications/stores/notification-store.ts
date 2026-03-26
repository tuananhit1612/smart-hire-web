"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  Notification Store — Zustand store for in-app notifications
 *
 *  Manages notification list, unread count, and read/delete
 *  via real backend API calls. Falls back to mock data when
 *  the API is unreachable.
 *
 *  Exposes `addRealtimeNotification()` so the RealtimeProvider
 *  can push incoming server events directly into the store.
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

// ─── Helpers: Map backend DTO → frontend Notification type ─

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
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  isMockData: boolean;

  // ── Actions ──────────────────────────────────────────
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;

  /** Push a new notification from a realtime server event */
  addRealtimeNotification: (notification: Notification) => void;
}

// ─── Store Implementation ────────────────────────────────

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  isMockData: false,

  fetchNotifications: async () => {
    if (get().isLoading) return;
    set({ isLoading: true, error: null });

    try {
      const response = await notificationApi.list(0, 50);
      const notifications = response.data.content.map(toNotification);
      set({
        notifications,
        unreadCount: notifications.filter((n) => !n.isRead).length,
        isLoading: false,
        isMockData: false,
      });
    } catch (error) {
      const fallback = [...mockNotifications];
      set({
        notifications: fallback,
        unreadCount: fallback.filter((n) => !n.isRead).length,
        isLoading: false,
        error: getErrorMessage(error, "Không thể tải thông báo."),
        isMockData: true,
      });
    }
  },

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

    if (!isMockData) {
      try {
        await notificationApi.markAsRead(Number(id));
      } catch {
        // Revert on failure
        set({
          notifications: notifications.map((n) =>
            n.id === id ? { ...n, isRead: false } : n
          ),
          unreadCount: get().unreadCount + 1,
        });
      }
    }
  },

  markAllAsRead: async () => {
    const { notifications, isMockData } = get();
    if (!notifications.some((n) => !n.isRead)) return;

    const prev = notifications;
    set({
      notifications: notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    });

    if (!isMockData) {
      try {
        await notificationApi.markAllAsRead();
      } catch {
        set({
          notifications: prev,
          unreadCount: prev.filter((n) => !n.isRead).length,
        });
      }
    }
  },

  deleteNotification: async (id: string) => {
    const { notifications, isMockData } = get();
    const prev = notifications;
    const remaining = notifications.filter((n) => n.id !== id);

    set({
      notifications: remaining,
      unreadCount: remaining.filter((n) => !n.isRead).length,
    });

    if (!isMockData) {
      try {
        await notificationApi.delete(Number(id));
      } catch {
        set({
          notifications: prev,
          unreadCount: prev.filter((n) => !n.isRead).length,
        });
      }
    }
  },

  addRealtimeNotification: (notification: Notification) => {
    const { notifications } = get();
    // Prevent duplicates
    if (notifications.some((n) => n.id === notification.id)) return;

    set({
      notifications: [notification, ...notifications],
      unreadCount: get().unreadCount + (notification.isRead ? 0 : 1),
    });
  },
}));
