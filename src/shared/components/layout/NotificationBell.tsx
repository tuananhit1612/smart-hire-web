"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useNotificationStore } from "@/features/notifications/stores/notification-store";
import { NotificationPopover } from "@/features/notifications/components/NotificationPopover";

/**
 * Notification bell icon with unread count badge and popover.
 * Reads unread count from real Zustand notification store.
 */
export function NotificationBell() {
    const unreadCount = useNotificationStore((s) => s.unreadCount);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                className={cn(
                    "relative z-50 flex items-center justify-center w-10 h-10 rounded-full",
                    "text-[#22c55e] hover:bg-[#22c55e]/15 hover:text-[#22c55e]",
                    "transition-all duration-200 hover:scale-110 cursor-pointer",
                    isPopoverOpen && "bg-[#22c55e]/15 shadow-inner"
                )}
                aria-label={`Thông báo${unreadCount > 0 ? ` (${unreadCount} chưa đọc)` : ""}`}
            >
                <Bell className={cn("w-5 h-5", isPopoverOpen && "fill-[#22c55e]/20")} />

                {unreadCount > 0 && (
                    <span
                        className={cn(
                            "absolute -top-0.5 -right-0.5 flex items-center justify-center",
                            "min-w-[18px] h-[18px] px-1 rounded-full",
                            "bg-red-500 text-white text-[10px] font-bold",
                            "ring-2 ring-white dark:ring-[#1C252E]",
                            "animate-pulse pointer-events-none"
                        )}
                    >
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            <NotificationPopover 
                isOpen={isPopoverOpen} 
                onClose={() => setIsPopoverOpen(false)} 
            />
        </div>
    );
}
