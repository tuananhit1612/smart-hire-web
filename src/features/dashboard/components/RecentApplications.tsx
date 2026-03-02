"use client";

import { Building2, Clock, CheckCircle2, XCircle } from "lucide-react";

const RECENT_APPLICATIONS = [
    {
        id: 1,
        company: "TechNova Solutions",
        role: "Senior Frontend Developer",
        status: "Đang xét duyệt",
        date: "Hôm nay, 14:30",
        logo: "T",
        statusColor: "text-amber-500",
        statusBg: "bg-amber-500/10",
        icon: Clock,
    },
    {
        id: 2,
        company: "VinaGame (VNG)",
        role: "React Native Engineer",
        status: "Đã xem CV",
        date: "Hôm qua",
        logo: "V",
        statusColor: "text-blue-500",
        statusBg: "bg-blue-500/10",
        icon: CheckCircle2,
    },
    {
        id: 3,
        company: "Shopee Vietnam",
        role: "UX/UI Designer",
        status: "Đã từ chối",
        date: "3 ngày trước",
        logo: "S",
        statusColor: "text-red-500",
        statusBg: "bg-red-500/10",
        icon: XCircle,
    },
    {
        id: 4,
        company: "FPT Software",
        role: "Fullstack NodeJS/React",
        status: "Mời phỏng vấn",
        date: "Tuần trước",
        logo: "F",
        statusColor: "text-emerald-500",
        statusBg: "bg-emerald-500/10",
        icon: CheckCircle2,
    },
];

export function RecentApplications() {
    return (
        <div className="bg-white dark:bg-[#1C252E] rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-[#1C252E] dark:text-white">
                        Ứng tuyển gần đây
                    </h3>
                    <p className="text-sm text-[#637381] dark:text-[#919EAB]">
                        Tiến trình các công việc đã nộp
                    </p>
                </div>
                <button className="text-sm font-semibold text-[#22C55E] hover:text-[#16A34A] transition-colors">
                    Xem tất cả
                </button>
            </div>

            <div className="flex-1 space-y-4">
                {RECENT_APPLICATIONS.map((app) => {
                    const StatusIcon = app.icon;
                    return (
                        <div
                            key={app.id}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-[rgba(145,158,171,0.04)] dark:hover:bg-[rgba(145,158,171,0.08)] transition-colors group cursor-pointer"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[rgba(145,158,171,0.1)] dark:bg-white/5 flex items-center justify-center shrink-0 text-lg font-bold text-[#637381] dark:text-[#919EAB] group-hover:bg-white group-hover:shadow-md dark:group-hover:bg-[#22C55E]/20 dark:group-hover:text-[#22C55E] transition-all">
                                {app.logo}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-[#1C252E] dark:text-white truncate">
                                    {app.role}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <Building2 className="w-3.5 h-3.5 text-[#919EAB]" />
                                    <span className="text-xs text-[#637381] dark:text-[#919EAB] truncate">
                                        {app.company}
                                    </span>
                                </div>
                            </div>
                            <div className="shrink-0 flex flex-col items-end gap-1.5">
                                <div
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${app.statusBg} ${app.statusColor}`}
                                >
                                    <StatusIcon className="w-3 h-3" />
                                    {app.status}
                                </div>
                                <span className="text-[11px] text-[#919EAB] font-medium">
                                    {app.date}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
