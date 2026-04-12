"use client";

import { useState, useEffect, useRef } from "react";

import { usePathname } from "next/navigation";
import { Menu, Bell, Moon, Sun, Search, Home, User, Settings as SettingsIcon, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ... giữ nguyên phần đầu, thêm import
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useRouter } from "next/navigation";
import { resolveAvatarUrl } from "@/shared/utils/resolve-avatar-url";

interface Props {
    onToggleSidebar: () => void;
}

const ROUTE_LABELS: Record<string, string> = {
    "/dashboard": "Tổng quan",
    "/jobs": "Tìm việc",
    "/applications": "Đơn ứng tuyển",
    "/cv-files": "Hồ sơ CV",
    "/cv-builder": "Xây dựng CV",
    "/interview": "Phỏng vấn AI",
    "/profile": "Hồ sơ cá nhân",
    "/notifications": "Thông báo",
    "/ai-job-search": "Khám phá",
    "/employer": "Nhà tuyển dụng",
};

export function DashboardTopbar({ onToggleSidebar }: Props) {
    const pathname = usePathname();
    const router = useRouter();
    const { logout, user } = useAuth();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        // Close dropdown when clicking outside
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const pageLabel =
        Object.entries(ROUTE_LABELS).find(([key]) =>
            key === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(key)
        )?.[1] ?? "Dashboard";

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        router.push("/login"); // Push the user to login page
    };

    return (
        <header
            className={cn(
                "sticky top-0 z-20 flex items-center h-[72px] px-6 gap-4",
                "bg-white/95 dark:bg-[#141A21]/90 backdrop-blur-2xl",
                "border-b border-[rgba(145,158,171,0.08)] dark:border-white/[0.04]"
            )}
        >
            {/* Hamburger */}
            <button
                onClick={onToggleSidebar}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white hover:bg-[rgba(145,158,171,0.08)] transition-all"
                aria-label="Toggle sidebar"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Page Title */}
            <div className="flex-1">
                <h1 className="text-[15px] font-bold text-[#1C252E] dark:text-white">
                    {pageLabel}
                </h1>
                <p className="text-[12px] text-[#919EAB] font-medium">SmartHire Dashboard</p>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center gap-2.5 bg-[#F4F6F8] dark:bg-white/[0.04] rounded-2xl px-4 py-2.5 w-56 border border-transparent hover:border-[rgba(145,158,171,0.2)] dark:hover:border-white/[0.1] cursor-pointer transition-all group">
                <Search className="w-4 h-4 text-[#919EAB] group-hover:text-[#22C55E] transition-colors" />
                <span className="text-[13px] text-[#919EAB] font-medium">Tìm kiếm...</span>
            </div>

            {/* Dark mode toggle */}
            <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white hover:bg-[rgba(145,158,171,0.08)] transition-all"
                aria-label="Toggle dark mode"
            >
                {mounted ? (
                    theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />
                ) : (
                    <div className="w-5 h-5" />
                )}
            </button>

            {/* Notifications */}
            <Link
                href="/notifications"
                className="relative w-10 h-10 rounded-xl flex items-center justify-center text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white hover:bg-[rgba(145,158,171,0.08)] transition-all"
                aria-label="Notifications"
            >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-white dark:border-[#141A21] shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
            </Link>

            {/* Avatar Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="relative block rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E]/30 focus:ring-offset-2 dark:focus:ring-offset-[#141A21]"
                >
                    <img
                        src={mounted ? resolveAvatarUrl(user?.avatarUrl) : undefined}
                        alt="avatar"
                        className="w-10 h-10 rounded-xl border-2 border-[#22C55E]/20 hover:border-[#22C55E]/50 transition-colors object-cover bg-[#F4F6F8] dark:bg-[#212B36]"
                        suppressHydrationWarning
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-white dark:border-[#141A21] shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-[#1C252E] rounded-2xl shadow-[0_20px_60px_rgba(145,158,171,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-[rgba(145,158,171,0.08)] dark:border-white/[0.04] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Header Profile Area */}
                        <div className="px-5 py-5 border-b border-[rgba(145,158,171,0.08)] dark:border-white/[0.04] flex flex-col items-center bg-gradient-to-b from-[rgba(145,158,171,0.03)] to-transparent dark:from-white/[0.02]">
                            <div className="w-16 h-16 rounded-2xl p-[3px] bg-gradient-to-tr from-[#22C55E] to-[#10B981] mb-3 shadow-[0_4px_16px_rgba(34,197,94,0.3)]">
                                <img
                                    src={mounted ? resolveAvatarUrl(user?.avatarUrl) : undefined}
                                    alt="avatar large"
                                    className="w-full h-full rounded-[13px] border-2 border-white dark:border-[#1C252E] object-cover bg-white"
                                    suppressHydrationWarning
                                />
                            </div>
                            <p className="text-[14px] font-bold text-[#1C252E] dark:text-white">{user?.fullName || "Người Dùng"}</p>
                            <p className="text-[12px] text-[#919EAB] truncate w-full text-center mt-0.5">{user?.email || "Chưa cập nhật email"}</p>
                        </div>

                        {/* Menu Links */}
                        <div className="py-2 px-2">
                            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-semibold rounded-xl text-[#637381] dark:text-[#919EAB] hover:bg-[rgba(145,158,171,0.06)] hover:text-[#1C252E] dark:hover:text-white transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                <Home className="w-4 h-4" />
                                <span>Trang chủ</span>
                            </Link>
                            <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-semibold rounded-xl text-[#637381] dark:text-[#919EAB] hover:bg-[rgba(145,158,171,0.06)] hover:text-[#1C252E] dark:hover:text-white transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                <User className="w-4 h-4" />
                                <span>Hồ sơ cá nhân</span>
                            </Link>
                            <Link href="/account" className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-semibold rounded-xl text-[#637381] dark:text-[#919EAB] hover:bg-[rgba(145,158,171,0.06)] hover:text-[#1C252E] dark:hover:text-white transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                <SettingsIcon className="w-4 h-4" />
                                <span>Cài đặt tài khoản</span>
                            </Link>
                        </div>

                        {/* Footer Logout */}
                        <div className="p-3 border-t border-[rgba(145,158,171,0.08)] dark:border-white/[0.04]">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold text-[#FF5630] bg-[#FF5630]/8 hover:bg-[#FF5630]/15 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
