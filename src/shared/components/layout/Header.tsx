"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Menu,
    X,
    ChevronDown,
} from "lucide-react";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";
import { AvatarInitials } from "@/shared/components/ui/avatar-initials";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils";

// ─── Nav Links ─────────────────────────────────────
export type NavItem = {
    label: string;
    href?: string;
    children?: { label: string; href: string }[];
};

const navLinks: NavItem[] = [
    { label: "Trang chủ", href: "/" },
    {
        label: "Tính năng",
        children: [
            { label: "Tìm việc AI", href: "/ai-job-search" },
            { label: "Ứng tuyển bằng AI", href: "/ai-job-application" },
            { label: "Tạo CV AI", href: "/ai-resume-builder" },
            { label: "Tạo Cover Letter AI", href: "/ai-cover-letter-generator" },
        ]
    },
    { label: "Hỏi đáp", href: "/faqs" },
    { label: "Blog", href: "/blog" },
    { label: "Câu chuyện thành công", href: "/success-stories" },
];

const employerLinks: NavItem[] = [
    { label: "Dashboard", href: "/employer/dashboard" },
    { label: "Post Jobs", href: "/hr/jobs" },
    { label: "Pipeline", href: "/employer/pipeline" },
];

// ─── Header Component ───────────────────────────────────
export function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const { user, isLoading, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest < 50) {
            setIsVisible(true);
        } else {
            setIsVisible(latest < lastScrollY ? true : false);
        }
        setLastScrollY(latest);
    });

    // ─── Hide on dashboard routes (they have their own Sidebar + Topbar) ───
    const DASHBOARD_ROUTES = [
        "/dashboard",
        "/profile",
        "/jobs",
        "/applications",
        "/cv-files",
        "/cv-builder",
        "/interview",
        "/upload-cv",
        "/cv-templates",
        "/cv-preview",
        "/notifications",
        "/employer/dashboard",
        "/employer/pipeline",
        "/employer/candidates",
        "/company-profile",
        "/hr",
    ];
    const isOnDashboard = DASHBOARD_ROUTES.some((r) => pathname.startsWith(r));
    if (isOnDashboard) return null;

    const headerVariants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
    };

    const navItems = user?.role === "employer" ? employerLinks : navLinks;

    return (
        <motion.header
            className="fixed top-0 inset-x-0 z-50"
            variants={headerVariants}
            initial="visible"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 cursor-pointer">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <span className="text-[#1C252E] dark:text-white font-bold text-xl">SmartHire</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => {
                            const isActive = item.href === pathname || (item.children && item.children.some(child => child.href === pathname));
                            return item.children ? (
                                <div key={item.label} className="relative group">
                                    <button className={cn(
                                        "flex items-center gap-1.5 text-sm font-medium transition-colors py-2",
                                        isActive ? "text-[#22c55e]" : "text-[#637381] dark:text-[#919EAB] group-hover:text-[#1C252E] dark:group-hover:text-white"
                                    )}>
                                        {item.label}
                                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                    </button>
                                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <div className="w-56 bg-white dark:bg-[#1C252E] rounded-xl shadow-xl border border-[rgba(145,158,171,0.12)] p-2 backdrop-blur-xl">
                                            {item.children.map(child => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className={cn(
                                                        "block px-4 py-2.5 text-sm font-medium hover:bg-[rgba(145,158,171,0.04)] dark:hover:bg-[rgba(145,158,171,0.08)] rounded-lg transition-colors",
                                                        pathname === child.href ? "text-[#22c55e] bg-[rgba(34,197,94,0.08)]" : "text-[#637381] dark:text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white"
                                                    )}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    key={item.label}
                                    href={item.href!}
                                    className={cn(
                                        "text-sm font-medium transition-colors py-2",
                                        pathname === item.href ? "text-[#22c55e]" : "text-[#637381] dark:text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        {/* Desktop Auth Buttons / User Menu */}
                        <div className="hidden md:flex items-center gap-3">
                            {user ? (
                                <div className="relative group">
                                    <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-[rgba(145,158,171,0.2)] hover:border-[#22c55e]/50 hover:bg-[rgba(145,158,171,0.04)] transition-all">
                                        <AvatarInitials 
                                            initials={user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"} 
                                            size="sm"
                                        />
                                        <span className="text-sm font-medium text-[#1C252E] dark:text-white max-w-[100px] truncate">
                                            {user.fullName || "User"}
                                        </span>
                                        <ChevronDown className="w-4 h-4 text-[#637381] group-hover:text-[#1C252E] dark:group-hover:text-white transition-colors" />
                                    </button>

                                    <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <div className="w-48 bg-white dark:bg-[#1C252E] rounded-xl shadow-xl border border-[rgba(145,158,171,0.12)] p-2 backdrop-blur-xl">
                                            <Link
                                                href={user.role === "employer" ? "/employer/dashboard" : "/dashboard"}
                                                className="block px-4 py-2.5 text-sm font-medium text-[#637381] dark:text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white hover:bg-[rgba(145,158,171,0.04)] dark:hover:bg-[rgba(145,158,171,0.08)] rounded-lg transition-colors"
                                            >
                                                Bảng điều khiển
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    router.push("/login");
                                                }}
                                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-[#FF5630] hover:bg-[#FF5630]/10 rounded-lg transition-colors"
                                            >
                                                Đăng xuất
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-sm font-semibold px-5 py-2 rounded-lg border border-[rgba(145,158,171,0.32)] dark:border-white/20 text-[#1C252E] dark:text-white hover:bg-[rgba(145,158,171,0.08)] dark:hover:bg-white/[0.06] transition-colors"
                                    >
                                        Đăng nhập
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="text-sm font-semibold px-5 py-2 rounded-lg bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 transition-colors"
                                    >
                                        Đăng ký miễn phí
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-[#637381] dark:text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white transition-colors"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 dark:bg-[#141A21]/95 backdrop-blur-xl border-t border-[rgba(145,158,171,0.2)]"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {navItems.map((item) => {
                                const isActive = item.href === pathname || (item.children && item.children.some(child => child.href === pathname));
                                return item.children ? (
                                    <div key={item.label} className="space-y-1">
                                        <div className={cn(
                                            "text-base font-semibold py-2",
                                            isActive ? "text-[#22c55e]" : "text-[#1C252E] dark:text-white"
                                        )}>
                                            {item.label}
                                        </div>
                                        <div className="pl-4 border-l-2 border-[rgba(145,158,171,0.12)] space-y-1">
                                            {item.children.map(child => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={cn(
                                                        "block text-base font-medium py-2 transition-colors",
                                                        pathname === child.href ? "text-[#22c55e]" : "text-[#637381] dark:text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white"
                                                    )}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        key={item.label}
                                        href={item.href!}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "block text-base font-medium py-2 transition-colors",
                                            pathname === item.href ? "text-[#22c55e]" : "text-[#637381] dark:text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            })}
                            <div className="pt-4 border-t border-[rgba(145,158,171,0.2)] space-y-3">
                                {user ? (
                                    <>
                                        <div className="flex items-center gap-3 mb-4 px-2">
                                            <AvatarInitials 
                                                initials={user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"} 
                                                size="md"
                                            />
                                            <div>
                                                <p className="text-sm font-bold text-[#1C252E] dark:text-white">{user.fullName || "User"}</p>
                                                <p className="text-xs text-[#637381] dark:text-[#919EAB]">{user.email || "user@example.com"}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href={user.role === "employer" ? "/employer/dashboard" : "/dashboard"}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block text-center text-base font-semibold py-2.5 rounded-lg border border-[rgba(145,158,171,0.32)] dark:border-white/20 text-[#1C252E] dark:text-white hover:bg-[rgba(145,158,171,0.08)] dark:hover:bg-white/[0.06] transition-colors"
                                        >
                                            Bảng điều khiển
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setMobileMenuOpen(false);
                                                router.push("/login");
                                            }}
                                            className="w-full text-center text-base font-semibold py-2.5 rounded-lg bg-[#FF5630]/10 text-[#FF5630] hover:bg-[#FF5630]/20 transition-colors"
                                        >
                                            Đăng xuất
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block text-center text-base font-semibold py-2.5 rounded-lg border border-[rgba(145,158,171,0.32)] dark:border-white/20 text-[#1C252E] dark:text-white hover:bg-[rgba(145,158,171,0.08)] dark:hover:bg-white/[0.06] transition-colors"
                                        >
                                            Đăng nhập
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block text-center text-base font-semibold py-2.5 rounded-lg bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 transition-colors"
                                        >
                                            Đăng ký miễn phí
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
