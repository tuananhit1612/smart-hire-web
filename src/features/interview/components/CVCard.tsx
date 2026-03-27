"use client";

import { motion } from "framer-motion";
import { FileText, Check } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import type { CVVersion } from "@/features/cv/types/cv-versions";

interface CVCardProps {
    readonly cv: CVVersion;
    readonly selected: boolean;
    readonly onSelect: () => void;
}

export function CVCard({ cv, selected, onSelect }: CVCardProps) {
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
