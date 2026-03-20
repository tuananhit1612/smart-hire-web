"use client";

import { Building2, Clock, CheckCircle2, XCircle } from "lucide-react";

import { applicationApi } from "@/features/jobs/api/application-api";
import { Application } from "@/features/jobs/types/mock-applications";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export function RecentApplications() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchApps = async () => {
             try {
                 const data = await applicationApi.getMyApplications();
                 const sorted = data.sort((a,b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
                 setApplications(sorted.slice(0, 4));
             } catch {
                 setApplications([]);
             } finally {
                 setIsLoading(false);
             }
        };
        fetchApps();
    }, []);

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "APPLIED": return { text: "Đã nộp", color: "text-[#22c55e]", bg: "bg-[#22c55e]/10", Icon: CheckCircle2 };
            case "SCREENING": return { text: "Xét duyệt", color: "text-purple-500", bg: "bg-purple-500/10", Icon: Clock };
            case "INTERVIEW": return { text: "Phỏng vấn", color: "text-amber-500", bg: "bg-amber-500/10", Icon: Clock };
            case "OFFER": return { text: "Nhận Offer", color: "text-green-500", bg: "bg-green-500/10", Icon: CheckCircle2 };
            case "HIRED": return { text: "Đã nhận việc", color: "text-emerald-500", bg: "bg-emerald-500/10", Icon: CheckCircle2 };
            case "REJECTED": return { text: "Đã từ chối", color: "text-red-500", bg: "bg-red-500/10", Icon: XCircle };
            default: return { text: status, color: "text-slate-500", bg: "bg-slate-500/10", Icon: Clock };
        }
    };

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
                <Link href="/applications" className="text-sm font-semibold text-[#22C55E] hover:text-[#16A34A] transition-colors">
                    Xem tất cả
                </Link>
            </div>

            <div className="flex-1 space-y-4">
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center p-8">
                        <div className="w-8 h-8 border-4 border-[#22C55E] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : applications.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center pt-8 text-center space-y-3">
                        <div className="w-12 h-12 bg-[rgba(145,158,171,0.08)] rounded-full flex items-center justify-center text-[#919EAB]">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#1C252E] dark:text-white">Chưa có ứng tuyển nào</p>
                            <p className="text-xs text-[#637381] dark:text-[#919EAB]">Hãy ứng tuyển công việc để theo dõi tại đây</p>
                        </div>
                    </div>
                ) : (
                    applications.map((app) => {
                        const config = getStatusConfig(app.status);
                        const StatusIcon = config.Icon;
                        return (
                            <div
                                key={app.id}
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-[rgba(145,158,171,0.04)] dark:hover:bg-[rgba(145,158,171,0.08)] transition-colors group cursor-pointer"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[rgba(145,158,171,0.1)] dark:bg-white/5 flex items-center justify-center shrink-0 text-lg font-bold text-[#637381] dark:text-[#919EAB] group-hover:bg-white group-hover:shadow-md dark:group-hover:bg-[#22C55E]/20 dark:group-hover:text-[#22C55E] transition-all">
                                    {app.job.company.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-[#1C252E] dark:text-white truncate">
                                        {app.job.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Building2 className="w-3.5 h-3.5 text-[#919EAB]" />
                                        <span className="text-xs text-[#637381] dark:text-[#919EAB] truncate">
                                            {app.job.company}
                                        </span>
                                    </div>
                                </div>
                                <div className="shrink-0 flex flex-col items-end gap-1.5">
                                    <div
                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.color}`}
                                    >
                                        <StatusIcon className="w-3 h-3" />
                                        {config.text}
                                    </div>
                                    <span className="text-[11px] text-[#919EAB] font-medium">
                                        {formatDistanceToNow(new Date(app.appliedAt), { addSuffix: true, locale: vi })}
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

