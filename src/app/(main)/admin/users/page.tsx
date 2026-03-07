"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Search,
    Filter,
    ChevronRight,
    Shield,
    Building2,
    User,
    MoreHorizontal,
    Mail,
    CalendarDays,
    CheckCircle2,
    XCircle,
    Clock,
    Eye,
    Ban,
    Pencil,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { fmtNumber } from "@/shared/utils/format";

// ─── Types ───────────────────────────────────────────
type UserRole = "all" | "candidate" | "employer" | "admin";
type UserStatus = "active" | "inactive" | "banned" | "pending";

interface MockUser {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: Exclude<UserRole, "all">;
    status: UserStatus;
    joinedDate: string;
    lastActive: string;
    company?: string;
}

// ─── Mock Data ───────────────────────────────────────
const mockUsers: MockUser[] = [
    { id: "u1", name: "Nguyễn Văn An", email: "nguyenvanan@gmail.com", avatar: "NVA", role: "candidate", status: "active", joinedDate: "2025-08-12", lastActive: "2 phút trước" },
    { id: "u2", name: "Trần Thị Bảo", email: "tranthibao@techcorp.vn", avatar: "TTB", role: "employer", status: "active", joinedDate: "2025-06-20", lastActive: "15 phút trước", company: "TechCorp Vietnam" },
    { id: "u3", name: "Lê Hoàng Cường", email: "lehoangcuong@admin.smarthire.ai", avatar: "LHC", role: "admin", status: "active", joinedDate: "2025-01-01", lastActive: "Đang online" },
    { id: "u4", name: "Phạm Minh Duy", email: "phamminhduy@outlook.com", avatar: "PMD", role: "candidate", status: "inactive", joinedDate: "2025-11-05", lastActive: "30 ngày trước" },
    { id: "u5", name: "Hoàng Thị Ema", email: "hoangthiema@designstudio.vn", avatar: "HTE", role: "employer", status: "active", joinedDate: "2025-09-15", lastActive: "1 giờ trước", company: "DesignStudio Pro" },
    { id: "u6", name: "Vũ Đức Phong", email: "vuducphong@gmail.com", avatar: "VDP", role: "candidate", status: "banned", joinedDate: "2025-10-28", lastActive: "—" },
    { id: "u7", name: "Đặng Ngọc Gia", email: "dangngocgia@startupxyz.vn", avatar: "DNG", role: "employer", status: "pending", joinedDate: "2026-02-14", lastActive: "3 giờ trước", company: "StartupXYZ" },
    { id: "u8", name: "Bùi Thanh Hải", email: "buithanhai@yahoo.com", avatar: "BTH", role: "candidate", status: "active", joinedDate: "2025-07-03", lastActive: "5 phút trước" },
    { id: "u9", name: "Cao Thị Ivy", email: "caothiivy@fintech.vn", avatar: "CTI", role: "employer", status: "active", joinedDate: "2025-12-01", lastActive: "45 phút trước", company: "FinTech Solutions" },
    { id: "u10", name: "Đinh Quốc Khánh", email: "dinhquockhanh@gmail.com", avatar: "DQK", role: "candidate", status: "active", joinedDate: "2026-01-10", lastActive: "20 phút trước" },
    { id: "u11", name: "Lý Minh Long", email: "lyminhlong@admin.smarthire.ai", avatar: "LML", role: "admin", status: "active", joinedDate: "2025-03-15", lastActive: "10 phút trước" },
    { id: "u12", name: "Mai Phương Nam", email: "maiphuongnam@gmail.com", avatar: "MPN", role: "candidate", status: "inactive", joinedDate: "2025-05-20", lastActive: "60 ngày trước" },
    { id: "u13", name: "Ngô Thị Oanh", email: "ngothioanh@edutech.vn", avatar: "NTO", role: "employer", status: "active", joinedDate: "2025-10-10", lastActive: "2 giờ trước", company: "EduTech Vietnam" },
    { id: "u14", name: "Phan Văn Quân", email: "phanvanquan@gmail.com", avatar: "PVQ", role: "candidate", status: "active", joinedDate: "2026-02-01", lastActive: "8 phút trước" },
    { id: "u15", name: "Trịnh Hồng Sơn", email: "trinhhongson@gmail.com", avatar: "THS", role: "candidate", status: "pending", joinedDate: "2026-02-16", lastActive: "1 giờ trước" },
];

