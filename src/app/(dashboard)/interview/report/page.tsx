"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowLeft,
    Star,
    Target,
    BrainCircuit,
    AlertTriangle,
    TrendingUp,
    RotateCcw,
    FileText,
    ShieldCheck,
    ShieldAlert,
    ShieldQuestion,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";

import { mockInterviewReport } from "@/features/interview/types/mock-report";
import { SkillBar, StrengthCard, WeaknessCard, RecommendationCard } from "@/features/interview/components/ReportCards";

// ─── Verdict Config ──────────────────────────────────

const VERDICT_CONFIG: Record<string, { bg: string; text: string; border: string; icon: typeof ShieldCheck }> = {
    "highly-recommended": { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800/30", icon: ShieldCheck },
    recommended: { bg: "bg-[#22c55e]/10 dark:bg-[#22c55e]/20", text: "text-[#22c55e] dark:text-[#22c55e]", border: "border-[#22c55e]/30 dark:border-[#22c55e]/30", icon: ShieldCheck },
    conditional: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-400", border: "border-amber-200 dark:border-amber-800/30", icon: ShieldQuestion },
    "not-recommended": { bg: "bg-rose-50 dark:bg-rose-900/20", text: "text-rose-700 dark:text-rose-400", border: "border-rose-200 dark:border-rose-800/30", icon: ShieldAlert },
};

export default function InterviewReportPage() {
    const report = mockInterviewReport;
    const verdictCfg = VERDICT_CONFIG[report.verdict];
    const VerdictIcon = verdictCfg?.icon ?? ShieldCheck;

    return (
        <section className="relative z-10 pt-6 pb-12 md:pt-8">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                {/* Back Link */}
                <Link
                    href="/interview/result"
                    className="inline-flex items-center gap-2 text-base text-slate-400 dark:text-[#637381] hover:text-[#22c55e] dark:hover:text-[#22c55e] transition-colors mb-6"
                >
                    <ArrowLeft className="w-4.5 h-4.5" />
                    Quay lại kết quả
                </Link>

                {/* Report Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-[#1C252E] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-6 mb-6"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#22c55e] to-emerald-600 flex items-center justify-center shrink-0 shadow-lg shadow-[#22c55e]/20">
                            <FileText className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-[#22c55e] dark:text-white">Báo cáo phỏng vấn</h1>
                            <p className="text-base text-slate-500 dark:text-[#C4CDD5] mt-0.5">
                                {report.candidateName} • {report.position} — {report.company}
                            </p>
                        </div>
                        <div
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl border",
                                verdictCfg?.bg,
                                verdictCfg?.text,
                                verdictCfg?.border
                            )}
                        >
                            <VerdictIcon className="w-5 h-5" />
                            <span className="text-base font-bold">{report.verdictLabel}</span>
                        </div>
                    </div>
                </motion.div>

                {/* AI Summary */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/15 dark:to-fuchsia-900/10 border border-violet-100 dark:border-violet-800/30 rounded-2xl p-5 mb-6"
                >
                    <div className="flex items-start gap-3">
                        <BrainCircuit className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-base font-bold text-violet-800 dark:text-violet-400 mb-1">Nhận xét tổng hợp của AI</p>
                            <p className="text-base text-violet-700 dark:text-violet-400/80 leading-relaxed">{report.aiSummary}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Skill Radar */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-white dark:bg-[#1C252E] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-5 mb-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="w-5 h-5 text-[#22c55e]" />
                        <h2 className="text-lg font-bold text-[#22c55e] dark:text-white">Năng lực tổng quan</h2>
                    </div>
                    <div className="space-y-3">
                        {report.skillRadar.map((skill, i) => (
                            <SkillBar
                                key={skill.skill}
                                skill={skill.skill}
                                score={skill.score}
                                maxScore={skill.maxScore}
                                delay={0.2 + i * 0.08}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Strengths Section */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-emerald-500" />
                        <h2 className="text-lg font-bold text-[#22c55e] dark:text-white">Điểm mạnh ({report.strengths.length})</h2>
                    </div>
                    <div className="space-y-3">
                        {report.strengths.map((s, i) => (
                            <StrengthCard key={s.id} strength={s} index={i} />
                        ))}
                    </div>
                </div>

                {/* Weaknesses Section */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        <h2 className="text-lg font-bold text-[#22c55e] dark:text-white">Điểm cần cải thiện ({report.weaknesses.length})</h2>
                    </div>
                    <div className="space-y-3">
                        {report.weaknesses.map((w, i) => (
                            <WeaknessCard key={w.id} weakness={w} index={i} />
                        ))}
                    </div>
                </div>

                {/* Recommendations Section */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-[#22c55e]" />
                        <h2 className="text-lg font-bold text-[#22c55e] dark:text-white">Khuyến nghị ({report.recommendations.length})</h2>
                    </div>
                    <div className="space-y-3">
                        {report.recommendations.map((r, i) => (
                            <RecommendationCard key={r.id} rec={r} index={i} />
                        ))}
                    </div>
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
                    <Link href="/interview/result">
                        <Button className="rounded-full text-base gap-1.5 bg-[#22c55e] hover:bg-[#16a34a] text-white cursor-pointer">
                            <FileText className="w-4 h-4" />
                            Xem chi tiết rubric
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
