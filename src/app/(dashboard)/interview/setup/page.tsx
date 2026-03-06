"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    BrainCircuit,
    FileText,
    Briefcase,
    ChevronRight,
    Check,
    Sparkles,
    ArrowRight,
    Search,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";
import { mockCVVersions, CVVersion } from "@/features/cv/types/cv-versions";
import { mockJobs } from "@/features/jobs/types/mock-jobs";
import { Job } from "@/features/jobs/types/job";

// ─── Step Indicator ──────────────────────────────────
function StepIndicator({ current }: { readonly current: 1 | 2 | 3 }) {
    const steps = [
        { num: 1, label: "Chọn CV" },
        { num: 2, label: "Chọn vị trí" },
        { num: 3, label: "Xác nhận" },
    ];

    return (
        <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((step, i) => (
                <div key={step.num} className="flex items-center gap-2">
                    <div
                        className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                            current > step.num
                                ? "bg-emerald-500 text-white"
                                : current === step.num
                                    ? "bg-sky-600 text-white shadow-lg shadow-sky-500/30"
                                    : "bg-[rgba(145,158,171,0.12)] dark:bg-white/[0.06] text-[#919EAB]"
                        )}>
                        {current > step.num ? <Check className="w-4 h-4" /> : step.num}
                    </div>
                    <span
                        className={cn(
                            "text-xs font-medium hidden sm:block",
                            current >= step.num ? "text-[#1C252E] dark:text-white" : "text-[#919EAB]"
                        )}>
                        {step.label}
                    </span>
                    {i < steps.length - 1 && (
                        <div
                            className={cn(
                                "w-8 h-0.5 rounded-full mx-1",
                                current > step.num ? "bg-emerald-400" : "bg-[rgba(145,158,171,0.2)] dark:bg-white/[0.1]"
                            )}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

// ─── CV Selection Card ───────────────────────────────
function CVCard({
    cv,
    selected,
    onSelect,
}: {
    readonly cv: CVVersion;
    readonly selected: boolean;
    readonly onSelect: () => void;
}) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSelect}
            className={cn(
                "w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer",
                selected
                    ? "border-sky-500 bg-sky-50/80 dark:bg-sky-900/20 shadow-lg shadow-sky-500/10"
                    : "border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] bg-white dark:bg-[#1C252E] hover:border-sky-200 dark:hover:border-sky-700/50 hover:shadow-md"
            )}>
            <div className="flex items-center gap-3">
                <div
                    className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                        selected ? "bg-sky-500 text-white" : "bg-[rgba(145,158,171,0.1)] dark:bg-white/[0.06] text-[#919EAB]"
                    )}>
                    <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#1C252E] dark:text-white truncate">{cv.name}</h4>
                    <p className="text-xs text-[#919EAB] mt-0.5">
                        {cv.templateName} • {cv.data.personalInfo.fullName}
                    </p>
                </div>
                {selected && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center shrink-0"
                    >
                        <Check className="w-3.5 h-3.5 text-white" />
                    </motion.div>
                )}
            </div>
        </motion.button>
    );
}

// ─── Job Selection Card ──────────────────────────────
function JobCard({
    job,
    selected,
    onSelect,
}: {
    readonly job: Job;
    readonly selected: boolean;
    readonly onSelect: () => void;
}) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSelect}
            className={cn(
                "w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer",
                selected
                    ? "border-sky-500 bg-sky-50/80 dark:bg-sky-900/20 shadow-lg shadow-sky-500/10"
                    : "border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] bg-white dark:bg-[#1C252E] hover:border-sky-200 dark:hover:border-sky-700/50 hover:shadow-md"
            )}>
            <div className="flex items-center gap-3">
                <img
                    src={job.logoUrl}
                    alt={job.company}
                    className="w-10 h-10 rounded-xl object-cover shrink-0 bg-[rgba(145,158,171,0.1)] dark:bg-white/[0.06]"
                />
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#1C252E] dark:text-white truncate">{job.title}</h4>
                    <p className="text-xs text-[#919EAB] mt-0.5">
                        {job.company} • {job.location} • {job.level}
                    </p>
                </div>
                {selected && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center shrink-0"
                    >
                        <Check className="w-3.5 h-3.5 text-white" />
                    </motion.div>
                )}
            </div>
            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
                {job.skills.slice(0, 4).map((skill) => (
                    <span
                        key={skill}
                        className="px-2 py-0.5 text-[10px] font-medium bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400 rounded-full"
                    >
                        {skill}
                    </span>
                ))}
                {job.skills.length > 4 && (
                    <span className="px-2 py-0.5 text-[10px] font-medium bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.05] text-[#919EAB] rounded-full">
                        +{job.skills.length - 4}
                    </span>
                )}
            </div>
        </motion.button>
    );
}

