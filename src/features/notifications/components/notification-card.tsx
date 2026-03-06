"use client";

import { motion } from "framer-motion";
import {
    Briefcase,
    Calendar,
    BrainCircuit,
    Sparkles,
    Bell,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Notification, NotificationType } from "../types/mock-notifications";

const ICON_CONFIG: Record<NotificationType, { icon: typeof Bell; color: string; bg: string }> = {
    [NotificationType.APPLICATION_STATUS]: {
        icon: Briefcase,
        color: "text-sky-600 dark:text-sky-400",
        bg: "bg-sky-50 dark:bg-sky-900/30",
    },
    [NotificationType.INTERVIEW_INVITE]: {
        icon: Calendar,
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-900/30",
    },
    [NotificationType.AI_ANALYSIS]: {
        icon: BrainCircuit,
        color: "text-violet-600 dark:text-violet-400",
        bg: "bg-violet-50 dark:bg-violet-900/30",
    },
    [NotificationType.JOB_MATCH]: {
        icon: Sparkles,
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-900/30",
    },
    [NotificationType.SYSTEM]: {
        icon: Bell,
        color: "text-[#637381] dark:text-[#919EAB]",
        bg: "bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.06]",
    },
};

interface NotificationCardProps {
    readonly notification: Notification;
    readonly onMarkRead: (id: string) => void;
    readonly index: number;
}

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
    return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function NotificationCard({ notification, onMarkRead, index }: NotificationCardProps) {
    const config = ICON_CONFIG[notification.type];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: index * 0.04, duration: 0.3 }}
            onClick={() => onMarkRead(notification.id)}
            className={cn(
                "group relative z-10 flex items-start gap-5 p-6 rounded-2xl border cursor-pointer overflow-hidden",
                "transition-all duration-200 hover:shadow-lg hover:shadow-sky-900/5 hover:scale-[1.01]",
                notification.isRead
                    ? "bg-white dark:bg-[#1C252E] border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]"
                    : "bg-white dark:bg-[#1C252E] border-sky-200 dark:border-sky-700/50 shadow-md shadow-sky-500/10 dark:shadow-sky-900/20 border-l-4 border-l-sky-500 dark:border-l-sky-500"
            )}
        >
            {/* Unread glow strip */}
            {!notification.isRead && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-500 rounded-l-2xl" />
            )}

            {/* Icon */}
            <div className={cn("shrink-0 w-14 h-14 rounded-xl flex items-center justify-center", config.bg)}>
                <Icon className={cn("w-7 h-7", config.color)} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h3
                    className={cn(
                        "text-lg leading-snug mb-1.5",
                        notification.isRead
                            ? "font-medium text-[#637381] dark:text-[#919EAB]"
                            : "font-semibold text-[#1C252E] dark:text-white"
                    )}
                >
                    {notification.title}
                </h3>
                <p
                    className={cn(
                        "text-base leading-relaxed line-clamp-3",
                        notification.isRead
                            ? "text-[#919EAB] dark:text-[#637381]"
                            : "text-[#637381] dark:text-[#C4CDD5]"
                    )}
                >
                    {notification.message}
                </p>
                <span className="block mt-2.5 text-sm text-[#919EAB] dark:text-[#637381]">
                    {formatTimeAgo(notification.createdAt)}
                </span>
            </div>

            {/* Arrow */}
            <ChevronRight
                className={cn(
                    "shrink-0 w-5 h-5 mt-1.5 transition-transform duration-200",
                    "text-[#C4CDD5] dark:text-[#637381] group-hover:text-sky-500 dark:group-hover:text-sky-400 group-hover:translate-x-0.5",
                )}
            />
        </motion.div>
    );
}
