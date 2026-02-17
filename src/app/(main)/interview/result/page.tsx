"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Trophy,
    ChevronDown,
    ChevronUp,
    Star,
    TrendingUp,
    AlertCircle,
    ArrowLeft,
    RotateCcw,
    BrainCircuit,
    Sparkles,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";
import {
    mockInterviewResult,
    AnswerEvaluation,
    RubricScore,
} from "@/features/interview/types/mock-evaluation";

// ─── Grade Badge ─────────────────────────────────────
const GRADE_CONFIG: Record<string, { bg: string; text: string; glow: string }> = {
    "A+": { bg: "bg-emerald-500", text: "text-white", glow: "shadow-emerald-500/30" },
    A: { bg: "bg-emerald-500", text: "text-white", glow: "shadow-emerald-500/30" },
    "B+": { bg: "bg-sky-500", text: "text-white", glow: "shadow-sky-500/30" },
    B: { bg: "bg-sky-500", text: "text-white", glow: "shadow-sky-500/30" },
    "C+": { bg: "bg-amber-500", text: "text-white", glow: "shadow-amber-500/30" },
    C: { bg: "bg-amber-500", text: "text-white", glow: "shadow-amber-500/30" },
    D: { bg: "bg-rose-500", text: "text-white", glow: "shadow-rose-500/30" },
};

// ─── Circular Progress ──────────────────────────────
function CircularScore({ score, max, size = 120 }: { readonly score: number; readonly max: number; readonly size?: number }) {
    const percentage = (score / max) * 100;
    const radius = (size - 12) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const getColor = () => {
        if (percentage >= 80) return "stroke-emerald-500";
        if (percentage >= 60) return "stroke-sky-500";
        if (percentage >= 40) return "stroke-amber-500";
        return "stroke-rose-500";
    };

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={10} />
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    className={getColor()}
                    strokeWidth={10}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-2xl font-black text-sky-900"
                >
                    {score}
                </motion.span>
                <span className="text-[10px] text-slate-400 -mt-0.5">/ {max}</span>
            </div>
        </div>
    );
}

// ─── Rubric Score Bar ────────────────────────────────
function RubricBar({ rubric }: { readonly rubric: RubricScore }) {
    const percentage = (rubric.score / rubric.maxScore) * 100;

    const colorMap: Record<string, { bar: string; bg: string; text: string }> = {
        sky: { bar: "bg-sky-500", bg: "bg-sky-50", text: "text-sky-700" },
        violet: { bar: "bg-violet-500", bg: "bg-violet-50", text: "text-violet-700" },
        emerald: { bar: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
    };

    const colors = colorMap[rubric.color] ?? colorMap.sky;

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <span className={cn("text-xs font-semibold", colors.text)}>{rubric.label}</span>
                <span className="text-xs font-bold text-slate-700">{rubric.score}/{rubric.maxScore}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className={cn("h-full rounded-full", colors.bar)}
                />
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">{rubric.feedback}</p>
        </div>
    );
}

// ─── Answer Evaluation Card (Expandable) ─────────────
const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
    introduction: { label: "Giới thiệu", color: "bg-sky-100 text-sky-700" },
    technical: { label: "Kỹ thuật", color: "bg-violet-100 text-violet-700" },
    behavioral: { label: "Hành vi", color: "bg-amber-100 text-amber-700" },
    situational: { label: "Tình huống", color: "bg-emerald-100 text-emerald-700" },
    closing: { label: "Kết thúc", color: "bg-rose-100 text-rose-700" },
};

