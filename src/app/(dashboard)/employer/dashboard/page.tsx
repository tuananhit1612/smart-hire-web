"use client";

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
    Eye,
    Sparkles,
    CalendarDays,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import FunnelByStage from "@/features/employer/components/funnel-by-stage";
import PassRateTable from "@/features/employer/components/pass-rate-table";
import TopMissingSkills from "@/features/employer/components/top-missing-skills";

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
    change: string;
    trend: "up" | "down";
    icon: typeof Users;
    gradient: string;
    shadowColor: string;
}

const statCards: StatCard[] = [
    {
        label: "Tổng ứng viên",
        value: "1,284",
        change: "+12.5%",
        trend: "up",
        icon: Users,
        gradient: "from-sky-500 to-blue-600",
        shadowColor: "shadow-sky-500/25",
    },
    {
        label: "Tin tuyển dụng",
        value: "24",
        change: "+3",
        trend: "up",
        icon: Briefcase,
        gradient: "from-violet-500 to-purple-600",
        shadowColor: "shadow-violet-500/25",
    },
    {
        label: "Đang phỏng vấn",
        value: "38",
        change: "+8.2%",
        trend: "up",
        icon: FileSearch,
        gradient: "from-emerald-500 to-green-600",
        shadowColor: "shadow-emerald-500/25",
    },
    {
        label: "Đã tuyển tháng này",
        value: "7",
        change: "-2",
        trend: "down",
        icon: UserCheck,
        gradient: "from-amber-500 to-orange-600",
        shadowColor: "shadow-amber-500/25",
    },
];

// ─── Recent Activity Data ────────────────────────────
interface ActivityItem {
    id: string;
    action: string;
    subject: string;
    time: string;
    type: "application" | "interview" | "hired" | "posted";
}

const recentActivities: ActivityItem[] = [
    { id: "a1", action: "Ứng viên mới ứng tuyển", subject: "Nguyễn Văn A — Senior Frontend Dev", time: "5 phút trước", type: "application" },
    { id: "a2", action: "Lên lịch phỏng vấn", subject: "Trần Thị B — UX Designer", time: "32 phút trước", type: "interview" },
    { id: "a3", action: "Đã tuyển dụng", subject: "Lê Văn C — Backend Engineer", time: "2 giờ trước", type: "hired" },
    { id: "a4", action: "Đăng tin mới", subject: "DevOps Engineer — Remote", time: "3 giờ trước", type: "posted" },
    { id: "a5", action: "Ứng viên mới ứng tuyển", subject: "Phạm Thị D — Data Analyst", time: "5 giờ trước", type: "application" },
    { id: "a6", action: "Lên lịch phỏng vấn", subject: "Hoàng Văn E — Mobile Developer", time: "6 giờ trước", type: "interview" },
    { id: "a7", action: "Đã tuyển dụng", subject: "Vũ Thị F — QA Engineer", time: "1 ngày trước", type: "hired" },
    { id: "a8", action: "Đăng tin mới", subject: "Product Manager — Hybrid", time: "1 ngày trước", type: "posted" },
];

