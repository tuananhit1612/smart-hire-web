"use client";

import { Sparkles, ArrowRight, Target } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/context/auth-context";

export function WelcomeCard() {
    const auth = useContext(AuthContext);
    const userName = auth?.user?.fullName || "Bạn";

    return (
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#22C55E]/[0.06] via-white to-[#10B981]/[0.04] dark:from-[#22C55E]/5 dark:via-[#1C252E] dark:to-[#10B981]/10 p-8 sm:p-10 border border-[#22C55E]/20 dark:border-white/[0.08] shadow-[0_4px_24px_rgba(145,158,171,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: "radial-gradient(#1C252E 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

            {/* Decorative orbs */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-[#22C55E]/30 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 left-12 w-48 h-48 rounded-full bg-gradient-to-tr from-[#10B981]/20 to-transparent blur-3xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 z-10">
                {/* Text Content */}
                <div className="flex-1 min-w-0 text-center md:text-left">
                    <div className="inline-flex items-center gap-1.5 bg-white dark:bg-white/5 backdrop-blur-md border border-[#22C55E]/20 dark:border-white/10 rounded-full px-3.5 py-1.5 mb-4 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
                        <span className="text-[11px] font-bold text-[#22C55E] uppercase tracking-wider">
                            Dashboard Tổng Quan
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-[#1C252E] dark:text-white leading-tight mb-3">
                        Xin chào, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#10B981]">{userName}</span> 👋
                    </h2>

                    <p className="text-base text-[#637381] dark:text-[#919EAB] mb-6 max-w-lg mx-auto md:mx-0 leading-relaxed">
                        Hệ thống AI đã phân tích hồ sơ của bạn và tìm thấy <strong className="text-[#1C252E] dark:text-white font-semibold">15 công việc</strong> mới rất phù hợp. Khám phá ngay!
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                        <Link
                            href="/jobs"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 text-sm font-semibold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg focus-ring"
                        >
                            <Target className="w-4 h-4" />
                            Xem việc làm gợi ý
                        </Link>
                        <Link
                            href="/jobs/search"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-white/5 border border-[rgba(145,158,171,0.2)] dark:border-white/10 text-[#1C252E] dark:text-white hover:border-[#22C55E]/40 dark:hover:bg-white/10 text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-sm"
                        >
                            Tìm kiếm tự do
                        </Link>
                    </div>
                </div>

                {/* Right Illustration/Metric */}
                <div className="hidden md:flex shrink-0 relative w-48 h-48 items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#22C55E]/10 to-[#10B981]/10 rounded-full animate-pulse" style={{ animationDuration: "3s" }} />
                    <div className="absolute inset-4 bg-white dark:bg-[#1C252E] rounded-full border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] shadow-lg flex flex-col items-center justify-center z-10 glass">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#22C55E] to-[#16A34A] mb-1">
                            85%
                        </div>
                        <div className="text-[10px] font-bold text-[#637381] dark:text-[#919EAB] uppercase tracking-widest text-center px-4">
                            Độ hoàn thiện<br />Hồ sơ
                        </div>
                    </div>
                    {/* Floating elements */}
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white dark:bg-[#2D3748] shadow-md flex items-center justify-center animate-bounce-subtle z-20">
                        <span className="text-xl">✨</span>
                    </div>
                    <div className="absolute bottom-4 left-0 w-10 h-10 rounded-full bg-white dark:bg-[#2D3748] shadow-md flex items-center justify-center animate-bounce-subtle z-20" style={{ animationDelay: "1s" }}>
                        <span className="text-xl">🚀</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
