"use client";

import * as React from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import {
    Briefcase,
    Plus,
    Search,
    TrendingUp,
    Users,
    Eye,
    CheckCircle2,
    Clock,
    ChevronDown,
    Sparkles,
    Zap,
    Target,
    Filter,
    LayoutGrid,
    List,
    MoreHorizontal,
    Edit3,
    Trash2,
    Copy,
    MapPin,
    DollarSign,
    Star,
    ArrowUpRight,
    Building2,
    Calendar,
    Pause,
    Play,
    ChevronRight,
    X,
    RotateCcw,
    Archive,
    AlertTriangle,
} from "lucide-react";
import { useJobStore } from "../stores/job-store";
import { JobFormModal } from "./JobFormModal";
import { JobPreviewPanel } from "./JobPreviewPanel";
import { ApplicantPanel } from "./ApplicantPanel";
import { Job, JOB_TYPES, JOB_STATUSES, JOB_LEVELS, JobStatus, JobType, DEPARTMENTS } from "../types/job";
import { FloatingElements, BentoItem } from "../../hr-company/components/ui/premium-effects";
import { useToastHelpers } from "@/shared/components/ui/toast";

type SortOption = "newest" | "oldest" | "applicants" | "views";
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Mới nhất" },
    { value: "oldest", label: "Cũ nhất" },
    { value: "applicants", label: "Nhiều ứng viên" },
    { value: "views", label: "Nhiều lượt xem" },
];

// Deadline helper
function getDeadlineInfo(deadline?: string) {
    if (!deadline) return null;
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffMs = deadlineDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return { label: "Đã hết hạn", urgent: true, expired: true, daysLeft };
    if (daysLeft <= 3) return { label: `Còn ${daysLeft} ngày`, urgent: true, expired: false, daysLeft };
    if (daysLeft <= 7) return { label: `Còn ${daysLeft} ngày`, urgent: false, expired: false, daysLeft };
    return null; // more than 7 days - don't show
}

// Animated Number with easing
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const [displayValue, setDisplayValue] = React.useState(value);
    const spring = useSpring(value, { stiffness: 50, damping: 20 });

    React.useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    useMotionValueEvent(spring, "change", (latest) => {
        setDisplayValue(Math.floor(latest));
    });

    return (
        <span>
            {displayValue.toLocaleString("vi-VN")}
            {suffix}
        </span>
    );
}

