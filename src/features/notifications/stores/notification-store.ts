/**
 * ═════════════════════════════════════════════════════════
 *  Notification Zustand Store
 *  Manages realtime notification state received via WebSocket.
 * ═════════════════════════════════════════════════════════
 */

import { create } from "zustand";
import type { Notification } from "../types/mock-notifications";
import type { ConnectionStatus } from "@/core/socket";

interface NotificationState {
    /** All notifications, newest first */
    notifications: Notification[];
    /** Number of unread notifications */
    unreadCount: number;
    /** WebSocket connection status */
    connectionStatus: ConnectionStatus;

    // ── Actions ──
    /** Add a new notification (prepends to list) */
    addNotification: (notification: Notification) => void;
    /** Mark a single notification as read */
    markAsRead: (id: string) => void;
    /** Mark all notifications as read */
    markAllAsRead: () => void;
    /** Replace the entire notifications list */
    setNotifications: (notifications: Notification[]) => void;
    /** Update the WebSocket connection status */
    setConnectionStatus: (status: ConnectionStatus) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    unreadCount: 0,
    connectionStatus: "disconnected",

    addNotification: (notification) =>
        set((state) => {
            const notifications = [notification, ...state.notifications];
            return {
                notifications,
                unreadCount: notifications.filter((n) => !n.isRead).length,
            };
        }),

    markAsRead: (id) =>
        set((state) => {
            const notifications = state.notifications.map((n) =>
                n.id === id ? { ...n, isRead: true } : n
            );
            return {
                notifications,
                unreadCount: notifications.filter((n) => !n.isRead).length,
            };
        }),

    markAllAsRead: () =>
        set((state) => ({
            notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
            unreadCount: 0,
        })),

    setNotifications: (notifications) =>
        set({
            notifications,
            unreadCount: notifications.filter((n) => !n.isRead).length,
        }),

    setConnectionStatus: (connectionStatus) => set({ connectionStatus }),
}));
