/**
 * ═══════════════════════════════════════════════════════════
 *  Notification Store — Zustand
 *
 *  State trung tâm cho notifications (REST + realtime).
 *  Hỗ trợ optimistic update, dedup realtime events, pagination.
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

/** REST API response → UI model */
function toNotificationData(dto: NotificationResponse): NotificationData {
    return {
        id: String(dto.id),
        type: dto.type,
        title: dto.title,
        message: dto.message,
        isRead: dto.isRead,
        createdAt: dto.createdAt,
        link: dto.link,
        metadata: dto.metadata,
        isRealtime: false,
    };
}

// ─── Initial state (extract để reset đúng chuẩn) ────────

const INITIAL_STATE = {
    notifications: [] as NotificationData[],
    unreadCount: 0,
    connectionStatus: "disconnected" as SocketConnectionStatus,
    isLoading: false,
    hasMore: true,
    currentPage: 0,
};

// ─── Store Interface ─────────────────────────────────────

interface NotificationStore {
    // State
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

export const useNotificationStore = create<NotificationStore>((set, get) => ({
    ...INITIAL_STATE,

    setConnectionStatus: (connectionStatus) => set({ connectionStatus }),

    fetchNotifications: async (page = 0) => {
        if (get().isLoading) return;

        set({ isLoading: true });

        try {
            const { data } = await notificationApi.getNotifications(page, 20);
            const pageData = data.data;
            const fetched = pageData.content.map(toNotificationData);

            set((s) => ({
                notifications: page === 0 ? fetched : [...s.notifications, ...fetched],
                hasMore: !pageData.last,
                currentPage: page,
            }));
        } catch (err) {
            console.error("[NotificationStore] fetchNotifications failed:", err);
        } finally {
            set({ isLoading: false });
        }
    },

    fetchUnreadCount: async () => {
        try {
            const { data } = await notificationApi.getUnreadCount();
            set({ unreadCount: data.data.unreadCount });
        } catch (err) {
            console.error("[NotificationStore] fetchUnreadCount failed:", err);
        }
    },

    markAsRead: async (id) => {
        const target = get().notifications.find((n) => n.id === id);
        if (!target || target.isRead) return; // Already read — skip

        // Optimistic update
        set((s) => ({
            notifications: s.notifications.map((n) =>
                n.id === id ? { ...n, isRead: true } : n,
            ),
            unreadCount: Math.max(0, s.unreadCount - 1),
        }));

        try {
            await notificationApi.markAsRead(Number(id));
        } catch (err) {
            console.error("[NotificationStore] markAsRead failed:", err);
            get().fetchUnreadCount(); // Revert — re-sync from server
        }
    },

    markAllAsRead: async () => {
        // Optimistic update
        set((s) => ({
            notifications: s.notifications.map((n) => ({ ...n, isRead: true })),
            unreadCount: 0,
        }));

        try {
            await notificationApi.markAllAsRead();
        } catch (err) {
            console.error("[NotificationStore] markAllAsRead failed:", err);
            get().fetchUnreadCount();
        }
    },

    addRealtimeNotification: (notification) => {
        // Dedup: tránh thêm trùng nếu event đến 2 lần (network retry)
        const exists = get().notifications.some((n) => n.id === notification.id);
        if (exists) return;

        set((s) => ({
            notifications: [notification, ...s.notifications],
            unreadCount: s.unreadCount + 1,
        }));
    },

    reset: () => set(INITIAL_STATE),
}));