// ─── Role Config ─────────────────────────────────────
const ROLE_CONFIG: Record<string, { label: string; icon: typeof Users; color: string; bg: string }> = {
    candidate: { label: "Ứng viên", icon: User, color: "text-[#22c55e]", bg: "bg-[#22c55e]/15" },
    employer: { label: "Nhà tuyển dụng", icon: Building2, color: "text-violet-700", bg: "bg-violet-100" },
    admin: { label: "Admin", icon: Shield, color: "text-rose-700", bg: "bg-rose-100" },
};

const STATUS_CONFIG: Record<string, { label: string; icon: typeof CheckCircle2; color: string; bg: string }> = {
    active: { label: "Hoạt động", icon: CheckCircle2, color: "text-emerald-700", bg: "bg-emerald-100" },
    inactive: { label: "Không HĐ", icon: Clock, color: "text-slate-500", bg: "bg-slate-100" },
    banned: { label: "Bị khoá", icon: Ban, color: "text-rose-700", bg: "bg-rose-100" },
    pending: { label: "Chờ duyệt", icon: Clock, color: "text-amber-700", bg: "bg-amber-100" },
};

const ROLE_TABS: { key: UserRole; label: string }[] = [
    { key: "all", label: "Tất cả" },
    { key: "candidate", label: "Ứng viên" },
    { key: "employer", label: "Nhà tuyển dụng" },
    { key: "admin", label: "Admin" },
];

