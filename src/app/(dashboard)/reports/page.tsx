"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
    FileText,
    Download,
    Briefcase,
    Users,
    Calendar,
    TrendingUp,
    Clock,
    XCircle,
    CheckCircle2,
    Loader2,
    BarChart3,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useApplicationStore } from "@/features/jobs/stores/application-store";
import {
    exportToCSV,
    formatDate,
    getStageLabel,
} from "@/features/reporting/utils/export-utils";
import type { ApplicationTrackingResponse } from "@/features/jobs/api/application-api";

// ─── Stats Card ──────────────────────────────────────────

interface StatCardProps {
    label: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    delay?: number;
}

function StatCard({ label, value, icon, color, bgColor, delay = 0 }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] bg-white dark:bg-[#1C252E] p-6"
        >
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-[#637381] dark:text-[#919EAB]">
                        {label}
                    </p>
                    <p className="text-3xl font-bold text-[#1C252E] dark:text-white">
                        {value}
                    </p>
                </div>
                <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl"
                    style={{ backgroundColor: bgColor, color }}
                >
                    {icon}
                </div>
            </div>
            {/* Subtle accent bar */}
            <div
                className="absolute bottom-0 left-0 h-1 w-full opacity-60"
                style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
            />
        </motion.div>
    );
}

// ─── Stage Bar ───────────────────────────────────────────

interface StageBarProps {
    stage: string;
    count: number;
    total: number;
    color: string;
    delay?: number;
}

function StageBar({ stage, count, total, color, delay = 0 }: StageBarProps) {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.3 }}
            className="space-y-1.5"
        >
            <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-[#1C252E] dark:text-white">
                    {getStageLabel(stage)}
                </span>
                <span className="text-[#637381] dark:text-[#919EAB]">
                    {count} ({pct}%)
                </span>
            </div>
            <div className="h-2.5 rounded-full bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.04] overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: delay + 0.2, duration: 0.6, ease: "easeOut" }}
                />
            </div>
        </motion.div>
    );
}

// ─── Skeleton ────────────────────────────────────────────

function ReportSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-700" />
                ))}
            </div>
            <div className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-700" />
        </div>
    );
}

// ─── Stage Colors ────────────────────────────────────────

const STAGE_COLORS: Record<string, string> = {
    APPLIED: "#3B82F6",
    SCREENING: "#F59E0B",
    INTERVIEW: "#8B5CF6",
    OFFER: "#22C55E",
    HIRED: "#10B981",
    REJECTED: "#EF4444",
    WITHDRAWN: "#6B7280",
};

// ─── Page ────────────────────────────────────────────────

