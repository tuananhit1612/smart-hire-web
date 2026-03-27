"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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
    Sparkles,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import type { ReportStrength, ReportWeakness, Recommendation } from "../types/interview-ui-types";

// ─── Config Maps ─────────────────────────────────────

const STRENGTH_ICONS: Record<string, typeof Star> = {
    star: Star,
    zap: Zap,
    target: Target,
    trophy: Trophy,
    brain: BrainCircuit,
};

const IMPACT_CONFIG: Record<string, { label: string; color: string }> = {
    high: { label: "Cao", color: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400" },
    medium: { label: "Trung bình", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" },
    low: { label: "Thấp", color: "bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-[#919EAB]" },
};

const PRIORITY_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
    critical: { label: "Quan trọng", color: "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/30", dot: "bg-rose-500" },
    important: { label: "Nên làm", color: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/30", dot: "bg-amber-500" },
    "nice-to-have": { label: "Tùy chọn", color: "bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-[#919EAB] border-slate-200 dark:border-white/[0.08]", dot: "bg-slate-400" },
};

// ─── Skill Bar ───────────────────────────────────────

interface SkillBarProps {
    readonly skill: string;
    readonly score: number;
    readonly maxScore: number;
    readonly delay: number;
}

export function SkillBar({ skill, score, maxScore, delay }: SkillBarProps) {
    const pct = (score / maxScore) * 100;
    const getColor = () => {
        if (pct >= 80) return "bg-emerald-500";
        if (pct >= 60) return "bg-[#22c55e]";
        if (pct >= 40) return "bg-amber-500";
        return "bg-rose-500";
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-base font-medium text-slate-600 dark:text-[#C4CDD5] w-36 shrink-0">{skill}</span>
            <div className="flex-1 h-3 bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay, ease: "easeOut" }}
                    className={cn("h-full rounded-full", getColor())}
                />
            </div>
            <span className="text-base font-bold text-slate-700 dark:text-white w-8 text-right">{score}</span>
        </div>
    );
}

// ─── Strength Card ───────────────────────────────────

interface StrengthCardProps {
    readonly strength: ReportStrength;
    readonly index: number;
}

export function StrengthCard({ strength, index }: StrengthCardProps) {
    const Icon = STRENGTH_ICONS[strength.icon] ?? Star;

    return (
        <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-[#1C252E] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-4 hover:shadow-md transition-shadow"
        >
            <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-[#22c55e] dark:text-white">{strength.title}</h4>
                    <p className="text-base text-slate-500 dark:text-[#C4CDD5] mt-1 leading-relaxed">{strength.description}</p>
                    <div className="mt-2 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-lg px-3 py-2 border border-emerald-100/50 dark:border-emerald-800/30">
                        <p className="text-sm text-emerald-700 dark:text-emerald-400 italic">
                            <span className="font-semibold not-italic">Minh chứng:</span> {strength.evidence}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Weakness Card ───────────────────────────────────

interface WeaknessCardProps {
    readonly weakness: ReportWeakness;
    readonly index: number;
}

export function WeaknessCard({ weakness, index }: WeaknessCardProps) {
    const impact = IMPACT_CONFIG[weakness.impact];

    return (
        <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-[#1C252E] rounded-2xl border border-slate-100 dark:border-white/[0.08] shadow-sm p-4 hover:shadow-md transition-shadow"
        >
            <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4.5 h-4.5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-[#22c55e] dark:text-white">{weakness.title}</h4>
                        <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded-full", impact?.color)}>
                            {impact?.label}
                        </span>
                    </div>
                    <p className="text-base text-slate-500 dark:text-[#C4CDD5] mt-1 leading-relaxed">{weakness.description}</p>
                    <div className="mt-2 bg-[#22c55e]/5 dark:bg-[#22c55e]/10 rounded-lg px-3 py-2 border border-[#22c55e]/20 dark:border-[#22c55e]/30 flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#22c55e] mt-0.5 shrink-0" />
                        <p className="text-sm text-[#22c55e] dark:text-[#22c55e]">{weakness.suggestion}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Recommendation Card (Expandable) ────────────────

interface RecommendationCardProps {
    readonly rec: Recommendation;
    readonly index: number;
}

export function RecommendationCard({ rec, index }: RecommendationCardProps) {
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
                    <h4 className="text-base font-bold">{rec.title}</h4>
                    <p className="text-sm opacity-70 mt-0.5 truncate">{rec.description}</p>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full border bg-white/60 shrink-0">
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
                            <p className="text-base leading-relaxed opacity-80">{rec.description}</p>

                            {/* Action Items */}
                            <div>
                                <p className="text-sm font-bold uppercase tracking-wider opacity-60 mb-2">Hành động cụ thể</p>
                                <ul className="space-y-1.5">
                                    {rec.actionItems.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-base">
                                            <CheckCircle2 className="w-4 h-4 opacity-50 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Resources */}
                            {rec.resources && rec.resources.length > 0 && (
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-wider opacity-60 mb-2">Tài liệu tham khảo</p>
                                    <ul className="space-y-1">
                                        {rec.resources.map((res) => (
                                            <li key={res} className="flex items-center gap-1.5 text-sm opacity-70">
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
