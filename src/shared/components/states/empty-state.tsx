"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  EmptyState (Enhanced) — Premium "no data" component
 *
 *  Animated, dark-mode aware, with gradient icon container.
 *  Accepts custom illustration or icon.
 * ═══════════════════════════════════════════════════════════
 */

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { Inbox, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";

// ─── Props ───────────────────────────────────────────────

export interface EmptyStateProps {
    /** Lucide icon or custom component */
    readonly icon?: LucideIcon;
    /** Custom illustration (replaces icon) */
    readonly illustration?: ReactNode;
    /** Primary heading */
    readonly title: string;
    /** Supporting description */
    readonly description?: string;
    /** Optional action below the description */
    readonly action?: ReactNode;
    /** Display variant */
    readonly variant?: "page" | "inline";
    /** Extra wrapper class */
    readonly className?: string;
}

// ─── Animation ───────────────────────────────────────────

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
};

const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// ─── Component ───────────────────────────────────────────

export function EmptyState({
    icon: Icon = Inbox,
    illustration,
    title,
    description,
    action,
    variant = "page",
    className,
}: EmptyStateProps) {
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
            {/* Illustration or Icon */}
            <motion.div variants={item} className="mb-5">
                {illustration ?? (
                    <div
                        className={cn(
                            "w-20 h-20 rounded-2xl flex items-center justify-center",
                            "bg-[rgba(145,158,171,0.06)] dark:bg-white/[0.04]"
                        )}
                    >
                        <Icon className="w-9 h-9 text-[#919EAB] dark:text-[#637381]" />
                    </div>
                )}
            </motion.div>

            {/* Title */}
            <motion.h3
                variants={item}
                className="text-xl font-bold text-[#1C252E] dark:text-white mb-2"
            >
                {title}
            </motion.h3>

            {/* Description */}
            {description && (
                <motion.p
                    variants={item}
                    className="text-sm text-[#637381] dark:text-[#919EAB] max-w-sm leading-relaxed"
                >
                    {description}
                </motion.p>
            )}

            {/* Action */}
            {action && (
                <motion.div variants={item} className="mt-5">
                    {action}
                </motion.div>
            )}
        </motion.div>
    );
}
