"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Rocket, 
    Search, 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    ChevronRight,
    Loader2,
    Briefcase,
    Building2,
    ArrowRight,
    FileType
} from "lucide-react";
import Link from "next/link";
import { useApplicationStore } from "@/features/jobs/stores/application-store";
import { ApplicationStatus, ApplicationStage } from "@/shared/types/application";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";

export default function CandidateOnboardingListPage() {
    const { serverApplications, isLoadingApplications, fetchApplications } = useApplicationStore();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchApplications();
    }, []);

    // Filter only HIRED applications
    const onboardingApps = useMemo(() => {
        return serverApplications.filter(a => a.currentStage === "HIRED" || a.currentStage === "OFFER");
    }, [serverApplications]);

    const filteredApps = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        return onboardingApps.filter(a => 
            (a.jobTitle || "").toLowerCase().includes(q) ||
            (a.companyName || "").toLowerCase().includes(q)
        );
    }, [onboardingApps, searchQuery]);

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center rotate-3 shadow-lg shadow-purple-500/10">
                            <Rocket className="w-6 h-6 text-purple-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-[#1C252E] dark:text-white tracking-tight">Hồ sơ trúng tuyển</h1>
                    </div>
                    <p className="text-[#637381] dark:text-[#919EAB] text-lg font-medium">Hoàn thiện giấy tờ để chuẩn bị cho hành trình mới.</p>
                </div>

                <div className="relative group w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#919EAB] group-focus-within:text-purple-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Tìm công ty hoặc vị trí..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 h-12 rounded-2xl bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/30 outline-none transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Cảnh báo an toàn */}
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 flex items-start gap-4">
               <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                  <AlertCircle className="w-5 h-5" />
               </div>
               <p className="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed font-medium">
                  <strong>SmartHire Bảo mật:</strong> Tất cả hồ sơ cá nhân (CCCD, Giấy khám sức khoẻ) được lưu trữ trong môi trường đám mây cô lập và chỉ dành cho bộ phận nhân sự của công ty bạn đã trúng tuyển. Dữ liệu sẽ tự động huỷ bỏ nếu không sử dụng sau một thời gian nhất định.
               </p>
            </div>

            {/* List */}
            {isLoadingApplications ? (
               <div className="flex flex-col items-center justify-center py-32 text-[#919EAB]">
                   <Loader2 className="w-10 h-10 animate-spin mb-4 text-purple-600" />
                   <p className="font-medium">Đang tìm kiếm hồ sơ trúng tuyển...</p>
               </div>
            ) : filteredApps.length > 0 ? (
               <div className="grid grid-cols-1 gap-6">
                   {filteredApps.map((app, idx) => (
                      <motion.div
                          key={app.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                      >
                         <Link href={`/onboarding/${app.id}`}>
                            <div className="group bg-white dark:bg-[#1C252E] p-6 rounded-3xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all cursor-pointer flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                                
                                {/* Background glow decoration */}
                                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors" />

                                {/* Company Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-lg shadow-purple-500/20 rotate-1 group-hover:rotate-6 transition-transform">
                                   {(app.companyName || "C").charAt(0)}
                                </div>

                                {/* Main content */}
                                <div className="flex-1 min-w-0 text-center md:text-left">
                                   <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                                      <h3 className="text-xl font-bold text-[#1C252E] dark:text-white group-hover:text-purple-600 transition-colors">
                                         {app.jobTitle}
                                      </h3>
                                      <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-0">
                                         Hợp đồng lao động
                                      </Badge>
                                   </div>
                                   <div className="flex items-center justify-center md:justify-start gap-2 text-[#637381] dark:text-[#919EAB] font-medium">
                                      <Building2 className="w-4 h-4" />
                                      <span>{app.companyName}</span>
                                      <span className="hidden md:inline">•</span>
                                      <Clock className="w-4 h-4" />
                                      <span>Cập nhật {new Date(app.updatedAt || app.appliedAt).toLocaleDateString('vi-VN')}</span>
                                   </div>
                                </div>

                                {/* Action */}
                                <div className="shrink-0 flex items-center gap-4">
                                   <div className="hidden md:flex flex-col items-end mr-4">
                                      <span className="text-xs font-bold text-[#919EAB] uppercase tracking-wider mb-1">Trạng thái</span>
                                      <span className="text-sm font-bold text-purple-600">Đang chờ nộp hồ sơ</span>
                                   </div>
                                   <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 transform group-hover:translate-x-2 transition-transform">
                                      <ArrowRight className="w-6 h-6" />
                                   </div>
                                </div>
                            </div>
                         </Link>
                      </motion.div>
                   ))}
               </div>
            ) : (
                <div className="text-center py-32 bg-white dark:bg-[#1C252E] rounded-3xl border border-dashed border-[rgba(145,158,171,0.2)] dark:border-white/[0.08]">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileType className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1C252E] dark:text-white mb-2">Chưa có hồ sơ nào</h3>
                    <p className="text-[#637381] dark:text-[#919EAB] max-w-sm mx-auto">Khi bạn được tuyển dụng vào một vị trí, các yêu cầu hồ sơ chuẩn bị cho ngày đầu tiên sẽ xuất hiện tại đây.</p>
                </div>
            )}
        </div>
    );
}
