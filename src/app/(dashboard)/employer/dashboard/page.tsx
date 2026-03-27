import { useState } from "react";
import { motion } from "framer-motion";
import {
    Users,
    Briefcase,
    FileSearch,
    TrendingUp,
    TrendingDown,
    Clock,
    UserCheck,
    BarChart3,
    Activity,
    ArrowUpRight,
    Star,
    Sparkles,
    CalendarDays,
    Loader2,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Download,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { downloadBlob } from "@/shared/utils/download-file";
import { useToastHelpers } from "@/shared/components/ui/toast";
import FunnelByStage, {
    type FunnelStage,
    defaultFunnelStages,
} from "@/features/employer/components/funnel-by-stage";
import PassRateTable from "@/features/employer/components/pass-rate-table";
import TopMissingSkills from "@/features/employer/components/top-missing-skills";
import { useDashboardOverview } from "@/features/employer/hooks/use-dashboard-overview";
import type {
    HrDashboardOverview,
    StageFunnelItem,
    WeeklyTrendItem,
    TopJobItem,
    RecentActivityItem,
} from "@/features/employer/api/dashboard-api";
import {
    exportHrApplicationsCsv,
    exportHrJobsCsv,
} from "@/features/employer/api/dashboard-api";

// ─── Animation Presets ───────────────────────────────
const premiumEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
    initial: { opacity: 0, y: 30, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true },
};

// ─── Section Overline ────────────────────────────────
function SectionOverline({ label, className }: { readonly label: string; readonly className?: string }) {
    return (
        <motion.span
            {...fadeUp}
            transition={{ duration: 0.5, ease: premiumEase }}
            className={cn("inline-block text-[#22C55E] text-[11px] font-bold tracking-[0.15em] uppercase mb-4", className)}
        >
            {label}
        </motion.span>
    );
}

// ─── Stat Card Data ──────────────────────────────────
interface StatCard {
    label: string;
    value: string;
    icon: typeof Users;
    gradient: string;
    shadowColor: string;
    statusIcon?: typeof CheckCircle2;
    statusColor?: string;
}

/** Build stat cards from live API data */
function buildStatCards(data: HrDashboardOverview): StatCard[] {
    return [
        {
            label: "Tổng ứng viên",
            value: data.totalApplications.toLocaleString("vi-VN"),
            icon: Users,
            gradient: "from-[#22c55e] to-[#10b981]",
            shadowColor: "shadow-green-500/20",
        },
        {
            label: "Tổng tin tuyển dụng",
            value: data.totalJobs.toLocaleString("vi-VN"),
            icon: Briefcase,
            gradient: "from-violet-500 to-purple-600",
            shadowColor: "shadow-violet-500/25",
        },
        {
            label: "Đang tuyển",
            value: data.openJobs.toLocaleString("vi-VN"),
            icon: FileSearch,
            gradient: "from-emerald-500 to-green-600",
            shadowColor: "shadow-emerald-500/25",
            statusIcon: CheckCircle2,
            statusColor: "text-emerald-500",
        },
        {
            label: "Tỷ lệ tuyển dụng",
            value: `${data.hireRate.toFixed(1)}%`,
            icon: UserCheck,
            gradient: "from-amber-500 to-orange-600",
            shadowColor: "shadow-amber-500/25",
        },
    ];
}

