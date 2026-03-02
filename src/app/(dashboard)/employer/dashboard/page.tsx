"use client";

import { motion } from "framer-motion";
import {
    Users,
    Briefcase,
    FileSearch,
    TrendingUp,
    TrendingDown,
    CalendarDays,
    Clock,
    UserCheck,
    BarChart3,
    PieChart,
    Activity,
    ArrowUpRight,
    Star,
    Eye,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import FunnelByStage from "@/features/employer/components/funnel-by-stage";
import PassRateTable from "@/features/employer/components/pass-rate-table";
import TopMissingSkills from "@/features/employer/components/top-missing-skills";

// ─── Stat Card Data ──────────────────────────────────
interface StatCard {
    label: string;
    value: string;
    change: string;
    trend: "up" | "down";
    icon: typeof Users;
    color: string;
    bg: string;
}

const statCards: StatCard[] = [
    {
        label: "Tổng ứng viên",
        value: "1,284",
        change: "+12.5%",
        trend: "up",
        icon: Users,
        color: "text-primary",
        bg: "bg-sky-50",
    },
    {
        label: "Tin tuyển dụng",
        value: "24",
        change: "+3",
        trend: "up",
        icon: Briefcase,
        color: "text-violet-600",
        bg: "bg-violet-50",
    },
    {
        label: "Đang phỏng vấn",
        value: "38",
        change: "+8.2%",
        trend: "up",
        icon: FileSearch,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
    },
    {
        label: "Đã tuyển tháng này",
        value: "7",
        change: "-2",
        trend: "down",
        icon: UserCheck,
        color: "text-amber-600",
        bg: "bg-amber-50",
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
    application: { dot: "bg-sky-500", bg: "bg-sky-50" },
    interview: { dot: "bg-violet-500", bg: "bg-violet-50" },
    hired: { dot: "bg-emerald-500", bg: "bg-emerald-50" },
    posted: { dot: "bg-amber-500", bg: "bg-amber-50" },
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
    hot: { label: "Hot", color: "bg-rose-100 text-rose-700" },
    active: { label: "Active", color: "bg-emerald-100 text-emerald-700" },
    closing: { label: "Closing", color: "bg-amber-100 text-amber-700" },
};

// ─── Chart Placeholder ──────────────────────────────
function ChartPlaceholder({
    title,
    icon: Icon,
    description,
    height = "h-56",
}: {
    readonly title: string;
    readonly icon: typeof BarChart3;
    readonly description: string;
    readonly height?: string;
}) {
    return (
        <div className="clean-card p-5">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                </div>
                <button className="text-xs text-slate-400 hover:text-primary transition-colors cursor-pointer">
                    Xem chi tiết →
                </button>
            </div>
            <div className={cn("rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center gap-2 border border-dashed border-slate-200", height)}>
                <Icon className="w-10 h-10 text-slate-300" />
                <p className="text-sm text-slate-400 font-medium">{description}</p>
                <p className="text-[10px] text-slate-300">Tích hợp biểu đồ khi có API</p>
            </div>
        </div>
    );
}

// ─── Animated Bar (simple chart substitute) ──────────
function MiniBar({ values, colors }: { readonly values: number[]; readonly colors: string[] }) {
    const max = Math.max(...values);
    return (
        <div className="flex items-end gap-1.5 h-20">
            {values.map((v, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${(v / max) * 100}%` }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                    className={cn("w-3 rounded-t-sm", colors[i % colors.length])}
                />
            ))}
        </div>
    );
}

// ─── Main Page ───────────────────────────────────────
export default function HRDashboardPage() {
    return (
        <section className="relative z-10 pt-6 pb-12 md:pt-8">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-2xl font-bold text-slate-900">HR Dashboard</h1>
                    <p className="text-sm text-slate-500 mt-1">Tổng quan tuyển dụng — Tháng 2, 2026</p>
                </motion.div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {statCards.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={card.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="clean-card p-5 hover:border-slate-300"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", card.bg)}>
                                        <Icon className={cn("w-5 h-5", card.color)} />
                                    </div>
                                    <div className={cn(
                                        "flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full",
                                        card.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                    )}>
                                        {card.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                        {card.change}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">{card.value}</h3>
                                <p className="text-xs text-slate-400 mt-0.5">{card.label}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                    {/* Application Trend — with mini animated bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="clean-card p-5"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-primary" />
                                <h3 className="text-sm font-bold text-slate-900">Ứng viên theo tuần</h3>
                            </div>
                            <span className="text-xs text-slate-400">8 tuần gần nhất</span>
                        </div>
                        <div className="flex items-end justify-between px-2">
                            <MiniBar
                                values={[45, 62, 38, 78, 55, 92, 67, 85]}
                                colors={["bg-sky-300", "bg-sky-400", "bg-sky-500", "bg-sky-400"]}
                            />
                            <div className="text-right ml-4">
                                <p className="text-2xl font-black text-slate-900">85</p>
                                <p className="text-[10px] text-slate-400">tuần này</p>
                                <div className="flex items-center gap-0.5 text-xs text-emerald-600 font-semibold mt-1">
                                    <TrendingUp className="w-3 h-3" />
                                    +26.8%
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-3 px-1">
                            {["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"].map((l) => (
                                <span key={l} className="text-[10px] text-slate-300 w-3 text-center">{l}</span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Pipeline Funnel — real component */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        <FunnelByStage />
                    </motion.div>
                </div>

                {/* Bottom Grid: Top Jobs + Activity Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    {/* Top Jobs (3 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-3 clean-card p-5"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-amber-500" />
                                <h3 className="text-sm font-bold text-slate-900">Top tin tuyển dụng</h3>
                            </div>
                            <button className="text-xs text-slate-400 hover:text-primary transition-colors cursor-pointer">
                                Xem tất cả →
                            </button>
                        </div>
                        <div className="space-y-3">
                            {topJobs.map((job, i) => {
                                const badge = STATUS_BADGE[job.status];
                                return (
                                    <motion.div
                                        key={job.title}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + i * 0.06 }}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                                    >
                                        <span className="text-sm font-bold text-slate-300 w-5">{i + 1}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-primary transition-colors">
                                                {job.title}
                                            </p>
                                            <div className="flex items-center gap-3 mt-0.5">
                                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                                    <Users className="w-3 h-3" /> {job.applicants}
                                                </span>
                                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                                    <Eye className="w-3 h-3" /> {job.views}
                                                </span>
                                            </div>
                                        </div>
                                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", badge?.color)}>
                                            {badge?.label}
                                        </span>
                                        <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-sky-500 transition-colors" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Activity Feed (2 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="lg:col-span-2 clean-card p-5"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="w-5 h-5 text-primary" />
                            <h3 className="text-sm font-bold text-slate-900">Hoạt động gần đây</h3>
                        </div>
                        <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                            {recentActivities.map((act, i) => {
                                const colors = ACTIVITY_COLORS[act.type];
                                return (
                                    <motion.div
                                        key={act.id}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.45 + i * 0.05 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="mt-1.5 relative">
                                            <div className={cn("w-2.5 h-2.5 rounded-full", colors?.dot)} />
                                            {i < recentActivities.length - 1 && (
                                                <div className="absolute top-3 left-1 w-px h-6 bg-slate-100" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-slate-900">{act.action}</p>
                                            <p className="text-xs text-slate-500 truncate">{act.subject}</p>
                                            <p className="text-[10px] text-slate-300 mt-0.5 flex items-center gap-1">
                                                <Clock className="w-2.5 h-2.5" /> {act.time}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Pass Rate Table */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.48 }}
                    className="mt-4"
                >
                    <PassRateTable />
                </motion.div>

                {/* Top Missing Skills */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4"
                >
                    <TopMissingSkills />
                </motion.div>

                {/* More Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                        <ChartPlaceholder
                            title="Nguồn ứng viên"
                            icon={PieChart}
                            description="LinkedIn, Website, Referral, Indeed..."
                        />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                        <ChartPlaceholder
                            title="Thời gian tuyển dụng"
                            icon={CalendarDays}
                            description="Trung bình: 18 ngày / vị trí"
                        />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                        <ChartPlaceholder
                            title="Tỉ lệ offer acceptance"
                            icon={TrendingUp}
                            description="Accept / Decline / Pending"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
