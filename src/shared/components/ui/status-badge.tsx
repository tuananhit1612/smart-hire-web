"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  Shared Score & Status Badges
 *  Consolidated from inline definitions across 3+ files.
 * ═══════════════════════════════════════════════════════════
 */

import { cn } from "@/shared/utils/cn";

// ─── Score Badge ─────────────────────────────────────
interface ScoreBadgeProps {
    readonly score: number;
    readonly size?: "xs" | "sm" | "md";
    readonly className?: string;
}

function getScoreColor(score: number) {
    if (score >= 90) return { bg: "bg-emerald-100", text: "text-emerald-700" };
    if (score >= 75) return { bg: "bg-sky-100", text: "text-sky-700" };
    if (score >= 60) return { bg: "bg-amber-100", text: "text-amber-700" };
    return { bg: "bg-rose-100", text: "text-rose-700" };
}

const SCORE_SIZE = {
    xs: "text-[9px] px-1.5 py-0.5",
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
};

export function ScoreBadge({ score, size = "sm", className }: ScoreBadgeProps) {
    const colors = getScoreColor(score);
    return (
        <span className={cn("inline-flex items-center font-bold rounded-full", SCORE_SIZE[size], colors.bg, colors.text, className)}>
            {score}
        </span>
    );
}

// ─── Status Badge ────────────────────────────────────
type StatusVariant = "success" | "warning" | "danger" | "info" | "neutral" | "purple";

const STATUS_COLORS: Record<StatusVariant, { bg: string; text: string; dot: string }> = {
    success: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
    warning: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
    danger: { bg: "bg-rose-100", text: "text-rose-700", dot: "bg-rose-500" },
    info: { bg: "bg-sky-100", text: "text-sky-700", dot: "bg-sky-500" },
    neutral: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
    purple: { bg: "bg-violet-100", text: "text-violet-700", dot: "bg-violet-500" },
};

interface StatusBadgeProps {
    readonly label: string;
    readonly variant?: StatusVariant;
    readonly showDot?: boolean;
    readonly size?: "xs" | "sm" | "md";
    readonly className?: string;
}

export function StatusBadge({ label, variant = "neutral", showDot = false, size = "sm", className }: StatusBadgeProps) {
    const colors = STATUS_COLORS[variant];
    return (
        <span className={cn("inline-flex items-center gap-1 font-bold rounded-full", SCORE_SIZE[size], colors.bg, colors.text, className)}>
            {showDot && <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />}
            {label}
        </span>
    );
}

export { getScoreColor, STATUS_COLORS, type StatusVariant };
