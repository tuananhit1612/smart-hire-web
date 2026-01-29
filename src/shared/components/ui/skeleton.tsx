"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <motion.div
            className={cn(
                "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800",
                "bg-[length:200%_100%] rounded-lg",
                className
            )}
            animate={{
                backgroundPosition: ["200% 0", "-200% 0"]
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
            }}
        />
    );
}

// Skeleton for Template Card with glow effect
export function SkeletonTemplateCard() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-zinc-800"
        >
            {/* Shimmer overlay */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Thumbnail skeleton */}
            <div className="aspect-[3/4] bg-gray-100 dark:bg-zinc-800 p-4">
                <div className="h-full bg-white dark:bg-zinc-900 rounded-lg p-4 space-y-3">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-3 w-3/4 rounded-full" />
                            <Skeleton className="h-2.5 w-1/2 rounded-full" />
                        </div>
                    </div>
                    {/* Content sections */}
                    <div className="space-y-3 pt-2">
                        <Skeleton className="h-2 w-1/4 rounded-full" />
                        <div className="space-y-1.5">
                            <Skeleton className="h-2 w-full rounded-full" />
                            <Skeleton className="h-2 w-5/6 rounded-full" />
                            <Skeleton className="h-2 w-4/6 rounded-full" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-2 w-1/3 rounded-full" />
                        <div className="space-y-1.5">
                            <Skeleton className="h-2 w-full rounded-full" />
                            <Skeleton className="h-2 w-3/4 rounded-full" />
                        </div>
                    </div>
                    {/* Skills */}
                    <div className="flex gap-2 pt-2">
                        <Skeleton className="h-5 w-14 rounded-full" />
                        <Skeleton className="h-5 w-18 rounded-full" />
                        <Skeleton className="h-5 w-12 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Info skeleton */}
            <div className="p-5 space-y-3">
                <Skeleton className="h-5 w-2/3 rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-3 w-full rounded-full" />
                    <Skeleton className="h-3 w-4/5 rounded-full" />
                </div>
                <div className="flex gap-2 pt-2">
                    <Skeleton className="h-6 w-16 rounded-lg" />
                    <Skeleton className="h-6 w-20 rounded-lg" />
                    <Skeleton className="h-6 w-14 rounded-lg" />
                </div>
            </div>
        </motion.div>
    );
}

// Skeleton Grid with stagger effect
export function SkeletonTemplateGrid({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <SkeletonTemplateCard />
                </motion.div>
            ))}
        </div>
    );
}

// Generic skeleton shapes for reuse
export function SkeletonCircle({ size = 40 }: { size?: number }) {
    return <Skeleton className={`rounded-full`} style={{ width: size, height: size }} />;
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
    return (
        <div className={cn("space-y-2", className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={cn(
                        "h-3 rounded-full",
                        i === lines - 1 ? "w-3/4" : "w-full"
                    )}
                />
            ))}
        </div>
    );
}