// ─── Confirmation Summary ────────────────────────────
function ConfirmationStep({
    cv,
    job,
}: {
    readonly cv: CVVersion;
    readonly job: Job;
}) {
    return (
        <div className="space-y-4">
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-2xl p-5 border border-sky-100 dark:border-sky-800/30">
                <p className="text-xs font-semibold text-sky-500 uppercase tracking-wider mb-3">
                    Tóm tắt phỏng vấn
                </p>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white dark:bg-white/[0.06] flex items-center justify-center shadow-sm">
                            <FileText className="w-4 h-4 text-sky-600" />
                        </div>
                        <div>
                            <p className="text-xs text-[#919EAB]">CV đã chọn</p>
                            <p className="text-sm font-semibold text-[#1C252E] dark:text-white">{cv.name}</p>
                        </div>
                    </div>
                    <div className="h-px bg-sky-100 dark:bg-sky-800/30" />
                    <div className="flex items-center gap-3">
                        <img
                            src={job.logoUrl}
                            alt={job.company}
                            className="w-9 h-9 rounded-lg object-cover bg-white dark:bg-white/[0.06] shadow-sm"
                        />
                        <div>
                            <p className="text-xs text-[#919EAB]">Vị trí ứng tuyển</p>
                            <p className="text-sm font-semibold text-[#1C252E] dark:text-white">{job.title}</p>
                            <p className="text-xs text-[#637381] dark:text-[#919EAB]">{job.company}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30 rounded-2xl p-4">
                <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-xs font-semibold text-amber-800 dark:text-amber-400">AI sẽ tạo câu hỏi phỏng vấn</p>
                        <p className="text-xs text-amber-600 dark:text-amber-500 mt-0.5">
                            Dựa trên CV và yêu cầu công việc, AI sẽ đặt các câu hỏi phù hợp với vị trí {job.level} tại {job.company}.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ───────────────────────────────────────
export default function InterviewSetupPage() {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedCVId, setSelectedCVId] = useState<string | null>(null);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    const [jobSearch, setJobSearch] = useState("");

    const selectedCV = useMemo(
        () => mockCVVersions.find((cv) => cv.id === selectedCVId) ?? null,
        [selectedCVId]
    );

    const selectedJob = useMemo(
        () => mockJobs.find((j) => j.id === selectedJobId) ?? null,
        [selectedJobId]
    );

    const filteredJobs = useMemo(() => {
        if (!jobSearch.trim()) return mockJobs;
        const q = jobSearch.toLowerCase();
        return mockJobs.filter(
            (j) =>
                j.title.toLowerCase().includes(q) ||
                j.company.toLowerCase().includes(q) ||
                j.skills.some((s) => s.toLowerCase().includes(q))
        );
    }, [jobSearch]);

    const handleNext = () => {
        if (step === 1 && selectedCV) setStep(2);
        if (step === 2 && selectedJob) setStep(3);
    };

    const handleBack = () => {
        if (step === 2) setStep(1);
        if (step === 3) setStep(2);
    };

    const handleStart = () => {
        // Navigate to interview session (future F12-1202)
        router.push(`/interview/session?cv=${selectedCVId}&job=${selectedJobId}`);
    };

    return (
        <section className="relative z-10 pt-6 pb-8 md:pt-8 md:pb-12">
            <div className="mx-auto max-w-xl px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6"
                >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-sky-500/20">
                        <BrainCircuit className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-[#1C252E] dark:text-white">
                        Phỏng vấn thử với AI
                    </h1>
                    <p className="text-sm text-[#637381] dark:text-[#919EAB] mt-1">
                        Chọn CV và vị trí để bắt đầu buổi phỏng vấn mô phỏng
                    </p>
                </motion.div>

                {/* Step Indicator */}
                <StepIndicator current={step} />

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <FileText className="w-4 h-4 text-sky-600" />
                                <h2 className="text-sm font-bold text-[#1C252E] dark:text-white">Chọn CV của bạn</h2>
                            </div>
                            <div className="space-y-3">
                                {mockCVVersions.map((cv) => (
                                    <CVCard
                                        key={cv.id}
                                        cv={cv}
                                        selected={selectedCVId === cv.id}
                                        onSelect={() => setSelectedCVId(cv.id)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Briefcase className="w-4 h-4 text-sky-600" />
                                <h2 className="text-sm font-bold text-[#1C252E] dark:text-white">Chọn vị trí phỏng vấn</h2>
                            </div>

                            {/* Search */}
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm theo tên, công ty, kỹ năng..."
                                    value={jobSearch}
                                    onChange={(e) => setJobSearch(e.target.value)}
                                    className="w-full h-10 pl-9 pr-4 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-all"
                                />
                            </div>

                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                                {filteredJobs.map((job) => (
                                    <JobCard
                                        key={job.id}
                                        job={job}
                                        selected={selectedJobId === job.id}
                                        onSelect={() => setSelectedJobId(job.id)}
                                    />
                                ))}
                                {filteredJobs.length === 0 && (
                                    <p className="text-center text-sm text-slate-400 py-8">
                                        Không tìm thấy vị trí phù hợp.
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && selectedCV && selectedJob && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-4 h-4 text-sky-600" />
                                <h2 className="text-sm font-bold text-[#1C252E] dark:text-white">Xác nhận & bắt đầu</h2>
                            </div>
                            <ConfirmationStep cv={selectedCV} job={selectedJob} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-between mt-8"
                >
                    {step > 1 ? (
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            className="text-sm text-[#637381] dark:text-[#919EAB] hover:text-sky-700 rounded-full cursor-pointer"
                        >
                            ← Quay lại
                        </Button>
                    ) : (
                        <div />
                    )}

                    {step < 3 ? (
                        <Button
                            onClick={handleNext}
                            disabled={
                                (step === 1 && !selectedCV) ||
                                (step === 2 && !selectedJob)
                            }
                            className={cn(
                                "rounded-full gap-1.5 text-sm font-bold shadow-lg cursor-pointer",
                                "bg-sky-600 hover:bg-sky-700 text-white shadow-sky-500/20",
                                "disabled:opacity-40 disabled:cursor-not-allowed"
                            )}
                        >
                            Tiếp tục
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleStart}
                            className={cn(
                                "rounded-full gap-2 text-sm font-bold shadow-lg cursor-pointer",
                                "bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white",
                                "shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 transition-all"
                            )}
                        >
                            <BrainCircuit className="w-4 h-4" />
                            Bắt đầu phỏng vấn
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
