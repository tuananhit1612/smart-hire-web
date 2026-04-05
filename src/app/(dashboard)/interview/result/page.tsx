"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Trophy, ArrowLeft, RotateCcw, BrainCircuit, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";

import { mockInterviewResult } from "@/features/interview/types/mock-evaluation";
import { CircularScore } from "@/features/interview/components/CircularScore";
import { EvaluationCard } from "@/features/interview/components/EvaluationCard";

// ─── Grade Badge Config ──────────────────────────────

const GRADE_CONFIG: Record<string, { bg: string; text: string; glow: string }> = {
    "A+": { bg: "bg-emerald-500", text: "text-white", glow: "shadow-emerald-500/30" },
    A: { bg: "bg-emerald-500", text: "text-white", glow: "shadow-emerald-500/30" },
    "B+": { bg: "bg-[#22c55e]", text: "text-white", glow: "shadow-[#22c55e]/30" },
    B: { bg: "bg-[#22c55e]", text: "text-white", glow: "shadow-[#22c55e]/30" },
    "C+": { bg: "bg-amber-500", text: "text-white", glow: "shadow-amber-500/30" },
    C: { bg: "bg-amber-500", text: "text-white", glow: "shadow-amber-500/30" },
    D: { bg: "bg-rose-500", text: "text-white", glow: "shadow-rose-500/30" },
};

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
        <section className="relative z-10 pt-6 pb-12 md:pt-8">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                {/* Back Link */}
                <Link
                    href="/interview/setup"
                    className="inline-flex items-center gap-2 text-base text-slate-400 dark:text-[#637381] hover:text-[#22c55e] dark:hover:text-[#22c55e] transition-colors mb-6"
                >
                    <ArrowLeft className="w-4.5 h-4.5" />
                    Quay lại
                </Link>

                {/* Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-[#1C252E] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-6 mb-6"
                >
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                        <CircularScore score={result.totalScore} max={result.maxScore} />

                        <div className="flex-1 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                <Trophy className="w-5 h-5 text-amber-500" />
                                <h1 className="text-2xl font-bold text-[#22c55e] dark:text-white">Kết quả phỏng vấn</h1>
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
                            <p className="text-lg text-slate-500 dark:text-[#C4CDD5] leading-relaxed">{result.summary}</p>

                            {/* Rubric Summary */}
                            <div className="flex items-center gap-4 mt-3">
                                {rubricAverages.map((r) => (
                                    <div key={r.criterion} className="text-center">
                                        <p className="text-2xl font-bold text-[#22c55e] dark:text-white">{r.avg}</p>
                                        <p className="text-sm text-slate-400 dark:text-[#637381] capitalize">
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
                    className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/15 dark:to-fuchsia-900/10 border border-violet-100 dark:border-violet-800/30 rounded-2xl p-4 mb-6"
                >
                    <div className="flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-base font-bold text-violet-800 dark:text-violet-400">Gợi ý từ AI</p>
                            <p className="text-base text-violet-600 dark:text-violet-400/80 mt-0.5 leading-relaxed">
                                Hãy luyện tập sử dụng phương pháp STAR (Situation, Task, Action, Result) cho các câu hỏi behavioral.
                                Thêm số liệu cụ thể và metric sẽ giúp câu trả lời thuyết phục hơn.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Per-Answer Evaluations */}
                <div className="flex items-center gap-2 mb-4">
                    <BrainCircuit className="w-4 h-4 text-[#22c55e]" />
                    <h2 className="text-lg font-bold text-[#22c55e] dark:text-white">
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
                        <Button variant="ghost" className="rounded-full text-base gap-1.5 cursor-pointer">
                            <RotateCcw className="w-4 h-4" />
                            Phỏng vấn lại
                        </Button>
                    </Link>
                    <Link href="/interview/report">
                        <Button className="rounded-full text-base gap-1.5 bg-[#22c55e] hover:bg-[#16a34a] text-white cursor-pointer">
                            <BrainCircuit className="w-4 h-4" />
                            Xem báo cáo chi tiết
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
