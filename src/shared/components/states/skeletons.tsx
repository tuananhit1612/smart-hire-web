"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  Skeleton Presets — Common skeleton layouts
 *
 *  Re-uses the existing Skeleton primitive from shared/ui.
 *  These are higher-level compositions for common page types.
 * ═══════════════════════════════════════════════════════════
 */

import { motion } from "framer-motion";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/utils/cn";

// ─── Card Skeleton ───────────────────────────────────────

export interface CardSkeletonProps {
    /** Show skill tags row */
    readonly showTags?: boolean;
    /** Extra class */
    readonly className?: string;
}

export function CardSkeleton({ showTags = true, className }: CardSkeletonProps) {
    return (
        <div
            className={cn(
                "bg-white dark:bg-[#1C252E] rounded-2xl p-5",
                "border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]",
                className
            )}
        >
            {/* Header */}
            <div className="flex gap-3 mb-4">
                <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                    <Skeleton className="h-4 w-3/4 rounded-lg" />
                    <Skeleton className="h-3 w-1/2 rounded-lg" />
                </div>
            </div>
            {/* Tags */}
            {showTags && (
                <div className="flex gap-2 mb-3">
                    <Skeleton className="h-6 w-16 rounded-lg" />
                    <Skeleton className="h-6 w-20 rounded-lg" />
                    <Skeleton className="h-6 w-14 rounded-lg" />
                </div>
            )}
            {/* Body lines */}
            <div className="space-y-2 mb-4">
                <Skeleton className="h-3 w-full rounded-lg" />
                <Skeleton className="h-3 w-5/6 rounded-lg" />
            </div>
            {/* Footer */}
            <Skeleton className="h-10 w-full rounded-xl" />
        </div>
    );
}

// ─── Card Grid Skeleton ──────────────────────────────────

export interface CardGridSkeletonProps {
    /** Number of cards */
    readonly count?: number;
    /** Grid columns class */
    readonly columns?: string;
    /** Extra class */
    readonly className?: string;
}

export function CardGridSkeleton({
    count = 6,
    columns = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    className,
}: CardGridSkeletonProps) {
    return (
        <div className={cn("grid gap-6", columns, className)}>
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                    <CardSkeleton />
                </motion.div>
            ))}
        </div>
    );
}

// ─── Table Skeleton ──────────────────────────────────────

export interface TableSkeletonProps {
    /** Number of rows */
    readonly rows?: number;
    /** Number of columns */
    readonly cols?: number;
    /** Extra class */
    readonly className?: string;
}

export function TableSkeleton({
    rows = 5,
    cols = 4,
    className,
}: TableSkeletonProps) {
    return (
        <div
            className={cn(
                "bg-white dark:bg-[#1C252E] rounded-2xl overflow-hidden",
                "border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]",
                className
            )}
        >
            {/* Header */}
            <div className="flex gap-4 px-6 py-4 border-b border-[rgba(145,158,171,0.12)] dark:border-white/[0.06]">
                {Array.from({ length: cols }).map((_, i) => (
                    <Skeleton
                        key={i}
                        className={cn(
                            "h-4 rounded-lg",
                            i === 0 ? "w-1/4" : i === cols - 1 ? "w-16" : "flex-1"
                        )}
                    />
                ))}
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, row) => (
                <motion.div
                    key={row}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: row * 0.05 }}
                    className="flex gap-4 px-6 py-4 border-b border-[rgba(145,158,171,0.06)] dark:border-white/[0.03] last:border-0"
                >
                    {Array.from({ length: cols }).map((_, col) => (
                        <Skeleton
                            key={col}
                            className={cn(
                                "h-3.5 rounded-lg",
                                col === 0 ? "w-1/4" : col === cols - 1 ? "w-16" : "flex-1"
                            )}
                        />
                    ))}
                </motion.div>
            ))}
        </div>
    );
}

// ─── Profile Skeleton ────────────────────────────────────

export function ProfileSkeleton({ className }: { readonly className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn("space-y-6", className)}
        >
            {/* Header card */}
            <div className="bg-white dark:bg-[#1C252E] rounded-2xl p-6 border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]">
                <div className="flex items-center gap-5">
                    <Skeleton className="w-20 h-20 rounded-2xl shrink-0" />
                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-5 w-2/5 rounded-lg" />
                        <Skeleton className="h-3.5 w-1/3 rounded-lg" />
                        <div className="flex gap-3">
                            <Skeleton className="h-7 w-20 rounded-lg" />
                            <Skeleton className="h-7 w-24 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
            {/* Sections */}
            {[1, 2].map((s) => (
                <div
                    key={s}
                    className="bg-white dark:bg-[#1C252E] rounded-2xl p-6 border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] space-y-4"
                >
                    <Skeleton className="h-5 w-1/4 rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-3.5 w-full rounded-lg" />
                        <Skeleton className="h-3.5 w-5/6 rounded-lg" />
                        <Skeleton className="h-3.5 w-3/4 rounded-lg" />
                    </div>
                </div>
            ))}
        </motion.div>
    );
}

// ─── List Skeleton ───────────────────────────────────────

export interface ListSkeletonProps {
    /** Number of items */
    readonly count?: number;
    /** Extra class */
    readonly className?: string;
}

export function ListSkeleton({ count = 5, className }: ListSkeletonProps) {
    return (
        <div className={cn("space-y-3", className)}>
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl",
                        "bg-white dark:bg-[#1C252E]",
                        "border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]"
                    )}
                >
                    <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-3.5 w-3/5 rounded-lg" />
                        <Skeleton className="h-3 w-2/5 rounded-lg" />
                    </div>
                    <Skeleton className="w-20 h-8 rounded-lg shrink-0" />
                </motion.div>
            ))}
        </div>
    );
}
