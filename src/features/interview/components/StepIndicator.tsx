"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface StepIndicatorProps {
    readonly current: 1 | 2 | 3;
}

const STEPS = [
    { num: 1, label: "Chọn CV" },
    { num: 2, label: "Chọn vị trí" },
    { num: 3, label: "Xác nhận" },
];

export function StepIndicator({ current }: StepIndicatorProps) {
    return (
        <div className="flex items-center justify-center gap-2 mb-8">
            {STEPS.map((step, i) => (
                <div key={step.num} className="flex items-center gap-2">
                    <div
                        className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center text-base font-bold transition-all duration-300",
                            current > step.num
                                ? "bg-[#22c55e] text-white"
                                : current === step.num
                                    ? "bg-[#22c55e] text-white shadow-lg shadow-[#22c55e]/30"
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
                    {i < STEPS.length - 1 && (
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
