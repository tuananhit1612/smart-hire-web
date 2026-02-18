"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ScrollText,
    Search,
    Filter,
    Clock,
    User,
    Building2,
    Shield,
    Server,
    AlertTriangle,
    FileText,
    LogIn,
    LogOut,
    Pencil,
    Trash2,
    Plus,
    Eye,
    Ban,
    CheckCircle2,
    ChevronDown,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";

// ─── Types ───────────────────────────────────────────
type LogCategory = "all" | "auth" | "user" | "content" | "system" | "security";
type LogSeverity = "info" | "warning" | "error" | "success";

interface AuditLogEntry {
    id: string;
    timestamp: string;
    displayTime: string;
    actor: string;
    actorRole: "admin" | "employer" | "candidate" | "system";
    action: string;
    target: string;
    category: Exclude<LogCategory, "all">;
    severity: LogSeverity;
    ip?: string;
    details?: string;
}

// ─── Mock Data ───────────────────────────────────────
const mockLogs: AuditLogEntry[] = [
    { id: "log-01", timestamp: "2026-02-18T12:18:00Z", displayTime: "12:18", actor: "Lê Hoàng Cường", actorRole: "admin", action: "Duyệt NTD", target: "StartupXYZ", category: "user", severity: "success", ip: "103.45.xx.xx", details: "Duyệt tài khoản nhà tuyển dụng StartupXYZ — lĩnh vực Fintech" },
    { id: "log-02", timestamp: "2026-02-18T12:10:00Z", displayTime: "12:10", actor: "system", actorRole: "system", action: "Auto backup", target: "Database", category: "system", severity: "success", details: "Full backup hoàn tất — 4.2 GB compressed" },
    { id: "log-03", timestamp: "2026-02-18T11:55:00Z", displayTime: "11:55", actor: "Lý Minh Long", actorRole: "admin", action: "Khoá tài khoản", target: "spammer_bot_99@test.com", category: "security", severity: "error", ip: "10.0.xx.xx", details: "Vi phạm ToS — spam hàng loạt" },
    { id: "log-04", timestamp: "2026-02-18T11:42:00Z", displayTime: "11:42", actor: "Nguyễn Văn An", actorRole: "candidate", action: "Đăng nhập", target: "Web App", category: "auth", severity: "info", ip: "118.69.xx.xx" },
    { id: "log-05", timestamp: "2026-02-18T11:30:00Z", displayTime: "11:30", actor: "system", actorRole: "system", action: "AI auto-scale", target: "AI Engine", category: "system", severity: "warning", details: "Tăng từ 2 → 4 instances do traffic spike" },
    { id: "log-06", timestamp: "2026-02-18T11:15:00Z", displayTime: "11:15", actor: "Trần Thị Bảo", actorRole: "employer", action: "Đăng tin tuyển dụng", target: "Senior React Developer", category: "content", severity: "info", ip: "42.114.xx.xx" },
    { id: "log-07", timestamp: "2026-02-18T10:58:00Z", displayTime: "10:58", actor: "system", actorRole: "system", action: "Rate limit triggered", target: "IP 203.xx.xx.xx", category: "security", severity: "error", details: "500 req/min — blocked for 15 minutes" },
    { id: "log-08", timestamp: "2026-02-18T10:45:00Z", displayTime: "10:45", actor: "Lê Hoàng Cường", actorRole: "admin", action: "Xoá tin vi phạm", target: "\"Lương $50k — Easy money\"", category: "content", severity: "warning", ip: "10.0.xx.xx", details: "Tin tuyển dụng spam — xoá vĩnh viễn" },
    { id: "log-09", timestamp: "2026-02-18T10:30:00Z", displayTime: "10:30", actor: "Hoàng Thị Ema", actorRole: "employer", action: "Cập nhật profile", target: "DesignStudio Pro", category: "user", severity: "info", ip: "113.161.xx.xx" },
    { id: "log-10", timestamp: "2026-02-18T10:12:00Z", displayTime: "10:12", actor: "Phạm Minh Duy", actorRole: "candidate", action: "Đăng xuất", target: "Web App", category: "auth", severity: "info", ip: "171.244.xx.xx" },
    { id: "log-11", timestamp: "2026-02-18T09:50:00Z", displayTime: "09:50", actor: "system", actorRole: "system", action: "SSL certificate renewed", target: "*.smarthire.ai", category: "system", severity: "success", details: "Tự động gia hạn — hết hạn 2027-02-18" },
    { id: "log-12", timestamp: "2026-02-18T09:30:00Z", displayTime: "09:30", actor: "Lý Minh Long", actorRole: "admin", action: "Thay đổi vai trò", target: "ngothioanh@edutech.vn", category: "user", severity: "warning", ip: "10.0.xx.xx", details: "Nâng cấp employer → enterprise employer" },
    { id: "log-13", timestamp: "2026-02-18T09:15:00Z", displayTime: "09:15", actor: "Bùi Thanh Hải", actorRole: "candidate", action: "Tạo CV mới", target: "CV — Full-Stack Developer", category: "content", severity: "info", ip: "14.161.xx.xx" },
    { id: "log-14", timestamp: "2026-02-18T08:45:00Z", displayTime: "08:45", actor: "system", actorRole: "system", action: "Cron job completed", target: "Email notifications", category: "system", severity: "success", details: "Gửi 342 email thông báo — 0 failed" },
    { id: "log-15", timestamp: "2026-02-18T08:20:00Z", displayTime: "08:20", actor: "Cao Thị Ivy", actorRole: "employer", action: "Đăng nhập", target: "Web App", category: "auth", severity: "info", ip: "27.72.xx.xx" },
    { id: "log-16", timestamp: "2026-02-18T07:55:00Z", displayTime: "07:55", actor: "system", actorRole: "system", action: "Failed login attempt", target: "admin@smarthire.ai", category: "security", severity: "error", details: "5 lần đăng nhập sai — tạm khoá 30 phút", ip: "185.220.xx.xx" },
    { id: "log-17", timestamp: "2026-02-18T07:30:00Z", displayTime: "07:30", actor: "Lê Hoàng Cường", actorRole: "admin", action: "Cập nhật cấu hình", target: "AI Model Settings", category: "system", severity: "info", ip: "10.0.xx.xx", details: "Chuyển Gemini 2.0 Flash → Gemini 2.5 Pro" },
    { id: "log-18", timestamp: "2026-02-18T07:00:00Z", displayTime: "07:00", actor: "system", actorRole: "system", action: "Scheduled maintenance", target: "Database", category: "system", severity: "warning", details: "Bảo trì 15 phút — optimize indexes" },
];

