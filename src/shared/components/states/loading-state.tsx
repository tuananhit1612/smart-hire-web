"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  LoadingState — Premium loading indicator
 *
 *  Variants:
 *   • "page"    — centered vertically, min-h-[60vh]
 *   • "inline"  — compact, sits within a section
 *   • "overlay" — absolute overlay with backdrop blur
 *
 *  Uses the SmartHire emerald (#22C55E) design system.
 * ═══════════════════════════════════════════════════════════
 */

import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";

// ─── Props ───────────────────────────────────────────────

export interface LoadingStateProps {
    /** Display variant */
    readonly variant?: "page" | "inline" | "overlay";
    /** Optional text below spinner */
    readonly text?: string;
    /** Spinner size in px */
    readonly size?: number;
    /** Extra wrapper class */
    readonly className?: string;
}

// ─── Animated Spinner ────────────────────────────────────

function Spinner({ size = 36 }: { size?: number }) {
    return (
        <div className="relative" style={{ width: size, height: size }}>
            {/* Outer ring */}
            <motion.div
                className="absolute inset-0 rounded-full border-[3px] border-[#22C55E]/20 dark:border-[#22C55E]/10"
            />
            {/* Rotating arc */}
            <motion.div
                className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#22C55E]"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner pulse dot */}
            <motion.div
                className="absolute inset-[30%] rounded-full bg-[#22C55E]/30 dark:bg-[#22C55E]/20"
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}

// ─── Component ───────────────────────────────────────────

export function LoadingState({
    variant = "page",
    text = "Đang tải dữ liệu...",
    size,
    className,
}: LoadingStateProps) {
    const spinnerSize = size ?? (variant === "inline" ? 24 : 36);

    const content = (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4"
        >
            <Spinner size={spinnerSize} />
            {text && (
                <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className={cn(
                        "font-medium text-[#919EAB] dark:text-[#637381]",
                        variant === "inline" ? "text-xs" : "text-sm"
                    )}
                >
                    {text}
                </motion.p>
            )}
        </motion.div>
    );

    if (variant === "overlay") {
        return (
            <div
                className={cn(
                    "absolute inset-0 z-20 flex items-center justify-center",
                    "bg-white/60 dark:bg-[#141A21]/60 backdrop-blur-sm rounded-2xl",
                    className
                )}
            >
                {content}
            </div>
        );
    }

    return (
        <div
            className={cn(
                "flex items-center justify-center",
                variant === "page" && "min-h-[60vh]",
                variant === "inline" && "py-12",
                className
            )}
        >
            {content}
        </div>
    );
}
