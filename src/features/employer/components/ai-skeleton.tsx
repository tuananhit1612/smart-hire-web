// src/features/employer/components/ai-skeleton.tsx
"use client";

import { Skeleton } from "@/shared/components/ui/skeleton";

export function AISkeleton() {
    return (
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm animate-pulse">
            <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-6 w-32 bg-slate-200 rounded-md" />
            </div>
            
            <div className="flex items-center gap-6 mb-6">
                {/* Chart Skeleton */}
                <div className="relative shrink-0">
                    <Skeleton className="w-24 h-24 rounded-full bg-slate-200" />
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <Skeleton className="w-8 h-4 bg-slate-300 mb-1 rounded" />
                        <Skeleton className="w-6 h-2 bg-slate-300 rounded" />
                    </div>
                </div>
                {/* Summary Skeleton */}
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full bg-slate-200 rounded" />
                    <Skeleton className="h-4 w-3/4 bg-slate-200 rounded" />
                </div>
            </div>

            {/* Breakdown Skeleton */}
            <div className="space-y-3 mt-6 pt-6 border-t border-slate-100">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-1">
                        <div className="flex justify-between">
                            <Skeleton className="h-3 w-20 bg-slate-200 rounded" />
                            <Skeleton className="h-3 w-8 bg-slate-200 rounded" />
                        </div>
                        <Skeleton className="h-2 w-full bg-slate-100 rounded-full" />
                    </div>
                ))}
            </div>

            {/* Strengths/Gaps Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-green-100 rounded mb-2" />
                    <Skeleton className="h-3 w-full bg-slate-100 rounded" />
                    <Skeleton className="h-3 w-3/4 bg-slate-100 rounded" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-amber-100 rounded mb-2" />
                    <Skeleton className="h-3 w-full bg-slate-100 rounded" />
                </div>
            </div>
        </div>
    );
}
