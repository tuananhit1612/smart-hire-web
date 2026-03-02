"use client";

import {
    FileText,
    ClipboardList,
    Mic2,
    Search,
    Compass,
} from "lucide-react";
import { WelcomeCard } from "@/features/dashboard/components/WelcomeCard";
import { StatCard } from "@/features/dashboard/components/StatCard";
import { ActivityChart } from "@/features/dashboard/components/ActivityChart";
import { RecentApplications } from "@/features/dashboard/components/RecentApplications";

const STATS = [
    {
        title: "Tổng ứng tuyển",
        value: 12,
        subtitle: "+2 so với tuần trước",
        icon: ClipboardList,
        iconBg: "bg-gradient-to-br from-[#22C55E] to-[#16A34A]",
        trend: { value: "20%", positive: true },
    },
    {
        title: "Lượt tìm việc",
        value: 50,
        subtitle: "Hạn tìm kiếm tuần này",
        icon: Search,
        iconBg: "bg-gradient-to-br from-[#FFAB00] to-[#FFD666]",
    },
    {
        title: "Trình độ ATS",
        value: "85%",
        subtitle: "CV hiện tại của bạn",
        icon: FileText,
        iconBg: "bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]",
        trend: { value: "5%", positive: true },
    },
    {
        title: "Phỏng vấn AI",
        value: 3,
        subtitle: "Lượt luyện tập",
        icon: Mic2,
        iconBg: "bg-gradient-to-br from-[#F43F5E] to-[#E11D48]",
    },
];

export default function DashboardPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in-up">
            {/* Welcome card */}
            <WelcomeCard />

            {/* Stats row */}
            <div>
                <p className="text-[#22c55e] font-bold tracking-wider uppercase text-[11px] mb-3">
                    Tổng quan hôm nay
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STATS.map((stat) => (
                        <StatCard key={stat.title} {...stat} />
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[rgba(145,158,171,0.12)] dark:border-white/[0.06]" />

            {/* Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <div className="lg:col-span-2">
                    <ActivityChart />
                </div>
                <div className="lg:col-span-1">
                    <RecentApplications />
                </div>
            </div>

            {/* Bottom quick tip card */}
            <div className="rounded-2xl p-6 bg-gradient-to-r from-[#22C55E]/5 to-[#10B981]/5 dark:from-[#22C55E]/10 dark:to-[#10B981]/5 border border-[#22C55E]/20 dark:border-[#22C55E]/10 shadow-[0_8px_32px_-10px_rgba(34,197,94,0.15)] transition-all hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shrink-0 shadow-lg shadow-[#22C55E]/25">
                        <Compass className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#1C252E] dark:text-white">
                            💡 Mẹo hôm nay: Hoàn thiện hồ sơ
                        </p>
                        <p className="text-sm text-[#637381] dark:text-[#C4CDD5] mt-1 leading-relaxed">
                            Hoàn thiện hồ sơ 100% để SmartHire AI gợi ý công việc chính xác hơn và tăng cơ hội được tuyển dụng lên đến <span className="text-[#22C55E] font-bold">3×</span>.
                        </p>
                    </div>
                    <a
                        href="/profile"
                        className="shrink-0 inline-flex items-center gap-2 bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.32)] dark:border-white/10 text-[#1C252E] dark:text-white hover:text-[#22c55e] hover:border-[#22c55e] dark:hover:text-[#22c55e] dark:hover:border-[#22c55e] text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm"
                    >
                        Cập nhật
                    </a>
                </div>
            </div>
        </div>
    );
}
