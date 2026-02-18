"use client";

import { motion } from "framer-motion";
import {
    Users,
    FileSearch,
    Video,
    Gift,
    UserCheck,
    ArrowDown,
    TrendingUp,
    TrendingDown,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { fmtNumber } from "@/shared/utils/format";

// ─── Stage Data ──────────────────────────────────────
export interface FunnelStage {
    readonly id: string;
    readonly label: string;
    readonly count: number;
    readonly icon: typeof Users;
    readonly color: string;
    readonly bg: string;
    readonly barColor: string;
}

export const defaultFunnelStages: FunnelStage[] = [
    { id: "applied", label: "Ứng tuyển", count: 1284, icon: Users, color: "text-sky-600", bg: "bg-sky-50", barColor: "bg-sky-500" },
    { id: "screened", label: "Sàng lọc", count: 642, icon: FileSearch, color: "text-violet-600", bg: "bg-violet-50", barColor: "bg-violet-500" },
    { id: "interview", label: "Phỏng vấn", count: 198, icon: Video, color: "text-amber-600", bg: "bg-amber-50", barColor: "bg-amber-500" },
    { id: "offer", label: "Offer", count: 45, icon: Gift, color: "text-emerald-600", bg: "bg-emerald-50", barColor: "bg-emerald-500" },
    { id: "hired", label: "Tuyển dụng", count: 32, icon: UserCheck, color: "text-rose-600", bg: "bg-rose-50", barColor: "bg-rose-500" },
];

// ─── Conversion Arrow ────────────────────────────────
function ConversionArrow({ from, to, delay }: { readonly from: number; readonly to: number; readonly delay: number }) {
    const rate = from > 0 ? Math.round((to / from) * 100) : 0;
    const isGood = rate >= 50;

    return (
        <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="flex flex-col items-center gap-0.5 py-1"
        >
            <ArrowDown className="w-4 h-4 text-slate-300" />
            <div className={cn(
                "flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                isGood ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
            )}>
                {isGood ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                {rate}%
            </div>
        </motion.div>
    );
}

// ─── Funnel Component ────────────────────────────────
export default function FunnelByStage({
    stages = defaultFunnelStages,
    title = "Phễu tuyển dụng",
}: {
    readonly stages?: FunnelStage[];
    readonly title?: string;
}) {
    const maxCount = Math.max(...stages.map((s) => s.count));

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-sky-900">{title}</h3>
                <span className="text-xs text-slate-400">
                    Tổng: {fmtNumber(stages[0]?.count ?? 0)} → {fmtNumber(stages[stages.length - 1]?.count ?? 0)}
                </span>
            </div>

            {/* Vertical Funnel */}
            <div className="space-y-0">
                {stages.map((stage, i) => {
                    const Icon = stage.icon;
                    const barWidth = Math.max((stage.count / maxCount) * 100, 8);
                    const dropOff = i > 0 ? stages[i - 1].count - stage.count : 0;

                    return (
                        <div key={stage.id}>
                            {/* Conversion arrow between stages */}
                            {i > 0 && (
                                <ConversionArrow
                                    from={stages[i - 1].count}
                                    to={stage.count}
                                    delay={0.15 + i * 0.1}
                                />
                            )}

                            {/* Stage Row */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                                className="flex items-center gap-3 group"
                            >
                                {/* Icon */}
                                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", stage.bg)}>
                                    <Icon className={cn("w-4.5 h-4.5", stage.color)} />
                                </div>

                                {/* Bar + Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-semibold text-slate-700">{stage.label}</span>
                                        <div className="flex items-center gap-2">
                                            {dropOff > 0 && (
                                                <span className="text-[10px] text-slate-300">
                                                    -{fmtNumber(dropOff)}
                                                </span>
                                            )}
                                            <span className="text-sm font-bold text-sky-900">
                                                {fmtNumber(stage.count)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${barWidth}%` }}
                                            transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: "easeOut" }}
                                            className={cn("h-full rounded-full", stage.barColor)}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>

            {/* Summary */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-5 pt-4 border-t border-slate-100"
            >
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                        <p className="text-lg font-bold text-sky-900">
                            {stages.length > 0 ? Math.round((stages[stages.length - 1].count / stages[0].count) * 100) : 0}%
                        </p>
                        <p className="text-[10px] text-slate-400">Tỉ lệ tuyển</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-sky-900">
                            {stages.length > 1 ? Math.round((stages[1].count / stages[0].count) * 100) : 0}%
                        </p>
                        <p className="text-[10px] text-slate-400">Qua sàng lọc</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-sky-900">
                            {stages.length > 3 ? Math.round((stages[stages.length - 1].count / stages[stages.length - 2].count) * 100) : 0}%
                        </p>
                        <p className="text-[10px] text-slate-400">Accept offer</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
