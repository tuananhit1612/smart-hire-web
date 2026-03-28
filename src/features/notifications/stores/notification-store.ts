/**
 * ═══════════════════════════════════════════════════════════
 *  Notification Store (Zustand)
 *
 *  Manages notification state with REST + realtime updates.
 * ═══════════════════════════════════════════════════════════
 */

import { create } from "zustand";
import {
  notificationApi,
  type NotificationDto,
} from "../api/notification-api";

interface NotificationState {
  /** List of notifications (most recent first) */
  notifications: NotificationDto[];
  /** Number of unread notifications */
  unreadCount: number;
  /** Loading state */
  isLoading: boolean;
  /** Total pages from server */
  totalPages: number;
  /** Current page */
  currentPage: number;
}

interface NotificationActions {
  /** Fetch notifications from REST API */
  fetchNotifications: (page?: number) => Promise<void>;
  /** Fetch unread count from REST API */
  fetchUnreadCount: () => Promise<void>;
  /** Mark a single notification as read */
  markAsRead: (id: number) => Promise<void>;
  /** Mark all notifications as read */
  markAllAsRead: () => Promise<void>;
  /** Mark a single notification as read locally (for instant UI update) */
  markReadLocally: (id: number) => void;
  /** Add a notification from realtime WebSocket event */
  addRealtimeNotification: (notification: NotificationDto) => void;
  /** Increment unread count (when any realtime event arrives) */
  incrementUnread: () => void;
}

export const useNotificationStore = create<
  NotificationState & NotificationActions
>((set, get) => ({
  // ─── State ─────────────────────────────────────────────
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  totalPages: 0,
  currentPage: 0,

  // ─── Actions ───────────────────────────────────────────

  fetchNotifications: async (page = 0) => {
    set({ isLoading: true });
    try {
      const { data: wrapper } = await notificationApi.list(page, 20);
      const pageData = wrapper.data;
      set({
        notifications:
          page === 0
            ? pageData.content
            : [...get().notifications, ...pageData.content],
        totalPages: pageData.totalPages,
        currentPage: pageData.number,
      });
    } catch (err) {
      console.error("[NotificationStore] fetchNotifications error:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUnreadCount: async () => {
    try {
      const { data: wrapper } = await notificationApi.getUnreadCount();
      set({ unreadCount: wrapper.data.unreadCount });
    } catch (err) {
      console.error("[NotificationStore] fetchUnreadCount error:", err);
    }
  },

  markAsRead: async (id: number) => {
    try {
      await notificationApi.markAsRead(id);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch (err) {
      console.error("[NotificationStore] markAsRead error:", err);
    }
  },

  markAllAsRead: async () => {
    try {
      await notificationApi.markAllAsRead();
      set((state) => ({
        notifications: state.notifications.map((n) => ({
          ...n,
          isRead: true,
        })),
        unreadCount: 0,
      }));
    } catch (err) {
      console.error("[NotificationStore] markAllAsRead error:", err);
    }
  },

  markReadLocally: (id: number) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));
  },

  addRealtimeNotification: (notification: NotificationDto) => {
    set((state) => {
      // Prevent duplicates
      const exists = state.notifications.some((n) => n.id === notification.id);
      if (exists) return state;

      return {
        notifications: [notification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    });
  },

  incrementUnread: () => {
    set((state) => ({ unreadCount: state.unreadCount + 1 }));
  },
}));