// Premium Stat Card with 3D hover
function StatCard3D({
    icon: Icon,
    label,
    value,
    trend,
    gradient,
    delay,
}: {
    icon: React.ElementType;
    label: string;
    value: number;
    trend?: string;
    gradient: string;
    delay: number;
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-50, 50], [8, -8]);
    const rotateY = useTransform(x, [-50, 50], [-8, 8]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay, type: "spring", stiffness: 150 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative perspective-1000"
        >
            <div
                className={`relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br ${gradient} shadow-2xl hover:shadow-3xl transition-all group cursor-pointer`}
            >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Floating orbs */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

                <div className="relative flex items-start justify-between">
                    <div>
                        <p className="text-white/80 text-sm font-medium mb-1">{label}</p>
                        <p className="text-4xl font-bold text-white tracking-tight">
                            <AnimatedCounter value={value} />
                        </p>
                        {trend && (
                            <div className="flex items-center gap-1 mt-2 text-white/70 text-xs">
                                <TrendingUp className="w-3 h-3" />
                                {trend}
                            </div>
                        )}
                    </div>
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner"
                    >
                        <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

// Department gradient map
const DEPT_GRADIENTS: Record<string, { bg: string; text: string; accent: string; icon: string }> = {
    Engineering: { bg: "from-violet-500 via-purple-500 to-[#10b981]", text: "text-violet-700", accent: "bg-violet-500", icon: "bg-violet-100 text-violet-600" },
    Design: { bg: "from-pink-500 via-rose-500 to-fuchsia-600", text: "text-pink-700", accent: "bg-pink-500", icon: "bg-pink-100 text-pink-600" },
    "Data Science": { bg: "from-[#22c55e] via-teal-500 to-emerald-600", text: "text-teal-700", accent: "bg-teal-500", icon: "bg-teal-100 text-teal-600" },
    DevOps: { bg: "from-orange-500 via-amber-500 to-yellow-600", text: "text-orange-700", accent: "bg-orange-500", icon: "bg-orange-100 text-orange-600" },
    QA: { bg: "from-[#22c55e] via-[#10b981] to-[#10b981]", text: "text-[#22c55e]", accent: "bg-[#22c55e]", icon: "bg-[#22c55e]/15 text-[#22c55e]" },
    Marketing: { bg: "from-red-500 via-rose-500 to-pink-600", text: "text-red-700", accent: "bg-red-500", icon: "bg-red-100 text-red-600" },
    HR: { bg: "from-green-500 via-emerald-500 to-teal-600", text: "text-green-700", accent: "bg-green-500", icon: "bg-green-100 text-green-600" },
};
const DEFAULT_DEPT = { bg: "from-[#22c55e] via-[#10b981] to-[#10b981]", text: "text-[#22c55e]", accent: "bg-[#22c55e]", icon: "bg-[#22c55e]/15 text-[#22c55e]" };

// Job Card component - Ultra Premium design
const JobCard = React.memo(function JobCard({ job, index, onViewApplicants }: { job: Job; index: number; onViewApplicants: (job: Job) => void }) {
    const { selectJob, setPreviewOpen, toggleJobStatus, deleteJob, restoreJob, cloneJob, setFormOpen } = useJobStore();
    const toast = useToastHelpers();
    const deadlineInfo = getDeadlineInfo(job.deadline);
    const dept = DEPT_GRADIENTS[job.department] || DEFAULT_DEPT;

    const statusConfig = JOB_STATUSES[job.status];
    const statusColors: Record<string, string> = {
        OPEN: "from-green-500 to-emerald-600",
        CLOSED: "from-slate-400 to-slate-500",
        DRAFT: "from-[#22c55e] to-[#10b981]",
    };

    const formatSalary = (min?: number, max?: number) => {
        if (!min && !max) return "Thỏa thuận";
        const f = (n: number) => (n / 1000000).toFixed(0);
        if (min && max) return `${f(min)} - ${f(max)}M`;
        if (min) return `Từ ${f(min)}M`;
        return `Đến ${f(max!)}M`;
    };

    const handleCardClick = () => {
        selectJob(job);
        setPreviewOpen(true);
    };

    const pauseTitle = job.status === "OPEN" ? "Tạm dừng" : "Mở tin";

    const handlePause = (e: React.MouseEvent) => {
        e.stopPropagation();
        const wasDraft = job.status === "DRAFT";
        toggleJobStatus(job.id);
        toast.success(
            wasDraft ? "Đã mở lại tin tuyển dụng" : "Đã chuyển về bản nháp",
            job.title,
            { label: "Hoàn tác", onClick: () => toggleJobStatus(job.id) }
        );
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteJob(job.id);
        toast.warning(
            "Đã chuyển vào mục Đã đóng",
            job.title,
            { label: "Hoàn tác", onClick: () => restoreJob(job.id) }
        );
    };

    const handleClone = (e: React.MouseEvent) => {
        e.stopPropagation();
        cloneJob(job.id);
        toast.success("Đã nhân bản tin tuyển dụng", `${job.title} (Bản sao)`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ delay: Math.min(index * 0.03, 0.3) }}
            className="group relative"
        >
            <div
                onClick={handleCardClick}
                className={`relative bg-gradient-to-br from-white dark:from-[#1C252E] to-[#22c55e]/5 dark:to-[#1C252E] backdrop-blur-xl rounded-3xl border cursor-pointer transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1.5 hover:scale-[1.01] hover:from-[rgba(145,158,171,0.04)] hover:to-[#22c55e]/5 dark:hover:from-[#1E2C38] dark:hover:to-[#1E2C38] ${job.status === "DRAFT"
                    ? "border-[#22c55e]/30 dark:border-white/[0.06] opacity-75 grayscale-[20%]"
                    : "border-[#22c55e]/30 dark:border-white/[0.08] shadow-lg shadow-[#22c55e]/20[0.06]"
                    }`}
            >


                <div className="p-5 pb-4 pl-6">
                    {/* Header row: Department icon + Status badge */}
                    <div className="flex items-start justify-between mb-4">
                        <motion.div
                            whileHover={{ rotate: 8, scale: 1.05 }}
                            className="w-12 h-12 rounded-2xl bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.06] flex items-center justify-center border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]"
                        >
                            <Briefcase className="w-6 h-6 text-[#637381] dark:text-[#919EAB]" />
                        </motion.div>
                        <div className="flex items-center gap-2">
                            {/* Deadline warning */}
                            {deadlineInfo && job.status === "OPEN" && (
                                <div className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 ${deadlineInfo.expired
                                    ? "bg-red-50 text-red-600 border border-red-100"
                                    : deadlineInfo.urgent
                                        ? "bg-amber-50 text-amber-600 border border-amber-100 animate-pulse"
                                        : "bg-[#22c55e]/10 text-[#22c55e] border border-[rgba(145,158,171,0.12)]"
                                    }`}>
                                    <Clock className="w-2.5 h-2.5" />
                                    {deadlineInfo.label}
                                </div>
                            )}
                            <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold text-white bg-gradient-to-r ${statusColors[job.status]} shadow-sm`}>
                                {job.status === "OPEN" && (
                                    <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse" />
                                )}
                                {statusConfig.label}
                            </div>
                        </div>
                    </div>

                    {/* Title & Department */}
                    <div className="mb-3">
                        <h3 className="font-bold text-[15px] text-[#1C252E] dark:text-white truncate leading-tight group-hover:text-[#22c55e] transition-all">
                            {job.title}
                        </h3>
                        <p className="text-xs mt-1 font-semibold text-[#637381] dark:text-[#919EAB] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#919EAB] dark:bg-[#637381]" />
                            {job.department}
                        </p>
                    </div>

                    {/* Info row - compact inline */}
                    <div className="flex items-center gap-2 text-[11px] text-[#637381] dark:text-[#919EAB] mb-3 flex-wrap">
                        <span className="flex items-center gap-1 bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.04] px-2 py-0.5 rounded-lg">
                            <MapPin className="w-3 h-3 text-[#919EAB]" />
                            {job.remote === "remote" ? "Remote" : job.location}
                        </span>
                        <span className="flex items-center gap-1 bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.04] px-2 py-0.5 rounded-lg">
                            <Clock className="w-3 h-3 text-[#919EAB]" />
                            {JOB_TYPES[job.type]}
                        </span>
                        <span className="flex items-center gap-1 bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.04] px-2 py-0.5 rounded-lg font-semibold">
                            <DollarSign className="w-3 h-3 text-[#919EAB]" />
                            {formatSalary(job.salaryMin, job.salaryMax)}
                        </span>
                    </div>

                    {/* Skills - refined chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {job.mustHaveSkills.slice(0, 3).map((skill) => (
                            <span
                                key={skill.id}
                                className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold border border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] text-[#637381] dark:text-[#919EAB] bg-[rgba(145,158,171,0.06)] dark:bg-white/[0.03]"
                            >
                                {skill.name}
                            </span>
                        ))}
                        {job.mustHaveSkills.length > 3 && (
                            <span className="px-2 py-0.5 bg-[rgba(145,158,171,0.06)] dark:bg-white/[0.03] text-[#919EAB] rounded-lg text-[10px] font-medium border border-[rgba(145,158,171,0.2)] dark:border-white/[0.08]">
                                +{job.mustHaveSkills.length - 3}
                            </span>
                        )}
                    </div>

                    {/* Bottom section: Stats + Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-[rgba(145,158,171,0.12)] dark:border-white/[0.06]">
                        {/* Mini stat pills */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 px-2 py-1 bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.04] rounded-lg" title="Ứng viên">
                                <Users className="w-3 h-3 text-[#919EAB]" />
                                <span className="text-[11px] font-bold text-[#637381] dark:text-[#919EAB]">{job.applicantCount}</span>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.04] rounded-lg" title="Lượt xem">
                                <Eye className="w-3 h-3 text-[#919EAB]" />
                                <span className="text-[11px] font-bold text-[#637381] dark:text-[#919EAB]">{job.viewCount}</span>
                            </div>
                        </div>

                        {/* Action buttons - neutral, only color on individual hover */}
                        <div className="flex items-center gap-0.5 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onViewApplicants(job);
                                }}
                                className="p-1.5 rounded-lg text-[#919EAB] dark:text-[#637381] hover:text-[#22c55e] dark:hover:text-[#22c55e] hover:bg-[rgba(145,158,171,0.08)] dark:hover:bg-white/[0.06] transition-colors"
                                title="Xem ứng viên"
                            >
                                <Users className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    selectJob(job);
                                    setFormOpen(true);
                                }}
                                className="p-1.5 rounded-lg text-[#919EAB] dark:text-[#637381] hover:text-[#22c55e] dark:hover:text-[#22c55e] hover:bg-[rgba(145,158,171,0.08)] dark:hover:bg-white/[0.06] transition-colors"
                                title="Chỉnh sửa"
                            >
                                <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={handleClone}
                                className="p-1.5 rounded-lg text-[#919EAB] dark:text-[#637381] hover:text-[#22c55e] dark:hover:text-[#22c55e] hover:bg-[rgba(145,158,171,0.08)] dark:hover:bg-white/[0.06] transition-colors"
                                title="Nhân bản"
                            >
                                <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={handlePause}
                                className="p-1.5 rounded-lg text-[#919EAB] dark:text-[#637381] hover:text-amber-500 dark:hover:text-amber-400 hover:bg-[rgba(145,158,171,0.08)] dark:hover:bg-white/[0.06] transition-colors"
                                title={pauseTitle}
                            >
                                {job.status === "OPEN" ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            </button>
                            <button
                                onClick={handleDelete}
                                className="p-1.5 rounded-lg text-[#919EAB] dark:text-[#637381] hover:text-red-500 dark:hover:text-red-400 hover:bg-[rgba(145,158,171,0.08)] dark:hover:bg-white/[0.06] transition-colors"
                                title="Xóa tin"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

// Quick Filter Pills
function FilterPills({
    filters,
    setFilters,
}: {
    filters: { status: string };
    setFilters: (f: { status: JobStatus | "all" }) => void;
}) {
    const statuses = [
        { value: "all", label: "Tất cả", icon: LayoutGrid },
        { value: "OPEN", label: "Đang tuyển", icon: CheckCircle2, color: "green" },
        { value: "CLOSED", label: "Đã đóng", icon: X, color: "slate" },
        { value: "DRAFT", label: "Bản nháp", icon: Edit3, color: "sky" },
    ];

    return (
        <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
                <button
                    key={status.value}
                    onClick={() => setFilters({ status: status.value as JobStatus | "all" })}
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${filters.status === status.value
                        ? "bg-gradient-to-r from-[#22c55e] to-[#10b981] text-white shadow-lg shadow-green-500/20"
                        : "bg-white dark:bg-[#1C252E] text-[#22c55e] dark:text-[#919EAB] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] hover:border-[#22c55e]/30 dark:hover:border-[#22c55e]/30 hover:scale-105"
                        }`}
                >
                    <status.icon className="w-4 h-4" />
                    {status.label}
                </button>
            ))}
        </div>
    );
}

// Closed Jobs Archive Section
function ClosedJobsSection() {
    const { getClosedJobs, restoreJob, permanentDeleteJob } = useJobStore();
    const closedJobs = getClosedJobs();
    const [isExpanded, setIsExpanded] = React.useState(false);

    if (closedJobs.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10"
        >
            {/* Toggle header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-3 mb-4 group w-full text-left"
            >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[rgba(145,158,171,0.04)] to-[#10b981] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Archive className="w-5 h-5 text-[#22c55e]" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#1C252E] dark:text-white flex items-center gap-2">
                        Tin đã đóng
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600 border border-red-200">
                            {closedJobs.length}
                        </span>
                    </h3>
                    <p className="text-sm text-[#637381] dark:text-[#919EAB]">Bạn có thể khôi phục hoặc xóa vĩnh viễn</p>
                </div>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-5 h-5 text-[#22c55e]" />
                </motion.div>
            </button>

            {/* Closed jobs list */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-3">
                            {closedJobs.map((job, i) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10, scale: 0.95 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-4 p-4 bg-white/70 dark:bg-[#1C252E] backdrop-blur-xl rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] shadow-md hover:shadow-lg transition-all group"
                                >
                                    {/* Job icon */}
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[rgba(145,158,171,0.04)] to-[#10b981] flex items-center justify-center flex-shrink-0 opacity-60">
                                        <Briefcase className="w-6 h-6 text-[#22c55e]" />
                                    </div>

                                    {/* Job info */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-[#1C252E] dark:text-white truncate">{job.title}</h4>
                                        <div className="flex items-center gap-3 text-sm text-[#637381] dark:text-[#919EAB] mt-0.5">
                                            <span className="flex items-center gap-1">
                                                <Building2 className="w-3.5 h-3.5" />
                                                {job.department}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-3.5 h-3.5" />
                                                {job.applicantCount} ứng viên
                                            </span>
                                        </div>
                                    </div>

                                    {/* Status badge */}
                                    <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-red-100 text-red-600 border border-red-200">
                                        Đã đóng
                                    </span>

                                    {/* Action buttons */}
                                    <div className="flex items-center gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.08 }}
                                            whileTap={{ scale: 0.92 }}
                                            onClick={() => restoreJob(job.id)}
                                            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-xs font-bold shadow-lg shadow-green-500/20 hover:shadow-xl transition-all"
                                        >
                                            <RotateCcw className="w-3.5 h-3.5" />
                                            Khôi phục
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.08 }}
                                            whileTap={{ scale: 0.92 }}
                                            onClick={() => {
                                                if (confirm(`Xóa vĩnh viễn "${job.title}"? Hành động này không thể hoàn tác!`)) {
                                                    permanentDeleteJob(job.id);
                                                }
                                            }}
                                            className="flex items-center gap-1.5 px-4 py-2 bg-white text-red-600 rounded-full text-xs font-bold border-2 border-red-200 hover:bg-red-50 hover:border-red-400 transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            Xóa vĩnh viễn
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function JobListView() {
    const {
        filters,
        setFilters,
        getFilteredJobs,
        getJobStats,
        setFormOpen,
        isFormOpen,
        isPreviewOpen,
        selectedJob,
    } = useJobStore();

    const [searchValue, setSearchValue] = React.useState("");
    const [applicantJob, setApplicantJob] = React.useState<Job | null>(null);
    const [sortBy, setSortBy] = React.useState<SortOption>("newest");
    const [showSortMenu, setShowSortMenu] = React.useState(false);
    const jobs = getFilteredJobs();
    const stats = getJobStats();

    // Filter by search + sort
    const filteredJobs = React.useMemo(() => {
        let result = jobs;
        if (searchValue) {
            const q = searchValue.toLowerCase();
            result = result.filter(
                (j) =>
                    j.title.toLowerCase().includes(q) ||
                    j.department.toLowerCase().includes(q)
            );
        }
        // Sort
        return [...result].sort((a, b) => {
            switch (sortBy) {
                case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case "oldest": return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case "applicants": return b.applicantCount - a.applicantCount;
                case "views": return b.viewCount - a.viewCount;
                default: return 0;
            }
        });
    }, [jobs, searchValue, sortBy]);

    return (
        <div className="relative bg-gradient-to-br from-[rgba(145,158,171,0.04)] via-white to-green-50/30 dark:from-[#141A21] dark:via-[#141A21] dark:to-[#141A21] -m-6 px-6 pb-16">

            {/* Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative z-10 container mx-auto px-0 pt-6 pb-16 max-w-7xl"
            >
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400 text-sm font-medium mb-4"
                    >
                        <Zap className="w-4 h-4" />
                        Quản lý tuyển dụng thông minh
                    </motion.div>
                    <h1 className="text-4xl sm:text-5xl font-bold">
                        <span className="text-[#1C252E] dark:text-white">Tin </span>
                        <span className="relative">
                            <span className="bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#10b981] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                Tuyển dụng
                            </span>
                            <motion.span
                                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -right-6 -top-2"
                            >
                                <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            </motion.span>
                        </span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-[#22c55e] dark:text-[#C4CDD5] mt-3 text-lg"
                    >
                        Tạo và quản lý vị trí tuyển dụng, thu hút ứng viên chất lượng
                    </motion.p>
                </motion.div>

                {/* Stats Grid - 3D Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
                    <StatCard3D
                        icon={Briefcase}
                        label="Tổng tin đăng"
                        value={stats.total}
                        gradient="from-[#22c55e] via-[#10b981] to-[#10b981]"
                        delay={0.1}
                    />
                    <StatCard3D
                        icon={CheckCircle2}
                        label="Đang tuyển"
                        value={stats.open}
                        trend="+2 tuần này"
                        gradient="from-green-500 via-emerald-500 to-teal-600"
                        delay={0.2}
                    />
                    <StatCard3D
                        icon={Pause}
                        label="Tạm dừng"
                        value={stats.paused}
                        gradient="from-amber-400 via-orange-500 to-amber-600"
                        delay={0.25}
                    />
                    <StatCard3D
                        icon={Users}
                        label="Ứng viên"
                        value={stats.applicants}
                        trend="+15% tháng này"
                        gradient="from-purple-500 via-violet-500 to-[#10b981]"
                        delay={0.3}
                    />
                    <StatCard3D
                        icon={Eye}
                        label="Lượt xem"
                        value={stats.views}
                        gradient="from-orange-500 via-amber-500 to-yellow-500"
                        delay={0.4}
                    />
                </div>

                {/* Actions Bar */}
                <BentoItem delay={0.3} className="mb-8 !overflow-visible relative z-20">
                    <div className="p-5">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#22c55e]" />
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    placeholder="Tìm kiếm tin tuyển dụng..."
                                    className="w-full pl-12 pr-4 py-3 bg-[#22c55e]/10 dark:bg-white/[0.04] border-2 border-transparent focus:border-[#22c55e]/30 dark:focus:border-[#22c55e]/30 rounded-2xl text-[#1C252E] dark:text-white placeholder:text-[#22c55e] dark:placeholder:text-[#637381] focus:outline-none transition-all"
                                />
                            </div>

                            {/* Filter Pills */}
                            <FilterPills filters={filters} setFilters={setFilters} />

                            <div className="flex items-center gap-3">
                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowSortMenu(!showSortMenu)}
                                        className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-[#1C252E] border-2 border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] hover:border-[#22c55e]/30 dark:hover:border-[#22c55e]/30 text-[#22c55e] dark:text-[#919EAB] rounded-2xl text-sm font-medium transition-all"
                                    >
                                        <Filter className="w-4 h-4" />
                                        {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                                        <ChevronDown className={`w-4 h-4 transition-transform ${showSortMenu ? "rotate-180" : ""}`} />
                                    </motion.button>
                                    <AnimatePresence>
                                        {showSortMenu && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute top-full mt-2 right-0 w-48 bg-white/95 dark:bg-[#1C252E] backdrop-blur-xl rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] shadow-xl dark:shadow-black/40 z-50 overflow-hidden"
                                            >
                                                {SORT_OPTIONS.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => { setSortBy(option.value); setShowSortMenu(false); }}
                                                        className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors flex items-center gap-2 ${sortBy === option.value
                                                            ? "bg-[#22c55e]/10 dark:bg-[#22c55e]/20 text-[#22c55e] dark:text-[#22c55e]"
                                                            : "text-[#22c55e] dark:text-[#919EAB] hover:bg-[#22c55e]/10 dark:hover:bg-white/[0.04]"
                                                            }`}
                                                    >
                                                        {sortBy === option.value && <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />}
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Create Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setFormOpen(true)}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-green-500/30 hover:shadow-xl transition-all whitespace-nowrap"
                                >
                                    <Plus className="w-5 h-5" />
                                    Tạo tin mới
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </BentoItem>

                {/* Jobs Grid */}
                {filteredJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredJobs.map((job, index) => (
                            <JobCard key={job.id} job={job} index={index} onViewApplicants={(j) => setApplicantJob(j)} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[rgba(145,158,171,0.04)] to-[#22c55e]/5 flex items-center justify-center">
                            <Briefcase className="w-12 h-12 text-[#22c55e]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1C252E] dark:text-white mb-2">
                            Chưa có tin tuyển dụng
                        </h3>
                        <p className="text-[#22c55e] dark:text-[#919EAB] mb-8">
                            Bắt đầu tạo tin tuyển dụng đầu tiên để thu hút ứng viên
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFormOpen(true)}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold shadow-xl"
                        >
                            <Plus className="w-5 h-5" />
                            Tạo tin tuyển dụng đầu tiên
                        </motion.button>
                    </motion.div>
                )}

                {/* Closed Jobs Archive */}
                <ClosedJobsSection />

                {/* CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12"
                >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#10b981] p-8 text-white shadow-2xl">
                        <div className="absolute inset-0 opacity-10">
                            <svg width="100%" height="100%">
                                <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <circle cx="20" cy="20" r="1.5" fill="white" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#dots)" />
                            </svg>
                        </div>

                        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">
                                    🚀 Tăng hiệu quả tuyển dụng với AI
                                </h3>
                                <p className="text-white/80">
                                    SmartHire sử dụng AI để gợi ý ứng viên phù hợp nhất cho vị trí của bạn
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-3 bg-white text-[#22c55e] rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 whitespace-nowrap"
                            >
                                Khám phá ngay
                                <ArrowUpRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* CSS for gradient animation */}
            <style jsx global>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
            `}</style>

            {/* Modals */}
            <AnimatePresence>
                {isFormOpen && <JobFormModal />}
                {isPreviewOpen && selectedJob && <JobPreviewPanel />}
                {applicantJob && (
                    <ApplicantPanel
                        job={applicantJob}
                        onClose={() => setApplicantJob(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

