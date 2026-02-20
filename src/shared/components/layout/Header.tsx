"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Layers,
    LogOut,
    User,
    Briefcase,
    LayoutDashboard,
    FileText,
    Settings,
    ChevronDown,
    Search,
    Building2,
    Users,
    BarChart3,
    ClipboardList,
} from "lucide-react";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { NotificationBell } from "@/shared/components/layout/NotificationBell";
import { useAuth } from "@/features/auth/hooks/use-auth";
import type { UserRole } from "@/features/auth/types/auth-types";
import { cn } from "@/lib/utils";

// ─── Nav Links theo vai trò ────────────────────────────
interface NavItem {
    label: string;
    href: string;
    icon?: React.ElementType;
}

const publicNav: NavItem[] = [
    { label: "Sản Phẩm", href: "#" },
    { label: "Giải Pháp", href: "#" },
    { label: "Doanh Nghiệp", href: "#" },
    { label: "Bảng Giá", href: "#" },
];

const roleNav: Record<UserRole, NavItem[]> = {
    candidate: [
        { label: "Việc làm", href: "/jobs", icon: Search },
        { label: "Đơn ứng tuyển", href: "/applications", icon: ClipboardList },
        { label: "Hồ sơ CV", href: "/cv-builder", icon: FileText },
        { label: "Hồ sơ cá nhân", href: "/profile", icon: User },
    ],
    employer: [
        { label: "Dashboard", href: "/employer/dashboard", icon: BarChart3 },
        { label: "Tin tuyển dụng", href: "/hr/jobs", icon: Briefcase },
        { label: "Pipeline", href: "/employer/pipeline", icon: Users },
    ],
    admin: [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Quản lý Users", href: "/admin/users", icon: Users },
    ],
};

// ─── User Avatar ────────────────────────────────────────
function UserAvatar({ name }: { name: string }) {
    const initials = name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-500/20">
            {initials}
        </div>
    );
}

// ─── Header Component ───────────────────────────────────
export function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const router = useRouter();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest < 50) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
        setLastScrollY(latest);
    });

    // Đóng menu khi click ngoài
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        setShowUserMenu(false);
        logout();
        router.push("/login");
    };

    const navItems = isAuthenticated && user ? roleNav[user.role] : publicNav;

    const headerVariants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
    };

    const roleLabelMap: Record<UserRole, string> = {
        candidate: "Ứng viên",
        employer: "Nhà tuyển dụng",
        admin: "Quản trị viên",
    };

    return (
        <motion.header
            className="fixed top-4 inset-x-0 mx-auto w-full max-w-7xl z-40 px-4 md:px-6"
            variants={headerVariants}
            initial="visible"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-full h-16 px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href={isAuthenticated ? (user?.role === "employer" ? "/employer/dashboard" : user?.role === "admin" ? "/admin/dashboard" : "/jobs") : "/"} className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="bg-gradient-to-tr from-blue-600 to-sky-500 h-9 w-9 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-200">
                        <Layers className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-sky-900 font-sans">SmartHire</span>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-sky-700">
                    {isLoading ? (
                        /* Nav loading skeleton */
                        <div className="flex items-center gap-6 animate-pulse">
                            <div className="h-4 w-16 bg-sky-100 rounded" />
                            <div className="h-4 w-20 bg-sky-100 rounded" />
                            <div className="h-4 w-14 bg-sky-100 rounded" />
                        </div>
                    ) : (
                        navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-1.5 hover:text-sky-500 transition-colors"
                            >
                                {item.icon && <item.icon className="w-4 h-4" />}
                                {item.label}
                            </Link>
                        ))
                    )}
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                    {isLoading ? (
                        /* Loading skeleton */
                        <div className="flex items-center gap-3 animate-pulse">
                            <div className="h-5 w-20 bg-sky-100 rounded-full" />
                            <div className="h-9 w-9 bg-sky-100 rounded-full" />
                        </div>
                    ) : isAuthenticated && user ? (
                        <>
                            <NotificationBell />

                            {/* User dropdown */}
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2 cursor-pointer hover:bg-sky-50 rounded-full pl-1 pr-3 py-1 transition-colors"
                                >
                                    <UserAvatar name={user.name} />
                                    <div className="hidden sm:block text-left">
                                        <p className="text-sm font-semibold text-sky-900 leading-tight">{user.name}</p>
                                        <p className="text-[11px] text-sky-500 leading-tight">{roleLabelMap[user.role]}</p>
                                    </div>
                                    <ChevronDown className={cn(
                                        "w-4 h-4 text-sky-400 transition-transform duration-200",
                                        showUserMenu && "rotate-180"
                                    )} />
                                </button>

                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-sky-900/10 border border-sky-100 py-2 overflow-hidden"
                                        >
                                            {/* User info */}
                                            <div className="px-4 py-3 border-b border-sky-50">
                                                <p className="text-sm font-bold text-sky-900">{user.name}</p>
                                                <p className="text-xs text-sky-500 truncate">{user.email}</p>
                                            </div>

                                            {/* Menu items */}
                                            <div className="py-1">
                                                <Link
                                                    href="/profile"
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-sky-700 hover:bg-sky-50 transition-colors"
                                                >
                                                    <User className="w-4 h-4" />
                                                    Hồ sơ cá nhân
                                                </Link>
                                                <Link
                                                    href="/notifications"
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-sky-700 hover:bg-sky-50 transition-colors"
                                                >
                                                    <Settings className="w-4 h-4" />
                                                    Thông báo
                                                </Link>
                                            </div>

                                            {/* Logout */}
                                            <div className="border-t border-sky-50 pt-1">
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Đăng xuất
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-bold text-sky-700 hover:text-sky-500 transition-colors">
                                Đăng Nhập
                            </Link>
                            <Link href="/register">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 h-10 px-6 rounded-full transition-all hover:scale-105">
                                    Bắt Đầu Ngay
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </motion.header>
    );
}
