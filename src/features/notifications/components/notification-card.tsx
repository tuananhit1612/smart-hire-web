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
        color: "text-sky-600",
        bg: "bg-sky-50",
    },
    [NotificationType.INTERVIEW_INVITE]: {
        icon: Calendar,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
    },
    [NotificationType.AI_ANALYSIS]: {
        icon: BrainCircuit,
        color: "text-violet-600",
        bg: "bg-violet-50",
    },
    [NotificationType.JOB_MATCH]: {
        icon: Sparkles,
        color: "text-amber-600",
        bg: "bg-amber-50",
    },
    [NotificationType.SYSTEM]: {
        icon: Bell,
        color: "text-slate-600",
        bg: "bg-slate-100",
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
                    ? "bg-white border-slate-100"
                    : "bg-white border-sky-200 shadow-md shadow-sky-500/10 border-l-4 border-l-sky-500"
            )}
        >

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
                            ? "font-medium text-slate-600"
                            : "font-semibold text-sky-900"
                    )}
                >
                    {notification.title}
                </h3>
                <p
                    className={cn(
                        "text-base leading-relaxed line-clamp-3",
                        notification.isRead ? "text-slate-400" : "text-slate-600"
                    )}
                >
                    {notification.message}
                </p>
                <span className="block mt-2.5 text-sm text-slate-400">
                    {formatTimeAgo(notification.createdAt)}
                </span>
            </div>

            {/* Arrow */}
            <ChevronRight
                className={cn(
                    "shrink-0 w-5 h-5 mt-1.5 transition-transform duration-200",
                    "text-slate-300 group-hover:text-sky-500 group-hover:translate-x-0.5",
                )}
            />
        </motion.div>
    );
}
