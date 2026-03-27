"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  useRealtimeNotifications — React Hook
 *
 *  Lifecycle:
 *    1. User authenticated → connectSocket(token)
 *    2. Connected → subscribe /user/queue/notifications
 *    3. On event → thêm vào store + hiện toast
 *    4. Logout / unmount → disconnectSocket
 * ═══════════════════════════════════════════════════════════
 */

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
import { EventType } from "../types/notification-types";

// ─── Event → Toast config (pure, no side-effects) ───────

interface ToastConfig {
    title: string;
    description: string;
    type: "success" | "info" | "warning" | "error";
}

const EVENT_TOAST_MAP: Record<string, (payload: Record<string, unknown>) => ToastConfig> = {
    [EventType.APPLICATION_SUBMITTED]: (p) => ({
        title: "Ứng tuyển thành công!",
        description: `Hồ sơ của bạn đã được gửi cho vị trí "${p.jobTitle ?? ""}".`,
        type: "success",
    }),

    [EventType.APPLICATION_STAGE_CHANGED]: (p) => {
        const toStage = String(p.toStage ?? "");
        return {
            title: toStage === "REJECTED" ? "Cập nhật hồ sơ" : "Hồ sơ được cập nhật!",
            description: `Vị trí "${p.jobTitle ?? ""}" chuyển sang giai đoạn ${toStage}.`,
            type: toStage === "REJECTED" ? "warning" : "info",
        };
    },

    [EventType.AI_MATCHING_COMPLETED]: () => ({
        title: "AI phân tích xong",
        description: "Kết quả đánh giá độ khớp đã sẵn sàng.",
        type: "info",
    }),

    [EventType.AI_CV_PARSED]: () => ({
        title: "CV đã được phân tích",
        description: "AI đã trích xuất thông tin từ CV của bạn.",
        type: "success",
    }),

    [EventType.AI_CV_REVIEWED]: () => ({
        title: "AI đã review CV",
        description: "Nhận xét và gợi ý cải thiện đã sẵn sàng.",
        type: "info",
    }),
};

const DEFAULT_TOAST: ToastConfig = {
    title: "Thông báo mới",
    description: "Bạn có một thông báo mới.",
    type: "info",
};

function resolveToast(event: RealtimeEvent): ToastConfig {
    const factory = EVENT_TOAST_MAP[event.type];
    return factory
        ? factory(event.payload as Record<string, unknown>)
        : DEFAULT_TOAST;
}

/** RealtimeEvent → NotificationData cho store */
function toNotification(event: RealtimeEvent): NotificationData {
    const toast = resolveToast(event);
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

export function useRealtimeNotifications(): void {
    const { user, isAuthenticated } = useAuth();
    const { addToast } = useToast();
    const {
        setConnectionStatus,
        fetchUnreadCount,
        addRealtimeNotification,
        reset,
    } = useNotificationStore();

    // Refs giữ cleanup functions — tránh stale closure
    const unsubMessageRef = useRef<(() => void) | null>(null);
    const unsubStatusRef = useRef<(() => void) | null>(null);

    /** Xử lý mỗi realtime event nhận được */
    const handleEvent = useCallback(
        (body: unknown) => {
            const event = body as RealtimeEvent;

            // 1. Thêm vào store
            addRealtimeNotification(toNotification(event));

            // 2. Hiện toast
            const toast = resolveToast(event);
            addToast(toast.title, toast.type, 5000, toast.description);
        },
        [addRealtimeNotification, addToast],
    );

    useEffect(() => {
        if (!isAuthenticated || !user) {
            disconnectSocket();
            reset();
            return;
        }

        const token = tokenStorage.getAccessToken();
        if (!token) return;

        // 1. Lắng nghe status → subscribe khi connected
        unsubStatusRef.current = onStatusChange((status) => {
            setConnectionStatus(status);

            if (status === "connected") {
                unsubMessageRef.current?.();
                unsubMessageRef.current = subscribe<RealtimeEvent>(
                    "/user/queue/notifications",
                    handleEvent,
                );
            }
        });

        // 2. Kết nối WebSocket
        connectSocket(token);

        // 3. Fetch unread count ban đầu qua REST
        fetchUnreadCount();

        // Cleanup
        return () => {
            unsubMessageRef.current?.();
            unsubMessageRef.current = null;
            unsubStatusRef.current?.();
            unsubStatusRef.current = null;
            disconnectSocket();
        };
        // Zustand actions are stable refs — safe to exclude
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, user?.id]);
}
