"use client";

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
} from "lucide-react";
import { cn } from "@/shared/utils/cn";

// ─── Number Formatter ────────────────────────────────
const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);

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

const adminStats: AdminStat[] = [
    { label: "Tổng người dùng", value: "12,485", change: "+324", trend: "up", icon: Users, color: "text-sky-600", bg: "bg-sky-50" },
    { label: "Nhà tuyển dụng", value: "486", change: "+18", trend: "up", icon: Building2, color: "text-violet-600", bg: "bg-violet-50" },
    { label: "Tin tuyển dụng", value: "1,842", change: "+67", trend: "up", icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "CV đã tạo", value: "8,294", change: "+412", trend: "up", icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Phỏng vấn AI", value: "3,156", change: "+89", trend: "up", icon: ShieldCheck, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Báo cáo vi phạm", value: "23", change: "-5", trend: "down", icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
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
    user: { dot: "bg-sky-500" },
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
                        <span className="text-[9px] text-slate-400 font-medium">{fmt(v)}</span>
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(v / max) * 100}%` }}
                            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                            className="w-full rounded-t bg-gradient-to-t from-sky-500 to-sky-300"
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
    low: "bg-sky-100 text-sky-700",
};

// ─── Main Page ───────────────────────────────────────
export default function AdminDashboardPage() {
    return (
        <section className="relative z-10 pt-24 pb-12 md:pt-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-sky-600" />
                        <h1 className="text-2xl font-bold text-sky-900">Admin Dashboard</h1>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Tổng quan hệ thống — Tháng 2, 2026</p>
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
                                <h3 className="text-2xl font-black text-sky-900">{card.value}</h3>
                                <p className="text-xs text-slate-400 mt-0.5">{card.label}</p>
                            </motion.div>
                        );
                    })}
                </div>

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
                            <h3 className="text-sm font-bold text-sky-900">System Health</h3>
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
                                <BarChart3 className="w-5 h-5 text-sky-600" />
                                <h3 className="text-sm font-bold text-sky-900">Tăng trưởng người dùng</h3>
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
                                <span className="text-sm font-bold text-sky-900">{fmt(3240)}</span>
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
                            <h3 className="text-sm font-bold text-sky-900">Cần xử lý</h3>
                            <span className="ml-auto text-sm font-bold text-sky-900">
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
                                        <Icon className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors" />
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
                            <Activity className="w-5 h-5 text-sky-600" />
                            <h3 className="text-sm font-bold text-sky-900">Nhật ký hệ thống</h3>
                        </div>
                        <button className="text-xs text-slate-400 hover:text-sky-600 transition-colors cursor-pointer">
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
                                        <p className="text-xs font-semibold text-sky-900">{act.action}</p>
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
                                        "bg-sky-50 text-sky-600"
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
