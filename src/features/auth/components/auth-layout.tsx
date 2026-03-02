"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
    children: React.ReactNode;
    /** Heading text for the left panel (e.g. "Chào mừng trở lại") */
    heading?: string;
    /** Subheading text for the left panel */
    subheading?: string;
}

/**
 * Auth Layout — Split layout: branding panel (left) + form panel (right).
 * Both panels adapt to light/dark mode. Follows SmartHire Design System.
 */
export function AuthLayout({
    children,
    heading = "Chào mừng trở lại",
    subheading = "Trợ lý tuyển dụng AI cá nhân của bạn",
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen w-full bg-white dark:bg-[#141A21]">
            {/* ─── Left Panel: Branding ─── */}
            <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-col relative bg-[#F4F6F8] dark:bg-[#1C252E] overflow-hidden">
                {/* Subtle green glow orbs */}
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#22C55E]/6 dark:bg-[#22C55E]/8 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/3 right-0 w-60 h-60 bg-[#22C55E]/4 dark:bg-[#22C55E]/5 rounded-full blur-3xl pointer-events-none" />

                {/* Logo */}
                <div className="relative z-10 p-8">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/25 transition-transform group-hover:scale-105">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <span className="text-[#1C252E] dark:text-white font-bold text-xl tracking-tight">
                            SmartHire
                        </span>
                    </Link>
                </div>

                {/* Branding text */}
                <div className="relative z-10 px-10 mt-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-3xl xl:text-4xl font-bold text-[#1C252E] dark:text-white leading-tight"
                    >
                        {heading}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                        className="text-[#637381] dark:text-[#919EAB] text-base mt-3"
                    >
                        {subheading}
                    </motion.p>
                </div>

                {/* Illustration */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="relative z-10 flex-1 flex items-center justify-center px-6"
                >
                    <Image
                        src="/assets/images/auth/login-background.svg"
                        alt="SmartHire Illustration"
                        width={500}
                        height={500}
                        className="w-full max-w-[460px] h-auto object-contain select-none pointer-events-none drop-shadow-2xl"
                        priority
                    />
                </motion.div>

                {/* Copyright — bottom of left panel */}
                <div className="relative z-10 px-8 pb-6 text-xs text-[#919EAB]">
                    &copy; 2025 SmartHire. Bảo lưu mọi quyền.
                </div>
            </div>

            {/* ─── Right Panel: Form ─── */}
            <div className="flex-1 flex flex-col items-center justify-center relative px-6 py-10">
                {/* Mobile-only logo */}
                <div className="lg:hidden absolute top-6 left-6">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                            <span className="text-white font-bold text-base">S</span>
                        </div>
                        <span className="text-[#1C252E] dark:text-white font-bold text-lg tracking-tight">
                            SmartHire
                        </span>
                    </Link>
                </div>

                {/* Form container */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-[440px]"
                >
                    {children}
                </motion.div>

                {/* Mobile footer */}
                <div className="lg:hidden absolute bottom-4 text-center text-xs text-[#919EAB]">
                    &copy; 2025 SmartHire. Bảo lưu mọi quyền.
                </div>
            </div>
        </div>
    );
}