export default function ReportsPage() {
    const {
        serverApplications,
        isLoadingApplications,
        fetchApplications,
    } = useApplicationStore();

    const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    // ── Computed Stats ───────────────────────────────────

    const stats = useMemo(() => {
        const apps = serverApplications;
        const total = apps.length;

        const byStage: Record<string, number> = {};
        for (const app of apps) {
            byStage[app.currentStage] = (byStage[app.currentStage] ?? 0) + 1;
        }

        return {
            total,
            active: (byStage["APPLIED"] ?? 0) + (byStage["SCREENING"] ?? 0) + (byStage["INTERVIEW"] ?? 0),
            interviews: byStage["INTERVIEW"] ?? 0,
            offers: (byStage["OFFER"] ?? 0) + (byStage["HIRED"] ?? 0),
            rejections: byStage["REJECTED"] ?? 0,
            withdrawn: byStage["WITHDRAWN"] ?? 0,
            byStage,
        };
    }, [serverApplications]);

    // ── Export Handler ────────────────────────────────────

    const handleExportCSV = useCallback(() => {
        setIsExporting(true);

        try {
            const rows = serverApplications.map((app: ApplicationTrackingResponse) => ({
                "Vị trí": app.jobTitle,
                "Công ty": app.companyName,
                "Trạng thái": getStageLabel(app.currentStage),
                "Ngày nộp": formatDate(app.appliedAt),
                "Cập nhật": formatDate(app.updatedAt),
            }));

            const timestamp = new Date().toISOString().slice(0, 10);
            exportToCSV(rows, `smarthire-bao-cao-${timestamp}.csv`, [
                "Vị trí",
                "Công ty",
                "Trạng thái",
                "Ngày nộp",
                "Cập nhật",
            ]);
        } finally {
            setTimeout(() => setIsExporting(false), 500);
        }
    }, [serverApplications]);

    // ── Render ────────────────────────────────────────────

    return (
        <section className="relative z-10 pt-6 pb-8 md:pt-8 md:pb-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 dark:bg-[#22c55e]/20 flex items-center justify-center">
                            <BarChart3 className="w-6 h-6 text-[#22c55e]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#1C252E] dark:text-white">
                                Báo cáo & Xuất dữ liệu
                            </h1>
                            <p className="text-base text-[#637381] dark:text-[#919EAB]">
                                Tổng quan ứng tuyển và xuất dữ liệu báo cáo
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={handleExportCSV}
                        disabled={isExporting || serverApplications.length === 0}
                        className="h-10 px-5 text-sm font-semibold rounded-xl bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 transition-all gap-2 cursor-pointer disabled:opacity-50"
                    >
                        {isExporting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Download className="w-4 h-4" />
                        )}
                        Xuất CSV
                    </Button>
                </motion.div>

                {isLoadingApplications ? (
                    <ReportSkeleton />
                ) : serverApplications.length === 0 ? (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.04] flex items-center justify-center mb-4">
                            <FileText className="w-8 h-8 text-[#C4CDD5] dark:text-[#637381]" />
                        </div>
                        <h3 className="text-base font-semibold text-[#637381] dark:text-[#919EAB] mb-1">
                            Chưa có dữ liệu báo cáo
                        </h3>
                        <p className="text-sm text-[#919EAB] dark:text-[#637381]">
                            Bắt đầu ứng tuyển việc làm để xem báo cáo tại đây.
                        </p>
                    </motion.div>
                ) : (
                    <div className="space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard
                                label="Tổng đơn ứng tuyển"
                                value={stats.total}
                                icon={<Briefcase className="w-6 h-6" />}
                                color="#3B82F6"
                                bgColor="rgba(59,130,246,0.12)"
                                delay={0}
                            />
                            <StatCard
                                label="Đang xử lý"
                                value={stats.active}
                                icon={<Clock className="w-6 h-6" />}
                                color="#F59E0B"
                                bgColor="rgba(245,158,11,0.12)"
                                delay={0.05}
                            />
                            <StatCard
                                label="Phỏng vấn"
                                value={stats.interviews}
                                icon={<Users className="w-6 h-6" />}
                                color="#8B5CF6"
                                bgColor="rgba(139,92,246,0.12)"
                                delay={0.1}
                            />
                            <StatCard
                                label="Đề nghị / Đã nhận"
                                value={stats.offers}
                                icon={<CheckCircle2 className="w-6 h-6" />}
                                color="#22C55E"
                                bgColor="rgba(34,197,94,0.12)"
                                delay={0.15}
                            />
                        </div>

                        {/* Stage Breakdown + Extra Stats */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Stage Breakdown */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="lg:col-span-2 rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] bg-white dark:bg-[#1C252E] p-6"
                            >
                                <h2 className="text-lg font-bold text-[#1C252E] dark:text-white mb-5 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-[#22c55e]" />
                                    Phân bổ theo giai đoạn
                                </h2>
                                <div className="space-y-4">
                                    {Object.entries(stats.byStage)
                                        .sort(([, a], [, b]) => b - a)
                                        .map(([stage, count], i) => (
                                            <StageBar
                                                key={stage}
                                                stage={stage}
                                                count={count}
                                                total={stats.total}
                                                color={STAGE_COLORS[stage] ?? "#6B7280"}
                                                delay={0.25 + i * 0.05}
                                            />
                                        ))}
                                </div>
                            </motion.div>

                            {/* Quick Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                className="rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] bg-white dark:bg-[#1C252E] p-6 space-y-5"
                            >
                                <h2 className="text-lg font-bold text-[#1C252E] dark:text-white flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-[#22c55e]" />
                                    Thống kê nhanh
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-2 border-b border-[rgba(145,158,171,0.08)] dark:border-white/[0.04]">
                                        <span className="text-sm text-[#637381] dark:text-[#919EAB]">
                                            Từ chối
                                        </span>
                                        <span className="flex items-center gap-1.5 text-sm font-semibold text-red-500">
                                            <XCircle className="w-4 h-4" />
                                            {stats.rejections}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-[rgba(145,158,171,0.08)] dark:border-white/[0.04]">
                                        <span className="text-sm text-[#637381] dark:text-[#919EAB]">
                                            Đã rút
                                        </span>
                                        <span className="text-sm font-semibold text-[#6B7280]">
                                            {stats.withdrawn}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-[rgba(145,158,171,0.08)] dark:border-white/[0.04]">
                                        <span className="text-sm text-[#637381] dark:text-[#919EAB]">
                                            Tỷ lệ thành công
                                        </span>
                                        <span className="text-sm font-semibold text-[#22C55E]">
                                            {stats.total > 0
                                                ? `${Math.round((stats.offers / stats.total) * 100)}%`
                                                : "—"}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-sm text-[#637381] dark:text-[#919EAB]">
                                            Tỷ lệ phỏng vấn
                                        </span>
                                        <span className="text-sm font-semibold text-[#8B5CF6]">
                                            {stats.total > 0
                                                ? `${Math.round((stats.interviews / stats.total) * 100)}%`
                                                : "—"}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Applications Table */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                            className="rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] bg-white dark:bg-[#1C252E] overflow-hidden"
                        >
                            <div className="px-6 py-4 border-b border-[rgba(145,158,171,0.08)] dark:border-white/[0.04]">
                                <h2 className="text-lg font-bold text-[#1C252E] dark:text-white flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-[#22c55e]" />
                                    Chi tiết ứng tuyển
                                </h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-[rgba(145,158,171,0.04)] dark:bg-white/[0.02]">
                                            <th className="px-6 py-3 text-left font-semibold text-[#637381] dark:text-[#919EAB]">
                                                Vị trí
                                            </th>
                                            <th className="px-6 py-3 text-left font-semibold text-[#637381] dark:text-[#919EAB]">
                                                Công ty
                                            </th>
                                            <th className="px-6 py-3 text-left font-semibold text-[#637381] dark:text-[#919EAB]">
                                                Trạng thái
                                            </th>
                                            <th className="px-6 py-3 text-left font-semibold text-[#637381] dark:text-[#919EAB]">
                                                Ngày nộp
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[rgba(145,158,171,0.08)] dark:divide-white/[0.04]">
                                        {serverApplications.map((app) => (
                                            <tr
                                                key={app.id}
                                                className="hover:bg-[rgba(145,158,171,0.04)] dark:hover:bg-white/[0.02] transition-colors"
                                            >
                                                <td className="px-6 py-4 font-medium text-[#1C252E] dark:text-white">
                                                    {app.jobTitle}
                                                </td>
                                                <td className="px-6 py-4 text-[#637381] dark:text-[#919EAB]">
                                                    {app.companyName}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                                                        style={{
                                                            color: STAGE_COLORS[app.currentStage] ?? "#6B7280",
                                                            backgroundColor: `${STAGE_COLORS[app.currentStage] ?? "#6B7280"}18`,
                                                        }}
                                                    >
                                                        {getStageLabel(app.currentStage)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-[#637381] dark:text-[#919EAB]">
                                                    {formatDate(app.appliedAt)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
}
