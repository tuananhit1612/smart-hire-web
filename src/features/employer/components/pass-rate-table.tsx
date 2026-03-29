"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    TrendingDown,
    Minus,
    ChevronRight,
    BarChart3,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { fmtNumber } from "@/shared/utils/format";

import type { PassRateRow } from "@/features/employer/api/dashboard-api";

// ─── Trend Badge ─────────────────────────────────────
function TrendBadge({ current, previous }: { readonly current: number; readonly previous: number }) {
    const diff = +(current - previous).toFixed(1);

    if (diff === 0) {
        return (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#919EAB] bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.05] px-1.5 py-0.5 rounded-full">
                <Minus className="w-2.5 h-2.5" /> 0
            </span>
        );
    }

    const isUp = diff > 0;
    return (
        <span className={cn(
            "inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
            isUp ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20" : "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20"
        )}>
            {isUp ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
            {isUp ? "+" : ""}{diff}%
        </span>
    );
}

// ─── Pass Rate Bar ───────────────────────────────────
function RateBar({ rate, delay }: { readonly rate: number; readonly delay: number }) {
    const getColor = () => {
        if (rate >= 15) return "bg-emerald-500";
        if (rate >= 10) return "bg-[#22c55e]";
        return "bg-amber-500";
    };

    return (
        <div className="flex items-center gap-2 w-full">
            <div className="flex-1 h-2 bg-[rgba(145,158,171,0.12)] dark:bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(rate * 4, 100)}%` }}
                    transition={{ duration: 0.6, delay, ease: "easeOut" }}
                    className={cn("h-full rounded-full", getColor())}
                />
            </div>
            <span className="text-xs font-bold text-[#1C252E] dark:text-white w-12 text-right">{rate}%</span>
        </div>
    );
}


// ─── Main Widget ─────────────────────────────────────
export default function PassRateTable({
    data = [],
    title = "Tỉ lệ đậu theo vị trí",
}: {
    readonly data?: PassRateRow[];
    readonly title?: string;
}) {
    // Sort by pass rate descending
    const sorted = [...data].sort((a, b) => b.passRate - a.passRate);
    const avgRate = sorted.length > 0
        ? +(sorted.reduce((sum, r) => sum + r.passRate, 0) / sorted.length).toFixed(1)
        : 0;

    return (
        <div className="bg-white dark:bg-[#1C252E] rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-5 pb-3">
                <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#22c55e]" />
                    <h3 className="text-sm font-bold text-[#1C252E] dark:text-white">{title}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-[#919EAB]">TB:</span>
                    <span className="text-sm font-bold text-[#1C252E] dark:text-white">{avgRate}%</span>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-t border-b border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] bg-[rgba(145,158,171,0.03)] dark:bg-white/[0.02]">
                            <th className="text-[10px] font-bold text-[#919EAB] uppercase tracking-wider px-5 py-2.5">Vị trí</th>
                            <th className="text-[10px] font-bold text-[#919EAB] uppercase tracking-wider px-3 py-2.5 text-center">Ứng viên</th>
                            <th className="text-[10px] font-bold text-[#919EAB] uppercase tracking-wider px-3 py-2.5 text-center">Đậu</th>
                            <th className="text-[10px] font-bold text-[#919EAB] uppercase tracking-wider px-3 py-2.5 w-44">Tỉ lệ</th>
                            <th className="text-[10px] font-bold text-[#919EAB] uppercase tracking-wider px-3 py-2.5 text-center">Trend</th>
                            <th className="text-[10px] font-bold text-[#919EAB] uppercase tracking-wider px-3 py-2.5 text-center">Ngày TB</th>
                            <th className="px-3 py-2.5 w-8"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((row, i) => (
                            <motion.tr
                                key={row.position}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                                className="border-b border-[rgba(145,158,171,0.06)] dark:border-white/[0.04] hover:bg-[#22c55e]/10 dark:hover:bg-white/[0.03] transition-colors group cursor-pointer">
                                {/* Position + Department */}
                                <td className="px-5 py-3">
                                    <p className="text-sm font-semibold text-[#1C252E] dark:text-white group-hover:text-[#22c55e] transition-colors">{row.position}</p>
                                    <p className="text-[10px] text-[#919EAB]">{row.department}</p>
                                </td>
                                {/* Total Applicants */}
                                <td className="px-3 py-3 text-center">
                                    <span className="text-sm font-medium text-[#637381] dark:text-[#919EAB]">{fmtNumber(row.totalApplicants)}</span>
                                </td>
                                {/* Passed */}
                                <td className="px-3 py-3 text-center">
                                    <span className="text-sm font-bold text-emerald-600">{row.passed}</span>
                                </td>
                                {/* Rate Bar */}
                                <td className="px-3 py-3">
                                    <RateBar rate={row.passRate} delay={0.15 + i * 0.06} />
                                </td>
                                {/* Trend */}
                                <td className="px-3 py-3 text-center">
                                    <TrendBadge current={row.passRate} previous={row.prevRate} />
                                </td>
                                {/* Avg Time */}
                                <td className="px-3 py-3 text-center">
                                    <span className="text-xs text-[#637381] dark:text-[#919EAB]">{row.avgTimeToHire}d</span>
                                </td>
                                {/* Arrow */}
                                <td className="px-3 py-3">
                                    <ChevronRight className="w-4 h-4 text-[#C4CDD5] dark:text-[#637381] group-hover:text-[#22c55e] transition-colors" />
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Summary */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="px-5 py-3 bg-[rgba(145,158,171,0.03)] dark:bg-white/[0.02] border-t border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] flex items-center justify-between">
                <span className="text-[10px] text-[#919EAB]">
                    {sorted.length} vị trí • {fmtNumber(sorted.reduce((s, r) => s + r.totalApplicants, 0))} ứng viên tổng
                </span>
                <span className="text-[10px] text-[#919EAB]">
                    Thời gian tuyển TB: {Math.round(sorted.reduce((s, r) => s + r.avgTimeToHire, 0) / sorted.length)} ngày
                </span>
            </motion.div>
        </div>
    );
}

