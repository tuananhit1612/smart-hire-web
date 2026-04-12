"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ClipboardList, 
    Search, 
    User, 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    ChevronRight,
    Loader2,
    FileText,
    ArrowRight
} from "lucide-react";
import { employerApplicantApi } from "@/features/employer/api/employer-api";
import { EmployerApplicant } from "@/features/employer/types/mock-applicants";
import { ApplicantDrawer } from "@/features/employer/components/applicant-drawer";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";

export default function EmployerOnboardingPage() {
    const [applicants, setApplicants] = useState<EmployerApplicant[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedApplicant, setSelectedApplicant] = useState<EmployerApplicant | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const fetchHiredApplicants = async () => {
        setIsLoading(true);
        try {
            const res = await employerApplicantApi.getAll();
            const responseData = (res as any).data;
            if (responseData.success && responseData.data) {
                // Filter only HIRED status
                const hiredOnly = responseData.data.filter((a: EmployerApplicant) => a.status === "HIRED" || a.stage === "HIRED");
                setApplicants(hiredOnly);
            }
        } catch (error) {
            console.error("Failed to fetch hired applicants", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHiredApplicants();
    }, []);

    const filteredApplicants = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        return applicants.filter(a => 
            (a.fullName || a.name || "").toLowerCase().includes(q) ||
            (a.jobTitle || "").toLowerCase().includes(q)
        );
    }, [applicants, searchQuery]);

    const handleOpenDrawer = (applicant: EmployerApplicant) => {
        setSelectedApplicant(applicant);
        setIsDrawerOpen(true);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <ClipboardList className="w-6 h-6 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-[#1C252E] dark:text-white tracking-tight">Hồ sơ trúng tuyển</h1>
                    </div>
                    <p className="text-[#637381] dark:text-[#919EAB] text-lg font-medium">Theo dõi và kiểm duyệt hồ sơ nhận việc của các tân binh.</p>
                </div>

                <div className="relative group w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#919EAB] group-focus-within:text-green-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Tìm theo tên hoặc vị trí..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 h-12 rounded-2xl bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30 outline-none transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* List Section */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 text-[#919EAB]">
                    <Loader2 className="w-10 h-10 animate-spin mb-4 text-green-500" />
                    <p className="font-medium">Đang tải danh sách tân binh...</p>
                </div>
            ) : filteredApplicants.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {filteredApplicants.map((app, idx) => {
                        const progress = app.onboardingProgress || "0/6";
                        const [completed, total] = progress.split('/').map(Number);
                        const percent = total > 0 ? (completed / total) * 100 : 0;
                        const isDone = completed === total && total > 0;

                        return (
                            <motion.div
                                key={app.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => handleOpenDrawer(app)}
                                className="group bg-white dark:bg-[#1C252E] p-5 rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/5 transition-all cursor-pointer flex flex-col md:flex-row items-center gap-6"
                            >
                                {/* Avatar */}
                                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xl font-bold text-green-600 shrink-0 border border-[rgba(145,158,171,0.1)]">
                                    {(app.fullName || app.name || "U").charAt(0)}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0 text-center md:text-left">
                                    <h3 className="text-lg font-bold text-[#1C252E] dark:text-white truncate group-hover:text-green-600 transition-colors">
                                        {app.fullName || app.name}
                                    </h3>
                                    <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-[#637381] dark:text-[#919EAB] mt-0.5">
                                        <Badge variant="outline" className="bg-slate-50 dark:bg-white/5 border-0 hover:bg-slate-100 dark:hover:bg-white/10 font-medium">
                                            {app.jobTitle}
                                        </Badge>
                                        <span>•</span>
                                        <p>{app.email}</p>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="w-full md:w-64 space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-bold text-[#919EAB] uppercase tracking-wider">Tiến độ hồ sơ</span>
                                        <span className={cn(
                                            "text-sm font-bold",
                                            isDone ? "text-green-600" : percent > 50 ? "text-amber-500" : "text-slate-500"
                                        )}>
                                            {progress}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percent}%` }}
                                            className={cn(
                                                "h-full rounded-full transition-all duration-1000",
                                                isDone ? "bg-green-500" : "bg-green-400"
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="shrink-0 flex gap-4 items-center">
                                    {isDone ? (
                                        <div className="flex items-center gap-1 text-green-600 bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-green-500/20">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> HOÀN TẤT
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 text-amber-600 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-amber-500/20">
                                            <Clock className="w-3.5 h-3.5" /> CHƯA XONG
                                        </div>
                                    )}
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#919EAB] group-hover:text-green-600 group-hover:bg-green-500/10 transition-all">
                                        <ChevronRight className="w-6 h-6" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-32 bg-white dark:bg-[#1C252E] rounded-3xl border border-dashed border-[rgba(145,158,171,0.2)] dark:border-white/[0.08]">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <User className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1C252E] dark:text-white mb-2">Chưa có tân binh nào</h3>
                    <p className="text-[#637381] dark:text-[#919EAB] max-w-sm mx-auto">Khi bạn chuyển ứng viên sang trạng thái Đã tuyển, họ sẽ xuất hiện tại đây để hoàn tất hồ sơ.</p>
                </div>
            )}

            {/* Applicant Drawer for Detail Review */}
            {selectedApplicant && (
                <ApplicantDrawer 
                    applicant={selectedApplicant}
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    jobId={String(selectedApplicant.jobId || "")}
                    onApplicantUpdated={fetchHiredApplicants}
                />
            )}
        </div>
    );
}
