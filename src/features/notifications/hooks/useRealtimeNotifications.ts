/**
 * ═══════════════════════════════════════════════════════════
 *  useRealtimeNotifications — React Hook
 *
 *  Orchestrates WebSocket lifecycle:
 *    1. Connect when user is authenticated
 *    2. Subscribe to /user/queue/notifications
 *    3. On event → add to store + show toast
 *    4. Fetch initial unread count on mount
 *    5. Disconnect on logout / unmount
 * ═══════════════════════════════════════════════════════════
 */

"use client";

import { useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { tokenStorage } from "@/features/auth/lib/token-storage";
import { useToast } from "@/shared/components/ui/toast";
import {
    connectSocket,
    disconnectSocket,
    subscribe,
    onStatusChange,
} from "../lib/socket-client";
import { useNotificationStore } from "../store/useNotificationStore";
import type { RealtimeEvent, NotificationData } from "../types/notification-types";

// ─── Event → Toast mapping ──────────────────────────────

function getToastForEvent(event: RealtimeEvent): {
    title: string;
    description: string;
    type: "success" | "info" | "warning" | "error";
} {
    switch (event.type) {
        case "APPLICATION_SUBMITTED":
            return {
                title: "Ứng tuyển thành công!",
                description: `Hồ sơ của bạn đã được gửi cho vị trí "${(event.payload as Record<string, unknown>).jobTitle ?? ""}".`,
                type: "success",
            };
        case "APPLICATION_STAGE_CHANGED": {
            const p = event.payload as Record<string, unknown>;
            const toStage = String(p.toStage ?? "");
            const isRejected = toStage === "REJECTED";
            return {
                title: isRejected ? "Cập nhật hồ sơ" : "Hồ sơ được cập nhật!",
                description: `Vị trí "${p.jobTitle ?? ""}" đã chuyển sang giai đoạn ${toStage}.`,
                type: isRejected ? "warning" : "info",
            };
        }
        case "AI_MATCHING_COMPLETED":
            return {
                title: "AI đã phân tích xong",
                description: "Kết quả đánh giá độ khớp đã sẵn sàng.",
                type: "info",
            };
        case "AI_CV_PARSED":
            return {
                title: "CV đã được phân tích",
                description: "AI đã trích xuất thông tin từ CV của bạn.",
                type: "success",
            };
        case "AI_CV_REVIEWED":
            return {
                title: "AI đã review CV",
                description: "Nhận xét và gợi ý cải thiện đã sẵn sàng.",
                type: "info",
            };
        default:
            return {
                title: "Thông báo mới",
                description: "Bạn có một thông báo mới.",
                type: "info",
            };
    }
}

/** Convert a realtime event to a NotificationData for the store */
function eventToNotification(event: RealtimeEvent): NotificationData {
    const toast = getToastForEvent(event);
    return {
        id: `rt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        type: event.type,
        title: toast.title,
        message: toast.description,
        isRead: false,
        createdAt: event.timestamp ?? new Date().toISOString(),
        isRealtime: true,
        metadata: event.payload as Record<string, unknown>,
    };
}

// ─── Hook ────────────────────────────────────────────────

export function useRealtimeNotifications() {
    const { user, isAuthenticated } = useAuth();
    const { addToast } = useToast();
    const {
        setConnectionStatus,
        fetchUnreadCount,
        addRealtimeNotification,
        reset,
    } = useNotificationStore();

    const unsubRef = useRef<(() => void) | null>(null);
    const statusUnsubRef = useRef<(() => void) | null>(null);

    const handleEvent = useCallback(
        (body: unknown) => {
            const event = body as RealtimeEvent;
            console.log("[Realtime] Received event:", event.type, event);

            // 1. Add to notification store
            const notification = eventToNotification(event);
            addRealtimeNotification(notification);

            // 2. Show toast
            const toastConfig = getToastForEvent(event);
            addToast(toastConfig.title, toastConfig.type, 5000, toastConfig.description);
        },
        [addRealtimeNotification, addToast]
    );

    useEffect(() => {
        if (!isAuthenticated || !user) {
            // Not logged in — disconnect & reset
            disconnectSocket();
            reset();
            return;
        }

        const token = tokenStorage.getAccessToken();
        if (!token) return;

        // 1. Listen for connection status changes
        statusUnsubRef.current = onStatusChange((status) => {
            setConnectionStatus(status);

            // When connected, subscribe to user-specific notifications
            if (status === "connected") {
                // Subscribe to /user/queue/notifications (per-user destination)
                unsubRef.current?.();
                unsubRef.current = subscribe(
                    "/user/queue/notifications",
                    handleEvent
                );
            }
        });

        // 2. Connect WebSocket
        connectSocket(token);

        // 3. Fetch initial unread count via REST API
        fetchUnreadCount();

        // Cleanup
        return () => {
            unsubRef.current?.();
            unsubRef.current = null;
            statusUnsubRef.current?.();
            statusUnsubRef.current = null;
            disconnectSocket();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, user?.id]);
}
