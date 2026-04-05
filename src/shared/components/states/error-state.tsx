"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  ErrorState — Premium error display with retry support
 *
 *  Renders a centered error panel with icon, message,
 *  and optional retry / custom action.
 *
 *  Uses SmartHire design tokens.
 * ═══════════════════════════════════════════════════════════
 */

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, WifiOff, ServerCrash, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";

// ─── Props ───────────────────────────────────────────────

export interface ErrorStateProps {
    /** Error title */
    readonly title?: string;
    /** Error description / message */
    readonly description?: string;
    /** Retry callback — shows retry button when provided */
    readonly onRetry?: () => void;
    /** Custom retry button label */
    readonly retryLabel?: string;
    /** Custom icon (defaults to AlertTriangle) */
    readonly icon?: LucideIcon;
    /** Error type — changes icon automatically */
    readonly type?: "generic" | "network" | "server";
    /** Custom action node below the description */
    readonly action?: ReactNode;
    /** Display variant */
    readonly variant?: "page" | "inline";
    /** Extra wrapper class */
    readonly className?: string;
}

// ─── Icon Config ─────────────────────────────────────────

const ICON_MAP: Record<string, { icon: LucideIcon; bg: string; color: string }> = {
    generic: {
        icon: AlertTriangle,
        bg: "bg-[#FF5630]/10 dark:bg-[#FF5630]/15",
        color: "text-[#FF5630]",
    },
    network: {
        icon: WifiOff,
        bg: "bg-amber-500/10 dark:bg-amber-500/15",
        color: "text-amber-500",
    },
    server: {
        icon: ServerCrash,
        bg: "bg-rose-500/10 dark:bg-rose-500/15",
        color: "text-rose-500",
    },
};

// ─── Animation ───────────────────────────────────────────

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// ─── Component ───────────────────────────────────────────

export function ErrorState({
    title = "Đã xảy ra lỗi",
    description = "Không thể tải dữ liệu. Vui lòng thử lại sau.",
    onRetry,
    retryLabel = "Thử lại",
    icon,
    type = "generic",
    action,
    variant = "page",
    className,
}: ErrorStateProps) {
    const config = ICON_MAP[type] ?? ICON_MAP.generic;
    const Icon = icon ?? config.icon;

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className={cn(
                "flex flex-col items-center justify-center text-center px-4",
                variant === "page" && "min-h-[60vh]",
                variant === "inline" && "py-16",
                className
            )}
        >
            {/* Icon */}
            <motion.div
                variants={item}
                className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center mb-5",
                    config.bg
                )}
            >
                <Icon className={cn("w-9 h-9", config.color)} />
            </motion.div>

            {/* Title */}
            <motion.h3
                variants={item}
                className="text-xl font-bold text-[#1C252E] dark:text-white mb-2"
            >
                {title}
            </motion.h3>

            {/* Description */}
            <motion.p
                variants={item}
                className="text-sm text-[#637381] dark:text-[#919EAB] max-w-sm leading-relaxed"
            >
                {description}
            </motion.p>

            {/* Retry Button */}
            {onRetry && (
                <motion.button
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onRetry}
                    className={cn(
                        "mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl",
                        "bg-[#22C55E] text-white text-sm font-semibold",
                        "hover:bg-[#22C55E]/90 active:bg-[#22C55E]/80",
                        "shadow-md shadow-[#22C55E]/20 hover:shadow-lg hover:shadow-[#22C55E]/25",
                        "transition-all duration-200"
                    )}
                >
                    <RefreshCw className="w-4 h-4" />
                    {retryLabel}
                </motion.button>
            )}

            {/* Custom action */}
            {action && <motion.div variants={item} className="mt-5">{action}</motion.div>}
        </motion.div>
    );
}
