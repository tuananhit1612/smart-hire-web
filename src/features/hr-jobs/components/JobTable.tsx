"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MoreHorizontal,
    Edit3,
    Eye,
    Trash2,
    Copy,
    ToggleLeft,
    ToggleRight,
    MapPin,
    Clock,
    Users,
    Briefcase,
    Calendar,
    ChevronRight,
    Building2,
} from "lucide-react";
import { Job, JOB_TYPES, JOB_LEVELS, JOB_STATUSES, JOB_REMOTES } from "../types/job";
import { useJobStore } from "../stores/job-store";
import { useToastHelpers } from "@/shared/components/ui/toast";

interface JobTableProps {
    jobs: Job[];
    viewMode: "table" | "grid";
}

// Status Badge component
function StatusBadge({ status }: { status: Job["status"] }) {
    const config = JOB_STATUSES[status];
    const colorClasses = {
        amber: "bg-amber-100 text-amber-700 border-amber-200",
        green: "bg-green-100 text-green-700 border-green-200",
        slate: "bg-slate-100 text-slate-700 border-slate-200",
        red: "bg-red-100 text-red-700 border-red-200",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colorClasses[config.color as keyof typeof colorClasses]
                }`}
        >
            <span
                className={`w-2 h-2 rounded-full ${status === "open" ? "bg-green-500 animate-pulse" : `bg-${config.color}-500`
                    }`}
            />
            {config.label}
        </span>
    );
}

// Action Menu component
function ActionMenu({ job, onClose }: { job: Job; onClose: () => void }) {
    const { selectJob, setFormOpen, setPreviewOpen, deleteJob, restoreJob, toggleJobStatus, cloneJob } = useJobStore();
    const toast = useToastHelpers();

    const handleEdit = () => {
        selectJob(job);
        setFormOpen(true);
        onClose();
    };

    const handlePreview = () => {
        selectJob(job);
        setPreviewOpen(true);
        onClose();
    };

    const handleToggleStatus = () => {
        const wasPaused = job.status === "paused";
        toggleJobStatus(job.id);
        toast.success(
            wasPaused ? "Đã mở lại tin tuyển dụng" : "Đã tạm dừng tin tuyển dụng",
            job.title,
            { label: "Hoàn tác", onClick: () => toggleJobStatus(job.id) }
        );
        onClose();
    };

    const handleDelete = () => {
        deleteJob(job.id);
        toast.warning(
            "Đã chuyển vào mục Đã đóng",
            job.title,
            { label: "Hoàn tác", onClick: () => restoreJob(job.id) }
        );
        onClose();
    };

    const handleClone = () => {
        cloneJob(job.id);
        toast.success("Đã nhân bản tin tuyển dụng", `${job.title} (Bản sao)`);
        onClose();
    };

    const toggleLabel = job.status === "open" ? "Tạm dừng" : job.status === "paused" ? "Mở lại" : "Mở tin";
    const toggleIcon = job.status === "open" ? ToggleLeft : ToggleRight;

    const actions = [
        { icon: Eye, label: "Xem preview", onClick: handlePreview },
        { icon: Edit3, label: "Chỉnh sửa", onClick: handleEdit },
        { icon: Copy, label: "Nhân bản", onClick: handleClone },
        {
            icon: toggleIcon,
            label: toggleLabel,
            onClick: handleToggleStatus,
        },
        { icon: Trash2, label: "Xóa tin", onClick: handleDelete, danger: true },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-[rgba(145,158,171,0.12)] overflow-hidden z-50"
        >
            {actions.map((action, i) => (
                <button
                    key={i}
                    onClick={action.onClick}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${action.danger
                        ? "text-red-600 hover:bg-red-50"
                        : "text-slate-700 hover:bg-[#22c55e]/10"
                        }`}
                >
                    <action.icon className="w-4 h-4" />
                    {action.label}
                </button>
            ))}
        </motion.div>
    );
}