function EvaluationCard({
    evaluation,
    index,
}: {
    readonly evaluation: AnswerEvaluation;
    readonly index: number;
}) {
    const [expanded, setExpanded] = useState(false);
    const cat = CATEGORY_LABELS[evaluation.category];

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-600 bg-emerald-50";
        if (score >= 60) return "text-sky-600 bg-sky-50";
        if (score >= 40) return "text-amber-600 bg-amber-50";
        return "text-rose-600 bg-rose-50";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
        >
            {/* Header (clickable) */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
            >
                <span
                    className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
                        getScoreColor(evaluation.overallScore)
                    )}
                >
                    {evaluation.overallScore}
                </span>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-sky-900 truncate">{evaluation.question}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full", cat?.color)}>
                            {cat?.label}
                        </span>
                        <span className="text-[10px] text-slate-400">
                            {evaluation.rubricScores.map((r) => `${r.label}: ${r.score}`).join(" • ")}
                        </span>
                    </div>
                </div>
                {expanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
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
                        <div className="px-4 pb-4 space-y-4 border-t border-slate-50 pt-3">
                            {/* User Answer */}
                            <div>
                                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Câu trả lời của bạn</p>
                                <div className="bg-sky-50/50 rounded-xl p-3 text-sm text-slate-700 leading-relaxed border border-sky-100/50">
                                    {evaluation.userAnswer}
                                </div>
                            </div>

                            {/* Rubric Scores */}
                            <div>
                                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Đánh giá theo tiêu chí</p>
                                <div className="space-y-4">
                                    {evaluation.rubricScores.map((rubric) => (
                                        <RubricBar key={rubric.criterion} rubric={rubric} />
                                    ))}
                                </div>
                            </div>

                            {/* Strengths & Improvements */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100/50">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <Star className="w-3.5 h-3.5 text-emerald-500" />
                                        <p className="text-[10px] font-bold text-emerald-700 uppercase">Điểm mạnh</p>
                                    </div>
                                    <ul className="space-y-1">
                                        {evaluation.strengths.map((s) => (
                                            <li key={s} className="text-xs text-emerald-700 flex items-start gap-1.5">
                                                <span className="text-emerald-400 mt-1">•</span>
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-amber-50/50 rounded-xl p-3 border border-amber-100/50">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                                        <p className="text-[10px] font-bold text-amber-700 uppercase">Cần cải thiện</p>
                                    </div>
                                    <ul className="space-y-1">
                                        {evaluation.improvements.map((imp) => (
                                            <li key={imp} className="text-xs text-amber-700 flex items-start gap-1.5">
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

// ─── Main Page ───────────────────────────────────────
export default function InterviewResultPage() {
    const result = mockInterviewResult;
    const gradeConfig = GRADE_CONFIG[result.grade] ?? GRADE_CONFIG.B;

    // Aggregate rubric averages
    const rubricAverages = ["clarity", "relevance", "structure"].map((criterion) => {
        const scores = result.evaluations.flatMap((e) =>
            e.rubricScores.filter((r) => r.criterion === criterion)
        );
        const avg = scores.reduce((sum, s) => sum + s.score, 0) / (scores.length || 1);
        return { criterion, avg: Math.round(avg * 10) / 10 };
    });

    return (
        <section className="relative z-10 pt-24 pb-12 md:pt-28">
            <div className="mx-auto max-w-2xl px-4 sm:px-6">
                {/* Back Link */}
                <Link
                    href="/interview/setup"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-600 transition-colors mb-6"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Quay lại
                </Link>

                {/* Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6"
                >
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                        <CircularScore score={result.totalScore} max={result.maxScore} />

                        <div className="flex-1 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                <Trophy className="w-5 h-5 text-amber-500" />
                                <h1 className="text-lg font-bold text-sky-900">Kết quả phỏng vấn</h1>
                                <span
                                    className={cn(
                                        "px-2.5 py-1 rounded-lg text-xs font-black shadow-lg",
                                        gradeConfig.bg,
                                        gradeConfig.text,
                                        gradeConfig.glow
                                    )}
                                >
                                    {result.grade}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed">{result.summary}</p>

                            {/* Rubric Summary */}
                            <div className="flex items-center gap-4 mt-3">
                                {rubricAverages.map((r) => (
                                    <div key={r.criterion} className="text-center">
                                        <p className="text-lg font-bold text-sky-900">{r.avg}</p>
                                        <p className="text-[10px] text-slate-400 capitalize">
                                            {r.criterion === "clarity" ? "Rõ ràng" : r.criterion === "relevance" ? "Liên quan" : "Cấu trúc"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* AI Tips Card */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-100 rounded-2xl p-4 mb-6"
                >
                    <div className="flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-xs font-bold text-violet-800">Gợi ý từ AI</p>
                            <p className="text-xs text-violet-600 mt-0.5 leading-relaxed">
                                Hãy luyện tập sử dụng phương pháp STAR (Situation, Task, Action, Result) cho các câu hỏi behavioral. 
                                Thêm số liệu cụ thể và metric sẽ giúp câu trả lời thuyết phục hơn.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Per-Answer Evaluations */}
                <div className="flex items-center gap-2 mb-4">
                    <BrainCircuit className="w-4 h-4 text-sky-600" />
                    <h2 className="text-sm font-bold text-sky-900">
                        Chi tiết từng câu ({result.evaluations.length})
                    </h2>
                </div>

                <div className="space-y-3">
                    {result.evaluations.map((evaluation, index) => (
                        <EvaluationCard key={evaluation.questionId} evaluation={evaluation} index={index} />
                    ))}
                </div>

                {/* Bottom Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-3 mt-8"
                >
                    <Link href="/interview/setup">
                        <Button variant="ghost" className="rounded-full text-sm gap-1.5 cursor-pointer">
                            <RotateCcw className="w-4 h-4" />
                            Phỏng vấn lại
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
