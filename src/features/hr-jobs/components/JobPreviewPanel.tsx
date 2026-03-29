"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
    X,
    Briefcase,
    MapPin,
    Clock,
    Users,
    Eye,
    DollarSign,
    Building2,
    Star,
    Sparkles,
    CheckCircle2,
    Share2,
    Heart,
    Calendar,
    Target,
    Zap,
    Bookmark,
    ChevronRight,
    ArrowRight,
    Edit3,
    Trash2,
    Copy,
    Pause,
    Play,
} from "lucide-react";
import { useJobStore } from "../stores/job-store";
import { JOB_TYPES, JOB_LEVELS, Job } from "../types/job";
import { getImageUrl } from "@/shared/lib/api-client";
import { MOCK_COMPANIES } from "../../hr-company/data/mock-companies";
import { useCompanyStore } from "../../hr-company/stores/company-store";
import { useToastHelpers } from "@/shared/components/ui/toast";

export function JobPreviewPanel({ onViewApplicants }: { onViewApplicants?: (job: Job) => void }) {
    const { selectedJob, setPreviewOpen, selectJob, toggleJobStatus, deleteJob } = useJobStore();
    const storeCompany = useCompanyStore((state) => state.company);
    const toast = useToastHelpers();

    if (!selectedJob) return null;

    const job = selectedJob;
    // Fallback to storeCompany, or empty object to prevent crash
    const company = storeCompany?.id ? storeCompany : (MOCK_COMPANIES[0] || {} as any);

    const handleClose = () => {
        setPreviewOpen(false);
        selectJob(null);
    };

    const handlePause = () => {
        const wasDraft = job.status === "DRAFT";
        toggleJobStatus(job.id);
        toast.success(wasDraft ? "Đã mở lại tin tuyển dụng" : "Đã chuyển về bản nháp", job.title);
    };

    const handleDelete = () => {
        deleteJob(job.id);
        handleClose();
        toast.warning("Đã chuyển vào mục Đã đóng", job.title);
    };

    const formatSalary = (min?: number, max?: number) => {
        if (!min && !max) return "Thỏa thuận";
        const f = (n: number) => n.toLocaleString('vi-VN');
        if (min && max) return `${f(min)} - ${f(max)} VNĐ`;
        if (min) return `Từ ${f(min)} VNĐ`;
        return `Đến ${f(max!)} VNĐ`;
    };

    const daysAgo = (dateStr: string) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days === 0) return "Hôm nay";
        if (days === 1) return "Hôm qua";
        return `${days} ngày trước`;
    };

    const deadlineDays = job.deadline
        ? Math.ceil((new Date(job.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : null;

    const formatDeadline = () => {
        if (!job.deadline) return "Không giới hạn";
        return new Date(job.deadline).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    // Status config
    const statusMap: Record<string, { label: string; color: string; dot: string }> = {
        open: { label: "Đang tuyển", color: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
        closed: { label: "Đã đóng", color: "bg-gray-100 text-gray-600 border-gray-200", dot: "bg-gray-400" },
        paused: { label: "Tạm dừng", color: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
        draft: { label: "Bản nháp", color: "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/30", dot: "bg-[#22c55e]" },
    };
    const status = statusMap[job.status] || statusMap.draft;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl max-h-[95vh] bg-white rounded-[24px] shadow-2xl flex flex-col overflow-hidden ring-1 ring-black/5"
            >
                {/* ━━━ Header ━━━ */}
                <div className="flex-shrink-0 bg-slate-900 text-white">
                    {/* Top toolbar */}
                    <div className="flex items-center justify-between px-6 pt-5 pb-3">
                        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
                            Xem trước tin tuyển dụng
                        </span>
                        <button
                            onClick={handleClose}
                            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Job title section */}
                    <div className="px-6 pb-5">
                        <div className="flex items-start gap-3.5">
                            {/* Company logo */}
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden ring-1 ring-white/10">
                                {company.logoUrl ? (
                                    <img src={getImageUrl(company.logoUrl)} alt={company.name} className="w-full h-full object-cover" />
                                ) : (
                                    <Building2 className="w-6 h-6 text-slate-300" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h1 className="text-[17px] font-semibold text-white leading-snug">{job.title}</h1>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="text-sm text-slate-400">{company.name}</span>
                                    <span className="text-slate-600">·</span>
                                    <span className="text-xs text-slate-500">{daysAgo(job.createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Status + department row */}
                        <div className="flex items-center gap-2 mt-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${status.color}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                {status.label}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/5 text-slate-400 border border-white/10">
                                {job.department}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ━━━ Body (scrollable) ━━━ */}
                <div className="flex-1 overflow-y-auto">
                    {/* Info grid — key details */}
                    <div className="grid grid-cols-2 border-b border-gray-100">
                        {/* Salary */}
                        <div className="px-6 py-4 border-r border-b border-gray-100">
                            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Mức lương</div>
                            <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                                {formatSalary(job.salaryMin, job.salaryMax)}
                            </div>
                        </div>
                        {/* Location */}
                        <div className="px-6 py-4 border-b border-gray-100">
                            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Địa điểm</div>
                            <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-[#22c55e]" />
                                {job.remote === "remote" ? "Remote" : job.location}
                            </div>
                        </div>
                        {/* Type */}
                        <div className="px-6 py-4 border-r border-gray-100">
                            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Loại hình</div>
                            <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-violet-500" />
                                {JOB_TYPES[job.type]}
                            </div>
                        </div>
                        {/* Level */}
                        <div className="px-6 py-4 border-gray-100">
                            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Cấp bậc</div>
                            <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                                <Target className="w-3.5 h-3.5 text-amber-500" />
                                {JOB_LEVELS[job.level]}
                            </div>
                        </div>
                    </div>

                    {/* Stats inline */}
                    <div className="flex items-center justify-between px-6 py-3.5 bg-gray-50/70 border-b border-gray-100">
                        <div className="flex items-center gap-5">
                            <div className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-violet-500" />
                                <span className="text-sm font-bold text-gray-900">{job.applicantCount}</span>
                                <span className="text-xs text-gray-400">ứng viên</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Eye className="w-3.5 h-3.5 text-[#22c55e]" />
                                <span className="text-sm font-bold text-gray-900">{job.viewCount}</span>
                                <span className="text-xs text-gray-400">lượt xem</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            <span className={`text-xs font-semibold ${deadlineDays !== null && deadlineDays <= 3 ? "text-red-600" : "text-gray-500"
                                }`}>
                                Hạn: {formatDeadline()}
                                {deadlineDays !== null && deadlineDays <= 7 && (
                                    <span className={`ml-1 ${deadlineDays <= 3 ? "text-red-500" : "text-amber-500"}`}>
                                        ({deadlineDays <= 0 ? "Hết hạn" : `còn ${deadlineDays} ngày`})
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>

                    {/* Skills */}
                    {(job.mustHaveSkills.length > 0 || job.niceToHaveSkills.length > 0) && (
                        <div className="px-6 py-5 border-b border-gray-100 space-y-4">
                            {job.mustHaveSkills.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <Star className="w-3.5 h-3.5 text-amber-500" />
                                        <span className="text-xs font-semibold text-gray-700">Yêu cầu</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {job.mustHaveSkills.map((skill) => (
                                            <span
                                                key={skill.id}
                                                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {job.niceToHaveSkills.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <Sparkles className="w-3.5 h-3.5 text-[#22c55e]" />
                                        <span className="text-xs font-semibold text-gray-700">Ưu tiên</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {job.niceToHaveSkills.map((skill) => (
                                            <span
                                                key={skill.id}
                                                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium border border-gray-200"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Content sections */}
                    <div className="divide-y divide-gray-100">
                        {job.description && (
                            <div className="px-6 py-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center">
                                        <Briefcase className="w-3.5 h-3.5 text-slate-600" />
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900">Mô tả công việc</h3>
                                </div>
                                <div className="text-[15px] text-gray-700 whitespace-pre-line leading-[1.8] pl-8">
                                    {job.description}
                                </div>
                            </div>
                        )}

                        {job.requirements && (
                            <div className="px-6 py-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900">Yêu cầu ứng viên</h3>
                                </div>
                                <div className="text-[15px] text-gray-700 whitespace-pre-line leading-[1.8] pl-8">
                                    {job.requirements}
                                </div>
                            </div>
                        )}

                        {job.benefits && (
                            <div className="px-6 py-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-md bg-pink-50 flex items-center justify-center">
                                        <Heart className="w-3.5 h-3.5 text-pink-600" />
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900">Quyền lợi</h3>
                                </div>
                                <div className="text-[15px] text-gray-700 whitespace-pre-line leading-[1.8] pl-8">
                                    {job.benefits}
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* ━━━ Footer ━━━ */}
                <div className="flex-shrink-0 px-6 py-4 bg-white border-t border-[rgba(145,158,171,0.12)]">
                    <div className="flex items-center gap-2.5 mb-3">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setPreviewOpen(false); // Close preview but KEEP selectedJob
                                setTimeout(() => useJobStore.getState().setFormOpen(true), 150); // Open form with data
                            }}
                            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#1C252E] to-[#2D3A4A] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all"
                        >
                            <Edit3 className="w-4 h-4" />
                            Chỉnh sửa
                        </button>
                        
                        {onViewApplicants && (
                            <button 
                                onClick={() => { handleClose(); onViewApplicants(job); }}
                                className="px-5 py-3 bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e]/20 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors"
                            >
                                <Users className="w-4 h-4" />
                                Ứng viên ({job.applicantCount})
                            </button>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-2.5">
                        <button 
                            onClick={handlePause}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[rgba(145,158,171,0.2)] rounded-xl text-[#637381] hover:text-amber-500 hover:border-amber-200 transition-all text-sm font-semibold pr-2"
                        >
                            {job.status === "OPEN" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            {job.status === "OPEN" ? "Tạm dừng" : "Mở tin"}
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-red-100 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all text-sm font-semibold pr-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Xóa tin
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

