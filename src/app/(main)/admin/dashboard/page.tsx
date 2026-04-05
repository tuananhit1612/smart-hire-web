"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Users,
    Building2,
    Briefcase,
    FileText,
    ShieldCheck,
    TrendingUp,
    TrendingDown,
    Activity,
    Clock,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    UserPlus,
    BarChart3,
    Globe,
    Server,
    Loader2,
    Download,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { downloadBlob } from "@/shared/utils/download-file";
import { useToastHelpers } from "@/shared/components/ui/toast";
import { fmtNumber } from "@/shared/utils/format";
import { adminDashboardApi } from "@/features/admin/api/admin-dashboard-api";
import type { AdminDashboardResponse } from "@/features/admin/types/admin-dashboard-types";

// ─── Stat Cards ──────────────────────────────────────
interface AdminStat {
    label: string;
    value: string;
    change: string;
    trend: "up" | "down";
    icon: typeof Users;
    color: string;
    bg: string;
}

/** Build stat cards from live API data */
function buildStats(d: AdminDashboardResponse): AdminStat[] {
    return [
        { label: "Tổng người dùng", value: fmtNumber(d.totalUsers), change: `+${fmtNumber(d.activeUsers)} active`, trend: "up", icon: Users, color: "text-[#22c55e]", bg: "bg-[#22c55e]/10" },
        { label: "Nhà tuyển dụng", value: fmtNumber(d.totalCompanies), change: `${fmtNumber(d.totalHrUsers)} HR`, trend: "up", icon: Building2, color: "text-violet-600", bg: "bg-violet-50" },
        { label: "Tin tuyển dụng", value: fmtNumber(d.totalJobs), change: `${fmtNumber(d.openJobs)} đang mở`, trend: "up", icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Ứng viên", value: fmtNumber(d.totalCandidates), change: `${fmtNumber(d.inactiveUsers)} inactive`, trend: "up", icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Đơn ứng tuyển", value: fmtNumber(d.totalApplications), change: `${(d.hireRate * 100).toFixed(1)}% hired`, trend: "up", icon: ShieldCheck, color: "text-rose-600", bg: "bg-rose-50" },
        { label: "Tỷ lệ từ chối", value: `${(d.rejectRate * 100).toFixed(1)}%`, change: `${fmtNumber(d.closedJobs)} jobs closed`, trend: d.rejectRate > 0.5 ? "down" : "up", icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
    ];
}

/** Fallback hardcoded cards (shown while loading / on error) */
const fallbackStats: AdminStat[] = [
    { label: "Tổng người dùng", value: "—", change: "—", trend: "up", icon: Users, color: "text-[#22c55e]", bg: "bg-[#22c55e]/10" },
    { label: "Nhà tuyển dụng", value: "—", change: "—", trend: "up", icon: Building2, color: "text-violet-600", bg: "bg-violet-50" },
    { label: "Tin tuyển dụng", value: "—", change: "—", trend: "up", icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Ứng viên", value: "—", change: "—", trend: "up", icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Đơn ứng tuyển", value: "—", change: "—", trend: "up", icon: ShieldCheck, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Tỷ lệ từ chối", value: "—", change: "—", trend: "up", icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
];

// ─── System Health ───────────────────────────────────
interface SystemMetric {
    name: string;
    value: string;
    status: "healthy" | "warning" | "critical";
    icon: typeof Server;
}

const systemMetrics: SystemMetric[] = [
    { name: "API Response", value: "124ms", status: "healthy", icon: Globe },
    { name: "Database", value: "99.98%", status: "healthy", icon: Server },
    { name: "AI Engine", value: "348ms", status: "warning", icon: ShieldCheck },
    { name: "Storage", value: "72% used", status: "healthy", icon: BarChart3 },
];

const STATUS_COLOR: Record<string, { bg: string; dot: string; text: string }> = {
    healthy: { bg: "bg-emerald-50", dot: "bg-emerald-500", text: "text-emerald-700" },
    warning: { bg: "bg-amber-50", dot: "bg-amber-500", text: "text-amber-700" },
    critical: { bg: "bg-rose-50", dot: "bg-rose-500", text: "text-rose-700" },
};

// ─── Recent Activity ─────────────────────────────────
interface AdminActivity {
    id: string;
    action: string;
    detail: string;
    time: string;
    type: "user" | "employer" | "system" | "security" | "content";
}

const adminActivities: AdminActivity[] = [
    { id: "aa1", action: "Người dùng mới đăng ký", detail: "nguyenvana@gmail.com — via Google OAuth", time: "2 phút trước", type: "user" },
    { id: "aa2", action: "NTD mới được duyệt", detail: "TechCorp Vietnam — Lĩnh vực IT", time: "15 phút trước", type: "employer" },
    { id: "aa3", action: "Tin tuyển dụng bị report", detail: "\"Senior Dev — Lương $10k\" — spam suspected", time: "28 phút trước", type: "security" },
    { id: "aa4", action: "AI Engine auto-scale", detail: "Tăng từ 2 → 4 instances (traffic spike)", time: "45 phút trước", type: "system" },
    { id: "aa5", action: "Batch CV analysis hoàn tất", detail: "156 CVs processed — avg 2.3s/CV", time: "1 giờ trước", type: "content" },
    { id: "aa6", action: "Người dùng bị khoá", detail: "spammer_bot_99@test.com — vi phạm ToS", time: "2 giờ trước", type: "security" },
    { id: "aa7", action: "Database backup thành công", detail: "Full backup — 4.2 GB compressed", time: "3 giờ trước", type: "system" },
    { id: "aa8", action: "NTD upgrade plan", detail: "DesignStudio Pro → Enterprise plan", time: "4 giờ trước", type: "employer" },
    { id: "aa9", action: "Người dùng mới đăng ký", detail: "tranthib@outlook.com — via Email", time: "5 giờ trước", type: "user" },
    { id: "aa10", action: "API rate limit triggered", detail: "IP 103.xx.xx.xx — 500 req/min exceeded", time: "6 giờ trước", type: "security" },
];

const ACTIVITY_TYPE_COLORS: Record<string, { dot: string }> = {
    user: { dot: "bg-[#22c55e]" },
    employer: { dot: "bg-violet-500" },
    system: { dot: "bg-slate-400" },
    security: { dot: "bg-rose-500" },
    content: { dot: "bg-emerald-500" },
};

// ─── User Growth (Mini Bar) ──────────────────────────
function GrowthBar({ values, labels }: { readonly values: number[]; readonly labels: string[] }) {
    const max = Math.max(...values);
    return (
        <div>
            <div className="flex items-end gap-2 h-24">
                {values.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[9px] text-slate-400 font-medium">{fmtNumber(v)}</span>
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(v / max) * 100}%` }}
                            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                            className="w-full rounded-t bg-gradient-to-t from-[#22c55e] to-[#10b981]"
                        />
                    </div>
                ))}
            </div>
            <div className="flex gap-2 mt-1">
                {labels.map((l) => (
                    <span key={l} className="flex-1 text-center text-[9px] text-slate-300">{l}</span>
                ))}
            </div>
        </div>
    );
}

// ─── Pending Actions ─────────────────────────────────
interface PendingAction {
    label: string;
    count: number;
    urgency: "high" | "medium" | "low";
    icon: typeof Users;
}

const pendingActions: PendingAction[] = [
    { label: "NTD chờ duyệt", count: 12, urgency: "high", icon: Building2 },
    { label: "Tin bị report", count: 8, urgency: "high", icon: AlertTriangle },
    { label: "Yêu cầu xoá tài khoản", count: 3, urgency: "medium", icon: XCircle },
    { label: "Ticket hỗ trợ", count: 27, urgency: "medium", icon: FileText },
    { label: "NTD chờ upgrade", count: 5, urgency: "low", icon: UserPlus },
];

const URGENCY_COLOR: Record<string, string> = {
    high: "bg-rose-100 text-rose-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-[#22c55e]/15 text-[#22c55e]",
};

// ─── Stage Funnel ────────────────────────────────────
function StageFunnel({ data }: { readonly data: AdminDashboardResponse }) {
    if (!data.stageFunnel || data.stageFunnel.length === 0) return null;
    const maxCount = Math.max(...data.stageFunnel.map((s) => s.count));

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-8"
        >
            <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-[#22c55e]" />
                <h3 className="text-sm font-bold text-[#1C252E]">Phễu tuyển dụng</h3>
                <span className="ml-auto text-xs text-slate-400">
                    Hire rate: {(data.hireRate * 100).toFixed(1)}%
                </span>
            </div>
            <div className="space-y-2.5">
                {data.stageFunnel.map((item, i) => (
                    <motion.div
                        key={item.stage}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.55 + i * 0.06 }}
                        className="flex items-center gap-3"
                    >
                        <span className="text-xs font-medium text-slate-600 w-24 truncate">{item.stage}</span>
                        <div className="flex-1 h-6 bg-slate-50 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${maxCount > 0 ? (item.count / maxCount) * 100 : 0}%` }}
                                transition={{ duration: 0.6, delay: 0.55 + i * 0.08 }}
                                className="h-full rounded-full bg-gradient-to-r from-[#22c55e] to-[#10b981]"
                            />
                        </div>
                        <span className="text-xs font-bold text-[#1C252E] w-10 text-right">{fmtNumber(item.count)}</span>
                        <span className="text-[10px] text-slate-400 w-12 text-right">{item.percentage.toFixed(1)}%</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// ─── Main Page ───────────────────────────────────────
export default function AdminDashboardPage() {
    const [data, setData] = useState<AdminDashboardResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [exportingApps, setExportingApps] = useState(false);
    const [exportingJobs, setExportingJobs] = useState(false);
    const toast = useToastHelpers();

    const handleExportApps = async () => {
        try {
            setExportingApps(true);
            const { data: blob } = await adminDashboardApi.exportApplicationsCsv();
            const filename = `admin_applications_${new Date().toISOString().slice(0, 10)}.csv`;
            downloadBlob(blob, filename);
            toast.success("Đã xuất báo cáo CSV Ứng viên toàn hệ thống thành công!", "Tệp tải xuống nằm trong thư mục Downloads.");
        } catch (err) {
            toast.error("Xuất báo cáo thất bại", "Vui lòng kiểm tra lại kết nối hoặc phân quyền.");
        } finally {
            setExportingApps(false);
        }
    };

    const handleExportJobs = async () => {
        try {
            setExportingJobs(true);
            const { data: blob } = await adminDashboardApi.exportJobsCsv();
            const filename = `admin_jobs_${new Date().toISOString().slice(0, 10)}.csv`;
            downloadBlob(blob, filename);
            toast.success("Đã xuất báo cáo CSV Việc làm toàn hệ thống thành công!", "Tệp tải xuống nằm trong thư mục Downloads.");
        } catch (err) {
            toast.error("Xuất báo cáo thất bại", "Vui lòng kiểm tra lại kết nối hoặc phân quyền.");
        } finally {
            setExportingJobs(false);
        }
    };

    useEffect(() => {
        let cancelled = false;

        async function fetchDashboard() {
            try {
                setLoading(true);
                setError(null);
                const res = await adminDashboardApi.getOverview();
                if (!cancelled && res.data?.success) {
                    setData(res.data.data);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error("[AdminDashboard] fetch error:", err);
                    setError("Không thể tải dữ liệu dashboard.");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchDashboard();
        return () => { cancelled = true; };
    }, []);

    const adminStats = data ? buildStats(data) : fallbackStats;

    return (
        <section className="relative z-10 pt-24 pb-12 md:pt-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                    <div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-6 h-6 text-[#22c55e]" />
                            <h1 className="text-2xl font-bold text-[#1C252E]">Admin Dashboard</h1>
                            {loading && <Loader2 className="w-4 h-4 text-slate-400 animate-spin ml-2" />}
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                            Tổng quan hệ thống — {new Date().toLocaleDateString("vi-VN", { month: "long", year: "numeric" })}
                        </p>
                        {error && (
                            <div className="mt-2 text-xs text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                {error}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex gap-2">
                        <button
                            onClick={handleExportApps}
                            disabled={exportingApps}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Xuất CSV toàn bộ Ứng viên"
                        >
                            {exportingApps ? <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> : <Download className="w-4 h-4 text-violet-600" />}
                            <span className="hidden sm:inline">Xuất CSV Ứng viên</span>
                        </button>
                        <button
                            onClick={handleExportJobs}
                            disabled={exportingJobs}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Xuất CSV toàn bộ Việc làm"
                        >
                            {exportingJobs ? <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> : <Download className="w-4 h-4 text-emerald-600" />}
                            <span className="hidden sm:inline">Xuất CSV Việc làm</span>
                        </button>
                    </div>
                </motion.div>

                {/* Stat Cards — 6 cards in 2 rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {adminStats.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={card.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow"
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
                                <h3 className="text-2xl font-black text-[#1C252E]">{card.value}</h3>
                                <p className="text-xs text-slate-400 mt-0.5">{card.label}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Stage Funnel — from real API data */}
                {data && <StageFunnel data={data} />}

                {/* Middle Row: System Health + User Growth + Pending Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                    {/* System Health */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Server className="w-5 h-5 text-emerald-600" />
                            <h3 className="text-sm font-bold text-[#1C252E]">System Health</h3>
                            <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                <CheckCircle2 className="w-3 h-3" /> Online
                            </span>
                        </div>
                        <div className="space-y-3">
                            {systemMetrics.map((m, i) => {
                                const Icon = m.icon;
                                const sc = STATUS_COLOR[m.status];
                                return (
                                    <motion.div
                                        key={m.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.35 + i * 0.06 }}
                                        className={cn("flex items-center gap-3 p-2.5 rounded-xl", sc?.bg)}
                                    >
                                        <Icon className={cn("w-4 h-4", sc?.text)} />
                                        <span className="text-xs font-semibold text-slate-700 flex-1">{m.name}</span>
                                        <span className={cn("text-xs font-bold", sc?.text)}>{m.value}</span>
                                        <div className={cn("w-2 h-2 rounded-full animate-pulse", sc?.dot)} />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* User Growth */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-[#22c55e]" />
                                <h3 className="text-sm font-bold text-[#1C252E]">Tăng trưởng người dùng</h3>
                            </div>
                            <span className="text-xs text-slate-400">6 tháng</span>
                        </div>
                        <GrowthBar
                            values={[1820, 2150, 2480, 1960, 2720, 3240]}
                            labels={["T9", "T10", "T11", "T12", "T1", "T2"]}
                        />
                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">Tổng mới tháng này</span>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-[#1C252E]">{fmtNumber(3240)}</span>
                                <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                                    <TrendingUp className="w-2.5 h-2.5" /> +19.1%
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Pending Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            <h3 className="text-sm font-bold text-[#1C252E]">Cần xử lý</h3>
                            <span className="ml-auto text-sm font-bold text-[#1C252E]">
                                {pendingActions.reduce((s, a) => s + a.count, 0)}
                            </span>
                        </div>
                        <div className="space-y-2.5">
                            {pendingActions.map((action, i) => {
                                const Icon = action.icon;
                                return (
                                    <motion.div
                                        key={action.label}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.45 + i * 0.06 }}
                                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                                    >
                                        <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#22c55e] transition-colors" />
                                        <span className="text-xs font-medium text-slate-700 flex-1">{action.label}</span>
                                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", URGENCY_COLOR[action.urgency])}>
                                            {action.count}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Activity Log */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-[#22c55e]" />
                            <h3 className="text-sm font-bold text-[#1C252E]">Nhật ký hệ thống</h3>
                        </div>
                        <button className="text-xs text-slate-400 hover:text-[#22c55e] transition-colors cursor-pointer">
                            Xem tất cả →
                        </button>
                    </div>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                        {adminActivities.map((act, i) => {
                            const colors = ACTIVITY_TYPE_COLORS[act.type];
                            return (
                                <motion.div
                                    key={act.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + i * 0.04 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="mt-1.5 relative">
                                        <div className={cn("w-2.5 h-2.5 rounded-full", colors?.dot)} />
                                        {i < adminActivities.length - 1 && (
                                            <div className="absolute top-3 left-1 w-px h-6 bg-slate-100" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-[#1C252E]">{act.action}</p>
                                        <p className="text-xs text-slate-500 truncate">{act.detail}</p>
                                        <p className="text-[10px] text-slate-300 mt-0.5 flex items-center gap-1">
                                            <Clock className="w-2.5 h-2.5" /> {act.time}
                                        </p>
                                    </div>
                                    <span className={cn(
                                        "text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 mt-0.5",
                                        act.type === "security" ? "bg-rose-50 text-rose-600" :
                                        act.type === "system" ? "bg-slate-100 text-slate-500" :
                                        act.type === "employer" ? "bg-violet-50 text-violet-600" :
                                        act.type === "content" ? "bg-emerald-50 text-emerald-600" :
                                        "bg-[#22c55e]/10 text-[#22c55e]"
                                    )}>
                                        {act.type}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