// ─── Config ──────────────────────────────────────────
const CATEGORY_CONFIG: Record<string, { label: string; icon: typeof User; color: string; bg: string }> = {
    auth: { label: "Xác thực", icon: LogIn, color: "text-sky-700", bg: "bg-sky-100" },
    user: { label: "Người dùng", icon: User, color: "text-violet-700", bg: "bg-violet-100" },
    content: { label: "Nội dung", icon: FileText, color: "text-emerald-700", bg: "bg-emerald-100" },
    system: { label: "Hệ thống", icon: Server, color: "text-slate-600", bg: "bg-slate-100" },
    security: { label: "Bảo mật", icon: Shield, color: "text-rose-700", bg: "bg-rose-100" },
};

const SEVERITY_CONFIG: Record<string, { color: string; bg: string; dot: string }> = {
    info: { color: "text-sky-600", bg: "bg-sky-50", dot: "bg-sky-400" },
    success: { color: "text-emerald-600", bg: "bg-emerald-50", dot: "bg-emerald-400" },
    warning: { color: "text-amber-600", bg: "bg-amber-50", dot: "bg-amber-400" },
    error: { color: "text-rose-600", bg: "bg-rose-50", dot: "bg-rose-400" },
};

const ACTOR_ROLE_ICON: Record<string, typeof User> = {
    admin: Shield,
    employer: Building2,
    candidate: User,
    system: Server,
};

