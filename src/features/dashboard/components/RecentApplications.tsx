"use client";

import { Building2, Clock, CheckCircle2, XCircle, Briefcase } from "lucide-react";
import type { RecentApplicationItem } from "../api/candidate-dashboard-api";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

interface RecentApplicationsProps {
    applications?: RecentApplicationItem[];
}

const STAGE_MAP: Record<string, { label: string; icon: any; color: string; bg: string }> = {
    APPLIED: {
        label: "Đã ứng tuyển",
        icon: Clock,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
    },
    INTERVIEW: {
        label: "Phỏng vấn",
        icon: Briefcase,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    HIRED: {
        label: "Tuyển dụng",
        icon: CheckCircle2,
        color: "text-[#22c55e]",
        bg: "bg-[#22c55e]/10",
    },
    REJECTED: {
        label: "Đã từ chối",
        icon: XCircle,
        color: "text-red-500",
        bg: "bg-red-500/10",
    },
};

const DEFAULT_STAGE = {
    label: "Không xác định",
    icon: Clock,
    color: "text-gray-500",
    bg: "bg-gray-500/10",
};

export function RecentApplications({ applications = [] }: RecentApplicationsProps) {
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
                {applications.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-[#22C55E]/10 rounded-full flex items-center justify-center mb-4">
                            <Briefcase className="w-8 h-8 text-[#22C55E]/50" />
                        </div>
                        <p className="text-sm text-[#637381] dark:text-[#919EAB]">
                            Bạn chưa có lịch sử ứng tuyển nào.
                        </p>
                    </div>
                ) : (
                    applications.map((app) => {
                        const stageInfo = STAGE_MAP[app.currentStage] || DEFAULT_STAGE;
                        const StatusIcon = stageInfo.icon;
                        
                        // Parse safely
                        let dateText = "";
                        try {
                            if (app.appliedAt) {
                                dateText = formatDistanceToNow(parseISO(app.appliedAt), { addSuffix: true, locale: vi });
                            }
                        } catch (e) {
                            dateText = app.appliedAt || "";
                        }

                        return (
                            <div
                                key={app.id}
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-[rgba(145,158,171,0.04)] dark:hover:bg-[rgba(145,158,171,0.08)] transition-colors group cursor-pointer"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[rgba(145,158,171,0.1)] dark:bg-white/5 flex items-center justify-center shrink-0 text-lg font-bold text-[#637381] dark:text-[#919EAB] group-hover:bg-white group-hover:shadow-md dark:group-hover:bg-[#22C55E]/20 dark:group-hover:text-[#22C55E] transition-all uppercase">
                                    {app.companyName ? app.companyName.charAt(0) : "C"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-[#1C252E] dark:text-white truncate">
                                        {app.jobTitle}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Building2 className="w-3.5 h-3.5 text-[#919EAB]" />
                                        <span className="text-xs text-[#637381] dark:text-[#919EAB] truncate">
                                            {app.companyName || "Công ty ẩn danh"}
                                        </span>
                                    </div>
                                </div>
                                <div className="shrink-0 flex flex-col items-end gap-1.5">
                                    <div
                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${stageInfo.bg} ${stageInfo.color}`}
                                    >
                                        <StatusIcon className="w-3 h-3" />
                                        {stageInfo.label}
                                    </div>
                                    <span className="text-[11px] text-[#919EAB] font-medium capitalize">
                                        {dateText}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