// Table Row component
function JobTableRow({ job, index }: { job: Job; index: number }) {
    const [showMenu, setShowMenu] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const { selectJob, setPreviewOpen, toggleJobStatus } = useJobStore();

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRowClick = () => {
        selectJob(job);
        setPreviewOpen(true);
    };

    return (
        <motion.tr
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group hover:bg-[#22c55e]/10 cursor-pointer transition-colors"
            onClick={handleRowClick}
        >
            <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[rgba(145,158,171,0.04)] to-[#22c55e]/5 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-[#22c55e]" />
                    </div>
                    <div>
                        <p className="font-semibold text-[#1C252E] group-hover:text-[#22c55e] transition-colors">
                            {job.title}
                        </p>
                        <p className="text-sm text-[#22c55e]">{job.department}</p>
                    </div>
                </div>
            </td>
            <td className="px-5 py-4">
                <div className="flex items-center gap-2 text-sm text-[#22c55e]">
                    <span className="px-2 py-1 bg-[#22c55e]/15 rounded-lg">{JOB_TYPES[job.type]}</span>
                </div>
            </td>
            <td className="px-5 py-4">
                <span className="text-sm text-[#22c55e]">{JOB_LEVELS[job.level]}</span>
            </td>
            <td className="px-5 py-4">
                <div className="flex items-center gap-1.5 text-sm text-[#22c55e]">
                    <MapPin className="w-4 h-4 text-[#22c55e]" />
                    {job.remote === "remote" ? "Remote" : job.location}
                </div>
            </td>
            <td className="px-5 py-4">
                <StatusBadge status={job.status} />
            </td>
            <td className="px-5 py-4">
                <div className="flex items-center gap-3 text-[#22c55e]">
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">{job.applicantCount}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#22c55e]">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{job.viewCount}</span>
                    </div>
                </div>
            </td>
            <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                <div ref={menuRef} className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-2 rounded-lg hover:bg-[#22c55e]/15 text-[#22c55e] hover:text-[#22c55e] transition-colors"
                    >
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                    <AnimatePresence>
                        {showMenu && <ActionMenu job={job} onClose={() => setShowMenu(false)} />}
                    </AnimatePresence>
                </div>
            </td>
        </motion.tr>
    );
}

// Grid Card component
function JobGridCard({ job, index }: { job: Job; index: number }) {
    const { selectJob, setPreviewOpen, toggleJobStatus } = useJobStore();

    const handleClick = () => {
        selectJob(job);
        setPreviewOpen(true);
    };

    const formatSalary = (min?: number, max?: number) => {
        if (!min && !max) return "Thỏa thuận";
        const format = (n: number) => (n / 1000000).toFixed(0) + "M";
        if (min && max) return `${format(min)} - ${format(max)}`;
        if (min) return `Từ ${format(min)}`;
        return `Đến ${format(max!)}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={handleClick}
            className="group relative bg-white rounded-2xl border border-[rgba(145,158,171,0.12)] p-5 shadow-lg hover:shadow-xl cursor-pointer transition-all overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[rgba(145,158,171,0.04)] to-[#22c55e]/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Status indicator */}
            <div className="absolute top-4 right-4">
                <StatusBadge status={job.status} />
            </div>

            {/* Content */}
            <div className="relative">
                {/* Icon and Title */}
                <div className="flex items-start gap-3 mb-4 pr-24">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center shadow-lg shadow-green-500/20">
                        <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#1C252E] group-hover:text-[#22c55e] transition-colors">
                            {job.title}
                        </h3>
                        <p className="text-sm text-[#22c55e]">{job.department}</p>
                    </div>
                </div>

                {/* Meta info */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[#22c55e]">
                        <MapPin className="w-4 h-4 text-[#22c55e]" />
                        {job.remote === "remote" ? "Remote" : job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#22c55e]">
                        <Clock className="w-4 h-4 text-[#22c55e]" />
                        {JOB_TYPES[job.type]} • {JOB_LEVELS[job.level]}
                    </div>
                    {(job.salaryMin || job.salaryMax) && (
                        <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                            💰 {formatSalary(job.salaryMin, job.salaryMax)} VND
                        </div>
                    )}
                </div>

                {/* Skills preview */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.mustHaveSkills.slice(0, 3).map((skill) => (
                        <span
                            key={skill.id}
                            className="px-2 py-0.5 bg-[#22c55e]/15 text-[#22c55e] rounded-full text-xs font-medium"
                        >
                            {skill.name}
                        </span>
                    ))}
                    {job.mustHaveSkills.length > 3 && (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs">
                            +{job.mustHaveSkills.length - 3}
                        </span>
                    )}
                </div>

                {/* Footer stats */}
                <div className="flex items-center justify-between pt-4 border-t border-[rgba(145,158,171,0.12)]">
                    <div className="flex items-center gap-4 text-sm text-[#22c55e]">
                        <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {job.applicantCount} ứng viên
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {job.viewCount}
                        </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#22c55e] group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </motion.div>
    );
}

export function JobTable({ jobs, viewMode }: JobTableProps) {
    if (jobs.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white/80 backdrop-blur-xl rounded-2xl border border-[rgba(145,158,171,0.12)]"
            >
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[rgba(145,158,171,0.04)] to-[#22c55e]/5 flex items-center justify-center">
                    <Briefcase className="w-10 h-10 text-[#22c55e]" />
                </div>
                <h3 className="text-xl font-bold text-[#1C252E] mb-2">Chưa có tin tuyển dụng</h3>
                <p className="text-[#22c55e] mb-6">
                    Bắt đầu tạo tin tuyển dụng đầu tiên cho công ty của bạn
                </p>
                <button
                    onClick={() => useJobStore.getState().setFormOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold shadow-lg"
                >
                    Tạo tin tuyển dụng
                </button>
            </motion.div>
        );
    }

    if (viewMode === "grid") {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {jobs.map((job, index) => (
                    <JobGridCard key={job.id} job={job} index={index} />
                ))}
            </div>
        );
    }

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-[rgba(145,158,171,0.12)] shadow-lg overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="bg-gradient-to-r from-[rgba(145,158,171,0.04)] to-[#22c55e]/5 border-b border-[rgba(145,158,171,0.12)]">
                        <th className="px-5 py-4 text-left text-sm font-semibold text-[#22c55e]">
                            Vị trí tuyển dụng
                        </th>
                        <th className="px-5 py-4 text-left text-sm font-semibold text-[#22c55e]">
                            Loại
                        </th>
                        <th className="px-5 py-4 text-left text-sm font-semibold text-[#22c55e]">
                            Cấp bậc
                        </th>
                        <th className="px-5 py-4 text-left text-sm font-semibold text-[#22c55e]">
                            Địa điểm
                        </th>
                        <th className="px-5 py-4 text-left text-sm font-semibold text-[#22c55e]">
                            Trạng thái
                        </th>
                        <th className="px-5 py-4 text-left text-sm font-semibold text-[#22c55e]">
                            Ứng viên
                        </th>
                        <th className="px-5 py-4 text-left text-sm font-semibold text-[#22c55e]">
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-sky-50">
                    {jobs.map((job, index) => (
                        <JobTableRow key={job.id} job={job} index={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

