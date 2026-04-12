"use client";

import { FileText, Sparkles } from "lucide-react";
import type { CVVersion } from "@/features/cv/types/cv-versions";
import type { Job } from "@/features/jobs/types/job";

interface ConfirmationStepProps {
    readonly cv: CVVersion;
    readonly job: Job;
}

export function ConfirmationStep({ cv, job }: ConfirmationStepProps) {
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