const ACTIVITY_COLORS: Record<string, { dot: string; bg: string }> = {
    application: { dot: "bg-sky-500", bg: "bg-sky-50 dark:bg-sky-900/20" },
    interview: { dot: "bg-violet-500", bg: "bg-violet-50 dark:bg-violet-900/20" },
    hired: { dot: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    posted: { dot: "bg-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
};

// ─── Top Jobs Data ───────────────────────────────────
interface TopJob {
    title: string;
    applicants: number;
    views: number;
    status: "hot" | "active" | "closing";
}

const topJobs: TopJob[] = [
    { title: "Senior Frontend Developer", applicants: 142, views: 3200, status: "hot" },
    { title: "Backend Engineer (Node.js)", applicants: 98, views: 2100, status: "hot" },
    { title: "UX/UI Designer", applicants: 76, views: 1800, status: "active" },
    { title: "DevOps Engineer", applicants: 45, views: 1200, status: "active" },
    { title: "Data Analyst", applicants: 34, views: 890, status: "closing" },
];

const STATUS_BADGE: Record<string, { label: string; color: string }> = {
    hot: { label: "Hot", color: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400" },
    active: { label: "Active", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" },
    closing: { label: "Closing", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" },
};

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
    const today = new Date();
    const dateStr = today.toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

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
                        <div className="flex items-center gap-3 ml-[52px] md:ml-0">
                            <div className="px-4 py-2 rounded-full bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] border border-[rgba(145,158,171,0.12)] text-xs font-medium text-[#637381] dark:text-[#919EAB] flex items-center gap-2">
                                <CalendarDays className="w-3.5 h-3.5" />
                                Tháng {today.getMonth() + 1}, {today.getFullYear()}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ═══ Section: Stat Cards ═══ */}
                <div className="mb-12">
                    <SectionOverline label="Tổng quan" />
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
                                        <div className={cn(
                                            "flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full",
                                            card.trend === "up"
                                                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                                                : "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400"
                                        )}>
                                            {card.trend === "up" ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                                            {card.change}
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
                </div>

                {/* ═══ Section: Charts & Funnel ═══ */}
                <div className="mb-12">
                    <SectionOverline label="Biểu đồ & Phễu tuyển dụng" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Application Trend — enhanced mini bar chart */}
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
                                        <h3 className="text-base font-bold text-[#1C252E] dark:text-white">Ứng viên theo tuần</h3>
                                        <p className="text-xs text-[#919EAB]">8 tuần gần nhất</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-black text-[#1C252E] dark:text-white">85</p>
                                    <div className="flex items-center justify-end gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                                        <TrendingUp className="w-3.5 h-3.5" />
                                        +26.8% tuần này
                                    </div>
                                </div>
                            </div>
                            <MiniBar
                                values={[45, 62, 38, 78, 55, 92, 67, 85]}
                                colors={["bg-sky-300 dark:bg-sky-600", "bg-sky-400 dark:bg-sky-500", "bg-sky-500 dark:bg-sky-400", "bg-sky-400 dark:bg-sky-500"]}
                            />
                            <div className="flex justify-between mt-3 px-1">
                                {["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"].map((l) => (
                                    <span key={l} className="text-[10px] text-[#C4CDD5] dark:text-[#637381] font-medium">{l}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Pipeline Funnel */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0.25, ease: premiumEase }}
                        >
                            <FunnelByStage />
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
                                {topJobs.map((job, i) => {
                                    const badge = STATUS_BADGE[job.status];
                                    return (
                                        <motion.div
                                            key={job.title}
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
                                                        <Users className="w-3.5 h-3.5" /> {job.applicants} ứng viên
                                                    </span>
                                                    <span className="text-xs text-[#919EAB] flex items-center gap-1.5">
                                                        <Eye className="w-3.5 h-3.5" /> {job.views.toLocaleString()} views
                                                    </span>
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
                                {recentActivities.map((act, i) => {
                                    const colors = ACTIVITY_COLORS[act.type];
                                    return (
                                        <motion.div
                                            key={act.id}
                                            {...fadeUp}
                                            transition={{ delay: 0.25 + i * 0.06, ease: premiumEase }}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="mt-1.5 relative">
                                                <div className={cn("w-2.5 h-2.5 rounded-full ring-4 ring-white dark:ring-[#1C252E]", colors?.dot)} />
                                                {i < recentActivities.length - 1 && (
                                                    <div className="absolute top-3.5 left-1 w-px h-8 bg-[rgba(145,158,171,0.15)] dark:bg-white/[0.06]" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-[#1C252E] dark:text-white">{act.action}</p>
                                                <p className="text-xs text-[#637381] dark:text-[#919EAB] truncate">{act.subject}</p>
                                                <p className="text-[10px] text-[#C4CDD5] dark:text-[#637381] mt-0.5 flex items-center gap-1">
                                                    <Clock className="w-2.5 h-2.5" /> {act.time}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
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