// ─── Main Page ───────────────────────────────────────
export default function UserManagementPage() {
    const [activeRole, setActiveRole] = useState<UserRole>("all");
    const [search, setSearch] = useState("");
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const filtered = useMemo(() => {
        let result = mockUsers;
        if (activeRole !== "all") {
            result = result.filter((u) => u.role === activeRole);
        }
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (u) =>
                    u.name.toLowerCase().includes(q) ||
                    u.email.toLowerCase().includes(q) ||
                    (u.company?.toLowerCase().includes(q) ?? false)
            );
        }
        return result;
    }, [activeRole, search]);

    const roleCounts = useMemo(() => ({
        all: mockUsers.length,
        candidate: mockUsers.filter((u) => u.role === "candidate").length,
        employer: mockUsers.filter((u) => u.role === "employer").length,
        admin: mockUsers.filter((u) => u.role === "admin").length,
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
                        <Users className="w-6 h-6 text-[#22c55e]" />
                        <h1 className="text-2xl font-bold text-[#1C252E]">Quản lý người dùng</h1>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                        {fmtNumber(mockUsers.length)} người dùng — Quản lý tài khoản, vai trò và trạng thái
                    </p>
                </motion.div>

                {/* Role Tabs + Search */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
                >
                    {/* Role Filter Tabs */}
                    <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                        {ROLE_TABS.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveRole(tab.key)}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                                    activeRole === tab.key
                                        ? "bg-white text-[#1C252E] shadow-sm"
                                        : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                {tab.label}
                                <span className={cn(
                                    "ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full",
                                    activeRole === tab.key ? "bg-[#22c55e]/15 text-[#22c55e]" : "bg-slate-200 text-slate-400"
                                )}>
                                    {roleCounts[tab.key]}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Tìm theo tên, email, công ty..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/30 focus:border-[#22c55e]/30 transition-all"
                        />
                    </div>
                </motion.div>

                {/* Table */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Người dùng</th>
                                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-3">Vai trò</th>
                                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-3">Trạng thái</th>
                                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-3">Ngày tham gia</th>
                                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-3">Hoạt động cuối</th>
                                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-3 w-10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence mode="popLayout">
                                    {filtered.map((user, i) => {
                                        const role = ROLE_CONFIG[user.role];
                                        const status = STATUS_CONFIG[user.status];
                                        const RoleIcon = role?.icon ?? User;
                                        const StatusIcon = status?.icon ?? Clock;

                                        return (
                                            <motion.tr
                                                key={user.id}
                                                layout
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 10 }}
                                                transition={{ delay: i * 0.03 }}
                                                className="border-b border-slate-50 hover:bg-[#22c55e]/10 transition-colors group"
                                            >
                                                {/* User Info */}
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn(
                                                            "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                                                            user.role === "admin" ? "bg-rose-100 text-rose-700" :
                                                            user.role === "employer" ? "bg-violet-100 text-violet-700" :
                                                            "bg-[#22c55e]/15 text-[#22c55e]"
                                                        )}>
                                                            {user.avatar}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-semibold text-[#1C252E] group-hover:text-[#22c55e] transition-colors truncate">
                                                                {user.name}
                                                            </p>
                                                            <p className="text-[11px] text-slate-400 flex items-center gap-1 truncate">
                                                                <Mail className="w-3 h-3 shrink-0" /> {user.email}
                                                            </p>
                                                            {user.company && (
                                                                <p className="text-[10px] text-violet-500 flex items-center gap-1 mt-0.5">
                                                                    <Building2 className="w-3 h-3 shrink-0" /> {user.company}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Role */}
                                                <td className="px-3 py-3">
                                                    <span className={cn("inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full", role?.bg, role?.color)}>
                                                        <RoleIcon className="w-3 h-3" />
                                                        {role?.label}
                                                    </span>
                                                </td>

                                                {/* Status */}
                                                <td className="px-3 py-3">
                                                    <span className={cn("inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full", status?.bg, status?.color)}>
                                                        <StatusIcon className="w-3 h-3" />
                                                        {status?.label}
                                                    </span>
                                                </td>

                                                {/* Joined Date */}
                                                <td className="px-3 py-3">
                                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                                        <CalendarDays className="w-3 h-3" />
                                                        {new Date(user.joinedDate).toLocaleDateString("vi-VN")}
                                                    </span>
                                                </td>

                                                {/* Last Active */}
                                                <td className="px-3 py-3">
                                                    <span className={cn(
                                                        "text-xs",
                                                        user.lastActive === "Đang online" ? "text-emerald-600 font-semibold" :
                                                        user.lastActive === "—" ? "text-slate-300" : "text-slate-500"
                                                    )}>
                                                        {user.lastActive}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-3 py-3 relative">
                                                    <button
                                                        onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                                                        className="p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                                                    >
                                                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                                                    </button>
                                                    <AnimatePresence>
                                                        {openMenu === user.id && (
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.95 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0.95 }}
                                                                className="absolute right-3 top-10 z-50 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 w-40"
                                                            >
                                                                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-[#22c55e]/10 hover:text-[#22c55e] transition-colors cursor-pointer">
                                                                    <Eye className="w-3.5 h-3.5" /> Xem chi tiết
                                                                </button>
                                                                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-[#22c55e]/10 hover:text-[#22c55e] transition-colors cursor-pointer">
                                                                    <Pencil className="w-3.5 h-3.5" /> Chỉnh sửa
                                                                </button>
                                                                {user.status !== "banned" ? (
                                                                    <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer">
                                                                        <Ban className="w-3.5 h-3.5" /> Khoá tài khoản
                                                                    </button>
                                                                ) : (
                                                                    <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer">
                                                                        <CheckCircle2 className="w-3.5 h-3.5" /> Mở khoá
                                                                    </button>
                                                                )}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </AnimatePresence>

                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-12 text-center">
                                            <Filter className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                                            <p className="text-sm text-slate-400 font-medium">Không tìm thấy người dùng nào</p>
                                            <p className="text-xs text-slate-300 mt-1">Thử thay đổi bộ lọc hoặc từ khoá tìm kiếm</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">
                            Hiển thị {filtered.length} / {mockUsers.length} người dùng
                        </span>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-emerald-600 flex items-center gap-0.5">
                                <CheckCircle2 className="w-3 h-3" /> {mockUsers.filter((u) => u.status === "active").length} hoạt động
                            </span>
                            <span className="text-slate-200">•</span>
                            <span className="text-[10px] text-amber-600 flex items-center gap-0.5">
                                <Clock className="w-3 h-3" /> {mockUsers.filter((u) => u.status === "pending").length} chờ duyệt
                            </span>
                            <span className="text-slate-200">•</span>
                            <span className="text-[10px] text-rose-600 flex items-center gap-0.5">
                                <Ban className="w-3 h-3" /> {mockUsers.filter((u) => u.status === "banned").length} bị khoá
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

