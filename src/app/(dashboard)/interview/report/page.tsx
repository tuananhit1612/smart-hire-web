"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    ArrowLeft,
    Star,
    Zap,
    Target,
    Trophy,
    BrainCircuit,
    AlertTriangle,
    TrendingUp,
    ChevronDown,
    ChevronUp,
    CheckCircle2,
    Bookmark,
    RotateCcw,
    FileText,
    Sparkles,
    ShieldCheck,
    ShieldAlert,
    ShieldQuestion,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";
import {
    mockInterviewReport,
    ReportStrength,
    ReportWeakness,
    Recommendation,
} from "@/features/interview/types/mock-report";

// ─── Verdict Config ──────────────────────────────────
const VERDICT_CONFIG: Record<string, { bg: string; text: string; border: string; icon: typeof ShieldCheck }> = {
    "highly-recommended": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: ShieldCheck },
    recommended: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200", icon: ShieldCheck },
    conditional: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: ShieldQuestion },
    "not-recommended": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", icon: ShieldAlert },
};

// ─── Strength Icon Map ───────────────────────────────
const STRENGTH_ICONS: Record<string, typeof Star> = {
    star: Star,
    zap: Zap,
    target: Target,
    trophy: Trophy,
    brain: BrainCircuit,
};

// ─── Impact Badge ────────────────────────────────────
const IMPACT_CONFIG: Record<string, { label: string; color: string }> = {
    high: { label: "Cao", color: "bg-rose-100 text-rose-700" },
    medium: { label: "Trung bình", color: "bg-amber-100 text-amber-700" },
    low: { label: "Thấp", color: "bg-slate-100 text-slate-600" },
};

// ─── Priority Badge ──────────────────────────────────
const PRIORITY_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
    critical: { label: "Quan trọng", color: "bg-rose-50 text-rose-700 border-rose-200", dot: "bg-rose-500" },
    important: { label: "Nên làm", color: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
    "nice-to-have": { label: "Tùy chọn", color: "bg-slate-50 text-slate-600 border-slate-200", dot: "bg-slate-400" },
};

// ─── Skill Bar ───────────────────────────────────────
function SkillBar({ skill, score, maxScore, delay }: { readonly skill: string; readonly score: number; readonly maxScore: number; readonly delay: number }) {
    const pct = (score / maxScore) * 100;
    const getColor = () => {
        if (pct >= 80) return "bg-emerald-500";
        if (pct >= 60) return "bg-sky-500";
        if (pct >= 40) return "bg-amber-500";
        return "bg-rose-500";
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600 w-36 shrink-0">{skill}</span>
            <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay, ease: "easeOut" }}
                    className={cn("h-full rounded-full", getColor())}
                />
            </div>
            <span className="text-sm font-bold text-slate-700 w-8 text-right">{score}</span>
        </div>
    );
}

// ─── Strength Card ───────────────────────────────────
function StrengthCard({ strength, index }: { readonly strength: ReportStrength; readonly index: number }) {
    const Icon = STRENGTH_ICONS[strength.icon] ?? Star;

    return (
        <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow"
        >
            <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-sky-900">{strength.title}</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">{strength.description}</p>
                    <div className="mt-2 bg-emerald-50/50 rounded-lg px-3 py-2 border border-emerald-100/50">
                        <p className="text-xs text-emerald-700 italic">
                            <span className="font-semibold not-italic">Minh chứng:</span> {strength.evidence}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Weakness Card ───────────────────────────────────
function WeaknessCard({ weakness, index }: { readonly weakness: ReportWeakness; readonly index: number }) {
    const impact = IMPACT_CONFIG[weakness.impact];

    return (
        <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow"
        >
            <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4.5 h-4.5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-sky-900">{weakness.title}</h4>
                        <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", impact?.color)}>
                            {impact?.label}
                        </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">{weakness.description}</p>
                    <div className="mt-2 bg-sky-50/50 rounded-lg px-3 py-2 border border-sky-100/50 flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-sky-500 mt-0.5 shrink-0" />
                        <p className="text-xs text-sky-700">{weakness.suggestion}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Recommendation Card (Expandable) ────────────────
function RecommendationCard({ rec, index }: { readonly rec: Recommendation; readonly index: number }) {
    const [expanded, setExpanded] = useState(index === 0);
    const priority = PRIORITY_CONFIG[rec.priority];

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn("rounded-2xl border shadow-sm overflow-hidden", priority?.color)}
        >
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center gap-3 p-4 text-left hover:opacity-90 transition-opacity cursor-pointer"
            >
                <div className={cn("w-2.5 h-2.5 rounded-full shrink-0", priority?.dot)} />
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold">{rec.title}</h4>
                    <p className="text-xs opacity-70 mt-0.5 truncate">{rec.description}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-white/60 shrink-0">
                    {priority?.label}
                </span>
                {expanded ? <ChevronUp className="w-4 h-4 opacity-50 shrink-0" /> : <ChevronDown className="w-4 h-4 opacity-50 shrink-0" />}
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 space-y-3 border-t border-black/5 pt-3">
                            <p className="text-sm leading-relaxed opacity-80">{rec.description}</p>

                            {/* Action Items */}
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2">Hành động cụ thể</p>
                                <ul className="space-y-1.5">
                                    {rec.actionItems.map((item, i) => (
                                        <li key={item} className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 className="w-4 h-4 opacity-50 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Resources */}
                            {rec.resources && rec.resources.length > 0 && (
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2">Tài liệu tham khảo</p>
                                    <ul className="space-y-1">
                                        {rec.resources.map((res) => (
                                            <li key={res} className="flex items-center gap-1.5 text-xs opacity-70">
                                                <Bookmark className="w-3.5 h-3.5 shrink-0" />
                                                {res}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─── Main Page ───────────────────────────────────────
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
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-600 transition-colors mb-6"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Quay lại kết quả
                </Link>

                {/* Report Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/20">
                            <FileText className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-xl font-bold text-sky-900">Báo cáo phỏng vấn</h1>
                            <p className="text-sm text-slate-500 mt-0.5">
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
                            <span className="text-sm font-bold">{report.verdictLabel}</span>
                        </div>
                    </div>
                </motion.div>

                {/* AI Summary */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-100 rounded-2xl p-5 mb-6"
                >
                    <div className="flex items-start gap-3">
                        <BrainCircuit className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-violet-800 mb-1">Nhận xét tổng hợp của AI</p>
                            <p className="text-sm text-violet-700 leading-relaxed">{report.aiSummary}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Skill Radar */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="w-5 h-5 text-sky-600" />
                        <h2 className="text-base font-bold text-sky-900">Năng lực tổng quan</h2>
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
                        <h2 className="text-base font-bold text-sky-900">Điểm mạnh ({report.strengths.length})</h2>
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
                        <h2 className="text-base font-bold text-sky-900">Điểm cần cải thiện ({report.weaknesses.length})</h2>
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
                        <TrendingUp className="w-5 h-5 text-sky-600" />
                        <h2 className="text-base font-bold text-sky-900">Khuyến nghị ({report.recommendations.length})</h2>
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
                        <Button variant="ghost" className="rounded-full text-sm gap-1.5 cursor-pointer">
                            <RotateCcw className="w-4 h-4" />
                            Phỏng vấn lại
                        </Button>
                    </Link>
                    <Link href="/interview/result">
                        <Button className="rounded-full text-sm gap-1.5 bg-sky-600 hover:bg-sky-700 text-white cursor-pointer">
                            <FileText className="w-4 h-4" />
                            Xem chi tiết rubric
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