// ─── Stage visual config (maps backend stage names to icons/colors) ─
const STAGE_VISUAL: Record<string, { icon: typeof Users; color: string; bg: string; barColor: string }> = {
    APPLIED: { icon: Users, color: "text-[#22c55e]", bg: "bg-[#22c55e]/10 dark:bg-[#22c55e]/20", barColor: "bg-[#22c55e]" },
    SCREENING: { icon: FileSearch, color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-900/20", barColor: "bg-violet-500" },
    INTERVIEW: { icon: FileSearch, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20", barColor: "bg-amber-500" },
    OFFER: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20", barColor: "bg-emerald-500" },
    HIRED: { icon: UserCheck, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20", barColor: "bg-rose-500" },
    REJECTED: { icon: XCircle, color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20", barColor: "bg-red-500" },
};

const STAGE_LABELS: Record<string, string> = {
    APPLIED: "Ứng tuyển",
    SCREENING: "Sàng lọc",
    INTERVIEW: "Phỏng vấn",
    OFFER: "Offer",
    HIRED: "Tuyển dụng",
    REJECTED: "Từ chối",
};

function mapStageFunnelToUI(items: StageFunnelItem[]): FunnelStage[] {
    return items.map((item, idx) => {
        const vis = STAGE_VISUAL[item.stage] ?? STAGE_VISUAL.APPLIED;
        return {
            id: item.stage.toLowerCase(),
            label: STAGE_LABELS[item.stage] ?? item.stage,
            count: item.count,
            icon: vis.icon,
            color: vis.color,
            bg: vis.bg,
            barColor: vis.barColor,
        };
    });
}

// ─── Status badge for TopJob ─────────────────────────
const STATUS_BADGE: Record<string, { label: string; color: string }> = {
    OPEN: { label: "Active", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" },
    CLOSED: { label: "Closed", color: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400" },
    DRAFT: { label: "Draft", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" },
    UNKNOWN: { label: "—", color: "bg-gray-100 dark:bg-gray-800 text-gray-500" },
};

/** Format ISO timestamp to a relative "time ago" string */
function timeAgo(iso: string): string {
    if (!iso) return "";
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60_000);
    if (mins < 1) return "Vừa xong";
    if (mins < 60) return `${mins} phút trước`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} giờ trước`;
    const days = Math.floor(hours / 24);
    return `${days} ngày trước`;
}

// ─── Animated Bar ────────────────────────────────────
function MiniBar({ values, colors }: { readonly values: number[]; readonly colors: string[] }) {
    const max = Math.max(...values);
    return (
        <div className="flex items-end gap-2 h-32">
            {values.map((v, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(v / max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: premiumEase }}
                    className={cn("flex-1 rounded-t-lg min-w-0", colors[i % colors.length])}
                />
            ))}
        </div>
    );
}

// ─── Main Page ───────────────────────────────────────
export default function HRDashboardPage() {
    const { data: overview, isLoading, error, refetch } = useDashboardOverview();
    const [exportingApps, setExportingApps] = useState(false);
    const [exportingJobs, setExportingJobs] = useState(false);
    const toast = useToastHelpers();

    const handleExportApps = async () => {
        try {
            setExportingApps(true);
            const blob = await exportHrApplicationsCsv();
            const filename = `hr_applications_${new Date().toISOString().slice(0, 10)}.csv`;
            downloadBlob(blob, filename);
            toast.success("Đã xuất báo cáo CSV Ứng viên thành công!", "Tệp tải xuống nằm trong thư mục Downloads.");
        } catch (err) {
            toast.error("Xuất báo cáo thất bại", "Vui lòng thử lại sau.");
        } finally {
            setExportingApps(false);
        }
    };

    const handleExportJobs = async () => {
        try {
            setExportingJobs(true);
            const blob = await exportHrJobsCsv();
            const filename = `hr_jobs_${new Date().toISOString().slice(0, 10)}.csv`;
            downloadBlob(blob, filename);
            toast.success("Đã xuất báo cáo CSV Tin tuyển dụng thành công!", "Tệp tải xuống nằm trong thư mục Downloads.");
        } catch (err) {
            toast.error("Xuất báo cáo thất bại", "Vui lòng thử lại sau.");
        } finally {
            setExportingJobs(false);
        }
    };

    const today = new Date();
    const dateStr = today.toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const statCards = overview ? buildStatCards(overview) : [];
    const funnelStages = overview?.stageFunnel?.length
        ? mapStageFunnelToUI(overview.stageFunnel)
        : defaultFunnelStages;

    return (
        <section className="relative z-10 pt-8 pb-16 md:pt-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* ═══ Welcome Banner ═══ */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: premiumEase }}
                    className="relative overflow-hidden backdrop-blur-xl bg-white/70 dark:bg-white/[0.04] border border-white/50 dark:border-white/[0.08] rounded-3xl p-8 md:p-10 mb-10 group"
                >
                    {/* Decorative glow */}
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-[#22C55E]/20 to-[#10b981]/10 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-gradient-to-br from-[#FFAB00]/10 to-[#FFD666]/10 rounded-full blur-3xl opacity-40" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center shadow-lg shadow-green-500/25">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <h1 className="text-2xl md:text-3xl font-bold text-[#1C252E] dark:text-white">
                                    Xin chào, HR Manager! 👋
                                </h1>
                            </div>
                            <p className="text-sm md:text-base text-[#637381] dark:text-[#C4CDD5] ml-[52px]">
                                {dateStr} — Tổng quan tuyển dụng của bạn hôm nay
                            </p>
                        </div>
                            <div className="flex flex-col sm:flex-row items-center gap-3 ml-[52px] md:ml-0 mt-4 md:mt-0">
                                <div className="px-4 py-2 rounded-full bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] border border-[rgba(145,158,171,0.12)] text-xs font-medium text-[#637381] dark:text-[#919EAB] flex items-center gap-2">
                                    <CalendarDays className="w-3.5 h-3.5" />
                                    Tháng {today.getMonth() + 1}, {today.getFullYear()}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleExportApps}
                                        disabled={exportingApps}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20 border border-[rgba(145,158,171,0.2)] text-xs font-semibold text-[#1C252E] dark:text-white transition-all hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Xuất CSV Ứng viên"
                                    >
                                        {exportingApps ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5 text-violet-600" />}
                                        <span className="hidden sm:inline">CSV Ứng viên</span>
                                    </button>
                                    <button
                                        onClick={handleExportJobs}
                                        disabled={exportingJobs}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20 border border-[rgba(145,158,171,0.2)] text-xs font-semibold text-[#1C252E] dark:text-white transition-all hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Xuất CSV Tin tuyển dụng"
                                    >
                                        {exportingJobs ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5 text-emerald-600" />}
                                        <span className="hidden sm:inline">CSV Việc làm</span>
                                    </button>
                                </div>
                            </div>
                    </div>
                </motion.div>

                {/* ═══ Section: Stat Cards ═══ */}
                <div className="mb-12">
                    <SectionOverline label="Tổng quan" />

                    {/* Error banner */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 flex items-center gap-3 rounded-xl border border-rose-200 dark:border-rose-800/40 bg-rose-50 dark:bg-rose-900/20 p-4 text-sm text-rose-700 dark:text-rose-400"
                        >
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <span>{error}</span>
                            <button onClick={refetch} className="ml-auto text-xs font-semibold underline hover:no-underline">Thử lại</button>
                        </motion.div>
                    )}

                    {/* Loading state */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-6 animate-pulse">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-gray-700 mb-4" />
                                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                                    <div className="h-4 w-32 bg-gray-100 dark:bg-gray-800 rounded" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {statCards.map((card, i) => {
                                const Icon = card.icon;
                                return (
                                    <motion.div
                                        key={card.label}
                                        {...fadeUp}
                                        transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: premiumEase }}
                                        className="group relative bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-6 hover:border-[rgba(145,158,171,0.32)] hover:shadow-lg transition-all duration-300 cursor-default"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={cn(
                                                "w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                                                card.gradient,
                                                card.shadowColor
                                            )}>
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                        </div>
                                        <h3 className="text-3xl font-black text-[#1C252E] dark:text-white mb-1 tracking-tight">
                                            {card.value}
                                        </h3>
                                        <p className="text-sm text-[#919EAB] font-medium">{card.label}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* ═══ Section: Charts & Funnel ═══ */}
                <div className="mb-12">
                    <SectionOverline label="Biểu đồ & Phễu tuyển dụng" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Application Trend — live weekly data */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0.15, ease: premiumEase }}
                            className="bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-6 hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[rgba(145,158,171,0.06)] dark:bg-[rgba(145,158,171,0.1)] flex items-center justify-center">
                                        <BarChart3 className="w-5 h-5 text-[#1C252E] dark:text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-[#1C252E] dark:text-white">Ứng viên theo ngày</h3>
                                        <p className="text-xs text-[#919EAB]">8 ngày gần nhất</p>
                                    </div>
                                </div>
                                {overview?.weeklyTrend && overview.weeklyTrend.length > 0 && (
                                    <div className="text-right">
                                        <p className="text-3xl font-black text-[#1C252E] dark:text-white">
                                            {overview.weeklyTrend[overview.weeklyTrend.length - 1].count}
                                        </p>
                                        <p className="text-xs text-[#919EAB] mt-0.5">hôm nay</p>
                                    </div>
                                )}
                            </div>
                            {overview?.weeklyTrend && overview.weeklyTrend.length > 0 ? (
                                <>
                                    <MiniBar
                                        values={overview.weeklyTrend.map((d) => d.count || 0.5)}
                                        colors={["bg-[#22c55e]/40 dark:bg-[#22c55e]/60", "bg-[#22c55e] dark:bg-[#22c55e]"]}
                                    />
                                    <div className="flex justify-between mt-3 px-1">
                                        {overview.weeklyTrend.map((d) => (
                                            <span key={d.date} className="text-[10px] text-[#C4CDD5] dark:text-[#637381] font-medium">
                                                {new Date(d.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p className="text-sm text-[#919EAB] text-center py-8">Chưa có dữ liệu</p>
                            )}
                        </motion.div>

                        {/* Pipeline Funnel — live data from API */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0.25, ease: premiumEase }}
                        >
                            <FunnelByStage stages={funnelStages} />
                        </motion.div>
                    </div>
                </div>

                {/* ═══ Section: Top Jobs & Activity Feed ═══ */}
                <div className="mb-12">
                    <SectionOverline label="Tin tuyển dụng & Hoạt động" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Top Jobs (2 cols) */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0.1, ease: premiumEase }}
                            className="lg:col-span-2 bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-6 hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFAB00] to-[#FFD666] shadow-lg shadow-yellow-500/25 flex items-center justify-center">
                                        <Star className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-base font-bold text-[#1C252E] dark:text-white">Top tin tuyển dụng</h3>
                                </div>
                                <button className="text-xs text-[#919EAB] hover:text-[#22C55E] transition-colors cursor-pointer font-medium">
                                    Xem tất cả →
                                </button>
                            </div>
                            <div className="space-y-2">
                                {(overview?.topJobs ?? []).length === 0 && (
                                    <p className="text-sm text-[#919EAB] text-center py-6">Chưa có dữ liệu</p>
                                )}
                                {(overview?.topJobs ?? []).map((job, i) => {
                                    const badge = STATUS_BADGE[job.status] ?? STATUS_BADGE.UNKNOWN;
                                    return (
                                        <motion.div
                                            key={job.jobId}
                                            {...fadeUp}
                                            transition={{ delay: 0.2 + i * 0.08, ease: premiumEase }}
                                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-[rgba(145,158,171,0.06)] dark:hover:bg-white/[0.04] transition-colors group cursor-pointer"
                                        >
                                            <span className="text-base font-bold text-[#C4CDD5] dark:text-[#637381] w-6 text-center">{i + 1}</span>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-[#1C252E] dark:text-white truncate group-hover:text-[#22C55E] transition-colors">
                                                    {job.title}
                                                </p>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <span className="text-xs text-[#919EAB] flex items-center gap-1.5">
                                                        <Users className="w-3.5 h-3.5" /> {job.applicationCount} ứng viên
                                                    </span>
                                                    <span className="text-xs text-[#919EAB] flex items-center gap-1.5">
                                                        <UserCheck className="w-3.5 h-3.5" /> {job.hiredCount} đã tuyển
                                                    </span>
                                                    {job.newToday > 0 && (
                                                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                                                            <TrendingUp className="w-3 h-3" /> +{job.newToday} hôm nay
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full", badge?.color)}>
                                                {badge?.label}
                                            </span>
                                            <ArrowUpRight className="w-4 h-4 text-[#C4CDD5] dark:text-[#637381] group-hover:text-[#22C55E] transition-colors" />
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Activity Feed (1 col) */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0.2, ease: premiumEase }}
                            className="bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-6 hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-xl bg-[rgba(145,158,171,0.06)] dark:bg-[rgba(145,158,171,0.1)] flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-[#1C252E] dark:text-white" />
                                </div>
                                <h3 className="text-base font-bold text-[#1C252E] dark:text-white">Hoạt động gần đây</h3>
                            </div>
                            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[rgba(145,158,171,0.2)]">
                                {(overview?.recentActivities ?? []).length === 0 && (
                                    <p className="text-sm text-[#919EAB] text-center py-6">Chưa có hoạt động nào</p>
                                )}
                                {(overview?.recentActivities ?? []).map((act, i) => (
                                    <motion.div
                                        key={`${act.candidateName}-${act.timestamp}-${i}`}
                                        {...fadeUp}
                                        transition={{ delay: 0.25 + i * 0.06, ease: premiumEase }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="mt-1.5 relative">
                                            {act.avatarUrl ? (
                                                <img
                                                    src={act.avatarUrl}
                                                    alt={act.candidateName}
                                                    className="w-7 h-7 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center text-white text-[10px] font-bold">
                                                    {act.candidateName.charAt(0)}
                                                </div>
                                            )}
                                            {i < (overview?.recentActivities ?? []).length - 1 && (
                                                <div className="absolute top-8 left-3.5 w-px h-6 bg-[rgba(145,158,171,0.15)] dark:bg-white/[0.06]" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-[#1C252E] dark:text-white">{act.candidateName}</p>
                                            <p className="text-xs text-[#637381] dark:text-[#919EAB] truncate">
                                                {act.action} — {act.jobTitle}
                                            </p>
                                            <p className="text-[10px] text-[#C4CDD5] dark:text-[#637381] mt-0.5 flex items-center gap-1">
                                                <Clock className="w-2.5 h-2.5" /> {timeAgo(act.timestamp)}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* ═══ Section: Analytics Detail ═══ */}
                <div>
                    <SectionOverline label="Phân tích chi tiết" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0.1, ease: premiumEase }}
                        >
                            <PassRateTable />
                        </motion.div>
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0.2, ease: premiumEase }}
                        >
                            <TopMissingSkills />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

