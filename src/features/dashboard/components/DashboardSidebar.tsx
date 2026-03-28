"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Edit3,
    ClipboardList,
    Mic2,
    User,
    ChevronLeft,
    ChevronRight,
    Rocket,
    Upload,
    LayoutTemplate,
    Sparkles,
    Building2,
    Users,
    Kanban,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/use-auth";

/* ─── Nav Item Type ─── */
interface NavItemType {
    label: string;
    href: string;
    icon: LucideIcon;
}

/* ─── Candidate Nav (Module M1) ─── */
const NAV_CANDIDATE_GENERAL: NavItemType[] = [
    { label: "Tổng quan", href: "/dashboard", icon: LayoutDashboard },
    { label: "Hồ sơ cá nhân", href: "/profile", icon: User },
];

const NAV_CANDIDATE_TOOLS: NavItemType[] = [
    { label: "Tìm việc AI", href: "/jobs", icon: Briefcase },
    { label: "Đơn ứng tuyển", href: "/applications", icon: ClipboardList },
    { label: "Hồ sơ CV", href: "/cv-files", icon: FileText },
    { label: "Xây dựng CV", href: "/cv-builder", icon: Edit3 },
    { label: "Phỏng vấn AI", href: "/interview", icon: Mic2 },
    { label: "Tải lên CV", href: "/upload-cv", icon: Upload },
    { label: "Mẫu CV", href: "/cv-templates", icon: LayoutTemplate },
];

/* ─── Employer/HR Nav (Module M2) ─── */
const NAV_EMPLOYER_GENERAL: NavItemType[] = [
    { label: "Tổng quan", href: "/employer/dashboard", icon: LayoutDashboard },
    { label: "Hồ sơ công ty", href: "/company-profile", icon: Building2 },
];

const NAV_EMPLOYER_TOOLS: NavItemType[] = [
    { label: "Đăng tin tuyển dụng", href: "/hr/jobs", icon: Briefcase },
    { label: "Pipeline ứng viên", href: "/employer/pipeline", icon: Kanban },
    { label: "Danh sách ứng viên", href: "/employer/candidates", icon: Users },
];

/* ─── Types ─── */
interface Props {
    collapsed: boolean;
    onToggle: () => void;
}

