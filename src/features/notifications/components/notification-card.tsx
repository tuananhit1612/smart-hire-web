"use client";

import { motion } from "framer-motion";
import {
    Briefcase,
    Calendar,
    BrainCircuit,
    Sparkles,
    Bell,
    ChevronRight,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import type { NotificationData } from "../types/notification-types";

// ─── Icon style presets (DRY — reuse across similar types) ───

interface IconStyle {
    icon: LucideIcon;
    color: string;
    bg: string;
}

const STYLE_APPLICATION: IconStyle = {
    icon: Briefcase,
    color: "text-[#22c55e] dark:text-[#22c55e]",
    bg: "bg-[#22c55e]/10 dark:bg-[#22c55e]/20",
};

const STYLE_INTERVIEW: IconStyle = {
    icon: Calendar,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/30",
};

const STYLE_AI: IconStyle = {
    icon: BrainCircuit,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/30",
};

const STYLE_MATCH: IconStyle = {
    icon: Sparkles,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/30",
};

const STYLE_DEFAULT: IconStyle = {
    icon: Bell,
    color: "text-[#637381] dark:text-[#919EAB]",
    bg: "bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.06]",
};

/** Type → icon style mapping */
const ICON_CONFIG: Record<string, IconStyle> = {
    // Application events
    APPLICATION_STATUS:       STYLE_APPLICATION,
    APPLICATION_SUBMITTED:    STYLE_APPLICATION,
    APPLICATION_STAGE_CHANGED: STYLE_APPLICATION,
    // Interview
    INTERVIEW_INVITE:         STYLE_INTERVIEW,
    // AI events
    AI_ANALYSIS:              STYLE_AI,
    AI_MATCHING_COMPLETED:    STYLE_AI,
    AI_CV_PARSED:             STYLE_AI,
    AI_CV_REVIEWED:           STYLE_AI,
    // Job matching
    JOB_MATCH:                STYLE_MATCH,
    // Fallback
    SYSTEM:                   STYLE_DEFAULT,
};

function resolveStyle(type: string): IconStyle {
    return ICON_CONFIG[type] ?? STYLE_DEFAULT;
}

// ─── Time ago formatter ──────────────────────────────────

const MINUTE = 60_000;
const HOUR = 3_600_000;
const DAY = 86_400_000;

function formatTimeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();

    if (diff < MINUTE) return "Vừa xong";
    if (diff < HOUR) return `${Math.floor(diff / MINUTE)} phút trước`;
    if (diff < DAY) return `${Math.floor(diff / HOUR)} giờ trước`;
    if (diff < DAY * 7) return `${Math.floor(diff / DAY)} ngày trước`;

    return new Date(dateStr).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

// ─── Component ───────────────────────────────────────────

interface NotificationCardProps {
    readonly notification: NotificationData;
    readonly onMarkRead: (id: string) => void;
    readonly index: number;
}

export function NotificationCard({ notification, onMarkRead, index }: NotificationCardProps) {
    const { icon: Icon, color, bg } = resolveStyle(notification.type);
    const isUnread = !notification.isRead;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: index * 0.04, duration: 0.3 }}
            onClick={() => onMarkRead(notification.id)}
            className={cn(
                "group relative z-10 flex items-start gap-5 p-6 rounded-2xl border cursor-pointer overflow-hidden",
                "transition-all duration-200 hover:shadow-lg hover:shadow-[#22c55e]/5 hover:scale-[1.01]",
                isUnread
                    ? "bg-white dark:bg-[#1C252E] border-[#22c55e]/30 dark:border-[#22c55e]/30 shadow-md shadow-[#22c55e]/20 dark:shadow-[#22c55e]/20 border-l-4 border-l-[#22c55e] dark:border-l-[#22c55e]"
                    : "bg-white dark:bg-[#1C252E] border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]",
            )}
        >
            {/* Unread glow strip */}
            {isUnread && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#22c55e] rounded-l-2xl" />
            )}

            {/* Icon */}
            <div className={cn("shrink-0 w-14 h-14 rounded-xl flex items-center justify-center", bg)}>
                <Icon className={cn("w-7 h-7", color)} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h3
                    className={cn(
                        "text-lg leading-snug mb-1.5",
                        isUnread
                            ? "font-semibold text-[#1C252E] dark:text-white"
                            : "font-medium text-[#637381] dark:text-[#919EAB]",
                    )}
                >
                    {notification.title}
                </h3>
                <p
                    className={cn(
                        "text-base leading-relaxed line-clamp-3",
                        isUnread
                            ? "text-[#637381] dark:text-[#C4CDD5]"
                            : "text-[#919EAB] dark:text-[#637381]",
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
                    "text-[#C4CDD5] dark:text-[#637381]",
                    "group-hover:text-[#22c55e] dark:group-hover:text-[#22c55e] group-hover:translate-x-0.5",
                )}
            />
        </motion.div>
    );
}
