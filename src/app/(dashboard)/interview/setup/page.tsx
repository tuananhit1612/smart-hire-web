"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    BrainCircuit,
    FileText,
    Briefcase,
    ChevronRight,
    Sparkles,
    ArrowRight,
    Search,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";
import { mockCVVersions } from "@/features/cv/types/cv-versions";
import { mockJobs } from "@/features/jobs/types/mock-jobs";

import { StepIndicator } from "@/features/interview/components/StepIndicator";
import { CVCard } from "@/features/interview/components/CVCard";
import { InterviewJobCard } from "@/features/interview/components/InterviewJobCard";
import { ConfirmationStep } from "@/features/interview/components/ConfirmationStep";

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

                <StepIndicator current={step} />

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
                                    <InterviewJobCard
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
                                "shadow-[#22c55e]/25 hover:shadow-[#22c55e]/40 hover:scale-105 transition-all"
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