/* ─── NavItem ─── */
function NavItem({
    item,
    collapsed,
    active,
}: {
    item: NavItemType;
    collapsed: boolean;
    active: boolean;
}) {
    const Icon = item.icon;
    return (
        <Link
            href={item.href}
            className={cn(
                "group relative flex items-center gap-3 rounded-2xl px-3 py-3 text-[14px] font-semibold transition-all duration-200",
                collapsed && "justify-center px-0",
                active
                    ? "text-[#22C55E] dark:text-[#4ADE80]"
                    : "text-[#637381] dark:text-[#919EAB] hover:bg-[rgba(145,158,171,0.06)] dark:hover:bg-white/[0.04] hover:text-[#1C252E] dark:hover:text-white"
            )}
        >
            {/* Active indicator bar */}
            {active && (
                <motion.span
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full bg-[#22C55E]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}

            <div
                className={cn(
                    "shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                    active
                        ? "bg-[#22C55E] text-white shadow-[0_4px_12px_rgba(34,197,94,0.3)]"
                        : "bg-transparent text-current group-hover:bg-[rgba(145,158,171,0.08)] dark:group-hover:bg-white/[0.06]"
                )}
            >
                <Icon className="w-[18px] h-[18px]" />
            </div>

            <AnimatePresence initial={false}>
                {!collapsed && (
                    <motion.span
                        key="label"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden whitespace-nowrap"
                    >
                        {item.label}
                    </motion.span>
                )}
            </AnimatePresence>
        </Link>
    );
}

/* ─── Main component ─── */
export function DashboardSidebar({ collapsed, onToggle }: Props) {
    const pathname = usePathname();
    const { user } = useAuth();

    const isEmployer = user?.role === "hr";

    // Pick the right nav sets based on role
    const navGeneral = isEmployer ? NAV_EMPLOYER_GENERAL : NAV_CANDIDATE_GENERAL;
    const navTools = isEmployer ? NAV_EMPLOYER_TOOLS : NAV_CANDIDATE_TOOLS;
    const toolsLabel = isEmployer ? "Tuyển dụng" : "Công cụ AI";

    return (
        <motion.aside
            animate={{ width: collapsed ? 88 : 220 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
                "fixed top-0 left-0 z-30 h-full flex flex-col",
                "bg-white dark:bg-[#1C252E]",
                "border-r border-[rgba(145,158,171,0.08)] dark:border-white/[0.04]",
                "overflow-hidden shrink-0",
                "shadow-[4px_0_24px_rgba(145,158,171,0.06)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)]"
            )}
        >
            {/* ── Logo + toggle ── */}
            <div className={cn(
                "flex items-center h-[72px] px-5 shrink-0",
                collapsed ? "justify-center" : "justify-between"
            )}>
                <AnimatePresence initial={false}>
                    {!collapsed && (
                        <motion.div
                            key="logo-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-3 overflow-hidden"
                        >
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#22C55E] to-[#059669] flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(34,197,94,0.3)]">
                                <Rocket className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-[18px] font-extrabold text-[#1C252E] dark:text-white whitespace-nowrap tracking-tight">
                                SmartHire
                            </span>
                        </motion.div>
                    )}
                    {collapsed && (
                        <motion.div
                            key="logo-icon"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#22C55E] to-[#059669] flex items-center justify-center shadow-[0_4px_12px_rgba(34,197,94,0.3)]"
                        >
                            <Rocket className="w-5 h-5 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {!collapsed && (
                    <button
                        onClick={onToggle}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white hover:bg-[rgba(145,158,171,0.08)] transition-all"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* ── Scrollable nav area ── */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 space-y-6">
                {/* General group */}
                <div className="space-y-1">
                    {!collapsed && (
                        <p className="px-3 mb-3 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#919EAB]/70 dark:text-[#637381]/70">
                            Tổng quan
                        </p>
                    )}
                    {navGeneral.map((item) => (
                        <NavItem
                            key={item.href}
                            item={item}
                            collapsed={collapsed}
                            active={
                                item.href === "/dashboard" || item.href === "/employer/dashboard"
                                    ? pathname === item.href
                                    : pathname.startsWith(item.href)
                            }
                        />
                    ))}
                </div>

                {/* Divider */}
                <div className="mx-3 border-t border-[rgba(145,158,171,0.08)] dark:border-white/[0.04]" />

                {/* Tools group */}
                <div className="space-y-1">
                    {!collapsed && (
                        <p className="px-3 mb-3 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#919EAB]/70 dark:text-[#637381]/70">
                            {toolsLabel}
                        </p>
                    )}
                    {navTools.map((item) => (
                        <NavItem
                            key={item.href}
                            item={item}
                            collapsed={collapsed}
                            active={pathname.startsWith(item.href)}
                        />
                    ))}
                </div>
            </div>

            {/* Collapsed toggle button */}
            {collapsed && (
                <div className="flex justify-center pb-4">
                    <button
                        onClick={onToggle}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white hover:bg-[rgba(145,158,171,0.08)] transition-all"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}



            {/* ── User info footer ── */}
            <div className={cn(
                "border-t border-[rgba(145,158,171,0.08)] dark:border-white/[0.04] px-4 py-4",
                collapsed && "flex justify-center px-2"
            )}>
                <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
                    <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#10B981] flex items-center justify-center text-white font-bold text-sm border-2 border-[#22C55E]/20">
                            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-white dark:border-[#1C252E] shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-bold text-[#1C252E] dark:text-white truncate">
                                {user?.fullName || "Người Dùng"}
                            </p>
                            <p className="text-[12px] text-[#919EAB] font-medium truncate">
                                {isEmployer ? "Nhà tuyển dụng" : "Ứng viên"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.aside>
    );
}
