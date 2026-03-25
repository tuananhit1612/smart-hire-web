"use client";

/**
 * ═════════════════════════════════════════════════════════
 *  SocketProvider
 *  Manages WebSocket lifecycle: connect on mount, subscribe
 *  to notification topics, push events to Zustand store.
 * ═════════════════════════════════════════════════════════
 */

import { useEffect, useRef } from "react";
import { socketService } from "@/core/socket";
import { useNotificationStore } from "@/features/notifications/stores/notification-store";
import { mockNotifications } from "@/features/notifications/types/mock-notifications";
import type { Notification } from "@/features/notifications/types/mock-notifications";

/** Helper: read JWT token from cookie */
function getAuthToken(): string | undefined {
    if (typeof document === "undefined") return undefined;
    return document.cookie
        .split("; ")
        .find((c) => c.startsWith("smarthire-token="))
        ?.split("=")[1];
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const initialized = useRef(false);
    const {
        setNotifications,
        addNotification,
        setConnectionStatus,
        notifications,
    } = useNotificationStore();

    useEffect(() => {
        // Load mock notifications as initial data (before socket connects)
        if (notifications.length === 0) {
            setNotifications([...mockNotifications]);
        }

        // Prevent double-init in StrictMode
        if (initialized.current) return;
        initialized.current = true;

        const token = getAuthToken();

        socketService.connect(token, {
            onConnect: () => {
                setConnectionStatus("connected");

                // Subscribe to personal notifications
                socketService.subscribe(
                    "/user/queue/notifications",
                    (message) => {
                        try {
                            const notification: Notification = JSON.parse(message.body);
                            addNotification(notification);
                        } catch (err) {
                            console.error("[SocketProvider] Failed to parse notification:", err);
                        }
                    }
                );

                // Subscribe to broadcast notifications
                socketService.subscribe(
                    "/topic/notifications",
                    (message) => {
                        try {
                            const notification: Notification = JSON.parse(message.body);
                            addNotification(notification);
                        } catch (err) {
                            console.error("[SocketProvider] Failed to parse broadcast:", err);
                        }
                    }
                );
            },
            onDisconnect: () => setConnectionStatus("disconnected"),
            onReconnecting: () => setConnectionStatus("reconnecting"),
            onError: (error) => {
                console.error("[SocketProvider] Socket error:", error);
                setConnectionStatus("disconnected");
            },
        });

        return () => {
            socketService.disconnect();
            setConnectionStatus("disconnected");
            initialized.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>{children}</>;
}
