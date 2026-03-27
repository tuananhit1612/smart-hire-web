"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Bell, 
    CheckCheck, 
    Inbox, 
    ChevronRight,
    Briefcase,
    Calendar,
    BrainCircuit,
    Sparkles
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useNotificationStore } from "../stores/notification-store";
import type { NotificationDto } from "../api/notification-api";

// Re-use logic from NotificationCard but condensed
const ICON_CONFIG: Record<string, { icon: any; color: string; bg: string }> = {
    "APPLICATION_STATUS": {
        icon: Briefcase,
        color: "text-[#22c55e]",
        bg: "bg-[#22c55e]/10",
    },
    "INTERVIEW_INVITE": {
        icon: Calendar,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
    },
    "AI_ANALYSIS": {
        icon: BrainCircuit,
        color: "text-violet-600",
        bg: "bg-violet-50",
    },
    "JOB_MATCH": {
        icon: Sparkles,
        color: "text-amber-600",
        bg: "bg-amber-50",
    },
    "SYSTEM": {
        icon: Bell,
        color: "text-[#637381]",
        bg: "bg-[rgba(145,158,171,0.08)]",
    },
};

function formatTimeAgo(dateStr: string): string {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
}

interface NotificationPopoverProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
}

export function NotificationPopover({ isOpen, onClose }: NotificationPopoverProps) {
    const { notifications, unreadCount, markAsRead, markAllAsRead, isLoading } = useNotificationStore();
    const popoverRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    const displayNotifications = notifications.slice(0, 5);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={popoverRef}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={cn(
                        "absolute right-0 top-full mt-3 w-[380px] z-[100]",
                        "bg-white dark:bg-[#1C252E] rounded-2xl shadow-2xl shadow-[#22c55e]/10",
                        "border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]",
                        "overflow-hidden backdrop-blur-xl"
                    )}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]">
                        <div>
                            <h3 className="text-base font-bold text-[#1C252E] dark:text-white">Thông báo</h3>
                            <p className="text-xs text-[#637381] dark:text-[#919EAB]">
                                {unreadCount > 0 ? `Bạn có ${unreadCount} tin nhắn mới` : "Không có tin nhắn chưa đọc"}
                            </p>
                        </div>
                        {unreadCount > 0 && (
                            <button 
                                onClick={() => markAllAsRead()}
                                className="p-2 text-[#22c55e] hover:bg-[#22c55e]/10 rounded-full transition-colors group"
                                title="Đánh dấu tất cả đã đọc"
                            >
                                <CheckCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                        )}
                    </div>

                    {/* Content */}
                    <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
                        {isLoading && displayNotifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 space-y-3">
                                <div className="w-8 h-8 border-2 border-[#22c55e] border-t-transparent rounded-full animate-spin" />
                                <span className="text-sm text-[#637381]">Đang tải...</span>
                            </div>
                        ) : displayNotifications.length > 0 ? (
                            <div className="divide-y divide-[rgba(145,158,171,0.08)] dark:divide-white/[0.04]">
                                {displayNotifications.map((n, idx) => (
                                    <NotificationItem 
                                        key={n.id} 
                                        notification={n} 
                                        onClick={() => {
                                            if (!n.isRead) markAsRead(n.id);
                                            onClose();
                                        }}
                                        index={idx}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                                <div className="w-14 h-14 rounded-full bg-[rgba(145,158,171,0.08)] flex items-center justify-center">
                                    <Inbox className="w-7 h-7 text-[#C4CDD5]" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#637381] dark:text-[#919EAB]">Hộp thư trống</p>
                                    <p className="text-xs text-[#919EAB] dark:text-[#637381]">Bạn chưa có thông báo nào.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <Link 
                        href="/notifications"
                        onClick={onClose}
                        className={cn(
                            "flex items-center justify-center gap-1.5 p-4 text-sm font-bold text-[#22c55e]",
                            "hover:bg-[rgba(34,197,94,0.08)] transition-colors border-t border-[rgba(145,158,171,0.12)]"
                        )}
                    >
                        Xem tất cả
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function NotificationItem({ 
    notification, 
    onClick,
    index
}: { 
    notification: NotificationDto; 
    onClick: () => void;
    index: number;
}) {
    const config = ICON_CONFIG[notification.type] || ICON_CONFIG.SYSTEM;
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={onClick}
            className={cn(
                "flex items-start gap-4 p-4 cursor-pointer transition-all relative overflow-hidden",
                "hover:bg-[rgba(145,158,171,0.06)] dark:hover:bg-white/[0.04]",
                !notification.isRead && "bg-[rgba(34,197,94,0.03)] dark:bg-[rgba(34,197,94,0.05)]"
            )}
        >
            {!notification.isRead && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#22c55e]" />
            )}
            
            <div className={cn("shrink-0 w-10 h-10 rounded-xl flex items-center justify-center", config.bg)}>
                <Icon className={cn("w-5 h-5", config.color)} />
            </div>

            <div className="flex-1 min-w-0">
                <p className={cn(
                    "text-sm leading-snug break-words mb-1",
                    notification.isRead ? "text-[#637381] dark:text-[#919EAB]" : "font-semibold text-[#1C252E] dark:text-white"
                )}>
                    {notification.title}
                </p>
                <p className="text-xs text-[#919EAB] dark:text-[#637381] line-clamp-1 mb-1.5">
                    {notification.message}
                </p>
                <div className="flex items-center justify-between">
                   <span className="text-[10px] text-[#919EAB]">{formatTimeAgo(notification.createdAt)}</span>
                   {!notification.isRead && (
                       <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                   )}
                </div>
            </div>
        </motion.div>
    );
}
