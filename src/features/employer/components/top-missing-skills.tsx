"use client";

import { motion } from "framer-motion";
import {
    AlertTriangle,
    Puzzle,
    Users,
    TrendingUp,
    BookOpen,
    ExternalLink,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";

import type { MissingSkill } from "@/features/employer/api/dashboard-api";

// ─── Category Config ─────────────────────────────────
const CATEGORY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
    technical: { label: "Kỹ thuật", color: "text-[#22c55e] dark:text-[#22c55e]", bg: "bg-[#22c55e]/15 dark:bg-[#22c55e]/20" },
    soft: { label: "Soft skill", color: "text-violet-700 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-900/30" },
    tool: { label: "Công cụ", color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" },
    certification: { label: "Chứng chỉ", color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
};

// ─── Trend Config ────────────────────────────────────
const TREND_CONFIG: Record<string, { label: string; color: string; icon: typeof TrendingUp }> = {
    rising: { label: "Tăng", color: "text-rose-500", icon: TrendingUp },
    stable: { label: "Ổn định", color: "text-[#919EAB]", icon: BookOpen },
    declining: { label: "Giảm", color: "text-emerald-500", icon: TrendingUp },
};

// ─── Gap Bar ─────────────────────────────────────────
function GapBar({ gap, delay }: { readonly gap: number; readonly delay: number }) {
    const getColor = () => {
        if (gap >= 70) return "bg-rose-500";
        if (gap >= 50) return "bg-amber-500";
        return "bg-[#22c55e]";
    };

    return (
        <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-[rgba(145,158,171,0.12)] dark:bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${gap}%` }}
                    transition={{ duration: 0.6, delay, ease: "easeOut" }}
                    className={cn("h-full rounded-full", getColor())}
                />
            </div>
            <span className={cn(
                "text-xs font-bold",
                gap >= 70 ? "text-rose-600" : gap >= 50 ? "text-amber-600" : "text-[#22c55e]"
            )}>
                {gap}%
            </span>
        </div>
    );
}

// ─── Main Widget ─────────────────────────────────────
export default function TopMissingSkills({
    skills = [],
    title = "Top kỹ năng thiếu hụt",
    maxDisplay = 8,
}: {
    readonly skills?: MissingSkill[];
    readonly title?: string;
    readonly maxDisplay?: number;
}) {
    // Sort by candidateGap descending
    const sorted = [...skills].sort((a, b) => b.candidateGap - a.candidateGap).slice(0, maxDisplay);

    return (
        <div className="bg-white dark:bg-[#1C252E] rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-5 pb-3">
                <div className="flex items-center gap-2">
                    <Puzzle className="w-5 h-5 text-rose-500" />
                    <h3 className="text-sm font-bold text-[#1C252E] dark:text-white">{title}</h3>
                </div>
                <span className="text-xs text-[#919EAB]">{skills.length} skills tracked</span>
            </div>

            {/* Skills List */}
            <div className="px-5 pb-4 space-y-2.5">
                {sorted.map((skill, i) => {
                    const cat = CATEGORY_CONFIG[skill.category];
                    const trend = TREND_CONFIG[skill.trend];
                    const TrendIcon = trend?.icon ?? TrendingUp;

                    return (
                        <motion.div
                            key={skill.skill}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[rgba(145,158,171,0.06)] dark:hover:bg-white/[0.04] transition-colors group">
                            {/* Rank */}
                            <span className="text-sm font-bold text-[#C4CDD5] dark:text-[#637381] w-5 shrink-0">{i + 1}</span>

                            {/* Skill Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-sm font-semibold text-[#1C252E] dark:text-white">{skill.skill}</p>
                                    <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", cat?.bg, cat?.color)}>
                                        {cat?.label}
                                    </span>
                                </div>
                                {skill.suggestedAction && (
                                    <p className="text-[10px] text-[#919EAB] mt-0.5 truncate">{skill.suggestedAction}</p>
                                )}
                            </div>

                            {/* Demand Count */}
                            <div className="text-center shrink-0">
                                <div className="flex items-center gap-0.5 text-xs text-[#637381] dark:text-[#919EAB]">
                                    <Users className="w-3 h-3" />
                                    <span className="font-medium">{skill.demandCount}</span>
                                </div>
                                <p className="text-[9px] text-[#C4CDD5] dark:text-[#637381]">jobs</p>
                            </div>

                            {/* Gap Bar */}
                            <div className="shrink-0">
                                <GapBar gap={skill.candidateGap} delay={0.15 + i * 0.06} />
                            </div>

                            {/* Trend */}
                            <div className={cn("flex items-center gap-0.5 shrink-0", trend?.color)}>
                                <TrendIcon className={cn("w-3 h-3", skill.trend === "declining" && "rotate-180")} />
                                <span className="text-[10px] font-semibold">{trend?.label}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="px-5 py-3 bg-[rgba(145,158,171,0.03)] dark:bg-white/[0.02] border-t border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-[#919EAB]">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    {sorted.filter((s) => s.candidateGap >= 70).length} kỹ năng có gap &gt; 70%
                </div>
                <button className="text-[10px] text-[#22c55e] hover:text-[#22c55e] font-semibold flex items-center gap-0.5 transition-colors cursor-pointer">
                    Xem báo cáo đầy đủ <ExternalLink className="w-3 h-3" />
                </button>
            </motion.div>
        </div>
    );
}

