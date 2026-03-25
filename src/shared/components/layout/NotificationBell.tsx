"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useNotificationStore } from "@/features/notifications/stores/notification-store";

/**
 * Notification bell icon with unread count badge and connection status.
 * Reads unread count from Zustand notification store (fed by WebSocket).
 */
export function NotificationBell() {
    const unreadCount = useNotificationStore((s) => s.unreadCount);
    const connectionStatus = useNotificationStore((s) => s.connectionStatus);

    return (
        <Link
            href="/notifications"
            className={cn(
                "relative z-50 flex items-center justify-center w-10 h-10 rounded-full",
                "text-[#22c55e] hover:bg-[#22c55e]/15 hover:text-[#22c55e]",
                "transition-all duration-200 hover:scale-110 cursor-pointer"
            )}
            aria-label={`Thông báo${unreadCount > 0 ? ` (${unreadCount} chưa đọc)` : ""}`}
        >
            <Bell className="w-5 h-5" />

            {unreadCount > 0 && (
                <span
                    className={cn(
                        "absolute -top-0.5 -right-0.5 flex items-center justify-center",
                        "min-w-[18px] h-[18px] px-1 rounded-full",
                        "bg-red-500 text-white text-[10px] font-bold",
                        "ring-2 ring-white",
                        "animate-pulse pointer-events-none"
                    )}
                >
                    {unreadCount > 9 ? "9+" : unreadCount}
                </span>
            )}

            {/* Connection status dot */}
            <span
                className={cn(
                    "absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full ring-2 ring-white dark:ring-[#1C252E] pointer-events-none transition-colors duration-300",
                    connectionStatus === "connected" && "bg-emerald-400",
                    connectionStatus === "reconnecting" && "bg-amber-400 animate-pulse",
                    connectionStatus === "disconnected" && "bg-gray-400"
                )}
                title={
                    connectionStatus === "connected"
                        ? "Đã kết nối realtime"
                        : connectionStatus === "reconnecting"
                        ? "Đang kết nối lại..."
                        : "Mất kết nối"
                }
            />
        </Link>
    );
}
