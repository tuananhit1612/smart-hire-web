"use client";

import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";

interface StepExperienceProps {
    onNext: () => void;
    onBack: () => void;
    selectedExperience: string | null;
    onSelectExperience: (level: string) => void;
}

const experiences = [
    { id: "entry", label: "Mới ra trường", years: "0-2 năm" },
    { id: "mid", label: "Trình độ trung cấp", years: "3-5 năm" },
    { id: "senior", label: "Cao cấp / Chuyên viên", years: "5-8 năm" },
    { id: "lead", label: "Quản lý / Trưởng nhóm", years: "Trên 8 năm" },
];

export function StepExperience({ onNext, onBack, selectedExperience, onSelectExperience }: StepExperienceProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center w-full space-y-8 p-4 sm:p-8"
        >
            <div className="space-y-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-500 dark:to-amber-400">
                    Bạn có bao nhiêu năm kinh nghiệm?
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Điều này giúp chúng tôi tìm các vai trò phù hợp với giai đoạn sự nghiệp của bạn.
                </p>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-xl">
                {experiences.map((exp) => {
                    const isSelected = selectedExperience === exp.label;
                    return (
                        <motion.button
                            key={exp.id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => onSelectExperience(exp.label)}
                            className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 backdrop-blur-xl ${isSelected
                                ? "border-[#22c55e] bg-[rgba(34,197,94,0.08)] shadow-[0_8px_24px_-8px_rgba(34,197,94,0.25)]"
                                : "border-[rgba(145,158,171,0.12)] bg-white/50 dark:bg-white/[0.02] hover:border-[rgba(145,158,171,0.24)] hover:bg-[rgba(145,158,171,0.04)]"
                                }`}
                        >
                            <span className={`font-semibold text-lg ${isSelected ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}>
                                {exp.label}
                            </span>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-3 py-1 rounded-full">
                                {exp.years}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            <div className="flex gap-4 w-full max-w-xl mt-8 pt-8 border-t border-[rgba(145,158,171,0.12)]">
                <Button
                    onClick={onBack}
                    variant="outline"
                    size="lg"
                    className="flex-1 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                    Quay lại
                </Button>
                <Button
                    onClick={onNext}
                    disabled={!selectedExperience}
                    size="lg"
                    className="flex-1 rounded-full shadow-[0_8px_16px_rgba(34,197,94,0.24)] bg-[#22c55e] hover:bg-[#10b981] text-white disabled:opacity-50 disabled:shadow-none"
                >
                    Phân tích hồ sơ
                </Button>
            </div>
        </motion.div>
    );
}