const CATEGORY_TABS: { key: LogCategory; label: string }[] = [
    { key: "all", label: "Tất cả" },
    { key: "auth", label: "Xác thực" },
    { key: "user", label: "Người dùng" },
    { key: "content", label: "Nội dung" },
    { key: "system", label: "Hệ thống" },
    { key: "security", label: "Bảo mật" },
];

const SEVERITY_OPTIONS: { key: LogSeverity | "all"; label: string }[] = [
    { key: "all", label: "Tất cả mức độ" },
    { key: "info", label: "Info" },
    { key: "success", label: "Thành công" },
    { key: "warning", label: "Cảnh báo" },
    { key: "error", label: "Lỗi" },
];

// ─── Action Icon ─────────────────────────────────────
function getActionIcon(action: string) {
    const lower = action.toLowerCase();
    if (lower.includes("đăng nhập") || lower.includes("login")) return LogIn;
    if (lower.includes("đăng xuất") || lower.includes("logout")) return LogOut;
    if (lower.includes("xoá") || lower.includes("delete")) return Trash2;
    if (lower.includes("cập nhật") || lower.includes("update") || lower.includes("thay đổi")) return Pencil;
    if (lower.includes("tạo") || lower.includes("đăng tin") || lower.includes("create")) return Plus;
    if (lower.includes("duyệt") || lower.includes("approve")) return CheckCircle2;
    if (lower.includes("khoá") || lower.includes("block") || lower.includes("ban")) return Ban;
    if (lower.includes("xem") || lower.includes("view")) return Eye;
    return Clock;
}

