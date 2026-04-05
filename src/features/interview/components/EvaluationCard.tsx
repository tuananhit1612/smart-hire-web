"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Star, TrendingUp } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import type { AnswerEvaluation, RubricScore } from "../types/interview-ui-types";
import { CATEGORY_LABELS } from "../types/interview-ui-types";

// ─── Rubric Score Bar ────────────────────────────────

function RubricBar({ rubric }: { readonly rubric: RubricScore }) {
    const percentage = (rubric.score / rubric.maxScore) * 100;

    const colorMap: Record<string, { bar: string; bg: string; text: string }> = {
        sky: { bar: "bg-[#22c55e]", bg: "bg-[#22c55e]", text: "text-[#22c55e]" },
        violet: { bar: "bg-violet-500", bg: "bg-violet-50", text: "text-violet-700" },
        emerald: { bar: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
    };

    const colors = colorMap[rubric.color] ?? colorMap.sky;

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <span className={cn("text-base font-semibold", colors.text)}>{rubric.label}</span>
                <span className="text-base font-bold text-slate-700 dark:text-white">{rubric.score}/{rubric.maxScore}</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className={cn("h-full rounded-full", colors.bar)}
                />
            </div>
            <p className="text-base text-slate-500 dark:text-[#C4CDD5] leading-relaxed">{rubric.feedback}</p>
        </div>
    );
}

// ─── Evaluation Card ─────────────────────────────────

interface EvaluationCardProps {
    readonly evaluation: AnswerEvaluation;
    readonly index: number;
}

export function EvaluationCard({ evaluation, index }: EvaluationCardProps) {
    const [expanded, setExpanded] = useState(false);
    const cat = CATEGORY_LABELS[evaluation.category];

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400";
        if (score >= 60) return "text-[#22c55e] bg-[#22c55e]/10 dark:bg-[#22c55e]/20 dark:text-[#22c55e]";
        if (score >= 40) return "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400";
        return "text-rose-600 bg-rose-50 dark:bg-rose-900/20 dark:text-rose-400";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-[#1C252E] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm overflow-hidden"
        >
            {/* Header (clickable) */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center gap-3 p-5 text-left hover:bg-slate-50/50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
            >
                <span
                    className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0",
                        getScoreColor(evaluation.overallScore)
                    )}
                >
                    {evaluation.overallScore}
                </span>
                <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold text-[#22c55e] dark:text-white truncate">{evaluation.question}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={cn("text-sm font-semibold px-2.5 py-0.5 rounded-full", cat?.color)}>
                            {cat?.label}
                        </span>
                        <span className="text-sm text-slate-400 dark:text-[#637381]">
                            {evaluation.rubricScores.map((r) => `${r.label}: ${r.score}`).join(" • ")}
                        </span>
                    </div>
                </div>
                {expanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 dark:text-[#637381] shrink-0" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 dark:text-[#637381] shrink-0" />
                )}
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 space-y-4 border-t border-slate-50 dark:border-white/[0.04] pt-3">
                            {/* User Answer */}
                            <div>
                                <p className="text-sm font-semibold text-slate-400 dark:text-[#637381] uppercase tracking-wider mb-1.5">Câu trả lời của bạn</p>
                                <div className="bg-[#22c55e]/5 dark:bg-[#22c55e]/10 rounded-xl p-3 text-base text-slate-700 dark:text-[#C4CDD5] leading-relaxed border border-[#22c55e]/20 dark:border-[#22c55e]/30">
                                    {evaluation.userAnswer}
                                </div>
                            </div>

                            {/* Rubric Scores */}
                            <div>
                                <p className="text-sm font-semibold text-slate-400 dark:text-[#637381] uppercase tracking-wider mb-3">Đánh giá theo tiêu chí</p>
                                <div className="space-y-4">
                                    {evaluation.rubricScores.map((rubric) => (
                                        <RubricBar key={rubric.criterion} rubric={rubric} />
                                    ))}
                                </div>
                            </div>

                            {/* Strengths & Improvements */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl p-3 border border-emerald-100/50 dark:border-emerald-800/30">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <Star className="w-4 h-4 text-emerald-500" />
                                        <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase">Điểm mạnh</p>
                                    </div>
                                    <ul className="space-y-1">
                                        {evaluation.strengths.map((s) => (
                                            <li key={s} className="text-base text-emerald-700 dark:text-emerald-400/80 flex items-start gap-1.5">
                                                <span className="text-emerald-400 mt-1">•</span>
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-xl p-3 border border-amber-100/50 dark:border-amber-800/30">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <TrendingUp className="w-4 h-4 text-amber-500" />
                                        <p className="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase">Cần cải thiện</p>
                                    </div>
                                    <ul className="space-y-1">
                                        {evaluation.improvements.map((imp) => (
                                            <li key={imp} className="text-base text-amber-700 dark:text-amber-400/80 flex items-start gap-1.5">
                                                <span className="text-amber-400 mt-1">•</span>
                                                {imp}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
