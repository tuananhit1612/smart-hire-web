/**
 * ═══════════════════════════════════════════════════════════
 *  Notification Store — Zustand
 *
 *  Central state for notifications:
 *    • notifications[]        — list from REST API + realtime
 *    • unreadCount            — from API or computed
 *    • connectionStatus       — WebSocket connection status
 *    • Actions: fetch, markRead, markAllRead, addRealtime
 * ═══════════════════════════════════════════════════════════
 */

import { create } from "zustand";
import type {
    NotificationData,
    NotificationResponse,
    SocketConnectionStatus,
} from "../types/notification-types";
import { notificationApi } from "../api/notification-api";

// ─── Helpers ─────────────────────────────────────────────

/** Convert REST API response → UI model */
function toNotificationData(n: NotificationResponse): NotificationData {
    return {
        id: String(n.id),
        type: n.type,
        title: n.title,
        message: n.message,
        isRead: n.isRead,
        createdAt: n.createdAt,
        link: n.link,
        metadata: n.metadata,
        isRealtime: false,
    };
}

// ─── Store Interface ─────────────────────────────────────

interface NotificationState {
    notifications: NotificationData[];
    unreadCount: number;
    connectionStatus: SocketConnectionStatus;
    isLoading: boolean;
    hasMore: boolean;
    currentPage: number;

    // Actions
    setConnectionStatus: (status: SocketConnectionStatus) => void;
    fetchNotifications: (page?: number) => Promise<void>;
    fetchUnreadCount: () => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    addRealtimeNotification: (notification: NotificationData) => void;
    reset: () => void;
}

// ─── Store ───────────────────────────────────────────────

export const useNotificationStore = create<NotificationState>((set, get) => ({
    notifications: [],
    unreadCount: 0,
    connectionStatus: "disconnected",
    isLoading: false,
    hasMore: true,
    currentPage: 0,

    setConnectionStatus: (status) => set({ connectionStatus: status }),

    fetchNotifications: async (page = 0) => {
        const { isLoading } = get();
        if (isLoading) return;

        set({ isLoading: true });
        try {
            const res = await notificationApi.getNotifications(page, 20);
            const pageData = res.data.data;
            const newNotifications = pageData.content.map(toNotificationData);

            set((state) => ({
                notifications:
                    page === 0
                        ? newNotifications
                        : [...state.notifications, ...newNotifications],
                hasMore: !pageData.last,
                currentPage: page,
                isLoading: false,
            }));
        } catch (error) {
            console.error("[NotificationStore] Failed to fetch notifications:", error);
            set({ isLoading: false });
        }
    },

    fetchUnreadCount: async () => {
        try {
            const res = await notificationApi.getUnreadCount();
            set({ unreadCount: res.data.data.unreadCount });
        } catch (error) {
            console.error("[NotificationStore] Failed to fetch unread count:", error);
        }
    },

    markAsRead: async (id: string) => {
        // Optimistic update
        set((state) => ({
            notifications: state.notifications.map((n) =>
                n.id === id ? { ...n, isRead: true } : n
            ),
            unreadCount: Math.max(0, state.unreadCount - 1),
        }));

        try {
            await notificationApi.markAsRead(Number(id));
        } catch (error) {
            console.error("[NotificationStore] Failed to mark as read:", error);
            // Revert on error — refetch
            get().fetchUnreadCount();
        }
    },

    markAllAsRead: async () => {
        // Optimistic update
        set((state) => ({
            notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
            unreadCount: 0,
        }));

        try {
            await notificationApi.markAllAsRead();
        } catch (error) {
            console.error("[NotificationStore] Failed to mark all as read:", error);
            get().fetchUnreadCount();
        }
    },

    addRealtimeNotification: (notification) => {
        set((state) => ({
            notifications: [notification, ...state.notifications],
            unreadCount: state.unreadCount + 1,
        }));
    },

    reset: () =>
        set({
            notifications: [],
            unreadCount: 0,
            connectionStatus: "disconnected",
            isLoading: false,
            hasMore: true,
            currentPage: 0,
        }),
}));