// ─── Main Page ───────────────────────────────────────
export default function AuditLogPage() {
    const [activeCategory, setActiveCategory] = useState<LogCategory>("all");
    const [severity, setSeverity] = useState<LogSeverity | "all">("all");
    const [search, setSearch] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const filtered = useMemo(() => {
        let result = mockLogs;
        if (activeCategory !== "all") {
            result = result.filter((l) => l.category === activeCategory);
        }
        if (severity !== "all") {
            result = result.filter((l) => l.severity === severity);
        }
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (l) =>
                    l.actor.toLowerCase().includes(q) ||
                    l.action.toLowerCase().includes(q) ||
                    l.target.toLowerCase().includes(q) ||
                    (l.details?.toLowerCase().includes(q) ?? false)
            );
        }
        return result;
    }, [activeCategory, severity, search]);

    const categoryCounts = useMemo(() => ({
        all: mockLogs.length,
        auth: mockLogs.filter((l) => l.category === "auth").length,
        user: mockLogs.filter((l) => l.category === "user").length,
        content: mockLogs.filter((l) => l.category === "content").length,
        system: mockLogs.filter((l) => l.category === "system").length,
        security: mockLogs.filter((l) => l.category === "security").length,
    }), []);

    return (
        <section className="relative z-10 pt-24 pb-12 md:pt-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <div className="flex items-center gap-2">
                        <ScrollText className="w-6 h-6 text-sky-600" />
                        <h1 className="text-2xl font-bold text-sky-900">Nhật ký hoạt động</h1>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                        {mockLogs.length} sự kiện hôm nay — Theo dõi mọi thao tác trên hệ thống
                    </p>
                </motion.div>

                {/* Filters Row */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6"
                >
                    {/* Category Tabs */}
                    <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 overflow-x-auto">
                        {CATEGORY_TABS.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveCategory(tab.key)}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap",
                                    activeCategory === tab.key
                                        ? "bg-white text-sky-900 shadow-sm"
                                        : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                {tab.label}
                                <span className={cn(
                                    "ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full",
                                    activeCategory === tab.key ? "bg-sky-100 text-sky-700" : "bg-slate-200 text-slate-400"
                                )}>
                                    {categoryCounts[tab.key]}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Search + Severity */}
                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Tìm theo actor, action, target..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                            />
                        </div>
                        <div className="relative">
                            <select
                                value={severity}
                                onChange={(e) => setSeverity(e.target.value as LogSeverity | "all")}
                                className="appearance-none pl-3 pr-8 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 cursor-pointer"
                            >
                                {SEVERITY_OPTIONS.map((opt) => (
                                    <option key={opt.key} value={opt.key}>{opt.label}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </motion.div>

                {/* Log List */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                >
                    <div className="divide-y divide-slate-50">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((log, i) => {
                                const cat = CATEGORY_CONFIG[log.category];
                                const sev = SEVERITY_CONFIG[log.severity];
                                const ActorIcon = ACTOR_ROLE_ICON[log.actorRole] ?? User;
                                const ActionIcon = getActionIcon(log.action);
                                const isExpanded = expandedId === log.id;

                                return (
                                    <motion.div
                                        key={log.id}
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ delay: i * 0.02 }}
                                        onClick={() => setExpandedId(isExpanded ? null : log.id)}
                                        className="px-5 py-3 hover:bg-sky-50/30 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* Severity Dot */}
                                            <div className={cn("w-2 h-2 rounded-full shrink-0", sev?.dot)} />

                                            {/* Time */}
                                            <span className="text-xs font-mono text-slate-400 w-12 shrink-0">{log.displayTime}</span>

                                            {/* Action Icon */}
                                            <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0", cat?.bg)}>
                                                <ActionIcon className={cn("w-3.5 h-3.5", cat?.color)} />
                                            </div>

                                            {/* Main Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-sm font-semibold text-sky-900">{log.action}</span>
                                                    <span className="text-xs text-slate-400">→</span>
                                                    <span className="text-sm text-slate-600 truncate">{log.target}</span>
                                                </div>
                                            </div>

                                            {/* Actor */}
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <ActorIcon className="w-3 h-3 text-slate-400" />
                                                <span className="text-xs text-slate-500 hidden sm:inline">{log.actor}</span>
                                            </div>

                                            {/* Category Badge */}
                                            <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 hidden md:inline-flex", cat?.bg, cat?.color)}>
                                                {cat?.label}
                                            </span>

                                            {/* Severity Badge */}
                                            <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0", sev?.bg, sev?.color)}>
                                                {log.severity}
                                            </span>

                                            {/* Expand Indicator */}
                                            {log.details && (
                                                <ChevronDown className={cn(
                                                    "w-3.5 h-3.5 text-slate-300 transition-transform shrink-0",
                                                    isExpanded && "rotate-180"
                                                )} />
                                            )}
                                        </div>

                                        {/* Expanded Details */}
                                        <AnimatePresence>
                                            {isExpanded && (log.details || log.ip) && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mt-2 ml-[6.5rem] overflow-hidden"
                                                >
                                                    <div className="bg-slate-50 rounded-lg p-3 text-xs space-y-1">
                                                        {log.details && (
                                                            <p className="text-slate-600">
                                                                <span className="font-semibold text-slate-500">Chi tiết:</span> {log.details}
                                                            </p>
                                                        )}
                                                        {log.ip && (
                                                            <p className="text-slate-400">
                                                                <span className="font-semibold">IP:</span> {log.ip}
                                                            </p>
                                                        )}
                                                        <p className="text-slate-400">
                                                            <span className="font-semibold">Thời gian:</span> {log.timestamp}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {filtered.length === 0 && (
                            <div className="px-5 py-12 text-center">
                                <Filter className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                                <p className="text-sm text-slate-400 font-medium">Không tìm thấy log nào</p>
                                <p className="text-xs text-slate-300 mt-1">Thử thay đổi bộ lọc hoặc từ khoá tìm kiếm</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">
                            Hiển thị {filtered.length} / {mockLogs.length} logs
                        </span>
                        <div className="flex items-center gap-2">
                            {(["info", "success", "warning", "error"] as const).map((s) => {
                                const count = mockLogs.filter((l) => l.severity === s).length;
                                const cfg = SEVERITY_CONFIG[s];
                                return (
                                    <span key={s} className={cn("text-[10px] font-semibold flex items-center gap-0.5", cfg?.color)}>
                                        <span className={cn("w-1.5 h-1.5 rounded-full", cfg?.dot)} />
                                        {count}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
