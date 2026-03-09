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
                            "w-9 h-9 rounded-full flex items-center justify-center text-base font-bold transition-all duration-300",
                            current > step.num
                                ? "bg-[#22c55e] text-white"
                                : current === step.num
                                    ? "bg-[#22c55e] text-white shadow-lg shadow-[#22c55e]500/30"
                                    : "bg-[rgba(145,158,171,0.12)] dark:bg-white/[0.06] text-[#919EAB]"
                        )}>
                        {current > step.num ? <Check className="w-5 h-5" /> : step.num}
                    </div>
                    <span
                        className={cn(
                            "text-sm font-medium hidden sm:block",
                            current >= step.num ? "text-[#1C252E] dark:text-white" : "text-[#919EAB]"
                        )}>
                        {step.label}
                    </span>
                    {i < steps.length - 1 && (
                        <div
                            className={cn(
                                "w-10 h-0.5 rounded-full mx-1",
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
                "w-full relative hover:z-10 text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer",
                selected
                    ? "border-[#22c55e] bg-[#22c55e]/10 dark:bg-[#22c55e]/20 shadow-lg shadow-[#22c55e]/10"
                    : "border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] bg-white dark:bg-[#1C252E] hover:border-[#22c55e] dark:hover:border-[#22c55e]/50 hover:shadow-md"
            )}>
            <div className="flex items-center gap-3">
                <div
                    className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                        selected ? "bg-[#22c55e] text-white" : "bg-[rgba(145,158,171,0.1)] dark:bg-white/[0.06] text-[#919EAB]"
                    )}>
                    <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-[#1C252E] dark:text-white truncate">{cv.name}</h4>
                    <p className="text-sm text-[#919EAB] mt-0.5">
                        {cv.templateName} • {cv.data.personalInfo.fullName}
                    </p>
                </div>
                {selected && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center shrink-0"
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
                "w-full relative hover:z-10 text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer",
                selected
                    ? "border-[#22c55e] bg-[#22c55e]/10 dark:bg-[#22c55e]/20 shadow-lg shadow-[#22c55e]/10"
                    : "border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] bg-white dark:bg-[#1C252E] hover:border-[#22c55e] dark:hover:border-[#22c55e]/50 hover:shadow-md"
            )}>
            <div className="flex items-center gap-3">
                <img
                    src={job.logoUrl}
                    alt={job.company}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 bg-[rgba(145,158,171,0.1)] dark:bg-white/[0.06]"
                />
                <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-[#1C252E] dark:text-white truncate">{job.title}</h4>
                    <p className="text-sm text-[#919EAB] mt-0.5">
                        {job.company} • {job.location} • {job.level}
                    </p>
                </div>
                {selected && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center shrink-0"
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
                        className="px-2.5 py-1 text-xs font-medium bg-[#22c55e]/10 dark:bg-[#22c55e]/20 text-[#22c55e] dark:text-[#4ADE80] rounded-full"
                    >
                        {skill}
                    </span>
                ))}
                {job.skills.length > 4 && (
                    <span className="px-2.5 py-1 text-xs font-medium bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.05] text-[#919EAB] rounded-full">
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
            <div className="bg-gradient-to-br from-[#22c55e]/10 to-emerald-50 dark:from-[#22c55e]/20 dark:to-emerald-900/20 rounded-2xl p-5 border border-[#22c55e]/20 dark:border-[#22c55e]/30">
                <p className="text-sm font-semibold text-[#22c55e] uppercase tracking-wider mb-3">
                    Tóm tắt phỏng vấn
                </p>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg bg-white dark:bg-white/[0.06] flex items-center justify-center shadow-sm">
                            <FileText className="w-5 h-5 text-[#22c55e]" />
                        </div>
                        <div>
                            <p className="text-sm text-[#919EAB]">CV đã chọn</p>
                            <p className="text-base font-semibold text-[#1C252E] dark:text-white">{cv.name}</p>
                        </div>
                    </div>
                    <div className="h-px bg-[#22c55e]/20 dark:bg-[#22c55e]/30" />
                    <div className="flex items-center gap-3">
                        <img
                            src={job.logoUrl}
                            alt={job.company}
                            className="w-11 h-11 rounded-lg object-cover bg-white dark:bg-white/[0.06] shadow-sm"
                        />
                        <div>
                            <p className="text-sm text-[#919EAB]">Vị trí ứng tuyển</p>
                            <p className="text-base font-semibold text-[#1C252E] dark:text-white">{job.title}</p>
                            <p className="text-sm text-[#637381] dark:text-[#919EAB]">{job.company}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30 rounded-2xl p-4">
                <div className="flex items-start gap-2.5">
                    <Sparkles className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-amber-800 dark:text-amber-400">AI sẽ tạo câu hỏi phỏng vấn</p>
                        <p className="text-sm text-amber-600 dark:text-amber-500 mt-0.5">
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
            <div className="mx-auto max-w-2xl px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6"
                >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#22c55e] to-[#10b981] flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#22c55e]/20">
                        <BrainCircuit className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#1C252E] dark:text-white">
                        Phỏng vấn thử với AI
                    </h1>
                    <p className="text-base text-[#637381] dark:text-[#919EAB] mt-1">
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
                                <FileText className="w-5 h-5 text-[#22c55e]" />
                                <h2 className="text-lg font-bold text-[#1C252E] dark:text-white">Chọn CV của bạn</h2>
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
                                <Briefcase className="w-5 h-5 text-[#22c55e]" />
                                <h2 className="text-lg font-bold text-[#1C252E] dark:text-white">Chọn vị trí phỏng vấn</h2>
                            </div>

                            {/* Search */}
                            <div className="relative mb-4">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm theo tên, công ty, kỹ năng..."
                                    value={jobSearch}
                                    onChange={(e) => setJobSearch(e.target.value)}
                                    className="w-full h-12 pl-11 pr-4 text-base bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] rounded-xl text-[#1C252E] dark:text-white placeholder:text-[#919EAB] dark:placeholder:text-[#637381] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/30 focus:border-[#22c55e] transition-all"
                                />
                            </div>

                            <div className="space-y-3 max-h-[400px] overflow-y-auto p-2 -mx-2">
                                {filteredJobs.map((job) => (
                                    <JobCard
                                        key={job.id}
                                        job={job}
                                        selected={selectedJobId === job.id}
                                        onSelect={() => setSelectedJobId(job.id)}
                                    />
                                ))}
                                {filteredJobs.length === 0 && (
                                    <p className="text-center text-base text-slate-400 py-8">
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
                                <Sparkles className="w-5 h-5 text-[#22c55e]" />
                                <h2 className="text-lg font-bold text-[#1C252E] dark:text-white">Xác nhận & bắt đầu</h2>
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
                            className="text-base text-[#637381] dark:text-[#919EAB] hover:text-[#22c55e] rounded-full cursor-pointer"
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
                                "rounded-full gap-2 text-base font-bold shadow-lg cursor-pointer px-6 py-2.5",
                                "bg-[#22c55e] hover:bg-[#16A34A] text-white shadow-[#22c55e]/20",
                                "disabled:opacity-40 disabled:cursor-not-allowed"
                            )}
                        >
                            Tiếp tục
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleStart}
                            className={cn(
                                "rounded-full gap-2 text-base font-bold shadow-lg cursor-pointer px-6 py-2.5",
                                "bg-gradient-to-r from-[#22c55e] to-[#10b981] hover:from-[#16A34A] hover:to-[#059669] text-white",
                                "shadow-[#22c55e]500/25 hover:shadow-[#22c55e]500/40 hover:scale-105 transition-all"
                            )}
                        >
                            <BrainCircuit className="w-5 h-5" />
                            Bắt đầu phỏng vấn
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
